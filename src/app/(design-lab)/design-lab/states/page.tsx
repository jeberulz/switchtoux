import type { Metadata } from "next";
import Link from "next/link";
import manifest from "@/../docs/design-system/component-manifest.json";
import { CategoryLabel } from "@/design-system/components/controls";
import { EmailInput, FieldWrapper } from "@/design-system/components/forms";
import { PageContainer } from "@/design-system/components/layout";
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
} from "@/design-system/components/system";
import "./states-lab.css";

export const metadata: Metadata = {
  title: "System states",
};

const manifestEntries = manifest.families.flatMap((family) =>
  family.components.map((raw) => {
    const component = Array.isArray(raw) ? { id: raw[0], name: raw[1] } : raw;
    return {
      codeStatus: "codeStatus" in component ? component.codeStatus : family.codeStatus,
      id: "id" in component ? component.id : component[0],
    };
  }),
);

const manifestMetrics = [
  ["Catalogue IDs", manifestEntries.length],
  ["Implemented", manifestEntries.filter(({ codeStatus }) => codeStatus === "implemented").length],
  ["Needs revision", manifestEntries.filter(({ codeStatus }) => codeStatus === "needs-revision").length],
  ["Deferred public", manifestEntries.filter(({ codeStatus }) => codeStatus === "deferred-public").length],
] as const;

function StateSpecimen({
  children,
  id,
  name,
}: {
  children: React.ReactNode;
  id: string;
  name: string;
}) {
  return (
    <article className="state-specimen">
      <header><code>{id}</code><h3>{name}</h3></header>
      {children}
    </article>
  );
}

export default function SystemStatesPage() {
  return (
    <PageContainer className="states-page" width="atmospheric">
      <header className="states-hero">
        <p className="states-kicker">System-state gate</p>
        <h1>The system remains useful when the happy path stops.</h1>
        <p>
          Fourteen explicit states preserve meaning, user input and recovery
          without pretending that unavailable content or services succeeded.
        </p>
        <dl>
          {manifestMetrics.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
        </dl>
      </header>

      <nav aria-label="System state groups" className="states-index">
        <Link href="#availability">Availability</Link>
        <Link href="#forms">Form lifecycle</Link>
        <Link href="#infrastructure">Infrastructure</Link>
        <Link href="#fallbacks">Fallbacks</Link>
      </nav>

      <section aria-labelledby="manifest-heading" className="manifest-summary">
        <div><p className="states-kicker">Manifest contract</p><h2 id="manifest-heading">Every specified ID is accounted for.</h2></div>
        <p>
          The manifest distinguishes implemented, composed, deferred-public and
          needs-revision states. R-012 work cannot be promoted into Figma yet.
        </p>
      </section>

      <section aria-labelledby="availability-heading" className="states-section" id="availability">
        <header className="states-section-header"><h2 id="availability-heading">Availability and absence</h2><p>Set expectations first, then provide one relevant route forward.</p></header>
        <div className="availability-layout">
          <StateSpecimen id="SYS-01" name="ComingSoonState">
            <ComingSoonState description="Final dates, format and price will be shared before enrolment opens." interestHref="#approval" title="AI-Native Product Designer" />
          </StateSpecimen>
          <StateSpecimen id="SYS-02" name="EmptyResourceCategory">
            <EmptyResourceCategory category="Evaluation and Product Judgment" resetHref="#availability" />
          </StateSpecimen>
          <StateSpecimen id="SYS-09" name="ContentLoadingState">
            <ContentLoadingState label="Loading resource summaries" />
          </StateSpecimen>
        </div>
      </section>

      <section aria-labelledby="forms-heading" className="states-section" id="forms">
        <header className="states-section-header"><h2 id="forms-heading">Form lifecycle</h2><p>Validation, provider and spam failures stay distinct. Success replaces editable fields.</p></header>
        <div className="form-state-sequence">
          <StateSpecimen id="SYS-05" name="ValidationErrorState">
            <div className="validation-specimen">
              <ValidationErrorState errors={[
                { id: "states-email", message: "Enter a valid email address." },
                { id: "states-consent", message: "Confirm the selected programme emails." },
              ]} />
              <FieldWrapper error="Enter a valid email address." htmlFor="states-email" label="Email">
                <EmailInput aria-invalid="true" id="states-email" name="states-email" />
              </FieldWrapper>
              <div id="states-consent" tabIndex={-1}><CategoryLabel>Programme email consent is required</CategoryLabel></div>
            </div>
          </StateSpecimen>
          <div className="form-state-pair">
            <StateSpecimen id="SYS-04" name="FormFailureState">
              <FormFailureState errorId="WAITLIST-PROVIDER-UNAVAILABLE" message="The provider did not accept this submission. Your answers are still here." />
            </StateSpecimen>
            <StateSpecimen id="SYS-06" name="SpamCheckFailureState">
              <SpamCheckFailureState retryHref="#forms" />
            </StateSpecimen>
          </div>
          <StateSpecimen id="SYS-03" name="FormSuccessState">
            <FormSuccessState actionHref="#availability" actionLabel="Explore another programme" confirmation="Your selected programme interest has been recorded." heading="Waitlist request received." />
          </StateSpecimen>
        </div>
      </section>

      <section aria-labelledby="infrastructure-heading" className="states-section" id="infrastructure">
        <header className="states-section-header"><h2 id="infrastructure-heading">Content and connection recovery</h2><p>Infrastructure failures are named accurately and never rewritten as user error.</p></header>
        <div className="infrastructure-layout">
          <div>
            <StateSpecimen id="SYS-07" name="CMSContentFailureState">
              <CMSContentFailureState fallback={<span>Core course summary and waitlist route remain available.</span>} />
            </StateSpecimen>
            <StateSpecimen id="SYS-12" name="NetworkErrorState">
              <NetworkErrorState retryHref="#infrastructure" />
            </StateSpecimen>
            <StateSpecimen id="SYS-11" name="GeneralErrorState">
              <GeneralErrorState retryHref="#infrastructure" />
            </StateSpecimen>
          </div>
          <StateSpecimen id="SYS-08" name="MissingImageState">
            <MissingImageState alt="Annotated agent approval flow" caption="The caption preserves the intended subject while the source image is restored." />
          </StateSpecimen>
        </div>
      </section>

      <section aria-labelledby="fallbacks-heading" className="states-section" id="fallbacks">
        <header className="states-section-header"><h2 id="fallbacks-heading">Terminal and preference fallbacks</h2><p>The core route and meaning survive missing pages, disabled motion and unavailable atmosphere.</p></header>
        <div className="fallback-layout">
          <StateSpecimen id="SYS-10" name="NotFoundState"><NotFoundState homeHref="/design-lab" /></StateSpecimen>
          <StateSpecimen id="SYS-13" name="ReducedMotionState"><ReducedMotionState /></StateSpecimen>
          <StateSpecimen id="SYS-14" name="StaticAtmosphereFallback"><StaticAtmosphereFallback /></StateSpecimen>
        </div>
      </section>

      <section aria-labelledby="inventory-heading" className="state-inventory">
        <header><p className="states-kicker">Typed inventory</p><h2 id="inventory-heading">Fourteen names, five intents, one recovery language.</h2></header>
        <ol>
          {systemStateDefinitions.map((state) => <li key={state.id}><code>{state.id}</code><strong>{state.component}</strong><span>{state.intent}</span><p>{state.purpose}</p></li>)}
        </ol>
      </section>

      <section aria-labelledby="approval-heading" className="states-approval" id="approval">
        <div><p className="states-kicker">Approval boundary</p><h2 id="approval-heading">Review the final code-side gate.</h2><p>Figma audits and visual revision work remain separate. Public pages and production integrations remain blocked.</p></div>
        <Link href="#availability">Return to state gallery</Link>
      </section>
    </PageContainer>
  );
}
