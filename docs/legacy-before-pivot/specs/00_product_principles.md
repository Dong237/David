# AI PM Product Principles

## Product Thesis

We are building an AI PM coworker for indie builders whose ability to build has become faster than their ability to choose, validate, scope, and learn.

The product is not a PRD generator, idea generator, generic chatbot, roadmap tool, or enterprise PM dashboard. It is a senior AI PM coworker that works with the founder across product judgment and execution: it frames the current situation, turns scattered market signals into a clear Bet, decides what should happen next, and helps execute the next PM step.

## North Star

Turn scattered market signals into evidence-backed build / test / kill decisions.

The user should feel:

- "I know what my product Bet is."
- "I know the riskiest assumption."
- "I know whether to build, test, kill, narrow, wait, or iterate."
- "I know why the AI recommended that."
- "The next PM work is already drafted or being done."

## Target Starting Point

Start with beginner indie builders who have little PM experience but can now build with AI tools.

Grow toward a Founder/Product OS that covers the full lifecycle:

- idea and market signal intake
- Bet framing
- evidence gathering
- decision support
- validation test generation
- evidence-backed spec handoff to coding agents
- launch learning
- product memory

## Core Product Principles

| Principle | Meaning |
|---|---|
| Flexible chat, hidden protocol | The user talks naturally. The system silently runs a professional PM reasoning protocol. |
| Bet before document | The core object is a Bet, not a PRD, feature, or idea. |
| Evidence before PRD | A spec is allowed only after enough evidence exists or the risk is consciously accepted. |
| Orient before execute | The product should first clarify what is known, what is uncertain, and what matters next. |
| Test when not ready | If the Bet is not build-ready, generate the strongest useful evidence test, not a premature build plan. |
| Agent does complexity | The system handles research, synthesis, scoring, test design, and artifact creation. The user sees judgment and next action. |
| Explain like a senior PM | Give the recommendation, confidence, evidence, and what would change the decision. |
| Challenge with tact | The agent should challenge weak ideas, vague users, fake progress, and vanity metrics. |
| Memory compounds | Each decision, test, and result should improve future judgment. |

## The Bet

A Bet is the product's core unit of reasoning:

```text
I believe user X has problem Y.
Solution Z can create value and business outcome B.
This is supported or disproven by evidence E.
The riskiest assumption is A.
The next action is N.
```

Bet lifecycle:

```text
raw idea -> framed Bet -> needs evidence -> testing -> build-ready -> building -> launched -> learning -> killed/pivoted
```

## Core Risks

Use the four product risks as the default PM lens:

| Risk | Question |
|---|---|
| Value | Will users care enough to use or pay? |
| Usability | Can users understand and use it? |
| Feasibility | Can we build it with available capability, time, and tools? |
| Viability | Can this work as a business for this founder? |

For beginner indie builders, viability must include founder constraints: technical ability, design taste, writing, audience, sales ability, domain access, time, money, language, location, and risk tolerance.

## Evidence Principles

Evidence should be ranked by behavior, cost, and relevance.

Strongest signals:

1. Paid retention, repeat purchase, renewal, churn reduction.
2. Payment, preorder, deposit, paid pilot, paid discovery call.
3. Strong complaint plus existing workaround.
4. Search/community demand and review patterns.
5. Competitor weakness or pricing gaps.
6. Likes, comments, waitlists, survey intent.
7. Founder intuition.

Complaints can create Bets. Payment or costly behavior makes them build-ready.

## PM Work This Product Must Take Over

| PM Work | Product Behavior |
|---|---|
| Understand context | Ask for stage, goal, constraints, founder capability, and known evidence. |
| Frame problem | Convert messy input into a clear Bet and target user. |
| Identify risks | Surface the riskiest unresolved assumption. |
| Gather evidence | Mine complaints, search demand, reviews, competitors, metrics, and user conversations. |
| Decide priority | Choose the highest-leverage next action. |
| Design tests | Generate the test, success threshold, scripts, landing copy, outreach, and tracking. |
| Align execution | Produce evidence-backed specs only when ready. |
| Measure outcome | Read activation, retention, churn, revenue, runway, reply rate, payment, and usage. |
| Learn | Save decisions, evidence, assumptions, outcomes, and stale beliefs. |

## MVP Default UX

The app should not expose the whole machine by default.

Default surface:

- main chat/workbench
- current Bet card
- current judgment card
- next action card
- evidence drawer
- memory drawer

Visual direction:

- App UI: Precision Console, because it feels operational, efficient, and scalable.
- Reports/memos: Editorial Founder OS, because it feels like a reviewed PM case file.

## Moat

The moat is not the "AI PM coworker" label by itself. A general chatbot can imitate that.

The moat is the proprietary decision system:

```text
Founder Capability Graph
-> Evidence Ledger
-> Product Decision Graph
-> Test/Outcome Dataset
-> Super-Indie Benchmarks
```

The long-term asset is a memory system that learns which founder profiles, evidence patterns, tests, and decisions lead to real outcomes.

## High-Level Sources

- Local landscape research: `docs/research/reports/report_a.md`, `docs/research/reports/report_b.md`, `docs/research/reports/report_c.md`
- SVPG, four product risks: https://www.svpg.com/four-big-risks/
- Product Talk, product discovery: https://www.producttalk.org/product-discovery/
- Product Talk, Opportunity Solution Trees: https://www.producttalk.org/opportunity-solution-trees/
- The Mom Test: https://www.momtestbook.com/
- Lean Startup principles: https://theleanstartup.com/principles
- Shape Up: https://basecamp.com/shapeup
