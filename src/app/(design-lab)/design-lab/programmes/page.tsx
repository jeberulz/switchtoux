import type { Metadata } from "next";
import Link from "next/link";
import {
  ArtefactEvidenceBoard,
  CourseCapabilityConstellation,
  CourseStatusBlock,
  FeaturedWorkshopPanel,
  TeamTrainingPanel,
  WorkshopScheduleBoard,
  artefactFixtures,
  flagshipProgramme,
  foundationProgramme,
  specialistProgrammes,
  workshopFixtures,
} from "@/design-system/components/programmes";
import { PageContainer } from "@/design-system/components/layout";
import "./programmes-lab.css";

export const metadata: Metadata = {
  title: "Programme identity",
};

const componentGroups = [
  {
    ids: "CRS-01 to CRS-09, CRS-19",
    label: "Course identity",
    note: "Flagship, specialists, foundation, metadata, progression and outputs",
  },
  {
    ids: "WRK-01 to WRK-12",
    label: "Workshop identity",
    note: "Feature, schedule rows, audience, outcome and team-training route",
  },
  {
    ids: "CMP-08 / ARTEFACT-B",
    label: "Evidence board",
    note: "Inspectable desktop index with a complete mobile evidence sequence",
  },
] as const;

export default function ProgrammeIdentityPage() {
  return (
    <PageContainer className="programmes-page" width="atmospheric">
      <header className="programmes-hero">
        <p className="programmes-kicker">Programme identity gate</p>
        <h1>One school. Three ways into the work.</h1>
        <p>
          A flagship path, focused capability routes and a foundation entry form
          one connected learning system.
        </p>
        <dl className="programmes-summary">
          <div><dt>Courses</dt><dd>6</dd></div>
          <div><dt>Workshops</dt><dd>6</dd></div>
          <div><dt>Status</dt><dd>Coming soon</dd></div>
        </dl>
      </header>

      <nav aria-label="Programme identity sections" className="programmes-index">
        <Link href="#courses">Course system</Link>
        <Link href="#workshops">Workshop board</Link>
        <Link href="#artefacts">Evidence index</Link>
      </nav>

      <section aria-labelledby="inventory-heading" className="programme-inventory">
        <header>
          <h2 id="inventory-heading">Component boundary</h2>
          <p>Real fixture content, internal links and no production integrations.</p>
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

      <section aria-labelledby="courses-heading" className="programme-section" id="courses">
        <header className="programme-section-header">
          <h2 id="courses-heading">Course capability constellation</h2>
          <p>
            <code>COURSE-B</code> keeps the flagship central while specialist courses cluster
            around judgment, making and trust. The foundation remains a clear entry.
          </p>
        </header>
        <CourseCapabilityConstellation
          flagship={flagshipProgramme}
          foundation={foundationProgramme}
          specialists={specialistProgrammes}
        />
        <div className="status-specimen">
          <h3>Development-state language</h3>
          <CourseStatusBlock programme={flagshipProgramme} />
        </div>
      </section>

      <section aria-labelledby="workshops-heading" className="programme-section" id="workshops">
        <header className="programme-section-header">
          <h2 id="workshops-heading">Workshop programme board</h2>
          <p>
            One workshop receives feature emphasis. The remaining programme reads
            as a schedule with explicit audience, format, outcome and status.
          </p>
        </header>
        <div className="workshop-specimens">
          <FeaturedWorkshopPanel workshop={workshopFixtures[0]} />
          <WorkshopScheduleBoard workshops={workshopFixtures.slice(1)} />
          <TeamTrainingPanel />
        </div>
      </section>

      <section aria-labelledby="artefacts-heading" className="programme-section" id="artefacts">
        <header className="programme-section-header">
          <h2 id="artefacts-heading">Artefact evidence index</h2>
          <p>
            <code>ARTEFACT-B</code> supports detailed inspection without presenting sample
            structures as student work. Mobile keeps every artefact visible in flow.
          </p>
        </header>
        <ArtefactEvidenceBoard artefacts={artefactFixtures} />
      </section>

      <section aria-labelledby="programme-approval-heading" className="programme-approval">
        <div>
          <p className="programmes-kicker">Approval boundary</p>
          <h2 id="programme-approval-heading">Review the programme identity.</h2>
          <p>
            Trust, conversion, forms, editorial, Figma and public pages remain
            outside this gate.
          </p>
        </div>
        <Link href="#courses">Return to course system</Link>
      </section>
    </PageContainer>
  );
}
