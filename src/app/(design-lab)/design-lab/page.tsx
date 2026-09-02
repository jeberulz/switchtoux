import type { Metadata } from "next";
import Link from "next/link";
import tokenReport from "@/design-system/generated/token-report.json";

export const metadata: Metadata = {
  title: "Overview",
};

export default function DesignLabOverview() {
  return (
    <div className="lab-overview">
      <header className="lab-hero">
        <p className="lab-kicker">Internal system workspace</p>
        <h1>The signature language is approved.</h1>
        <p>
          Eight composition decisions now define how the system explains judgment,
          learning and proof. Programme identity is the next work package.
        </p>
      </header>

      <section aria-labelledby="gate-heading" className="lab-gate">
        <div>
          <p className="lab-kicker">Current gate</p>
          <h2 id="gate-heading">Programme identity next</h2>
        </div>
        <dl className="lab-metrics">
          <div>
            <dt>Canonical tokens</dt>
            <dd>{tokenReport.counts.tokens}</dd>
          </div>
          <div>
            <dt>Contrast checks</dt>
            <dd>{tokenReport.contrastChecks.length} passed</dd>
          </div>
          <div>
            <dt>Selected directions</dt>
            <dd>8</dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="scope-heading" className="lab-scope">
        <h2 id="scope-heading">What is available now</h2>
        <p>
          Review the approved set alongside the original recommendations and
          alternatives. Public pages remain absent.
        </p>
        <div className="lab-overview-actions">
          <Link className="lab-primary-link" href="/design-lab/explorations">
            Review selections
          </Link>
          <Link className="lab-secondary-link" href="/design-lab/brand">
            Inspect brand
          </Link>
          <Link className="lab-secondary-link" href="/design-lab/layout">
            Review layout
          </Link>
        </div>
      </section>
    </div>
  );
}
