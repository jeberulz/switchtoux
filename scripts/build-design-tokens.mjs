import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  buildTokenArtifacts,
  GENERATED_DIRECTORY,
} from "./design-token-lib.mjs";

const checkOnly = process.argv.includes("--check");
const result = await buildTokenArtifacts();

if (result.report.errors.length > 0) {
  for (const error of result.report.errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else if (checkOnly) {
  const stale = [];
  for (const [filename, expected] of result.outputs) {
    try {
      const actual = await readFile(
        path.join(GENERATED_DIRECTORY, filename),
        "utf8",
      );
      if (actual !== expected) stale.push(filename);
    } catch {
      stale.push(filename);
    }
  }

  if (stale.length > 0) {
    console.error(`Generated token files are stale: ${stale.join(", ")}`);
    process.exitCode = 1;
  } else {
    console.log(
      `Token outputs are current (${result.report.counts.tokens} tokens, ${result.report.sourceHash.slice(0, 12)}).`,
    );
  }
} else {
  await mkdir(GENERATED_DIRECTORY, { recursive: true });
  for (const [filename, contents] of result.outputs) {
    await writeFile(path.join(GENERATED_DIRECTORY, filename), contents, "utf8");
  }
  console.log(
    `Generated ${result.outputs.size} token artifacts from ${result.report.counts.tokens} tokens.`,
  );
}
