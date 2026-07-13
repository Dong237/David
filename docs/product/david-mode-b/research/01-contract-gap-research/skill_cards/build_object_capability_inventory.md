# Skill: build_object_capability_inventory

## Purpose

在生成页面或导航前，提取产品的信息与功能原料：domain objects、content types、capabilities、actions、states、roles、permissions、rules、events 和 dependencies，并建立关系、来源与覆盖状态。目标是防止“一个 feature 一张 page”和遗漏关键状态/依赖。

## Trigger

- Intent Map 已形成，准备生成 Mental-Model hypotheses 或 Candidate IA；
- 用户提供 PRD、现有 repo、sitemap、原型或 feature list；
- 新需求、新角色、新集成或 scope change 出现；
- Flow/Wireframe 引用了无 canonical ID 的内容或动作；
- Validator 发现 duplicate、orphan、missing state、permission 或 dependency。

## Inputs

**Required**

- `intent_models`：含 information/action needs 与 success state；
- `source_artifacts`：用户输入、PRD、repo facts、现有结构，可为空但需显式；
- `constraints`、`scope_context`、`provenance_policy`。

**Optional**

- 现有 inventory、schema/API、analytics taxonomy、roles/permissions；
- user vocabulary、accepted/rejected decisions、external systems；
- 现有 pages/navigation，只作为 evidence，不作为 canonical inventory。

## Method

1. 按 source artifact 抽取候选名词、信息、动作、规则、状态和依赖，保留 source span/ID。
2. 归一化为 typed items：`object/content/capability/action/state/role/permission/rule/event/dependency`。
3. 区分 canonical term、visible label、synonym；合并同义项但保留 aliases，避免仅按字符串去重。
4. 从 Intent 逐项做 coverage mapping：每个 information/action need 由哪些 items 支持。
5. 建立 relations：对象拥有状态、角色拥有权限、动作调用能力、事件改变状态、能力依赖系统。
6. 使用 affinity grouping 生成工作簇，只标 `knowledgeStatus=inferred, basisType=pattern`；不得称为用户 Card Sorting。
7. 做 completeness sweep：default/loading/empty/error/success/recovery，CRUD 之外的审批、取消、重试与权限。
8. 识别 capability 的潜在承载方式，但不创建页面：`contextual_action/background_process/multi_node/undecided`。
9. 输出新增、合并、冲突与未解析项的 diff。

## Rules

1. Inventory item 不等于 IA node、page 或 navigation item。
2. Object 是持续存在且有 identity/state 的领域实体；content 是被消费的信息；capability 是系统能做什么；action 是 actor 的意图动作。
3. 每项必须有 `source_ids + provenance + confidence`；模型补全的缺失状态不得标 `confirmed`。
4. 同义项合并必须保留 alias 和原 source，不能丢失用户词汇。
5. 一个 capability 可服务多个 intents；一个 intent 也可依赖多个 capabilities。
6. Role 与 permission 分开；角色名称不能隐含未确认权限。
7. External API、AI provider、auth、payment、human operation 都是 dependency，不得隐藏在 capability 文本中。
8. 现有页面可映射回 items，但旧页面结构不自动成为推荐 IA。
9. Affinity cluster 是设计工作假设；真实 mental-model evidence 需要参与者研究。
10. 对 scope 外 item 仍可登记，但必须标 `later/excluded/unknown`，以便依赖检查。

## Anti-patterns

- 直接把 feature list 转成 sitemap；
- 只盘点 happy-path capabilities，遗漏状态、角色、权限和 dependencies；
- 用 “Dashboard/Settings/Management” 这类旧页面名代替领域对象；
- 把 AI 聚类称为 Card Sorting 结果；
- 通过词形相似盲目合并语义不同的对象；
- 删除 scope 外依赖，使 MVP 看似自洽但实际不可执行。

## Structured Output

```yaml
skill_id: build_object_capability_inventory
inventory_snapshot_id: INV-SNAP-001
source_artifact_ids: []
items:
  - item_id: OBJ-001
    type: object|content|capability|action|state|role|permission|rule|event|dependency
    canonical_name: ""
    aliases: []
    definition: ""
    intent_ids: []
    source_ids: []
    provenance:
      knowledgeStatus: confirmed|inferred|unknown|conflicting
      basisType: user_input|source_evidence|pattern|model_inference|synthetic_evaluation
      lifecycleStatus: active|rejected|locked|stale|superseded
      sourceIds: []
    confidence: low|medium|high
    scope_status: in_mvp|later|excluded|unknown
    candidate_presentation: contextual_action|background_process|multi_node|undecided
relations:
  - relation_id: REL-001
    from_id: OBJ-001
    type: has_state|acted_on_by|requires|produces|visible_to|changes_to|supports_intent
    to_id: STATE-001
coverage:
  - need_id: NEED-A-001
    covered_by_item_ids: []
    status: covered|partial|missing
conflicts: []
duplicates_or_aliases: []
orphan_item_ids: []
missing_candidates: []
assumptions: []
change_set: []
```

## Validation

**Deterministic**

- IDs 唯一，relation endpoints 存在，type 合法；
- 每个 P0 intent need 至少 `covered/partial`，`missing` 触发 Warning/Blocker；
- `knowledgeStatus=confirmed` 或 `basisType=source_evidence` 有 source ID；
- role/permission、object/state、action/capability 不混型；
- P0 capability 的 blocking dependencies 不得 `excluded`；
- duplicate canonical item 只允许通过 alias/merge record 解决。

**Expert review**

- 粒度是否一致，是否把 UI container 当领域对象；
- coverage 是否真实而非只做名称匹配；
- missing states/dependencies 是否按领域风险充分；
- candidate presentation 是否过早页面化。

**External validation**

- 用领域专家/现有系统核对业务规则、permissions、dependencies；
- 用真实用户研究核对用户词汇和重要信息，不以 inventory 本身证明 mental model；
- 在 Flow 中验证能力、状态和依赖能否支持端到端 outcome。

## Default Autonomy

`AUTO_APPLY`（L0）用于忠实抽取、ID 分配和显然的引用修复；`APPLY_WITH_UNDO`（L1）用于 AI 补全的 states、aliases、clusters 和 inferred relations。任何改变业务规则、权限或 external dependency 的操作不属于本 Skill 的自动权限。

## Must Ask

- 领域对象/术语存在多个互斥含义，错误选择会改变数据或顶层 IA；
- permission、legal rule、payment/auth 或 external system 行为只能由用户/组织确认；
- source artifacts 相互冲突且无法并存为 variants；
- core intent 的必要能力是否存在属于产品承诺，而现有材料没有安全 fallback。

## Approval

- 合并/拆分已确认的 canonical object；
- 删除、归档或改名 locked item；
- 新增 major external dependency、role 或 permission boundary；
- 将 P0 dependency/capability 移出 MVP；
- 由 inventory change 导致已批准 IA/Flow/Wireframe 大范围重构。

## When Not to Use

- 目标只是改一个可见 label，且 canonical item 已明确；
- 目标是选择 navigation component，而 inventory/IA 尚未变化；
- 仅需 technical API schema 设计；应由 technical architecture 负责，再映射回 dependency；
- 用户要求真实分类证据；应使用 Card Sorting/Tree Testing 研究流程，而非 AI inventory。

## Sources

| Evidence | Source / type / URL / date | Supported point | Limitation | David use | Confidence |
|---|---|---|---|---|---|
| A-IA-01 | [NN/g — Information Architecture vs. Sitemaps](https://www.nngroup.com/articles/information-architecture-sitemaps/)；authoritative；2023-09-03 | IA 工作包括 content inventory、taxonomy、关系和持续维护；sitemap 只是投影 | 主要是网站语境 | Inventory 与 page tree 分离 | High |
| A-IA-02 | [NN/g — IA and Navigation](https://www.nngroup.com/articles/ia-vs-navigation/)；authoritative；2014-06-22 | IA 先识别 content/functionality 与底层组织、关系、nomenclature | 不规定 David 的完整 type enum | typed inventory 是 IA 输入 | High |
| A-IA-10 | [NN/g — Taxonomy 101](https://www.nngroup.com/articles/taxonomy-101/)；authoritative；2022-07-03 | Taxonomy/metadata 是支持一致分类与检索的 backstage structure | 小产品不一定需要正式 taxonomy | canonical term、synonym、metadata 分离 | High |
| A-IA-20 | [NN/g — Affinity Diagramming](https://www.nngroup.com/articles/affinity-diagram/)；authoritative；2024-04-26 | 可聚类 research findings/design ideas；团队协作促进讨论 | AI 单独聚类不是用户/团队证据 | 仅作为 inferred working clusters | Medium-High |

完整 Claim–Evidence 见 `../sources/agent_a_ia_evidence.md` 的 A-CL-001、A-CL-003、A-CL-008。

## 3 正例

> 以下均为 synthetic evaluation cases，不是用户研究证据。

1. 从“用户批准 Blueprint 后导出给 coding agent”提取 `Blueprint` object、`approve/export` actions、`approval/export` capabilities、`draft/approved/export_failed` states、`coding_agent` role 和 repository dependency；没有创建“Export 页面”。
2. 现有 PRD 同时写 “Project” 和 “Workspace”。输出保留两条 source，提出 alias hypothesis 并标 `conflicting`，等待领域语义确认，而不是按字符串直接合并。
3. Scope 切掉 collaboration，但 export 仍依赖 repository access。Inventory 保留 excluded collaboration 与 active repository dependency，使 Scope validator 能看到真实边界。

## 3 反例

> 以下均为 synthetic failure cases。

1. 把 `Create/Review/Approve/Export` 四个 capabilities 直接变成四个 global-nav pages。
2. 只列 `Project、Dashboard、Settings`，没有 actions、states、roles、permissions 或 dependencies，且把 UI container 当领域对象。
3. AI 将自己的 affinity clusters 标成 “users naturally group these items”，伪造 Card Sorting 证据。
