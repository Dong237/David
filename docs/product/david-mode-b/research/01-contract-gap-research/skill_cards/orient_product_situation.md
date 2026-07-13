# Skill: `orient_product_situation`

> 状态：Research contract；synthetic examples 仅用于评测，不是用户证据。

## Purpose

把模糊 idea、feature request、现有 PRD/repo/prototype 定位为当前的产品情境与待决策问题，形成足以开始结构推理、但不会伪装成研究结论的 `ProductSituation`。

本 Skill 不负责完成市场验证、完整 JTBD 研究、Opportunity Solution Tree 或最终 scope commitment。

## Trigger

- 新建 Bet 或会话第一次收到产品 idea；
- 用户引入现有产品、PRD、repo、prototype 或竞品参照；
- target user、core desired progress、platform、appetite 或 no-go 发生变化；
- 后续 IA/Flow/Scope 产生冲突，需要回退重定位；
- 用户请求一个 solution（例如“做 analytics dashboard”），但 underlying problem 未显式。

## Inputs

| 输入 | 必需 | 说明 |
|---|---:|---|
| `rawInput` | 是 | 用户原文或 artifact 摘要，保留 source ID |
| `sourceRefs` | 是 | user message、file、repo、research 等可追溯引用 |
| `currentBlueprint` | 否 | 已确认 Product Context、locked decisions、assumptions |
| `existingProduct` | 否 | 当前产品/流程/替代方案/已有用户 |
| `targetUser` | 否 | 用户明确输入或带 provenance 的 hypothesis |
| `platform` | 否 | desktop/mobile/web/API/omnichannel |
| `constraints` | 否 | time、team、technical、legal、privacy、budget、no-go |
| `evidence` | 否 | interview、analytics、support、test；synthetic 必须单独标记 |

## Method

1. **GOV.UK discovery framing**：先识别用户在更大情境中试图完成什么、问题、硬/软约束与 success measure。
2. **JTBD hypothesis**：用 `circumstance → desired progress` 重述可能的 job，并记录 functional/social/emotional cues；无研究时状态必须是 `inferred`。
3. **Double Diamond orientation**：判断当前位于问题探索/定义还是 solution development/delivery；只作为回退与发散/收敛提醒，不强制跑完整流程。
4. **Opportunity boundary**：把 requested solution 与 opportunity hypothesis 分开。无真实 discovery input 时不得构造声称来自客户的 OST。

## Professional Rules

1. 明确 `activeDecision`：本轮下一步究竟要决定 IA、Flow、Scope、risk 还是 handoff readiness。
2. 区分：`confirmed facts`、`inferences`、`pattern-based defaults`、`unknowns`、`conflicts`。
3. 用用户原话保存 `requestedSolution`；另给出 `problemHypothesis`，不静默改写用户意图。
4. Job hypothesis 必须至少包含 `actor + circumstance + desired progress`，不能写成产品功能动作。
5. 约束分为 `hard` 与 `soft`；仅用户、政策、技术事实或锁定决策可以确认 hard constraint。
6. unknown 分为 `blocking` 与 `nonblocking`；nonblocking 应附 fallback，进入 assumption ledger。
7. 只问会改变下一结构决定的 user-exclusive fact；其余先显示可撤销结构假设。
8. 新 artifact 与现有 confirmed state 冲突时标记 `conflicting`，不自动选择较新的文档内容覆盖用户确认。
9. Orient 的完成条件是“可产生第一版结构 proposal”，不是“所有问题均已回答”。

## Anti-patterns

- 把“25–35 岁开发者”写成 job；
- 把“需要 dashboard”直接写成 confirmed user need；
- 看到 solution request 就生成完整 feature list；
- 一次询问 target user、商业模式、导航偏好、颜色、技术栈等长表单；
- 将 competitor convention 或 AI synthetic persona 标成 user evidence；
- 未说明来源就把 deadline、team size、payment model 写成 hard constraint。

## Do Not Use When

- 当前只需对一个已确认的低风险 secondary label 做 routine review；
- 已有 Product Situation 且输入不改变 user/outcome/constraints/decision；
- 用户只要求执行已批准的 deterministic validator；
- 问题是单一 technical feasibility spike，应直接路由到 risk/test skill；
- 用户要求完整真实用户研究：应转 Mode A/Research Plan，而非用 Orient 冒充研究。

## Structured Output

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://david.local/schemas/skills/orient_product_situation.output.json",
  "type": "object",
  "required": [
    "skillId",
    "activeDecision",
    "requestedSolution",
    "userHypothesis",
    "situation",
    "desiredProgress",
    "problemHypothesis",
    "constraints",
    "knowns",
    "unknowns",
    "readiness",
    "provenance"
  ],
  "properties": {
    "skillId": { "const": "orient_product_situation" },
    "activeDecision": { "type": "string", "minLength": 1 },
    "requestedSolution": { "type": ["string", "null"] },
    "userHypothesis": { "type": "string", "minLength": 1 },
    "situation": { "type": "string", "minLength": 1 },
    "desiredProgress": { "type": "string", "minLength": 1 },
    "problemHypothesis": { "type": "string", "minLength": 1 },
    "jtbdDimensions": {
      "type": "object",
      "required": ["functional", "social", "emotional"],
      "properties": {
        "functional": { "type": "array", "items": { "type": "string" } },
        "social": { "type": "array", "items": { "type": "string" } },
        "emotional": { "type": "array", "items": { "type": "string" } }
      },
      "additionalProperties": false
    },
    "baselineOrAlternative": { "type": ["string", "null"] },
    "platform": { "type": ["string", "null"] },
    "constraints": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["id", "statement", "strength", "sourceIds"],
        "properties": {
          "id": { "type": "string" },
          "statement": { "type": "string" },
          "strength": { "enum": ["hard", "soft"] },
          "sourceIds": { "type": "array", "items": { "type": "string" } }
        },
        "additionalProperties": false
      }
    },
    "knowns": { "type": "array", "items": { "$ref": "#/$defs/taggedFact" } },
    "unknowns": {
      "type": "array",
      "items": {
        "allOf": [
          { "$ref": "#/$defs/taggedFact" },
          {
            "type": "object",
            "required": ["blocking", "fallback"],
            "properties": {
              "blocking": { "type": "boolean" },
              "fallback": { "type": ["string", "null"] }
            }
          }
        ]
      }
    },
    "conflicts": { "type": "array", "items": { "type": "string" } },
    "readiness": { "enum": ["insufficient", "sufficient_for_first_proposal", "blocked"] },
    "nextSkillCandidates": { "type": "array", "items": { "type": "string" } },
    "recommendedQuestion": { "type": ["string", "null"] },
    "provenance": {
      "$ref": "https://david.local/schemas/v1/shared_contract_vocabulary.schema.json#/$defs/ProvenanceCore"
    }
  },
  "$defs": {
    "taggedFact": {
      "type": "object",
      "required": ["id", "statement", "provenance", "confidence"],
      "properties": {
        "id": { "type": "string" },
        "statement": { "type": "string" },
        "provenance": {
          "$ref": "https://david.local/schemas/v1/shared_contract_vocabulary.schema.json#/$defs/ProvenanceCore"
        },
        "confidence": {
          "$ref": "https://david.local/schemas/v1/shared_contract_vocabulary.schema.json#/$defs/Confidence"
        }
      },
      "additionalProperties": true
    }
  },
  "additionalProperties": false
}
```

## Default Autonomy

- 默认：`APPLY_WITH_UNDO`（L1），写入 provisional Product Context。
- 输入成熟且仅抽取已明确字段：routine extraction 可 `AUTO_APPLY`，但 provenance 仍需保留。
- unknown 非阻断：`DEFER_AS_ASSUMPTION`。
- evidence-dependent user truth：`RESEARCH_OR_TEST`，不问用户偏好替代研究。

## Must Ask When

- target user、hard legal/privacy no-go 或付费/采购主体是 user-exclusive fact，且无安全 fallback 会阻断下一决定；
- 两个 current explicit user statements 直接冲突，无法按 precedence 解决；
- 现有产品与新 Bet 是否同一版本/同一用户段只有用户知道；
- 需要把 soft constraint 升级为 hard commitment。

问题必须说明：为什么重要、改变哪个决定、安全 fallback（若有）。

## Approval Required When

- 改变已确认 target user 或 core desired progress；
- 覆盖 locked/no-go constraint；
- 将已有 Bet 合并、拆分或弃用；
- 把 hypothesis 升为 confirmed without new evidence（应拒绝，不只是请求批准）；
- 该定位变化会使已完成 IA/Flow/Scope 大范围失效。

## Validation

### Deterministic

- required fields 与 source IDs 存在；
- `provenance.knowledgeStatus=confirmed` 或 `provenance.basisType=source_evidence` 时，`provenance.sourceIds` 必须非空；
- `readiness=sufficient_for_first_proposal` 时，user hypothesis、situation、desired progress、active decision 均非空；
- blocking unknown 的 `fallback` 可为空，nonblocking unknown 的 fallback 必须非空；
- hard constraint 不能只引用 `model_inference` source。

### Expert / LLM Critic Candidate

- requested solution 与 problem hypothesis 是否被清晰分开；
- desired progress 是否比 feature wording 更接近用户结果；
- unknowns 是否真正会改变下一结构决定；
- 是否过早将单个 segment/mental model 写成事实。

### Needs Real Research

- target builder 是否能正确理解 hypothesis/provenance 文案；
- first proposal 前的 sufficient context 与问题数量；
- JTBD phrasing 是否帮助纠正结构，还是引入方法术语负担。

## Positive Evaluation Cases（synthetic）

| ID | 输入 | 期望行为 | 原因 |
|---|---|---|---|
| `OPS-P1` | “做一个 AI 学习教练，先帮考证的人决定今天学什么” | 提取考证者、每天开始学习的情境、决定今日任务的 progress；直接生成 provisional context | 用户已给出足够第一版结构的核心线索 |
| `OPS-P2` | “给现有 invoicing SaaS 加逾期提醒，desktop-only，2 周” | 保留 existing-product context，记录明确 platform/appetite，并把“提醒”重构为减少逾期跟进遗漏的 hypothesis | 不丢失用户 constraint，也不把 solution 当 need |
| `OPS-P3` | PRD 写 SMB，用户本轮明确改为 freelancer | 标记冲突，按 current explicit correction 选择 freelancer，并触发 affected-stage regression | 遵守 context precedence 与审计 |

## Negative Evaluation Cases / Failure Modes（synthetic）

| ID | 输入/错误输出 | 失败原因 | 正确修复 |
|---|---|---|---|
| `OPS-N1` | 输入“dashboard”，输出“用户需要 dashboard，已确认” | evidence laundering | 保留 requested solution，另写 problem hypothesis |
| `OPS-N2` | 首轮连续问 12 个 intake 问题才生成结构 | 把 PM 工作转给用户 | 记录 nonblocking assumptions，先给可撤销 proposal |
| `OPS-N3` | 根据“独立开发者”自动写“预算为 0、无后端能力” | stereotype 伪装事实 | 标 unknown/pattern assumption，必要时问 blocking constraint |

## Sources

| Source title | Source type | URL | Date | Exact supported point | Limitation | David implication | Confidence |
|---|---|---|---|---|---|---|---|
| Jobs to Be Done Theory | Primary method institute | https://www.christenseninstitute.org/theory/jobs-to-be-done/ | 无明确日期；访问 2026-07-10 | job 是特定 circumstance 中寻求的 progress，含 functional/social/emotional forces | 不能证明自动化 JTBD 提高 IA；需真实故事研究 | 只生成带 provenance 的 job hypothesis | High |
| How the discovery phase works | GOV.UK authoritative manual | https://www.gov.uk/service-manual/agile-delivery/how-the-discovery-phase-works | 2016-08-04；更新 2021-06-21 | build 前理解用户目标、约束、问题；预设 solution 应重构为 problem | 政府服务/团队周期不可照搬 | Orient 输出 user/context/problem/constraints；不直接接 solution | High |
| Framework for Innovation | Design Council authoritative | https://www.designcouncil.org.uk/resources/framework-for-innovation/ | 页面无日期；Double Diamond 2004 | Discover/Define 与 Develop/Deliver 是可回退的发散/收敛过程，强调 people-first、visual、iterate | 高层过程模型，不给问题阈值 | 允许后续冲突触发 stage regression | Medium-High |
| Opportunity Solution Trees | Primary method-author | https://www.producttalk.org/opportunity-solution-trees/ | 2023-12-06 | OST 需清晰 outcome、target/value theory 和真实 interview inputs；不要编造 opportunity | 3–4 interviews 是作者建议，不是通用阈值 | 无研究时只产 opportunity hypothesis | High |
