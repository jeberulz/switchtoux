import type { ProgrammeStatus } from "../controls";

export type ProgrammeCategory = "flagship" | "specialist" | "foundation";
export type ProgrammeCapability = "judgment" | "making" | "trust";

export interface ProgrammeFixture {
  category: ProgrammeCategory;
  capability?: ProgrammeCapability;
  description: string;
  level: string;
  outcome: string;
  outputs: readonly string[];
  plannedFormat: string;
  slug: string;
  status: ProgrammeStatus;
  title: string;
}

export interface WorkshopFixture {
  audience: string;
  duration: string;
  outcome: string;
  slug: string;
  status: ProgrammeStatus;
  title: string;
}

export interface ArtefactFixture {
  code: string;
  description: string;
  fields: readonly string[];
  id: string;
  title: string;
}

export const programmeFixtures: readonly ProgrammeFixture[] = [
  {
    category: "flagship",
    description:
      "Frame AI opportunities, design intelligent behaviour, build a working prototype and evaluate whether it deserves to ship.",
    level: "Product designers with foundational experience",
    outcome:
      "One deployed AI product prototype, evaluation plan, decision log and portfolio case study.",
    outputs: [
      "Grounded opportunity brief",
      "Working deployed prototype",
      "Evaluation rubric and test set",
      "AI-native portfolio case study",
    ],
    plannedFormat: "Six-week live cohort with guided project work",
    slug: "ai-native-product-designer",
    status: "coming-soon",
    title: "AI-Native Product Designer",
  },
  {
    capability: "trust",
    category: "specialist",
    description:
      "Design agents that communicate progress, request permission, recover from failure and keep people meaningfully in control.",
    level: "Mid-level, senior and staff designers",
    outcome: "An agent journey, autonomy model and failure recovery plan.",
    outputs: ["Agent capability contract", "Autonomy-level map", "Agent evaluation plan"],
    plannedFormat: "Three-week intensive",
    slug: "designing-agentic-experiences",
    status: "coming-soon",
    title: "Designing Agentic Experiences",
  },
  {
    capability: "making",
    category: "specialist",
    description:
      "Move from product brief to deployed prototype using AI coding tools, realistic data and reusable design context.",
    level: "Designers building beyond static prototypes",
    outcome: "A responsive working prototype with a tested edge case.",
    outputs: ["Build-ready brief", "Working prototype", "Live deployment and demo"],
    plannedFormat: "Four-week build lab",
    slug: "building-working-prototypes-with-ai",
    status: "coming-soon",
    title: "Building Working Prototypes With AI",
  },
  {
    capability: "judgment",
    category: "specialist",
    description:
      "Use AI to organise and challenge research without turning plausible summaries into evidence.",
    level: "Product designers, researchers and product managers",
    outcome: "An evidence-linked synthesis and grounded opportunity map.",
    outputs: ["Evidence-linked synthesis", "Grounded ledger", "Research readout"],
    plannedFormat: "Two-week practical course",
    slug: "grounded-research-with-ai",
    status: "coming-soon",
    title: "Grounded Research With AI",
  },
  {
    capability: "trust",
    category: "specialist",
    description:
      "Define good AI behaviour, create representative tests and turn model failures into product improvements.",
    level: "Designers and product managers working on AI",
    outcome: "An evaluation rubric, test dataset and failure taxonomy.",
    outputs: ["Quality definition", "Evaluation rubric", "Failure taxonomy"],
    plannedFormat: "Two-week intensive",
    slug: "ai-evals-for-product-designers",
    status: "coming-soon",
    title: "AI Evals for Product Designers",
  },
  {
    category: "foundation",
    description:
      "Learn durable product design foundations while using AI to research, prototype, test and ship a complete project.",
    level: "Beginners and career switchers",
    outcome: "A grounded, accessible product case study backed by a working prototype.",
    outputs: ["Grounded problem brief", "Responsive interface system", "Portfolio case study"],
    plannedFormat: "Eight-week cohort",
    slug: "ai-native-product-design-foundations",
    status: "coming-soon",
    title: "AI-Native Product Design Foundations",
  },
] as const;

export const workshopFixtures: readonly WorkshopFixture[] = [
  {
    audience: "Product designers",
    duration: "Planned one-day lab",
    outcome: "A working prototype that tests one product decision.",
    slug: "build-an-ai-product-prototype",
    status: "coming-soon",
    title: "Build an AI Product Prototype",
  },
  {
    audience: "Designers shaping agentic products",
    duration: "Planned half-day workshop",
    outcome: "An autonomy and permission model for one agent journey.",
    slug: "design-an-agent-users-can-trust",
    status: "coming-soon",
    title: "Design an Agent Users Can Trust",
  },
  {
    audience: "Design and research teams",
    duration: "Planned half-day workshop",
    outcome: "An evidence-linked synthesis with explicit uncertainty.",
    slug: "ai-research-without-false-confidence",
    status: "coming-soon",
    title: "AI Research Without False Confidence",
  },
  {
    audience: "AI product teams",
    duration: "Planned half-day workshop",
    outcome: "A practical quality rubric and representative test set.",
    slug: "write-your-first-product-eval",
    status: "coming-soon",
    title: "Write Your First Product Eval",
  },
  {
    audience: "Designers moving into code",
    duration: "Planned one-day lab",
    outcome: "A responsive code-backed interface from design context.",
    slug: "figma-to-working-product",
    status: "coming-soon",
    title: "Figma to Working Product",
  },
  {
    audience: "Designers preparing their next role",
    duration: "Planned one-day lab",
    outcome: "A case-study structure that separates judgment from execution.",
    slug: "build-your-ai-native-portfolio-case-study",
    status: "coming-soon",
    title: "Build Your AI-Native Portfolio Case Study",
  },
] as const;

export const artefactFixtures: readonly ArtefactFixture[] = [
  {
    code: "OPP",
    description: "Frames the product opportunity, evidence boundary and smallest useful test.",
    fields: ["Context", "Evidence", "Decision", "Next test"],
    id: "opportunity-brief",
    title: "Grounded opportunity brief",
  },
  {
    code: "EVL",
    description: "Separates observations, interpretations, assumptions and unanswered questions.",
    fields: ["Source", "Claim", "Confidence", "Open question"],
    id: "evidence-ledger",
    title: "Evidence ledger",
  },
  {
    code: "CAP",
    description: "Defines useful model capabilities and the product conditions they depend on.",
    fields: ["Capability", "Constraint", "Fallback", "Measure"],
    id: "capability-map",
    title: "AI capability map",
  },
  {
    code: "AUT",
    description: "Makes agent actions, permissions and human checkpoints explicit.",
    fields: ["Action", "Permission", "Checkpoint", "Recovery"],
    id: "autonomy-map",
    title: "Agent autonomy map",
  },
  {
    code: "STB",
    description: "Shows progress, uncertainty, interruption and recovery across a product journey.",
    fields: ["Trigger", "State", "Feedback", "Recovery"],
    id: "behaviour-storyboard",
    title: "Behavioural-state storyboard",
  },
  {
    code: "PRT",
    description: "Turns the selected behaviour into a responsive, code-backed product experience.",
    fields: ["Happy path", "Edge case", "Responsive state", "Build note"],
    id: "working-prototype",
    title: "Working prototype",
  },
  {
    code: "RUB",
    description: "Defines what good behaviour means before results are judged.",
    fields: ["Criterion", "Test case", "Result", "Improvement"],
    id: "evaluation-rubric",
    title: "Evaluation rubric",
  },
  {
    code: "CAS",
    description: "Connects product judgment, implementation choices and measured learning.",
    fields: ["Problem", "Decision", "Proof", "Reflection"],
    id: "portfolio-case-study",
    title: "Portfolio case study",
  },
] as const;

export const flagshipProgramme = programmeFixtures[0];
export const specialistProgrammes = programmeFixtures.filter(
  (programme) => programme.category === "specialist",
);
export const foundationProgramme = programmeFixtures[5];
