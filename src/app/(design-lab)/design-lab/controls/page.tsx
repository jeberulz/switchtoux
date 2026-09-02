import type { Metadata } from "next";
import {
  Accordion,
  Button,
  CategoryLabel,
  DisclosureRow,
  IconButton,
  LoadingIndicator,
  MetadataItem,
  ProgressIndicator,
  StatusBadge,
  Tag,
  TextLink,
  Tooltip,
} from "@/design-system/components/controls";
import { Icon } from "@/design-system/components/icons";
import {
  ContentStack,
  Divider,
  Grid,
  InlineCluster,
  PageContainer,
  Section,
  SectionHeader,
  SplitLayout,
  SurfacePanel,
} from "@/design-system/components/layout";
import "./controls-lab.css";

export const metadata: Metadata = {
  title: "Controls",
};

const controlApi = [
  ["Button", "variant, loading, disabled"],
  ["IconButton", "label, tone, disabled"],
  ["TextLink", "href, arrow, inline"],
  ["StatusBadge", "status, label, showSignal"],
  ["CategoryLabel", "native span attributes"],
  ["MetadataItem", "label, value, layout"],
  ["Tag", "selected"],
  ["Accordion", "title, defaultOpen, disabled, headingLevel"],
  ["DisclosureRow", "title, description, defaultOpen, disabled"],
  ["ProgressIndicator", "label, current, total"],
  ["Tooltip", "content, one named child"],
  ["LoadingIndicator", "label"],
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
    <Section aria-labelledby={id} className="controls-lab-specimen">
      <SectionHeader
        description={description}
        headingId={id}
        title={title}
      />
      <div className="controls-lab-canvas">{children}</div>
    </Section>
  );
}

export default function ControlsLabPage() {
  return (
    <PageContainer className="controls-lab-page" width="content">
      <header className="controls-lab-hero">
        <p className="controls-lab-kicker">Ready for review</p>
        <h1>Controls make intent legible.</h1>
        <p>
          Twelve primitives cover action, status, disclosure and system feedback
          without borrowing page-level composition.
        </p>
        <dl className="controls-lab-summary">
          <div>
            <dt>Controls</dt>
            <dd>12</dd>
          </div>
          <div>
            <dt>Programme states</dt>
            <dd>4</dd>
          </div>
          <div>
            <dt>Client components</dt>
            <dd>2</dd>
          </div>
        </dl>
      </header>

      <Specimen
        description="Primary, secondary and text buttons share one geometry. Links preserve navigation semantics and inline links keep a visible underline."
        id="actions-heading"
        title="Actions and links"
      >
        <ContentStack gap="large">
          <InlineCluster>
            <Button>Join the waitlist</Button>
            <Button variant="secondary">View course details</Button>
            <Button variant="text">Read the syllabus</Button>
          </InlineCluster>
          <InlineCluster>
            <TextLink href="#control-api-heading">Inspect the API</TextLink>
            <TextLink arrow="back" href="/design-lab/layout">
              Return to layout
            </TextLink>
            <span className="controls-lab-inline-copy">
              Read the <TextLink href="#access-heading" inline>keyboard contract</TextLink>
              {" "}before composing a control family.
            </span>
          </InlineCluster>
          <InlineCluster>
            <Tooltip content="Explains a control whose symbol may be unfamiliar.">
              <IconButton label="Explain this control">
                <Icon name="helpCircle" />
              </IconButton>
            </Tooltip>
            <IconButton label="Close panel" tone="ghost">
              <Icon name="cancel" />
            </IconButton>
            <IconButton disabled label="Unavailable action">
              <Icon name="cancel" />
            </IconButton>
          </InlineCluster>
        </ContentStack>
      </Specimen>

      <Specimen
        description="The state board makes the full primary-button cycle inspectable without requiring pointer input. Natural hover, active and focus behavior remains available above."
        id="button-states-heading"
        title="Button state cycle"
      >
        <Grid className="controls-lab-state-grid">
          {[
            ["Default", "default"],
            ["Hover", "hover"],
            ["Active", "active"],
            ["Focus", "focus"],
          ].map(([label, state]) => (
            <SurfacePanel className="controls-lab-state" key={state} tone="outline">
              <CategoryLabel>{label}</CategoryLabel>
              <Button
                className="controls-lab-state-button"
                data-lab-state={state}
              >
                Register interest
              </Button>
            </SurfacePanel>
          ))}
          <SurfacePanel className="controls-lab-state" tone="outline">
            <CategoryLabel>Disabled</CategoryLabel>
            <Button disabled>Registration closed</Button>
          </SurfacePanel>
          <SurfacePanel className="controls-lab-state" tone="outline">
            <CategoryLabel>Loading</CategoryLabel>
            <Button loading loadingLabel="Submitting registration">
              Submitting
            </Button>
          </SurfacePanel>
        </Grid>
      </Specimen>

      <Specimen
        description="Programme availability is always written in full. Colour and the optional signal reinforce meaning but never carry it alone."
        id="status-heading"
        title="Status and classification"
      >
        <ContentStack gap="large">
          <InlineCluster>
            <StatusBadge status="coming-soon" />
            <StatusBadge status="enrolling" />
            <StatusBadge status="in-progress" />
            <StatusBadge status="closed" />
          </InlineCluster>
          <Divider />
          <InlineCluster>
            <CategoryLabel>Specialist course</CategoryLabel>
            <Tag>Research</Tag>
            <Tag selected>Evaluation</Tag>
            <Tag>Prototyping</Tag>
          </InlineCluster>
          <InlineCluster className="controls-lab-metadata">
            <MetadataItem label="Level" value="Intermediate" />
            <MetadataItem label="Format" value="Cohort course" />
            <MetadataItem label="Duration" layout="inline" value="6 weeks" />
          </InlineCluster>
        </ContentStack>
      </Specimen>

      <Specimen
        description="Accordion and disclosure use buttons with expanded state and controlled regions. Their content is available immediately when motion is reduced."
        id="disclosure-heading"
        title="Disclosure patterns"
      >
        <SplitLayout ratio="5/7">
          <ContentStack>
            <Accordion title="What will I build?">
              <p>
                A working AI-native product prototype, an evaluation plan and a
                concise evidence record for the decisions behind both.
              </p>
            </Accordion>
            <Accordion disabled title="Enrolment details unavailable" />
          </ContentStack>
          <ContentStack>
            <DisclosureRow
              description="Four definitions used throughout the curriculum"
              title="Evidence notation"
            >
              <p>
                Evidence, inference, assumption and unknown labels keep claims
                distinct while a product decision is still forming.
              </p>
            </DisclosureRow>
            <DisclosureRow
              defaultOpen
              title="A deliberately longer disclosure title that still keeps the trigger usable"
            >
              <p>
                Long copy wraps inside the readable column. The control target and
                expansion indicator remain aligned.
              </p>
            </DisclosureRow>
          </ContentStack>
        </SplitLayout>
      </Specimen>

      <Specimen
        description="Progress uses discrete segments without a decorative background track. Loading bars announce a concise status and become static in reduced-motion mode."
        id="feedback-heading"
        title="Progress and feedback"
      >
        <SplitLayout ratio="7/5">
          <SurfacePanel>
            <ProgressIndicator
              current={3}
              label="Example course progress"
              total={6}
            />
          </SurfacePanel>
          <SurfacePanel>
            <ContentStack gap="small">
              <CategoryLabel>Provider response</CategoryLabel>
              <InlineCluster>
                <LoadingIndicator label="Checking availability" />
                <span>Checking availability</span>
              </InlineCluster>
            </ContentStack>
          </SurfacePanel>
        </SplitLayout>
      </Specimen>

      <Section
        aria-labelledby="control-api-heading"
        className="controls-lab-specimen"
        id="control-api"
      >
        <SectionHeader
          description="Each API stays narrow enough to compose without creating impossible prop combinations. Native attributes remain available on the underlying element."
          headingId="control-api-heading"
          title="Public API"
        />
        <div className="controls-lab-api">
          {controlApi.map(([name, props]) => (
            <div key={name}>
              <code>{name}</code>
              <span>{props}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section aria-labelledby="access-heading" className="controls-lab-specimen">
        <SectionHeader
          description="These requirements travel with the components into every future composition."
          headingId="access-heading"
          title="Interaction contract"
        />
        <div className="controls-lab-contract">
          <SurfacePanel tone="outline">
            <h3>Keyboard</h3>
            <p>Tab reaches each action. Enter and Space operate buttons and disclosures.</p>
          </SurfacePanel>
          <SurfacePanel tone="outline">
            <h3>Focus</h3>
            <p>Every interactive primitive uses the rose inner ring and white outer ring.</p>
          </SurfacePanel>
          <SurfacePanel tone="outline">
            <h3>Motion</h3>
            <p>Feedback is brief. Loading becomes static and transitions become instant when motion is reduced.</p>
          </SurfacePanel>
          <SurfacePanel tone="outline">
            <h3>Tokens</h3>
            <p>Controls consume action, status, border, focus, type, spacing and motion roles only.</p>
          </SurfacePanel>
        </div>
      </Section>
    </PageContainer>
  );
}
