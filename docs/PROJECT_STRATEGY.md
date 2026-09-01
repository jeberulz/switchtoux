# Switch to UX project strategy

## Active work packages

| Work package | Branch | Status | Definition of done |
| --- | --- | --- | --- |
| WP01: Design token foundation | `feat/wp01-design-token-foundation` | Approved | Canonical tokens generate deterministic CSS, TypeScript, Tailwind and Figma artifacts; validation, lint, typecheck and production build pass; no Design Lab or product components are created. |
| WP02: Design Lab foundations | `feat/wp02-design-lab-foundations` | Approved | The internal, no-index Design Lab shell consumes only approved tokens and documents colour, typography, spacing, radius, grid, elevation, motion and focus across the required viewports. |
| WP03: Layout primitives | `feat/wp03-layout-primitives` | Ready for review | Twelve token-only layout primitives expose stable composition APIs and are documented with responsive, accessible specimens at `/design-lab/layout`. |

## Sequence

1. Build and approve layout primitives.
2. Build controls and signature brand primitives.
3. Run the signature-composition exploration and approval gate.
4. Build programme, trust, form and editorial component families.
5. Complete the remaining Design Lab and system-state QA.
6. Run Figma discovery, native token mirroring and code/Figma parity as the final design-system batch.
7. Obtain explicit approval before assembling any public website page.

## Scope ruling

This is a greenfield product. The current-site audit, migration inventory, legacy routes and existing integrations do not influence the design system.
