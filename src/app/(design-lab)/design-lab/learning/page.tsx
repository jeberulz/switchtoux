import type { Metadata } from "next";
import Link from "next/link";
import {
  CourseComparisonRows,
  CourseComparisonTable,
  CourseFAQGroup,
  CourseInPageNavigation,
  CurriculumAccordion,
  CurriculumModuleRow,
  InstructorCourseBlock,
  LearningPathSignal,
  LearningSection,
  RelatedCourseRoute,
  StickyWaitlistBar,
  ToolContextList,
  comparisonProgrammes,
  courseNavigation,
  flagshipCurriculum,
  flagshipFaqs,
  flagshipTools,
} from "@/design-system/components/learning";
import { PageContainer } from "@/design-system/components/layout";
import {
  CourseOutputsList,
  flagshipProgramme,
  specialistProgrammes,
} from "@/design-system/components/programmes";
import "./learning-lab.css";

export const metadata: Metadata = {
  title: "Course learning",
};

const componentGroups = [
  ["CRS-10 to CRS-14", "Course detail", "Modules, tools, instructor and questions"],
  ["CRS-15 to CRS-16", "Comparison", "One semantic table and one labelled mobile form"],
  ["CRS-17, CRS-18, CRS-20", "Wayfinding", "In-page navigation, repeated action and related route"],
] as const;

export default function CourseLearningPage() {
  return (
    <PageContainer className="learning-page" width="atmospheric">
      <header className="learning-hero">
        <p className="learning-kicker">Course-learning gate</p>
        <h1>Turn a curriculum into a path through the work.</h1>
        <p>
          Course mechanics stay legible from detailed module ledgers to a
          six-course decision view, with the action present but never intrusive.
        </p>
        <LearningPathSignal />
      </header>

      <nav aria-label="Course learning specimens" className="learning-index">
        <Link href="#course-detail">Course detail</Link>
        <Link href="#comparison">Course comparison</Link>
        <Link href="#approval">Approval boundary</Link>
      </nav>

      <section aria-labelledby="learning-inventory-heading" className="learning-inventory">
        <header>
          <h2 id="learning-inventory-heading">Component boundary</h2>
          <p>Real course fixtures, responsive structures and no public course page.</p>
        </header>
        <div>
          {componentGroups.map(([ids, label, note]) => (
            <article key={ids}><span>{ids}</span><strong>{label}</strong><p>{note}</p></article>
          ))}
        </div>
      </section>

      <section aria-labelledby="course-detail-heading" className="learning-gate" id="course-detail">
        <header className="learning-section-header">
          <p className="learning-kicker">Course detail system</p>
          <h2 id="course-detail-heading">AI-Native Product Designer</h2>
          <p>
            A three-column course index supports a nine-column reading sequence on
            wide screens. Both become one calm flow on smaller screens.
          </p>
        </header>

        <div className="course-detail-specimen">
          <aside><CourseInPageNavigation items={courseNavigation} /></aside>
          <div className="course-detail-content">
            <LearningSection id="outputs" label="What students create" title="Proof before syllabus">
              <CourseOutputsList outputs={flagshipProgramme.outputs} />
            </LearningSection>
            <LearningSection id="curriculum" label="Seven modules" title="A ledger of learning decisions">
              <ol className="curriculum-ledger">
                {flagshipCurriculum.map((module, index) => <CurriculumModuleRow index={index} key={module.id} module={module} />)}
              </ol>
              <CurriculumAccordion modules={flagshipCurriculum} />
            </LearningSection>
            <LearningSection id="tools" label="Context, not endorsements" title="Tools in the working environment">
              <ToolContextList tools={flagshipTools} />
            </LearningSection>
            <LearningSection id="instructor" label="Teaching practice" title="Judgment stays with the designer">
              <InstructorCourseBlock />
            </LearningSection>
            <LearningSection id="questions" label="Course questions" title="Clear answers before enrolment">
              <CourseFAQGroup faqs={flagshipFaqs} />
            </LearningSection>
            <RelatedCourseRoute programme={specialistProgrammes[0]} />
          </div>
        </div>
        <StickyWaitlistBar programme={flagshipProgramme} />
      </section>

      <section aria-labelledby="comparison-heading" className="learning-gate" id="comparison">
        <header className="learning-section-header">
          <p className="learning-kicker">Courses index system</p>
          <h2 id="comparison-heading">Choose by the capability you need next.</h2>
          <p>
            Desktop supports deliberate scanning across the portfolio. Mobile
            preserves every label inside a sequential comparison.
          </p>
        </header>
        <CourseComparisonTable programmes={comparisonProgrammes} />
        <CourseComparisonRows programmes={comparisonProgrammes} />
      </section>

      <section aria-labelledby="learning-approval-heading" className="learning-approval" id="approval">
        <div><p className="learning-kicker">Approval boundary</p><h2 id="learning-approval-heading">Review the course-learning system.</h2><p>Editorial is documented separately. Public pages, Figma and integrations remain outside this gate.</p></div>
        <Link href="#course-detail">Return to course detail</Link>
      </section>
    </PageContainer>
  );
}
