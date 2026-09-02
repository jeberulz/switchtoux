import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  CMSContentFailureState,
  ComingSoonState,
  ContentLoadingState,
  EmptyResourceCategory,
  FormFailureState,
  FormSuccessState,
  GeneralErrorState,
  MissingImageState,
  NetworkErrorState,
  NotFoundState,
  ReducedMotionState,
  SpamCheckFailureState,
  StaticAtmosphereFallback,
  ValidationErrorState,
  systemStateDefinitions,
} from "../../src/design-system/components/system";

describe("system states", () => {
  it("defines the complete and unique SYS-01 to SYS-14 inventory", () => {
    expect(systemStateDefinitions).toHaveLength(14);
    expect(new Set(systemStateDefinitions.map(({ id }) => id)).size).toBe(14);
    expect(systemStateDefinitions.map(({ id }) => id)).toEqual(
      Array.from({ length: 14 }, (_, index) => `SYS-${String(index + 1).padStart(2, "0")}`),
    );
  });

  it("renders every named state without incomplete fixture output", () => {
    const markup = renderToStaticMarkup(
      <>
        <ComingSoonState description="Dates will be shared before enrolment opens." interestHref="#interest" title="AI-Native Product Designer" />
        <EmptyResourceCategory category="Evaluation" resetHref="#resources" />
        <FormSuccessState confirmation="Your interest has been recorded." />
        <FormFailureState errorId="provider-failure" message="Your answers are still here." />
        <ValidationErrorState errors={[{ id: "email", message: "Enter a valid email address." }]} />
        <SpamCheckFailureState retryHref="#retry" />
        <CMSContentFailureState fallback={<span>Core content remains available.</span>} />
        <MissingImageState alt="Annotated approval flow" caption="Approval-flow evidence" />
        <ContentLoadingState label="Loading resource summaries" />
        <NotFoundState homeHref="/design-lab" />
        <GeneralErrorState retryHref="#retry" />
        <NetworkErrorState retryHref="#retry" />
        <ReducedMotionState />
        <StaticAtmosphereFallback />
      </>,
    );

    const stateMarkers = [
      "Dates will be shared before enrolment opens.",
      "No published resources in Evaluation yet.",
      "Your interest has been recorded.",
      "Your answers are still here.",
      "Enter a valid email address.",
      "We could not complete the security check.",
      "Some supporting content is unavailable.",
      "Approval-flow evidence",
      "Loading resource summaries",
      "This page could not be found.",
      "Something interrupted this page.",
      "The connection was interrupted.",
      "No meaning depends on animation.",
      "Static system fallback",
    ];

    for (const marker of stateMarkers) {
      expect(markup).toContain(marker);
    }
    expect(markup).not.toContain("undefined");
    expect(markup).not.toMatch(/[—–]/);
  });

  it("announces asynchronous, success and recoverable failure outcomes", () => {
    const markup = renderToStaticMarkup(
      <>
        <ContentLoadingState label="Loading programmes" />
        <FormSuccessState confirmation="Saved." />
        <FormFailureState errorId="provider-failure" message="Your answers remain available." />
        <SpamCheckFailureState retryHref="#retry" />
        <GeneralErrorState retryHref="#retry" />
        <NetworkErrorState retryHref="#retry" />
      </>,
    );

    expect(markup).toContain('aria-busy="true"');
    expect(markup).toContain('role="status"');
    expect(markup).toContain('role="alert"');
    expect(markup).toContain("Your answers remain available.");
  });

  it("preserves meaning when media and motion are unavailable", () => {
    const markup = renderToStaticMarkup(
      <>
        <MissingImageState alt="Annotated approval flow" />
        <ReducedMotionState />
        <StaticAtmosphereFallback />
      </>,
    );

    expect(markup).toContain('role="img"');
    expect(markup).toContain('aria-label="Annotated approval flow. Image unavailable."');
    expect(markup).toContain("Evidence");
    expect(markup).toContain("Evaluation");
    expect(markup).toContain("No meaning depends on animation.");
  });

  it("runs loading motion only when the visitor has not requested reduced motion", () => {
    const css = readFileSync(
      new URL(
        "../../src/design-system/components/system/system.module.css",
        import.meta.url,
      ),
      "utf8",
    );

    expect(css).toMatch(
      /@media \(prefers-reduced-motion: no-preference\)[\s\S]*animation: system-loading/,
    );
  });
});
