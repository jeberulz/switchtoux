import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import * as brand from "../../src/design-system/components/brand";
import {
  ArtefactStamp,
  AtmosphericField,
  ConnectionPath,
  ConnectionTrace,
  EvidenceLabel,
  EvidenceLegend,
  NodeCluster,
  SignalNode,
  SystemFrame,
  SystemNode,
  Wordmark,
} from "../../src/design-system/components/brand";

describe("signature brand primitives", () => {
  it("exports the complete brand inventory", () => {
    expect(Object.keys(brand)).toEqual(
      expect.arrayContaining([
        "Wordmark",
        "MonoEyebrow",
        "EvidenceLabel",
        "EvidenceLegend",
        "SystemNode",
        "SignalNode",
        "ConnectionPath",
        "NodeCluster",
        "ProofLabel",
        "ArtefactStamp",
        "AtmosphericField",
        "ConnectionTrace",
        "SystemFrame",
      ]),
    );
  });

  it("renders full and compact wordmarks as homepage links", () => {
    const markup = renderToStaticMarkup(
      <>
        <Wordmark />
        <Wordmark compact />
      </>,
    );

    expect(markup).toContain('href="/"');
    expect(markup).toContain("Switch");
    expect(markup).toContain("to UX");
    expect(markup).toContain('aria-label="Switch to UX"');
    expect(markup).toContain("S");
    expect(markup).toContain("UX");
  });

  it("keeps evidence codes and full meanings stable", () => {
    const markup = renderToStaticMarkup(
      <>
        <EvidenceLabel kind="evidence" />
        <EvidenceLabel compact kind="unknown" />
        <EvidenceLegend selected="assumption" />
      </>,
    );

    expect(markup).toContain("[E]");
    expect(markup).toContain("Evidence");
    expect(markup).toContain('aria-label="Unknown"');
    expect(markup).toContain("Inference");
    expect(markup).toContain("Assumption");
  });

  it("distinguishes labelled relationships from decorative paths", () => {
    const markup = renderToStaticMarkup(
      <>
        <ConnectionPath label="Evidence connects to inference" />
        <ConnectionPath />
        <ConnectionTrace animated label="Signal moves to prototype" />
      </>,
    );

    expect(markup).toContain('role="img"');
    expect(markup).toContain('aria-label="Evidence connects to inference"');
    expect(markup).toContain('aria-hidden="true"');
    expect(markup).toContain('data-animated="true"');
  });

  it("preserves labels across nodes and clusters", () => {
    const markup = renderToStaticMarkup(
      <NodeCluster label="Product system nodes">
        <SystemNode active detail="Direct source" title="Evidence" />
        <SignalNode active label="Active relationship" />
      </NodeCluster>,
    );

    expect(markup).toContain('role="group"');
    expect(markup).toContain('aria-label="Product system nodes"');
    expect(markup).toContain('data-active="true"');
    expect(markup).toContain("Active relationship");
  });

  it("builds a named static system frame with optional metadata", () => {
    const markup = renderToStaticMarkup(
      <AtmosphericField intensity="quiet">
        <SystemFrame
          footer="Static first"
          label="Grounded Design example"
          title="Grounded Design"
        >
          <ArtefactStamp code="PRT" meta="Interactive" title="Prototype" />
        </SystemFrame>
      </AtmosphericField>,
    );

    expect(markup).toContain('aria-label="Grounded Design example"');
    expect(markup).toContain('data-intensity="quiet"');
    expect(markup).toContain("Grounded Design");
    expect(markup).toContain("Static first");
    expect(markup).toContain("Prototype");
  });
});
