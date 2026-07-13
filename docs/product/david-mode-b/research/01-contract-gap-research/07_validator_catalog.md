# 07 — Validator Catalog

> 状态：Research design v0.1  
> 机器可读 seed：`datasets/validator_rules_seed.json`  
> 证据边界：本目录是 expert-designed rule seed，尚未用真实 Blueprint、模型输出或用户研究校准；没有误报率、召回率或通过率。

## 1. 目标

Validator 的职责是发现**可定位、可解释、可复现**的问题，不是用一个总分替代产品判断。执行顺序：

~~~text
schema / reference integrity
→ locked constraints
→ graph / flow / scope closure
→ P0 mini-IA / wireframe / AC
→ accessibility / handoff
→ expert + calibrated LLM critic
→ human test / downstream execution
~~~

每条 finding 必须包含 `rule_id`、`severity`、`evidence_paths`、`message`、`autofix_proposal`、`approval_required` 和 validator version。没有运行 human test 或 downstream execution 时，结果只能是 `not_run`，不能推断为 pass。

## 2. Severity 校准

| Severity | 只在以下条件使用 | 不得因何升级 |
|---|---|---|
| Blocker | core task 不可完成；canonical 结构矛盾；locked constraint 被违反；MVP 依赖不可用；P0 handoff 无法执行；evidence laundering | “看起来不够优雅”、专家偏好、未经测试的 label 直觉 |
| Warning | core path 尚可工作，但存在明确 usability、comprehension、growth、accessibility 或 implementation risk | 仅因某 pattern 与常见模板不同 |
| Recommendation | 不影响当前 scope/readiness 的局部改进 | 不得伪装成必须修复 |

Severity 是**影响分类**，不是来源权威性或 confidence。自动升级只能由规则中明确的影响条件触发，例如关键写操作缺 recovery、核心 error 对 assistive technology 不可感知。此语义直接沿用 `01 §15.1`。

## 3. Evaluator 分工

| Evaluator | 可判定 | 不可单独判定 |
|---|---|---|
| DeterministicValidator | schema、ID、引用、graph reachability、scope closure、required coverage、locked constraint、文件/命令存在 | label 是否被用户理解、分组是否符合真实 mental model |
| Expert review | grouping、hierarchy、navigation fit、scope/risk、wireframe priority | 真实 task success、adoption、willingness to pay |
| LLM critic candidate | 漏项、矛盾、rationale-grounding、疑似 jargon、AC 可观察性初筛 | 用户行为真相、最终 severity、自动 state mutation |
| Human test | card-sort patterns、tree-test success/directness、usability completion/recovery | 未测试人群的普遍结论 |
| Downstream execution | agent 是否遵守 refs/constraints、运行 tests、产出 expected artifacts | 产品 value 或真实用户 usability |

Tree testing 可衡量 hierarchy 下的 task success、time、directness，但其隔离树缺少完整 UI 上下文；因此 findability 与 prototype usability 不能互相替代。[NN/g Tree Testing，2023-08-06](https://www.nngroup.com/articles/tree-testing/)

## 4. 完整规则目录

> 表格较宽；字段与 JSON seed 一一对应。Detection 中的模板变量由 runtime 填充，不能泄露 private chain-of-thought。

| Rule ID | Domain / Area | Description | Severity 与依据 | Deterministic / Evaluator | Required data | Detection | False-positive risk | User message | Auto-fix | Approval required | Source |
|---|---|---|---|---|---|---|---|---|---|---|---|
| VAL-PC-001 | IA / Product Context | Target user、situation、core job 或 success state 缺失。 | **Blocker**：没有这些字段就无法判断结构是否服务核心任务，也不能通过 candidate IA gate。 | Yes；deterministic_validator | product_context.target_user, user_intent.situation, user_intent.core_job, user_intent.success_state | 任一字段缺失、空白或仅为占位符即命中。 | low：成熟 artifact 可能使用等价字段名；应先做 schema 映射。 | 缺少目标用户、使用情境、核心任务或成功状态，当前结构无法验证。 | No | No | `docs/product/david-mode-b/01_ia_reasoning_and_agent_autonomy_contract.md#15-ia-validation-framework` |
| VAL-PC-002 | IA / Product Context | Platform、appetite、locked constraints 或 no-gos 未记录。 | **Warning**：core path 仍可能描述，但导航与 scope 判断存在显著实现风险。 | Yes；deterministic_validator | product_context.platform, constraints, scope.appetite, scope.no_gos | 字段缺失，或用户明确约束未进入 canonical constraints。 | medium：极早期 idea 可能尚无 appetite；此时只警告且建立 assumption。 | 平台、投入边界或 no-go 尚未明确；导航与范围建议是暂定的。 | Yes：创建 unknown/assumption 占位，不猜测值。 | No | `docs/product/david-mode-b/01_ia_reasoning_and_agent_autonomy_contract.md#15-ia-validation-framework` |
| VAL-INV-001 | IA / Inventory | Core flow 或 P0 node 引用的 object/capability/action 不在 inventory。 | **Blocker**：canonical ingredients 与交付图不一致会使 flow、scope 和 handoff 不可执行。 | Yes；deterministic_validator | inventory, flows, nodes | 收集 flow/node references，与 inventory canonical IDs 做集合差。 | low：legacy artifact 的 alias 需先解析到 canonical ID。 | 核心流程引用了未登记的对象或能力：{missing_ids}。 | No | No | `docs/product/david-mode-b/01_ia_reasoning_and_agent_autonomy_contract.md#15-ia-validation-framework` |
| VAL-INV-002 | IA / Inventory | 角色、权限、关键状态、规则或事件中有适用类别缺失。 | **Warning**：可能遗漏 edge case 或权限行为，但不是每个产品都需要所有类别。 | No；expert_review | inventory, product_context, flows | Expert/LLM critic 逐类判断适用性；只有适用且缺失时命中。 | high：简单单用户产品可合理没有复杂权限或事件模型。 | 可能缺少适用的角色、权限、状态、规则或事件，请确认：{categories}。 | Yes：为缺失类别创建 review item，不生成业务事实。 | No | `docs/product/david-mode-b/01_ia_reasoning_and_agent_autonomy_contract.md#15-ia-validation-framework` |
| VAL-MM-001 | IA / Mental Model | Canonical provenance 声称 mental model 已确认或有外部证据，但没有可追溯用户研究或行为证据。 | **Blocker**：这是 evidence laundering，会把未经验证推断变成产品事实。 | Yes；deterministic_validator | mental_model_hypotheses.provenance.knowledgeStatus, .basisType, .sourceIds, evidence | `basisType=source_evidence` 且 sourceIds 为空；或 `knowledgeStatus=confirmed` 但 basis 为 pattern/model/synthetic；或引用不是相关用户研究/行为数据。 | low：平台惯例可支持 `basisType=pattern`，但不能证明目标用户 mental model；用户批准设计也不等于用户研究。 | 该 mental model 的认知状态或证据依据超过现有来源，请降级为 inferred 或补充用户证据。 | Yes：保留 basis/source audit；将 knowledgeStatus 降为 inferred，创建 validation need。 | No | `docs/product/david-mode-b/01_ia_reasoning_and_agent_autonomy_contract.md#15-ia-validation-framework`<br>[来源](https://www.nngroup.com/articles/card-sorting-tree-testing-differences/) |
| VAL-MM-002 | IA / Mental Model | Hypothesis 缺少 supporting cues、risk、confidence 或 validation method。 | **Warning**：hypothesis 可存在，但无法审计或规划验证。 | Yes；deterministic_validator | mental_model_hypotheses | 任一 required hypothesis 字段为空。 | low：已有强证据时 validation method 可为复核计划，但仍应记录。 | Mental-model hypothesis 缺少依据、风险、置信度或验证方法。 | Yes：补建空 validation task，不编造依据。 | No | `docs/product/david-mode-b/01_ia_reasoning_and_agent_autonomy_contract.md#15-ia-validation-framework`<br>[来源](https://www.nngroup.com/articles/card-sorting-tree-testing-differences/) |
| VAL-GRP-001 | IA / Grouping | Core inventory item 没有任何 IA home。 | **Blocker**：关键对象或能力不可发现，core task 可能无法完成。 | Yes；deterministic_validator | inventory, selected_ia.nodes, node_item_mappings | core inventory IDs 减去所有 active node mappings 后非空。 | low：background process 可不显示，但必须显式标记为 background_process。 | 这些核心对象或能力没有可达位置：{missing_ids}。 | No | No | `docs/product/david-mode-b/01_ia_reasoning_and_agent_autonomy_contract.md#15-ia-validation-framework` |
| VAL-GRP-002 | IA / Grouping | Sibling 分组重叠、粒度不一致或混用多个未解释组织原则。 | **Warning**：会增加预测和扩展成本，但需要专业判断而非字符串规则。 | No；expert_review | selected_ia.nodes, candidate_ias, decision_records | Expert review sibling purpose/rationale；LLM 只标记疑似 overlap 和 abstraction mismatch。 | high：Hybrid IA 可以合理混合原则，只要边界和 canonical object 清楚。 | 分组可能重叠或粒度不一致：{evidence}。 | No | No | `docs/product/david-mode-b/01_ia_reasoning_and_agent_autonomy_contract.md#15-ia-validation-framework`<br>[来源](https://www.nngroup.com/articles/information-scent/) |
| VAL-LAB-001 | IA / Labels | Active sibling label 为空、完全重复或与目的地类型冲突。 | **Blocker**：用户和下游 agent 无法唯一识别 destination。 | Yes；deterministic_validator | selected_ia.nodes.label, selected_ia.nodes.parent_id, selected_ia.nodes.node_type | 规范化同一 parent 下 label，检测空值/重复；检查 label-node contract。 | medium：有意重复入口可允许，但必须引用同一 canonical node 且说明。 | 存在空白、重复或与目的地不一致的 label：{node_ids}。 | No | No | `docs/product/david-mode-b/01_ia_reasoning_and_agent_autonomy_contract.md#15-ia-validation-framework`<br>[来源](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html) |
| VAL-LAB-002 | IA / Labels | 关键 label 疑似 vague、内部术语、品牌黑话或不能独立预测目的地。 | **Warning**：可能降低 information scent，但真实理解必须由目标用户测试。 | No；llm_critic | nodes.label, nodes.purpose, user_vocabulary, target_user | LLM critic 对照 purpose 和 vocabulary 标记；expert 决定是否进入测试。 | high：短 label 在明确上下文中可能足够；禁止仅凭禁词表定罪。 | 标签“{label}”可能无法让目标用户预测内容，建议测试或改写。 | No | No | [来源](https://www.nngroup.com/articles/information-scent/)<br>[来源](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html) |
| VAL-HIER-001 | IA / Hierarchy | IA 存在 orphan、非法 parent、重复 node ID 或 parent cycle。 | **Blocker**：结构图不可解析，导航、flow 和 handoff 引用均不可靠。 | Yes；deterministic_validator | selected_ia.nodes.node_id, selected_ia.nodes.parent_id | 唯一性检查；parent 存在检查；DFS/拓扑检查 cycle；root 数量检查。 | low：允许多个明确命名的 product roots 时需 schema 支持，不能临时忽略。 | IA 层级不可解析：{finding}。 | No | No | `docs/product/david-mode-b/01_ia_reasoning_and_agent_autonomy_contract.md#15-ia-validation-framework` |
| VAL-HIER-002 | IA / Hierarchy | 高优先级内容被无理由深埋，或 parent 不能概括 children。 | **Warning**：findability 有风险，但 click depth 本身不是质量结论。 | No；expert_review | nodes, user_intent, priority, decision_records | Expert review priority-to-depth 与 parent-child semantics；不得采用固定三次点击规则。 | high：深层路径可能由搜索、deep link 或 context entry 合理补偿。 | 层级可能隐藏高优先级内容或 parent-child 关系不清：{evidence}。 | No | No | `docs/product/david-mode-b/01_ia_reasoning_and_agent_autonomy_contract.md#15-ia-validation-framework`<br>[来源](https://www.nngroup.com/articles/tree-testing/) |
| VAL-TAX-001 | IA / Taxonomy | 同一领域实体被复制为多个 canonical IDs，或同一 ID 表示不同实体。 | **Blocker**：duplicated state 会导致 flow、scope、wireframe 和 handoff 互相矛盾。 | Yes；deterministic_validator | object_inventory, taxonomy, node_item_mappings | 检查 canonical key/alias 映射的多对多冲突和 ID 复用。 | medium：polyhierarchy 是多入口指向同一 ID，不应被误报为复制。 | Taxonomy 中存在 canonical object 冲突：{object_keys}。 | No | No | `docs/product/david-mode-b/01_ia_reasoning_and_agent_autonomy_contract.md#15-ia-validation-framework` |
| VAL-TAX-002 | IA / Taxonomy | 必填 metadata、enum、facet 或术语在同类对象间不一致。 | **Warning**：检索、过滤和增长会受影响，但当前 core flow 可能仍可完成。 | Yes；deterministic_validator | taxonomy.fields, taxonomy.enums, objects.metadata | 按 object type 校验 required metadata 与 enum membership。 | medium：历史数据 migration 期间可有临时 alias，需记录截止条件。 | 分类或 metadata 不一致：{finding}。 | Yes：标准化可逆 alias；数据 migration 需另行批准。 | No | `docs/product/david-mode-b/01_ia_reasoning_and_agent_autonomy_contract.md#15-ia-validation-framework` |
| VAL-NAV-001 | IA / Navigation | Core destination 从任何合法 entry point 均不可达。 | **Blocker**：用户无法进入核心任务。 | Yes；deterministic_validator | navigation, flows, nodes, entry_points | 构建可达图，从 active entry points 到 P0 nodes 做 reachability。 | low：外部 deep link 也可作为合法入口，但必须显式声明。 | 核心目的地不可达：{node_ids}。 | No | No | `docs/product/david-mode-b/01_ia_reasoning_and_agent_autonomy_contract.md#15-ia-validation-framework` |
| VAL-NAV-002 | IA / Navigation | 重复导航顺序/标识不一致，或缺少 current-location/orientation cues。 | **Warning**：可预测性和定位能力存在 accessibility/usability 风险。 | No；expert_review | navigation, wireframes, orientation_cues | 对重复 navigation 做顺序/label 比较；expert review wayfinding cues。 | medium：不同角色可有明确变体，但必须记录规则。 | 导航标识、顺序或当前位置提示可能不一致。 | No | No | `docs/product/david-mode-b/01_ia_reasoning_and_agent_autonomy_contract.md#15-ia-validation-framework`<br>[来源](https://www.w3.org/TR/WCAG22/) |
| VAL-FIND-001 | IA / Findability | 关键任务没有 tree test、label test 或等价 findability validation plan。 | **Warning**：expert review 不能证明目标用户能找到内容。 | Yes；deterministic_validator | critical_tasks, validation_plan | 每个 critical find task 必须关联 planned/completed findability method。 | medium：已有高质量近期研究可用 evidence link 替代新测试。 | 关键查找任务尚无 findability 验证计划：{task_ids}。 | Yes：创建 planned tree-test item，status=not_run。 | No | [来源](https://www.nngroup.com/articles/tree-testing/)<br>[来源](https://www.nngroup.com/articles/card-sorting-tree-testing-differences/) |
| VAL-FIND-002 | IA / Findability | 在没有 user test/analytics evidence 时声称 label、category 或 navigation 已被用户验证。 | **Blocker**：把 expert/AI 判断冒充用户行为证据。 | Yes；deterministic_validator | claims, evidence, validation_results | 扫描 validated/user-proven claim，要求有相关 completed research result 和 segment。 | low：可说“expert-reviewed”，但不能改写成 user-validated。 | 该 findability 结论尚无用户证据，请降级为 hypothesis。 | Yes：将 claim 标为 hypothesis；保留原文到 audit log。 | No | [来源](https://www.nngroup.com/articles/tree-testing/)<br>`docs/product/david-mode-b/01_ia_reasoning_and_agent_autonomy_contract.md#15-ia-validation-framework` |
| VAL-FLOW-001 | Flow / Flow | Core flow 缺 entry、合法终点或无法从 entry 到达 success state。 | **Blocker**：core task 无法完成。 | Yes；deterministic_validator | flows.nodes, flows.edges, entry_points, success_states | 图可达性检查；每个 core flow 至少一个 entry 和 terminal success。 | low：循环型任务仍需定义一次 iteration 的完成或 return state。 | 核心流程没有完整的进入到成功路径：{flow_id}。 | No | No | `docs/product/david-mode-b/01_ia_reasoning_and_agent_autonomy_contract.md#15-ia-validation-framework` |
| VAL-FLOW-002 | Flow / Flow | 适用的 alternate、error、permission、cancel、retry/recovery 或 return path 缺失。 | **Warning**：边界路径不完整；若缺失路径会造成数据损失或不可恢复，应升级 Blocker。 | No；expert_review | flows, state_inventory, risk | 先按能力识别适用 path types，再检查 flow coverage；severity 由影响规则升级。 | medium：纯只读简单 flow 不一定需要 cancel 或 permission branch。 | 流程缺少适用的边界或恢复路径：{path_types}。 | No | No | `docs/product/david-mode-b/01_ia_reasoning_and_agent_autonomy_contract.md#15-ia-validation-framework`<br>[来源](https://www.nngroup.com/articles/wireflows/) |
| VAL-STATE-001 | Flow / States | P0 交互缺 default/loading/empty/error/success 中的适用状态。 | **Warning**：用户反馈与恢复可能不完整；关键写操作缺 error/recovery 时升级 Blocker。 | No；expert_review | p0_nodes, state_inventory, node_mini_ias, wireframes | 按 interaction type 推导适用状态并做覆盖检查；写操作额外要求 failure/retry。 | medium：同步静态内容可能不需要 loading，empty 也可能不适用。 | P0 节点缺少适用状态：{states}。 | No | No | `docs/product/david-mode-b/01_ia_reasoning_and_agent_autonomy_contract.md#15-ia-validation-framework`<br>[来源](https://www.nngroup.com/articles/wireflows/)<br>[来源](https://www.w3.org/WAI/WCAG22/Understanding/status-messages) |
| VAL-MINI-001 | Wireframe / Node Mini-IA | P0 node 缺 purpose、user intent、primary information、primary CTA、inputs/outputs 或 next state。 | **Blocker**：wireframe gate 未满足，无法生成与任务一致的交互结构。 | Yes；deterministic_validator | p0_nodes, node_mini_ias | 对每个 P0 node 检查 required mini-IA fields。 | low：信息型节点可没有输入，但必须显式 not_applicable 并说明。 | P0 节点 {node_id} 的 Mini-IA 不完整：{fields}。 | No | No | `docs/product/david-mode-b/01_ia_reasoning_and_agent_autonomy_contract.md#15-ia-validation-framework` |
| VAL-WIRE-001 | Wireframe / Wireframe alignment | Wireframe 没有引用合法 IA node、Mini-IA 或 flow state。 | **Blocker**：visual artifact 与 canonical Blueprint 断开，handoff 不可追溯。 | Yes；deterministic_validator | wireframes.node_id, wireframes.mini_ia_id, wireframes.flow_state_ids | 引用完整性与 active version 检查。 | low：探索草图可暂不绑定，但不得进入 P0 handoff。 | Wireframe 未绑定有效 node/Mini-IA/flow state。 | No | No | `docs/product/david-mode-b/01_ia_reasoning_and_agent_autonomy_contract.md#15-ia-validation-framework`<br>[来源](https://www.nngroup.com/articles/wireflows/) |
| VAL-WIRE-002 | Wireframe / Wireframe alignment | Wireframe 缺 Mini-IA 的 primary information/CTA/state feedback，或新增未登记能力。 | **Warning**：screen layout 与 node purpose/flow 漂移；若缺主 CTA 使 core flow 中断则升级 Blocker。 | No；expert_review | wireframe.blocks, node_mini_ia, flow_edges, capability_inventory | 比较 semantic block refs；expert 检查呈现优先级和动态反馈。 | medium：同一信息可用不同视觉表达，不能按文本 exact match。 | Wireframe 与 Mini-IA/Flow 不一致：{finding}。 | No | No | [来源](https://www.nngroup.com/articles/wireflows/)<br>`docs/product/david-mode-b/01_ia_reasoning_and_agent_autonomy_contract.md#15-ia-validation-framework` |
| VAL-SCP-001 | Scope / Scope | In-MVP core flow 依赖 Later、Excluded、Dependency-blocked 或 unresolved blocker。 | **Blocker**：当前 slice 无法端到端交付。 | Yes；deterministic_validator | scope, flows, dependencies, validation_results | 从 In-MVP core flow 做依赖闭包，检测非 In-MVP 或 blocked 节点。 | low：外部现成服务可作为 In-MVP dependency，但必须可用且有失败策略。 | MVP 核心路径依赖未纳入或被排除的项：{dependencies}。 | No | Yes | `docs/product/david-mode-b/01_ia_reasoning_and_agent_autonomy_contract.md#15-ia-validation-framework`<br>[来源](https://basecamp.com/shapeup/1.4-chapter-05) |
| VAL-SCP-002 | Scope / Scope | MVP 缺 coherent outcome、appetite、no-gos、rabbit holes 或 test-first 项。 | **Warning**：范围可能膨胀或把关键未知下推给实现团队。 | No；expert_review | scope, product_context, risk | Expert review scope fields 与 core job；字段缺失可 deterministic 标记。 | medium：极小 feature 仍需 outcome/no-go，但 rabbit hole 可明确为空。 | MVP 边界尚不完整：{fields_or_risks}。 | No | Yes | [来源](https://basecamp.com/shapeup/1.4-chapter-05)<br>`docs/product/david-mode-b/01_ia_reasoning_and_agent_autonomy_contract.md#15-ia-validation-framework` |
| VAL-DEP-001 | Scope / Dependencies | 关键 external API、auth、payment、data、model 或 migration dependency 未决且无 fallback。 | **Blocker**：关键实现或业务约束无法满足，handoff 不能执行。 | Yes；deterministic_validator | dependencies, dependency_status, fallbacks, core_flows | core dependency status 为 unknown/blocked 且 fallback 为空。 | medium：可替换 vendor 的 dependency 仍需接口 contract，不一定阻断。 | 关键依赖未解决且没有 fallback：{dependency_ids}。 | No | Yes | `docs/product/david-mode-b/01_ia_reasoning_and_agent_autonomy_contract.md#15-ia-validation-framework`<br>[来源](https://www.nngroup.com/articles/service-blueprints-definition/) |
| VAL-DEP-002 | Scope / Dependencies | 前台 touchpoint 未关联适用的 backstage process、owner、failure/recovery 或 evidence。 | **Warning**：复杂 AI/API/ops 服务可能在 UI 正常时仍无法交付。 | No；expert_review | service_blueprint, flows, dependencies | 对依赖 AI/API/人工运营的 touchpoint 检查 backstage mapping。 | high：纯本地/静态产品可不需要 service blueprint。 | 该体验依赖后台流程，但 owner、失败或恢复尚未映射：{touchpoint}。 | No | No | [来源](https://www.nngroup.com/articles/service-blueprints-definition/)<br>`docs/product/david-mode-b/01_ia_reasoning_and_agent_autonomy_contract.md#15-ia-validation-framework` |
| VAL-RISK-001 | Scope / Value / Usability / Feasibility / Viability | 适用的 Four Risks 未被评估或没有 evidence/assumption/owner。 | **Warning**：可能忽略产品、交互、技术或商业方面的关键失败条件。 | No；expert_review | risk_assessments, assumptions, evidence, owners | 按 case 适用性检查四类 risk 是否有 status、basis 和 next action。 | high：不是每个 IA turn 都需完整商业评审；可记录 deferred 理由。 | 尚未评估适用的产品风险：{risk_types}。 | No | No | [来源](https://www.svpg.com/four-big-risks/)<br>`docs/product/david-mode-b/01_ia_reasoning_and_agent_autonomy_contract.md#15-ia-validation-framework` |
| VAL-RISK-002 | Scope / Value / Usability / Feasibility / Viability | High risk 被标为 accepted/resolved，但无 owner、evidence 或显式批准。 | **Blocker**：高风险被静默吞掉会使 readiness 失真。 | Yes；deterministic_validator | risk_assessments.status, risk_assessments.evidence_ids, risk_assessments.owner, decision_records | high risk status=accepted/resolved 且 evidence/owner/approval 任一缺失。 | low：已有 locked business decision 也必须有 decision record。 | 高风险 {risk_id} 被接受，但缺少证据、负责人或批准记录。 | No | Yes | `docs/product/david-mode-b/01_ia_reasoning_and_agent_autonomy_contract.md#15-ia-validation-framework`<br>[来源](https://www.svpg.com/four-big-risks/) |
| VAL-A11Y-001 | Wireframe / Accessibility | P0 functionality 没有 keyboard-operable path，或存在 keyboard trap。 | **Blocker**：WCAG 2.1.1/2.1.2 的基础操作要求失败，部分用户无法完成核心任务。 | Yes；deterministic_validator | wireframes.controls, interaction_specs.keyboard, focus_transitions | 所有 actionable controls 必须有 keyboard operation；focus graph 不得有不可退出节点。 | medium：Canvas 空间交互可有替代非路径依赖输入，但不能只有拖拽。 | 核心功能无法完整用键盘操作，或焦点无法退出：{control_ids}。 | No | No | [来源](https://www.w3.org/TR/WCAG22/) |
| VAL-A11Y-002 | Wireframe / Accessibility | Heading/control 缺 descriptive label、accessible name，或 visual label 与 accessible name 不一致。 | **Blocker**：用户可能无法识别或操作核心控件；违反 WCAG label/name 要求。 | Yes；deterministic_validator | wireframe.headings, wireframe.controls.label, wireframe.controls.accessible_name | 检查空 accessible name、label-purpose mismatch 的结构信号、Label in Name。 | medium：icon-only familiar control 仍需 programmatic accessible name。 | 控件或标题缺少准确可访问名称：{control_ids}。 | Yes：可从已确认 visual label 同步 accessible name；语义改名需审核。 | No | [来源](https://www.w3.org/TR/WCAG22/)<br>[来源](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html) |
| VAL-A11Y-003 | Wireframe / Accessibility | Loading、result、success、error 等动态 status 没有 programmatically determinable announcement。 | **Warning**：screen-reader 用户可能不知道状态变化；关键 error 不可感知时升级 Blocker。 | Yes；deterministic_validator | states, wireframe.status_messages, accessibility.roles | 动态 status state 必须映射 role/live-region 或等价平台机制。 | low：会移动 focus 的 modal 不属于同一 status-message 模式，但仍需可访问焦点管理。 | 动态状态没有可被 assistive technology 感知的通知：{states}。 | Yes：添加 status semantic 建议；不自动改变业务文案。 | No | [来源](https://www.w3.org/WAI/WCAG22/Understanding/status-messages) |
| VAL-AC-001 | Handoff / Acceptance Criteria | P0 node 或 critical flow 没有 acceptance criteria。 | **Blocker**：handoff 无法判断 done-when，也无法验证 core outcome。 | Yes；deterministic_validator | p0_nodes, critical_flows, acceptance_criteria.target_ids | P0/critical target IDs 与 AC coverage 做集合差。 | low：一个 AC 可覆盖多个 targets，但必须显式列出。 | P0 节点或关键流程缺少验收标准：{target_ids}。 | No | No | `docs/product/david-mode-b/01_ia_reasoning_and_agent_autonomy_contract.md#15-ia-validation-framework`<br>[来源](https://cucumber.io/docs/gherkin/reference/) |
| VAL-AC-002 | Handoff / Acceptance Criteria | Acceptance criterion 缺明确 precondition/event/observable outcome，或只描述内部实现。 | **Warning**：标准可能不可测试；若关键门禁没有 observable outcome 则升级 Blocker。 | No；llm_critic | acceptance_criteria | 解析 Given/When/Then 或等价字段；LLM critic 检查 outcome 是否用户/外部系统可观察。 | medium：不强制 Gherkin 语法，但必须具备等价语义。 | 验收标准缺少可观察结果或测试前提：{ac_id}。 | No | No | [来源](https://cucumber.io/docs/gherkin/reference/)<br>`docs/product/david-mode-b/01_ia_reasoning_and_agent_autonomy_contract.md#15-ia-validation-framework` |
| VAL-HO-001 | Handoff / Handoff | Handoff 中 canonical IDs、文件路径、artifact refs 或 version refs 不存在/过期。 | **Blocker**：coding agent 无法定位权威输入或会实现错误版本。 | Yes；deterministic_validator | handoff.references, canonical_state, filesystem_manifest, versions | 解析 ID 和路径；检查 active version、hash 或 updated_at。 | low：生成前尚未落盘的 planned artifact 必须标 planned，不能标 ready。 | Handoff 引用了不存在或过期的对象/文件：{refs}。 | No | No | `docs/product/david-mode-b/01_ia_reasoning_and_agent_autonomy_contract.md#15-ia-validation-framework`<br>[来源](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions-in-your-ide/add-repository-instructions-in-your-ide?tool=visualstudio) |
| VAL-HO-002 | Handoff / Handoff | 缺 setup/build/test/validate command、done-when 或 expected artifact。 | **Blocker**：agent 无法独立验证完成状态。 | Yes；deterministic_validator | handoff.commands, handoff.done_when, handoff.expected_artifacts | required handoff sections 非空；命令在允许环境中可解析，执行结果另记。 | medium：文档-only task 可无 build，但仍需适用的 lint/link/parse 验证命令。 | Handoff 缺少可执行命令、done-when 或预期产物。 | No | No | [来源](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions-in-your-ide/add-repository-instructions-in-your-ide?tool=visualstudio)<br>`docs/product/david-mode-b/01_ia_reasoning_and_agent_autonomy_contract.md#15-ia-validation-framework` |
| VAL-HO-003 | Handoff / Handoff | Locked constraints、no-gos、scope exclusions 或 approval boundaries 未打包。 | **Blocker**：downstream agent 可能越权扩 scope 或破坏确认决策。 | Yes；deterministic_validator | constraints.locked, scope.excluded, handoff.constraints, handoff.approval_boundaries | 比较 canonical constraints 与 handoff packaged constraints。 | low：仅与 task 无关的约束可省略，但应由 relevance mapping 解释。 | Handoff 未包含适用的 locked/no-go/approval 约束：{constraint_ids}。 | No | Yes | `docs/product/david-mode-b/01_ia_reasoning_and_agent_autonomy_contract.md#15-ia-validation-framework` |
| VAL-HO-004 | Handoff / Handoff | 仍有 Blocker 时 handoff/readiness 被标为 ready，且无显式 override record。 | **Blocker**：ready 状态与 validator 事实矛盾。 | Yes；deterministic_validator | validation_results, readiness.status, decision_records.override | 若 active blocker count > 0 且 status=ready 且无 user-approved override 则命中。 | low：override 不能删除 blocker，只能记录风险接受。 | 仍有未解决 blocker，不能标记为 handoff-ready。 | Yes：将 readiness 降为 blocked；保留 override 入口。 | No | `docs/product/david-mode-b/01_ia_reasoning_and_agent_autonomy_contract.md#15-ia-validation-framework` |
| VAL-HO-005 | Handoff / Handoff | 未执行 downstream agent test，却声称 handoff 可被目标 agent 正确执行。 | **Blocker**：把 artifact completeness 冒充 execution outcome。 | Yes；deterministic_validator | handoff.claims, downstream_execution.status, downstream_execution.artifacts | claim=execution_validated 且 status!=completed 或缺日志/patch/test result。 | low：可声明 schema-ready 或 expert-reviewed，但必须使用准确状态。 | 尚未运行 downstream execution，不能声称 handoff 已验证可执行。 | Yes：将 claim 改为 not_run/planned。 | No | `docs/product/david-mode-b/01_ia_reasoning_and_agent_autonomy_contract.md#15-ia-validation-framework`<br>[来源](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions-in-your-ide/add-repository-instructions-in-your-ide?tool=visualstudio) |

## 5. Domain 覆盖审计

| Area | Rule count |
|---|---:|
| Acceptance Criteria | 2 |
| Accessibility | 3 |
| Dependencies | 2 |
| Findability | 2 |
| Flow | 2 |
| Grouping | 2 |
| Handoff | 5 |
| Hierarchy | 2 |
| Inventory | 2 |
| Labels | 2 |
| Mental Model | 2 |
| Navigation | 2 |
| Node Mini-IA | 1 |
| Product Context | 2 |
| Scope | 2 |
| States | 1 |
| Taxonomy | 2 |
| Value / Usability / Feasibility / Viability | 2 |
| Wireframe alignment | 2 |

Prompt 指定的 Product Context、Inventory、Mental Model、Grouping、Labels、Hierarchy、Taxonomy、Navigation、Findability、Flow、States、Node Mini-IA、Wireframe alignment、Scope、Dependencies、Value / Usability / Feasibility / Viability、Accessibility、Acceptance Criteria、Handoff 均至少有一条规则。

## 6. Auto-fix 与 Approval

允许自动修复的范围仅限：

- 创建 unknown/assumption/validation placeholder；
- 降级无证据的 provenance claim；
- 从已确认 visual label 同步 accessible name；
- 把 readiness 从 ready 降为 blocked；
- 生成不改变业务语义的 review item。

以下不得 auto-fix：

- 目标用户、core job、business rule；
- top-level IA、core flow、MVP cut；
- auth/payment/privacy/permission；
- taxonomy merge/split；
- dependency vendor 或 migration 策略；
- acceptance criteria 的业务结果。

任何会改变 locked state、core path、scope、外部依赖或已批准 handoff 的修复都必须生成 ChangeSet 并等待 approval。

## 7. Runtime 输出契约

~~~json
{
  "run_id": "VALRUN-...",
  "validator_version": "1.0.0",
  "blueprint_version": "...",
  "findings": [
    {
      "rule_id": "VAL-SCP-001",
      "severity": "Blocker",
      "evidence_paths": ["flows.FLOW-CORE", "scope.items.X"],
      "message": "MVP 核心路径依赖未纳入或被排除的项：X。",
      "autofix_proposal": null,
      "approval_required": true,
      "confidence": "high"
    }
  ],
  "human_test": { "status": "not_run" },
  "downstream_execution": { "status": "not_run" }
}
~~~

Validator 必须输出证据路径，而不是只给自然语言意见。LLM critic finding 在 expert calibration 前默认 `confidence=low|medium` 且 `needs_human_review=true`。

## 8. Calibration 计划

1. 为每条 deterministic rule 制作一条 clean fixture 和一条单缺陷 perturbation；
2. 先验证 rule isolation，避免一个缺陷触发无关 findings；
3. 用真实历史 Blueprint 和人工注入错误估计 false-positive/false-negative；
4. judgment rules 由两名专家独立标注并 adjudicate；
5. LLM critic 仅在逐维与专家标注比较后启用；
6. pairwise LLM judge 做 A/B 顺序交换，记录 verdict stability；
7. severity 分歧回到“是否阻断 core task/handoff”的影响证据；
8. 版本化 rule、detector、message 和 source snapshot；
9. 产品类型分层报告，不用总体平均掩盖某类失败；
10. 任何数值阈值在 calibration 前保持 provisional。

NIST AI RMF 要求记录 test sets、metrics、tools、deployment-like conditions、uncertainty 和 generalizability limits，并建议独立评估者参与。[NIST AI RMF Core，2023-01](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/)

## 9. 实现输入

- `03_blueprint_domain_schema.md`：为每条 rule 保证 required data 可寻址；
- Validator runtime：实现 schema、graph、dependency closure、AC coverage、filesystem ref checks；
- LLM critic：单维 rubric、evidence span、uncertainty、review flag；
- Canvas：finding 定位到 node/edge/file，Blocker 不得被折叠隐藏；
- Handoff：ready gate 读取 active Blocker，override 只记录风险接受，不删除 finding；
- Evaluation harness：固定 fixtures、perturbations、raw findings 与版本元数据。

## 10. 仍需验证

- 规则对真实 David 输出的误报/漏报；
- 简单产品中哪些 inventory/risk 类别确实可 N/A；
- Warning 升级 Blocker 的边界；
- LLM critic 对中文/英文混合 label 的稳定性；
- accessibility 字段能否在 low-fi wireframe 阶段被可靠表达；
- 不同 coding agent 对 handoff command/ref failure 的实际恢复行为。
