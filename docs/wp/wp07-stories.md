# WP07 stories: Trust, conversion and forms

## WP07-S01: Waitlist interest allowlist

**File scope:** `src/design-system/components/programmes/programme-data.ts`

Acceptance criteria:

- Derive waitlist interest slugs from the six course fixtures, six workshop fixtures and `all-courses`.
- Invalid or missing interest values normalise to `all-courses`.
- Do not add CMS, Beehiiv, Resend, Turnstile or public waitlist routes.

## WP07-S02: Trust and conversion compositions

**File scope:** `src/design-system/components/trust/**`

Acceptance criteria:

- Build `CredibilityRail`, `AudienceRouteRows`, `InstructorSplit` (`INSTRUCTOR-A`), `RoseNewsletterBlock` and `FinalConvergenceCTA` (`CTA-A`).
- Credibility is one bordered rail, not a card grid. Desktop is one row. Mobile is a two-column grid.
- Audience routes are three large rows with index, problem, destination and action. They are not small cards.
- Instructor uses the 5/7 split, a deliberate photography-pending placeholder and career companies as text. Do not fabricate a portrait or alt text.
- Newsletter uses the strongest rose surface, black text, a compact form slot and a black submit control. It must not contain the course waitlist.
- Convergence draws three labelled paths to one waitlist action using `ProgrammeWaitlistCTA` and `interest=all-courses`.
- Support 320px without horizontal overflow.

## WP07-S03: Form primitives and sessions

**File scope:** `src/design-system/components/forms/**`

Acceptance criteria:

- Export `FieldWrapper`, `TextInput`, `EmailInput`, `Textarea`, `Select`, `Checkbox`, `ProgrammeSelector`, `FormErrorSummary`, `SpamProtectionSlot`, `FormSubmitButton`, `InlineNewsletterForm`, `WaitlistForm`, `ContactForm`, `SuccessPanel` and `SubmissionErrorPanel`.
- Model each form as a `FormSession` discriminated union. Success cannot coexist with an editable form. Provider failure keeps the submitted values.
- Parse unknown input at the form boundary. Optional newsletter consent is never implied by waitlist submission.
- Team enquiry is `ContactForm` with enquiry type `team-training`, not a second form component.
- `SpamProtectionSlot` reserves a Turnstile mount and includes a visually hidden honeypot. Do not call a provider.
- Native select. Labels stay visible. Field height uses `--component-field-height`. Errors are associated and announced.
- Success appears only after the injected submit adapter resolves `{ ok: true }`.

## WP07-S04: Design Lab gate and verification

**File scope:** `src/app/(design-lab)/design-lab/trust/**`, `src/app/(design-lab)/design-lab/forms/**`, Design Lab shell and overview, `tests/design-system/**`, work-package documentation

Acceptance criteria:

- Add `/design-lab/trust` and `/design-lab/forms` to the no-index workspace and navigation.
- Trust specimens show the approved compositions with component IDs.
- Form specimens show empty, partial, invalid, submitting, provider-failure, preserved-input and success replacement states.
- Validate 320, 375, 768, 1024, 1280 and 1440px, keyboard focus, 200% zoom and reduced motion.
- Token validation, generated-output freshness, lint, type checking, tests and production build pass.
- Stop for owner approval before editorial, Figma or public-page work.

## WP07 definition of done

- Credibility, audience, instructor, newsletter and convergence read as one conversion system, not a card kit.
- Waitlist, newsletter and contact forms share field primitives and a typed session model.
- No fake success. Provider failure preserves input. Newsletter consent stays independent.
- No public page, CMS schema, production integration or Figma object is created.
