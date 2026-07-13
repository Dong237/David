# Skill: map_user_flow

## Purpose

把一个明确的 product-level task 映射为 entry、orientation、user action、system response、decision、state transition、completion、recovery 与 return，借此检验 IA/navigation 是否真的支持 outcome。该 Skill 只描述具体产品内 Flow；跨渠道长期 experience 属于 Journey/Service Blueprint。

## Trigger

- Selected/provisional IA 与 NavigationModel 已足以测试 core task；
- core outcome、scope cut 或 required path 改变；
- 新增 auth、permission、payment、external API、AI/human operation；
- Wireframe 前需要定义 node entry/exit 和 states；
- Validator 发现 dead end、unreachable node、missing confirmation/recovery；
- Usability/analytics evidence 显示实际路径偏离设计。

## Inputs

**Required**

- `intent_id`、`task_id`、observable completion；
- actor/role、entry context；
- IA node IDs、NavigationModel；
- Inventory 中 actions/capabilities/states/dependencies；
- scope、constraints、required/locked path rules。

**Optional**

- current flow、wireframes、analytics/session/support evidence；
- alternate entry、device/channel、frequency；
- auth/payment/permission/AI/API/human-operation behavior；
- error catalog、SLA、retry/cancel/idempotency rules。

## Method

1. 确定一个 granular task：用户在单一产品内想完成什么，以及可观察 completion。
2. 列出所有入口，映射 orientation/find step 到 canonical IA nodes。
3. 逐步交替记录 `user_action → system_response/state`；每条 edge 指定 trigger、precondition 和 result。
4. 建立 critical happy path，检查每一步是否有信息、能力、权限和 dependency 支持。
5. 按风险而非固定模板添加 alternate/error/empty/permission/cancel/retry/recovery/return branches；不适用项记录原因。
6. 对 AI/API/async operation 增加 pending、timeout、partial failure、human handoff 或 resume（仅在相关时）。
7. 用 story-map backbone 检查 activities/steps/details 与 scope slice，但不以 story map 替代状态/分支。
8. 检查 IA：每个 find/orient/action state 有明确 home/entry；检查 Scope：P0 path 不依赖 Later/Excluded。
9. 输出 blockers、wireflow suitability、Node mini-IA requirements 与 validation scenarios。

## Rules

1. 一个 Flow 对应一个具体 product-level task；高层跨渠道目标使用 Journey。
2. 每个 step 必须记录 actor action 或 system response，不能只列 pages。
3. Flow node 引用 canonical IA/state IDs；screen 不是唯一状态边界，同屏动态变化也可成 state。
4. Completion 必须是用户可感知 outcome，并有 confirmation/feedback。
5. Happy path 必须完整；其他 path 按 impact、likelihood、permission/payment/data-loss 等风险决定 severity。
6. 固定 path checklist 是 completeness heuristic，不是所有场景的同等 Blocker；`not_applicable_reason` 可审计。
7. Error 必须有用户可执行的 next step；“显示错误”不等于 recovery。
8. Cancel/back/return 行为不得破坏数据或把用户困在 dead end。
9. Scope cut 若移除 P0 path dependency，必须 Blocker 并提出最小 repair options。
10. Story Map 可检查 narrative/scope，但不天然覆盖 system states、permissions 或 errors。
11. Wireflow 只在 screen context 与 transition 同时重要时推荐，并标明 hotspot/trigger。
12. 真实 task success 只能由 Usability Testing/production evidence 支持。

## Anti-patterns

- 用 `Home → Dashboard → Settings` 页面序列代替 user/system interactions；
- 只画 happy path，忽略 payment failure 或 permission denial；
- 不管产品语境，把所有 8 类路径都设成 P0 Blocker；
- error state 只有 “Something went wrong”，无原因、retry 或 alternate；
- Flow 引用不存在/已 excluded 的 node；
- 把跨电话、邮件、人工审核的 journey 强塞进单一 app flow。

## Structured Output

```yaml
skill_id: map_user_flow
flow_id: FLOW-001
intent_id: INT-001
task:
  task_id: TASK-001
  actor_role_id: ROLE-001
  goal: ""
  completion_signal: ""
  scope_status: in_mvp|later|excluded
entries:
  - entry_id: ENTRY-001
    type: home|deep_link|notification|search|external|return
    target_node_id: IA-NODE-001
    orientation_required: []
steps:
  - step_id: STEP-001
    ia_node_id: IA-NODE-001
    state_id: STATE-001
    actor: user|system|ai|human_operator|external_system
    action_or_response: ""
    information_required: []
    capability_ids: []
    preconditions: []
    next_edge_ids: []
edges:
  - edge_id: EDGE-001
    from_step_id: STEP-001
    trigger: ""
    condition: ""
    to_step_id: STEP-002
path_coverage:
  happy: required|complete|missing
  alternate: required|complete|missing|not_applicable
  error: required|complete|missing|not_applicable
  empty: required|complete|missing|not_applicable
  permission: required|complete|missing|not_applicable
  cancel: required|complete|missing|not_applicable
  retry_recovery: required|complete|missing|not_applicable
  return_repeat: required|complete|missing|not_applicable
  not_applicable_reasons: {}
dependencies: []
blockers: []
ia_gaps: []
scope_breaks: []
node_mini_ia_requirements: []
wireflow:
  recommended: true|false
  reason: ""
validation_scenarios: []
confidence: low|medium|high
```

## Validation

**Deterministic**

- graph 起点和 completion 可达，无意外 dead ends/cycles；
- step/edge/node/state/capability/dependency IDs 有效；
- P0 path 不依赖 Later/Excluded；
- required/locked constraints 未被绕过；
- `not_applicable` 有 reason；
- permission/payment/destructive action 在相关时有 confirmation/recovery；
- structural changes 触发 IA/Navigation/Wireframe/Scope cascade checks。

**Expert review**

- task granularity、entry、decision、system feedback、recovery 是否清楚；
- path severity 是否按风险而非机械清单；
- IA findability 与 scope coherence 是否支持 completion；
- async/AI/API/human handoff 是否在相关时建模。

**External validation**

- Scenario-based Usability Testing 观察 task completion、错误、返回、理解和 recovery；
- Analytics/session review 识别 drop-off/backtracking，但与定性证据结合；
- Tree Testing 只验证 find/orient hierarchy，不验证完整 Flow；
- Downstream execution test 检查 coding agent 是否实现 states/branches/AC。

## Default Autonomy

生成/补全 provisional Flow、缺失状态和 validation scenarios 为 `APPLY_WITH_UNDO`（L1）；明确引用错误、unreachable nodes 可 `AUTO_APPLY` 修复。改变 required path、payment/auth/permission、P0 outcome 或 Scope 为 `PROPOSE_FOR_APPROVAL`（L2）。实际 task success 使用 `RESEARCH_OR_TEST`。

## Must Ask

- 业务规则、legal/permission/payment outcome 只有用户知道且无安全 fallback；
- 两条 confirmed required paths 冲突；
- 用户可接受的 failure/recovery trade-off 属于产品承诺；
- external/human process 的真实行为与 SLA 未知且阻塞 P0 completion。

## Approval

- 改变 required path、completion signal 或 core entry；
- 新增/移除 auth、payment、permission 或 external dependency；
- 从 MVP 删除 core-path step；
- 改变 destructive action、data persistence 或 recovery semantics；
- Flow 变化要求移动/删除 core IA node 或大范围 wireframe 重做。

## When Not to Use

- 目标是跨渠道、跨数日/数周的 holistic experience，应使用 User Journey/Service Blueprint；
- Intent、Inventory 或 IA 尚不足，无法定义 canonical steps；
- 只需要检查 label/category findability，应使用 Tree Testing/Label/Hierarchy Skill；
- 只需 page layout/visual design；
- 只需 backend process，不涉及用户 interaction，应由 technical/service architecture 负责并映射关键 touchpoint。

## Sources

| Evidence | Source / type / URL / date | Supported point | Limitation | David use | Confidence |
|---|---|---|---|---|---|
| A-IA-17 | [NN/g — User Journeys vs. User Flows](https://www.nngroup.com/articles/user-journeys-vs-user-flows/)；authoritative；2023-04-16 | Flow 是单一产品内完成 task 的具体 interactions，包含 user actions 与 system responses；Journey 更广 | 不规定固定 path checklist | flow boundary 与 interaction schema | High |
| A-IA-18 | [NN/g — Wireflows](https://www.nngroup.com/articles/wireflows/)；authoritative；2016-12-04 | Wireflow 结合 screen context 与 transitions，适合动态 app；trigger hotspot 应明确 | 大型静态站不合适；不证明 David Canvas | artifact selection 与 trigger/result state | High |
| A-IA-19 | [NN/g — Mapping User Stories in Agile](https://www.nngroup.com/articles/user-story-mapping/)；authoritative；2021-01-24 | Activities/steps/details 表达完成 goal 的动作层级并支持 scope conversations | 不是完整 flow/state model | backbone + scope coherence，不替代 branches | Medium-High |
| A-IA-06 | [NN/g — Tree Testing](https://www.nngroup.com/articles/tree-testing/)；authoritative；2023-08-06 | 无视觉 tree task 评估 hierarchy/labels/findability | 不验证完整 task interaction | 仅用于 Flow 的 find/orient 子问题 | High |

完整 Claim–Evidence 见 `../sources/agent_a_ia_evidence.md` 的 A-CL-012、A-CL-013。

## 3 正例

> 以下均为 synthetic evaluation cases，不是用户研究证据。

1. `Approve Blueprint` Flow 交替记录 reviewer action、permission check、AI validation、approved/error states、confirmation 与 return；不是页面列表。
2. 免费内容浏览无需 permission path，输出 `not_applicable` 并说明原因；但 destructive delete Flow 把 confirm/recovery 标 required，severity 按风险变化。
3. Scope 要删除 Diagnostic，而 Plan generation 依赖结果。Validator 给 Blocker，并提出 manual setup、light diagnostic、移除 personalization 三个 repair options，等待 approval。

## 3 反例

> 以下均为 synthetic failure cases。

1. Flow 只有 `Home → Dashboard → Report → Done`，没有 actor actions、system responses、conditions 或 completion evidence。
2. 对只读帮助页机械要求 payment、permission、retry、cancel 全部 P0，否则不准 handoff。
3. AI 自动删除 required approval step 以缩短路径，未检查权限/合规、未出 diff、未请求确认。
