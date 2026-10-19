# Scope Routing

Choose the shallowest depth that can answer the user's actual question. Classify the request before creating a directory or file; artifact creation is an outcome of the classification, never a prerequisite for it.

The depth names are internal. Do not make the user choose a mode. Infer the depth from the request and respect an explicit instruction such as "just answer this question", "investigate only this uncertainty", or "prepare a full handoff".

## Depths

| Depth | Use when | Outcome | Default artifacts |
| --- | --- | --- | --- |
| `quick` | The request is one bounded, low-risk factual question and a direct answer is sufficient. | Answer inline, with the material conditions and boundaries. | None; do not create a workspace. |
| `focused` | The user names one uncertainty whose resolution requires a bounded investigation. | Resolve only that uncertainty, give the verdict, sources, and smallest useful validation. | None. Persist only when materially useful or requested, and then create only `focused-assessment.md` and `sources.yaml`. |
| `full` | The request concerns a rough product or a decision surface that requires clarification, coupled feasibility work, or a durable development handoff. | Run product clarification, feasibility research, and the optional technical handoff under their existing gates. | The three-stage workspace described in `SKILL.md`. |

Prefer the narrower depth when a conditional answer can preserve accuracy. A long question is not automatically `full`, and a short question is not automatically `quick`.

## Quick Handling

Use `quick` only when the answer can stand alone without resolving product goals or multiple coupled choices.

- Answer the common case immediately. If an ambiguity remains, state the condition and its consequence rather than starting a questionnaire.
- Verify changing platform facts with current authoritative evidence and cite it in chat.
- State boundaries that materially qualify the answer, such as permissions, restricted environments, version limits, frames, execution contexts, or administrator requirements.
- Do not create or modify files, initialize project context, ask for a product definition, or apply a stage gate.
- If the user asks for a durable record, treat the persistence request under the focused artifact contract; this changes the output form, not the scope of the factual answer.

## Focused Handling

Use `focused` for exactly one named uncertainty. Keep every research step tied to that question.

1. Restate the question and binding constraints briefly.
2. Ask at most one clarification only when different answers would materially change the conclusion and a conditional answer would be misleading. Otherwise proceed with explicit conditions.
3. Investigate only the relevant capability, versions, APIs or mechanisms, permissions, limitations, and validation needed to resolve the named uncertainty.
4. Apply `references/evidence-standards.md`: classify material findings as `verified`, `reasoned_inference`, or `needs_poc`, and use current primary sources for drift-prone claims.
5. Give a concise chat conclusion, sources, and the smallest validation that removes the remaining uncertainty.

Do not add product clarification, market or competitor research, a complete risk register, a feasibility PDF, technical-path comparison, or a development handoff unless the user separately asks for broader discovery.

Persistence is materially useful when the user requests it, has designated an existing workspace for the result, or needs a durable record for a later continuation or handoff. Research effort alone does not make persistence necessary, and an explicit request for no report controls. When persistence applies:

- Use a user-named location first. Otherwise use `docs/idear/<YYYY-MM-DD>-<slug>/` in a project repository or `work/idear/<YYYY-MM-DD>-<slug>/` without one.
- Create only `focused-assessment.md` from `assets/templates/focused-assessment.md` and `sources.yaml` from `assets/templates/sources.yaml`.
- Do not create `project-context.yaml`, Stage 1/2/3 artifacts, or empty placeholders.

## When Full Discovery Is Warranted

Route an initial request directly to `full` when the user requests full discovery or a durable development handoff, or when a reliable answer inherently requires a product-level decision process. Signals include:

- ambiguity broader than one named uncertainty;
- multiple coupled decisions whose answers change one another;
- hard constraints that must be reconciled across the product rather than checked against one named question;
- safety, privacy, security, or compliance consequences that require system-level trade-offs rather than a bounded factual answer;
- high cost, irreversible commitments, or operational risk that require comparing paths;
- a durable handoff, implementation-ready context, or an explicit request for the full workflow.

These signals are about decision scope, not keywords. A focused question about one permission or one hard constraint remains focused when it can be answered without expanding the product decision surface.

## Escalation And User Control

Do not silently change a `quick` or `focused` request into `full` discovery. If broader ambiguity or coupled decisions emerge while answering:

1. Complete the safe, bounded portion when possible.
2. Name the unresolved issue and why the current depth cannot settle it.
3. Offer full discovery and describe the additional scope and artifacts.
4. Start the full workflow only after the user accepts, unless their original request already authorized that depth.

The user may request a shallower or deeper treatment at any time. Honor a shallower request by answering what can be answered safely and labelling what remains unresolved. Honor a deeper request without making the user repeat settled facts. Never require the user to know or select the internal depth names.
