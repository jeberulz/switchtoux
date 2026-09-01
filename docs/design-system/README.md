# Switch to UX design tokens

The JSON documents in `src/design-system/tokens/` are the only editable source of design-token values. Generated CSS, TypeScript, Figma metadata and reports are disposable artifacts.

## Scope

WP01 contains the token foundation. WP02 adds the internal Design Lab shell and foundation specimens as the first token consumer. Product components, public page assembly, Figma mutations and production integrations remain excluded.

## Token layers

- `primitives.json`: raw, context-free values.
- `semantic.json`: background, surface, text, border, action, status, focus, layout and layering roles. These alias primitives.
- `typography.json`: Inter and JetBrains Mono families plus complete text-role properties.
- `motion.json`: semantic duration and easing roles plus the reduced-motion outcome.
- `component.json`: stable component values already fixed by the visual specification. These alias earlier layers.
- `figma-map.json`: Figma collection rules, CSS names and Tailwind aliases.

## Generated interfaces

Run:

```bash
npm run design:tokens
```

This replaces the contents of `src/design-system/generated/`:

- `tokens.css`: canonical CSS variables and Tailwind 4 aliases.
- `tokens.ts`: resolved `tokens`, `cssVariables`, `TokenId`, `TypographyRole`, `BreakpointName` and `MotionRole` interfaces.
- `figma-map.json`: one Figma-ready entry for every canonical token.
- `token-report.json`: deterministic integrity and WCAG contrast evidence.

Never edit generated files. Change the source JSON and regenerate.

## Required workflow

1. Change the smallest appropriate canonical source.
2. Run `npm run design:tokens`.
3. Run `npm run design:tokens:validate`.
4. Run `npm run design:tokens:check` to prove generated files are current.
5. Run `npm run test:tokens`, `npm run typecheck`, `npm run lint` and `npm run build`.
6. Review the generated report before approval or Figma sync.

Semantic or component tokens must alias earlier layers rather than copy raw values. New component tokens require a stable, repeated design decision; do not create a component token for a one-off exploration.

## Consumption rules

- CSS consumes the generated custom properties.
- Tailwind uses the generated `canvas`, `panel`, `panel-raised`, `ink`, `ink-secondary`, `ink-muted`, `brand`, `brand-hover` and `brand-pressed` aliases.
- TypeScript consumers import from `@/design-system/generated/tokens`.
- Future files under `src/design-system/components/` may not contain raw colour, dimension, duration or easing literals. `npm run design:tokens:usage` enforces this boundary.

## Design Lab

- `/design-lab` provides the internal gate overview.
- `/design-lab/foundations` renders colour, typography, spacing, radius, layout, grid, elevation, motion, focus and contrast evidence.
- Both routes emit `noindex, nofollow` metadata.
- Set `DESIGN_LAB_ENABLED=false` at build time to render the route group as not found in production.

## Figma boundary

The generated Figma map is preparation metadata only. No Figma object exists yet. After code-token approval, inspect the user-provided Figma file, present a read-only gap analysis, and obtain approval before creating variables or styles.
