"use client";

import { useId, useReducer, type FormEvent as ReactFormEvent } from "react";
import {
  createFormSession,
  reduceFormSession,
  type FormEvent,
  type FormSession,
} from "./form-session";
import {
  emptyContactValues,
  emptyNewsletterValues,
  emptyWaitlistValues,
  enquiryTypes,
  experienceLevels,
  parseContact,
  parseNewsletter,
  parseWaitlist,
  type ContactValues,
  type EnquiryType,
  type FieldErrors,
  type NewsletterValues,
  type ParseResult,
  type SubmitAdapter,
  type WaitlistValues,
} from "./schema";
import {
  Checkbox,
  EmailInput,
  FieldWrapper,
  FormErrorSummary,
  FormSubmitButton,
  ProgrammeSelector,
  Select,
  SpamProtectionSlot,
  SubmissionErrorPanel,
  SuccessPanel,
  Textarea,
  TextInput,
  type FormErrorItem,
} from "./form-fields";
import type { WaitlistInterestSlug } from "../programmes";
import styles from "./forms.module.css";

function fieldIdPrefix(reactId: string) {
  return reactId.replaceAll(":", "");
}

function editingErrors<TValues>(session: FormSession<TValues>): FieldErrors<TValues> {
  return session.phase === "editing" ? session.errors : {};
}

function errorItems<TValues extends object>(
  errors: FieldErrors<TValues>,
  idFor: (key: string) => string,
): FormErrorItem[] {
  return (Object.entries(errors) as Array<[string, string | undefined]>)
    .filter((entry): entry is [string, string] => Boolean(entry[1]))
    .map(([key, message]) => ({ id: idFor(key), message }));
}

function useManagedSession<TValues>(initial: FormSession<TValues>) {
  return useReducer(
    (session: FormSession<TValues>, event: FormEvent<TValues>) =>
      reduceFormSession(session, event),
    initial,
  );
}

async function submitParsed<TValues>(
  parsed: ParseResult<TValues>,
  dispatch: (event: FormEvent<TValues>) => void,
  submit: SubmitAdapter<TValues>,
) {
  if (!parsed.ok && Object.keys(parsed.errors).length === 0) {
    dispatch({ type: "invalid", errors: {}, values: parsed.values });
    return;
  }

  if (!parsed.ok) {
    dispatch({ type: "invalid", errors: parsed.errors, values: parsed.values });
    return;
  }

  dispatch({ type: "submit" });
  const result = await submit(parsed.values);
  dispatch({ type: "result", result });
}

function formRecord(event: ReactFormEvent<HTMLFormElement>) {
  return Object.fromEntries(new FormData(event.currentTarget).entries());
}

const experienceOptions = [
  { value: "", label: "Select your experience level" },
  ...experienceLevels,
];

const enquiryOptions = [
  { value: "", label: "Select an enquiry type" },
  ...enquiryTypes,
];

export interface InlineNewsletterFormProps {
  initialSession?: FormSession<NewsletterValues>;
  initialValues?: Partial<NewsletterValues>;
  submit: SubmitAdapter<NewsletterValues>;
}

export function InlineNewsletterForm({
  initialSession,
  initialValues,
  submit,
}: InlineNewsletterFormProps) {
  const prefix = fieldIdPrefix(useId());
  const idFor = (key: string) => `${prefix}-${key}`;
  const [session, dispatch] = useManagedSession(
    initialSession ?? createFormSession({ ...emptyNewsletterValues(), ...initialValues }),
  );
  const errors = editingErrors(session);
  const submitting = session.phase === "submitting";

  if (session.phase === "success") {
    return (
      <div className={styles.newsletterForm}>
        <SuccessPanel
          confirmation={session.confirmation}
          heading="Newsletter request received."
        />
      </div>
    );
  }

  return (
    <form
      className={styles.newsletterForm}
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        void submitParsed(parseNewsletter(formRecord(event)), dispatch, submit);
      }}
    >
      <FormErrorSummary errors={errorItems(errors, idFor)} />
      <fieldset className={styles.fieldset} disabled={submitting}>
        <FieldWrapper error={errors.email} htmlFor={idFor("email")} label="Email">
          <EmailInput defaultValue={session.values.email} name="email" />
        </FieldWrapper>
        <FieldWrapper
          error={errors.firstName}
          hint="Optional"
          htmlFor={idFor("firstName")}
          label="First name"
        >
          <TextInput
            autoComplete="given-name"
            defaultValue={session.values.firstName}
            name="firstName"
          />
        </FieldWrapper>
        <SpamProtectionSlot />
        <FormSubmitButton loading={submitting} variant="onRose">
          Subscribe
        </FormSubmitButton>
      </fieldset>
      {session.phase === "provider-failure" ? (
        <SubmissionErrorPanel errorId={session.errorId} message={session.message} />
      ) : null}
    </form>
  );
}

export interface WaitlistFormProps {
  initialInterest?: WaitlistInterestSlug;
  initialSession?: FormSession<WaitlistValues>;
  initialValues?: Partial<WaitlistValues>;
  submit: SubmitAdapter<WaitlistValues>;
}

export function WaitlistForm({
  initialInterest,
  initialSession,
  initialValues,
  submit,
}: WaitlistFormProps) {
  const prefix = fieldIdPrefix(useId());
  const idFor = (key: string) => `${prefix}-${key}`;
  const [session, dispatch] = useManagedSession(
    initialSession ??
      createFormSession({
        ...emptyWaitlistValues(initialInterest),
        ...initialValues,
      }),
  );
  const errors = editingErrors(session);
  const submitting = session.phase === "submitting";

  if (session.phase === "success") {
    return (
      <SuccessPanel
        confirmation={session.confirmation}
        heading="Waitlist request received."
      />
    );
  }

  return (
    <form
      className={styles.form}
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        void submitParsed(parseWaitlist(formRecord(event)), dispatch, submit);
      }}
    >
      <FormErrorSummary errors={errorItems(errors, idFor)} />
      <fieldset className={styles.fieldset} disabled={submitting}>
        <FieldWrapper
          error={errors.interest}
          htmlFor={idFor("interest")}
          label="Programme"
        >
          <ProgrammeSelector defaultValue={session.values.interest} name="interest" />
        </FieldWrapper>
        <FieldWrapper error={errors.firstName} htmlFor={idFor("firstName")} label="First name">
          <TextInput
            autoComplete="given-name"
            defaultValue={session.values.firstName}
            name="firstName"
          />
        </FieldWrapper>
        <FieldWrapper error={errors.email} htmlFor={idFor("email")} label="Email">
          <EmailInput defaultValue={session.values.email} name="email" />
        </FieldWrapper>
        <FieldWrapper error={errors.role} htmlFor={idFor("role")} label="Current role">
          <TextInput defaultValue={session.values.role} name="role" />
        </FieldWrapper>
        <FieldWrapper
          error={errors.experience}
          htmlFor={idFor("experience")}
          label="Experience level"
        >
          <Select
            defaultValue={session.values.experience}
            name="experience"
            options={experienceOptions}
          />
        </FieldWrapper>
        <FieldWrapper
          error={errors.learningGoal}
          htmlFor={idFor("learningGoal")}
          label="What do you want to learn?"
        >
          <Textarea defaultValue={session.values.learningGoal} name="learningGoal" />
        </FieldWrapper>
        <p className={styles.privacyNote}>
          Waitlist emails cover the selected programme only. Newsletter consent is a
          separate checkbox.
        </p>
        <Checkbox
          defaultChecked={session.values.waitlistConsent}
          error={errors.waitlistConsent}
          id={idFor("waitlistConsent")}
          label="Send me programme emails for the selected waitlist. This is not the newsletter."
          name="waitlistConsent"
        />
        <Checkbox
          defaultChecked={session.values.newsletterConsent}
          error={errors.newsletterConsent}
          id={idFor("newsletterConsent")}
          label="Also subscribe to Design With AI. Newsletter mail is independent of waitlist mail."
          name="newsletterConsent"
        />
        <SpamProtectionSlot />
        <FormSubmitButton loading={submitting}>Join the waitlist</FormSubmitButton>
      </fieldset>
      {session.phase === "provider-failure" ? (
        <SubmissionErrorPanel errorId={session.errorId} message={session.message} />
      ) : null}
    </form>
  );
}

export interface ContactFormProps {
  initialEnquiryType?: EnquiryType | "";
  initialSession?: FormSession<ContactValues>;
  initialValues?: Partial<ContactValues>;
  submit: SubmitAdapter<ContactValues>;
}

export function ContactForm({
  initialEnquiryType,
  initialSession,
  initialValues,
  submit,
}: ContactFormProps) {
  const prefix = fieldIdPrefix(useId());
  const idFor = (key: string) => `${prefix}-${key}`;
  const [session, dispatch] = useManagedSession(
    initialSession ??
      createFormSession({
        ...emptyContactValues(initialEnquiryType),
        ...initialValues,
      }),
  );
  const errors = editingErrors(session);
  const submitting = session.phase === "submitting";

  if (session.phase === "success") {
    return (
      <SuccessPanel confirmation={session.confirmation} heading="Message received." />
    );
  }

  return (
    <form
      className={styles.form}
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        void submitParsed(parseContact(formRecord(event)), dispatch, submit);
      }}
    >
      <FormErrorSummary errors={errorItems(errors, idFor)} />
      <fieldset className={styles.fieldset} disabled={submitting}>
        <FieldWrapper error={errors.name} htmlFor={idFor("name")} label="Name">
          <TextInput autoComplete="name" defaultValue={session.values.name} name="name" />
        </FieldWrapper>
        <FieldWrapper error={errors.email} htmlFor={idFor("email")} label="Work email">
          <EmailInput defaultValue={session.values.email} name="email" />
        </FieldWrapper>
        <FieldWrapper
          error={errors.company}
          hint="Optional"
          htmlFor={idFor("company")}
          label="Company"
        >
          <TextInput
            autoComplete="organization"
            defaultValue={session.values.company}
            name="company"
          />
        </FieldWrapper>
        <FieldWrapper
          error={errors.enquiryType}
          htmlFor={idFor("enquiryType")}
          label="Enquiry type"
        >
          <Select
            defaultValue={session.values.enquiryType}
            name="enquiryType"
            options={enquiryOptions}
          />
        </FieldWrapper>
        <FieldWrapper error={errors.message} htmlFor={idFor("message")} label="Message">
          <Textarea defaultValue={session.values.message} name="message" />
        </FieldWrapper>
        <SpamProtectionSlot />
        <FormSubmitButton loading={submitting}>Send message</FormSubmitButton>
      </fieldset>
      {session.phase === "provider-failure" ? (
        <SubmissionErrorPanel
          errorId={session.errorId}
          message={session.message}
          showContact
        />
      ) : null}
    </form>
  );
}
