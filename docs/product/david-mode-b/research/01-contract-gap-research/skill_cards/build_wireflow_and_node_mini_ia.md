# Skill: `build_wireflow_and_node_mini_ia`

> 状态：Research contract；synthetic examples 仅用于评测，不是用户证据。

## Purpose

把一个达到 wireframe gate 的 IA node 与相关 flow 展开为低保真的 node mini-IA、layout blocks、interaction states 和 transitions，使用户与下游 Coding Agent 同时看清“节点内部有什么”和“用户操作后发生什么”。

## Trigger

- selected IA 中的 P0 node 已有 purpose、user intent、primary information/CTA；
- core flow 需要 screen context 才能消除交互歧义；
- flow 或 scope 变更影响 node 内容/状态；
- validator 发现 missing feedback、error、empty、permission 或 recovery state；
- 用户选中 node 请求展开内部结构。

## Inputs

| 输入 | 必需 | 说明 |
|---|---:|---|
| `nodeId` | 是 | canonical IA node ID |
| `flowIds` | 是 | 至少一个相关 flow，除非仅建立静态 mini-IA |
| `nodePurpose` | 是 | 该 node 对用户的单一主要职责 |
| `userIntent` | 是 | 进入该 node 的目标与 entry context |
| `primaryInformation` | 是 | 决策/操作前必须可见的信息 |
| `primaryAction` | 是 | 一项 dominant CTA，允许明确 `none` |
| `inputsOutputs` | 是 | 用户/系统输入和结果 |
| `stateInventory` | 是 | default/loading/empty/error/success/permission/recovery 的适用子集 |
| `scopeStatus` | 是 | In MVP/Later/Excluded/Test first 等 |
| `businessRules` | 否 | 权限、阈值、不可逆动作、AI confidence/fallback |
| `platformConstraints` | 否 | viewport、desktop/mobile、accessibility、interaction mode |

## Method

1. **Node mini-IA first**：先定义 purpose、entry、information、action、states、next/previous，再产生 layout。
2. **Wireframe**：用低保真 blocks 表示 page layout、information hierarchy、function 和 interaction，不做视觉设计。
3. **Wireflow**：将 wireframe/state 与 flow transition 合并；每条 edge 明确 trigger/hotspot 和 resulting state。
4. **Tactical desktop rendering**：桌面多步骤交互只重绘变化区域，同时保留足够 context。

## Professional Rules

1. 每个 visual node 必须引用 canonical `nodeId` 与 `stateId`，Canvas 坐标不是 domain identity。
2. `primaryInformation` 应在 primary CTA 之前或同一决策区可获得。
3. 每条 transition 必须有 `sourceStateId + triggerId + resultStateId`；不允许“漂浮箭头”。
4. resulting state 可以是同一 page 的 modal、inline feedback、changed content，不强制新页面。
5. 对 P0 flow 至少覆盖 normal、error、recovery；permission/empty/cancel 在适用时必须覆盖。
6. destructive/irreversible action 必须含 consequence、confirmation 或 undo/recovery policy。
7. AI action 必须显示 processing、confidence/uncertainty（适用时）、failure/fallback 和 user correction entry。
8. 低保真 artifact 不决定 visual styling；颜色、type scale、motion 不进入本 Skill。
9. 大型静态网站的多页面路径应优先 sitemap/flowchart，避免用 full-screen wireflow 填满 Canvas。
10. 任何新增 required step 都属于 flow decision，不得作为 layout hygiene 自动插入。

## Anti-patterns

- 根据 vague feature list 直接生成完整 dashboard；
- 每个 action 都跳到新 page；
- 箭头只连接画面，不说明 clickable target；
- 只画 happy path，不画 feedback/error/recovery；
- desktop 每步复制完整 screen，导致差异不可读；
- 先做高保真视觉，再反推信息层级；
- layout block 自创 ID，与 Blueprint node/state 脱节。

## Do Not Use When

- node purpose、user intent 或 primary action 仍未知；应回到 Intent/IA；
- candidate IA 尚未选择且两个方案会产生完全不同 node；
- 任务只需表达大量静态页面之间的结构；优先 IA tree/sitemap；
- 当前问题是 backstage API/ops coordination；优先 Service Blueprint；
- node 为 Later/Excluded 且无需评估关键依赖；
- 用户要求 high-fidelity UI design；转后续 visual design spec。

## Structured Output

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://david.local/schemas/skills/build_wireflow_and_node_mini_ia.output.json",
  "type": "object",
  "required": ["skillId", "nodeMiniIA", "states", "transitions", "layoutBlocks", "validation"],
  "properties": {
    "skillId": { "const": "build_wireflow_and_node_mini_ia" },
    "nodeMiniIA": {
      "type": "object",
      "required": ["nodeId", "purpose", "userIntent", "entryContext", "primaryInformation", "primaryAction", "inputs", "outputs", "scopeStatus"],
      "properties": {
        "nodeId": { "type": "string" },
        "purpose": { "type": "string" },
        "userIntent": { "type": "string" },
        "entryContext": { "type": "array", "items": { "type": "string" } },
        "primaryInformation": { "type": "array", "items": { "type": "string" }, "minItems": 1 },
        "supportingInformation": { "type": "array", "items": { "type": "string" } },
        "primaryAction": { "type": ["string", "null"] },
        "secondaryActions": { "type": "array", "items": { "type": "string" } },
        "inputs": { "type": "array", "items": { "type": "string" } },
        "outputs": { "type": "array", "items": { "type": "string" } },
        "scopeStatus": { "enum": ["in_mvp", "later", "excluded", "test_first"] }
      },
      "additionalProperties": false
    },
    "states": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "object",
        "required": ["stateId", "nodeId", "kind", "visibleInformation", "availableActions"],
        "properties": {
          "stateId": { "type": "string" },
          "nodeId": { "type": "string" },
          "kind": { "enum": ["default", "loading", "empty", "error", "success", "permission", "confirmation", "recovery", "cancelled"] },
          "visibleInformation": { "type": "array", "items": { "type": "string" } },
          "availableActions": { "type": "array", "items": { "type": "string" } },
          "feedback": { "type": ["string", "null"] }
        },
        "additionalProperties": false
      }
    },
    "transitions": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["transitionId", "flowId", "sourceStateId", "triggerId", "triggerLabel", "resultStateId", "guard", "reversible"],
        "properties": {
          "transitionId": { "type": "string" },
          "flowId": { "type": "string" },
          "sourceStateId": { "type": "string" },
          "triggerId": { "type": "string" },
          "triggerLabel": { "type": "string" },
          "resultStateId": { "type": "string" },
          "guard": { "type": ["string", "null"] },
          "reversible": { "type": "boolean" }
        },
        "additionalProperties": false
      }
    },
    "layoutBlocks": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["blockId", "stateId", "contentRef", "role", "priority"],
        "properties": {
          "blockId": { "type": "string" },
          "stateId": { "type": "string" },
          "contentRef": { "type": "string" },
          "role": { "enum": ["orientation", "primary_information", "supporting_information", "primary_action", "secondary_action", "input", "feedback", "navigation"] },
          "priority": { "enum": ["primary", "secondary", "tertiary"] }
        },
        "additionalProperties": false
      }
    },
    "unresolved": { "type": "array", "items": { "type": "string" } },
    "validation": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["ruleId", "status"],
        "properties": {
          "ruleId": { "type": "string" },
          "status": { "enum": ["pass", "warning", "fail"] }
        }
      }
    }
  },
  "additionalProperties": false
}
```

## Default Autonomy

- 默认：`APPLY_WITH_UNDO`（L1）生成/更新低保真 node mini-IA 和 wireflow proposal。
- 补齐 missing loading/error/feedback state：`AUTO_APPLY` 或 L1，前提是不改变 business rule。
- 新 required step、primary action 变化：`PROPOSE_FOR_APPROVAL`。
- evidence-dependent usability：`RESEARCH_OR_TEST`，不得只凭画面判定。

## Must Ask When

- irreversible action 的实际后果、权限或法律确认规则只由用户知道；
- 同一 trigger 可能产生互斥 business outcome 且无 safe default；
- existing UI 与 approved IA 冲突，用户未指定哪个 authoritative；
- core flow 的完成信号/成功状态是业务承诺且缺失。

## Approval Required When

- 增加、删除或重排 required path step；
- 改变 primary CTA、付款、认证、权限、隐私或 destructive behavior；
- 从 P0 flow 删除 error/recovery path；
- wireflow proposal 导致新 IA node、外部依赖或 MVP scope change。

## Validation

### Deterministic

- `nodeId/flowId/stateId/triggerId` 均能解析；
- transition source/result 存在，trigger 属于 source state；
- 每个 P0 state 至少有可达 entry；除 terminal state 外至少有 outbound 或 recovery；
- destructive transition 必须 `reversible=true` 或存在 confirmation/recovery state；
- `layoutBlocks.contentRef` 指向 mini-IA information/action/input；
- In-MVP P0 flow 不指向 Later/Excluded state。

### Expert / LLM Critic Candidate

- information hierarchy 是否支持进入该 node 的 decision；
- primary CTA 是否与 node purpose 一致；
- screen context 是否足以理解 transition 且不过度重复；
- error/empty/permission/recovery 文案和路径是否有意义；
- 是否误把 visual preference 写成 product rule。

### Needs Real Research

- target user 是否理解 layout、label 和 feedback；
- 用户能否完成关键 path；
- Canvas 中 wireflow 密度、局部变化视图是否比全屏重复更易理解。

## Positive Evaluation Cases（synthetic）

| ID | 输入 | 期望行为 | 原因 |
|---|---|---|---|
| `BWF-P1` | AI 生成 plan 的同一 page 有 editing → generating → success/error | 用同一 `nodeId` 的多个 state 表示，trigger 绑定 Generate CTA，error 有 retry/edit recovery | 动态 app 交互适合 wireflow |
| `BWF-P2` | Desktop filter panel 只改变 results list | 只重绘 filter/results 变化区域，保留 page context | 减少全屏重复并突出结果 |
| `BWF-P3` | 删除项目不可逆 | 加 consequence + confirmation state，并将结构变更标 L2 | 业务后果高，不能当 routine UI |

## Negative Evaluation Cases / Failure Modes（synthetic）

| ID | 输入/错误输出 | 失败原因 | 正确修复 |
|---|---|---|---|
| `BWF-N1` | 未知 node purpose 就生成 dashboard 卡片 | 从 feature/UI pattern 开始 | 回到 Orient/Intent/mini-IA gate |
| `BWF-N2` | 箭头从整个 screen 指向 success page | trigger/hotspot 不明确 | 绑定具体 action 与 source/result state |
| `BWF-N3` | checkout 只画 happy path | 缺 payment failure/cancel/retry | 补齐适用异常与恢复，触发 risk/AC review |

## Sources

| Source title | Source type | URL | Date | Exact supported point | Limitation | David implication | Confidence |
|---|---|---|---|---|---|---|---|
| Wireflows: A UX Deliverable for Workflows and Apps | NN/g authoritative | https://www.nngroup.com/articles/wireflows/ | 2016-12-04 | Wireflow 合并 wireframe 与 simplified flowchart；适合动态 app；箭头应指明 hotspot 和 resulting state；桌面可只画变化区域 | 不定义 David schema；大型静态网站适配较差 | transitions 与 visual states 分开建模，明确 trigger | High |
| How to Draw a Wireframe (Even if You Can’t Draw) | NN/g authoritative | https://www.nngroup.com/articles/draw-wireframe-even-if-you-cant-draw/ | 2021-06-20 | Wireframe 可表达 user path/flow、layout、information hierarchy 和 interactions；低保真可避免过早 polish | 不证明具体 layout 对某用户有效 | mini-IA 先于低保真 visual；真实可用性另测 | High |
| The Purpose of Prototypes | SVPG authoritative professional | https://www.svpg.com/the-purpose-of-prototypes/ | 2025-09-12 | prototype 应按目标风险采用适当 visual/behavior/data fidelity；未经测试只是沟通 artifact | 专家方法观点，AI 产品测试仍有额外层次 | Wireflow 不作为 usability/value evidence | Medium-High |
