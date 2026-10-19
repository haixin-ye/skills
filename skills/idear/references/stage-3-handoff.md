# Stage 3: Technical Path And Development Handoff

Stage 3 begins only after the user elects to pursue the idea, asks for an implementation approach, or requests a development handoff. It translates confirmed discovery into planning inputs; it does not implement the product.

## Start from authoritative state

Read `project-context.yaml`, the latest confirmed product definition, the feasibility report, research dossier, risk register, and decision log. Validate the decision-tree graph before using it. Do not repeat settled discovery, promote an assumption to fact, or treat a stale or superseded branch as current.

Use stable IDs across all Stage 3 artifacts:

- retain decision-tree node IDs for decisions, facts, experiments, and constraints;
- assign `REQ-###` to material product requirements and `SC-###` to user success conditions;
- assign `PATH-###`, `ARCH-###`, `AC-###`, and `POC-###` to technical paths, architecture elements, acceptance criteria, and PoC tasks respectively;
- never renumber or reuse an ID within the workspace.

Direction status must be exactly one of:

- `proposed`: a candidate introduced for comparison, with no agent or user commitment;
- `recommended`: the agent's evidence-backed preference, not user approval;
- `user-confirmed`: the user explicitly accepted that direction, with confirmation evidence recorded.

Do not infer `user-confirmed` from permission to prepare a handoff, a positive feasibility verdict, or silence. A recommendation remains `recommended` until the user accepts it.

Represent a material technical-path choice with a `user_decision` node. Set a path to `user-confirmed` only when that node is `resolved` with the user's confirmation evidence; an artifact label alone is insufficient. If the user replaces the path later, preserve and invalidate it through the normal decision-tree procedure.

After every material Stage 3 change, update `project-context.yaml`: synchronize `technical_direction.status`, `recommended_path`, and `alternatives`; update the Stage 3 artifact paths; and attach new confirmation or validation evidence to the linked decision nodes. Keep IDs and direction status consistent across machine state and all three artifacts.

## Determine handoff readiness

Before describing an implementation path, inventory every current high-impact uncertainty and every invalidated branch still cited by a current artifact. An unresolved high-impact node includes a current node marked `open`, `needs_research`, or `needs_poc`, plus a high-impact assumption that lacks the authorization required by the decision-tree rules. A `stale` or `superseded` node is historical rather than active, but any current path, architecture element, acceptance criterion, or artifact that still depends on it creates a blocker until it is remapped or withdrawn. A deliberately deferred item is also a blocker when it can invalidate the feasibility verdict, chosen path, architecture, acceptance criteria, or an irreversible implementation step.

Record one readiness state:

- `blocked`: an unresolved high-impact item can invalidate the direction or required behavior;
- `conditional`: planning may proceed only within named reversible boundaries while explicit gates remain;
- `ready-for-planning`: no active blocker remains, but implementation is still not authorized by this label.

Every unresolved high-impact item must appear in the blocker-and-gate register with its node ID, affected paths or architecture, affected acceptance criteria or work, owner, exact exit condition, and next action. Do not describe a handoff as implementation-ready while a blocking gate remains unsatisfied.

## Compare technical paths

For each realistic path, document:

- its stable path ID and direction status;
- governing decision-node IDs and governing hard-constraint IDs;
- core mechanism, prerequisites, and evidence already available;
- required external services, hardware, accounts, credentials, permissions, and environmental assumptions;
- compatibility with each governing constraint;
- performance, portability, complexity, cost, security, privacy, licensing, and maintenance trade-offs that matter to the current decision;
- linked `needs_poc` node IDs and their PoC gates;
- the condition that would invalidate or eliminate the path.

Choose a recommendation only after comparing meaningful alternatives. If only one realistic path exists, identify which evidence or constraint eliminated the alternatives. State the recommended path as `recommended` until the user confirms it, and record any user confirmation with its evidence reference.

Do not invent libraries, protocols, component boundaries, scale targets, latency goals, retention periods, or other implementation details that are not supported upstream. Use `TBD`, preserve the source uncertainty, and create an approval or validation gate when the missing detail is material.

## Map success to acceptance

Extract user success conditions from the confirmed product definition and conversation evidence. Assign each one a stable `SC-###` ID while preserving the user's meaning. Every user success condition must map to at least one objective `AC-###` acceptance criterion and identify:

- the related product requirement ID;
- the architecture element responsible for the behavior;
- an observable pass/fail condition;
- the planned test or existing validation evidence;
- the current evidence or gate status.

Do not invent a numeric threshold, platform, environment, or workflow the user did not settle. When a material threshold is unspecified, write `TBD`, preserve the original success wording, and add a user-approval gate. Acceptance criteria may define observable behavior from confirmed requirements, but they must not silently define the user's values.

## Maintain canonical traceability

Create one canonical traceability table in `07-initial-solution.md`. Each material current requirement, decision node, constraint, or success criterion must trace through:

`upstream node or success criterion -> product requirement -> architecture element -> acceptance criterion -> validation evidence or planned test -> gate/status`

Keep the same IDs in `06-technical-paths.md` and the traceability snapshot in `08-ai-handoff.md`. A row may use `TBD` only when the corresponding blocker or approval gate is explicit. Do not attach a current requirement to a stale or superseded branch. Preserve historical links separately when they explain why a path was rejected.

## Map every PoC bidirectionally

Every active decision-tree node with status `needs_poc` must map to at least one ordered `POC-###` task or gate. Every PoC task must map back to an active `needs_poc` node; do not create an orphan PoC merely because it would be interesting.

For each mapping, record:

- source `needs_poc` node ID and hypothesis;
- prerequisites and dependent PoC IDs;
- smallest authorized validation action;
- explicit success and failure thresholds;
- evidence output and where it will be recorded;
- decision, path, architecture element, or acceptance criterion it unlocks;
- owner, required environment or permission, and current status.

Keep high-impact PoCs as gates before architecture or implementation steps that depend on them. Stage 3 defines these tasks; it does not perform a PoC unless the user separately authorizes execution in an appropriate workflow.

## Preserve authority boundaries in the handoff

The future development agent must be able to start planning without repeating basic discovery and must be able to distinguish:

- confirmed user decisions and hard constraints that it must preserve;
- agent recommendations that need user acceptance before becoming final;
- proposed details it may refine within governing constraints;
- assumptions that remain conditional and list their invalidation conditions;
- required PoCs and unresolved high-impact blockers that must be cleared first;
- stale or superseded history that must not govern new work.

Make `08-ai-handoff.md` self-contained for success semantics: reproduce each `SC-###` item's actual user success-condition text, linked requirement IDs, acceptance-criterion IDs, and source evidence or approval gate. An ID-only list or a pointer to `07-initial-solution.md` is insufficient because a new agent must understand each success condition without reconstructing it elsewhere.

Include a change-authority matrix stating what the next agent may refine, what it must preserve, what requires user approval, and what requires validation evidence. A later agent may propose alternatives, but it must not overwrite a `user-confirmed` decision, hard constraint, or explicit non-goal without a new user decision and the normal invalidation process.

## Handoff contract

The three Stage 3 artifacts must together include:

- product summary and user value;
- confirmed requirements, user success conditions, hard constraints, and explicit non-goals;
- validated facts with source IDs and current scope;
- assumptions, open items, blockers, and environment-dependent questions;
- existing solutions and differentiation;
- proposed, recommended, and user-confirmed technical directions without conflating them;
- preliminary architecture and module responsibilities linked to governing IDs;
- MVP scope, acceptance criteria, and canonical traceability;
- complete `needs_poc` coverage and ordered PoC gates;
- risks, approval requirements, change authority, and readiness state.

Stage 3 produces planning and validation artifacts only. Do not generate code, modify a product repository, install dependencies, run PoCs, or make irreversible technical choices while using this skill. Do not imply that a handoff, a `user-confirmed` technical direction, or `ready-for-planning` status authorizes implementation. If the user asks to build, finish the handoff and transfer to the relevant planning or implementation workflow.
