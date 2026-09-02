import type { ReactNode } from "react";
import { ConnectionPath } from "../brand";
import { CategoryLabel, TextLink } from "../controls";
import { SplitLayout } from "../layout";
import { ALL_COURSES_INTEREST, ProgrammeWaitlistCTA } from "../programmes";
import {
  audienceRoutes,
  convergenceCopy,
  convergencePaths,
  credibilityItems,
  instructorFixture,
  newsletterCopy,
  type InstructorFixture,
} from "./trust-data";
import styles from "./trust.module.css";

export function CredibilityRail() {
  return (
    <dl className={styles.credibilityRail}>
      {credibilityItems.map((item) => (
        <div key={item.label}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function AudienceRouteRows() {
  return (
    <ol className={styles.audienceRows}>
      {audienceRoutes.map((route) => (
        <li className={styles.audienceRow} key={route.index}>
          <span className={styles.audienceIndex}>{route.index}</span>
          <div className={styles.audienceCopy}>
            <h3>{route.title}</h3>
            <p>{route.problem}</p>
          </div>
          <TextLink href={route.href}>{route.action}</TextLink>
        </li>
      ))}
    </ol>
  );
}

export interface InstructorSplitProps {
  instructor?: InstructorFixture;
}

export function InstructorSplit({
  instructor = instructorFixture,
}: InstructorSplitProps) {
  return (
    <SplitLayout className={styles.instructorSplit} ratio="5/7">
      <div className={styles.instructorPlaceholder}>
        <p>{instructor.placeholder}</p>
      </div>
      <div className={styles.instructorCopy}>
        <CategoryLabel className={styles.instructorEyebrow}>Instructor</CategoryLabel>
        <h2>{instructor.name}</h2>
        <p className={styles.instructorRole}>{instructor.role}</p>
        <p className={styles.instructorBio}>{instructor.bio}</p>
        <ol className={styles.principlesList}>
          {instructor.principles.map((principle) => (
            <li key={principle}>{principle}</li>
          ))}
        </ol>
        <ul className={styles.careerList}>
          {instructor.career.map((item) => (
            <li key={item.company}>
              {item.company}, {item.role}
            </li>
          ))}
        </ul>
      </div>
    </SplitLayout>
  );
}

export function RoseNewsletterBlock({ children }: { children: ReactNode }) {
  return (
    <section className={styles.roseNewsletter}>
      <CategoryLabel className={styles.roseEyebrow}>{newsletterCopy.eyebrow}</CategoryLabel>
      <h2>{newsletterCopy.title}</h2>
      <p>{newsletterCopy.body}</p>
      {children}
    </section>
  );
}

export function FinalConvergenceCTA() {
  return (
    <section className={styles.convergence}>
      <h2>{convergenceCopy.title}</h2>
      <p>{convergenceCopy.body}</p>
      <div className={styles.convergencePaths}>
        {convergencePaths.flatMap((path, index) => {
          const link = (
            <TextLink href={path.href} key={path.href}>
              {path.label}
            </TextLink>
          );
          if (index === convergencePaths.length - 1) return [link];
          return [
            link,
            <ConnectionPath key={`${path.href}-connector`} />,
          ];
        })}
      </div>
      <div className={styles.convergenceAction}>
        <ProgrammeWaitlistCTA label={convergenceCopy.action} slug={ALL_COURSES_INTEREST} />
      </div>
    </section>
  );
}
