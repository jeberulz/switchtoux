# Switch to UX project strategy

## Active work packages

| Work package | Branch | Status | Definition of done |
| --- | --- | --- | --- |
| WP01: Design token foundation | `feat/wp01-design-token-foundation` | Approved | Canonical tokens generate deterministic CSS, TypeScript, Tailwind and Figma artifacts; validation, lint, typecheck and production build pass; no Design Lab or product components are created. |
| WP02: Design Lab foundations | `feat/wp02-design-lab-foundations` | Ready for owner approval | The internal, no-index Design Lab shell consumes only approved tokens and documents colour, typography, spacing, radius, grid, elevation, motion and focus across the required viewports. |

## Sequence

1. Build and approve the foundations-only Design Lab consumer.
2. Inspect the user-provided Figma file and approve its mutation plan.
3. Mirror approved code tokens into native Figma variables and styles.
4. Begin component exploration only after code/Figma token parity is approved.

## Scope ruling

This is a greenfield product. The current-site audit, migration inventory, legacy routes and existing integrations do not influence the design system.
