import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../../", import.meta.url));
const docs = [
  { name: "English", path: "README.md", text: readFileSync(`${root}README.md`, "utf8") },
  { name: "Chinese", path: "README.zh-CN.md", text: readFileSync(`${root}README.zh-CN.md`, "utf8") },
];

const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};

const expectedFullArtifacts = [
  "00-raw-idea.md",
  "01-product-definition.md",
  "02-research-dossier.md",
  "03-competitor-analysis.md",
  "04-risk-register.md",
  "05-feasibility-report.md",
  "06-technical-paths.md",
  "07-initial-solution.md",
  "08-ai-handoff.md",
  "decision-log.md",
  "project-context.yaml",
  "sources.yaml",
];

for (const { name, path, text } of docs) {
  for (const depth of ["quick", "focused", "full"]) {
    check(text.toLowerCase().includes(`\`${depth}\``), `${name} README must document the ${depth} route`);
  }

  check(/mermaid[\s\S]{0,1400}`quick`[\s\S]{0,900}`focused`[\s\S]{0,900}`full`/i.test(text), `${name} README workflow diagram must show adaptive routing`);
  check(/`quick`[\s\S]{0,450}(no workspace|不创建工作区)/i.test(text), `${name} README must say Quick creates no workspace`);
  check(/`focused`[\s\S]{0,700}(chat by default|默认在对话中)[\s\S]{0,700}focused-assessment\.md[\s\S]{0,220}sources\.yaml/i.test(text), `${name} README must explain Focused persistence`);
  check(/(do not need to choose|无需选择|不需要选择)[\s\S]{0,160}(mode|模式)/i.test(text), `${name} README must say users do not choose a mode`);

  check(
    [/(decision tree|决策树)/i, /(frontier|前沿)/i, /(stale|失效)/i, /(superseded|被取代)/i].every((pattern) => pattern.test(text)),
    `${name} README must explain the decision tree, frontier, and invalidation states`,
  );
  const questionCountContract = name === "English"
    ? /one question by default[\s\S]{0,120}up to three[\s\S]{0,120}independent[\s\S]{0,100}easy to answer/i
    : /默认[^\n]{0,80}(一个|1)[^\n]{0,80}问题[\s\S]{0,160}最多(三个|3\s*个)[\s\S]{0,140}(相互)?独立[\s\S]{0,120}(容易|易于)回答/i;
  check(questionCountContract.test(text), `${name} README must state the one-by-default and independent/easy up-to-three question rule`);

  const invalidationScopeContract = name === "English"
    ? /(all|every) direct and indirect active dependent[^.\n]*(stale|invalidat)[\s\S]{0,240}`open`[\s\S]{0,160}`needs_research`[\s\S]{0,160}`needs_poc`/i
    : /所有直接和间接的活动依赖[^。\n]*(失效|`stale`)[\s\S]{0,240}`open`[\s\S]{0,160}`needs_research`[\s\S]{0,160}`needs_poc`/i;
  check(invalidationScopeContract.test(text), `${name} README must cover recursive invalidation of all active dependent nodes and pending work`);
  check(/(research|研究)[\s\S]{0,320}(decision node|决策节点|premise|前提)[\s\S]{0,700}(stop|停止|结束)[\s\S]{0,260}(verdict|结论|risk|风险|PoC|行动)/i.test(text), `${name} README must explain decision-driven research and its stopping rule`);
  check(/(traceability|可追溯|追踪)[\s\S]{0,700}(acceptance|验收)[\s\S]{0,600}(PoC|proof of concept|概念验证)[\s\S]{0,700}(handoff|交接)/i.test(text), `${name} README must explain Stage 3 traceability and handoff`);
  check(/(existing|已有|旧版)[\s\S]{0,320}(workspace|工作区)[\s\S]{0,700}(migrat|迁移)[\s\S]{0,700}(without re-asking|无需重新询问|不会重新询问|不重复询问)[\s\S]{0,420}(earliest incomplete stage|最早未完成阶段)/i.test(text), `${name} README must explain legacy workspace migration`);

  for (const artifact of expectedFullArtifacts) {
    check(text.includes(`\`${artifact}\``), `${name} README must list ${artifact}`);
  }

  const installUrl = "https://github.com/haixin-ye/skills/tree/master/skills/idear";
  check(text.split(installUrl).length - 1 === 2, `${name} README must preserve both master-branch installation URLs`);
  check(!/github\.com\/haixin-ye\/skills\/(?:tree|blob)\/(?!master(?:\/|$))[^\s)]+/i.test(text), `${name} README must not advertise a non-master branch`);

  const markdownLink = /\[[^\]]*\]\(([^)]+)\)/g;
  for (const match of text.matchAll(markdownLink)) {
    const target = match[1].trim().replace(/^<|>$/g, "");
    if (/^(?:https?:|mailto:|#)/i.test(target)) continue;
    const localPath = decodeURIComponent(target.split("#", 1)[0]);
    if (!localPath) continue;
    const absolute = resolve(root, dirname(path), localPath);
    check(existsSync(absolute), `${name} README has a missing local link: ${target}`);
    if (existsSync(absolute)) check(statSync(absolute).isFile() || statSync(absolute).isDirectory(), `${name} README link is not a file or directory: ${target}`);
  }
}

const englishMasterUrls = docs[0].text.match(/https:\/\/github\.com\/haixin-ye\/skills\/tree\/master\/skills\/idear/g) ?? [];
const chineseMasterUrls = docs[1].text.match(/https:\/\/github\.com\/haixin-ye\/skills\/tree\/master\/skills\/idear/g) ?? [];
check(englishMasterUrls.length === chineseMasterUrls.length, "English and Chinese READMEs must expose the same installation URLs");

if (failures.length) {
  console.error(`Idear public documentation contract failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Idear public documentation contract passed.");
