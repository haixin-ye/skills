# Stage 2: Feasibility Research

Research from the position of an engineer trying to build the product, not from the position of a commentator describing it.

## Research sequence

1. Convert the product definition into testable prerequisites.
2. Find primary evidence for each prerequisite.
3. Identify comparable products and open-source implementations.
4. Determine how each comparable solution actually works and whether it satisfies the hard constraints.
5. Identify permissions, operational dependencies, costs, security concerns, and licensing constraints.
6. Separate confirmed capability from untested integration risk.
7. Propose the smallest proof-of-concept for the highest-risk premise.

## Feasibility dimensions

Assess each relevant dimension separately:

- Technical: required capability exists and can be combined.
- Platform and permissions: operating system, browser, mobile, cloud, or API policy permits it.
- Operational: deployment, networking, credentials, data, and monitoring are manageable.
- Security and privacy: the design can protect users and data at the intended scope.
- Legal and licensing: use, redistribution, data acquisition, and dependencies are permitted.
- Product: the pain is real and the idea differs meaningfully from existing solutions.
- Delivery: an MVP can be scoped and validated within a realistic effort.

## Verdict vocabulary

Use one of these conclusions and explain it:

- `viable`: no material blocker found; remaining work is normal engineering.
- `viable_with_conditions`: viable only if stated assumptions or PoCs succeed.
- `not_recommended_now`: technically possible, but blocked by cost, permissions, weak differentiation, or disproportionate complexity.
- `not_viable_under_constraints`: a hard constraint conflicts with a verified technical, legal, or platform limitation.

