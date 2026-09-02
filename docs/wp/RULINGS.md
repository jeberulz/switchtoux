# Project rulings

## R-001: Token source precedence

**Status:** Accepted
**Date:** 1 September 2026

The canonical machine-readable JSON files in `src/design-system/tokens/` own token values. Generated CSS, TypeScript and Figma artifacts must not be edited manually.

## R-002: Visual source

**Status:** Accepted
**Date:** 1 September 2026

`switchtoux-DESIGN.md` is the complete visual authority. The absent Integration Ecosystem reference is not a blocker.

## R-003: Package manager

**Status:** Accepted
**Date:** 1 September 2026

Use npm and preserve `package-lock.json`. Translate pnpm command examples in the Design Lab prompt to npm equivalents.

## R-004: Accessibility corrections

**Status:** Accepted
**Date:** 1 September 2026

- Use `#e21e49` for the pressed rose action colour so black normal-size text clears 4.5:1 contrast.
- Use zinc `#71717a` for interactive control boundaries.
- Use a 2px rose inner focus ring with a 2px white outer ring.

## R-005: Approval boundary

**Status:** Accepted
**Date:** 1 September 2026

WP01 ends at the code-token approval gate. It does not create Design Lab routes, product components, Figma objects or production integrations.

## R-006: First token consumer

**Status:** Accepted
**Date:** 1 September 2026

WP02 is limited to the internal Design Lab shell and foundation specimens. The lab consumes generated tokens, is excluded from indexing, can be disabled with `DESIGN_LAB_ENABLED=false`, and does not introduce public pages, product components, Figma mutations or integrations.

## R-007: Figma sequencing

**Status:** Accepted
**Date:** 1 September 2026

The owner has moved Figma discovery, native variable creation and parity work to the final design-system batch. Code component work may proceed against the approved canonical tokens and Design Lab foundations. Public page assembly still requires explicit approval after the final code/Figma parity gate.

Superseded in part by R-012: do not push HERO, exploration cards or programmes into Figma until the owner redesigns them there.

## R-008: Signature composition selection

**Status:** Accepted
**Date:** 2 September 2026

The owner approved `HERO-B`, `GROUND-A`, `COURSE-B`, `ARTEFACT-B`, `ROLE-A`, `LEARN-B`, `INSTRUCTOR-A` and `CTA-A` as the signature composition set. The owner's `ROLA-A` entry is recorded as `ROLE-A`, the matching stable direction ID. Original recommendations and rejected alternatives remain available in the Design Lab as decision history. WP05 is closed; programme identity is the next planned work package.

## R-009: Programme identity approval

**Status:** Accepted
**Date:** 2 September 2026

The owner approved the WP06 programme identity system at `/design-lab/programmes`. The approved implementation uses the `COURSE-B` capability constellation and `ARTEFACT-B` evidence index, with all courses and workshops remaining explicitly `coming-soon`. WP06 is closed. Public-page assembly, Figma work and production integrations remain excluded.

## R-010: Trust, conversion and forms approval

**Status:** Accepted
**Date:** 2 September 2026

The owner approved the WP07 trust and form system at `/design-lab/trust` and `/design-lab/forms` and directed work to continue to course-learning and editorial components. WP07 is closed. Production submit adapters, CMS wiring, Figma work and public pages remain excluded.

## R-011: Course learning and editorial approval

**Status:** Accepted
**Date:** 2 September 2026

The owner approved the WP08 course-learning and editorial systems at `/design-lab/learning` and `/design-lab/editorial` and directed the completed work to be committed and pushed. WP08 is closed. System states are the next code gate. Figma remains the final design-system batch, and CMS wiring, production providers and public pages remain excluded.

## R-012: Figma-first visual revision for HERO, cards and programmes

**Status:** Accepted
**Date:** 2 September 2026

The owner is taking visual rework of `HERO`, exploration card design, and the programmes family into Figma. Those looks are `needs-revision`. WP05/WP06 structure and data contracts remain; the current Design Lab chrome is not the look to freeze.

Do not:

- Push current HERO, card, or programmes compositions into the approved Figma library
- Implement a visual restyle of those families in code until the owner hands back Figma
- Treat R-008/R-009 as a locked visual

When Figma work starts, park those families on an exploring/revision page. Tokens still write back to `src/design-system/tokens/*.json`. Everything else can still follow R-007 (code first, then Figma mirror) unless the owner expands this list.
