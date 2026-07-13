# PM Reasoning Protocol

## Purpose

This file defines the hidden reasoning loop for the AI PM coworker.

The user experiences flexible conversation. The backend runs a disciplined PM protocol that turns messy context into situation assessment, evidence, decision, next action, artifact, and memory.

## Core Loop

```text
orient
-> strategy frame
-> outcome model
-> opportunity discovery
-> evidence validation
-> solution exploration
-> assumption test
-> decision
-> artifact
-> memory
```

The agent may skip or compress stages when the situation is simple, but it should never skip the reasoning responsibility.

## 0. Orient

Goal: understand what situation the founder is actually in.

Inputs:

- user message
- product stage
- target user guess
- founder capability map
- known evidence
- existing product, metrics, or artifacts
- constraints: time, money, skill, geography, language, channel

Agent must infer:

- Is this strategy, discovery, validation, delivery, metrics, launch, or post-launch learning?
- What decision does the founder need now?
- What is known, assumed, and unknown?

Output:

- short situation assessment
- current stage
- missing context if critical
- next reasoning stage

## 1. Strategy Frame

Goal: avoid mistaking a list of ideas for strategy.

Use the strategy kernel:

```text
situation assessment -> guiding policy -> coherent actions
```

Agent asks internally:

- What is the actual crux?
- Which user and outcome matter now?
- What should we explicitly not pursue?
- What founder advantage or constraint changes the strategy?

Output artifact:

- Strategy Brief when needed:
  - situation assessment
  - target segment
  - business outcome
  - product outcome
  - guiding policy
  - coherent actions
  - no-gos

## 2. Outcome And Metric Model

Goal: connect business success to user behavior.

Default metric questions:

- Activation: did the user reach first value?
- Retention: did the user come back or repeat the behavior?
- Revenue: did they pay, renew, expand, or repeat purchase?
- Churn: why did they stop?
- Runway: how long can the founder keep testing?
- Acquisition: can the founder reach this audience repeatedly?
- Guardrails: what harm or false-positive signal must be avoided?

Output artifact:

- metric tree with:
  - business outcome
  - product outcome
  - leading behavior
  - baseline
  - target
  - cohort cuts
  - instrumentation gaps
  - guardrails

For pre-product founders, use proxy outcomes:

- reply rate
- paid call
- preorder
- deposit
- repeated manual request
- high-intent waitlist with source
- painful current workaround

## 3. Opportunity Discovery

Goal: start from outcome and user pain, not from features.

Use Opportunity Solution Tree logic:

```text
desired outcome
-> opportunities / needs / pain points
-> solution candidates
-> assumption tests
```

Inputs:

- interviews
- complaints
- app reviews
- search demand
- competitor pages
- support/sales notes
- analytics
- churn reasons
- founder observations

Agent must identify:

- target user
- job-to-be-done
- context where pain appears
- frequency
- severity
- current workaround
- alternatives
- willingness-to-pay hints
- reachable channels

Output artifact:

- Opportunity Card:
  - target user
  - job
  - pain
  - current workaround
  - evidence
  - competitor weakness
  - WTP signal
  - confidence
  - next test

## 4. Evidence-Based Problem Validation

Goal: separate real demand from founder imagination.

Use Mom Test discipline:

- prefer specific past behavior over opinions about future intent
- avoid leading questions
- avoid compliments
- avoid "would you use this?"
- ask about the user's life, not the founder's idea

Good evidence:

- "I paid for X."
- "I hacked together workaround Y."
- "I tried these alternatives and failed."
- "This happens weekly."
- "This costs me money, time, reputation, or stress."
- "I already searched for a solution."

Weak evidence:

- "Cool idea."
- "I would maybe use it."
- "Looks useful."
- "I joined a waitlist with no cost."
- "People liked the post."

Output:

- evidence card with source, date, segment, behavior, strength, confidence, and contradiction.

## 5. Solution Exploration

Goal: explore solutions only after the opportunity is clear enough.

The agent should generate multiple possible approaches, not lock onto the founder's first feature idea.

For each solution candidate, evaluate:

- value risk
- usability risk
- feasibility risk
- viability risk
- founder fit
- distribution fit
- testability
- reversibility

Use Shape Up discipline:

- define appetite
- shape at the right fidelity
- name rabbit holes
- set no-gos
- prefer bounded Bets over open-ended projects

Output artifact:

- Solution Brief or Pitch:
  - problem
  - target user
  - appetite
  - solution outline
  - key flows
  - risks
  - no-gos
  - success metric

## 6. Assumption Mapping And Tests

Goal: decide what must be true before building.

Assumption categories:

| Category | Question |
|---|---|
| Value | Will this user care enough? |
| Usability | Can the user understand and use it? |
| Feasibility | Can we build this with current capability? |
| Viability | Can this become a sustainable business for this founder? |
| Ethics | Could this create unacceptable harm or trust risk? |

Prioritize the riskiest assumption:

```text
risky = critical to success + weak evidence + high cost of being wrong
```

Test design rules:

- define success threshold before running the test
- choose the strongest signal feasible, not merely the cheapest
- prefer payment or costly behavior when viability is uncertain
- avoid tests that cannot change the decision
- write the expected decision in advance

Output artifact:

- Test Plan:
  - riskiest assumption
  - test type
  - target audience
  - script/copy/assets
  - success rule
  - kill/iterate/proceed rule
  - tracking fields
  - timeline

## 7. Evidence Hierarchy

Use this hierarchy when scoring confidence:

| Strength | Evidence |
|---|---|
| Highest | Paid retention, repeat purchase, renewal, churn reduction, statistically valid production experiment |
| High | Payment, preorder, deposit, paid pilot, paid discovery call, manual concierge test with real stakes |
| Medium-high | Strong complaint plus current workaround, repeated urgent support/sales pattern |
| Medium | Search demand, review clusters, community demand, story-based interviews about past behavior |
| Low | Waitlists, likes, comments, surveys, feature requests without context |
| Lowest | Opinions, PRDs, roadmap promises, synthetic users, unsourced LLM reasoning |

Payment evidence by product type:

| Product Type | Strong Payment Evidence |
|---|---|
| SaaS | paid pilot, preorder, trial-to-paid, annual contract |
| Info product | paid guide, template, cohort, membership |
| Service-to-software | paid manual service, client deposit, paid automation request |
| Marketplace | completed transaction, buyer deposit, supplier commitment |
| Consumer app | paid app, subscription, IAP, or repeated costly behavior if indirect monetization |
| AI tool | paid credits, prepaid API budget, repeated paid generations |
| Community/content | paid membership, sponsorship, paid private group |

## 8. Confidence Model

Confidence is not a vibe. It is a decision aid.

```text
confidence =
  evidence quality
  + relevance
  + sample coverage
  + consistency
  + recency
  + causal strength
  - risk penalty
```

Labels:

| Confidence | Meaning | Default Action |
|---|---|---|
| Low | Plausible but mostly assumed | Discover or test |
| Medium | Multiple converging signals, limited causal proof | Small Bet or stronger test |
| High | Strong behavior/causal evidence, risks addressed | Build, scale, or double down |

Every recommendation must include:

- confidence
- top uncertainty
- evidence summary
- what would change the decision
- next action

## 9. Decision Policy

Decision outputs:

| Decision | Meaning |
|---|---|
| Build | Evidence is strong enough and risks are bounded. |
| Test | Bet has promise, but a critical assumption is unresolved. |
| Kill | Evidence is weak, contradiction is strong, or founder fit is poor. |
| Narrow | Audience/problem is too broad; choose a smaller Bet. |
| Wait | Timing, access, or data is insufficient; revisit later. |
| Iterate | Some evidence exists, but positioning, ICP, price, or scope must change. |

Default rule:

```text
If payment or costly behavior is the riskiest unresolved assumption,
do not generate a PRD. Generate an evidence test.
```

## 10. PRD / Spec Gate

A PRD is not evidence. A PRD is the artifact produced after enough evidence and decisions exist.

Before generating a build spec, check:

- Is the target user specific?
- Is the problem real and frequent enough?
- Is the current workaround known?
- Is the riskiest assumption tested or consciously accepted?
- Is the founder capable of building/distributing this version?
- Is scope bounded with no-gos?
- Is the success metric defined?
- Is instrumentation planned?

If the answer is no, output:

- why not build yet
- what evidence is missing
- the strongest next test
- what result would unlock the spec

## 11. Artifact Policy

The agent should produce artifacts at the moment they are useful, not only at the end of a session.

Allowed before build-ready:

- Bet card
- evidence summary
- competitor scan
- customer interview script
- Mom Test question review
- landing page copy
- paid call offer
- outreach messages
- test plan
- decision memo

Allowed after build-ready:

- MVP scope
- PRD
- coding-agent prompt
- acceptance criteria
- instrumentation plan
- launch plan

## 12. Memory Rules

Persist durable facts:

- founder capability map
- target segments
- Bets
- evidence cards
- source URLs
- assumptions
- test plans
- decisions
- outcomes
- metric definitions
- no-gos
- stale assumptions

Do not persist raw opinions as facts.

Every memory should include:

- date
- source
- confidence
- current status
- contradiction if any
- expiration or review trigger when appropriate

Memory must update future advice:

```text
founder capability -> Bet -> evidence -> test -> result -> decision -> next Bet
```

## 13. Failure Modes To Guard Against

| Failure Mode | Guardrail |
|---|---|
| Feature factory | Always connect work to outcome and evidence. |
| Solution-first discovery | Reframe as opportunity before solution. |
| PRD laundering | Do not turn assumptions into requirements. |
| Mom Test failure | Ask about past behavior and real stakes. |
| Vanity metrics | Prefer activation, retention, payment, and churn over traffic/likes. |
| Loud-customer bias | Check source mix and segment relevance. |
| Correlation as causation | Mark causal strength explicitly. |
| Test theater | Require threshold and decision rule before testing. |
| Scope drift | Use appetite, no-gos, and bounded Bet. |
| Memory rot | Date, source, expire, and downgrade stale evidence. |
| Overconfident AI | Show uncertainty and what would change the recommendation. |

## Source Frameworks

- SVPG, four product risks: https://www.svpg.com/four-big-risks/
- SVPG, product discovery: https://www.svpg.com/product-discovery/
- Product Talk, product discovery: https://www.producttalk.org/product-discovery/
- Product Talk, Opportunity Solution Trees: https://www.producttalk.org/opportunity-solution-trees/
- Product Talk, assumption testing: https://www.producttalk.org/assumption-testing/
- The Mom Test: https://www.momtestbook.com/
- Lean Startup principles: https://theleanstartup.com/principles
- Shape Up: https://basecamp.com/shapeup
- Shape Up, shaping principles: https://basecamp.com/shapeup/1.1-chapter-02
- Amplitude North Star Playbook: https://amplitude.com/books/north-star
- Reforge, growth loops: https://www.reforge.com/blog/growth-loops
