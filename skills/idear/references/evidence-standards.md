# Evidence And Source Standards

## Source tiers

Assign every recorded source exactly one of these mutually exclusive tiers according to the source itself and its authority for the supported claim:

1. `tier_1_authoritative_primary`: binding or normative authority—enacted law or regulation, a ratified standard or specification, official API/platform contract documentation, or first-party source code for the behavior being claimed.
2. `tier_2_first_party_operational`: first-party but non-normative operational or product evidence—product/help documentation, release notes or changelogs, official issue trackers, and maintainer statements.
3. `tier_3_independent_research`: independent primary evidence—peer-reviewed research, original empirical work, or reproducible technical testing by a reputable independent source.
4. `tier_4_secondary`: secondary or discovery evidence—independent analyses, tutorials, forums, and social posts.

Use the highest-authority tier available for the exact claim, but do not assign multiple tiers to one source record. If one compound record contains materially different source types, split it into separate source records. An official domain alone does not make a page tier 1: a normative API contract can be tier 1, while product marketing, help content, or a maintainer comment is tier 2. Tier and confidence are separate; a high-tier source can still be incomplete, stale, or inapplicable.

Prefer tiers 1–3 when available. Tier 4 may support discovery or context but cannot alone establish a material `verified` claim.

## Claim status

Every material claim in the research dossier should be marked:

- `verified`: direct evidence supports the exact claim.
- `reasoned_inference`: evidence supports the conclusion indirectly; state the reasoning.
- `needs_poc`: documentation is insufficient or the outcome depends on the user's environment.

## Competitor evidence

For a comparable tool, do not infer its architecture from marketing text. Use official architecture documentation, source code, deployment documentation, protocol documentation, or carefully labelled uncertainty.

## Freshness

Record the date each web source was accessed. Re-verify claims about active projects, commercial products, APIs, policies, pricing, and regulations before implementation if the research is no longer current.

Also record `access_status` as exactly `accessible`, `partially_accessible`, or `inaccessible`. An inaccessible source or search snippet is a discovery lead, not evidence for a verified conclusion.

