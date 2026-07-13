# Skill: `frame_outcome`

> 状态：Research contract；synthetic examples 仅用于评测，不是 outcome 已实现的证据。

## Purpose

把已定位的 product situation 与 job/user-need hypothesis 转成一个明确的 outcome contract：David 要影响谁在何种情境下的什么行为/结果，如何判断方向正确，以及它如何连接 business outcome。该 Skill 防止团队把 shipping output、单个 feature adoption 或模糊愿景误写成 outcome。

## Trigger

- `orient_product_situation` 已产生足够的 user/context/problem hypothesis；
- 用户输入只有 output（“上线 dashboard”“增加 AI chat”）；
- 一个 Bet 同时承诺多个相互竞争的结果；
- Opportunity Mapping、RICE、Scope 或 Assumption Testing 缺少共同 outcome；
- 新 evidence 显示当前 metric 与真实 user success 脱节；
- target user/core job 变化导致 outcome stale。

## Inputs

| 输入 | 必需 | 说明 |
|---|---:|---|
| `betId` | 是 | 当前 Bet canonical ID |
| `productSituationRef` | 是 | Orient 输出 |
| `targetUserHypothesis` | 是 | actor/segment，带 provenance |
| `jobOrNeedHypothesis` | 是 | circumstance + desired progress |
| `requestedOutputs` | 是 | 用户要求的 feature/artifact，允许空数组 |
| `baseline` | 是 | 当前行为/替代方案/已有 metric；可为 unknown |
| `businessContext` | 是 | revenue/cost/mission/strategy constraints，可为 provisional |
| `timeHorizon` | 否 | 若有 commitment 必须带 source；不得由 David 发明 |
| `measurementCapabilities` | 否 | 可访问数据、instrumentation、research method |
| `existingOutcomes` | 否 | 当前 outcome、metric、guardrail、decision history |

## Method

1. **Output–Outcome separation**：output 是 build/produce 的东西；outcome 是它对 customer 或 business 的预期影响。
2. **Outcome ladder**：`user/job progress → product outcome → business outcome`，只记录有逻辑关系的连接，不声称未验证因果。
3. **Product Talk outcome framing**：product outcome 优先表达 customer behavior 或 sentiment，并作为 business outcome 的 plausible leading indicator；避免把单一 feature traction 当 discovery outcome。
4. **GOV.UK measurement framing**：从项目早期定义 success 与所需数据；performance metrics 与 user research 组合使用，不能只看 analytics。
5. **Learning vs performance**：证据/measurement capability 不足时可先定义 directional 或 learning outcome，明确何时升级。

## Professional Rules

1. 明确分开 `userOutcome`、`productOutcome`、`businessOutcome`、`requestedOutputs`。
2. Product outcome 必须描述 customer behavior/sentiment/完成结果，不是“发布 X”或“使用 X 次数”本身。
3. 每个 Bet 默认一个 primary product outcome；secondary outcomes 只能是 guardrail 或明确 lower priority。此为 focus heuristic，不是科学阈值。
4. Outcome 至少包含 actor/segment、context、directional change 和 baseline state；metric/target 可暂缺但必须记录 measurement gap。
5. 无可靠 baseline/measurement 时，允许 directional outcome，不发明百分比、日期或 target。
6. Feature traction 只有在能合理连接 user success 时才可作为 supporting metric，不能默认成为 primary outcome。
7. Business outcome 与 product outcome 之间记录 `linkHypothesis` 和 evidence；不把 correlation 写成 causation。
8. 同时保留 countermetric/guardrail，防止通过伤害质量、信任或其他 segment 来“改善”主 metric。
9. Outcome 必须能限制后续 opportunity/solution space；过宽愿景或过窄 feature metric都应重写。
10. Outcome 改变是高影响决定，必须触发 Opportunity、IA、Scope、Assumption 的 cascade review。

## Anti-patterns

- “上线 AI assistant”作为 outcome；
- “增加搜索次数”作为 success，而不判断用户是否只是更难找到内容；
- 没有数据时自动写“提升留存 20%”；
- 把公司营收目标直接下发为唯一用户 outcome；
- 同一 Bet 同时“提升获客、激活、留存、收入、满意度”；
- 看到 metric 上升就声称 solution 造成该变化；
- 只看 completion rate，不结合 user research 判断误完成/质量。

## Do Not Use When

- Product Situation/target user/core job 仍完全未知；先 Orient/JTBD framing；
- 当前只需为已确认 outcome 定义 feature scope；使用 Scope；
- 需要发现真实 customer needs；使用 research/Opportunity Mapping，Outcome framing 不能替代研究；
- 当前是单一 technical/operational quality目标且不改变 product outcome；路由 risk/AC；
- 用户要求企业级 KPI/OKR 体系；超出 Mode B 当前边界。

## Structured Output

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://david.local/schemas/skills/frame_outcome.output.json",
  "type": "object",
  "required": ["skillId", "betId", "primaryOutcome", "requestedOutputs", "outcomeLinks", "guardrails", "measurementReadiness", "approvalRequired"],
  "properties": {
    "skillId": { "const": "frame_outcome" },
    "betId": { "type": "string" },
    "primaryOutcome": {
      "type": "object",
      "required": ["outcomeId", "type", "actorOrSegment", "context", "statement", "direction", "baseline", "provenance", "confidence", "sourceIds", "approvalStatus"],
      "properties": {
        "outcomeId": { "type": "string" },
        "type": { "enum": ["product_performance", "product_learning", "directional"] },
        "actorOrSegment": { "type": "string" },
        "context": { "type": "string" },
        "statement": { "type": "string" },
        "direction": { "enum": ["increase", "decrease", "maintain", "discover"] },
        "metric": { "type": ["string", "null"] },
        "target": { "type": ["number", "string", "null"] },
        "timeHorizon": { "type": ["string", "null"] },
        "baseline": { "type": ["number", "string", "null"] },
        "provenance": {
          "$ref": "https://david.local/schemas/v1/shared_contract_vocabulary.schema.json#/$defs/ProvenanceCore"
        },
        "confidence": {
          "$ref": "https://david.local/schemas/v1/shared_contract_vocabulary.schema.json#/$defs/Confidence"
        },
        "sourceIds": { "type": "array", "items": { "type": "string" } },
        "approvalStatus": { "enum": ["not_required", "pending", "approved", "rejected"] }
      },
      "additionalProperties": false
    },
    "secondaryOutcomes": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["outcomeId", "statement", "role"],
        "properties": {
          "outcomeId": { "type": "string" },
          "statement": { "type": "string" },
          "role": { "enum": ["guardrail", "lower_priority", "business_context"] }
        },
        "additionalProperties": false
      }
    },
    "requestedOutputs": { "type": "array", "items": { "type": "string" } },
    "outcomeLinks": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["fromId", "toId", "relationship", "provenance", "evidenceIds"],
        "properties": {
          "fromId": { "type": "string" },
          "toId": { "type": "string" },
          "relationship": { "enum": ["hypothesized_leading_indicator", "contributes_to", "constrains"] },
          "provenance": {
            "$ref": "https://david.local/schemas/v1/shared_contract_vocabulary.schema.json#/$defs/ProvenanceCore"
          },
          "evidenceIds": { "type": "array", "items": { "type": "string" } }
        },
        "additionalProperties": false
      }
    },
    "guardrails": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["guardrailId", "statement", "verification"],
        "properties": {
          "guardrailId": { "type": "string" },
          "statement": { "type": "string" },
          "verification": { "type": "string" }
        },
        "additionalProperties": false
      }
    },
    "measurementReadiness": {
      "type": "object",
      "required": ["status", "gaps", "nextEvidenceActions"],
      "properties": {
        "status": { "enum": ["unmeasurable_yet", "directional_only", "instrumentation_needed", "measurable"] },
        "gaps": { "type": "array", "items": { "type": "string" } },
        "nextEvidenceActions": { "type": "array", "items": { "type": "string" } }
      },
      "additionalProperties": false
    },
    "approvalRequired": { "type": "boolean" }
  },
  "additionalProperties": false
}
```

## Default Autonomy

- 从已确认 context 生成 outcome draft：`APPLY_WITH_UNDO`（L1）。
- 分离 output/outcome、标记 measurement gap：`AUTO_APPLY` 或 L1。
- 改变已确认 primary outcome、target、time horizon：`PROPOSE_FOR_APPROVAL`（L2）。
- 真实 metric effectiveness：`RESEARCH_OR_TEST`。

## Must Ask When

- primary business commitment、target value、time horizon 或不能牺牲的 guardrail 只有用户知道；
- 多个 outcome 互斥且没有 strategy precedence；
- user 与 buyer 的 success 冲突；
- metric 定义需要业务语义，repo/docs 无法确定。

## Approval Required When

- 新建或替换 primary outcome；
- 将 directional/learning outcome 升为 performance commitment；
- 新增数值 target/deadline；
- 接受可能伤害 guardrail 的 trade-off；
- outcome change 会使 opportunity map、IA、scope 或 handoff 大范围失效。

## Validation

### Deterministic

- primary outcome 不是 requested output 的同义复述；
- `product_performance` 有 metric，`product_learning` 的 direction 为 `discover`；
- target/time horizon 非空时必须有 confirmed source/approval record；
- link 的 `provenance.basisType=source_evidence` 必须有 evidence IDs；
- outcome statement 包含 actor/segment 和 directional change；
- measurement status 非 measurable 时不得生成 achieved/not-achieved result。

### Expert / LLM Critic Candidate

- outcome 是否表达 customer impact 而非 feature traction；
- product outcome 是否与 job progress 合理关联；
- 与 business outcome 的连接是否只是 hypothesis；
- scope 是否足够具体可指导 discovery，又不锁死 solution；
- guardrail 是否覆盖明显的信任/质量/公平性副作用。

### Needs Real Research

- metric 是否真是 user success/business result 的 leading indicator；
- baseline/target/time horizon；
- outcome wording 是否帮助独立开发者做 scope 选择；
- solution 对 outcome 的真实因果影响。

## Positive Evaluation Cases（synthetic）

| ID | 输入 | 期望行为 | 原因 |
|---|---|---|---|
| `FO-P1` | output：“上线每日 AI 学习计划” | product outcome：“考证者在每日开始学习时，更高比例完成一组与薄弱点相关的练习”；metric 尚缺则 directional | 从 output 转为 behavior/result，不发明 target |
| `FO-P2` | 新产品无 baseline | 定义 `product_learning`：发现哪类首日行为能预测用户完成首次 blueprint；列 instrumentation/research gaps | 证据不足时不假装 performance commitment |
| `FO-P3` | 搜索次数上升被当 success | 将 primary outcome 重写为“用户在目标时间内找到正确项目”，搜索次数仅 supporting diagnostic，增加误完成 guardrail | feature activity 不等于 user success |

## Negative Evaluation Cases / Failure Modes（synthetic）

| ID | 输入/错误输出 | 失败原因 | 正确修复 |
|---|---|---|---|
| `FO-N1` | outcome：“发布 dashboard v1” | output 伪装 outcome | 写用户/业务影响，保留 dashboard 为 requested output |
| `FO-N2` | 无数据自动写“30 天留存提升 20%” | 发明 baseline/target | directional/learning outcome + measurement gap |
| `FO-N3` | 一个 Bet 同时承诺获客、激活、留存、收入 | 失去 focus，无法限定 opportunity space | 选 primary outcome，其余作 guardrail/context 或拆 Bet |

## Sources

| Source title | Source type | URL | Date | Exact supported point | Limitation | David implication | Confidence |
|---|---|---|---|---|---|---|---|
| Shifting from Outputs to Outcomes | Product Talk primary method-author | https://www.producttalk.org/shifting-from-outputs-to-outcomes/ | 2024-07-17 | output 是 build/produce；outcome 是对 customer/business 的 impact；clear outcome 设 discovery scope/measure；product outcome 通常是 customer behavior/sentiment；traction metric 可能诱导错误行为 | “一团队一 outcome”“2–3 quarters”是作者实践建议，不是 David 固定阈值 | 区分 output/product/business outcome；一个 primary outcome 仅作 focus heuristic | High |
| Using performance data to improve your service | GOV.UK authoritative manual | https://www.gov.uk/service-manual/measuring-success/using-data-to-improve-your-service-an-introduction | 2016-03-23；更新 2022-04-06 | 从 discovery/alpha 开始定义 objectives、metrics、data；performance data 检查是否满足 user needs/task completion/adoption，并结合 research 解释问题 | 4 个 mandatory KPI 是政府服务特定，不可照搬所有产品 | outcome 记录 measurement readiness，不默认统一 KPI | High |
| Opportunity Solution Trees | Product Talk primary method-author | https://www.producttalk.org/opportunity-solution-trees/ | 2023-12-06 | outcome 位于树顶并限定 discovery；product outcome 通常是合适粒度 | 依赖真实 discovery inputs；不证明 metric 因果性 | frame outcome 先于 opportunity mapping，并保留 link hypothesis | High |
