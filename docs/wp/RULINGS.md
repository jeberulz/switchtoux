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
