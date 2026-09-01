import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import tokenReport from "@/design-system/generated/token-report.json";
import { cssVariables, tokens } from "@/design-system/generated/tokens";
import { FoundationInspector } from "./foundation-inspector";

export const metadata: Metadata = {
  title: "Foundations",
};

const semanticColours = [
  ["Canvas", "color.background.canvas", tokens.color.background.canvas],
  ["Surface", "color.surface.default", tokens.color.surface.default],
  ["Raised surface", "color.surface.raised", tokens.color.surface.raised],
  ["Surface hover", "color.surface.hover", tokens.color.surface.hover],
  ["Primary text", "color.text.primary", tokens.color.text.primary],
  ["Secondary text", "color.text.secondary", tokens.color.text.secondary],
  ["Muted text", "color.text.muted", tokens.color.text.muted],
  ["Interactive boundary", "color.border.control", tokens.color.border.control],
] as const;

const actionColours = [
  ["Brand", "color.action.primary", tokens.color.action.primary],
  ["Hover", "color.action.hover", tokens.color.action.hover],
  ["Pressed", "color.action.pressed", tokens.color.action.pressed],
  ["Soft", "color.action.soft", tokens.color.action.soft],
] as const;

const signalColours = [
  ["Success", "color.status.success.signal", tokens.color.status.success.signal],
  ["Warning", "color.status.warning.signal", tokens.color.status.warning.signal],
  ["Info", "color.status.info.signal", tokens.color.status.info.signal],
  ["Error", "color.status.error.signal", tokens.color.status.error.signal],
] as const;

const typeSpecimens = [
  ["Display/2XL", "display-2xl", tokens.typography.display["2xl"]],
  ["Display/XL", "display-xl", tokens.typography.display.xl],
  ["Display/LG", "display-lg", tokens.typography.display.lg],
  ["Heading/XL", "heading-xl", tokens.typography.heading.xl],
  ["Heading/LG", "heading-lg", tokens.typography.heading.lg],
  ["Heading/MD", "heading-md", tokens.typography.heading.md],
  ["Body/LG", "body-lg", tokens.typography.body.lg],
  ["Body/MD", "body-md", tokens.typography.body.md],
  ["Body/SM", "body-sm", tokens.typography.body.sm],
  ["Label/Mono", "label-mono", tokens.typography.label.mono],
  ["Technical/Mono", "technical-mono", tokens.typography.technical.mono],
] as const;

const spacingEntries = Object.entries(tokens.dimension.space);
const radiusEntries = Object.entries(tokens.dimension.radius);
const motionEntries = Object.entries(tokens.motion);
const layoutMeasureGroups = [
  ["Page padding", Object.entries(tokens.layout.pagePadding)],
  ["Section spacing", Object.entries(tokens.layout.section)],
  ["Containers", Object.entries(tokens.layout.container)],
  ["Reading widths", Object.entries(tokens.layout.reading)],
] as const;

function tokenVariable(tokenId: keyof typeof cssVariables) {
  return `var(${cssVariables[tokenId]})`;
}

function Swatch({
  label,
  tokenId,
  value,
}: {
  label: string;
  tokenId: keyof typeof cssVariables;
  value: string;
}) {
  return (
    <div className="colour-swatch">
      <span
        aria-hidden="true"
        className="colour-swatch-fill"
        style={{ background: tokenVariable(tokenId) }}
      />
      <span className="colour-swatch-name">{label}</span>
      <code>{tokenId}</code>
      <code className="colour-swatch-value">{value}</code>
    </div>
  );
}

function Board({
  children,
  description,
  id,
  title,
}: {
  children: ReactNode;
  description: string;
  id: string;
  title: string;
}) {
  return (
    <section aria-labelledby={id} className="foundation-board">
      <div className="board-heading">
        <h2 id={id}>{title}</h2>
        <p>{description}</p>
      </div>
      {children}
    </section>
  );
}

export default function FoundationsPage() {
  return (
    <div className="foundations-page">
      <header className="foundation-hero">
        <p className="lab-kicker">Ready for review</p>
        <h1>The system, made visible.</h1>
        <p>
          Every specimen below resolves from the canonical token source. This is
          a proof surface, not a product component library.
        </p>
        <dl className="foundation-summary">
          <div>
            <dt>Tokens</dt>
            <dd>{tokenReport.counts.tokens}</dd>
          </div>
          <div>
            <dt>CSS variables</dt>
            <dd>{tokenReport.counts.cssVariables}</dd>
          </div>
          <div>
            <dt>Contrast</dt>
            <dd>{tokenReport.contrastChecks.length} of {tokenReport.contrastChecks.length}</dd>
          </div>
        </dl>
      </header>

      <Board
        description="Semantic roles are the working palette. Primitive values remain available for traceability, not routine composition."
        id="colour-heading"
        title="Colour roles"
      >
        <div className="colour-board">
          <div className="colour-group semantic-colours">
            <h3>Environment</h3>
            {semanticColours.map(([label, tokenId, value]) => (
              <Swatch key={tokenId} label={label} tokenId={tokenId} value={value} />
            ))}
          </div>
          <div className="colour-group action-colours">
            <h3>Rose action</h3>
            {actionColours.map(([label, tokenId, value]) => (
              <Swatch key={tokenId} label={label} tokenId={tokenId} value={value} />
            ))}
          </div>
          <div className="colour-group signal-colours">
            <h3>Status signal</h3>
            {signalColours.map(([label, tokenId, value]) => (
              <Swatch key={tokenId} label={label} tokenId={tokenId} value={value} />
            ))}
          </div>
        </div>
      </Board>

      <Board
        description="Inter carries display and reading roles. JetBrains Mono is reserved for labels, values and technical context."
        id="typography-heading"
        title="Typography"
      >
        <div className="type-specimens">
          {typeSpecimens.map(([role, className, definition]) => (
            <article className="type-specimen" key={role}>
              <div className="type-meta">
                <strong>{role}</strong>
                <code>
                  {definition.fontFamily} / {definition.fontWeight} / {definition.lineHeight} / {definition.letterSpacing}
                </code>
              </div>
              <p className={`type-sample ${className}`}>
                Design the decision, not the decoration.
              </p>
            </article>
          ))}
        </div>
      </Board>

      <Board
        description="The spacing scale sets local rhythm. Layout aliases handle page padding, section intervals and gutters."
        id="spacing-heading"
        title="Spacing and radius"
      >
        <div className="measure-board">
          <div className="spacing-ruler">
            {spacingEntries.map(([name, value]) => (
              <div className="spacing-entry" key={name}>
                <code>space.{name}</code>
                <span
                  aria-hidden="true"
                  className="spacing-bar"
                  style={{ width: `var(--space-${name})` }}
                />
                <span>{value}</span>
              </div>
            ))}
          </div>
          <div className="radius-board">
            {radiusEntries.map(([name, value]) => (
              <div className="radius-entry" key={name}>
                <span
                  aria-hidden="true"
                  className="radius-shape"
                  style={{ borderRadius: `var(--radius-${name})` }}
                />
                <code>radius.{name}</code>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="layout-measures">
          {layoutMeasureGroups.map(([group, entries]) => (
            <div className="layout-measure-group" key={group}>
              <h3>{group}</h3>
              <dl>
                {entries.map(([name, value]) => (
                  <div key={name}>
                    <dt>{name}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </Board>

      <FoundationInspector />

      <Board
        description="Elevation is reserved for an actual layer change. Focus combines a rose inner ring with a white outer ring."
        id="effects-heading"
        title="Elevation and focus"
      >
        <div className="effects-board">
          <div className="elevation-stack">
            <div className="elevation-canvas">Canvas</div>
            <div className="elevation-surface">Surface</div>
            <div className="elevation-raised">Raised surface</div>
          </div>
          <div className="focus-specimen">
            <p>Keyboard focus uses two independent contrast boundaries.</p>
            <button type="button">Focus specimen</button>
            <code>{tokens.effect.focusRing}</code>
          </div>
        </div>
      </Board>

      <Board
        description="Motion roles communicate feedback and state change. The reduced role resolves to no duration and no distance."
        id="motion-heading"
        title="Motion"
      >
        <div className="motion-board">
          {motionEntries.map(([name, definition]) => (
            <article className="motion-entry" key={name}>
              <div>
                <strong>{name}</strong>
                <code>
                  {definition.duration}
                  {"easing" in definition
                    ? ` / cubic-bezier(${definition.easing.join(", ")})`
                    : ` / ${definition.distance}`}
                </code>
              </div>
              <span
                aria-hidden="true"
                className="motion-track"
                style={
                  {
                    "--specimen-duration": definition.duration,
                    "--specimen-easing":
                      "easing" in definition && Array.isArray(definition.easing)
                      ? `cubic-bezier(${definition.easing.join(", ")})`
                      : "linear",
                  } as CSSProperties
                }
              >
                <span />
              </span>
            </article>
          ))}
        </div>
      </Board>

      <section aria-labelledby="access-heading" className="foundation-board access-board">
        <div className="board-heading">
          <h2 id="access-heading">Accessibility evidence</h2>
          <p>
            Required text, action, boundary and focus combinations pass their
            configured WCAG 2.2 thresholds.
          </p>
        </div>
        <div className="contrast-ledger">
          {tokenReport.contrastChecks.map((check) => (
            <div className="contrast-entry" key={check.name}>
              <strong>{check.name}</strong>
              <span>{check.ratio.toFixed(2)}:1</span>
              <span>{check.minimum}:1 minimum</span>
              <span>{check.passes ? "Pass" : "Needs revision"}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
