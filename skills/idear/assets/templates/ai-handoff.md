# Development Handoff: {{project_name}}

## Read First

Read `project-context.yaml` first, then this document, then the linked research and source artifacts. The decision tree is authoritative for current node state. Do not use stale or superseded branches as current instructions.

- **Stage 3 state revision:** {{stage3_state_revision}}
- **Current summary revision:** {{current_summary_revision}}
- **Confirmed summary revision:** {{confirmed_summary_revision}}
- **Summary confirmation status:** {{pending_or_confirmed}}
- **Handoff readiness:** {{blocked_conditional_or_ready_for_planning}}
- **Selection lifecycle:** {{not-selected_recommended-not-confirmed_or_user-confirmed}}
- **Selected path ID:** {{selected_path_id_or_none}}
- **Recommended path ID:** {{recommended_path_id_or_none}}
- **Implementation authorized:** no; this handoff is a planning input

## Product Summary

{{product_summary}}

## Confirmed Requirements And Success Conditions

| Requirement ID | Confirmed requirement | Governing node IDs | Success criterion IDs | Source / confirmation evidence |
| --- | --- | --- | --- | --- |
{{confirmed_requirement_rows}}

### User Success Conditions

Carry the user's actual confirmed wording in every row. An `SC-###` ID or link to another artifact is not a substitute for the success-condition text.

| Success criterion ID | User success condition | Requirement IDs | Acceptance criterion IDs | Source evidence / approval gate |
| --- | --- | --- | --- | --- |
{{user_success_condition_rows}}

## Confirmed User Decisions

| Decision node ID | Confirmed resolution | Confirmation evidence | Must preserve |
| --- | --- | --- | --- |
{{confirmed_user_decision_rows}}

## Hard Constraints

| Constraint node ID | Binding constraint | Evidence refs | Architecture / delivery effect |
| --- | --- | --- | --- |
{{hard_constraint_rows}}

## Explicit Non-Goals

{{non_goals_with_source_ids}}

## Agent Recommendations

| Recommendation ID | Recommendation | Governing IDs | Rationale / evidence | User approval status | Invalidation condition |
| --- | --- | --- | --- | --- | --- |
{{agent_recommendation_rows}}

Recommendations remain advisory until the user accepts them.

## Proposals

| Proposal ID | Proposed detail | Governing IDs | What the development agent may refine | Approval or validation needed |
| --- | --- | --- | --- | --- |
{{proposal_rows}}

## Assumptions

| Assumption node ID | Working premise | Impact | Authorization evidence | Invalidation condition | Required action |
| --- | --- | --- | --- | --- | --- |
{{assumption_rows}}

## Validated Findings

| Fact / experiment node ID | Finding | Claim status | Source or PoC evidence IDs | Scope / freshness condition |
| --- | --- | --- | --- | --- |
{{validated_finding_rows}}

## Ordered Blocker And Gate Registry

| Order | Gate ID | Type / status | Readiness effect | Source node ID | Impact | Affected path / architecture / acceptance IDs | Affected work IDs | Owner | Exact exit condition | Evidence refs | Next action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
{{ordered_gate_rows}}

Do not plan dependent irreversible work until its gate is cleared.

## Deferred And Lower-Impact Open Items

| Node ID | Status / reason | Owner | Revisit condition | Current scope effect |
| --- | --- | --- | --- | --- |
{{deferred_and_lower_impact_open_rows}}

## Existing Solutions And Differentiation

{{competitors_and_differentiation}}

## Technical Direction And Preliminary Architecture

{{technical_direction_and_architecture_with_ids}}

## Traceability Snapshot

The canonical requirement-and-success table lives in `07-initial-solution.md`; this snapshot must carry the same stable trace and governing IDs.

| Trace ID | Product requirement ID | Success criterion ID | Governing decision / constraint IDs | Architecture element ID | Acceptance criterion ID | Validation evidence or planned test | Gate/status |
| --- | --- | --- | --- | --- | --- | --- | --- |
{{traceability_snapshot_rows}}

## Governance Mapping Snapshot

| Governance trace ID | Decision / constraint node ID | Affected path IDs | Affected architecture element IDs | Validation evidence or gate IDs | Status |
| --- | --- | --- | --- | --- | --- |
{{governance_snapshot_rows}}

## Required PoCs

Every row maps a PoC to an active `needs_poc` premise; verify that every active `needs_poc` node appears here.

| Order | PoC ID | needs_poc node ID | Hypothesis | Success / failure thresholds | Evidence output | Decision unlocked | Dependencies | Owner / environment | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
{{required_poc_rows}}

## Risks

{{risks_with_decision_and_evidence_ids}}

## Change Authority

| State category | Development agent may refine | Must preserve | User approval or validation required |
| --- | --- | --- | --- |
| `user-confirmed` decision | Implementation details inside its boundaries | Confirmed outcome and rationale | New user decision before changing it |
| Hard constraint / non-goal | Nothing that weakens or bypasses it | Exact binding boundary | New user decision plus downstream invalidation |
| `recommended` direction | Compare or refine non-binding details | Governing evidence and constraints | User approval before calling it final |
| `proposed` detail | Revise within governing constraints | Traceability and unresolved gates | Approval when it changes user-visible behavior or a material trade-off |
| `assumed` premise | Plan conditionally | Assumption label and invalidation condition | Required evidence or user authorization named above |
| `needs_poc` premise | Prepare the named validation | PoC gate and dependency boundary | Passing evidence before dependent commitment |
| `stale` / `superseded` history | Nothing as current state | Historical record | Replacement node and normal invalidation process |

## Instructions To The Next Development Agent

1. Preserve confirmed user decisions, hard constraints, explicit non-goals, stable IDs, and the current traceability chain.
2. Do not repeat settled discovery. Ask only when an unresolved user-owned gate is on the current frontier.
3. Clear unresolved high-impact blockers and required PoCs before dependent or irreversible architecture work.
4. Re-check drift-prone sources before relying on them for implementation and record new evidence against the linked node.
5. Keep recommendations and proposals non-binding until the stated approval occurs; use `TBD` rather than inventing unsupported detail.
6. Produce an implementation plan and obtain the necessary authorization before modifying code, installing dependencies, running PoCs, or changing external systems.
