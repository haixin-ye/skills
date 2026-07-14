# 💡 Idear - 面向 AI Agent 的产品探索与可行性研究 Skill

[![Agent Skills](https://img.shields.io/badge/Agent%20Skills-compatible-087A6B?style=flat-square)](https://agentskills.io)
[![Workflow](https://img.shields.io/badge/Workflow-产品探索-7A5AF8?style=flat-square)](skills/idear/SKILL.md)
[![Evidence](https://img.shields.io/badge/Research-证据优先-1F6FEB?style=flat-square)](skills/idear/SKILL.md)
[![License](https://img.shields.io/badge/License-Apache--2.0-586069?style=flat-square)](LICENSE)

[English](README.md) | **简体中文**


---

## 💡 写在开始开发之前 (About Idear)

> **“在 Agent 写下第一行代码之前，先弄清楚什么值得被构建。”**

你好，欢迎来到 Idear。这个项目源于一个很简单的观察：很多想法最后没有做成，并不是因为没有人会写代码，而是因为那些真正重要的问题，从一开始就没有被问出来。

目标平台真的支持这个能力吗？所需 API 是否存在？权限、浏览器策略、网络、许可证或隐私规则会不会让项目走不下去？是否已经有人做过同样的东西，而你真正的差异在哪里？AI 的快速回答很容易显得自信，但也可能恰好绕开了这些问题。

Idear 希望让 Agent 在开发之前承担一份更重要的工作：把一个粗糙想法梳理成清晰产品定义，基于真实资料判断它是否成立，并留下让后续开发 Agent 可以信任的上下文。它不替用户做产品决策，而是让决策更有依据、更明确，也更容易被后续工作继承。

无论你在探索一个新工具、AI 工作流、本地优先应用、开发者产品，还是一个听起来稍微有点不可能的自动化想法，Idear 都会帮助你在项目变成一堆代码之前，先找到真实答案。

---



## 🚀 60 秒开始使用 Idear

把下面这段话交给支持 Skill 的 Agent：

```text
请安装完整的 Idear Skill：
https://github.com/haixin-ye/skills/tree/master/skills/idear

然后使用 $idear，在实现前评估这个想法：
<在这里描述你的想法>
```

Idear 会帮助 Agent 明确产品定义、核验真实 API 与限制、比较已有方案；如果想法值得继续，还会准备可直接交给开发 Agent 的实现材料。

| 你一开始只有 | Idear 最终会留下 |
| --- | --- |
| “这个能做吗？” | 带来源的可行性结论、阻碍与未知项 |
| “有人做过吗？” | 竞品与开源方案分析，以及真正的差异点 |
| “第一步该做什么？” | 风险驱动的 PoC、MVP 范围、技术路径与 AI 交接材料 |

> 如果 Idear 帮你避免了做错方向，欢迎为[这个仓库点一个 Star](https://github.com/haixin-ye/skills)，让更多开发者看到它。

## ✨ Idear 能做什么

```mermaid
flowchart LR
    A["模糊想法"] --> B["明确产品定义"]
    B --> C["基于证据的调研"]
    C --> D["确定技术方向"]
    D --> E["交接开发工作"]
```

Idear 不是普通的头脑风暴提示词，不是一个只会说“应该可以”的聊天机器人，也不是直接生成代码的实现框架。它是一个严谨的**开发前研究工作流**，服务于 AI Agent。

| 阶段 | Agent 会做什么 | 会留下什么 |
| --- | --- | --- |
| **澄清** | 用自然、聚焦的问题将口头想法收敛为清晰的产品描述。 | 目标、用户、流程、硬约束、非目标与开放问题。 |
| **调研** | 核验真实能力与限制，研究产品、SDK、论文、标准和开源实现。 | 带来源的研究档案、竞品分析、风险登记与可行性报告。 |
| **准备开发** | 用户决定继续后，比较技术路径并定义首个开发方向。 | MVP 范围、PoC 计划、初步架构和 AI 交接包。 |

### 它替你处理的工作

- 核验所需 API、权限、协议、硬件能力或数据源是否真实存在。
- 调研商业产品、SDK、论文、标准和 GitHub 开源实现。
- 解释类似方案真正如何工作，而不是只列出名字。
- 清晰区分 `verified`、`reasoned_inference` 与 `needs_poc`。
- 找到能够最快消除最大风险的最小 PoC。
- 为下一个开发 Agent 保留决策、来源、约束与范围。

---

## 📦 一次探索会留下什么

Idear 会创建一个持续维护的项目工作区，避免重要决策只停留在聊天记录中。

```text
docs/idear/<date>-<idea>/
  00-raw-idea.md             # 用户最初的表述
  01-product-definition.md   # 已确认的范围与约束
  02-research-dossier.md     # 证据、推理和开放问题
  03-competitor-analysis.md  # 产品与开源项目对比
  04-risk-register.md        # 风险、缓解方案和 PoC 行动
  05-feasibility-report.md   # 面向用户的可行性报告
  05-feasibility-report.pdf  # 支持 PDF 时生成的报告
  06-technical-paths.md      # 技术选项与取舍
  07-initial-solution.md     # MVP 与初步架构
  08-ai-handoff.md           # 交给下一个开发 Agent 的说明
  project-context.yaml       # 机器可读的项目状态
```

可行性报告负责向用户解释决策；研究档案与 handoff 则负责向后续 Agent 解释决策：哪些内容已经确认、哪些边界不能改变、哪些路径已经排除，以及哪些问题仍必须通过 PoC 验证。

---

## 🚀 在你的 Agent 中安装 Idear

### 直接把链接交给 Agent

如果你的 Agent 支持通过 GitHub 安装 Skill，只需要将下面内容粘贴给 Codex、Claude Code 或其他兼容 Agent：

```text
请从以下地址安装 Idear Skill：
https://github.com/haixin-ye/skills/tree/master/skills/idear

请安装完整目录，包括 references、assets 和 agents metadata。
```

### 手动安装

Idear 是一个**完整目录型 Skill**。请不要只下载 `SKILL.md`，因为调研标准、可行性报告模板和开发交接模板都位于同级目录中。

将完整的 [`skills/idear/`](skills/idear/) 目录复制到以下位置之一：

| Agent | 项目级安装 | 全局安装 |
| --- | --- | --- |
| Codex | `.codex/skills/idear/` | `~/.codex/skills/idear/` |
| Claude Code | `.claude/skills/idear/` | `~/.claude/skills/idear/` |

安装后重启 Agent 或重新加载 Skills。

---

## 🧭 开始一次探索

```text
$idear 我有一个产品想法。在开始开发前，帮我判断它是否可行。
```

示例提示词：

```text
$idear 我想做一个会自动响应游戏事件的小工具。它在技术上是否可行，可能被什么限制？
```

```text
有没有人做过不经过云端中继、只在局域网使用的远控工具？请核验它们真正的架构，并判断是否还有值得做的差异化。
```

---

## 🤖 面向 Agent

当 Agent 获得本仓库时，应先读取 [`skills/index.json`](skills/index.json)，选择 `idear`，再读取 [`skills/idear/SKILL.md`](skills/idear/SKILL.md)，并在安装时保留完整的 `skills/idear/` 目录。仓库级 [AGENTS.md](AGENTS.md) 对这一流程有精确定义。

## 📄 许可证

本项目采用 [Apache License 2.0](LICENSE)。

如果 Idear 对你有帮助，欢迎[点一个 Star](https://github.com/haixin-ye/skills)，也可以在 [GitHub Issues](https://github.com/haixin-ye/skills/issues) 分享你用它评估过的想法。
