# Skill: `map_opportunities`

> 状态：Research contract；没有真实 discovery evidence 时，只能输出 `opportunity_hypothesis`。synthetic examples 不是用户证据。

## Purpose

在一个已框定的 desired outcome 下，组织 customer needs、pain points 与 desires，形成可追溯的 opportunity space，并选择值得继续探索的 target opportunity。该 Skill 防止 solution jumping，但不会把 AI 推断或 founder preference 伪装成 customer opportunity。

## Trigger

- `frame_outcome` 已有 primary outcome；
- 用户/研究提供多个 needs、pain points、desires；
- 当前讨论从一个 solution request 跳到另一个，缺少 problem-space structure；
- 需要比较 target opportunity，而不是直接比较 feature；
- 新 interview/analytics/support evidence 改变 opportunity space；
- solution/assumption 与其声称解决的 opportunity 失去连接。

## Inputs

| 输入 | 必需 | 说明 |
|---|---:|---|
| `outcomeRef` | 是 | 已 framed desired/product outcome |
| `targetUserOrSegment` | 是 | 与 outcome 一致的 segment |
| `jobOrNeedContext` | 是 | circumstance/progress hypothesis |
| `sourceMaterial` | 是 | interview snippets、user statements、analytics/support 或 founder input |
| `sourceTypes` | 是 | 明确 `user_research|behavioral_data|support|user_input|founder_input|ai_inference|synthetic` |
| `existingOpportunities` | 否 | 当前 map 与 provenance |
| `solutionRequests` | 否 | 要从 opportunity 分离的 feature/solution |
| `constraints` | 否 | 法规/平台/策略；不是 customer opportunity |

## Method

1. **Eligibility Gate**：存在清晰 outcome；要输出 evidence-backed opportunity space 必须有相关真实 user/discovery evidence。
2. **Opportunity extraction**：从 source 中提取 customer needs、pain points、desires，保留接近用户的语言和 source span。
3. **Opportunity-space structure**：按同一 outcome 下的 parent/child relationship 组织；避免把 segment、solution、metric、task step 混入同层。
4. **Target opportunity selection**：评估与 outcome 的关联、evidence coverage、frequency/severity（若有 evidence）、可行动性与战略约束；没有证据不生成伪 ranking。
5. **Solution/assumption handoff**：solution 必须连接 target opportunity；其 underlying beliefs 路由 `map_assumptions_and_tests`。

## Boundary With Adjacent Skills

| Skill | 负责 | 不负责 |
|---|---|---|
| `orient_product_situation` | 当前情境、decision、known/unknown/constraints | 不构造完整 opportunity space |
| JTBD / `frame_jtbd_and_user_intent` | circumstance 中的 progress 与信息/行动需要 | 不把每条 job statement 展开成机会树 |
| `frame_outcome` | 树顶 desired/product outcome 与 success direction | 不发现 customer needs |
| `map_opportunities` | outcome 下有来源的 needs/pains/desires 与 target opportunity | 不证明 solution 有效 |
| `map_assumptions_and_tests` | solution/decision 赖以成立的 belief 与 test | 不把 assumption 当 customer opportunity |

## Professional Rules

1. Opportunity 是 customer need/pain/desire，不是 feature、UI、technology、segment、metric 或 business constraint。
2. 每个 opportunity node 必须有 `sourceRefs` 与 provenance；AI inference 只能标 `hypothesis`。
3. Founder statement 是有效输入/约束，但不是 user evidence；不得自动升级为 evidence-backed opportunity。
4. 没有真实 discovery evidence 时，Skill 可返回 `hypothesis_only`，但不得输出 `validated_map` 或声称“用户普遍需要”。
5. Product Talk 建议先有 3–4 次 story-based interviews；该数量是方法建议而非 David hard threshold。David 的硬规则是 evidence honesty 与 source relevance。
6. opportunity space 与一个 outcome/segment 绑定；不同 outcome 或显著不同 segment 应分 map。
7. Parent opportunity 必须概括 children 的 customer problem space，不使用抽象 solution category。
8. frequency/severity/impact 只能在 source 支持时填写；unknown 不得由模型补数。
9. Target opportunity selection 与 solution selection 分开；先选择 problem space，再探索多个 solutions。
10. 不需要解决所有 opportunities；只选择可能驱动 current outcome 的部分。
11. 新 evidence 可使 map 扩张、收缩、重组；保留 superseded/rejected history。
12. Opportunity map 是 discovery artifact，不是用户心智模型、IA tree 或 roadmap。

## Anti-patterns

- outcome 下直接列“AI chat、dashboard、export”；
- 用 3 个 LLM personas 生成 needs 后标 evidence-backed；
- 把“freelancer”作为 opportunity node；
- 没有 source 也填写“80% 用户高频痛点”；
- 先选 solution，再反向写 opportunity 为它辩护；
- 将 opportunity tree 直接变成 navigation；
- 一个 company-wide 巨树包含所有团队/outcomes/segments。

## Do Not Use When

- desired outcome 未定义；先 `frame_outcome`；
- 没有任何 source material，且用户没有要求显式 hypothesis generation；应先 Research/Ask，而非生成空想 map；
- 当前只需对一个 solution 做 risk/test；使用 Assumption/Four Risks；
- 任务是组织产品对象/内容；使用 IA inventory/grouping，不用 opportunity map；
- 用户要求把真实市场需求“验证完毕”；Mode B 本轮不能替代用户研究。

## Structured Output

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://david.local/schemas/skills/map_opportunities.output.json",
  "type": "object",
  "required": ["skillId", "outcomeRef", "targetSegment", "eligibility", "mapStatus", "opportunities", "solutionLinks", "gaps", "nextAction"],
  "properties": {
    "skillId": { "const": "map_opportunities" },
    "outcomeRef": { "type": "string" },
    "targetSegment": { "type": "string" },
    "eligibility": {
      "type": "object",
      "required": ["hasOutcome", "hasRelevantDiscoveryEvidence", "failedPreconditions"],
      "properties": {
        "hasOutcome": { "type": "boolean" },
        "hasRelevantDiscoveryEvidence": { "type": "boolean" },
        "failedPreconditions": { "type": "array", "items": { "type": "string" } }
      },
      "additionalProperties": false
    },
    "mapStatus": { "enum": ["hypothesis_only", "evidence_informed", "conflicting", "insufficient_input"] },
    "opportunities": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["opportunityId", "statement", "kind", "parentId", "sourceRefs", "provenance", "confidence", "targetStatus"],
        "properties": {
          "opportunityId": { "type": "string" },
          "statement": { "type": "string" },
          "kind": { "enum": ["need", "pain_point", "desire"] },
          "parentId": { "type": ["string", "null"] },
          "sourceRefs": {
            "type": "array",
            "items": {
              "type": "object",
              "required": ["sourceId", "sourceType", "sourceSpan"],
              "properties": {
                "sourceId": { "type": "string" },
                "sourceType": { "enum": ["user_research", "behavioral_data", "support", "user_input", "founder_input", "ai_inference", "synthetic"] },
                "sourceSpan": { "type": "string" }
              },
              "additionalProperties": false
            }
          },
          "provenance": {
            "$ref": "https://david.local/schemas/v1/shared_contract_vocabulary.schema.json#/$defs/ProvenanceCore"
          },
          "confidence": {
            "$ref": "https://david.local/schemas/v1/shared_contract_vocabulary.schema.json#/$defs/Confidence"
          },
          "frequency": { "type": ["number", "string", "null"] },
          "opportunitySeverity": { "type": ["number", "string", "null"] },
          "targetStatus": { "enum": ["unselected", "candidate", "selected", "rejected", "needs_research"] }
        },
        "additionalProperties": false
      }
    },
    "solutionLinks": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["solutionId", "opportunityId", "status", "assumptionIds"],
        "properties": {
          "solutionId": { "type": "string" },
          "opportunityId": { "type": "string" },
          "status": { "enum": ["requested", "candidate", "testing", "selected", "rejected"] },
          "assumptionIds": { "type": "array", "items": { "type": "string" } }
        },
        "additionalProperties": false
      }
    },
    "selectionRationale": { "type": ["string", "null"] },
    "gaps": { "type": "array", "items": { "type": "string" } },
    "nextAction": { "enum": ["RESEARCH_OR_TEST", "PROPOSE_FOR_APPROVAL", "DEFER_AS_ASSUMPTION", "EXPLORE_SOLUTIONS"] }
  },
  "additionalProperties": false
}
```

## Default Autonomy

- 从现有 source material 抽取/聚类并保持 provenance：`APPLY_WITH_UNDO`（L1）。
- 无真实 evidence 的 hypothesis generation：`DEFER_AS_ASSUMPTION`，不得自动升级 map status。
- 选择 target opportunity 或改变 core Bet：`PROPOSE_FOR_APPROVAL`（L2）。
- 需要验证真实 need/frequency/severity：`RESEARCH_OR_TEST`。

## Must Ask When

- outcome/segment/source context 冲突，无法判断哪些 evidence 相关；
- target opportunity 的选择依赖 user-owned strategy/business constraint；
- 研究 source 的真实性、样本或时间范围只有用户知道；
- 用户希望将 founder constraint 当 customer need，需要澄清类别而非迎合。

## Approval Required When

- 选定/更换 target opportunity；
- 删除有强 evidence 的 opportunity；
- 合并不同 segment/outcome 的 map；
- 将 solution request 移出 current Bet；
- 机会选择改变 target user、core outcome、IA 或 MVP scope。

## Validation

### Deterministic

- `outcomeRef` 可解析且 map 中所有 node 属于同一 outcome/segment；
- evidence-backed opportunity 至少有一个 `user_research|behavioral_data|support` source；
- 仅 `ai_inference|synthetic|founder_input` 时 mapStatus 不能是 `evidence_informed`；
- parentId 存在且无 cycle；
- opportunity statement 不含 solution/technology pattern 的 lint warning；
- selected target 至多一个，除非 explicit multi-target approval；
- solution link 指向存在的 opportunity，assumption IDs 可解析。

### Expert / LLM Critic Candidate

- node 是否真是 need/pain/desire，而非 solution/segment/metric；
- hierarchy 是否表达 problem-space relationship；
- source span 是否足以支持 statement，是否过度泛化；
- target selection 是否与 outcome/evidence/strategy一致；
- 是否把单条 user statement 外推成普遍规律。

### Needs Real Research

- opportunity 是否存在、频率、严重度与用户语言；
- target opportunity 是否真能驱动 desired outcome；
- 不同 segment 是否共享同一 opportunity space；
- solution 是否有效解决 opportunity。

## Positive Evaluation Cases（synthetic）

| ID | 输入 | 期望行为 | 原因 |
|---|---|---|---|
| `MO-P1` | 3 条访谈都描述“开始学习前不知道先练什么” | 提取 need/pain，保留每条 source span；连接“今日练习建议”solution candidate | evidence-informed 且 solution 与 opportunity 分离 |
| `MO-P2` | Founder 说“大家需要排行榜”，无用户证据 | 保留排行榜为 requested solution；产生低置信 opportunity hypothesis 或请求 research，不标用户需要 | 防止 founder preference 变用户证据 |
| `MO-P3` | analytics 显示流失发生在 import，support 记录格式不兼容 | 生成 evidence-informed pain opportunity，标 frequency/source；选择 target 仍需 approval | 多源 evidence 支持 problem space |

## Negative Evaluation Cases / Failure Modes（synthetic）

| ID | 输入/错误输出 | 失败原因 | 正确修复 |
|---|---|---|---|
| `MO-N1` | opportunity nodes 是 AI Chat、Dashboard、Export | solution 伪装 opportunity | 重写为 need/pain/desire，solution 单独链接 |
| `MO-N2` | 仅 LLM personas，mapStatus=`evidence_informed` | synthetic evidence laundering | `hypothesis_only` + research action |
| `MO-N3` | 将 opportunity tree 直接复制成 sidebar | discovery structure 与 IA 混淆 | 由 IA skill 基于 inventory/mental-model hypotheses 另行组织 |

## Sources

| Source title | Source type | URL | Date | Exact supported point | Limitation | David implication | Confidence |
|---|---|---|---|---|---|---|---|
| Opportunity Solution Trees | Product Talk primary method-author | https://www.producttalk.org/opportunity-solution-trees/ | 2023-12-06 | 树为 outcome → customer opportunities → solutions → assumption tests；要求 outcome/target theory/真实 interviews，并明确不要编造 opportunities | 3–4 interviews 是作者建议，不是所有情境的统计阈值 | eligibility + provenance gate；无研究只输出 hypothesis | High |
| Opportunity Space | Product Talk primary method-author glossary | https://www.producttalk.org/glossary-discovery-opportunity-space/ | 更新 2025-10-25 | opportunity space 是能驱动 outcome 的 customer needs/pains/desires；随持续访谈演化；无需解决所有机会 | 同一方法体系来源，不构成独立效果验证 | schema 限定 node kind/source；map 是 living discovery artifact | High |
| Learning about users and their needs | GOV.UK authoritative manual | https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs | 2016-04-04；更新 2017-03-23 | user needs 应基于 research、聚焦 problem 而非 solution；非用户意见/建议应视为待研究 assumptions | 政府服务语境，不定义 OST hierarchy | Founder/AI input 不升级为 user evidence | High |
| Jobs to Be Done Theory | Christensen Institute primary method institute | https://www.christenseninstitute.org/theory/jobs-to-be-done/ | 无明确日期；访问 2026-07-10 | 通过故事与 circumstance 理解人们寻求的 progress | 不直接定义 opportunity map | JTBD 提供情境/进展上下文，但不自动生成 evidence-backed opportunity | High |
