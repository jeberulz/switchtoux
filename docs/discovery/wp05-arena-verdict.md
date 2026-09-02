# WP05 arena verdict

## Base: candidate-1

The cross-judge ran before candidate-1 landed and recommended candidate-3 with a
graft of candidate-2's `@supports` gate. That verdict is stale on its central
point. Candidate-1 dissolves the problem the graft was meant to contain.

## The fork that decided it

All three candidates scale a fixed-width stage into a fluid frame. All three
need a unitless scale factor in pure CSS. They differ in how they get it.

Candidates 2 and 3 used typed `calc()` division, `calc(100cqw / 1440px)`.
Candidate 2 wrapped it in an `@supports` gate with a degraded static-thumbnail
fallback. Candidate 3 shipped it bare, which the judge correctly called a
catastrophic failure in non-supporting browsers.

Candidate-1 checked support instead of assuming it, found typed division absent
from Firefox, and used `tan(atan2(available, canvas))`, which is the same
quotient via trig functions that shipped in all three engines in 2022.

### Verified rather than argued

`scripts/probe-css-scale-technique.mjs` drives headless Chrome and compares the
constructions directly:

```
typed         ok     scale=0.54375
trig          ok     scale=0.54375
trigClamp     ok     scale=0.54375
trigCq        ok     scale=0.54375
frame 783px x 489.375px   ratio 1.6000
button inside inert took focus false
```

The two forms are numerically identical. Support data confirms the asymmetry:
caniuse lists typed division as Chrome 140+, Safari 26+, and **not supported in
Firefox 2 through 157**, and Mozilla's tracking bug 1827404 is still open. Trig
functions shipped Firefox 108, Chrome 111, Safari 15.4.

One search result claimed Firefox 116+ ships typed division. It contradicts both
caniuse and Mozilla's own bug tracker, so it is discarded.

Trig therefore dominates: it works everywhere typed division works, plus
Firefox. The `@supports` gate, the fallback branch, and the degraded caption all
become dead weight. The strongest graft the judge identified is now unnecessary,
which is the better outcome than shipping it.

## Why the other grafts also fell away

| Judge's graft | Status |
| --- | --- |
| candidate-2 `@supports` gate + fallback caption | Unnecessary. Trig needs no gate. |
| candidate-2 `aspect-ratio` frame | Superseded. Frame width and height are both the token dimension times the same scale, so the ratio is exact by construction with no second declaration to drift. Measured 1.6000. |
| candidate-2 button-to-span conversion | Superseded by `inert` on the stage, which removes 48 previews' worth of mock controls from both the tab order and the accessibility tree in one attribute. Verified: focus refused. |
| candidate-3 single source of truth for captions | Already present. Candidate-1 renders `{viewport.width} x {viewport.height}` from the same object that feeds the CSS custom property, so the label cannot disagree with the render. |

Candidate-1 also caught a consequence the others missed: a focus ring inside a
subtree at `scale(0.5)` renders at half its authored thickness, a real contrast
regression. `inert` removes the possibility rather than mitigating it.

## Fork B: the verdict model

Candidate-1's reading is the deepest and is checkable against the data. It
claims the 24 `recommendation` strings already contain two grammars. They do:

- Exactly 8 open with "Recommended", one per family. These state why a direction
  won.
- The other 16 are conditionals: "Strong when", "Use if", "Best for", "Useful
  when", "Choose when", "Best when", "Use when", "Best if". These state the
  condition that would flip the call.

So `recommended?: boolean` is an out-of-band marker for something the prose
already says. That is a denormalization, and the boolean was its symptom. The
split into `because` and `unless` is domain modelling, not churn.

It also collapses a second remediation item. Those 16 conditionals use eight
different openers for one idea, which is the synonym cycling the content review
flagged. Once the label is rendered from a fixed lookup table, the varied
openers are deleted rather than rewritten.

The `readonly [D, D, D]` tuple makes "three directions per family" a compile-time
fact and lets the runtime assertion counting eight recommendations be deleted
outright.

## Recorded rejections

- **Typed `calc()` division.** Cleaner to read. Rejected on evidence: absent
  from Firefox through 157.
- **Grid track ratio, `1440fr 375fr`.** Rejected because `fr` cannot be built
  from a length token, and `minmax(0, 1440px)` distributes free space equally
  rather than proportionally, silently giving the wrong ratio on narrow rows.
- **`zoom`.** Rejected because it would drive `--text-body-sm` to 10.3px, inside
  the browser minimum-font-size clamp.
- **Retaining `recommendation` as one field.** Rejected because it is two
  sentence shapes wearing one name.
