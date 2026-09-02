# Switch to UX project strategy

## Active work packages

| Work package | Branch | Status | Definition of done |
| --- | --- | --- | --- |
| WP01: Design token foundation | `feat/wp01-design-token-foundation` | Approved | Canonical tokens generate deterministic CSS, TypeScript, Tailwind and Figma artifacts; validation, lint, typecheck and production build pass; no Design Lab or product components are created. |
| WP02: Design Lab foundations | `feat/wp02-design-lab-foundations` | Approved | The internal, no-index Design Lab shell consumes only approved tokens and documents colour, typography, spacing, radius, grid, elevation, motion and focus across the required viewports. |
| WP03: Layout primitives | `feat/wp03-layout-primitives` | Approved | Twelve token-only layout primitives expose stable composition APIs and are documented with responsive, accessible specimens at `/design-lab/layout`. |
| WP04: Controls and brand primitives | `feat/wp04-controls-brand-primitives` | Approved | Twelve core controls and thirteen signature primitives expose complete states, accessible interaction and token-only styling in dedicated Design Lab routes. |
| WP05: Signature composition exploration | `feat/wp05-signature-exploration` | Approved | Eight signature composition families each present three structurally distinct, static-first directions at desktop and mobile, with one owner-approved direction per family and retained decision history. |
| WP06: Programme identity | `feat/wp06-programme-identity` | Approved | The approved course-system direction becomes a coherent programme family without assembling a public page or starting production integrations. |
| WP07: Trust, conversion and forms | `feat/wp07-trust-conversion-forms` | Approved | Credibility, audience, instructor, newsletter, waitlist and contact families work in Design Lab with typed form sessions, no fake success and no public pages. |

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
