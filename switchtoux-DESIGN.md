---
version: "switchtoux-ai-native-2026-09-01"
name: "Switch to UX - AI-Native Product Design School"
description: "The visual and interaction specification for the Switch to UX platform redesign. It adapts the Integration Ecosystem reference into a dark, atmospheric, editorial product-school experience."
source_reference: "integration-ecosystem-1-DESIGN.md"
color_mode: "dark-only"
colors:
  primary: "#F43F5E"
  primary-hover: "#FB7185"
  primary-pressed: "#E11D48"
  background: "#000000"
  surface: "#18181B"
  surface-raised: "#27272A"
  border: "#3F3F46"
  border-subtle: "#27272A"
  text-primary: "#FFFFFF"
  text-secondary: "#D4D4D8"
  text-muted: "#A1A1AA"
typography:
  display: "Inter"
  body: "Inter"
  technical: "JetBrains Mono"
spacing:
  base: "8px"
  section-desktop: "128px"
  section-tablet: "96px"
  section-mobile: "72px"
radius:
  card: "14px"
  control: "14px"
  pill: "9999px"
---

# Switch to UX Design Specification

## 1. Purpose

This file is the visual, interaction and responsive-design source of truth for the Switch to UX redesign.

Use it together with:

- `switchtoux-redesign-prd.md` for product scope, requirements, architecture and behaviour.
- `switchtoux-redesign-codex-prompt.md` for page copy, programme content and implementation instructions.

### Precedence

If these documents conflict:

1. This `DESIGN.md` controls visual direction, tokens, composition, responsive layout, component geometry and motion.
2. The PRD controls product requirements, data, integrations, security, acceptance criteria and release scope.
3. The build prompt controls approved copy and detailed page content.

This file replaces the earlier warm off-white and yellow visual direction. The final platform uses a dark-only system based on the attached Integration Ecosystem reference: black background, zinc surfaces, white text, rose accent, Inter typography, JetBrains Mono labels and an atmospheric connected-system visual language.

Do not reinterpret the website as a light theme. Do not add a theme switcher in release one.

## 2. Reference interpretation

The attached Integration Ecosystem reference establishes these non-negotiable qualities:

- A black first viewport with an immediate, immersive visual signal.
- Rose as the focal colour against neutral black and zinc surfaces.
- Atmospheric movement and depth behind content.
- A connected ecosystem composition rather than isolated generic cards.
- Inter for editorial and interface typography.
- JetBrains Mono for labels, metadata and technical annotations.
- Stable 8px spacing logic.
- 14px card and control geometry.
- Subtle borders and layered surface depth.
- Masked reveals, staggered entrance, hover lift and ambient movement.
- WebGL, canvas or particle effects used as a supporting layer rather than the content itself.

Adapt the subject of the reference from software integrations to the AI-native product-design learning ecosystem.

The primary visual sequence becomes:

> Evidence -> Decision -> Prototype -> Evaluation

Supporting nodes may include:

- Research
- Product judgment
- Agent UX
- Figma
- Codex
- Cursor
- Design systems
- Working code
- Trust
- Evals
- Failure testing
- Portfolio proof

These are visual labels and relationships, not a logo wall. Do not depend on third-party logos unless approved assets already exist.

## 3. Design thesis

Switch to UX should feel like a working product lab that happens to teach.

It must not feel like:

- A cheerful beginner bootcamp.
- A generic course marketplace.
- A purple AI SaaS landing page.
- A futuristic concept site that sacrifices readability.
- A grid of interchangeable cards.
- A personal portfolio with courses added as an afterthought.

The design should communicate three things before the visitor scrolls:

1. This is for serious product designers.
2. This is about AI-native product work, not prompt tricks.
3. The courses are coming soon and the visitor can register interest.

### Emotional qualities

- Precise
- Immersive
- Editorial
- Technical
- Disciplined
- Human
- Confident
- Experimental without being chaotic

### Visual tension

Use the contrast between:

- Dense systems and calm typography.
- Black space and concentrated rose signals.
- Atmospheric motion and stable content blocks.
- Technical labels and human explanations.
- Generated possibility and grounded evidence.

## 4. Brand expression

### Name treatment

Use the existing Switch to UX logo if a high-quality approved asset is present in the repository.

If no usable asset exists, create a temporary typographic wordmark:

> SWITCH / TO UX

Wordmark rules:

- Inter Medium or SemiBold.
- Uppercase.
- Tight but not compressed tracking.
- White text.
- Rose slash.
- No enclosing pill or badge.
- Maintain a one-line version for desktop and a compact `S/UX` monogram for favicon and very small contexts.
- Isolate the temporary mark as a replaceable component. Do not bake it into screenshots or canvas artwork.

### Tagline

> Design with judgment. Build with AI. Ship proof.

Do not style the tagline as a decorative quotation. It is the primary product promise.

### Brand mark behaviour

- The header wordmark links to the homepage.
- At the top of the page it sits directly on black.
- After scrolling, the header gains a translucent black surface and subtle bottom border.
- Do not animate individual wordmark characters.

## 5. Colour system

### Core tokens

```css
:root {
  color-scheme: dark;

  --color-bg: #000000;
  --color-surface: #18181b;
  --color-surface-raised: #27272a;
  --color-surface-hover: #303036;

  --color-border-subtle: #27272a;
  --color-border: #3f3f46;
  --color-border-strong: #52525b;

  --color-text-primary: #ffffff;
  --color-text-secondary: #d4d4d8;
  --color-text-muted: #a1a1aa;
  --color-text-disabled: #71717a;

  --color-accent: #f43f5e;
  --color-accent-hover: #fb7185;
  --color-accent-pressed: #e11d48;
  --color-accent-soft: rgba(244, 63, 94, 0.14);
  --color-accent-line: rgba(244, 63, 94, 0.42);
  --color-accent-glow: rgba(244, 63, 94, 0.22);

  --color-success: #34d399;
  --color-warning: #fbbf24;
  --color-info: #38bdf8;
  --color-error: #fb7185;

  --shadow-raised: 0 24px 80px rgba(0, 0, 0, 0.42);
  --shadow-accent: 0 0 64px rgba(244, 63, 94, 0.18);
}
```

### Role rules

- Black is the page canvas, not merely a header colour.
- `surface` creates low elevation for large content zones.
- `surface-raised` is for cards, floating metadata, menus and form panels.
- Rose identifies actions, active states, connected-system signals and selected evidence.
- White is reserved for primary reading and high-value headings.
- Muted text remains zinc, never low-opacity white that becomes illegible.
- Do not introduce additional brand colours for decoration.
- Status colours may appear only where status meaning is necessary.

### Contrast rules

- Primary rose buttons use black text, not white text.
- Rose text on black may be used for labels and large display text after contrast verification.
- Do not place muted zinc text on raised zinc surfaces without checking contrast.
- Borders must remain visible at 100% and 200% browser zoom.
- Focus rings use a white outer ring with a rose inner signal or another AA-compliant treatment.

### Surface rhythm

Alternate sections through composition, not colour-theme changes:

1. Pure black with atmospheric effect.
2. Black with bordered content frame.
3. Full-width `surface` band.
4. Black with rose signal lines.
5. Raised zinc panels.

Do not alternate every section into separate rounded rectangles. Maintain continuity across the page.

## 6. Typography

### Font families

- Display and body: Inter.
- Technical labels, metadata, indexes and evidence notation: JetBrains Mono.
- Fallbacks: system sans-serif and system monospace.

Load only the weights required by the interface.

Recommended Inter weights:

- 400 Regular
- 500 Medium
- 600 SemiBold

Recommended JetBrains Mono weights:

- 500 Medium
- 600 SemiBold

### Type tokens

```css
:root {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;

  --text-display-2xl: clamp(3rem, 7.2vw, 5.5rem);
  --text-display-xl: clamp(2.75rem, 5.4vw, 4rem);
  --text-display-lg: clamp(2.25rem, 4.2vw, 3.25rem);
  --text-heading-xl: clamp(2rem, 3vw, 2.75rem);
  --text-heading-lg: clamp(1.625rem, 2.4vw, 2.125rem);
  --text-heading-md: 1.5rem;
  --text-body-lg: clamp(1.0625rem, 1.4vw, 1.25rem);
  --text-body-md: 1rem;
  --text-body-sm: 0.875rem;
  --text-label: 0.75rem;
}
```

### Type specifications

| Style | Family | Weight | Line height | Tracking | Use |
| --- | --- | ---: | ---: | ---: | --- |
| Display 2XL | Inter | 500 | 0.98 | -0.045em | Homepage hero only |
| Display XL | Inter | 500 | 1.02 | -0.04em | Interior-page heroes |
| Display LG | Inter | 500 | 1.05 | -0.035em | Major section headings |
| Heading XL | Inter | 500 | 1.1 | -0.025em | Course and resource headings |
| Heading LG | Inter | 500 | 1.15 | -0.02em | Component-group headings |
| Heading MD | Inter | 500 | 1.25 | -0.015em | Card and module titles |
| Body LG | Inter | 400 | 1.55 | -0.01em | Hero and section introductions |
| Body MD | Inter | 400 | 1.65 | 0 | Standard copy |
| Body SM | Inter | 400 | 1.55 | 0 | Supporting detail |
| Label | JetBrains Mono | 600 | 1.2 | 0.1em | Eyebrows and metadata |
| Technical body | JetBrains Mono | 500 | 1.5 | 0 | Evidence labels and system notes |

### Heading behaviour

- Use sentence case for headings.
- Uppercase is reserved for mono eyebrows, status and small navigation labels.
- Keep homepage hero lines intentionally broken at editorial points.
- Avoid centre-aligning more than two lines of copy.
- Do not use thin font weights on black.
- Maximum heading width should create distinctive line breaks rather than span the full container.

### Reading widths

- Long-form article body: 680px maximum.
- Course introduction: 720px maximum.
- Standard supporting copy: 600px maximum.
- Hero supporting text: 620px maximum.
- Do not allow paragraph lines longer than approximately 75 characters.

## 7. Spacing and geometry

### Base scale

Use an 8px system with selective 4px increments for control internals.

```css
:root {
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.5rem;
  --space-6: 2rem;
  --space-7: 3rem;
  --space-8: 4rem;
  --space-9: 5rem;
  --space-10: 6rem;
  --space-11: 8rem;

  --radius-card: 14px;
  --radius-control: 14px;
  --radius-small: 8px;
  --radius-pill: 9999px;
}
```

### Section spacing

- Desktop: 128px top and bottom for primary sections.
- Tablet: 96px.
- Mobile: 72px.
- Compact supporting bands: 48-64px.
- Hero uses viewport-aware spacing rather than standard section padding.

### Radius rules

- Standard cards: 14px.
- Inputs and primary controls: 14px.
- Small nested panels: 8px.
- Pills only for short status badges, filters and compact metadata.
- Do not make every card, image and section heavily rounded.

### Borders

- Default: 1px solid `border-subtle`.
- Interactive hover: `border`.
- Selected or active: `accent-line`.
- Major layout frames may use one-pixel top and bottom rules without enclosing all sides.

## 8. Grid and containers

### Main grid

- Maximum content width: 1280px.
- Wide visual width: 1440px maximum for atmospheric compositions.
- Desktop grid: 12 columns, 24px gutters.
- Tablet grid: 8 columns, 20px gutters.
- Mobile grid: 4 columns, 16px gutters.

### Page padding

- 1440px and above: 64px minimum.
- 1024-1439px: 40px.
- 768-1023px: 32px.
- Below 768px: 20px.
- 320px devices: 16px if necessary to preserve content width.

### Alignment

- Align section eyebrows, headings and content edges to persistent grid lines.
- Break the grid only for the hero ecosystem, full-bleed atmosphere and selected artefact previews.
- Use asymmetry deliberately: 5/7, 4/8 and 3/9 splits are preferred over repeated 6/6 sections.
- Avoid long sequences of identical three-column card grids.

## 9. Responsive breakpoints

Use content-driven breakpoints, with these defaults:

- Small mobile: 320-374px.
- Mobile: 375-767px.
- Tablet: 768-1023px.
- Small desktop: 1024-1279px.
- Large desktop: 1280px and above.

### Responsive principles

- Preserve hierarchy before preserving decorative composition.
- Collapse connection maps into meaningful vertical sequences rather than shrinking an unreadable desktop diagram.
- Replace hover-only information with visible or tap-accessible information.
- Do not hide course outcomes, availability or primary CTAs on mobile.
- Use static SVG or CSS fallback for the hero ecosystem on constrained devices.
- Course comparison becomes labelled stacked rows below 900px.
- Sticky sidebars become in-flow sections below 1024px.
- Sticky bottom CTAs must respect safe-area insets and never cover form controls.

## 10. Global page shell

### Announcement strip

- Height: 36-40px.
- Background: rose.
- Text: black, 12px JetBrains Mono or 13px Inter Medium.
- Content centred horizontally on desktop.
- On mobile, keep the text to two short lines at most.
- Include a small directional arrow, not a large button.
- The strip may be disabled through Sanity.

### Header

- Initial state: transparent over black hero.
- Scrolled state: `rgba(0,0,0,0.82)` with backdrop blur and subtle bottom border.
- Desktop height: 72px.
- Mobile height: 64px.
- Content width follows the main container.
- Wordmark left, navigation centre-right, primary CTA right.
- Primary CTA label: Join the waitlist.
- Navigation uses Inter Medium, 14px.
- Current page uses white text and a rose one-pixel underline or dot.
- Non-current items use secondary text and become white on hover.
- Do not place navigation inside a large pill.

### Mobile navigation

- Use a full-height black panel below the header.
- Links are large, left-aligned and separated by fine borders.
- Include course status summary and waitlist CTA near the bottom.
- Trap focus while open.
- Close with Escape, close button or navigation selection.
- Respect safe-area padding.
- No springy full-screen animation. Use a 200-260ms masked or opacity reveal.

### Footer

- Use black with a strong top rule.
- Large wordmark or tagline anchors the first row.
- Links use a structured 12-column layout rather than small centred columns.
- Include an ecosystem line motif that resolves into the rose brand signal.
- Legal and copyright sit on the final baseline.
- Footer content must remain readable without the background effect.

## 11. Homepage composition

### 11.1 First viewport

The first viewport is the main adaptation of the Integration Ecosystem reference.

Desktop composition:

- Minimum height: `min(920px, 100svh)` with a practical minimum of 720px.
- Header floats above the hero.
- Copy occupies approximately five grid columns.
- Ecosystem visual occupies seven columns and may extend beyond the container edge.
- Keep the primary copy vertically centred slightly above the viewport midpoint.
- Use one rose atmospheric glow behind the ecosystem, never behind the full headline.

Content order:

1. Mono eyebrow: `SWITCH TO UX / FOR THE AI ERA`
2. Hero headline: `Design with judgment. Build with AI. Ship proof.`
3. Supporting copy.
4. Primary and secondary CTAs.
5. Compact proof labels.

The headline should be white. Optionally colour one short phrase or punctuation signal rose, but do not colour every line.

### 11.2 Ecosystem hero visual

Create a connected learning-system composition.

Primary nodes:

- Evidence
- Decision
- Prototype
- Evaluation

Secondary nodes:

- Research
- Product judgment
- Agent UX
- Trust
- Figma
- Codex
- Cursor
- Design systems
- Working code
- Evals
- Failure testing
- Portfolio proof

Visual rules:

- A central rose signal represents `AI-NATIVE PRODUCT DESIGN` or `GROUNDING LAYER`.
- Primary nodes use larger zinc panels with white labels.
- Secondary nodes use compact mono labels and fine borders.
- Connection lines are thin zinc with rose highlights moving through selected paths.
- Depth comes from scale, blur and opacity, not extreme 3D rotation.
- Keep text inside the visual readable when motion pauses.
- The background may contain low-density particles or soft depth points.
- Do not create a starfield or sci-fi tunnel.
- Pointer parallax is limited to 4-8px perceived movement.

Mobile fallback:

- The copy appears first.
- A simplified four-node vertical or diamond map appears below the CTAs.
- Secondary nodes become a horizontally scrollable but fully keyboard-accessible label rail, or a static two-column list.
- No WebGL is required on small mobile devices.

### 11.3 Credibility rail

Immediately after the hero, create a horizontal evidence rail.

Content:

- 13+ years in product design
- 200+ designers taught
- Staff-level AI product experience
- Algolia, Amazon and Booking.com experience

Design:

- Top and bottom borders.
- No separate rounded cards.
- Each item uses a mono label and a short human-readable value.
- Desktop presents one row.
- Mobile stacks into a two-column grid.

### 11.4 The changing role

Use an asymmetric 4/8 composition.

- Left: sticky eyebrow and headline.
- Right: three connected responsibility blocks: Decide, Design, Build and evaluate.
- Connect blocks with a subtle vertical line and moving rose signal on scroll.
- Blocks are not cards. Use spacing, rule lines and large index numbers.

### 11.5 Grounded Design method

This is a signature visual moment.

Desktop:

- Use a large bordered system frame.
- Place `[E]`, `[I]`, `[A]` and `[X]` as four distinct quadrants connected to a central `Grounded decision` node.
- Each quadrant includes a short definition and one example statement.
- Hover or focus highlights its path to the centre.
- The selected state uses rose border and glow.

Mobile:

- Use four stacked disclosure rows.
- The central conclusion becomes a final summary panel.
- Do not preserve a cramped four-quadrant diagram.

### 11.6 Course ecosystem

Do not render six equal course cards.

Composition:

1. Feature `AI-Native Product Designer` as a large 7/5 split programme panel.
2. Show its progression as a connected mini-map: Frame -> Design -> Build -> Evaluate -> Ship.
3. Place specialist courses in a connected two-by-two arrangement beneath or beside the flagship.
4. Present the foundation course as a full-width entry route into the system.

Each programme surface includes:

- Mono category label.
- Coming soon badge.
- Title.
- One-sentence outcome.
- Level and planned format.
- View course action.

Course panels use zinc surfaces and subtle inner atmosphere. Do not place photographs in programme cards.

### 11.7 Learning model

Use a vertical four-stage system:

1. Learn the decision
2. Build the behaviour
3. Test the failure
4. Ship the proof

Desktop:

- Left column contains the sticky stage index and active label.
- Right column contains four large step panels with sample artefacts.
- Scroll updates the rose connection signal.

Mobile:

- Display a normal vertical sequence without scroll pinning.
- Every stage remains complete and readable.

### 11.8 Artefact gallery

Present course outputs as an evidence board, not a portfolio carousel.

Artefacts:

- Grounded opportunity brief
- Evidence ledger
- AI capability map
- Agent autonomy map
- Behavioural-state storyboard
- Working prototype
- Evaluation rubric
- Portfolio case study

Design:

- Use varied panel sizes in a controlled 12-column mosaic.
- Include believable placeholder structure, not fake student content.
- Clearly label examples as `SAMPLE COURSE ARTEFACT`.
- Use mono field names, rose annotations and neutral body text.
- Avoid auto-advancing carousels.

### 11.9 Audience section

Use three large horizontal rows rather than small cards:

- Working product designers
- Serious career switchers
- Design and product teams

Each row includes:

- Audience index.
- One-sentence problem.
- Relevant course route.
- Arrow action.

Hover moves the arrow and brightens the connection line, not the entire row dramatically.

### 11.10 Workshops

Show the first three workshops as a dense schedule-like list.

- Workshop title left.
- Proposed duration and outcome centre.
- Coming soon badge and action right.
- Use thin row separators.
- On hover, a rose trace follows the row.
- On mobile, metadata stacks below the title.

### 11.11 Instructor

Use a 5/7 composition.

- Real founder photograph or deliberate placeholder left.
- Bio and teaching principles right.
- If a photograph exists, use natural contrast with a subtle rose edge light or duotone overlay at no more than 15% intensity.
- Do not generate or fabricate a portrait.
- Career companies appear as text, not an oversized logo wall.

### 11.12 Newsletter and final CTA

The newsletter block may use the strongest rose surface on the site.

- Background: rose.
- Text: black.
- Input: black or white with clear contrast.
- Button: black with white text.
- Keep the form compact.
- Do not place the newsletter and course waitlist in the same form.

The final course CTA returns to black with a wide ecosystem line converging on the waitlist button.

## 12. Interior-page system

### Shared subpage hero

- Black background with restrained atmospheric nodes.
- Minimum height: 440px desktop, auto on mobile.
- Breadcrumbs at the top of the content area.
- Mono eyebrow, display headline and short introduction.
- Optional metadata rail.
- The atmospheric effect should be lighter than the homepage hero.

### Course page

Desktop hero:

- Eight columns for title and introduction.
- Four columns for Coming soon, level, planned format and waitlist CTA.
- Metadata panel uses raised zinc surface.

Course body:

- Three-column sticky in-page navigation.
- Nine-column content.
- Outputs appear before the syllabus.
- Modules are numbered ledger rows with title and description.
- Tools are presented as context labels, not logo badges.
- FAQs use accessible accordions.
- A slim sticky waitlist bar may appear after the hero exits the viewport.

Mobile:

- Metadata follows introduction.
- No sticky sidebar.
- Modules may use disclosure rows, but titles and numbers remain visible.
- The sticky CTA must respect browser and safe-area controls.

### Courses index

- Use the connected programme ecosystem described on the homepage at larger scale.
- Add a comparison section after the ecosystem.
- Avoid a filter UI for only six courses.
- The comparison uses rows and columns on desktop, labelled stacked blocks on mobile.

### Workshops page

- Resemble a programme board or lab schedule.
- One feature workshop may use an expanded visual treatment.
- Remaining workshops use structured rows.
- Team-training CTA becomes a large bordered panel with a rose connection path.

### Resources index

Use an editorial publication layout.

- Feature one resource across 7 columns with a supporting visual.
- Use a vertical article list for the rest.
- Category labels use mono type.
- Coming soon resources are clearly marked and do not look published.
- Avoid a dense three-column blog-card grid.

### Resource detail

- Article column maximum: 680px.
- Table of contents sits in a 240px sticky sidebar on wide screens.
- Use white headings, secondary body text and rose links.
- Code, prompts and technical examples use raised zinc panels.
- Callouts use left border and evidence notation rather than coloured alert boxes.
- Downloadable artefacts use a distinct bordered module.
- Related course CTA appears after the useful content, not as an interruption near the top.

### About page

- Use John's career path as a connected timeline.
- Company transitions become nodes along a route, not separate biography cards.
- Teaching principles use large numbered statements.
- A full-width Grounded Design statement connects the founder story to the course system.

### Newsletter page

- Use a large editorial hero.
- Show five recurring content themes as connected labels.
- Include a compact example issue structure without inventing published content.
- The signup form is the dominant action.

### Contact and waitlist pages

- Use a 5/7 desktop split.
- Left side explains the action and privacy expectation.
- Right side contains one raised form panel.
- Forms should feel calm and highly legible, without atmospheric effects behind fields.
- Confirmation states replace the form in place and may link to the thank-you page.

## 13. Component specifications

### 13.1 Buttons

Primary:

- Background: rose.
- Text: black.
- Height: 48px desktop, minimum 48px mobile.
- Horizontal padding: 20-24px.
- Radius: 14px.
- Font: Inter Medium, 14-15px.
- Hover: lighter rose and subtle 1px upward movement.
- Active: pressed rose, no movement.
- Focus: visible dual ring.
- Disabled: zinc surface and disabled text, no glow.

Secondary:

- Transparent black or surface background.
- White text.
- Zinc border.
- Hover border becomes rose and text remains white.

Text action:

- White or secondary text with arrow.
- Hover turns rose and moves arrow by 3px.
- Underline must be visible for inline links inside paragraphs.

### 13.2 Status badge

- JetBrains Mono, 11-12px uppercase.
- Compact pill radius is allowed.
- Include text and optional dot.
- Coming soon uses rose-soft background, rose border and white text.
- Enrolling uses accessible success treatment.
- In progress uses info treatment.
- Closed uses zinc treatment.

### 13.3 Cards and panels

Default panel:

- Surface raised.
- 1px subtle border.
- 14px radius.
- 24px padding mobile, 32px desktop where content density allows.
- Shadow only when the panel visibly floats above another surface.

Interactive panel:

- Border brightens on hover and focus-within.
- Maximum lift: 4px.
- No dramatic scaling.
- The complete card may be clickable only when semantics and focus behaviour remain clear.

Feature panel:

- May include internal grid lines, rose connection paths and atmospheric depth.
- Must remain readable without motion.

### 13.4 Form fields

- Label always visible above the control.
- Labels use Inter Medium or mono label where appropriate.
- Field height: 52px minimum.
- Background: black or surface.
- Border: zinc.
- Text: white.
- Placeholder: muted zinc, never a substitute for label.
- Focus: rose border plus visible outer ring.
- Error: error border, icon optional, text message below.
- Help text: 13-14px secondary text.
- Textarea minimum height: 140px.
- Native select is preferred unless custom behaviour is necessary.
- Checkbox target includes both control and label.

### 13.5 Course card

Contains:

- Category eyebrow.
- Status badge.
- Course title.
- Outcome statement.
- Level and planned format.
- Action.

The flagship course uses a unique large feature component. Specialist cards share geometry but may vary internal node diagrams. The foundation course uses a wide entry-path component.

### 13.6 Workshop row

- Minimum row height: 112px desktop.
- Number, title, duration, outcome, status and action follow consistent columns.
- On mobile, title and outcome stay first; duration and status follow.

### 13.7 Resource item

- Published and Coming soon states look different.
- Published item shows date and reading time.
- Coming soon item shows status and subscription action.
- Use a thumbnail only when a meaningful authored image exists.

### 13.8 Accordion

- Use native button semantics.
- Entire header row is the trigger.
- Plus-to-minus icon or chevron rotates by 180 degrees.
- Motion duration: 180-220ms.
- Content remains readable with animation disabled.
- Focus ring surrounds the trigger, not the entire section.

### 13.9 Breadcrumbs

- JetBrains Mono or Inter at 12-13px.
- Muted text with white current page.
- Use slash separators.
- Collapse intermediate items thoughtfully on mobile.

### 13.10 Evidence notation

`[E]`, `[I]`, `[A]` and `[X]` are functional brand components.

- Always use JetBrains Mono SemiBold.
- Use consistent square or compact rounded geometry.
- Do not change the letter colours arbitrarily between pages.
- Default labels are neutral. The currently selected label becomes rose.
- Include full text where a user may not understand the abbreviation.

## 14. Imagery and authored graphics

### Preferred visual assets

- Product-state diagrams.
- Evidence ledgers.
- Prototype windows.
- Agent journey maps.
- Evaluation scorecards.
- Real workshop photography.
- Real founder photography.
- Real screenshots when they do not disclose confidential information.

### Avoid

- Generic AI brains.
- Humanoid robots.
- Floating holograms.
- Random people looking at laptops.
- Decorative 3D objects unrelated to the content.
- Fake student dashboards or fake outcomes.
- Screenshots that expose employer-confidential work.

### Asset treatment

- Use dark neutral frames.
- Rose annotations identify decisions or active paths.
- Keep screenshot chrome minimal.
- Use a consistent 14px outer radius.
- Provide alternative text based on the information shown, not the appearance alone.

## 15. Motion system

### Motion principles

- Motion reveals relationships.
- Motion indicates state.
- Motion should never delay access to content.
- The page remains complete and understandable without animation.

### Durations

```css
:root {
  --duration-fast: 120ms;
  --duration-standard: 200ms;
  --duration-emphasis: 420ms;
  --duration-ambient: 8000ms;
  --ease-standard: cubic-bezier(0.2, 0.8, 0.2, 1);
  --ease-emphasis: cubic-bezier(0.16, 1, 0.3, 1);
}
```

### Page entrance

- Header fades in within 200ms.
- Eyebrow, headline, description and actions reveal in a restrained stagger.
- Total hero copy sequence should finish within 700ms.
- Ecosystem visual may begin slightly before the final CTA reveal.
- Do not animate each word or letter.

### Scroll reveals

- Use opacity and 12-20px vertical translation.
- Trigger once unless the component represents a changing active state.
- Stagger repeated items by 40-70ms.
- Do not reveal every paragraph independently.

### Hover and focus

- Cards lift no more than 4px.
- Buttons lift 1px.
- Connection lines brighten or carry a short rose signal.
- Focus receives equivalent emphasis without relying on pointer hover.

### Reduced motion

When `prefers-reduced-motion: reduce`:

- Disable ambient node drift and particle motion.
- Disable pointer parallax.
- Remove scroll-linked transforms.
- Keep opacity changes near-instant.
- Render the ecosystem in its final, readable static state.

## 16. WebGL, canvas and atmospheric effects

The Integration Ecosystem effect is a brand-supporting layer, not a requirement for every page.

### Permitted locations

- Homepage hero.
- One restrained background band later on the homepage.
- Simplified interior-page hero atmosphere.

Do not run a full-screen canvas behind every page.

### Scene specification

- Black transparent canvas.
- One primary rose glow or energy source.
- 12-16 labelled nodes in the desktop hero.
- 40-70 low-opacity background particles at most.
- Fine connecting lines with limited animated signal movement.
- Shallow perspective and depth.
- Pointer parallax capped to a small range.
- No camera spins, tunnels or rapid zoom.

### Implementation

- Prefer reusing an existing attached HTML or effect implementation if available and safe.
- If building new, use a lightweight Canvas 2D solution or direct Three.js.
- Do not add React Three Fiber unless the implementation clearly benefits and the bundle cost is accepted.
- Load the effect through a client-only dynamic import.
- Keep the semantic hero content outside the canvas.
- The canvas uses `pointer-events: none` unless intentional node interaction is implemented accessibly outside it.
- Pause animation when the page is hidden or the canvas leaves the viewport.
- Cap device-pixel ratio at 1.5.
- Target 30-60fps on modern desktop and stable scrolling on mobile.
- Provide an SVG or CSS fallback.
- Skip WebGL on reduced-motion, data-saving or constrained-device conditions where practical.
- A failure to initialise the effect must not affect content or layout.

## 17. Icons

- Use simple line icons only when they add comprehension.
- Default size: 16, 20 or 24px.
- Stroke width: approximately 1.5px.
- Default colour: secondary text.
- Active colour: rose.
- Use one consistent icon library or authored set.
- Do not use colourful application icons as decoration.
- Arrows should have consistent geometry across CTAs.

## 18. CMS design constraints

Sanity controls content, not unrestricted visual styling.

Editors may control:

- Programme content and status.
- Resource content and relationships.
- Announcement visibility and text.
- Images and alternative text.
- Featured and sort-order flags.
- SEO fields.

Editors may not control:

- Arbitrary section background colours.
- Font family or size.
- Component radius.
- Free-form animation.
- Unapproved button styles.
- Raw HTML or script injection.
- Arbitrary grid spans.

Portable Text supports a controlled set of blocks:

- Paragraph.
- H2 and H3.
- Bulleted and numbered lists.
- Quote.
- Code or prompt block.
- Evidence callout.
- Image with caption and alternative text.
- Downloadable artefact.
- Related course CTA.

Every Portable Text block maps to an authored design-system component.

## 19. Tailwind and implementation mapping

Define the tokens once and expose them to Tailwind. Do not scatter raw hex values throughout components.

Suggested semantic names:

```ts
colors: {
  canvas: "var(--color-bg)",
  surface: "var(--color-surface)",
  "surface-raised": "var(--color-surface-raised)",
  border: "var(--color-border)",
  "border-subtle": "var(--color-border-subtle)",
  ink: "var(--color-text-primary)",
  "ink-secondary": "var(--color-text-secondary)",
  "ink-muted": "var(--color-text-muted)",
  accent: "var(--color-accent)",
  "accent-hover": "var(--color-accent-hover)",
}
```

Create reusable primitives for:

- `Container`
- `Section`
- `SectionHeader`
- `MonoLabel`
- `StatusBadge`
- `Button`
- `Panel`
- `ConnectionLine`
- `EvidenceMark`
- `ProgrammeCard`
- `WorkshopRow`
- `ResourceItem`
- `FormField`

Use a class-merging helper only if the project already has one or the component system requires it. Avoid layers of variants that make the actual geometry difficult to trace.

## 20. Accessibility details

- Maintain WCAG 2.2 AA contrast.
- Primary rose buttons use black text.
- Never communicate programme status by colour alone.
- The canvas is decorative and hidden from accessibility APIs unless it conveys information that is duplicated in semantic HTML.
- Ecosystem relationships must have a readable HTML representation.
- All hover interactions have focus equivalents.
- Tooltips cannot contain essential information.
- Form error summaries link back to invalid fields where useful.
- Use `aria-live` for form submission status.
- Mobile menu has a clear accessible name and expanded state.
- Course accordions expose heading and button semantics correctly.
- Touch targets meet the minimum size.
- Respect reduced motion.
- Test the black and zinc surfaces at 200% zoom and forced-colour modes where possible.

## 21. Performance budgets

- Keep the semantic hero visible without waiting for the atmospheric effect.
- The effect cannot block Largest Contentful Paint.
- Dynamically import WebGL or canvas code.
- Avoid high-resolution texture assets.
- Prefer procedural points, lines and gradients.
- Pause offscreen animation.
- Use responsive image sources.
- Avoid loading founder photography on pages where it is not displayed.
- Limit font weights and subsets.
- No autoplay video in release one.
- No second heavy animation library if CSS and the existing framework can handle the interaction.

## 22. Design QA matrix

### Viewports

Test at:

- 320x568
- 375x812
- 390x844
- 768x1024
- 1024x768
- 1280x800
- 1440x900
- 1728x1117

### Pages

Review:

- Homepage.
- Courses index.
- Flagship course.
- One specialist course.
- Workshops.
- Resources index.
- Published resource.
- Coming soon resource.
- About.
- Newsletter.
- Waitlist.
- Contact.
- Privacy and Terms.
- 404.

### States

Verify:

- Default, hover, focus, active and disabled buttons.
- Coming soon, waitlist open, enrolling, in-progress and closed programme status.
- Form default, invalid, loading, provider failure and success.
- Header top, scrolled and mobile-open states.
- Accordion open and closed.
- Published and Coming soon resource states.
- WebGL loaded, reduced-motion fallback and initialisation failure.

### Visual checks

- No accidental light sections.
- Rose remains a focal signal rather than a background everywhere.
- White body text is not overused where secondary zinc is more appropriate.
- Cards do not become a repetitive SaaS grid.
- Mono type remains limited to labels and technical metadata.
- Connection lines remain subtle and do not interfere with reading.
- First viewport clearly shows audience, promise and CTA.
- Mobile hero remains understandable without the desktop effect.
- No content overlaps the canvas, sticky bar or safe-area inset.

## 23. Guardrails

- Do not flatten the design into a generic card grid.
- Do not change the site to a light theme.
- Do not replace rose with purple, blue or yellow as the primary accent.
- Do not use gradients as the main brand identity.
- Do not place atmospheric effects behind forms or long-form reading.
- Do not use WebGL if it causes slow content display or unstable scrolling.
- Do not animate every element.
- Do not use the mono face for long paragraphs.
- Do not centre every section.
- Do not hide Coming soon status to make courses appear available.
- Do not invent testimonials or use fake student work as decoration.
- Do not use random stock photography.
- Do not expose employer-confidential product work.
- Do not allow CMS authors to break the system with arbitrary presentation controls.
- Preserve the source reference's first-screen signal, dark contrast, atmospheric depth and connected ecosystem composition.

## 24. Codex implementation checklist

Before implementing pages:

1. Read the PRD, build prompt and this file completely.
2. Treat this file as the visual source of truth.
3. Inspect the attached Integration Ecosystem reference and any related HTML or assets available in the repository.
4. Audit existing Switch to UX brand assets before creating temporary replacements.
5. Implement design tokens before page-specific CSS.
6. Build the global shell and core primitives.
7. Prototype the homepage hero at desktop and mobile sizes.
8. Verify the static hero fallback before adding ambient motion.
9. Build the flagship course component before specialist variants.
10. Validate contrast, focus and reduced-motion behaviour.

Before declaring completion:

1. Capture screenshots at 375px, 768px and 1440px.
2. Compare the first viewport against the Integration Ecosystem qualities in this file.
3. Confirm that the site has not drifted into a generic SaaS card system.
4. Confirm that every interactive state is visible on black and zinc surfaces.
5. Run accessibility and responsive tests.
6. Run performance checks with the atmospheric effect enabled and disabled.
7. Confirm that disabling JavaScript still exposes meaningful content where the framework permits.
8. Report any deliberate deviation from this file and the product reason for it.

## 25. Definition of visual completion

The redesign is visually complete when:

- The first viewport immediately feels like a dark, connected AI-native product-design ecosystem.
- The headline and primary waitlist action remain the clearest elements.
- The rose signal guides attention without overwhelming the interface.
- Grounded Design has a distinct and memorable visual representation.
- The flagship course visibly anchors the programme portfolio.
- Specialist courses feel connected to the flagship rather than like unrelated products.
- Course, workshop, resource and form templates clearly belong to the same system.
- Mobile retains the information hierarchy and brand signal without depending on WebGL.
- Motion adds depth and relationship while reduced-motion mode remains complete.
- No page resembles a generic bootcamp, course marketplace or AI SaaS template.
