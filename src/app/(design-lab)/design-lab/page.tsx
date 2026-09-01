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
        <h1>Foundations before components.</h1>
        <p>
          This lab is the first visual consumer of the approved token source. It
          exists to test the system before any product interface is composed.
        </p>
      </header>

      <section aria-labelledby="gate-heading" className="lab-gate">
        <div>
          <p className="lab-kicker">Current gate</p>
          <h2 id="gate-heading">Ready for foundation review</h2>
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
            <dt>Figma status</dt>
            <dd>Pending file</dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="scope-heading" className="lab-scope">
        <h2 id="scope-heading">What is available now</h2>
        <p>
          Foundations are approved. Layout primitives now define responsive
          width, rhythm, alignment, surfaces and overflow. Public pages remain
          intentionally absent.
        </p>
        <div className="lab-overview-actions">
          <Link className="lab-primary-link" href="/design-lab/layout">
            Inspect layout
          </Link>
          <Link className="lab-secondary-link" href="/design-lab/foundations">
            Review foundations
          </Link>
        </div>
      </section>
    </div>
  );
}
