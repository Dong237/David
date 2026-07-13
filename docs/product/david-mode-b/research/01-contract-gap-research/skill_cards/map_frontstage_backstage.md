# Skill: `map_frontstage_backstage`

> 状态：Research contract；synthetic examples 仅用于评测，不是实际运营证据。

## Purpose

为一个明确的用户 journey/goal 建立轻量 Service Blueprint slice，把 customer actions、frontstage touchpoints/promises、backstage actions、support processes、systems/evidence 与失败恢复对齐。重点是发现不可见依赖如何影响可见体验，不是绘制组织架构。

## Trigger

- 前台体验依赖 AI model、external API、human review/support、payment、notification 或 data pipeline；
- omnichannel/crossfunctional journey；
- 用户看到 loading/error/delay，但根因在 backstage；
- frontstage promise 没有可追踪 owner/dependency/SLA；
- scope/flow 变更可能改变运营流程；
- Four Risks 发现 feasibility/viability dependency gap。

## Inputs

| 输入 | 必需 | 说明 |
|---|---:|---|
| `journeyId` | 是 | 一个具体 journey/flow canonical ID |
| `journeyGoal` | 是 | 用户要完成的一个结果 |
| `customerActions` | 是 | 来自 flow/research；无 research 时标 hypothesis |
| `touchpoints` | 是 | UI、人、email、device、external channel |
| `frontstageActions` | 是 | 用户可见的人或系统行为/承诺 |
| `actorsSystems` | 是 | backstage/support actors、AI/API/services |
| `policiesConstraints` | 是 | legal/privacy/security/SLA/business rules |
| `failureModes` | 是 | failure、detection、fallback/recovery |
| `evidenceRefs` | 否 | research、ops metrics、incident、process docs |
| `timeMetrics` | 否 | 只有有来源时填写，不得虚构 SLA |

## Method

采用 Service Blueprint 的经典层次，并为 AI workflow 增加最小扩展：

```text
Physical / Digital Evidence
Customer Actions
---------------- Line of Interaction ----------------
Frontstage Human / System Actions
---------------- Line of Visibility -----------------
Backstage Human / System / AI Actions
---------------- Line of Internal Interaction -------
Support Processes / Systems / Policies
```

AI extension：`modelOrService`、`inputData`、`qualityCheck`、`failureDetection`、`fallback`、`humanEscalation`、`dataBoundary`。这些字段归入具体 backstage/support step，不额外创造与 journey 脱节的“AI lane”。

## Professional Rules

1. 一张 blueprint 只覆盖一个明确 journey/goal；不同场景应拆分后共享 canonical entities。
2. Customer actions 必须来自已知 flow/user evidence；若由 David 推断，状态必须 `inferred`。
3. Frontstage action 是用户直接看见的人/系统行为；backstage action 是支持它但不可见的工作。
4. 每个 frontstage promise 必须追踪到 backstage/support dependency 或明确 `none`。
5. 每条 interaction/dependency 明确 direction、handoff data、owner 和 failure impact。
6. 对用户重要的 delay、status、confirmation、recovery 必须有 frontstage evidence/status，不可只在内部日志存在。
7. AI step 必须说明 inputs/outputs、quality/failure detection、fallback、human escalation（适用时）和 data boundary。
8. policy/法律/安全约束必须绑定具体 step，不堆在图外备注中。
9. 不虚构 SLA、运营 actor、审批时长或 error rate；未知即 unknown，并指定 owner/research。
10. Simple standalone UI 无 backstage coordination 时返回 `not_applicable`，不要制造无用 lanes。

## Anti-patterns

- 以部门为列的 org chart，没有 customer journey；
- 只画 lanes，不画 interactions/dependencies；
- customer actions 全由 AI 编造却标 confirmed；
- frontstage 显示“完成”，backstage job 失败无检测/补偿；
- 把 API 名称当用户 action；
- 所有 flow 都生成完整 Service Blueprint；
- 写“2 秒返回”但无 contract/metric source。

## Do Not Use When

- 单一页面只在本地状态中变化，无外部/运营/backstage dependency；
- 当前问题只是 screen-level trigger/state；使用 wireflow；
- customer journey/core flow 尚未定义；先 Map Flow；
- 需要组织职责/RACI 而不是 service delivery mapping；
- 需要完整 architecture/threat model；Service Blueprint 只提供 user-centered dependency input。

## Structured Output

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://david.local/schemas/skills/map_frontstage_backstage.output.json",
  "type": "object",
  "required": ["skillId", "applicability", "journeyId", "journeyGoal", "steps", "interactions", "dependencies", "failures", "unresolved"],
  "properties": {
    "skillId": { "const": "map_frontstage_backstage" },
    "applicability": {
      "type": "object",
      "required": ["applicable", "reason"],
      "properties": {
        "applicable": { "type": "boolean" },
        "reason": { "type": "string" }
      },
      "additionalProperties": false
    },
    "journeyId": { "type": "string" },
    "journeyGoal": { "type": "string" },
    "steps": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["stepId", "sequence", "lane", "action", "actorOrSystemId", "visibility", "evidenceIds", "provenance", "confidence"],
        "properties": {
          "stepId": { "type": "string" },
          "sequence": { "type": "integer", "minimum": 0 },
          "lane": { "enum": ["evidence", "customer", "frontstage", "backstage", "support"] },
          "action": { "type": "string" },
          "actorOrSystemId": { "type": "string" },
          "visibility": { "enum": ["visible", "invisible", "not_applicable"] },
          "evidenceIds": { "type": "array", "items": { "type": "string" } },
          "provenance": {
            "$ref": "https://david.local/schemas/v1/shared_contract_vocabulary.schema.json#/$defs/ProvenanceCore"
          },
          "confidence": {
            "$ref": "https://david.local/schemas/v1/shared_contract_vocabulary.schema.json#/$defs/Confidence"
          },
          "duration": { "type": ["string", "null"] },
          "policyRefs": { "type": "array", "items": { "type": "string" } },
          "dataBoundaryRefs": { "type": "array", "items": { "type": "string" } }
        },
        "additionalProperties": false
      }
    },
    "interactions": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["interactionId", "fromStepId", "toStepId", "direction", "handoffData"],
        "properties": {
          "interactionId": { "type": "string" },
          "fromStepId": { "type": "string" },
          "toStepId": { "type": "string" },
          "direction": { "enum": ["one_way", "two_way"] },
          "handoffData": { "type": "array", "items": { "type": "string" } }
        },
        "additionalProperties": false
      }
    },
    "dependencies": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["dependencyId", "frontstageStepId", "supportingStepIds", "ownerId", "criticality"],
        "properties": {
          "dependencyId": { "type": "string" },
          "frontstageStepId": { "type": "string" },
          "supportingStepIds": { "type": "array", "items": { "type": "string" } },
          "ownerId": { "type": "string" },
          "criticality": { "enum": ["low", "medium", "high"] }
        },
        "additionalProperties": false
      }
    },
    "failures": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["failureId", "stepId", "detection", "frontstageStatus", "fallback", "recovery", "ownerId"],
        "properties": {
          "failureId": { "type": "string" },
          "stepId": { "type": "string" },
          "detection": { "type": "string" },
          "frontstageStatus": { "type": "string" },
          "fallback": { "type": ["string", "null"] },
          "recovery": { "type": ["string", "null"] },
          "ownerId": { "type": "string" },
          "humanEscalation": { "type": ["string", "null"] }
        },
        "additionalProperties": false
      }
    },
    "unresolved": { "type": "array", "items": { "type": "string" } }
  },
  "additionalProperties": false
}
```

## Default Autonomy

- applicability check、现有 flow/dependency 抽取：`AUTO_APPLY`。
- 生成 provisional blueprint slice：`APPLY_WITH_UNDO`（L1）。
- 引入新 external dependency/human operation/frontstage promise：`PROPOSE_FOR_APPROVAL`。
- 真实运营事实/SLA/owner 不可推断：`ASK_USER` 或 `DEFER_AS_ASSUMPTION`。

## Must Ask When

- 实际人工流程、SLA、support owner、policy 或 escalation route 只有用户知道；
- external vendor/API contract、数据存储/传输边界不在 docs/repo；
- 一个 frontstage promise 依赖未确认的业务承诺；
- 用户是否愿意引入人工介入/运营成本会改变 solution。

## Approval Required When

- 新增 external API/vendor、人工岗位或跨团队 handoff；
- 改变可见 SLA、状态承诺、fallback 或用户补偿；
- 处理 personal/sensitive/payment data；
- scope cut 删除 backstage dependency 但保留 frontstage promise；
- 接受无 owner/recovery 的 high-criticality dependency。

## Validation

### Deterministic

- step sequence 与 IDs 有效；
- lane 与 visibility 一致（frontstage visible，backstage/support invisible）；
- interaction/dependency endpoints 存在；
- 每个 frontstage promise 有 dependency 或 explicit `none`；
- high-criticality dependency 有 owner 和 failure record；
- failure 有 detection、frontstage status 与 owner；
- evidence-backed/confirmed step 有 source IDs；
- duration/SLA 有 evidence source，否则必须 unknown/null。

### Expert / LLM Critic Candidate

- blueprint 是否围绕 journey，而非组织；
- frontstage/backstage 区分是否正确；
- handoff data 与 policy 是否遗漏；
- failure/recovery 是否保护用户而非只记录内部错误；
- AI extension 是否最小且有用。

### Needs Real Research / Operational Validation

- customer actions 的真实顺序与触点；
- 实际后台流程、handoff、delay/error rate；
- support/ops 的真实 owner 与 capacity；
- AI fallback/human escalation 是否可执行；
- 用户是否理解前台状态并接受等待/恢复。

## Positive Evaluation Cases（synthetic）

| ID | 输入 | 期望行为 | 原因 |
|---|---|---|---|
| `MFB-P1` | 用户提交文档→AI extraction→人工复核→结果通知 | 分 customer/frontstage/backstage/support；记录 model failure、review queue、通知与 fallback | 多 actor、AI、人工作业典型 service |
| `MFB-P2` | Checkout 依赖 payment provider webhook | frontstage pending/success/failure 对齐 provider、order update、retry/refund owner | 不可见依赖决定可见状态 |
| `MFB-P3` | 简单本地 note editor，无 sync/API | 返回 `applicable=false` 并路由 wireflow | 避免无价值框架开销 |

## Negative Evaluation Cases / Failure Modes（synthetic）

| ID | 输入/错误输出 | 失败原因 | 正确修复 |
|---|---|---|---|
| `MFB-N1` | lanes 是 Product/Design/Engineering | 组织结构代替用户 journey | 以 customer action sequence 为骨架 |
| `MFB-N2` | AI 完成后前台显示 success，但后台无 quality/failure detection | promise 无保障 | 增 quality check、fallback/status/owner |
| `MFB-N3` | 自动填写 “API 2 秒 SLA” | 虚构运营事实 | 标 unknown，链接 contract/metric 或询问 owner |

## Sources

| Source title | Source type | URL | Date | Exact supported point | Limitation | David implication | Confidence |
|---|---|---|---|---|---|---|---|
| Service Blueprints: Definition | NN/g authoritative | https://www.nngroup.com/articles/service-blueprints-definition/ | 2017-08-27 | Blueprint 对齐 specific journey/goal，含 customer actions、frontstage、backstage、process、evidence 与 interaction/visibility lines；适合复杂/omnichannel/crossfunctional service | 经典结构未覆盖 probabilistic AI 细节 | 保留经典 lanes，加入最小 AI failure/fallback/data extension | High |
| Service Blueprinting: A Practical Technique for Service Innovation | Original peer-reviewed paper | https://doi.org/10.2307/41166446 | 2008-04 | Service blueprint 以 customer experience 为基础，可清晰可视化动态 service processes，并用于 service innovation | 早于现代 AI agent；全文访问可能受 publisher 限制 | customer-centered mapping，不把 architecture diagram 当 blueprint | High |
| How the discovery phase works | GOV.UK authoritative manual | https://www.gov.uk/service-manual/agile-delivery/how-the-discovery-phase-works | 2016-08-04；更新 2021-06-21 | discovery 应理解 wider journey、跨部门/组织、offline channels、existing process/technology/legal constraints | 政府 service 语境 | 实际 journey/ops 未知必须调研，不由 AI 编造 | High |
