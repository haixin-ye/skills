# 💡 Idear - 面向 AI Agent 的证据驱动产品探索 Skill

[![Agent Skills](https://img.shields.io/badge/Agent%20Skills-compatible-087A6B?style=flat-square)](https://agentskills.io)
[![Workflow](https://img.shields.io/badge/Workflow-自适应产品探索-7A5AF8?style=flat-square)](skills/idear/SKILL.md)
[![Evidence](https://img.shields.io/badge/Research-证据优先-1F6FEB?style=flat-square)](skills/idear/SKILL.md)
[![License](https://img.shields.io/badge/License-Apache--2.0-586069?style=flat-square)](LICENSE)

[English](README.md) | **简体中文**

---

## 💡 开发之前，先弄清楚什么值得做

> **“在 Agent 写下第一行代码之前，先弄清楚什么值得被构建。”**

很多想法没有做成，并不是因为没人会写代码，而是因为关键问题没有被尽早解决：目标平台是否允许所需能力，API 是否真实存在，隐私或许可证是否阻断方案，以及已有产品是否已经填补了所谓的空白。

Idear 是一个自适应、证据优先的产品探索 Skill。它既能回答一个边界清楚的问题，也能调查一个技术不确定性，还能把粗糙想法转化为经确认的产品定义、可行性结论和开发交接。它不替代产品判断，也不授权实现；它让决策有明确记录、有证据支撑、可以被后续 Agent 继承。

## 🚀 60 秒开始使用 Idear

把下面这段话交给支持 Skill 的 Agent：

```text
请安装完整的 Idear Skill：
https://github.com/haixin-ye/skills/tree/master/skills/idear

然后使用 $idear，在实现前评估这个想法：
<在这里描述你的想法>
```

你无需选择模式。只要描述自己需要的结果，Idear 就会推断能够可靠回答问题的最浅深度。你仍可明确要求更简短的回答、持久化评估或完整交接。

## 🧭 自适应深度

| 内部路径 | 适用情况 | 处理方式 | 默认文件 |
| --- | --- | --- | --- |
| `quick` | 一个边界明确、风险较低的事实问题 | Idear 直接在对话中回答，同时说明关键条件并核验时效性事实。 | 无；不创建工作区。 |
| `focused` | 只调查一个明确命名的不确定性，包括可以独立核验的单项权限或硬约束 | Idear 只研究该问题，默认在对话中给出结论、来源和最小验证。 | 无。仅在持久化确有价值或用户要求时创建 `focused-assessment.md` 和 `sources.yaml`。 |
| `full` | 粗糙产品想法、相互耦合的决策、必须在整个产品中协调的系统级硬约束或长期开发交接 | Idear 依次完成有门禁的产品澄清、可行性研究，并只在用户要求时准备技术路径。 | 按阶段创建工作区，只生成当前需要的文件。 |

可独立核验的单项权限或硬约束仍属于 `focused`。硬约束只有在需要整个产品协调或涉及耦合取舍时才属于 `full`。

Idear 不会把 `quick` 或 `focused` 请求悄悄扩大成 `full`。如果确实需要更广的探索，它会先完成安全且有边界的部分，说明尚未解决的问题，再征得用户同意扩大范围。

```mermaid
flowchart TD
    A["你的问题或粗糙想法"] --> B{"足以回答问题的最浅深度"}
    B --> Q["`quick`：回答一个确定事实"]
    B --> F["`focused`：调查一个不确定性"]
    B --> U["`full`：澄清产品"]
    U --> T["持久化决策树与前沿"]
    T --> R["只研究会改变结论的证据"]
    R --> V["给出可行性结论"]
    V --> H{"用户是否要求技术方向？"}
    H -->|是| D["生成可追溯的开发交接"]
    H -->|否| E["在结论处停止"]
```

## 🔍 完整探索如何工作

### 1. 用决策树澄清产品

完整探索会在 `project-context.yaml` 中保存一棵依赖感知的决策树。它的前沿只包含前置条件已经确定、当前价值最高的开放问题。Agent 默认每轮询问一个问题；每轮最多三个问题，但只有问题相互独立、前置条件均已确定、容易回答且无需研究或 PoC 时，才会成组询问。用户负责目标和价值选择，Agent 负责研究事实，依赖具体环境的结论则转为 PoC。

上游答案发生变化时，Idear 会保留历史：被替换的用户决策或约束标记为“被取代”（`superseded`），被替换的事实、假设或实验结果标记为“失效”（`stale`）。Idear 会递归地把所有直接和间接的活动依赖节点及排队工作标记为失效（`stale`），包括当前处于 `open`、`resolved`、`assumed`、`needs_research` 或 `needs_poc` 的节点。仍有价值的待办工作会获得新的替代节点；Idear 同时列出受影响的产物、重新计算前沿，并在产品摘要发生语义变化后要求重新确认。

### 2. 研究决策，而不是堆积主题

每项重要研究都关联一个有效的决策节点或 focused 前提，并预先说明它能改变什么决策、怎样的证据才足够，以及剩余不确定性应由什么备用 PoC 解决。Idear 优先处理硬性阻碍、能改变结论的事实、权限、安全、合规、核心能力和最大的剩余不确定性。

当更多证据已不太可能改变可行性结论、主要风险、技术方向、下一项 PoC 或建议行动时，研究就会停止。发现会明确区分已验证事实、推理结论与 `needs_poc`，而不会用看似自信的文字掩盖未知。

### 3. 交接可追溯的规划输入

只有当用户决定继续、要求比较实现路径或准备开发交接时，Stage 3 才会开始。它保留端到端可追溯关系：产品需求与用户成功条件映射到架构元素、验收标准以及测试或证据；每个有效的 `needs_poc` 前提都必须映射到 PoC 门禁，再允许相关工作继续。交接会区分候选方案、Agent 建议与用户确认的方向，并告诉下一个 Agent 哪些内容可以细化、必须保留、需要询问或必须验证。

这些产物用于规划与验证，并不代表可以直接编写产品代码。

## 📦 产物

产物由路径和阶段决定。Idear 不会为了让目录看起来完整而创建空占位文件。

| 路径或阶段 | 产物 |
| --- | --- |
| Quick | 仅在对话中回答，不创建文件。 |
| Focused（需要或要求持久化时） | `focused-assessment.md`、`sources.yaml` |
| Full — Stage 1：产品澄清 | `00-raw-idea.md`、`01-product-definition.md`、`decision-log.md`、`project-context.yaml` |
| Full — Stage 2：可行性研究 | `02-research-dossier.md`、`04-risk-register.md`、`05-feasibility-report.md`、`sources.yaml`；`03-competitor-analysis.md` 仅在当前活动决策节点需要竞品、现有方案或差异化证据时生成；在用户要求或环境支持时另生成 `05-feasibility-report.pdf` |
| Full — Stage 3：可选开发交接 | `06-technical-paths.md`、`07-initial-solution.md`、`08-ai-handoff.md` |

`project-context.yaml` 是 Full 工作区中权威的机器可读状态。面向用户的报告解释最终判断；研究档案、决策日志和交接材料则保留判断依据以及仍未解决的问题。

### 继续已有工作区

旧版 Idear 留下的已有 Full 工作区可能已经具备经确认的产品定义或完整研究，却没有决策树。Idear 会执行仅改变表示形式的迁移：在保留已确认需求、决策、假设、证据、历史和确认状态的同时，推导稳定节点。迁移无需重新询问已经确定的问题，并从最早未完成阶段继续。如果迁移发现新的实质冲突，仍会按正常规则使依赖项失效并要求重新确认。

## 🚀 在你的 Agent 中安装 Idear

### 直接把链接交给 Agent

如果你的 Agent 支持从 GitHub 安装 Skill，可以把下面这段话交给 Codex、Claude Code 或其他兼容 Agent：

```text
请安装 Idear Skill：
https://github.com/haixin-ye/skills/tree/master/skills/idear

请安装完整目录，包括 references、assets 和 agents 元数据。
```

### 手动安装

Idear 是一个完整目录式 Skill。请**不要**只下载 `SKILL.md`：它的路由规则、研究标准、状态契约和产物模板都保存在相邻文件中。

将完整的 [`skills/idear/`](skills/idear/) 目录复制到以下位置之一：

| Agent | 项目级安装 | 全局安装 |
| --- | --- | --- |
| Codex | `.codex/skills/idear/` | `~/.codex/skills/idear/` |
| Claude Code | `.claude/skills/idear/` | `~/.claude/skills/idear/` |

安装后请重启 Agent 或重新加载 Skills。

## 💬 示例请求

```text
$idear Chrome 扩展能读取跨域 iframe 内的文本吗？
```

```text
$idear 只调查 macOS 是否允许这个应用采集系统音频，请给出来源和最小验证方案。
```

```text
$idear 我想做一个无需账号和云中继、只在局域网工作的远程控制工具。请帮我定义产品、判断可行性；如果可行，再准备开发交接。
```

## 🤖 面向 Agent

当 Agent 获得本仓库时，应先读取 [`skills/index.json`](skills/index.json)，选择 `idear`，再读取 [`skills/idear/SKILL.md`](skills/idear/SKILL.md)，并在安装时保留完整的 `skills/idear/` 目录。仓库级 [AGENTS.md](AGENTS.md) 对这一流程有精确定义。

## 📄 许可证

本项目采用 [Apache License 2.0](LICENSE)。

如果 Idear 帮你避免了做错方向，欢迎为[这个仓库点一个 Star](https://github.com/haixin-ye/skills)，也可以在 [GitHub Issues](https://github.com/haixin-ye/skills/issues) 分享你评估过的想法。
