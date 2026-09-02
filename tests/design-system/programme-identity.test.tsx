import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  ArtefactEvidenceBoard,
  CourseCapabilityConstellation,
  FeaturedWorkshopPanel,
  TeamTrainingPanel,
  WorkshopScheduleBoard,
  artefactFixtures,
  flagshipProgramme,
  foundationProgramme,
  programmeFixtures,
  specialistProgrammes,
  workshopFixtures,
} from "../../src/design-system/components/programmes";

describe("programme identity", () => {
  it("defines the approved six-course portfolio and capability grouping", () => {
    expect(programmeFixtures).toHaveLength(6);
    expect(specialistProgrammes).toHaveLength(4);
    expect(programmeFixtures.filter(({ category }) => category === "flagship")).toHaveLength(1);
    expect(programmeFixtures.filter(({ category }) => category === "foundation")).toHaveLength(1);
    expect(new Set(programmeFixtures.map(({ slug }) => slug)).size).toBe(6);
    expect(programmeFixtures.every(({ status }) => status === "coming-soon")).toBe(true);
    expect(new Set(specialistProgrammes.map(({ capability }) => capability))).toEqual(
      new Set(["judgment", "making", "trust"]),
    );
  });

  it("defines six distinct coming-soon workshop routes", () => {
    expect(workshopFixtures).toHaveLength(6);
    expect(new Set(workshopFixtures.map(({ slug }) => slug)).size).toBe(6);
    expect(workshopFixtures.every(({ status }) => status === "coming-soon")).toBe(true);
  });

  it("renders every programme and workshop interest slug", () => {
    const markup = renderToStaticMarkup(
      <>
        <CourseCapabilityConstellation
          flagship={flagshipProgramme}
          foundation={foundationProgramme}
          specialists={specialistProgrammes}
        />
        <FeaturedWorkshopPanel workshop={workshopFixtures[0]} />
        <WorkshopScheduleBoard workshops={workshopFixtures.slice(1)} />
        <TeamTrainingPanel />
      </>,
    );

    for (const { slug } of [...programmeFixtures, ...workshopFixtures]) {
      expect(markup).toContain(`/waitlist?interest=${slug}`);
    }
    expect(markup).toContain("/contact?enquiry=team-training");
  });

  it("renders the complete approved artefact evidence index", () => {
    const markup = renderToStaticMarkup(
      <ArtefactEvidenceBoard artefacts={artefactFixtures} />,
    );

    expect(artefactFixtures).toHaveLength(8);
    for (const artefact of artefactFixtures) {
      expect(markup).toContain(artefact.title);
      expect(markup).toContain(artefact.description);
    }
    expect(markup).toContain("Sample course artefact");
  });

  it("contains no forbidden dash characters in visible fixture copy", () => {
    expect(JSON.stringify({ artefactFixtures, programmeFixtures, workshopFixtures })).not.toMatch(
      /[—–]/,
    );
  });
});
