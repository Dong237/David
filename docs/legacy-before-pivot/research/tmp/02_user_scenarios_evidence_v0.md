# 02 User Scenarios Evidence Ledger v0

Temporary research file. Do not treat this as `02_user_scenarios.md`.

Date: 2026-06-20

Purpose: gather evidence for real AI PM user scenarios before writing the scenario spec.

Research rule:
- Claims must be marked as exactly one of:
  - `accepted with evidence`
  - `rejected with evidence`
  - `no evidence found`
- Direct user/social evidence is stronger than expert commentary.
- Recent evidence from 2023-2026 is preferred because AI-assisted building and indie building have changed the market.
- Platform limitations are recorded separately from claim validation.

## User Seed Cases From Our Conversation

| Seed | Scenario hypothesis | Current status |
|---|---|---|
| Technical builder | Can build quickly, but does not know what is worth building. | Accepted with evidence from HN/Vance Lucas and Reddit r/SaaS/rSideProject. |
| PM learner / transitioning PM | Wants to learn what a professional PM would do next and how to judge right/wrong. | Accepted with evidence for prioritization/tradeoff judgment from r/ProductManagement; still weaker for Chinese transitioning-PM evidence. |
| Mid-build founder | Product half-built, value/IA/features unclear, does not know whether to add/stop/change. | Accepted with evidence from HN, Reddit, and V2EX build-first/product-failure discussions. |

## Scenario Assumptions To Validate

| ID | Assumption claim | Validation state | Evidence summary | Scenario implication |
|---|---|---|---|---|
| A1 | Technical builders can build but lack confidence in what to build. | accepted with evidence | HN Algolia surfaced “I Don't Even Know What To Build Anymore” from May 2026; the author says AI makes building faster while making the right thing less clear. Older HN posts show the same pattern: “I know how to make a website... my only issue is... I don't know what to build.” | Strong seed for “Can build, no direction.” |
| A2 | In the AI/vibe-coding era, the bottleneck shifts from coding to product judgment. | accepted with evidence | Vance Lucas, May 2026, explicitly frames uncertainty around what to build for AI agents and defensibility. Business Insider/Andrew Ng evidence from Aug 2025 says coding is easier and PM/what-to-build becomes the bottleneck. V2EX 2025-2026 search results discuss AI coding making product/operation more important. | Good high-level framing for AI PM demand. |
| A3 | The valuable job is not “generate ideas,” but “turn a vague idea into a falsifiable Bet.” | accepted with evidence | HN “How to find problems worth solving?” asks how to avoid building a useless product. Reddit evidence includes founders asking how to validate before building and warning that first paying customers are hardest. | Scenario output should be Bet framing + validation test, not idea list. |
| A4 | Builders frequently launch/build before proving demand, then get stuck with no users/sales. | accepted with evidence | Reddit r/SaaS/rSideProject examples: built SaaS but getting users feels impossible; 330 visitors and 0 sales; Product Hunt praise but no signups; built for months with almost no customers. HN: fitness app with $1M+ spent and only a trickle of users. | Strong scenario: “I built something, nobody pays/uses it.” |
| A5 | Mid-build founders need stop/continue/change judgment before adding more features. | accepted with evidence | User-provided healthcare app case; V2EX thread describes years of feature work on products that were not loved; HN post on polished app with low traction asks “now what?” | Agent should diagnose value/IA/feature risk and often pause feature work. |
| A6 | Junior/transitioning PMs lack judgment around prioritization, tradeoffs, and what a real PM would do. | accepted with evidence | A recent r/ProductManagement thread asks how a new PM can improve tradeoffs/prioritization in the AI era when coding is no longer the bottleneck. Replies repeatedly frame the problem as missing signal, weak strategy, opportunity cost, and knowing what to say no to. A separate overwhelmed-PM thread supports the broader "what matters now?" anxiety. Chinese evidence is still mostly article/education demand, not first-person complaint. | Validated enough for `02` as a scenario, but mark confidence lower than the indie-builder scenarios until we interview or mine Chinese PM communities. |
| A7 | Users have raw evidence but cannot synthesize it into a decision. | accepted with evidence | Reddit examples include traffic/users/signups/no sales metrics followed by uncertainty. G2 reviews of Productboard/Jira Product Discovery/Aha suggest evidence repositories still require process discipline and manual maintenance. | Agent needs evidence board + synthesis, not just intake. |
| A8 | Credibility depends on evidence and pushback, not polished AI prose. | accepted with evidence | G2 ChatGPT reviews complain about generic tone/lack of critical insight. Productboard/Jira/G2 evidence shows users want structured, traceable decisions. User also explicitly wants PM Doctor that challenges with evidence. | UX must show source ledger, confidence, PRD gate, contradiction. |
| A9 | AI PM should not generate PRD when willingness-to-pay is unresolved. | accepted with evidence | Reddit advice thread says founders should validate before building and first paying customers are hardest. Validator AI Product Hunt feedback praises not over-planning and pushing testing. | PRD gate remains central. |
| A10 | The strongest broad scenario is “help me decide build/test/kill/narrow/iterate.” | accepted with evidence | Multiple r/SaaS/rSideProject/HN posts ask what to do after no users/no revenue/no traction; HN/Vance Lucas asks what is safe/defensible to build in AI age. | Scenario spec should center on decision moments. |

## Evidence Sources Logged

### English Social / Community Evidence

| Source | Date | Evidence | Scenario supported | Claim state | Reliability |
|---|---:|---|---|---|---|
| HN Algolia result: [I Don't Even Know What to Build Anymore](https://news.ycombinator.com/item?id=48124573), original [Vance Lucas blog](https://vancelucas.com/blog/i-dont-even-know-what-to-build-anymore/) | 2026-05-11 | Author says AI makes building faster, but it is less clear what should be built and what will remain defensible. | Can build, no direction; AI-era product judgment bottleneck. | accepted with evidence | Strong named-author evidence; not a complaint forum but highly relevant. |
| HN Algolia result: [Ask HN: How to find problems worth solving?](https://news.ycombinator.com/item?id=6179516) | 2013 | Developer can make/design/market websites but says the issue is not knowing what to build and not wanting to build useless products. | Can build, no direction. | accepted with evidence, older than target window | Good pattern evidence, but old. |
| HN Algolia result: [Ask HN: How do you find customers? And how do you find their pain points?](https://news.ycombinator.com/item?id=31264947) | 2022 | Builder says they built product after product without traction and realized they were solving problems that did not exist. | Build-first failure; needs customer discovery. | accepted with evidence, slightly outside 3-year window | Strong qualitative fit; self-reported. |
| HN Algolia result: [Ask HN: I've spent $1M+ building a fitness app. Now what?](https://news.ycombinator.com/item?id=38383765) | 2023 | Solo founder spent heavily building a polished app, has small trickle of users, asks what to do next. | Mid/post-build “now what?” diagnosis. | accepted with evidence | Strong decision-moment case; HN public post. |
| HN Algolia result: [Show HN: Selling an AI interview assistant with ~2k users (no revenue)](https://news.ycombinator.com/item?id=46958991) | 2026 | Solo builder has usage but no revenue/pricing/paywall and lacks bandwidth to monetize/scale. | Has users, no monetization decision. | accepted with evidence | Relevant but no discussion comments. |
| HN Algolia result: [Ask HN: Indie makers and solopreneurs get back into 9 to 5?](https://news.ycombinator.com/item?id=41423210) | 2024 | Indie maker describes researching/building SaaS, scope turning larger than expected, and “developer’s hell.” | Indie builder stuck across idea/scope/execution. | accepted with evidence | Good founder narrative; self-reported. |
| Reddit r/SaaS: [technical founder asks how SaaS gets first users/customers](https://www.reddit.com/r/SaaS/comments/1txxi2t/technical_founder_here_how_do_saas_startups/) | ~2026-06 | Technical founder has development experience but little marketing experience; asks what to learn first. | Can build, lacks GTM/customer judgment. | accepted with evidence | Subagent-reported direct Reddit evidence; anonymous. |
| Reddit r/SaaS: [I built a SaaS but getting users feels impossible](https://www.reddit.com/r/SaaS/comments/1t72wav/i_built_a_saas_but_getting_users_feels_impossible/) | ~2026-05 | Built for months, almost no customers, says attention is harder than building. | Built, no users/customers. | accepted with evidence | Subagent-reported direct Reddit evidence; anonymous. |
| Reddit r/SaaS: [launching SaaS, confused about first users](https://www.reddit.com/r/SaaS/comments/1t2obzi/launching_our_saas_soon_honestly_confused_about/) | ~2026-05 | Building was straightforward; getting users is uncertain. | Builder needs validation/GTM path. | accepted with evidence | Subagent-reported direct Reddit evidence. |
| Reddit r/SaaS: [first SaaS, not a marketer](https://www.reddit.com/r/SaaS/comments/1txwfco/i_created_my_first_saas/) | ~2026-06 | Created first SaaS; asks how to get it to the community. | Built product, needs launch/marketing judgment. | accepted with evidence | Subagent-reported direct Reddit evidence. |
| Reddit r/SaaS: [Product Hunt experience](https://www.reddit.com/r/SaaS/comments/1txynbt/experience_with_producthunt/) | ~2026-06 | Got praise/messages from launch but no signups. | Attention without conversion; channel validation issue. | accepted with evidence | Subagent-reported direct Reddit evidence. |
| Reddit r/SideProject: [Product Hunt launch was disastrous](https://www.reddit.com/r/SideProject/comments/1t1yyg5/producthunt_launch_was_disastrous_lol_suggestions/) | ~2026-05 | Built for months; launch underperformed; unsure if issue is title/logo/audience/niche. | Positioning/audience diagnosis after launch. | accepted with evidence | Subagent-reported direct Reddit evidence. |
| Reddit r/SideProject: [330 visitors, 0 sales](https://www.reddit.com/r/SideProject/comments/1tb2w0g/6_weeks_since_my_first_product_launch_330/) | ~2026-06 | Concrete metrics: visitors, no sales, “silence is real.” | Launched, no revenue. | accepted with evidence | Strong metric narrative; subagent-reported direct Reddit evidence. |
| Reddit r/SaaS: [validate before building advice](https://www.reddit.com/r/SaaS/comments/1r068ks/i_wish_someone_would_have_told_me_this_before/) | ~2026-02 | Founder says validate before building; first paying customers are hardest. | Evidence-before-build principle. | accepted with evidence | Advice post; self-reported revenue. |
| Reddit r/SaaS: [Stop making SaaS that even you won't pay to use](https://www.reddit.com/r/SaaS/comments/1u4j2bs/stop_making_saas_that_even_you_wont_pay_to_use/) | 2026-06-20 | Warns against products without use case; commenter reports signups, low usage, 0 conversions. | Weak use-case validation; no conversion. | accepted with evidence | Subagent-reported direct Reddit evidence. |
| Reddit r/ProductManagement: [New PM: How do I get better at trade-offs and prioritisation?](https://www.reddit.com/r/ProductManagement/comments/1rsjy6d/new_pm_how_do_i_get_better_at_tradeoffs_and/) | ~2026-03 | New PM asks how to make better tradeoff/prioritization calls now that AI makes it easy to say yes and build more. Replies say the real issue is missing signal, strategy, opportunity cost, customer understanding, and business metric linkage. | PM learner needs professional judgment; AI-era bottleneck moves from coding to deciding. | accepted with evidence | Direct Reddit thread; very relevant, anonymous. |
| Reddit r/ProductManagement: [Is every PM everywhere all the time overwhelmed??](https://www.reddit.com/r/ProductManagement/comments/1hcnp0k/is_every_pm_everywhere_all_the_time_overwhelmed/) | ~2024-2025 | PM asks how to maintain sanity when "everything is on fire" and they own outcome metrics. | PM coworker for chaos, prioritization, and outcome framing. | accepted with evidence | Direct Reddit thread found through search; relevant but broader than beginner PM. |

### Product Review / Existing Tool Evidence

| Product/category | Source | Date | Evidence | Scenario supported | Claim state | Reliability |
|---|---|---:|---|---|---|---|
| ChatGPT/general AI | [G2 ChatGPT reviews](https://www.g2.com/products/chatgpt/reviews) | 2026 | Complaints include generic tone and lack of real critical insight. | AI PM must provide judgment, not fluent generic prose. | accepted with evidence | G2 review corpus; review snippets from subagent. |
| Productboard | [G2 Productboard reviews](https://www.g2.com/products/productboard/reviews) | 2025-2026 | Feedback repository requires PM to stay on top; tags/process can be clunky. | Evidence must connect to next action without heavy manual upkeep. | accepted with evidence | G2 review corpus; product-specific. |
| Aha! | [G2 Aha! reviews](https://www.g2.com/products/aha/reviews) | 2025-2026 | Powerful but can lose overview with many features/duplicates. | Need synthesis and prioritization, not more feature sprawl. | accepted with evidence | G2 review corpus. |
| Jira Product Discovery | [G2 Jira Product Discovery reviews](https://www.g2.com/products/jira-product-discovery/reviews) | 2026 | Flow breaks between discovery/delivery; idea quality hard to control. | AI PM should connect discovery evidence to decisions/delivery. | accepted with evidence | G2 review corpus. |
| Validator AI | [Product Hunt Validator AI](https://www.producthunt.com/products/validator-ai) | 2022 launch; old comments | Positive signal for test-before-planning; privacy/idea-saving concern. | AI idea tools are useful but not enough as demand proof. | accepted with evidence for validate-before-planning; no evidence found for paid demand | Product Hunt small sample. |
| Product School | [Course Report Product School reviews](https://www.coursereport.com/schools/product-school) | 2020-2022 | Some reviews complain content can be found elsewhere/too expensive; one positive review values learning WTP testing. | Applied/contextual judgment beats generic PM education. | accepted with evidence | Medium; education reviews, not AI PM product. |
| Kompyte/Klue/Similarweb/Semrush | G2 review pages | 2023-2026 | Research feeds can be noisy, simplistic, directional, or hard to trust. | Market research needs confidence labels and synthesis. | accepted with evidence | Medium-high; adjacent research tools. |

### Chinese Public/Social Evidence

| Source | Date | Evidence | Scenario supported | Claim state | Reliability |
|---|---:|---|---|---|---|
| V2EX: [我们程序员写的代码做的产品，绝大多数都是失败产品](https://v2ex.com/t/968003) | 2023-08-24 | Programmer reflects that years of feature work and optimizations did not make products loved; comments discuss market demand, business model, timing, promotion, and product failure. | Engineering-first product failure; code is not enough. | accepted with evidence | Direct V2EX thread; 88 replies; good Chinese technical-community evidence. |
| Google-indexed V2EX search: “AI 写代码真香喷；以后只要产品经理就可以了” | 2026-04 search result | Search snippet says AI can fill implementation details if someone can state requirements; suggests product manager/product judgment becomes important. | AI coding shifts value toward product requirement/judgment. | accepted with evidence, search-indexed only | Search result; target not opened in this pass. |
| Google-indexed V2EX search: “Vibe Coding 时代的职业排序：运营>设计>产品>测试>程序员” | 2025-07 search result | Search snippet links vibe coding to programmer value shifting and product/operation importance. | AI/vibe-coding changes builder bottleneck. | accepted with evidence, search-indexed only | Search result; target not opened in this pass. |
| Google search: Chinese prioritization/PM articles from 人人都是产品经理, 知乎, CSDN | 2022-2026 | Many articles teach how to judge需求优先级, KANO, value judgment, etc. | There is education demand around PM prioritization. | accepted with evidence for education demand; no evidence found for first-person PM learner complaint | Content/SEO results, not social complaint. |
| 小红书 / XHS | 2026-06-20 run | Dedicated XHS MCP was not available in this environment; direct search not attempted through unofficial tools due platform/auth risk. | Platform coverage only. | no evidence found | Tool unavailable; not absence of market evidence. |
| 即刻 / Jike | 2026-06-20 run | No public/keyless API found by subagent; not a first-wave automated source. | Platform coverage only. | no evidence found | Access limitation. |
| 知乎 | 2026-06-20 run | Google surfaced Zhihu articles; no stable direct complaint mining due anti-bot/login risk. | PM education demand, weak complaint evidence. | no evidence found for direct social complaint | Access limitation. |

## Platform Coverage And Access Notes

| Platform | Tried in this pass? | Result | Evidence use |
|---|---:|---|---|
| Reddit | Yes | Browser direct search hit challenge; English subagent found direct r/SaaS/rSideProject posts. Shell DNS blocked. | Use subagent direct URLs and snippets; later build low-rate Reddit public web/RSS/JSON collector if allowed. |
| Hacker News | Yes | HN Algolia web accessible through browser; shell DNS blocked. | Strong source for technical-builder evidence. |
| Indie Hackers | Yes, via subagent/search intent | No verified direct evidence returned in this pass. | Mark no evidence found for this pass; try search-engine `site:indiehackers.com/post` later. |
| Product Hunt | Yes, via product-review subagent | Validator AI page found; weak/partial review/comment sample. | Use as adjacent validation-tool evidence, not core scenario proof. |
| X/Twitter | Yes, via search-indexed results | Search-indexed posts/courses use "I don't know what to build" and AI-building language, but no strong direct complaint thread was verified. | Treat as market-language evidence only; not scenario proof yet. |
| PM communities | Yes | r/ProductManagement threads gave direct evidence for prioritization/tradeoff judgment pain and AI making "build everything" temptation worse. | Strong support for PM learner/professional-judgment scenario. |
| G2/Capterra | Yes, via product-review subagent | G2 review evidence gathered; Capterra should not be automatically mined due ToS risk. | Use review summaries conservatively; avoid automated crawler in MVP. |
| V2EX | Yes | Direct V2EX thread opened; direct search poor; Google-indexed discovery useful. | Strong Chinese technical-community source for build-first/product failure. |
| 小红书/XHS | Yes, tool check | XHS MCP tools not exposed; no official public API. | Mark direct mining unavailable; only user-consented connector/search snippets later. |
| 即刻/Jike | Yes, feasibility research | No stable public/keyless path. | Defer. |
| 知乎 | Yes, Google search | Articles surfaced; direct social complaint mining not reliable. | Use only as weak content evidence; direct complaints still missing. |
| GitHub issues/discussions | Feasibility subagent | Public REST issues/comments are keyless; discussions need auth. | Useful later for complaints about PM/roadmap tools, not yet mined for scenarios. |
| App reviews | Feasibility subagent | Apple public reviews possible; Google Play official reviews require owner auth. | Useful later for competitor/PM tool complaints, not yet mined. |

## Early Scenario Candidates For 02

| Scenario name | User type | Trigger | Product stage | Core anxiety | Decision needed | Evidence needed | Agent response | Artifact | Validation confidence |
|---|---|---|---|---|---|---|---|---|---|
| Can build, no direction | Technical indie builder | AI/code tools make building easy, but the founder does not know what is worth building. | Idea / pre-build | “What should I build that is not useless or easily swallowed by AI?” | Narrow / test | Complaints, reachable segment, WTP hypothesis, existing alternatives. | Force vague intuition into target user + situation + Bet + strongest test. | Opportunity brief + 48h validation test. | High |
| Built it, nobody uses/pays | Indie builder / solo founder | Product launched; traffic/signups exist but no revenue or usage. | Launched / early users | “Is this positioning, ICP, pricing, channel, or product value?” | Test / iterate / kill | Funnel metrics, user feedback, pricing signal, source of traffic. | Diagnose bottleneck and block feature-building until missing signal is tested. | Diagnosis memo + 7-day conversion/payment test. | High |
| Mid-build value unclear | Builder / PM learner | Product half-built; value, IA, and feature list feel unclear. | Mid-build / prototype | “Should I keep building, stop, cut features, or reposition?” | Stop / narrow / test / iterate | Target user, job, current workflow, prototype feedback, willingness-to-pay. | Pause build, reframe Bet, identify riskiest assumption, write interview/test plan. | IA/value critique + interview script + decision gate. | Medium-high |
| Has users, no monetization | Indie builder | Usage exists, but no revenue/pricing/paywall. | Early users | “Do users value this enough to pay, and how do I test price?” | Test / iterate | Activation/retention, user segment, current workaround, price test. | Design WTP/payment test and define success/kill threshold. | Pricing test + paid pilot script. | Medium-high |
| PM learner needs professional judgment | Junior/transitioning PM | Learning PM or handling a project but unsure what a real PM would do. | Learning / mid-build | “Am I thinking about this correctly?” | Learn / decide | Real work scenario, constraints, stakeholders, metrics. | Coach with PM reasoning and explain framework/evidence. | PM mentor memo + tradeoff matrix. | Medium; direct r/ProductManagement evidence exists, Chinese evidence still weak |

## Open Gaps Before Writing 02

1. Direct first-person evidence for PM learner judgment improved through r/ProductManagement, but Chinese PM learner evidence is still weak.
2. Chinese social evidence is currently strongest for technical/product failure, weaker for PM learner complaints.
3. Indie Hackers and Product Hunt discussion evidence was not strong in this pass.
4. X/Twitter evidence is currently market-language only, not scenario proof.
5. XHS/Jike/Zhihu require either user-consented logged-in connectors, search snippets, or manual evidence; do not treat no evidence as no market.
6. Need to decide whether `02` should include only high-confidence scenarios or include seed scenarios with explicit low confidence.

## Next Research Actions

1. Wait for Chinese social subagent and merge its findings.
2. Run a focused pass for first-person PM learner complaints:
   - English: `r/ProductManagement`, Product School/course reviews, LinkedIn public posts if accessible.
   - Chinese: 人人都是产品经理 comments if accessible, 小红书 with MCP if configured, 即刻 if user can provide access.
3. Run a focused Indie Hackers search pass:
   - `site:indiehackers.com/post "no users"`
   - `site:indiehackers.com/post "validate"`
   - `site:indiehackers.com/post "what should I build"`
4. Convert accepted scenarios into `02_user_scenarios.md` only after the gap check.

## Focused Gap Pass v1 - 2026-06-21

Purpose: close the remaining gaps before writing `docs/specs/02_user_scenarios.md`.

### Gap Closure Decisions

| Gap | State | Evidence summary | Decision for `02` |
|---|---|---|---|
| English first-person PM learner evidence | accepted with evidence | Multiple recent r/ProductManagement threads show junior, transitioning, and first-year PMs asking for help with product sense, discovery, prioritization, tradeoffs, and "what should I do next?" Caveat: some pain is caused by weak org design, not only weak individual skill. | Include PM learner scenario with medium-high confidence and non-patronizing framing. |
| Product School course-review evidence | accepted with evidence | Course Report/Product School reviews show learners value real examples, instructor judgment, and applied product thinking; negative reviews complain about generic or expensive content. | Use as adjacent education-market evidence, not primary scenario proof. |
| Public LinkedIn PM learner evidence | no evidence found | Focused subagent pass did not find usable public LinkedIn posts with direct first-person PM learner complaints. | Do not cite LinkedIn in `02`. |
| Chinese PM learner evidence | accepted with evidence | 人人都是产品经理 has 2026 AI PM/PM judgment articles showing demand for AI PM transition, decision logic, critical thinking, and realistic PM-to-algorithm collaboration. This is weaker than first-person social complaint evidence. | Include as supporting evidence, not primary proof. |
| 人人都是产品经理 comments / Q&A evidence | no evidence found | Site and Q&A were accessible, but no strong first-person comment/Q&A complaint evidence was captured in this pass. Articles and course/community navigation were usable. | Treat as education/market signal, not direct complaint proof. |
| Chinese technical-builder evidence | accepted with evidence | V2EX has current 2026 direct evidence: AI can now handle docs/UI/backend/frontend, but individual builders ask what meaningful tools/products to build and cite lack of ideas/action. | Strengthen "Can build, no direction" as bilingual market scenario. |
| Mid-build/founder direction evidence in China | accepted with evidence | V2EX founder thread shows an AI app built for months, then investor/customer questions expose moat, business model, competition, demand, and product-logic gaps. | Strengthen "Mid-build value unclear" and "Should I continue/pivot?" scenarios. |
| Indie Hackers evidence | accepted with evidence | Direct 2026 Indie Hackers threads show builders can ship quickly but freeze at market/GTM, struggle to interpret no-signup feedback, and need validation/action framing. | Add a separate "Built, but market-facing work freezes" scenario. |
| Product Hunt evidence | accepted with evidence | Product Hunt discussions show demand for landing page roasts, validation tools, problem-first startup discovery, pivot/PMF stories, and no-code/vibe-code failure patterns. | Use as adjacent founder-market evidence and product-review signal. |
| X/Twitter evidence | no evidence found | Direct search and indexed search did not produce verifiable first-person complaint evidence in this pass. | Do not use X as proof. Keep as future channel, not evidence. |
| 小红书/XHS evidence | no evidence found | XHS skill exists, but required MCP tools (`check_login_status`, `search_feeds`) were not exposed. Per skill rules, no substitute scraping was attempted. | Mark as unavailable until user-consented connector is configured. |
| 即刻/Jike evidence | no evidence found | Public page opened without extractable evidence; no stable public/keyless path surfaced. | Defer. |
| 知乎 evidence | no evidence found | Direct Zhihu access redirected to security verification; no direct complaint mining. | Defer; do not treat as negative market evidence. |
| Include only high-confidence scenarios? | accepted with evidence | The evidence supports five high/medium-high core scenarios plus one medium PM learner scenario. Unsupported platform-specific claims remain excluded. | Include accepted scenarios with explicit confidence; put weak channels in evidence gaps. |

### New Evidence Sources Logged

| Source | Date | Evidence | Scenario supported | Claim state | Reliability |
|---|---:|---|---|---|---|
| V2EX: [用 AI 做了哪些有意义的工具？](https://www.v2ex.com/t/1221614) | 2026-06-21 | OP says AI can now cover docs, UI, backend, and frontend, but asks what meaningful things individuals can build; explicitly names lack of ideas/action. | Can build, no direction. | accepted with evidence | Direct current Chinese technical-community thread. |
| V2EX: [见了十几个投资人...](https://www.v2ex.com/t/1217957) | 2026-06-08 | Founder has built an AI app for months; investor questions hit moat, business model, real demand, competition, and whether the pain is strong enough. | Mid-build founder unsure whether direction is valid. | accepted with evidence | Direct founder thread; strong for China market. |
| 人人都是产品经理: [算法工程师最讨厌什么样的产品经理？](https://www.woshipm.com/pmd/6346139.html) | 2026-02-28 | AI product practitioner describes PM failure modes: unrealistic model requirements, weak problem definition, and wasted engineering resources. | PM judgment gap in AI product work. | accepted with evidence | Practitioner article; not first-person junior complaint. |
| 人人都是产品经理: [AI 已成职场标配...](https://www.woshipm.com/pmd/6344608.html) | 2026-02-26 | Argues AI commoditizes execution while durable PM advantage is decision logic, workflow design, critical thinking, and challenging assumptions. | PM learner needs judgment beyond tool use. | accepted with evidence | Practitioner/education signal. |
| Indie Hackers: [I can build a product in a week. Then I freeze for a month.](https://www.indiehackers.com/post/i-can-build-a-product-in-a-week-then-i-freeze-for-a-month-ae089efce1) | 2026-06-19 | Builder says product creation is clear, but landing page, X, Product Hunt launch, and cold email cause a freeze; comments repeat that AI made building cheap while distribution became the bottleneck. | Built, then freezes at market-facing work. | accepted with evidence | Direct current IH thread with many comments. |
| Indie Hackers: [A stranger used my product today and didn't sign up](https://www.indiehackers.com/post/a-stranger-used-my-product-today-and-didnt-sign-up-i-m-counting-it-as-progress-5250aac9fa) | 2026-06-19 | Founder has no signup/revenue, but one stranger hit onboarding friction and gave feedback; discussion centers on interpreting weak/early signals without fooling oneself. | Has weak signal, does not know what it means. | accepted with evidence | Direct current IH thread. |
| Indie Hackers: [I thought building AI agents would be the hardest part. I was wrong](https://www.indiehackers.com/post/i-thought-building-ai-agents-would-be-the-hardest-part-i-was-wrong-1531de465d) | 2026-06-18 | Founder says once agents run in parallel, the hard part is knowing what is running, stuck, failed, or needs review. | Future workflow: PM oversight for agent-native building. | accepted with evidence | Adjacent strong signal; future scope. |
| Product Hunt: [Landing Page Roast: 48 Hours Only](https://www.producthunt.com/p/producthunt/landing-page-roast-48-hours-only) | ~2025 | Many makers request and receive direct clarity, CTA, design, pricing, and trust feedback. | Founders want product/positioning diagnosis, not generic praise. | accepted with evidence | Direct PH forum thread; adjacent to AI PM service. |
| Product Hunt: [Validator AI](https://www.producthunt.com/products/validator-ai) | 2022 launch; reviews/comments still visible | Maker says they used Reddit/HN for validation but sometimes feedback was sparse; review praises moving from validation toward testing/prospecting/execution. | Existing demand for AI idea validation, with evidence gaps. | accepted with evidence | Older but relevant product/review evidence. |
| Product Hunt: [How Wispr Flow found PMF through a pivot](https://www.producthunt.com/p/wisprflow/how-wispr-flow-found-pmf-through-a-pivot) | ~2025 | Founder narrative shows painful decision to abandon hardware direction and focus on software because PMF and founder-market fit favored a narrower path. | Pivot/continue/kill judgment. | accepted with evidence | Founder narrative; not beginner-specific. |

### Remaining Gaps After v1

1. No direct X/Twitter complaint evidence was verified. Use X only as a future distribution channel.
2. XHS/Jike/Zhihu remain access-limited in this environment; no market conclusion should be drawn.
3. Chinese PM learner evidence is good for education/skill demand, but still weaker than English first-person PM-community evidence.
4. Payment willingness for AI PM Doctor is not proven by scenario evidence; it must be tested through paid/manual beta offers.
5. Agent-native workflow oversight is promising but should stay outside MVP unless it directly supports diagnosis-to-action.
