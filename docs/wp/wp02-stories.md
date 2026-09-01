# WP02 stories: Design Lab foundations

## WP02-S01: Internal lab shell

**File scope:** `src/app/(design-lab)/design-lab/**`

Acceptance criteria:

- `/design-lab` and `/design-lab/foundations` use a dedicated internal shell.
- Metadata sets `noindex, nofollow`.
- `DESIGN_LAB_ENABLED=false` disables the route group.
- Desktop navigation is persistent and mobile navigation uses an accessible disclosure.
- The public starter page remains unchanged.

## WP02-S02: Foundation specimen boards

Acceptance criteria:

- Colour, typography, spacing, radius, grid, elevation, motion and focus are shown as real token consumers.
- Visible values come from the generated TypeScript token interface.
- Styling consumes generated CSS variables and does not introduce a second visual system.
- No reusable product component is created.

## WP02-S03: Lab inspection controls

Acceptance criteria:

- Responsive preview widths cover 320, 375, 768, 1024, 1280 and 1440 pixels.
- Preview backgrounds cover canvas, surface and raised surface.
- Reduced-motion simulation is available and clearly reported.
- Controls have keyboard-visible focus and minimum target sizing.

## WP02 definition of done

- Token generation and validation remain clean.
- Lint, type checking, tests and production build pass.
- The real route is inspected at every required viewport, at 200% zoom and with reduced motion.
- The owner reviews the foundations route before Figma work starts.
