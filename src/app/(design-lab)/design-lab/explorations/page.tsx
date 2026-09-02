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
        <p className="explorations-kicker">Approved signature set</p>
        <h1>The signature language is selected.</h1>
        <p>
          One direction is approved for each composition family. The original
          recommendations and alternatives remain visible as decision history.
        </p>
        <dl className="explorations-summary">
          <div><dt>Families</dt><dd>{signatureFamilies.length}</dd></div>
          <div><dt>Directions</dt><dd>{signatureFamilies.length * 3}</dd></div>
          <div><dt>Selected</dt><dd>{signatureFamilies.length}</dd></div>
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
        <strong>Decision record</strong>
        <p>
          Selected marks identify the approved direction. Recommendation marks
          preserve the original design guidance where it differs from the decision.
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
              <article
                className="exploration-direction"
                data-recommended={direction.recommended || undefined}
                data-selected={direction.selected || undefined}
                id={direction.id.toLowerCase()}
                key={direction.id}
              >
                <header className="exploration-direction-header">
                  <div>
                    <span>{direction.id}</span>
                    <h3>{direction.name}</h3>
                  </div>
                  {direction.selected ? (
                    <strong data-status="selected">Selected</strong>
                  ) : direction.recommended ? (
                    <strong data-status="recommended">Recommended</strong>
                  ) : null}
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
          <p className="explorations-kicker">Gate approved</p>
          <h2 id="selection-heading">The signature language is approved.</h2>
          <p>
            Programme identity is the next work package. No programme component,
            Figma object or public page has been started here.
          </p>
        </div>
        <Link href="#hero">Return to the first family</Link>
      </section>
    </PageContainer>
  );
}
