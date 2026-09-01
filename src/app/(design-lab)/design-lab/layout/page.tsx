import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  ContentStack,
  Divider,
  FeaturePanel,
  Grid,
  HorizontalRail,
  InlineCluster,
  PageContainer,
  Section,
  SectionHeader,
  SplitLayout,
  StickyRail,
  SurfacePanel,
  type SplitRatio,
} from "@/design-system/components/layout";
import "./layout-lab.css";

export const metadata: Metadata = {
  title: "Layout",
};

const splitRatios: SplitRatio[] = ["4/8", "5/7", "7/5", "8/4", "3/9"];

const apiGroups = [
  {
    title: "Frames",
    items: [
      ["PageContainer", "width, withGutters"],
      ["Section", "spacing"],
      ["Grid", "gap"],
      ["SplitLayout", "ratio"],
    ],
  },
  {
    title: "Flow",
    items: [
      ["ContentStack", "gap"],
      ["InlineCluster", "gap, align, justify"],
      ["StickyRail", "native aside attributes"],
      ["HorizontalRail", "accessible name required"],
    ],
  },
  {
    title: "Surfaces",
    items: [
      ["SurfacePanel", "tone"],
      ["FeaturePanel", "native article attributes"],
      ["Divider", "strength"],
      ["SectionHeader", "title, description, action, headingId"],
    ],
  },
] as const;

function Specimen({
  children,
  description,
  id,
  title,
}: {
  children: ReactNode;
  description: string;
  id: string;
  title: string;
}) {
  return (
    <Section aria-labelledby={id} className="layout-lab-specimen">
      <ContentStack className="layout-lab-specimen-heading" gap="small">
        <h2 id={id}>{title}</h2>
        <p>{description}</p>
      </ContentStack>
      {children}
    </Section>
  );
}

function SpecimenLabel({ children }: { children: ReactNode }) {
  return <span className="layout-lab-label">{children}</span>;
}

export default function LayoutLabPage() {
  return (
    <div className="layout-lab-page">
      <PageContainer>
        <header className="layout-lab-hero">
          <p className="lab-kicker">Ready for review</p>
          <h1>Layout sets the logic.</h1>
          <p>
            Twelve primitives establish width, rhythm, alignment and overflow
            before any product component is composed.
          </p>
          <InlineCluster className="layout-lab-summary" gap="large">
            <div>
              <span>Primitives</span>
              <strong>12</strong>
            </div>
            <div>
              <span>Split ratios</span>
              <strong>5</strong>
            </div>
            <div>
              <span>Client JavaScript</span>
              <strong>None</strong>
            </div>
          </InlineCluster>
        </header>

        <Specimen
          description="Containers own maximum width and responsive page padding. Sections own vertical rhythm without knowing their content."
          id="container-section-heading"
          title="Container and section"
        >
          <ContentStack gap="large">
            <div className="layout-lab-canvas-wide">
              <PageContainer className="layout-lab-container-mark" width="atmospheric">
                <SpecimenLabel>Atmospheric container, 1440px maximum</SpecimenLabel>
              </PageContainer>
            </div>
            <div className="layout-lab-canvas-wide">
              <PageContainer className="layout-lab-container-mark">
                <SpecimenLabel>Content container, 1280px maximum</SpecimenLabel>
              </PageContainer>
            </div>
            <SplitLayout ratio="4/8">
              <SurfacePanel tone="outline">
                <ContentStack gap="small">
                  <SpecimenLabel>Compact section</SpecimenLabel>
                  <strong>48-64px vertical rhythm</strong>
                </ContentStack>
              </SurfacePanel>
              <SurfacePanel>
                <ContentStack gap="small">
                  <SpecimenLabel>Default section</SpecimenLabel>
                  <strong>72-128px responsive rhythm</strong>
                </ContentStack>
              </SurfacePanel>
            </SplitLayout>
          </ContentStack>
        </Specimen>

        <Specimen
          description="The grid moves from four columns to eight and then twelve. Gutters resolve from the same responsive aliases."
          id="grid-heading"
          title="Responsive grid"
        >
          <div className="layout-lab-grid-frame">
            <Grid aria-label="Responsive twelve-cell grid specimen">
              {Array.from({ length: 12 }, (_, index) => (
                <div className="layout-lab-grid-cell" key={index}>
                  {index + 1}
                </div>
              ))}
            </Grid>
          </div>
        </Specimen>

        <Specimen
          description="Split layouts stay stacked below the comparison breakpoint. At wider widths, the named ratio controls emphasis."
          id="split-heading"
          title="Split ratios"
        >
          <ContentStack gap="large">
            {splitRatios.map((ratio) => (
              <article className="layout-lab-ratio" key={ratio}>
                <SpecimenLabel>{ratio}</SpecimenLabel>
                <SplitLayout ratio={ratio}>
                  <div>Primary span</div>
                  <div>Secondary span</div>
                </SplitLayout>
              </article>
            ))}
          </ContentStack>
        </Specimen>

        <Specimen
          description="Stack controls vertical sequence. Cluster handles inline groups that can wrap without component-specific spacing."
          id="flow-heading"
          title="Stack and cluster"
        >
          <SplitLayout ratio="7/5">
            <SurfacePanel>
              <ContentStack gap="large">
                <SpecimenLabel>ContentStack, large</SpecimenLabel>
                <h3>A stable reading sequence</h3>
                <p>
                  Heading, body and supporting information keep one predictable
                  relationship as content changes.
                </p>
                <Divider />
                <span className="layout-lab-muted">Next item in the stack</span>
              </ContentStack>
            </SurfacePanel>
            <SurfacePanel tone="outline">
              <ContentStack gap="standard">
                <SpecimenLabel>InlineCluster, wrapping</SpecimenLabel>
                <InlineCluster gap="small">
                  <span className="layout-lab-chip">Responsive</span>
                  <span className="layout-lab-chip">Token-backed</span>
                  <span className="layout-lab-chip">Server rendered</span>
                  <span className="layout-lab-chip">Composable</span>
                </InlineCluster>
              </ContentStack>
            </SurfacePanel>
          </SplitLayout>
        </Specimen>

        <Specimen
          description="Surface hierarchy is explicit. Feature treatment adds a single rose edge only when content needs stronger emphasis."
          id="surface-heading"
          title="Surface hierarchy"
        >
          <div className="layout-lab-surface-composition">
            <SurfacePanel tone="outline">
              <ContentStack gap="small">
                <SpecimenLabel>Outline</SpecimenLabel>
                <strong>Grouping without elevation</strong>
              </ContentStack>
            </SurfacePanel>
            <SurfacePanel>
              <ContentStack gap="small">
                <SpecimenLabel>Default</SpecimenLabel>
                <strong>Standard contained surface</strong>
              </ContentStack>
            </SurfacePanel>
            <SurfacePanel tone="raised">
              <ContentStack gap="small">
                <SpecimenLabel>Raised</SpecimenLabel>
                <strong>A real layer change</strong>
              </ContentStack>
            </SurfacePanel>
            <FeaturePanel>
              <ContentStack gap="small">
                <SpecimenLabel>Feature</SpecimenLabel>
                <strong>Priority content with one signal edge</strong>
              </ContentStack>
            </FeaturePanel>
          </div>
        </Specimen>

        <Specimen
          description="Sticky rail becomes sticky only when the comparison layout exists. Mobile reading order remains source order."
          id="sticky-heading"
          title="Sticky rail"
        >
          <SplitLayout className="layout-lab-sticky-demo" ratio="3/9">
            <StickyRail aria-label="Section context">
              <SurfacePanel tone="outline">
                <ContentStack gap="small">
                  <SpecimenLabel>Sticky context</SpecimenLabel>
                  <strong>Remains available while its section is active.</strong>
                </ContentStack>
              </SurfacePanel>
            </StickyRail>
            <ContentStack gap="large">
              {[
                "Start with the decision the section needs to communicate.",
                "Use width and rhythm to establish hierarchy before adding decoration.",
                "Collapse to source order when the viewport cannot sustain the split.",
              ].map((copy) => (
                <SurfacePanel className="layout-lab-reading-panel" key={copy}>
                  <p>{copy}</p>
                </SurfacePanel>
              ))}
            </ContentStack>
          </SplitLayout>
        </Specimen>

        <Specimen
          description="Horizontal rail exposes overflow without hiding content behind custom drag behavior. It is keyboard focusable and named."
          id="rail-heading"
          title="Horizontal rail"
        >
          <HorizontalRail aria-label="Layout rail specimens">
            {[
              "Long-form editorial entry",
              "Programme comparison",
              "Related workshop",
              "Supporting case study",
            ].map((title) => (
              <SurfacePanel className="layout-lab-rail-item" key={title}>
                <ContentStack gap="small">
                  <SpecimenLabel>Rail item</SpecimenLabel>
                  <strong>{title}</strong>
                  <p>Each child owns its content. The rail owns overflow and snap alignment.</p>
                </ContentStack>
              </SurfacePanel>
            ))}
          </HorizontalRail>
        </Specimen>

        <Specimen
          description="Section header composes heading content and a genuine secondary action. Divider separates regions without adding a container."
          id="header-heading"
          title="Header and divider"
        >
          <SurfacePanel>
            <SectionHeader
              action={<span className="layout-lab-status">Ready for review</span>}
              description="A header owns message hierarchy. Its parent still owns section spacing and width."
              eyebrow="Optional context"
              headingLevel={3}
              title="One focused section message"
            />
            <Divider className="layout-lab-divider" strength="strong" />
            <p className="layout-lab-muted">
              The divider marks the next content region without changing elevation.
            </p>
          </SurfacePanel>
        </Specimen>

        <Section aria-labelledby="api-heading" className="layout-lab-specimen">
          <SectionHeader
            description="Native attributes and refs pass through every primitive. These are the stable decisions exposed to future components."
            headingId="api-heading"
            title="Public API"
          />
          <div className="layout-lab-api-groups">
            {apiGroups.map((group) => (
              <section aria-labelledby={`api-${group.title}`} key={group.title}>
                <h3 id={`api-${group.title}`}>{group.title}</h3>
                <dl>
                  {group.items.map(([name, props]) => (
                    <div key={name}>
                      <dt>{name}</dt>
                      <dd>{props}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
          </div>
        </Section>

        <Section aria-labelledby="layout-access-heading" className="layout-lab-specimen">
          <SectionHeader
            description="Layout must preserve reading order, landmark meaning and usable overflow before visual composition is considered complete."
            headingId="layout-access-heading"
            title="Accessibility contract"
          />
          <SplitLayout ratio="5/7">
            <FeaturePanel>
              <ContentStack gap="small">
                <h3>Source order stays authoritative</h3>
                <p>
                  Split and sticky layouts collapse without reordering content in the
                  document.
                </p>
              </ContentStack>
            </FeaturePanel>
            <div className="layout-lab-access-notes">
              <SurfacePanel tone="outline">
                <strong>Overflow</strong>
                <p>Horizontal rails are named, focusable and use native scrolling.</p>
              </SurfacePanel>
              <SurfacePanel tone="outline">
                <strong>Zoom</strong>
                <p>Multi-column layouts collapse before text or controls are clipped.</p>
              </SurfacePanel>
              <SurfacePanel tone="outline">
                <strong>Landmarks</strong>
                <p>Section and rail elements keep native semantic roles.</p>
              </SurfacePanel>
            </div>
          </SplitLayout>
        </Section>
      </PageContainer>
    </div>
  );
}
