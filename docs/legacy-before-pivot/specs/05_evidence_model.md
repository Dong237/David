# Evidence Model

## Purpose And Boundary

This file defines what proof the AI PM coworker is allowed to trust.

Evidence is not the same as reasoning. Evidence is an observed fact, source, behavior, quote, metric, payment, complaint, or market artifact that can be traced back to where it came from. LLM reasoning can interpret evidence, but it is not evidence unless attached to an external source or a user-provided fact.

Landscape lesson: `docs/research/landscape/landscape.html`, `docs/research/landscape/landscape_b.html`, and `docs/research/landscape/landscape_c.html` all show the same gap: tools ingest signals, generate ideas, or write specs, but they lose provenance when moving through synthesis, scoring, hypothesis framing, validation, and spec output. This file prevents that loss.

## Judgment Core Relationship

| Spec | Responsibility |
|---|---|
| `04_bet_model.md` | Defines Bet, assumptions, founder fit, scope, and readiness. |
| `05_evidence_model.md` | Defines evidence cards, claims, strength, confidence, downgrade rules, and traceability. |
| `06_decision_policy.md` | Consumes Bet and Evidence to decide build/test/kill/narrow/wait/iterate. |

## Evidence Card Schema

Every meaningful claim should trace to one or more Evidence Cards.

| Field | Required | Meaning |
|---|---:|---|
| `evidence_id` | yes | Stable ID. |
| `bet_id` | optional | Bet this evidence currently informs. |
| `assumption_id` | optional | Assumption this evidence supports, weakens, or contradicts. |
| `source_type` | yes | See source type enum below. |
| `source_name` | yes | Platform, user, product, metric source, or artifact name. |
| `source_url` | optional | URL, permalink, file path, screenshot, or report reference. |
| `captured_at` | yes | When the evidence was captured. |
| `observed_at` | optional | When the behavior or event happened, if different. |
| `user_segment` | optional | Segment represented by this evidence. |
| `raw_excerpt` | optional | Short quote, metric, screenshot note, or observation. |
| `extracted_claim` | yes | Structured claim inferred from the evidence. |
| `claim_ids` | optional | Claims derived from this evidence. |
| `observed_behavior` | optional | What someone actually did. |
| `pain_phrase` | optional | User language that describes pain or urgency. |
| `current_workaround` | optional | What the user does today. |
| `wtp_hint` | optional | Payment, budget, spending, buyer intent, or costly behavior signal. |
| `competitor_or_alternative` | optional | Existing product, manual workaround, spreadsheet, agency, or no-solution alternative. |
| `strength` | yes | `none`, `weak`, `medium`, `strong`, `very_strong`. |
| `confidence` | yes | `low`, `medium`, `high`. |
| `relevance` | yes | `low`, `medium`, `high` fit to the target Bet. |
| `contradiction` | optional | What this evidence challenges. |
| `downgrade_reasons` | optional | Reasons confidence was reduced. |
| `expires_at` | optional | Date or condition for recheck. |

## Claim Schema

A Claim is the interpreted statement that connects raw evidence to a Bet assumption. Evidence Cards can produce multiple Claims; Claims can depend on multiple Evidence Cards.

| Field | Required | Meaning |
|---|---:|---|
| `claim_id` | yes | Stable ID. |
| `claim_text` | yes | One explicit statement the agent believes the evidence supports or challenges. |
| `bet_id` | optional | Bet this claim currently informs. |
| `evidence_ids` | yes | Evidence Cards used to create the claim. |
| `assumption_ids` | optional | Assumptions supported, weakened, or contradicted. |
| `claim_type` | yes | `pain`, `segment`, `workaround`, `wtp`, `competitor`, `channel`, `usability`, `feasibility`, `viability`, `metric`, `contradiction`. |
| `inference_method` | yes | `direct_observation`, `quote_extraction`, `metric_reading`, `cluster_synthesis`, `competitor_analysis`, `llm_assisted_extraction`, or `founder_provided_fact`. |
| `confidence` | yes | `low`, `medium`, or `high`. |
| `relevance` | yes | `low`, `medium`, or `high` fit to the Bet. |
| `downgrade_reasons` | optional | Why confidence or relevance was reduced. |
| `contradicts_claim_ids` | optional | Claims this one challenges. |
| `created_at` | yes | When the claim was created. |
| `expires_at` | optional | Recheck date or trigger. |

Claim rules:

1. Claims must stay narrower than the evidence allows.
2. A `cluster_synthesis` claim must retain links to all source Evidence Cards.
3. `llm_assisted_extraction` is acceptable only when source evidence exists.
4. A Claim with no Evidence Cards is an assumption, not evidence.

## Source Type Enum

| Source Type | Meaning |
|---|---|
| `paid_retention` | Renewal, repeat purchase, paid repeated use, low churn, expansion. |
| `payment` | Purchase, preorder, deposit, paid pilot, paid call, paid beta. |
| `costly_workaround` | User spends time, money, labor, reputation, or process pain to solve it today. |
| `concierge_or_manual_test` | Manual service or fake-door flow with real stakes. |
| `interview_past_behavior` | Specific story about what the user already did. |
| `complaint` | Social post, forum post, support issue, ticket, or review expressing pain. |
| `review` | App store, G2, Capterra, Chrome store, Product Hunt, marketplace, or tool review. |
| `search_demand` | Keyword volume, trend, autocomplete, search ads, SEO data. |
| `competitor` | Pricing, positioning, traffic, review pattern, feature gap, switching friction. |
| `analytics` | Activation, retention, conversion, churn, usage, cohort data. |
| `waitlist_or_like` | Signup, like, comment, bookmark, upvote, survey interest. |
| `expert_or_founder_opinion` | Founder intuition, expert take, advisor suggestion. |
| `synthetic` | AI persona, LLM market opinion, generated user quote, simulated score. |

## Evidence Hierarchy

Evidence strength is ranked by behavior, cost, relevance, and causal link to the Bet.

| Rank | Evidence | Default Strength | Notes |
|---:|---|---|---|
| 1 | Paid retention, repeat purchase, renewal, churn reduction | `very_strong` | Strongest proof that value and viability may exist. |
| 2 | Payment, preorder, deposit, paid pilot, paid discovery call | `strong` | Strong WTP signal, but still check retention and delivery risk. |
| 3 | Costly workaround or manual concierge test with real stakes | `strong` | Strong when tied to target segment and current pain. |
| 4 | Specific past-behavior interview story | `medium` | Stronger than opinions, weaker than real payment or usage. |
| 5 | Strong complaint cluster with urgency and workaround | `medium` | Can create a Bet; rarely makes it build-ready alone. |
| 6 | Search demand, review patterns, competitor complaint clusters | `medium` | Good for opportunity discovery and triangulation. |
| 7 | Waitlist, likes, comments, upvotes, survey intent | `weak` | Useful only with segment, source, and conversion context. |
| 8 | Founder intuition, expert opinion, LLM hypothesis | `weak` | Can seed research, not justify build. |
| 9 | Synthetic users, invented quotes, generic TAM estimates | `none` | Brainstorming material, not evidence. |

## Claim Extraction Rules

Raw signals should become structured claims before they affect a Bet.

| Step | Rule |
|---|---|
| Capture | Store source, date, raw excerpt or metric, and source type. |
| Normalize | Convert messy text or metric into one explicit claim. |
| Segment | Identify which user/buyer segment the claim represents. |
| Map | Link the claim to a Bet assumption or mark it as unassigned. |
| Qualify | Assign strength, relevance, confidence, and downgrade reasons. |
| Preserve | Keep raw source available for audit. |

Bad extraction:

```text
"People hate onboarding."
```

Good extraction:

```text
Segment: solo AI SaaS builders with prototypes.
Claim: users abandon setup when a tool asks for product strategy inputs before showing value.
Source: 7 Reddit comments and 3 competitor reviews from May 2026.
Assumption supported: activation improves if first value appears before full intake.
```

## Complaint Mining Model

Complaints are early signals, not proof of willingness to pay. Extract the shape of pain.

| Field | Meaning |
|---|---|
| `pain_phrase` | Exact user language. |
| `actor` | Who is complaining. |
| `context` | When or where pain happens. |
| `urgency` | Frequency, deadline, emotional intensity, business cost. |
| `current_workaround` | What they already tried. |
| `alternative` | Tool, agency, spreadsheet, process, or manual method used today. |
| `wtp_hint` | Paid tool, budget mention, paid workaround, buying request, or price complaint. |
| `frequency` | Count across unique users and sources. |
| `source_cluster` | Reddit, X, XHS, app reviews, G2, V2EX, etc. |
| `contradiction` | Evidence that the pain is niche, solved, or not urgent. |

Complaint cluster readiness:

| Cluster Quality | Meaning | Allowed Use |
|---|---|---|
| Weak | Few posts, unclear actor, no workaround. | Research seed only. |
| Medium | Repeated pain from similar users, some workaround. | Frame Bet and design WTP test. |
| Strong | Repeated urgent pain, existing paid or costly workaround. | Can support test-ready Bet and maybe small manual offer. |

## Competitor Evidence

Competitors are evidence about alternatives, expectations, pricing, trust, and gaps.

| Field | What To Capture |
|---|---|
| `alternative_name` | Product, service, spreadsheet, consultant, community, manual process. |
| `target_segment` | Who the competitor appears to serve. |
| `positioning` | Main promise and category. |
| `pricing` | Public pricing, paid tiers, usage model, enterprise wall. |
| `review_complaints` | Repeated negative review themes. |
| `switching_friction` | Why users stay despite pain. |
| `underserved_segment` | Who is not served well. |
| `proof_of_demand` | Traffic, revenue proxy, review volume, public customers, community adoption. |
| `risk_to_bet` | Why this competitor makes the Bet harder. |

Competitor evidence should not become "competitor has feature X, so build feature X." It should clarify user expectation and the opening for a sharper Bet.

## Payment Evidence By Product Type

| Product Type | Strong Evidence | Medium Evidence | Weak Evidence |
|---|---|---|---|
| SaaS | Paid pilot, trial-to-paid, annual contract, repeat paid use. | Deposit, paid beta, manual concierge fee. | Free waitlist, demo interest. |
| AI tool | Paid credits, prepaid usage, repeat paid generations, team adoption. | Paid beta slot, paid prompt/workflow audit. | "I would use this" or free usage only. |
| Info product | Paid guide, template, cohort, membership, repeat purchase. | Deposit for cohort or paid sample chapter. | Likes, saves, newsletter signup. |
| Service-to-software | Paid manual service, client deposit, repeated paid service request. | Paid consultation that maps to future software workflow. | People say automation sounds useful. |
| Marketplace | Completed transaction, buyer deposit, supplier commitment. | Manual brokered transaction with fees. | Two-sided signups without transaction. |
| Consumer app | Paid app, subscription, IAP, repeated costly behavior. | High-frequency unpaid behavior plus clear monetization path. | Installs, likes, viral attention. |
| Community/content | Paid membership, sponsorship, paid private group, renewal. | Paid event or workshop. | Followers, comments, free group joins. |

## Confidence Factors

Confidence is separate from evidence strength. A strong source can have low confidence if it is stale, irrelevant, or contradicted.

| Factor | Increase Confidence | Decrease Confidence |
|---|---|---|
| Relevance | Same user, same situation, same problem. | Different segment or context. |
| Recency | Recent enough for this market cycle. | Old evidence in a fast-changing market. |
| Source quality | Direct source, raw quote, metric, payment record. | Paraphrase, scraped summary, missing URL. |
| Sample size | Multiple unique users or events. | One anecdote. |
| Consistency | Converges across sources. | Conflicting signals. |
| Causal strength | Behavior directly tied to the Bet. | Correlation or generic interest. |
| Costliness | User spent money, time, reputation, or switching cost. | Like, comment, or low-friction click. |
| Contradiction | Contradictions are identified and explained. | Agent ignores contrary evidence. |

Confidence labels:

| Label | Meaning |
|---|---|
| `low` | Plausible but thin, indirect, stale, or contradicted. |
| `medium` | Multiple relevant signals, but causal proof or WTP is incomplete. |
| `high` | Direct behavior, payment, retention, or strong triangulation with limited contradiction. |

## Downgrade And Staleness Rules

Downgrade evidence when:

- source URL, date, or raw excerpt is missing
- the segment does not match the Bet
- the source is a duplicate or repost
- the market changed materially
- the evidence is from a platform with biased incentives
- the user was led by the founder's pitch
- the claim is about future intent rather than past behavior
- the metric is vanity traffic without activation, retention, payment, or reply quality
- the evidence contradicts payment, retention, or churn data

Default staleness:

| Evidence Type | Recheck Trigger |
|---|---|
| Search trends | 30-90 days in fast markets, 6-12 months in stable markets. |
| Social complaints | 30-90 days or after platform/API changes. |
| Competitor pricing | 30-90 days. |
| Reviews | 90-180 days unless product changed. |
| Interviews | When target segment, product stage, or market context changes. |
| Payment tests | After offer, price, channel, or ICP changes. |
| Retention/churn | Every cohort cycle. |

## Synthetic And AI Evidence Policy

LLM output can help with:

- summarizing raw evidence
- extracting claims
- clustering complaints
- generating hypotheses
- designing tests
- identifying missing evidence

LLM output cannot be counted as evidence when it:

- invents users, quotes, market size, or prices
- simulates buyer intent
- creates persona opinions
- estimates TAM without external data
- assigns scores without source-backed subclaims

Rule:

```text
No external source or user-provided fact -> no evidence strength above `none`.
```

## Traceability Chain

Every decision should be explainable through this chain:

```text
raw evidence
-> evidence card
-> extracted claim
-> supported or contradicted assumption
-> Bet readiness
-> decision
-> next action
```

Minimum traceability fields:

```text
evidence_id
claim_id
assumption_id
bet_id
decision_id
source_url_or_user_fact
captured_at
strength
confidence
downgrade_reasons
```

## Evidence Sufficiency By Risk

| Risk | Stronger Evidence | Weak Evidence |
|---|---|---|
| Value | Payment, repeat use, urgent workaround, clear painful story. | Compliments, likes, "sounds useful." |
| Usability | Prototype task completion, onboarding observation, activation behavior. | Founder thinks it is obvious. |
| Feasibility | Technical spike, working prototype, known APIs, realistic cost. | AI demo, untested integration assumption. |
| Viability | Paid channel, repeatable reach, sustainable price, acceptable cost, founder capability. | Big market size, competitor funding, generic trend. |
| Ethics/trust | Explicit consent, privacy plan, safe claim boundaries, user trust feedback. | "We will be careful." |

## Agent Output Contract

When the agent cites evidence, output:

```text
Evidence Summary:
- strongest_evidence
- weakest_evidence
- missing_evidence
- contradictions
- confidence
- downgrade_reasons
- sources
```

If evidence is weak, the agent should say which stronger signal would change the decision.

## Sources

- Local: `docs/research/landscape/landscape.html`
- Local: `docs/research/landscape/landscape_b.html`
- Local: `docs/research/landscape/landscape_c.html`
- Local: `docs/specs/00_product_principles.md`
- Local: `docs/specs/01_target_users.md`
- Local: `docs/specs/03_pm_reasoning_protocol.md`
- The Mom Test: https://www.momtestbook.com/
- Product Talk, Customer Interviews: https://www.producttalk.org/customer-interviews/
- Product Talk, Product Discovery: https://www.producttalk.org/product-discovery/
- Product Talk, Assumption Testing: https://www.producttalk.org/assumption-testing/
- Oxford CEBM Levels of Evidence: https://www.cebm.ox.ac.uk/resources/levels-of-evidence/ocebm-levels-of-evidence
- GRADE Working Group: https://www.gradeworkinggroup.org/
