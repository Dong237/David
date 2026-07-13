# Skill: review_hierarchy_taxonomy

## Purpose

审查 parent-child logic、sibling granularity、coverage、overlap、depth/breadth、canonical terms、metadata、facets、polyhierarchy 和 growth，确保结构支持查找与一致分类。该 Skill 不以固定层数或“三次点击”判断质量。

## Trigger

- Candidate IA 或 Selected IA 形成/发生 structural change；
- 新对象、内容、角色或产品线加入；
- 出现 orphan、duplicate、catch-all、mixed granularity 或过宽/过深分支；
- Tree Testing 显示 wrong branch、backtracking 或 ambiguous placement；
- 搜索、filter、recommendation 需要 formal taxonomy/metadata；
- 多个 navigation placements 可能引用同一 canonical object。

## Inputs

**Required**

- `ia_candidate_or_selected_id`、node graph；
- `inventory_snapshot_id`、intent/critical task IDs；
- canonical terms、visible labels、constraints、scope；
- locked nodes/relations 与 current Decision Records。

**Optional**

- taxonomy terms、synonyms、facets、metadata rules；
- Card Sorting/Tree Testing/usability/search evidence；
- growth assumptions、local navigation、breadcrumbs；
- role/permission variants、locale requirements。

## Method

1. 做 graph integrity：roots、parents、children、cycles、orphans、duplicate identity。
2. 检查 coverage 与 exclusivity：每个 P0 item 是否有 home；overlap 是有意 polyhierarchy 还是概念混乱。
3. 检查 parent-child semantics 与 sibling granularity；parent 必须能概括 children。
4. 评估 breadth/depth trade-off，不使用 click-count；关注 sibling scanning、path ambiguity、orientation 和 growth。
5. 分离 taxonomy 与 navigation：canonical term、synonym、metadata/facet、visible label、navigation placement 各自建模。
6. 对 ambiguous item 检查是否存在多种有证据的合理查找路径；若是，提出 restrained polyhierarchy，保留 canonical ID 和 canonical path。
7. 检查 progressive disclosure：仅后置低频/高级内容，不埋藏 rare-but-critical capability。
8. 运行 critical-task Tree Test plan；若问题依赖完整 UI/context，再转 Usability Testing。
9. 输出 ChangeSet 及 cascade impacts：navigation、flows、wireframes、scope、AC、handoff。

## Rules

1. 不设固定最大深度、最大 children 或三次点击 Blocker；阈值若使用必须是产品 heuristic 并可配置。
2. Parent-child 必须是可解释的 `is-a / part-of / belongs-to / stage-of / task-under` 关系，不能混搭无规则。
3. Siblings 应在相近 abstraction level；对象、动作、角色、格式混列需显式 rationale。
4. Catch-all (`Other/More/Resources/Management`) 只能是暂存 Warning，不得成为未分类项永久归宿。
5. Taxonomy 是 backstage rules；visible navigation 可使用不同但可追溯的 labels。
6. Polyhierarchy 复制 placement，不复制 object/state；必须记录 canonical parent/path 与 wayfinding trade-off。
7. 深结构需要 current-location/nearby cues；浅结构也需避免过量 sibling scanning。
8. Role/permission variation 不能静默生成多套不一致 IA；共享 canonical nodes，显式 visibility/access rules。
9. Scope 外 dependencies 仍需可见，以防 P0 branch 隐性断裂。
10. Tree Test 只能证明相应 tasks/participants 下的 structure/label performance，不能证明视觉导航或完整 Flow。

## Anti-patterns

- 以“三次点击”强行压平结构；
- 为减少 top-level 数量把关键 node 塞入不真诚 parent；
- 同一对象复制成多个独立 node 和状态；
- 把 visible menu 当 taxonomy 全部；
- 只按 organization chart/engineering services 建层级；
- 过度 cross-reference，让每项出现在所有“可能相关”类别。

## Structured Output

```yaml
skill_id: review_hierarchy_taxonomy
review_id: HIER-REV-001
ia_id: IA-CAND-001
inventory_snapshot_id: INV-SNAP-001
graph_checks:
  cycles: []
  orphan_node_ids: []
  missing_parent_ids: []
  duplicate_identity_groups: []
coverage:
  p0_covered: []
  p0_missing: []
hierarchy_issues:
  - issue_id: HIER-ISS-001
    node_ids: []
    type: parent_child|mixed_granularity|overlap|breadth|depth|orientation|growth
    severity: Blocker|Warning|Recommendation
    rationale: ""
taxonomy:
  terms:
    - term_id: TERM-001
      canonical_term: ""
      visible_labels: []
      synonyms: []
      metadata_rules: []
      facet_ids: []
placements:
  - canonical_node_id: IA-NODE-001
    parent_ids: []
    canonical_parent_id: IA-NODE-000
    evidence_ids: []
    wayfinding_risk: ""
proposed_change_set: []
cascade_impacts:
  navigation_ids: []
  flow_ids: []
  wireframe_ids: []
  scope_ids: []
  acceptance_criteria_ids: []
  handoff_refs: []
validation_plan: []
confidence: low|medium|high
```

## Validation

**Deterministic**

- 无非法 cycles、dangling parents、duplicate canonical IDs；
- P0 items 有 home；locked nodes/relations 未被改；
- multiple placements 共享 canonical ID；
- canonical term/visible label/synonym references 可追溯；
- ChangeSet cascade references 完整；
- 不存在仅以 click/depth 数字生成的 Blocker。

**Expert review**

- parent-child semantics、sibling granularity、breadth/depth、growth；
- taxonomy 是否必要且不过度；
- polyhierarchy 的 findability benefit 是否大于 wayfinding cost；
- progressive disclosure 是否隐藏 critical item。

**External validation**

- Card Sorting 发现 grouping 与 terminology；
- Tree Testing 检查 tasks 的 success/directness/path/backtracking；
- Usability Testing 检查 local navigation、breadcrumbs、filters 与完整 context；
- Analytics/search logs 可定位候选问题，不能单独说明因果。

## Default Autonomy

检测、注释和非结构性 taxonomy hygiene 为 `AUTO_APPLY`；可逆次级 reorder、alias、metadata 修复为 `APPLY_WITH_UNDO`（L1）。Major move、split/merge、top-level 或 canonical identity 变化为 `PROPOSE_FOR_APPROVAL`（L2）。

## Must Ask

- canonical identity/业务分类只有领域 owner 能确认；
- regulatory/contractual taxonomy 或 permission boundary 不明确；
- 两项 locked constraints 导致结构无法同时满足；
- segment priority 决定 parent/placement，但当前 Bet 未指定。

## Approval

- 移动 core module、改变 top-level hierarchy 或 required path；
- split/merge/archive confirmed/locked node；
- 改变 canonical term 的业务语义；
- 新增 polyhierarchy 导致 breadcrumb/canonical path 变化；
- taxonomy change 会重分类已发布内容或改变权限/外部接口。

## When Not to Use

- 仅评可见 label 清晰度，不涉及 membership/relationship；
- 仅选择 sidebar/tabs/search component；
- 产品规模很小、无检索/多分类需求时，不应为了“专业”建立正式 taxonomy；
- 问题是屏幕内部视觉 hierarchy；
- 需要真实用户分组结论时，应运行 Card Sorting，而非 AI 重排。

## Sources

| Evidence | Source / type / URL / date | Supported point | Limitation | David use | Confidence |
|---|---|---|---|---|---|
| A-IA-10 | [NN/g — Taxonomy 101](https://www.nngroup.com/articles/taxonomy-101/)；authoritative；2022-07-03 | Taxonomy 是配合 visible navigation 的 backstage metadata rules | 不是所有产品都需正式 taxonomy | term/label/metadata/placement 分离 | High |
| A-IA-11 | [NN/g — Flat vs. Deep Hierarchies](https://www.nngroup.com/articles/flat-vs-deep-hierarchy/)；authoritative；2013-11-10 | Flat/deep 各有优缺点；深层更需 orientation | 经典网站语境 | 不设固定深度；检查 wayfinding | Medium-High |
| A-IA-12 | [NN/g — Polyhierarchies](https://www.nngroup.com/articles/polyhierarchy/)；authoritative；2018-05-13 | 多父级支持多种查找模型，但增加认知/wayfinding 成本 | 主要电商案例 | restrained placement + canonical identity | Medium-High |
| A-IA-15 | [NN/g — 3-Click Rule Is False](https://www.nngroup.com/articles/3-click-rule/)；authoritative；2019-08-11 | 三次点击规则无数据支撑并会推动过宽导航 | 不表示深度无成本 | 禁止 click-count Blocker | High |
| A-IA-06 | [NN/g — Tree Testing](https://www.nngroup.com/articles/tree-testing/)；authoritative；2023-08-06 | 以无视觉文本树和任务评估 hierarchy/labels | 不测完整 UI | hierarchy 外部验证 | High |

完整 Claim–Evidence 见 `../sources/agent_a_ia_evidence.md` 的 A-CL-008、A-CL-009。

## 3 正例

> 以下均为 synthetic evaluation cases，不是用户研究证据。

1. 发现 `Templates` 同时在 `Create` 与 `Library` 下。输出保留一个 canonical node、两个 evidence-dependent placements、canonical breadcrumb 风险与 Tree Test plan。
2. 一支分支四层但每层标签清晰、任务直达；不因深度给 Blocker，只建议 local navigation/breadcrumb 并验证 orientation。
3. 小型 MVP 只有六个稳定对象且无搜索/facets。输出明确“不需要正式 taxonomy”，只维护 canonical terms 和 aliases。

## 3 反例

> 以下均为 synthetic failure cases。

1. 为满足三次点击，将 40 个异质节点全部放到顶层。
2. 为支持多个入口复制 `Blueprint` 为三份对象，审批状态彼此分叉。
3. 把 `Projects / Export / Admin / PDF` 作为 siblings，未解释对象、动作、角色和格式的混合粒度。
