import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  buildTokenArtifacts,
  contrastRatio,
  flattenDocument,
  PROJECT_ROOT,
  resolveTokenValues,
  validateTokenLayers,
} from "../../scripts/design-token-lib.mjs";

async function loadFixture(name) {
  const contents = await readFile(
    path.join(PROJECT_ROOT, "tests/design-system/fixtures", name),
    "utf8",
  );
  return JSON.parse(contents);
}

function fixtureGraph(document, source = "semantic.json") {
  const tokens = flattenDocument(document, source);
  return {
    tokens,
    tokenMap: new Map(tokens.map((token) => [token.id, token])),
  };
}

describe("canonical design tokens", () => {
  it("builds a complete, passing token report", async () => {
    const result = await buildTokenArtifacts();

    expect(result.report.status).toBe("pass");
    expect(result.report.errors).toEqual([]);
    expect(result.report.counts.tokens).toBeGreaterThanOrEqual(250);
    expect(result.report.counts.tokens).toBe(result.report.counts.cssVariables);
    expect(result.report.counts.tokens).toBe(result.report.counts.figmaEntries);
  });

  it("preserves the approved palette and accessibility corrections", async () => {
    const result = await buildTokenArtifacts();
    const canvas = result.resolvedValues.get("color.background.canvas");
    const onAction = result.resolvedValues.get("color.text.onAction");

    expect(canvas).toBe("#09090b");
    expect(canvas).not.toBe("#000000");
    expect(result.resolvedValues.get("color.action.primary")).toBe("#db586f");
    expect(result.resolvedValues.get("color.action.hover")).toBe("#e88493");
    expect(result.resolvedValues.get("color.action.pressed")).toBe("#cc4b67");
    expect(result.resolvedValues.get("color.border.control")).toBe("#71717a");

    for (const state of ["default", "hover", "pressed"]) {
      expect(
        contrastRatio(
          result.resolvedValues.get(`color.rose.${state}`),
          onAction,
        ),
      ).toBeGreaterThanOrEqual(4.5);
    }
  });

  it("includes the complete typography, breakpoint and motion inventories", async () => {
    const result = await buildTokenArtifacts();

    expect(new Set(result.typographyRoles)).toEqual(
      new Set([
        "Display/2XL",
        "Display/XL",
        "Display/LG",
        "Heading/XL",
        "Heading/LG",
        "Heading/MD",
        "Body/LG",
        "Body/MD",
        "Body/SM",
        "Label/Mono",
        "Technical/Mono",
      ]),
    );
    expect(result.breakpointNames).toEqual([
      "mobile",
      "tablet",
      "comparison",
      "desktop",
      "wide",
      "canvas",
    ]);
    expect(new Set(result.motionRoles)).toEqual(
      new Set([
        "instantFeedback",
        "hoverFocus",
        "accordion",
        "maskedReveal",
        "pageEntrance",
        "mobileMenu",
        "ambientPath",
        "reduced",
      ]),
    );
  });

  it("keeps the sans token aligned with the runtime font variable", async () => {
    const result = await buildTokenArtifacts();
    const layout = await readFile(
      path.join(PROJECT_ROOT, "src/app/layout.tsx"),
      "utf8",
    );
    const sansToken = result.tokens.find(({ id }) => id === "font.family.sans");
    const layoutVariable = layout.match(/variable: "(--font-[a-z-]+)"/)?.[1];

    expect(layoutVariable).toBe("--font-instrument-sans");
    expect(sansToken.extensions.switchtoux.cssValue).toContain(
      `var(${layoutVariable})`,
    );
  });

  it("generates stable public CSS and Tailwind aliases", async () => {
    const first = await buildTokenArtifacts();
    const second = await buildTokenArtifacts();
    const css = first.outputs.get("tokens.css");

    expect([...first.outputs]).toEqual([...second.outputs]);
    expect(css).toContain("--color-bg: var(--primitive-color-neutral-zinc975);");
    expect(css).toContain("--text-display-2xl: clamp(3rem, 7.2vw, 5.5rem);");
    expect(css).toContain("--color-brand: var(--color-accent);");
    expect(css).toContain("--breakpoint-comparison: 900px;");
    expect(css).not.toMatch(/prefers-color-scheme|light/i);
  });

  it("maps every canonical token to one CSS variable and one Figma entry", async () => {
    const result = await buildTokenArtifacts();
    const cssNames = [...result.cssVariables.values()];
    const figmaIds = result.figmaMap.entries.map(({ id }) => id);

    expect(new Set(cssNames).size).toBe(cssNames.length);
    expect(new Set(figmaIds)).toEqual(new Set(result.tokens.map(({ id }) => id)));
    expect(
      result.figmaMap.entries.every(
        ({ collection, cssVariable, scope }) =>
          collection && cssVariable.startsWith("--") && scope.length > 0,
      ),
    ).toBe(true);
  });
});

describe("invalid token fixtures", () => {
  it("rejects unresolved references", async () => {
    const { tokenMap } = fixtureGraph(
      await loadFixture("invalid-unresolved.json"),
    );
    expect(() => resolveTokenValues(tokenMap)).toThrow(
      "Unresolved token reference: fixture.doesNotExist",
    );
  });

  it("rejects circular references", async () => {
    const { tokenMap } = fixtureGraph(await loadFixture("invalid-cycle.json"));
    expect(() => resolveTokenValues(tokenMap)).toThrow(
      "Circular token reference",
    );
  });

  it("rejects unsupported types and missing descriptions", async () => {
    const { tokens, tokenMap } = fixtureGraph(
      await loadFixture("invalid-schema.json"),
      "primitives.json",
    );
    const errors = validateTokenLayers(tokens, tokenMap);

    expect(errors).toContain("fixture.badType has unsupported type unknown.");
    expect(errors).toContain("fixture.missingDescription is missing a description.");
  });
});
