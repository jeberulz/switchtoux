# WP06 stories: Programme identity

## WP06-S01: Programme fixture model

**File scope:** `src/design-system/components/programmes/**`

Acceptance criteria:

- Define the six release-one courses and six workshops from approved product copy.
- Keep every programme in the `coming-soon` state and label every format as planned.
- Provide stable interest slugs for every programme CTA.
- Group specialist courses by judgment, making and trust to support the approved `COURSE-B` capability constellation.
- Do not add CMS, form-provider or enrolment behaviour.

## WP06-S02: Course identity components

**File scope:** `src/design-system/components/programmes/**`, component exports

Acceptance criteria:

- Build the flagship course feature, specialist course card, foundation entry route, progression map, status block, metadata panel, outcome statement, outputs list and programme waitlist CTA.
- Keep the flagship visually dominant and avoid six equal generic cards.
- Preserve semantic headings, lists, links and readable source order without relying on connector geometry.
- Support long titles and outcomes at 320px without horizontal overflow.

## WP06-S03: Workshop and artefact identity

**File scope:** `src/design-system/components/programmes/**`

Acceptance criteria:

- Build a featured workshop panel, workshop schedule board and rows, team training panel and workshop actions.
- Implement the approved `ARTEFACT-B` evidence index with a large selected evidence plane on desktop and complete stacked content on mobile.
- Label every unproven artefact example `SAMPLE COURSE ARTEFACT`.
- Keep the static experience complete; interaction may enhance inspection but may not gate content on mobile.

## WP06-S04: Design Lab gate and verification

**File scope:** `src/app/(design-lab)/design-lab/programmes/**`, Design Lab shell and overview, `tests/design-system/**`, work-package documentation

Acceptance criteria:

- Add `/design-lab/programmes` to the no-index workspace and navigation.
- Present course, workshop and artefact specimens with component IDs and usage notes.
- Validate 320, 375, 768, 1024, 1280 and 1440px, keyboard focus, 200% zoom and reduced motion.
- Token validation, generated-output freshness, lint, type checking, tests and production build pass.
- Stop for owner approval before trust, conversion, form, editorial, Figma or public-page work.

## WP06 definition of done

- Six courses read as one capability system with a dominant flagship, four connected specialist routes and one foundation entry.
- Six workshops read as a schedule or programme board, not a repeated card grid.
- Course outputs and sample artefacts demonstrate the approved evidence-index direction.
- Every course and workshop action carries the correct fixture interest slug.
- No public page, CMS schema, production integration or Figma object is created.
