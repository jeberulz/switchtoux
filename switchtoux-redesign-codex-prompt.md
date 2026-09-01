# Build Prompt: Switch to UX Website Redesign

You are a senior product designer, brand designer, content designer and frontend engineer. Redesign and build the complete Switch to UX website at `switchtoux.com`.

Do not treat this as a cosmetic reskin of a traditional UX bootcamp. Rebuild the information architecture, messaging and page system around the new positioning below.

## Required companion documents

Read these three files completely before implementation:

1. `switchtoux-redesign-prd.md` for product requirements, architecture, integrations, security and acceptance criteria.
2. `switchtoux-DESIGN.md` for visual direction, design tokens, composition, responsive behaviour, component geometry, motion and atmospheric effects.
3. This build prompt for approved copy, programme content and page-by-page instructions.

If the documents conflict, `switchtoux-DESIGN.md` controls visual design, the PRD controls product behaviour and this prompt controls approved copy. Do not begin page implementation until the design tokens and global composition in `switchtoux-DESIGN.md` have been understood.

## 1. Product and brand context

Switch to UX is becoming a practical school for AI-native product designers.

The old platform mainly taught UX fundamentals to career switchers. The new platform must teach designers how to:

1. Find and frame worthwhile product problems.
2. Direct AI using strong context, evidence and constraints.
3. Design useful and trustworthy AI behaviours.
4. Build working prototypes, not only static Figma screens.
5. Test usability, model behaviour, uncertainty and failure cases.
6. Ship proof and explain the human judgment behind the work.

The new website should feel like a credible, modern design school created by an experienced product designer working on real AI products. It should not resemble a generic bootcamp, online course template or AI startup landing page.

### Brand name

Switch to UX

### Brand descriptor

The practical school for AI-native product designers.

### Core message

Design with judgment. Build with AI. Ship proof.

### Positioning statement

Switch to UX helps product designers and serious career switchers learn how to research, design, build and evaluate intelligent products. Students go beyond static screens and leave with working prototypes that demonstrate how they think.

### Founder

John Iseghohi is a Staff Product Designer working on AI Agent Studio at Algolia. He has more than 13 years of product design experience across Algolia, Amazon, Booking.com, Etisalat, Konga and eTranzact. He has taught more than 200 designers and has experience as a UX instructor and workshop facilitator.

Do not describe John as a Senior UX Designer at Amazon. That information is outdated.

Do not invent employer claims, student outcomes, testimonials, course dates, prices, accreditations or company endorsements.

### Signature ideas

The educational system is built around four ideas:

1. **Grounded Design**: Separate Evidence, Inference, Assumption and Unknown before making product decisions.
2. **AI-Native Craft**: Design for uncertainty, latency, trust, correction, permissions and failure recovery.
3. **Build Proof, Not Version One**: Build the smallest working experience that can test the product decision.
4. **Teaching Designers to Build**: Use Figma, Codex, Cursor, APIs, MCP and code-backed prototypes without pretending every designer needs to become a software engineer.

## 2. Primary business goal

The site must build credibility and collect qualified interest for upcoming courses and workshops.

All courses are currently **Coming soon**. Do not show Enrol now, Buy now, fake start dates, fake countdown timers, false scarcity or unavailable checkout flows.

The primary conversion is:

**Join the course waitlist**

Every course CTA must preserve which course the visitor is interested in.

Secondary conversions are:

- Subscribe to the Design With AI newsletter.
- Register interest in a live workshop.
- Enquire about a private team workshop.
- Learn about John and the teaching approach.

## 3. Audience priority

Design the experience for these audiences in this order:

### Primary audience

Working UX and product designers who understand basic design practice but feel behind on AI. They want practical skills, credible workflows, stronger portfolios and the ability to design or build AI products.

### Secondary audience

Serious career switchers who want to enter product design through current workflows rather than learn an outdated, Figma-only process.

### Third audience

Design leaders and product teams looking for practical AI-native design training.

Avoid messaging that suggests everybody is a beginner. Avoid fear-based messaging about AI replacing designers. Be direct about the rising bar while remaining constructive.

## 4. Tone of voice

Use a clear, confident and experience-led voice.

The writing should be:

- Practical rather than theoretical.
- Direct without sounding aggressive.
- Intelligent without consultant language.
- Optimistic without AI hype.
- Concise enough to scan on a phone.
- Focused on outcomes and visible work.

Avoid:

- “Unlock your potential.”
- “Revolutionise your workflow.”
- “Supercharge your creativity.”
- “The future is here.”
- “AI will not replace you.”
- “10x designer.”
- Robot imagery, glowing brains, neon AI gradients and generic generated people.
- Unprovable claims such as “companies are competing to hire our students.”
- Long generic paragraphs that could belong to any bootcamp.

## 5. Visual design direction

Use `switchtoux-DESIGN.md` as the complete visual source of truth. It adapts the attached Integration Ecosystem reference into an editorial, high-craft product lab and design school.

### Desired feeling

- Precise
- Bold
- Thoughtful
- Experimental
- Human
- Technically credible
- Mature enough for senior designers and company teams

### Suggested visual system

- Use a dark-only colour system.
- Use black as the main page canvas.
- Use zinc surfaces and fine neutral borders to create depth.
- Use white and zinc text with strong contrast.
- Use rose `#F43F5E` as the primary focal accent.
- Use Inter for display and body copy.
- Use JetBrains Mono for labels, technical metadata and Grounded Design notation.
- Strong typographic hierarchy with large editorial headlines.
- Use an open-source font through `next/font` or the existing project font system.
- Preserve the connected ecosystem composition, atmospheric depth and first-screen signal of the attached design reference.
- Use generous spacing, a 12-column grid, fine borders and concise labels.
- Cards should feel structured and useful, not like interchangeable SaaS cards.
- Use brackets, evidence labels, decision logs, state diagrams and prototype artefacts as visual language.
- Use 14px geometry for standard cards and controls. Pills are reserved for compact status and metadata.
- Motion should communicate state or hierarchy, not decorate the page.
- Respect `prefers-reduced-motion`.
- Use a performant WebGL, canvas, SVG or CSS ecosystem effect in the homepage hero as specified in `switchtoux-DESIGN.md`.
- Ensure all semantic hero content remains readable if the atmospheric effect is disabled or fails.

### Visual motifs

Use CSS, SVG or lightweight authored graphics to show:

- `[E] Evidence`
- `[I] Inference`
- `[A] Assumption`
- `[X] Unknown`
- Product journey states
- A prompt becoming a plan, prototype and evaluation
- Prototype windows with loading, permission and recovery states
- Evaluation scorecards
- Design-to-code context flows

Do not depend on random stock photography. If founder photography is not available, build a strong text-led founder section with a clearly marked image placeholder and instructions for replacing it. Do not fabricate a portrait.

Do not reintroduce the earlier off-white, yellow or blue palette. Do not add a light-mode switcher in release one.

## 6. Technical approach

First inspect the repository and follow any existing `AGENTS.md`, package conventions, components, content sources and deployment configuration.

If this is an existing production project:

- Preserve working integrations and analytics.
- Do not replace the framework or delete useful code without a clear reason.
- Identify unrelated user changes and leave them untouched.
- Reuse strong existing brand assets where appropriate.

If the repository is empty or unsuitable, use:

- Next.js with App Router
- TypeScript
- Tailwind CSS
- Accessible React components
- `next/font`
- `next/image`
- MDX or a typed local content system for resources
- Zod for form validation
- A small number of carefully selected dependencies

Do not add a heavy CMS for the first version. Keep courses, workshops, FAQs and navigation in typed content files that can later be connected to a CMS.

Create a central status model:

```ts
type ProgrammeStatus =
  | "coming-soon"
  | "waitlist-open"
  | "enrolling"
  | "in-progress"
  | "closed";
```

Set every course and workshop to `coming-soon` in the initial release.

Render the correct badge and CTA from this status. Do not hard-code different availability text across multiple pages.

## 7. Required routes

Build these pages:

1. `/` - Home
2. `/courses` - All courses
3. `/courses/ai-native-product-designer`
4. `/courses/designing-agentic-experiences`
5. `/courses/building-working-prototypes-with-ai`
6. `/courses/grounded-research-with-ai`
7. `/courses/ai-evals-for-product-designers`
8. `/courses/ai-native-product-design-foundations`
9. `/workshops` - Live workshops
10. `/resources` - Articles, guides and templates
11. `/resources/[slug]` - Resource detail template
12. `/newsletter` - Design With AI newsletter
13. `/about` - John and the teaching philosophy
14. `/contact` - General and team enquiries
15. `/waitlist` - Course and workshop interest form
16. `/thank-you` - Confirmation page
17. `/privacy`
18. `/terms`
19. A designed 404 page

The site navigation should contain:

- Courses
- Workshops
- Resources
- About
- Newsletter
- Primary button: Join the waitlist

On mobile, use an accessible menu with clear focus behaviour, body scroll locking and a large waitlist CTA.

## 8. Homepage content and structure

### Announcement strip

Copy:

> New courses for AI-native product designers are coming soon. Join the early-access list.

Link to `/waitlist?interest=all-courses`.

### Hero

Eyebrow:

> SWITCH TO UX, FOR THE AI ERA

Headline:

> Design with judgment. Build with AI. Ship proof.

Supporting copy:

> Practical courses for product designers who want to research, design, build and evaluate intelligent products. Move beyond static screens and create working experiences that show how you think.

Primary CTA:

> Explore upcoming courses

Link to `/courses`.

Secondary CTA:

> Join the waitlist

Link to `/waitlist?interest=all-courses`.

Hero supporting labels:

- Grounded product decisions
- Working AI prototypes
- Agentic interaction design
- Evals and failure testing

Create a bespoke hero visual showing this progression:

`Evidence -> Decision -> Prototype -> Evaluation`

On mobile, stack the sequence vertically. Do not use a generic dashboard mockup.

### Credibility bar

Copy:

> Taught by John Iseghohi, Staff Product Designer working on AI agents, with 13+ years across Algolia, Amazon, Booking.com and high-growth product teams.

Supporting proof:

- 13+ years in product design
- 200+ designers taught
- Staff-level AI product experience
- Former UX instructor

Present employer names as understated text marks unless approved logo assets already exist.

### The change section

Headline:

> AI changed the output. It raised the bar for the designer.

Copy:

> Producing a polished screen is no longer the hardest part. Designers are increasingly responsible for deciding what deserves to be built, shaping how intelligent systems behave, testing where they fail and creating enough of the product to learn from real use.

Use three structured columns:

1. **Decide what matters**
   Turn research, business goals and technical possibilities into a grounded product direction.

2. **Design how AI behaves**
   Create clear expectations, human checkpoints, permissions, recovery and trust across changing model behaviour.

3. **Build enough to learn**
   Move between Figma, AI coding tools and working prototypes so teams can test decisions earlier.

### Signature method section

Eyebrow:

> THE GROUNDED DESIGN METHOD

Headline:

> Strong AI work starts by admitting what you know and what you do not.

Display four interactive or visually distinct blocks:

- `[E] Evidence`: What users, data or reliable sources directly support.
- `[I] Inference`: What the evidence reasonably suggests.
- `[A] Assumption`: What the team currently believes but has not proved.
- `[X] Unknown`: What must be researched, tested or deliberately accepted.

Supporting copy:

> Students use this method throughout research, product framing, prompting, prototyping and evaluation. It keeps fast AI-assisted work connected to evidence instead of plausible-looking output.

CTA:

> Learn the method

Link to `/courses/ai-native-product-designer`.

### Featured courses

Eyebrow:

> UPCOMING COURSES

Headline:

> Learn the parts of product design that matter more now.

Show the six course cards defined later in this prompt. Every card must include:

- Course title
- Short promise
- Audience level
- Format
- Status badge: Coming soon
- CTA: View course

Do not place six identical cards in one long grid. Feature the flagship course with more visual weight and group the specialist courses beneath it.

### Learning model

Headline:

> Learn it. Build it. Prove it.

Stages:

1. **Learn the decision**
   Understand the principle, trade-off and product context.

2. **Build the behaviour**
   Apply it in a working flow, prototype or AI product.

3. **Test the failure**
   Evaluate the happy path, edge cases and model behaviour.

4. **Ship the proof**
   Leave with a live artefact and a clear explanation of your judgment.

### What students will create

Use an artefact gallery rather than testimonials.

Artefacts:

- Grounded opportunity brief
- Evidence ledger
- AI capability map
- Agent autonomy map
- Behavioural-state storyboard
- Deployed product prototype
- Evaluation rubric and test set
- AI-native portfolio case study

All examples must be clearly labelled as sample course artefacts unless they are real student work.

### Audience section

Headline:

> Built for people who want to do more than generate screens.

Cards:

1. **Working product designers**
   Update your workflow, build stronger prototypes and contribute more deeply to AI product decisions.

2. **Serious career switchers**
   Learn current product design practice from the start, including AI collaboration, working prototypes and evaluation.

3. **Design and product teams**
   Build a shared approach to AI opportunities, interaction patterns, prototyping and quality.

### Workshops section

Headline:

> Start with one practical build.

Copy:

> Short, live sessions where you create one useful artefact and leave with something your team, portfolio or next project can use.

Show the first three workshops:

- Build an AI Product Prototype
- Design an Agent Users Can Trust
- Write Your First Product Eval

CTA:

> Explore workshops

### Instructor section

Eyebrow:

> YOUR INSTRUCTOR

Headline:

> Taught from real product work, not tool demos alone.

Copy:

> I am John Iseghohi, a Staff Product Designer working on AI Agent Studio at Algolia. Across more than 13 years, I have designed products at Algolia, Amazon, Booking.com, Etisalat, Konga and eTranzact. I have also taught UX, facilitated workshops and helped more than 200 designers develop their practice.
>
> Switch to UX brings those parts together: product judgment, human-centred design, AI-native interaction and the ability to build enough of an idea to learn from it.

CTA:

> Read John's story

Link to `/about`.

### Newsletter section

Headline:

> One practical move for designing with AI, every week.

Copy:

> Design With AI shares grounded methods, working prototypes, agent UX patterns, honest failures and practical ways to strengthen your product design career.

CTA:

> Join Design With AI

### Final CTA

Headline:

> The courses are being built now. Join early and help shape them.

Copy:

> Tell us what you want to learn. Early subscribers will hear about pilot workshops, founding cohorts and new course materials first.

CTA:

> Join the early-access list

## 9. Courses index page

### Hero

Eyebrow:

> SWITCH TO UX COURSES

Headline:

> Learn to decide, design, build and evaluate AI products.

Copy:

> Each course ends with a working artefact. Choose a complete learning path or focus on the capability your current role needs most.

Status notice:

> All courses are currently in development. Join a waitlist to receive the pilot dates and founding-cohort details.

### Course grouping

Group the courses into:

1. **Flagship programme**
2. **Specialist courses**
3. **Career-switcher foundation**

Include a comparison table on desktop and accessible stacked cards on mobile. Compare:

- Best for
- Level
- Learning format
- Expected outcome
- Course status

Do not show prices or dates until real values exist.

## 10. Shared course-page template

Every course page must contain:

1. Breadcrumbs
2. Status badge: Coming soon
3. Course title
4. Outcome-led summary
5. Audience and experience level
6. Proposed format, labelled clearly as planned
7. What students will create
8. Detailed modules
9. Tools and methods
10. What is included
11. Instructor block
12. FAQ
13. Sticky or repeated waitlist CTA
14. Related courses

Use this note near the format information:

> This course is currently in development. The final dates, format and price will be shared with the waitlist before enrolment opens.

Every page CTA should say:

> Join this course waitlist

Link to `/waitlist?interest={course-slug}`.

## 11. Course content

### Course 1: AI-Native Product Designer

Slug: `ai-native-product-designer`

Category: Flagship programme

Level: Product designers with foundational experience

Planned format: Six-week live cohort with guided project work

Card description:

> Learn how to frame AI opportunities, design intelligent behaviour, build a working prototype and evaluate whether it deserves to ship.

Page headline:

> Become the designer who can take an AI product from uncertain idea to tested proof.

Page introduction:

> AI-Native Product Designer is an end-to-end programme for designers who want to contribute beyond interface production. You will learn how to ground product decisions in evidence, design for probabilistic behaviour, create a code-backed prototype, test failure cases and present the work as a credible portfolio case study.

Student outputs:

- Grounded opportunity brief
- Evidence ledger
- AI capability map
- Agent journey and autonomy map
- Working deployed prototype
- Evaluation rubric and test set
- Two-minute product demo
- AI-native portfolio case study

Modules:

1. **The AI-native design workspace**
   Understand where Figma, ChatGPT, Codex, Cursor, repositories, APIs and deployment fit. Set up a repeatable working environment and safe information boundaries.

2. **Grounded problem framing**
   Separate Evidence, Inference, Assumption and Unknown. Identify useful AI opportunities, challenge weak briefs and define the smallest experiment that can produce learning.

3. **How AI products behave**
   Learn practical mental models for language models, context, retrieval, memory, tools and agents. Understand latency, cost, inconsistency, privacy and capability boundaries.

4. **AI interaction and agentic UX**
   Design expectations, autonomy, permissions, progress, human checkpoints, correction, undo and failure recovery across changing AI behaviour.

5. **Build the working experience**
   Turn the product brief into a responsive, working prototype. Use realistic data, conditional states, model interactions and an existing design system where possible.

6. **Evaluate, test and improve**
   Define quality, create test cases, evaluate model output, run usability sessions and use failures to refine the experience.

7. **Ship the proof and tell the story**
   Deploy the work, record a concise demo and build a case study that distinguishes human judgment from AI-generated execution.

FAQ points:

- Basic Figma knowledge is useful but advanced UI mastery is not required.
- No professional software-engineering experience is required.
- Students will interact with code, repositories and APIs through guided workflows.
- The course focuses on one complete product project rather than many disconnected exercises.
- Tools may change, but the decision, interaction and evaluation methods are designed to last.

### Course 2: Designing Agentic Experiences

Slug: `designing-agentic-experiences`

Category: Specialist course

Level: Mid-level, senior and staff designers

Planned format: Three-week intensive

Card description:

> Design agents that communicate progress, request permission, recover from failure and keep people meaningfully in control.

Page headline:

> Design what an AI agent does before you design how it looks.

Page introduction:

> Agentic products do more than respond. They plan, retrieve information, use tools and take actions over time. This course teaches designers how to shape that behaviour into an experience people can understand, supervise and trust.

Student outputs:

- Agent capability contract
- Autonomy-level map
- Tool and permission model
- End-to-end agent journey
- Behavioural-state storyboard
- Failure and recovery playbook
- Agent evaluation plan

Modules:

1. Agent anatomy, goals, tools, memory and action loops
2. Choosing appropriate autonomy levels
3. Onboarding and setting accurate expectations
4. Plans, progress, interruptions and long-running work
5. Permissions, approval gates and consequential actions
6. User correction, undo, retry and escalation
7. Memory, personalisation, privacy and control
8. Evaluating usefulness, reliability and trust

### Course 3: Building Working Prototypes With AI

Slug: `building-working-prototypes-with-ai`

Category: Specialist course

Level: Designers who want to build beyond static prototypes

Planned format: Four-week build lab

Card description:

> Move from product brief to deployed prototype using Figma, AI coding tools, realistic data and reusable design context.

Page headline:

> Build enough of the product to test the decision.

Page introduction:

> You do not need to become a software engineer to create a convincing product prototype. You do need to understand how to structure the problem, guide an AI coding agent, inspect the result and test real behaviour.

Student outputs:

- Build-ready product brief
- Structured context pack
- Three-screen MVP
- Responsive working prototype
- Happy path and one ugly edge case
- Live deployment and demo

Modules:

1. Choosing between Figma Make, Codex, Cursor and other build environments
2. Translating product intent into a build plan
3. Repository, component and version-control basics for designers
4. Working with design systems and MCP
5. Realistic data, conditional logic and interactive states
6. API and model integration fundamentals
7. Responsive design, accessibility and visual refinement
8. Debugging, testing and deployment

### Course 4: Grounded Research With AI

Slug: `grounded-research-with-ai`

Category: Specialist course

Level: Product designers, UX researchers and product managers

Planned format: Two-week practical course

Card description:

> Use AI to organise and challenge research without turning assumptions, synthetic users or plausible summaries into evidence.

Page headline:

> Move faster through research without losing the evidence.

Page introduction:

> AI can make research synthesis faster, but fluent summaries often hide uncertainty and weak sourcing. This course provides a grounded workflow for transforming research into traceable findings, decisions and unanswered questions.

Student outputs:

- Research context pack
- Evidence-linked synthesis
- Evidence, Inference, Assumption and Unknown ledger
- Contradiction and gap report
- Opportunity map
- Research readout

Modules:

1. Safe research preparation and data boundaries
2. Structuring interview, feedback and behavioural data
3. Evidence-linked AI synthesis
4. Separating observation, interpretation and assumption
5. Finding contradictions and missing voices
6. Using AI as a research critic
7. Building a reusable research repository
8. Turning synthesis into decisions and next experiments

Include a clear warning:

> Synthetic personas can help explore questions, but they are not a substitute for research with real people.

### Course 5: AI Evals for Product Designers

Slug: `ai-evals-for-product-designers`

Category: Specialist course

Level: Product designers, content designers and product managers working on AI

Planned format: Two-week intensive

Card description:

> Define what good AI behaviour means, create representative tests and turn model failures into product improvements.

Page headline:

> If the product can behave differently each time, design needs a new quality practice.

Page introduction:

> Usability testing tells you whether people can use an experience. AI evaluation also asks whether the underlying system is useful, grounded, consistent, safe and appropriate across many inputs. This course gives designers a practical role in defining and testing that quality.

Student outputs:

- AI quality definition
- Evaluation rubric
- Representative test dataset
- Edge-case and adversarial test set
- Human-review workflow
- Failure taxonomy and improvement report

Modules:

1. What an eval is and why designers should contribute
2. Translating user needs into measurable criteria
3. Building representative test cases
4. Rubrics, structured checks and human review
5. Evaluating usefulness, groundedness, tone and safety
6. Testing edge cases and adversarial behaviour
7. Combining model quality, usability and product metrics
8. Feeding live failures back into the test set

### Course 6: AI-Native Product Design Foundations

Slug: `ai-native-product-design-foundations`

Category: Career-switcher foundation

Level: Beginners and career switchers

Planned format: Eight-week cohort

Card description:

> Learn durable product design foundations while using AI to research, explore, prototype, test and ship a complete working project.

Page headline:

> Start your product design career with the workflow the industry is moving toward.

Page introduction:

> This is not a shortened traditional bootcamp with a prompting lesson added at the end. You will learn the foundations of user-centred product design while using AI carefully throughout the process. The course still develops research, interaction, visual, accessibility and communication skills. It also teaches you how to build and evaluate working experiences.

Student outputs:

- Research plan and interview evidence
- Grounded problem brief
- Information architecture and user flow
- Responsive interface system
- Working product prototype
- Usability report
- AI-use and decision log
- Portfolio case study

Modules:

1. Product design, roles and the modern product team
2. User research, evidence and problem framing
3. Information architecture, flows and content
4. Interaction design and behavioural states
5. Visual hierarchy, typography, layout and responsive design
6. Accessibility and inclusive design
7. Working with AI without outsourcing judgment
8. Building a code-backed prototype
9. Usability testing and iteration
10. Portfolio storytelling and career positioning

## 12. Workshops page

### Hero

Eyebrow:

> LIVE PRACTICAL SESSIONS

Headline:

> Make one useful thing before the session ends.

Copy:

> Switch to UX workshops are short, guided builds for designers and product teams. Each session focuses on one decision, one practical method and one artefact you can use immediately.

Status notice:

> The next workshop dates are being planned. Register your interest to receive the first invitations.

### Workshop cards

Create six workshop cards. Each must show a Coming soon badge, proposed duration and outcome.

1. **Build an AI Product Prototype**
   Duration: 90 minutes
   Outcome: A deployed three-screen prototype that tests one useful AI outcome.

2. **Design an Agent Users Can Trust**
   Duration: 2 hours
   Outcome: An agent journey covering expectations, progress, approval, failure and recovery.

3. **AI Research Without False Confidence**
   Duration: 2 hours
   Outcome: An evidence-led research synthesis with assumptions and unknowns clearly separated.

4. **Write Your First Product Eval**
   Duration: 2 hours
   Outcome: A quality rubric and representative test set for an AI feature.

5. **Figma to Working Product**
   Duration: 3 hours
   Outcome: A design-system-grounded prototype with real interactions.

6. **Build Your AI-Native Portfolio Case Study**
   Duration: 2 hours
   Outcome: A concise case-study structure and product demo that show human judgment.

Each CTA should link to `/waitlist?interest={workshop-slug}` and say:

> Register interest

### Team training section

Headline:

> Bring a practical AI-native design workshop to your team.

Copy:

> Private sessions can be shaped around AI opportunity framing, agentic UX, working prototypes, grounded research or evaluation. Tell us about your team and the product challenges you are facing.

CTA:

> Enquire about team training

Link to `/contact?type=team-training`.

## 13. Resources page

Position resources as useful artefacts and applied thinking, not a generic blog.

### Hero

Eyebrow:

> RESOURCES FOR AI-NATIVE DESIGNERS

Headline:

> Methods, teardowns and working examples you can apply.

Copy:

> Explore grounded design methods, agent UX patterns, prototyping workflows, evaluation practices and honest lessons from building with AI.

### Resource categories

- Grounded Design
- AI-Native Craft
- Designers Who Build
- Evaluation and Product Judgment
- Career Proof

### Seed these resource cards

Set unpublished items to `coming-soon`. Never display a future item as if it has already been published.

1. **Entry-Level UX Is Under Pressure. The New Entry Point Is Shipping**
   Category: Career Proof
   Format: Essay
   Description: Why portfolios increasingly need to show product judgment, working behaviour and evidence of iteration.

2. **The Grounded Design Ledger**
   Category: Grounded Design
   Format: Guide and template
   Description: A practical system for separating evidence, inference, assumption and unknown throughout a product project.

3. **The Twelve States Every AI Agent Needs**
   Category: AI-Native Craft
   Format: Pattern guide
   Description: A state model covering intent, planning, action, progress, approval, partial results, failure and recovery.

4. **Figma Make, Codex or Cursor: Which Should a Designer Use?**
   Category: Designers Who Build
   Format: Workflow comparison
   Description: Choose a build environment based on the product question, required fidelity and technical constraints.

5. **How Product Designers Can Write AI Evals**
   Category: Evaluation and Product Judgment
   Format: Practical guide
   Description: Translate user expectations into repeatable quality criteria and test cases.

6. **Build Proof, Not Version One**
   Category: Designers Who Build
   Format: Field guide
   Description: Test one useful outcome, one happy path and one ugly edge case before expanding the product.

The resource detail template must support:

- Title
- Category
- Format
- Published or Coming soon status
- Author
- Reading time when published
- Table of contents
- Article body in MDX
- Downloadable artefact block
- Related resources
- Newsletter CTA

For Coming soon resources, show the description and a newsletter signup rather than an empty article page.

## 14. Newsletter page

Newsletter name:

> Design With AI

Headline:

> One practical move for becoming a stronger AI-native product designer.

Copy:

> Every issue focuses on something you can use: a grounded decision method, an agent UX pattern, a working prototype, an evaluation technique or an honest lesson from a failed build.

Content themes:

- Grounded product decisions
- AI interaction and trust
- Designers building with code
- Evals and quality
- Career and portfolio proof

Signup CTA:

> Join Design With AI

Add a short privacy line:

> Useful design ideas, no daily noise. Unsubscribe whenever you want.

Reuse an existing Beehiiv integration if it is already configured. Otherwise create a provider adapter and document the required environment variables. Do not hard-code secrets.

## 15. About page

### Hero

Eyebrow:

> ABOUT SWITCH TO UX

Headline:

> Product design changed my life. Now the practice itself is changing.

Introductory copy:

> I am John Iseghohi, a Staff Product Designer working on AI Agent Studio at Algolia. I have spent more than 13 years designing products, building teams, teaching designers and helping people make difficult technology easier to use.

### Career story

Tell the story concisely using this verified sequence:

- eTranzact, early web and product design work
- Konga, founding product design experience
- Etisalat Nigeria, UX leadership
- Booking.com in Amsterdam, connected travel products
- Amazon UK, insurance and financial products
- Algolia, Staff Product Designer working on AI agents

Do not invent exact dates, awards or project metrics unless present in verified local content.

### Teaching philosophy

Headline:

> The tool can generate an answer. The designer is still responsible for the decision.

Principles:

1. Evidence before confidence
2. Working behaviour before presentation theatre
3. Human control before invisible automation
4. Failure testing before launch confidence
5. Clear judgment before visual volume

### Why Switch to UX now

Copy:

> The old entry path into UX centred on learning a process, mastering Figma and producing polished case studies. Those foundations still matter, but AI has made interface production faster and more accessible. The new advantage is knowing what to build, how an intelligent system should behave, how to test it and how to turn an idea into proof.

### CTA

> Explore the upcoming courses

## 16. Waitlist experience

The waitlist is a core product flow, not a generic newsletter input.

Create `/waitlist` and read the `interest` query parameter. Display the selected course or workshop clearly.

Fields:

- First name
- Email address
- Current role
- Experience level
- What do you most want to learn?
- Selected course or workshop, populated from the URL but editable
- Optional consent to join Design With AI

Experience options:

- Exploring product design
- Career switcher
- 0-2 years
- 3-5 years
- 6-9 years
- 10+ years
- Design or product leader

Validation requirements:

- Accessible labels
- Inline error messages
- Email validation
- Server-side validation
- Honeypot spam protection
- Loading, success and failure states
- Preserve user input after a failed submission
- Do not claim success unless the entry was stored or accepted by the configured provider

Success message:

> You are on the early-access list.

Supporting copy:

> We will send you the pilot dates and founding-cohort details for the programme you selected. If you also joined Design With AI, look out for the next issue in your inbox.

Create a provider-neutral server route such as `/api/waitlist`.

Integration order:

1. Reuse a secure existing form, CRM or Beehiiv integration if one exists.
2. Otherwise support a server-side `WAITLIST_WEBHOOK_URL` adapter with environment variables.
3. If no production provider is configured, show a clear unavailable state in production rather than a fake success.
4. In local development, allow a documented development-only adapter that does not expose personal data in client logs.

Document setup in the README.

Track these non-sensitive events if analytics exists:

- `course_viewed`
- `waitlist_started`
- `waitlist_submitted`
- `newsletter_submitted`
- `team_training_enquiry_started`

Include the interest slug, page source and audience level where appropriate. Never send free-text form answers to analytics.

## 17. Contact page

Headline:

> Tell us what you are trying to learn or change.

Copy:

> Contact Switch to UX about courses, workshops, partnerships, speaking or private team training.

Contact email:

> hello@switchtoux.com

Fields:

- Name
- Work email
- Company, optional
- Enquiry type
- Message

Enquiry types:

- Course question
- Team training
- Speaking or workshop invitation
- Partnership
- Other

Remove all Quillow references, fake phone numbers, San Francisco addresses and template content from the old site.

## 18. Footer

Footer statement:

> Switch to UX helps designers build the judgment, interaction and prototyping skills needed for AI-native product work.

Footer groups:

- Learn: Courses, Workshops, Resources, Newsletter
- About: About John, Contact
- Legal: Privacy, Terms
- Social: use only verified social URLs already present in the repository or clearly mark configuration placeholders

Display:

> © {current year} Switch to UX. Built by Rulz & Co.

Do not link to empty pages.

## 19. SEO and content migration

Create:

- Unique title and meta description for every page
- Canonical URLs
- Open Graph metadata
- Social sharing image system
- `sitemap.xml`
- `robots.txt`
- Breadcrumbs
- Structured data for WebSite, Organization, Person, BreadcrumbList and published Article content

Do not add a purchasable Course Offer schema while courses are unavailable and have no verified price or start date.

Preserve or redirect important old URLs:

- `/ux-design-bootcamp` -> `/courses/ai-native-product-design-foundations`
- `/about-john-iseghohi` -> `/about`
- Keep `/workshops` working
- Keep `/contact` working
- Preserve existing article URLs when practical, or add permanent redirects to the relevant `/resources/[slug]` route

Audit the current project for other indexed routes before finalising redirects.

Suggested homepage title:

> Switch to UX | AI-Native Product Design Courses

Suggested homepage description:

> Practical courses for product designers learning to research, design, build and evaluate AI products. Upcoming cohorts, workshops and free resources.

## 20. Accessibility and responsive behaviour

Meet WCAG 2.2 AA expectations.

Requirements:

- Semantic landmarks and heading order
- Full keyboard navigation
- Visible focus states
- Skip-to-content link
- Sufficient colour contrast
- Accessible form errors and status announcements
- No information communicated by colour alone
- Touch targets of at least 44 by 44 pixels where practical
- Reduced-motion support
- Meaningful alt text for informational images
- Empty alt text for purely decorative graphics
- No horizontal scrolling at 320px width
- Course comparison usable without a wide table on mobile

Test at:

- 320px
- 375px
- 768px
- 1024px
- 1440px

## 21. Performance

- Prefer server components where appropriate.
- Keep client-side JavaScript small.
- Optimise images and SVGs.
- Avoid autoplay video.
- Avoid background videos and heavy animation libraries.
- Lazy-load below-the-fold media.
- Prevent layout shift.
- Use local or optimised font loading.
- Aim for Lighthouse scores of 90+ for Performance and 95+ for Accessibility on core pages.

## 22. Reusable component system

Create reusable components for:

- Header and mobile navigation
- Announcement strip
- Footer
- Status badge
- Course card
- Featured course card
- Course comparison
- Workshop card
- Resource card
- Grounded Design labels
- Artefact preview
- Quote or principle block
- Instructor block
- Waitlist CTA
- Newsletter form
- Contact form
- FAQ accordion
- Breadcrumbs
- Empty and Coming soon states
- Form success and error states

Keep components composable. Do not create a separate bespoke implementation of the same waitlist CTA on every page.

## 23. Content model

Create typed data for courses with at least:

```ts
interface Course {
  slug: string;
  title: string;
  category: "flagship" | "specialist" | "foundation";
  status: ProgrammeStatus;
  level: string;
  plannedFormat: string;
  cardDescription: string;
  headline: string;
  introduction: string;
  outputs: string[];
  modules: Array<{
    title: string;
    description: string;
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
  relatedCourseSlugs: string[];
}
```

Create equivalent typed structures for workshops and resources.

The route pages should render from this central content. Updating a course status or description should require one data change, not edits across many pages.

## 24. Legal and privacy

Create concise Privacy and Terms pages appropriate for an early-stage UK education website collecting course interest and newsletter subscriptions.

The Privacy page should explain:

- What data the forms collect
- Why it is collected
- Which providers may process it
- How long it is retained
- Email unsubscribe rights
- How to request access or deletion
- Contact at hello@switchtoux.com

Do not pretend the generated copy has received legal review. Add a code comment or README note recommending review before launch, but do not display alarming placeholder language publicly.

Do not add a cookie banner unless non-essential cookies are actually used. Prefer privacy-respecting analytics where possible.

## 25. Required implementation workflow

1. Inspect the repository, current site structure and existing content.
2. Read all project instructions.
3. Identify reusable assets, integrations and indexed routes.
4. Write a short implementation plan.
5. Build the design system and global layout.
6. Build the typed content model.
7. Implement all required pages.
8. Implement forms and Coming soon states.
9. Add redirects, metadata, sitemap and robots.
10. Run formatting, linting, type checks, tests and a production build.
11. Test the primary flows in a browser at mobile and desktop widths.
12. Inspect for visual overflow, broken links, inaccessible controls and content inconsistencies.
13. Fix issues found before reporting completion.

Do not stop after producing a plan. Implement the website.

Do not ask for design approval at every step. Make strong, coherent decisions from this brief. Ask only when a missing credential, proprietary asset or destructive migration creates a real blocker.

## 26. Tests and acceptance criteria

The work is complete only when:

- Every required route renders successfully.
- All courses and workshops visibly show Coming soon.
- Every programme CTA passes the correct interest value to the waitlist.
- The waitlist never reports false success.
- The navigation works with keyboard, mouse and touch.
- The site has no lorem ipsum, old template copy or dead links.
- No page describes John as currently working at Amazon.
- No page contains Quillow contact information or fake addresses.
- The old bootcamp and about URLs redirect correctly.
- Course content comes from the central typed model.
- Forms have client and server validation.
- Mobile pages have no horizontal overflow.
- Core pages have appropriate metadata.
- Lint, type check and production build pass.
- The README explains local setup, environment variables, form integration, analytics configuration, content editing and deployment.

Add automated tests for:

- Course status rendering
- Course CTA interest parameters
- Waitlist validation
- Key redirect rules
- Navigation accessibility where practical

Use Playwright or the repository's existing browser-test framework to cover:

1. Home -> course -> waitlist -> validation -> configured success or unavailable state
2. Courses index -> specialist course -> related course
3. Mobile navigation
4. Newsletter signup
5. Team training enquiry

## 27. Final handoff

At completion, provide:

1. A concise summary of what was built.
2. The final route list.
3. Screenshots or preview links for the homepage, courses page, flagship course page and mobile navigation.
4. Form or service credentials still required.
5. Commands run and their results.
6. Any launch blockers.
7. Clear instructions for changing a course from Coming soon to Enrolling later.

The finished website should communicate one clear change:

> Switch to UX no longer teaches people only how to produce design artefacts. It teaches them how to make grounded product decisions, design intelligent behaviour, build working systems and prove those systems deserve to exist.
