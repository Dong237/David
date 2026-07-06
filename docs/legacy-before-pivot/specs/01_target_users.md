# Target Users And Scenarios

## Core Thesis

The primary user is not a professional PM. The primary user is an AI-enabled indie builder whose build speed has outpaced their product judgment.

AI coding tools make prototypes cheap. The bottleneck shifts to choosing what to build, validating whether anyone cares, scoping the right first version, and learning after launch.

## Primary ICP

AI-enabled beginner indie builder:

- uses or wants to use tools like Cursor, Claude Code, Lovable, Bolt, Replit, v0, or Trae
- has ideas or domain pain but limited PM experience
- can build or prompt an AI builder, but cannot confidently decide what should be built
- wants to act like a professional PM without becoming one first
- has low tolerance for PM theory unless it directly improves the next decision

Core promise:

```text
Tell me your situation.
I will frame the Bet, inspect the evidence, identify the riskiest assumption,
and work with you to produce the next PM action.
```

## User Segments

| Segment | Who | Pain | WTP | Product Role |
|---|---|---|---|---|
| Beginner AI indie builder | First-time builder using AI coding tools | High uncertainty, weak validation, no PM process | Low-medium | AI PM coworker and product sense tutor |
| Super-indie / tiny-team founder | Solo or 2-5 person founder with product, users, or revenue | Wrong priorities cost real money and time | Medium-high | Senior PM coworker and decision memory |
| Domain-expert builder | Operator, creator, teacher, clinician, consultant, or community expert | Knows domain pain but cannot shape product | Medium | Translate domain insight into testable Bet |
| Opportunity hunter | Searches Reddit, X, XHS, reviews, trends, Toolify, Product Hunt | Many signals, little synthesis | Low-medium | Signal-to-Bet workbench |
| Existing product builder | Has usage, churn, retention, conversion, or support data | Does not know what metric problem means | Medium-high | Product review, decision support, and next experiment |

## Exclusions For MVP

| Excluded User | Why |
|---|---|
| Enterprise PMs | Pulls product toward roadmaps, alignment, and org workflows. |
| Generic PRD seekers | They want documents without evidence. |
| Startup tourists | High curiosity, low action, weak retention. |
| Agencies | Multi-client workflows add complexity too early. |
| Pure investors/analysts | Need market intelligence, not PM coworking. |

## Recurring Pain Points

| Pain | What It Looks Like | What The Product Should Do |
|---|---|---|
| Idea overload | "I have 10 ideas and do not know which one matters." | Rank Bets by evidence, risk, reachability, and founder fit. |
| Vague target user | "This is for creators / students / small business." | Force a sharper ICP and job-to-be-done. |
| Weak validation | "People said it sounds cool." | Replace compliments with behavior, payment, or costly commitment tests. |
| Fragmented evidence | Reddit, XHS, app reviews, search, competitors, analytics live everywhere. | Build an Evidence Ledger with source, claim, strength, confidence, and date. |
| Generic AI distrust | LLM scores feel plausible but unsupported. | Attach evidence and explain what would change the decision. |
| Spec-to-code gap | Coding agents get vague prompts and build the wrong thing quickly. | Generate evidence-backed specs only after the Bet is ready. |
| Solo decision loneliness | No senior PM or cofounder challenges the founder. | Think with the founder, challenge, decide, and remember. |
| Metrics confusion | Activation, retention, churn, runway, conversion feel abstract. | Translate metrics into PM judgment and next action. |

## Scenario Matrix

| Scenario | Trigger | User Input | AI PM Action | Output |
|---|---|---|---|---|
| Idea validation | "I have an idea. Should I build it?" | Raw idea, audience guess, founder context | Frame Bet, identify missing evidence, inspect light market signals | Build/test/kill/narrow decision plus next evidence test |
| Complaint mining | "I saw people complain about this." | Link, keyword, screenshot, niche, platform | Cluster complaints, extract job, alternatives, urgency, WTP hints | Opportunity card and validation plan |
| Many ideas | "Which of these should I pursue?" | List of ideas or notes | Normalize into Bets, compare evidence and founder fit | Ranked shortlist and chosen next Bet |
| Built but no users | "I shipped but nobody uses it." | Product link, funnel, traffic, feedback | Review acquisition, activation, value prop, ICP, onboarding, or pricing | Fix/test recommendation and evidence needed |
| Existing users | "I have users but do not know what to improve." | Metrics, feedback, support, churn reasons | Build metric tree, find bottleneck, connect qual and quant evidence | Prioritized experiment or product change |
| Handoff to coding agent | "I want Cursor/Codex/Lovable to build this." | Validated Bet and constraints | Check PRD gate, scope MVP, define non-goals and acceptance criteria | Evidence-backed build spec |
| Launch learning | "I launched, now what?" | Launch results, replies, payments, retention | Compare expected vs actual, update Bet, decide iterate/pivot/kill | Launch review and memory update |
| Founder overwhelmed | "I do not know what a real PM would do next." | Messy situation description | Infer stage silently, organize context, choose next PM step | Current PM judgment and one concrete action |

## Evidence Needed By Stage

| Stage | Good Enough Evidence | Not Enough |
|---|---|---|
| Raw idea | Repeated complaints, clear ICP, current workaround, reachable audience | "I think people need this." |
| Test-ready Bet | Sharp target user, problem, proposed value, riskiest assumption | Broad market or generic persona |
| Build-ready Bet | Payment, preorder, paid pilot, paid call, or strong costly behavior | Likes, waitlists, survey interest alone |
| Post-launch iteration | Activation/retention/conversion data plus user feedback | Pageviews or signups without behavior |
| Scale decision | Retention, repeat use, revenue, low churn, repeatable acquisition | One-off virality |

## Founder Capability Map

The AI must adapt advice to the founder, not just the market.

Track:

- technical ability
- design ability
- writing and content skill
- sales and outreach comfort
- domain access
- audience ownership
- time per week
- budget and runway
- language and geography
- risk tolerance
- distribution advantages
- known weaknesses

Example:

```text
PM taste: strong
Writing: strong
Coding: limited
Audience: none yet
Time: 8 hrs/week
Language: bilingual EN/ZH
Implication: prefer evidence tests and content/outreach before code-heavy MVP.
```

## MVP User Need

The MVP should solve this narrower need:

```text
Help me understand whether this product Bet deserves build time,
and if not, create the strongest practical evidence test.
```

This includes light complaint mining, search demand, review mining, competitor scan, Bet framing, product review, decision support, and generated test assets.

## Research Evidence

| Claim | Supporting Source |
|---|---|
| The market is fragmented from demand signal to code-ready spec. | Local landscape: `docs/research/reports/report_a.md` and `docs/research/reports/report_b.md` |
| Evidence-backed scoring barely exists; generic AI scores are weak. | Local landscape: `docs/research/reports/report_a.md` |
| Layers 2-5 are underbuilt for indie founders. | Local landscape: `docs/research/reports/report_c.md` |
| Chinese content-signal tools are strong, but founder-discovery tooling is shallow. | Local landscape: `docs/research/reports/report_c.md` |
| AI-assisted building makes product judgment a bottleneck. | Business Insider on Andrew Ng and PM bottlenecks: https://www.businessinsider.com/andrew-ng-product-management-bottleneck-coding-ai-startups-2025-8 |
| Early startups often rush to launch and underinvest in learning. | Startup validation research: https://arxiv.org/abs/1709.04749 |
| Small startups struggle to adopt continuous experimentation unless immediate benefit is clear. | Continuous experimentation research: https://arxiv.org/abs/2212.05750 |
| Hypothesis clarity is a known startup experimentation problem. | HyMap research: https://arxiv.org/abs/2102.09387 |
| GenAI is increasing solo and first-time entrepreneurship. | Product Hunt launch study: https://arxiv.org/abs/2605.10291 |

## Product Implications

- The default experience should be chat plus an active PM workbench, not a full dashboard.
- The product must challenge vague target users and weak evidence.
- Payment or costly behavior should gate build-ready recommendations.
- The product should expose evidence on demand, but not overwhelm the default view.
- Every output should preserve source-backed reasoning so the user builds product sense over time.
