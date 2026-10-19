# Stage 1: Product Clarification

The purpose of clarification is not to design the system for the user. It is to ensure there is a stable, researchable product definition.

Before starting, read `decision-tree.md`. Persist all material questions and conclusions in `project-context.yaml`; the decision tree, not the prose summary, controls question order and completion.

## Conversation method

Save the user's original wording before reframing it. Use the user's own terminology first and convert already stated goals and constraints into resolved nodes with conversation evidence. Do not ask the user to repeat them.

Create the initial dependency tree, compute its frontier, and ask the highest-ranked user-owned frontier question. Prefer a concrete question about a real scenario that closes several downstream branches over an abstract feature or implementation question. Ask one question by default; ask no more than three only when the questions are independent, have settled prerequisites, and are easy to answer.

Good clarification targets, in order of likely impact:

1. The concrete user pain and success condition.
2. The user and operating environment.
3. Hard constraints and forbidden approaches.
4. The primary workflow and output.
5. Product boundaries and non-goals.

Do not ask all of these at once. Do not force the user to invent implementation details they do not know. Capture uncertainty as an open question.

Classify uncertainty by ownership:

- ask the user about product goals, value trade-offs, acceptable risk, and scope as `user_decision` nodes;
- record binding requirements and forbidden approaches as `constraint` nodes;
- assign externally verifiable claims to the agent as `fact` nodes with `needs_research` rather than asking the user;
- label safe working premises as `assumption` nodes, and never silently assume a high-impact user value;
- route environment-dependent outcomes to `experiment` nodes with `needs_poc` and the smallest discriminating validation.

After every material answer, update the node, recompute the frontier, and check whether dependent nodes changed. If an upstream premise changes, apply the recursive invalidation process in `decision-tree.md`: preserve a replaced `user_decision` or `constraint` as `superseded`; mark a replaced `fact`, `assumption`, or `experiment` as `stale`; mark all direct and transitive dependent active nodes `stale`, including `open`, `needs_research`, and `needs_poc` work; preserve each old resolution and add its replacement node ID and change reason; create replacement nodes for still-material pending work; tell the user which nodes and artifacts are affected; then recompute the frontier.

## Definition quality check

Before declaring Stage 1 complete, ensure the definition can answer:

- Who uses this product and when?
- What occurs from start to finish in the primary workflow?
- What concrete outcome makes it valuable?
- What must remain true even if it makes the product harder to build?
- What is explicitly outside the first product?
- Which material premises need evidence in Stage 2?

Also verify that every high-impact node is `resolved`, explicitly `assumed`, delegated as `needs_research` or `needs_poc`, intentionally `deferred`, or `out_of_scope`. Stage 1 cannot close with a high-impact node that is `open` or `stale`, or with any active node that depends on a `superseded` node.

## User confirmation

Before presenting a new or corrected summary, increment `summary.confirmation.current_revision` and set its status to `pending`. Retain the prior `confirmed_revision`, timestamp, note, and evidence until a newer revision is approved so a resumed session can distinguish the current draft from the last confirmed state.

Present the current revision number with a compact one-paragraph product description plus confirmed decisions, constraints, non-goals, assumptions, research items, PoCs, deferred/out-of-scope items, and any remaining lower-impact open questions. Ask for correction or explicit approval.

If the user corrects the summary, apply the correction to the decision tree, perform recursive invalidation, recompute the frontier, resolve or classify any newly exposed high-impact nodes, and update the affected artifacts. Then present the updated summary and obtain explicit confirmation. A correction is not itself confirmation of the revised definition.

If the user authorizes proceeding with assumptions, that authorization closes Stage 1 only when the user also approves the updated summary that displays those assumptions. Record both the assumption authorization and the summary approval as evidence. On explicit approval, set `confirmed_revision` to `current_revision`, set the confirmation status to `confirmed`, and record `confirmed_at`, `confirmation_note`, and `confirmation_evidence_refs`. Only mark Stage 1 complete while `confirmed_revision` equals `current_revision`.

