# Technical Paths: {{project_name}}

**Handoff readiness:** {{blocked_conditional_or_ready_for_planning}}

**Current direction:** {{current_direction_or_none}}

**Direction status:** {{proposed_recommended_or_user-confirmed}}

Direction status must be exactly `proposed`, `recommended`, or `user-confirmed`. A recommendation is not user approval.

## Governing Decisions And Constraints

| Node ID | Kind | Current resolution | Evidence refs | Effect on path selection |
| --- | --- | --- | --- | --- |
{{governing_node_rows}}

## Technical Option Comparison

| Path ID | Direction status | Governing decision-node IDs | Governing constraint IDs | Core mechanism and prerequisites | Benefits | Costs / risks | Constraint fit | Evidence refs | needs_poc node IDs / PoC gates | Invalidation condition |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
{{option_rows}}

Use `TBD` plus an explicit gate when upstream evidence does not support an implementation detail.

## Recommendation

- **Recommended path ID:** {{recommended_path_id}}
- **Direction status:** {{recommended_or_user-confirmed}}
- **Governing decision-node IDs:** {{recommendation_decision_ids}}
- **Governing constraint IDs:** {{recommendation_constraint_ids}}
- **Evidence-backed rationale:** {{recommendation_rationale}}
- **Trade-offs accepted by the recommendation:** {{recommendation_tradeoffs}}
- **User-confirmation evidence, if any:** {{user_confirmation_evidence_or_not_confirmed}}
- **Condition that would change the recommendation:** {{recommendation_invalidation_condition}}

## Rejected Or Deferred Paths

| Path ID | Status | Reason | Governing node or evidence IDs | Reconsideration condition |
| --- | --- | --- | --- | --- |
{{rejected_or_deferred_path_rows}}

## Unresolved Blocker, Approval, And Validation Gates

| Gate ID | Source node ID | Impact | Affected path or decision | Owner | Exact exit condition | Next action |
| --- | --- | --- | --- | --- | --- | --- |
{{path_gate_rows}}
