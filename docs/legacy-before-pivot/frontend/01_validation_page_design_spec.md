# Validation Page Design Spec

## Page Goal

Validate paid demand for an AI-assisted PM diagnosis service.

The page should not sell a full SaaS yet. It should sell a focused diagnosis:

```text
Submit your product, evidence, and current uncertainty.
Get a PM diagnosis with decision, confidence, evidence gap, and next validation test.
```

## Primary Audience

| Market | User | Page Must Prove |
|---|---|---|
| English | Solo/indie AI SaaS builder with prototype, landing page, early users, or no paid users. | This is not generic ChatGPT advice; it produces a concrete PM judgment and next test. |
| Chinese | 独立开发者 / 出海 builder with MVP, demo, AI tool, Chrome extension, or early traction. | This is a safe, specific, manually confirmed paid beta/service, not a course funnel or anonymous QR payment. |

Do not target pure idea-only users as the main page framing.

## Information Architecture

Use this exact section order:

1. Header
2. Hero Diagnostic Workbench
3. Sample Diagnosis Report
4. Method / Protocol
5. Trust Boundaries
6. Pricing
7. FAQ / Privacy / Payment
8. Footer

## Header

Desktop header:

- Left: `IndiePM Clinic`
- Small sublabel: `AI-assisted PM diagnosis`
- Nav: `Sample report`, `Method`, `Pricing`, `Privacy`
- Right: language toggle `EN / 中文`
- CTA: `Start diagnosis`

Mobile header:

- Left: `IndiePM`
- Right: language toggle + menu or CTA
- Avoid crowding nav links.

## Hero Diagnostic Workbench

The hero is split:

```text
Left: offer and trust
Right: diagnostic workbench
```

### Hero Copy EN

Badge:

```text
For launched prototypes, 0-10 paid users
```

H1:

```text
Get a PM diagnosis before your next build sprint.
```

Subcopy:

```text
We frame your Bet, inspect evidence, find the riskiest assumption, and tell you whether to build, test, narrow, iterate, wait, or kill.
```

Primary CTA:

```text
Start paid diagnosis
```

Secondary CTA:

```text
View sample report
```

Trust bullets:

- AI-assisted, human-reviewed
- No private credentials needed
- Clear price, scope, and timeline

### Hero Copy ZH

Badge:

```text
适合已有 MVP / demo / 早期用户 / 付费尝试的产品
```

H1:

```text
先判断该不该做，再让 Cursor 写代码。
```

Subcopy:

```text
AI PM Doctor 会梳理你的产品 Bet、检查证据、找到最大风险，并给出 build / test / narrow / iterate 判断。
```

Primary CTA:

```text
申请付费体检名额
```

Secondary CTA:

```text
查看样例报告
```

Trust bullets:

- AI 辅助 + 人工复核
- 不需要后台 / API 权限
- 价格、范围、交付时间透明

## Workbench Layout

Use a single large card with three columns on desktop.

### Column 1: Inputs

Fields shown as read-only demo rows:

- Product URL
- Stage
- Target user
- Current evidence
- Current traction / metrics
- Biggest uncertainty

Example values:

- `landing page live`
- `traffic, no paid users`
- `3 Reddit complaints, 2 review patterns`

### Column 2: Reasoning

Show a checklist:

1. Orient situation
2. Frame Bet
3. Inspect evidence
4. Map four risks
5. Choose decision

Each item has:

- status icon
- short result
- source count or missing-field count

### Column 3: Diagnosis

Must show:

```text
Decision: TEST
Confidence: Medium
PRD gate: Blocked
Riskiest assumption: Payment intent
Next action: Run a paid diagnosis / concierge offer before building more.
```

Use:

- amber for `TEST`
- danger/coral for `PRD blocked`
- jade for verified evidence

### Evidence Ledger Drawer

Rows:

| Source | Claim | Strength | Recency |
|---|---|---|---|
| Reddit | Hard to choose what to build | Medium | 2d |
| G2 | Generic validators feel shallow | Medium | 5d |
| Search | Source-backed PM advice demand | Medium | 1d |
| Payment | No direct WTP signal | Low | missing |

The ledger makes the page feel trustworthy. Do not hide evidence behind vague "AI score" UI.

## Sample Diagnosis Report

Section title:

```text
What the diagnosis looks like
```

Layout:

- Left: report preview.
- Right: "What you receive" checklist.

Report tabs:

- Situation
- Bet
- Evidence
- Decision
- Next test

Report must include a visible no-build gate:

```text
No PRD yet.
Payment evidence is missing.
Recommended next step: run a paid offer test.
```

What-you-receive checklist:

- PM diagnosis memo
- Bet statement
- evidence gap
- riskiest assumption
- pricing / ICP / positioning notes
- next 7-day validation test
- coding-agent prompt only if build-ready

## Method / Protocol

Title:

```text
The protocol behind the judgment
```

Show compact process:

```text
Intake -> Evidence review -> PM judgment -> Test plan -> Memory
```

Each step should show what the agent/human does:

| Step | Detail |
|---|---|
| Intake | Understand stage, product, founder constraints. |
| Evidence review | Check complaints, reviews, search, competitors, metrics, payment. |
| PM judgment | Frame Bet, map risks, identify riskiest assumption. |
| Test plan | Create the strongest feasible validation test. |
| Memory | Save decision, evidence, and outcome for future learning. |

## Trust Boundaries

This section is mandatory.

Two columns:

### What We Inspect

- landing page / product URL
- product positioning
- ICP and use case
- pricing and offer
- onboarding and activation path
- known evidence and complaints
- metrics if provided
- competitor alternatives

### What We Do Not Need

- admin account
- API keys
- database access
- private customer data
- payment processor access
- repo write access
- sensitive screenshots

Add note:

```text
Remove private user data before submitting screenshots or links.
```

## Pricing

Show one-time prices. No subscription framing in V1.

### EN Cards

Card 1:

```text
$99 Founder Diagnosis
24h report
For one product / one current decision
Includes evidence gap, riskiest assumption, and next validation test
```

Card 2:

```text
$249 Deep Teardown
Report + rewritten positioning / offer
20-min review call
Best for launched product with traffic, users, or early revenue
```

### ZH Cards

Card 1:

```text
¥199 异步产品体检
48 小时内交付
3 个关键问题 + 3 个修改建议
适合已有 demo / landing page 的产品
```

Card 2:

```text
¥499 Beta 产品体检
45 分钟腾讯会议 + short report
包含 Bet 判断、证据缺口、下一步测试
适合已有早期用户或流量的产品
```

ZH payment note:

```text
验证期暂不支持发票 / 对公合同。付款后 6 小时内确认，未确认可原路退回。
```

## FAQ / Privacy / Payment

Required FAQ items:

| Question | Answer Direction |
|---|---|
| Is this a PRD generator? | No. PRD only after evidence is strong enough. |
| What if I have no evidence? | We create the strongest feasible evidence test. |
| Do you guarantee growth? | No. We diagnose, prioritize, and design tests. |
| Do you need private access? | No admin/API/repo/payment credentials for V1. |
| Is this AI-only? | AI-assisted, human-reviewed during validation. |
| Can it write a Cursor/Codex prompt? | Only if the Bet is build-ready. |
| Chinese payment details? | Manual beta application, confirmation SLA, refund/reschedule terms. |

## Interaction Rules

### Above Fold

The user can:

- enter product URL or idea
- select stage
- switch EN/ZH
- click `Start diagnosis`
- click `View sample report`

Do not ask for email before showing sample value.

### Intake

Initial intake should be short:

1. Product stage
2. Product URL
3. Target user
4. Current evidence
5. Biggest uncertainty
6. Email / contact after preview

Full intake can happen after CTA.

### Diagnosis Preview

Preview can be mock/protocol-based but must be honest:

- show `sample` label if not real
- do not fabricate sources
- use placeholder sources only in demo mode
- never imply guaranteed business result

### Payment Flow

EN:

- Use checkout if payment provider configured.
- If not configured, show paid beta application.

ZH:

- Use paid beta application.
- Show plan, scope, confirmation SLA, refund/reschedule rule before manual payment instruction.
- Do not show QR code unless actual payment flow is ready.

## Responsive Rules

Desktop:

- Hero grid 40/60.
- Workbench max height around 560-620px.
- Evidence ledger can sit inside the workbench footer.

Tablet:

- Hero grid 1 column.
- Workbench below offer.
- Report preview above checklist.

Mobile:

- Header simplified.
- CTA visible after H1 and after diagnosis preview.
- Workbench becomes stacked cards:
  - Current Bet
  - Evidence
  - Decision
  - Next Action
- Pricing cards stack.
- ZH payment trust note must appear near CTA.

## Implementation Notes

Recommended component approach:

- Use shadcn-style primitives for all base UI.
- Use CSS variables from `docs/frontend/00_final_visual_direction.md`.
- Use lucide icons for status, lock, shield, file, target, flask, chart, credit card, message, and external link.
- Use one source of truth for EN/ZH copy.
- Build static demo data first; do not invent fake testimonials.

Recommended component split:

```text
components/site/Header.tsx
components/site/HeroWorkbench.tsx
components/site/EvidenceLedger.tsx
components/site/SampleReport.tsx
components/site/MethodStrip.tsx
components/site/TrustBoundaries.tsx
components/site/Pricing.tsx
components/site/Faq.tsx
components/site/LocaleToggle.tsx
```

## QA Criteria

Before accepting the redesign:

- Desktop first viewport shows real diagnostic surface.
- Mobile first viewport clearly explains the offer and CTA.
- EN/ZH toggle changes hero, pricing, payment notes, and CTA.
- No purple/neon/AI-gradient style remains.
- No fake testimonials/logos/customer counts.
- Pricing, scope, timeline, privacy, and payment terms are visible.
- The page still tracks validation events.
- Text fits on mobile.
- Visual hierarchy feels commercial, not generated.
