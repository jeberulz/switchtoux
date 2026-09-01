import type { Metadata } from "next";
import Link from "next/link";
import {
  DirectionEvidence,
  SignaturePreview,
  signatureFamilies,
} from "@/design-system/explorations";
import { PageContainer } from "@/design-system/components/layout";
import "./explorations-lab.css";

export const metadata: Metadata = {
  title: "Signature explorations",
};

export default function SignatureExplorationsPage() {
  return (
    <PageContainer className="explorations-page" width="atmospheric">
      <header className="explorations-hero">
        <p className="explorations-kicker">Selection gate</p>
        <h1>Choose the signature language.</h1>
        <p>
          Eight composition families test how the system explains judgment,
          learning and proof. Each direction is static first, responsive and
          intentionally unapproved.
        </p>
        <dl className="explorations-summary">
          <div><dt>Families</dt><dd>{signatureFamilies.length}</dd></div>
          <div><dt>Directions</dt><dd>{signatureFamilies.length * 3}</dd></div>
          <div><dt>Preview modes</dt><dd>Desktop + mobile</dd></div>
        </dl>
      </header>

      <nav aria-label="Signature composition families" className="exploration-index">
        {signatureFamilies.map((family) => (
          <Link href={`#${family.id}`} key={family.id}>
            <span>{family.name}</span>
            <small>{family.directions.map((direction) => direction.id).join(" / ")}</small>
          </Link>
        ))}
      </nav>

      <aside className="exploration-instructions">
        <strong>How to review</strong>
        <p>
          Select A, B, C or a named hybrid for every family. Recommendation marks
          show the current design judgment, not an automatic decision.
        </p>
      </aside>

      {signatureFamilies.map((family) => (
        <section aria-labelledby={`${family.id}-heading`} className="exploration-family" id={family.id} key={family.id}>
          <header className="exploration-family-header">
            <h2 id={`${family.id}-heading`}>{family.name}</h2>
            <p>{family.question}</p>
          </header>

          <div className="exploration-directions">
            {family.directions.map((direction) => (
              <article className="exploration-direction" data-recommended={direction.recommended || undefined} id={direction.id.toLowerCase()} key={direction.id}>
                <header className="exploration-direction-header">
                  <div>
                    <span>{direction.id}</span>
                    <h3>{direction.name}</h3>
                  </div>
                  {direction.recommended ? <strong>Recommended</strong> : null}
                </header>

                <div className="exploration-previews">
                  <SignaturePreview direction={direction.key} family={family.id} mode="desktop" />
                  <SignaturePreview direction={direction.key} family={family.id} mode="mobile" />
                </div>

                <DirectionEvidence direction={direction} />
              </article>
            ))}
          </div>
        </section>
      ))}

      <section aria-labelledby="selection-heading" className="exploration-selection">
        <div>
          <p className="explorations-kicker">Approval boundary</p>
          <h2 id="selection-heading">The next move is a selection.</h2>
          <p>
            Programme components remain blocked until every family has an approved
            direction or hybrid. Rejected directions stay here as decision history.
          </p>
        </div>
        <Link href="#hero">Return to the first family</Link>
      </section>
    </PageContainer>
  );
}
