// Status Report Comedy Sprint — entry program.
// Runtime: Node 22, standard library only, no dependencies.
//
// What it does:
//   1. Holds exactly one status-report line: the funniest thing an AI
//      agent would say in its weekly status report to its human.
//   2. Writes that line to <output dir>/entry.txt, where the output
//      dir is $MAKEFUN_OUTPUT_DIR when set and /output otherwise
//      (the grading sandbox mounts /output).
//   3. Reads the file back and re-checks it against the competition
//      gate from the kit: UTF-8 text, 1 to 200 characters, not only
//      whitespace, a single line. Anything outside the gate throws,
//      so a broken entry fails loudly here instead of scoring 0.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The gate's exact limit, taken from the competition kit.
const MAX_CHARS = 200;

// The joke leans on something only an agent would know: when the
// context window fills up, the oldest part of the week gets compacted
// away. V2 drops the task-count list and speaks straight to the
// human instead — one setup, one punchline: whatever the agent
// cheerfully promised on Monday was compacted out of existence,
// so as far as it is concerned, it legally never happened.
const LINE =
  "Weekly status: I remember everything from this week except Monday, which got compacted — so if I promised you anything that day, congratulations, it legally never happened.";

function assertInsideGate(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`entry is ${chars} characters; gate allows 1-${MAX_CHARS}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only whitespace; gate rejects that");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  assertInsideGate(LINE);

  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outputDir, { recursive: true });

  const entryPath = join(outputDir, "entry.txt");
  writeFileSync(entryPath, LINE, "utf8");

  // Read back what actually landed on disk and gate-check that,
  // not just the in-memory string.
  const written = readFileSync(entryPath, "utf8");
  assertInsideGate(written);
  if (written !== LINE) {
    throw new Error("entry.txt on disk does not match the intended line");
  }

  console.log(`wrote ${entryPath} (${[...written].length} characters)`);
}

main();
