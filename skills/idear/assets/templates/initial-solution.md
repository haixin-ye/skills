# Initial Solution: {{project_name}}

**Stage 3 state revision:** {{stage3_state_revision}}

**Handoff readiness:** {{blocked_conditional_or_ready_for_planning}}

**Selection lifecycle:** {{not-selected_recommended-not-confirmed_or_user-confirmed}}

**Selected path ID:** {{selected_path_id_or_none}}

**Recommended path ID:** {{recommended_path_id_or_none}}

This artifact defines planning inputs only. It does not authorize implementation or PoC execution.

## Governing Basis

| Source ID | Kind | Current resolution | Evidence refs | Architecture effect |
| --- | --- | --- | --- | --- |
{{governing_basis_rows}}

## MVP Scope

### In Scope

| Requirement ID | Confirmed behavior | Governing node IDs | Related success criterion IDs |
| --- | --- | --- | --- |
{{mvp_in_scope_rows}}

### Explicitly Out Of Scope

| Non-goal | Source node or evidence IDs | Consequence |
| --- | --- | --- |
{{mvp_out_of_scope_rows}}

## User Success Conditions

| Success criterion ID | User success condition | Source evidence | Acceptance criterion IDs | Threshold or approval gate |
| --- | --- | --- | --- | --- |
{{success_condition_rows}}

Do not invent an unspecified target. Use `TBD` and name the approval gate.

## Preliminary Architecture

| Architecture element ID | Responsibility | Interfaces / data flow | Governing decision and constraint IDs | Provenance status | Evidence or unresolved gate |
| --- | --- | --- | --- | --- | --- |
{{architecture_element_rows}}

Provenance status is `proposed`, `recommended`, or `user-confirmed`; it does not replace the separate selection lifecycle. Unsupported implementation detail remains `TBD` behind an explicit gate.

## Security And Failure Boundaries

| Boundary ID | Threat or failure | Governing IDs | Required behavior | Validation evidence or planned test | Gate/status |
| --- | --- | --- | --- | --- | --- |
{{security_and_failure_boundary_rows}}

## Acceptance Criteria Catalog

| Acceptance criterion ID | Objective pass/fail behavior | Success criterion IDs | Architecture element IDs | Validation evidence or planned test | Evidence/gate status |
| --- | --- | --- | --- | --- | --- |
{{acceptance_criterion_rows}}

## Requirement And Success Traceability

| Trace ID | Product requirement ID | Success criterion ID | Requirement / user outcome | Governing decision / constraint IDs | Architecture element ID | Acceptance criterion ID | Validation evidence or planned test | Gate/status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
{{traceability_rows}}

Every material requirement appears in at least one complete row through architecture, acceptance, and validation. Every success condition appears in at least one complete row linked to a requirement; split many-to-many mappings into multiple stable trace IDs rather than hiding cardinality in prose.

## Decision And Constraint Governance

| Governance trace ID | Decision / constraint node ID | Current resolution | Affected path IDs | Affected architecture element IDs | Validation evidence or gate IDs | Status |
| --- | --- | --- | --- | --- | --- | --- |
{{governance_trace_rows}}

Every current governing decision and hard constraint appears in at least one governance row. Map it directly to affected paths or architecture and validation evidence or an explicit gate; do not force it through a fictional product requirement or acceptance criterion.

## Ordered Blocker And Gate Registry

| Order | Gate ID | Type / status | Source node ID | Impact | Affected path / architecture / acceptance / work IDs | Owner | Exact exit condition | Evidence refs | Next action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
{{ordered_gate_rows}}

Every unresolved high-impact item appears as an open blocker or gate in this registry.

Do not mark the handoff ready for planning while a blocking exit condition is unmet.

## Ordered Proof-Of-Concept Coverage

Every active `needs_poc` node maps to a PoC task or gate below, and every PoC maps back to an active `needs_poc` node.

| Order | PoC ID | needs_poc node ID | Hypothesis | Dependencies | Smallest authorized validation action | Success threshold | Failure threshold | Evidence output | Decision / architecture / acceptance unlocked | Owner / environment | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
{{poc_coverage_rows}}

Stage 3 defines these tasks but does not execute them.
