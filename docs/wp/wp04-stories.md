# WP04 stories: Controls and brand primitives

## WP04-S01: Core controls

**File scope:** `src/design-system/components/controls/**`

Acceptance criteria:

- Export `Button`, `IconButton`, `TextLink`, `StatusBadge`, `CategoryLabel`, `MetadataItem`, `Tag`, `Accordion`, `DisclosureRow`, `ProgressIndicator`, `Tooltip` and `LoadingIndicator`.
- Buttons expose primary, secondary and text variants plus default, hover, active, focus and disabled behavior.
- Programme status is always communicated with text and maps to the approved semantic status roles.
- Accordion and disclosure triggers expose expanded state, controlled regions and full keyboard operation.
- Tooltip content supplements an already named control and never contains essential information.
- Every interactive target meets the approved minimum size and uses the two-stage focus treatment.

## WP04-S02: Signature brand primitives

**File scope:** `src/design-system/components/brand/**`

Acceptance criteria:

- Export `Wordmark`, `MonoEyebrow`, `EvidenceLabel`, `EvidenceLegend`, `SystemNode`, `SignalNode`, `ConnectionPath`, `NodeCluster`, `ProofLabel`, `ArtefactStamp`, `AtmosphericField`, `ConnectionTrace` and `SystemFrame`.
- Wordmark provides the approved desktop treatment and compact `S/UX` form without embedding itself in imagery.
- Evidence notation keeps stable labels for evidence, inference, assumption and unknown states.
- Nodes and paths remain understandable as static composition primitives without canvas or WebGL.
- Connection motion is optional, token-driven and disabled in reduced-motion mode.
- Components preserve native attributes and use generated token values only.

## WP04-S03: Design Lab workbenches

**File scope:** `src/app/(design-lab)/design-lab/**`

Acceptance criteria:

- `/design-lab/controls` renders every control, variant and meaningful state.
- `/design-lab/brand` renders every signature primitive in isolated and composed specimens.
- Short, long and missing optional content are represented where relevant.
- Public props, keyboard instructions, token dependencies, approval state and Figma deferral are visible.
- Navigation and the Design Lab overview link to both routes.

## WP04-S04: Verification

**File scope:** `tests/design-system/**`, work-package documentation

Acceptance criteria:

- Rendering tests cover variants, names, status text and signature semantics.
- Interaction tests cover accordion and disclosure state transitions.
- Browser checks cover focus, keyboard operation, reduced motion and no horizontal overflow at every required width.
- Controls and brand specimens remain legible at 200% zoom.
- Token checks, token-usage enforcement, lint, type checking, tests and production build pass.

## WP04 definition of done

- All twenty-five primitives meet their acceptance criteria.
- Canonical token values and the public starter page remain unchanged.
- No final signature composition, public page, Figma object or production integration is created.
- Work stops for owner review before the signature-composition exploration gate.
