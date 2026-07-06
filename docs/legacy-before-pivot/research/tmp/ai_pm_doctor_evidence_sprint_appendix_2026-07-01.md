# AI PM Doctor Evidence Sprint Appendix

Date: 2026-07-01

This appendix preserves the required subagent deliverables in normalized form:

- Subagent A: English pain evidence, 15 Evidence Cards.
- Subagent B: Chinese pain evidence, 15 Evidence Cards.
- Subagent C: competitor/category matrix and gap evidence.
- Subagent D: 20 public candidate cases and outreach drafts.
- Subagent E: critic review and decision gate.

## Context And Access Audit

| Requirement | Evidence / Result |
|---|---|
| Repo specs read | `docs/specs/00_product_principles.md`, `01_target_users.md`, `02_user_scenarios.md`, `03_pm_reasoning_protocol.md`, `04_bet_model.md`, `05_evidence_model.md`, `06_decision_policy.md`. |
| Access plans read | `agent_reach_assessment.md`, `zhihu_api_access_plan.md`, `producthunt_api_access_plan.md`, `reddit_api_access_plan.md`, `hackernews_api_access_plan.md`, `v2ex_api_access_plan.md`, `web_search_access_plan.md`, `github_api_access_plan.md`. |
| Subagents | A, B, C, D, E were run with `multi_agent_v1`; outputs are normalized below. |
| Public web | `web.run` search/open used for public web, Product Hunt fallback, HN/Reddit public pages, PM tool sources, and historical/product-management sources. |
| Local commands | `functions.exec_command` used for repo reads, env/access checks, `gh`, `curl` to HN/V2EX public APIs, and verification. |
| GitHub | Local `gh` authenticated; used for repo/category search. |
| Zhihu | Local skills present, but `ZHIHU_ACCESS_SECRET` missing; used public web fallback only. |
| Product Hunt | `PRODUCTHUNT_DEVELOPER_TOKEN` missing; used public Product Hunt pages/web fallback only. |
| Reddit | Official API credentials missing; used public web fallback only; no login/session scraping. |
| AgentReach | Skill docs available and safe-channel policy followed; executable not on PATH, so direct safe fallbacks were used. |
| Disallowed channels | No X/Twitter, XHS, LinkedIn, Reddit login/session, or cookie-based scraping. |

## Subagent A: English Pain Evidence

## Evidence Card
- id: A-01
- source: Ask HN: I spent months building an app and now I don't know how to get users
- platform: Hacker News
- url: https://news.ycombinator.com/item?id=37675989
- date: 2023-09-27
- original_quote: "I have no users"
- actor: solo builder
- product_stage: MVP built
- product_type: marketplace/task app
- pain: No users, no unbiased feedback, unsure if idea is worth pursuing.
- current_workaround: Asking HN how to get first 10 users.
- wtp_hint: None; explicitly low or no marketing budget.
- scenario: Builder has shipped most features but lacks feedback and decision criteria.
- risk_type: value
- evidence_strength: strong
- confidence: high
- outreach_possible: yes
- why_it_matters: Directly names first users and "worth pursuing," the core PM diagnosis decision.
- contradiction_or_caveat: Strong pain, weak paid willingness.

## Evidence Card
- id: A-02
- source: I built a SaaS in 10 days. 3 weeks live. 0 paying customers.
- platform: Indie Hackers
- url: https://www.indiehackers.com/post/i-built-a-saas-in-10-days-3-weeks-live-0-paying-customers-heres-the-data-7cb6b6accf
- date: 2026-05-09
- original_quote: "0 paying customers"
- actor: solo SaaS founder
- product_stage: live demo/MVP, billing enabled
- product_type: AI LinkedIn writing tool
- pain: Shipped fast, has visitors/replies but no signups; unsure whether to panic or keep testing.
- current_workaround: Indie Hackers post, Reddit cross-posting, cold DMs, free feedback.
- wtp_hint: Accepted detailed free audit; no proven paid purchase.
- scenario: Founder needs positioning/value diagnosis and next evidence test for first paid users.
- risk_type: value
- evidence_strength: strong
- confidence: high
- outreach_possible: yes
- why_it_matters: Excellent fit for demo/MVP, low feedback, unclear positioning, and next-test decision.
- contradiction_or_caveat: Values feedback, but paid WTP remains unproven.

## Evidence Card
- id: A-03
- source: Built a "Decision Layer" for Etsy sellers
- platform: Indie Hackers
- url: https://www.indiehackers.com/post/built-a-decision-layer-for-etsy-sellers-feedback-wanted-before-i-build-the-rest-1e39ba5e4b
- date: 2026-06-11
- original_quote: "before I build the rest"
- actor: solo founder
- product_stage: partial prototype/MVP
- product_type: Etsy seller analytics/decision tool
- pain: Wants hard feedback before investing more build time.
- current_workaround: Indie Hackers landing-page feedback post.
- wtp_hint: Revenue goal mentioned; no paid-help signal.
- scenario: Founder needs build/test/narrow decision before completing product.
- risk_type: value
- evidence_strength: strong
- confidence: high
- outreach_possible: yes
- why_it_matters: Exact "diagnose before building more" use case.
- contradiction_or_caveat: Very early; may not yet have real users or demo usage.

## Evidence Card
- id: A-04
- source: Ask HN: Getting traffic to your MVP - how did you do it?
- platform: Hacker News
- url: https://news.ycombinator.com/item?id=19888249
- date: 2019-05-11
- original_quote: "starting from scratch"
- actor: MVP builder
- product_stage: minimal MVP/landing-page test
- product_type: unspecified MVP
- pain: Has a few feedback items, but not from target audience; needs signups/conversion test.
- current_workaround: Asking HN for traffic methods.
- wtp_hint: None observed.
- scenario: Founder needs target audience and evidence-quality diagnosis.
- risk_type: value
- evidence_strength: strong
- confidence: high
- outreach_possible: yes
- why_it_matters: Directly matches "fewer than 10 real feedback items" and uncertain signal quality.
- contradiction_or_caveat: Product details are limited.

## Evidence Card
- id: A-05
- source: I am a PM with 10 years experience, I will audit your startup validation for free today
- platform: Reddit public page
- url: https://www.reddit.com/r/SaaS/comments/1qttzns/im_a_pm_with_10_years_experience_ill_audit_your/
- date: approx. 2026-03
- original_quote: "biggest blind spot"
- actor: PM offering validation audit; founders replying
- product_stage: idea/validating/MVP built
- product_type: early-stage SaaS/startups
- pain: Founders need target, stage, win, worry, risk radar, and action plan.
- current_workaround: Free Reddit audit in exchange for feedback.
- wtp_hint: Free offer got engagement; no clear paid conversion shown.
- scenario: Very close prototype of the proposed one-time PM diagnosis.
- risk_type: value
- evidence_strength: medium
- confidence: high
- outreach_possible: yes
- why_it_matters: Validates format demand at least when free.
- contradiction_or_caveat: Free demand does not prove paid WTP.

## Evidence Card
- id: A-06
- source: Early-stage founder looking for honest feedback on an MVP before scaling
- platform: Reddit public page
- url: https://www.reddit.com/r/SaaS/comments/1q7m9eq/earlystage_founder_looking_for_honest_feedback_on/
- date: approx. 2026-02
- original_quote: "clarity, usefulness, and perceived value"
- actor: early-stage founder
- product_stage: usable MVP, no subscription
- product_type: SaaS/health-adjacent product
- pain: Needs outside feedback before pricing, positioning, and scaling.
- current_workaround: Asking Reddit for direct feedback.
- wtp_hint: None; explicitly free feedback request.
- scenario: MVP exists, but founder lacks confidence on value and positioning.
- risk_type: value
- evidence_strength: strong
- confidence: high
- outreach_possible: yes
- why_it_matters: Very close fit to the proposed PM diagnosis entry point.
- contradiction_or_caveat: Domain-specific risk may require specialized advice.

## Evidence Card
- id: A-07
- source: Ask HN: Ok. I have the MVP. I have a small feedback. What is next?
- platform: Hacker News
- url: https://news.ycombinator.com/item?id=16412458
- date: 2018-02-19
- original_quote: "small feedback"
- actor: founder with two developers
- product_stage: working prototype/MVP
- product_type: browser-call/link widget
- pain: Has prototype, tiny interest list, and many unresolved next-step questions.
- current_workaround: Asking HN about investors, legal setup, launch path, articles.
- wtp_hint: Some willingness to spend implied by payments/legal concerns, but not diagnosis-specific.
- scenario: Founder has limited interest and needs sequencing: sell, legalize, fund, or test more.
- risk_type: viability
- evidence_strength: strong
- confidence: high
- outreach_possible: yes
- why_it_matters: Clean example of "some feedback but not enough evidence to decide."
- contradiction_or_caveat: Immediate blocker includes payments/legal setup.

## Evidence Card
- id: A-08
- source: Spent months building LazyEats AI. Spent 1 day realizing I have no idea how to get users.
- platform: Indie Hackers
- url: https://www.indiehackers.com/post/spent-months-building-lazyeats-ai-spent-1-day-realizing-i-have-no-idea-how-to-get-users-5dbae4eb5e
- date: approx. 2026-06
- original_quote: "no idea how to get users"
- actor: solo founder
- product_stage: built product/MVP
- product_type: AI meal planning app
- pain: Built before distribution/customer discovery; unclear why users need it over ChatGPT.
- current_workaround: Indie Hackers feedback and community posting.
- wtp_hint: None observed.
- scenario: Founder needs target-user discovery and differentiation test.
- risk_type: value
- evidence_strength: strong
- confidence: medium
- outreach_possible: yes
- why_it_matters: Strong fit for unclear target/why and value confusion.
- contradiction_or_caveat: Evidence partly comes from commenters' diagnosis.

## Evidence Card
- id: A-09
- source: Built my MVP but can't get users. How would you onboard creators and get funding?
- platform: Reddit public page
- url: https://www.reddit.com/r/Entrepreneur/comments/1q72ktq/built_my_mvp_but_cant_get_users_how_would_you/
- date: approx. 2026-02
- original_quote: "can't get users"
- actor: young entrepreneur
- product_stage: MVP built
- product_type: creator platform
- pain: Creators ignore cold outreach because product has no users, revenue, or clear trust signal.
- current_workaround: Asking Reddit for onboarding and funding advice.
- wtp_hint: Wants funding; no direct willingness to pay for advice.
- scenario: Chicken-and-egg platform founder needs narrow beachhead and proof.
- risk_type: viability
- evidence_strength: strong
- confidence: medium
- outreach_possible: yes
- why_it_matters: A PM diagnosis could decide narrow/test/wait instead of more build.
- contradiction_or_caveat: Marketplace/network effects make this more complex than typical MVP.

## Evidence Card
- id: A-10
- source: I launched 3 products solo, all dead, what am I missing?
- platform: Reddit public page
- url: https://www.reddit.com/r/Entrepreneur/comments/1lun90r/i_launched_3_products_solo_all_dead_what_the_hell/
- date: 2025
- original_quote: "Crickets. Silence."
- actor: solo maker
- product_stage: multiple MVPs launched
- product_type: indie products
- pain: Repeated launches and feedback asks produced no traction, retention, or audience.
- current_workaround: Posting retrospective/frustration to Reddit.
- wtp_hint: None; complaint only.
- scenario: Builder needs pattern diagnosis across failed launches.
- risk_type: viability
- evidence_strength: strong
- confidence: medium
- outreach_possible: yes
- why_it_matters: Shows recurring build/launch/ask-feedback failure.
- contradiction_or_caveat: Pain is broad and may require GTM coaching.

## Evidence Card
- id: A-11
- source: How did you handle the phase between MVP and real traction?
- platform: Reddit public page
- url: https://www.reddit.com/r/SaaS/comments/1reit2n/how_did_you_handle_the_phase_between_mvp_and_real/
- date: approx. 2026-03
- original_quote: "between MVP and real traction"
- actor: SaaS founder/community
- product_stage: post-MVP, pre-traction
- product_type: SaaS
- pain: Founders confuse product gaps with distribution/positioning gaps.
- current_workaround: Community advice: outreach, ICP conversations, stop adding features.
- wtp_hint: None observed.
- scenario: Founder must decide whether to build features or test distribution/value.
- risk_type: viability
- evidence_strength: medium
- confidence: medium
- outreach_possible: yes
- why_it_matters: Validates recurring "after MVP, what now?" phase.
- contradiction_or_caveat: Mostly advice/commentary, not one founder's direct WTP.

## Evidence Card
- id: A-12
- source: How do you guys validate your idea before releasing the MVP?
- platform: Reddit public page
- url: https://www.reddit.com/r/SaaS/comments/1qlklrr/how_do_you_guys_validate_your_idea_before/
- date: approx. 2026-02
- original_quote: "is this enough"
- actor: SaaS builder
- product_stage: pre-MVP/validation
- product_type: SaaS
- pain: Unclear what counts as validation and whether five positive comments justify building.
- current_workaround: Asking r/SaaS for validation criteria.
- wtp_hint: None observed.
- scenario: Founder wants a decision threshold before investing more time.
- risk_type: value
- evidence_strength: medium
- confidence: medium
- outreach_possible: yes
- why_it_matters: Shows need for explicit evidence thresholds.
- contradiction_or_caveat: Slightly earlier than target bet.

## Evidence Card
- id: A-13
- source: Ask HN: Does a landing page MVP work?
- platform: Hacker News
- url: https://news.ycombinator.com/item?id=28068450
- date: 2021-08-05
- original_quote: "How many e-mails"
- actor: founder/prospective founder
- product_stage: landing page MVP
- product_type: consumer product
- pain: Unsure how to interpret landing-page signups and whether they validate demand.
- current_workaround: HN advice; interviews, traffic, copy tests.
- wtp_hint: None observed.
- scenario: Founder needs decision logic after landing-page evidence.
- risk_type: value
- evidence_strength: medium
- confidence: high
- outreach_possible: yes
- why_it_matters: Strong fit for landing-page builders stuck on evidence thresholds.
- contradiction_or_caveat: Landing pages can produce false positives.

## Evidence Card
- id: A-14
- source: Build landing page first, they said, but is it this a way to go?
- platform: Hacker News
- url: https://news.ycombinator.com/item?id=34350655
- date: 2023-01-12
- original_quote: "no success so far"
- actor: builder testing landing-page-first
- product_stage: landing page / MVP planning
- product_type: startup product
- pain: Landing page exists but fails to generate useful signal; unsure what method works.
- current_workaround: Asking HN; commenters recommend customer conversations.
- wtp_hint: None observed.
- scenario: Founder needs to choose talk-to-users vs landing page vs build.
- risk_type: value
- evidence_strength: medium
- confidence: high
- outreach_possible: yes
- why_it_matters: Supports diagnosis around next evidence test.
- contradiction_or_caveat: Not necessarily a shipped MVP.

## Evidence Card
- id: A-15
- source: I built a website as a technical exercise... Do I need a business coach?
- platform: Reddit public page
- url: https://www.reddit.com/r/Entrepreneur/comments/1t0v7i2/i_built_a_website_as_a_bit_of_a_technical/
- date: approx. 2026-05
- original_quote: "I just know how to code"
- actor: experienced developer/side-project builder
- product_stage: built website/app, no business launch
- product_type: streaming-bill savings tool
- pain: Built working app but does not know launch, marketing, or target validation.
- current_workaround: Tried business coach referral; asks Reddit.
- wtp_hint: Some willingness to seek paid guidance, but comments push against generic coaching.
- scenario: Builder needs narrow target, messaging, pricing, and first-user test.
- risk_type: viability
- evidence_strength: strong
- confidence: high
- outreach_possible: yes
- why_it_matters: Strong buyer-shape evidence: technical builder wants outside business judgment.
- contradiction_or_caveat: Community recommends talking to users and small ad tests, not necessarily paying a PM doctor.

## Subagent B: Chinese Pain Evidence

## Evidence Card
- id: B-01
- source: 以为会爆，结果很冷
- platform: V2EX
- url: https://www.v2ex.com/t/1199589
- date: 2026-03-19
- original_quote: "上架只是开始"
- actor: 独立 iOS App 开发者
- product_stage: 已上线，有少量下载和内购
- product_type: 数独 App
- pain: AI 能做出产品，但不能解决定位、分发、是否继续做的问题。
- current_workaround: TestFlight、V2EX 发帖、继续优化。
- wtp_hint: 间接；有 1-3 个付费用户，但无诊断付费信号。
- scenario: 上线后下载下降，判断海外/国内方向。
- risk_type: viability
- evidence_strength: strong
- confidence: high
- outreach_possible: yes
- why_it_matters: 符合做出来后缺少真实验证、需要判断下一步的场景。
- contradiction_or_caveat: 一个付费用户不等于方向成立。

## Evidence Card
- id: B-02
- source: 第一款 App 上线，无人下载
- platform: V2EX
- url: https://www.v2ex.com/t/1115657
- date: 2025-03-04
- original_quote: "30 个人下载"
- actor: 独立开发者
- product_stage: 已上线两周
- product_type: 思维导图 + 目标管理 App
- pain: 用户实际使用场景偏离作者设想，不知该继续原定位还是拆出功能。
- current_workaround: 发帖求反馈，计划拆成单独思维导图 App。
- wtp_hint: 中等；2 个内购，共 9 美元。
- scenario: 少量真实行为暴露定位错位。
- risk_type: value
- evidence_strength: strong
- confidence: high
- outreach_possible: yes
- why_it_matters: PM 诊断可帮助判断 narrow / iterate / split。
- contradiction_or_caveat: 下载少但付费率不低，不能简单 kill。

## Evidence Card
- id: B-03
- source: 2023 年独立开发者这条路还能走下去吗
- platform: V2EX
- url: https://www.v2ex.com/t/938565
- date: 2023-05-09
- original_quote: "反响平平"
- actor: 裸辞全职独立开发者
- product_stage: demo 后全职开发，双端上线
- product_type: 通用数据记录分析 App
- pain: 做了半年，上线推广后没水花，不确定是推广问题还是需求不存在。
- current_workaround: V2EX 求判断，继续寻找用户细节。
- wtp_hint: 间接；裸辞和半年投入是高机会成本。
- scenario: 低反馈导致是否继续投入的焦虑。
- risk_type: viability
- evidence_strength: strong
- confidence: high
- outreach_possible: yes
- why_it_matters: 核心继续/收缩/换定位场景。
- contradiction_or_caveat: 低曝光不必然等于无需求。

## Evidence Card
- id: B-04
- source: 如何让更多人愿意付费用
- platform: V2EX
- url: https://www.v2ex.com/t/1139572
- date: 2025-06-19
- original_quote: "付费率不理想"
- actor: AI 工具创业者
- product_stage: 创业一年，产品已上线
- product_type: AI 搜索/知识图谱工具
- pain: 用户为什么付费不清楚，差异化被免费大模型压制。
- current_workaround: 发帖问真实反馈、价格区间、功能改进。
- wtp_hint: 强；直接讨论付费转化和价格。
- scenario: AI 产品有功能但用户难以感知独特价值。
- risk_type: viability
- evidence_strength: strong
- confidence: high
- outreach_possible: yes
- why_it_matters: PM 诊断能聚焦谁为什么不用免费替代品。
- contradiction_or_caveat: 已有用户基础，问题不只是 0 到 1。

## Evidence Card
- id: B-05
- source: 免费 HTML/网页转 Figma 插件 Landing Page
- platform: V2EX
- url: https://www.v2ex.com/t/1201570
- date: 2026-03-27
- original_quote: "真实反馈"
- actor: 工具插件开发者
- product_stage: Landing Page 已上线，插件待发布
- product_type: 设计/开发工具
- pain: 不知道用户优先要 URL 导入、HTML 导入、还原度还是图层结构。
- current_workaround: 先放 Landing Page 收集反馈。
- wtp_hint: 弱；强调免费以降低试用门槛。
- scenario: 产品未完整发布前做需求/优先级验证。
- risk_type: value
- evidence_strength: medium
- confidence: high
- outreach_possible: yes
- why_it_matters: PM 诊断可帮助把反馈问题设计得更可验证。
- contradiction_or_caveat: 主动验证不等于强付费意愿。

## Evidence Card
- id: B-06
- source: HTMLtoFigma 插件发布
- platform: V2EX
- url: https://global.v2ex.com/t/1214891
- date: 2026-05-23
- original_quote: "用户需要 A"
- actor: Figma 插件开发者
- product_stage: 刚发布，找第一批真实用户
- product_type: 免费设计工具插件
- pain: 担心我们以为用户需要 A，真实用户卡在 B。
- current_workaround: 公开招募试用和反馈。
- wtp_hint: 弱；免费产品，未显示付费意图。
- scenario: 刚上线后需要判断第一版 workflow 是否成立。
- risk_type: usability
- evidence_strength: medium
- confidence: high
- outreach_possible: yes
- why_it_matters: 支持功能取舍/下一步测试诊断需求。
- contradiction_or_caveat: 工具免费，商业化问题未暴露。

## Evidence Card
- id: B-07
- source: Feedalyze 用户反馈工具
- platform: V2EX
- url: https://www.v2ex.com/t/1215942
- date: 2026-05-27
- original_quote: "需求对不对"
- actor: 用户反馈 SaaS 开发者
- product_stage: 内测后期
- product_type: 用户反馈分析 SaaS
- pain: 团队和独立开发者难以从反馈中提炼真实需求。
- current_workaround: 微信群、分散渠道、主观判断。
- wtp_hint: 间接；提供 3-6 个月免费试用，尚未证明付费。
- scenario: 反馈很多但无法转成产品决策。
- risk_type: value
- evidence_strength: medium
- confidence: medium
- outreach_possible: yes
- why_it_matters: 说明反馈到决策的痛点正在被产品化。
- contradiction_or_caveat: 供应商自述，有自我营销偏差。

## Evidence Card
- id: B-08
- source: 用户反馈一多就失控
- platform: V2EX
- url: https://www.v2ex.com/t/1196295
- date: 2026-03-06
- original_quote: "优先级靠印象"
- actor: 多个小应用开发者
- product_stage: 有工具用户，反馈增长
- product_type: 用户反馈开源工具
- pain: 同类需求重复、微信群截图手录、优先级判断混乱。
- current_workaround: 邮件、私信、飞书表格、Excel、自建工具。
- wtp_hint: 中等；提到国外 Canny 等贵且不匹配国内场景。
- scenario: 用户量稍多后，反馈处理变成产品决策成本。
- risk_type: viability
- evidence_strength: strong
- confidence: high
- outreach_possible: yes
- why_it_matters: PM 诊断若能把反馈转成取舍建议，有明确价值。
- contradiction_or_caveat: 更偏反馈管理，不一定是早期少于 10 条反馈。

## Evidence Card
- id: B-09
- source: 独立 App 团购实验
- platform: V2EX
- url: https://www.v2ex.com/t/1158550
- date: 2025-09-11
- original_quote: "没人用、没人反馈"
- actor: 独立产品平台尝试者
- product_stage: 招募 20 个早期用户测试
- product_type: 独立 App 团购/发码平台
- pain: 冷启动阶段缺真实用户和真实反馈。
- current_workaround: 发码、团购、微信群验证。
- wtp_hint: 中等；低价团购锁定用户。
- scenario: 用交易/兑换码换取更稳定反馈。
- risk_type: viability
- evidence_strength: strong
- confidence: high
- outreach_possible: yes
- why_it_matters: 证明 builder 愿意尝试机制化获取真实反馈。
- contradiction_or_caveat: 平台自己也在验证，未证明规模化。

## Evidence Card
- id: B-10
- source: 开发了很多 app 没热度
- platform: V2EX
- url: https://www.v2ex.com/t/1215174
- date: 2026-05-25
- original_quote: "没啥热度"
- actor: 多 App 独立开发者
- product_stage: 多个 App 已上线或冲刺发布
- product_type: iOS 游戏、Mac App、iOS App
- pain: 快速做多个产品，但不清楚哪里做错、怎么复盘。
- current_workaround: 复制已验证需求、快速上线、Reddit/IG/小红书推广。
- wtp_hint: 弱；无直接付费咨询信号。
- scenario: builder 有方法论雏形但缺诊断闭环。
- risk_type: viability
- evidence_strength: medium
- confidence: high
- outreach_possible: yes
- why_it_matters: PM 诊断可提供复盘框架和下一步实验。
- contradiction_or_caveat: 更像讨论心态，不是明确求服务。

## Evidence Card
- id: B-11
- source: InkFlow Pro 新人报道
- platform: V2EX
- url: https://v2ex.com/t/1187106
- date: 2026-01-20
- original_quote: "真实用户35+"
- actor: AI 工具产品实践者
- product_stage: 0-1 MVP 后已有 35+ 用户反馈
- product_type: AI 公众号排版工具
- pain: 需要从泛编辑器收缩到粘贴即优化的单点价值。
- current_workaround: 只做一个功能，用真实反馈调整。
- wtp_hint: 弱；未显示用户付费。
- scenario: 正例，说明小样本反馈能帮助聚焦定位。
- risk_type: value
- evidence_strength: medium
- confidence: high
- outreach_possible: yes
- why_it_matters: 验证 PM 诊断可以卖缩窄到核心价值。
- contradiction_or_caveat: 相对成功案例，不是强痛苦案例。

## Evidence Card
- id: B-12
- source: 独立开发者碰到的问题
- platform: V2EX
- url: https://www.v2ex.com/t/1195356
- date: 2026-03-03
- original_quote: "发布完反响平平"
- actor: 多位独立开发者
- product_stage: alpha/上线/推广阶段
- product_type: 网站、App、Agent 工具等
- pain: 功能实现便宜后，观察、审美、运营、alpha 反馈到正式发布的落差更突出。
- current_workaround: 社区问答、AI 做 UI、SEO/广告尝试。
- wtp_hint: 弱；无直接付费信号。
- scenario: 多人列举独立开发困难。
- risk_type: value
- evidence_strength: medium
- confidence: high
- outreach_possible: yes
- why_it_matters: 支持技术以外的产品判断痛点。
- contradiction_or_caveat: 多为讨论，不全是具体交易行为。

## Evidence Card
- id: B-13
- source: 全职 3 年独立开发
- platform: V2EX
- url: https://www.v2ex.com/t/1120126
- date: 2025-03-21
- original_quote: "损失至少 200w"
- actor: 全职独立开发者
- product_stage: 三年全职，产品发布并积累用户
- product_type: 开发者工具/Flutter 相关产品
- pain: 前期无收入、机会成本高、商业化后置风险大。
- current_workaround: 长期打磨、用户认可优先。
- wtp_hint: 间接强；高机会成本，但非诊断付费。
- scenario: 长周期后才逐步养活自己。
- risk_type: viability
- evidence_strength: strong
- confidence: high
- outreach_possible: yes
- why_it_matters: 早期诊断若能减少错误方向投入，价值可观。
- contradiction_or_caveat: 作者后来已有起色，不一定是当前 PM 诊断买家。

## Evidence Card
- id: B-14
- source: vibe coding 小程序复盘
- platform: 少数派
- url: https://sspai.com/post/106544
- date: 2026-02-24
- original_quote: "需求不准"
- actor: 产品经理转独立开发者
- product_stage: 小程序上线并运营半年
- product_type: AI 起名小程序
- pain: 定位需求未验证、赛道竞争强、收入远低于维护成本。
- current_workaround: 降本、设止损线、考虑放弃赛道。
- wtp_hint: 间接强；投入一年多和 3000+ 成本。
- scenario: 从开发到运营完整复盘后确认项目亏损。
- risk_type: viability
- evidence_strength: strong
- confidence: high
- outreach_possible: possible
- why_it_matters: 高度匹配 build/test/kill/narrow/wait 判断。
- contradiction_or_caveat: 复盘后自救，未显示愿买外部诊断。

## Evidence Card
- id: B-15
- source: 推广独立开发产品，我做了哪些尝试
- platform: personal blog
- url: https://laike9m.com/blog/tui-yan-du-li-kai-fa-chan-pin-wo-zuo-liao-na-xie-chang-shi%2C159/
- date: 2024-08-30
- original_quote: "没有卖出"
- actor: Clicknow 独立开发者
- product_stage: 商业 App 上线并多渠道推广
- product_type: Mac AI 搜索/自动化工具
- pain: 不同渠道反馈和转化差异极大，不知哪种推广有效。
- current_workaround: Reddit、HN、V2EX、工具站、newsletter、免费试用。
- wtp_hint: 强；花 $19 买工具站，考虑 3500 欧推广但拒绝。
- scenario: 真实付费推广/销售实验暴露获客判断难。
- risk_type: viability
- evidence_strength: strong
- confidence: high
- outreach_possible: possible
- why_it_matters: PM 诊断可帮助选择测试渠道和止损。
- contradiction_or_caveat: 作者技术/开源背景强，不代表普通 builder。

## Subagent C: Competitor And Alternative Matrix

| Category | Product/examples | Primary user | Promised value | Pricing/WTP signal | Likely wedge | Gap relative to AI PM Doctor | Source URLs |
|---|---|---|---|---|---|---|---|
| AI PM assistant / docs | ChatPRD | PMs, PM leaders | Write PRDs/specs, coach PMs, export to PM/dev tools | Free and paid tiers | PM-native doc copilot | Centered on docs, not proving the decision is right | https://www.chatprd.ai/ |
| PRD/spec generator | WriteMyPRD, Miro AI PRD, Figma AI PRD, Quillbot PRD | PMs, founders | Remove blank page, turn idea into PRD | Free/bundled | Fast draft generation | Commodity output and weak diagnosis | https://writemyprd.com/ |
| AI PM system | Productboard Spark | Product orgs | Synthesize feedback, briefs, competitive analysis, roadmap planning | Productboard paid plans | Existing data plus PM agent | Strong incumbent, but tied to Productboard workspace | https://www.productboard.com/product/spark/ |
| AI product feedback | Kraftful / Amplitude AI Feedback | PMs, founders | Turn feedback into feature requests, complaints, bugs, PRDs | SaaS paid plans; acquired by Amplitude | Qual + quant convergence | Signal layer, not full decision doctor | https://www.kraftful.com/ |
| Customer intelligence | Enterpret | Product, CX, GTM | Omnichannel customer intelligence tied to retention/revenue | Enterprise/custom | Business-context feedback intelligence | Less focused on PRD/code handoff diagnosis | https://www.enterpret.com/ |
| Research repository | Dovetail | UX researchers, PMs | Centralize calls/docs/surveys, AI summaries/chat | Free plus enterprise | Research memory and synthesis | Research repository first; decision gate adjacent | https://dovetail.com/pricing/ |
| Feedback hub | Cycle | PMs, product ops | Capture feedback, extract insights, close loop | SaaS/product-led | Linear/GitHub feedback loop | Workflow capture more than strategic diagnosis | https://www.cycle.app/ |
| User research/testing | UserTesting, Maze, Sprig | UX research, design, product | Recruit/test users, summarize, validate concepts | Enterprise/freemium | Human insight at scale | Produces evidence, does not adjudicate all product choices | https://www.usertesting.com/platform |
| Roadmap/product OS | Productboard, Aha!, ProdPad | PM orgs, product ops | Prioritize, roadmap, align stakeholders | Productboard/Aha/ProdPad paid | Product system of record | Often stores decisions after hard thinking | https://www.prodpad.com/pricing/ |
| Feature requests | Canny, UserVoice, Jira Product Discovery | PMs, CS, revenue teams | Capture, dedupe, vote, route, close loop | Canny free/paid; JPD creator pricing | Customer voice into roadmap | Votes are not proof of value or strategy fit | https://canny.io/pricing |
| Analytics/experimentation | Amplitude, Mixpanel, PostHog, Statsig, Optimizely | PMs, growth, data, eng | Funnels, retention, flags, experiments | Usage/subscription pricing | Quant truth | Tells what happened, less often why or what decision follows | https://posthog.com/pricing |
| AI coding agents | Cursor, GitHub Copilot, Devin, Claude Code, Codex | Engineers, technical founders | Agentic coding, PRs, review, cloud agents | Paid seats/usage | Own developer workflow | Depends on high-quality specs and product context | https://cursor.com/pricing |
| Spec-to-app builders | Lovable, Bolt, Replit Agent, v0 | Founders, PMs, non-dev builders | Build apps/sites from prompts | Paid subscriptions/credits | Fast prototype to app | Validation, planning, architecture, and test strategy remain user burden | https://replit.com/pricing |
| Open-source agents | OpenHands, Aider, Plandex, GPT Engineer | Developers, AI builders | Terminal/browser coding agents and codegen workflows | Free/open-source | Community agent layer | Need upstream requirements, constraints, and validation harnesses | https://github.com/OpenHands/OpenHands |

### Named Products/Solutions Covered

ChatPRD, WriteMyPRD, Miro AI PRD, Figma AI PRD, Quillbot PRD, Productboard Spark, Kraftful, Amplitude AI Feedback, Enterpret, Dovetail, Cycle, UserTesting, Maze, Sprig, Looppanel, Notably, User Interviews, Productboard, Aha!, ProdPad, Canny, UserVoice, Jira Product Discovery, Amplitude, Mixpanel, PostHog, Statsig, Optimizely, Cursor, GitHub Copilot, Devin, Lovable, Bolt, Replit Agent, v0, OpenHands, Aider, Plandex, GPT Engineer.

### Complaint / Gap Evidence

| Source | Complaint/gap | Why it matters |
|---|---|---|
| https://www.reddit.com/r/ProductManagement/comments/1j1ph1g/anyone_using_tools_like_kraftful_or_chatprd/ | Users compare AI PM tools with generic LLM projects. | PRD generation alone has weak defensibility. |
| https://www.reddit.com/r/ProductManagement/comments/1meh0ox/best_prd_al_tool_projects_chatprd_reforge_etc/ | PRD AI tools described as useful but immature/context-limited. | Opens wedge for evidence and judgment, not prose. |
| https://www.productboard.com/blog/centralizing-your-product-tech-stack/ | PM stack fragmented; AI needs connected context. | Strong support for context/evidence layer. |
| https://www.g2.com/products/productboard/reviews | Productboard reviews mention scaling/process pain. | Mature PM data gets messy at scale. |
| https://www.g2.com/products/dovetail-research-pty-ltd-dovetail/reviews | Research repositories still require manual review/integration. | Research evidence often fails to reach delivery systems cleanly. |
| https://www.reddit.com/r/ProductManagement/comments/1rg551y/pms_who_use_feedback_boards_canny_productboard/ | Feedback boards/votes are not root-cause or revenue proof. | Feature-request tools need diagnosis, not tallying. |
| https://replit.com/pricing | Agent behavior is probabilistic and may make mistakes. | AI-build tools need guardrails and pre-flight product checks. |
| https://www.reddit.com/r/vibecoding/comments/1nqx6s0/my_honest_experience_with_lovable_after_burning/ | Clear instructions matter; bad prompts burn credits. | Bad specs now have direct execution cost. |
| https://www.reddit.com/r/cursor/comments/1r2q1m1/costs_are_skyrocketing_we_keep_upping_user/ | Agent/model usage costs can climb. | Better planning and tighter handoff reduce waste. |
| https://www.producthunt.com/p/producthunt/landing-page-roast-48-hours-only | Public demand for landing page roasts. | Free critique demand exists; paid diagnosis must be sharper. |

## Subagent D: Case Sourcing Candidates

| Rank | Source/platform | Person/product | URL | Public signal | Likely stage | Likely pain | Fit | Outreach reachability | Why ranked here |
|---:|---|---|---|---|---|---|---:|---|---|
| 1 | Indie Hackers | Dumebi Okolo / Ozigi | https://www.indiehackers.com/post/can-i-get-feedback-on-my-landing-page-and-demo-flow-02a872fb1f | Asked for LP + demo feedback; few reach demo | Live demo + landing page | Positioning, funnel drop-off | 5 | IH profile + site | Explicit conversion pain and active replies |
| 2 | Indie Hackers | Uvilox AI | https://www.indiehackers.com/post/is-our-positioning-clear-honest-feedback-on-our-new-ai-landing-page-0b38fd02d6 | Asks if positioning is clear before outbound | Initial landing page | ICP/value ambiguity | 5 | IH profile + landing page | Exact PM diagnosis use case |
| 3 | Indie Hackers | Kangchuljung / Swiplio | https://www.indiehackers.com/post/i-built-an-ai-that-roasts-landing-pages-for-cro-before-i-build-more-tear-the-feature-set-apart-7eee0c5223 | Asks if vitamin or painkiller | MVP, feature validation | Paid hook, agency ICP, scope | 5 | IH profile + site | Strong willingness/pricing uncertainty |
| 4 | Indie Hackers | Assaf Sheinrok / PagePulse | https://www.indiehackers.com/post/i-built-an-ai-tool-that-reviews-your-landing-page-heres-why-it-took-me-way-longer-than-it-should-have-a9e04215cc | Nobody outside own browser used it | Just launched MVP | First users, wedge, positioning | 5 | IH profile + site | Very early and feedback-seeking |
| 5 | Indie Hackers | Ayesha / RoastMyLanding | https://www.indiehackers.com/post/would-you-pay-for-ai-that-diagnoses-and-redesigns-your-landing-page-validating-a-new-feature-b27a0d9b17 | Asks would you pay | Feature validation | Pricing, deliverable scope | 5 | IH profile | Direct overlap with one-time diagnosis model |
| 6 | HN Show | cromlehg / Now & Here | https://news.ycombinator.com/item?id=48610459 | Still bad traction; 0 comments | Marketplace MVP | Demand/supply wedge, kill/narrow | 5 | HN profile | Clear traction pain, no feedback |
| 7 | HN Show | brudevel / Okanode | https://news.ycombinator.com/item?id=48745625 | Early AI-use-case DB; asks feedback | Early content/data product | Usefulness, packaging, buyer | 5 | HN profile + site | Recent, B2B, explicit feedback request |
| 8 | HN Show | ejhooooon / AMA2 | https://news.ycombinator.com/item?id=48727140 | First Show HN; 1 comment | AI-agent messaging MVP | Which user/job to start with | 4 | HN profile + site | Broad scope needs narrowing |
| 9 | HN Show | vacostacambas / Riley Writes | https://news.ycombinator.com/item?id=48746304 | 0 comments on crowded AI-writing launch | Fresh landing page | Differentiation, ICP | 4 | HN profile + site | Low feedback in saturated category |
| 10 | HN Show | bchhabra2490 / Morning Report | https://news.ycombinator.com/item?id=48736812 | Daily briefing MVP; 0 comments | Working prototype | Buyer, workflow priority | 4 | HN profile + site | Clear problem, unclear must-have value |
| 11 | HN Show | ggaswint / Aegize | https://news.ycombinator.com/item?id=48742785 | AI-risk infra; 0 comments | Open-source/security MVP | Scope, ICP, adoption path | 4 | HN profile + site/GitHub likely | Important but broad problem |
| 12 | HN Show | umeshmr / Launchreel | https://news.ycombinator.com/item?id=48608835 | Solo founder content tool; 0 comments | MVP/landing page | Use case clarity, buyer segment | 4 | HN profile + site | Clear creator pain, weak feedback |
| 13 | V2EX | 897034 / PrankGen | https://www.v2ex.com/t/1218405 | Asks if AI prank direction has value | Small AI tool site | Virality, use cases, continue/kill | 4 | V2EX profile/thread | Explicit value question |
| 14 | V2EX | bojue / site-style clone tool | https://www.v2ex.com/t/1224271 | Asks if there is demand; 0 replies | Demo/video | Demand validation, ethics/scope | 4 | V2EX profile/thread | Direct demand uncertainty |
| 15 | V2EX | a815584445 / 669AI companion | https://www.v2ex.com/t/1224330 | Revived abandoned AI companion; 1 reply | Mobile app launched | Scope, retention, positioning | 4 | V2EX profile + app page | Prior stall suggests diagnosis need |
| 16 | V2EX | MaxPool / AI couple avatar generator | https://www.v2ex.com/t/1224272 | 0 replies; asks suggestions | Small AI generator | Differentiation, acquisition | 3 | V2EX profile + site | Useful but likely commodity |
| 17 | Product Hunt | ArtDirector / solveit | https://www.producthunt.com/products/solveit | Low launch engagement | Product Hunt launch | Message, audience, proof | 3 | PH team/product site | Weak but public |
| 18 | Product Hunt | AI Overview Checker / SiteSpeakAI | https://www.producthunt.com/products/sitespeakai | Low launch engagement; no reviews | Side-tool launch | Need/wedge vs main product | 3 | PH team + website | Public low-feedback launch |
| 19 | GitHub | Aakash25612 / ListReel | https://github.com/Aakash25612/listreel-demo | 0 stars; frontend MVP demo for Airbnb hosts | Mock/demo MVP | Real buyer validation | 3 | GitHub profile/issues + demo | Good niche, no explicit ask |
| 20 | GitHub | lanryweezy / NollyCrew | https://github.com/lanryweezy/NollyCrew | 0 stars; all-in-one Nollywood platform | Broad MVP/demo | Over-scope, beachhead | 3 | GitHub profile/issues + demo | Plausible but weaker reach/signal |

### Top Outreach Drafts

| Target | Draft |
|---|---|
| Ozigi | Hi Dumebi, I saw your IH thread on the landing page and demo flow, especially the gap where people reach the page but few continue to the demo. I am running a small AI PM Doctor pilot: a 30-45 min diagnostic that ends with one decision, build/test/kill/narrow/wait/iterate, plus the next evidence test. Would you be open to a paid or free pilot interview focused on Ozigi's demo conversion and positioning? |
| Uvilox AI | Hi, I saw your post asking whether Uvilox's positioning is clear before outbound. The sign-language AI direction seems promising, but the public feedback points to target-user/value ambiguity. I am running a PM diagnosis pilot for early products. Open to a 30-45 min paid or free diagnostic interview? |
| Swiplio | Hi Kangchuljung, your vitamin-or-painkiller question for Swiplio is exactly the kind of product call I am testing. I am running an AI PM Doctor pilot that reviews the product, target buyer, paid hook, and next evidence test, then gives a build/test/kill/narrow/iterate recommendation. Would you be open to a short paid or free diagnostic interview? |
| PagePulse | Hi Assaf, I saw your PagePulse launch note about building for months before anyone outside your browser used it. The coordinate-grid feedback idea is specific, but the wedge and first-user path look like the key PM questions. I am running a small diagnosis pilot for early products; would you be open to a 30-45 min paid/free interview? |
| RoastMyLanding | Hi Ayesha, I saw your question about whether people would pay for AI diagnosis plus redesign. I am testing a one-time AI PM Doctor format that decides what to build/test/kill/narrow next and designs the next evidence test. Your pricing/scope question is a strong fit. Would you be open to a paid or free diagnostic interview? |
| Now & Here | Hi, I saw your Show HN for Now & Here and the line about still having bad traction after the MVP. A two-sided marketplace often needs a hard wedge decision before more building. I am running a PM diagnosis pilot that ends with a concrete build/test/kill/narrow recommendation. Would you be open to a short paid/free diagnostic interview? |
| Okanode | Hi, I saw your Show HN for Okanode and the request for feedback on whether the AI use-case database is useful. The dataset sounds substantial; the PM question seems to be who urgently needs it and in what workflow. I am running a small AI PM Doctor pilot and would like to diagnose that. Open to a 30-45 min paid/free interview? |
| AMA2 | Hi, I saw your AMA2 Show HN. The shift from a creator agent to a messaging runtime for AI agents is interesting, but it may need a narrow first adopter and use case. I am testing an AI PM Doctor diagnosis for early products: review, decision, next evidence test. Would you be open to a paid or free pilot interview? |

## Subagent E: Critic Review

| Claim | Supported/partly/unsupported | Strongest support | Weakest link | Decision consequence |
|---|---|---|---|---|
| Builders with MVP/landing pages often get stuck after shipping | supported | HN first-10-users case, V2EX indie-app cases, IH zero-customer cases | Self-selected public complaints | Use as credible pain cluster |
| Core pain is product judgment: build/test/kill/narrow/iterate | partly supported | Many posts ask what next, worth pursuing, or continue | Some are marketing/sales/channel problems | Bet plausible, but include GTM/positioning ambiguity |
| Target is demo/MVP/landing page with fewer than 10 real feedback items | partly supported | HN A-01/A-04, IH A-02, several V2EX low-user cases | Evidence mixes pre-MVP, launched, multi-year, and feedback-management stages | Narrow target to post-demo/pre-first-paid technical builders |
| People want PM diagnosis, not PRD | partly supported | Competitor gap and founder posts seeking decisions | Users do not use "PM diagnosis" language | Sell "next decision + test," not "AI PM" |
| People will pay for one diagnosis | unsupported | Adjacent hints: coach-seeking, paid tools, opportunity cost, one free audit offer | No verified purchase/deposit for this exact service | PRD/build gate blocked |
| AI PM / AI for PM is a large category | partly supported | ChatPRD, Productboard Spark, Kraftful/Amplitude, Canny, Productboard | Enterprise PM tooling and indie diagnosis are different markets | Choose one wedge |
| Incumbents leave gap around evidence quality and decision gates | partly supported | Repo policy matches real gap between feedback, PRD, analytics, coding agents | Productboard/Spark/Kraftful/Dovetail can expand | Compete with sharper workflow, not broad OS now |
| Candidate sourcing can support a pilot | supported | 20 reachable public cases | Public reachability is not response intent | Run outreach test immediately |
| Billion-dollar startup claim | unsupported now | Strategic narrative exists | No paid WTP, retention, repeat workflow, or buyer-budget proof | Treat as long-range thesis |
| Build product now | unsupported | None under repo policy | WTP/costly behavior unresolved | No PRD yet; run evidence test |

### Evidence Downgrades

| Evidence | Downgrade |
|---|---|
| Reddit/free-audit examples | Prove free advice demand, not paid demand. |
| HN/V2EX "what now?" posts | Good pain evidence, weak buying evidence. |
| Product Hunt low-engagement launches | Low votes/comments do not prove PM-diagnosis need. |
| GitHub 0-star demos | Weak signal; could mean no distribution, abandoned repo, or hobby project. |
| Competitor complaints | Useful for positioning, not proof that indie founders want a new tool. |
| AI PM category claims | Risk of copied hype; many products are doc copilots or feedback tools. |
| Approximate Reddit dates | Need revalidation before becoming high-confidence cards. |
| Enterprise pricing | Shows budgets in product orgs, not that indie builders will pay. |

### Decision Policy Application

```text
decision: test
readiness: test_ready
build_allowed: false
reason: WTP/payment/costly behavior for one-time PM diagnosis is unresolved
strongest_next_test: paid concierge diagnosis with sourced candidates
```

### Strongest Next Test

| Field | Recommendation |
|---|---|
| target | Technical indie/AI SaaS builders with live demo/MVP/landing page and fewer than 10 real user feedback items or zero paid users |
| offer | "$99 PM Doctor: 48-hour diagnosis, build/test/kill/narrow/iterate decision, riskiest assumption, next evidence test, and outreach/test copy" |
| channel | Direct replies/messages on IH, HN profile/site, V2EX thread/profile, product contact pages |
| sample | 40 targeted outreaches, using the top candidates first |
| success threshold | 5+ qualified calls booked and 3+ paid at $99, or 2+ paid at $199, within 10 days |
| weak-success threshold | 8+ serious replies but fewer than 3 payments: iterate price, promise, or audience |
| failure threshold | Fewer than 3 serious replies, or no one accepts payment after discount/free fallback |
| build unlock | At least 3 paid diagnoses, 2 founders say output changed next action, and 1 asks for follow-up or repeat use |
| kill/narrow trigger | If they only want free feedback or generic marketing help, narrow or kill paid one-off diagnosis |
