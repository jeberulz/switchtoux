"use client";

import Link from "next/link";
import {
  Checkbox,
  ContactForm,
  createLabSubmit,
  EmailInput,
  emptyWaitlistValues,
  experienceLevels,
  FieldWrapper,
  InlineNewsletterForm,
  Select,
  Textarea,
  TextInput,
  WaitlistForm,
  type FormSession,
  type WaitlistValues,
} from "@/design-system/components/forms";
import {
  PageContainer,
  SplitLayout,
  SurfacePanel,
} from "@/design-system/components/layout";
import { RoseNewsletterBlock } from "@/design-system/components/trust";

const adaValues: WaitlistValues = {
  ...emptyWaitlistValues(),
  email: "ada@example.com",
  experience: "3-5",
  firstName: "Ada",
  learningGoal: "Ship a grounded prototype",
  role: "Product designer",
  waitlistConsent: true,
};

const invalidWaitlistSession: FormSession<WaitlistValues> = {
  phase: "editing",
  values: emptyWaitlistValues(),
  errors: {
    email: "Enter a valid email address.",
    experience: "Select your experience level.",
    firstName: "Enter your first name.",
    learningGoal: "Describe what you want to learn.",
    role: "Enter your current role.",
    waitlistConsent: "Confirm you want programme emails for this waitlist.",
  },
};

const submittingWaitlistSession: FormSession<WaitlistValues> = {
  phase: "submitting",
  values: adaValues,
};

const failedWaitlistSession: FormSession<WaitlistValues> = {
  errorId: "lab-provider-unavailable",
  message: "The provider did not accept this submission. Your answers are still here.",
  phase: "provider-failure",
  values: adaValues,
};

const successWaitlistSession: FormSession<WaitlistValues> = {
  confirmation: "Saved. Check your inbox for the next note.",
  phase: "success",
  values: adaValues,
};

const componentGroups = [
  {
    ids: "FRM-01 to FRM-10",
    label: "Field primitives",
    note: "Visible labels, native select, associated errors and a honeypot plus Turnstile mount",
  },
  {
    ids: "FRM-11 to FRM-13",
    label: "Form compositions",
    note: "Newsletter, waitlist and contact share one FormSession. Team enquiry is ContactForm.",
  },
  {
    ids: "FRM-14, FRM-15",
    label: "Outcomes",
    note: "Success replaces the fields. Provider failure keeps values and shows the error panel.",
  },
] as const;

export function FormsLab() {
  const liveSubmit = createLabSubmit("success");
  const failureSubmit = createLabSubmit("provider-failure");

  return (
    <PageContainer className="forms-page" width="atmospheric">
      <header className="forms-hero">
        <p className="forms-kicker">Conversion forms gate</p>
        <h1>Consent is explicit. Failure keeps the work.</h1>
        <p>
          Waitlist, newsletter and contact share field primitives and a typed
          session. Success cannot sit on an editable form.
        </p>
      </header>

      <nav aria-label="Forms sections" className="forms-index">
        <Link href="#waitlist">Waitlist</Link>
        <Link href="#contact">Contact</Link>
        <Link href="#newsletter">Newsletter</Link>
        <Link href="#fields">Fields</Link>
      </nav>

      <section aria-labelledby="forms-inventory-heading" className="forms-inventory">
        <header>
          <h2 id="forms-inventory-heading">Component boundary</h2>
          <p>Lab adapters only. No Beehiiv, Resend, Turnstile provider or public routes.</p>
        </header>
        <div>
          {componentGroups.map((group) => (
            <article key={group.ids}>
              <span>{group.ids}</span>
              <strong>{group.label}</strong>
              <p>{group.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="waitlist-heading" className="forms-section" id="waitlist">
        <header className="forms-section-header">
          <h2 id="waitlist-heading">Waitlist form</h2>
          <p>
            <code>FRM-12</code> pins empty, invalid, submitting, provider-failure and
            success replacement as specimens.
          </p>
        </header>
        <SplitLayout ratio="5/7">
          <div className="forms-privacy">
            <p className="forms-kicker">Privacy expectation</p>
            <h3>Programme mail is not the newsletter.</h3>
            <p>
              Waitlist emails cover the selected programme only. Checking waitlist
              consent does not subscribe anyone to Design With AI. Newsletter consent
              is a second, independent checkbox.
            </p>
          </div>
          <SurfacePanel>
            <WaitlistForm submit={liveSubmit} />
          </SurfacePanel>
        </SplitLayout>
        <div className="forms-specimens">
          <article className="forms-specimen">
            <h3>Invalid</h3>
            <SurfacePanel>
              <WaitlistForm initialSession={invalidWaitlistSession} submit={liveSubmit} />
            </SurfacePanel>
          </article>
          <article className="forms-specimen">
            <h3>Submitting</h3>
            <SurfacePanel>
              <WaitlistForm initialSession={submittingWaitlistSession} submit={liveSubmit} />
            </SurfacePanel>
          </article>
          <article className="forms-specimen">
            <h3>Provider failure</h3>
            <SurfacePanel>
              <WaitlistForm initialSession={failedWaitlistSession} submit={failureSubmit} />
            </SurfacePanel>
          </article>
          <article className="forms-specimen">
            <h3>Success replacement</h3>
            <SurfacePanel>
              <WaitlistForm initialSession={successWaitlistSession} submit={liveSubmit} />
            </SurfacePanel>
          </article>
        </div>
      </section>

      <section aria-labelledby="contact-heading" className="forms-section" id="contact">
        <header className="forms-section-header">
          <h2 id="contact-heading">Contact form</h2>
          <p>
            <code>FRM-13</code> is the only enquiry form. Team training is an enquiry
            type, not a second component.
          </p>
        </header>
        <div className="forms-specimens">
          <article className="forms-specimen">
            <h3>Default contact</h3>
            <SurfacePanel>
              <ContactForm submit={liveSubmit} />
            </SurfacePanel>
          </article>
          <article className="forms-specimen">
            <h3>Team training</h3>
            <SurfacePanel>
              <ContactForm initialEnquiryType="team-training" submit={liveSubmit} />
            </SurfacePanel>
          </article>
        </div>
      </section>

      <section aria-labelledby="newsletter-heading" className="forms-section" id="newsletter">
        <header className="forms-section-header">
          <h2 id="newsletter-heading">Inline newsletter</h2>
          <p>
            <code>FRM-11</code> sits in <code>CMP-12</code>. Submit uses the canvas
            button on rose.
          </p>
        </header>
        <RoseNewsletterBlock>
          <InlineNewsletterForm submit={liveSubmit} />
        </RoseNewsletterBlock>
      </section>

      <section aria-labelledby="fields-heading" className="forms-section" id="fields">
        <header className="forms-section-header">
          <h2 id="fields-heading">Field primitives</h2>
          <p>
            <code>FRM-01</code> to <code>FRM-07</code> in empty, filled, invalid and
            disabled states.
          </p>
        </header>
        <div className="forms-gallery">
          <article>
            <h3>Empty</h3>
            <FieldWrapper htmlFor="gallery-empty" label="First name">
              <TextInput name="gallery-empty" />
            </FieldWrapper>
            <FieldWrapper htmlFor="gallery-empty-email" label="Email">
              <EmailInput name="gallery-empty-email" />
            </FieldWrapper>
          </article>
          <article>
            <h3>Filled</h3>
            <FieldWrapper htmlFor="gallery-filled" label="First name">
              <TextInput defaultValue="Ada" name="gallery-filled" />
            </FieldWrapper>
            <FieldWrapper htmlFor="gallery-filled-goal" label="Learning goal">
              <Textarea defaultValue="Ship a grounded prototype" name="gallery-filled-goal" />
            </FieldWrapper>
          </article>
          <article>
            <h3>Invalid</h3>
            <FieldWrapper
              error="Enter your first name."
              htmlFor="gallery-invalid"
              label="First name"
            >
              <TextInput name="gallery-invalid" />
            </FieldWrapper>
            <FieldWrapper
              error="Select your experience level."
              htmlFor="gallery-invalid-select"
              label="Experience level"
            >
              <Select
                name="gallery-invalid-select"
                options={[{ value: "", label: "Select your experience level" }, ...experienceLevels]}
              />
            </FieldWrapper>
            <Checkbox
              error="Confirm you want programme emails for this waitlist."
              id="gallery-invalid-check"
              label="Send me programme emails for the selected waitlist. This is not the newsletter."
              name="gallery-invalid-check"
            />
          </article>
          <article>
            <h3>Disabled</h3>
            <FieldWrapper htmlFor="gallery-disabled" label="First name">
              <TextInput defaultValue="Ada" disabled name="gallery-disabled" />
            </FieldWrapper>
            <Checkbox
              defaultChecked
              disabled
              id="gallery-disabled-check"
              label="Send me programme emails for the selected waitlist. This is not the newsletter."
              name="gallery-disabled-check"
            />
          </article>
        </div>
      </section>

      <section aria-labelledby="forms-approval-heading" className="forms-approval">
        <div>
          <p className="forms-kicker">Approval boundary</p>
          <h2 id="forms-approval-heading">Review the conversion forms.</h2>
          <p>
            Editorial, Figma and public pages remain outside this gate.
          </p>
        </div>
        <Link href="#waitlist">Return to waitlist</Link>
      </section>
    </PageContainer>
  );
}
