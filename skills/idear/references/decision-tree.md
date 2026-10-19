# Persisted Decision Tree

Use the decision tree only for `full` discovery. It is the dependency-aware record of what is known, what must be decided or validated, and which conclusions become invalid when an upstream premise changes. Persist it under `decision_tree` in `project-context.yaml` and update it after every material clarification, finding, assumption, experiment result, or reversal.

## Node schema

Create a node for every material question or conclusion. A material node can change the product definition, feasibility verdict, hard-constraint fit, principal risk, technical direction, or next validation.

Every node must persist all of these fields:

```yaml
- id: "UD-001"
  question: "Who is the primary user in the first release?"
  kind: "user_decision"
  depends_on: []
  status: "open"
  resolution: null
  impact:
    level: "high"
    rationale: "Changes the workflow, permissions, and success condition."
  evidence_refs: []
```

- `id`: stable and unique. Prefer `UD-###`, `F-###`, `A-###`, `E-###`, or `C-###` for the five kinds. Never renumber or reuse an ID.
- `question`: the uncertainty or proposition in language a later agent can understand.
- `kind`: exactly one of `user_decision`, `fact`, `assumption`, `experiment`, or `constraint`.
- `depends_on`: IDs whose current answers must be valid before this node can be answered or relied upon.
- `status`: exactly one of `open`, `resolved`, `assumed`, `needs_research`, `needs_poc`, `deferred`, `out_of_scope`, `stale`, or `superseded`.
- `resolution`: the current answer and rationale, or `null` while unanswered. Once answered, preserve the original answer and rationale. For a replacement or reversal, add the replacement node ID and change reason alongside that original resolution; never overwrite the old answer.
- `impact`: at least `level` (`high`, `medium`, or `low`) and a short rationale. Assess the ranking factors below when assigning it.
- `evidence_refs`: conversation turns, source IDs, artifact anchors, or PoC results that support the resolution. Never use an untraceable conclusion.

Do not delete closed, stale, or superseded nodes. The tree is a historical decision record as well as current execution state.

Use statuses consistently:

| Status | Meaning |
| --- | --- |
| `open` | Unanswered; it joins the frontier only when all prerequisites are settled. |
| `resolved` | Current answer is supported by user confirmation, evidence, or a completed PoC. |
| `assumed` | Explicit working premise accepted for now, not a verified fact. |
| `needs_research` | Assigned to agent research; not yet resolved. |
| `needs_poc` | Assigned to an environment-specific experiment; not yet resolved. |
| `deferred` | Intentionally postponed with a recorded reason. |
| `out_of_scope` | Intentionally excluded from the current decision scope. |
| `stale` | Previously active conclusion invalidated by an upstream change. |
| `superseded` | Historical user decision or constraint replaced by a newer node. |

## Ownership and classification

Classify the uncertainty before deciding who should resolve it:

| Kind | Owner and handling |
| --- | --- |
| `user_decision` | Ask the user when the answer expresses goals, value trade-offs, acceptable risk, scope, or preference. Do not research a value choice into existence. |
| `fact` | The agent verifies it. Set `needs_research` when current evidence is required; do not ask the user to supply an externally researchable fact. |
| `assumption` | The agent may label a working premise `assumed` only when it is explicit and does not silently decide a material user value. High-impact assumptions require the user's authorization to proceed with them. |
| `experiment` | Use for outcomes that depend on the user's environment, hardware, data, permissions, version, or integration behavior. Set `needs_poc` and define the smallest discriminating test. |
| `constraint` | Record a binding condition or forbidden approach. Resolve a constraint already stated by the user immediately with conversation evidence; do not ask for it again. |

When a proposition could be checked in general but its truth for this exact environment is uncertain, separate it into a general `fact` and an environment-specific `experiment` rather than pretending either answer proves both.

## Frontier

The **frontier** is the set of material `open` nodes whose `depends_on` prerequisites are settled. A prerequisite is settled for dependency ordering only when it is `resolved` or `assumed`. Nodes marked `needs_research`, `needs_poc`, `deferred`, `out_of_scope`, `stale`, or `superseded` do not satisfy an active dependency.

Recompute and persist `decision_tree.frontier` after each node change. Do not ask about a node outside the frontier. Classify frontier nodes before acting: ask user-owned choices, queue facts for research, and route environment claims to PoC.

Order the actionable frontier by:

1. downstream blocking impact: how many material branches it unlocks;
2. potential to change the feasibility verdict;
3. relevance to a hard constraint;
4. irreversibility or cost of getting it wrong;
5. present uncertainty;
6. user answerability: prefer a concrete question the user can answer now when earlier factors are comparable.

Ask one question per round by default. Ask at most three only when all are independent of one another, have settled prerequisites, are easy to answer, and can be answered without research or a PoC. Never bundle a dependent follow-up with its prerequisite.

## Upstream changes and invalidation

Never edit history to make a reversal look as though the old decision never existed. When an upstream decision, constraint, fact, assumption, or experiment result changes:

1. Create and resolve the replacement node with a new stable ID.
2. Mark a replaced user decision or constraint `superseded`; mark a replaced fact, assumption, or experiment result `stale`. Preserve the old node's original resolution answer and rationale, then add `replacement_node_id` and `change_reason` to that resolution record. Never replace the original no-cloud decision, fact, assumption, or experiment result with the new answer.
3. Traverse `depends_on` recursively from the replaced node. Mark every direct and transitive dependent active conclusion `stale`, even when it appears likely to remain true.
4. Find every artifact that cites an affected node or repeats its conclusion. List the affected node IDs and artifact paths to the user before issuing a revised conclusion.
5. Reclassify each affected uncertainty as a new user decision, fact for research, assumption, experiment for PoC, constraint, deferred item, or out-of-scope item. Preserve stale nodes and create new active nodes rather than changing the historical entries back to current.
6. Recompute the frontier and refresh any summary or verdict that used the invalidated branch.

For example, a superseded constraint keeps its original answer while recording why and where it was replaced:

```yaml
resolution:
  answer: "Cloud services are forbidden."
  rationale: "The user set this as a binding constraint."
  replacement_node_id: "C-004"
  change_reason: "The user now permits a cloud relay when direct LAN connectivity fails."
```

For a change that crosses the LAN/cloud boundary or a similar system boundary, explicitly inspect authentication, identity, networking, privacy, cost, deployment, competitors, architecture, risks, and PoCs. List only the domains and artifacts actually affected, but do not omit a transitive dependency merely because it lives in a later-stage artifact.

Do not issue a product definition, verdict, recommendation, or handoff while it still relies on a `stale` or `superseded` premise.

## Stage 1 completion rule

Stage 1 may close only when every high-impact node is explicitly one of:

- `resolved`;
- `assumed` with the assumption visible to the user;
- delegated as `needs_research` or `needs_poc`;
- intentionally `deferred`; or
- `out_of_scope`.

No high-impact node may remain `open`, `stale`, or dependent on a `superseded` node. Present the compact product definition together with confirmed decisions, constraints, assumptions, research items, PoCs, deferred/out-of-scope items, and any remaining lower-impact open questions.

If the user corrects that summary, apply the correction, perform recursive invalidation, recompute the frontier, resolve or classify newly exposed high-impact nodes, update affected artifacts, and present the updated summary again. The correction itself is not approval. Stage 1 completes only when the user explicitly approves the latest updated summary.

Authorization to proceed with assumptions is not sufficient by itself. It completes Stage 1 only when the user simultaneously explicitly approves the updated summary that displays those assumptions; record both approvals as evidence.
