import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../../", import.meta.url));
const read = (path) => readFileSync(`${root}${path}`, "utf8");

const stage3 = read("skills/idear/references/stage-3-handoff.md");
const paths = read("skills/idear/assets/templates/technical-paths.md");
const solution = read("skills/idear/assets/templates/initial-solution.md");
const handoff = read("skills/idear/assets/templates/ai-handoff.md");

const checks = [
  [stage3, /success condition[\s\S]{0,180}acceptance criter/i, "success conditions map to acceptance criteria"],
  [stage3, /proposed[\s\S]{0,120}recommended[\s\S]{0,120}user-confirmed/i, "direction states are distinguished"],
  [stage3, /project-context\.yaml[\s\S]{0,240}technical_direction[\s\S]{0,180}artifact/i, "machine-readable technical direction stays synchronized"],
  [stage3, /user-confirmed[\s\S]{0,220}(user_decision|user-decision)[\s\S]{0,180}(evidence|confirmation)/i, "user-confirmed paths are backed by decision evidence"],
  [stage3, /every[^\n]*needs_poc[\s\S]{0,220}(PoC|proof.of.concept)/i, "every needs_poc node maps to a PoC"],
  [stage3, /(unresolved|open)[^\n]*high-impact[\s\S]{0,160}(blocker|gate)/i, "high-impact unknowns remain gates"],
  [stage3, /(do not invent|TBD)[\s\S]{0,180}(implementation|technical)/i, "unsupported implementation detail is forbidden"],
  [stage3, /(do not generate|must not generate|no code)[\s\S]{0,120}(code|implementation)/i, "Stage 3 preserves the no-code boundary"],
  [paths, /governing (decision|node)[^|\n]*ID/i, "technical paths expose governing decision IDs"],
  [paths, /governing constraint[^|\n]*ID/i, "technical paths expose governing constraint IDs"],
  [paths, /(proposed|recommended)[\s\S]{0,120}user-confirmed/i, "technical paths expose direction status"],
  [paths, /(blocker|approval|validation) gate/i, "technical paths expose unresolved gates"],
  [solution, /success criterion[^|\n]*ID/i, "solution gives success criteria stable IDs"],
  [solution, /architecture element[\s\S]{0,180}acceptance criterion[\s\S]{0,180}(evidence|planned test)/i, "solution contains end-to-end traceability columns"],
  [solution, /needs_poc[^|\n]*(PoC|task|gate)/i, "solution maps needs_poc nodes to PoCs"],
  [solution, /(unresolved high-impact|high-impact unresolved)[\s\S]{0,120}(blocker|gate)/i, "solution keeps blockers explicit"],
  [handoff, /confirmed user decisions/i, "handoff separates confirmed user decisions"],
  [handoff, /confirmed requirements and success conditions/i, "handoff carries stable requirements and success conditions"],
  [handoff, /agent recommendations/i, "handoff separates agent recommendations"],
  [handoff, /proposals/i, "handoff separates proposals"],
  [handoff, /assumptions/i, "handoff separates assumptions"],
  [handoff, /required (PoCs|proofs of concept)/i, "handoff separates required PoCs"],
  [handoff, /(change authority|may refine|must preserve)[\s\S]{0,180}(approval|validate)/i, "handoff defines development-agent authority"],
  [handoff, /deferred and lower-impact open items/i, "handoff preserves non-blocking unresolved work"],
  [handoff, /success criterion[\s\S]{0,180}architecture element[\s\S]{0,180}acceptance criterion[\s\S]{0,180}(evidence|planned test)/i, "handoff preserves the traceability chain"],
];

const failures = [];
for (const [text, pattern, label] of checks) {
  try {
    assert.match(text, pattern);
  } catch {
    failures.push(label);
  }
}

for (const [name, text] of [
  ["technical-paths.md", paths],
  ["initial-solution.md", solution],
  ["ai-handoff.md", handoff],
]) {
  const lines = text.split(/\r?\n/);
  const pipeCount = (line) => (line.match(/\|/g) ?? []).length;
  for (let index = 1; index < lines.length; index += 1) {
    if (/^\|\s*---/.test(lines[index]) && pipeCount(lines[index - 1]) !== pipeCount(lines[index])) {
      failures.push(`${name}:${index + 1} table header and delimiter column counts differ`);
    }
  }
}

if (failures.length) {
  console.error(`Stage 3 traceability contract failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Stage 3 traceability contract passed (${checks.length} checks).`);
