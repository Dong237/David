# Skill: generate_mental_model_hypotheses

## Purpose

基于用户词汇、任务、现有替代、产品惯例和可用证据，提出 1–3 个用户可能如何理解信息空间的 Mental-Model hypotheses，明确 supporting cues、反证、风险、置信度与验证方法。该 Skill 生成可检验假设，不生成“真实用户结论”。

## Trigger

- Intent 与初始 Inventory 足以开始组织推理；
- 同一能力可按 task/object/lifecycle/role/goal 等多种方式理解；
- 新用户研究、analytics、Card Sorting 或支持数据到达；
- 用户拒绝 organizing principle，或 Flow 暴露认知错位；
- Existing-product redesign 中现有 IA 与用户词汇/行为冲突。

## Inputs

**Required**

- `intent_models`、`inventory_snapshot_id`；
- `user_vocabulary` 与来源；
- `platform/product_type`、constraints；
- `evidence_refs`，可为空但必须显式。

**Optional**

- interviews、Card Sorting、Tree Testing、analytics/search logs/support patterns；
- 现有产品与替代工具的术语/结构；
- target-user experience level、roles、task frequency；
- rejected/confirmed hypotheses 与 Decision Records。

## Method

1. 对输入证据按类型分层：actual-user evidence、user/founder statement、established pattern、AI inference。
2. 提取 cues：用户名词/动词、任务顺序、对象 identity、生命周期、频率、角色边界、既有工具 transfer。
3. 只生成具有不同预测的 hypotheses，例如 task-based、object-based、lifecycle-based、goal-based、role-based 或 hybrid；不要只换标签。
4. 对每项说明：用户会把什么放在一起、会去哪里找、为何可能成立、何处会失败。
5. 记录 disconfirming evidence 与 segment variation；必要时保留多个 models，而非平均成一个。
6. 将 Card Sorting 作为发现线索，将 Tree Testing/Usability Testing 作为结构/任务评估；没有参与者数据时只写 validation plan。
7. 输出 recommendation readiness：`ready_for_candidates / blocked_by_user_fact / needs_research`。

## Rules

1. 名称必须是 `mental_model_hypothesis`，除非有真实研究 evidence IDs。
2. `confirmed` 只表示用户接受该设计方向，不等于目标群体实际 mental model。
3. Competitor convention 与 platform pattern 只能标 `knowledgeStatus=inferred, basisType=pattern`。
4. Card Sorting 数据需要记录参与者 context、card set、method、analysis 和 limitations；AI 模拟不计。
5. Hypotheses 必须产生可区分的 grouping/findability prediction，否则合并。
6. Role-based hypothesis 必须检查 role overlap、跨角色任务和内容重复。
7. Hybrid model 必须说明每一层用何种 scheme，避免随意不一致。
8. 高置信必须有直接相关的用户证据；仅有模式资料最高 `medium`。
9. 每项必须有至少一个 falsifiable validation task 和 `what_would_change`。
10. 新证据冲突时不得覆盖旧记录；将旧 hypothesis 标 superseded/contradicted 并保留决策历史。

## Anti-patterns

- “AI 熟悉 SaaS，所以用户一定按 Projects/Settings 理解”；
- 把 founder 认可写成 “validated mental model”；
- 用 synthetic persona 或 LLM respondent 生成伪 Card Sorting 数据；
- 提出三个同构方案，只改变名词；
- 将所有 cues 拼成无规则 hybrid；
- 忽略 segment/role 差异和反证。

## Structured Output

```yaml
skill_id: generate_mental_model_hypotheses
hypothesis_set_id: MM-SET-001
inventory_snapshot_id: INV-SNAP-001
hypotheses:
  - hypothesis_id: MM-001
    name: object_based
    statement: "用户可能围绕持续存在的项目和蓝图理解产品"
    expected_groupings: []
    findability_predictions: []
    supporting_cues:
      - cue: ""
        source_ids: []
        evidence_type: user_research|user_statement|behavior_data|pattern|ai_inference
    disconfirming_cues: []
    segment_variations: []
    benefits: []
    risks: []
    provenance:
      knowledgeStatus: inferred|conflicting
      basisType: source_evidence|pattern|model_inference|synthetic_evaluation
      lifecycleStatus: active|rejected|locked|stale|superseded
      sourceIds: []
    confidence: low|medium|high
    validation:
      method: open_card_sort|closed_card_sort|tree_test|usability_test|interview
      task_or_question: ""
      success_signal: ""
    what_would_change: ""
recommendation_for_candidate_generation:
  primary_hypothesis_id: MM-001
  alternatives_to_carry_forward: []
  readiness: ready_for_candidates|blocked_by_user_fact|needs_research
assumptions: []
```

## Validation

**Deterministic**

- 1–3 hypotheses；每项有 supporting cue、risk、confidence、validation 和 `what_would_change`；
- `basisType=source_evidence` 且 `confidence=high` 必须引用实际用户/行为 evidence；
- AI/synthetic inputs 不得标 `user_research`；
- hypotheses 引用同一 inventory snapshot；
- role-based 包含 overlap 检查，hybrid 包含 layer rule。

**Expert review**

- hypotheses 是否真正不同且可证伪；
- cues 与预测之间是否有合理推导；
- 是否过度依赖竞品/惯例或忽略反证；
- validation method 是否回答对应问题。

**User research**

- Open Card Sorting 发现分组与词汇；
- Closed Card Sorting 比较已知 categories；
- Tree Testing 评估 hierarchy/labels/findability；
- Usability Testing 评估完整 context 下的任务；
- 结果只在对应参与者、任务和产品范围内升级 confidence。

## Default Autonomy

`APPLY_WITH_UNDO`（L1）：生成和更新 hypotheses 可自动展示并撤销。将某 hypothesis 设为 Candidate IA 的默认依据仍是可逆推荐；将其宣布为已验证事实必须 `RESEARCH_OR_TEST`，不能靠 approval 替代证据。

## Must Ask

- 目标用户/角色定义是 user-exclusive 且不同答案导致完全不同 models；
- 用户使用的领域术语有互斥含义；
- 现有证据相互冲突且决定哪个 segment 优先属于产品 Bet；
- 一个 locked organizing principle 与新证据直接冲突，需要用户决定是否解锁。

## Approval

- 替换已批准的 top-level organizing principle；
- 因新 hypothesis 移动 core module 或改变 required path；
- 合并/删除已批准的 segment-specific model；
- 在没有研究证据时，将 hypothesis 作为不可逆产品承诺。

## When Not to Use

- 用户要求实际 Card Sorting/Tree Testing 结果而当前没有参与者数据；
- Inventory 尚缺 core objects/capabilities，无法产生有意义预测；
- 只需检查已有标签的清晰度，应使用 Label Skill；
- 问题是具体屏幕交互或视觉 hierarchy，而非信息空间理解；
- 已有强证据只支持一个 model，可压缩本 Skill，但仍须记录 hypothesis/provenance。

## Sources

| Evidence | Source / type / URL / date | Supported point | Limitation | David use | Confidence |
|---|---|---|---|---|---|
| A-IA-03 | [NN/g — Mental Models](https://www.nngroup.com/articles/mental-models/)；authoritative；2024-01-26 | Mental model 是用户对系统的信念，用于预测系统行为 | 不验证 David 的模型 | 强制 hypothesis honesty | High |
| A-IA-04 | [NN/g — Card Sorting](https://www.nngroup.com/articles/card-sorting-definition/)；authoritative；2024-02-02 | 参与者按对其有意义的标准分组卡片，可发现 mental-model 线索 | 受参与者、cards、任务与分析影响 | 发现方法；AI grouping 不得冒充结果 | High |
| A-IA-05 | [NN/g — Card Sorting vs. Tree Testing](https://www.nngroup.com/articles/card-sorting-tree-testing-differences/)；authoritative；2024-02-23 | Card Sort 生成组织思路，Tree Test 评估结构 | 不测试完整 UI | 分离 hypothesis generation 与 validation | High |
| A-IA-14 | [NN/g — Audience-Based Navigation](https://www.nngroup.com/articles/audience-based-navigation/)；authoritative；2015-09-07 | 非互斥角色会增加 role-based IA 的负担 | 不是绝对禁令 | Role hypothesis 必查 overlap | Medium-High |

完整 Claim–Evidence 见 `../sources/agent_a_ia_evidence.md` 的 A-CL-004、A-CL-005、A-CL-011。

## 3 正例

> 以下均为 synthetic evaluation cases，不是用户研究证据。

1. 对项目管理工具提出 object-based（Project→Task→Artifact）和 lifecycle-based（Plan→Build→Review）两个 hypothesis，分别写出用户会去哪里找“失败记录”的预测与 Tree Test task。
2. 实际 Card Sorting 显示新手按任务、专家按对象分组。输出保留 segment variants，不把两组平均成混乱 hybrid。
3. 只有竞品惯例时，提出 “desktop project-based pattern” 并标 `knowledgeStatus=inferred, basisType=pattern, confidence=medium`，明确用户访谈和 Tree Test 可推翻它。

## 3 反例

> 以下均为 synthetic failure cases。

1. 让 LLM 扮演 20 个用户排序卡片，然后声称“80% 用户选择 object-based”。
2. 用户点击批准 Candidate A 后，把其 mental model 改成 `basisType=source_evidence, confidence=high`，尽管没有真实用户证据。
3. 同时生成 task/object/lifecycle/role hybrid，却没有说明各层规则，任何 item 都可随意放置，无法验证。
