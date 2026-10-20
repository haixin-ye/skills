# 💡 Idear - Evidence-Driven Product Discovery for AI Agents

[![Agent Skills](https://img.shields.io/badge/Agent%20Skills-compatible-087A6B?style=flat-square)](https://agentskills.io)
[![Workflow](https://img.shields.io/badge/Workflow-Adaptive%20Product%20Discovery-7A5AF8?style=flat-square)](skills/idear/SKILL.md)
[![Evidence](https://img.shields.io/badge/Research-Evidence--First-1F6FEB?style=flat-square)](skills/idear/SKILL.md)
[![License](https://img.shields.io/badge/License-Apache--2.0-586069?style=flat-square)](LICENSE)

**English** | [简体中文](README.zh-CN.md)

---

## 💡 Know What Is Worth Building

> "Before an agent writes its first line of code, it should know what is worth building."

Ideas rarely fail because nobody can write the code. They fail because important questions were not settled early: whether the platform permits the required capability, whether an API exists, whether privacy or licensing rules block the design, and whether an existing solution already closes the supposed gap.

Idear is an adaptive, evidence-first product-discovery Skill. It can answer one bounded question, investigate one technical uncertainty, or turn a rough idea into a confirmed product definition, feasibility verdict, and development handoff. It does not replace product judgment or authorize implementation; it makes decisions explicit, sourced, and reusable.

## 🚀 Try Idear in 60 Seconds

Give this repository path to a Skill-compatible agent:

```text
Install the complete Idear Skill from:
https://github.com/haixin-ye/skills/tree/master/skills/idear

Then use $idear to assess this idea before implementation:
<describe your idea here>
```

You do not need to choose a mode. Describe the outcome you need, and Idear infers the shallowest depth that can answer reliably. You can still ask for a narrower answer, a persistent assessment, or a complete handoff.

## 🧭 Adaptive Depth

| Internal route | Best fit | What happens | Files by default |
| --- | --- | --- | --- |
| `quick` | One bounded, low-risk factual question | Idear answers inline with material conditions and current evidence. | None; no workspace is created. |
| `focused` | Exactly one named uncertainty, including one permission or hard constraint that can be checked independently | Idear researches only that uncertainty, returns a verdict, sources, and the smallest useful validation in chat by default. | None. When persistence is useful or requested, only `focused-assessment.md` and `sources.yaml`. |
| `full` | A rough product idea, coupled decisions, system-level hard constraints that must be reconciled across the product, or a durable development handoff | Idear runs gated clarification, feasibility research, and—only when requested—technical-path preparation. | A staged workspace whose files are created only when needed. |

A single independently verifiable permission or hard constraint remains `focused`. Hard system constraints that must be reconciled across the product or require coupled trade-offs belong to `full`.

Idear never silently expands a `quick` or `focused` request into `full`. If broader discovery becomes necessary, it finishes the safe bounded part, explains what remains unresolved, and offers the additional scope for approval.

```mermaid
flowchart TD
    A["Your question or rough idea"] --> B{"Smallest sufficient depth"}
    B --> Q["`quick`: answer a bounded fact"]
    B --> F["`focused`: investigate one uncertainty"]
    B --> U["`full`: clarify the product"]
    U --> T["Persist the decision tree and frontier"]
    T --> R["Research only verdict-changing evidence"]
    R --> V["Give a feasibility verdict"]
    V --> H{"User requests a technical direction?"}
    H -->|Yes| D["Traceable development handoff"]
    H -->|No| E["Stop after the verdict"]
```

## 🔍 How Full Discovery Works

### 1. Clarify through a decision tree

Full discovery stores a dependency-aware decision tree in `project-context.yaml`. Its frontier contains the highest-value open questions whose prerequisites are already settled. The agent asks one question by default and asks up to three only when they are independent, have settled prerequisites, are easy to answer, and require no research or PoC. The user owns goals and value choices, the agent researches facts, and environment-dependent claims become PoCs.

When an upstream answer changes, Idear preserves history: a replaced user decision or constraint becomes `superseded`, while a replaced fact, assumption, or experiment becomes `stale`. Idear recursively marks all direct and indirect active dependent nodes and queued work `stale`, including nodes currently `open`, `resolved`, `assumed`, `needs_research`, or `needs_poc`. Still-material pending work receives new replacement nodes; affected artifacts are named, the frontier is recalculated, and a changed product summary must be confirmed again before later stages rely on it.

### 2. Research decisions, not topics

Every material research item links to an active decision node or a focused premise and states what decision it can change, what evidence is sufficient, and what fallback PoC can settle the remainder. Idear prioritizes hard blockers, verdict-changing facts, permissions, security, compliance, core capabilities, and the largest remaining uncertainties.

Research stops when more evidence is unlikely to change the verdict, a principal risk, the technical direction, the next PoC, or the recommended action. Findings remain visibly classified as verified facts, reasoned inferences, or `needs_poc`; uncertainty is never hidden behind a confident conclusion.

### 3. Hand off traceable planning inputs

Stage 3 starts only when the user asks to pursue the idea, compare implementation paths, or prepare a handoff. It preserves end-to-end traceability from requirements and user success conditions to architecture elements, acceptance criteria, tests or evidence; every active `needs_poc` premise maps to a PoC gate before dependent work. The handoff distinguishes proposed, agent-recommended, and user-confirmed directions and tells the next agent what it may refine, must preserve, must ask about, or must validate.

This is a planning and validation handoff, not permission to write product code.

## 📦 Artifacts

Artifacts are route- and stage-dependent. Idear does not create empty placeholders merely to make a directory look complete.

| Route or stage | Artifacts |
| --- | --- |
| Quick | Chat answer only; no files. |
| Focused, when persistence is useful or requested | `focused-assessment.md`, `sources.yaml` |
| Full — Stage 1: clarification | `00-raw-idea.md`, `01-product-definition.md`, `decision-log.md`, `project-context.yaml` |
| Full — Stage 2: feasibility | `02-research-dossier.md`, `03-competitor-analysis.md`, `04-risk-register.md`, `05-feasibility-report.md`, `sources.yaml`, plus `05-feasibility-report.pdf` when requested or supported |
| Full — Stage 3: optional handoff | `06-technical-paths.md`, `07-initial-solution.md`, `08-ai-handoff.md` |

`project-context.yaml` is the authoritative machine-readable state for a Full workspace. The human-facing reports explain the decision; the dossier, decision log, and handoff preserve why it was made and what remains unresolved.

### Continuing an existing workspace

An existing Full workspace from an earlier Idear version may have a confirmed product definition or completed research but no decision tree. Idear performs a representation-only migration: it derives stable nodes while preserving confirmed requirements, decisions, assumptions, evidence, history, and confirmation state. It continues without re-asking settled questions and resumes at the earliest incomplete stage. A newly exposed substantive conflict still requires normal invalidation and reconfirmation.

## 🚀 Install Idear in Your Agent

### Give this link to your agent

If your agent supports GitHub-based Skill installation, paste this into Codex, Claude Code, or another compatible agent:

```text
Install the Idear Skill from:
https://github.com/haixin-ye/skills/tree/master/skills/idear

Install the complete directory, including references, assets, and agents metadata.
```

### Manual installation

Idear is a bundled Skill. Do **not** download `SKILL.md` by itself: its routing rules, research standards, state contracts, and output templates live beside it.

Copy the complete [`skills/idear/`](skills/idear/) directory to one of these locations:

| Agent | Project install | Global install |
| --- | --- | --- |
| Codex | `.codex/skills/idear/` | `~/.codex/skills/idear/` |
| Claude Code | `.claude/skills/idear/` | `~/.claude/skills/idear/` |

Restart the agent or reload its Skills after installation.

## 💬 Example Requests

```text
$idear Can a Chrome extension read text inside a cross-origin iframe?
```

```text
$idear Investigate only whether macOS permits this app to capture system audio, with sources and the smallest validation.
```

```text
$idear I want to build a LAN-only remote-control tool with no accounts or cloud relay. Help me define it, test feasibility, and prepare a development handoff if it is viable.
```

## 🤖 For Agents

When an agent receives this repository, it should read [`skills/index.json`](skills/index.json), select `idear`, read [`skills/idear/SKILL.md`](skills/idear/SKILL.md), and preserve the complete `skills/idear/` directory during installation. The repository-level [AGENTS.md](AGENTS.md) defines this contract precisely.

## 📄 License

Licensed under the [Apache License, Version 2.0](LICENSE).

If Idear helps you avoid building the wrong thing, [give the repository a star](https://github.com/haixin-ye/skills) or share the idea you evaluated in [GitHub Issues](https://github.com/haixin-ye/skills/issues).
