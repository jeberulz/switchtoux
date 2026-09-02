import { describe, expect, it } from "vitest";
import {
  createFormSession,
  reduceFormSession,
} from "../../src/design-system/components/forms/form-session";
import { ALL_COURSES_INTEREST } from "../../src/design-system/components/programmes";
import {
  createLabSubmit,
  emptyWaitlistValues,
  parseContact,
  parseNewsletter,
  parseWaitlist,
  programmeSelectorOptions,
} from "../../src/design-system/components/forms/schema";

const validWaitlist = {
  email: "ada@example.com",
  experience: "3-5",
  firstName: "Ada",
  interest: "not-a-slug",
  learningGoal: "Ship a grounded prototype",
  newsletterConsent: "true",
  role: "Product designer",
  waitlistConsent: "true",
  website: "",
} satisfies Record<string, string>;

describe("form schema", () => {
  it("normalises unknown waitlist interest and keeps newsletter consent independent", () => {
    const parsed = parseWaitlist(validWaitlist);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;
    expect(parsed.values.interest).toBe(ALL_COURSES_INTEREST);
    expect(parsed.values.newsletterConsent).toBe(true);
    expect(parsed.values.waitlistConsent).toBe(true);
  });

  it("does not treat waitlist consent as newsletter consent", () => {
    const parsed = parseWaitlist({
      ...validWaitlist,
      newsletterConsent: "",
      waitlistConsent: "true",
    });
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;
    expect(parsed.values.newsletterConsent).toBe(false);
    expect(parsed.values.waitlistConsent).toBe(true);
  });

  it("rejects invalid waitlist input without calling a provider", () => {
    const parsed = parseWaitlist({
      ...validWaitlist,
      email: "nope",
      waitlistConsent: "",
    });
    expect(parsed.ok).toBe(false);
    if (parsed.ok) return;
    expect(parsed.errors.email).toBeDefined();
    expect(parsed.errors.waitlistConsent).toBeDefined();
    expect(parsed.values.email).toBe("nope");
  });

  it("swallows honeypot submissions without field errors", () => {
    const parsed = parseWaitlist({ ...validWaitlist, website: "https://spam.test" });
    expect(parsed.ok).toBe(false);
    if (parsed.ok) return;
    expect(parsed.errors).toEqual({});
  });

  it("requires only email for the newsletter path", () => {
    expect(parseNewsletter({ email: "ada@example.com", firstName: "", website: "" }).ok).toBe(
      true,
    );
    expect(parseNewsletter({ email: "bad", firstName: "Ada", website: "" }).ok).toBe(false);
  });

  it("accepts a team-training contact payload", () => {
    const parsed = parseContact({
      company: "Algolia",
      email: "lead@example.com",
      enquiryType: "team-training",
      message: "We want a shared eval practice.",
      name: "Priya",
      website: "",
    });
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;
    expect(parsed.values.enquiryType).toBe("team-training");
  });

  it("lists every programme and workshop in the selector", () => {
    expect(programmeSelectorOptions()).toHaveLength(13);
  });
});

describe("form session", () => {
  it("replaces the form only after a successful adapter result", async () => {
    const start = createFormSession(emptyWaitlistValues());
    const submitting = reduceFormSession(start, { type: "submit" });
    expect(submitting.phase).toBe("submitting");

    const success = reduceFormSession(submitting, {
      result: await createLabSubmit("success")({}),
      type: "result",
    });
    expect(success.phase).toBe("success");
    if (success.phase !== "success") return;
    expect(success.confirmation.length).toBeGreaterThan(0);
  });

  it("keeps values after provider failure", async () => {
    const values = { ...emptyWaitlistValues(), firstName: "Ada", email: "ada@example.com" };
    const submitting = reduceFormSession(createFormSession(values), { type: "submit" });
    const failed = reduceFormSession(submitting, {
      result: await createLabSubmit("provider-failure")({}),
      type: "result",
    });
    expect(failed.phase).toBe("provider-failure");
    if (failed.phase !== "provider-failure") return;
    expect(failed.values).toEqual(values);
    expect(failed.errorId).toBe("lab-provider-unavailable");
  });

  it("does not let change events escape a success replacement", () => {
    const success = reduceFormSession(
      { phase: "success", confirmation: "Done", values: emptyWaitlistValues() },
      { type: "change", values: { ...emptyWaitlistValues(), firstName: "Hacked" } },
    );
    expect(success.phase).toBe("success");
  });
});
