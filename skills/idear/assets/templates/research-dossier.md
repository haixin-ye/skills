# Research Dossier: {{project_name}}

**Stage:** Feasibility research

**Last updated:** {{date}}

## Decision-Linked Research Queue

Every material item must name an active `decision_node`; focused work without a tree uses a stable feasibility-premise ID in that field.

| ID | decision_node | Research question | Decision it can change | Priority rationale | sufficient_evidence | fallback_poc / validation action | invalidation_condition | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
{{research_item_rows}}

## Preconditions To Verify

| ID | decision_node | Required premise | Impact | Status | Evidence or validation action |
| --- | --- | --- | --- | --- | --- |
{{precondition_rows}}

## Findings

| Finding ID | decision_node | Finding | Claim status | Source IDs | Scope / version | Uncertainty and freshness risk | invalidation_condition |
| --- | --- | --- | --- | --- | --- | --- | --- |
{{finding_rows}}

Claim status must be `verified`, `reasoned_inference`, or `needs_poc`. An inaccessible source or search snippet cannot by itself support `verified`.

## Source Coverage

| Source ID | Source tier | Accessed on | Access status | Claims supported | Confidence / limitations |
| --- | --- | --- | --- | --- | --- |
{{source_coverage_rows}}

Use access status `accessible`, `partially_accessible`, or `inaccessible`; keep full URLs, titles, publishers, and source types in `sources.yaml`.

## Decision Updates

| decision_node | Previous state | Research result | New state or recommendation | Evidence refs | Affected downstream nodes / artifacts |
| --- | --- | --- | --- | --- | --- |
{{decision_update_rows}}

## Items Requiring A Proof Of Concept

| decision_node | Unresolved premise | Why desk research is insufficient | fallback_poc / validation action | Success / failure threshold | Decision affected |
| --- | --- | --- | --- | --- | --- |
{{needs_poc_rows}}

## Environment, Permission, Security, And Licensing Constraints

{{constraints}}

## Conclusion Rationale

{{conclusion_rationale}}

## Research Stopping Decision

- **stopping_rationale:** {{stopping_rationale}}
- **Remaining uncertainty:** {{remaining_uncertainty}}
- **Deferred / out of scope:** {{deferred_or_out_of_scope}}
- **Why more research is unlikely to change the verdict, principal risks, technical direction, next PoC, or recommended action:** {{marginal_research_value}}

