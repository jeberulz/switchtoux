import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  ArticleProse,
  ArticleTableOfContents,
  AuthorByline,
  CodePromptBlock,
  ComingSoonResource,
  DownloadableArtefact,
  EvidenceCallout,
  FeaturedResource,
  FounderCareerTimeline,
  MediaFigure,
  NewsletterIssuePreview,
  NewsletterThemesMap,
  PullQuote,
  RelatedProgrammeCTA,
  ResourceListItem,
  TeachingPrinciplesSection,
  articleSections,
  founderTimeline,
  newsletterThemes,
  publishedArticleSpecimen,
  resourceFixtures,
  teachingPrinciples,
} from "../../src/design-system/components/editorial";

describe("editorial system", () => {
  it("keeps all approved release-one resources explicitly coming soon", () => {
    expect(resourceFixtures).toHaveLength(6);
    expect(resourceFixtures.every(({ status }) => status === "coming-soon")).toBe(true);
    expect(resourceFixtures.every(({ author, readingTime }) => !author && !readingTime)).toBe(true);
    expect(new Set(resourceFixtures.map(({ slug }) => slug)).size).toBe(6);
    expect(publishedArticleSpecimen.status).toBe("published");
    expect(publishedArticleSpecimen.title).toContain("Evidence Before Confidence");
  });

  it("distinguishes published, list and coming-soon treatments", () => {
    const markup = renderToStaticMarkup(
      <>
        <FeaturedResource resource={publishedArticleSpecimen} />
        <ResourceListItem resource={resourceFixtures[0]} />
        <ComingSoonResource resource={resourceFixtures[1]} />
      </>,
    );

    expect(markup).toContain("Published pattern");
    expect(markup).toContain("Coming soon");
    expect(markup).toContain("Tell me when it is ready");
    expect(markup).not.toContain("undefined");
  });

  it("renders the complete long-form component family", () => {
    const markup = renderToStaticMarkup(
      <>
        <ArticleTableOfContents sections={articleSections} />
        <ArticleProse>
          <PullQuote>Decision quality stays visible.</PullQuote>
          <EvidenceCallout>Observed behavior with a named source.</EvidenceCallout>
          <CodePromptBlock label="Prompt">Do not invent evidence.</CodePromptBlock>
          <MediaFigure caption="Annotated product behavior" />
          <DownloadableArtefact description="Reusable ledger" href="#fixture" title="Decision ledger" />
          <AuthorByline name="John Iseghohi" role="Product designer" />
          <RelatedProgrammeCTA />
        </ArticleProse>
      </>,
    );

    expect(markup).toContain("aria-label=\"Article contents\"");
    expect(markup).toContain("download=\"\"");
    expect(markup).not.toContain("Grounding prompt");
    expect(markup).toContain("Do not invent evidence");
    expect(markup).toContain("Explore the course");
  });

  it("renders only verified founder sequence and structural newsletter preview", () => {
    const markup = renderToStaticMarkup(
      <>
        <FounderCareerTimeline items={founderTimeline} />
        <TeachingPrinciplesSection principles={teachingPrinciples} />
        <NewsletterThemesMap themes={newsletterThemes} />
        <NewsletterIssuePreview themes={newsletterThemes} />
      </>,
    );

    expect(founderTimeline).toHaveLength(6);
    expect(newsletterThemes).toHaveLength(5);
    expect(teachingPrinciples).toHaveLength(5);
    expect(markup).toContain("Structure only. No published issue is implied.");
    expect(markup).not.toMatch(/\b(19|20)\d{2}\b/);
  });

  it("contains no forbidden dash characters in visible fixture copy", () => {
    expect(JSON.stringify({ founderTimeline, newsletterThemes, resourceFixtures, teachingPrinciples })).not.toMatch(/[—–]/);
  });
});
