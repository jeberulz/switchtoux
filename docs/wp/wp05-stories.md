# WP05 stories: Signature composition exploration

## WP05-S01: Exploration model

**File scope:** `src/design-system/explorations/**`

Acceptance criteria:

- Define Ecosystem Hero, Grounded Design System, Course Ecosystem, Artefact Evidence Board, Changing Role Timeline, Learning Model, Instructor Split, and Final Convergence CTA and footer relationship.
- Provide three structurally distinct directions per family with stable IDs.
- Record a concise rationale, composition description, accessibility notes, motion notes, complexity note, recommendation, and trade-offs for every direction.
- Mark recommendations as guidance only. The owner selects the final direction or hybrid.
- Keep exploration work separate from the approved component exports.

## WP05-S02: Static composition previews

**File scope:** `src/design-system/explorations/**`

Acceptance criteria:

- Render all twenty-four directions as real token-backed structures.
- Show an explicit desktop and mobile preview for every direction.
- Directions differ in information architecture and spatial composition, not only styling.
- Reuse approved layout, control, and brand primitives where their semantics fit.
- Keep every relationship understandable without motion, imagery, canvas, or WebGL.

## WP05-S03: Design Lab decision board

**File scope:** `src/app/(design-lab)/design-lab/explorations/**`, Design Lab shell and overview

Acceptance criteria:

- Add `/design-lab/explorations` to the no-index internal workspace.
- Group directions by signature family and keep each stable direction ID visible.
- Present design evidence beside the preview without turning the page into a repeated generic card grid.
- Preserve legibility and document containment at 320, 375, 768, 1024, 1280 and 1440px.
- Reflow cleanly at a 200% zoom equivalent and remain complete under reduced motion.

## WP05-S04: Verification and approval boundary

**File scope:** `tests/design-system/**`, work-package documentation

Acceptance criteria:

- Tests verify eight families, twenty-four unique directions, two preview modes per direction, and complete decision evidence.
- Token validation, clean generation, lint, type checking, tests and an isolated production build pass.
- Browser review checks desktop, mobile, keyboard navigation, focus visibility, reduced motion and horizontal overflow.
- Visible copy contains no fabricated proof, testimonials, student work, or ambiguous claims.
- Work stops for owner selection. Programme, trust, form, editorial, Figma and public-page work remain excluded.

## WP05 definition of done

- All eight exploration sets are available in the Design Lab with three meaningful directions each.
- Every direction has enough static, responsive and accessibility evidence for a selection decision.
- Rejected directions remain available for comparison until the owner selects a direction or hybrid for each family.
- No direction is promoted into the approved component library during this work package.
