# Agent E — Benchmark & Validator Evidence

> 角色：E — Benchmarks & Validator Design  
> 检索日期：2026-07-10  
> 输出边界：只支持 benchmark/validator 设计，不报告 David 产品效果、模型得分或真实用户结论。

## 1. 检索方法与限制

实际 query：

- site:nngroup.com Card Sorting vs. Tree Testing information architecture
- site:nngroup.com tree testing task success directness labels
- site:w3.org/WAI/WCAG22 navigation labels keyboard focus status messages
- LLM as a judge position bias verbosity bias MT-Bench primary paper
- G-Eval NLG evaluation GPT-4 human alignment primary paper
- HELM multi-metric transparent benchmark primary paper
- NIST AI RMF TEVV representative valid reliable benchmark
- site:svpg.com four big risks
- site:basecamp.com/shapeup fixed time variable scope rabbit holes
- Cucumber Gherkin observable acceptance criteria
- GitHub Copilot repository custom instructions build test validate

检索路径：

1. 先按任务要求尝试 Agent Reach 的 Exa：mcporter 返回 Unknown MCP server 'exa'；
2. 尝试 agent-reach doctor：本机返回 command not found；
3. 按 Agent Reach fallback 使用官方 URL 直读和内置 web search；
4. 只把原始论文、标准、方法所有者与产品官方文档纳入关键 claim；
5. 搜索摘要只用于定位，supported point 以打开后的原文为准。

限制：

- 没有开展 card sort、tree test、usability test、expert inter-rater study 或 downstream agent execution；
- GitHub、Cucumber 等 living docs 没有稳定 publication date，记录访问日期并降低对长期行为推断的范围；
- 方法所有者资料可支持方法定义与边界，不独立证明其对 David 用户有效；
- seed cases 与 rules 是 expert-designed synthetic artifacts，不是观察到的模型错误或用户行为。

## 2. Claim–Evidence Records

### E-01 — Benchmark 应保留多场景、多维度和原始 findings，不用单一总分

- **Claim：** IA benchmark 应输出 rubric vector、blockers 和逐 case error analysis，而不是一个加权总分。
- **Source title：** Holistic Evaluation of Language Models (HELM)
- **Source type：** A；Stanford CRFM 原始论文
- **URL：** https://arxiv.org/abs/2211.09110
- **Publication / update date：** 2022-11-16（arXiv 初次提交）
- **Exact supported point：** HELM 先建立 scenario/metric taxonomy，再在场景上同时测多个指标并公开 raw prompts/completions，用于暴露 trade-off 和覆盖空缺。
- **Limitations：** 研究对象是 language model，不是 IA artifact；它支持评测结构原则，不提供 David 的 rubric 维度或阈值。
- **David implication：** 采用 7 类产品场景、13 维向量、blocker 单列和 raw findings；任何总览都不得抵消 blocker。
- **Confidence：** High（仅限 multi-scenario / multi-metric / transparency 原则）。

### E-02 — Benchmark 的代表性、可重复性和 generalizability 必须显式记录

- **Claim：** 每次 benchmark run 必须版本化 test set、metrics、tools、deployment-like conditions、uncertainty 和适用范围。
- **Source title：** Artificial Intelligence Risk Management Framework (AI RMF 1.0), MAP / MEASURE
- **Source type：** A；NIST 官方框架
- **URL：** https://airc.nist.gov/airmf-resources/airmf/5-sec-core/
- **Publication / update date：** 2023-01-26（AI RMF 1.0 发布）
- **Exact supported point：** MAP 2.3 要求记录 experimental design、data selection、representativeness、suitability 与 construct validation；MEASURE 要求 objective/repeatable/scalable TEVV、uncertainty、benchmarks、test sets、tools、近似部署条件和 generalizability limits。
- **Limitations：** 风险管理框架是 use-case agnostic，不定义 IA 质量或具体 evaluator。
- **David implication：** run manifest、case split、validator/judge version、raw outputs、not-run 状态和限制必须进入 harness。
- **Confidence：** High。

### E-03 — Gold IA 不能按唯一树 exact match

- **Claim：** Gold 应是 constraints + acceptable alternatives 的 reference envelope，而不是唯一 sitemap。
- **Source title：** Card Sorting vs. Tree Testing
- **Source type：** B；Nielsen Norman Group authoritative UX guidance
- **URL：** https://www.nngroup.com/articles/card-sorting-tree-testing-differences/
- **Publication / update date：** 2024-02-23
- **Exact supported point：** card sorting 用于生成用户可能如何分组的 ideas；参与者会产生不同组织，研究者仍需专业判断和额外研究。Tree testing 用于评估既有或候选层级。
- **Limitations：** 文章是方法指南，不是不同 Gold-scoring 方法的对照实验。
- **David implication：** expert 可以接受不同于 seed recommendation 的结构，只要覆盖事实、约束、flow、scope 并说明 trade-off。
- **Confidence：** High（方法边界）；Medium（外推到 Gold envelope 设计）。

### E-04 — Findability 结果属于 human test，不属于 expert 或 LLM 推断

- **Claim：** label/category 的实际 findability 必须通过代表性用户 tree test 或等价行为证据验证。
- **Source title：** Tree Testing: Fast, Iterative Evaluation of Menu Labels and Categories
- **Source type：** B；Nielsen Norman Group authoritative UX guidance
- **URL：** https://www.nngroup.com/articles/tree-testing/
- **Publication / update date：** 2023-08-06
- **Exact supported point：** tree testing 让参与者在简化 hierarchy 中找资源，可记录 success、time、first path/bounces 和 directness；quantitative test 可比较 IA，qualitative small study 不适合统计推断。
- **Limitations：** tree 缺少 layout、color、image 等上下文；不能替代完整 prototype usability test。
- **David implication：** expert/LLM 只能标记风险；task success、directness、time 和用户 confidence 必须放到 human-test layer，并记录任务措辞避免答案提示。
- **Confidence：** High。

### E-05 — Label clarity 需要相对于目标和上下文评价

- **Claim：** Label rubric 应检查 label、目的地、上下文和 user vocabulary 的对应关系，不能只跑 vague-word blacklist。
- **Source title：** Information Scent: How Users Decide Where to Go Next
- **Source type：** B；Nielsen Norman Group authoritative UX guidance
- **URL：** https://www.nngroup.com/articles/information-scent/
- **Publication / update date：** 2020-02-02
- **Exact supported point：** information scent 是用户基于 source representation 对其价值的估计，受 label、邻近上下文和先验经验影响；clear/self-explanatory label 仍可能因目标用户不懂术语而失败。
- **Limitations：** 不提供自动检测器或普遍可用的好/坏 label 列表。
- **David implication：** VAL-LAB-002 只能是 Warning + judgment rule；真实理解由 label/tree test 负责。
- **Confidence：** High。

### E-06 — Flow 与 wireframe 必须作为相互引用的不同投影

- **Claim：** Wireframe alignment 应检查 screen context、interaction edge 和 dynamic feedback，而非只检查页面是否存在。
- **Source title：** Wireflows: A UX Deliverable for Workflows and Apps
- **Source type：** B；Nielsen Norman Group authoritative UX guidance
- **URL：** https://www.nngroup.com/articles/wireflows/
- **Publication / update date：** 2016-12-04
- **Exact supported point：** wireflows 将 wireframe-style layout 与 simplified flowchart 结合，用 screen context 表达 task interaction；普通 wireframe 难描述动态内容与反馈，普通 flowchart 又缺页面上下文。
- **Limitations：** 方法文章不定义 David 的 canonical IDs 或 P0 gate。
- **David implication：** wireframe 必须引用 IA node/Mini-IA/flow states；flow edge 应指出 action 和 resulting screen/state。
- **Confidence：** High（方法定义）；Medium（具体字段设计）。

### E-07 — 复杂依赖需映射 frontstage/backstage 与 failure ownership

- **Claim：** AI/API/人工运营依赖不能只列 vendor 名称；应关联 customer action、frontstage、backstage、process/owner 和 recovery。
- **Source title：** Service Blueprints: Definition
- **Source type：** B；Nielsen Norman Group authoritative UX guidance
- **URL：** https://www.nngroup.com/articles/service-blueprints-definition/
- **Publication / update date：** 2017-08-27
- **Exact supported point：** service blueprint 显示与 customer touchpoint 直接相关的人、证据和流程关系，暴露用户看得见/看不见的 dependencies 与 systemic weaknesses。
- **Limitations：** 简单本地或静态产品未必需要 service blueprint；是否适用需 expert 判断。
- **David implication：** VAL-DEP-002 是 judgment Warning；AI workflow、marketplace、external API 等 case 应提供 backstage mapping 和 failure/recovery。
- **Confidence：** High（适用产品）；不适用范围明确。

### E-08 — Scope validator 应检查 coherent slice、appetite、rabbit holes 与 no-gos

- **Claim：** Scope 质量不等于 feature 优先级列表；必须保持 core outcome 并显式暴露技术未知、依赖和 out-of-bounds。
- **Source title：** Shape Up — Set Boundaries；Risks and Rabbit Holes
- **Source type：** A；方法所有者 Basecamp 原文
- **URL：** https://basecamp.com/shapeup/1.2-chapter-03 ; https://basecamp.com/shapeup/1.4-chapter-05
- **Publication / update date：** 2019 online book；访问 2026-07-10
- **Exact supported point：** appetite 以 fixed time / variable scope 约束 solution；shaping 需通过慢走 use case 找缺口，识别 technical assumptions/interdependencies，并声明 out-of-bounds 和 cutbacks。
- **Limitations：** Shape Up 是 Basecamp 的方法，不是独立效果实验；不能推出固定 appetite 或普遍流程。
- **David implication：** VAL-SCP-001 对 core path 依赖 Later/Excluded 定为 Blocker；VAL-SCP-002 对缺 appetite/no-go/rabbit-hole 定为 Warning。
- **Confidence：** High（方法内容）；Medium（severity 映射，仍需校准）。

### E-09 — Four Risks 需要独立覆盖，不能由 IA 漂亮度替代

- **Claim：** 对适用 case 要分别记录 value、usability、feasibility、viability risk。
- **Source title：** The Four Big Risks
- **Source type：** A；SVPG 方法作者原文
- **URL：** https://www.svpg.com/four-big-risks/
- **Publication / update date：** 2017-12-04
- **Exact supported point：** 文章分别定义用户是否选择、能否使用、团队能否以现有时间/技能/技术构建，以及方案是否适合业务四类风险。
- **Limitations：** 方法定义不证明四个标签覆盖所有风险，也不提供 severity 阈值。
- **David implication：** 缺适用 risk 默认 Warning；高风险被静默标 resolved/accepted 且无 owner/evidence/approval 为 Blocker。
- **Confidence：** High（分类定义）；Medium（validator severity）。

### E-10 — Accessibility 规则可部分 deterministic，但 low-fi 阶段仍需适用性判断

- **Claim：** P0 wireframe/interaction contract 至少要表达 keyboard path、focus exit、descriptive labels/accessible names 和 dynamic status semantics。
- **Source title：** Web Content Accessibility Guidelines (WCAG) 2.2；Understanding Headings and Labels；Understanding Status Messages
- **Source type：** A；W3C Recommendation 与 WAI 官方说明
- **URL：** https://www.w3.org/TR/WCAG22/ ; https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html ; https://www.w3.org/WAI/WCAG22/Understanding/status-messages
- **Publication / update date：** WCAG 2.2 当前 Recommendation 2024-12-12；Understanding docs 为 living docs，访问 2026-07-10
- **Exact supported point：** WCAG 2.1.1/2.1.2 要求 keyboard operability 与无 keyboard trap；2.4.6 要求 headings/labels 描述 topic/purpose；2.5.3 要求 visual label text 包含在 accessible name；4.1.3 要求无 focus change 的 status 可被 assistive technology 判定。
- **Limitations：** low-fi Blueprint 不能证明最终实现 conformance；平台原生应用还需相应平台 accessibility 规范。
- **David implication：** rule seed 将 keyboard trap、核心 control name 设 Blocker，将一般 status semantic 设 Warning，并允许关键 error 不可感知时升级。
- **Confidence：** High。

### E-11 — Acceptance Criteria 应描述可观察的前提、事件和结果

- **Claim：** P0 acceptance criteria 需可测试并以 user/external observable outcome 结束，不应只断言内部数据库实现。
- **Source title：** Gherkin Reference
- **Source type：** A；Cucumber 官方文档
- **URL：** https://cucumber.io/docs/gherkin/reference/
- **Publication / update date：** living docs；访问 2026-07-10
- **Exact supported point：** Gherkin 将 Example/Scenario 视为 executable specification，以 Given 配置 known state、When 表示 event/action、Then 比较 observable outcome，并建议隐藏 implementation details。
- **Limitations：** David 不必强制使用 Gherkin 文法；复杂非功能要求需要其他测试表达。
- **David implication：** VAL-AC-002 检查等价 precondition/event/outcome 语义而非关键词 exact match。
- **Confidence：** High（官方语义）；Medium（应用到全部 AC）。

### E-12 — Handoff 必须含 repo-scoped instructions 与 build/test/validate 信息

- **Claim：** Coding-agent handoff 至少应打包 project context、scoped instructions、build/test/validate commands 和适用路径。
- **Source title：** Adding repository custom instructions for GitHub Copilot in your IDE
- **Source type：** A；GitHub 官方产品文档
- **URL：** https://docs.github.com/en/copilot/how-tos/configure-custom-instructions-in-your-ide/add-repository-instructions-in-your-ide?tool=visualstudio
- **Publication / update date：** living docs；访问 2026-07-10
- **Exact supported point：** GitHub 说明 repository custom instructions 给 agent 理解 project 以及 build/test/validate changes 的上下文；支持 repository-wide、path-specific 和 nearest AGENTS.md precedence。
- **Limitations：** 只证明 GitHub Copilot 的 instruction intake 能力；不证明任何 handoff 内容提升任务成功，也不代表 Codex/Cursor/Claude Code 的完全相同语义。
- **David implication：** Handoff validator 检查 refs、scope、commands、done-when；跨 agent 的真实执行必须另跑 downstream test。
- **Confidence：** High（GitHub 官方能力）；Low–Medium（跨 agent 泛化）。

### E-13 — LLM critic 可以做结构化 rubric 初筛，但必须校准

- **Claim：** LLM evaluator 可用于逐维 form-filling review，但不能未经校准替代 expert/human。
- **Source title：** G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment
- **Source type：** A；EMNLP 2023 原始论文
- **URL：** https://aclanthology.org/2023.emnlp-main.153/
- **Publication / update date：** 2023-12
- **Exact supported point：** G-Eval 使用 structured criteria 和 form-filling 评估 summarization/dialogue，并报告比早期自动指标更高的人类相关；同时指出对 LLM-generated text 的潜在偏好。
- **Limitations：** 只测试两类 NLG task；报告的 correlation 不能迁移成 IA judge 准确率。
- **David implication：** LLM critic 每次只判一个 dimension，返回 evidence span/uncertainty/review flag，并与专家 calibration set 比较。
- **Confidence：** High（论文结果范围内）；Medium（IA critic 设计外推）。

### E-14 — Pairwise LLM judge 必须审计 position/verbosity/self-preference bias

- **Claim：** Pairwise judge 至少要交换 A/B 顺序、固定 judge version，并保留人工 calibration。
- **Source title：** Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena
- **Source type：** A；NeurIPS 2023 Datasets and Benchmarks 原始论文
- **URL：** https://proceedings.neurips.cc/paper_files/paper/2023/file/91f18a1287b398d378ef22505bf41832-Paper-Datasets_and_Benchmarks.pdf
- **Publication / update date：** 2023
- **Exact supported point：** 论文系统讨论 LLM judge 的 position、verbosity、self-enhancement 与 reasoning limitations，并用 expert/crowd human preference 比较 judge；作者提出 hybrid evaluation。
- **Limitations：** 对话偏好任务与 IA rubric 不同；不同 judge/version/bias 会变化。
- **David implication：** judge 不是唯一 verdict；pairwise 做 order swap，报告 stability，model/prompt/settings 全部版本化。
- **Confidence：** High。

## 3. Evidence → Product / Schema / Evaluation 汇总

| Evidence | Product implication | Agent behavior rule | Data / schema implication | Validation requirement |
|---|---|---|---|---|
| E-01/E-02 | 多维、可追溯、版本化 | 不输出虚构总分或未运行 pass | run manifest、rubric vector、not_run | case-level + dimension-level 报告 |
| E-03/E-04 | Gold 是 envelope | 接受可辩护替代 IA | alternatives、change conditions | expert adjudication + tree test |
| E-05 | label 依赖用户目标/上下文 | 只标风险，不声称理解 | vocabulary、purpose、context | label/tree test |
| E-06/E-07 | artifacts 必须 connected | flow/wireframe/dependency cascade check | canonical refs、service mapping | graph check + expert review |
| E-08/E-09 | Scope/Risk 不可被视觉完整性替代 | core-path break 阻断 handoff | scope state、risk status/owner | closure check + risk review |
| E-10 | accessibility 进入 Blueprint gate | 可机械检查的先检查，适用性仍复核 | keyboard/focus/name/status fields | deterministic + implementation audit |
| E-11/E-12 | Handoff 必须可验证 | 没有 AC/commands/refs 不得 ready | AC、commands、done-when、files | parse + downstream execution |
| E-13/E-14 | LLM judge 是 calibrated critic | 单维、evidence span、order audit | judge manifest、uncertainty | expert agreement 与 bias audit |

## 4. 不应写入 Contract 的“伪结论”

- “13 维 rubric 已证明最优”；
- “0–3 anchor 已达到可靠 inter-rater agreement”；
- “LLM critic 对 IA 与专家高度一致”；
- “7 条 seed 代表真实 AI indie builder 分布”；
- “某个 label/tree 已被目标用户理解”；
- “validator 已有可接受误报率/召回率”；
- “handoff 已被 Codex、Cursor、Claude Code 正确执行”。

以上全部需要未来的 expert calibration、真实用户研究或 downstream execution；当前状态只能写 planned / not_run。
