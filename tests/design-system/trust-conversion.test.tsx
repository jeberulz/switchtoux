import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  AudienceRouteRows,
  CredibilityRail,
  FinalConvergenceCTA,
  InstructorSplit,
  audienceRoutes,
  credibilityItems,
  instructorFixture,
  newsletterCopy,
  convergenceCopy,
  convergencePaths,
} from "../../src/design-system/components/trust";

const dashPattern = /[—–]/;

describe("trust conversion compositions", () => {
  it("renders credibility items and company names", () => {
    const markup = renderToStaticMarkup(<CredibilityRail />);

    for (const item of credibilityItems) {
      expect(markup).toContain(item.label);
      expect(markup).toContain(item.value);
    }
    expect(markup).toContain("Algolia");
    expect(markup).toContain("Amazon");
    expect(markup).toContain("Booking.com");
  });

  it("renders three audience route hrefs", () => {
    const markup = renderToStaticMarkup(<AudienceRouteRows />);

    expect(audienceRoutes).toHaveLength(3);
    for (const route of audienceRoutes) {
      expect(markup).toContain(`href="${route.href}"`);
      expect(markup).toContain(route.title);
    }
  });

  it("renders the instructor placeholder without an image", () => {
    const markup = renderToStaticMarkup(<InstructorSplit />);

    expect(markup).toContain(instructorFixture.placeholder);
    expect(markup.toLowerCase()).not.toContain("<img");
    expect(instructorFixture.bio).not.toContain("Senior UX Designer at Amazon");
    expect(instructorFixture.role).not.toContain("Senior UX Designer at Amazon");
  });

  it("converges on the all-courses waitlist", () => {
    const markup = renderToStaticMarkup(<FinalConvergenceCTA />);

    expect(markup).toContain("/waitlist?interest=all-courses");
    expect(markup).toContain(convergenceCopy.action);
    expect(markup).not.toContain("<footer");
  });

  it("does not use em dashes or en dashes in trust fixture copy", () => {
    const payload = JSON.stringify({
      audienceRoutes,
      convergenceCopy,
      convergencePaths,
      credibilityItems,
      instructorFixture,
      newsletterCopy,
    });

    expect(payload).not.toMatch(dashPattern);
  });
});
