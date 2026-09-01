import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import * as controls from "../../src/design-system/components/controls";
import {
  Accordion,
  Button,
  DisclosureRow,
  IconButton,
  LoadingIndicator,
  ProgressIndicator,
  StatusBadge,
  TextLink,
  Tooltip,
} from "../../src/design-system/components/controls";

describe("core controls", () => {
  it("exports the complete control inventory", () => {
    expect(Object.keys(controls)).toEqual(
      expect.arrayContaining([
        "Button",
        "IconButton",
        "TextLink",
        "StatusBadge",
        "CategoryLabel",
        "MetadataItem",
        "Tag",
        "Accordion",
        "DisclosureRow",
        "ProgressIndicator",
        "Tooltip",
        "LoadingIndicator",
      ]),
    );
  });

  it("renders button variants and preserves loading semantics", () => {
    const markup = renderToStaticMarkup(
      <>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button loading loadingLabel="Submitting form">Submit</Button>
      </>,
    );

    expect(markup).toContain('data-variant="primary"');
    expect(markup).toContain('data-variant="secondary"');
    expect(markup).toContain('aria-busy="true"');
    expect(markup).toContain("Submitting form");
    expect(markup).toContain("disabled");
  });

  it("requires names for icon buttons and keeps link semantics", () => {
    const markup = renderToStaticMarkup(
      <>
        <IconButton label="Close panel">×</IconButton>
        <TextLink href="/courses">Courses</TextLink>
      </>,
    );

    expect(markup).toContain('aria-label="Close panel"');
    expect(markup).toContain('href="/courses"');
    expect(markup).toContain('aria-hidden="true"');
  });

  it("writes every programme status in full", () => {
    const markup = renderToStaticMarkup(
      <>
        <StatusBadge status="coming-soon" />
        <StatusBadge status="enrolling" />
        <StatusBadge status="in-progress" />
        <StatusBadge status="closed" />
      </>,
    );

    expect(markup).toContain("Coming soon");
    expect(markup).toContain("Enrolling");
    expect(markup).toContain("In progress");
    expect(markup).toContain("Closed");
  });

  it("clamps progress to its accessible range", () => {
    const markup = renderToStaticMarkup(
      <ProgressIndicator current={9} label="Course progress" total={6} />,
    );

    expect(markup).toContain('role="progressbar"');
    expect(markup).toContain('aria-valuemax="6"');
    expect(markup).toContain('aria-valuenow="6"');
    expect(markup).toContain('aria-valuetext="6 of 6"');
  });

  it("connects supplementary tooltip content to a named control", () => {
    const markup = renderToStaticMarkup(
      <Tooltip content="Supplementary explanation">
        <IconButton label="Explain notation">?</IconButton>
      </Tooltip>,
    );

    expect(markup).toContain('aria-label="Explain notation"');
    expect(markup).toContain("aria-describedby=");
    expect(markup).toContain('role="tooltip"');
    expect(markup).toContain("Supplementary explanation");
  });

  it("renders disclosure regions with programmatic expanded state", () => {
    const markup = renderToStaticMarkup(
      <>
        <Accordion defaultOpen title="Course outcomes">
          Outcome details
        </Accordion>
        <DisclosureRow title="Evidence notation">Notation details</DisclosureRow>
      </>,
    );

    expect(markup).toContain('aria-expanded="true"');
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain('role="region"');
    expect(markup).toContain("hidden");
  });

  it("announces loading status without exposing its visual bars", () => {
    const markup = renderToStaticMarkup(
      <LoadingIndicator label="Checking availability" />,
    );

    expect(markup).toContain('role="status"');
    expect(markup).toContain('aria-live="polite"');
    expect(markup).toContain("Checking availability");
    expect(markup).toContain('aria-hidden="true"');
  });
});
