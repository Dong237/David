# Skill: `prioritize_features`

> 状态：Research contract；synthetic examples 仅用于评测，不是用户证据。

## Purpose

先判断候选项与当前决策是否适合 RICE、MoSCoW 或无需框架，再产出可复算、带证据和不确定性的排序/分类建议。本 Skill 不替代 core-flow completeness、risk acceptance 或最终 scope approval。

## Trigger

- 多个同粒度 initiative 竞争同一资源和目标；
- fixed-time release 的 requirements 需要 Must/Should/Could/Won't this time commitment；
- 用户要求“功能优先级”，但列表可能混合 feature、dependency、bug、research；
- 新 evidence 改变 reach/impact/effort/confidence；
- scope review 需要解释哪些项提供 contingency。

## Inputs

| 输入 | 必需 | 说明 |
|---|---:|---|
| `decisionType` | 是 | `rank_initiatives` 或 `classify_release_requirements` |
| `objective` | 是 | 所有候选共享的目标 |
| `timeHorizon` | 是 | Reach/commitment 的统一时间窗 |
| `candidates` | 是 | 同粒度 item，引用 canonical IDs |
| `constraints` | 是 | legal/safety/core path/locked/dependencies |
| `evidence` | 否 | metrics、research、engineering estimate |
| `reachImpactEffort` | RICE 必需 | 数值、单位、source、confidence |
| `releaseOutcome` | MoSCoW 必需 | Minimum Usable SubseT 的结果定义 |
| `decisionOwner` | MoSCoW 必需 | 对 commitment 有权限的人 |
| `workarounds` | MoSCoW 可选 | 缺少 requirement 时的替代方式 |

## Method Selection

| 条件 | 方法 |
|---|---|
| 可比 initiative；共同 objective/time horizon/granularity；有可解释 Reach/Impact/Effort | `RICE` |
| fixed release/timebox；需要 requirement commitment；有 viable outcome 和 owner | `MoSCoW` |
| item 是 legal/safety/core-path mandatory dependency | `constraint_gate`，不进入普通相对排名 |
| 列表混合粒度或关键数据缺失 | `not_applicable`，先 normalize/decompose/collect evidence |
| 问题是单个 Bet 在 appetite 内怎么收缩 | 路由 `shape_mvp_scope` |

## Professional Rules

1. 在计算前输出 `eligibility`；失败时禁止产生正式 RICE score/MoSCoW class。
2. RICE 的 Reach 必须有时间窗与单位；Impact 必须指向同一 objective。
3. RICE 的 Confidence 是对各估计证据质量的反映，不是模型主观自信。
4. Effort 包含 product/design/engineering/ops 的总投入；允许区间和敏感性分析。
5. 不把 unknown 填 0，也不生成伪精确小数；缺值则 `insufficient_input`。
6. RICE 结果是相对决策输入，不是 roadmap commitment；dependency/strategy/risk override 必须单独记录。
7. MoSCoW `Must` 必须回答：若本时间窗缺失，是否取消/无法合法、安全、可用地交付？
8. 存在可接受 workaround 时通常不是 Must；Should/Could 的边界需在项目开始前约定。
9. `Won't Have this time` 必须绑定 timeframe，不等于永不做。
10. Must 不能依赖 Should/Could/Won't；所有项都是 Must 时先 decomposition。
11. Agile Business Consortium 的 60%/20% 是 typical-project guideline，只能作为 warning heuristic，不能做 David hard rule。

## Anti-patterns

- 把 initiative、单个 button、security patch、research spike 放在同一 RICE 表；
- AI 猜 Reach=10,000、Impact=2 然后给 73.6 分；
- 将 high RICE 自动标为 Must；
- 把安全/法律 requirement 因低 reach 降级；
- 所有 stakeholder request 都是 Must；
- `Won't` 没有 this-timeframe，导致被理解为永久拒绝；
- 只展示 score，不展示原始输入、单位和证据。

## Do Not Use When

- 只有一个 candidate，没有 trade-off；
- core outcome/strategy objective 未定义；
- 需要判断真实用户价值但没有 evidence；先做 assumption test；
- 需要切一个 coherent MVP；使用 Scope skill；
- item 是已锁定 legal/security/privacy commitment；直接 constraint gate；
- 候选不在同一时间窗/粒度且无法 normalize。

## Structured Output

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://david.local/schemas/skills/prioritize_features.output.json",
  "type": "object",
  "required": ["skillId", "decisionType", "objective", "timeHorizon", "method", "eligibility", "items", "overrides", "recommendation"],
  "properties": {
    "skillId": { "const": "prioritize_features" },
    "decisionType": { "enum": ["rank_initiatives", "classify_release_requirements"] },
    "objective": { "type": "string" },
    "timeHorizon": { "type": "string" },
    "method": { "enum": ["RICE", "MoSCoW", "constraint_gate", "not_applicable"] },
    "eligibility": {
      "type": "object",
      "required": ["eligible", "failedPreconditions"],
      "properties": {
        "eligible": { "type": "boolean" },
        "failedPreconditions": { "type": "array", "items": { "type": "string" } }
      },
      "additionalProperties": false
    },
    "items": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["itemId", "granularity", "constraintStatus", "evidenceIds", "rationale"],
        "properties": {
          "itemId": { "type": "string" },
          "granularity": { "type": "string" },
          "constraintStatus": { "enum": ["none", "mandatory", "blocked", "locked"] },
          "rice": {
            "type": ["object", "null"],
            "required": ["reach", "reachUnit", "impact", "confidence", "effort", "effortUnit", "score"],
            "properties": {
              "reach": { "type": "number", "minimum": 0 },
              "reachUnit": { "type": "string" },
              "impact": { "type": "number", "minimum": 0 },
              "confidence": { "type": "number", "minimum": 0, "maximum": 1 },
              "effort": { "type": "number", "exclusiveMinimum": 0 },
              "effortUnit": { "type": "string" },
              "score": { "type": "number" }
            }
          },
          "moscow": {
            "type": ["object", "null"],
            "required": ["class", "failureIfAbsent", "workaround", "decisionOwner"],
            "properties": {
              "class": { "enum": ["must", "should", "could", "wont_this_time"] },
              "failureIfAbsent": { "type": "string" },
              "workaround": { "type": ["string", "null"] },
              "decisionOwner": { "type": "string" }
            }
          },
          "evidenceIds": { "type": "array", "items": { "type": "string" } },
          "rationale": { "type": "string" }
        },
        "additionalProperties": false
      }
    },
    "overrides": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["itemId", "kind", "reason"],
        "properties": {
          "itemId": { "type": "string" },
          "kind": { "enum": ["dependency", "legal", "security", "strategy", "core_path", "evidence_gap"] },
          "reason": { "type": "string" }
        }
      }
    },
    "sensitivity": { "type": "array", "items": { "type": "string" } },
    "recommendation": { "type": "string" },
    "approvalRequired": { "type": "boolean" }
  },
  "allOf": [
    {
      "if": { "properties": { "method": { "enum": ["RICE", "MoSCoW"] } } },
      "then": { "properties": { "eligibility": { "properties": { "eligible": { "const": true } } } } }
    }
  ],
  "additionalProperties": false
}
```

## Default Autonomy

- eligibility check、data normalization、score recomputation：`AUTO_APPLY`。
- 生成 ranking/classification recommendation：`APPLY_WITH_UNDO`（L1）。
- 最终 release commitment、Won't this time 或 strategy override：`PROPOSE_FOR_APPROVAL`（L2）。
- 缺 user-owned objective/timeframe/decision owner：`ASK_USER`。

## Must Ask When

- objective、time horizon 或 release outcome 缺失且无法安全推断；
- user/customer count、business impact threshold 或 Must owner 只有用户能提供；
- 需要决定两个互斥 strategy bets 而 current strategy 未确认；
- legal/safety item 是否确为 mandatory 需要权威业务判断。

## Approval Required When

- 将 item 设为 `wont_this_time`；
- 形成最终 release Must commitment；
- override RICE ranking；
- 降级 legal/security/privacy/core-path item；
- ranking 导致已批准 scope 或 external commitment 改变。

## Validation

### Deterministic

- RICE items 的 objective/time horizon/granularity 一致；
- `score = reach * impact * confidence / effort` 可在容差内复算；
- reach/effort units 非空，effort > 0，confidence ∈ [0,1]；
- method in `RICE|MoSCoW` 时 eligibility 必须 true；
- Must 不能依赖非 Must；
- `wont_this_time` 必须有 time horizon；
- mandatory/locked item 的 override 不能静默排序掉。

### Expert / LLM Critic Candidate

- Impact 是否真正关联 objective；
- candidate granularity 是否可比；
- RICE 输入是否有足够证据而非伪数字；
- failure-if-absent 是否真达到 Must；
- sensitivity 是否揭示 ranking 对 uncertain estimate 的依赖。

### Needs Real Research

- builder 是否理解 range/sensitivity 比单分更诚实；
- RICE 建议与实际 outcome 的回顾；
- MoSCoW failure-test 是否减少 everything-is-Must；
- 不同 autonomy mode 下用户希望何时批准 ranking/commitment。

## Positive Evaluation Cases（synthetic）

| ID | 输入 | 期望行为 | 原因 |
|---|---|---|---|
| `PF-P1` | 同一季度、同一 activation goal 的 3 个 onboarding initiative，有 metrics 和 team estimates | 使用 RICE，保留单位/来源，给 sensitivity | 候选同粒度且可比 |
| `PF-P2` | 两周 release，核心 outcome 为提交报销；要求分 Must/Should/Could | 使用 MoSCoW；提交、验证、结果确认是 Must；导出 CSV 有 workaround 可为 Should/Could | fixed-time requirement commitment |
| `PF-P3` | 安全 patch Reach 很低但为合规要求 | 进入 mandatory constraint gate，不因 RICE 低分延后 | 法律/安全先于相对排序 |

## Negative Evaluation Cases / Failure Modes（synthetic）

| ID | 输入/错误输出 | 失败原因 | 正确修复 |
|---|---|---|---|
| `PF-N1` | 混合“重做产品”“改按钮”“修 P0 bug”后算 RICE | 粒度不可比 | normalize/decompose 或选择其他 decision |
| `PF-N2` | 没有数据，David 填 Reach=1000/Impact=2 | 伪精确与 evidence laundering | 标 insufficient input，定性排序或测试 |
| `PF-N3` | 将所有 stakeholder request 标 Must | MoSCoW 失去 contingency | 逐项做 failure/workaround test 并 decomposition |

## Sources

| Source title | Source type | URL | Date | Exact supported point | Limitation | David implication | Confidence |
|---|---|---|---|---|---|---|---|
| RICE: Simple prioritization for product managers | Primary method-origin | https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/ | 2018-01-05 | RICE = Reach × Impact × Confidence / Effort；Reach 有时间窗，尽量用 metrics；Confidence 抑制弱证据估计 | Impact/Confidence scale 是 Intercom 经验，未证明跨公司可比 | 先 eligibility，保存 unit/source/sensitivity，不伪造数值 | High |
| What is MoSCoW Prioritization? | Agile Business Consortium authoritative | https://www.agilebusiness.org/resource/what-is-moscow-prioritization/ | 2026-05-28 | Must 构成 Minimum Usable SubseT；缺失则交付无意义/不合法/不安全；有 workaround 通常不是 Must；Won't 是本次不做 | 60/20 比例为 DSDM typical guideline，不是普适定律 | Must failure/dependency validator；百分比仅 warning | High |
| Mapping User Stories in Agile | NN/g authoritative | https://www.nngroup.com/articles/user-story-mapping/ | 2021-01-24 | Story map 保留整体 flow 和优先层次 | 不是相对 project scoring 方法 | core-flow gate 在 RICE/MoSCoW 之前 | High |
