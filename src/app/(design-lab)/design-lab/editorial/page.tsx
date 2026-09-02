import type { Metadata } from "next";
import Link from "next/link";
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
} from "@/design-system/components/editorial";
import { PageContainer } from "@/design-system/components/layout";
import "./editorial-lab.css";

export const metadata: Metadata = {
  title: "Editorial system",
};

export default function EditorialSystemPage() {
  return (
    <PageContainer className="editorial-page" width="atmospheric">
      <header className="editorial-hero">
        <p className="editorial-kicker">Editorial gate</p>
        <h1>Useful evidence deserves a publishing system.</h1>
        <p>
          Resources read as applied working material, then expand into a precise
          long-form system for examples, evidence and artefacts.
        </p>
      </header>

      <nav aria-label="Editorial specimens" className="editorial-index">
        <Link href="#resources">Resource index</Link>
        <Link href="#article">Article detail</Link>
        <Link href="#founder">Founder and newsletter</Link>
      </nav>

      <section aria-labelledby="resources-heading" className="editorial-gate" id="resources">
        <header className="editorial-section-header">
          <p className="editorial-kicker">EDT-01 to EDT-05</p>
          <h2 id="resources-heading">A feature and a publication ledger.</h2>
          <p>
            The published treatment below is explicitly a Design Lab pattern.
            Every real release-one resource remains marked Coming soon.
          </p>
        </header>
        <FeaturedResource resource={publishedArticleSpecimen} />
        <div className="resource-ledger">
          {resourceFixtures.slice(0, 5).map((resource) => <ResourceListItem key={resource.slug} resource={resource} />)}
        </div>
        <div className="coming-soon-specimen">
          <div><p className="editorial-kicker">Dedicated future state</p><h3>Description before an empty article.</h3></div>
          <ComingSoonResource resource={resourceFixtures[5]} />
        </div>
      </section>

      <section aria-labelledby="article-heading" className="editorial-gate" id="article">
        <header className="editorial-section-header">
          <p className="editorial-kicker">EDT-06 to EDT-15</p>
          <h2 id="article-heading">The long-form evidence stack.</h2>
          <p>
            A narrow reading column carries the argument. Navigation, media and
            calls to action support it without interrupting the useful content.
          </p>
        </header>
        <div className="article-specimen">
          <aside><ArticleTableOfContents sections={articleSections} /></aside>
          <ArticleProse id={publishedArticleSpecimen.slug}>
            <p className="article-deck">
              AI can make an uncertain idea sound resolved. A grounded design
              practice keeps the source, interpretation and open question visible.
            </p>
            <AuthorByline name="John Iseghohi" role="Staff Product Designer and educator" />
            <h2 id="problem">The confidence problem</h2>
            <p>
              Fluent output is not evidence. It is a proposal that still needs a
              source, a boundary and a reason to influence the product decision.
            </p>
            <PullQuote>The quality of a design decision depends on what can be traced, not how confidently it is presented.</PullQuote>
            <EvidenceCallout label="E / observed">
              Three moderated sessions showed people pausing before an automated action. This supports investigating control and explanation, not redesigning the entire flow.
            </EvidenceCallout>
            <h2 id="ledger">Build a decision ledger</h2>
            <p>
              Give every consequential claim one status: evidence, inference,
              assumption or unknown. The labels make disagreement useful because
              the team can see what kind of work should happen next.
            </p>
            <CodePromptBlock label="Grounding prompt" language="prompt">
              {`For each claim, return:\n- source evidence\n- interpretation\n- confidence\n- unanswered question\n\nDo not invent missing evidence.`}
            </CodePromptBlock>
            <MediaFigure caption="A media slot can carry a diagram, annotated interface or working-example capture." />
            <h2 id="test">Choose the next test</h2>
            <p>
              Do not solve every unknown at once. Choose the smallest test that
              can change the decision, then record what the result actually proves.
            </p>
            <DownloadableArtefact description="A static Design Lab target demonstrates the download treatment. Production files remain out of scope." href="#download-specimen" title="Grounded decision ledger" />
            <RelatedProgrammeCTA />
          </ArticleProse>
        </div>
      </section>

      <section aria-labelledby="founder-heading" className="editorial-gate" id="founder">
        <header className="editorial-section-header">
          <p className="editorial-kicker">INT-11 to INT-13, EDT-16</p>
          <h2 id="founder-heading">Experience becomes a connected teaching practice.</h2>
          <p>No invented dates, logo wall, metrics or published newsletter issue.</p>
        </header>
        <div className="founder-grid">
          <div><h3>Career route</h3><FounderCareerTimeline items={founderTimeline} /></div>
          <div><h3>The designer owns the decision</h3><TeachingPrinciplesSection principles={teachingPrinciples} /></div>
        </div>
        <div className="newsletter-system">
          <div><p className="editorial-kicker">Design With AI</p><h3>Five recurring routes into stronger practice.</h3><NewsletterThemesMap themes={newsletterThemes} /></div>
          <NewsletterIssuePreview themes={newsletterThemes} />
        </div>
      </section>

      <section aria-labelledby="editorial-approval-heading" className="editorial-approval">
        <div><p className="editorial-kicker">Approval boundary</p><h2 id="editorial-approval-heading">Review the editorial system.</h2><p>System states are next. Figma, CMS, providers and public pages remain deferred.</p></div>
        <Link href="#resources">Return to resource index</Link>
      </section>
    </PageContainer>
  );
}
