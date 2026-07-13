# Source Registry

> 访问日期：2026-07-10。此表是 Coordinator 的跨域主索引；各研究角色的细粒度 Claim–Evidence 见同目录 `agent_*_evidence.md`。日期未知时不猜测。

## 1. IA / UX Foundations

| ID | Source | Type / date | Exact supported point | Limitation | David application | Confidence |
|---|---|---|---|---|---|---|
| SRC-IA-01 | [NN/g — Information Architecture vs. Sitemaps](https://www.nngroup.com/articles/information-architecture-sitemaps/) | Authoritative professional | IA 是组织、结构与标记信息的实践；sitemap 只是结构的一种表示 | 不是 David 输出的效果研究 | 保留 IA 与 Canvas projection / sitemap 的边界 | High |
| SRC-IA-02 | [NN/g — Information Architecture: Study Guide](https://www.nngroup.com/articles/ia-study-guide/) | Authoritative professional | IA 覆盖 organization、labeling、navigation、search；card sorting 用于发现，tree testing 用于评估 | 方法集合，不给出 David-specific 阈值 | Skill registry 与 validator domain | High |
| SRC-IA-03 | [NN/g — Mental Models and User Experience Design](https://www.nngroup.com/articles/mental-models/) | Authoritative professional | 用户以既有 mental model 预测系统；设计应与模型一致或帮助形成新模型 | 不证明 AI 推测出的模型真实 | 强制使用 `mental_model_hypothesis` 与 provenance | High |
| SRC-IA-04 | [NN/g — Card Sorting: Uncover Users’ Mental Models](https://www.nngroup.com/articles/card-sorting-definition/) | Authoritative professional | Card sorting 可发现参与者如何分组和命名内容 | 参与者样本和任务影响结果；不能由 AI 模拟替代 | Gold case 的 validation plan；禁止 evidence laundering | High |
| SRC-IA-05 | [NN/g — Card Sorting vs. Tree Testing](https://www.nngroup.com/articles/card-sorting-tree-testing-differences/) | Authoritative professional | Card sorting 更偏发现；tree testing 评估已提出的结构 | 不覆盖完整 UI 与 contextual navigation | 区分生成 IA 与验证 IA 的指标 | High |
| SRC-IA-06 | [NN/g — Tree Testing](https://www.nngroup.com/articles/tree-testing/) | Authoritative professional | Tree testing 用任务检验 hierarchy/labels/findability | 不能测视觉布局或完整交互 | Human-test metrics：success、directness、path behavior | High |
| SRC-IA-07 | [NN/g — Information Scent](https://www.nngroup.com/articles/information-scent/) | Authoritative professional | 用户根据 label/context 预测目的地价值 | 对具体 label 的理解仍需用户验证 | Label Skill 与 expert rubric | High |
| SRC-IA-08 | [NN/g — Wireflows](https://www.nngroup.com/articles/wireflows/) | Authoritative professional | Wireflow 结合页面级结构与流程，适合应用和工作流 | 不决定 David Canvas 的具体表现 | IA node expansion + flow overlay，而非割裂页面 | High |
| SRC-IA-09 | [NN/g — User Journeys vs. User Flows](https://www.nngroup.com/articles/user-journeys-vs-user-flows/) | Authoritative professional | Flow 是完成具体任务的交互路径，journey 更广 | 术语边界，不证明 flow 完整性 | Flow schema、validator 与 scope gate | High |
| SRC-IA-10 | [NN/g — Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/) | Authoritative professional | 延后低频/高级内容可降低初始复杂度和错误 | 不等于 Canvas 必须 semantic zoom | Canvas disclosure 与 node mini-IA 规则 | Medium-High |
| SRC-IA-11 | [NN/g — Taxonomy 101](https://www.nngroup.com/articles/taxonomy-101/) | Authoritative professional | Taxonomy 是支持一致分类与检索的 backstage structure | 不规定所有产品需要正式 taxonomy | Inventory、metadata 与 hierarchy validator | High |
| SRC-IA-12 | [NN/g — The 3-Click Rule Is False](https://www.nngroup.com/articles/3-click-rule/) | Authoritative professional | 没有可靠证据支持固定三次点击上限 | 不代表任意深度都可接受 | 禁止以 click count 单独评价 IA | High |

## 2. PM / Product Methods

| ID | Source | Type / date | Exact supported point | Limitation | David application | Confidence |
|---|---|---|---|---|---|---|
| SRC-PM-01 | [Christensen Institute — Jobs to Be Done Theory](https://www.christenseninstitute.org/theory/jobs-to-be-done/) | Method owner / authoritative | JTBD 关注特定情境中用户寻求的 progress，而非人口属性或 feature request | 不直接生成 IA | Intent framing；避免 feature laundering | High for method |
| SRC-PM-02 | [GOV.UK — Start by learning user needs](https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs) | Government service standard | 应从用户试图完成的事情开始，以研究持续检验假设 | 语境以公共服务为主 | Orient、Intent、real-user research plan | High |
| SRC-PM-03 | [Product Talk — Opportunity Solution Trees](https://www.producttalk.org/opportunity-solution-trees/) | Method owner | 将 outcome、opportunities、solutions、tests 外化并保持关联 | 作者方法，不是独立效果实验 | Candidate reasoning 可视化与 assumption links | Medium-High |
| SRC-PM-04 | [Product Talk — Assumption Testing](https://www.producttalk.org/assumption-testing/) | Method owner | 先识别并测试具体 assumption，而不是用完整 build 检验整个 idea | 不能给出通用通过阈值 | `RESEARCH_OR_TEST` 与 validation plan | Medium-High |
| SRC-PM-05 | [Basecamp — Shape Up](https://basecamp.com/shapeup) | Method owner / book | Appetite 是约束；shaping 明确核心方案、rabbit holes、no-gos，scope 可变 | 来自特定团队实践；并非所有产品适用 | MVP shaping 与 scope cut，不作通用 ranking | Medium-High |
| SRC-PM-06 | [SVPG — The Four Big Risks](https://www.svpg.com/four-big-risks/) | Authoritative practitioner | 产品决策需处理 value、usability、feasibility、business viability 风险 | 风险等级仍需具体证据 | Risk validator 与 handoff readiness | Medium-High |
| SRC-PM-07 | [Intercom — RICE](https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/) | Method owner | RICE 用 Reach、Impact、Confidence、Effort 比较 competing initiatives | 输入常为估计；不适合定义 coherent first flow | 只在候选项目排序触发，禁止万能化 | Medium |
| SRC-PM-08 | [Agile Business Consortium — MoSCoW](https://www.agilebusiness.org/resource/what-is-moscow-prioritization/) | Method authority | 将当前 timebox 的 requirements 分成 Must/Should/Could/Won’t | 分类可被滥用；不自动保证 end-to-end outcome | Release requirement 分类，配合 story slice | Medium-High |
| SRC-PM-09 | [NN/g — Service Blueprints](https://www.nngroup.com/articles/service-blueprints-definition/) | Authoritative professional | Service blueprint 将 customer touchpoints、frontstage、backstage、support process 关联 | 并非纯 IA 方法 | AI/API/ops 依赖的 backstage validation | High |

## 3. Human–AI Interaction

| ID | Source | Type / date | Exact supported point | Limitation | David application | Confidence |
|---|---|---|---|---|---|---|
| SRC-AUT-01 | [Amershi et al. — Guidelines for Human-AI Interaction](https://doi.org/10.1145/3290605.3300233) | CHI 2019 primary paper | 18 条 guideline 经多轮评估，包括 49 位 practitioners 对 20 个 AI 产品的检验；涵盖初始、日常、错误与随时间行为 | 广义 guideline，不提供 David question count 或 action threshold | correction、relevance、control、feedback、failure 的上位规则 | High within scope |
| SRC-AUT-02 | [Microsoft Research project page](https://www.microsoft.com/en-us/research/project/guidelines-for-human-ai-interaction/) | Official project page / 2019 | 指南强调 AI 错误时的纠正、控制和长期适应 | 是指南入口，不是额外独立证据 | Autonomy policy 设计检查表 | High |
| SRC-AUT-03 | [Google PAIR — Feedback + Control](https://pair.withgoogle.com/guidebook-v2/chapter/feedback-controls/) | Official guidebook, updated edition | 控制与自动化需平衡；AI 输出应可适配、编辑或关闭；高风险/早期需 manual failsafe | 基于跨项目研究与案例，但页面不提供 David-specific effect size | Undo、editability、opt-out、approval 与 feedback loop | Medium-High |
| SRC-AUT-04 | [Google PAIR — Errors + Graceful Failure](https://pair.withgoogle.com/chapter/errors-failing/) | Official guidebook | 需定义 failure、识别来源、提供前进路径并在必要时把控制权还给用户 | 具体恢复 UI 需产品测试 | Reject/rollback/recovery 与低置信降级 | Medium-High |
| SRC-AUT-05 | [Google PAIR — Mental Models](https://pair.withgoogle.com/guidebook-v2/chapter/mental-models/) | Official guidebook | AI 能力、限制和变化应形成可校准 mental model，失败时应支持反馈 | 不支持 anthropomorphic coworker 必然更好 | 显示能力边界、provenance、feedback effect | Medium-High |

## 4. Evaluation

| ID | Source | Type / date | Exact supported point | Limitation | David application | Confidence |
|---|---|---|---|---|---|---|
| SRC-EVAL-01 | [OpenAI — Evals API](https://platform.openai.com/docs/api-reference/evals) | Official product documentation, accessed 2026-07-10 | Eval 由 data source schema、testing criteria、run 与 grader 组成；可使用 label/model grader | 官方 capability，不证明 grader 对 IA 的可靠性 | Evaluation harness 的结构输入 | High for capability |
| SRC-EVAL-02 | [Validity of IA evaluation methods: tree-testing variants and prototype testing](https://www.sciencedirect.com/science/article/pii/S0950584925000795) | Primary research / 2025 | IA 可用 success、directness、visit/first-click、destination、time 与 backtracking 指标；tree test 与 prototype test 测量边界不同 | 特定研究设计，需检查参与者/产品语境 | Human metrics 与 benchmark 方法分层 | Medium-High |

## 5. Coding-Agent Handoff

| ID | Source | Type / date | Exact supported point | Limitation | David application | Confidence |
|---|---|---|---|---|---|---|
| SRC-HO-01 | [Cursor — Rules](https://cursor.com/docs/rules) | Official docs, accessed 2026-07-10 | Project rules 存在 `.cursor/rules`；支持 scoped reusable instructions；`.cursorrules` legacy | 只说明载入机制，不证明任务成功 | Cursor adapter 与 versioned instruction placement | High for capability |
| SRC-HO-02 | [Anthropic — Claude Code memory](https://docs.anthropic.com/en/docs/claude-code/memory) | Official docs, accessed 2026-07-10 | Claude Code 通过 `CLAUDE.md` 层级与 imports 提供持久项目指令 | 页面会更新；不能代替 execution test | Claude adapter、file hierarchy、context references | High for capability |
| SRC-HO-03 | [GitHub Docs — Customizing Copilot responses](https://docs.github.com/en/copilot/concepts/prompting/response-customization) | Official docs, accessed 2026-07-10 | Copilot 支持 repository custom instructions 与 agent instructions，但不同功能支持范围不同 | 支持矩阵随产品变化 | Copilot adapter 与 compatibility metadata | High for capability |
| SRC-HO-04 | [VS Code — Custom instructions](https://code.visualstudio.com/docs/agent-customization/custom-instructions) | Official docs, updated 2026 | 支持 `.github/copilot-instructions.md`、scoped `.instructions.md`、`AGENTS.md`、`CLAUDE.md`；建议从简洁 repository-wide instructions 开始 | VS Code 与 GitHub surface 能力不完全相同 | Universal core 与 surface adapter 分离 | High for capability |
| SRC-HO-05 | [GitHub Blog — Onboarding Copilot coding agent](https://github.blog/ai-and-ml/github-copilot/onboarding-your-ai-peer-programmer-setting-up-github-copilot-coding-agent-for-success/) | First-party practice / 2025 | Repository knowledge、custom instructions、环境和清晰任务有助于 agent 开始工作 | First-party advice，不是独立 controlled outcome study | Repo context、commands、done-when 与 environment checks | Medium |
| SRC-HO-06 | [OpenAI — Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md) | Official docs, accessed 2026-07-10 | Codex 按 global→repo root→cwd 构建 instruction chain；同目录 override 优先，默认合并上限 32 KiB | 证明加载机制，不证明持续遵循或 outcome | Codex adapter、scope/precedence preflight、最小 instruction context | High for capability |
| SRC-HO-07 | [SWE-Bench Pro](https://openreview.net/forum?id=9R2iUHhVfr) | Primary benchmark / 2025–2026 | 在该 benchmark/scaffold 中，补充 human-written requirements/interface 后两种 frontier model 的 solve rate 明显高于只给 problem statement；完整设置仍低于约 26% | 特定任务、模型和 scaffold；requirements 可能比真实上游更完整 | Handoff 需要明确 requirements/interface/tests，但不得承诺成功 | High in-study / Medium transfer |
| SRC-HO-08 | [Evaluating AGENTS.md](https://arxiv.org/abs/2602.11988) | Primary empirical study / 2026 | Context file 会改变行为和成本，但总体未显著提升 success；LLM-generated files 在该设置中增加成本且略降表现 | Python benchmark、特定 agents/models；repo 既有 docs 会影响结果 | Instruction artifact 必须 task-relevant、短小并做 regression，不以文件存在验收 | High in-study |
| SRC-HO-09 | [Anthropic — How Claude Code is used in practice](https://www.anthropic.com/research/claude-code-expertise) | Vendor telemetry / 2026-06-16 | 约 400k interactive sessions 的 classifier analysis 中，人更多做 planning decisions，Agent 更多做 execution decisions；expertise 与 verified signals 相关 | Vendor classifiers；不观察代码长期采用/经济结果；相关非因果 | Blueprint 冻结 what/done/boundaries，低层 how 留给 coding agent | Medium-High |

## 6. Registry Notes

- `SRC-*` 只说明来源能支持的最窄范围；具体 Claim 仍需在 `02_claim_evidence_matrix.md` 记录 limitation 与映射。
- Agent-specific instruction file 的存在属于 capability evidence；“能提高实现正确率”必须由 downstream execution experiment 验证。
- Question Budget、Autonomy thresholds、Canvas comprehension、Gold rubric 权重和 blocker severity 当前没有 David 用户/执行结果，默认保持 provisional。
