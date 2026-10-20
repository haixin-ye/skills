# Feasibility Report Design

The feasibility report is a decision document for the user, not a transcript of research.

## Required sections

1. Cover and executive verdict
2. Product definition
3. Problem and intended value
4. Feasibility assessment
5. Verified technical foundations
6. Existing products and open-source comparison, or its explicit scoped omission
7. Permissions, security, and operating constraints
8. Risks and unknowns
9. Recommendation and next proof-of-concept
10. Sources

## Conditional comparison section

Always render the section heading so the report's research scope is explicit, then render exactly one branch:

- When an active decision node requires competitor, existing-solution, or differentiation evidence, render the decision-linked summary from `03-competitor-analysis.md` and show the governing node IDs.
- When no such active decision node exists, render exactly `Not investigated — outside the active decision scope`. Competitor or comparison research is not required for this branch; do not perform or start it merely to populate the report.

The omission is a scope statement, not a negative finding about alternatives. Do not present it as evidence that no competing solution exists.

## Visual direction

- Use a restrained professional layout: white background, charcoal text, and muted teal as the primary accent.
- Use amber for risks and dark red for blockers, but always add labels and text; color alone must not convey status.
- Avoid gradients, marketing-style hero blocks, decorative graphics, and nested cards.
- Use compact comparison tables, a concise feasibility scorecard, and a risk table only where they improve scanning.
- Put title, date, and verdict on the cover. Put page number and report title in footer/header.
- Use `Noto Sans SC` or `Microsoft YaHei` for Chinese content and `Inter` or `Aptos` for Latin text when available.
- Preserve readable line lengths, adequate white space, and sensible table page breaks in PDF output.
- Make all web citations clickable in PDF output where supported.

## PDF generation

Always create the Markdown report. When a PDF tool or renderer is available, render from a dedicated HTML/CSS layout or equivalent document template, inspect the result, and correct clipping, overflow, broken tables, or unreadable Chinese typography before delivery.

