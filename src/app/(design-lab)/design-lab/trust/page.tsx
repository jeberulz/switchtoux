import type { Metadata } from "next";
import Link from "next/link";
import { PageContainer } from "@/design-system/components/layout";
import {
  AudienceRouteRows,
  CredibilityRail,
  FinalConvergenceCTA,
  InstructorSplit,
  RoseNewsletterBlock,
} from "@/design-system/components/trust";
import { LabInlineNewsletterForm } from "./trust-newsletter";
import "./trust-lab.css";

export const metadata: Metadata = {
  title: "Trust",
};

const componentGroups = [
  {
    ids: "CMP-03",
    label: "Credibility rail",
    note: "Definition list with company evidence. One row on desktop, two columns on mobile.",
  },
  {
    ids: "CMP-09, CMP-11",
    label: "Audience and instructor",
    note: "Three large route rows and INSTRUCTOR-A split with a photography-pending placeholder",
  },
  {
    ids: "CMP-12, CMP-13",
    label: "Newsletter and convergence",
    note: "Rose newsletter slot plus CTA-A waitlist close. No footer.",
  },
] as const;

export default function TrustPage() {
  return (
    <PageContainer className="trust-page" width="atmospheric">
      <header className="trust-hero">
        <p className="trust-kicker">Trust and conversion gate</p>
        <h1>Proof before the ask.</h1>
        <p>
          Credibility, audience routes, instructor evidence and a single waitlist
          close share one conversion system.
        </p>
      </header>

      <nav aria-label="Trust sections" className="trust-index">
        <Link href="#credibility">Credibility</Link>
        <Link href="#audience">Audience</Link>
        <Link href="#instructor">Instructor</Link>
        <Link href="#newsletter">Newsletter</Link>
        <Link href="#convergence">Convergence</Link>
      </nav>

      <section aria-labelledby="trust-inventory-heading" className="trust-inventory">
        <header>
          <h2 id="trust-inventory-heading">Component boundary</h2>
          <p>Fixture copy, internal links and no production integrations.</p>
        </header>
        <div>
          {componentGroups.map((group) => (
            <article key={group.ids}>
              <span>{group.ids}</span>
              <strong>{group.label}</strong>
              <p>{group.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="credibility-heading" className="trust-section" id="credibility">
        <header className="trust-section-header">
          <h2 id="credibility-heading">Credibility rail</h2>
          <p>
            <code>CMP-03</code> is a bordered definition list. It is not a card grid.
          </p>
        </header>
        <CredibilityRail />
      </section>

      <section aria-labelledby="audience-heading" className="trust-section" id="audience">
        <header className="trust-section-header">
          <h2 id="audience-heading">Audience routes</h2>
          <p>
            <code>CMP-09</code> keeps three large rows. Hover and focus move the arrow
            and brighten the row rule.
          </p>
        </header>
        <AudienceRouteRows />
      </section>

      <section aria-labelledby="instructor-heading" className="trust-section" id="instructor">
        <header className="trust-section-header">
          <h2 id="instructor-heading">Instructor split</h2>
          <p>
            <code>CMP-11</code> / <code>INSTRUCTOR-A</code> uses a 5/7 split. The
            placeholder is the product until a real portrait exists.
          </p>
        </header>
        <InstructorSplit />
      </section>

      <section aria-labelledby="newsletter-heading" className="trust-section" id="newsletter">
        <header className="trust-section-header">
          <h2 id="newsletter-heading">Rose newsletter</h2>
          <p>
            <code>CMP-12</code> is the rose surface. The waitlist does not live here.
          </p>
        </header>
        <RoseNewsletterBlock>
          <LabInlineNewsletterForm />
        </RoseNewsletterBlock>
      </section>

      <section aria-labelledby="convergence-heading" className="trust-section" id="convergence">
        <header className="trust-section-header">
          <h2 id="convergence-heading">Final convergence</h2>
          <p>
            <code>CMP-13</code> / <code>CTA-A</code> labels three paths and one
            all-courses waitlist action. Connectors are decorative.
          </p>
        </header>
        <FinalConvergenceCTA />
      </section>

      <section aria-labelledby="trust-approval-heading" className="trust-approval">
        <div>
          <p className="trust-kicker">Approval boundary</p>
          <h2 id="trust-approval-heading">Review the trust system.</h2>
          <p>
            Editorial, Figma and public pages remain outside this gate.
          </p>
        </div>
        <Link href="#credibility">Return to credibility</Link>
      </section>
    </PageContainer>
  );
}
