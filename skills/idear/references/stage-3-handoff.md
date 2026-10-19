# Stage 3: Technical Path And Development Handoff

Stage 3 begins only after the user elects to pursue the idea, asks for an implementation approach, or requests a development handoff. It translates confirmed discovery into planning inputs; it does not implement the product.

## Start from authoritative state

Read `project-context.yaml`, the latest product definition, feasibility report, research dossier, risk register, and decision log. Validate the decision-tree graph before using it. Do not repeat settled discovery, promote an assumption to fact, or treat a stale or superseded branch as current.

`project-context.yaml` owns `technical_direction` and the authoritative Stage 3 state; every Stage 3 artifact is a projection of that machine state.

### Recheck summary confirmation

A Stage 3 state may be `ready-for-planning` only when `summary.confirmation.confirmation_status` is `confirmed` and `summary.confirmation.current_revision` equals `summary.confirmation.confirmed_revision`. Otherwise set `stage3.handoff_readiness` to `blocked`, create an open summary-confirmation `GATE-###`, and show its exit condition. This includes a Stage 2 semantic mutation: when research changes summary content, the atomic summary rule advances `current_revision` and resets `confirmation_status` to `pending`; the previous `confirmed_revision` cannot authorize the changed definition.

Expose the current revision, confirmed revision, and confirmation status in `08-ai-handoff.md`. Do not clear the gate until the user explicitly confirms the current revision and the authoritative confirmation fields are updated.

### Stable identifiers

Use stable IDs across all Stage 3 artifacts:

- retain decision-tree node IDs for decisions, facts, experiments, and constraints;
- assign `REQ-###` to material product requirements and `SC-###` to user success conditions;
- assign `PATH-###`, `ARCH-###`, `AC-###`, and `POC-###` to paths, architecture elements, acceptance criteria, and PoC tasks;
- assign `TRACE-###` to requirement/success trace rows, `GOV-###` to decision/constraint governance rows, and `GATE-###` to blockers or gates;
- never renumber or reuse an ID within the workspace.

### Separate candidate provenance from selection

Candidate-path provenance is exactly one of:

- `proposed`: a candidate introduced for comparison, with no agent or user commitment;
- `recommended`: the agent's evidence-backed preference, not user approval;
- `user-confirmed`: the user explicitly accepted that path, with confirmation evidence recorded.

Overall selection lifecycle is separately exactly one of:

- `not-selected`: there is no user-selected path; `selected_path_id` is null;
- `recommended-not-confirmed`: the agent has a defensible recommended path, but `selected_path_id` remains null;
- `user-confirmed`: the user accepted the path and `selected_path_id` names it.

Represent a material technical-path choice with a `user_decision` node. Set candidate provenance and selection lifecycle to `user-confirmed` only when that node is `resolved` with the user's confirmation evidence. Permission to prepare a handoff, a positive feasibility verdict, or silence is not confirmation.

When an unresolved gate prevents a defensible recommendation, preserve candidate rows as `proposed`, keep lifecycle `not-selected`, keep `recommended_path_id` and `selected_path_id` null, and state `No recommendation — pending GATE-###`. Do not invent a recommendation to complete the template.

### Keep one machine-readable Stage 3 state

`project-context.yaml.stage3` is authoritative for `state_revision`, `handoff_readiness`, governing-direction node and evidence references, and the ordered blocker/gate registry. `project-context.yaml.technical_direction` is authoritative for selection lifecycle, recommended and selected path IDs, recommendation gates, and candidate provenance.

Synchronize a material Stage 3 change atomically: increment `stage3.state_revision` once and write that same revision and state to `06-technical-paths.md`, `07-initial-solution.md`, and `08-ai-handoff.md` before presenting any of them as current. Update all three artifact revision fields in `project-context.yaml` in the same change set. If a write is interrupted or revisions differ, treat the artifacts as stale, keep readiness blocked, and re-render them from `project-context.yaml`; never combine mixed revisions.

Every artifact must show the same state revision, readiness, selection lifecycle, selected/recommended path IDs, and ordered gate IDs. Attach new confirmation or validation evidence to the governing decision nodes. The gate registry order is authoritative; do not silently reorder or omit a gate in an artifact projection.

## Determine handoff readiness

Before describing an implementation path, inventory every current high-impact uncertainty and every invalidated branch still cited by a current artifact. An unresolved high-impact node includes a current node marked `open`, `needs_research`, or `needs_poc`, plus a high-impact assumption that lacks required authorization. A `stale` or `superseded` node is historical, but a current artifact that still depends on it creates a blocker until remapped or withdrawn. A deliberately deferred item is also a blocker when it can invalidate the verdict, path, architecture, acceptance criteria, or an irreversible implementation step.

Record one readiness state:

- `blocked`: summary confirmation is not current or another unresolved high-impact item can invalidate the direction or required behavior;
- `conditional`: the summary is current and planning may proceed only inside named reversible boundaries while explicit non-blocking gates remain;
- `ready-for-planning`: the summary is current and no active blocker remains; this label does not authorize implementation.

Every blocker or gate must appear in the ordered registry with its order, stable ID, type and status, source node, impact, affected paths/architecture/acceptance work, owner, exact exit condition, and evidence. Do not describe a handoff as implementation-ready while a blocking gate remains open.

## Compare technical paths

For each realistic candidate path, document:

- stable path ID and candidate provenance;
- governing decision-node and hard-constraint IDs;
- core mechanism, prerequisites, and evidence already available;
- external services, hardware, accounts, credentials, permissions, and environmental assumptions;
- compatibility with each governing constraint;
- material performance, portability, complexity, cost, security, privacy, licensing, and maintenance trade-offs;
- linked `needs_poc` node IDs and PoC gates;
- the condition that would invalidate or eliminate the path.

Choose a recommendation only after meaningful comparison and only when open gates permit a defensible preference. If only one realistic path remains, identify the evidence or constraint that eliminated alternatives. A recommended path stays `recommended-not-confirmed` until the user accepts it.

Do not invent libraries, protocols, component boundaries, scale targets, latency goals, retention periods, or other implementation details unsupported upstream. Use `TBD`, preserve the source uncertainty, and create an approval or validation gate when the detail is material.

## Map success to acceptance

Extract user success conditions from the confirmed product definition and evidence. Assign each a stable `SC-###` ID while preserving the user's meaning. Every material requirement and success condition must map to objective acceptance and identify the responsible architecture, observable pass/fail condition, planned test or existing validation evidence, and current gate status.

Do not invent a numeric threshold, platform, environment, or workflow the user did not settle. When a material threshold is unspecified, write `TBD`, preserve the original wording, and add a user-approval gate. Acceptance criteria may operationalize confirmed requirements but must not silently define the user's values.

## Maintain two complete traceability mappings

Keep two distinct canonical tables in `07-initial-solution.md`:

1. **Requirement and success traceability.** Every material `REQ-###` appears in at least one complete `TRACE-###` row through an `ARCH-###` element, an `AC-###` criterion, and validation evidence or a planned test. Every `SC-###` appears in at least one such row linked to a requirement. Split many-to-many relationships into multiple rows with stable trace IDs; do not hide missing cardinality in prose.
2. **Decision and constraint governance.** Every current governing `user_decision` or `constraint` node appears in at least one `GOV-###` row linked directly to affected `PATH-###` or `ARCH-###` IDs and to validation evidence or an explicit `GATE-###`. Do not force a governing node through a fictional product requirement, success condition, or acceptance criterion.

The requirement table may list governing decision/constraint IDs for context, but that does not replace the governance table. Carry both snapshots into `08-ai-handoff.md`; its requirement snapshot must preserve the canonical `Trace ID` and governing decision/constraint IDs. Use the same IDs in all artifacts. Do not attach a current row to a stale or superseded branch; preserve historical links only to explain rejected paths.

## Map every PoC bidirectionally

Every active decision-tree node with status `needs_poc` must map to at least one ordered `POC-###` task or gate. Every PoC task must map back to an active `needs_poc` node; do not create an orphan PoC merely because it would be interesting.

For each mapping, record the source node and hypothesis, prerequisites and dependent PoCs, smallest authorized validation action, explicit success and failure thresholds, evidence output, decision or architecture it unlocks, owner, environment or permission, and status.

Keep high-impact PoCs as gates before dependent architecture or implementation work. Stage 3 defines these tasks; it does not perform a PoC unless the user separately authorizes execution in an appropriate workflow.

## Preserve authority boundaries in the handoff

The future development agent must be able to start planning without repeating basic discovery and distinguish confirmed user decisions and hard constraints, agent recommendations, proposed details, assumptions, required PoCs and blockers, and stale or superseded history.

Make `08-ai-handoff.md` self-contained for success semantics: reproduce each `SC-###` item's actual user success-condition text, linked requirement IDs, acceptance-criterion IDs, and source evidence or approval gate. An ID-only list or a pointer to another artifact is insufficient.

Include a change-authority matrix stating what the next agent may refine, must preserve, must ask the user to approve, and must validate. A later agent may propose alternatives but must not overwrite a user-confirmed decision, hard constraint, or explicit non-goal without a new user decision and normal invalidation.

## Handoff contract

The three Stage 3 artifacts together include the product summary; confirmation state; requirements, success conditions, constraints, and non-goals; validated facts; assumptions and gates; existing solutions; candidate paths and selection lifecycle; preliminary architecture; both traceability mappings; complete PoC coverage; risks; authority; and readiness.

Stage 3 produces planning and validation artifacts only. Do not generate code, modify a product repository, install dependencies, run PoCs, or make irreversible choices while using this skill. A handoff, user-confirmed path, or `ready-for-planning` status does not authorize implementation. If the user asks to build, finish the handoff and transfer to the relevant planning or implementation workflow.
