# Initial Solution: {{project_name}}

**Handoff readiness:** {{blocked_conditional_or_ready_for_planning}}

**Technical direction:** {{path_id_and_direction}}

**Direction status:** {{proposed_recommended_or_user-confirmed}}

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

| Architecture element ID | Responsibility | Interfaces / data flow | Governing decision and constraint IDs | Status | Evidence or unresolved gate |
| --- | --- | --- | --- | --- | --- |
{{architecture_element_rows}}

Status is `proposed`, `recommended`, or `user-confirmed`. Unsupported implementation detail remains `TBD` behind an explicit gate.

## Security And Failure Boundaries

| Boundary ID | Threat or failure | Governing IDs | Required behavior | Validation evidence or planned test | Gate/status |
| --- | --- | --- | --- | --- | --- |
{{security_and_failure_boundary_rows}}

## Acceptance Criteria Catalog

| Acceptance criterion ID | Objective pass/fail behavior | Success criterion IDs | Architecture element IDs | Validation evidence or planned test | Evidence/gate status |
| --- | --- | --- | --- | --- | --- |
{{acceptance_criterion_rows}}

## Canonical End-To-End Traceability

| Trace ID | Upstream node or success criterion ID | Product requirement ID | Requirement / user outcome | Governing decision and constraint IDs | Architecture element ID | Acceptance criterion ID | Validation evidence or planned test | Gate/status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
{{traceability_rows}}

Every user success condition must reach an acceptance criterion. Every material current decision or constraint must reach the architecture, validation, or an explicit gate; stale and superseded branches do not govern current rows.

## Unresolved High-Impact Blockers And Gates

| Gate ID | Source node ID / status | Why high impact | Affected architecture elements | Affected acceptance criteria or implementation work | Owner | Exact exit condition | Next action |
| --- | --- | --- | --- | --- | --- | --- | --- |
{{high_impact_gate_rows}}

Do not mark the handoff ready for planning while a blocking exit condition is unmet.

## Ordered Proof-Of-Concept Coverage

Every active `needs_poc` node maps to a PoC task or gate below, and every PoC maps back to an active `needs_poc` node.

| Order | PoC ID | needs_poc node ID | Hypothesis | Dependencies | Smallest authorized validation action | Success threshold | Failure threshold | Evidence output | Decision / architecture / acceptance unlocked | Owner / environment | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
{{poc_coverage_rows}}

Stage 3 defines these tasks but does not execute them.
