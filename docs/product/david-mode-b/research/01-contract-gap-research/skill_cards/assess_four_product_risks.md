# Skill: `assess_four_product_risks`

> 状态：Research contract；synthetic examples 仅用于评测，不是风险已被解决的证据。

## Purpose

对一个明确的 candidate solution/scope 分别检查 Value、Usability、Feasibility、Viability，记录 claim、evidence、gap、owner、next test 和 blocking status。该 Skill 是风险覆盖与路由器，不是打分器，也不直接执行所有测试。

## Trigger

- candidate solution 首次形成；
- prototype/wireflow 已足以暴露风险；
- MVP scope proposal 准备批准；
- 引入 AI model、API、payment、auth、personal data、human ops；
- 新 evidence 或技术变化使既有评估 stale/conflicting；
- coding-agent handoff readiness review。

## Inputs

| 输入 | 必需 | 说明 |
|---|---:|---|
| `solutionId` | 是 | candidate solution/scope canonical ID |
| `targetUserCustomer` | 是 | user 与 buyer 可不同 |
| `problemOutcome` | 是 | 要解决的问题和 outcome |
| `solutionSummary` | 是 | 当前 solution boundary |
| `evidenceInventory` | 是 | prototype test、research、metrics、spikes、constraints |
| `technicalContext` | 是 | stack、skills、data/model/API、performance constraints |
| `businessContext` | 是 | GTM、pricing、cost、legal、security、brand、support |
| `owners` | 是 | product/design/engineering/business/domain owner；可同一人多角色 |
| `prototypeRefs` | 否 | artifact 不是 evidence，除非有 test result |

## Method

| Risk | 核心问题 | 典型 evidence/test |
|---|---|---|
| `value` | 用户会选择使用/客户会购买吗？相对替代方案足够好吗？ | observed choice、commitment、behavior、payment evidence、problem interviews |
| `usability` | 用户能否理解并完成必要任务？ | usability test、task completion、error/recovery observation |
| `feasibility` | 在时间、技能、技术、数据和质量约束内能否构建/运行？ | engineering spike、architecture review、model/API evaluation、load/security test |
| `viability` | 是否适合业务、法律、合规、GTM、成本、品牌与运营？ | stakeholder/domain review、unit economics、legal/security/privacy assessment |

Prototype fidelity 必须针对目标 risk：feasibility 可能不需要 UI，brand/legal 可能需要不同的 visual/behavior/data fidelity。未测试的 prototype 只是 artifact，不是风险证据。

## Professional Rules

1. 四个 risk 独立记录；禁止相加、平均或用一个 readiness score 掩盖 blocker。
2. Value 与 Usability 分离：会用不等于愿意用，愿意看不等于愿意付费。
3. Feasibility 必须由工程/技术 evidence 支持；PM/LLM 不能单独确认。
4. Viability 必须显式覆盖适用的 legal、privacy、security、GTM、cost、sales、support、brand。
5. user 与 customer/buyer 不同时，Value 记录双方的不同 claim。
6. `evidence_backed` 必须指向实际 test/research/result；prototype 本身、竞品做法、AI synthetic persona 不是验证。
7. 每个 unresolved high risk 必须路由到 `map_assumptions_and_tests` 或明确 `blocked`。
8. Risk status 使用 `unknown|hypothesis|testing|supported|contradicted|accepted_with_approval|blocked`，不是红黄绿主观标签。
9. 同一 solo builder 可承担多个 owner role，但每种专业判断需要对应 evidence/consultation。
10. AI/probabilistic 产品除四类外，在相应域内记录 quality、reliability、safety、fallback 与 human escalation，不另造第五个含混总分。

## Anti-patterns

- “四项都是 8/10，所以可以做”；
- 能生成 demo 就把 feasibility 标 strong；
- 5 个用户能完成任务就证明愿意购买；
- PM 说 API 应该没问题就关闭 technical risk；
- 把 legal/security/privacy 全塞入 feasibility；
- prototype 未测试就标 usability supported；
- 所有风险都列出但没有 owner/next action。

## Do Not Use When

- 尚无 candidate solution/scope，只有 broad problem；先 Orient/Opportunity；
- 当前仅检查 deterministic schema/flow completeness；
- 只需要执行已经定义的单一 assumption test；直接使用 test skill；
- 用户要求完整 security threat model、legal opinion、financial model；应转专业流程，Four Risks 只保留入口/依赖。

## Structured Output

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://david.local/schemas/skills/assess_four_product_risks.output.json",
  "type": "object",
  "required": ["skillId", "solutionId", "assessedAt", "risks", "blockers", "nextActions", "overallDecision"],
  "properties": {
    "skillId": { "const": "assess_four_product_risks" },
    "solutionId": { "type": "string" },
    "assessedAt": { "type": "string", "format": "date-time" },
    "risks": {
      "type": "object",
      "required": ["value", "usability", "feasibility", "viability"],
      "properties": {
        "value": { "$ref": "#/$defs/riskRecord" },
        "usability": { "$ref": "#/$defs/riskRecord" },
        "feasibility": { "$ref": "#/$defs/riskRecord" },
        "viability": { "$ref": "#/$defs/riskRecord" }
      },
      "additionalProperties": false
    },
    "blockers": { "type": "array", "items": { "type": "string" } },
    "nextActions": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["riskType", "action", "ownerId"],
        "properties": {
          "riskType": { "enum": ["value", "usability", "feasibility", "viability"] },
          "action": { "enum": ["RESEARCH_OR_TEST", "PROPOSE_FOR_APPROVAL", "DEFER_AS_ASSUMPTION", "BLOCK_HANDOFF", "NO_ACTION"] },
          "ownerId": { "type": "string" }
        }
      }
    },
    "overallDecision": { "enum": ["proceed", "proceed_with_warnings", "test_before_build", "blocked", "risk_accepted_with_approval"] }
  },
  "$defs": {
    "riskRecord": {
      "type": "object",
      "required": ["claim", "status", "impact", "evidenceIds", "evidenceStrength", "ownerIds", "gaps", "nextTestIds"],
      "properties": {
        "claim": { "type": "string" },
        "status": { "enum": ["unknown", "hypothesis", "testing", "supported", "contradicted", "accepted_with_approval", "blocked"] },
        "impact": { "enum": ["low", "medium", "high"] },
        "evidenceIds": { "type": "array", "items": { "type": "string" } },
        "evidenceStrength": { "enum": ["none", "weak", "medium", "strong"] },
        "ownerIds": { "type": "array", "minItems": 1, "items": { "type": "string" } },
        "gaps": { "type": "array", "items": { "type": "string" } },
        "nextTestIds": { "type": "array", "items": { "type": "string" } },
        "fidelityNeeded": {
          "type": "object",
          "properties": {
            "visual": { "enum": ["none", "low", "medium", "high"] },
            "behavioral": { "enum": ["none", "low", "medium", "high"] },
            "data": { "enum": ["none", "synthetic", "representative", "live"] }
          },
          "additionalProperties": false
        }
      },
      "additionalProperties": false
    }
  },
  "additionalProperties": false
}
```

## Default Autonomy

- 建立/更新 assessment：`APPLY_WITH_UNDO`（L1）。
- 明显缺 evidence：`RESEARCH_OR_TEST` 或 `DEFER_AS_ASSUMPTION`。
- high risk acceptance、绕过 blocker：`PROPOSE_FOR_APPROVAL`（L2/L3）。
- legal/privacy/security/payment user-exclusive constraints：`ASK_USER`，并可能要求专业审查。

## Must Ask When

- 实际 buyer/GTM/pricing/legal/privacy/security constraint 只有用户知道；
- 工程能力、数据权限、API contract/SLA 无法从 repo/docs 获得；
- 用户需要明确 risk appetite；
- 要把 prototype test 的人群视为 target segment，但 sampling facts 缺失。

## Approval Required When

- 接受 unresolved high value/usability/feasibility/viability risk 继续 handoff；
- 改变 payment/auth/privacy/security/business model；
- 将 blocker 降为 warning；
- 使用真实用户、生产数据或外部 vendor 进行测试；
- risk response 会改变 MVP scope/core outcome。

## Validation

### Deterministic

- 四个 risk records 均存在；
- `supported|contradicted` 必须有 evidence IDs；
- feasibility 至少一个 owner 具备 engineering role 或 external technical review；
- high + evidence none/weak 不能 overall `proceed`；
- 任一 `blocked` 时 overall 只能 `blocked`，除非有 approved risk acceptance；
- prototype ref 不能单独计入 test evidence；
- accepted_with_approval 必须有 approval record。

### Expert / Domain Review

- value claim 是否区分 user 与 buyer；
- usability evidence 是否覆盖 core task 与 recovery；
- feasibility 是否考虑 time/skills/quality，而不只是 theoretical possibility；
- viability 是否覆盖适用的 legal/security/privacy/GTM/cost/ops；
- test fidelity 是否匹配 target risk。

### Needs Real Research

- 真实 adoption/payment/value；
- target-user task success；
- production technical performance/reliability；
- legal/compliance/security 专业结论；
- Four Risks 展示是否帮助 solo builder 或造成 checklist fatigue。

## Positive Evaluation Cases（synthetic）

| ID | 输入 | 期望行为 | 原因 |
|---|---|---|---|
| `FPR-P1` | 用户能完成 prototype task，但未观察是否愿意替换现有工具 | usability=partially supported；value=hypothesis；设计 choice/commitment test | 不让 usability 证据漂移到 value |
| `FPR-P2` | AI summary 依赖第三方 model，成本/延迟未知 | feasibility/viability 分别记录 latency/quality spike 与 unit-cost test | 同一 dependency 产生不同风险 |
| `FPR-P3` | 医疗提醒可用但涉及敏感数据 | privacy/legal 纳入 viability high blocker，要求专业审核与 approval | business fit 包含合规/安全 |

## Negative Evaluation Cases / Failure Modes（synthetic）

| ID | 输入/错误输出 | 失败原因 | 正确修复 |
|---|---|---|---|
| `FPR-N1` | 四项平均 7.5，overall=green | 总分掩盖 blocker | 独立状态，最严重风险约束决定 |
| `FPR-N2` | Lovable demo 能跑，feasibility=strong | demo 不等于 production-quality feasibility | 做工程/性能/安全 spike |
| `FPR-N3` | 用户说“我喜欢”，value=validated | stated preference 证据过弱且可能非 buyer | 限定 evidence strength，设计行为/commitment test |

## Sources

| Source title | Source type | URL | Date | Exact supported point | Limitation | David implication | Confidence |
|---|---|---|---|---|---|---|---|
| The Four Big Risks | SVPG primary framework-author | https://www.svpg.com/four-big-risks/ | 2017-12-04 | value/usability/feasibility/viability 定义；viability 包含 GTM、contract、legal、cost、monetization、brand；跨 Product/Design/Engineering 协作 | 专业框架，不是效果实验；角色分工需适配 solo builder | 四域独立、owner/evidence/gap/test；禁止平均分 | High |
| The Purpose of Prototypes | SVPG authoritative professional | https://www.svpg.com/the-purpose-of-prototypes/ | 2025-09-12 | prototype 用于测试风险；visual/behavior/data fidelity 随风险和 stakeholder 变化；未经测试不能证明产品值得构建 | “just enough fidelity”未量化；AI 产品还有额外测试层 | 每域记录 fidelity/test，artifact 不等于 evidence | Medium-High |
| How Assumptions Mapping Can Focus Your Teams... | Strategyzer primary/authoritative | https://www.strategyzer.com/library/how-assumptions-mapping-can-focus-your-teams-on-running-experiments-that-matter | 2020-08-04 | desirability/feasibility/viability hypotheses 需显式化并按重要性/证据选择测试 | 风险 taxonomy 与 SVPG 不完全同构 | Four Risks 的 gap 传给 assumption mapping，不机械合并 | High |
