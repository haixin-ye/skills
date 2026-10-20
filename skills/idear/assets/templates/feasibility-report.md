---
title: "{{project_name}}"
subtitle: "Feasibility Assessment"
date: "{{date}}"
verdict: "{{verdict}}"
---

# {{project_name}}

## Executive Verdict

**Overall assessment:** {{verdict}}

{{executive_summary}}

| Dimension | Assessment | Why it matters |
| --- | --- | --- |
| Technical feasibility | {{technical_feasibility}} | {{technical_reason}} |
| Delivery complexity | {{delivery_complexity}} | {{delivery_reason}} |
| Main risk | {{main_risk}} | {{risk_reason}} |

## Product Definition

{{product_definition}}

## Problem And Intended Value

{{problem_and_value}}

## Verified Technical Foundations

{{technical_foundations}}

## Existing Solutions And Differentiation

{{#if competitor_analysis_in_scope}}
**Governing decision nodes:** {{competitor_decision_node_ids}}

{{competitor_summary}}
{{else}}
{{localized_out_of_scope_competitor_notice}}
{{/if}}

## Constraints And Risks

{{constraints_and_risks}}

## Recommendation

{{recommendation}}

## Smallest Next Validation

{{next_poc}}

## Sources

{{source_list}}

