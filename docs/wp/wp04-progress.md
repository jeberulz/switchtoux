# WP04 progress: Controls and brand primitives

**Branch:** `feat/wp04-controls-brand-primitives`
**Status:** Ready for owner review

## Story status

- [x] WP04-S01 Core controls
- [x] WP04-S02 Signature brand primitives
- [x] WP04-S03 Design Lab workbenches
- [x] WP04-S04 Verification

## Scope notes

- WP03 was approved by the owner before this branch began.
- Figma discovery and parity remain deferred to the final design-system batch.
- Canonical token values remain unchanged unless validation identifies a genuine missing stable decision.
- Signature compositions, public pages, forms, programme components and integrations are excluded.

## Delivered

- Twelve typed core controls with action, status, metadata, disclosure, progress, tooltip and loading behavior.
- Thirteen typed signature primitives covering the wordmark, evidence notation, system nodes, paths, traces, proof marks, artefacts, atmosphere and frames.
- Dedicated no-index workbenches at `/design-lab/controls` and `/design-lab/brand`.
- Static-first signature structure with one optional token-driven trace and no canvas or WebGL dependency.
- Forced-color focus fallbacks for interactive controls and the temporary wordmark.

## Verification

- Required widths: 320, 375, 768, 1024, 1280 and 1440px, with no document overflow on either route.
- 200% zoom equivalent reflow: no document overflow at a 640px effective viewport.
- Interactive targets: 44px minimum and 48px for primary buttons.
- Keyboard: Space toggles accordions, expanded state updates and the controlled region becomes visible.
- Tooltip: the named trigger and supplementary content share a matching `aria-describedby` relationship.
- Focus: the approved two-stage ring renders normally and a 2px system-color outline renders in forced-color mode.
- Reduced motion: loading bars and connection traces resolve to static output.
- Region labels, progress ranges, status text and relationship names are programmatically exposed.
- Token validation, generated-output freshness, token-usage enforcement, lint, type checking, 31 tests and an isolated production build pass.
