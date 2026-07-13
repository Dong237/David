# Skill: `shape_mvp_scope`

> 状态：Research contract；synthetic examples 仅用于评测，不是用户证据。

## Purpose

在明确的 appetite、约束与 core outcome 下，把候选方案塑形成一个端到端可用、依赖闭合、风险可解释的 MVP Bet。输出重点是“为什么这条 slice 足以产生结果，以及明确不做什么”，不是 feature 数量最少或 backlog 顶部若干项。

## Trigger

- Candidate IA、core flow 与 node inventory 已有第一版；
- 用户给出 deadline、团队、budget 或“第一版只做什么”的约束；
- 当前方案明显超过 appetite；
- scope cut 可能破坏 required path；
- rabbit hole、external dependency 或 unresolved design problem 可能放大交付风险；
- handoff readiness 前需要确认 In MVP/Later/Excluded/Test first。

## Inputs

| 输入 | 必需 | 说明 |
|---|---:|---|
| `betId` | 是 | 当前 Bet canonical ID |
| `coreOutcome` | 是 | 本次 MVP 必须让用户完成的结果 |
| `appetite` | 是 | 愿意投入的时间/团队/成本边界；不是 estimate |
| `problem` | 是 | bounded problem 与触发情境 |
| `baseline` | 是 | 当前替代/最低可比较体验 |
| `storyMap` | 是 | activities/steps/details 或同等 core-flow backbone |
| `candidateItems` | 是 | nodes/capabilities/states/integrations |
| `dependencies` | 是 | item 间和外部依赖 |
| `constraints` | 是 | quality/legal/privacy/security/no-go |
| `riskAssessment` | 否 | Four Risks 输出 |
| `effortEstimates` | 否 | 独立于 appetite 的工程估计，可为区间 |
| `evidence` | 否 | user/business/technical evidence |

## Method

1. **Shape Up**：以 appetite 为 creative constraint；明确 problem、appetite、rough solution、rabbit holes、no-gos。
2. **Story-map slicing**：沿用户 activity/step backbone 检查 slice 是否保留一条端到端结果。
3. **Dependency closure**：所有 In-MVP required dependency 必须也在 MVP、已有系统或明确替代方案中。
4. **Risk-first shaping**：对 high-impact/weak-evidence item 优先 test/cut/patch，而非默认 build。

## Professional Rules

1. `appetite` 必须来自用户/confirmed constraint；不得默认 6 周，也不得由 feature list 反推。
2. `appetite` 与 `effortEstimate` 分字段：前者是愿意投入的上限，后者是对方案的成本判断。
3. 先定义 `coreOutcome` 和 `baseline`，再判断哪些能力是必要条件。
4. 每个 scope item 必须属于 `in_mvp|later|excluded|test_first|rabbit_hole|dependency_blocked` 之一，并有 rationale。
5. 每次 cut 后执行 flow、dependency、node mini-IA、AC cascade check。
6. Story-map slice 必须跨越每个必要 activity；不能只完成 UI 前端而没有结果确认/恢复。
7. Rabbit hole 必须有 `patch|test|cut|accept_with_approval`；“交给工程解决”不是处理。
8. No-go 必须具体、可测试并进入 locked constraint；“暂时不完善”不是 no-go。
9. `Test first` 表示不确定性阻断 build commitment，不应伪装成 In MVP feature。
10. Scope cut 不等于 lowering quality；安全、隐私、可访问性、数据完整性等质量底线不能作为可选 feature 删除。
11. 如果 appetite 不足以完成任何 coherent slice，应缩小 problem/outcome，而不是输出碎片化 MVP。

## Anti-patterns

- 将 MVP 定义为“功能数量最少”；
- 把 backlog 前 5 项称为 scope；
- 删除 onboarding/empty/error/recovery 后声称路径完整；
- 照搬 Shape Up 的 6-week cycle；
- 用 appetite 代替 engineering estimate；
- 所有未知都留给实施阶段；
- Later item 是 In-MVP item 的 required dependency；
- no-go 写成“先不做高级功能”但未定义边界。

## Do Not Use When

- 尚无 target user/core outcome/core flow；应回到 Orient/Intent/Flow；
- 用户只是比较多个 initiative 谁先做；使用 `prioritize_features`；
- 没有任何 appetite/constraint 且用户也不愿形成 provisional bound；只能输出 unbounded candidate scope；
- 当前只需定义单个 business rule 的 AC；
- 纯 research spike 还没有 solution boundary；先用 Assumption Testing。

## Structured Output

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://david.local/schemas/skills/shape_mvp_scope.output.json",
  "type": "object",
  "required": ["skillId", "betId", "coreOutcome", "appetite", "baseline", "items", "cuts", "rabbitHoles", "noGos", "dependencyClosure", "readiness"],
  "properties": {
    "skillId": { "const": "shape_mvp_scope" },
    "betId": { "type": "string" },
    "coreOutcome": { "type": "string", "minLength": 1 },
    "appetite": {
      "type": "object",
      "required": ["value", "unit", "teamContext", "sourceIds", "confirmed"],
      "properties": {
        "value": { "type": "number", "exclusiveMinimum": 0 },
        "unit": { "enum": ["days", "weeks", "person_days", "budget", "other"] },
        "teamContext": { "type": "string" },
        "sourceIds": { "type": "array", "minItems": 1, "items": { "type": "string" } },
        "confirmed": { "type": "boolean" }
      },
      "additionalProperties": false
    },
    "effortEstimate": {
      "type": ["object", "null"],
      "properties": {
        "low": { "type": "number", "minimum": 0 },
        "high": { "type": "number", "minimum": 0 },
        "unit": { "type": "string" },
        "sourceIds": { "type": "array", "items": { "type": "string" } }
      }
    },
    "baseline": { "type": "string" },
    "items": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["itemId", "itemType", "scopeState", "rationale", "activityRefs", "dependencyIds"],
        "properties": {
          "itemId": { "type": "string" },
          "itemType": { "enum": ["node", "capability", "state", "flow", "integration", "acceptance_criterion"] },
          "scopeState": { "enum": ["in_mvp", "later", "excluded", "test_first", "rabbit_hole", "dependency_blocked"] },
          "rationale": { "type": "string" },
          "activityRefs": { "type": "array", "items": { "type": "string" } },
          "dependencyIds": { "type": "array", "items": { "type": "string" } },
          "evidenceIds": { "type": "array", "items": { "type": "string" } }
        },
        "additionalProperties": false
      }
    },
    "cuts": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["itemId", "from", "to", "reason", "affectedFlowIds", "repair"],
        "properties": {
          "itemId": { "type": "string" },
          "from": { "type": "string" },
          "to": { "type": "string" },
          "reason": { "type": "string" },
          "affectedFlowIds": { "type": "array", "items": { "type": "string" } },
          "repair": { "type": ["string", "null"] }
        }
      }
    },
    "rabbitHoles": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["id", "description", "impact", "response"],
        "properties": {
          "id": { "type": "string" },
          "description": { "type": "string" },
          "impact": { "enum": ["low", "medium", "high"] },
          "response": { "enum": ["patch", "test", "cut", "accept_with_approval"] }
        }
      }
    },
    "noGos": { "type": "array", "items": { "type": "string", "minLength": 1 } },
    "dependencyClosure": {
      "type": "object",
      "required": ["closed", "unresolvedDependencyIds"],
      "properties": {
        "closed": { "type": "boolean" },
        "unresolvedDependencyIds": { "type": "array", "items": { "type": "string" } }
      }
    },
    "readiness": { "enum": ["unbounded", "bounded_with_warnings", "ready_for_approval", "blocked"] }
  },
  "additionalProperties": false
}
```

## Default Autonomy

- 默认：`PROPOSE_FOR_APPROVAL`（L2），因为最终 MVP boundary 是 consequential commitment。
- 生成候选 cut、rabbit-hole list、dependency warnings：`APPLY_WITH_UNDO`。
- 明显 orphan Later item 的标注可 L1，但删除/归档仍需批准。
- 不确认的 appetite：`ASK_USER` 或在安全时 `DEFER_AS_ASSUMPTION`，输出不能为 ready。

## Must Ask When

- deadline、team、budget、质量底线或 non-negotiable outcome 未知且会改变 scope；
- 用户必须选择“缩小问题”还是“增加 appetite”；
- external dependency 是否已有合同/权限/预算只有用户知道；
- 两个 core outcomes 互斥，无法在同一 coherent slice 中成立。

## Approval Required When

- 最终确认 In MVP/Later/Excluded/Test first；
- 移除 core-path node/state/capability；
- 改变 confirmed outcome、required path 或 locked no-go；
- 接受 high rabbit hole 或 unresolved external dependency；
- 用较低质量/安全/隐私标准换取 scope（通常应拒绝而非批准）。

## Validation

### Deterministic

- appetite 与 source/confirmed 状态存在；
- In-MVP required dependency 不得是 Later/Excluded/Blocked；
- story-map/core flow 每个 required activity 至少有一个 In-MVP step；
- P0 flow 从 entry 到 success/recovery 可达；
- no-go 不与 In-MVP item 冲突；
- cut 的 affected IDs 均完成 cascade validation；
- high rabbit hole 必须有 response，`accept_with_approval` 必须 pending approval。

### Expert / LLM Critic Candidate

- core outcome 是否足够窄且有真实用户价值；
- baseline 是否允许判断 slice 相对改进；
- scope 是否是 coherent experience 而非零散 feature pile；
- rabbit-hole response 是否真正降低风险；
- no-go 是否具体且为团队留有实施空间。

### Needs Real Research

- 目标用户是否认为该 MVP outcome 有价值；
- builder 的真实 capacity/implementation performance；
- appetite 表达与 scope diff 是否帮助独立开发者做决定；
- downstream Agent 是否能在该 boundary 内交付。

## Positive Evaluation Cases（synthetic）

| ID | 输入 | 期望行为 | 原因 |
|---|---|---|---|
| `SMS-P1` | AI study coach，10 天 appetite；core outcome 为生成并完成今日练习 | 保留设置目标→生成任务→完成→结果确认；将 weekly analytics 放 Later | 端到端 daily outcome 完整 |
| `SMS-P2` | personalized plan 依赖 diagnostic，但用户想删除 diagnostic | 阻断直接 cut；提出 lightweight diagnostic、manual setup 或删除 personalization 三个 trade-off | 依赖闭合优先于“少一个功能” |
| `SMS-P3` | 外部 calendar API 不稳定且不是 core | 标 `rabbit_hole/test_first`，MVP 改为 manual time slot | patch/cut 保留核心结果并降低风险 |

## Negative Evaluation Cases / Failure Modes（synthetic）

| ID | 输入/错误输出 | 失败原因 | 正确修复 |
|---|---|---|---|
| `SMS-N1` | 没有 appetite，David 自动设为 6 周 | 把 Basecamp practice 当普适事实 | 询问/读取约束，或输出 unbounded candidate |
| `SMS-N2` | 只保留登录、dashboard、settings 三页 | 页面少但无用户 outcome | 按 story-map backbone 重做 slice |
| `SMS-N3` | payment 在 MVP，payment provider 标 Later | hidden dependency 使 scope 不可交付 | 纳入 provider、替代 payment 或移除付费 flow |

## Sources

| Source title | Source type | URL | Date | Exact supported point | Limitation | David implication | Confidence |
|---|---|---|---|---|---|---|---|
| Shape Up — Set Boundaries | Primary method book | https://basecamp.com/shapeup/1.2-chapter-03 | 2019 online book；访问 2026-07-10 | appetite 是 time budget/creative constraint；fixed time, variable scope；appetite 不等于 estimate | 1–2/6-week cadence 是 Basecamp 特定实践 | 分离 appetite/estimate，不默认 6 周 | High |
| Shape Up — Risks and Rabbit Holes / Write the Pitch | Primary method book | https://basecamp.com/shapeup/1.4-chapter-05 | 2019 online book；访问 2026-07-10 | 识别 technical/design/dependency holes，明确 out-of-bounds、patch 和 no-go | 风险描述未给普适量化阈值 | rabbit hole 必须有 response；no-go 结构化 | High |
| Mapping User Stories in Agile | NN/g authoritative | https://www.nngroup.com/articles/user-story-mapping/ | 2021-01-24 | activity/step/detail 维持整体 flow 与优先层次，支持迭代产品定义 | expected flow 不是实证用户行为，也不是 IA | cut 后检查完整 backbone | High |
| Know thy customer: agile’s essential guide to user story maps | Atlassian professional official | https://www.atlassian.com/blog/2016/05/guide-to-agile-user-story-maps | 2016-05-23 | backbone 表示用户活动，横向 release slice 显示 minimum viable solution | guest practitioner article，无比较实验 | MVP slice 需跨活动产生结果 | Medium-High |
