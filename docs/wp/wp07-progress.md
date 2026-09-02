# WP07 progress: Trust, conversion and forms

**Branch:** `feat/wp07-trust-conversion-forms`
**Status:** In progress

## Story status

- [x] WP07-S01 Waitlist interest allowlist
- [x] WP07-S02 Trust and conversion compositions
- [x] WP07-S03 Form primitives and sessions
- [x] WP07-S04 Design Lab gate and verification

## Scope notes

- WP06 was approved and pushed before this branch began.
- `INSTRUCTOR-A` and `CTA-A` control instructor and convergence composition.
- Forms use an injected submit adapter. Beehiiv, Resend and Turnstile remain out of scope.
- Figma remains deferred to the final design-system batch.
- Public pages, CMS and production integrations remain excluded.

## Verification

Lab routes `/design-lab/trust` and `/design-lab/forms` were exercised in a real browser.

- Empty waitlist submit produces the error summary; fragment links resolve (`querySelector` hits, no `:` in field ids).
- Success replaces fields (`role="status"`). Provider failure keeps Ada. Team training is selected on `ContactForm`.
- Honeypot is `1×1`, `aria-hidden`, `tabIndex=-1`. Instructor has no `<img`. Convergence is `/waitlist?interest=all-courses`.
- Rose newsletter success inherits on-action text (`rgb(9, 9, 11)` on `rgb(219, 88, 111)`). 320px `scrollWidth === clientWidth`.
- Console only reports missing `/favicon.ico`. No hydration overlay after dropping explicit `aria-live` on `SuccessPanel` (`role="status"` is the live region).

Stopped for owner approval. Editorial, Figma and public pages are still out.

## Design read

- Mode: greenfield component-system development inside an approved visual foundation.
- Design variance: 6, using a rose newsletter event against an otherwise black conversion close.
- Motion intensity: 2, static-first with hover or focus traces on audience rows and convergence paths.
- Visual density: 6, realistic form and trust copy without assembling public pages.
