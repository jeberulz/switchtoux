# WP07 architecture

Do not rewrite this file during implementation. It is the contract.

## Problem

WP06 owns programme identity and a link-only `ProgrammeWaitlistCTA`. WP07 has to make trust and conversion real inside Design Lab without standing up Beehiiv, Resend, Turnstile or public routes. The hard part is the form lifecycle. Boolean soup (`isSubmitting` plus `isSuccess` plus `hasError`) lets success replace a form that still holds unsaved values, or a failure that looks like success. The compositions themselves are already chosen: `INSTRUCTOR-A`, `CTA-A`, credibility rail, audience rows, rose newsletter.

## How the current system works

Programme fixtures live in `src/design-system/components/programmes/programme-data.ts`. Every course and workshop already has a stable interest slug. `ProgrammeWaitlistCTA` only renders a `TextLink` to `/waitlist?interest={slug}`. That link is allowed. A public `/waitlist` page is not.

Controls already give `Button` with `loading`, `TextLink`, `StatusBadge` and focus rings. There are no field primitives. Layout already has `SplitLayout` at `5/7` and `SurfacePanel`. Token usage lint forbids hex, rgb, px and ms inside `src/design-system/components/**`. Field height is `--component-field-height`. Textarea minimum is `--component-field-textarea-minimum`.

Design Lab routes follow the programmes pattern: a page under `src/app/(design-lab)/design-lab/<gate>/`, CSS beside it, a nav entry in `design-lab-chrome.tsx`. Tests use `renderToStaticMarkup` plus vitest. There is no React Testing Library.

## Usage

```tsx
<InstructorSplit instructor={instructorFixture} />
<RoseNewsletterBlock>
  <InlineNewsletterForm submit={createLabSubmit("success")} />
</RoseNewsletterBlock>
<FinalConvergenceCTA />

<WaitlistForm
  initialInterest={normalizeWaitlistInterest(searchParams.interest)}
  submit={createLabSubmit("provider-failure")}
/>

<ContactForm
  initialEnquiryType="team-training"
  submit={createLabSubmit("success")}
/>
```

Lab pages pass `createLabSubmit`. Production adapters are out of scope.

## Shape

### Interest allowlist

`WaitlistInterestSlug` is `all-courses` plus every programme and workshop slug. `normalizeWaitlistInterest` is the only way unknown query values enter a form.

### Form session

```ts
type FormSession<TValues> =
  | { phase: "editing"; values: TValues; errors: FieldErrors<TValues> }
  | { phase: "submitting"; values: TValues }
  | { phase: "success"; values: TValues; confirmation: string }
  | { phase: "provider-failure"; values: TValues; errorId: string; message: string };
```

`errors` exist only in `editing`. Success replaces the form with `SuccessPanel`. Provider failure keeps the fields mounted with the same `values` and shows `SubmissionErrorPanel`. Contact failure also offers `mailto:hello@switchtoux.com`.

### Boundary parse

Unknown input is `Record<string, FormDataEntryValue>`. Each form has a pure `parseX(input)` that returns `{ ok: true, values } | { ok: false, values, errors }`. Client submit calls parse first. The adapter is invoked only on `{ ok: true }`. Do not add Zod in this package. The parse functions are the schema. API routes can wrap them later.

### Submit adapter

```ts
type SubmitResult =
  | { ok: true; confirmation: string }
  | { ok: false; errorId: string; message: string };

type SubmitAdapter<TValues> = (values: TValues) => Promise<SubmitResult>;
```

`createLabSubmit(outcome)` in the forms module is the Design Lab fixture. It must delay briefly so the submitting phase is visible, then resolve. It must not call a network.

### Newsletter consent

`WaitlistValues.newsletterConsent` defaults to `false`. Checking the waitlist privacy/consent box must not set it. `InlineNewsletterForm` is a separate component and a separate parse path.

### Team enquiry

`EnquiryType` includes `team-training`. `ContactForm` takes `initialEnquiryType`. Do not create `TeamEnquiryForm`.

### Compositions

- `CredibilityRail`: definition list, top and bottom borders, no cards.
- `AudienceRouteRows`: ordered list of three rows. Hover or focus moves the arrow and brightens the row rule, not the whole row.
- `InstructorSplit`: `SplitLayout` `5/7`. Placeholder is not an `img`. Career rail is a list of company plus role text.
- `RoseNewsletterBlock`: rose background, on-action text. Form is `children`. Submit inside the child uses a black canvas button with primary text, not the rose `Button` primary.
- `FinalConvergenceCTA`: three labelled paths, one `ProgrammeWaitlistCTA` for `all-courses`. Connectors are decorative. The action remains readable without them. No footer.

### Modules

```
src/design-system/components/forms/
  schema.ts          // unions, parse functions, createLabSubmit
  form-session.ts    // hook or reducer over FormSession
  form-fields.tsx    // FRM-01 to FRM-10, FRM-14, FRM-15
  form-compositions.tsx
  forms.module.css
  index.ts

src/design-system/components/trust/
  trust-data.ts
  trust-compositions.tsx
  trust.module.css
  index.ts
```

Forms may import programmes. Trust may import forms and programmes. Programmes must not import forms or trust.

## Synthesis decision

Base: typed `FormSession` plus pure parse functions plus an injected adapter.

Rejected React Hook Form plus Zod. It would add a dependency before any API route exists, and it hides the session in library state. Callers in Design Lab need to pin empty, invalid, submitting, failure and success as specimens. A discriminated union makes those specimens props, not plugin config.

Rejected per-form booleans. `isSuccess && isSubmitting` compiles. The session type does not.

## Tradeoffs accepted

- We accept a local parse module instead of Zod in exchange for no new dependency until the API package.
- We accept two Design Lab routes instead of one in exchange for form-state density that would bury the trust compositions.
- We accept a children slot on `RoseNewsletterBlock` instead of importing the form inside the composition, so the rose surface can render without a client form when needed.

## Alternatives considered

- One mega `/design-lab/conversion` route. Lost because eight form states plus five compositions make a single scroll unusable for review.
- Rebuilding waitlist CTAs inside convergence. Lost because `ProgrammeWaitlistCTA` already owns the interest URL.

## Open questions and risks

- Founder photography is still missing. The placeholder is the product, not a temporary hack. Public launch still needs the real portrait.
- `createLabSubmit` delay is a specimen aid. It is not a performance budget.

## Next implementation step

Add the interest allowlist to programme data, then form schema and field primitives before any trust composition.
