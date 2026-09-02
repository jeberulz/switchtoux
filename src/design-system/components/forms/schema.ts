import {
  ALL_COURSES_INTEREST,
  normalizeWaitlistInterest,
  programmeFixtures,
  workshopFixtures,
  type WaitlistInterestSlug,
} from "../programmes";

export type FieldErrors<TValues> = Partial<Record<keyof TValues, string>>;

export type SubmitResult =
  | { ok: true; confirmation: string }
  | { ok: false; errorId: string; message: string };

export type SubmitAdapter<TValues> = (values: TValues) => Promise<SubmitResult>;

export type LabSubmitOutcome = "success" | "provider-failure";

export const experienceLevels = [
  { value: "exploring", label: "Exploring product design" },
  { value: "career-switcher", label: "Career switcher" },
  { value: "0-2", label: "0-2 years" },
  { value: "3-5", label: "3-5 years" },
  { value: "6-9", label: "6-9 years" },
  { value: "10-plus", label: "10+ years" },
  { value: "leader", label: "Design or product leader" },
] as const;

export type ExperienceLevel = (typeof experienceLevels)[number]["value"];

export const enquiryTypes = [
  { value: "course-question", label: "Course question" },
  { value: "team-training", label: "Team training" },
  { value: "speaking", label: "Speaking or workshop invitation" },
  { value: "partnership", label: "Partnership" },
  { value: "other", label: "Other" },
] as const;

export type EnquiryType = (typeof enquiryTypes)[number]["value"];

export interface WaitlistValues {
  email: string;
  experience: ExperienceLevel | "";
  firstName: string;
  interest: WaitlistInterestSlug;
  learningGoal: string;
  newsletterConsent: boolean;
  role: string;
  waitlistConsent: boolean;
  website: string;
}

export interface NewsletterValues {
  email: string;
  firstName: string;
  website: string;
}

export interface ContactValues {
  company: string;
  email: string;
  enquiryType: EnquiryType | "";
  message: string;
  name: string;
  website: string;
}

export type ParseResult<TValues> =
  | { ok: true; values: TValues }
  | { ok: false; values: TValues; errors: FieldErrors<TValues> };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const experienceValues = new Set(experienceLevels.map((level) => level.value));
const enquiryValues = new Set(enquiryTypes.map((type) => type.value));

function readString(input: Record<string, FormDataEntryValue>, key: string) {
  const value = input[key];
  return typeof value === "string" ? value.trim() : "";
}

function readChecked(input: Record<string, FormDataEntryValue>, key: string) {
  const value = input[key];
  return value === "on" || value === "true" || value === "1";
}

function isExperienceLevel(value: string): value is ExperienceLevel {
  return experienceValues.has(value as ExperienceLevel);
}

function isEnquiryType(value: string): value is EnquiryType {
  return enquiryValues.has(value as EnquiryType);
}

function invalidEmail(value: string) {
  return !value || !emailPattern.test(value);
}

export function emptyWaitlistValues(
  interest: WaitlistInterestSlug = ALL_COURSES_INTEREST,
): WaitlistValues {
  return {
    email: "",
    experience: "",
    firstName: "",
    interest,
    learningGoal: "",
    newsletterConsent: false,
    role: "",
    waitlistConsent: false,
    website: "",
  };
}

export function emptyNewsletterValues(): NewsletterValues {
  return { email: "", firstName: "", website: "" };
}

export function emptyContactValues(
  enquiryType: EnquiryType | "" = "",
): ContactValues {
  return {
    company: "",
    email: "",
    enquiryType,
    message: "",
    name: "",
    website: "",
  };
}

export function parseWaitlist(
  input: Record<string, FormDataEntryValue>,
): ParseResult<WaitlistValues> {
  const values: WaitlistValues = {
    email: readString(input, "email"),
    experience: isExperienceLevel(readString(input, "experience"))
      ? readString(input, "experience") as ExperienceLevel
      : "",
    firstName: readString(input, "firstName"),
    interest: normalizeWaitlistInterest(readString(input, "interest")),
    learningGoal: readString(input, "learningGoal"),
    newsletterConsent: readChecked(input, "newsletterConsent"),
    role: readString(input, "role"),
    waitlistConsent: readChecked(input, "waitlistConsent"),
    website: readString(input, "website"),
  };

  if (values.website) {
    return { ok: false, values, errors: {} };
  }

  const errors: FieldErrors<WaitlistValues> = {};
  if (!values.firstName) errors.firstName = "Enter your first name.";
  if (invalidEmail(values.email)) errors.email = "Enter a valid email address.";
  if (!values.role) errors.role = "Enter your current role.";
  if (!values.experience) errors.experience = "Select your experience level.";
  if (!values.learningGoal) errors.learningGoal = "Describe what you want to learn.";
  if (!values.waitlistConsent) {
    errors.waitlistConsent = "Confirm you want programme emails for this waitlist.";
  }

  return Object.keys(errors).length > 0
    ? { ok: false, values, errors }
    : { ok: true, values };
}

export function parseNewsletter(
  input: Record<string, FormDataEntryValue>,
): ParseResult<NewsletterValues> {
  const values: NewsletterValues = {
    email: readString(input, "email"),
    firstName: readString(input, "firstName"),
    website: readString(input, "website"),
  };

  if (values.website) {
    return { ok: false, values, errors: {} };
  }

  const errors: FieldErrors<NewsletterValues> = {};
  if (invalidEmail(values.email)) errors.email = "Enter a valid email address.";

  return Object.keys(errors).length > 0
    ? { ok: false, values, errors }
    : { ok: true, values };
}

export function parseContact(
  input: Record<string, FormDataEntryValue>,
): ParseResult<ContactValues> {
  const enquiry = readString(input, "enquiryType");
  const values: ContactValues = {
    company: readString(input, "company"),
    email: readString(input, "email"),
    enquiryType: isEnquiryType(enquiry) ? enquiry : "",
    message: readString(input, "message"),
    name: readString(input, "name"),
    website: readString(input, "website"),
  };

  if (values.website) {
    return { ok: false, values, errors: {} };
  }

  const errors: FieldErrors<ContactValues> = {};
  if (!values.name) errors.name = "Enter your name.";
  if (invalidEmail(values.email)) errors.email = "Enter a valid work email address.";
  if (!values.enquiryType) errors.enquiryType = "Select an enquiry type.";
  if (!values.message) errors.message = "Enter a message.";

  return Object.keys(errors).length > 0
    ? { ok: false, values, errors }
    : { ok: true, values };
}

export function programmeSelectorOptions() {
  return [
    { value: ALL_COURSES_INTEREST, label: "All courses" },
    ...programmeFixtures.map((programme) => ({
      value: programme.slug,
      label: programme.title,
    })),
    ...workshopFixtures.map((workshop) => ({
      value: workshop.slug,
      label: workshop.title,
    })),
  ];
}

export function createLabSubmit(
  outcome: LabSubmitOutcome,
  confirmation = "Saved. Check your inbox for the next note.",
): SubmitAdapter<unknown> {
  return async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 40);
    });

    if (outcome === "success") {
      return { ok: true, confirmation };
    }

    return {
      ok: false,
      errorId: "lab-provider-unavailable",
      message: "The provider did not accept this submission. Your answers are still here.",
    };
  };
}
