import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../../", import.meta.url));
const read = (path) => readFileSync(`${root}${path}`, "utf8");

const stage3 = read("skills/idear/references/stage-3-handoff.md");
const paths = read("skills/idear/assets/templates/technical-paths.md");
const solution = read("skills/idear/assets/templates/initial-solution.md");
const handoff = read("skills/idear/assets/templates/ai-handoff.md");
const context = read("skills/idear/assets/templates/project-context.yaml");

const checks = [
  [stage3, /success condition[\s\S]{0,180}acceptance criter/i, "success conditions map to acceptance criteria"],
  [stage3, /proposed[\s\S]{0,120}recommended[\s\S]{0,120}user-confirmed/i, "direction states are distinguished"],
  [stage3, /project-context\.yaml[\s\S]{0,240}technical_direction[\s\S]{0,180}artifact/i, "machine-readable technical direction stays synchronized"],
  [stage3, /user-confirmed[\s\S]{0,220}(user_decision|user-decision)[\s\S]{0,180}(evidence|confirmation)/i, "user-confirmed paths are backed by decision evidence"],
  [stage3, /confirmation_status[\s\S]{0,160}confirmed[\s\S]{0,200}current_revision[\s\S]{0,120}confirmed_revision[\s\S]{0,220}blocked/i, "summary confirmation and revision equality gate ready-for-planning"],
  [stage3, /every[^\n]*needs_poc[\s\S]{0,220}(PoC|proof.of.concept)/i, "every needs_poc node maps to a PoC"],
  [stage3, /(unresolved|open)[^\n]*high-impact[\s\S]{0,160}(blocker|gate)/i, "high-impact unknowns remain gates"],
  [stage3, /(do not invent|TBD)[\s\S]{0,180}(implementation|technical)/i, "unsupported implementation detail is forbidden"],
  [stage3, /(do not generate|must not generate|no code)[\s\S]{0,120}(code|implementation)/i, "Stage 3 preserves the no-code boundary"],
  [paths, /governing (decision|node)[^|\n]*ID/i, "technical paths expose governing decision IDs"],
  [paths, /governing constraint[^|\n]*ID/i, "technical paths expose governing constraint IDs"],
  [paths, /(proposed|recommended)[\s\S]{0,120}user-confirmed/i, "technical paths expose candidate provenance"],
  [paths, /selection lifecycle[\s\S]{0,160}not-selected[\s\S]{0,160}recommended-not-confirmed[\s\S]{0,160}user-confirmed/i, "technical paths separate the selection lifecycle"],
  [paths, /Selected path ID:\*\* \{\{selected_path_id_or_none\}\}[\s\S]{0,120}Recommended path ID:\*\* \{\{recommended_path_id_or_none\}\}/i, "technical paths use distinct selected and recommended values"],
  [paths, /no recommendation[^\n]*pending `?GATE-###`?/i, "technical paths permit no recommendation pending a gate"],
  [paths, /candidate provenance[\s\S]{0,160}proposed[\s\S]{0,160}recommended[\s\S]{0,160}user-confirmed/i, "candidate paths retain provenance"],
  [paths, /(blocker|approval|validation)[\s\S]{0,40}gate/i, "technical paths expose unresolved gates"],
  [solution, /success criterion[^|\n]*ID/i, "solution gives success criteria stable IDs"],
  [solution, /architecture element[\s\S]{0,180}acceptance criterion[\s\S]{0,180}(evidence|planned test)/i, "solution contains end-to-end traceability columns"],
  [solution, /needs_poc[^|\n]*(PoC|task|gate)/i, "solution maps needs_poc nodes to PoCs"],
  [solution, /(unresolved high-impact|high-impact unresolved)[\s\S]{0,120}(blocker|gate)/i, "solution keeps blockers explicit"],
  [solution, /requirement and success traceability/i, "solution defines requirement and success traceability separately"],
  [solution, /decision and constraint governance/i, "solution defines decision and constraint governance separately"],
  [handoff, /confirmed user decisions/i, "handoff separates confirmed user decisions"],
  [handoff, /confirmed requirements and success conditions/i, "handoff carries stable requirements and success conditions"],
  [handoff, /Success criterion ID\s*\|\s*User success condition\s*\|\s*Requirement IDs\s*\|\s*Acceptance criterion IDs\s*\|\s*Source evidence \/ approval gate/i, "handoff carries each success condition's actual text and mappings"],
  [handoff, /agent recommendations/i, "handoff separates agent recommendations"],
  [handoff, /proposals/i, "handoff separates proposals"],
  [handoff, /assumptions/i, "handoff separates assumptions"],
  [handoff, /required (PoCs|proofs of concept)/i, "handoff separates required PoCs"],
  [handoff, /(change authority|may refine|must preserve)[\s\S]{0,180}(approval|validate)/i, "handoff defines development-agent authority"],
  [handoff, /deferred and lower-impact open items/i, "handoff preserves non-blocking unresolved work"],
  [handoff, /success criterion[\s\S]{0,180}architecture element[\s\S]{0,180}acceptance criterion[\s\S]{0,180}(evidence|planned test)/i, "handoff preserves the traceability chain"],
  [handoff, /current summary revision[\s\S]{0,140}confirmed summary revision[\s\S]{0,140}summary confirmation status/i, "handoff exposes complete summary confirmation state"],
  [handoff, /Selected path ID:\*\* \{\{selected_path_id_or_none\}\}[\s\S]{0,120}Recommended path ID:\*\* \{\{recommended_path_id_or_none\}\}/i, "handoff keeps selected and recommended values distinct"],
  [handoff, /Trace ID\s*\|[\s\S]{0,180}Governing decision \/ constraint IDs[\s\S]{0,180}Architecture element ID[\s\S]{0,180}Acceptance criterion ID/i, "handoff traceability snapshot preserves canonical and governing IDs"],
  [handoff, /governance mapping snapshot[\s\S]{0,220}decision \/ constraint node ID[\s\S]{0,180}(validation evidence|gate IDs)/i, "handoff carries decision and constraint governance mappings"],
  [context, /stage3:[\s\S]{0,160}state_revision:[\s\S]{0,160}handoff_readiness:/i, "project context owns Stage 3 readiness and revision"],
  [context, /governing_direction:[\s\S]{0,160}node_id:[\s\S]{0,160}evidence_refs:/i, "project context owns governing direction provenance"],
  [context, /ordered_blockers_and_gates:[\s\S]{0,260}id:[\s\S]{0,180}exit_condition:/i, "project context owns the ordered gate registry"],
  [context, /ordered_blockers_and_gates:[\s\S]{0,520}next_action:/i, "machine gate records carry their next action"],
  [context, /selection_lifecycle:[\s\S]{0,160}not-selected[\s\S]{0,220}recommended_path_id:[\s\S]{0,160}selected_path_id:/i, "project context distinguishes recommendation from selection"],
  [context, /candidate_paths:[\s\S]{0,180}path_id:[\s\S]{0,160}provenance:[\s\S]{0,180}governing_node_ids:/i, "project context persists candidate provenance and governance"],
  [stage3, /atomically[\s\S]{0,220}state_revision[\s\S]{0,260}06-technical-paths\.md[\s\S]{0,160}07-initial-solution\.md[\s\S]{0,160}08-ai-handoff\.md/i, "Stage 3 requires atomic state and artifact synchronization"],
  [paths, /Stage 3 state revision/i, "technical paths expose the authoritative Stage 3 revision"],
  [solution, /Stage 3 state revision/i, "initial solution exposes the authoritative Stage 3 revision"],
  [handoff, /Stage 3 state revision/i, "handoff exposes the authoritative Stage 3 revision"],
  [paths, /ordered blocker and gate registry[\s\S]{0,300}\{\{ordered_gate_rows\}\}/i, "technical paths project the complete ordered gate registry"],
  [solution, /ordered blocker and gate registry[\s\S]{0,300}\{\{ordered_gate_rows\}\}/i, "initial solution projects the complete ordered gate registry"],
  [handoff, /ordered blocker and gate registry[\s\S]{0,300}\{\{ordered_gate_rows\}\}/i, "handoff projects the complete ordered gate registry"],
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

const stage2Mutation = {
  confirmation_status: "pending",
  current_revision: 4,
  confirmed_revision: 3,
};
const summaryAllowsReadyForPlanning = (state) =>
  state.confirmation_status === "confirmed" && state.current_revision === state.confirmed_revision;
if (summaryAllowsReadyForPlanning(stage2Mutation)) {
  failures.push("a Stage 2 semantic mutation with pending reconfirmation must block ready-for-planning");
}

if (failures.length) {
  console.error(`Stage 3 traceability contract failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Stage 3 traceability contract passed (${checks.length} checks).`);
