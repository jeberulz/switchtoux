import type { HTMLAttributes, ReactNode } from "react";
import { CategoryLabel, StatusBadge, TextLink } from "../controls";
import { Icon } from "../icons";
import type {
  ArticleSectionFixture,
  ResourceCategory,
  ResourceFixture,
  TimelineFixture,
} from "./editorial-data";
import styles from "./editorial.module.css";

function classes(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function ResourceCategoryLabel({ category }: { category: ResourceCategory }) {
  return <CategoryLabel>{category}</CategoryLabel>;
}

export function ResourceMetadata({ resource }: { resource: ResourceFixture }) {
  return (
    <div className={styles.resourceMetadata}>
      <span>{resource.format}</span>
      {resource.author ? <span>By {resource.author}</span> : null}
      {resource.status === "published" && resource.readingTime ? (
        <span>{resource.readingTime}</span>
      ) : null}
    </div>
  );
}

export function FeaturedResource({ resource }: { resource: ResourceFixture }) {
  return (
    <article className={styles.featuredResource}>
      <div className={styles.featuredResourceCopy}>
        <div className={styles.resourceHeading}>
          <ResourceCategoryLabel category={resource.category} />
          {resource.status === "coming-soon" ? <StatusBadge status="coming-soon" /> : <span>Published pattern</span>}
        </div>
        <h3>{resource.title}</h3>
        <p>{resource.description}</p>
        <ResourceMetadata resource={resource} />
        {resource.status === "published" ? (
          <TextLink href={`#${resource.slug}`}>Read article specimen</TextLink>
        ) : (
          <TextLink href="/newsletter">Get the release note</TextLink>
        )}
      </div>
      <div aria-hidden="true" className={styles.featuredResourceVisual}>
        <span>E</span><span>I</span><span>A</span><span>U</span>
      </div>
    </article>
  );
}

export function ResourceListItem({ resource }: { resource: ResourceFixture }) {
  return (
    <article className={styles.resourceListItem}>
      <ResourceCategoryLabel category={resource.category} />
      <div>
        <h3>{resource.title}</h3>
        <p>{resource.description}</p>
      </div>
      <div className={styles.resourceListMeta}>
        <ResourceMetadata resource={resource} />
        {resource.status === "published" ? (
          <TextLink href={`#${resource.slug}`}>Read specimen</TextLink>
        ) : (
          <StatusBadge status="coming-soon" />
        )}
      </div>
    </article>
  );
}

export function ComingSoonResource({ resource }: { resource: ResourceFixture }) {
  return (
    <article className={styles.comingSoonResource}>
      <div>
        <ResourceCategoryLabel category={resource.category} />
        <StatusBadge status="coming-soon" />
      </div>
      <h3>{resource.title}</h3>
      <p>{resource.description}</p>
      <ResourceMetadata resource={resource} />
      <TextLink href="/newsletter">Tell me when it is ready</TextLink>
    </article>
  );
}

export function ArticleProse({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return <article className={classes(styles.articleProse, className)} {...props}>{children}</article>;
}

export function ArticleTableOfContents({
  sections,
}: {
  sections: readonly ArticleSectionFixture[];
}) {
  return (
    <nav aria-label="Article contents" className={styles.articleToc}>
      <span>In this article</span>
      <ol>
        {sections.map((section, index) => (
          <li key={section.id}>
            <a href={`#${section.id}`}><span>{String(index + 1).padStart(2, "0")}</span>{section.label}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PullQuote({ children }: { children: ReactNode }) {
  return <blockquote className={styles.pullQuote}>{children}</blockquote>;
}

export function PrincipleBlock({
  children,
  index,
}: {
  children: ReactNode;
  index: number;
}) {
  return (
    <div className={styles.principleBlock}>
      <span>{String(index).padStart(2, "0")}</span>
      <p>{children}</p>
    </div>
  );
}

export function EvidenceCallout({
  children,
  label = "Evidence note",
}: {
  children: ReactNode;
  label?: string;
}) {
  return (
    <aside className={styles.evidenceCallout}>
      <span>{label}</span>
      <p>{children}</p>
    </aside>
  );
}

export function CodePromptBlock({
  children,
  label,
  language = "text",
}: {
  children: string;
  label: string;
  language?: string;
}) {
  return (
    <figure className={styles.codePromptBlock}>
      <figcaption><span>{label}</span><span>{language}</span></figcaption>
      <pre><code>{children}</code></pre>
    </figure>
  );
}

export function MediaFigure({ caption }: { caption: string }) {
  return (
    <figure className={styles.mediaFigure}>
      <div aria-label="Media placeholder" role="img">
        <Icon name="presentation" size="large" />
        <span>Editorial media slot</span>
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export function DownloadableArtefact({
  description,
  href,
  title,
}: {
  description: string;
  href: string;
  title: string;
}) {
  return (
    <aside className={styles.downloadableArtefact} id="download">
      <Icon name="file" size="large" />
      <div><span>Working artefact</span><h3>{title}</h3><p>{description}</p></div>
      <a download href={href}><Icon name="download" size="small" />Download specimen</a>
    </aside>
  );
}

export function AuthorByline({ name, role }: { name: string; role: string }) {
  return (
    <div className={styles.authorByline}>
      <span aria-hidden="true">JI</span>
      <div><strong>{name}</strong><small>{role}</small></div>
    </div>
  );
}

export function RelatedProgrammeCTA() {
  return (
    <aside className={styles.relatedProgramme}>
      <div><span>Apply the method</span><h3>AI-Native Product Designer</h3><p>Turn grounded decisions into a tested, working product proof.</p></div>
      <TextLink href="/courses/ai-native-product-designer">Explore the course</TextLink>
    </aside>
  );
}

export function NewsletterIssuePreview({ themes }: { themes: readonly string[] }) {
  return (
    <article className={styles.newsletterPreview}>
      <header><span>Design With AI</span><strong>Example issue structure</strong></header>
      <ol>
        {themes.slice(0, 3).map((theme, index) => (
          <li key={theme}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{theme}</strong><p>A practical move, one working example and a question to test.</p></div></li>
        ))}
      </ol>
      <small>Structure only. No published issue is implied.</small>
    </article>
  );
}

export function FounderCareerTimeline({ items }: { items: readonly TimelineFixture[] }) {
  return (
    <ol className={styles.founderTimeline}>
      {items.map((item, index) => (
        <li key={item.company}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <div><strong>{item.company}</strong><small>{item.role}</small></div>
          <p>{item.context}</p>
        </li>
      ))}
    </ol>
  );
}

export function TeachingPrinciplesSection({ principles }: { principles: readonly string[] }) {
  return <div className={styles.teachingPrinciples}>{principles.map((principle, index) => <PrincipleBlock index={index + 1} key={principle}>{principle}</PrincipleBlock>)}</div>;
}

export function NewsletterThemesMap({ themes }: { themes: readonly string[] }) {
  return (
    <ol className={styles.themeMap}>
      {themes.map((theme, index) => <li key={theme}><span>{String(index + 1).padStart(2, "0")}</span><strong>{theme}</strong>{index < themes.length - 1 ? <i aria-hidden="true" /> : null}</li>)}
    </ol>
  );
}
