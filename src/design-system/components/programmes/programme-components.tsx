import type { HTMLAttributes, ReactNode } from "react";
import { ArtefactStamp, ConnectionPath, ProofLabel } from "../brand";
import { CategoryLabel, MetadataItem, StatusBadge, TextLink } from "../controls";
import type {
  ProgrammeCapability,
  ProgrammeFixture,
  WorkshopFixture,
} from "./programme-data";
import styles from "./programmes.module.css";

function classes(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

const categoryLabels: Record<ProgrammeFixture["category"], string> = {
  flagship: "Flagship programme",
  specialist: "Specialist course",
  foundation: "Career-switcher foundation",
};

const capabilityLabels: Record<ProgrammeCapability, string> = {
  judgment: "Judgment",
  making: "Making",
  trust: "Trust",
};

export interface ProgrammeWaitlistCTAProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  label?: string;
  slug: string;
}

export function ProgrammeWaitlistCTA({
  className,
  label = "Join this course waitlist",
  slug,
  ...props
}: ProgrammeWaitlistCTAProps) {
  return (
    <div className={classes(styles.waitlistCta, className)} {...props}>
      <TextLink href={`/waitlist?interest=${slug}`}>{label}</TextLink>
    </div>
  );
}

export function CourseStatusBlock({ programme }: { programme: ProgrammeFixture }) {
  return (
    <div className={styles.statusBlock}>
      <StatusBadge status={programme.status} />
      <p>
        This course is in development. Final dates, format and price will be
        shared before enrolment opens.
      </p>
    </div>
  );
}

export function CourseMetadataPanel({ programme }: { programme: ProgrammeFixture }) {
  return (
    <dl className={styles.metadataPanel}>
      <div>
        <dt>Level</dt>
        <dd>{programme.level}</dd>
      </div>
      <div>
        <dt>Planned format</dt>
        <dd>{programme.plannedFormat}</dd>
      </div>
    </dl>
  );
}

export function CourseOutcomeStatement({ children }: { children: ReactNode }) {
  return (
    <div className={styles.outcomeStatement}>
      <ProofLabel accent>Expected outcome</ProofLabel>
      <p>{children}</p>
    </div>
  );
}

export function CourseProgressionMap() {
  const steps = ["Frame", "Design", "Build", "Evaluate", "Ship"] as const;

  return (
    <ol aria-label="Flagship course progression" className={styles.progressionMap}>
      {steps.map((step, index) => (
        <li key={step}>
          <span>{step}</span>
          {index < steps.length - 1 ? <ConnectionPath active /> : null}
        </li>
      ))}
    </ol>
  );
}

export function CourseOutputsList({ outputs }: { outputs: readonly string[] }) {
  return (
    <ul className={styles.outputsList}>
      {outputs.map((output) => (
        <li key={output}>{output}</li>
      ))}
    </ul>
  );
}

export function ArtefactPreview({ code, title }: { code: string; title: string }) {
  return <ArtefactStamp code={code} meta="Sample course artefact" title={title} />;
}

export interface FlagshipCourseFeatureProps {
  programme: ProgrammeFixture;
}

export function FlagshipCourseFeature({ programme }: FlagshipCourseFeatureProps) {
  return (
    <article className={styles.flagshipFeature}>
      <div className={styles.flagshipLead}>
        <div className={styles.programmeHeading}>
          <CategoryLabel>{categoryLabels[programme.category]}</CategoryLabel>
          <StatusBadge status={programme.status} />
        </div>
        <h2>{programme.title}</h2>
        <p className={styles.programmeDescription}>{programme.description}</p>
        <CourseOutcomeStatement>{programme.outcome}</CourseOutcomeStatement>
        <ProgrammeWaitlistCTA slug={programme.slug} />
      </div>
      <div className={styles.flagshipSystem}>
        <CourseProgressionMap />
        <CourseMetadataPanel programme={programme} />
        <div className={styles.flagshipOutputs}>
          <span>Students create</span>
          <CourseOutputsList outputs={programme.outputs} />
        </div>
      </div>
    </article>
  );
}

export interface SpecialistCourseCardProps {
  programme: ProgrammeFixture;
}

export function SpecialistCourseCard({ programme }: SpecialistCourseCardProps) {
  if (!programme.capability) return null;

  return (
    <article className={styles.specialistCard}>
      <div className={styles.programmeHeading}>
        <CategoryLabel>{capabilityLabels[programme.capability]}</CategoryLabel>
        <StatusBadge status={programme.status} />
      </div>
      <h3>{programme.title}</h3>
      <p className={styles.programmeDescription}>{programme.description}</p>
      <CourseMetadataPanel programme={programme} />
      <ProgrammeWaitlistCTA slug={programme.slug} />
    </article>
  );
}

export interface FoundationCourseEntryProps {
  programme: ProgrammeFixture;
}

export function FoundationCourseEntry({ programme }: FoundationCourseEntryProps) {
  return (
    <article className={styles.foundationEntry}>
      <div>
        <CategoryLabel>{categoryLabels[programme.category]}</CategoryLabel>
        <h2>{programme.title}</h2>
      </div>
      <div>
        <p className={styles.programmeDescription}>{programme.description}</p>
        <CourseMetadataPanel programme={programme} />
      </div>
      <div>
        <StatusBadge status={programme.status} />
        <ProgrammeWaitlistCTA slug={programme.slug} />
      </div>
    </article>
  );
}

export function CourseCapabilityConstellation({
  flagship,
  foundation,
  specialists,
}: {
  flagship: ProgrammeFixture;
  foundation: ProgrammeFixture;
  specialists: readonly ProgrammeFixture[];
}) {
  const capabilities = (["judgment", "making", "trust"] as const).map(
    (capability) => ({
      capability,
      programmes: specialists.filter(
        (programme) => programme.capability === capability,
      ),
    }),
  );

  return (
    <div className={styles.constellation}>
      <FlagshipCourseFeature programme={flagship} />
      <div className={styles.capabilityField}>
        {capabilities.map(({ capability, programmes }) => (
          <section className={styles.capabilityGroup} data-capability={capability} key={capability}>
            <header>
              <span>{capabilityLabels[capability]}</span>
              <small>{programmes.length} route{programmes.length === 1 ? "" : "s"}</small>
            </header>
            <div>
              {programmes.map((programme) => (
                <SpecialistCourseCard key={programme.slug} programme={programme} />
              ))}
            </div>
          </section>
        ))}
      </div>
      <FoundationCourseEntry programme={foundation} />
    </div>
  );
}

export interface WorkshopRowProps {
  index: number;
  workshop: WorkshopFixture;
}

export function WorkshopRow({ index, workshop }: WorkshopRowProps) {
  return (
    <li className={styles.workshopRow}>
      <span className={styles.workshopNumber}>{String(index + 1).padStart(2, "0")}</span>
      <div className={styles.workshopTitle}>
        <h3>{workshop.title}</h3>
        <p>{workshop.outcome}</p>
      </div>
      <div className={styles.workshopMeta}>
        <MetadataItem label="Audience" value={workshop.audience} />
        <MetadataItem label="Format" value={workshop.duration} />
      </div>
      <div className={styles.workshopAction}>
        <StatusBadge status={workshop.status} />
        <ProgrammeWaitlistCTA label="Join workshop list" slug={workshop.slug} />
      </div>
    </li>
  );
}

export function FeaturedWorkshopPanel({ workshop }: { workshop: WorkshopFixture }) {
  return (
    <article className={styles.featuredWorkshop}>
      <div>
        <CategoryLabel>Featured workshop</CategoryLabel>
        <StatusBadge status={workshop.status} />
      </div>
      <h2>{workshop.title}</h2>
      <p>{workshop.outcome}</p>
      <div className={styles.featuredWorkshopFooter}>
        <MetadataItem label="Audience" value={workshop.audience} />
        <MetadataItem label="Format" value={workshop.duration} />
        <ProgrammeWaitlistCTA label="Join workshop list" slug={workshop.slug} />
      </div>
    </article>
  );
}

export function WorkshopScheduleBoard({ workshops }: { workshops: readonly WorkshopFixture[] }) {
  return (
    <ol className={styles.workshopBoard}>
      {workshops.map((workshop, index) => (
        <WorkshopRow index={index} key={workshop.slug} workshop={workshop} />
      ))}
    </ol>
  );
}

export function TeamTrainingPanel() {
  return (
    <aside className={styles.teamTraining}>
      <div>
        <CategoryLabel>Team training</CategoryLabel>
        <h2>Build a shared AI product practice.</h2>
      </div>
      <p>
        Adapt one workshop around your team&apos;s product context, decision gaps and
        working constraints.
      </p>
      <TextLink href="/contact?enquiry=team-training">Discuss team training</TextLink>
    </aside>
  );
}
