# AI PM Doctor Strategy Meeting - 2026-06-27

## Purpose

This note preserves the current strategy meeting work for David / AI PM Doctor.
The requested WorkBuddy follow-up could not be completed because the WorkBuddy
conversation surface became stuck in its mode picker, but earlier Liu Xiaopai
answers and three subagent reviews were captured and synthesized here.

## Current Product Context

| Area | Current State |
|---|---|
| Product thesis | AI PM coworker for indie builders, not a PRD bot or generic chatbot |
| Core promise | Turn scattered market signals into build / test / kill / narrow / wait / iterate decisions |
| Existing specs | `00` to `06`: principles, target users, scenarios, PM protocol, Bet, Evidence, Decision |
| Existing product | Validation page prototype plus rule-based diagnosis preview |
| Missing proof | No real paid validation yet |
| Main risk | We may be building a beautiful PM reasoning system before proving anyone pays for PM judgment |

## Prior Liu Xiaopai / WorkBuddy Advice Captured

| Theme | Advice |
|---|---|
| Stop polishing | Do not keep writing specs, scanning platforms, or refactoring UI before real cases |
| Test real value | Use the existing `00-06` protocol on real indie-builder cases |
| First success signal | A founder says, "I know exactly what to do next" |
| Commercial upgrade | A founder is willing to pay for one diagnosis, not only praise the idea |
| Core thesis | A founder gets a decision conclusion faster and better than thinking alone |
| Biggest risk | Users may not want a framework; they may want someone to judge for them |
| Product form | This may start as a high-touch PM service before becoming software |
| First weak signal | "Interesting but no budget" is polite interest, not demand |
| Strong signal | "How do I pay?" or "How do I find you next time?" |
| Spec loop | Every real case should update the spec logic, especially where users get stuck |

## Question Bank Used For The Meeting

### Beachhead

| Question | Why It Matters |
|---|---|
| Which one scenario should we sell first for 2-4 weeks? | Prevents broad "AI PM for everyone" |
| Who should be excluded from the first batch? | Avoids false positives from curious users |
| What does "before David / after David" mean in one sentence? | Forces concrete value |
| Which scenario is most likely to create praise but no payment? | Avoids vanity validation |
| What failure standard should stop this wedge? | Prevents endless iteration |

### Payment

| Question | Why It Matters |
|---|---|
| What would make a founder pay within 10 minutes? | Tests urgency |
| Is the paid thing a report, a call, a diagnosis, or a decision? | Clarifies packaging |
| What should be free as a teaser? | Prevents giving away all value |
| What price proves real WTP but is still feasible? | Avoids fake interest |
| Should deposits count as strong evidence? | Separates weak from strong signal |

### Product Scope

| Question | Why It Matters |
|---|---|
| What should not be built in V1? | Protects focus |
| What remains human-reviewed? | Maintains trust before the AI engine is proven |
| What can be manual behind the scenes? | Speeds validation |
| When is a PRD allowed? | Preserves evidence-before-spec principle |
| What output would be too generic? | Defends against ChatGPT sameness |

### Distribution

| Question | Why It Matters |
|---|---|
| Where do the first 10 paying users come from? | Forces commercial path |
| Which channel has visible shipped-but-stuck products? | Improves lead quality |
| Which channel is best for research but bad for selling? | Avoids spam and misread signals |
| Should English and Chinese markets be tested together? | Prevents mixed evidence |
| What outreach message asks for a paid diagnosis without sounding scammy? | Determines first conversion |

### Moat And Learning

| Question | Why It Matters |
|---|---|
| What case data becomes proprietary over time? | Defines future moat |
| What can ChatGPT not easily copy? | Clarifies differentiation |
| What should the Evidence Ledger remember? | Builds learning loop |
| What should the Founder Capability Graph capture? | Personalizes future advice |
| What outcome proves the PM judgment is good? | Sets evaluation standard |

## Final Strategic Decision

| Decision Area | Choice |
|---|---|
| First paid wedge | Scenario C: shipped or launched product, but nobody uses or pays |
| Narrower ICP | Solo or 2-person SaaS / AI tool builders with a live URL and at least one market-facing attempt |
| First product form | Paid concierge diagnosis |
| First commercial object | One 24h async Founder Diagnosis |
| Default decision posture | Usually `test`, `narrow`, or `iterate`; rarely `build` |
| PRD policy | Block PRD unless target, problem, evidence, risk, scope, metric, no-gos, and founder capability are clear |

## Why Scenario C First

| Reason | Explanation |
|---|---|
| Higher urgency | They already spent time building and now feel pain |
| More evidence | There is a URL, copy, launch, traffic, signups, replies, or explicit zeroes |
| Easier diagnosis | We can inspect ICP, promise, channel, activation, pricing, trust, and value |
| Stronger WTP | The buyer is paying to stop wasting another sprint |
| Better data | Each case creates a concrete Bet / Evidence / Decision record |

## Exclusions

| Excluded User | Reason |
|---|---|
| Pure idea-only founder | High curiosity, low payment probability |
| PM learner | Education demand, not urgent commercial pain |
| No URL, demo, or artifact | Too little external evidence |
| Generic "help me market it" buyer | Pulls product into growth/copywriting |
| Enterprise buyer needing invoice or contract | Wrong validation environment |

## Offer

| Market | Offer | Price | Notes |
|---|---:|---:|---|
| English | Founder Diagnosis, 24h async | `$99` | Start with one clear offer |
| English | Deep teardown | `$249` | Only after `$99` closes |
| Chinese | Async product diagnosis | `¥199` | Manual payment only |
| Chinese | Call plus short report | `¥499` | Say no invoice / company contract during beta |

Refundable deposits should not count as strong validation. They can be logged
as weak interest or trust-friction workaround.

## Buyer-Facing Promise

> Your product is launched but not converting. I will tell you whether the
> bottleneck is ICP, promise, channel, activation, pricing, trust, or product
> value, then give you one 7-day test with a pass/fail threshold.

## Required Report Contract

| Section | Requirement |
|---|---|
| Situation | Stage, product URL, current traction, founder goal |
| Bet | Target user, situation, problem, solution guess, expected behavior |
| Bottleneck | ICP / promise / channel / activation / pricing / trust / value |
| Evidence | Strongest proof, weakest proof, contradictions |
| Risk | Riskiest assumption |
| Decision | `test`, `narrow`, `iterate`, `kill`, or rarely `build` |
| Next test | One 7-day action with script/copy, target segment, success rule, kill rule |
| PRD gate | Allowed or blocked, with reason |

## Generic Output Failure Rubric

A diagnosis is not acceptable if:

| Failure | Example |
|---|---|
| Could be from ChatGPT | Generic advice with no product-specific evidence |
| No bottleneck named | "Improve marketing" without saying what is broken |
| No decision threshold | "Talk to users" without pass/fail criteria |
| No contradiction check | Ignores evidence that weakens the founder's belief |
| No behavioral test | Produces a PRD instead of a demand/payment test |

## Validation Sprint

| Day | Action |
|---|---|
| 1 | Lock offer, qualification rules, intake form, report template, case tracker |
| 2 | Build lead list: 40 EN leads, 20 ZH leads only if accessible |
| 3 | Send 15-20 personalized outreaches |
| 4 | Give 2-3 mini-diagnosis teasers, not full reports |
| 5 | Close first paid slots |
| 6 | Deliver first report within 24h |
| 7 | Review payment, objections, specificity, and trust |
| 8-10 | Send second outreach wave to best channel / segment |
| 11-12 | Deliver more reports and standardize repeated patterns |
| 13 | Check whether users executed the recommended test |
| 14 | Decide whether to continue, narrow, or stop |

## Success And Failure Gates

| Gate | Meaning |
|---|---|
| 3 paid customers in 14 days | Minimum commercial pass |
| 5 paid customers in 14 days | Stronger pass |
| At least 3 true Scenario C customers | Validates the chosen wedge |
| At least 40% non-friends | Real market evidence |
| 2 customers execute the next test | Output is operational |
| 1 anonymized case permission | Trust proof |

Fail, pause, or reposition if:

| Failure | Interpretation |
|---|---|
| Fewer than 2 paid after 50 qualified outreaches | Weak paid demand or poor channel/message |
| Good replies but no payment | Trust, price, or deliverable problem |
| Low reply rate | Channel or message problem |
| Buyers only want copy/growth hacks | Positioning problem |
| Buyers pay but do not execute | Diagnosis is interesting but not operational |
| Only friends pay | Weak external market signal |

## Case Tracker Fields

| Field Group | Fields |
|---|---|
| Founder | segment, country/language, founder capability, channel access |
| Product | URL, stage, ICP claim, promise/headline, pricing, channel tried |
| Baseline | traffic, signups, users, revenue, replies, demos, retention if any |
| Commercial | price offered, paid/deposit/no-pay, objection, source channel |
| Diagnosis | Bet, evidence cards, bottleneck, risk, decision, confidence, PRD gate |
| Test | test type, script/copy, target segment, success rule, kill rule |
| Outcome | 7-day result, did execute, would pay again, testimonial/case permission |

## What To Build Next

Build only internal operations:

| Build | Purpose |
|---|---|
| Intake form | Collect product URL, stage, evidence, traction, founder constraints |
| Case tracker | Capture paid evidence and objections |
| Evidence Ledger template | Keep every claim tied to source or user-provided fact |
| Report template | Make every diagnosis consistent and non-generic |
| Outreach scripts | Test channels and messages cleanly |

Do not build yet:

| Do Not Build | Reason |
|---|---|
| Full auth | Not needed for concierge validation |
| Dashboard | Premature UI complexity |
| Automated crawlers | Evidence model not validated by paid cases yet |
| Coding-agent handoff | PRD/spec should stay gated |
| Full memory system | Need real case records first |

## External Evidence Used As Context

| Source | Useful Signal |
|---|---|
| Product Hunt launch guide | Launch should be deliberate; use PH for mining before a public launch |
| Indie Hackers | The community centers profitable online businesses and side projects |
| DimeADozen | Users pay for sourced business validation reports, but this does not prove our PM-diagnosis offer |
| GrowthMentor | Founders pay for expert judgment; David must be more specific and cheaper/faster than human mentorship |

## Next Spec Implication

Do not write `07_agent_workflows.md` yet as a theoretical spec. First run
5-10 paid or attempted cases, then write `07` from observed repeated patterns:

| Future Spec | Should Be Based On |
|---|---|
| `02_user_scenarios.md` revision | Paid cases and objections |
| `07_agent_workflows.md` | Repeated diagnosis steps from real cases |
| `08_mvp_ux_spec.md` | Actual moments where users need chat, report, evidence drawer, or decision card |
| `09_memory_spec.md` | Real fields that changed future advice |
| `10_artifact_spec.md` | Outputs users actually paid for or executed |

## 2026-06-28 Subagent Prep

The live WorkBuddy follow-up was attempted again, but the macOS session was
locked at `loginwindow`, so WorkBuddy could be snapshotted but not controlled.
Three subagents were still used to strengthen the meeting plan before the next
WorkBuddy attempt.

| Subagent Lens | Strongest Advice |
|---|---|
| Commercial strategy | Prove one narrow paid build/test/kill decision. Do not try to prove the whole AI PM coworker vision yet. |
| Product/protocol | Test whether David can name a sharper bottleneck than ChatGPT before writing `07-10`. |
| Founder-ops/GTM | Run a 14-day paid concierge sprint with direct outreach, mini-diagnosis teaser, paid full report, and 7-day follow-up. |

Shared conclusion:

```text
Beachhead: launched/prototyped indie SaaS or AI tool with weak usage/payment.
Offer: 24h paid PM diagnosis that names the bottleneck and one 7-day test.
Validation: real payment + user executes or seriously commits to the test.
Do not build: auth, dashboard, crawler, full memory, coding-agent handoff.
```

## WorkBuddy Meeting Script

When WorkBuddy is usable, ask Liu Xiaopai in rounds. Do not paste the whole
script at once. Each round should adapt to the previous answer.

### Round A: Beachhead

```text
请作为 AI 刘小排产品顾问，和我开一次真正的产品战略会。

背景：David / AI PM Doctor 是面向独立开发者的 AI PM coworker，不是 PRD bot。
我们已有 00-06 specs：Bet、Evidence、Decision、PRD gate；已有验证页原型，但还没有真实付费验证。
请像商业判断，不要像产品愿景。

问题组 A：Beachhead / 第一付费楔子
1. 六个场景里，只能选一个先卖：A 会 build 但没方向；B 已有 prototype 但价值不清；C built but nobody uses/pays；D built 后卡在 GTM；E 有弱信号不会解读；F PM learner 需要专业判断。你选哪一个，为什么？
2. 哪一个最容易让我们误判为有需求但其实不付钱？
3. 第一批付费用户应排除谁？
4. 这个楔子的 before David / after David 一句话是什么？
5. 这个楔子如果 2 周失败，失败标准是什么？
```

### Round B: Offer And Pricing

```text
继续第二轮，只回答商业判断。

问题组 B：Offer / Pricing / Service vs Tool
6. 第一版应该卖“报告”“诊断”“电话”“陪跑”还是“软件访问”？只能选一个主 offer。
7. 第一单到底应该免费、¥9.9、¥99、¥199、¥499、$49、$99 还是别的？为什么？
8. 第一版应该先做高触人工服务，还是页面自助诊断？边界在哪里？
9. 哪些内容可以免费 teaser，哪些必须付费后才给？
10. 如果用户说“有用但不想付费”，这说明什么？我们下一步怎么判断？
```

### Round C: Channels And Market Split

```text
第三轮，继续像商业判断。

问题组 C：渠道 / 冷启动 / 中英文市场
11. 第一批 20 个用户从哪里来？请按优先级列渠道，不要泛泛而谈。
12. Product Hunt / Indie Hackers / Reddit / X / 即刻 / V2EX / W2Solo / 微信群，各自适合研究、销售、还是建立信任？
13. 中国市场没有公司资质和发票时，怎么验证愿意付费最现实？
14. 英文市场和中文市场应该一起测还是分开测？为什么？
15. 第一条私信/帖子应该怎么写，才不会像 AI 服务广告？
```

### Round D: Mechanism, Memory, And Moat

```text
第四轮，继续挑战我。

问题组 D：Productization / Moat / Data Loop
16. 每个付费/未付费 case 必须记录哪些字段，未来才可能形成壁垒？
17. 哪些东西现在绝对不能自动化？哪些可以半自动？
18. David 和 ChatGPT 最大差别应该在哪里？不要说“更垂直”，说具体机制。
19. 什么情况下才值得写 07_agent_workflows、08_ux、09_memory、10_artifact？
20. 这个产品未来真正的 moat 是什么？如果大厂复制页面和 prompt，剩下什么？
```

### Round E: Decision Gates

```text
最后一轮，请像投资人/合伙人一样给最终建议。

问题组 E：Decision Gates / Next 14 Days
21. 接下来 14 天，我、Codex、这个产品分别应该做什么？
22. 哪三个指标决定继续做？
23. 哪三个信号说明应该砍掉或换方向？
24. 如果你只能让我今天做一件事，是什么？
25. 请给出最终结论：现在是 build / test / narrow / wait / kill / iterate 哪一个？置信度多少？
```

## Questions That Should Change Our Plan

| If Liu Says... | Change |
|---|---|
| The buyer mostly wants traffic/growth, not PM judgment | Reposition as conversion + Bet diagnosis, or reject the wedge. |
| Async reports are not trusted | Sell live teardown plus short memo first. |
| The pain is launch avoidance, not conversion | Promote S4 over S3 and make GTM action design the first workflow. |
| Users lack traffic/evidence | Add "built but not exposed to market" as a sub-scenario; default to `test`, not `iterate`. |
| China payment/invoice friction dominates | Split China into a separate lower-confidence personal-payment experiment. |
| The gap from ChatGPT is unclear | Run a blinded comparison before building more product. |
| Buyers ask for PRDs despite weak evidence | Keep PRD blocking internal, but offer a smallest reversible test artifact. |
| Buyers only want landing-page copy | This is not our thesis unless the copy is tied to a Bet/evidence test. |

## Current Final Recommendation Before WorkBuddy Follow-Up

The current best next move is still:

```text
Decision: TEST, not BUILD.
Scope: 14-day paid concierge validation.
Buyer: launched/prototyped indie SaaS or AI tool builder with weak usage/payment.
Offer: 24h async Founder Diagnosis.
Output: bottleneck + decision + one 7-day evidence/payment test.
Gate: 3 paid customers in 14 days, 2 non-friends, 2 users execute or seriously commit to the test.
```

Only after this should we write `07_agent_workflows.md`, `08_mvp_ux_spec.md`,
`09_memory_spec.md`, and `10_artifact_spec.md` as product specs.
