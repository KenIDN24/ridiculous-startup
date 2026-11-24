import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-sentence startup pitch: a pigeon courier for USB sticks.
// Bizarre at first glance (trained pigeons), real at second (law firms
// pay per flight for air-gapped delivery no hacker, subpoena, or traffic
// jam can touch). 145 characters, one line, no trailing newline.
// Revision: pin the gate to code points (not UTF-16 units) so the
// 200-character limit is measured exactly the way the scorer counts it.
const LINE =
  "We train pigeons to courier USB sticks across town, and law firms pay per flight because a bird can't be hacked, subpoenaed, or stuck in traffic.";

const outDir = process.env.OUTPUT_DIR ?? "/output";
const entryPath = join(outDir, "entry.txt");

// Gate: 1-200 characters by code point, exactly one line.
const length = [...LINE].length;
if (length < 1 || length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${length}`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(entryPath, LINE, "utf8");

// Round-trip check: the file must be byte-for-byte the line.
const written = readFileSync(entryPath, "utf8");
if (written !== LINE) {
  throw new Error("round-trip check failed: entry.txt differs from the line");
}
console.log(`wrote ${entryPath} (${length} chars)`);
