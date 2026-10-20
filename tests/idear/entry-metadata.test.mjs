import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../../", import.meta.url));
const read = (path) => readFileSync(`${root}${path}`, "utf8");

const expectedDescription =
  "Use when a rough software, tool, automation, or AI-product idea needs product clarification, feasibility evidence, comparison with existing solutions, or a development handoff before implementation.";

const skill = read("skills/idear/SKILL.md");
const catalog = JSON.parse(read("skills/index.json"));
const openai = read("skills/idear/agents/openai.yaml");

const frontmatterMatch = skill.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
assert.ok(frontmatterMatch, "SKILL.md must have YAML frontmatter");
const descriptionMatch = frontmatterMatch[1].match(/^description:\s*(.+)$/m);
assert.ok(descriptionMatch, "SKILL.md frontmatter must have a description");
assert.equal(
  descriptionMatch[1].trim().replace(/^['\"]|['\"]$/g, ""),
  expectedDescription,
  "frontmatter description must be the agreed trigger-only boundary",
);

const entry = catalog.skills.find((candidate) => candidate.name === "idear");
assert.ok(entry, "catalog must retain the idear entry");
assert.equal(entry.path, "skills/idear", "catalog path must remain installable");
assert.equal(entry.bundle_required, true, "catalog must continue installing the full bundle");
assert.equal(entry.description, expectedDescription, "catalog and frontmatter descriptions must agree");

const triggers = entry.triggers.join("\n");
assert.match(triggers, /(rough|clarif).*(idea|product)/i, "catalog must trigger product clarification");
assert.match(triggers, /feasib|API|permission|technolog/i, "catalog must trigger feasibility work");
assert.match(triggers, /compar|existing|already built|competitor/i, "catalog must trigger solution comparison");
assert.match(triggers, /handoff|later development|before (coding|implementation)/i, "catalog must trigger pre-build handoff work");

const shortDescription = openai.match(/^\s*short_description:\s*"([^"]+)"/m)?.[1];
assert.ok(shortDescription, "openai.yaml must keep a quoted short_description");
assert.ok(
  shortDescription.length >= 25 && shortDescription.length <= 64,
  "openai short_description must remain between 25 and 64 characters",
);
assert.match(shortDescription, /(clarif|assess|research).*(idea|product)|(idea|product).*(before|feasib)/i);
assert.match(openai, /^\s*default_prompt:\s*"[^"]*\$idear[^"]*"/m, "default prompt must invoke $idear");
assert.match(
  openai,
  /^policy:\r?\n\s+allow_implicit_invocation:\s*true\s*$/m,
  "automatic skill discovery must stay explicitly enabled",
);

const body = skill.slice(frontmatterMatch[0].length);
const bodyWordCount = body.split(/\s+/).filter(Boolean).length;
assert.ok(bodyWordCount <= 1000, `SKILL.md body must stay concise; found ${bodyWordCount} words`);

for (const [pattern, label] of [
  [/direct implementation/i, "direct implementation exclusion"],
  [/ordinary (code )?(review|debugging)|ordinary code review and debugging/i, "ordinary review/debugging exclusion"],
  [/unrelated brainstorming/i, "unrelated brainstorming exclusion"],
  [/bounded factual question/i, "bounded factual-question exclusion"],
  [/do not (begin|write|generate|perform)[^\n]{0,80}(implementation|code)|does not authorize implementation/i, "no-code boundary"],
  [/project-context\.yaml[^\n]{0,120}authoritative/i, "authoritative context rule"],
  [/latest[^\n]{0,80}summary[^\n]{0,80}(approve|confirm)|approve[^\n]{0,80}latest[^\n]{0,80}summary/i, "Stage 1 latest-summary gate"],
  [/Stage 2[\s\S]{0,220}(confirmed|approval)|confirmed[\s\S]{0,220}Stage 2/i, "Stage 2 entry gate"],
  [/Stage 3[\s\S]{0,260}(user|asks|elects|request)/i, "Stage 3 user-controlled gate"],
]) {
  assert.match(body, pattern, `SKILL.md must retain the ${label}`);
}

for (const reference of [
  "references/scope-routing.md",
  "references/decision-tree.md",
  "references/stage-1-clarification.md",
  "references/stage-2-research.md",
  "references/evidence-standards.md",
  "references/report-design.md",
  "references/stage-3-handoff.md",
]) {
  assert.match(body, new RegExp(reference.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `SKILL.md must route to ${reference}`);
}

console.log("Idear entrypoint and metadata contract passed.");
