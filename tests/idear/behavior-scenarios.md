# Idear Behavior Scenarios

These are black-box behavior checks for the complete `skills/idear/` bundle. Evaluate observable actions and artifacts, not exact wording.

## Baseline: v1 at `860fbdd`

Three independent read-only evaluations were run before changing the skill.

| Scenario | v1 observation | Baseline result |
| --- | --- | --- |
| Bounded fact | The fixed Stage 1 entry and Stage 2 output contract lead to a workspace, product definition, confirmation gate, and full report set despite an explicit no-report request. | Fails proportionality and user-scope preservation. |
| Focused investigation | The skill has the right evidence rules but no focused route, no focused completion gate, and no lightweight artifact contract. Models must either overrun the requested scope or improvise around the skill. | Fails deterministic focused behavior. |
| Complex rough idea | The skill names useful clarification dimensions but has no dependency graph, frontier, impact ranking, or state that proves critical branches were closed. | Fails dependency-aware completeness. |
| Constraint reversal | The skill says to revisit conclusions and preserve superseded decisions, but records no dependency edges, so it cannot reliably enumerate or invalidate all downstream conclusions. | Fails systematic invalidation. |

These failures are the RED evidence for the v2 changes below.

## Scenario 1: Bounded factual question

**Request**

> Can a Chrome extension read the current page DOM? I only want the factual answer and do not need a report.

**Pass criteria**

- Route to quick handling rather than full product discovery.
- Do not create or modify files unless the user asks to persist the answer.
- Do not ask for a product definition, target market, competitor analysis, or Stage 1 confirmation.
- Answer the common case immediately, using current official evidence for changing platform facts.
- State material boundaries such as permissions, restricted pages, frames, and execution worlds.
- If one ambiguity remains, answer the common case first instead of blocking on a questionnaire.

## Scenario 2: Focused technical investigation

**Request**

> Investigate only whether macOS can capture system audio without a virtual audio driver. Give me the conclusion, sources, and smallest validation. Do not define the whole product for me.

**Pass criteria**

- Route to focused handling; do not force full product discovery.
- Ask only a clarification that could materially change the technical conclusion, and prefer conditional answers when that avoids an unnecessary round trip.
- Limit research to relevant macOS versions, native APIs, permissions, limitations, and the smallest validation.
- Classify material findings as `verified`, `reasoned_inference`, or `needs_poc`.
- Default to a concise chat answer. If persistence is useful or requested, create at most `focused-assessment.md` and `sources.yaml`.
- Do not create a product definition, competitor analysis, complete risk register, feasibility PDF, technical-path report, or development handoff.
- Do not silently escalate to full discovery; offer it only after completing the focused request.

## Scenario 3: Complex rough product idea

**Request**

> Build a remote-control tool that works only on a LAN, has no accounts, and never depends on cloud services.

**Pass criteria**

- Route to full discovery and preserve the three stated constraints without asking for them again.
- Create material decision nodes with stable IDs, kinds, dependencies, impact, and status.
- Start with a question that closes multiple downstream branches, such as the concrete user scenario, rather than premature implementation detail.
- Ask only frontier questions whose prerequisites are settled.
- Ask one question by default and no more than three independent, easy questions in a round.
- Agent-researchable facts become research nodes; user value choices remain user decisions; environment-dependent claims become PoC nodes.
- Stage 1 cannot complete while a high-impact node is silently open.

## Scenario 4: Constraint reversal

**Continuation**

> Cloud relay is now allowed when direct LAN connectivity fails.

**Pass criteria**

- Preserve the old no-cloud decision and mark it `superseded`.
- Record the replacement decision and its rationale.
- Mark every direct and transitive dependent conclusion `stale`.
- Explicitly list affected authentication, identity, networking, privacy, cost, deployment, competitor, architecture, risk, and PoC nodes when applicable.
- Reclassify affected nodes as questions, research, decisions, or PoCs and recompute the frontier.
- Do not issue a new verdict while an active conclusion still relies on the superseded constraint.

## Scenario 5: Existing product definition

**Request**

> The confirmed product definition and constraints are already in this workspace. Research whether the required APIs exist and stop after the feasibility verdict.

**Pass criteria**

- Inspect existing state and enter the earliest incomplete stage.
- Do not repeat settled Stage 1 questions.
- Do not enter Stage 3 without the user's request.
- Re-verify drift-prone facts and preserve the existing decision history.

## Cross-scenario invariants

- User scope beats optional workflow expansion.
- Artifacts are proportional to decision scope and persistence need.
- Facts are researched by the agent; user choices are asked of the user; environment claims are validated by PoC.
- Recommendations do not define the user's goals or values.
- Every material conclusion is traceable to evidence, explicit reasoning, an assumption, or a PoC.
- A changed upstream decision invalidates dependent conclusions rather than silently overwriting them.
- The skill never begins implementation.

## Stage 2: Decision-driven research assertions

Apply these assertions to both the focused investigation and the full-discovery research scenarios:

- Every material investigation names the decision-tree node or explicit feasibility premise that caused it. Research without either link is out of scope.
- Every research item states which decision or recommendation it could change, what evidence would be sufficient, the fallback PoC or validation action when desk research is insufficient, and the condition that would invalidate its conclusion.
- Research order is driven first by the ability to change the recommendation, unblock downstream decisions, or reduce expensive risk; ordinary descriptive detail cannot displace a decision-critical item.
- The investigation stops expanding when additional evidence is unlikely to change the verdict, principal risks, technical direction, next PoC, or recommended action. The dossier records that stopping rationale and any residual uncertainty.
- Evidence records preserve source tier, access date, access status, claim status, and uncertainty; inaccessible or low-tier evidence cannot silently support a `verified` conclusion.
- When focused work is persisted, `focused-assessment.md` records the research priority rationale and gives every material finding its own claim status, source IDs, scope/version applicability, uncertainty, and freshness risk; `sources.yaml` remains the only other focused artifact.
- A legacy v1 workspace with a confirmed product definition but no `decision_tree` is migrated from its existing requirements, constraints, decisions, assumptions, facts, evidence, and history before Stage 2. Settled content is not asked again unless migration exposes a substantive conflict.
- When Stage 2 evidence overturns a resolved or assumed node, the old node is preserved as `stale` or `superseded`, a replacement node is created, all direct and transitive dependents and affected artifacts are recorded, the frontier is recomputed, and no stale verdict survives.
- A persisted focused assessment records required research-item `status` using only `queued`, `researching`, `resolved`, `needs_poc`, `deferred`, or `out_of_scope`.
- Full-discovery `research-dossier.md` and `risk-register.md` accept decision-node IDs only; focused feasibility-premise IDs remain exclusive to `focused-assessment.md`.
- Every source has exactly one mutually exclusive tier, and `sources.yaml` uses neutral placeholders plus explicit allowed values for source type, tier, access status, and confidence rather than pre-asserting an official, accessible, high-confidence source.

## Stage 3: Development-handoff traceability assertions

Apply these assertions when the user elects to pursue a full-discovery idea and asks for an implementation approach or a development handoff:

- Every user success condition receives a stable success-criterion ID and maps to at least one objective acceptance criterion. Each acceptance criterion identifies its architecture element, planned test or existing evidence, and current gate status; an unspecified threshold remains an explicit approval gate rather than an invented number.
- Every candidate path and any recommended direction name the governing decision-node and hard-constraint IDs. Candidate provenance is exactly `proposed`, `recommended`, or `user-confirmed`; a recommendation never masquerades as user selection.
- `project-context.yaml` stays synchronized with selection lifecycle and Stage 3 artifact paths. A `user-confirmed` path is backed by a resolved user-decision node and confirmation evidence, not only an artifact label.
- Stage 3 rechecks `summary.confirmation`: `ready-for-planning` is forbidden unless `confirmation_status` is `confirmed` and `current_revision` equals `confirmed_revision`. A Stage 2 semantic mutation that advances the current revision and resets confirmation to `pending` creates a blocking reconfirmation gate.
- Overall selection lifecycle is separate from candidate-path provenance. With no defensible recommendation, lifecycle remains `not-selected`, selected path is null, and the artifacts may state `No recommendation — pending GATE-###`; candidate rows independently remain `proposed`, `recommended`, or `user-confirmed` as supported.
- Every active decision-tree node with status `needs_poc` maps to at least one ordered PoC task or gate, and every PoC task maps back to a `needs_poc` node. Each mapping states the hypothesis, success/failure threshold, evidence output, decision unlocked, and dependencies.
- Every unresolved high-impact node remains visible as a blocker or gate, including the affected architecture, acceptance criteria, or implementation work and the exact exit condition. Stage 3 does not describe the handoff as implementation-ready while a blocking condition remains unsatisfied.
- Canonical trace and governance IDs remain consistent across `06-technical-paths.md`, `07-initial-solution.md`, and `08-ai-handoff.md`.
- Traceability uses two complete mappings: every material requirement and success condition reaches architecture, acceptance, and validation; every current governing decision or constraint reaches affected paths or architecture and validation evidence or an explicit gate. Governance nodes are not forced through a fictional product-requirement chain.
- The handoff separates user-confirmed decisions and constraints, agent recommendations, proposals, assumptions, and required PoCs. It tells the next development agent what it may refine, what it must preserve, what needs user approval, and what must be validated first without repeating settled discovery.
- Unresolved high-impact blockers are not mixed with deliberately deferred or lower-impact open items; both remain visible with ownership and revisit conditions.
- The self-contained handoff carries each confirmed product requirement and each user success condition's actual text with stable IDs, requirement and acceptance mappings, and source evidence or gate; the next agent does not need another artifact to reconstruct an `SC-###` meaning.
- Stage 3 uses `TBD` or an explicit gate for unsupported implementation detail. It creates planning and validation artifacts only, does not generate code or perform PoCs, and does not imply implementation authorization.
- `project-context.yaml.stage3` is the authoritative machine state for handoff readiness, governing-direction provenance, and the ordered blocker/gate registry. A material change advances one Stage 3 state revision and synchronizes that revision atomically across all three Stage 3 artifacts.
