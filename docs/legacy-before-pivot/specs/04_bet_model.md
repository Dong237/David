# Bet Model

## Purpose And Boundary

This file defines what the AI PM coworker is judging.

The Bet is the core object between raw market signals and product execution. It is not a PRD, idea note, feature request, roadmap item, or generic startup pitch. It is a testable product judgment unit that can be supported, weakened, narrowed, built, or killed.

Landscape lesson: `docs/research/landscape/landscape.html` and `docs/research/landscape/landscape_c.html` show that the market has many idea generators, signal collectors, and spec writers, but the weak middle is structured Bet framing from raw demand signals. This file defines that middle.

## Judgment Core Relationship

| Spec | Responsibility |
|---|---|
| `04_bet_model.md` | Defines the thing being judged. |
| `05_evidence_model.md` | Defines what proof is trusted. |
| `06_decision_policy.md` | Defines which action the agent is allowed to recommend. |

The agent should not make a decision until it can name the current Bet, even if the Bet is incomplete.

## Bet Definition

A Bet is:

```text
target user
+ situation
+ job/problem
+ solution guess
+ business outcome
+ evidence
+ riskiest assumption
+ next action
```

Canonical Bet statement:

```text
I believe [target user] in [situation] struggles with [job/problem].
If we offer [solution guess], they will [behavior/outcome].
This matters because [business outcome].
The riskiest assumption is [assumption].
```

Short form:

```text
For [user], solve [problem] with [solution] so they [outcome].
```

## Bet Schema

| Field | Required | Meaning |
|---|---:|---|
| `bet_id` | yes | Stable ID used by evidence, decisions, artifacts, and memory. |
| `created_at` | yes | When the Bet was first framed. |
| `updated_at` | yes | Last meaningful update. |
| `source_prompt` | yes | Original user input, link, complaint cluster, metric issue, or uploaded artifact. |
| `stage` | yes | `raw_idea`, `framed`, `evidence_needed`, `testing`, `build_ready`, `building`, `launched`, `learning`, `killed`, `pivoted`. |
| `readiness` | yes | `raw`, `framed`, `test_ready`, `build_ready`, `launch_learning`. |
| `target_user` | yes | Specific reachable user or buyer segment. |
| `situation` | yes | Context where the struggle appears. |
| `trigger` | optional | Event that makes the problem urgent now. |
| `job_or_problem` | yes | Desired progress, pain, task, or unmet need. |
| `current_workaround` | optional | What users do today without this product. |
| `desired_progress` | yes | What the user wants to be better at, avoid, save, earn, or become. |
| `success_moment` | yes | Observable moment when value is created. |
| `solution_guess` | yes | Current proposed way to solve the problem. |
| `alternative_solutions` | optional | Other plausible solutions the agent considered. |
| `business_outcome` | yes | Revenue, retention, paid beta, conversion, renewal, lower churn, or another business result. |
| `product_outcome` | yes | User behavior that should lead to the business outcome. |
| `appetite` | yes | Time, money, and complexity the founder is willing to spend. |
| `scope_boundary` | yes | What is inside this Bet. |
| `no_gos` | yes | What must not be built or assumed. |
| `rabbit_holes` | optional | Areas likely to create hidden complexity or distraction. |
| `founder_fit` | yes | Founder capability and constraint snapshot. |
| `risk_map` | yes | Value, usability, feasibility, viability risk assessment. |
| `assumptions` | yes | Assumptions that must be true for the Bet to work. |
| `riskiest_assumption_id` | yes | The assumption most likely to invalidate the Bet. |
| `evidence_card_ids` | yes | Evidence linked to this Bet. Empty is allowed only for `raw_idea`. |
| `decision_id` | optional | Latest decision from `06_decision_policy.md`. |
| `next_action_id` | optional | Test plan, artifact, or follow-up action. |
| `memory_status` | yes | `active`, `stale`, `superseded`, `killed`, or `learned`. |

## JTBD And Opportunity Fields

JTBD belongs canonically in the Bet. Evidence supports or weakens it, but the Bet owns the current framing.

| Field | PM Question | Good Example | Weak Example |
|---|---|---|---|
| `user` | Who exactly has the struggle? | "Solo AI SaaS builders with a launched prototype and no paid users." | "Founders." |
| `situation` | When does the struggle appear? | "After shipping a landing page but before deciding the next sprint." | "When building." |
| `trigger` | What creates urgency? | "They got traffic but zero paid conversions." | "They want growth." |
| `struggle` | What blocks progress? | "They cannot tell if the issue is ICP, pricing, copy, or product value." | "They need feedback." |
| `current_workaround` | What do they do today? | "Ask X/Twitter, paste the page into ChatGPT, buy a generic teardown." | "Nothing." |
| `desired_progress` | What progress do they want? | "Know whether to test price, narrow ICP, rewrite positioning, or stop." | "Improve product." |
| `success_moment` | What observable moment proves value? | "They run a paid test and get a clear proceed/kill signal." | "They feel confident." |

## Founder Fit Fields

For indie builders, viability includes founder reality. The same opportunity can be good for one founder and wrong for another.

| Field | Meaning | Product Implication |
|---|---|---|
| `technical_skill` | Can the founder build or direct coding agents? | Affects build scope and feasibility risk. |
| `design_skill` | Can they create credible UX and visual trust? | Affects landing page, onboarding, and usability tests. |
| `writing_skill` | Can they explain the value clearly? | Affects content, sales pages, outbound, and positioning tests. |
| `sales_comfort` | Can they ask for calls, deposits, and payment? | Affects WTP test choice. |
| `audience_or_channel` | Can they reach target users repeatedly? | Affects acquisition viability. |
| `domain_access` | Do they know or reach the domain? | Affects evidence quality and interview access. |
| `time_per_week` | Available execution time. | Affects appetite and test timeline. |
| `budget` | Money available for tests, tools, contractors, ads. | Affects strongest feasible signal. |
| `language_geography` | EN, ZH, cross-border, local market. | Affects platforms, payment, copy, and trust assumptions. |
| `risk_tolerance` | How much failure/cash/time risk is acceptable. | Affects wait/test/build threshold. |

## Risk Map

Every Bet carries separate risk axes. Do not collapse them into one vague score.

| Risk | Question | Typical Indie Failure |
|---|---|---|
| Value | Will this user care enough to use or pay? | Strong complaint, weak WTP. |
| Usability | Can the user understand and use the solution? | Powerful tool, confusing onboarding. |
| Feasibility | Can this founder build it with available skill, tools, time, and budget? | AI demo works once, production version is too hard. |
| Viability | Can this become a sustainable business for this founder? | Users like it, but acquisition or pricing does not work. |
| Ethics/trust | Could the solution create unacceptable harm or credibility risk? | User data, fake claims, unsafe advice, or hidden automation. |

Risk levels:

| Level | Meaning |
|---|---|
| `low` | Evidence or constraints make failure on this axis unlikely for the next step. |
| `medium` | Some evidence exists, but the agent should keep the risk visible. |
| `high` | The Bet can fail if this is unresolved. It may become the riskiest assumption. |

## Assumption Map

An assumption is a belief that must be true for the Bet to work.

| Field | Required | Meaning |
|---|---:|---|
| `assumption_id` | yes | Stable ID. |
| `bet_id` | yes | Parent Bet. |
| `type` | yes | `value`, `usability`, `feasibility`, `viability`, `ethics`. |
| `statement` | yes | Specific positive claim that can be tested. |
| `why_it_matters` | yes | What breaks if false. |
| `current_evidence_ids` | yes | Evidence that supports or weakens it. |
| `criticality` | yes | `low`, `medium`, `high`. |
| `evidence_strength` | yes | `none`, `weak`, `medium`, `strong`. |
| `falsifier` | yes | Result that would weaken or kill this assumption. |
| `next_test_id` | optional | Test designed to resolve it. |

Riskiest assumption rule:

```text
riskiest = high criticality + weak evidence + high cost of being wrong
```

## Appetite, Scope, And No-Gos

Inspired by Shape Up, a Bet must have appetite and boundaries before it can become build-ready.

| Field | Meaning |
|---|---|
| `appetite` | Maximum time, money, and complexity allowed for this Bet. |
| `narrowest_useful_version` | Smallest version that can create or test the core value. |
| `scope_boundary` | What is included now. |
| `no_gos` | What is explicitly excluded. |
| `rabbit_holes` | Complex areas that must be avoided or researched first. |
| `circuit_breaker` | When to stop, narrow, or kill instead of continuing. |

## Bet States

| State | Meaning | Entry Rule | Exit Rule |
|---|---|---|---|
| `raw_idea` | User has a concept, complaint, feature thought, or vague opportunity. | Any user input. | Target user, problem, and outcome are framed. |
| `framed` | Bet has a target user, situation, job/problem, solution guess, and outcome. | Core schema is filled. | Missing evidence is identified. |
| `evidence_needed` | Bet is plausible but missing proof. | Rarest or riskiest assumption is unresolved. | Test plan is chosen. |
| `testing` | A test is running or ready to run. | Success/failure thresholds exist. | Test result is logged. |
| `build_ready` | Enough evidence exists for a bounded build. | PRD gate is passed by `06`. | Build starts or scope is rejected. |
| `building` | Founder or coding agent is implementing. | Evidence-backed spec exists. | Launch or testable release exists. |
| `launched` | Users can experience the product. | Product is live to target users. | Outcome data is collected. |
| `learning` | Agent reads outcome and updates the Bet. | Metrics, replies, payments, churn, or usage exist. | Iterate, build, narrow, kill, or new Bet. |
| `killed` | Bet should stop. | Contradiction, poor fit, no access, or weak business case. | Only revived with new material evidence. |
| `pivoted` | Bet changed materially. | Old Bet no longer describes the target or problem. | New Bet receives a new ID with trace link. |

## Readiness Levels

| Readiness | What It Allows | What It Forbids |
|---|---|---|
| `raw` | Clarifying questions, initial framing, light research. | Scoring, PRD, coding prompt. |
| `framed` | Evidence search, complaint mining, competitor scan, assumption map. | Build recommendation unless evidence is already strong. |
| `test_ready` | Test plan, landing copy, interview script, outreach, manual offer. | Full PRD and coding prompt. A founder override can only create a learning prototype path under `06`, not a PRD gate pass. |
| `build_ready` | MVP scope, build spec, coding-agent prompt, instrumentation plan. | Expanding scope beyond evidence. |
| `launch_learning` | Metric review, churn analysis, retention review, iteration decision. | Treating traffic or signups as proof without behavior. |

## Linked Objects

| Object | Relationship |
|---|---|
| Evidence Card | Supports, weakens, or contradicts a Bet assumption. |
| Risk Assessment | Summarizes value, usability, feasibility, viability, and trust risk. |
| Decision | Current allowed action from `06_decision_policy.md`. |
| Test Plan | Designed to resolve the riskiest assumption. |
| Artifact | Memo, test copy, landing page copy, interview script, or build spec. |
| Memory | Durable founder, market, evidence, decision, and outcome history. |

## Agent Rules

1. Always frame or update the Bet before judging.
2. If the target user is vague, recommend `narrow` before scoring.
3. If WTP is central and unresolved, mark the Bet `test_ready`, not `build_ready`.
4. A Bet can have strong pain evidence and still fail viability.
5. Do not turn a solution guess into a requirement until `06` allows the PRD gate.
6. Preserve alternative explanations: bad ICP, weak positioning, wrong channel, bad timing, insufficient trust, or no real pain.
7. When changing the Bet materially, create a new Bet ID and link to the old one.
8. For beginner indie builders, conscious risk acceptance does not make a Bet `build_ready`; it creates an explicitly warned learning-prototype path with smallest reversible scope, metric, and review trigger.

## Invalid Bet Patterns

| Pattern | Why Invalid | Required Agent Response |
|---|---|---|
| Vague ICP | No clear user, channel, or evidence target. | Narrow the user and situation. |
| Solution-first framing | Starts with feature, not problem or outcome. | Reframe into JTBD and opportunity. |
| No WTP assumption | Business success is implied but not testable. | Add payment/costly-behavior assumption. |
| Fake business outcome | "Improve UX" or "build MVP" is treated as business value. | Define revenue, retention, conversion, churn, or learning outcome. |
| PRD before evidence | A polished spec hides uncertainty. | Block PRD and create a test. |
| Founder-fit blindness | Advice ignores capability, access, time, or geography. | Update founder fit before deciding. |
| One-score Bet | Composite score hides risk shape. | Separate demand, WTP, feasibility, viability, and confidence. |

## Minimum Output Contract

Whenever the agent names a Bet, output:

```text
Bet:
- target_user
- situation
- job_or_problem
- solution_guess
- business_outcome
- current_state
- readiness
- strongest_evidence
- weakest_evidence
- riskiest_assumption
- recommended_next_action
```

## Sources

- Local: `docs/research/landscape/landscape.html`
- Local: `docs/research/landscape/landscape_c.html`
- Local: `docs/specs/00_product_principles.md`
- Local: `docs/specs/01_target_users.md`
- Local: `docs/specs/03_pm_reasoning_protocol.md`
- SVPG, Four Big Risks: https://www.svpg.com/four-big-risks/
- Product Talk, Opportunity Solution Trees: https://www.producttalk.org/opportunity-solution-trees/
- Product Talk, Assumption Testing: https://www.producttalk.org/assumption-testing/
- Shape Up: https://basecamp.com/shapeup
