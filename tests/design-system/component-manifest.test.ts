import { describe, expect, it } from "vitest";
import manifest from "../../docs/design-system/component-manifest.json";
import { systemStateDefinitions } from "../../src/design-system/components/system";

type ManifestComponent =
  | [string, string]
  | {
      codeStatus?: string;
      figmaStatus?: string;
      id: string;
      name: string;
    };

const entries = manifest.families.flatMap((family) =>
  (family.components as ManifestComponent[]).map((raw) => {
    const component: Exclude<ManifestComponent, [string, string]> = Array.isArray(raw)
      ? { id: raw[0], name: raw[1] }
      : raw;

    return {
      codeStatus: "codeStatus" in component ? component.codeStatus : family.codeStatus,
      figmaStatus: "figmaStatus" in component ? component.figmaStatus : family.figmaStatus,
      id: component.id,
      name: component.name,
    };
  }),
);

describe("component manifest", () => {
  it("accounts for the complete 166-ID catalogue without duplicates", () => {
    expect(entries).toHaveLength(166);
    expect(new Set(entries.map(({ id }) => id)).size).toBe(166);
    expect(manifest.families).toHaveLength(12);
  });

  it("matches the typed system-state contract exactly", () => {
    const manifestStates = entries
      .filter(({ id }) => id.startsWith("SYS-"))
      .map(({ id, name }) => ({ id, name }));

    expect(manifestStates).toEqual(
      systemStateDefinitions.map(({ component, id }) => ({ id, name: component })),
    );
  });

  it("keeps R-012 revisions blocked from Figma promotion", () => {
    const revisionEntries = entries.filter(({ codeStatus }) => codeStatus === "needs-revision");

    expect(revisionEntries.length).toBeGreaterThan(0);
    expect(revisionEntries.every(({ figmaStatus }) => figmaStatus === "blocked-revision")).toBe(true);
  });

  it("keeps navigation and public interiors deferred", () => {
    const deferredIds = entries
      .filter(({ codeStatus }) => codeStatus === "deferred-public")
      .map(({ id }) => id);

    expect(deferredIds).toContain("NAV-01");
    expect(deferredIds).toContain("NAV-13");
    expect(deferredIds).toContain("INT-01");
    expect(deferredIds).toContain("INT-15");
  });
});
