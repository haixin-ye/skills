# 💡 Idear - Evidence-Driven Product Discovery for AI Agents

[![Agent Skills](https://img.shields.io/badge/Agent%20Skills-compatible-087A6B?style=flat-square)](https://agentskills.io)
[![Workflow](https://img.shields.io/badge/Workflow-Product%20Discovery-7A5AF8?style=flat-square)](skills/idear/SKILL.md)
[![Evidence](https://img.shields.io/badge/Research-Evidence--First-1F6FEB?style=flat-square)](skills/idear/SKILL.md)
[![License](https://img.shields.io/badge/License-Apache--2.0-586069?style=flat-square)](LICENSE)

**English** | [简体中文](README.zh-CN.md)



---

## 💡 A Note Before Building (About Idear)

> "Before an agent writes its first line of code, it should know what is worth building."

Hello, and welcome to Idear. This project began with a simple observation: most ideas do not fail because nobody can write the code. They fail because the important questions were never asked early enough.

Can the target platform actually do this? Does the required API exist? Will permissions, browser policy, networking, licensing, or privacy rules stop the project? Has someone already built the same thing, and if so, where is the real gap? A quick answer from an AI can sound convincing while quietly missing every one of those questions.

Idear gives an agent a better job before implementation begins. It helps turn a rough thought into a clear product definition, researches the evidence needed to judge it, and leaves behind a record another development agent can trust. It does not replace product judgment; it makes that judgment more informed, more explicit, and much easier to carry forward.

Whether you are exploring a new tool, an AI workflow, a local-first application, a developer product, or an automation that sounds just slightly impossible, Idear is designed to help you find the real answer before the project turns into a pile of code.

---

Turn a rough product idea into a **source-backed feasibility decision** before an AI agent starts building it.

## 🚀 Try Idear in 60 Seconds

Give this repository path to a Skill-compatible agent:

```text
Install the complete Idear Skill from:
https://github.com/haixin-ye/skills/tree/master/skills/idear

Then use $idear to assess this idea before implementation:
<describe your idea here>
```

Idear will clarify the product, verify the real APIs and constraints, compare existing solutions, and—if the idea is viable—prepare an implementation-ready handoff.

| You start with | Idear leaves you with |
| --- | --- |
| “Can this be built?” | A sourced feasibility verdict with blockers and unknowns |
| “Has anyone done this?” | Competitor and open-source analysis with meaningful differences |
| “What should I build first?” | A risk-driven PoC, MVP scope, technical paths, and AI handoff |

> If Idear helps you avoid building the wrong thing, please [star the repository](https://github.com/haixin-ye/skills) so more builders can find it.

## ✨ What Idear Does

```mermaid
flowchart LR
    A["A rough idea"] --> B["Clarify the product"]
    B --> C["Research the evidence"]
    C --> D["Choose a direction"]
    D --> E["Hand off to development"]
```

Idear is not a generic brainstorming prompt, a chatbot that says everything is possible, or a code-generation framework. It is a disciplined **pre-development research workflow** for AI agents.

| Stage | What the agent does | What remains after the conversation |
| --- | --- | --- |
| **Clarify** | Turns an informal idea into a clear product description through focused, natural questions. | Goals, users, workflow, hard constraints, non-goals, and open questions. |
| **Research** | Verifies real capabilities and constraints; studies products, SDKs, papers, standards, and open-source implementations. | A source-backed research dossier, competitor analysis, risk register, and feasibility report. |
| **Prepare** | After the user chooses to continue, compares technical paths and defines the first development direction. | MVP scope, PoC plan, initial architecture, and an AI handoff package. |

### The work it takes off your plate

- Checks whether the required APIs, permissions, protocols, hardware capabilities, or data sources really exist.
- Investigates commercial products, SDKs, papers, standards, and GitHub implementations.
- Explains how comparable solutions actually work instead of merely listing names.
- Separates `verified` facts from `reasoned_inference` and `needs_poc` uncertainty.
- Identifies the smallest proof of concept that can resolve the largest risk.
- Preserves decisions, sources, constraints, and scope for the next development agent.

---

## 📦 What You Get

Idear creates a durable project workspace so important decisions do not remain trapped in chat history.

```text
docs/idear/<date>-<idea>/
  00-raw-idea.md             # The user's original wording
  01-product-definition.md   # Confirmed scope and constraints
  02-research-dossier.md     # Evidence, reasoning, and open questions
  03-competitor-analysis.md  # Product and open-source comparisons
  04-risk-register.md        # Risks, mitigations, and PoC actions
  05-feasibility-report.md   # Polished report for the user
  05-feasibility-report.pdf  # Generated when PDF support is available
  06-technical-paths.md      # Options and trade-offs
  07-initial-solution.md     # MVP and preliminary architecture
  08-ai-handoff.md           # Brief for the next development agent
  project-context.yaml       # Machine-readable project state
```

The report explains the decision to the user. The dossier and handoff explain it to the next agent: what is confirmed, what must not change, what was ruled out, and what still needs a proof of concept.

---

## 🚀 Install Idear In Your Agent

### Give this link to your agent

If your agent supports GitHub-based Skill installation, paste this into Codex, Claude Code, or another compatible agent:

```text
Install the Idear Skill from:
https://github.com/haixin-ye/skills/tree/master/skills/idear

Install the complete directory, including references, assets, and agents metadata.
```

### Manual installation

Idear is a bundled Skill. Do **not** download `SKILL.md` by itself: its research standards, report templates, and handoff templates live beside it.

Copy the complete [`skills/idear/`](skills/idear/) directory to one of these locations:

| Agent | Project install | Global install |
| --- | --- | --- |
| Codex | `.codex/skills/idear/` | `~/.codex/skills/idear/` |
| Claude Code | `.claude/skills/idear/` | `~/.claude/skills/idear/` |

Restart the agent or reload its Skills after installation.

---

## 🧭 Start A Session

```text
$idear I have a product idea. Help me determine whether it is feasible before I start building.
```

Example prompts:

```text
$idear I want to build a tool that automatically reacts to a game event. Is it technically possible, and what could block it?
```

```text
Has anyone already built a LAN-only remote-control tool with no cloud relay? Verify the real architecture and tell me whether there is still a meaningful gap.
```

---

## 🤖 For Agents

When an agent is given this repository, it should read [`skills/index.json`](skills/index.json), select `idear`, read [`skills/idear/SKILL.md`](skills/idear/SKILL.md), and preserve the complete `skills/idear/` directory during installation. The repository-level [AGENTS.md](AGENTS.md) defines this contract precisely.

## 📄 License

Licensed under the [Apache License, Version 2.0](LICENSE).

If Idear is useful to you, [give it a star](https://github.com/haixin-ye/skills) and share the idea you evaluated in [GitHub Issues](https://github.com/haixin-ye/skills/issues).
