"use client";

import { useState } from "react";
import { ArtefactStamp, ProofLabel } from "../brand";
import type { ArtefactFixture } from "./programme-data";
import styles from "./programmes.module.css";

function ArtefactDetail({ artefact }: { artefact: ArtefactFixture }) {
  return (
    <div className={styles.artefactDetail}>
      <ProofLabel accent>Sample course artefact</ProofLabel>
      <strong>{artefact.title}</strong>
      <p>{artefact.description}</p>
      <dl>
        {artefact.fields.map((field, index) => (
          <div key={field}>
            <dt>{field}</dt>
            <dd>{index === 0 ? "Example structure" : "Evidence pending"}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function ArtefactEvidenceBoard({ artefacts }: { artefacts: readonly ArtefactFixture[] }) {
  const [selectedId, setSelectedId] = useState(artefacts[0]?.id ?? "");
  const selected = artefacts.find((artefact) => artefact.id === selectedId) ?? artefacts[0];

  if (!selected) return null;

  return (
    <div className={styles.artefactBoard}>
      <div className={styles.artefactDesktopBoard}>
        <ol aria-label="Sample course artefacts" className={styles.artefactIndex}>
          {artefacts.map((artefact, index) => (
            <li key={artefact.id}>
              <button
                aria-pressed={selected.id === artefact.id}
                onClick={() => setSelectedId(artefact.id)}
                type="button"
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{artefact.title}</strong>
                <small>{artefact.code}</small>
              </button>
            </li>
          ))}
        </ol>
        <div aria-live="polite" className={styles.artefactPlane}>
          <ArtefactDetail artefact={selected} />
        </div>
      </div>
      <div className={styles.artefactMobileBoard}>
        {artefacts.map((artefact) => (
          <article key={artefact.id}>
            <ArtefactStamp code={artefact.code} meta="Sample course artefact" title={artefact.title} />
            <p>{artefact.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
