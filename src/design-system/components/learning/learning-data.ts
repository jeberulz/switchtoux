import { programmeFixtures, type ProgrammeFixture } from "../programmes";

export interface CurriculumModuleFixture {
  description: string;
  id: string;
  title: string;
}

export interface CourseFaqFixture {
  answer: string;
  question: string;
}

export interface CourseNavigationItem {
  href: `#${string}`;
  label: string;
}

export const flagshipCurriculum: readonly CurriculumModuleFixture[] = [
  {
    id: "workspace",
    title: "The AI-native design workspace",
    description:
      "Understand where Figma, ChatGPT, Codex, Cursor, repositories, APIs and deployment fit. Set up a repeatable working environment and safe information boundaries.",
  },
  {
    id: "framing",
    title: "Grounded problem framing",
    description:
      "Separate Evidence, Inference, Assumption and Unknown. Challenge weak briefs and define the smallest experiment that can produce learning.",
  },
  {
    id: "behaviour",
    title: "How AI products behave",
    description:
      "Build practical mental models for context, retrieval, memory, tools and agents while accounting for latency, cost, inconsistency and privacy.",
  },
  {
    id: "agentic-ux",
    title: "AI interaction and agentic UX",
    description:
      "Design expectations, autonomy, permissions, progress, human checkpoints, correction, undo and failure recovery across changing AI behaviour.",
  },
  {
    id: "working-experience",
    title: "Build the working experience",
    description:
      "Turn the product brief into a responsive prototype using realistic data, conditional states, model interactions and an existing design system where possible.",
  },
  {
    id: "evaluation",
    title: "Evaluate, test and improve",
    description:
      "Define quality, create test cases, evaluate model output, run usability sessions and use failures to refine the experience.",
  },
  {
    id: "ship-proof",
    title: "Ship the proof and tell the story",
    description:
      "Deploy the work, record a concise demo and build a case study that distinguishes human judgment from AI-generated execution.",
  },
] as const;

export const flagshipTools = [
  "Figma",
  "ChatGPT",
  "Codex",
  "Cursor",
  "Repositories",
  "APIs",
  "Deployment",
] as const;

export const flagshipFaqs: readonly CourseFaqFixture[] = [
  {
    question: "How much Figma experience do I need?",
    answer:
      "Basic Figma knowledge is useful, but advanced interface mastery is not required.",
  },
  {
    question: "Do I need professional engineering experience?",
    answer:
      "No. You will work with code, repositories and APIs through guided workflows without being expected to become a software engineer.",
  },
  {
    question: "What will I build?",
    answer:
      "The course focuses on one complete product project rather than a collection of disconnected exercises.",
  },
  {
    question: "Will the tools become outdated?",
    answer:
      "Individual tools will change. The decision, interaction and evaluation methods are designed to remain useful as the tools evolve.",
  },
] as const;

export const courseNavigation: readonly CourseNavigationItem[] = [
  { href: "#outputs", label: "What you create" },
  { href: "#curriculum", label: "Curriculum" },
  { href: "#tools", label: "Tools and context" },
  { href: "#instructor", label: "Instructor" },
  { href: "#questions", label: "Questions" },
] as const;

export const comparisonProgrammes: readonly ProgrammeFixture[] = programmeFixtures;
