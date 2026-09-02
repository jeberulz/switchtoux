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
        <h1>Learning and publishing are in review.</h1>
        <p>
          Course mechanics, resource states and long-form evidence patterns now
          sit in Design Lab without public pages, CMS or providers.
        </p>
      </header>

      <section aria-labelledby="gate-heading" className="lab-gate">
        <div>
          <p className="lab-kicker">Current gate</p>
          <h2 id="gate-heading">Course learning and editorial</h2>
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
            <dt>Editorial fixtures</dt>
            <dd>6</dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="scope-heading" className="lab-scope">
        <h2 id="scope-heading">What is available now</h2>
        <p>
          Inspect curriculum, comparison, resource and article specimens. Public
          pages remain absent.
        </p>
        <div className="lab-overview-actions">
          <Link className="lab-primary-link" href="/design-lab/learning">
            Review learning
          </Link>
          <Link className="lab-primary-link" href="/design-lab/editorial">
            Review editorial
          </Link>
          <Link className="lab-secondary-link" href="/design-lab/forms">
            Review forms
          </Link>
        </div>
      </section>
    </div>
  );
}
