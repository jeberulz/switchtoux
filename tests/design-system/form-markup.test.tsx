import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  ContactForm,
  SuccessPanel,
  WaitlistForm,
  createLabSubmit,
  emptyWaitlistValues,
  type FormSession,
  type WaitlistValues,
} from "../../src/design-system/components/forms";

const dashPattern = /[—–]/;

const adaValues: WaitlistValues = {
  ...emptyWaitlistValues(),
  email: "ada@example.com",
  experience: "3-5",
  firstName: "Ada",
  learningGoal: "Ship a grounded prototype",
  role: "Product designer",
  waitlistConsent: true,
};

describe("form markup", () => {
  it("keeps waitlist and newsletter consent as separate checkboxes", () => {
    const markup = renderToStaticMarkup(
      <WaitlistForm submit={createLabSubmit("success")} />,
    );

    expect(markup).toContain('name="waitlistConsent"');
    expect(markup).toContain('name="newsletterConsent"');
    expect(markup).toContain('name="website"');
    expect(markup).not.toMatch(/id="[^"]*:/);
    expect(markup).not.toMatch(/href="#[^"]*:/);
    expect(markup).not.toMatch(dashPattern);
  });

  it("announces success through a polite live region", () => {
    const markup = renderToStaticMarkup(
      <SuccessPanel confirmation="Saved. Check your inbox for the next note." />,
    );

    expect(markup).toContain('role="status"');
  });

  it("replaces the waitlist fields after a success session", () => {
    const initialSession: FormSession<WaitlistValues> = {
      confirmation: "Saved. Check your inbox for the next note.",
      phase: "success",
      values: adaValues,
    };
    const markup = renderToStaticMarkup(
      <WaitlistForm initialSession={initialSession} submit={createLabSubmit("success")} />,
    );

    expect(markup).toContain("Saved. Check your inbox for the next note.");
    expect(markup).not.toContain('name="firstName"');
  });

  it("keeps Ada visible after provider failure", () => {
    const initialSession: FormSession<WaitlistValues> = {
      errorId: "lab-provider-unavailable",
      message: "The provider did not accept this submission. Your answers are still here.",
      phase: "provider-failure",
      values: adaValues,
    };
    const markup = renderToStaticMarkup(
      <WaitlistForm
        initialSession={initialSession}
        submit={createLabSubmit("provider-failure")}
      />,
    );

    expect(markup).toContain('value="Ada"');
    expect(markup).toContain("The provider did not accept this submission. Your answers are still here.");
    expect(markup).toContain("lab-provider-unavailable");
    expect(markup).toContain('name="firstName"');
  });

  it("selects team-training on the contact form", () => {
    const markup = renderToStaticMarkup(
      <ContactForm
        initialEnquiryType="team-training"
        submit={createLabSubmit("success")}
      />,
    );

    expect(markup).toMatch(/<option[^>]*value="team-training"[^>]*selected/);
  });
});
