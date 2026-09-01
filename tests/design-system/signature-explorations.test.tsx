import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  DirectionEvidence,
  SignaturePreview,
  signatureFamilies,
} from "../../src/design-system/explorations";

describe("signature composition explorations", () => {
  it("defines eight families with three unique directions each", () => {
    const directions = signatureFamilies.flatMap((family) => family.directions);

    expect(signatureFamilies).toHaveLength(8);
    expect(directions).toHaveLength(24);
    expect(new Set(directions.map(({ id }) => id)).size).toBe(24);
    expect(
      signatureFamilies.every(
        (family) =>
          family.directions.length === 3 &&
          new Set(family.directions.map(({ key }) => key)).size === 3,
      ),
    ).toBe(true);
  });

  it("provides complete decision evidence for every direction", () => {
    const requiredFields = [
      "rationale",
      "composition",
      "accessibility",
      "motion",
      "complexity",
      "recommendation",
      "tradeoffs",
    ] as const;

    for (const family of signatureFamilies) {
      expect(family.question.length).toBeGreaterThan(20);
      for (const direction of family.directions) {
        for (const field of requiredFields) {
          expect(direction[field].length, `${direction.id}.${field}`).toBeGreaterThan(20);
        }
      }
    }
  });

  it("renders desktop and mobile structures for every direction", () => {
    for (const family of signatureFamilies) {
      for (const direction of family.directions) {
        const markup = renderToStaticMarkup(
          <>
            <SignaturePreview direction={direction.key} family={family.id} mode="desktop" />
            <SignaturePreview direction={direction.key} family={family.id} mode="mobile" />
            <DirectionEvidence direction={direction} />
          </>,
        );

        expect(markup).toContain('data-preview-mode="desktop"');
        expect(markup).toContain('data-preview-mode="mobile"');
        expect(markup).toContain("Accessibility");
        expect(markup).toContain("Motion");
        expect(markup).toContain("Complexity");
      }
    }
  });

  it("keeps recommendations advisory and visible", () => {
    const recommendations = signatureFamilies.flatMap((family) =>
      family.directions.filter(({ recommended }) => recommended),
    );

    expect(recommendations).toHaveLength(8);
    expect(new Set(recommendations.map(({ id }) => id))).toContain("LEARN-B");
  });

  it("contains no forbidden dash characters in visible exploration copy", () => {
    const copy = JSON.stringify(signatureFamilies);
    expect(copy).not.toMatch(/[—–]/);
  });
});
