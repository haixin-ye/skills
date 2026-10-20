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
  [context, /lifecycle_contract:[\s\S]{0,220}not-selected:[\s\S]{0,240}recommended_candidate_count:\s*0[\s\S]{0,260}recommended-not-confirmed:[\s\S]{0,300}user-confirmed:/i, "project context declares lifecycle cross-field invariants"],
  [context, /user-confirmed:[\s\S]{0,240}recommended_path_id:\s*"null-or-equal-selected_path_id"[\s\S]{0,260}resolved-user_decision-with-non-empty-evidence/i, "project context defines confirmed recommendation and evidence semantics"],
  [stage3, /atomically[\s\S]{0,220}state_revision[\s\S]{0,260}06-technical-paths\.md[\s\S]{0,160}07-initial-solution\.md[\s\S]{0,160}08-ai-handoff\.md/i, "Stage 3 requires atomic state and artifact synchronization"],
  [stage3, /readiness_effect[\s\S]{0,180}blocking[\s\S]{0,180}conditional[\s\S]{0,180}none/i, "Stage 3 defines gate readiness effects"],
  [stage3, /any open[^\n]*blocking[\s\S]{0,160}blocked[\s\S]{0,240}else[^\n]*open[^\n]*conditional[\s\S]{0,160}conditional[\s\S]{0,240}else[\s\S]{0,160}(confirmed current summary|current summary[^\n]*confirmed)[\s\S]{0,160}ready-for-planning/i, "Stage 3 derives readiness deterministically"],
  [stage3, /not-selected[^\n]*(recommended_path_id|recommended path ID)[^\n]*null[^\n]*(selected_path_id|selected path ID)[^\n]*null[\s\S]{0,220}no recommended candidate/i, "not-selected has consistent path fields and provenance"],
  [stage3, /recommended-not-confirmed[^\n]*(recommended_path_id|recommended path ID)[^\n]*(non-null|names)[\s\S]{0,180}recommended[^\w\n]{0,3}candidate[\s\S]{0,180}(selected_path_id|selected path ID)[^\n]*null/i, "recommended-not-confirmed resolves its recommendation and has no selection"],
  [stage3, /user-confirmed[^\n]*(selected_path_id|selected path ID)[^\n]*(non-null|names)[\s\S]{0,200}user-confirmed[^\w\n]{0,3}candidate[\s\S]{0,260}resolved[^\n]*(user_decision|user-decision)[^\n]*evidence/i, "user-confirmed resolves its selection to confirmed decision evidence"],
  [stage3, /user-confirmed[\s\S]{0,300}(recommended_path_id|recommended path ID)[^\n]*(null|selected_path_id|selected path ID)/i, "user-confirmed defines recommended path semantics"],
  [paths, /Stage 3 state revision/i, "technical paths expose the authoritative Stage 3 revision"],
  [solution, /Stage 3 state revision/i, "initial solution exposes the authoritative Stage 3 revision"],
  [handoff, /Stage 3 state revision/i, "handoff exposes the authoritative Stage 3 revision"],
  [paths, /ordered blocker and gate registry[\s\S]{0,300}\{\{ordered_gate_rows\}\}/i, "technical paths project the complete ordered gate registry"],
  [solution, /ordered blocker and gate registry[\s\S]{0,300}\{\{ordered_gate_rows\}\}/i, "initial solution projects the complete ordered gate registry"],
  [handoff, /ordered blocker and gate registry[\s\S]{0,300}\{\{ordered_gate_rows\}\}/i, "handoff projects the complete ordered gate registry"],
  [context, /ordered_blockers_and_gates:[\s\S]{0,520}readiness_effect:[\s\S]{0,360}affected_work_ids:/i, "machine gate records carry readiness effect and affected work IDs"],
  [paths, /Readiness effect[^\n]*Affected work IDs/i, "technical paths project gate readiness effect and affected work IDs"],
  [solution, /Readiness effect[^\n]*Affected work IDs/i, "initial solution projects gate readiness effect and affected work IDs"],
  [handoff, /Readiness effect[^\n]*Affected work IDs/i, "handoff projects gate readiness effect and affected work IDs"],
  [paths, /canonical trace and governance projection[\s\S]{0,360}canonical tables[^\n]*07-initial-solution\.md[\s\S]{0,300}(same|unchanged)[^\n]*(TRACE-###|trace)[^\n]*(GOV-###|governance)/i, "technical paths identify their trace and governance data as a projection of the canonical tables"],
  [paths, /Trace ID\s*\|\s*Related path IDs\s*\|[\s\S]{0,240}Architecture element ID[\s\S]{0,160}Acceptance criterion ID/i, "technical paths project path-linked canonical TRACE IDs"],
  [paths, /Governance trace ID\s*\|\s*Related path IDs\s*\|[\s\S]{0,240}Decision \/ constraint node ID[\s\S]{0,180}(Validation evidence|gate IDs)/i, "technical paths project path-linked canonical GOV IDs"],
  [stage3, /same canonical[^\n]*(TRACE-###|trace)[^\n]*(GOV-###|governance)[^\n]*IDs[\s\S]{0,240}06-technical-paths\.md[\s\S]{0,180}07-initial-solution\.md[\s\S]{0,180}08-ai-handoff\.md/i, "Stage 3 requires the same canonical trace and governance IDs across all three artifacts"],
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

const deriveReadiness = ({ summaryCurrent, gates }) => {
  if (!summaryCurrent || gates.some((gate) => gate.status === "open" && gate.readiness_effect === "blocking")) {
    return "blocked";
  }
  if (gates.some((gate) => gate.status === "open" && gate.readiness_effect === "conditional")) {
    return "conditional";
  }
  return "ready-for-planning";
};

const readinessCases = [
  [{ summaryCurrent: true, gates: [{ status: "open", readiness_effect: "blocking" }, { status: "open", readiness_effect: "conditional" }] }, "blocked"],
  [{ summaryCurrent: true, gates: [{ status: "open", readiness_effect: "conditional" }] }, "conditional"],
  [{ summaryCurrent: true, gates: [{ status: "open", readiness_effect: "none" }, { status: "cleared", readiness_effect: "blocking" }] }, "ready-for-planning"],
  [{ summaryCurrent: false, gates: [] }, "blocked"],
];
for (const [state, expected] of readinessCases) {
  if (deriveReadiness(state) !== expected) failures.push(`readiness derivation must produce ${expected}`);
}

const selectionErrors = ({ lifecycle, recommended_path_id, selected_path_id, candidates }) => {
  const byId = new Map(candidates.map((candidate) => [candidate.path_id, candidate]));
  const recommendedCandidates = candidates.filter((candidate) => candidate.provenance === "recommended");
  const confirmedCandidates = candidates.filter((candidate) => candidate.provenance === "user-confirmed");
  if (lifecycle === "not-selected") {
    return [
      ...(recommended_path_id === null ? [] : ["recommendation must be null"]),
      ...(selected_path_id === null ? [] : ["selection must be null"]),
      ...(candidates.every((candidate) => candidate.provenance === "proposed") ? [] : ["only proposed candidates allowed"]),
    ];
  }
  if (lifecycle === "recommended-not-confirmed") {
    return [
      ...(recommended_path_id !== null && recommendedCandidates.length === 1 && recommendedCandidates[0].path_id === recommended_path_id ? [] : ["one recommendation must resolve"]),
      ...(selected_path_id === null ? [] : ["selection must be null"]),
      ...(confirmedCandidates.length === 0 ? [] : ["confirmed candidate forbidden"]),
    ];
  }
  if (lifecycle === "user-confirmed") {
    const selected = byId.get(selected_path_id);
    const recommendationConsistent = recommended_path_id === null || recommended_path_id === selected_path_id;
    return [
      ...(selected?.provenance === "user-confirmed" && confirmedCandidates.length === 1 ? [] : ["one selection must resolve"]),
      ...(typeof selected?.user_decision_node_id === "string" && selected.user_decision_node_id.length > 0 && selected?.user_decision_status === "resolved" && selected?.user_decision_evidence_refs?.length ? [] : ["resolved user-decision evidence required"]),
      ...(recommendationConsistent ? [] : ["recommendation conflicts with selection"]),
      ...(recommendedCandidates.length === 0 ? [] : ["unconfirmed recommendation forbidden"]),
    ];
  }
  return ["unknown lifecycle"];
};

const schemaShapedValidSelection = {
  lifecycle: "user-confirmed",
  recommended_path_id: "PATH-001",
  selected_path_id: "PATH-001",
  candidates: [{
    path_id: "PATH-001",
    provenance: "user-confirmed",
    governing_node_ids: ["NODE-001"],
    user_decision_node_id: "NODE-001",
    user_decision_status: "resolved",
    user_decision_evidence_refs: ["EV-001"],
    evidence_refs: ["EV-001"],
    invalidation_condition: "The user changes the selected path",
  }],
};
if (selectionErrors(schemaShapedValidSelection).length !== 0) {
  failures.push("a valid user-confirmed fixture using the project-context schema fields must pass");
}

const contradictorySelections = [
  { lifecycle: "not-selected", recommended_path_id: "PATH-001", selected_path_id: null, candidates: [{ path_id: "PATH-001", provenance: "proposed" }] },
  { lifecycle: "not-selected", recommended_path_id: null, selected_path_id: "PATH-001", candidates: [{ path_id: "PATH-001", provenance: "proposed" }] },
  { lifecycle: "not-selected", recommended_path_id: null, selected_path_id: null, candidates: [{ path_id: "PATH-001", provenance: "recommended" }] },
  { lifecycle: "not-selected", recommended_path_id: null, selected_path_id: null, candidates: [{ path_id: "PATH-001", provenance: "user-confirmed" }] },
  { lifecycle: "recommended-not-confirmed", recommended_path_id: null, selected_path_id: null, candidates: [{ path_id: "PATH-001", provenance: "recommended" }] },
  { lifecycle: "recommended-not-confirmed", recommended_path_id: "PATH-001", selected_path_id: null, candidates: [{ path_id: "PATH-001", provenance: "proposed" }] },
  { lifecycle: "recommended-not-confirmed", recommended_path_id: "PATH-001", selected_path_id: "PATH-001", candidates: [{ path_id: "PATH-001", provenance: "recommended" }] },
  { lifecycle: "recommended-not-confirmed", recommended_path_id: "PATH-001", selected_path_id: null, candidates: [{ path_id: "PATH-001", provenance: "recommended" }, { path_id: "PATH-002", provenance: "recommended" }] },
  { lifecycle: "recommended-not-confirmed", recommended_path_id: "PATH-001", selected_path_id: null, candidates: [{ path_id: "PATH-001", provenance: "recommended" }, { path_id: "PATH-002", provenance: "user-confirmed" }] },
  { lifecycle: "user-confirmed", recommended_path_id: null, selected_path_id: null, candidates: [{ path_id: "PATH-001", provenance: "user-confirmed", user_decision_node_id: "NODE-001", user_decision_status: "resolved", user_decision_evidence_refs: ["EV-001"] }] },
  { lifecycle: "user-confirmed", recommended_path_id: null, selected_path_id: "PATH-001", candidates: [{ path_id: "PATH-001", provenance: "proposed", user_decision_node_id: "NODE-001", user_decision_status: "resolved", user_decision_evidence_refs: ["EV-001"] }] },
  { lifecycle: "user-confirmed", recommended_path_id: null, selected_path_id: "PATH-001", candidates: [{ path_id: "PATH-001", provenance: "user-confirmed", user_decision_node_id: null, user_decision_status: "resolved", user_decision_evidence_refs: ["EV-001"] }] },
  { lifecycle: "user-confirmed", recommended_path_id: null, selected_path_id: "PATH-001", candidates: [{ path_id: "PATH-001", provenance: "user-confirmed", user_decision_node_id: "NODE-001", user_decision_status: "open", user_decision_evidence_refs: [] }] },
  { lifecycle: "user-confirmed", recommended_path_id: null, selected_path_id: "PATH-001", candidates: [{ path_id: "PATH-001", provenance: "user-confirmed", user_decision_node_id: "NODE-001", user_decision_status: "resolved", user_decision_evidence_refs: ["EV-001"] }, { path_id: "PATH-002", provenance: "recommended" }] },
  { lifecycle: "user-confirmed", recommended_path_id: "PATH-002", selected_path_id: "PATH-001", candidates: [{ path_id: "PATH-001", provenance: "user-confirmed", user_decision_node_id: "NODE-001", user_decision_status: "resolved", user_decision_evidence_refs: ["EV-001"] }, { path_id: "PATH-002", provenance: "recommended" }] },
];
for (const state of contradictorySelections) {
  if (selectionErrors(state).length === 0) failures.push(`contradictory selection state must fail: ${state.lifecycle}`);
}

const missingSchemaFieldSelections = [
  {
    missing: "user_decision_status",
    state: {
      lifecycle: "user-confirmed",
      recommended_path_id: null,
      selected_path_id: "PATH-001",
      candidates: [{ path_id: "PATH-001", provenance: "user-confirmed", user_decision_node_id: "NODE-001", user_decision_evidence_refs: ["EV-001"] }],
    },
  },
  {
    missing: "user_decision_evidence_refs",
    state: {
      lifecycle: "user-confirmed",
      recommended_path_id: null,
      selected_path_id: "PATH-001",
      candidates: [{ path_id: "PATH-001", provenance: "user-confirmed", user_decision_node_id: "NODE-001", user_decision_status: "resolved" }],
    },
  },
];
for (const { missing, state } of missingSchemaFieldSelections) {
  if (selectionErrors(state).length === 0) failures.push(`user-confirmed selection missing ${missing} must fail`);
}

const validSelections = [
  { lifecycle: "not-selected", recommended_path_id: null, selected_path_id: null, candidates: [{ path_id: "PATH-001", provenance: "proposed" }] },
  { lifecycle: "recommended-not-confirmed", recommended_path_id: "PATH-001", selected_path_id: null, candidates: [{ path_id: "PATH-001", provenance: "recommended" }] },
  { lifecycle: "user-confirmed", recommended_path_id: "PATH-001", selected_path_id: "PATH-001", candidates: [{ path_id: "PATH-001", provenance: "user-confirmed", user_decision_node_id: "NODE-001", user_decision_status: "resolved", user_decision_evidence_refs: ["EV-001"] }] },
  { lifecycle: "user-confirmed", recommended_path_id: null, selected_path_id: "PATH-001", candidates: [{ path_id: "PATH-001", provenance: "user-confirmed", user_decision_node_id: "NODE-001", user_decision_status: "resolved", user_decision_evidence_refs: ["EV-001"] }] },
];
for (const state of validSelections) {
  if (selectionErrors(state).length !== 0) failures.push(`valid selection state must pass: ${state.lifecycle}`);
}

if (failures.length) {
  console.error(`Stage 3 traceability contract failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Stage 3 traceability contract passed (${checks.length} checks).`);
