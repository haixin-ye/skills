import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../../", import.meta.url));
const read = (path) => readFileSync(`${root}${path}`, "utf8");

const stage2 = read("skills/idear/references/stage-2-research.md");
const routing = read("skills/idear/references/scope-routing.md");
const behaviorScenarios = read("tests/idear/behavior-scenarios.md");

const entryScope = stage2.match(/## Entry and scope\r?\n([\s\S]*?)(?=\r?\n## )/)?.[1];
assert.ok(entryScope, "Stage 2 must retain an entry-and-scope contract");

assert.doesNotMatch(
  entryScope,
  /^\s*Start from the latest confirmed product definition and current decision tree\./,
  "product-definition and decision-tree prerequisites must not apply unconditionally across routes",
);
assert.match(
  entryScope,
  /For `full` discovery[\s\S]{0,180}latest confirmed product definition[\s\S]{0,100}current decision tree/i,
  "Full research must retain its confirmed-definition and current-tree prerequisites",
);
assert.match(
  entryScope,
  /For (?:a )?`focused` (?:investigation|research|route)[\s\S]{0,220}(named uncertainty|research question)[\s\S]{0,180}(binding )?constraints[\s\S]{0,180}(feasibility-)?premise ID/i,
  "Focused research must start from its named uncertainty, constraints, and stable premise ID",
);
assert.match(
  entryScope,
  /`focused`[\s\S]{0,280}(does not require|do not require)[\s\S]{0,100}(product definition|decision tree)[\s\S]{0,120}(decision tree|product definition)/i,
  "Focused research must explicitly require neither a product definition nor a decision tree",
);
assert.match(
  entryScope,
  /do not (?:escalate|route)[^\n]{0,100}`full`[^\n]{0,120}(prerequisite|product definition|decision tree|create)/i,
  "Focused research must not escalate merely to satisfy Full prerequisites",
);

assert.match(
  routing,
  /Use `focused` for exactly one named uncertainty[\s\S]{0,320}stable feasibility-premise ID/i,
  "scope routing and Stage 2 must share the focused premise contract",
);
assert.match(
  routing,
  /(?:does not|do not) create a full decision tree/i,
  "scope routing must keep focused research independent of the Full decision tree",
);

assert.match(
  behaviorScenarios,
  /availability of the exact audio-capture API instead of inferring it from the framework's earlier introduction version/i,
  "the focused macOS regression must distinguish exact API availability from framework availability",
);

console.log("Idear cross-route research contract passed.");
