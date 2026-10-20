# Technical Paths: {{project_name}}

**Stage 3 state revision:** {{stage3_state_revision}}

**Handoff readiness:** {{blocked_conditional_or_ready_for_planning}}

**Selection lifecycle:** {{not-selected_recommended-not-confirmed_or_user-confirmed}}

**Selected path ID:** {{selected_path_id_or_none}}

**Recommended path ID:** {{recommended_path_id_or_none}}

Selection lifecycle is exactly `not-selected`, `recommended-not-confirmed`, or `user-confirmed`. Validate it against the `project-context.yaml` lifecycle contract before rendering: no selection has two null path IDs and no recommended candidate; an unconfirmed recommendation has one recommended candidate resolved by `Recommended path ID` and a null selected ID; a confirmed selection resolves to one user-confirmed candidate with decision evidence. In the confirmed state, `Recommended path ID` is null or equals `Selected path ID` under the semantics defined in the contract. Candidate provenance is recorded separately as exactly `proposed`, `recommended`, or `user-confirmed`.

## Governing Decisions And Constraints

| Node ID | Kind | Current resolution | Evidence refs | Effect on path selection |
| --- | --- | --- | --- | --- |
{{governing_node_rows}}

## Candidate Path Comparison

| Path ID | Candidate provenance | Governing decision-node IDs | Governing constraint IDs | Core mechanism and prerequisites | Benefits | Costs / risks | Constraint fit | Evidence refs | needs_poc node IDs / PoC gates | Invalidation condition |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
{{option_rows}}

Use `TBD` plus an explicit gate when upstream evidence does not support an implementation detail.

## Recommendation State

- **Recommendation:** {{path_id_and_rationale_or_no_recommendation_pending_gate}}
- **Recommended path ID:** {{recommended_path_id_or_none}}
- **Governing decision-node IDs:** {{recommendation_decision_ids}}
- **Governing constraint IDs:** {{recommendation_constraint_ids}}
- **Evidence-backed rationale:** {{recommendation_rationale}}
- **Trade-offs accepted by the recommendation:** {{recommendation_tradeoffs}}
- **User-confirmation evidence, if any:** {{user_confirmation_evidence_or_not_confirmed}}
- **Condition that would change the recommendation:** {{recommendation_invalidation_condition}}

When an unresolved gate prevents a defensible recommendation, keep selection lifecycle `not-selected`, keep both path IDs `none`, and write `No recommendation — pending GATE-###`. Do not invent a provisional recommendation merely to fill this section.

## Rejected Or Deferred Paths

| Path ID | Status | Reason | Governing node or evidence IDs | Reconsideration condition |
| --- | --- | --- | --- | --- |
{{rejected_or_deferred_path_rows}}

## Ordered Blocker And Gate Registry

| Order | Gate ID | Type / status | Readiness effect | Source node ID | Impact | Affected path / architecture / acceptance IDs | Affected work IDs | Owner | Exact exit condition | Evidence refs | Next action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
{{ordered_gate_rows}}
