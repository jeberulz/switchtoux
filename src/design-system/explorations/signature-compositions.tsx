import type { ReactNode } from "react";
import {
  ArtefactStamp,
  AtmosphericField,
  EvidenceLabel,
  ProofLabel,
} from "../components/brand";
import { Button, StatusBadge } from "../components/controls";
import styles from "./signature-compositions.module.css";

export type DirectionKey = "a" | "b" | "c";

export type SignatureFamilyId =
  | "hero"
  | "grounded"
  | "courses"
  | "artefacts"
  | "role"
  | "learning"
  | "instructor"
  | "convergence";

export interface SignatureDirection {
  id: string;
  key: DirectionKey;
  name: string;
  rationale: string;
  composition: string;
  accessibility: string;
  motion: string;
  complexity: string;
  recommendation: string;
  tradeoffs: string;
  recommended?: boolean;
  selected?: boolean;
}

export interface SignatureFamily {
  id: SignatureFamilyId;
  name: string;
  question: string;
  directions: readonly SignatureDirection[];
}

export const signatureFamilies: readonly SignatureFamily[] = [
  {
    id: "hero",
    name: "Ecosystem Hero",
    question: "How should the first viewport explain judgment, AI and proof as one connected system?",
    directions: [
      {
        id: "HERO-A",
        key: "a",
        name: "Split system",
        rationale: "A direct value proposition sits beside a readable ecosystem, giving message and method equal weight.",
        composition: "Five-column copy paired with a seven-column connected node field. Mobile stacks copy before a four-node map.",
        accessibility: "Reading order follows copy, actions, primary nodes, then supporting labels. The diagram has a concise group label.",
        motion: "A rose trace may reveal one path after the copy settles. The complete system is present before animation.",
        complexity: "Low-to-medium CSS grid and positioned paths. No canvas, pointer tracking or client runtime required.",
        recommendation: "Recommended as the clearest balance of confidence, explanation and technical restraint.",
        tradeoffs: "Less editorial drama than the manifesto direction, but easier to scan and adapt across breakpoints.",
        recommended: true,
      },
      {
        id: "HERO-B",
        key: "b",
        name: "Manifesto lattice",
        rationale: "The promise leads at full width while the ecosystem becomes a grounded evidence rail below it.",
        composition: "Large editorial headline above a wide lattice of four outcomes. Mobile converts the lattice to a compact ledger.",
        accessibility: "The headline remains short and the lattice uses a semantic list rather than spatial order alone.",
        motion: "The lattice may disclose from left to right to reinforce progression, with no layout movement.",
        complexity: "Low rendering cost and the smallest DOM of the hero options.",
        recommendation: "Strong when the brand message should dominate and the system can be introduced one beat later.",
        tradeoffs: "The ecosystem feels secondary and the first viewport communicates less product depth.",
        selected: true,
      },
      {
        id: "HERO-C",
        key: "c",
        name: "Central grounding signal",
        rationale: "A central grounding layer visibly mediates between product judgment and working proof.",
        composition: "Copy and proof columns flank a central signal spine. Mobile becomes a top-to-bottom decision sequence.",
        accessibility: "The DOM follows the causal sequence rather than the desktop columns. Connectors are supplementary.",
        motion: "One signal may travel down the centre to explain causality. Reduced motion retains the active segment.",
        complexity: "Medium layout complexity with more breakpoint-specific placement than the other directions.",
        recommendation: "Use if the grounding concept becomes the primary brand story.",
        tradeoffs: "Most distinctive, but it asks first-time visitors to understand a more abstract model immediately.",
      },
    ],
  },
  {
    id: "grounded",
    name: "Grounded Design System",
    question: "How should evidence, inference, assumption and unknowns produce a grounded decision?",
    directions: [
      {
        id: "GROUND-A",
        key: "a",
        name: "Decision quadrants",
        rationale: "Four evidence states surround one conclusion, making the source of a decision visible at a glance.",
        composition: "A two-by-two quadrant frame with a centred decision node. Mobile uses four ordered rows and a final conclusion.",
        accessibility: "Labels are written in full, focus does not rely on proximity, and mobile preserves a logical source-to-decision order.",
        motion: "Hover or focus may highlight one path to the centre. The centre is never hidden or dependent on motion.",
        complexity: "Medium CSS placement with simple state styling and no graph library.",
        recommendation: "Recommended because it is the most ownable visual expression of the notation system.",
        tradeoffs: "Needs a purpose-built mobile transformation rather than a literal scaled diagram.",
        recommended: true,
        selected: true,
      },
      {
        id: "GROUND-B",
        key: "b",
        name: "Evidence ledger",
        rationale: "A rigorous ledger turns each evidence state into an auditable input before the decision is shown.",
        composition: "Four full-width source rows feed a conclusion rail. Mobile retains the same linear structure.",
        accessibility: "Best reading order of the set and no spatial interpretation is required.",
        motion: "Rows may gain an active border as they enter view. The conclusion remains visible from the start.",
        complexity: "Lowest implementation and maintenance cost.",
        recommendation: "Best for documentation-heavy contexts and repeated teaching examples.",
        tradeoffs: "Highly usable, but less recognisable as a signature visual moment.",
      },
      {
        id: "GROUND-C",
        key: "c",
        name: "Converging streams",
        rationale: "Known and uncertain inputs are separated before they converge into a testable decision.",
        composition: "Two vertical input streams converge through a narrow test gate. Mobile interleaves paired inputs before the gate.",
        accessibility: "Each stream has an explicit heading and the convergence relationship is repeated in text.",
        motion: "A paired trace may show both streams reaching the test gate at the same time.",
        complexity: "Medium layout cost and more explanatory copy than the quadrant option.",
        recommendation: "Useful when teaching the difference between confidence and uncertainty is the priority.",
        tradeoffs: "The four-part notation is less immediately visible as a single system.",
      },
    ],
  },
  {
    id: "courses",
    name: "Course Ecosystem",
    question: "How can one flagship, four specialist courses and one foundation route feel like a system rather than six cards?",
    directions: [
      {
        id: "COURSE-A",
        key: "a",
        name: "Flagship spine",
        rationale: "The flagship owns the main axis while specialists branch from its key capabilities.",
        composition: "A large flagship panel beside a vertical capability spine, with specialist branches and a full-width foundation entry.",
        accessibility: "Courses remain a semantic list and branch relationships are repeated in course descriptions.",
        motion: "The spine may reveal from foundation to flagship to specialist paths.",
        complexity: "Medium CSS grid with a stable list fallback and no drag interaction.",
        recommendation: "Recommended because hierarchy and progression stay clear without making specialist courses feel incidental.",
        tradeoffs: "Requires careful copy limits to keep the branching structure readable.",
        recommended: true,
      },
      {
        id: "COURSE-B",
        key: "b",
        name: "Capability constellations",
        rationale: "Courses group around the capability they strengthen rather than around a fixed catalogue order.",
        composition: "Three capability bands contain uneven course placements around a central flagship anchor.",
        accessibility: "Band headings precede their linked courses and visual position never replaces text labels.",
        motion: "A selected capability may brighten its linked courses on focus or hover.",
        complexity: "Highest responsive layout cost because placements shift at tablet and mobile.",
        recommendation: "Choose when capability navigation is more important than a simple learning sequence.",
        tradeoffs: "Distinctive and exploratory, but harder to compare courses quickly.",
        selected: true,
      },
      {
        id: "COURSE-C",
        key: "c",
        name: "Progression terraces",
        rationale: "Increasing visual depth communicates a path from foundation knowledge to shipped proof.",
        composition: "Foundation, specialist and flagship tiers step across the canvas. Mobile becomes three clearly named tiers.",
        accessibility: "Tier names and DOM order communicate progression without relying on indentation.",
        motion: "Each tier may settle into place in sequence, using opacity and transform only.",
        complexity: "Low-to-medium CSS with straightforward mobile reflow.",
        recommendation: "Best when course level and progression matter more than cross-course connections.",
        tradeoffs: "Course relationships feel sequential even when learners could enter at different points.",
      },
    ],
  },
  {
    id: "artefacts",
    name: "Artefact Evidence Board",
    question: "How should course outputs prove applied learning without fabricating student work?",
    directions: [
      {
        id: "ARTEFACT-A",
        key: "a",
        name: "Controlled mosaic",
        rationale: "Varied scale gives tangible outputs the energy of a working evidence wall without becoming a carousel.",
        composition: "An asymmetric twelve-column mosaic of labelled sample artefacts. Mobile uses one ordered stack.",
        accessibility: "All examples are explicitly marked as samples and reading order matches the learning sequence.",
        motion: "Optional focus emphasis may lift one artefact without shifting surrounding layout.",
        complexity: "Medium layout cost with fixed named spans and no masonry script.",
        recommendation: "Recommended for the strongest balance of proof, variety and honest placeholder treatment.",
        tradeoffs: "Requires editorial control over title length and placement across breakpoints.",
        recommended: true,
      },
      {
        id: "ARTEFACT-B",
        key: "b",
        name: "Evidence index",
        rationale: "A numbered index treats artefacts as an inspectable curriculum rather than a gallery.",
        composition: "A narrow artefact index controls a large selected evidence plane. Mobile shows complete indexed rows with no selection dependency.",
        accessibility: "The static state includes every title and output type, so selection is an enhancement rather than a content gate.",
        motion: "A future interactive state may crossfade the selected plane. Focus and selection stay distinct.",
        complexity: "Medium client cost if selection is added later; static version is inexpensive.",
        recommendation: "Best for deep inspection on course detail pages.",
        tradeoffs: "Only one artefact receives strong visual emphasis at a time on desktop.",
        selected: true,
      },
      {
        id: "ARTEFACT-C",
        key: "c",
        name: "Decision records",
        rationale: "Paired input and output records make transformation visible instead of displaying isolated deliverables.",
        composition: "Four horizontal evidence-to-proof pairs with a shared annotation rail. Mobile stacks each pair.",
        accessibility: "Each pair uses explicit source and output headings and connectors are supplementary.",
        motion: "A trace may move from source to output when a pair receives focus.",
        complexity: "Low layout complexity, but content preparation needs both sides of every pair.",
        recommendation: "Use when the teaching method should be clearer than the breadth of outputs.",
        tradeoffs: "Shows fewer artefacts at once and needs stronger source examples later.",
      },
    ],
  },
  {
    id: "role",
    name: "Changing Role Timeline",
    question: "How should the site explain the shift from producing screens to deciding, designing, building and evaluating?",
    directions: [
      {
        id: "ROLE-A",
        key: "a",
        name: "Responsibility handoff",
        rationale: "A before-and-now comparison makes the profession's shift immediate and concrete.",
        composition: "A narrow former-role column hands off to three connected current responsibilities. Mobile reads as a simple transition.",
        accessibility: "The comparison is expressed in headings and sentences, not colour or connector direction.",
        motion: "One trace may cross the handoff and stop at each current responsibility.",
        complexity: "Low CSS and content cost.",
        recommendation: "Recommended because it explains the shift quickly before the curriculum goes deeper.",
        tradeoffs: "The comparison can feel reductive if the former role copy is not carefully framed.",
        recommended: true,
        selected: true,
      },
      {
        id: "ROLE-B",
        key: "b",
        name: "Expanding remit",
        rationale: "A stepped sequence shows responsibilities accumulating rather than replacing craft.",
        composition: "Four increasingly wide responsibility bands move from decide to evaluate. Mobile uses equal-width ordered bands.",
        accessibility: "Each band has a complete action and outcome statement. Width is redundant to the written sequence.",
        motion: "Bands may reveal in order to communicate accumulation, with no pinned scrolling.",
        complexity: "Low implementation cost and strong responsive behaviour.",
        recommendation: "Best when the narrative must respect existing design craft while showing a broader remit.",
        tradeoffs: "Less contrast between the old and emerging role.",
      },
      {
        id: "ROLE-C",
        key: "c",
        name: "Decision at the centre",
        rationale: "Judgment becomes the constant that connects research, design, building and evaluation.",
        composition: "A central judgment rail anchors responsibilities on alternating sides. Mobile becomes a single aligned timeline.",
        accessibility: "Alternating placement collapses to source order and each connection is described by the responsibility text.",
        motion: "The centre rail may gain one active segment as each responsibility enters view.",
        complexity: "Medium layout complexity with careful alternating alignment.",
        recommendation: "Use if judgment should become the most repeated brand idea.",
        tradeoffs: "More conceptual than the direct before-and-now comparison.",
      },
    ],
  },
  {
    id: "learning",
    name: "Learning Model",
    question: "How should learn, build, test and ship read as a repeatable practice rather than a four-step checklist?",
    directions: [
      {
        id: "LEARN-A",
        key: "a",
        name: "Practice loop",
        rationale: "A closed loop makes iteration and repeated judgment part of the learning promise.",
        composition: "Four stages occupy the corners of a loop around a proof signal. Mobile becomes an ordered sequence with a return cue.",
        accessibility: "Ordered markup communicates sequence and the return relationship is written after the final stage.",
        motion: "One trace may complete the loop once to explain iteration, never run perpetually.",
        complexity: "Medium CSS placement with a simple stacked mobile form.",
        recommendation: "Strong when iteration should feel more important than a fixed teaching sequence.",
        tradeoffs: "The circular idea can imply no clear entry point unless Learn remains visibly first.",
      },
      {
        id: "LEARN-B",
        key: "b",
        name: "Proof ladder",
        rationale: "Each stage earns a more concrete form of proof, making outcomes visible throughout the process.",
        composition: "A vertical stage rail pairs every action with an artefact. Desktop adds a sticky index; mobile remains linear.",
        accessibility: "Strong source order, visible stage names and complete artefact labels.",
        motion: "A stage signal may update as the user scrolls, while all panels remain rendered.",
        complexity: "Medium if scroll state is added, low as the static composition shown here.",
        recommendation: "Recommended because it matches the specified vertical learning sequence and ties every stage to proof.",
        tradeoffs: "Uses more vertical space and feels less like a signature homepage moment.",
        recommended: true,
        selected: true,
      },
      {
        id: "LEARN-C",
        key: "c",
        name: "Behaviour exchange",
        rationale: "Paired action and evidence columns show that every taught behaviour creates something inspectable.",
        composition: "Four action-to-output rows cross a central test line. Mobile keeps each action beside its output in a compact pair.",
        accessibility: "Every row has an explicit action and output relationship; the centre line is decorative.",
        motion: "Focus may move a short signal from action to output as feedback.",
        complexity: "Low CSS and no scroll orchestration.",
        recommendation: "Use when artefact outcomes should be more prominent than iteration.",
        tradeoffs: "The overall learning journey feels more procedural and less cyclical.",
      },
    ],
  },
  {
    id: "instructor",
    name: "Instructor Split",
    question: "How should founder experience, teaching principles and a real portrait share authority?",
    directions: [
      {
        id: "INSTRUCTOR-A",
        key: "a",
        name: "Experience and proof rail",
        rationale: "A reserved portrait area anchors the person while a career rail substantiates the teaching point of view.",
        composition: "Five-column portrait placeholder beside seven-column bio, principles and company rail. Mobile places identity before biography.",
        accessibility: "The placeholder states that final photography is pending and introduces no fabricated likeness or alt text.",
        motion: "A final photograph may receive a restrained entrance. Career evidence remains static.",
        complexity: "Low layout cost. Image optimisation becomes the only added production concern later.",
        recommendation: "Recommended because it balances human presence with verifiable experience.",
        tradeoffs: "Depends on obtaining a strong real portrait before public launch.",
        recommended: true,
        selected: true,
      },
      {
        id: "INSTRUCTOR-B",
        key: "b",
        name: "Editorial profile",
        rationale: "Biography leads like an essay while the portrait and career facts act as supporting evidence.",
        composition: "A wide editorial statement leads, followed by a narrow portrait and career chronology.",
        accessibility: "Linear reading order and short paragraphs reduce cognitive load. The chronology uses a semantic list.",
        motion: "No planned motion beyond standard focus and image loading behaviour.",
        complexity: "Lowest technical cost and least breakpoint-specific styling.",
        recommendation: "Best when the founder's written point of view is the main trust signal.",
        tradeoffs: "Less visual connection to the system language used elsewhere.",
      },
      {
        id: "INSTRUCTOR-C",
        key: "c",
        name: "Teaching principles",
        rationale: "Three principles lead, with the instructor framed as the evidence behind them rather than the sole subject.",
        composition: "A large principles field surrounds a compact identity block and portrait placeholder.",
        accessibility: "Principles use ordered headings and the visual overlap disappears on mobile.",
        motion: "Focus may connect a principle to one supporting experience statement.",
        complexity: "Medium responsive composition with modest overlap at desktop only.",
        recommendation: "Use if the pedagogical method needs to lead the trust story.",
        tradeoffs: "The instructor may feel less immediately personal than in the split direction.",
      },
    ],
  },
  {
    id: "convergence",
    name: "Final Convergence CTA and Footer",
    question: "How should the learning system converge on one action and then resolve into the footer?",
    directions: [
      {
        id: "CTA-A",
        key: "a",
        name: "Convergence frame",
        rationale: "The system's core ideas visibly narrow into one waitlist action before the footer settles the page.",
        composition: "Three labelled paths converge on a centred CTA, followed by a quiet two-level footer. Mobile uses a vertical sequence.",
        accessibility: "The CTA has one unambiguous intent and connector labels remain readable without their paths.",
        motion: "Paths may resolve toward the action once. The button never moves and reduced motion is fully static.",
        complexity: "Low-to-medium CSS with no client state.",
        recommendation: "Recommended because it completes the system story without competing with the action.",
        tradeoffs: "Requires enough preceding system language for the convergence to feel earned.",
        recommended: true,
        selected: true,
      },
      {
        id: "CTA-B",
        key: "b",
        name: "Rose dispatch",
        rationale: "A high-contrast newsletter dispatch creates one decisive colour event before the quieter course CTA and footer.",
        composition: "A full-width rose newsletter band sits above a black course action rail and compact footer columns.",
        accessibility: "Newsletter and course waitlist remain separate actions with explicit labels and high-contrast controls.",
        motion: "No ambient motion. Submission feedback would be the only animated state.",
        complexity: "Low layout cost, with form validation work deferred to the form component phase.",
        recommendation: "Best if newsletter growth is strategically equal to course interest.",
        tradeoffs: "Two adjacent conversion moments divide attention near the end of the page.",
      },
      {
        id: "CTA-C",
        key: "c",
        name: "Open system footer",
        rationale: "The CTA becomes one active node inside a broader map of courses, methods and writing.",
        composition: "A wide system frame contains the action and feeds directly into an expanded navigational footer.",
        accessibility: "Navigation groups have clear headings and the primary action precedes all secondary destinations.",
        motion: "A selected path may connect the CTA to a destination on focus, with no automatic loop.",
        complexity: "Medium content and navigation maintenance cost.",
        recommendation: "Use when the final page should invite exploration rather than close on a single conversion.",
        tradeoffs: "The primary waitlist action loses some dominance as footer navigation expands.",
      },
    ],
  },
] as const;

const stages = ["Learn", "Build", "Test", "Ship"] as const;
const responsibilities = ["Decide", "Design", "Build", "Evaluate"] as const;

function MiniCopy({ compact = false }: { compact?: boolean }) {
  return (
    <div className={styles.miniCopy} data-compact={compact || undefined}>
      <span>Switch to UX / For the AI era</span>
      <strong>Design with judgment. Build with AI. Ship proof.</strong>
      <p>Learn to make grounded product decisions and turn them into working evidence.</p>
      <div className={styles.miniActions}>
        <span>Join the waitlist</span>
        <span>Explore courses</span>
      </div>
    </div>
  );
}

function Node({ active = false, children }: { active?: boolean; children: ReactNode }) {
  return <div className={styles.previewNode} data-active={active || undefined}>{children}</div>;
}

function Path({ vertical = false }: { vertical?: boolean }) {
  return <span aria-hidden="true" className={styles.previewPath} data-vertical={vertical || undefined} />;
}

function HeroPreview({ direction }: { direction: DirectionKey }) {
  if (direction === "a") {
    return (
      <div className={styles.heroSplit}>
        <MiniCopy />
        <div aria-label="Connected learning ecosystem" className={styles.heroMap} role="group">
          <Node>Evidence</Node><Path /><Node active>Judgment</Node>
          <Node>Prototype</Node><Path /><Node>Evaluation</Node>
          <span className={styles.signal}>Grounding layer</span>
        </div>
      </div>
    );
  }
  if (direction === "b") {
    return (
      <div className={styles.heroManifesto}>
        <MiniCopy compact />
        <ol className={styles.heroLattice}>
          {["Evidence", "Decision", "Working code", "Portfolio proof"].map((item) => <li key={item}>{item}</li>)}
        </ol>
      </div>
    );
  }
  return (
    <div className={styles.heroConverge}>
      <div className={styles.heroConvergeCopy}><MiniCopy compact /></div>
      <div className={styles.heroSignal}><span>Grounding</span><Path vertical /><strong>AI-native product design</strong></div>
      <div className={styles.heroProof}><ProofLabel accent>Working proof</ProofLabel><Node>Prototype</Node><Node>Evaluation</Node></div>
    </div>
  );
}

function GroundedPreview({ direction }: { direction: DirectionKey }) {
  const labels = ["evidence", "inference", "assumption", "unknown"] as const;
  if (direction === "a") {
    return (
      <div className={styles.groundedQuadrants}>
        {labels.map((kind) => <div key={kind}><EvidenceLabel kind={kind} /><small>{kind === "evidence" ? "Observed behaviour" : kind === "inference" ? "Interpreted meaning" : kind === "assumption" ? "Belief to test" : "Open question"}</small></div>)}
        <strong>Grounded decision</strong>
      </div>
    );
  }
  if (direction === "b") {
    return (
      <div className={styles.groundedLedger}>
        {labels.map((kind) => <div key={kind}><EvidenceLabel kind={kind} /><span>Source statement and confidence</span></div>)}
        <div className={styles.ledgerDecision}><span>Conclusion</span><strong>Grounded decision</strong></div>
      </div>
    );
  }
  return (
    <div className={styles.groundedStreams}>
      <div><span>Known</span><EvidenceLabel kind="evidence" /><EvidenceLabel kind="inference" /></div>
      <div className={styles.testGate}><Path vertical /><strong>Test</strong><Path vertical /></div>
      <div><span>Uncertain</span><EvidenceLabel kind="assumption" /><EvidenceLabel kind="unknown" /></div>
      <strong className={styles.streamDecision}>Grounded decision</strong>
    </div>
  );
}

function CourseLabel({ title, flagship = false }: { title: string; flagship?: boolean }) {
  return <div className={styles.courseLabel} data-flagship={flagship || undefined}><StatusBadge status="coming-soon" /><strong>{title}</strong><small>{flagship ? "Frame, design, build, evaluate and ship" : "Specialist course"}</small></div>;
}

function CoursesPreview({ direction }: { direction: DirectionKey }) {
  if (direction === "a") {
    return (
      <div className={styles.courseSpine}>
        <CourseLabel flagship title="AI-Native Product Designer" />
        <div className={styles.courseBranches}>
          {["Agent UX", "Design systems", "Working code", "Evaluation"].map((item) => <CourseLabel key={item} title={item} />)}
        </div>
        <div className={styles.courseFoundation}>Foundation course <span>Entry route</span></div>
      </div>
    );
  }
  if (direction === "b") {
    return (
      <div className={styles.courseConstellation}>
        <div><span>Judgment</span><CourseLabel title="Product judgment" /></div>
        <CourseLabel flagship title="AI-Native Product Designer" />
        <div><span>Making</span><CourseLabel title="Working code" /><CourseLabel title="Design systems" /></div>
        <div><span>Trust</span><CourseLabel title="Agent UX" /><CourseLabel title="Evaluation" /></div>
      </div>
    );
  }
  return (
    <div className={styles.courseTerraces}>
      <div><span>Foundation</span><CourseLabel title="AI product foundations" /></div>
      <div><span>Specialise</span><CourseLabel title="Agent UX" /><CourseLabel title="Evaluation" /></div>
      <div><span>Integrate</span><CourseLabel flagship title="AI-Native Product Designer" /></div>
    </div>
  );
}

const artefacts = [
  ["OPP", "Opportunity brief"], ["EVL", "Evidence ledger"], ["CAP", "Capability map"], ["AUT", "Autonomy map"],
  ["STB", "Behaviour storyboard"], ["PRT", "Working prototype"], ["RUB", "Evaluation rubric"], ["CAS", "Portfolio case study"],
] as const;

function ArtefactsPreview({ direction }: { direction: DirectionKey }) {
  if (direction === "a") {
    return <div className={styles.artefactMosaic}>{artefacts.map(([code, title]) => <ArtefactStamp code={code} key={code} meta="Sample course artefact" title={title} />)}</div>;
  }
  if (direction === "b") {
    return (
      <div className={styles.artefactIndex}>
        <ol>{artefacts.map(([code, title]) => <li key={code}><span>{code}</span>{title}</li>)}</ol>
        <div className={styles.artefactPlane}><span>Sample course artefact</span><strong>Grounded opportunity brief</strong><p>Context, evidence, decision and next test.</p></div>
      </div>
    );
  }
  return (
    <div className={styles.artefactPairs}>
      {[["Opportunity brief", "Evidence ledger"], ["Capability map", "Autonomy map"], ["Behaviour storyboard", "Working prototype"], ["Evaluation rubric", "Portfolio case study"]].map(([input, output]) => <div key={input}><span>{input}</span><Path /><strong>{output}</strong></div>)}
    </div>
  );
}

function RolePreview({ direction }: { direction: DirectionKey }) {
  if (direction === "a") {
    return (
      <div className={styles.roleHandoff}>
        <div><span>Before</span><strong>Deliver screens</strong></div><Path />
        <div className={styles.roleNow}><span>Now</span>{["Decide what matters", "Design behaviour", "Build and evaluate"].map((item) => <Node key={item}>{item}</Node>)}</div>
      </div>
    );
  }
  if (direction === "b") {
    return <div className={styles.roleBands}>{responsibilities.map((item, index) => <div key={item} style={{ "--band": index + 1 } as React.CSSProperties}><span>{item}</span><small>{index === 0 ? "Choose the right problem" : index === 1 ? "Shape the behaviour" : index === 2 ? "Make it real" : "Test the failure"}</small></div>)}</div>;
  }
  return (
    <div className={styles.roleCentre}>
      <strong>Product judgment</strong>
      {responsibilities.map((item, index) => <div data-side={index % 2 ? "right" : "left"} key={item}><span>{item}</span><small>{index === 0 ? "Evidence" : index === 1 ? "Behaviour" : index === 2 ? "Prototype" : "Evaluation"}</small></div>)}
    </div>
  );
}

function LearningPreview({ direction }: { direction: DirectionKey }) {
  if (direction === "a") {
    return (
      <div className={styles.learningLoop}>
        {stages.map((stage, index) => <div key={stage}><span>{stage}</span><small>{index === 0 ? "the decision" : index === 1 ? "the behaviour" : index === 2 ? "the failure" : "the proof"}</small></div>)}
        <strong>Practice again</strong>
      </div>
    );
  }
  if (direction === "b") {
    return (
      <div className={styles.learningLadder}>
        <ol>{stages.map((stage) => <li key={stage}>{stage}</li>)}</ol>
        <div>{[["Learn", "Decision note"], ["Build", "Prototype"], ["Test", "Evaluation"], ["Ship", "Case study"]].map(([stage, proof]) => <div key={stage}><span>{stage}</span><ArtefactStamp code={stage.slice(0, 3).toUpperCase()} title={proof} /></div>)}</div>
      </div>
    );
  }
  return (
    <div className={styles.learningExchange}>
      {[["Learn the decision", "Decision record"], ["Build the behaviour", "Working prototype"], ["Test the failure", "Evaluation rubric"], ["Ship the proof", "Case study"]].map(([action, proof]) => <div key={action}><span>{action}</span><Path /><strong>{proof}</strong></div>)}
    </div>
  );
}

function PortraitPlaceholder() {
  return <div aria-label="Portrait photography pending" className={styles.portraitPlaceholder} role="img"><span>Real founder portrait</span><small>Photography pending</small></div>;
}

function InstructorPreview({ direction }: { direction: DirectionKey }) {
  if (direction === "a") {
    return (
      <div className={styles.instructorSplit}>
        <PortraitPlaceholder />
        <div><span>Instructor</span><strong>Product design experience, taught through working proof.</strong><p>13+ years in product design and 200+ designers taught.</p><div className={styles.companyRail}><span>Algolia</span><span>Amazon</span><span>Booking.com</span></div></div>
      </div>
    );
  }
  if (direction === "b") {
    return (
      <div className={styles.instructorEditorial}>
        <blockquote>“Learn to make decisions you can explain, build and test.”</blockquote>
        <div><PortraitPlaceholder /><ol><li>Product design leadership</li><li>AI product practice</li><li>Design education</li></ol></div>
      </div>
    );
  }
  return (
    <div className={styles.instructorPrinciples}>
      <ol><li><strong>Ground every claim</strong><span>Separate evidence from assumption.</span></li><li><strong>Build the behaviour</strong><span>Move beyond static screens.</span></li><li><strong>Ship inspectable proof</strong><span>Show the decision and the test.</span></li></ol>
      <div><PortraitPlaceholder /><span>Founder and instructor</span></div>
    </div>
  );
}

function ConvergencePreview({ direction }: { direction: DirectionKey }) {
  if (direction === "a") {
    return (
      <div className={styles.ctaConvergence}>
        <div>{["Judgment", "Working code", "Evaluation"].map((item) => <span key={item}>{item}<Path /></span>)}</div>
        <div><strong>Build proof that holds up.</strong><Button>Join the course waitlist</Button></div>
        <footer><span>Courses</span><span>Workshops</span><span>Writing</span><span>About</span></footer>
      </div>
    );
  }
  if (direction === "b") {
    return (
      <div className={styles.ctaDispatch}>
        <div><strong>Get the practical dispatch.</strong><span>Email address</span><button type="button">Subscribe</button></div>
        <div><span>Ready for the full system?</span><strong>Join the course waitlist</strong></div>
        <footer><span>Switch to UX</span><span>Courses</span><span>Workshops</span></footer>
      </div>
    );
  }
  return (
    <div className={styles.ctaOpenSystem}>
      <div><ProofLabel accent>Next decision</ProofLabel><strong>Choose your route into AI-native product design.</strong><Button>Join the waitlist</Button></div>
      <div aria-label="Preview footer navigation groups" className={styles.previewNavigation} role="group"><span>Learn</span><strong>Courses</strong><strong>Workshops</strong><span>Apply</span><strong>Grounded Design</strong><strong>Artefacts</strong></div>
    </div>
  );
}

const previews: Record<SignatureFamilyId, (props: { direction: DirectionKey }) => ReactNode> = {
  hero: HeroPreview,
  grounded: GroundedPreview,
  courses: CoursesPreview,
  artefacts: ArtefactsPreview,
  role: RolePreview,
  learning: LearningPreview,
  instructor: InstructorPreview,
  convergence: ConvergencePreview,
};

export function SignaturePreview({ direction, family, mode }: { direction: DirectionKey; family: SignatureFamilyId; mode: "desktop" | "mobile" }) {
  const Preview = previews[family];
  return (
    <div aria-label={`${mode} composition preview`} className={styles.previewViewport} data-preview-mode={mode} tabIndex={mode === "desktop" ? 0 : undefined}>
      <div className={styles.previewViewportHeader}><span>{mode}</span><span>{mode === "desktop" ? "1440" : "375"}</span></div>
      <AtmosphericField className={styles.previewCanvas} intensity="quiet">
        <Preview direction={direction} />
      </AtmosphericField>
    </div>
  );
}

export function DirectionEvidence({ direction }: { direction: SignatureDirection }) {
  return (
    <div className={styles.directionEvidence}>
      <div className={styles.evidenceLead}>
        <div><span>Rationale</span><p>{direction.rationale}</p></div>
        <div><span>Composition</span><p>{direction.composition}</p></div>
      </div>
      <dl>
        <div><dt>Accessibility</dt><dd>{direction.accessibility}</dd></div>
        <div><dt>Motion</dt><dd>{direction.motion}</dd></div>
        <div><dt>Complexity</dt><dd>{direction.complexity}</dd></div>
      </dl>
      <div
        className={styles.recommendation}
        data-recommended={direction.recommended || undefined}
        data-selected={direction.selected || undefined}
      >
        <span>
          {direction.selected
            ? "Approved direction"
            : direction.recommended
              ? "Recommended direction"
              : "Selection guidance"}
        </span>
        <p>{direction.recommendation}</p>
        <small>{direction.tradeoffs}</small>
      </div>
    </div>
  );
}
