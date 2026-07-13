# Skill: review_labels_information_scent

## Purpose

检查 visible labels 是否让目标用户在当前上下文中预测目的地、内容或动作，并确保目的地兑现标签承诺。该 Skill 输出风险、替代标签、rationale 与验证计划，不把专家判断冒充真实 label comprehension。

## Trigger

- 新增、重命名或移动 IA/navigation node；
- Candidate IA 进入选择/评审；
- 出现 vague label、内部术语、同义冲突或 sibling ambiguity；
- Tree Testing、搜索日志、support 或 usability evidence 显示误找；
- 多语言、本地化或 out-of-context 使用改变标签理解；
- Destination content/功能改变，旧标签可能不再 sincere。

## Inputs

**Required**

- `node_id`、current label、destination summary；
- sibling labels、parent context、entry context；
- `user_vocabulary`、intent IDs、provenance；
- constraints：brand/legal/regulated terms、character/space limits。

**Optional**

- alternate labels、synonyms、search queries/support terms；
- Card Sorting/Tree Testing/label test/usability results；
- locale、screen reader/out-of-context use；
- existing canonical term、locked label、translation notes。

## Method

1. 建立 label promise：用户看到该词会期待什么；与 destination actuality 比较。
2. 用 Information Scent 检查 label + parent/sibling/context cues，而非只评词本身。
3. 用 4Ss rubric：Specific、Sincere、Substantial、Succinct；清晰优先于强行平行。
4. 检查 user vocabulary、领域歧义、内部 jargon、格式/部门名、重复标签和 translation risk。
5. 检查 siblings 的区分度与 abstraction level，避免 “Resources/More/Management/Explore” 等弱气味容器。
6. 生成最多 3 个实质不同的 alternatives，逐项说明 promise、trade-off 与受影响 references。
7. 低风险次级标签可 reversible rename；核心概念或无证据争议转 `PROPOSE_FOR_APPROVAL`/`RESEARCH_OR_TEST`。

## Rules

1. Label 必须与 destination fulfillment 一起审查；语法好但目的地不兑现仍失败。
2. 用户词汇优先于内部 team/department/implementation jargon，但受 brand/legal 约束时记录例外。
3. Specific、Sincere、Substantial、Succinct 是 expert rubric，不是用户验证结果。
4. 清晰优先于所有 sibling 使用同一词性或长度。
5. 动词适合明确 task；空泛 CTA（Explore/Learn/Connect）不自动提供 task scent。
6. 同一可见范围内的重复 label 必须说明不同 destination，否则触发 Warning。
7. Label 应能在合理脱离上下文时仍表达目的地；必要时依靠短 context cue，而不是无限加长。
8. Canonical term、visible label、alias/synonym 分开；rename 不改变 object identity。
9. 核心 label 的“用户理解”只能由 label/tree/usability evidence 支持。
10. 多语言时检查 translation collision、长度与本地领域用词，不以英文 expert review 代替。

## Anti-patterns

- 只因为短就选择 `More`、`Resources`、`Management`；
- 为语法平行把清晰名词改成空泛动词；
- 用产品团队术语作为用户导航；
- 只看 label，不看 destination 和 siblings；
- 用户批准一次就声称“目标用户理解”；
- 自动修改 brand/legal/core-domain term。

## Structured Output

```yaml
skill_id: review_labels_information_scent
review_id: LABEL-REV-001
node_id: IA-NODE-001
current:
  visible_label: ""
  canonical_term: ""
  destination_summary: ""
  parent_label: ""
  sibling_labels: []
  context_cues: []
assessment:
  specific: pass|risk|fail
  sincere: pass|risk|fail
  substantial: pass|risk|fail
  succinct: pass|risk|fail
  user_vocabulary_fit: strong|unknown|weak
  sibling_distinctness: strong|mixed|weak
  abstraction_consistency: strong|mixed|weak
  out_of_context_clarity: strong|mixed|weak
  accessibility_locale_risks: []
  promise_fulfilled: true|false|unknown
issues:
  - issue_id: LABEL-ISS-001
    severity: Blocker|Warning|Recommendation
    evidence_type: user_evidence|pattern|expert_heuristic
alternatives:
  - label: ""
    expected_promise: ""
    rationale: ""
    tradeoffs: []
recommendation:
  label: ""
  confidence: low|medium|high
  provenance:
    knowledgeStatus: confirmed|inferred|unknown|conflicting
    basisType: user_input|source_evidence|pattern|model_inference|synthetic_evaluation
    lifecycleStatus: active|rejected|locked|stale|superseded
    sourceIds: []
  action: AUTO_APPLY|APPLY_WITH_UNDO|PROPOSE_FOR_APPROVAL|RESEARCH_OR_TEST
affected_reference_ids: []
validation_plan: []
```

## Validation

**Deterministic**

- label 非空，无同级完全重复且不同 destination 的未解释冲突；
- recommendation 保留 canonical node ID；
- locked/brand/legal label 不得自动修改；
- rename ChangeSet 更新 navigation、flows、wireframes、AC 和 handoff references；
- `basisType=source_evidence` 有实际 label/tree/usability evidence ID。

**Expert review**

- 4Ss、information scent、sibling distinctness、granularity、jargon 与 promise fulfillment；
- alternatives 是否真的更清晰而非只更短；
- context cue 是否补充而非替代弱标签。

**User validation**

- Label comprehension test：用户预测 destination；
- Tree Testing：无视觉树中完成目标 task；
- Usability Testing：真实 context 下选择、返回和纠错；
- Search/support language 用作词汇线索，不单独证明 navigation success。

## Default Autonomy

`APPLY_WITH_UNDO`（L1）用于可逆次级 label rename；仅检测/生成 alternatives 可 `AUTO_APPLY`。Top-level、core-domain、brand/legal、locked label 默认为 `PROPOSE_FOR_APPROVAL`；真实理解问题用 `RESEARCH_OR_TEST`。

## Must Ask

- 术语是 brand/legal/contractual commitment，只有用户知道必须保留的措辞；
- 同一用户词在领域中有互斥含义，会改变 object identity；
- 多语言/地区术语选择属于目标市场承诺且无可靠 evidence；
- 现有 user evidence 与 locked founder term 冲突，需要决定约束优先级。

## Approval

- 改名 top-level navigation、core object 或 required-path action；
- 修改 brand/legal/regulated/locked label；
- rename 会影响数据模型、API 或外部文档语义，而不只是 visible label；
- 因 label review 导致 node split/merge/move。

## When Not to Use

- 问题是 category membership、parent-child logic 或 metadata，应使用 Hierarchy/Taxonomy Skill；
- 问题是 navigation component/placement，应使用 Navigation Skill；
- destination 本身尚未定义，先完成 Inventory/Node mini-IA；
- 用户要求真实 findability 结论但没有研究，应运行 Tree Testing/Usability，而不是继续 expert rewrite；
- 纯营销 headline、tone-of-voice 或 long-form content 编辑不属于 IA label review。

## Sources

| Evidence | Source / type / URL / date | Supported point | Limitation | David use | Confidence |
|---|---|---|---|---|---|
| A-IA-07 | [NN/g — Information Scent](https://www.nngroup.com/articles/information-scent/)；authoritative；2020-02-02 | 用户依据 label、context 和经验预测目的地价值 | 不证明具体词有效 | Label + context + destination 联合检查 | High |
| A-IA-08 | [NN/g — Better Link Labels](https://www.nngroup.com/articles/better-link-labels/)；authoritative；2019-03-24 | Specific、Sincere、Substantial、Succinct | 主要针对 links，领域/语言需重测 | 4Ss expert rubric | High |
| A-IA-09 | [NN/g — 3 Common IA Mistakes](https://www.nngroup.com/articles/3-ia-mistakes/)；authoritative；2023-04-16 | 模糊 CTA、forced parallel wording、空泛对话式 labels 降低 scent | 案例性专业证据 | Anti-pattern detector | Medium-High |
| A-IA-06 | [NN/g — Tree Testing](https://www.nngroup.com/articles/tree-testing/)；authoritative；2023-08-06 | 专业设计仍需任务测试标签/分类 | 不测试完整视觉 UI | 核心 label 外部验证 | High |

完整 Claim–Evidence 见 `../sources/agent_a_ia_evidence.md` 的 A-CL-007。

## 3 正例

> 以下均为 synthetic evaluation cases，不是用户研究证据。

1. `Management` 的 destination 实际是账户成员、账单和权限。输出不做单词替换，而是指出容器混杂，建议拆分 `Team & permissions` / `Billing` 并升级为 hierarchy review。
2. `Explore` 指向模板目录。建议 `Templates`，说明 destination promise、sibling 区分和可逆 rename，标 `knowledgeStatus=inferred, basisType=pattern`，而非声称用户一定理解。
3. 法律要求保留 `Data Subject Access Request`。输出不自动改名，建议 visible plain-language cue + canonical legal term，并请求用户确认法务约束。

## 3 反例

> 以下均为 synthetic failure cases。

1. 为了简短把 `Account & Billing` 改成 `More`。
2. 为了平行，将 `Projects / Templates / Billing` 改成 `Build / Explore / Manage`，降低区分度。
3. Tree Test 失败后只改 label，却不检查 parent category 和 destination content，随后宣称问题已解决。
