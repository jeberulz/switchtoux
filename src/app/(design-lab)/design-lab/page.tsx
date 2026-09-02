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
        <h1>Trust and conversion are in review.</h1>
        <p>
          Credibility, audience routes, instructor evidence and typed conversion
          forms now sit in Design Lab without public pages or providers.
        </p>
      </header>

      <section aria-labelledby="gate-heading" className="lab-gate">
        <div>
          <p className="lab-kicker">Current gate</p>
          <h2 id="gate-heading">Trust, conversion and forms</h2>
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
            <dt>Programme routes</dt>
            <dd>12</dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="scope-heading" className="lab-scope">
        <h2 id="scope-heading">What is available now</h2>
        <p>
          Inspect credibility, instructor evidence and form session specimens.
          Public pages remain absent.
        </p>
        <div className="lab-overview-actions">
          <Link className="lab-primary-link" href="/design-lab/trust">
            Review trust
          </Link>
          <Link className="lab-primary-link" href="/design-lab/forms">
            Review forms
          </Link>
          <Link className="lab-secondary-link" href="/design-lab/programmes">
            Review programmes
          </Link>
        </div>
      </section>
    </div>
  );
}
