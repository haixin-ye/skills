# Focused Assessment: {{topic}}

**Date:** {{date}}

**decision_node / feasibility premise:** {{premise_id}}

## Question

{{question}}

## Constraints

{{constraints}}

## Decision Contract

- **Decision this can change:** {{decision_it_can_change}}
- **priority_rationale:** {{priority_rationale}}
- **sufficient_evidence:** {{sufficient_evidence}}
- **fallback_poc / validation action:** {{fallback_poc}}
- **invalidation_condition:** {{invalidation_condition}}

## Material Findings

Each material finding is one row. Fill `conclusion`, `claim_status`, `source_ids`, `evidence_or_reasoning`, `scope_version`, `uncertainty`, and `freshness_risk` independently; do not use a global evidence label as a substitute. `claim_status` must be `verified`, `reasoned_inference`, or `needs_poc`.

| Finding ID | conclusion | claim_status | source_ids | evidence_or_reasoning | scope_version applicability | uncertainty | freshness_risk |
| --- | --- | --- | --- | --- | --- | --- | --- |
{{material_finding_rows}}

## Verdict

{{verdict}}

## Next Validation

{{next_validation}}

## Research Stopping Decision

- **stopping_rationale:** {{stopping_rationale}}
- **Remaining uncertainty:** {{remaining_uncertainty}}

## Sources

{{source_list}}
