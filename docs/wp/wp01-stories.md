# WP01 stories: Design token foundation

## WP01-S01: Canonical token sources

**File scope:** `src/design-system/tokens/**`

Acceptance criteria:

- DTCG-shaped token documents use stable `$type`, `$value` and `$description` fields.
- Primitive, semantic, typography, motion and stable component decisions are separated.
- Approved colour, typography, spacing, layout, sizing, layering and motion values are complete.
- Semantic references resolve only through canonical token IDs.

Checks:

- `npm run design:tokens:validate`
- `npm run test:tokens`

## WP01-S02: Deterministic generated interfaces

**File scope:** `scripts/**`, `src/design-system/generated/**`

Acceptance criteria:

- One generator emits CSS, TypeScript, Tailwind mappings, Figma mappings and a machine-readable report.
- Generation order and serialization are deterministic.
- Check mode detects stale generated files without rewriting them.
- Generated files carry a do-not-edit header.

Checks:

- `npm run design:tokens`
- `npm run design:tokens:check`

## WP01-S03: Token validation and regression tests

**File scope:** `scripts/**`, `tests/design-system/**`, `package.json`

Acceptance criteria:

- Validation detects unresolved references, cycles, invalid layers, duplicate CSS variables and incomplete inventories.
- Required contrast pairs meet their configured WCAG thresholds.
- Exact approved values and public mappings have regression coverage.
- No light-theme token exists.

Checks:

- `npm run design:tokens:validate`
- `npm run test:tokens`

## WP01-S04: Scaffold integration

**File scope:** `src/app/globals.css`, `src/app/layout.tsx`, `package.json`, `package-lock.json`

Acceptance criteria:

- Inter 400/500/600 and JetBrains Mono 500/600 load through `next/font`.
- Generated token CSS and Tailwind mappings are imported once.
- The starter light-mode media query is removed.
- The starter page and all product UI remain untouched.

Checks:

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## WP01 definition of done

- All four stories pass their checks.
- The generated integrity report is ready for owner review.
- No Design Lab route, product component, Figma mutation or production integration exists.
