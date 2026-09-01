import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { PROJECT_ROOT } from "./design-token-lib.mjs";

const COMPONENT_DIRECTORY = path.join(
  PROJECT_ROOT,
  "src/design-system/components",
);
const SOURCE_EXTENSIONS = new Set([".css", ".ts", ".tsx"]);
const FORBIDDEN_LITERALS = [
  { name: "hex colour", pattern: /#[0-9a-f]{3,8}\b/gi },
  { name: "rgb colour", pattern: /\brgba?\([^)]*\)/gi },
  { name: "hsl colour", pattern: /\bhsla?\([^)]*\)/gi },
  {
    name: "dimension or duration",
    pattern: /(?<![\w.-])-?(?:\d+\.?\d*|\.\d+)(?:px|rem|em|ms)\b/gi,
  },
  { name: "easing curve", pattern: /\bcubic-bezier\([^)]*\)/gi },
];

async function collectFiles(directory) {
  try {
    const entries = await readdir(directory, { withFileTypes: true });
    const files = [];
    for (const entry of entries) {
      const target = path.join(directory, entry.name);
      if (entry.isDirectory()) files.push(...(await collectFiles(target)));
      else if (SOURCE_EXTENSIONS.has(path.extname(entry.name))) files.push(target);
    }
    return files;
  } catch (error) {
    if (error && error.code === "ENOENT") return [];
    throw error;
  }
}

const files = await collectFiles(COMPONENT_DIRECTORY);
const failures = [];

for (const file of files) {
  const contents = await readFile(file, "utf8");
  const lines = contents.split("\n");
  for (const [index, line] of lines.entries()) {
    if (line.includes("token-literal-allow")) continue;
    for (const rule of FORBIDDEN_LITERALS) {
      rule.pattern.lastIndex = 0;
      const matches = [...line.matchAll(rule.pattern)];
      for (const match of matches) {
        failures.push(
          `${path.relative(PROJECT_ROOT, file)}:${index + 1} contains ${rule.name} ${match[0]}.`,
        );
      }
    }
  }
}

if (failures.length > 0) {
  console.error("Direct design literals are prohibited in design-system components:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(
    `Design token usage check passed (${files.length} component source files scanned).`,
  );
}
