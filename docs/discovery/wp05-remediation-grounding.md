# WP05 remediation grounding

Grounding for the design-lab explorations remediation. Written for arena runners and the implementation delegate. Read the real files; this note is the map, not the territory.

## What is being fixed

A design and content review of `feat/wp05-signature-exploration` found six problems. Two of them are design forks that need a shape decision before code. Four are mechanical.

Design forks (arena decides these):

1. Preview fidelity. The desktop preview is captioned `1440` and the mobile preview `375`, but neither renders at that width. The caption is a claim the DOM does not honour, so every layout judgement made from this page is made against a lie.
2. Direction verdict model. Seven of the eight families mark direction A as `recommended`. The page presents three equal-weight columns per family, which reads as a genuine three-way exploration. It is not one.

Mechanical (no shape question, implementation delegate does these):

3. Swap the sans typeface off Inter. Lift the canvas off pure black. Desaturate the rose accent.
4. De-hedge the motion specs. Every `may` becomes a committed behaviour or `No motion.`
5. Collapse the recommendation opening synonyms to one phrase. Cut the `rather than` constructions.
6. Housekeeping. Decorative `<button>` elements inside previews become `<span>`. Fix `HERO-A` DOM order. Raise mobile preview body text above 14px. `100dvh` on body.

## Token pipeline

Source of truth is `src/design-system/tokens/*.json`. `scripts/build-design-tokens.mjs` compiles them to `src/design-system/generated/tokens.css`, `tokens.ts`, and `figma-map.json`. Those generated files are committed. `npm run design:tokens` rebuilds. `npm run design:tokens:check` fails when the committed output drifts from source.

Validators are `scripts/validate-design-tokens.mjs` (schema, cycles, resolution) and `scripts/validate-design-token-usage.mjs` (raw colour literals in components). Both run under `npm run design:tokens:validate`.

Current values that change:

- `typography.json:5-10`. `font.family.sans` is `Inter`, with `cssValue` `var(--font-inter), ui-sans-serif, system-ui, sans-serif`.
- `src/app/layout.tsx:2-7,28`. `next/font/google` imports `Inter` and binds it to `--font-inter`.
- `primitives.json:5`. `color.neutral.black` is `#000000`, described as "Absolute black canvas".
- `primitives.json:17-19`. Rose is `#f43f5e` default, `#fb7185` hover, `#e21e49` pressed.
- `primitives.json:28-30,40`. Four rose alpha tokens hard-code `rgba(244, 63, 94, …)`. They must track the new base or the accent splits into two hues.

## Test blast radius

`tests/design-system/tokens.test.mjs:43-45` asserts the exact palette:

```
expect(result.resolvedValues.get("color.background.canvas")).toBe("#000000");
expect(result.resolvedValues.get("color.action.primary")).toBe("#f43f5e");
```

Any palette change breaks these. Update them to the new values and keep the contrast assertions that follow. `scripts/design-token-lib.mjs` exports `contrastRatio`, so contrast floors can be asserted rather than eyeballed.

`tests/design-system/signature-explorations.test.tsx` covers the explorations surface. It is the home for the new preview-fidelity assertions.

## Explorations render path

`src/app/(design-lab)/design-lab/explorations/page.tsx` maps over `signatureFamilies` and renders one `<article class="exploration-direction">` per direction, carrying `data-recommended` (line 59) and a `<strong>Recommended</strong>` badge (line 65).

`src/design-system/explorations/signature-compositions.tsx` owns the data and the previews.

```ts
export interface SignatureDirection {
  id: string;
  key: DirectionKey;
  name: string;
  rationale: string;
  composition: string;
  accessibility: string;
  motion: string;
  complexity: string;
  recommendation: string;
  tradeoffs: string;
  recommended?: boolean;
}
```

`SignaturePreview` (line 654) renders the viewport frame. Line 658 is where the caption is produced:

```tsx
<div className={styles.previewViewportHeader}><span>{mode}</span><span>{mode === "desktop" ? "1440" : "375"}</span></div>
```

`DirectionEvidence` (line 666) renders the verdict block. Line 679 branches the label on the boolean:

```tsx
<span>{direction.recommended ? "Recommended direction" : "Selection guidance"}</span>
```

Styling lives in `src/design-system/explorations/signature-compositions.module.css` (1263 lines) and `src/app/(design-lab)/design-lab/explorations/explorations-lab.css` (279 lines).

## Constraints every candidate must respect

- No raw colour literals in components. Colour goes through tokens or the usage validator fails.
- Generated token files are committed. A source edit without `npm run design:tokens` fails `design:tokens:check`.
- Server components by default. `signature-compositions.tsx` has no `"use client"`; a solution that needs client JS pays a real cost and must justify it.
- Reduced motion is already honoured across the CSS. Do not regress it.
- Contrast floor is 4.5:1 for text and non-decorative UI against the canvas.
- The four rose alpha tokens must derive from the same base as the rose ramp.
