const CANVAS = "#09090b";
const AA_TEXT = 4.5;
const SAT_SCALE = 0.72;
const SOURCE = { default: "#f43f5e", hover: "#fb7185", pressed: "#e21e49" };

function parseHex(hex) {
  const v = hex.replace("#", "");
  return [0, 2, 4].map((i) => Number.parseInt(v.slice(i, i + 2), 16));
}

function toHex([r, g, b]) {
  return `#${[r, g, b].map((c) => Math.round(c).toString(16).padStart(2, "0")).join("")}`;
}

function luminance(rgb) {
  const [r, g, b] = rgb.map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const la = luminance(parseHex(a));
  const lb = luminance(parseHex(b));
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

function rgbToHsl([r, g, b]) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  const d = max - min;
  if (d === 0) return [0, 0, l];
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
  else if (max === gn) h = ((bn - rn) / d + 2) / 6;
  else h = ((rn - gn) / d + 4) / 6;
  return [h, s, l];
}

function hslToRgb([h, s, l]) {
  if (s === 0) return [l * 255, l * 255, l * 255];
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const channel = (t) => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };
  return [channel(h + 1 / 3) * 255, channel(h) * 255, channel(h - 1 / 3) * 255];
}

function desaturate(hex, satScale) {
  const [h, s, l] = rgbToHsl(parseHex(hex));
  return toHex(hslToRgb([h, s * satScale, l]));
}

function darkestClearing(hex, satScale, minRatio) {
  const [h, s] = rgbToHsl(parseHex(hex));
  const sat = s * satScale;
  for (let l = 0.3; l <= 0.85; l += 0.002) {
    const candidate = toHex(hslToRgb([h, sat, l]));
    if (contrast(candidate, CANVAS) >= minRatio) return candidate;
  }
  throw new Error(`no lightness clears ${minRatio} for ${hex}`);
}

const proposed = {
  default: desaturate(SOURCE.default, SAT_SCALE),
  hover: desaturate(SOURCE.hover, SAT_SCALE),
  pressed: darkestClearing(SOURCE.pressed, SAT_SCALE, AA_TEXT),
};

function row(label, hex) {
  const ratio = contrast(hex, CANVAS);
  const [, s, l] = rgbToHsl(parseHex(hex));
  return {
    label,
    hex,
    sat: `${Math.round(s * 100)}%`,
    light: `${Math.round(l * 100)}%`,
    vsCanvas: ratio.toFixed(2),
    verdict: ratio >= AA_TEXT ? "AA" : "fail",
  };
}

const rows = [
  ...Object.entries(SOURCE).map(([n, h]) => row(`current ${n}`, h)),
  ...Object.entries(proposed).map(([n, h]) => row(`proposed ${n}`, h)),
];

console.table(rows);
console.log(`canvas ${CANVAS}, text on rose is the same near-black, saturation scaled to ${SAT_SCALE}`);
console.log(JSON.stringify(proposed, null, 2));

const failures = rows.filter((r) => r.label.startsWith("proposed") && r.verdict === "fail");
if (failures.length > 0) {
  for (const f of failures) console.error(`${f.label} ${f.hex} is ${f.vsCanvas} against ${CANVAS}, needs ${AA_TEXT}`);
  process.exit(1);
}
console.log(`every proposed rose state clears ${AA_TEXT}:1 against the canvas and its own near-black text`);
