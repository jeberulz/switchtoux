import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
export const PROJECT_ROOT = path.resolve(SCRIPT_DIRECTORY, "..");
export const TOKEN_DIRECTORY = path.join(
  PROJECT_ROOT,
  "src/design-system/tokens",
);
export const GENERATED_DIRECTORY = path.join(
  PROJECT_ROOT,
  "src/design-system/generated",
);

export const SOURCE_FILES = [
  "primitives.json",
  "semantic.json",
  "typography.json",
  "motion.json",
  "component.json",
];

const ALLOWED_TYPES = new Set([
  "color",
  "dimension",
  "number",
  "duration",
  "cubicBezier",
  "fontFamily",
  "fontWeight",
  "shadow",
]);

const REFERENCE_PATTERN = /^\{([a-zA-Z0-9.-]+)\}$/;

const REQUIRED_TOKEN_IDS = [
  "color.background.canvas",
  "color.surface.default",
  "color.surface.raised",
  "color.surface.hover",
  "color.border.subtle",
  "color.border.default",
  "color.border.strong",
  "color.border.control",
  "color.text.primary",
  "color.text.secondary",
  "color.text.muted",
  "color.text.disabled",
  "color.text.onAction",
  "color.action.primary",
  "color.action.hover",
  "color.action.pressed",
  "color.action.soft",
  "color.action.line",
  "color.action.glow",
  "effect.shadow.raised",
  "effect.shadow.accent",
  "effect.focusRing",
  "layout.container.content",
  "layout.container.atmospheric",
  "layout.breakpoint.mobile",
  "layout.breakpoint.tablet",
  "layout.breakpoint.comparison",
  "layout.breakpoint.desktop",
  "layout.breakpoint.wide",
  "layout.breakpoint.canvas",
  "motion.reduced.duration",
  "motion.reduced.distance",
];

const REQUIRED_TYPOGRAPHY_ROLES = [
  "Display/2XL",
  "Display/XL",
  "Display/LG",
  "Heading/XL",
  "Heading/LG",
  "Heading/MD",
  "Body/LG",
  "Body/MD",
  "Body/SM",
  "Label/Mono",
  "Technical/Mono",
];

const REQUIRED_BREAKPOINT_NAMES = [
  "mobile",
  "tablet",
  "comparison",
  "desktop",
  "wide",
  "canvas",
];

const REQUIRED_MOTION_ROLES = [
  "instantFeedback",
  "hoverFocus",
  "accordion",
  "maskedReveal",
  "pageEntrance",
  "mobileMenu",
  "ambientPath",
  "reduced",
];

function stableSortObject(value) {
  if (Array.isArray(value)) {
    return value.map(stableSortObject);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, item]) => [key, stableSortObject(item)]),
    );
  }

  return value;
}

export function stableJson(value) {
  return `${JSON.stringify(stableSortObject(value), null, 2)}\n`;
}

function toKebab(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function collectReferences(value, references = []) {
  if (typeof value === "string") {
    const match = value.match(REFERENCE_PATTERN);
    if (match) references.push(match[1]);
    return references;
  }

  if (Array.isArray(value)) {
    for (const item of value) collectReferences(item, references);
    return references;
  }

  if (value && typeof value === "object") {
    for (const item of Object.values(value)) {
      collectReferences(item, references);
    }
  }

  return references;
}

export function flattenDocument(document, source) {
  const flattened = [];

  function walk(node, segments, inheritedRole = null) {
    if (!node || typeof node !== "object" || Array.isArray(node)) return;

    const role =
      node.$extensions?.switchtoux?.role ?? inheritedRole ?? null;

    if (Object.hasOwn(node, "$value")) {
      flattened.push({
        id: segments.join("."),
        source,
        type: node.$type,
        rawValue: node.$value,
        description: node.$description,
        extensions: node.$extensions ?? {},
        role,
        references: collectReferences(node.$value),
      });
      return;
    }

    for (const [key, child] of Object.entries(node)) {
      if (key.startsWith("$")) continue;
      walk(child, [...segments, key], role);
    }
  }

  walk(document, []);
  return flattened;
}

export function resolveTokenValues(tokenMap) {
  const resolved = new Map();
  const resolving = [];

  function resolveValue(value) {
    if (typeof value === "string") {
      const match = value.match(REFERENCE_PATTERN);
      return match ? resolveToken(match[1]) : value;
    }

    if (Array.isArray(value)) return value.map(resolveValue);

    if (value && typeof value === "object") {
      return Object.fromEntries(
        Object.entries(value).map(([key, item]) => [key, resolveValue(item)]),
      );
    }

    return value;
  }

  function resolveToken(id) {
    if (resolved.has(id)) return resolved.get(id);
    if (!tokenMap.has(id)) throw new Error(`Unresolved token reference: ${id}`);
    if (resolving.includes(id)) {
      throw new Error(`Circular token reference: ${[...resolving, id].join(" -> ")}`);
    }

    resolving.push(id);
    const value = resolveValue(tokenMap.get(id).rawValue);
    resolving.pop();
    resolved.set(id, value);
    return value;
  }

  for (const id of tokenMap.keys()) resolveToken(id);
  return resolved;
}

function cssVariableName(token, configuration) {
  const override = configuration.cssVariables[token.id];
  if (override) return override;

  const typographyMatch = token.id.match(
    /^typography\.(display|heading|body|label|technical)\.([^.]+)\.(fontFamily|fontSize|fontWeight|lineHeight|letterSpacing)$/,
  );

  if (typographyMatch) {
    const [, category, scale, property] = typographyMatch;
    const base = `--text-${toKebab(category)}-${toKebab(scale)}`;
    if (property === "fontSize") return base;
    return `${base}-${toKebab(property)}`;
  }

  if (token.source === "primitives.json") {
    return `--primitive-${toKebab(token.id)}`;
  }

  return `--${toKebab(token.id)}`;
}

function cssValue(token, tokenMap, cssVariables) {
  const extensionValue = token.extensions?.switchtoux?.cssValue;
  if (extensionValue) return extensionValue;

  const format = (value) => {
    if (typeof value === "string") {
      const match = value.match(REFERENCE_PATTERN);
      return match ? `var(${cssVariables.get(match[1])})` : value;
    }
    if (typeof value === "number") return String(value);
    if (Array.isArray(value) && token.type === "cubicBezier") {
      return `cubic-bezier(${value.join(", ")})`;
    }
    throw new Error(`Token ${token.id} cannot be represented as a CSS variable.`);
  };

  return format(token.rawValue);
}

function buildNestedResolvedObject(tokens, resolvedValues) {
  const output = {};

  for (const token of tokens) {
    const segments = token.id.split(".");
    let cursor = output;
    for (const segment of segments.slice(0, -1)) {
      cursor[segment] ??= {};
      cursor = cursor[segment];
    }
    cursor[segments.at(-1)] = resolvedValues.get(token.id);
  }

  return output;
}

function getCollection(token, configuration) {
  const rule = configuration.collectionRules.find(
    (candidate) =>
      candidate.source === token.source && token.id.startsWith(candidate.prefix),
  );

  if (!rule) {
    throw new Error(`No Figma collection rule matches ${token.id}.`);
  }

  return { name: rule.collection, mode: rule.mode };
}

function figmaType(type) {
  return {
    color: "COLOR",
    dimension: "FLOAT",
    number: "FLOAT",
    duration: "FLOAT",
    cubicBezier: "STRING",
    fontFamily: "STRING",
    fontWeight: "FLOAT",
    shadow: "STRING",
  }[type];
}

function dimensionToPixels(value) {
  if (typeof value !== "string") return value;
  if (/^-?\d+(\.\d+)?px$/.test(value)) return Number.parseFloat(value);
  if (/^-?\d+(\.\d+)?rem$/.test(value)) return Number.parseFloat(value) * 16;
  if (/^-?\d+(\.\d+)?em$/.test(value)) return Number.parseFloat(value) * 16;
  return value;
}

function durationToMilliseconds(value) {
  if (typeof value === "string" && value.endsWith("ms")) {
    return Number.parseFloat(value);
  }
  return value;
}

function figmaValue(token, resolvedValue) {
  const explicit = token.extensions?.switchtoux?.figmaValue;
  if (explicit !== undefined) return explicit;
  if (token.type === "dimension") return dimensionToPixels(resolvedValue);
  if (token.type === "duration") return durationToMilliseconds(resolvedValue);
  return resolvedValue;
}

function hexToRgb(hex) {
  const match = hex.match(/^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!match) throw new Error(`Contrast checks require a six-digit hex colour: ${hex}`);
  return match.slice(1).map((part) => Number.parseInt(part, 16) / 255);
}

function relativeLuminance(hex) {
  const [red, green, blue] = hexToRgb(hex).map((channel) =>
    channel <= 0.04045
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

export function contrastRatio(foreground, background) {
  const foregroundLuminance = relativeLuminance(foreground);
  const backgroundLuminance = relativeLuminance(background);
  return (
    (Math.max(foregroundLuminance, backgroundLuminance) + 0.05) /
    (Math.min(foregroundLuminance, backgroundLuminance) + 0.05)
  );
}

function contrastChecks(resolvedValues) {
  const checks = [
    ["primary text on canvas", "color.text.primary", "color.background.canvas", 4.5],
    ["secondary text on canvas", "color.text.secondary", "color.background.canvas", 4.5],
    ["muted text on canvas", "color.text.muted", "color.background.canvas", 4.5],
    ["muted text on surface", "color.text.muted", "color.surface.default", 4.5],
    ["rose text on canvas", "color.action.primary", "color.background.canvas", 4.5],
    ["rose text on surface", "color.action.primary", "color.surface.default", 4.5],
    ["action text on primary", "color.text.onAction", "color.action.primary", 4.5],
    ["action text on hover", "color.text.onAction", "color.action.hover", 4.5],
    ["action text on pressed", "color.text.onAction", "color.action.pressed", 4.5],
    ["control border on canvas", "color.border.control", "color.background.canvas", 3],
    ["control border on surface", "color.border.control", "color.surface.default", 3],
    ["inner focus on surface", "color.focus.inner", "color.surface.default", 3],
    ["outer focus on surface", "color.focus.outer", "color.surface.default", 3],
    ["success signal on canvas", "color.status.success.signal", "color.background.canvas", 4.5],
    ["warning signal on canvas", "color.status.warning.signal", "color.background.canvas", 4.5],
    ["info signal on canvas", "color.status.info.signal", "color.background.canvas", 4.5],
    ["error signal on canvas", "color.status.error.signal", "color.background.canvas", 4.5],
  ];

  return checks.map(([name, foregroundId, backgroundId, minimum]) => {
    const foreground = resolvedValues.get(foregroundId);
    const background = resolvedValues.get(backgroundId);
    const ratio = contrastRatio(foreground, background);
    return {
      name,
      foreground: { id: foregroundId, value: foreground },
      background: { id: backgroundId, value: background },
      ratio: Number(ratio.toFixed(3)),
      minimum,
      passes: ratio >= minimum,
    };
  });
}

export function validateTokenLayers(tokens, tokenMap) {
  const errors = [];

  for (const token of tokens) {
    if (!token.id) errors.push(`Token in ${token.source} has an empty ID.`);
    if (!ALLOWED_TYPES.has(token.type)) {
      errors.push(`${token.id} has unsupported type ${String(token.type)}.`);
    }
    if (!token.description || !token.description.trim()) {
      errors.push(`${token.id} is missing a description.`);
    }

    if (token.source === "primitives.json" && token.references.length > 0) {
      errors.push(`${token.id} is primitive but contains a reference.`);
    }

    const allowedReferenceSources = {
      "semantic.json": new Set(["primitives.json"]),
      "motion.json": new Set(["primitives.json"]),
      "component.json": new Set([
        "primitives.json",
        "semantic.json",
        "typography.json",
        "motion.json",
      ]),
    }[token.source];

    for (const reference of token.references) {
      const target = tokenMap.get(reference);
      if (!target) continue;
      if (target.type !== token.type) {
        errors.push(
          `${token.id} (${token.type}) references ${reference} (${target.type}).`,
        );
      }
      if (allowedReferenceSources && !allowedReferenceSources.has(target.source)) {
        errors.push(
          `${token.id} may not reference ${reference} from ${target.source}.`,
        );
      }
    }

    if (
      ["semantic.json", "motion.json", "component.json"].includes(token.source) &&
      token.references.length === 0
    ) {
      errors.push(`${token.id} must alias another canonical token.`);
    }
  }

  return errors;
}

function generateCss(tokens, tokenMap, cssVariables, configuration) {
  const rootLines = tokens.map((token) => {
    const value = cssValue(token, tokenMap, cssVariables);
    return `  ${cssVariables.get(token.id)}: ${value};`;
  });

  const colorAndFontAliases = [];
  const breakpointAliases = [];

  for (const [alias, tokenId] of Object.entries(configuration.tailwindAliases).sort(
    ([left], [right]) => left.localeCompare(right),
  )) {
    const [namespace, ...nameSegments] = alias.split(".");
    const cssName = `--${namespace}-${nameSegments.map(toKebab).join("-")}`;
    if (namespace === "breakpoint") {
      breakpointAliases.push(
        `  ${cssName}: ${tokenMap.get(tokenId).resolvedValue};`,
      );
    } else {
      colorAndFontAliases.push(
        `  ${cssName}: var(${cssVariables.get(tokenId)});`,
      );
    }
  }

  return `/* This file is generated. Do not edit directly. */
:root {
  color-scheme: dark;
${rootLines.join("\n")}
}

@theme inline {
${colorAndFontAliases.join("\n")}
}

@theme {
${breakpointAliases.join("\n")}
}
`;
}

function generateTypeScript(
  tokens,
  resolvedValues,
  cssVariables,
  typographyRoles,
  breakpointNames,
  motionRoles,
) {
  const nestedTokens = buildNestedResolvedObject(tokens, resolvedValues);
  const variableObject = Object.fromEntries(
    tokens.map((token) => [token.id, cssVariables.get(token.id)]),
  );
  const tokenIds = tokens.map((token) => token.id);

  return `/* This file is generated. Do not edit directly. */

export const tokens = ${JSON.stringify(nestedTokens, null, 2)} as const;

export const cssVariables = ${JSON.stringify(variableObject, null, 2)} as const;

export const tokenIds = ${JSON.stringify(tokenIds, null, 2)} as const;
export type TokenId = (typeof tokenIds)[number];

export const typographyRoles = ${JSON.stringify(typographyRoles, null, 2)} as const;
export type TypographyRole = (typeof typographyRoles)[number];

export const breakpointNames = ${JSON.stringify(breakpointNames, null, 2)} as const;
export type BreakpointName = (typeof breakpointNames)[number];

export const motionRoles = ${JSON.stringify(motionRoles, null, 2)} as const;
export type MotionRole = (typeof motionRoles)[number];
`;
}

export async function buildTokenArtifacts() {
  const documents = new Map();
  const sourceStrings = new Map();

  for (const source of SOURCE_FILES) {
    const contents = await readFile(path.join(TOKEN_DIRECTORY, source), "utf8");
    sourceStrings.set(source, contents);
    documents.set(source, JSON.parse(contents));
  }

  const configurationContents = await readFile(
    path.join(TOKEN_DIRECTORY, "figma-map.json"),
    "utf8",
  );
  const configuration = JSON.parse(configurationContents);
  sourceStrings.set("figma-map.json", configurationContents);

  const tokens = SOURCE_FILES.flatMap((source) =>
    flattenDocument(documents.get(source), source),
  ).sort((left, right) => left.id.localeCompare(right.id));

  const tokenMap = new Map();
  const errors = [];

  for (const token of tokens) {
    if (tokenMap.has(token.id)) errors.push(`Duplicate token ID: ${token.id}`);
    tokenMap.set(token.id, token);
  }

  errors.push(...validateTokenLayers(tokens, tokenMap));

  for (const requiredId of REQUIRED_TOKEN_IDS) {
    if (!tokenMap.has(requiredId)) errors.push(`Missing required token: ${requiredId}`);
  }

  let resolvedValues;
  try {
    resolvedValues = resolveTokenValues(tokenMap);
  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error));
    resolvedValues = new Map();
  }

  for (const token of tokens) {
    token.resolvedValue = resolvedValues.get(token.id);
  }

  const cssVariables = new Map(
    tokens.map((token) => [token.id, cssVariableName(token, configuration)]),
  );
  const variableOwners = new Map();
  for (const [id, variable] of cssVariables) {
    if (variableOwners.has(variable)) {
      errors.push(
        `Duplicate CSS variable ${variable} for ${variableOwners.get(variable)} and ${id}.`,
      );
    }
    variableOwners.set(variable, id);
  }

  for (const [alias, id] of Object.entries(configuration.tailwindAliases)) {
    if (!tokenMap.has(id)) errors.push(`Tailwind alias ${alias} targets missing ${id}.`);
  }

  const typographyRoles = [
    ...new Set(tokens.map((token) => token.role).filter(Boolean)),
  ];
  for (const role of REQUIRED_TYPOGRAPHY_ROLES) {
    if (!typographyRoles.includes(role)) errors.push(`Missing typography role: ${role}`);
  }

  const discoveredBreakpointNames = tokens
    .filter((token) => /^layout\.breakpoint\.[^.]+$/.test(token.id))
    .map((token) => token.id.split(".").at(-1));
  const breakpointNames = REQUIRED_BREAKPOINT_NAMES.filter((name) =>
    discoveredBreakpointNames.includes(name),
  );
  if (
    discoveredBreakpointNames.length !== REQUIRED_BREAKPOINT_NAMES.length ||
    REQUIRED_BREAKPOINT_NAMES.some(
      (name) => !discoveredBreakpointNames.includes(name),
    )
  ) {
    errors.push(
      `Breakpoint inventory mismatch: ${discoveredBreakpointNames.join(", ")}.`,
    );
  }

  const motionRoles = [
    ...new Set(
      tokens
        .filter((token) => token.source === "motion.json")
        .map((token) => token.id.split(".")[1]),
    ),
  ];
  for (const role of REQUIRED_MOTION_ROLES) {
    if (!motionRoles.includes(role)) errors.push(`Missing motion role: ${role}`);
  }

  const lightTokens = tokens.filter((token) => /(^|\.)light($|\.)/i.test(token.id));
  if (lightTokens.length > 0) {
    errors.push(`Light-theme tokens are prohibited: ${lightTokens.map(({ id }) => id).join(", ")}`);
  }

  const contrasts = resolvedValues.size ? contrastChecks(resolvedValues) : [];
  for (const check of contrasts) {
    if (!check.passes) {
      errors.push(
        `Contrast failure for ${check.name}: ${check.ratio}:1 < ${check.minimum}:1.`,
      );
    }
  }

  const sourceHash = createHash("sha256")
    .update(
      [...sourceStrings.entries()]
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([source, contents]) => `${source}\n${contents}`)
        .join("\n"),
    )
    .digest("hex");

  const figmaEntries = tokens.map((token) => {
    const collection = getCollection(token, configuration);
    return {
      id: token.id,
      source: token.source,
      type: token.type,
      figmaType: figmaType(token.type),
      value: figmaValue(token, resolvedValues.get(token.id)),
      cssValue: cssValue(token, tokenMap, cssVariables),
      cssVariable: cssVariables.get(token.id),
      collection: collection.name,
      mode: collection.mode,
      scope: configuration.scopeByType[token.type] ?? ["ALL_SCOPES"],
      aliasOf: token.references.length === 1 ? token.references[0] : null,
      description: token.description,
      role: token.role,
      extensions: token.extensions?.switchtoux ?? {},
    };
  });

  const report = {
    schemaVersion: "1.0.0",
    sourceHash,
    status: errors.length === 0 ? "pass" : "fail",
    counts: {
      tokens: tokens.length,
      primitive: tokens.filter(({ source }) => source === "primitives.json").length,
      semantic: tokens.filter(({ source }) => source === "semantic.json").length,
      typography: tokens.filter(({ source }) => source === "typography.json").length,
      motion: tokens.filter(({ source }) => source === "motion.json").length,
      component: tokens.filter(({ source }) => source === "component.json").length,
      cssVariables: cssVariables.size,
      figmaEntries: figmaEntries.length,
    },
    inventories: {
      typographyRoles,
      breakpointNames,
      motionRoles,
    },
    contrastChecks: contrasts,
    errors,
  };

  const figmaMap = {
    schemaVersion: configuration.schemaVersion,
    sourceHash,
    entries: figmaEntries,
  };

  const outputs = new Map([
    [
      "tokens.css",
      errors.length === 0
        ? generateCss(tokens, tokenMap, cssVariables, configuration)
        : "",
    ],
    [
      "tokens.ts",
      errors.length === 0
        ? generateTypeScript(
            tokens,
            resolvedValues,
            cssVariables,
            typographyRoles,
            breakpointNames,
            motionRoles,
          )
        : "",
    ],
    ["figma-map.json", stableJson(figmaMap)],
    ["token-report.json", stableJson(report)],
  ]);

  return {
    configuration,
    tokens,
    tokenMap,
    resolvedValues,
    cssVariables,
    typographyRoles,
    breakpointNames,
    motionRoles,
    figmaMap,
    report,
    outputs,
  };
}
