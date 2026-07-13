# Skill: generate_candidate_ia

## Purpose

基于同一 Intent、Inventory snapshot、constraints 与 Mental-Model hypotheses，生成少量真正不同的 IA 候选，比较 grouping、relationships、labels、top-level spaces、core-flow effects、scope effects 和 risks，并给出可推翻的推荐。该 Skill 生成结构方案，不直接选择 UI navigation component。

## Trigger

- Gate to Candidate IA 已满足：target-user hypothesis、core progress、initial inventory、platform 和 major constraints 存在；
- 存在两种以上有意义的 organizing schemes；
- 用户拒绝当前结构、核心 Flow 不可达或新证据推翻 organizing principle；
- Existing-product redesign 需要比较 current IA 与 alternative；
- 新 capability/segment 使当前 IA 扩展性明显下降。

## Inputs

**Required**

- `intent_ids`、`inventory_snapshot_id`；
- `mental_model_hypothesis_ids`；
- `constraints`、`scope_context`、`platform`；
- `critical_task_ids`、`locked_node_ids`、`rejected_decisions`。

**Optional**

- Card Sorting、Tree Testing、Usability/Analytics evidence；
- current IA、navigation、flows；
- user vocabulary、future-growth assumptions、roles/permissions；
- technical feasibility notes。

## Method

1. 冻结比较输入：所有候选引用同一 `inventory_snapshot_id`、critical tasks、constraints 和 scope assumptions。
2. 选择能产生不同查找预测的 organizing schemes：task/object/lifecycle/goal/topic/role/frequency/hybrid；无意义差异不生成。
3. 将 inventory items 分配到 canonical groups，记录 unresolved、intentional exclusion 与 multiple-placement candidates。
4. 为每个候选建立 top-level 与 child relationships；不把 capability 自动变 page。
5. 评估：intent fit、coverage、exclusivity/overlap、granularity、information scent、findability prediction、flow coherence、growth、scope、feasibility。
6. 对 ambiguous item 优先记录 placement alternative；仅在有证据时提出 polyhierarchy，始终保持单一 canonical ID。
7. 形成 recommendation、trade-offs、confidence、assumptions 和 `what_would_change`。
8. 若差异需要用户证据而非偏好，输出 `RESEARCH_OR_TEST`，优先 Tree Testing/Usability，而不是让用户凭审美投票。

## Rules

1. 所有候选必须使用同一 inventory snapshot；遗漏必须是显式 `intentional_exclusion`。
2. 默认生成 2 个、最多 3 个只是 provisional interaction heuristic；只有一个合理方案时不制造伪选项，探索需求更大时可内部生成更多再筛选。
3. 候选必须至少在 organizing principle、placement 或 flow prediction 上有实质差异。
4. Top-level group 代表稳定、高价值的信息空间，不等于每项 capability。
5. 每个 P0 item 至少有一个 home；orphan、duplicate 与 overlap 都必须说明。
6. Sibling granularity 应可比较；混合 scheme 必须声明层级规则。
7. Role-based candidate 必查 role overlap；frequency-based candidate 不得埋藏 rare-but-critical tasks。
8. Polyhierarchy 只增加 placement，不复制 canonical state。
9. 推荐不能只看“更简洁”；必须检查 core flow、scope dependencies 与 future growth。
10. Expert recommendation 是 `pattern_based/inferred`；实际 findability 只能由 Tree Testing/Usability evidence 支持。

## Anti-patterns

- Candidate A/B 采用不同 inventory，导致 A 看似更简单；
- 三个候选只更换标签或导航样式；
- 让用户选择 sidebar/tabs 代替 IA 比较；
- 按组织部门或技术服务分组，未连接用户 task/object；
- 为每项 feature 创建 top-level node；
- 为“保险”把大量 item 放入多个父级，破坏 wayfinding。

## Structured Output

```yaml
skill_id: generate_candidate_ia
candidate_set_id: IA-SET-001
input_snapshot:
  inventory_snapshot_id: INV-SNAP-001
  intent_ids: []
  mental_model_hypothesis_ids: []
  constraint_ids: []
  critical_task_ids: []
candidates:
  - candidate_id: IA-CAND-001
    name: object_based
    organizing_principle: ""
    layer_rules: []
    root_node_ids: []
    nodes:
      - node_id: IA-NODE-001
        label_candidate: ""
        parent_ids: []
        inventory_item_ids: []
        rationale: ""
    intentional_exclusions: []
    unresolved_item_ids: []
    multiple_placement_proposals: []
    evaluation:
      intent_fit: strong|mixed|weak
      coverage: complete|partial
      overlap_risk: low|medium|high
      granularity_consistency: strong|mixed|weak
      information_scent: strong|mixed|weak
      flow_coherence: strong|mixed|weak
      extensibility: strong|mixed|weak
      scope_fit: strong|mixed|weak
      feasibility: strong|mixed|weak
    benefits: []
    risks: []
    assumptions: []
    confidence: low|medium|high
comparison_summary: []
recommendation:
  candidate_id: IA-CAND-001
  rationale: ""
  what_would_change: ""
  autonomy_action: APPLY_WITH_UNDO|PROPOSE_FOR_APPROVAL|RESEARCH_OR_TEST
validation_plan: []
```

## Validation

**Deterministic**

- 候选共享完全相同的 input snapshot；
- P0 inventory coverage 完整或显式 unresolved/excluded；
- node IDs、parent references、locked nodes、constraints 合法；
- 无意外 cycle；多父级只引用一个 canonical item；
- 每个候选包含 rationale、risks、assumptions、confidence；
- recommendation 引用候选集合内 ID。

**Expert rubric**

- organizing principle 是否可解释且层级一致；
- 候选是否有实质区别、比较是否公平；
- 信息气味、重叠、增长、Flow 与 Scope trade-off 是否完整；
- 是否错误用 UI pattern 替代 IA。

**External validation**

- Open Card Sorting 发现 grouping；Closed Card Sorting 比较 categories；
- Tree Testing 比较 critical items 的 success/directness/path；
- Usability Testing 验证 context、navigation UI 与 dynamic flows；
- 不以 founder 投票替代 evidence-dependent truth。

## Default Autonomy

生成、比较和推荐候选为 `APPLY_WITH_UNDO`（L1）。创建 candidate 不改 canonical selected IA；选择或替换 top-level IA 默认为 `PROPOSE_FOR_APPROVAL`（L2）。若差异取决于真实 findability，使用 `RESEARCH_OR_TEST`。

## Must Ask

- 哪个 target segment / core outcome 优先是 user-owned Bet，且不同答案使候选不可比较；
- constraints/locked decisions 冲突，无法生成至少一个可行方案；
- 业务对象的 canonical identity 不明确并会造成数据/权限边界变化；
- 用户要求的 scope cut 使所有候选都无法支持 core flow。

## Approval

- 设定或替换 Selected IA；
- 新增/删除 top-level space；
- 移动 core module、改变 required path 或 P0 scope；
- 解锁、归档、合并或拆分已确认节点；
- 引入会导致高 downstream rework 的 organizing principle。

## When Not to Use

- Inventory 或 Intent gate 未满足；
- 只需修一个 label、局部 hierarchy 或 navigation component；
- 已有强证据与 locked structure，且没有有意义的替代；
- 用户要求视觉布局或 wireframe；
- 问题是 technical/service architecture，而不是用户如何理解和查找。

## Sources

| Evidence | Source / type / URL / date | Supported point | Limitation | David use | Confidence |
|---|---|---|---|---|---|
| A-IA-01 | [NN/g — IA vs. Sitemaps](https://www.nngroup.com/articles/information-architecture-sitemaps/)；authoritative；2023-09-03 | IA 包含组织、关系、命名与持续维护，不等于 sitemap | 网站语境 | 候选比较完整 IA，不只比 page tree | High |
| A-IA-05 | [NN/g — Card Sorting vs. Tree Testing](https://www.nngroup.com/articles/card-sorting-tree-testing-differences/)；authoritative；2024-02-23 | Card Sort 生成组织思路；Tree Test 评估候选结构 | 不评估完整 UI | 区分 generation 与 validation | High |
| A-IA-06 | [NN/g — Tree Testing](https://www.nngroup.com/articles/tree-testing/)；authoritative；2023-08-06 | 专业 best practice 不能保证分类/标签成立，需任务测试 | 不测视觉交互 | 候选 recommendation 保持 hypothesis | High |
| A-IA-12 | [NN/g — Polyhierarchies](https://www.nngroup.com/articles/polyhierarchy/)；authoritative；2018-05-13 | 多父级可支持多种查找模型，但会增加 wayfinding 成本 | 主要电商案例 | canonical identity 与 placements 分离 | Medium-High |

完整 Claim–Evidence 见 `../sources/agent_a_ia_evidence.md` 的 A-CL-001、A-CL-006、A-CL-009。

## 3 正例

> 以下均为 synthetic evaluation cases，不是用户研究证据。

1. 对 AI study coach 用同一 inventory 比较 task-based（Plan/Practice/Review）与 object-based（Courses/Sessions/Mistakes），说明“查看错题”在两者的查找预测和 Flow 影响。
2. 只有一个结构同时满足 locked constraints 与 core flow，输出一个推荐并说明 rejected alternatives，不制造三张同构卡。
3. “Mistake”合理出现在 Practice 与 Progress。输出一个 canonical object、两个 proposed placements、breadcrumb 风险和 Tree Test，而不是复制数据。

## 3 反例

> 以下均为 synthetic failure cases。

1. Candidate A 含全部能力，Candidate B 删除复杂能力后显得更清晰，却未标 intentional exclusion。
2. Candidate A 是 sidebar、B 是 tabs、C 是 bottom nav；比较的是 UI pattern，不是 IA。
3. 因希望“给用户更多选择”生成三个仅把 `Analytics` 改成 `Insights/Progress/Reports` 的候选。
