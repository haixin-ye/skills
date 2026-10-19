# Stage 2: Decision-Driven Feasibility Research

Research from the position of an engineer trying to make a product decision, not from the position of a commentator describing a topic. Research is justified only when it can resolve an active decision-tree node or test an explicit feasibility premise.

## Entry and scope

Start from the latest confirmed product definition and current decision tree. If an existing `full` workspace has a confirmed definition but lacks a decision tree, perform **Legacy workspace migration** from `decision-tree.md` before research. Preserve settled history and do not repeat discovery unless migration exposes a substantive conflict.

For `full` discovery, every material investigation must name an active `decision_node`. For a bounded `focused` investigation that has no decision tree, assign a stable feasibility-premise ID such as `premise-001` and use it in place of a node link; do not create a full tree merely to satisfy this rule.

Do not research every possible feasibility dimension by default. Investigate only dimensions that can affect the user's verdict, principal risks, technical direction, next PoC, or recommended action. A descriptive topic without such a link is out of scope.

## Define each research item before searching

Create a research item for each material investigation and record:

- `decision_node`: the active decision-tree node ID, or the explicit feasibility-premise ID for focused work;
- `decision_it_can_change`: the verdict, recommendation, constraint classification, risk rating, path choice, or downstream decision that could change;
- `research_question`: a testable question rather than a broad topic;
- `sufficient_evidence`: the evidence threshold that would resolve or classify the item, including the source quality, coverage, recency, and environment specificity required;
- `fallback_poc`: the smallest PoC or validation action to use if desk research cannot meet the threshold;
- `invalidation_condition`: the upstream decision, version, policy, environment, assumption, or contrary evidence that would make the conclusion stale;
- `priority_rationale`: how the item can change the recommendation, unblock downstream decisions, or reduce expensive risk;
- `status`: `queued`, `researching`, `resolved`, `needs_poc`, `deferred`, or `out_of_scope`.

Do not let a source discovered during browsing silently broaden the queue. Add a new research item only when it has a decision or premise link and outranks remaining work under the rules below.

## Priority order

Rank items by their ability to change the recommendation, unblock downstream decisions, and reduce costly or irreversible risk. Within that decision value, prefer:

1. potential blockers against a hard constraint;
2. facts that can reverse the feasibility verdict;
3. permissions, security, privacy, compliance, legal, or licensing constraints;
4. the existence of a core technical capability or required integration;
5. the largest remaining environment or operational uncertainty;
6. differentiation from the closest credible alternative;
7. ordinary implementation or descriptive detail.

Do not research a low-value detail while a higher-ranked item could invalidate the whole direction. Re-rank after every material finding because a resolved blocker may expose a new frontier.

## Research sequence

1. Read the linked node or premise, its dependencies, impact, and current evidence.
2. Define the research item and its sufficient-evidence threshold before searching.
3. Seek the highest available source tier that can support the exact claim.
4. Compare evidence with the threshold; record conflicts, scope limits, version boundaries, and environmental dependencies.
5. Mark the conclusion `verified`, `reasoned_inference`, or `needs_poc` according to `evidence-standards.md`.
6. If the finding fills an unresolved item without contradicting current state, update the linked decision node or premise, affected risk, and dependent conclusions. If it overturns a resolved or assumed conclusion, use the replacement and recursive invalidation process below instead of overwriting the node.
7. If the threshold cannot be met efficiently, stop desk research and record the smallest `fallback_poc` or validation action.
8. Re-rank the queue and apply the stopping rule before opening another investigation.

When comparable products or open-source implementations matter, determine how each solution actually works and whether it satisfies the hard constraints. Marketing text can establish a product claim, but not an unobserved architecture.

## Evidence that overturns current state

New evidence never silently overwrites a `resolved` or `assumed` node. When a material finding contradicts its current resolution, invoke the complete **Upstream changes and invalidation** procedure in `decision-tree.md`:

1. Preserve the old answer, rationale, status, and evidence. Create a replacement node with a new stable ID and record the triggering finding, source IDs, `replacement_node_id`, and `change_reason`.
2. Mark the contradicted `fact`, `assumption`, or `experiment` result `stale`. Evidence alone cannot rewrite a user's value choice or binding constraint: when a finding conflicts with a `user_decision` or `constraint`, keep that node active, create a new factual node that exposes the incompatibility, invalidate any dependent conclusion or assumption that claimed compatibility, and ask only the resulting user-owned frontier choice. Mark a `user_decision` or `constraint` `superseded` only if the user actually replaces it; then apply the same full invalidation procedure.
3. Perform recursive invalidation across reverse `depends_on` edges with a `visited` set. Mark every direct and transitive active dependent `stale`, including queued `open`, `needs_research`, and `needs_poc` work; create replacement nodes for still-material pending work.
4. Enumerate affected node IDs and every product-definition, research, competitor, risk, verdict, technical-path, solution, or handoff artifact that cites them. Tell the user which conclusions and artifact paths are no longer current.
5. Recompute and persist the frontier, re-rank the research queue, and invalidate any summary, verdict, recommendation, or PoC plan that used the overturned branch. Apply the atomic summary-revision rule when semantic summary content changes.

Record the complete transition in the research dossier. Do not issue or retain a verdict while an active conclusion depends on the stale or superseded branch.

## Evidence record

Follow `evidence-standards.md` and preserve its mutually exclusive source tiers. Record exactly one tier for every meaningful source:

- `tier_1_authoritative_primary`: binding or normative authority for the claim, including enacted law or regulation, a ratified standard or specification, an official API/platform contract, or first-party source code;
- `tier_2_first_party_operational`: first-party but non-normative product/help documentation, release notes, official issue trackers, or maintainer statements;
- `tier_3_independent_research`: peer-reviewed research, original empirical work, or reputable independent technical testing;
- `tier_4_secondary`: independent analysis, tutorials, forums, or social posts used only as supplementary or discovery evidence.

For each source record its URL, title, publisher, source type, source tier, access date, `access_status` (`accessible`, `partially_accessible`, or `inaccessible`), claims supported, and confidence. For each material finding record its claim status (`verified`, `reasoned_inference`, or `needs_poc`), source IDs, scope/version, uncertainty, and freshness risk.

An inaccessible page, search snippet, unsourced summary, or low-tier source alone cannot support a `verified` finding. Treat it as a discovery lead, find accessible supporting evidence, or classify the conclusion as inference or `needs_poc`. Re-verify drift-prone product, API, policy, pricing, maintenance, availability, and regulatory claims with current evidence.

## Feasibility dimensions

Assess a dimension only when it is linked to a material node or premise:

- Technical: required capability exists and can be combined.
- Platform and permissions: operating system, browser, mobile, cloud, or API policy permits it.
- Operational: deployment, networking, credentials, data, and monitoring are manageable.
- Security and privacy: the design can protect users and data at the intended scope.
- Legal and licensing: use, redistribution, data acquisition, and dependencies are permitted.
- Product: the pain is real and the idea differs meaningfully from existing solutions.
- Delivery: an MVP can be scoped and validated within a realistic effort.

## Stopping rule

After each material finding and before expanding the queue, ask whether additional evidence has a realistic chance of changing any of:

- the feasibility verdict;
- a principal risk or blocker;
- the recommended technical direction;
- the next PoC or validation action;
- the recommended action for the user.

Stop expanding research when the answer is no for every item. Also stop desk research on an individual item when its predefined sufficient-evidence threshold is met, or when further browsing is less informative than its fallback PoC. Do not continue merely to make the dossier look comprehensive.

Before completing Stage 2, record the `stopping_rationale`, remaining uncertainty, deferred or out-of-scope items, and why none justifies more research now. A residual high-impact uncertainty must become `needs_poc`, a named condition on the verdict, or a reason the verdict cannot yet be issued; it must not disappear into prose.

## Verdict vocabulary

Use one of these conclusions and explain it:

- `viable`: no material blocker found; remaining work is normal engineering.
- `viable_with_conditions`: viable only if stated assumptions or PoCs succeed.
- `not_recommended_now`: technically possible, but blocked by cost, permissions, weak differentiation, or disproportionate complexity.
- `not_viable_under_constraints`: a hard constraint conflicts with a verified technical, legal, or platform limitation.

