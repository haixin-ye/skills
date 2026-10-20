import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../../", import.meta.url));
const read = (path) => readFileSync(`${root}${path}`, "utf8");

const skill = read("skills/idear/SKILL.md");
const stage2 = read("skills/idear/references/stage-2-research.md");
const competitor = read("skills/idear/assets/templates/competitor-analysis.md");
const behavior = read("tests/idear/behavior-scenarios.md");
const workflow = read(".github/workflows/validate.yml");
const catalog = JSON.parse(read("skills/index.json"));
const english = read("README.md");
const chinese = read("README.zh-CN.md");

const fullStage2 = skill.match(/### Stage 2 — Feasibility Research\r?\n([\s\S]*?)(?=\r?\n### Stage 3)/)?.[1];
assert.ok(fullStage2, "SKILL.md must retain its Stage 2 section");
assert.match(
  fullStage2,
  /03-competitor-analysis\.md[\s\S]{0,220}(only|when|if)[^\n]{0,160}(active )?decision node[^\n]{0,160}(competitor|differentiation)|(?:only|when|if)[^\n]{0,160}(active )?decision node[^\n]{0,160}(competitor|differentiation)[\s\S]{0,220}03-competitor-analysis\.md/i,
  "SKILL.md must make competitor analysis conditional on an active decision node that requires it",
);
assert.doesNotMatch(
  fullStage2,
  /maintain `02-research-dossier\.md`, `03-competitor-analysis\.md`, `04-risk-register\.md`/i,
  "SKILL.md must not present competitor analysis as an unconditional Full Stage 2 artifact",
);

assert.match(
  stage2,
  /create (?:or maintain )?`03-competitor-analysis\.md` only when an active decision node requires (?:competitor|existing-solution|differentiation)[^\n]*(?:evidence|research)/i,
  "Stage 2 must define the conditional competitor-artifact creation gate",
);
assert.match(
  stage2,
  /API-only[^\n]{0,160}(?:must not|do not)[^\n]{0,100}(?:create|maintain)[^\n]{0,80}`03-competitor-analysis\.md`/i,
  "Stage 2 must forbid competitor artifact creation for API-only research without a linked comparison node",
);

const scenario5 = behavior.match(/## Scenario 5:[\s\S]*?(?=\r?\n## Scenario 6:)/)?.[0];
assert.ok(scenario5, "behavior specification must retain Scenario 5");
assert.match(
  scenario5,
  /(?:do not|must not)[^\n]{0,120}(?:create|maintain)[^\n]{0,80}(?:03-competitor-analysis\.md|competitor analysis)[^\n]{0,180}(?:unless|without)[^\n]{0,120}(?:active )?decision node/i,
  "Scenario 5 API-only research must not create competitor analysis without a linked active node",
);

for (const [name, text, pattern] of [
  ["English", english, /03-competitor-analysis\.md[^\n]{0,180}(?:only when|if)[^\n]{0,160}(?:active )?decision node[^\n]{0,140}(?:competitor|differentiation)/i],
  ["Chinese", chinese, /03-competitor-analysis\.md[^\n]{0,180}(?:仅在|只有)[^\n]{0,160}(?:活动|当前)[^\n]{0,80}决策节点[^\n]{0,140}(?:竞品|差异化|现有方案)/i],
]) {
  assert.match(text, pattern, `${name} README must document conditional competitor-analysis generation`);
}

for (const [pattern, label] of [
  [/decision[_ -]node/i, "decision node"],
  [/decision[_ -](?:it[_ -])?can[_ -]change|decision or recommendation it can change/i, "changeable decision or recommendation"],
  [/source[_ -]ids?/i, "source IDs"],
  [/claim[_ -]status/i, "claim status"],
  [/scope\s*\/\s*version|scope[_ -]version/i, "scope/version"],
  [/uncertainty/i, "uncertainty"],
  [/freshness/i, "freshness"],
  [/invalidation[_ -]condition/i, "invalidation condition"],
  [/(?:validation|fallback)[_ -](?:action|poc)|validation\s*\/\s*fallback action/i, "validation or fallback action"],
]) {
  assert.match(competitor, pattern, `competitor comparison rows must carry ${label}`);
}
assert.match(
  competitor,
  /only include|include only|omit[^\n]{0,80}(?:comparison|row)|do not research[^\n]{0,100}irrelevant/i,
  "competitor template must not force irrelevant comparison research",
);

assert.match(workflow, /uses:\s*actions\/setup-node@v4/i, "CI must install a fixed current Node runtime");
assert.match(workflow, /node-version:\s*["']?22["']?/i, "CI must pin Node 22");
assert.match(
  workflow,
  /run:\s*node --test tests\/idear\/\*\.test\.mjs/i,
  "CI must execute the complete Idear Node contract suite",
);

const entry = catalog.skills.find((candidate) => candidate.name === "idear");
assert.ok(entry, "catalog must retain the idear entry");
const feasibilityTriggers = entry.triggers.filter((trigger) => /feasib/i.test(trigger));
assert.deepEqual(
  feasibilityTriggers,
  ["Assess feasibility for a rough software, tool, automation, or AI-product idea before implementation."],
  "feasibility discovery must be limited to rough product ideas before implementation",
);
assert.ok(
  feasibilityTriggers.every((trigger) => /rough software, tool, automation, or AI-product idea/i.test(trigger)),
  "every feasibility trigger must name the rough product-idea context",
);
assert.ok(
  feasibilityTriggers.every((trigger) => /before implementation/i.test(trigger)),
  "every feasibility trigger must name the pre-implementation boundary",
);

assert.match(
  behavior,
  /candidate-path provenance remains independent of the overall selection lifecycle|candidate provenance remains independent of selection lifecycle/i,
  "behavior contract must state the general provenance/lifecycle independence rule",
);
assert.match(
  behavior,
  /(?:in|while)[^\n]{0,40}`?not-selected`?[^\n]{0,180}(?:all|every)[^\n]{0,80}(?:retained )?candidate[^\n]{0,100}`?proposed`?/i,
  "behavior contract must require every retained not-selected candidate to remain proposed",
);

console.log("Idear final-review regression contract passed.");
