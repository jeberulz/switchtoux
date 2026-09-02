# WP08 progress: Course learning and editorial

**Branch:** `feat/wp08-course-learning-editorial`
**Status:** Approved by owner

## Story status

- [x] WP08-S01 Typed learning and editorial fixtures
- [x] WP08-S02 Course learning components
- [x] WP08-S03 Editorial and interior components
- [x] WP08-S04 Design Lab gate and verification

## Scope notes

- WP07 was approved and pushed before this branch began.
- The Design Lab is the only consumer in this work package.
- Existing programme fixtures remain the source for the six-course comparison.
- Static typed article content proves the editorial API; production MDX and CMS work remain deferred.
- Figma remains deferred to the final design-system batch under R-007.
- Public pages and production integrations remain excluded.

## Verification

Lab routes `/design-lab/learning` and `/design-lab/editorial` were exercised in a real browser.

- At 320, 375, 768, 1024, 1280 and 1440px, the document width equals the viewport width.
- Curriculum ledgers and the comparison table switch to disclosures and labelled comparison rows below 900px.
- Course navigation, the waitlist bar and article contents return to normal document flow on smaller screens.
- Course disclosures expose correct expanded state and reveal their associated panel.
- The article column remains at or below the canonical 680px reading width.
- The five-theme map switches from a horizontal route to an in-flow vertical route.
- The 720px effective viewport used by a 1440px display at 200% zoom remains overflow-free and puts sticky controls in flow.
- New WP08 patterns introduce no autonomous motion; shared interactive controls retain the approved reduced-motion treatment.
- The browser console reports no warnings or errors.
- Token validation, token freshness, lint, type checking, 77 tests and the production build pass.

The owner approved WP08 on 2 September 2026 and directed the completed work to be committed and pushed. System-state work, Figma, CMS, production providers and public pages remain out.

## Design read

- Mode: greenfield component-system development inside the approved dark visual foundation.
- Design variance: 6, using asymmetric editorial composition and connected learning ledgers.
- Motion intensity: 2, static-first with restrained hover and focus traces.
- Visual density: 7, prioritising real learning and publishing content with controlled reading width.
