# 01 Contract Gap Research Plan

> 状态：执行中  
> 研究类型：Desktop research + evaluation design；不包含真实用户研究结果  
> 权威输入：`01_ia_reasoning_and_agent_autonomy_contract.md` > `00_david_mode_b_positioning_and_principles.md` > 其他资料

## 1. 研究目标

本研究包补全 `01` 从 Draft v0.9 进入可实现、可评测 v1.0 前的证据与评测缺口，重点回答：

1. 如何以更少问题得到足够好的结构判断；
2. 何时自动执行、提供 Undo、等待批准、询问、暂存假设或转为研究/测试；
3. PM / UX Skills 如何成为有边界、结构化、可验证的执行单元；
4. 如何分别评测 IA 质量、Autonomy 判断、Validator 与 Coding-Agent Handoff；
5. Canvas 如何让用户理解 `Context → Intent → Objects → IA → Flow → Wireframe` 的演化；
6. 哪些规则可由桌面研究支持，哪些只能由真实用户或 downstream execution 验证。

## 2. 统一研究问题

| ID | 问题 | 主要负责角色 | 主要映射 Section |
|---|---|---|---|
| RQ-01 | 哪些问题必须问，哪些可推断、延迟或以图形方案代替？ | C、D | 6、8、12 |
| RQ-02 | 六种 Autonomy Action 的证据化判定条件是什么？ | C、E | 7、14、17、19 |
| RQ-03 | 各 PM Skill 的触发、方法、边界、I/O 与验证是什么？ | A、B | 4、9–11、15、18 |
| RQ-04 | 如何构建可区分 IA 好坏的 Gold Benchmark？ | A、E | 4–5、10–11、15–16 |
| RQ-05 | 哪些规则适合 deterministic validator、expert rubric、LLM critic 或 user test？ | E | 15–16、19 |
| RQ-06 | Canvas 如何外化结构、来源、变化与不确定性而不过载？ | F | 12–14 |
| RQ-07 | 通用 Blueprint 如何适配不同 Coding Agent 并验证执行结果？ | G | 16、19 |
| RQ-08 | AI builder 的实际规划、纠错和交接行为是什么？ | D、G | 0、6、8、16、19 |

## 3. 统一术语

| 术语 | 本研究中的含义 |
|---|---|
| Evidence-backed rule | 有直接、相关的 authoritative/primary evidence 支持；仍需说明外推限制 |
| Provisional heuristic | 合理的产品规则或专家假设，但阈值/效果未经 David 用户验证 |
| Needs user research | 取决于目标用户行为、理解、耐受度或偏好的问题 |
| Synthetic evaluation case | 专家设计的测试输入，不是真实用户证据 |
| Deterministic validator | 相同结构化输入应产生稳定结果、无需主观产品判断的检查 |
| Expert rubric | 需要 IA/PM/UX 专业判断并按维度评分的评测 |
| LLM critic candidate | 可由模型初筛，但必须校准一致性、偏差与误报的检查 |
| Canonical state | 经 schema、policy、validation 和 StateReducer 管理的 Blueprint 唯一事实源 |

## 4. Subagent 分工

| 角色 | 边界 | 交付 |
|---|---|---|
| Coordinator | 契约解读、术语、去重、冲突处理、跨域综合 | Plan、Summary、Matrix、Patch、Future Inputs、主 Sources |
| A — IA & UX | IA、Mental Model、Taxonomy、Label、Navigation、Flow | IA Skill Cards 与 IA evidence |
| B — PM Methods | JTBD、Story Map、Shape Up、RICE、MoSCoW、风险与测试 | PM Skill Registry 与 PM Skill Cards |
| C — Autonomy | Mixed initiative、Question burden、control、undo、approval、recovery | Question/Autonomy、Case Library 与 seeds |
| D — Workflows | Builder/PM/Design/Engineering 的实际工作流与痛点语言 | Real User Research Plan 与 practitioner evidence |
| E — Benchmark/Validator | Gold cases、rubric、deterministic/critic rules、severity | Benchmark、Validator Catalog 与 datasets |
| F — Canvas | Progressive visualization、semantic zoom、focus+context、diff、provenance | Canvas comprehension research |
| G — Handoff | Agent instructions、task execution、QA、failure recovery | Universal core + agent adapters |

## 5. Search Queries

各 agent 会扩展并记录实际 query。统一 seed queries：

- `site:nngroup.com information architecture mental models card sorting tree testing labels navigation wireflows`
- `mixed-initiative systems user control undo approval AI interaction question burden`
- `site:microsoft.com/research Guidelines for Human-AI Interaction correction control failure`
- `site:pair.withgoogle.com guidebook explainability feedback control mental models`
- `site:basecamp.com/shapeup appetite rabbit holes no-gos shaping`
- `site:producttalk.org assumption testing opportunity solution tree`
- `site:svpg.com four big risks product`
- `information architecture benchmark rubric tree testing task success`
- `semantic zoom focus+context provenance visualization structure diff graph comprehension`
- `site:openai.com Codex AGENTS.md instructions 2025 2026`
- `site:docs.anthropic.com Claude Code CLAUDE.md hooks subagents 2025 2026`
- `site:cursor.com/docs rules agent planning 2025 2026`
- `site:docs.github.com Copilot coding agent custom instructions 2025 2026`
- `AI coding agent requirements planning handoff failure Reddit Cursor forum 2025 2026`

## 6. 来源标准与检索路径

优先级：

1. Primary / authoritative source 与原始论文；
2. 有过程、约束和反例的专业实践资料；
3. Practitioner evidence，仅用于验证真实语言、工作流和痛点；
4. 不采用 SEO 农场、无作者转载或无原始来源的 AI 汇总。

检索优先使用 Agent Reach 的 Exa/Jina/GitHub/OpenCLI 路径。若渠道不可用，记录失败和覆盖限制，不以搜索摘要替代原文。每条重要结论记录：Claim、title、type、URL、date、supported point、limitations、David application、confidence。

## 7. 去重与冲突规则

1. 相同原始材料的转载只计一个来源；
2. 多篇二手文章引用同一论文，不视为独立证据；
3. 方法作者对方法的定义可支持方法内容，但不能单独证明产品效果；
4. practitioner post 只能作为案例语言或假设生成材料；
5. 来源冲突时保留双方、比较样本/语境/日期，不强行平均；
6. 经典 UX/PM 结论与近 24 个月 agent workflow 分开处理时效性；
7. 没有直接证据的阈值必须标为 provisional，不写成规范事实。

## 8. Claim–Evidence 转换规则

每条研究结论必须完成：

```text
Evidence
→ Product implication
→ Agent behavior rule
→ Data / schema implication
→ Validation / evaluation requirement
```

Claim ID 使用 `IA-*`、`PM-*`、`AUT-*`、`WF-*`、`VAL-*`、`CAN-*`、`HO-*`。综合矩阵引用原始 URL，不只引用 subagent 笔记。

## 9. 完成标准

- prompt 指定的 13 份主体文件齐全；
- prompt 明列的 17 张 Skill Cards 齐全；同时补齐 `01` Registry 的 3 张缺口，共 20 张，并均含 I/O、边界、正反例和来源；
- 5 份 JSON/JSONL datasets 可解析；
- Claim–Evidence Matrix 覆盖 `01` 所有主要 Section；
- Gold Benchmark 覆盖 7 种产品类型；
- Autonomy seeds 覆盖全部指定情境并标为 synthetic；
- Validator 覆盖全部指定 domain，区分 deterministic 与 judgment；
- Handoff 明确 Universal Core 与 Agent-specific adapters；
- 桌面研究、启发性规则和真实研究缺口明确分离；
- `00`、`01` 与产品代码无改动；
- 由独立 Critic 按 prompt checklist 复核并完成一轮修订。

## 10. 已知风险

- Question Budget 的具体数字缺乏 David 用户证据；
- IA 专家之间可能存在多个同样合理的结构，不能只用 exact match；
- LLM-as-judge 容易偏好冗长、与自身风格相近的答案；
- 社区平台可访问性与样本偏差会限制 practitioner evidence；
- Coding Agent 官方能力更新快，适配层必须记录版本与日期；
- Gold/Autonomy seeds 是 synthetic，不能冒充产品效果。

## 11. 禁止事项

- 不实现或修改产品代码；
- 不修改 `00` / `01`；
- 不编造用户、实验、准确率或 benchmark 成绩；
- 不将一个模糊总分替代多维评估；
- 不以 AI 推断、Founder preference 或竞品惯例冒充用户证据；
- 不把所有 PM 方法或 Skill 合并成一个超长 prompt；
- 不把搜索摘要当作原始来源。
