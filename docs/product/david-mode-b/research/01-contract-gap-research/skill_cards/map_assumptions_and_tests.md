# Skill: `map_assumptions_and_tests`

> 状态：Research contract；synthetic examples 仅用于评测，不是用户证据或测试结果。

## Purpose

把影响产品决定但缺乏足够证据的 belief 转成精确、离散、可证伪的 assumptions；按重要性、证据强度与错误成本确定顺序，并为最高优先 assumption 设计最小、可判定的 test。

## Trigger

- Orient/IA/Flow/Scope 出现 high-impact inference；
- Four Risks 中一个或多个 risk 缺 evidence；
- 多个 solution candidate 需要比较；
- 用户/Founder preference 被误当 user need；
- handoff 前仍有 material unknown；
- 新 evidence 与 active assumption 冲突。

## Inputs

| 输入 | 必需 | 说明 |
|---|---:|---|
| `decisionId` | 是 | 该学习会改变的决定 |
| `candidateAssumptions` | 是 | belief 文本、risk domain、依赖的 solution/outcome |
| `evidenceInventory` | 是 | 现有 evidence、来源、日期、强度、冲突 |
| `importanceContext` | 是 | 若 assumption 错误，会影响什么 outcome/scope |
| `costOfWrong` | 是 | low/medium/high + rationale |
| `availableTestChannels` | 是 | prototype、interview、survey、data、technical spike 等 |
| `constraints` | 是 | privacy、budget、time、sample access、ethical no-go |
| `previousTests` | 否 | completed/inconclusive results，防止重复 |

## Method

1. **Assumption decomposition**：问“为使这个 solution 成立，哪些 belief 必须为真？”
2. **Strategyzer Assumption Mapping**：以 importance 与 observable evidence strength 排序；不使用伪精确乘法总分。
3. **Product Talk Assumption Testing**：测试 specific assumption，不测试整个 idea；从 prototype test、one-question survey、data mining、research spike 等选择匹配类型。
4. **Decision-first experiment design**：测试前写 expected observation、threshold、supported/contradicted/inconclusive 三条 decision rule。

## Professional Rules

1. Assumption 必须是可为真或假的陈述，不是问题、愿望或 solution 描述。
2. 一条 assumption 只含一个主要 belief；同时出现多个 `and` 通常需拆分。
3. `evidenceStrength` 由可追溯 evidence 决定，不能等同模型 confidence。
4. 优先 high importance + weak evidence + high cost of wrong；若 test cost 极高，可先拆更小 proxy assumption。
5. 先复用 analytics、support、previous test 等已有 evidence，避免重复研究。
6. 每个 test 指向一个 primary assumption；可记录 secondary learnings，但不能自动升级其他 claims。
7. `expectedObservation` 与 threshold 必须在收集结果前冻结，防止事后改判据。
8. test 必须允许 `inconclusive`；未达样本/操作失败不等于 assumption contradicted。
9. synthetic user、LLM role-play、竞品做法只能帮助生成 assumption 或 test idea，不能作为 user evidence。
10. 涉及欺骗、真实付款、生产流量、敏感数据时，必须经过 approval/ethics/privacy gate。
11. test 结果应触发 decision update，而不是只积累 report。

## Anti-patterns

- Assumption：“用户会喜欢这个产品”；
- 一次 A/B test “验证整个 MVP”；
- 先看结果再设 success threshold；
- 用 5 个 AI personas 投票作为用户证据；
- Landing page click 被直接解释为愿意持续使用/付费；
- 只测试容易的 assumption，避开决定成败的 risk；
- 结果 inconclusive 却升级为 confirmed。

## Do Not Use When

- claim 已有 strong、current、relevant evidence 且无冲突；
- unknown 不影响任何可见决定且有低成本 reversible fallback；可 `DEFER_AS_ASSUMPTION`，无需立即设计 test；
- 决定是用户-owned preference/commitment，不是 evidence-dependent truth；应 Ask/Approve；
- 当前任务只是 deterministic schema/ID validation；
- 需要完整市场研究计划；应转 Research Plan，不能用单一 assumption test 替代。

## Structured Output

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://david.local/schemas/skills/map_assumptions_and_tests.output.json",
  "type": "object",
  "required": ["skillId", "decisionId", "assumptions", "priorityOrder", "testPlans", "nextAction"],
  "properties": {
    "skillId": { "const": "map_assumptions_and_tests" },
    "decisionId": { "type": "string" },
    "assumptions": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "object",
        "required": ["assumptionId", "statement", "riskDomain", "importance", "evidenceStrength", "costOfWrong", "evidenceIds", "status", "testable"],
        "properties": {
          "assumptionId": { "type": "string" },
          "statement": { "type": "string", "minLength": 1 },
          "riskDomain": { "enum": ["value", "usability", "feasibility", "viability", "ethical", "mental_model", "flow", "scope"] },
          "importance": { "enum": ["low", "medium", "high"] },
          "evidenceStrength": { "enum": ["none", "weak", "medium", "strong"] },
          "costOfWrong": { "enum": ["low", "medium", "high"] },
          "evidenceIds": { "type": "array", "items": { "type": "string" } },
          "status": { "enum": ["active", "ready_to_test", "testing", "supported", "contradicted", "inconclusive", "retired"] },
          "testable": { "type": "boolean" },
          "decompositionNeeded": { "type": "boolean" }
        },
        "additionalProperties": false
      }
    },
    "priorityOrder": { "type": "array", "items": { "type": "string" }, "uniqueItems": true },
    "testPlans": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["testId", "primaryAssumptionId", "method", "procedure", "expectedObservation", "threshold", "decisionIfSupported", "decisionIfContradicted", "inconclusiveNext", "cost", "approvalRequired"],
        "properties": {
          "testId": { "type": "string" },
          "primaryAssumptionId": { "type": "string" },
          "method": { "enum": ["prototype_test", "one_question_survey", "data_mining", "research_spike", "interview", "fake_door", "concierge", "other"] },
          "procedure": { "type": "array", "items": { "type": "string" }, "minItems": 1 },
          "expectedObservation": { "type": "string" },
          "threshold": { "type": "string" },
          "decisionIfSupported": { "type": "string" },
          "decisionIfContradicted": { "type": "string" },
          "inconclusiveNext": { "type": "string" },
          "cost": { "enum": ["low", "medium", "high"] },
          "approvalRequired": { "type": "boolean" },
          "ethicsPrivacyNotes": { "type": "array", "items": { "type": "string" } }
        },
        "additionalProperties": false
      }
    },
    "nextAction": { "enum": ["RESEARCH_OR_TEST", "DEFER_AS_ASSUMPTION", "PROPOSE_FOR_APPROVAL", "NO_TEST_NEEDED"] }
  },
  "additionalProperties": false
}
```

## Default Autonomy

- 建立 assumption ledger、拆分和排序：`APPLY_WITH_UNDO`（L1）。
- 仅使用现有 non-sensitive data 的 read-only analysis：可 `RESEARCH_OR_TEST`，按工具权限执行。
- 触达真实用户、生产实验、付费或数据处理：`PROPOSE_FOR_APPROVAL`。
- nonblocking/low-cost-of-wrong：`DEFER_AS_ASSUMPTION`。

## Must Ask When

- success threshold 是 user-owned business commitment；
- 是否允许触达用户、使用数据、投入预算或生产流量不明确；
- 真实用户 segment/sampling frame 只有用户知道；
- assumption 涉及 legal/ethical/privacy interpretation，不能由 David 推断。

## Approval Required When

- fake door、pricing/payment、email outreach、production A/B；
- 使用个人/敏感/客户数据；
- engineering spike 有显著成本或外部系统影响；
- test 可能误导、伤害或改变真实用户体验；
- 根据结果改变 core Bet、target user 或 MVP scope。

## Validation

### Deterministic

- 每条 test 的 `primaryAssumptionId` 存在；
- `ready_to_test` assumption 必须 `testable=true`；
- threshold/decision rules 在 result event 之前创建；
- `supported|contradicted` 必须引用 result evidence；
- synthetic evidence 不得使 `evidenceStrength=strong`；
- privacy/production method 必须 `approvalRequired=true`；
- priority order 无重复且覆盖 active high-importance assumptions。

### Expert / LLM Critic Candidate

- assumption 是否 precise/discrete/falsifiable；
- test 是否只针对一个主要 belief；
- expected observation 是否真能区分 supported 与 contradicted；
- proxy metric 是否被过度外推；
- test 是否是改变决定的最低成本方案。

### Needs Real Research

- 目标用户可获得的 sample/data/tool access；
- threshold 与 sample sufficiency；
- experiment 对实际 adoption、retention、payment 的 predictive value；
- David 建议的 test 是否被 builder 执行且改变决定。

## Positive Evaluation Cases（synthetic）

| ID | 输入 | 期望行为 | 原因 |
|---|---|---|---|
| `MAT-P1` | “考生每天愿意让 AI 自动决定练习顺序”无证据 | 拆为 adoption/value assumption；设计 prototype choice test，预先写观察与 decision rule | specific belief，可低成本测试 |
| `MAT-P2` | 外部 API 能否在 2 秒内返回 | feasibility assumption；先 data/docs/spike，不做用户访谈 | test 与 risk 匹配 |
| `MAT-P3` | 现有 analytics 显示 80% 用户从 mobile 打开，但目标是 desktop V1 | 标 conflicting evidence，优先验证 target segment/context，再决定 platform | evidence 会改变 core decision |

## Negative Evaluation Cases / Failure Modes（synthetic）

| ID | 输入/错误输出 | 失败原因 | 正确修复 |
|---|---|---|---|
| `MAT-N1` | “用户会喜欢”→做整站 A/B | assumption 太泛、test 太大 | 拆成具体行为/价值 belief |
| `MAT-N2` | LLM 模拟 20 个用户，18 个喜欢，标 strong evidence | synthetic evidence laundering | 仅作为 hypothesis generation |
| `MAT-N3` | 数据出来后把 success threshold 改到刚好通过 | hindsight bias | result 前冻结 threshold，结果可 inconclusive |

## Sources

| Source title | Source type | URL | Date | Exact supported point | Limitation | David implication | Confidence |
|---|---|---|---|---|---|---|---|
| How Assumptions Mapping Can Focus Your Teams... | Strategyzer primary/authoritative | https://www.strategyzer.com/library/how-assumptions-mapping-can-focus-your-teams-on-running-experiments-that-matter | 2020-08-04 | hypothesis 应 testable/precise/discrete；按 importance 与 evidence 映射，优先 critical weak-evidence beliefs | 2×2 依赖主观判断，未给 outcome 效果量 | 保存 ordinal rank/rationale/evidence，不做伪精确总分 | High |
| Assumption Testing | Product Talk primary method-author | https://www.producttalk.org/glossary-discovery-assumption-testing/ | 更新 2025-10-25 | 测试 specific assumption 而非 whole idea；可用 prototype/survey/data/spike；越具体越易测 | 未给统一 sample/threshold | 一个 test 绑定一个 primary assumption，允许 inconclusive | High |
| Opportunity Solution Trees | Product Talk primary method-author | https://www.producttalk.org/opportunity-solution-trees/ | 2023-12-06 | solutions 应拆 underlying assumptions，并测试不同 ideas 的 riskiest assumptions | 需要真实 discovery inputs；不适合无 evidence 时生成完整 OST | assumption 可从 solution 分解，但 opportunity 不得编造 | High |
