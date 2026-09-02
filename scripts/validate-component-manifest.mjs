import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(projectRoot, "docs/design-system/component-manifest.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const errors = [];
const entries = [];

if (manifest.schemaVersion !== 1) errors.push("Unsupported component manifest schema version.");
if (!Array.isArray(manifest.families)) errors.push("Manifest families must be an array.");

for (const family of manifest.families ?? []) {
  const expectedIds = Array.from(
    { length: family.expectedCount },
    (_, index) => `${family.prefix}-${String(index + 1).padStart(2, "0")}`,
  );
  const familyEntries = [];

  for (const raw of family.components ?? []) {
    const component = Array.isArray(raw) ? { id: raw[0], name: raw[1] } : raw;
    const entry = {
      family: family.family,
      codeStatus: component.codeStatus ?? family.codeStatus,
      codeReference: component.codeReference ?? family.codeReference,
      figmaStatus: component.figmaStatus ?? family.figmaStatus,
      id: component.id,
      name: component.name,
    };
    familyEntries.push(entry);
    entries.push(entry);
  }

  const actualIds = familyEntries.map(({ id }) => id).sort();
  if (actualIds.join("|") !== expectedIds.join("|")) {
    errors.push(`${family.family} must account for ${expectedIds.join(", ")}.`);
  }
}

const idCounts = new Map();
for (const entry of entries) {
  idCounts.set(entry.id, (idCounts.get(entry.id) ?? 0) + 1);
  if (!entry.name) errors.push(`${entry.id ?? "Unknown ID"} has no component name.`);
  if (!manifest.codeStatuses.includes(entry.codeStatus)) {
    errors.push(`${entry.id} has invalid code status ${entry.codeStatus}.`);
  }
  if (!manifest.figmaStatuses.includes(entry.figmaStatus)) {
    errors.push(`${entry.id} has invalid Figma status ${entry.figmaStatus}.`);
  }
  if (!entry.codeReference) {
    errors.push(`${entry.id} has no code reference.`);
  } else if (!entry.codeReference.startsWith("deferred:")) {
    try {
      await access(path.join(projectRoot, entry.codeReference));
    } catch {
      errors.push(`${entry.id} points to missing code reference ${entry.codeReference}.`);
    }
  }
  if (entry.codeStatus === "needs-revision" && entry.figmaStatus !== "blocked-revision") {
    errors.push(`${entry.id} needs revision but is not blocked from Figma promotion.`);
  }
  if (entry.codeStatus === "deferred-public" && !entry.codeReference.startsWith("deferred:")) {
    errors.push(`${entry.id} is deferred-public without a deferred reference.`);
  }
}

for (const [id, count] of idCounts) {
  if (count > 1) errors.push(`${id} appears ${count} times.`);
}

if (!entries.some(({ codeStatus }) => codeStatus === "needs-revision")) {
  errors.push("Manifest does not record the R-012 revision boundary.");
}
if (!entries.some(({ codeStatus }) => codeStatus === "deferred-public")) {
  errors.push("Manifest does not record the public-page deferral.");
}

if (errors.length > 0) {
  console.error("Component manifest validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  const counts = Object.fromEntries(
    manifest.codeStatuses.map((status) => [
      status,
      entries.filter((entry) => entry.codeStatus === status).length,
    ]),
  );
  console.log(
    `Component manifest passed: ${entries.length} IDs across ${manifest.families.length} families. ` +
      manifest.codeStatuses.map((status) => `${counts[status]} ${status}`).join(", "),
  );
}
