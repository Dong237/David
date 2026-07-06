# AI PM Doctor Evidence Sprint

Date: 2026-07-01

Full normalized subagent output is in
[`ai_pm_doctor_evidence_sprint_appendix_2026-07-01.md`](./ai_pm_doctor_evidence_sprint_appendix_2026-07-01.md):
15 English Evidence Cards, 15 Chinese Evidence Cards, competitor matrix, 20 candidate cases,
outreach drafts, and critic review.

## Executive Verdict

| Question | Answer |
|---|---|
| What is this repo? | `David`: a Next/Tauri desktop prototype plus product specs for an AI PM coworker that turns messy founder/product signals into evidence-backed product bets, decisions, and next tests. |
| What is it for? | To stop weak evidence from becoming polished PRDs or AI-coding prompts. Its core job is not writing documents; it is deciding `build / test / kill / narrow / wait / iterate`. |
| What state is it in? | Strong strategy/spec foundation, early desktop prototype, no proven market pull yet. The repo is clearer as a PM reasoning engine than as a validated product. |
| What did research show? | Strong pain: builders ship demos/MVPs and then cannot tell if the issue is user, value, positioning, channel, price, or scope. Medium reachability: many public cases exist. Weak paid proof: no direct evidence yet that enough people will pay for one diagnosis. |
| Decision by repo policy | `test`, not `build`. PRD/build gate remains blocked until payment or costly-behavior evidence exists. |

## Method And Access

| Channel | Status | Used For |
|---|---|---|
| Subagents | 5 parallel agents | English pain evidence, Chinese pain evidence, competitor/product map, candidate sourcing, critic review. |
| Public web search/open | Used | Product category, public posts, public forums, primary/context sources. |
| Local repo reads | Used | Specs, package, access plans. |
| GitHub CLI | Authenticated | Repo/category search. |
| HN/V2EX public APIs | Usable | Public founder/product pain checks. |
| Product Hunt API | Token missing | Public web fallback only. |
| Zhihu API | Secret missing | Public web fallback only. |
| Reddit API | Credentials missing | Public web fallback only; no login/session scraping. |

## Domain: AI PM / AI For PM / PM With AI

This domain is the newest form of an old management problem: how humans decide what is worth building under uncertainty.

| Historical layer | Core idea | Relevance to AI PM |
|---|---|---|
| Drucker / management | Business exists to create customers; marketing and innovation produce results. | AI PM must connect product work to real customer creation, not just internal artifacts. |
| Herbert Simon / design | Design means changing existing situations into preferred ones. | Product management is applied design under constraints. |
| IDEO / human-centered design | Start with people, prototype, learn through iteration; useful in uncertainty and rapid tech change. Source: [IDEO](https://designthinking.ideo.com/introduction). | AI PM should help teams move from ambiguity to learning loops. |
| Christensen / JTBD | Understand the circumstances and forces behind decisions. Source: [Christensen Institute](https://www.christenseninstitute.org/theory/jobs-to-be-done/). | The unit is not a feature; it is user progress in a situation. |
| Steve Blank / customer development | No facts inside the building; validate hypotheses with experiments. Source: [Steve Blank](https://steveblank.com/2012/03/29/nail-the-customer-development-manifesto/). | AI PM should force outside evidence before build. |
| Lean Startup | Validated learning and continuous testing of a vision. Source: [Lean Startup](https://theleanstartup.com/principles). | The repo's decision policy is basically a modern AI-native validated-learning gate. |
| AI era | Building is cheaper; wrong building is more common and faster. | The scarce function shifts from implementation to judgment, evidence quality, and context. |

## Product Landscape

| Category | Examples | Value Provided | Gap For This Repo |
|---|---|---|---|
| AI PM doc copilots | [ChatPRD](https://www.chatprd.ai/), WriteMyPRD, Miro/Figma PRD generators | Draft PRDs, user stories, briefs, gap checks. ChatPRD claims 100k+ PMs and 750k+ docs. | Mostly document acceleration; weaker on whether the idea deserves build. |
| Product OS / roadmap | Productboard, Aha!, ProdPad, Jira Product Discovery | Centralize feedback, priorities, roadmap, stakeholders. | Heavy systems of record; decisions often still rely on human context stitching. |
| AI product context | Productboard Spark, ProdPad CoPilot PM | Search product context, summarize feedback, draft work, align teams. ProdPad promises decisions faster with real product data. Source: [ProdPad](https://www.prodpad.com/features/ai-for-product-managers/). | Strong incumbent risk; repo needs a sharper evidence-gate wedge. |
| Feedback and VOC | Canny, UserVoice, Kraftful/Amplitude, Enterpret, Dovetail, Cycle | Capture, dedupe, summarize, prioritize feedback. | Feedback volume is not proof of value; someone still judges evidence quality and next test. |
| Analytics / experimentation | Amplitude, Mixpanel, PostHog, Statsig, Optimizely | Quantify behavior and run experiments. | Tells what happened, less often why or what decision follows. |
| AI coding / vibe builders | Cursor, Claude Code, Codex, Devin, Lovable, Bolt, Replit, v0 | Build faster from prompts/specs. | Bad product judgment now burns AI credits and produces wrong software faster. |
| Community advice | Reddit, HN, V2EX, Indie Hackers, Product Hunt roasts | Free feedback, social proof, rough diagnosis. | Free but noisy, inconsistent, not accountable, and often not target-user evidence. |

## Repeated Pain Patterns

| Pattern | Evidence Strength | What People Are Pursuing | Why It Matters |
|---|---|---|---|
| "I built it, now what?" | Strong | First users, unbiased feedback, whether to continue. | Core fit for `test / narrow / iterate`. |
| Low or zero users after MVP | Strong | Channel, ICP, positioning, first 10 users. | Pain is real, but often GTM-shaped. |
| Landing page or demo has weak signal | Strong | Interpret signups, demo drop-off, copy, CTA, target. | Direct fit for diagnosis before more build. |
| AI made building easy, not product success | Strong | Figure out what to build/sell, not just ship. | The repo's "evidence before PRD" rule is aligned. |
| Free/cheap community feedback exists | Strong | Quick outside opinion without paying. | This is the main competitor to a paid diagnosis. |
| Paid willingness for diagnosis | Weak | Some adjacent hints: coach seeking, ad/tool spend, high opportunity cost. | Must be tested before product build. |

## Selected Evidence

| ID | Source | Platform | Signal | Caveat |
|---|---|---|---|---|
| EN-01 | [I spent months building an app and now I don't know how to get users](https://news.ycombinator.com/item?id=37675989) | HN | MVP, no users, asks how to get first 10 and whether idea is worth pursuing. | Strong pain, weak budget/WTP. |
| EN-02 | [I built a SaaS in 10 days. 3 weeks live. 0 paying customers](https://www.indiehackers.com/post/i-built-a-saas-in-10-days-3-weeks-live-0-paying-customers-heres-the-data-7cb6b6accf) | Indie Hackers | Live product, zero paid users, asks for feedback. | Wants feedback; payment for diagnosis unproven. |
| EN-03 | [Built a decision layer for Etsy sellers](https://www.indiehackers.com/post/built-a-decision-layer-for-etsy-sellers-feedback-wanted-before-i-build-the-rest-1e39ba5e4b) | Indie Hackers | Wants teardown before building the rest. | Early; not necessarily buyer. |
| EN-04 | [Ask HN: Getting traffic to your MVP](https://news.ycombinator.com/item?id=19888249) | HN | Few feedback items, not from target audience, needs traffic/conversion signal. | Product details limited. |
| EN-05 | [PM offers free validation audit](https://www.reddit.com/r/SaaS/comments/1qttzns/im_a_pm_with_10_years_experience_ill_audit_your/) | Reddit public page | Closest service-form evidence: founders engage with validation audit. | Free demand, not paid proof. |
| ZH-01 | [以为会爆，结果很冷](https://www.v2ex.com/t/1199589) | V2EX | AI helped ship; positioning/distribution/continue decision remains hard. | One paid user does not prove direction. |
| ZH-02 | [第一款 App 上线，无人下载](https://www.v2ex.com/t/1115657) | V2EX | Few downloads, tiny paid signal, user behavior differs from creator's assumption. | Could be an iterate/narrow case, not kill. |
| ZH-03 | [2023 年独立开发者这条路还能走下去吗](https://www.v2ex.com/t/938565) | V2EX | Full-time effort, low response, uncertain demand vs promotion. | Low exposure may not equal no demand. |
| ZH-04 | [如何让更多人愿意付费用](https://www.v2ex.com/t/1139572) | V2EX | AI product has users but weak paid conversion and unclear differentiation. | Later stage than the initial target. |
| ZH-05 | [推广独立开发产品，我做了哪些尝试](https://laike9m.com/blog/tui-yan-du-li-kai-fa-chan-pin-wo-zuo-liao-na-xie-chang-shi%2C159/) | Blog | Real channel experiments and paid promotion choices. | Advanced founder; not average buyer. |
| ZH-06 | [vibe coding 小程序复盘](https://sspai.com/post/106544) | Shaoshupai | Wrong demand/positioning, maintenance cost, stop-loss thinking. | Retrospective, not a live purchase signal. |
| MAIN-01 | [Productboard tech stack article](https://www.productboard.com/blog/centralizing-your-product-tech-stack/) | Productboard | PM stack is fragmented; AI needs connected product context. | Incumbent can attack this gap. |
| MAIN-02 | [Product Hunt landing page roast](https://www.producthunt.com/p/producthunt/landing-page-roast-48-hours-only) | Product Hunt | Public demand for landing-page feedback and direct critique. | Free/community format. |
| MAIN-03 | [G2 product management category](https://www.g2.com/categories/product-management-software) | G2 | Large mature category with many tools and common cons: learning curve, slow loading, missing features. | Enterprise category differs from indie one-off diagnosis. |

## Critic Review

| Claim | Status | Weakest Link | Consequence |
|---|---|---|---|
| Builders get stuck after MVP/landing page | Supported | Self-selected complaints | Real pain cluster. |
| They need product judgment, not PRD | Partly supported | Many cases are GTM/channel problems | Position as "next decision + evidence test," not "PM document writer." |
| They will pay for one diagnosis | Unsupported | No verified paid purchase/deposit | Must run paid concierge test. |
| AI PM is a large category | Partly supported | Enterprise PM tools and indie builders are different buyers | Start with one wedge. |
| Build the product now | Unsupported | WTP/costly behavior unresolved | PRD/build gate blocked. |

## Inspiration For This Repo

The repo seems inspired by one precise observation: AI has made it cheap to build and write specs, but not cheap to know what is worth building. Most current tools help produce artifacts: PRDs, roadmaps, feedback summaries, prototypes, tickets, or code. This repo is trying to sit one step earlier as a judgment layer:

```text
raw idea / weak signal
-> framed Bet
-> evidence quality check
-> risk and assumption map
-> build/test/kill/narrow/wait/iterate
-> only then artifact or coding-agent prompt
```

That is the strongest non-obvious insight. Do not dilute it into another "AI PM assistant."

## Billion-Dollar Startup Thesis

| Stage | Scope | Product | Buyer | Proof Needed |
|---|---|---|---|---|
| 0. Manual wedge | Paid PM Doctor for technical indie/AI builders | 48-hour diagnosis: decision, riskiest assumption, next test, outreach/test copy | Founder with demo/MVP and zero or few paid users | 3+ paid diagnoses from 40 outreaches in 10 days. |
| 1. Repeatable service | Diagnosis template + evidence intake + benchmark library | Semi-automated audits for landing pages, demos, product pages, GitHub repos | Indie builders, accelerators, studios | Repeat purchases, referrals, measurable changed action. |
| 2. Team workflow | Evidence gate before PRD/coding | Connect Notion/Linear/GitHub/analytics/feedback; block weak builds | Small product teams, agencies, AI-native studios | Teams use it before each sprint; saves wrong-build cost. |
| 3. Enterprise context OS | Product decision intelligence platform | Evidence graph, assumption ledger, decision records, experiment governance, AI-agent handoff | VP Product, Product Ops, VP Eng | Annual contracts; integrations become system of record. |
| 4. Network/moat | Cross-company anonymized decision benchmarks | "What evidence is enough?" benchmarks by segment and stage | Product orgs, investors, accelerators | Unique dataset and workflow lock-in. |

The billion-dollar version is not "AI writes PRDs." It is "product decisions become auditable, evidence-backed, connected to outcomes, and executable by AI agents."

## Where To Start

| Step | Action | Success Threshold |
|---|---|---|
| 1 | Pick one buyer: technical AI/SaaS indie builders with live demo/MVP and fewer than 10 real feedback items or zero paid users. | No other ICP for 10 days. |
| 2 | Offer a paid concierge diagnosis. | "$99 PM Doctor: decision + riskiest assumption + next evidence test in 48 hours." |
| 3 | Contact 40 public candidates from IH/HN/V2EX/product pages. | 5 qualified calls and 3 paid at $99, or 2 paid at $199. |
| 4 | Deliver manually using repo policy. | At least 2 founders say the diagnosis changed their next action. |
| 5 | Only automate repeated parts. | Intake, evidence card creation, risk map, decision memo, outreach/test copy. |
| 6 | If weak success, narrow. | Try only AI SaaS, only landing-page/demo conversion, or only "zero paid users after launch." |
| 7 | If failure, do not build. | Reframe as GTM teardown, landing-page audit, or enterprise product-context gate. |

## Immediate Product Scope

In scope now:

- Intake: URL/demo/product note/current metrics.
- Bet framing: user, situation, job, solution guess, business outcome.
- Evidence card collection.
- Risk map: value, usability, feasibility, viability.
- Decision: `build / test / kill / narrow / wait / iterate`.
- Next evidence test: script, target, threshold.
- Manual delivery PDF/markdown.

Out of scope now:

- Full PRD generator.
- Roadmap suite.
- Feedback management SaaS.
- Analytics platform.
- AI coding agent.
- Enterprise integrations.
- Automated "truth" scoring without human review.

## Decision

```text
decision: test
readiness: test_ready
build_allowed: false
reason: paid willingness and costly behavior for one-time PM diagnosis are unresolved
strongest_next_test: paid concierge diagnosis with 40 sourced candidates
build_unlock: 3+ paid diagnoses, 2 changed actions, 1 follow-up/repeat request
```
