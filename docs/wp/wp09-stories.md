# WP09 stories: System states and library QA

## WP09-S01: Typed system-state contract

**File scope:** `src/design-system/components/system/**`

Acceptance criteria:

- Define all fourteen `SYS` states as typed, named component interfaces.
- Separate recoverable, blocking, informational and fallback states.
- Every state has a concise title, explanation and explicit next action when recovery is possible.
- Status presentation uses semantic text and icons, never colour alone.
- No state calls a provider, CMS, network endpoint or public route during the Design Lab gate.

## WP09-S02: Resilient state components

**File scope:** `src/design-system/components/system/**`

Acceptance criteria:

- Build `ComingSoonState`, `EmptyResourceCategory`, `FormSuccessState`, `FormFailureState`, `ValidationErrorState`, `SpamCheckFailureState`, `CMSContentFailureState`, `MissingImageState`, `ContentLoadingState`, `NotFoundState`, `GeneralErrorState`, `NetworkErrorState`, `ReducedMotionState` and `StaticAtmosphereFallback`.
- Reuse approved controls and HugeIcons. Do not hand-roll icons or duplicate form lifecycle logic.
- Live states expose appropriate `status` or `alert` semantics without competing announcements.
- Loading reserves final-content geometry and becomes static under reduced motion.
- Missing content and imagery preserve page meaning and layout without fabricated material.
- All styling consumes canonical tokens and supports 320px without horizontal overflow.

## WP09-S03: Complete component manifest

**File scope:** `docs/design-system/component-manifest.json`, `scripts/validate-component-manifest.mjs`, `package.json`, tests

Acceptance criteria:

- Account for every component ID specified from `FND-01` through `SYS-14`.
- Record family, component name, code status, code reference and Figma status.
- Allow honest statuses: `implemented`, `composed`, `deferred-public` and `needs-revision`.
- Mark hero, exploration-card and programme visuals according to R-012 rather than treating them as locked.
- Fail validation for missing IDs, duplicates, invalid status combinations, missing code references or unaccounted catalogue entries.
- Add `npm run design:manifest:validate` and include it in the WP09 verification record.

## WP09-S04: Design Lab gallery and full code gate

**File scope:** `src/app/(design-lab)/design-lab/states/**`, Design Lab shell and overview, `tests/design-system/**`, work-package documentation

Acceptance criteria:

- Add `/design-lab/states` to the no-index workspace and navigation.
- Group states by recovery intent rather than presenting fourteen interchangeable cards.
- Exercise retry, return and disclosure actions without external side effects.
- Validate 320, 375, 768, 1024, 1280 and 1440px, keyboard focus, 200% effective width and reduced motion.
- Run token freshness and validation, manifest validation, type checking, lint, unit tests and production build.
- Record Figma naming, binding, screenshot and code-parity audits as deferred to the final Figma batch.
- Stop for owner approval before any Figma mutation or public-page assembly.

## WP09 definition of done

- Every specified system state has a stable, accessible code contract and Design Lab specimen.
- Every catalogue ID is accounted for honestly, including deferred and revision work.
- Automated gates fail on manifest drift and token misuse.
- R-012 families are not visually frozen or promoted into Figma.
- No public page, CMS schema, production provider or Figma object is created.
