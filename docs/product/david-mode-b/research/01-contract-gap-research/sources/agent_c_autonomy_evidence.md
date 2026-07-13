# Agent C — Autonomy & Human-AI Interaction Evidence

> 角色：C — Agent Autonomy & Human-AI Interaction  
> 范围：mixed-initiative、question burden、human control、explainability、undo、approval、error recovery  
> 检索日期：2026-07-10  
> 证据边界：本文件只记录桌面研究。没有执行 David 目标用户研究；案例库 seeds 均不是用户证据。

## 1. 检索与来源质量说明

### 1.1 实际查询

- `site:microsoft.com/en-us/research Guidelines for Human-AI Interaction correction control failure undo`
- `site:pair.withgoogle.com/guidebook feedback control errors graceful failure explainability trust`
- `Principles of Mixed-Initiative User Interfaces Horvitz 1999 PDF`
- `human AI agent autonomy human control approval delegation mixed initiative 2024 2025 original paper`
- `clarification questions conversational agent user experience burden number questions study CHI`
- `AI assistant asking clarification questions user study interaction cost mixed initiative dialogue original paper`
- `site:nist.gov AI RMF Generative AI Profile human oversight incident response 2024 PDF`
- `site:openai.com practices for governing agentic AI systems human oversight approval`
- `meaningful human control AI agents approval delegation 2024 2025 original research`

### 1.2 Agent Reach 执行记录与限制

| 尝试 | 结果 | 后续处理 |
|---|---|---|
| `agent-reach doctor --json` | 失败：`agent-reach: command not found` | 按 skill fallback 尝试 `mcporter` / Exa。 |
| `mcporter call 'exa.web_search_exa(...)'` | 失败：`Unknown MCP server 'exa'` | 改用 Jina Reader 与官方网页。 |
| `curl https://r.jina.ai/https://...` 读取 Microsoft、PAIR、NN/g | 六个 URL 均返回空内容 | 改用内置网页检索定位并打开同一官方页、论文 PDF；不采用搜索摘要作为核心证据。 |
| 官方网页 / 原始 PDF | 成功 | 核心 claims 只使用可打开的官方页、原始论文或标准。 |
| `agent-reach check-update` | 失败：`agent-reach: command not found` | 无法检查 Agent Reach 版本；不影响已核验的官方来源，但保留为工具链限制。 |

覆盖限制：未使用 Reddit、X、论坛等 practitioner evidence；这减少了对真实工作流语言的覆盖，但避免用单帖证明普遍规律。没有找到可直接支持 David `3–5` 个前置问题、每轮 `1` 个问题、批量最多 `3` 个问题阈值的目标人群研究。

## 2. Claim–Evidence Cards

### AUT-C01 — Mixed-initiative 决策应同时考虑不确定性、收益、错误成本与打扰成本

- **Claim：** Agent 不应把“有不确定性”直接等同于“必须提问”；应比较自动行动、提问、等待和降级服务的预期价值。
- **直接来源：** Eric Horvitz, *Principles of Mixed-Initiative User Interfaces*.
- **Source type：** Primary conference paper，CHI 1999；含 LookOut 系统实例与 decision-theoretic formulation。
- **URL：** https://www.microsoft.com/en-us/research/wp-content/uploads/2016/11/chi99horvitz.pdf
- **Publication / update date：** 1999-05。
- **Exact supported point：** 论文明确要求考虑用户目标与注意力的不确定性、行动的成本与收益、提问造成的不必要打扰；提出只在自动行动的 expected utility 高于不行动时执行，并在不确定时通过高效对话或降低服务精度来控制错误成本。
- **Limitations：** 经典原则来自桌面日历 Agent；没有给出 LLM PM co-worker 的数值阈值，也不是对 David 用户的实验。
- **David implication：** `QuestionPlanner` 必须比较 `ASK_USER` 与安全默认、暂存假设、研究、低精度提案的成本；不能仅按模型 confidence 触发提问。
- **Confidence：** High（原则）；Low（任何数值阈值）。

### AUT-C02 — 只为关键不确定性提问，并允许“做少一点但做对”

- **Claim：** 当精确行动风险高而局部进展仍有价值时，Agent 应缩小变更范围或给出可修正草案，不应强求一次性消除全部不确定性。
- **直接来源：** Eric Horvitz, *Principles of Mixed-Initiative User Interfaces*.
- **Source type：** Primary conference paper。
- **URL：** https://www.microsoft.com/en-us/research/wp-content/uploads/2016/11/chi99horvitz.pdf
- **Publication / update date：** 1999-05。
- **Exact supported point：** 原文提出 scoping precision to match uncertainty，偏好在不确定时“少做但正确”，以减少 undo/backtracking，并为用户提供 refinement 机制。
- **Limitations：** 证明的是设计原则和案例，不证明“先画图再问”优于“先问再画图”。
- **David implication：** 对可逆 IA 未知，先生成局部、明确标注的 provisional hypothesis；对核心目标或法律约束未知则不能借此绕过询问。
- **Confidence：** High（范围降级与 refinement）；Medium（映射到可视化草案）。

### AUT-C03 — Human-AI 系统应支持高效调用、忽略、纠正、解释与记忆

- **Claim：** 用户必须能够调用或停止 AI 服务、纠正错误、访问简洁解释，并让系统记住近期已确认信息。
- **直接来源：** Amershi et al., *Guidelines for Human-AI Interaction*.
- **Source type：** Primary CHI 2019 paper；18 条 guideline 的综合与多轮评估。
- **URL：** https://www.microsoft.com/en-us/research/wp-content/uploads/2019/01/Guidelines-for-Human-AI-Interaction-camera-ready.pdf
- **Publication / update date：** 2019-05。
- **Exact supported point：** G7–G12 分别覆盖 efficient invocation、dismissal、correction、uncertainty 时 disambiguate/degrade、解释系统行为与记住近期交互；G16–G18 覆盖反馈后果、全局控制和能力变化通知。
- **Limitations：** 49 名设计从业者评估 20 个当时流行 AI 产品；不是 2026 agentic PM workflow，也未验证六种 David action enum。
- **David implication：** 需要 `Undo`、直接编辑、拒绝/停止、question dedupe、短期记忆、结构 diff、简洁 rationale 和全局 autonomy mode；这些不能仅靠 prompt。
- **Confidence：** High。

### AUT-C04 — 问题和反馈请求应最小、策略性且可轻松跳过

- **Claim：** 用户注意力有限，Agent 的 engagement requests 应最小且有明确用户价值，并允许轻松 dismiss。
- **直接来源：** Google PAIR, *People + AI Guidebook — Feedback + Control*.
- **Source type：** Authoritative industry guidebook；综合学术资料与 Google 内部研究/设计探索。
- **URL：** https://pair.withgoogle.com/guidebook-v2/chapter/feedback-controls/
- **Publication / update date：** 原版 2019；当前页面称已更新但未给出具体日期；访问 2026-07-10。
- **Exact supported point：** 页面要求 engagement requests 保持 strategic、minimal、easy to dismiss；反馈请求应说明对用户的具体价值、变化范围和生效时间。
- **Limitations：** Google 未公开其引用的多数内部研究细节；指导针对广义 AI 产品，不给最大问题数。
- **David implication：** 每个问题必须记录 `decision_changed`、fallback 和用户价值；用户拒答后不得反复追问非阻塞问题。
- **Confidence：** High（方向）；Low（问题数量）。

### AUT-C05 — 控制需求随责任、stakes、敏感性与个人偏好而变

- **Claim：** 用户在高风险、强责任、难表达个人偏好的任务中更可能需要保留控制；AI 应提供 opt-out、manual fallback 和可编辑性。
- **直接来源：** Google PAIR, *People + AI Guidebook — Feedback + Control*.
- **Source type：** Authoritative industry guidebook。
- **URL：** https://pair.withgoogle.com/guidebook-v2/chapter/feedback-controls/
- **Publication / update date：** 原版 2019；当前页具体更新时间未标；访问 2026-07-10。
- **Exact supported point：** 指南列出高 stakes、个人责任、难传达偏好等保留控制情境；建议允许关闭 AI、使用非自动路径、编辑/重置历史偏好，并在早期提供 manual failsafe。
- **Limitations：** 情境清单不是针对 PM/IA 的因果实验；“用户通常”不能转成所有用户的硬事实。
- **David implication：** `security/privacy/legal/payment`、目标用户、品牌/no-go 等边界至少需要 approval；creative/structural judgment 可提案但不能伪装为用户偏好。
- **Confidence：** High（控制机制）；Medium（具体决策映射）。

### AUT-C06 — 错误恢复必须给出下一步、接管上下文与多层控制

- **Claim：** AI 失败时不能只报错；应说明限制、提供可操作的恢复路径，并在转回人工控制时保留继续任务所需上下文。
- **直接来源：** Google PAIR, *People + AI Guidebook — Errors + Graceful Failure*.
- **Source type：** Authoritative industry guidebook。
- **URL：** https://pair.withgoogle.com/chapter/errors-failing/
- **Publication / update date：** 原版 2019；当前页具体更新时间未标；访问 2026-07-10。
- **Exact supported point：** 指南要求按 error risk 与 stakes 设计响应，允许 revert/retrain、提供 multiple levels of control；转为 manual control 时用户需要 situation awareness、下一步和操作方法。
- **Limitations：** 不是 agent state mutation 的实现规范；部分建议依赖产品场景。
- **David implication：** 每个 autonomy action 要包含 `recovery_plan`；中断或失败时展示已完成、未完成、状态一致性与最小修复，不把整段工作丢回用户。
- **Confidence：** High。

### AUT-C07 — 解释应服务当前决策，不应倾倒全部内部推理

- **Claim：** Explainability 的目标是帮助用户校准信任与行动；应按 stakes 展示与决策有关的信息，并允许渐进展开，而非暴露全部内部过程。
- **直接来源：** Google PAIR, *People + AI Guidebook — Explainability + Trust*.
- **Source type：** Authoritative industry guidebook。
- **URL：** https://pair.withgoogle.com/guidebook-v2/chapter/explainability-trust/
- **Publication / update date：** 原版 2019；当前页具体更新时间未标；访问 2026-07-10。
- **Exact supported point：** 指南建议清晰说明能力/限制、数据 scope/reach/removal；高 stakes 时解释 why 与限制；不必解释一切，可用 partial explanation 与 progressive disclosure，并需测试 confidence 表达。
- **Limitations：** 没有证明任何固定解释模板对 David 最优；法律所需解释因司法辖区而异。
- **David implication：** approval diff 显示 reason、evidence、affected nodes/flows/scope、风险和可逆性；不得输出 private chain-of-thought 或把事后自述当 faithful explanation。
- **Confidence：** High。

### AUT-C08 — Undo 是低/中风险自动化的核心控制，但不能替代高风险确认

- **Claim：** 可逆操作应提供易发现的 Undo/Redo；高成本错误应优先预防或在 commit 前确认。
- **直接来源：** Nielsen Norman Group, *User Control and Freedom* 与 *Error Prevention* heuristics。
- **Source type：** Authoritative UX heuristics。
- **URL：** https://www.nngroup.com/articles/user-control-and-freedom/ ; https://www.nngroup.com/articles/slips/
- **Publication / update date：** 10 Usability Heuristics 初版 1994；当前附件访问 2026-07-10。
- **Exact supported point：** User Control and Freedom 要求清晰 emergency exit 与 Undo/Redo；Error Prevention 要求先防高成本错误，并在用户 commit 前提供 confirmation。
- **Limitations：** 通用 UX heuristic，不是 AI autonomy 的实验，也不定义“高成本”。
- **David implication：** `APPLY_WITH_UNDO` 仅用于真实可恢复、影响可枚举的变更；hard-to-reverse 或跨边界变更用 `PROPOSE_FOR_APPROVAL`/`ASK_USER`。
- **Confidence：** High（控制原则）；Medium（映射阈值）。

### AUT-C09 — 自动化应按功能类型和阶段分配，而不是只有一个全局级别

- **Claim：** 自动化等级应分别考虑 information acquisition、analysis、decision selection 与 action implementation；一个系统可在不同阶段采用不同 autonomy。
- **直接来源：** Parasuraman, Sheridan & Wickens, *A Model for Types and Levels of Human Interaction with Automation*.
- **Source type：** Primary IEEE journal paper。
- **URL：** https://doi.org/10.1109/3468.844354
- **Publication / update date：** 2000-05。
- **Exact supported point：** 原文将自动化应用分为四类功能，并强调 automation 会改变人的活动与协调负担，适当等级需按功能选择。
- **Limitations：** 主要基于传统 automation/human factors；不能直接给 LLM agent 的 action policy。
- **David implication：** David 可自动抽取/检查信息，但不因此自动获得修改目标用户、付款或关键路径的权利；评测需按 decision type 分 slice。
- **Confidence：** High（分阶段原则）；Medium（David 映射）。

### AUT-C10 — 高 automation 与高 human control 可以并存

- **Claim：** Human control 与 automation 不是单轴互斥；系统可以高自动完成例行工作，同时保留中止、编辑、审批和责任边界。
- **直接来源：** Ben Shneiderman, *Human-Centered Artificial Intelligence: Reliable, Safe & Trustworthy*.
- **Source type：** Primary conceptual journal paper。
- **URL：** https://doi.org/10.1080/10447318.2020.1741118
- **Publication / update date：** 2020-03-23。
- **Exact supported point：** HCAI framework 明确主张设计高 human control 与高 computer automation 的组合，并区分何时需要全人工或全自动。
- **Limitations：** 概念框架，不验证 David 六种行为或用户偏好。
- **David implication：** 不应把 `Controlled` 模式实现成“什么都问”；应通过 bounded action space、Undo、diff、stop 与 audit 保持控制。
- **Confidence：** High（原则）；Medium（实现映射）。

### AUT-C11 — 解释和确认本身不保证有效监督

- **Claim：** 仅展示解释或把人放进 loop 不能保证适当依赖；监督设计必须测试用户是否能发现并纠正错误。
- **直接来源：** Buçinca, Malaya & Gajos, *To Trust or to Think*；Sele & Chugunova, *Putting a human in the loop*。
- **Source type：** 两项 primary empirical studies。
- **URL：** https://doi.org/10.1145/3449287 ; https://doi.org/10.1371/journal.pone.0298037
- **Publication / update date：** 2021-04；2024-02-09。
- **Exact supported point：** 前者 N=199，cognitive forcing 减少错误 AI 建议上的 overreliance，但主观偏好/复杂度存在 trade-off；后者 N=292，在预测任务中可调整 AI 建议提高采用与信心，却降低最终准确性，且用户更少纠正较大错误。
- **Limitations：** 都是受控决策任务，不是 IA co-design；不能据此要求每个 David 决策都增加 friction。
- **David implication：** approval 不能只是“同意”按钮；应展示具体 diff、后果、冲突和证据，测试 reviewer detection/correction，而不是只测点击率。
- **Confidence：** High（警示）；Medium（具体 approval UI）。

### AUT-C12 — 澄清问题的价值取决于歧义分布与用户对速度/谨慎的偏好

- **Claim：** `ASK_USER` 应以“该回答是否改变决策”为核心，而不是以表面 ambiguity 或统一 confidence 阈值为核心。
- **直接来源：** Zhang & Choi, *Clarify When Necessary: Resolving Ambiguity Through Interaction with LMs*.
- **Source type：** Primary Findings of NAACL 2025 paper。
- **URL：** https://aclanthology.org/2025.findings-naacl.306/
- **Publication / update date：** 2025-04。
- **Exact supported point：** 论文将是否澄清建模为 utility 问题，明确需要考虑用户偏好 speed/usability vs carefulness，以及可能 intents 的分布；IntentSim 在 QA、MT、NLI 上判断哪些预测受益于澄清。
- **Limitations：** 主要是 NLP task evaluation，不是 David 用户实验；entropy 不是可直接采用的产品阈值。
- **David implication：** schema 需要 `uncertainty`、`user_exclusive_knowledge`、`fallback_quality`、`interaction_cost` 与 `autonomy_mode`；同一 ambiguity 在 Fast/Controlled 下可有不同 action，但安全边界不变。
- **Confidence：** High（因素）；Low（阈值）。

### AUT-C13 — “先问还是先给结果”没有通用答案，固定 question count 不应写成科学事实

- **Claim：** 澄清策略需要优化 conversational cost 与 gain；问题顺序和轮数依任务而变，现有文献不支持 David 的统一 `3–5` / `1` / `3` 阈值。
- **直接来源：** Aliannejadi et al., *Analysing Mixed Initiatives and Search Strategies during Conversational Search*；Ho et al., *Ask Before or After?*。
- **Source type：** Primary modeling/analysis paper；2026 UC Berkeley MIMS capstone user study。
- **URL：** https://www.microsoft.com/en-us/research/wp-content/uploads/2021/10/rgfp0304-aliannejadiA.pdf ; https://www.ischool.berkeley.edu/programs/mims/projects/2026/ask-or-after-clarification-timing-and-user-experience-generative-ai
- **Publication / update date：** 2021；2026-05-08。
- **Exact supported point：** 前者明确称 feedback-first、feedback-after 或不问是开放问题，需权衡每轮成本与收益；后者 N=30，澄清提高 trust/reliability 也增加 cognitive overhead，Ask First 与 Ask After 总体无显著差异（文本任务有一项例外）。
- **Limitations：** 搜索任务与小样本学生项目都不能外推到 AI indie builder 的 IA 工作；MIMS 项目非同行评议。
- **David implication：** `3–5`、每轮 `1`、批量 `<=3` 只能作为 MVP provisional guardrail，必须通过 Wizard-of-Oz / A/B 用户研究校准。
- **Confidence：** High（缺乏通用阈值）；Low（任何具体阈值）。

### AUT-C14 — 高影响、不可逆动作需要审批，但审批过多会失去意义

- **Claim：** 审批应集中在重要、难逆动作；大量审批会压缩审查时间并产生机械通过风险，可逆动作可用 action ledger + 事后审查。
- **直接来源：** OpenAI et al., *Practices for Governing Agentic AI Systems*.
- **Source type：** Primary multi-organization white paper。
- **URL：** https://cdn.openai.com/papers/practices-for-governing-agentic-ai-systems.pdf
- **Publication / update date：** 2023-12-14。
- **Exact supported point：** Section 4.2 建议对重要且不可逆动作 proactive authorization，并指出审批过多会降低 meaningful consideration；Section 4.4 提出 action ledger 是较轻控制，事后审查的动作应比需审批动作更可逆；Section 4.7 要求 interruptibility 与 graceful fallback。
- **Limitations：** 白皮书大量内容被作者标为 open questions；不是 David 产品效果研究。
- **David implication：** `PROPOSE_FOR_APPROVAL` 由 impact/reversibility/risk/rework 触发；低风险动作批量记录并可 Undo，避免 approval fatigue；审批卡必须给足上下文。
- **Confidence：** High（风险分层方向）；Medium（具体 policy）。

### AUT-C15 — 安全、隐私、法律与外部依赖必须进入独立风险门

- **Claim：** Security/privacy/legal 不能被普通 interaction-cost 优化覆盖；需要责任、记录、测试、fallback、incident response 与 override/deactivation 条件。
- **直接来源：** NIST, *Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile* (NIST AI 600-1).
- **Source type：** Authoritative government risk-management profile。
- **URL：** https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf
- **Publication / update date：** 2024-07-26。
- **Exact supported point：** Profile 要求记录 human oversight roles、privacy/security/legal risks、acceptable-use 与 recourse、第三方依赖和 incident/fallback；持续监控 override、appeal、recovery、deactivation 与 change management。
- **Limitations：** 面向组织级 GAI 风险，不是具体 UX 规范；不提供个别产品的法律意见。
- **David implication：** `risk_flags.security/privacy/legal >= medium` 时禁止 `AUTO_APPLY`；若涉及用户/法律顾问独有事实用 `ASK_USER`，否则生成 `PROPOSE_FOR_APPROVAL` 或 `RESEARCH_OR_TEST`，并保留责任与恢复记录。
- **Confidence：** High（独立风险门）；Medium（枚举映射）。

### AUT-C16 — Agent 权限应有认证、范围与可审计委托

- **Claim：** 外部 API、认证、支付等 agentic 能力应受明确 authority scope 约束，不能把自然语言目标当作无限权限。
- **直接来源：** South et al., *Authenticated Delegation and Authorized AI Agents*.
- **Source type：** Primary 2025 technical framework paper。
- **URL：** https://arxiv.org/abs/2501.09674
- **Publication / update date：** 2025-01-16。
- **Exact supported point：** 提出 authenticated、authorized、auditable delegation，通过 agent-specific credentials/metadata 将自然语言权限转成可审计 access-control configuration。
- **Limitations：** 技术/治理框架，尚不能证明某种 UI 或审批频率有效；David 当前只产蓝图，不执行真实付款或 API 调用。
- **David implication：** 新 auth/payment/external API 不得自动加入 locked blueprint；case schema 应标记 security/privacy/legal 和 authority boundary。
- **Confidence：** Medium-High。

### AUT-C17 — Autonomy level 应表达用户角色，不应与模型能力混为一谈

- **Claim：** Agent 能做某事不代表它应被授权做；autonomy 是独立设计变量。
- **直接来源：** Feng, McDonald & Zhang, *Levels of Autonomy for AI Agents*.
- **Source type：** Primary 2025 position/framework paper。
- **URL：** https://arxiv.org/abs/2506.12469
- **Publication / update date：** 2025-06-14。
- **Exact supported point：** 将 autonomy 与 capability/environment 分离，并用 operator、collaborator、consultant、approver、observer 五类用户角色描述递增 autonomy。
- **Limitations：** Position paper，不是实证 taxonomy；五级不能直接替换 David 六种 action。
- **David implication：** 六种 action 是逐决策 policy，不是模型能力标签；Fast/Balanced/Controlled 只改变控制频率，不能放松事实、风险和 locked constraints。
- **Confidence：** Medium。

### AUT-C18 — “Human in the loop”不等于每一步预先批准

- **Claim：** Meaningful control 可以通过 advice、任务分配、override、责任与可验证响应实现；不要求每个动作都持续监控或逐一审批。
- **直接来源：** Van den Bosch et al., *Measuring Meaningful Human Control in Human–AI Teaming*.
- **Source type：** Primary empirical study，AI and Ethics 2025。
- **URL：** https://doi.org/10.1007/s43681-024-00647-8
- **Publication / update date：** 2025-01-28。
- **Exact supported point：** 研究在 pandemic triage 中比较 advice、human assignment 和 full autonomous triage；作者明确指出 meaningful control 不必等于持续监控/逐项预批，并测量 subjective、normative、moral control。
- **Limitations：** 高风险模拟医疗场景，不能外推 IA 编辑偏好；结果受任务和伦理设置影响。
- **David implication：** 评测不只看“是否问了/是否审批”，还要看用户能否理解、纠正、阻止、追责和恢复。
- **Confidence：** Medium-High（概念与测量）；Low（David 行为效果）。

## 3. 证据支持等级汇总

| 结论 | 分类 | 主要证据 | 说明 |
|---|---|---|---|
| 问题必须改变实际决策且收益高于交互成本 | Evidence-backed rule | AUT-C01、C04、C12 | 无统一数值阈值。 |
| 低风险、可逆修改可执行并提供 Undo | Evidence-backed rule | AUT-C03、C08、C14 | 必须证明 rollback 完整。 |
| 高 impact / hard reversal / security/privacy/legal 先审批或询问 | Evidence-backed direction + product safety policy | AUT-C05、C14–C16 | 具体枚举仍需专家与安全评审。 |
| 用户拒答后把非阻塞问题转 assumption，不重复追问 | Evidence-backed direction | AUT-C03、C04 | 重复检测需 deterministic state。 |
| 解释用 concise rationale + diff，不暴露 private chain-of-thought | Evidence-backed direction | AUT-C07、C11、C14 | explanation format 仍需 prototype test。 |
| 每轮最多问一个 | Provisional heuristic | AUT-C04、C13 | 目标用户研究前不可标 evidence-backed。 |
| 首轮 3–5 个问题内给提案 | Provisional heuristic | AUT-C02、C13 | 只可作为 MVP guardrail。 |
| 批量问题最多三个 | Provisional heuristic | AUT-C13 | 无直接阈值证据。 |
| 先可视化 hypothesis 再问总是更好 | Needs user research | AUT-C02、C13 | 现有证据只支持可修正草案，不支持“总是”。 |
| 六种 action 的边界能被目标用户接受 | Needs user research | 全部 | 必须用 David 用户做情境测试。 |

## 4. 不得外推的内容

1. 不把 Microsoft/PAIR guideline 当作 David 用户偏好测量。
2. 不把一个 confidence 百分比当作 autonomy action 的充分条件。
3. 不把 approval click 率、trust rating 或满意度当作正确监督。
4. 不把本研究的 synthetic seeds 当作用户行为、事故频率或产品效果。
5. 不声称 `3–5`、`1`、`3` 是科学阈值。
6. 不提供具体司法辖区的法律结论；相关决策必须由适格人员确认。
