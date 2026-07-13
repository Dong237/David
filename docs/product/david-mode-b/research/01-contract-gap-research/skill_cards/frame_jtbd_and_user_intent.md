# Skill: frame_jtbd_and_user_intent

## Purpose

把模糊 idea、功能请求或现有需求重述为可审计的用户意图：谁在什么 circumstance 下想取得什么 progress，为此需要知道什么、做什么、判断什么，以及什么状态表示完成。该 Skill 只形成 IA 的上游输入，不直接决定页面、导航或 MVP。

## Trigger

- 用户提供模糊 idea、功能清单或“做一个 X dashboard/app”的 solution statement；
- target user、trigger、desired progress 或 success state 缺失/冲突；
- 新证据或用户修正改变 core job；
- IA、Flow 或 Scope 无法追溯到用户意图；
- 用户把现有实现方式表述成 user need。

## Inputs

**Required**

- `raw_user_input`：用户原话及消息 ID；
- `product_context`：产品阶段、平台、当前决策；
- `known_constraints`：appetite、no-go、合规/业务限制；
- `existing_evidence_refs`：访谈、行为数据、工单、现有 artifacts，可为空。

**Optional**

- `current_alternative`、`user_vocabulary`、`requested_features`；
- `existing_intents`、`rejected_assumptions`、`locked_decisions`；
- `roles`、`frequency_hypotheses`、`anxiety_or_trust_needs`。

## Method

1. 保留用户原话，分离 `user_statement`、`requested_solution` 与可验证事实。
2. 用 JTBD lens 提取 `user + circumstance/trigger + desired progress`，补充 functional、social、emotional dimensions；缺证据的维度可省略，不强行填满。
3. 用 GOV.UK user-need rule 检查是否聚焦问题/结果，而不是 channel、feature 或组织目标。
4. 从 progress 反推 `information_needs`、`actions`、`decision_points`、`trust_needs`、`success_signal` 与 `failure_consequence`。
5. 逐字段标记正交的 `knowledgeStatus / basisType / lifecycleStatus / sourceIds` 与 confidence。
6. 若存在多个显著不同的 job，建立 variant，不把它们合并成抽象空话。
7. 只在 user-exclusive 且会阻塞下一结构决策时问一个问题；否则采用可逆 fallback 并登记 assumption。

## Rules

1. Job 必须包含 circumstance 与 desired progress；人口属性本身不是 job。
2. 用户要求的 feature 是输入，不自动等于 need；保留二者 traceability。
3. `success_state` 必须是用户可感知的 outcome，不是“页面已打开”或“AI 已生成”。
4. information need 与 action need 分开；“知道下一步”不能被偷换成“查看 dashboard”。
5. Founder preference 是 constraint，不是 target-user evidence。
6. AI synthesis 默认 `inferred`；单次用户认可可标 `confirmed` decision，但不能声称代表目标群体。
7. 若真实研究与用户当前指令冲突，标 `conflicting` 并说明哪项产品决策受影响。
8. 多个 job 只有在同一 circumstance、progress 和 success signal 下才可合并。
9. 输出必须能驱动 Inventory：每项 information/action need 至少关联一个待提取对象、内容或能力。

## Anti-patterns

- 用 Persona 形容词或人口属性替代 circumstance；
- 把 “需要 AI dashboard / chatbot / sidebar”原样写成 core job；
- 为了完整而编造 social/emotional job；
- 用竞品功能证明用户需要；
- 未记录用户原话、来源和推断链；
- 一次追问整套访谈问卷，把 PM 判断转嫁给用户。

## Structured Output

```yaml
skill_id: frame_jtbd_and_user_intent
intent_id: INT-001
actor:
  statement: ""
  provenance:
    knowledgeStatus: confirmed|inferred|unknown|conflicting
    basisType: user_input|source_evidence|pattern|model_inference|synthetic_evaluation
    lifecycleStatus: active|rejected|locked|stale|superseded
    sourceIds: []
  confidence: low|medium|high
circumstance:
  trigger: ""
  constraints: []
  provenance:
    knowledgeStatus: inferred
    basisType: model_inference
    lifecycleStatus: active
    sourceIds: []
  confidence: low|medium|high
desired_progress:
  functional: ""
  social: null
  emotional: null
requested_solutions:
  - statement: ""
    source_id: ""
information_needs:
  - need_id: NEED-I-001
    statement: ""
    decision_enabled: ""
action_needs:
  - need_id: NEED-A-001
    statement: ""
decision_points: []
trust_or_anxiety_needs: []
success_state:
  observable_outcome: ""
  evidence_or_signal: ""
failure_consequence: ""
current_alternative: ""
assumptions:
  - assumption_id: ASM-001
    statement: ""
    importance: low|medium|high
    validation_method: interview|observation|analytics|prototype_test
confidence: low|medium|high
next_inventory_seeds:
  objects: []
  content: []
  capabilities: []
question_candidate: null
```

## Validation

**Deterministic**

- Required 字段、IDs、provenance 与 source IDs 格式完整；
- 每个 requested solution 都与 intent 分字段；
- 至少一个 information/action need 可追溯至 progress；
- `knowledgeStatus=confirmed` 或 `basisType=source_evidence` 不得无 source ID；
- unknown 不得同时标 high confidence。

**Expert review**

- circumstance、progress、success 是否具体且相互一致；
- 是否发生 feature laundering、segment laundering 或过度抽象；
- 是否足以开始 Inventory，又未越界决定 IA。

**User/evidence validation**

- 通过访谈/观察验证 trigger、现有替代、词汇和 desired progress；
- 通过行为数据或原型任务验证 success signal；
- 不以 synthetic persona 或 AI 模拟访谈升级 provenance。

## Default Autonomy

`APPLY_WITH_UNDO`（L1）。David 可先生成可逆 Intent hypothesis。若只是从用户原话抽取明确字段，可 `AUTO_APPLY`；若改变已确认的 target user/core desired progress，升级为 `PROPOSE_FOR_APPROVAL`。

## Must Ask

- target user 或 core progress 是 user-exclusive fact，且不同答案会产生完全不同的 IA；
- 两条用户明确陈述冲突，无法以安全 fallback 并存；
- 法律、政策、合同或 hard no-go 决定哪些用户/outcome 可服务；
- 用户要求把某项 preference 作为锁定产品承诺，但承诺边界不清。

问题必须说明：为什么重要、改变哪个决策、若不回答将采用什么安全 fallback。

## Approval

- 修改已确认的 target user、core job 或 success state；
- 将 secondary job 提升为 V1 的 primary job；
- 因新 framing 删除/降级已批准的核心能力或流程；
- 合并两个已批准且可能对应不同产品结构的 intent variants。

## When Not to Use

- 用户只要求检查既定 label、hierarchy 或 navigation，且 Intent 已充分确认；
- 问题是 technical architecture、视觉风格或纯实现 bug；
- 已有真实研究显示需要进一步 evidence synthesis，此时应先做 research analysis，而非重新发明 JTBD；
- 多渠道长期体验是主要问题，应使用 journey/service-blueprint Skill，再把具体 product task 下钻为 flow。

## Sources

| Evidence | Source / type / URL / date | Supported point | Limitation | David use | Confidence |
|---|---|---|---|---|---|
| A-PM-01 | [Christensen Institute — Jobs to Be Done Theory](https://www.christenseninstitute.org/theory/jobs-to-be-done/)；method owner；页面未标日期，访问 2026-07-10 | Job 是特定 circumstances 中寻求的 progress，并有 functional/social/emotional dimensions | 不直接生成 IA；方法所有者资料不是独立效果研究 | 提取 circumstance/progress，避免 demographic/feature framing | High for method |
| A-PM-02 | [GOV.UK — Learning about users and their needs](https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs)；government standard；2016-04-04 / 2017-03-23 | 研究用户试图做什么、现有做法和问题；非用户意见应视为假设；need 聚焦问题而非 solution | 公共服务语境 | Provenance honesty、feature/need 分离、持续验证 | High |
| A-PM-03 | [GOV.UK — Government Design Principles](https://www.gov.uk/guidance/government-design-principles)；government authority；2012-04-03 / 2025-04-02 | Start with user needs、design with data；用户所要求的不总是其需要 | 高层原则，不提供 agent 询问阈值 | Intent-first 与 evidence-first 规则 | High for principle |

完整 Claim–Evidence 见 `../sources/agent_a_ia_evidence.md` 的 A-CL-002。

## 3 正例

> 以下均为 synthetic evaluation cases，不是用户研究证据。

1. 用户说“做一个 analytics dashboard”。输出把 solution 保留为 requested solution，并形成 hypothesis：“独立开发者发布后每天需要识别哪项异常最值得先处理，以减少无方向排查”；标 `inferred`，询问只聚焦“最先要改变的决策是什么”。
2. 用户明确“考生每天打开 app 是为了决定今天复习什么”。输出将 actor、trigger、progress 标 `confirmed`，提取“剩余弱项、时间预算、完成信号”等 information needs，并把推荐算法留到 Capability Inventory。
3. 访谈摘要与 founder 说法冲突。输出同时保留 `basisType=source_evidence` 的行为线索和 `knowledgeStatus=confirmed, basisType=user_input` 的业务约束，整体标 `knowledgeStatus=conflicting`，说明这会改变 primary job，而不是静默选一边。

## 3 反例

> 以下均为 synthetic failure cases。

1. “忙碌的年轻专业人士需要一个 AI dashboard”被直接当作 JTBD：只有人口描述和 solution，没有 circumstance/progress。
2. 为了模板完整，AI 编造“用户想获得同伴认可”的 emotional/social job，并标 high confidence。
3. 用户已经确认 primary job，AI 因看到竞品有社区功能而重写为“连接同伴”，未出 diff、未请求批准，也无用户证据。
