"use client";

import type { CSSProperties } from "react";
import { useState } from "react";

const viewportOptions = [320, 375, 768, 1024, 1280, 1440] as const;
const backgroundOptions = [
  { id: "canvas", label: "Canvas" },
  { id: "surface", label: "Surface" },
  { id: "raised", label: "Raised" },
] as const;

type Background = (typeof backgroundOptions)[number]["id"];

export function FoundationInspector() {
  const [viewport, setViewport] = useState<number>(375);
  const [background, setBackground] = useState<Background>("canvas");
  const [reducedMotion, setReducedMotion] = useState(false);
  const previewStyle = {
    "--lab-preview-width": `${viewport}px`,
  } as CSSProperties;

  return (
    <section aria-labelledby="inspector-heading" className="foundation-board inspector-board">
      <div className="board-heading">
        <div>
          <p className="lab-kicker">Interactive inspection</p>
          <h2 id="inspector-heading">Responsive token frame</h2>
        </div>
        <p>
          Change the canvas to verify column count, gutter, surface and motion
          behavior without changing the browser viewport.
        </p>
      </div>

      <div className="inspector-toolbar">
        <fieldset>
          <legend>Viewport width</legend>
          <div className="inspector-options">
            {viewportOptions.map((option) => (
              <button
                aria-pressed={viewport === option}
                key={option}
                onClick={() => setViewport(option)}
                type="button"
              >
                {option}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>Background</legend>
          <div className="inspector-options">
            {backgroundOptions.map((option) => (
              <button
                aria-pressed={background === option.id}
                key={option.id}
                onClick={() => setBackground(option.id)}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>
        </fieldset>

        <label className="motion-toggle">
          <input
            checked={reducedMotion}
            onChange={(event) => setReducedMotion(event.target.checked)}
            type="checkbox"
          />
          <span>Simulate reduced motion</span>
        </label>
      </div>

      <div className="inspector-stage" data-background={background}>
        <div
          className="responsive-preview"
          data-reduced-motion={reducedMotion}
          style={previewStyle}
        >
          <div className="responsive-preview-inner">
            <div className="preview-meta">
              <span>{viewport}px frame</span>
              <span>{reducedMotion ? "Motion reduced" : "Motion enabled"}</span>
            </div>
            <div aria-label="Responsive grid specimen" className="responsive-grid">
              {Array.from({ length: 12 }, (_, index) => (
                <span aria-hidden="true" key={index} />
              ))}
            </div>
            <div className="preview-content">
              <strong>Content follows the responsive aliases.</strong>
              <p>
                The frame moves from four to eight to twelve columns as its own
                width crosses the approved breakpoints.
              </p>
              <span aria-hidden="true" className="motion-sample-mark" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
