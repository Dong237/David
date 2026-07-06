# User Scenarios

## Purpose

This spec defines the real situations where the AI PM coworker should help.

It is not a persona brainstorm. A scenario belongs here only when it is backed by user-provided seed pain, public evidence, or product-review evidence, and can be mapped to the PM reasoning protocol:

```text
situation -> Bet -> evidence -> risk -> decision -> next action -> artifact -> memory
```

The UI can stay flexible chat. These scenarios define the hidden stage inference and the PM work the agent should perform.

## Source Relationship

| File | Role |
|---|---|
| `00_product_principles.md` | Product philosophy: AI PM coworker, not PRD bot. |
| `01_target_users.md` | Target users and founder capability map. |
| `02_user_scenarios.md` | Real entry situations and expected PM response. |
| `03_pm_reasoning_protocol.md` | Hidden PM loop. |
| `04_bet_model.md` | Defines what is being judged. |
| `05_evidence_model.md` | Defines what proof is trusted. |
| `06_decision_policy.md` | Defines allowed decisions and PRD gate. |

Research ledger:

- `docs/research/tmp/02_user_scenarios_evidence_v0.md`

## Evidence Policy

| Rule | Meaning |
|---|---|
| Include accepted scenarios | A scenario can enter the spec if it has `accepted with evidence`. |
| Keep confidence explicit | High, medium-high, medium, or low must be visible. |
| Do not overclaim unavailable channels | XHS, Jike, Zhihu, and X/Twitter are not proof unless direct evidence is captured. |
| Separate market pain from WTP | Complaint evidence can justify a test; it does not prove people will pay. |
| Do not blame beginners | PM learner pain may come from weak orgs, poor onboarding, or missing mentorship, not personal weakness. |

Decision: include accepted scenarios with explicit confidence. Do not include unsupported seed ideas as first-class scenarios.

## Scenario Summary

| ID | Scenario | User Type | Stage | Decision Needed | Confidence |
|---|---|---|---|---|---|
| S1 | Can build, no direction | Technical / AI indie builder | Idea, pre-build | Narrow / test | High |
| S2 | Mid-build value unclear | Builder, PM learner, domain expert | Prototype, mid-build | Wait / narrow / test / iterate / kill | Medium-high |
| S3 | Built it, nobody uses or pays | Indie builder / solo founder | Launched | Test / iterate / kill | High |
| S4 | Built, then freezes at market-facing work | Technical builder | Launch / GTM | Test / narrow / iterate | High |
| S5 | Has weak signal, does not know what it means | Early product builder | Early users / traffic | Test / iterate / narrow | Medium-high |
| S6 | PM learner needs professional judgment | Junior PM / transitioning PM / founder learning PM | Learning or active project | Narrow / test / iterate / wait | Medium-high EN, medium ZH |

Decision names should map to `06_decision_policy.md`: `build`, `test`, `kill`, `narrow`, `wait`, or `iterate`. Learning, interpretation, and execution are modes of response, not final policy decisions.

## S1: Can Build, No Direction

| Field | Spec |
|---|---|
| User type | Technical builder, AI-enabled indie builder, solo developer. |
| Trigger | AI/coding tools make building cheap, but the user does not know what is worth building. |
| Product stage | Idea / pre-build / opportunity search. |
| User quote | "I don't know what to build"; Chinese evidence also names lack of ideas/action after AI makes creation easier. |
| Core anxiety | "If I build this, will it be useless, too small, or easily swallowed by AI/platforms?" |
| Decision needed | `narrow` or `test`; rarely `build`. |
| Evidence needed | Real complaints, current workaround, reachable segment, alternative products, WTP/costly behavior hint. |
| Agent response | Convert vague intuition into a Bet: target user, situation, job, solution guess, business outcome, riskiest assumption. |
| Artifact | Opportunity brief, Bet statement, complaint-mining query set, 48-hour validation test. |
| Validation test | Post a specific problem/offer to a reachable channel; ask for paid call, deposit, preorder, or high-friction reply. |
| Confidence | High. |

Evidence:

- Vance Lucas, "I Don't Even Know What to Build Anymore" (2026): AI makes building faster while product direction becomes harder.
- V2EX, `用 AI 做了哪些有意义的工具？` (2026): builders ask what meaningful things individuals can build when AI can already generate docs/UI/backend/frontend.
- HN `Ask HN: How to find problems worth solving?`: older but direct pattern evidence.

Agent default:

```text
No PRD yet.
First frame the Bet.
Then collect the strongest feasible evidence for pain and WTP.
```

## S2: Mid-Build Value Unclear

| Field | Spec |
|---|---|
| User type | Builder, PM learner, domain expert builder. |
| Trigger | Product is half-built; value, IA, feature set, or user story feels unclear. |
| Product stage | Prototype / mid-build. |
| User quote | "Now what?" / "Should I keep building this?" |
| Core anxiety | "I have already invested effort. Am I adding useful features or hiding from the real problem?" |
| Decision needed | `wait`, `narrow`, `test`, `iterate`, or `kill`. |
| Evidence needed | Target user, actual workflow, prototype reactions, activation friction, WTP signal, competitor alternatives. |
| Agent response | Pause feature expansion, reframe the Bet, identify the riskiest assumption, and design the next evidence test. |
| Artifact | Value/IA critique, feature cut list, interview script, prototype test plan, decision gate. |
| Validation test | 3-5 target-user walkthroughs or paid/manual pilot where users must choose, pay, or trade off. |
| Confidence | Medium-high. |

Evidence:

- User seed case: healthcare app under development with unclear value, IA, and feature decisions.
- HN fitness app case: polished product, large spend, weak PMF/traction, founder asks how to assess next step.
- V2EX founder/investor thread: AI app built for months; investor questions expose moat, demand, business model, and competition gaps.
- Product Hunt Wispr Flow pivot narrative: hard but necessary decision to stop one direction and focus where PMF was more plausible.

Agent default:

```text
Do not add features until the value risk is named.
If the core user/job is unclear, choose `narrow`.
If WTP or demand is unclear, choose `test`.
```

## S3: Built It, Nobody Uses Or Pays

| Field | Spec |
|---|---|
| User type | Indie builder, solo founder, tiny-team founder. |
| Trigger | Product launched; traffic, signups, or attention exists, but usage/revenue is weak. |
| Product stage | Launched / early users. |
| User quote | "No users", "no revenue", "praise but no signups." |
| Core anxiety | "Is the problem the product, ICP, positioning, pricing, onboarding, channel, or trust?" |
| Decision needed | `test`, `iterate`, `narrow`, or `kill`. |
| Evidence needed | Traffic source, activation, retention, signup conversion, payment attempts, user replies, pricing page behavior. |
| Agent response | Identify the bottleneck, separate vanity signals from behavior, and choose one experiment that can change the decision. |
| Artifact | Decision memo, funnel hypothesis, pricing/positioning test, 7-day experiment plan. |
| Validation test | Run one measurable conversion or payment test with a specific segment and a written success/kill threshold. |
| Confidence | High. |

Evidence:

- Reddit r/SaaS/rSideProject examples from 2026: built for months but few/no customers; Product Hunt praise but no signups; 330 visitors and zero sales.
- HN fitness app case: usable polished app but no clear PMF/traction.
- Product Hunt landing-page roast: founders ask for concrete clarity, CTA, pricing, and trust critique.

Agent default:

```text
Do not prescribe more features by default.
First decide which bottleneck is most likely: ICP, promise, channel, activation, pricing, or product value.
Then test that bottleneck.
```

## S4: Built, Then Freezes At Market-Facing Work

| Field | Spec |
|---|---|
| User type | Technical builder, AI indie builder, neurodivergent or introverted founder, builder without GTM muscle. |
| Trigger | The product is built enough, but landing page, X posts, Product Hunt launch, cold email, or user outreach causes avoidance. |
| Product stage | Launch / GTM / early validation. |
| User quote | "I can build fast, then freeze." |
| Core anxiety | "Building has clear next steps; talking to the market exposes me to rejection and uncertainty." |
| Decision needed | `test`, `narrow`, or `iterate`. |
| Evidence needed | Target segment, one reachable channel, offer, proof of problem, current traction, founder sales comfort. |
| Agent response | Turn vague "market it" into one concrete research/sales action with script, audience, threshold, and review date. |
| Artifact | Outreach script, launch checklist, landing copy, one-person interview plan, daily distribution rep plan. |
| Validation test | Send 10-20 targeted messages or run a small paid/manual offer; measure replies, calls, deposits, or concrete feedback. |
| Confidence | High. |

Evidence:

- Indie Hackers (June 2026): direct thread where builder says building is clear, but launch/GTM tasks cause a freeze; many comments agree that AI made building cheap and distribution became the bottleneck.
- Product Hunt forums: landing page roasts and launch discussions show founders want concrete critique before and after launch.

Agent default:

```text
Do not give generic marketing advice.
Translate GTM into a tiny evidence test.
One concrete market-facing action beats another build cycle.
```

## S5: Has Weak Signal, Does Not Know What It Means

| Field | Spec |
|---|---|
| User type | Early product builder with traffic, replies, feedback, or partial onboarding events. |
| Trigger | Someone visits, tries, comments, gives feedback, or drops off; the founder cannot tell whether this is progress. |
| Product stage | Early users / traffic / beta. |
| User quote | "A stranger used it but did not sign up." |
| Core anxiety | "Which signals matter, and which are false positives?" |
| Decision needed | `test`, `iterate`, or `narrow`. |
| Evidence needed | Event sequence, user segment, source channel, friction point, qualitative feedback, repeated pattern count. |
| Agent response | Convert raw signal into evidence cards, distinguish curiosity from intent, and define what repeated pattern would matter. |
| Artifact | Evidence ledger, friction review, follow-up question, next instrumentation/test plan. |
| Validation test | Follow up with the user or observe 5-10 more similar users; confirm whether the same friction repeats and whether users still want the outcome. |
| Confidence | Medium-high. |

Evidence:

- Indie Hackers (June 2026): founder has no signup/revenue but learns from one stranger hitting onboarding friction; discussion emphasizes repeated friction patterns over passive views.
- Productboard/Jira Product Discovery/G2 evidence: tools collect feedback, but users still need synthesis and decision support.

Agent default:

```text
Do not treat a single event as proof.
Ask: does this signal reveal pain, intent, friction, channel fit, or just curiosity?
```

## S6: PM Learner Needs Professional Judgment

| Field | Spec |
|---|---|
| User type | Junior PM, transitioning PM, technical/domain expert learning PM, founder trying to think like a PM. |
| Trigger | User has a real product situation but does not know what a professional PM would do next. |
| Product stage | Learning / active project / mid-build / stakeholder pressure. |
| User quote | "How do I get better at tradeoffs?" |
| Core anxiety | "Am I thinking about this correctly, or just pushing tasks?" |
| Decision needed | `narrow`, `test`, `iterate`, or `wait`; education should explain the decision. |
| Evidence needed | Current goal, stakeholders, constraints, metrics, user evidence, tradeoffs, decision history. |
| Agent response | Act as senior PM coworker: assess the situation, explain the reasoning, choose the next PM move, and teach the principle only when useful. |
| Artifact | PM mentor memo, tradeoff matrix, signal report, stakeholder question list, decision rationale. |
| Validation test | Run paid/manual PM coworking sessions for learners/builders; measure whether they pay, reuse the output, and report clearer next action. |
| Confidence | Medium-high in English PM communities; medium in Chinese market. |

Evidence:

- r/ProductManagement, recent 2026 threads: new/transitioning PMs ask about product sense, discovery, prioritization, tradeoffs, roadmaps, GTM, and operating from a PM perspective.
- Product School reviews: users value real examples and instructor judgment more than generic content.
- 人人都是产品经理: AI/PM articles show demand for decision logic, workflow design, critical thinking, and better collaboration with AI/algorithm teams.

Caveat:

The agent must not imply "beginner equals bad PM." It should assess the system: missing signal, unclear strategy, stakeholder pressure, weak onboarding, or true skill gap.

Agent default:

```text
Give judgment first.
Then explain the PM principle behind it.
Do not turn the answer into a course unless the user asks.
```

## Future Scenario Backlog

These are promising but not MVP-first scenarios.

| Scenario | Evidence | Why Not MVP |
|---|---|---|
| Agent-native workflow oversight | Indie Hackers AI-agent thread shows founders struggle to know what agents are running/stuck/failed. | Belongs to later Founder OS / build-bridge layer. |
| Warm lead / opportunity memory | Indie Hackers inbox/DM thread suggests missed opportunities decay without follow-up. | Useful memory feature, but not core AI PM coworker scope yet. |
| Full enterprise PM coworker | Professional PM pain exists, but enterprise workflows pull toward roadmaps and stakeholder tooling. | Contradicts beginner-indie MVP focus. |
| XHS/Jike/Zhihu complaint mining | Likely valuable for China GTM and complaint mining. | Direct access not available in this environment; needs user-consented connector or manual evidence. |

## Scenario Intake Rules

The agent should infer the scenario silently, then ask only for missing context that changes the decision.

| Scenario | Minimum Intake |
|---|---|
| S1 Can build, no direction | Founder skills, candidate pain, target user guess, reachable channel, why now, appetite. |
| S2 Mid-build value unclear | Product link/prototype, target user, core flow, feature list, current evidence, biggest doubt. |
| S3 Built, nobody uses/pays | Traffic source, activation, retention, pricing, user feedback, current channel, recent changes. |
| S4 GTM freeze | Product status, audience, one reachable channel, sales comfort, offer, time budget. |
| S5 Weak signal interpretation | Raw event, user segment, source, behavior sequence, friction point, follow-up availability. |
| S6 PM learner judgment | Project context, decision needed, constraints, stakeholders, metrics, known evidence. |

## Output Contract By Scenario

Every scenario response should include:

```text
Situation assessment
Current Bet
Strongest evidence
Weakest evidence
Riskiest assumption
Decision: build / test / kill / narrow / wait / iterate
Confidence
Next action
Artifact
What would change this decision
Memory update
```

If the user is in learning mode, the agent should explain the PM principle behind the decision without adding a new decision enum.

## PRD Gate Behavior

| Scenario | Default PRD Gate |
|---|---|
| S1 Can build, no direction | Blocked. Needs Bet framing and evidence. |
| S2 Mid-build value unclear | Blocked unless target, value, and WTP are already clear. |
| S3 Built, nobody uses/pays | Blocked for new features; allow experiment spec. |
| S4 GTM freeze | Blocked for product work; allow launch/outreach/test assets. |
| S5 Weak signal interpretation | Blocked until signal repeats or stronger behavior appears. |
| S6 PM learner judgment | Usually blocked; output reasoning, decision memo, or test plan. |

## Scenario Validation For Our Product

The product should validate willingness to pay per scenario, not just interest.

| Scenario | Paid Validation Offer | Success Signal |
|---|---|---|
| S1 | Paid idea/Bet review. | User pays before building or books a paid call. |
| S2 | Paid product/IA/value teardown. | User submits prototype and pays for decision memo. |
| S3 | Paid conversion/positioning review. | User pays after sharing metrics/product link. |
| S4 | Paid launch/GTM action pack. | User pays for scripts/assets and actually sends them. |
| S5 | Paid signal/funnel review. | User shares events/feedback and pays for interpretation. |
| S6 | Paid PM mentor session/report. | User pays and returns with a second real scenario. |

## Sources

- Local research: `docs/research/tmp/02_user_scenarios_evidence_v0.md`
- HN: https://news.ycombinator.com/item?id=38383765
- Vance Lucas: https://vancelucas.com/blog/i-dont-even-know-what-to-build-anymore/
- V2EX: https://v2ex.com/t/968003
- V2EX: https://www.v2ex.com/t/1221614
- V2EX: https://www.v2ex.com/t/1217957
- Reddit ProductManagement: https://www.reddit.com/r/ProductManagement/comments/1rsjy6d/new_pm_how_do_i_get_better_at_tradeoffs_and/
- Reddit ProductManagement: https://www.reddit.com/r/ProductManagement/comments/1hcnp0k/is_every_pm_everywhere_all_the_time_overwhelmed/
- Indie Hackers: https://www.indiehackers.com/post/i-can-build-a-product-in-a-week-then-i-freeze-for-a-month-ae089efce1
- Indie Hackers: https://www.indiehackers.com/post/a-stranger-used-my-product-today-and-didnt-sign-up-i-m-counting-it-as-progress-5250aac9fa
- Product Hunt Validator AI: https://www.producthunt.com/products/validator-ai
- Product Hunt landing roast: https://www.producthunt.com/p/producthunt/landing-page-roast-48-hours-only
- Product Hunt Wispr Flow pivot: https://www.producthunt.com/p/wisprflow/how-wispr-flow-found-pmf-through-a-pivot
- Product School reviews: https://www.coursereport.com/schools/product-school
- 人人都是产品经理: https://www.woshipm.com/pmd/6346139.html
- 人人都是产品经理: https://www.woshipm.com/pmd/6344608.html
