import type { HTMLAttributes, ReactNode } from "react";
import { Accordion, CategoryLabel, StatusBadge, TextLink } from "../controls";
import { Icon } from "../icons";
import {
  ProgrammeWaitlistCTA,
  type ProgrammeFixture,
} from "../programmes";
import type {
  CourseFaqFixture,
  CourseNavigationItem,
  CurriculumModuleFixture,
} from "./learning-data";
import styles from "./learning.module.css";

function classes(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export interface CurriculumModuleRowProps
  extends HTMLAttributes<HTMLLIElement> {
  index: number;
  module: CurriculumModuleFixture;
}

export function CurriculumModuleRow({
  className,
  index,
  module,
  ...props
}: CurriculumModuleRowProps) {
  return (
    <li className={classes(styles.moduleRow, className)} id={module.id} {...props}>
      <span className={styles.moduleNumber}>{String(index + 1).padStart(2, "0")}</span>
      <h3>{module.title}</h3>
      <p>{module.description}</p>
    </li>
  );
}

export function CurriculumAccordion({
  modules,
}: {
  modules: readonly CurriculumModuleFixture[];
}) {
  return (
    <div className={styles.curriculumAccordion}>
      {modules.map((module, index) => (
        <Accordion
          defaultOpen={index === 0}
          headingLevel={3}
          key={module.id}
          title={
            <span className={styles.accordionTitle}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{module.title}</strong>
            </span>
          }
        >
          <p>{module.description}</p>
        </Accordion>
      ))}
    </div>
  );
}

export function ToolContextList({ tools }: { tools: readonly string[] }) {
  return (
    <ul className={styles.toolList}>
      {tools.map((tool) => (
        <li key={tool}>{tool}</li>
      ))}
    </ul>
  );
}

export function InstructorCourseBlock() {
  return (
    <article className={styles.instructorBlock}>
      <div aria-hidden="true" className={styles.instructorMark}>JI</div>
      <div>
        <CategoryLabel>Instructor</CategoryLabel>
        <h3>John Iseghohi</h3>
        <p>
          Staff Product Designer working on AI agents at Algolia, with more than
          13 years across product design, team building and design education.
        </p>
        <p className={styles.instructorNote}>
          The course connects product judgment to working behaviour. Tools support
          the decision, but they do not own it.
        </p>
      </div>
    </article>
  );
}

export function CourseFAQGroup({ faqs }: { faqs: readonly CourseFaqFixture[] }) {
  return (
    <div className={styles.faqGroup}>
      {faqs.map((faq) => (
        <Accordion key={faq.question} title={faq.question}>
          <p>{faq.answer}</p>
        </Accordion>
      ))}
    </div>
  );
}

const comparisonRows = [
  ["Best for", (programme: ProgrammeFixture) => programme.description],
  ["Level", (programme: ProgrammeFixture) => programme.level],
  ["Learning format", (programme: ProgrammeFixture) => programme.plannedFormat],
  ["Expected outcome", (programme: ProgrammeFixture) => programme.outcome],
] as const;

export function CourseComparisonTable({
  programmes,
}: {
  programmes: readonly ProgrammeFixture[];
}) {
  return (
    <div className={styles.comparisonTableFrame}>
      <table className={styles.comparisonTable}>
        <caption className="sr-only">Compare all six SwitchToUX courses</caption>
        <thead>
          <tr>
            <th scope="col">Compare</th>
            {programmes.map((programme) => (
              <th scope="col" key={programme.slug}>{programme.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparisonRows.map(([label, read]) => (
            <tr key={label}>
              <th scope="row">{label}</th>
              {programmes.map((programme) => (
                <td key={programme.slug}>{read(programme)}</td>
              ))}
            </tr>
          ))}
          <tr>
            <th scope="row">Course status</th>
            {programmes.map((programme) => (
              <td key={programme.slug}><StatusBadge status={programme.status} /></td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function CourseComparisonRows({
  programmes,
}: {
  programmes: readonly ProgrammeFixture[];
}) {
  return (
    <div className={styles.comparisonRows}>
      {programmes.map((programme, index) => (
        <article className={styles.comparisonEntry} key={programme.slug}>
          <header>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3>{programme.title}</h3>
              <StatusBadge status={programme.status} />
            </div>
          </header>
          <dl>
            {comparisonRows.map(([label, read]) => (
              <div key={label}><dt>{label}</dt><dd>{read(programme)}</dd></div>
            ))}
          </dl>
        </article>
      ))}
    </div>
  );
}

export function CourseInPageNavigation({
  items,
}: {
  items: readonly CourseNavigationItem[];
}) {
  return (
    <nav aria-label="On this course" className={styles.inPageNavigation}>
      <span>On this course</span>
      <ol>
        {items.map((item, index) => (
          <li key={item.href}>
            <a href={item.href}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function StickyWaitlistBar({ programme }: { programme: ProgrammeFixture }) {
  return (
    <aside className={styles.stickyWaitlist}>
      <div>
        <StatusBadge status={programme.status} />
        <strong>{programme.title}</strong>
      </div>
      <ProgrammeWaitlistCTA label="Join course waitlist" slug={programme.slug} />
    </aside>
  );
}

export function RelatedCourseRoute({ programme }: { programme: ProgrammeFixture }) {
  return (
    <article className={styles.relatedCourse}>
      <div>
        <CategoryLabel>Continue the practice</CategoryLabel>
        <h3>{programme.title}</h3>
        <p>{programme.outcome}</p>
      </div>
      <TextLink href={`/courses/${programme.slug}`}>Explore related course</TextLink>
    </article>
  );
}

export function LearningSection({
  children,
  id,
  label,
  title,
}: {
  children: ReactNode;
  id: string;
  label: string;
  title: string;
}) {
  return (
    <section className={styles.learningSection} id={id}>
      <header>
        <span>{label}</span>
        <h2>{title}</h2>
      </header>
      {children}
    </section>
  );
}

export function LearningPathSignal() {
  return (
    <div aria-label="Course progression from decision to proof" className={styles.pathSignal}>
      <span>Decision</span><Icon name="arrowRight" size="small" />
      <span>Behaviour</span><Icon name="arrowRight" size="small" />
      <span>Proof</span>
    </div>
  );
}
