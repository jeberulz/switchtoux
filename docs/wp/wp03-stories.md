# WP03 stories: Layout primitives

## WP03-S01: Stable layout APIs

**File scope:** `src/design-system/components/layout/**`

Acceptance criteria:

- Export `PageContainer`, `Section`, `Grid`, `SplitLayout`, `ContentStack`, `InlineCluster`, `SurfacePanel`, `FeaturePanel`, `StickyRail`, `HorizontalRail`, `Divider` and `SectionHeader`.
- `SplitLayout` supports 4/8, 5/7, 7/5, 8/4 and 3/9 ratios.
- Responsive behavior collapses multi-column composition below its approved breakpoint.
- Components accept native attributes and refs without requiring client rendering.
- All visual values resolve through generated semantic, component or primitive variables.

## WP03-S02: Layout Design Lab route

**File scope:** `src/app/(design-lab)/design-lab/**`

Acceptance criteria:

- `/design-lab/layout` renders every actual layout primitive.
- Specimens cover responsive grid columns, every split ratio, spacing, surfaces, sticky and horizontal overflow behavior.
- Supported props, responsive behavior and accessibility notes are visible.
- The lab navigation and overview include the new route.

## WP03-S03: Layout verification

**File scope:** `tests/design-system/**`, work-package documentation

Acceptance criteria:

- Server-rendered regression tests cover component semantics and variant classes.
- The token-usage guard scans the new component source without violations.
- The route has no horizontal document overflow at required viewports or 200% zoom.
- Keyboard focus and horizontal-rail operation remain visible and usable.
- Token checks, tests, lint, type checking and production build pass.

## WP03 definition of done

- All twelve primitives and the layout route meet their acceptance criteria.
- The starter page and canonical token values remain unchanged.
- Figma, controls, brand primitives, public pages and integrations remain outside WP03.
- Work stops for owner review before the control and brand work package.
