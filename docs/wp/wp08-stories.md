# WP08 stories: Course learning and editorial

## WP08-S01: Typed learning and editorial fixtures

**File scope:** `src/design-system/components/learning/**`, `src/design-system/components/editorial/**`

Acceptance criteria:

- Model the seven flagship modules, course FAQs, tool context and existing six-course portfolio as typed local fixtures.
- Model the six approved resources with explicit `published` or `coming-soon` state.
- Include the verified founder career sequence, five teaching principles and five newsletter themes without invented dates, metrics or published issues.
- Keep CMS, MDX compilation, production providers and public routes out of scope.

## WP08-S02: Course learning components

**File scope:** `src/design-system/components/learning/**`

Acceptance criteria:

- Build `CurriculumModuleRow`, `CurriculumAccordion`, `ToolContextList`, `InstructorCourseBlock`, `CourseFAQGroup`, `CourseComparisonTable`, `CourseComparisonRows`, `CourseInPageNavigation`, `StickyWaitlistBar` and `RelatedCourseRoute`.
- Keep module numbers and titles visible when descriptions collapse on small screens.
- Use a semantic desktop table and labelled mobile comparison blocks from the same data.
- Sticky navigation and waitlist controls become in-flow below the desktop breakpoint.
- Preserve the existing `ProgrammeWaitlistCTA` interest allowlist and do not create a public waitlist page.

## WP08-S03: Editorial and interior components

**File scope:** `src/design-system/components/editorial/**`

Acceptance criteria:

- Build the complete `EDT-01` to `EDT-16` editorial family.
- Build `FounderCareerTimeline`, `TeachingPrinciplesSection` and `NewsletterThemesMap`.
- Resource layout uses one seven-column feature and a vertical list, never a generic card grid.
- Article prose is capped by the canonical article reading width. The table of contents is sticky only on wide screens.
- Coming-soon resources cannot imply publication metadata or link to a finished article.
- Code, prompt, evidence and download specimens remain readable, keyboard reachable and token-only.

## WP08-S04: Design Lab gate and verification

**File scope:** `src/app/(design-lab)/design-lab/learning/**`, `src/app/(design-lab)/design-lab/editorial/**`, Design Lab shell and overview, `tests/design-system/**`, work-package documentation

Acceptance criteria:

- Add `/design-lab/learning` and `/design-lab/editorial` to the no-index workspace and navigation.
- Show realistic full-density specimens without assembling a public course, resource, about or newsletter page.
- Validate 320, 375, 768, 1024, 1280 and 1440px, keyboard focus, 200% zoom and reduced motion.
- Token validation, generated-output freshness, lint, type checking, tests and production build pass.
- Stop for owner approval before system states, Figma or public-page work.

## WP08 definition of done

- Course learning stays understandable without desktop-only layout or interaction.
- Published and coming-soon editorial states are unmistakable.
- Long-form reading, evidence and downloadable patterns form one coherent editorial system.
- No public page, CMS schema, provider integration or Figma object is created.
