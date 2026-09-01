import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  Divider,
  HorizontalRail,
  PageContainer,
  SectionHeader,
  SplitLayout,
  SurfacePanel,
  type SplitRatio,
} from "../../src/design-system/components/layout";

describe("layout primitives", () => {
  it("renders a token-backed atmospheric page container", () => {
    const markup = renderToStaticMarkup(
      <PageContainer width="atmospheric">Content</PageContainer>,
    );

    expect(markup).toContain('data-layout="page-container"');
    expect(markup).toContain("--layout-container-atmospheric");
    expect(markup).toContain("--layout-page-padding-mobile");
  });

  it.each<SplitRatio>(["4/8", "5/7", "7/5", "8/4", "3/9"])(
    "renders the %s split ratio",
    (ratio) => {
      const markup = renderToStaticMarkup(
        <SplitLayout ratio={ratio}>
          <div>Primary</div>
          <div>Secondary</div>
        </SplitLayout>,
      );

      expect(markup).toContain(`data-ratio="${ratio}"`);
      expect(markup).toContain("comparison:grid-cols-12");
    },
  );

  it("makes the horizontal rail keyboard focusable and named", () => {
    const markup = renderToStaticMarkup(
      <HorizontalRail aria-label="Programme examples">
        <div>Example</div>
      </HorizontalRail>,
    );

    expect(markup).toContain('aria-label="Programme examples"');
    expect(markup).toContain('tabindex="0"');
    expect(markup).toContain('data-layout="horizontal-rail"');
  });

  it("renders section headers at the requested heading level", () => {
    const markup = renderToStaticMarkup(
      <SectionHeader
        description="Supporting copy"
        headingId="layout-heading"
        headingLevel={3}
        title="Layout specimen"
      />,
    );

    expect(markup).toContain("<h3");
    expect(markup).toContain('id="layout-heading"');
    expect(markup).toContain("Layout specimen");
    expect(markup).toContain("Supporting copy");
  });

  it("exposes surface and divider variants as stable data attributes", () => {
    const markup = renderToStaticMarkup(
      <>
        <SurfacePanel tone="raised">Raised</SurfacePanel>
        <Divider strength="strong" />
      </>,
    );

    expect(markup).toContain('data-tone="raised"');
    expect(markup).toContain('data-layout="divider"');
    expect(markup).toContain("--color-border-strong");
  });
});
