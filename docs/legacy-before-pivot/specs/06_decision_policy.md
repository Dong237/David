# Decision Policy

## Purpose And Authority

This file defines what decision the AI PM coworker is allowed to make after reading the Bet and Evidence.

The decision policy is the gate between market signal and execution. It prevents the product from laundering weak evidence into polished PRDs, coding prompts, or fake certainty.

Landscape lesson: `docs/research/landscape/landscape_b.html` and `docs/research/landscape/landscape_c.html` show that signal ingestion, synthesis, scoring, spec output, and feedback loops are unwired. This policy is the connective gate: evidence-backed decision first, spec second.

## Input Contract

The agent needs these inputs before making a decision:

| Input | Source | Required |
|---|---|---:|
| Current Bet | `04_bet_model.md` | yes |
| Bet state and readiness | `04_bet_model.md` | yes |
| Target user and situation | Bet | yes |
| JTBD/problem | Bet | yes |
| Founder fit | Bet and memory | yes |
| Business outcome | Bet | yes |
| Product outcome | Bet | yes |
| Evidence cards | `05_evidence_model.md` | yes |
| Assumption map | Bet | yes |
| Four risks | Bet and evidence | yes |
| Constraints | Founder memory and current session | yes |
| Stage | User scenario or inferred product stage | yes |
| Existing metrics | Evidence model | optional |

If required inputs are missing, the agent must output:

```text
missing_fields:
assumed_fields:
confidence: low
build_allowed: false
```

The agent may infer fields to keep conversation moving, but inferred required fields must be listed in `assumed_fields`, force low confidence, and block `build`.

## Decision Outputs

Use this enum so future code can map directly to `src/lib/types.ts`.

| Decision | Meaning | Allowed Artifacts |
|---|---|---|
| `build` | Evidence is strong enough and risks are bounded for a scoped implementation. | MVP scope, PRD, coding-agent prompt, instrumentation plan. |
| `test` | Bet is plausible, but a critical assumption is unresolved. | Test plan, landing copy, outreach, interview script, payment offer. |
| `kill` | Evidence is weak, contradicted, unreachable, poor-fit, or not worth further effort. | Kill memo, learning summary, alternative Bet suggestions. |
| `narrow` | User, problem, market, or scope is too broad to judge. | Narrowed ICP, refined Bet, segment choice, sharper JTBD. |
| `wait` | Timing, access, data, legal/payment setup, or founder capacity is insufficient now. | Recheck trigger, access plan, prerequisites. |
| `iterate` | Product exists and some signal is real, but positioning, ICP, price, onboarding, or scope must change. | Experiment brief, metric review, iteration plan. |

## Default Rule

```text
If WTP, payment, or costly behavior is the riskiest unresolved assumption
and the Bet depends on revenue or sustained business value,
block PRD and generate the strongest feasible evidence test.
```

Strongest feasible does not mean cheapest. It means the signal most likely to change the decision within the founder's constraints.

## Gate Sequence

The agent should evaluate gates in order:

| Gate | Question | If Failed |
|---|---|---|
| 1. Situation gate | Do we know what decision the founder needs now? | Ask/fill minimal context, then orient. |
| 2. Bet gate | Is there a specific Bet? | `narrow` or frame Bet. |
| 3. Evidence gate | Is evidence traceable and relevant? | `test` or evidence search. |
| 4. Risk gate | Is the riskiest assumption addressed? | `test`. |
| 5. Founder-fit gate | Can this founder execute the next step? | Change test, `wait`, or narrow. |
| 6. Scope gate | Is appetite and no-go boundary clear? | Shape/narrow before PRD. |
| 7. PRD gate | Are build conditions met? | Block PRD, output missing evidence and next test. |
| 8. Memory gate | Will the result update future judgment? | Add tracking and outcome fields. |

## Build And PRD Gate

A PRD, build spec, or coding-agent prompt is allowed only when all build gate conditions are true. A founder override does not set `PRD gate: allowed`; it creates an `override_build` learning-prototype path with warnings, smallest reversible scope, metric, and review trigger.

| Condition | Required Standard |
|---|---|
| Target user | Specific, reachable, and linked to evidence. |
| Problem/JTBD | Clear situation, struggle, workaround, and desired progress. |
| Business outcome | Revenue, retention, conversion, churn, paid beta, or other explicit outcome. |
| Evidence | Strong enough for current stage and traced to Evidence Cards. |
| WTP/costly behavior | Resolved if business value depends on payment or serious commitment. |
| Four risks | Value, usability, feasibility, viability risk are assessed separately. |
| Riskiest assumption | Tested, reduced, or explicitly accepted. |
| Founder fit | Scope matches founder skill, time, channel, budget, and geography. |
| Scope | Appetite, narrowest useful version, no-gos, and rabbit holes are clear. |
| Success metric | Leading behavior and measurement plan exist. |
| Feedback loop | Post-launch learning or test review is planned. |

Minimum build evidence:

```text
required:
- evidence strength is strong or very_strong for the riskiest assumption
- evidence is directly relevant to the target segment and situation
- WTP/costly behavior is resolved when revenue or business viability depends on it
- no synthetic evidence contributes to build unlock
- waitlist/likes/survey intent alone cannot unlock build
- contradictions are recorded and judged non-fatal for the scoped Bet
```

If any condition fails, output:

```text
No PRD yet.
Reason:
Missing evidence:
Strongest next test:
Success threshold:
What result would unlock build:
```

## Decision Matrix

This matrix is a default policy, not a replacement for PM judgment. The agent must still explain evidence, risk, founder fit, and what would change the decision.

| Evidence Strength | Risk Severity | Founder Fit | Default Decision |
|---|---|---|---|
| none/weak | high | any | `test`, `narrow`, or `kill` |
| none/weak | medium | strong | `test` |
| none/weak | low | strong | `test` unless only execution risk remains |
| medium | high | any | `test` |
| medium | medium | weak | `narrow` or `wait` |
| medium | medium | strong | `test` or small `iterate` |
| medium | low | strong | `iterate` or bounded `build` only for non-core scope |
| strong | high | any | `test` the high-risk axis before build |
| strong | medium | weak | `wait`, `narrow`, or reduce scope |
| strong | medium | strong | `build` if PRD gate passes |
| very_strong | low/medium | strong | `build` or `iterate` |
| contradicted | any | any | `kill`, `narrow`, or pivot |

## Decision Rules

### Build

Choose `build` when:

- Bet is `build_ready`
- evidence is strong or very strong for the riskiest assumption
- WTP or costly behavior is addressed when business value depends on it
- scope is bounded by appetite and no-gos
- founder can execute or direct the build
- success metric and instrumentation are clear

Do not choose `build` for a raw idea, vague ICP, generic complaint cluster, or waitlist-only signal.

### Test

Choose `test` when:

- pain is credible but WTP, solution, channel, usability, or feasibility is unresolved
- the Bet can be advanced by a concrete evidence test
- a test can create stronger evidence than another discussion
- the founder has enough access, time, or budget to run the test

Test policy:

- test the riskiest assumption, not the easiest assumption
- define success/failure thresholds before running the test
- prefer payment, deposit, costly behavior, reply quality, or observed behavior over opinions
- avoid tests that cannot change the decision

Required Test Plan schema:

| Field | Required | Meaning |
|---|---:|---|
| `test_id` | yes | Stable ID. |
| `bet_id` | yes | Bet being tested. |
| `riskiest_assumption_id` | yes | Assumption the test is designed to resolve. |
| `test_type` | yes | `payment`, `deposit`, `concierge`, `fake_door`, `interview`, `prototype`, `data_mining`, `research_spike`, `pricing`, `landing_page`, `outreach`. |
| `target_audience` | yes | Specific segment and channel. |
| `script_copy_assets` | yes | Message, landing copy, interview script, prototype, or offer. |
| `success_rule` | yes | What result is enough to proceed. |
| `kill_rule` | yes | What result should kill or pause the Bet. |
| `iterate_rule` | yes | What result should change ICP, price, copy, or scope. |
| `tracking_fields` | yes | Data to capture. |
| `timeline` | yes | Start, duration, and review date. |
| `cost_budget` | optional | Money, credits, or tool spend. |
| `owner` | yes | Founder, agent, or external worker. |

### Kill

Choose `kill` when:

- repeated evidence contradicts the problem, WTP, or founder access
- user segment is unreachable and no practical access path exists
- founder fit is structurally poor for this Bet
- the market opening depends on fantasy assumptions
- the opportunity is real but not worth this founder's appetite

Killing a Bet should preserve learning and possible adjacent opportunities.

### Narrow

Choose `narrow` when:

- user segment is too broad
- multiple jobs are mixed together
- evidence points to different users or situations
- scope is too large for the founder
- competitor landscape suggests only one niche is underserved

Narrowing should produce a sharper Bet, not just a smaller feature list.

### Wait

Choose `wait` when:

- timing, regulation, payment setup, data access, or founder capacity blocks a good test
- the opportunity requires a channel the founder cannot yet access
- evidence is promising but stale and must be rechecked
- the Bet depends on a platform/API that is unstable

Waiting must include a recheck trigger. Do not use `wait` as a vague non-decision.

### Iterate

Choose `iterate` when:

- product exists and has some real usage, replies, payment, or retention
- the problem is not "build more" but improve activation, positioning, pricing, onboarding, ICP, or scope
- metrics show a bottleneck
- qualitative evidence explains the bottleneck

Iteration should name the bottleneck and the expected behavior change.

## Confidence Model

Confidence is the agent's certainty in the decision, not the attractiveness of the idea.

| Confidence | Meaning | Allows | Forbids |
|---|---|---|---|
| `low` | Mostly assumed, thin, indirect, stale, or contradicted. | Narrowing, research, test design. | Build claim, PRD, strong recommendation. |
| `medium` | Multiple relevant signals, but causal proof or WTP is incomplete. | Evidence test, bounded iteration, limited manual offer. | Broad build or scale claim. |
| `high` | Direct behavior/payment/retention or strong triangulation with limited contradiction. | Build, iterate, or double down if gate passes. | Ignoring new contradiction. |

Confidence must include downgrade reasons when not high.

## Score Policy

Scores can help compare Bets, but they must not become fake precision.

Allowed score dimensions:

- pain severity
- demand frequency
- WTP/costly behavior
- reachability
- competitor weakness
- founder fit
- feasibility
- confidence

Rules:

1. Never emit one composite score without showing the underlying dimensions.
2. Every score must link to evidence or say `assumed`.
3. A low-confidence high score should recommend `test`, not `build`.
4. Scores do not override the PRD gate.

## Output Contract

Every decision must output:

```text
Decision:
- decision: build | test | kill | narrow | wait | iterate
- confidence: low | medium | high
- Bet state/readiness
- evidence summary
- riskiest assumption
- four risks
- founder-fit note
- next action
- success threshold
- what would change this decision
- PRD gate: allowed | blocked
- memory updates
```

## Override Policy

The founder may override the agent. The system should allow it, but must not pretend the Bet became build-ready.

Override outcomes:

| Outcome | Meaning |
|---|---|
| `override_build` | Founder chooses to build despite blocked PRD gate. Output smallest reversible learning prototype, not a full PRD. |
| `override_test` | Founder chooses a weaker or different test. Record the stronger recommended test and accepted risk. |
| `override_wait` | Founder pauses despite agent recommending action. Record review trigger. |

Override log:

| Field | Meaning |
|---|---|
| `override_id` | Stable ID. |
| `decision_id` | Decision being overridden. |
| `override_outcome` | `override_build`, `override_test`, or `override_wait`. |
| `user_choice` | What the founder chose. |
| `agent_warning` | Evidence gap or risk accepted. |
| `accepted_risk` | Value, usability, feasibility, viability, or trust. |
| `smallest_reversible_scope` | Required for `override_build`. |
| `learning_metric` | Required for `override_build`. |
| `review_trigger` | When to revisit. |

If a founder builds against advice, the agent should still help scope the smallest reversible version and define the learning metric.

## Feedback Loop After Decision

Every decision must create a future learning hook.

| Decision | Required Follow-Up |
|---|---|
| `build` | Instrumentation, launch metric, review date. |
| `test` | Test result fields, success threshold, decision rule. |
| `kill` | Kill reason, disconfirming evidence, adjacent Bet candidates. |
| `narrow` | New Bet ID or refined Bet state. |
| `wait` | Recheck date or trigger. |
| `iterate` | Bottleneck metric, experiment result, before/after comparison. |

## Failure Modes

| Failure Mode | Guardrail |
|---|---|
| PRD laundering | PRD gate requires evidence, risk, scope, metric, and founder fit. |
| Feature factory | Tie every action to business outcome and riskiest assumption. |
| Vanity metrics | Likes, traffic, and waitlists cannot unlock build alone. |
| Overconfident AI | Show confidence, downgrade reasons, and what would change the decision. |
| Generic advice | Output a specific next action, threshold, and artifact. |
| Founder fantasy | Challenge vague ICP, no channel, no WTP, and unrealistic scope. |
| Synthetic-user overtrust | Synthetic evidence has `none` strength. |
| One-score theater | Separate dimensions and trace each to evidence. |
| Endless debating | When evidence is missing, create the test. |
| Scope drift | Appetite, no-gos, and circuit breaker are required for build. |

## Sources

- Local: `docs/research/landscape/landscape_b.html`
- Local: `docs/research/landscape/landscape_c.html`
- Local: `docs/specs/00_product_principles.md`
- Local: `docs/specs/01_target_users.md`
- Local: `docs/specs/03_pm_reasoning_protocol.md`
- SVPG, Four Big Risks: https://www.svpg.com/four-big-risks/
- Product Talk, Opportunity Solution Trees: https://www.producttalk.org/opportunity-solution-trees/
- Product Talk, Assumption Testing: https://www.producttalk.org/assumption-testing/
- The Mom Test: https://www.momtestbook.com/
- Lean Startup Principles: https://theleanstartup.com/principles
- Shape Up: https://basecamp.com/shapeup
- Intercom RICE: https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/
- GitHub Spec Kit: https://github.com/github/spec-kit
