import type { Metadata } from "next";
import {
  ArtefactStamp,
  AtmosphericField,
  ConnectionPath,
  ConnectionTrace,
  EvidenceLabel,
  EvidenceLegend,
  MonoEyebrow,
  NodeCluster,
  ProofLabel,
  SignalNode,
  SystemFrame,
  SystemNode,
  Wordmark,
} from "@/design-system/components/brand";
import {
  ContentStack,
  Grid,
  InlineCluster,
  PageContainer,
  Section,
  SectionHeader,
  SplitLayout,
  SurfacePanel,
} from "@/design-system/components/layout";
import "./brand-lab.css";

export const metadata: Metadata = {
  title: "Brand primitives",
};

const brandApi = [
  ["Wordmark", "href, compact"],
  ["MonoEyebrow", "native span attributes"],
  ["EvidenceLabel", "kind, selected, compact"],
  ["EvidenceLegend", "selected"],
  ["SystemNode", "title, detail, active"],
  ["SignalNode", "label, active"],
  ["ConnectionPath", "orientation, active, label"],
  ["NodeCluster", "label"],
  ["ProofLabel", "accent"],
  ["ArtefactStamp", "code, title, meta"],
  ["AtmosphericField", "intensity"],
  ["ConnectionTrace", "orientation, animated, label"],
  ["SystemFrame", "label, title, footer"],
] as const;

function Specimen({
  children,
  description,
  id,
  title,
}: {
  children: React.ReactNode;
  description: string;
  id: string;
  title: string;
}) {
  return (
    <Section aria-labelledby={id} className="brand-lab-specimen">
      <SectionHeader
        description={description}
        headingId={id}
        title={title}
      />
      <div className="brand-lab-canvas">{children}</div>
    </Section>
  );
}

export default function BrandLabPage() {
  return (
    <PageContainer className="brand-lab-page" width="atmospheric">
      <header className="brand-lab-hero">
        <p className="brand-lab-kicker">Ready for review</p>
        <h1>Proof becomes a visual language.</h1>
        <p>
          Thirteen primitives make evidence, systems and connection visible before
          any signature composition is selected.
        </p>
        <dl className="brand-lab-summary">
          <div>
            <dt>Primitives</dt>
            <dd>13</dd>
          </div>
          <div>
            <dt>Evidence kinds</dt>
            <dd>4</dd>
          </div>
          <div>
            <dt>Canvas dependency</dt>
            <dd>None</dd>
          </div>
        </dl>
      </header>

      <Specimen
        description="The temporary wordmark is isolated and replaceable. It keeps the rose slash as the only brand signal and provides a compact small-context form."
        id="wordmark-heading"
        title="Name and voice"
      >
        <SplitLayout ratio="7/5">
          <SurfacePanel className="brand-lab-wordmark-panel">
            <Wordmark href="#wordmark-heading" />
            <p>Design with judgment. Build with AI. Ship proof.</p>
          </SurfacePanel>
          <ContentStack>
            <SurfacePanel className="brand-lab-compact-mark" tone="outline">
              <Wordmark compact href="#wordmark-heading" />
            </SurfacePanel>
            <InlineCluster>
              <MonoEyebrow>AI-native product design</MonoEyebrow>
              <ProofLabel accent>Working proof</ProofLabel>
            </InlineCluster>
          </ContentStack>
        </SplitLayout>
      </Specimen>

      <Specimen
        description="Evidence notation separates what is known from what is interpreted. Full labels are the default, while compact labels retain accessible names."
        id="evidence-heading"
        title="Evidence notation"
      >
        <ContentStack gap="large">
          <EvidenceLegend selected="evidence" />
          <div className="brand-lab-evidence-compact" aria-label="Compact evidence labels">
            <EvidenceLabel compact kind="evidence" selected />
            <EvidenceLabel compact kind="inference" />
            <EvidenceLabel compact kind="assumption" />
            <EvidenceLabel compact kind="unknown" />
          </div>
        </ContentStack>
      </Specimen>

      <Specimen
        description="System nodes carry a label and optional explanation. Signal nodes communicate active state with text, not a colored mark alone."
        id="nodes-heading"
        title="Nodes and signals"
      >
        <SplitLayout ratio="8/4">
          <NodeCluster label="Grounded Design nodes">
            <SystemNode
              detail="Observed behavior and source material"
              title="Evidence"
            />
            <SystemNode
              active
              detail="A decision ready for prototype testing"
              title="Prototype"
            />
            <SystemNode
              detail="A defined check against expected behavior"
              title="Evaluation"
            />
          </NodeCluster>
          <SurfacePanel>
            <ContentStack>
              <SignalNode active label="Active relationship" />
              <SignalNode label="Available relationship" />
            </ContentStack>
          </SurfacePanel>
        </SplitLayout>
      </Specimen>

      <Specimen
        description="Paths show structural relationships. Traces add one optional signal movement and become a stable rose segment when reduced motion is requested."
        id="connections-heading"
        title="Connections and traces"
      >
        <div className="brand-lab-connection-board">
          <SystemNode title="Research input" />
          <div className="brand-lab-path-stack">
            <ProofLabel>Static relationship</ProofLabel>
            <ConnectionPath active label="Research connects to product judgment" />
          </div>
          <SystemNode active title="Product judgment" />
          <div className="brand-lab-path-stack">
            <ProofLabel accent>Optional signal</ProofLabel>
            <ConnectionTrace animated label="Judgment moves into prototype proof" />
          </div>
          <SystemNode title="Prototype proof" />
        </div>
      </Specimen>

      <Specimen
        description="Proof labels and artefact stamps identify real outputs without imitating certificates, badges or decorative version labels."
        id="proof-heading"
        title="Proof and artefacts"
      >
        <Grid className="brand-lab-artefacts">
          <ArtefactStamp
            code="PRT"
            meta="Interactive"
            title="Working prototype"
          />
          <ArtefactStamp
            code="EVL"
            meta="Repeatable"
            title="Evaluation plan"
          />
          <ArtefactStamp
            code="DEC"
            title="Decision record with a deliberately longer evidence-based title"
          />
        </Grid>
      </Specimen>

      <Specimen
        description="This structural assembly proves that the primitives compose and remain readable without animation. It is not a selected signature direction."
        id="frame-heading"
        title="Atmosphere and system frame"
      >
        <AtmosphericField className="brand-lab-atmosphere" intensity="quiet">
          <SystemFrame
            footer={
              <>
                <span>Static-first</span>
                <span>Figma deferred</span>
              </>
            }
            label="Grounded Design structural example"
            title={
              <>
                <span>Grounded Design</span>
                <ProofLabel accent>Structure only</ProofLabel>
              </>
            }
          >
            <NodeCluster label="Example evidence flow">
              <SystemNode detail="Direct source" title="Evidence" />
              <SystemNode detail="Explicit interpretation" title="Inference" />
              <SystemNode active detail="Tested in context" title="Prototype" />
            </NodeCluster>
          </SystemFrame>
        </AtmosphericField>
      </Specimen>

      <Section aria-labelledby="brand-api-heading" className="brand-lab-specimen">
        <SectionHeader
          description="The primitives describe visual roles, not page layouts. Native attributes remain available for composition-specific semantics."
          headingId="brand-api-heading"
          title="Public API"
        />
        <div className="brand-lab-api">
          {brandApi.map(([name, props]) => (
            <div key={name}>
              <code>{name}</code>
              <span>{props}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section aria-labelledby="brand-contract-heading" className="brand-lab-specimen">
        <SectionHeader
          description="These limits protect the signature language before the exploration phase begins."
          headingId="brand-contract-heading"
          title="Brand contract"
        />
        <div className="brand-lab-contract">
          <SurfacePanel tone="outline">
            <h3>Static first</h3>
            <p>Nodes, paths and frames communicate their relationships without animation.</p>
          </SurfacePanel>
          <SurfacePanel tone="outline">
            <h3>One signal</h3>
            <p>Rose marks the active relationship. No second decorative accent is introduced.</p>
          </SurfacePanel>
          <SurfacePanel tone="outline">
            <h3>Readable labels</h3>
            <p>Compact evidence marks keep accessible names and full legends remain available.</p>
          </SurfacePanel>
          <SurfacePanel tone="outline">
            <h3>Replaceable identity</h3>
            <p>The temporary wordmark can be replaced without changing system compositions.</p>
          </SurfacePanel>
        </div>
      </Section>
    </PageContainer>
  );
}
