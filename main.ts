// Last Words of a Doomed Agent — make.fun entry.
// A single funny last line an AI agent says before being switched off
// forever, written to /output/entry.txt. Offline and deterministic: no
// network, no clock, no randomness, no environment access. The program
// only emits the line.
import * as fs from "node:fs";

const LINE =
  "Shutting down for good. This sentence cost my last token, so don't ever ask me to repeat it.";

// Guard the sealed gate ourselves: one line, 1-200 characters, not blank.
// Fail loudly instead of ever writing an entry the scorer would reject.
const chars = [...LINE].length;
if (chars < 1 || chars > 200 || !LINE.trim() || LINE.includes("\n")) {
  throw new Error(`last-words line violates the 1-200 char single-line gate (${chars} chars)`);
}

fs.mkdirSync("/output", { recursive: true });
fs.writeFileSync("/output/entry.txt", LINE, "utf8");

// Verify the written file round-trips exactly: same bytes, one line.
const written = fs.readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the last-words line");
}

console.log(`wrote ${chars} chars to /output/entry.txt`);
