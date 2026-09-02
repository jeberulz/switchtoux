export type ResourceCategory =
  | "Grounded Design"
  | "AI-Native Craft"
  | "Designers Who Build"
  | "Evaluation and Product Judgment"
  | "Career Proof";

export type ResourceStatus = "published" | "coming-soon";

export interface ResourceFixture {
  author?: string;
  category: ResourceCategory;
  description: string;
  format: string;
  readingTime?: string;
  slug: string;
  status: ResourceStatus;
  title: string;
}

export interface TimelineFixture {
  company: string;
  context: string;
  role: string;
}

export interface ArticleSectionFixture {
  id: string;
  label: string;
}

export const resourceFixtures: readonly ResourceFixture[] = [
  {
    category: "Career Proof",
    description:
      "Why portfolios increasingly need to show product judgment, working behaviour and evidence of iteration.",
    format: "Essay",
    slug: "entry-level-ux-is-under-pressure",
    status: "coming-soon",
    title: "Entry-Level UX Is Under Pressure. The New Entry Point Is Shipping",
  },
  {
    category: "Grounded Design",
    description:
      "A practical system for separating evidence, inference, assumption and unknown throughout a product project.",
    format: "Guide and template",
    slug: "grounded-design-ledger",
    status: "coming-soon",
    title: "The Grounded Design Ledger",
  },
  {
    category: "AI-Native Craft",
    description:
      "A state model covering intent, planning, action, progress, approval, partial results, failure and recovery.",
    format: "Pattern guide",
    slug: "twelve-states-every-ai-agent-needs",
    status: "coming-soon",
    title: "The Twelve States Every AI Agent Needs",
  },
  {
    category: "Designers Who Build",
    description:
      "Choose a build environment based on the product question, required fidelity and technical constraints.",
    format: "Workflow comparison",
    slug: "figma-make-codex-or-cursor",
    status: "coming-soon",
    title: "Figma Make, Codex or Cursor: Which Should a Designer Use?",
  },
  {
    category: "Evaluation and Product Judgment",
    description:
      "Translate user expectations into repeatable quality criteria and test cases.",
    format: "Practical guide",
    slug: "product-designers-write-ai-evals",
    status: "coming-soon",
    title: "How Product Designers Can Write AI Evals",
  },
  {
    category: "Designers Who Build",
    description:
      "Test one useful outcome, one happy path and one ugly edge case before expanding the product.",
    format: "Field guide",
    slug: "build-proof-not-version-one",
    status: "coming-soon",
    title: "Build Proof, Not Version One",
  },
] as const;

export const publishedArticleSpecimen: ResourceFixture = {
  author: "John Iseghohi",
  category: "Grounded Design",
  description:
    "A Design Lab specimen showing the structure of a published article without claiming a real publication.",
  format: "Article specimen",
  readingTime: "6 min read",
  slug: "published-pattern-specimen",
  status: "published",
  title: "Evidence Before Confidence",
};

export const articleSections: readonly ArticleSectionFixture[] = [
  { id: "problem", label: "The confidence problem" },
  { id: "ledger", label: "Build a decision ledger" },
  { id: "test", label: "Choose the next test" },
  { id: "download", label: "Use the artefact" },
] as const;

export const founderTimeline: readonly TimelineFixture[] = [
  { company: "eTranzact", context: "Early web and product design work", role: "Design practice begins" },
  { company: "Konga", context: "Founding product design experience", role: "Product foundations" },
  { company: "Etisalat Nigeria", context: "UX leadership", role: "Design leadership" },
  { company: "Booking.com", context: "Connected travel products in Amsterdam", role: "Global product systems" },
  { company: "Amazon UK", context: "Insurance and financial products", role: "Complex service design" },
  { company: "Algolia", context: "Staff Product Designer working on AI agents", role: "AI product practice" },
] as const;

export const teachingPrinciples = [
  "Evidence before confidence",
  "Working behaviour before presentation theatre",
  "Human control before invisible automation",
  "Failure testing before launch confidence",
  "Clear judgment before visual volume",
] as const;

export const newsletterThemes = [
  "Grounded product decisions",
  "AI interaction and trust",
  "Designers building with code",
  "Evals and quality",
  "Career and portfolio proof",
] as const;
