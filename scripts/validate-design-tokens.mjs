import { buildTokenArtifacts } from "./design-token-lib.mjs";

const result = await buildTokenArtifacts();

if (result.report.errors.length > 0) {
  console.error("Design token validation failed:");
  for (const error of result.report.errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  const minimumContrast = Math.min(
    ...result.report.contrastChecks.map(({ ratio }) => ratio),
  );
  console.log(
    [
      "Design token validation passed.",
      `${result.report.counts.tokens} canonical tokens`,
      `${result.report.counts.figmaEntries} Figma mappings`,
      `${result.report.contrastChecks.length} contrast checks`,
      `minimum checked contrast ${minimumContrast}:1`,
    ].join(" · "),
  );
}
