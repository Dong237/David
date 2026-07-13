# 13 - Independent Critic Review

> 审查角色：Independent Research Critic  
> 审查日期：2026-07-10  
> 审查范围：指定 prompt、`00`、`01`、本研究包全部 top-level Markdown、`sources/`、20 张 `skill_cards/`、5 份 `datasets/`  
> 限制：本文件只审查 Research Pack，不修改 `00`、`01`、产品代码或既有研究文件。

## 1. PASS / FAIL 总结

**总评：FAIL。** 当前包可作为高质量研究草案，但不应作为可直接实现或可直接验收的 v1.0 合同输入。

- P0：0
- P1：3
- P2：3
- 用户指定 12 项审计：8 PASS，3 FAIL，1 UNVERIFIED
- 阻断原因：Autonomy ordered policy 与 seed gold action 不相容；IA Gold seed 违反自己的 locked constraint；多个标为 executable 的 schema 尚未共享同一词汇合同。
- 通过部分：主要 Section 的 Claim-Evidence 覆盖、evidence/provisional/user-research 分层、20 张 Skill Card 的结构完整性、Validator 19 areas、Canvas 7.9、Handoff 7.10、真实用户研究计划均达到研究包级别要求。

## 2. P0 Findings

无。

## 3. P1 Findings

### P1-01 - G7 阴影 G8，AUTO_APPLY seed 无法由当前 policy 稳定复现

**位置：**

- `03_question_budget_and_autonomy.md:96-111`
- `skill_cards/manage_agent_autonomy.md:103-126`
- `datasets/autonomy_case_library.schema.json:8-39,117-138`
- `datasets/autonomy_case_library.seed.jsonl:3,14,18`

**问题：** Policy 声明 ordered first-match。G7 在 G8 前匹配 `impact<=medium + reversibility=easy + low risk + rework<=medium + complete undo`，而 G8 的典型低影响、低不确定性、强证据、低返工决策只要有完整 Undo 就先落入 G7。结果是：安全可逆的 `AUTO_APPLY` 反而会被选成 `APPLY_WITH_UNDO`；G8 主要只在缺少完整 Undo 时才可能到达，这与安全意图相反。三个 gold seed `AUT-003/014/018` 均要求 `AUTO_APPLY`，但 case schema 没有 `undo_is_complete`、Undo scope 或持久性字段，runner 无法确定 G7 是否命中。

**影响：** 同一 case 可因实现者如何推断 Undo 而得到不同 action；六 action 的覆盖统计存在，但 runtime selector 无法稳定通过 seed acceptance。

**建议：** 先判 G8，再判 G7，或把两者写成互斥条件；在 case/schema 增加 `undo_available`、`undo_complete`、`undo_scope`、`undo_persistence`；以 24 条 seed 做 table-driven policy test，并增加“每个 canonical action 至少可达一例”的 reachability assertion。

### P1-02 - IA Gold 的 locked constraint 只有自由文本，且 IA-GOLD-007 已违反自身 Gold oracle

**位置：**

- `05_ia_gold_benchmark_design.md:66-84,88-100`
- `datasets/ia_gold_case.schema.json:53-60`
- `datasets/ia_gold_cases_seed.jsonl:3,6,7`

**问题：** Benchmark 规定 deterministic layer 检查 locked-constraint conflict，但 schema 仅把 `explicit_constraints` 定义为字符串数组，没有 constraint ID、lock status、owner、prohibited operation 或 target refs，无法做稳定的 deterministic comparison。实际 `IA-GOLD-007` 同时写了“不新增顶级导航”、`mvp_scope.excluded=["新顶级导航"]`，却把 `Release Checklist` 放进 `navigation_model.global`；同一记录的 common wrong answer 又明确把“global nav 包含 Checklist”判为 blocker。该 seed 同时是正解和反例。

此外，`recommended_ia.candidate_id` 与最终 `labels_and_hierarchy/navigation_model` 没有可验证映射。`IA-GOLD-003` 推荐 lifecycle candidate，但最终 global navigation 是“复核队列/合同”；`IA-GOLD-006` 的 candidate 包含“监控/分析/汇报”，最终 global 只有“监控/报告”。当前 schema 不能区分“有理由的 candidate refinement”和“Gold 漂移”。

**影响：** Gold benchmark 会奖励 locked-constraint violation，或让不同 evaluator 对同一 seed 给出相反结论；这会直接污染 regression 和验收。

**建议：** 将 constraints 改成 typed records，例如 `{constraintId, statement, status, owner, targetRefs, prohibitedOperations}`；为 selected candidate 增加 group/placement mapping 与 refinement rationale；修复 IA-GOLD-007 的 parent/global placement；对全部 7 条 seed 运行 constraint、candidate-realization、scope 和 oracle self-contradiction checks。修复前不得称这些记录为 Gold。

### P1-03 - Research Pack 发布了彼此不兼容的 executable vocabulary

**位置：**

- `04_pm_skill_registry_research.md:267-300`
- `11_patch_proposal_for_01.md:5-13`
- `12_inputs_for_future_specs.md:3-14`
- `skill_cards/frame_outcome.md:84-100`
- `skill_cards/map_opportunities.md:120-130`
- `skill_cards/orient_product_situation.md:136-145`
- `07_validator_catalog.md:23-31,139-155`
- `skill_cards/compile_handoff_context.md:115-123,508-518,527-533`

**问题：** `11` 和 `12` 已正确要求 knowledge/basis/lifecycle/confidence 正交，但 `04` 的共享建议及多张 executable Skill schema 仍发布混合 `provenance` enum，而且取值不一致：`confirmed`、`confirmed_user_input`、`evidence_backed`、`pattern_based` 等在不同卡中具有不同维度含义。Validator canonical/runtime severity 使用 `Blocker/Warning/Recommendation`，Handoff executable diagnostic 使用小写；没有映射或 shared `$ref`。`compile_handoff_context` 还在六个 canonical `AutonomyDecision` 之外使用未定义的 `MANUAL_ONLY`，未说明它是 execution permission 还是第七种 action。

**影响：** 每份 schema 单独可编译，但跨 Skill、Validator、Handoff 组合时会出现 enum rejection、隐式 normalization 或第七 action 分叉。`11` 把这些列为 must-patch，说明它们不能同时被当作 implementation contract。

**建议：** 在任何 production schema 前冻结一份 versioned shared `$defs`：`KnowledgeStatus`、`BasisType`、`LifecycleStatus`、`Confidence`、`Severity`、`AutonomyDecision`、`ExecutionPermission`；所有 cards/datasets/handoff 只引用该定义。`MANUAL_ONLY` 若保留，应归入独立 execution-permission enum，不得混入 AutonomyDecision。

## 4. P2 Findings

### P2-01 - 主摘要和计划仍把已存在的 20 张卡写成 17 张

**位置：**

- `00_research_plan.md:111-115`
- `01_executive_summary.md:26-35`
- `11_patch_proposal_for_01.md:26`

**问题：** 当前 `skill_cards/` 实际有 20 张，且 `frame_outcome`、`map_opportunities`、`compile_handoff_context` 均存在。计划仍以 17 张为完成标准，Executive Summary 仍声称三个缺口必须补卡；Patch Proposal 又说 20 张已齐。三个状态不能同时为真。

**影响：** Coordinator、实现者和验收者会对完成度做出不同判断。

**建议：** 统一为 `01 §18.2` 的 20 张，删除“文件树只有 17 张”的现状描述；如需保留历史，明确标为 superseded observation 并写时间/版本。

### P2-02 - “00/01 未修改”没有可审计的前置基线

**位置：**

- `00_research_plan.md:111-123`

**问题：** 该行只有声明，没有 before hash、commit ref、read-only manifest 或独立 run log。审查时 `00`、`01` 和整个研究目录均为 Git untracked，`git diff` 无法证明研究角色执行前后没有修改。Critic 窗口内可确认 hash 未变化，但不能追溯本轮前半段。

**影响：** Prompt completion item 只能记为 UNVERIFIED，不能记 PASS。

**建议：** 研究开始时记录 repo commit、`00/01` SHA-256、mtime 和允许写入路径；结束时由 Coordinator 与 Critic分别复算。更可靠的做法是先将基线纳入 Git，再用 path-scoped diff 证明。

### P2-03 - 四个 Cursor 深链当前退化到通用 docs 根页

**位置：**

- `sources/agent_g_handoff_evidence.md:102-110`
- `09_coding_agent_handoff_research.md:44-53`
- `sources/sources.md:53-63`

**问题：** 2026-07-10 的 live HTTP follow-redirect 检查中，四个 `docs.cursor.com/...` 深链均最终落到 `https://cursor.com/docs`，不再稳定定位 Rules、CLI、Checkpoints、Review 的具体页面。搜索索引仍能找到旧内容，因此不是证据内容必然错误，但当前 direct traceability 已退化。

**影响：** Reviewer 无法只靠登记 URL 复核 claim 的 exact supported point。

**建议：** 更新为当前可定位的官方 URL，保存 accessed-at snapshot/hash 或至少记录 final URL；对快速变化的官方 capability source 增加定期 link/content check。

## 5. Completion Checklist

| Requirement | Status | Audit evidence / reason |
|---|---|---|
| 已读取 `00` 和 `01` | PASS（Critic）/ UNVERIFIED（原角色执行） | Critic 已全文读取；Research Pack 无 subagent read log 可证明每个角色均读取 |
| 已创建并行 Subagents | UNVERIFIED | `00_research_plan.md:44-55` 有 A-G 分工，且七份 agent evidence ledger 存在；无 session/run IDs 或并行执行日志 |
| 覆盖 `01` 全部 Open Research / Calibration Needs | PASS | `02_claim_evidence_matrix.md:5-76` 覆盖 Section 0-20；Canvas、Handoff、真实研究和 future inputs 均有独立交付 |
| 每个主要 Section 有 Claim-Evidence；重要 claim 元数据完整 | PASS | Matrix 关联 `SRC-*` 与 A-G ledgers；主要 records 含 title/type/URL/date或access date/supported point/limitation/application/confidence |
| Evidence-backed / Provisional / User Research 分隔 | PASS | `00_research_plan.md:31-42` 定义；`02`、`08`、`09`、`10` 均持续使用；synthetic 与真实研究未混合 |
| 20 个 initial Skills 全部有 trigger/I-O/method/rules/anti-pattern/schema/validation/autonomy/ask/approval/sources/3正3反/when-not-use | PASS | 文件数 20；heading audit 无缺项；每卡至少 3 正、3 反、2 个 authoritative/primary/method-owner source URL（可得时）；12 个 JSON 与 8 个 YAML output block 均可解析；11 份 JSON Schema 可编译 |
| IA Gold 7 类型、13 维 rubric、四类 evaluator | FAIL | 设计覆盖完整，7 seeds 均 schema-valid/synthetic/not_run；但 P1-02 使 Gold 语义不可信。`07` 另列 Downstream execution，属于 Human/downstream 层的细分，不是缺失 |
| Autonomy 17 情境、6 actions、全部 synthetic | FAIL | 17 required + 7 boundary cases、6 actions、24/24 synthetic 均满足；但 P1-01 使 policy 无法稳定复现 gold actions |
| Validator 19 areas、Rule 字段、severity、false positive、auto-fix/approval | PASS | 40 rules、19 unique areas、ID 唯一、required fields 无缺失；23 Blocker / 17 Warning；结构完整，真实误报校准尚未运行 |
| Canvas prompt 7.9 全覆盖 | PASS | `08_canvas_comprehension_research.md:91-327` 逐项 3.1-3.10；后续有 evidence/test matrix、future spec inputs 和 prototype modules |
| Handoff prompt 7.10 全覆盖；Universal Core/Adapter 分离 | PASS | `09_coding_agent_handoff_research.md:62-77,139-352` 覆盖入口、instructions、tasks、refs/IDs、AC/DoD、commands、checkpoint、recovery、QA、change log、return；`354-382` 覆盖 adapters |
| 真实用户研究：招募、任务、方法、指标、样本理由、成功门槛、回填 | PASS | `10_real_user_research_plan.md:74-142,197-610,622-735`；明确尚未执行，不虚构结果 |
| Patch Proposal 与 future specs mapping | PASS | `11` 按 must/should/provisional/user evidence 分类；`12` 映射 Canvas/Schema/Handoff/PRD/Eval |
| `00/01` 未被本轮修改 | UNVERIFIED | 见 P2-02；Critic 窗口 hash 未变化，但缺研究开始前基线 |
| 所有重要事实可追溯；无过度宣称、二手伪装独立证据、单帖普遍化 | PASS WITH CAVEAT | 单帖仅作 low-confidence failure seed；vendor capability 与 outcome 明确分开；无发现 synthetic/user evidence laundering；Cursor 深链见 P2-03 |
| 独立 Critic 与一轮修订 | FAIL（流程状态） | 本文件完成 Critic；`00_research_plan.md:123` 要求的修订尚未发生，修订后应复审 P1 |

## 6. 用户指定 12 项审计摘要

| # | Status | Conclusion |
|---:|---|---|
| 1 | PASS | 主要 Section 有 Claim-Evidence；关键元数据总体完整 |
| 2 | PASS | 三类证据状态分隔清楚 |
| 3 | PASS | 20 张 Skill Card 结构要求全部满足 |
| 4 | FAIL | 7/13/四层设计齐，但 Gold seed 有自我矛盾 |
| 5 | FAIL | 17 情境、6 actions、synthetic 覆盖齐，但 ordered policy 与 AUTO_APPLY gold 不相容 |
| 6 | PASS | 19 areas 与 rule 字段完整 |
| 7 | PASS | Canvas 7.9 全覆盖 |
| 8 | PASS | Handoff 7.10 全覆盖，Core/Adapter 清楚分离 |
| 9 | PASS | 真实研究计划的招募到回填链路完整 |
| 10 | UNVERIFIED | 只能证明 Critic 窗口未改，不能证明整个研究轮次未改 |
| 11 | FAIL | provenance/severity/action 及 17/20 数字存在跨文档冲突 |
| 12 | PASS WITH CAVEAT | 未发现普遍化单帖或二手伪装；外链精度有 P2，部分结果仍不可验证 |

## 7. 建议修订顺序

1. 修复 Autonomy gate 与 case schema，跑完 24 条 policy regression。
2. 修复 IA Gold typed constraints、candidate-to-selected mapping 和 IA-GOLD-007，再跑 7 条 semantic validation。
3. 冻结 shared schema vocabulary，迁移全部 Skill/Validator/Handoff schema；禁止在此之前把卡标 production-ready。
4. 统一 20 张 Skill 的完成状态，给 `00/01` 建立可审计 baseline manifest。
5. 更新 Cursor 深链并增加 automated link/content integrity check。
6. 完成一次独立修订后复跑本表；只有 P1 全部关闭，Research Pack 才可从 FAIL 升级。

## 8. 仍不可验证项

- `10_real_user_research_plan.md` 明确尚未招募或执行，因此 Question Budget、Canvas comprehension、Diff、信任、纠错与“ready”判断没有真实用户结果。
- Codex/Claude/Cursor/Copilot 及 Lovable/Bolt/v0 的 downstream execution、adapter ingestion、retention、build/test/AC outcome 尚未运行；当前 support 只能是 candidate/conditional。
- 13 维 expert rubric 尚未双人试标；LLM critic 尚未报告 agreement、confusion、false positive/negative 或 bias calibration。
- Validator 的 40 条规则尚无受控 false-positive/false-negative calibration；结构完整不等于 severity 已校准。
- A-G 是否真正并行运行、是否都先读 `00/01`，没有 session-level provenance。
- `00/01` 在 Critic 介入前是否被其他角色改动，因 Git untracked 且无 before hash，无法追溯。
- URL sweep 是 2026-07-10 的点时检查：176 个唯一 URL 中无 404/410；147 返回 200、2 返回 202、10 返回 403；13 个 `david.local` schema ID 和 `r.jina.ai/https://` 占多数 000，另有少量 timeout；`v0.app/docs/llms.txt` 返回 500 且已在 G 的 query log 中披露、未作为最终主证据。HTTP 可达不证明 claim 内容正确。

## 9. 审查校验记录

- 5 份 JSON/JSONL dataset 均可解析。
- AJV Draft 2020-12：24/24 Autonomy cases valid；7/7 IA cases valid。CLI 未加载 `date/date-time` format plugin，因此此结论不包含 format keyword 的严格校验；现有日期值另做了人工格式检查。
- Autonomy coverage：17 个 required tags；6 actions 全覆盖；24/24 `synthetic=true`。
- IA coverage：7 个 product types 各 1；7/7 `validation_plan.status=not_run`。
- Validator：40 rules，19 areas，required fields 无缺失，ID 无重复。
- Skill Cards：20 files；required headings 无缺失；每卡至少 3 正例、3 反例、2 个 URL；JSON/YAML blocks 全部 parse；11 个 JSON Schema compile PASS。
- 角色 G 最终复查 hash：`09` = `d009e3ed5d7506945b18d7be9811cf0bafe70b30aeeb6b9d2e730d5e0b11bdec`；`compile_handoff_context` = `ae54e9476495ebeeb8cbffe2fb47ae8aae47b17f7b5a8d097577783bc548fba3`。
- Critic 窗口 `00` hash：`8d53f70dcfe33383af52fc7138c9967add0cdc0a409a80392e2ac841a2ce6dda`；`01` hash：`c49e19625a401d1e0df02cf67bf390ebdb29757f3d12914b25c530a44ac83507`。最终复算与窗口初值一致。

---

# Re-review Addendum - 2026-07-10

> 范围：仅复核原始 P1/P2 findings 与用户指定的 mandatory checks。保留上文原始审查，不重写历史结论。  
> 方法：独立检查受影响文件，并 spot-run Autonomy selector、AJV schema、IA semantic integrity、Cursor official URLs 与 protected hashes。广泛机器检查采用 `16_machine_audit.md`，但不把其结论替代独立复核。

## A. Final Verdict

**FAIL。** P0 为 0；仍有 3 个 P1。依据“PASS requires zero P0 and zero P1”，本轮不能升级为 PASS。

- Resolved：P1-01 的 gate ordering / 24-seed action selection；P2-01；P2-03。
- Partially resolved but still P1：P1-02、P1-03。
- New P1：RR-P1-01，Undo 字段的 cross-field consistency 未被 schema 强制。
- Non-blocking P2 residual：P2-02；另有 RR-P2-01（shared vocabulary 自称 versioned，但 logical `$id` 未版本化）。

## B. Original Finding Status

| Original finding | Status | Re-review conclusion |
|---|---|---|
| P1-01 Autonomy G7/G8 shadowing | **RESOLVED** | `03_question_budget_and_autonomy.md:101-116` 与 `skill_cards/manage_agent_autonomy.md:104-129` 均先执行 `G7=AUTO_APPLY`，再执行 `G8=APPLY_WITH_UNDO`。独立 selector 只读取 factor projection，先固定 24 个结果，再读取 `ideal_action` 比对：24/24 match；六 action 全部 reachable；分布为 Auto 3、Undo 2、Propose 10、Ask 4、Defer 3、Research 2。两个 Undo gold case 均显式记录 available/complete/scope/persistence。新的 schema consistency 问题单列 RR-P1-01。 |
| P1-02 IA Gold typed constraints / realization / IA-GOLD-007 | **PARTIALLY RESOLVED - P1 REMAINS** | Typed constraints、shared provenance、canonical node references 已加入；`IA-GOLD-007` 现在 global 只有 `Releases`，Checklist 是 `NODE-HOME` 下的 local page，no-new-top-level-nav lock 通过。可是 selected-candidate realization 仍未在全部 7 seeds 闭合，详见 C.1。 |
| P1-03 shared executable vocabulary | **PARTIALLY RESOLVED - P1 REMAINS** | Shared schema 已拆分 Knowledge/Basis/Lifecycle/Confidence；Severity 为 Title Case；`MANUAL_ONLY` 不在六种 `AutonomyDecision`；Autonomy、IA、11 个 JSON Skill schema 与 Handoff diagnostic 的 external `$ref` 均能解析到同一 shared `$id`。但 Validator 与 Handoff TaskPacket 仍保留不兼容的 executable vocabulary，详见 C.2。 |
| P2-01 17 vs 20 | **RESOLVED** | `00_research_plan.md:114` 与 `01_executive_summary.md:34` 现在明确 prompt 初始 17 张加 3 张补齐，共 20 张；`11_patch_proposal_for_01.md:29` 与之相容。 |
| P2-02 protected source baseline | **MITIGATED - NON-BLOCKING RESIDUAL P2** | `15_research_integrity_manifest.md:23-32` 明确承认 untracked tree 没有 pre-task Git blob，也无法追溯修复；只声称 critic/revision window 稳定。该限制诚实、范围明确，不再是当前 Research Pack 的 blocker，但未来研究必须 first-write 前建 manifest。 |
| P2-03 Cursor deep links | **RESOLVED** | 旧 `docs.cursor.com` 四个链接已移除。Spot check 的 `https://cursor.com/docs/rules`、`/docs/cli/using`、`/docs/agent/overview#checkpoints`、`/learn/reviewing-testing` 均 HTTP 200 且保留目标 URL。 |

## C. Remaining / New Findings

### C.1 P1 - Candidate realization 仍允许无 canonical node 和无法解析的 placement

**位置：**

- `datasets/ia_gold_case.schema.json:196-205`
- `datasets/ia_gold_cases_seed.jsonl:4-5`
- `16_machine_audit.md:14-15`

**证据：**

- `candidateRealization.realized_node_ids` 没有 `minItems: 1`；`navigation_placements` 只是自由字符串，没有 placement kind、canonical node ref 或对实际 `navigation_model` 的引用约束。
- `IA-GOLD-004` 的 `个人资料` 使用 `realized_node_ids: []`，并写 `contextual:account profile`，但该值不在 `navigation_model.contextual`。
- `IA-GOLD-005` 的 `contextual:错题录入与关联错题` 也无法解析到实际 contextual navigation。
- 独立 semantic spot-run 结果：IA-GOLD-001/002/003/006/007 pass；004/005 fail。因而 `16_machine_audit.md:15` 的“7/7 semantic integrity pass”不可成立。

**影响：** Gold envelope 仍可把没有 canonical identity 的候选 group 视为已实现，导致 evaluator 和 downstream mapping 分叉。

**修复要求：** `realized_node_ids` 至少一个；placement 改为 typed object（kind + canonical node/placement ID）；对 selected candidate 的 group 做 exact coverage，并验证每个 placement 存在于实际 navigation projection。

### C.2 P1 - Shared vocabulary 尚未贯穿 Validator 与 Handoff TaskPacket

**位置：**

- `datasets/validator_rules_seed.json:118-135`
- `07_validator_catalog.md:55`
- `skill_cards/compile_handoff_context.md:408-455,508-515,529-535`
- `datasets/shared_contract_vocabulary.schema.json:38-56`
- `14_shared_vocabulary_resolution.md:45-52`

**证据：**

- `VAL-MM-001` 仍读取 legacy `mental_model_hypotheses.provenance` / `source_ids`，检测 `confirmed/evidence_backed` 并 auto-fix 为 `inferred/pattern_based`；当前 IA schema 已改为 `provenance.knowledgeStatus/basisType/lifecycleStatus/sourceIds`。该 deterministic rule 按现状无法直接执行。
- Handoff diagnostic 已正确引用 shared Title Case `Severity`，但 `TaskPacket` 仍用本地 `approvalGate=[not_required,before_execution,before_destructive_action,manual_only]`，没有 shared `executionPermission` 字段或 `$ref`。文本虽声明 `MANUAL_ONLY` 不是 AutonomyDecision，但 machine contract 仍维护第二套 permission enum。

**影响：** 各 schema 可单独编译，但 Validator 会读错字段，Handoff permission 无法与 shared `ExecutionPermission` 单向组合；原始 P1-03 的实现分叉风险仍在。

**修复要求：** 将 VAL-MM-001 paths/conditions/autofix 全部迁移到正交 provenance；TaskPacket 增加 shared `executionPermission` `$ref`，如需审批时机则另设独立 `approvalTiming`，不得混合 permission 与 timing。

### C.3 RR-P1-01 - Undo schema 接受自相矛盾的“complete”组合

**位置：**

- `datasets/autonomy_case_library.schema.json:132-145`
- `03_question_budget_and_autonomy.md:83-86,114-116`
- `skill_cards/manage_agent_autonomy.md:171-181`

**证据：** 四个 Undo 字段均为 required，当前两个 Undo seeds 也正确。但 schema 没有 conditional invariants。将 AUT-001 变为 `undo_available=true`、`undo_complete=true`、`undo_scope=none`、`undo_persistence=not_applicable` 后，AJV 仍返回 valid。

**影响：** Runtime 若只信任 `undo_complete=true`，可在没有任何可恢复 scope/persistence 时进入 `APPLY_WITH_UNDO`，破坏该 action 的安全前提。

**修复要求：** 增加 cross-field `if/then`：complete implies available、scope 非 none、persistence 非 not_applicable；unavailable implies incomplete/none/not_applicable；`ideal_action=APPLY_WITH_UNDO` 的 dataset record 必须满足完整组合。Policy runner也应显式检查 scope/persistence，而非只检查两个 boolean。

### C.4 RR-P2-01 - Shared vocabulary 的 `$id` 尚未版本化

**位置：**

- `datasets/shared_contract_vocabulary.schema.json:2-5`
- `14_shared_vocabulary_resolution.md:45-52`
- `04_pm_skill_registry_research.md:312-314`

Schema 自称 versioned，但 `$id=https://david.local/schemas/v1/shared_contract_vocabulary.schema.json` 且没有 schema version 字段。当前 external refs 一致可解析，因此这是非阻断 P2；正式冻结前应将版本放入 URI 或 manifest，并定义兼容/升级规则。

## D. Mandatory Check Results

| Check | Result |
|---|---|
| 1. Ordered Autonomy policy / 24 seeds / six actions | **PASS**；24/24 ideal action，selector 不读取 label 作为输入；Undo negative schema fixture 产生 RR-P1-01 |
| 2. IA schema / 7 seeds / lock / realization / IA-GOLD-007 | **FAIL**；schema-valid 7/7、IA-GOLD-007 pass，但 IA-GOLD-004/005 realization 不闭合 |
| 3. Shared vocabulary / Skill / IA / Autonomy / Handoff | **FAIL**；核心 shared defs、Title Case Severity、six-action separation 和 refs pass；Validator/Handoff permission 未完全迁移 |
| 4. 17 vs 20 wording | **PASS** |
| 5. Integrity manifest | **PASS WITH RESIDUAL P2**；诚实记录不可追溯的 pre-task baseline，不阻断本包 |
| 6. Current Cursor URLs | **PASS**；四个 bounded official URLs 均 200，旧链接无残留 |
| 7. JSON/JSONL schema and link checks | **PASS WITH SEMANTIC EXCEPTIONS ABOVE**；4 JSON + 2 JSONL/31 rows parse；shared/24 Autonomy/7 IA AJV pass；12 JSON + 8 YAML Skill blocks parse，11 Skill schemas compile；本轮 bounded local links无失败，广泛结果沿用 `16` |
| 8. Protected hashes | **PASS**；`00=8d53f70dcfe33383af52fc7138c9967add0cdc0a409a80392e2ac841a2ce6dda`；`01=c49e19625a401d1e0df02cf67bf390ebdb29757f3d12914b25c530a44ac83507` |

## E. Closure Condition

再次复审只需聚焦三项：

1. IA-GOLD-004/005 realization 与 typed placement resolver；
2. VAL-MM-001 和 Handoff `executionPermission/approvalTiming` 迁移；
3. Undo cross-field schema invariants 与一个 negative fixture。

上述 P1 全部关闭且 spot-run 通过后，才可将最终结论改为 PASS。

---

# Final Closure Re-review - 2026-07-10

> 范围：只复核上一轮 Addendum 的 C.1、C.2、C.3 三个 P1 closure condition，以及 C.4 shared-schema versioning P2。保留此前全部审查文字与当时结论，不回写历史状态。

## A. Final Verdict

**PASS。** 本次 bounded closure re-review 后，P0 为 0，P1 为 0。三个待关闭 P1 均已解决；没有发现由这些修复直接引入的新 P0/P1。RR-P2-01 已解决。

此前 P2-02 所记录的 pre-task baseline 不可追溯限制仍按上一轮定义保留为非阻断、已明确限定的历史残余；本次不重新扩展该项审查。

## B. Closure Status

| Closure item | Status | Final conclusion |
|---|---|---|
| C.1 IA candidate realization | **RESOLVED** | Schema 强制非空 canonical node IDs 与 typed placements；7/7 seeds 的 selected candidate groups、realization mapping、node refs 和 navigation projections 全部闭合。IA-GOLD-004/005 均通过。 |
| C.2 Validator / Handoff shared vocabulary | **RESOLVED** | 两份 VAL-MM-001 均使用 canonical `knowledgeStatus/basisType/sourceIds`；TaskPacket 使用 shared `ExecutionPermission`，`approvalTiming` 独立，并以 conditional 拒绝 `manual_only + approval timing`。 |
| C.3 Undo cross-field invariants | **RESOLVED** | Schema 拒绝三类指定非法组合；24/24 原始 seeds 仍有效；两份 ordered policy 的 G8 均检查 scope 与 persistence。 |
| C.4 Shared schema versioning | **RESOLVED** | Logical `$id` 包含 `/v1/`，`x-version=1.0.0`；28 个 external refs 全部解析到该 ID 下存在的 `$defs`。 |

## C. Verification Detail

### C.1 IA

**位置：**

- `datasets/ia_gold_case.schema.json:196-216`
- `datasets/ia_gold_cases_seed.jsonl:1-7`

`candidateRealization.realized_node_ids` 现在有 `minItems: 1`、唯一性和 canonical node ID pattern；`navigation_placements` 是非空 typed object array，要求 `placement_id/kind/node_id/projection_value`。

独立 AJV 与 semantic spot-run 结果：

- 7/7 records schema-valid；空 `realized_node_ids` 反例以 `minItems` 失败，字符串 placement 反例以 `type` 失败。
- 每条 seed 的 selected candidate `top_level_groups` 与 realization `candidate_group` 做集合与重复项检查：7/7 exact coverage。
- 所有 realized、placement、flow-step、mini-IA 和 parent node refs 均解析到本 record 的 canonical `labels_and_hierarchy.node_id`。
- 每个 placement 的 `projection_value` 均存在于 kind 对应 collection：`global/local/contextual/entry_points`；7/7 通过。
- `IA-GOLD-004` 的 `个人资料` 现在映射到 `NODE-PROFILE` 和 contextual projection `打开个人资料`；`IA-GOLD-005` 的 `错题本` 映射到 `NODE-DETAIL` 和 contextual projection `录入错题并关联知识点`。两者均存在于各自 navigation model。

### C.2 Shared vocabulary and Handoff

**位置：**

- `07_validator_catalog.md:55`
- `datasets/validator_rules_seed.json:118-136`
- `skill_cards/compile_handoff_context.md:408-466`

两份 VAL-MM-001 的 required data 与 detection 已统一为 `provenance.knowledgeStatus`、`provenance.basisType`、`provenance.sourceIds`，不再读取 legacy `provenance/source_ids` 组合。

TaskPacket 将 `executionPermission` 引用到 versioned shared `ExecutionPermission`，并把 `approvalTiming` 保持为独立字段。Conditional spot-run 四组结果全部符合预期：

- `manual_only + not_applicable`：valid；
- `manual_only + before_execution`：invalid；
- `approval_required + before_execution`：valid；
- `approval_required + not_applicable`：invalid。

### C.3 Undo

**位置：**

- `datasets/autonomy_case_library.schema.json:304-335`
- `03_question_budget_and_autonomy.md:114-115`
- `skill_cards/manage_agent_autonomy.md:121-127`

24/24 autonomy seeds 仍通过 AJV。三个独立 mutation 均被拒绝：

1. `undo_complete=true` 且 `undo_scope=none/undo_persistence=not_applicable`；
2. `undo_available=false` 且 recovery scope/persistence 非空；
3. `ideal_action=APPLY_WITH_UNDO` 且缺少完整 recovery。

G7 仍先于 G8；G8 在两份 policy 中都显式要求 `undo_available && undo_complete && undo_scope != none && undo_persistence != not_applicable`。

### C.4 Versioned external refs

**位置：**

- `datasets/shared_contract_vocabulary.schema.json:2-4`
- `14_shared_vocabulary_resolution.md:54`

Shared logical ID 为 `https://david.local/schemas/v1/shared_contract_vocabulary.schema.json`，并声明 `x-version=1.0.0`。Bounded resolver 扫描到 28 个 executable external `$ref`、6 个唯一 target definitions（AutonomyDecision、Confidence、LifecycleStatus、ProvenanceCore、Severity、ExecutionPermission）；base ID 与 fragment 均解析成功，无旧 unversioned `$ref`。11 个 JSON Skill schemas 也在注册该 shared schema 后全部 compile。

## D. Protected Hashes

- `00` = `8d53f70dcfe33383af52fc7138c9967add0cdc0a409a80392e2ac841a2ce6dda`
- `01` = `c49e19625a401d1e0df02cf67bf390ebdb29757f3d12914b25c530a44ac83507`

两者均与指定 protected hash 一致。
