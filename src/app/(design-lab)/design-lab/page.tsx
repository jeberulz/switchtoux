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
        <h1>Resilience and library coverage are in review.</h1>
        <p>
          Fourteen system states and a complete status-aware component manifest
          now form the final code-side gate before Figma.
        </p>
      </header>

      <section aria-labelledby="gate-heading" className="lab-gate">
        <div>
          <p className="lab-kicker">Current gate</p>
          <h2 id="gate-heading">System states and full-library QA</h2>
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
            <dt>Catalogue IDs</dt>
            <dd>166</dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="scope-heading" className="lab-scope">
        <h2 id="scope-heading">What is available now</h2>
        <p>
          Inspect recovery, fallback and loading states alongside the honest
          implementation manifest. Public pages remain absent.
        </p>
        <div className="lab-overview-actions">
          <Link className="lab-primary-link" href="/design-lab/states">
            Review system states
          </Link>
          <Link className="lab-primary-link" href="/design-lab/foundations">
            Review foundations
          </Link>
          <Link className="lab-secondary-link" href="/design-lab/editorial">
            Review editorial
          </Link>
        </div>
      </section>
    </div>
  );
}
