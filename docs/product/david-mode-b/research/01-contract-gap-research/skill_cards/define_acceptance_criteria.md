# Skill: `define_acceptance_criteria`

> 状态：Research contract；synthetic examples 仅用于评测，不是 downstream execution 结果。

## Purpose

为 P0 node、flow、state、business rule 与 nonfunctional constraint 生成 item-specific、可观察、可追溯、可判定的 Acceptance Criteria（AC），让用户、David、Coding Agent 与测试工具对“这个行为何时可接受”有同一合同。

本 Skill 不定义全局 Definition of Done（build/lint/review/deploy 等共享质量标准），也不保证所有 AC 都适合自动化。

## Trigger

- P0 node/flow 达到 handoff gate；
- business rule、permission/payment/privacy constraint 已确认；
- scope/flow/state change 使既有 AC stale；
- validator 发现 target 不可验证、只有 vague quality word 或缺 error/recovery；
- downstream Agent 需要明确 done-when；
- test failure 暴露 AC 歧义或 implementation coupling。

## Inputs

| 输入 | 必需 | 说明 |
|---|---:|---|
| `targetRefs` | 是 | node/flow/state/rule/constraint canonical IDs |
| `actor` | 是 | 角色与 permission context |
| `userOutcome` | 是 | item-specific 可观察结果 |
| `preconditions` | 是 | 起始 context/state |
| `triggers` | 是 | 用户/系统事件，静态 criterion 可为 explicit `none` |
| `expectedOutcomes` | 是 | UI/message/artifact/API contract 等 external observable output |
| `businessRules` | 是 | confirmed/provisional 规则及 provenance |
| `stateInventory` | 是 | normal/empty/error/permission/cancel/recovery 的适用集合 |
| `scopeStatus` | 是 | 只为当前 scope 生成 required AC |
| `nonfunctionalConstraints` | 否 | accessibility/performance/security/privacy 等有 threshold 的约束 |
| `definitionOfDoneRef` | 否 | 全局质量合同引用，不复制内容 |

## Method

1. **Outcome-focused AC**：每条 criterion 定义 item-specific, clear, testable condition，聚焦 desired behavior/outcome，不写 implementation。
2. **Specification by Example**：复杂 business rule 用多个 concrete scenarios 表达边界。
3. **Gherkin 可选格式**：`Given` 初始 context、`When` event/action、`Then` external observable outcome。
4. **Traceability**：每条 criterion 连接 user outcome、canonical target、business rule、scope、verification。

## Professional Rules

1. 每条 AC 只表达一个主要行为/约束；compound criteria 应拆分。
2. AC 必须可 pass/fail；“好看”“易用”“快速”若无方法/阈值，不是 AC。
3. 聚焦 external observable output；不规定 class、database table、internal method 或 UI selector。
4. `Then` 不直接检查内部数据库状态，除非 API/data product 的 external contract 本身就是 target output。
5. 覆盖适用的 happy、negative、boundary、permission、error、cancel、recovery，不机械生成所有状态。
6. business rule 与 scenario 分离：一条 Rule 可由多个 examples 说明。
7. Gherkin 只在能减少歧义时使用；简单静态 constraint 可用 declarative criterion。
8. AC 与 Definition of Done 分开：AC 是 item-specific behavior，DoD 是团队共享质量标准。
9. performance/accessibility/privacy AC 必须有可验证 method/threshold/source；不得凭 AI 发明数字。
10. scope change 后，引用 affected target 的 AC 必须 stale 并重新验证。
11. 用户-owned business threshold、money/permission/legal wording 必须 confirmed/approved。

## Anti-patterns

- “页面加载要快”；
- “实现一个登录页面”；
- “使用 React Query 缓存结果”；
- “所有测试通过”（这是 DoD/verification summary，不是 item AC）；
- 只写 happy path；
- 每条简单 AC 强制扩成 8 行 Gherkin；
- 用 CSS selector/数据库列名写用户行为；
- 自动发明“2 秒”“99.9%”等阈值。

## Do Not Use When

- target node/flow/rule 尚未达到足以描述 outcome 的 gate；
- 当前只需团队全局 quality/release checklist；应更新 DoD/Handoff contract；
- 需要探索真实用户是否理解/愿意使用；应做 usability/value test，AC 不能替代；
- item 为 Later/Excluded 且没有 P0 dependency；
- 需要完整测试实现代码；本 Skill 只产 contract 和 verification mapping。

## Structured Output

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://david.local/schemas/skills/define_acceptance_criteria.output.json",
  "type": "object",
  "required": ["skillId", "acceptanceSetId", "targetRefs", "businessRules", "criteria", "traceability", "coverage", "gaps"],
  "properties": {
    "skillId": { "const": "define_acceptance_criteria" },
    "acceptanceSetId": { "type": "string" },
    "targetRefs": { "type": "array", "minItems": 1, "items": { "type": "string" } },
    "businessRules": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["ruleId", "statement", "provenance", "confidence", "sourceIds"],
        "properties": {
          "ruleId": { "type": "string" },
          "statement": { "type": "string" },
          "provenance": {
            "$ref": "https://david.local/schemas/v1/shared_contract_vocabulary.schema.json#/$defs/ProvenanceCore"
          },
          "confidence": {
            "$ref": "https://david.local/schemas/v1/shared_contract_vocabulary.schema.json#/$defs/Confidence"
          },
          "sourceIds": { "type": "array", "items": { "type": "string" } }
        },
        "additionalProperties": false
      }
    },
    "criteria": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "object",
        "required": ["criterionId", "targetRefs", "ruleRefs", "format", "actor", "preconditions", "trigger", "expectedOutcome", "priority", "verificationType", "provenance", "confidence", "approvalStatus"],
        "properties": {
          "criterionId": { "type": "string" },
          "targetRefs": { "type": "array", "minItems": 1, "items": { "type": "string" } },
          "ruleRefs": { "type": "array", "items": { "type": "string" } },
          "format": { "enum": ["declarative", "gherkin"] },
          "actor": { "type": "string" },
          "preconditions": { "type": "array", "items": { "type": "string" } },
          "trigger": { "type": ["string", "null"] },
          "expectedOutcome": { "type": "string", "minLength": 1 },
          "gherkin": {
            "type": ["object", "null"],
            "required": ["given", "when", "then"],
            "properties": {
              "given": { "type": "array", "items": { "type": "string" } },
              "when": { "type": "string" },
              "then": { "type": "array", "minItems": 1, "items": { "type": "string" } }
            },
            "additionalProperties": false
          },
          "priority": { "enum": ["must", "should", "could"] },
          "verificationType": { "enum": ["automated", "manual", "user_test", "performance_test", "accessibility_review", "security_review", "policy_review"] },
          "provenance": {
            "$ref": "https://david.local/schemas/v1/shared_contract_vocabulary.schema.json#/$defs/ProvenanceCore"
          },
          "confidence": {
            "$ref": "https://david.local/schemas/v1/shared_contract_vocabulary.schema.json#/$defs/Confidence"
          },
          "approvalStatus": { "enum": ["not_required", "pending", "approved", "rejected"] },
          "status": { "enum": ["draft", "ready", "stale", "passed", "failed", "blocked"] }
        },
        "allOf": [
          {
            "if": { "properties": { "format": { "const": "gherkin" } } },
            "then": { "required": ["gherkin"], "properties": { "gherkin": { "type": "object" } } }
          }
        ],
        "additionalProperties": false
      }
    },
    "traceability": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["criterionId", "outcomeId", "scopeItemId"],
        "properties": {
          "criterionId": { "type": "string" },
          "outcomeId": { "type": "string" },
          "scopeItemId": { "type": "string" },
          "testRef": { "type": ["string", "null"] }
        },
        "additionalProperties": false
      }
    },
    "coverage": {
      "type": "object",
      "required": ["happy", "negative", "boundary", "permission", "error", "recovery"],
      "properties": {
        "happy": { "enum": ["covered", "not_applicable", "missing"] },
        "negative": { "enum": ["covered", "not_applicable", "missing"] },
        "boundary": { "enum": ["covered", "not_applicable", "missing"] },
        "permission": { "enum": ["covered", "not_applicable", "missing"] },
        "error": { "enum": ["covered", "not_applicable", "missing"] },
        "recovery": { "enum": ["covered", "not_applicable", "missing"] }
      },
      "additionalProperties": false
    },
    "definitionOfDoneRef": { "type": ["string", "null"] },
    "gaps": { "type": "array", "items": { "type": "string" } }
  },
  "additionalProperties": false
}
```

## Default Autonomy

- 补齐已有 confirmed rule 的 routine AC/coverage fields：`AUTO_APPLY` 或 `APPLY_WITH_UNDO`（L0–L1）。
- 根据 flow 生成 AC draft：`APPLY_WITH_UNDO`。
- business threshold、payment/permission/privacy/legal rule：`PROPOSE_FOR_APPROVAL`。
- 真正的 user comprehension/value：`RESEARCH_OR_TEST`，AC 不得自证。

## Must Ask When

- user-owned business threshold、money、permission、retention/deletion、legal wording 缺失；
- expected outcome 有两个互斥业务解释且无 safe default；
- existing code/test 与 approved Blueprint 冲突，权威方向不明确；
- performance/SLA 数字没有来源但为 release blocker。

## Approval Required When

- AC 确认新的业务规则或改变 scope；
- 涉及 payment、auth、privacy、security、legal、irreversible action；
- 将 Must criterion 降级/删除；
- 以 explicit override 接受未覆盖的 P0 error/recovery；
- AC 变化会让已完成 implementation 产生高 rework。

## Validation

### Deterministic

- criterion/target/rule/traceability IDs 可解析；
- `expectedOutcome` 非空且不只含 vague adjective；
- `format=gherkin` 时 Given/When/Then 完整，Then 至少一项；
- Gherkin Then 不应只匹配 internal database/class/method wording（lint + review）；
- P0 coverage 的适用项不能 missing；
- `provenance.knowledgeStatus=confirmed` 或 `provenance.basisType=source_evidence` 的 rule 有 source IDs；
- user-owned/high-risk rule 的 approvalStatus 必须 approved 才能 ready；
- scope/target version 变化后 AC 自动 stale。

### Expert / LLM Critic Candidate

- criterion 是否面向用户/外部系统可观察行为；
- business rule 是否被 examples 充分覆盖；
- negative/boundary scenarios 是否真正有价值而非机械枚举；
- 是否过度绑定 UI wording/implementation；
- verification type 是否匹配 criterion。

### Needs Downstream / User Validation

- Coding Agent 是否按 AC 正确实施并生成/运行测试；
- AC 是否遗漏真实用户 task success/理解问题；
- 自动测试的维护成本与 false confidence；
- 业务 owner 是否认为 criteria 完整且可接受。

## Positive Evaluation Cases（synthetic）

| ID | 输入 | 期望行为 | 原因 |
|---|---|---|---|
| `DAC-P1` | viewer 无编辑权限 | `Given viewer / When 请求编辑 / Then 编辑控件不可用且返回可理解权限状态`，引用 permission rule | 可观察、角色/状态明确 |
| `DAC-P2` | AI generation 失败 | Then 显示失败状态、保留输入、提供 retry/edit；不指定内部 queue 实现 | 覆盖 error/recovery 且 implementation-free |
| `DAC-P3` | “上传文件最大 10MB”已由用户批准 | declarative AC + boundary examples 10MB/超出 10MB，verification=automated/manual | 简单规则无需强制冗长 Gherkin |

## Negative Evaluation Cases / Failure Modes（synthetic）

| ID | 输入/错误输出 | 失败原因 | 正确修复 |
|---|---|---|---|
| `DAC-N1` | “页面应该快速、好看、易用” | 不可 pass/fail，无 method/threshold | 拆成有来源的 performance AC；易用性另测 |
| `DAC-N2` | “Then users 表 `status=active`” | 检查内部实现，不是外部结果 | Then 表达用户可观察权限/消息/API contract |
| `DAC-N3` | 每条 AC 都包含 `npm test`、lint、review | 把 DoD 复制进 item AC | 使用 `definitionOfDoneRef`，AC 保持 item-specific |

## Sources

| Source title | Source type | URL | Date | Exact supported point | Limitation | David implication | Confidence |
|---|---|---|---|---|---|---|---|
| Agile Glossary — Acceptance criteria | Scrum Alliance authoritative professional body | https://www.scrumalliance.org/glossary | 持续更新；访问 2026-07-10 | AC 是 clear/concise/testable conditions，聚焦 desired outcome 而非 implementation，并作为 pass/fail checklist | 页面是 glossary，不给复杂规则写法的完整方法 | AC schema 要可判定、outcome-focused、item-specific | High |
| Acceptance Testing | Agile Alliance authoritative professional body | https://agilealliance.org/glossary/acceptance-testing/ | 页面无明确日期；访问 2026-07-10 | Acceptance test 以 example/usage scenario 描述行为并给 pass/fail contract；implementation-coupled test 难以理解且脆弱 | Acceptance tests 与 AC 非完全同一对象；自动化有维护争议 | AC 与 verification 分离，不强制自动化，不写实现细节 | High |
| Gherkin Reference | Cucumber official documentation | https://cucumber.io/docs/gherkin/reference/ | 持续更新；访问 2026-07-10 | Rule 可组织 business rule examples；Given/When/Then 表 context/event/outcome；Then 应 external observable | Gherkin 是语法，不适合所有静态约束，也不要求采用 Cucumber | `format=gherkin|declarative`；Then observable | High |
| Learning about users and their needs | GOV.UK authoritative manual | https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs | 2016-04-04；更新 2017-03-23 | User stories 应链接 user needs，并可含 acceptance criteria、complexity、dependencies，以保持 traceability | 政府语境；不提供 AC 细节模板 | AC 追踪 outcome/scope/dependency，而非孤立文本 | Medium-High |
