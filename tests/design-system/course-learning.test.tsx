import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  CourseComparisonRows,
  CourseComparisonTable,
  CourseFAQGroup,
  CourseInPageNavigation,
  CurriculumAccordion,
  CurriculumModuleRow,
  InstructorCourseBlock,
  RelatedCourseRoute,
  StickyWaitlistBar,
  ToolContextList,
  comparisonProgrammes,
  courseNavigation,
  flagshipCurriculum,
  flagshipFaqs,
  flagshipTools,
} from "../../src/design-system/components/learning";
import {
  flagshipProgramme,
  specialistProgrammes,
} from "../../src/design-system/components/programmes";

describe("course learning", () => {
  it("defines the complete flagship learning fixtures", () => {
    expect(flagshipCurriculum).toHaveLength(7);
    expect(flagshipFaqs).toHaveLength(4);
    expect(flagshipTools).toContain("Codex");
    expect(courseNavigation).toHaveLength(5);
    expect(new Set(flagshipCurriculum.map(({ id }) => id)).size).toBe(7);
  });

  it("renders numbered curriculum in ledger and disclosure forms", () => {
    const markup = renderToStaticMarkup(
      <>
        <ol>
          {flagshipCurriculum.map((module, index) => (
            <CurriculumModuleRow index={index} key={module.id} module={module} />
          ))}
        </ol>
        <CurriculumAccordion modules={flagshipCurriculum} />
      </>,
    );

    expect(markup).toContain("01");
    expect(markup).toContain("07");
    for (const lesson of flagshipCurriculum) {
      expect(markup).toContain(lesson.title);
      expect(markup).toContain(lesson.description);
    }
  });

  it("keeps desktop and mobile comparison content in parity", () => {
    const desktop = renderToStaticMarkup(
      <CourseComparisonTable programmes={comparisonProgrammes} />,
    );
    const mobile = renderToStaticMarkup(
      <CourseComparisonRows programmes={comparisonProgrammes} />,
    );

    expect(desktop).toContain("<table");
    expect(desktop).toContain("Best for");
    expect(mobile).toContain("Best for");
    for (const programme of comparisonProgrammes) {
      expect(desktop).toContain(programme.title);
      expect(mobile).toContain(programme.title);
      expect(desktop).toContain(programme.outcome);
      expect(mobile).toContain(programme.outcome);
    }
  });

  it("renders wayfinding, tools, FAQs and valid programme routes", () => {
    const markup = renderToStaticMarkup(
      <>
        <CourseInPageNavigation items={courseNavigation} />
        <ToolContextList tools={flagshipTools} />
        <InstructorCourseBlock />
        <CourseFAQGroup faqs={flagshipFaqs} />
        <StickyWaitlistBar programme={flagshipProgramme} />
        <RelatedCourseRoute programme={specialistProgrammes[0]} />
      </>,
    );

    expect(markup).toContain("aria-label=\"On this course\"");
    expect(markup).toContain("/waitlist?interest=ai-native-product-designer");
    expect(markup).toContain("/courses/designing-agentic-experiences");
    expect(markup).toContain("John Iseghohi");
  });

  it("contains no forbidden dash characters in visible fixture copy", () => {
    expect(JSON.stringify({ flagshipCurriculum, flagshipFaqs, flagshipTools })).not.toMatch(/[—–]/);
  });
});
