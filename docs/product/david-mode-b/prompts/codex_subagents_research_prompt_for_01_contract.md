# Codex Subagents Research Prompt — 补全 `01_ia_reasoning_and_agent_autonomy_contract.md`

> **用途：** 将本文件整段交给 Codex，要求其使用 Subagents 并行完成 `01` Contract 的证据补全、PM Skill 深化、Agent 自主性校准、评测设计与后续 Spec 输入整理。  
> **工作类型：** Research only；本轮不得实现产品代码，不得直接修改 `00` 和 `01` 源文档。  
> **输出语言：** 中文；保留英文方法、产品、论文和框架的原始名称。

---

# 1. 任务背景

你正在参与开发 **David Mode B**。

David 是一个面向 AI 独立开发者的 **AI Product Manager / Product Architect Co-worker**。它通过 Agentic Conversation 理解用户的模糊产品 Idea，利用 PM 和 UX 专业能力形成：

```text
Product Context
→ User Intent
→ Mental-Model Hypotheses
→ Information Architecture
→ Navigation
→ User Flow
→ Node-level Wireframe
→ MVP Scope
→ Coding-Agent Handoff
```

请先完整阅读以下文档：

```text
docs/product/david-mode-b/00_positioning_and_principles.md
docs/product/david-mode-b/01_ia_reasoning_and_agent_autonomy_contract.md
```

如果仓库中的实际文件名略有不同，请先定位对应的 `00` 和 `01` 文档。

## 1.1 文档优先级

若旧代码、旧文档、旧 Prompt 与这两个文档冲突：

```text
01_ia_reasoning_and_agent_autonomy_contract.md
> 00_positioning_and_principles.md
> 其他旧资料
```

但本轮 **不得直接修改** 这两个文件。所有建议先输出为研究结论和 Patch Proposal。

---

# 2. 本轮总目标

根据 `01` 文档，系统性补全目前缺失的信息，使其后续可以从 Draft v0.9 进入可实现、可评测的 v1.0。

研究必须回答：

1. David 如何减少冗余提问，同时维持专业判断质量；
2. 哪些 PM / UX 决策应自动完成，哪些应提供 Undo，哪些必须等待确认，哪些必须询问用户；
3. 每个 PM Skill 应使用什么专业方法、规则、反模式、输入输出与验证标准；
4. 如何建立 IA Gold Benchmark，判断 David 的 IA 质量；
5. 如何建立 Agent Autonomy Case Library，判断 David 是否问得太多或越权；
6. 哪些 IA、Flow、Wireframe、Scope 和 Handoff 问题可被程序化检查；
7. 用户是否能够理解 `Context → Intent → Objects → IA → Flow → Wireframe` 的 Canvas 演化；
8. David 输出的 Blueprint 和 Handoff 是否能被 Codex、Cursor、Claude Code 等 Coding Agent 正确执行；
9. 哪些结论可以通过桌面研究补全，哪些必须通过真实用户研究或实验验证。

---

# 3. 工作方式：使用 Subagents 并行研究

建立一个 **Research Coordinator**，并至少创建以下 7 个 Subagents。允许根据实际情况增加，但不得把所有搜索交给一个 Agent。

| Subagent | 研究方向 | 核心产出 |
|---|---|---|
| **A — IA & UX Foundations** | IA、Mental Model、Taxonomy、Labeling、Navigation、Card Sorting、Tree Testing、Wireflow | IA 专业规则与验证方法 |
| **B — PM Skill Methods** | JTBD、Opportunity Mapping、Story Mapping、Shape Up、RICE、MoSCoW、Assumption Testing、Four Risks、Service Blueprint | PM Skill Cards |
| **C — Agent Autonomy & Human-AI Interaction** | Question burden、mixed-initiative systems、human control、explainability、undo、approval、error recovery | Autonomy Policy 证据与案例 |
| **D — Real Builder / Team Workflows** | AI 独立开发者、PM、Designer、Engineering 在 AI coding 前如何规划和交接 | 真实工作流与痛点证据 |
| **E — Benchmarks & Validator Design** | IA Gold Cases、Rubric、deterministic validators、LLM critic、severity calibration | Benchmark 和 Validator Catalog |
| **F — Canvas Comprehension & Visual Interaction** | Progressive visualization、semantic zoom、focus+context、graph+wireframe、diff、provenance visualization | Canvas 交互研究输入 |
| **G — Coding-Agent Handoff Outcomes** | AGENTS.md、CLAUDE.md、Cursor rules、spec-driven development、agent task execution、QA | 通用 Handoff 研究输入 |

## 3.1 Coordinator 职责

Coordinator 必须：

1. 先读取 `00` 和 `01`；
2. 建立统一研究问题和术语表；
3. 给每个 Subagent 明确边界，减少重复搜索；
4. 收集各 Subagent 的研究结果；
5. 去重、识别冲突、评估来源质量；
6. 把结论映射回 `01` 的具体 Section；
7. 输出统一的 Research Pack 和 Patch Proposal；
8. 不得把未验证的推断写成事实。

---

# 4. 来源标准

## 4.1 来源优先级

按以下顺序优先：

1. **Primary / authoritative sources**
   - Nielsen Norman Group
   - Microsoft Research Human-AI Interaction
   - Google PAIR
   - GOV.UK Service Manual
   - Design Council
   - Basecamp Shape Up
   - Product Talk
   - SVPG
   - Christensen Institute
   - Intercom 原始方法文档
   - Agile Business Consortium
   - Strategyzer
   - OpenAI、Anthropic、GitHub、Cursor 官方文档
   - 原始学术论文、会议论文和标准

2. **High-quality professional sources**
   - 资深 PM、UX、Design Research、AI product practitioner 的方法文章
   - 有清晰案例、约束、反例和过程说明的文章

3. **Practitioner evidence**
   - Reddit、Hacker News、GitHub Discussions、Cursor Forum
   - 仅用于验证真实语言、真实工作流和痛点
   - 不得用单个帖子证明普遍规律

4. **Avoid**
   - SEO 内容农场
   - 无作者、无方法、无证据的泛化文章
   - 重复转载
   - AI 自动生成但无原始来源的内容

## 4.2 引用要求

每个重要结论必须记录：

```text
Claim
Source title
Source type
URL
Publication / update date
Exact supported point
Limitations
How this applies to David
Confidence
```

不得只贴链接而不解释它支持了什么。

## 4.3 时效性

对于以下内容优先搜索近 24 个月的资料：

- AI coding agent workflow；
- AGENTS.md / CLAUDE.md / Cursor rules；
- agent planning / spec-driven development；
- human-agent collaboration；
- AI PM 产品实践。

稳定的 IA、UX 和 PM 方法允许使用经典原始来源。

---

# 5. 搜索工作流

每个 Subagent 必须：

1. 从 `01` 中提取自己负责的未决问题；
2. 先列出搜索 Query；
3. 搜索 primary sources；
4. 再搜索案例、反例和 practitioner evidence；
5. 建立 Claim–Evidence Matrix；
6. 提出对 `01` 的修改建议；
7. 标记仍需真实用户研究的部分。

不得只做资料摘要。每条研究结论必须转成：

```text
Evidence
→ Product implication
→ Agent behavior rule
→ Data / schema implication
→ Validation or evaluation requirement
```

---

# 6. 研究包必须分成的部分

请在以下目录创建研究包：

```text
docs/product/david-mode-b/research/01-contract-gap-research/
```

建议输出结构：

```text
01-contract-gap-research/
├── 00_research_plan.md
├── 01_executive_summary.md
├── 02_claim_evidence_matrix.md
├── 03_question_budget_and_autonomy.md
├── 04_pm_skill_registry_research.md
├── 05_ia_gold_benchmark_design.md
├── 06_autonomy_case_library_design.md
├── 07_validator_catalog.md
├── 08_canvas_comprehension_research.md
├── 09_coding_agent_handoff_research.md
├── 10_real_user_research_plan.md
├── 11_patch_proposal_for_01.md
├── 12_inputs_for_future_specs.md
├── sources/
│   ├── sources.md
│   └── source_quality_notes.md
├── skill_cards/
│   ├── orient_product_situation.md
│   ├── frame_jtbd_and_user_intent.md
│   ├── build_object_capability_inventory.md
│   ├── generate_mental_model_hypotheses.md
│   ├── generate_candidate_ia.md
│   ├── review_labels_information_scent.md
│   ├── review_hierarchy_taxonomy.md
│   ├── select_navigation_pattern.md
│   ├── map_user_flow.md
│   ├── build_wireflow_and_node_mini_ia.md
│   ├── shape_mvp_scope.md
│   ├── prioritize_features.md
│   ├── map_assumptions_and_tests.md
│   ├── assess_four_product_risks.md
│   ├── map_frontstage_backstage.md
│   ├── define_acceptance_criteria.md
│   └── manage_agent_autonomy.md
└── datasets/
    ├── autonomy_case_library.schema.json
    ├── autonomy_case_library.seed.jsonl
    ├── ia_gold_case.schema.json
    ├── ia_gold_cases_seed.jsonl
    └── validator_rules_seed.json
```

---

# 7. 各部分需要包含什么

## 7.1 `00_research_plan.md`

包括：

- 研究目标；
- Subagent 分工；
- 搜索 Query；
- 来源标准；
- 去重规则；
- 完成标准；
- 已知风险；
- 不允许做的事情。

---

## 7.2 `01_executive_summary.md`

用最少文字回答：

1. 哪些 `01` 规则有充分证据支持；
2. 哪些规则需要修改；
3. 哪些规则只有启发性依据；
4. 哪些规则必须通过真实用户研究校准；
5. 实现前最重要的 10 个结论。

---

## 7.3 `02_claim_evidence_matrix.md`

用表格记录：

| Claim ID | `01` Section | Claim | Evidence | Source quality | Limitation | David implication | Confidence |
|---|---|---|---|---|---|---|---|

要求：

- 覆盖 `01` 的每个主要 Section；
- 标记没有找到证据的部分；
- 标记来源冲突；
- 不得用多个二手来源伪装成独立证据。

---

## 7.4 `03_question_budget_and_autonomy.md`

重点研究：

### A. Question Budget

- 用户能接受多少前置问题；
- 连续问答何时产生决策疲劳；
- 一次问一个问题与批量问题的适用场景；
- 何时应先给可视化假设再追问；
- 何时默认假设比继续提问更好；
- 如何避免重复问题。

### B. Autonomy

研究并提出：

```text
AUTO_APPLY
APPLY_WITH_UNDO
PROPOSE_FOR_APPROVAL
ASK_USER
DEFER_AS_ASSUMPTION
RESEARCH_OR_TEST
```

六种行为的判定标准。

必须形成一个可程序化的决策表，至少考虑：

```text
Decision impact
Uncertainty
Reversibility
User-exclusive knowledge
Evidence strength
Locked constraints
Downstream rework
Security / privacy / legal risk
Interaction cost
```

### C. 结论格式

每条结论分为：

```text
Evidence-backed rule
Provisional heuristic
Needs user research
```

不要把经验性阈值写成科学事实。

---

## 7.5 `04_pm_skill_registry_research.md`

对每一个 PM Skill 输出：

| 字段 | 内容 |
|---|---|
| Skill ID | 稳定名称 |
| Purpose | 解决什么决策 |
| Trigger | 什么时候调用 |
| Inputs | 必需和可选输入 |
| Method | 使用什么 PM / UX 方法 |
| Rules | 专业判断规则 |
| Anti-patterns | 常见错误 |
| Output schema | 结构化输出 |
| Validation | 如何检查 |
| Default autonomy | L0–L3 或六种 Action |
| Ask boundary | 何时必须问用户 |
| Approval boundary | 何时必须确认 |
| Sources | 主要来源 |
| Evaluation cases | 正反例 |

必须避免：

- 只罗列框架名称；
- 为了“全”而同时套用多个框架；
- 把 PM Skill 写成泛 Prompt；
- 没有输入、输出和禁用条件。

---

## 7.6 `05_ia_gold_benchmark_design.md`

设计一套评估 David IA 输出质量的 Benchmark。

至少覆盖：

```text
Desktop B2B SaaS
Mobile consumer app
AI workflow product
Marketplace
Content / learning product
Existing-product redesign
Feature added to an existing repo
```

每个 Gold Case 应包含：

```text
Raw idea / input
User and situation
Core job
Information needs
Object / capability inventory
Mental-model hypotheses
Candidate IAs
Recommended IA
Labels and hierarchy
Navigation model
Core flows
Node mini-IA
MVP scope
Assumptions
Validation plan
Common wrong answers
```

### Rubric 至少包含

- user-intent fit；
- inventory coverage；
- mental-model honesty；
- grouping coherence；
- label clarity / information scent；
- hierarchy quality；
- navigation fit；
- flow completeness；
- wireframe alignment；
- scope coherence；
- rationale quality；
- assumption transparency；
- agent handoff readiness。

需要区分：

```text
Deterministic checks
Expert rubric
LLM-as-judge candidates
Human user-test metrics
```

---

## 7.7 `06_autonomy_case_library_design.md`

设计 Agent 自主性案例库。

每个案例至少包含：

```json
{
  "case_id": "AUT-001",
  "context": {},
  "user_message": "",
  "current_state": {},
  "proposed_decision": {},
  "impact": "low|medium|high",
  "reversibility": "easy|moderate|hard",
  "user_exclusive_knowledge": true,
  "evidence_strength": "none|weak|medium|strong",
  "locked_constraint_conflict": false,
  "ideal_action": "AUTO_APPLY|APPLY_WITH_UNDO|PROPOSE_FOR_APPROVAL|ASK_USER|DEFER_AS_ASSUMPTION|RESEARCH_OR_TEST",
  "ideal_user_visible_response": "",
  "rationale": "",
  "failure_modes": []
}
```

Seed 数据至少覆盖：

- Label rename；
- Node reorder；
- Add missing state；
- New top-level navigation；
- Move core module；
- Remove from MVP；
- Change required flow；
- Introduce authentication；
- Add payment；
- Add external API；
- User changes target user；
- Low-confidence mental model；
- Existing evidence contradicts AI inference；
- Duplicate question；
- User refuses to answer；
- Locked node；
- Scope cut breaks core path。

不得制造“真实用户结论”。Seed 可以是专家设计案例，但必须标记为 synthetic evaluation case。

---

## 7.8 `07_validator_catalog.md`

建立完整检查目录。

每条 Validator 包含：

| 字段 | 内容 |
|---|---|
| Rule ID | 稳定 ID |
| Domain | IA / Flow / Wireframe / Scope / Handoff |
| Description | 检查什么 |
| Severity | Blocker / Warning / Recommendation |
| Deterministic? | Yes / No |
| Required data | 需要什么字段 |
| Detection | 如何检测 |
| False-positive risk | 风险 |
| User message | 如何解释 |
| Auto-fix? | 是否允许 |
| Approval required? | 是否确认 |
| Source | 依据 |

至少覆盖：

- Product Context；
- Inventory；
- Mental Model；
- Grouping；
- Labels；
- Hierarchy；
- Taxonomy；
- Navigation；
- Findability；
- Flow；
- States；
- Node Mini-IA；
- Wireframe alignment；
- Scope；
- Dependencies；
- Value / Usability / Feasibility / Viability；
- Accessibility；
- Acceptance Criteria；
- Handoff。

---

## 7.9 `08_canvas_comprehension_research.md`

研究用户是否能理解以下演化：

```text
Product Context
→ Intent Map
→ Object / Capability Cards
→ Candidate Groupings
→ Proposed IA
→ Navigation
→ Flow Overlay
→ Expanded Wireframe Node
→ Scope / Validation
```

重点回答：

- 什么应该始终可见；
- 什么应该渐进披露；
- Chat、Canvas、Decision Panel 如何分工；
- 哪些信息适合图形，哪些适合文字；
- Semantic Zoom 是否适合；
- Focus + Context 如何使用；
- 如何显示 Confirmed / Inferred / Unknown；
- Structure Diff 如何减少用户理解成本；
- 如何避免 Canvas 信息过载；
- IA 与 Wireframe 组合是否会损害可读性；
- 哪些结论必须通过原型测试验证。

输出对 `02_canvas_interaction_spec.md` 的明确建议，但本轮不得编写完整 UI Spec。

---

## 7.10 `09_coding_agent_handoff_research.md`

研究一个通用 Handoff Skill 应如何让不同 Coding Agent 工作。

至少覆盖：

- OpenAI Codex；
- Claude Code；
- Cursor；
- GitHub Copilot coding agent；
- Lovable / Bolt / v0 等产品生成工具，若有可靠官方资料。

研究内容：

```text
主入口 Prompt
AGENTS.md
CLAUDE.md
Cursor rules
Repository instructions
Task decomposition
File references
Canonical IDs
Acceptance criteria
Done-when
Build / test / validate
Progress checkpoint
Failure recovery
QA
Change log
Return-to-blueprint workflow
```

必须区分：

```text
Universal core
Agent-specific adapter
```

输出给未来 `04_handoff_skill_contract.md`。

---

## 7.11 `10_real_user_research_plan.md`

明确哪些内容无法靠搜索解决。

至少设计：

### User segment

```text
会使用 Cursor / Claude Code / Codex 的 AI 独立开发者
已有模糊 Idea 或一段需求描述
```

### 研究问题

- 用户如何描述产品结构问题；
- 哪些问题只有用户能回答；
- 哪些 PM 决策用户希望 AI 自动完成；
- 哪类自动修改让用户不安；
- 提问多少次会产生负担；
- 用户是通过文字还是结构图更容易纠正 AI；
- 用户如何判断蓝图“已经可以开发”；
- 哪些 Handoff 文件真的会被 Coding Agent 使用。

### 方法

- 访谈；
- Wizard-of-Oz；
- 可点击原型测试；
- A/B Question Budget；
- Structure Diff 测试；
- downstream agent execution test。

### 输出

- 招募标准；
- 任务；
- 访谈题纲；
- 观察指标；
- 样本量建议；
- 成功标准；
- 如何回填 Contract。

---

## 7.12 `11_patch_proposal_for_01.md`

不要重写整个 `01`。

按 Section 输出 Patch：

| `01` Section | Current rule | Evidence | Proposed change | Reason | Confidence |
|---|---|---|---|---|---|

将修改分成：

```text
Must patch before implementation
Should patch after prototype testing
Keep as provisional heuristic
Requires real user evidence
```

不得直接改动源文件。

---

## 7.13 `12_inputs_for_future_specs.md`

把研究结果映射到后续开发文档：

| 后续文档 | 需要接收什么输入 |
|---|---|
| `02_canvas_interaction_spec.md` | 渐进可视化、Chat/Canvas 分工、Diff、Provenance、认知负担 |
| `03_blueprint_domain_schema.md` | Provenance、Decision、Question Debt、Autonomy、Validator、Skill Output Schema |
| `04_handoff_skill_contract.md` | 通用入口、Agent adapters、阶段执行、QA、回写 |
| `05_mvp_prd.md` | P0 功能、确认点、Question Budget、Readiness 和验收标准 |
| Evaluation harness | Gold Cases、Autonomy Cases、Validator Cases |

---

# 8. Skill Cards 的要求

每个 PM Skill 必须单独创建文件。示例：

```markdown
# Skill: review_labels_information_scent

## Purpose
检查标签是否让目标用户能够预测目的地。

## Trigger
- 新增或重命名节点；
- IA Candidate 被选中；
- Tree Test 失败；
- 用户表达标签不理解。

## Inputs
...

## Professional Rules
...

## Anti-patterns
...

## Structured Output
...

## Default Autonomy
APPLY_WITH_UNDO

## Must Ask When
...

## Approval Required When
...

## Validation
...

## Sources
...
```

每个 Skill 至少需要：

- 2 个 Primary / authoritative sources，若确有；
- 3 个正例；
- 3 个反例或失败模式；
- 何时不应使用该 Skill；
- 可执行的输出字段，而不是泛化建议。

---

# 9. 研究结束条件

本轮只有在满足以下条件后才算完成：

- [ ] 已读取 `00` 和 `01`；
- [ ] 已创建并行 Subagents；
- [ ] 已覆盖 `01` 的全部 Open Research and Calibration Needs；
- [ ] 已建立 Claim–Evidence Matrix；
- [ ] 已完成 PM Skill Cards；
- [ ] 已设计 IA Gold Benchmark；
- [ ] 已设计 Autonomy Case Library；
- [ ] 已建立 Validator Catalog；
- [ ] 已输出 Canvas 研究建议；
- [ ] 已输出 Coding-Agent Handoff 研究；
- [ ] 已区分桌面研究结论与真实用户研究缺口；
- [ ] 已输出针对 `01` 的 Patch Proposal；
- [ ] 已把结论映射到后续 Specs；
- [ ] 没有直接修改 `00` / `01`；
- [ ] 所有重要事实都有可追溯来源；
- [ ] 没有把 AI 推断、单个帖子或 synthetic cases 伪装成用户证据。

---

# 10. 最终回复格式

完成后，在聊天中只返回：

```markdown
# Research Completed

## Files Created
- ...

## Top 10 Findings
1. ...
2. ...

## Must-Patch Items for `01`
- ...

## Requires Real User Research
- ...

## Recommended Next Product Decision
- ...

## Blockers
- ...
```

同时确保所有详细内容已经写入仓库，而不是只存在于聊天回复中。

---

# 11. 禁止事项

本轮不得：

- 实现前端或后端；
- 修改产品代码；
- 直接重写 `00` 或 `01`；
- 把竞品功能列表当作 PM 专业规则；
- 用单个 Reddit 帖子证明普遍规律；
- 编造真实用户研究数据；
- 编造实验结果；
- 用一个模糊的总分替代多维度评估；
- 把所有 PM Skill 塞入一个超长 Prompt；
- 只做资料摘要而不输出对 David 的行为、Schema、Validator 和评测含义。
