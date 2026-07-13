# Agent D — Real Builder / Team Workflow Evidence

> 状态：Desktop research 完成；未执行真实用户研究或产品实验  
> 角色边界：AI indie builder、PM、Designer、Engineering 在 AI coding 前后的规划、交接、纠错与真实问题语言  
> 检索日期：2026-07-10  
> 权威顺序：`01_ia_reasoning_and_agent_autonomy_contract.md` > `00_david_mode_b_positioning_and_principles.md` > 其他资料  
> 证据规则：Primary study / authoritative source 优先；vendor case 与 practitioner post 不证明普遍规律；synthetic case 只可作为测试刺激

## 1. 结论边界

本文件能支持的是：

- 真实 practitioner 如何把 requirements 拆成可执行任务并补上下文；
- 近年 Coding Agent 官方推荐的 Explore / Plan / Implement / Verify 工作流；
- PM、Designer、Engineer 在 delegation、review、handoff 中出现的候选决策与痛点语言；
- 为什么 David 的 Handoff 需要把意图、约束、任务、验收和验证连起来；
- 为什么 Question Budget、Structure Diff 和 autonomy 偏好必须做目标用户研究。

本文件不能支持的是：

- AI indie builder 普遍能接受 `3–5` 个前置问题；
- 某一种 plan、diff 或 handoff UI 一定提高 David 用户的成功率；
- 单个 Reddit、Cursor Forum 或 GitHub Discussion 帖子代表某一人群；
- Anthropic、OpenAI、GitHub、Cursor 的内部成功案例可直接外推到独立开发者；
- synthetic evaluation case 是用户证据；
- 尚未执行的 A/B、Wizard-of-Oz 或 downstream execution test 有任何结果。

## 2. 检索执行与 Query Log

### 2.1 Agent Reach 路径状态

| 路径 | 执行结果 | 处理 |
|---|---|---|
| `agent-reach doctor --json` | 失败：`command not found` | 按 prompt 允许的降级链继续，并记录渠道限制 |
| `mcporter` / Exa | 失败：`Unknown MCP server 'exa'` | 改用官方域名定向检索、官方网页和原始论文 |
| Jina Reader | shell 请求多次 30 秒超时 | 不用超时请求补全内容；改读可访问的官方原页 |
| `opencli reddit` | 成功 | 只提取候选工作流和痛点语言 |
| `twitter-cli` | 失败：无 Twitter cookies | 按重试链转 `opencli twitter` |
| `opencli twitter` | 失败：`AUTH_REQUIRED` | Twitter 未纳入证据；不推测缺失内容 |
| `gh` | 成功 | 核验 `github/spec-kit` 官方仓库和 `spec-driven.md` |
| 官方网页 / 论文全文 | 成功 | 用于主要 Claim–Evidence 记录 |

### 2.2 实际搜索 Query

| Query ID | Query | 目标 | 结果摘要 |
|---|---|---|---|
| Q-D-01 | `site:openai.com Codex best practices AGENTS.md plan task acceptance criteria 2025` | Codex 规划与 handoff | 找到 Harness Engineering 与 Codex 官方材料 |
| Q-D-02 | `site:docs.anthropic.com Claude Code best practices plan mode CLAUDE.md workflow 2025` | Claude Code 工作流 | 找到 Explore → Plan → Implement → Commit、Plan Mode、memory |
| Q-D-03 | `site:docs.github.com Copilot coding agent custom instructions plan acceptance criteria 2025` | Copilot task handoff | 找到 well-scoped task、acceptance criteria、build/test instructions |
| Q-D-04 | `site:cursor.com/docs agent planning rules review changes 2025` | Cursor planning / recovery | 找到 Plan Mode、Planning、Checkpoints |
| Q-D-05 | `site:github.blog spec-driven development Spec Kit product requirements plan tasks implement 2025` | spec-to-code 链路 | 找到 Spec → Plan → Tasks 与小块验证工作流 |
| Q-D-06 | `site:dora.dev/research 2025 AI software development process trust rework` | 团队系统与 AI | 找到 DORA 2025，作为背景来源而非 David 直接证据 |
| Q-D-07 | `site:survey.stackoverflow.co/2025 AI tools frustration almost right debugging trust` | 纠错痛点规模 | 找到 2025 Developer Survey 的 trust / almost-right / debugging 数据 |
| Q-D-08 | `product manager using Claude Code requirements handoff engineering workflow 2025` | PM 工作流 | 找到 PM delegation primary study 与 vendor cases |
| Q-D-09 | `Product Manager Practices for Delegating Work to Generative AI accountability` | PM delegation | 找到 885 survey / 731 telemetry / 15 interviews 的原始论文 |
| Q-D-10 | `From Requirements to Code developer practices LLM-assisted software engineering` | Requirements → prompt | 找到 18 practitioner / 14 company 原始研究 |
| Q-D-11 | `site:anthropic.com How Anthropic teams use Claude Code product design` | Designer / Engineering | 找到 Product Design、Product Engineering 内部案例 |
| Q-D-12 | `site:reddit.com/r/UXDesign AI coding prototype engineering handoff 2025` | Designer 真实语言 | 找到 Figma + HTML prototype、intent、edge case 候选语言 |
| Q-D-13 | `site:forum.cursor.com plan mode context requirements off track manual steering` | Builder 真实语言 | 找到 context 构建负担、偏航、manual steering 帖子 |
| Q-D-14 | `opencli reddit search "plan mode" requirements wrong implementation` | Builder 工作流 | 找到资深 engineer、no-coder 的对比性个案 |
| Q-D-15 | `site:github.com/orgs/community/discussions Copilot diff approval workflow` | 控制与 diff 语言 | 找到“lose control quickly”“not serious work”个案 |
| Q-D-16 | `site:gov.uk/service-manual/user-research plan research sample prototype` | 研究计划与样本 | 找到每轮 4–8 人、A/B 需大样本、实际用户招募原则 |
| Q-D-17 | `site:microsoft.com/research Wizard of Oz AI user research realistic errors` | Wizard-of-Oz | 找到需模拟现实错误、避免过度理想原型的方法建议 |
| Q-D-18 | `AI coding agent plan mode spec requirements corrections` on Twitter | 社交平台补充 | 两条 Twitter 登录态路径均失败；无证据入库 |

## 3. 候选来源与工作流证据

| Source ID | 来源 | 类型 / 样本 | 候选工作流证据 | 使用状态 |
|---|---|---|---|---|
| SRC-D-01 | Ullrich et al., *From Requirements to Code* | Primary study；18 practitioners、14 companies、12 domains | Requirements → programming tasks → design / architecture context → prompt → inspect / adjust | 核心证据 |
| SRC-D-02 | Ulloa et al., *Product Manager Practices for Delegating Work to Generative AI* | Primary mixed-methods；885 PM survey、731 telemetry、15 interviews；Microsoft | PM delegation 受 accountability、identity、team norms 影响；部分 PM 用 prototype 改善与 developer 沟通 | 核心证据 |
| SRC-D-03 | Anthropic, *Best practices for Claude Code* | Authoritative product docs | Complex task: Explore → Plan → Implement → Commit；小改动跳过 plan | 核心证据，不能证明跨工具效果 |
| SRC-D-04 | GitHub Docs, *Best practices for using Copilot to work on tasks* | Authoritative product docs | Clear problem、acceptance criteria、files、repository instructions、build/test/validate | 核心证据，不能证明用户偏好 |
| SRC-D-05 | GitHub, *Spec-driven development with AI* / `github/spec-kit` | Official method / repository | Spec → Plan → Tasks → Implement；任务需小且可独立测试 | 工作流候选，方法仍有推广性叙述 |
| SRC-D-06 | OpenAI, *Harness engineering* | Vendor internal case；3→7 engineers、agent-first product | 人类 specify intent / build feedback loops；repo knowledge as system of record；short `AGENTS.md` as map | 重要案例，不外推普遍效果 |
| SRC-D-07 | OpenAI, *Building an AI-native engineering team* | Official practice guide | Agent 可先找 ambiguity / dependencies；人类 review、own priority / sequencing / trade-offs | 决策权候选，不是独立研究 |
| SRC-D-08 | Anthropic, *How Anthropic teams use Claude Code* | Vendor internal interviews / case study | Designer 用 functional prototype 沟通；在 design 阶段发现 error states / logic flow / system status | 跨职能案例，存在 vendor selection bias |
| SRC-D-09 | Stack Overflow Developer Survey 2025 | 大规模自愿问卷；相关题 31k+ responses | “Almost right”与 debugging 是显著纠错痛点；trust 低 | 背景证据，不是 indie builder 专项样本 |
| SRC-D-10 | Cursor, *Introducing Plan Mode* / Checkpoints | Official product docs | 先读 repo/docs、问澄清问题、生成可编辑 plan；Agent edits 可恢复 | 交互 pattern 证据，非需求/效果证据 |
| SRC-D-11 | Anthropic, *How we contain Claude across products* | Vendor telemetry / engineering report | permission prompts 被大量批准；重复提示可能导致 approval fatigue | autonomy 类比证据，不能换算为问题数 |
| SRC-D-12 | Reddit: 14-year engineer 的 Claude Code / Codex workflow | 单个 practitioner self-report | scoped prompt → plan review → phased commits → code review → manual steering | 仅工作流语言 |
| SRC-D-13 | Reddit: no-coder 对 Codex 可见性与 steering 的抱怨 | 单个 practitioner self-report | 不知道 agent 在做什么、不能判断问题是否正确、偏好长 planning 后执行 | 仅痛点语言 |
| SRC-D-14 | Cursor Forum: Plan Mode workflow | 单个 practitioner self-report | 手工构建详细 context 很累；模糊 prompt 会偏航；implementation 仍需 steering | 仅痛点语言 |
| SRC-D-15 | GitHub Discussion: manual diff approval | 单个 practitioner self-report | 无 diff feedback 时“lose control very quickly”；希望 propose-before-apply | 仅控制语言 |
| SRC-D-16 | Reddit r/UXDesign: AI-era handoff | 1 post + 少量评论 | Figma + HTML prototype；handoff 更像持续 collaboration；用高保真关键屏和 walkthrough 传 intent | 仅候选工作流，不证明普遍变化 |
| SRC-D-17 | GOV.UK Service Manual | Authoritative research guidance | 招募 actual / likely users；qualitative round 4–8；A/B / benchmark 需大样本 | 研究计划依据 |
| SRC-D-18 | Microsoft Research, *User research makes your AI smarter* | Authoritative HAI practice | Wizard-of-Oz 要模拟不同程度错误并讨论 failure impact | 研究计划依据 |

### 3.1 明确排除或降级的材料

- SEO 型“Claude Code for PM”课程、模板站和无方法来源的增长文章：不进入 claim。
- Reddit 中标注为自动生成 workflow library 的帖子：排除，避免把 synthetic content 当 practitioner evidence。
- Reddit 重复跨版发布、低互动且无可验证过程的“Agentic Coding SDLC”：不用于支持规律。
- GitHub Spec Kit 文档中“eliminates the gap”“15 minutes”等推广性效果描述：不作为实证结论；仅采用可观察的流程和 artifact 结构。
- Vendor 自报时间节省、代码量或 adoption：只有与本研究问题直接相关时才记录，并明确不能外推。
- 搜索摘要未能回到原文的结果：不进入 Claim–Evidence Matrix。

## 4. Claim–Evidence Records

### WF-D-01 — 传统 requirements 往往不能直接成为有效 Coding Agent 输入

- **Claim：** 在已研究的 industrial practice 中，传统 user story / functional requirement 往往过于抽象；practitioner 会先拆成 programming tasks，再补 design decisions、architecture constraints 和 code context。
- **Source title：** *From Requirements to Code: Understanding Developer Practices in LLM-Assisted Software Engineering*
- **Source type：** Primary qualitative study；18 practitioners，14 companies，12 domains；访谈时间 2024-11 至 2025-02。
- **URL：** https://arxiv.org/html/2507.07548
- **Publication / update date：** 2025-07-10。
- **Exact supported point：** 论文 Takeaway 1 记录 practitioner 先把 requirements 分解和细化为 programming tasks；Takeaway 4 记录 prompt 还会加入 business logic、infrastructure / deployment、language / library、interface / data format、unit tests 和 code context。
- **Limitations：** Convenience sampling；以 developer / team lead 为主；使用的是 2024–2025 工具；qualitative 结果不能估计人群比例，也不直接覆盖 AI indie builder。
- **How this applies to David：** Blueprint Handoff 不应止于 PRD / IA 图片；必须把 P0 flow、node、scope、constraint、acceptance criteria 转为可寻址、可验证的工作单元。
- **Agent behavior rule：** Handoff 前运行 `requirement_to_execution_task` 检查；抽象 requirement 不得直接标记 `agent_ready`。
- **Data / schema implication：** 需要 `requirementId → taskIds → decisionIds → constraintIds → acceptanceCriteriaIds → targetFileHints` traceability。
- **Validation / evaluation requirement：** downstream test 比较 raw requirement 与 Blueprint package 的 requirement coverage、constraint violation、repair turns。
- **Confidence：** High（对该研究样本中的工作流）；Medium（外推到 David 目标用户）。

### WF-D-02 — Context construction 与后续 rework 存在待优化的投入权衡

- **Claim：** Practitioner 会在前置 prompt/context 构建成本与生成后修改成本之间权衡；精细 context 可能改善可用性，但不是越多越好。
- **Source title：** *From Requirements to Code: Understanding Developer Practices in LLM-Assisted Software Engineering*
- **Source type：** Primary qualitative study。
- **URL：** https://arxiv.org/html/2507.07548
- **Publication / update date：** 2025-07-10。
- **Exact supported point：** 论文描述 elaborate context construction 与 ad-hoc context construction；参与者指出更精细 prompt 往往带来更可用输出，但过度写 prompt 会抵消 AI 带来的效率，且较少前置投入可能导致更多后续 rework。
- **Limitations：** 没有随机实验；没有给出最佳 prompt 长度或最佳问题数；“quality improves”主要来自 self-report。
- **How this applies to David：** David 的目标不是最大化提问或文档量，而是降低“用户自己做 requirements engineering”的负担，同时保留会改变结果的上下文。
- **Agent behavior rule：** 只追问 user-exclusive、decision-changing 且无安全 fallback 的信息；其余由 David 形成可纠正假设。
- **Data / schema implication：** 记录 `questionCost`、`decisionChanged`、`fallbackUsed`、`downstreamRepair`，才能校准 Question Value。
- **Validation / evaluation requirement：** A/B Question Budget 必须同时测前置负担和 downstream rework，不能只测问答轮数。
- **Confidence：** Medium-high。

### WF-D-03 — PM 对 GenAI delegation 的判断不只由可逆性决定

- **Claim：** PM 是否把任务交给 GenAI，还受 professional identity、accountability、个人感受、team norms 和组织环境影响。
- **Source title：** *Product Manager Practices for Delegating Work to Generative AI: “Accountability must not be delegated to non-human actors”*
- **Source type：** Primary mixed-methods study；885 PM survey、731 telemetry、15 interviews；Microsoft 单一公司。
- **URL：** https://arxiv.org/html/2510.02504
- **Publication / update date：** 2025-10-02。
- **Exact supported point：** 论文的 Selective Delegation Framework 把 identity、accountability、personal/social dynamics 分布在个人、团队和组织层；参与者更容易委托低 accountability 工作，对 specs / journey maps 等高 accountability 任务更谨慎。
- **Limitations：** 单一大型 AI vendor，组织强烈鼓励 GenAI；survey response rate 17%；不是独立开发者样本；部分证据为 self-report。
- **How this applies to David：** `impact × uncertainty × reversibility` 不足以解释全部 autonomy 偏好；研究必须问“这是否属于用户希望亲自保持的产品判断”和“谁对错误负责”。
- **Agent behavior rule：** 高 accountability 或 identity-sensitive 决策应展示 rationale / diff，并允许用户选择 Controlled mode；不能因技术上可逆就默认自动应用。
- **Data / schema implication：** autonomy case 可补充 `accountabilityOwner`、`identitySensitivity`、`teamNormConstraint`，但字段进入正式 schema 前需 David 用户验证。
- **Validation / evaluation requirement：** 访谈与 vignette test 比较不同角色对同一 change 的 autonomy 选择及理由。
- **Confidence：** High（Microsoft PM 样本）；Medium-low（David 用户外推）。

### WF-D-04 — PM 正在用 prototype 缩短与 Engineering 的意图沟通距离

- **Claim：** 研究样本中已有 PM 用 GenAI 构建 UI prototype，以便更具体地讨论概念并改善对 developer 的表达。
- **Source title：** *Product Manager Practices for Delegating Work to Generative AI*
- **Source type：** Primary mixed-methods study。
- **URL：** https://arxiv.org/html/2510.02504
- **Publication / update date：** 2025-10-02。
- **Exact supported point：** 91 位 IC（12%）报告用 GenAI 做 prototyping / coding；一位 interview participant 描述用 AI 做 UI prototype，把概念放到用户面前，并改善与 developer 沟通的语言。
- **Limitations：** 一个比例来自 Microsoft PM 样本；单条访谈说明沟通方式，不证明 prototype 提高交付质量。
- **How this applies to David：** Node mini-IA 与 clickable / low-fi projection 应被测试为 decision communication artifact，而非装饰性输出。
- **Agent behavior rule：** 当纯文字无法暴露 flow / state / hierarchy 歧义时，优先给可编辑结构或 prototype，再问一个高价值问题。
- **Data / schema implication：** 记录每次 correction 发生在 `chat|canvas|prototype|diff` 哪种介质。
- **Validation / evaluation requirement：** 可点击原型测试比较用户发现和纠正误解的速度与准确度。
- **Confidence：** Medium。

### WF-D-05 — 复杂任务适合分离 Explore / Plan / Implement；小改动不应强制规划

- **Claim：** Anthropic 的当前官方实践建议复杂或不熟悉任务先 Explore、再 Plan、再 Implement / Verify；scope 清楚且改动很小的任务可跳过 Plan Mode。
- **Source title：** *Best practices for Claude Code*
- **Source type：** Authoritative product documentation。
- **URL：** https://code.claude.com/docs/en/best-practices
- **Publication / update date：** 页面未标注；检索于 2026-07-10。
- **Exact supported point：** 官方 workflow 明确 Explore → Plan → Implement → Commit；同时指出 Plan Mode 有 overhead，若 diff 可用一句话描述则可跳过 plan。
- **Limitations：** 产品方指导，不是跨工具随机研究；“better results”没有在该页给出独立实验；适用于 code change，不等于 product planning。
- **How this applies to David：** `Bet → IA → Flow → Wireframe → Scope → Handoff` 可压缩，但复杂度和不确定性应决定展开程度；不能把所有想法强制走同样长流程。
- **Agent behavior rule：** 低影响、明确、单节点改动可直接 proposal + Undo；跨节点、跨 flow、跨 scope 才展开 plan / diff / approval。
- **Data / schema implication：** `planningDepthReason`、`taskComplexity`、`crossArtifactImpact`。
- **Validation / evaluation requirement：** 研究不同任务复杂度下用户对 plan 深度、时间成本和控制感的评价。
- **Confidence：** Medium-high（作为官方 workflow pattern）；Low（作为 David 效果结论）。

### WF-D-06 — Coding Agent task handoff 至少需要问题、验收与验证上下文

- **Claim：** GitHub 官方建议给 Copilot cloud agent 的 task 应 clear / well-scoped，包含 problem、acceptance criteria，并提供相关文件；repository instructions 应说明 build、test、validate 与 conventions。
- **Source title：** *Best practices for using GitHub Copilot to work on tasks*
- **Source type：** Authoritative product documentation。
- **URL：** https://docs.github.com/en/copilot/using-github-copilot/using-copilot-coding-agent-to-work-on-tasks/best-practices-for-using-copilot-to-work-on-tasks
- **Publication / update date：** 页面未标注；检索于 2026-07-10。
- **Exact supported point：** 页面列出理想 task 的 clear description、complete acceptance criteria 和 file directions；custom instructions 应包含 build/test、coding standards，且 agent 能自建、自测、自验证时更可能产出可快速 merge 的 PR。
- **Limitations：** 针对 GitHub Copilot cloud agent；“more likely”未给出该页实验数据；exact file paths 并非始终必要。
- **How this applies to David：** Handoff package 必须包括 Done-when、test / validation、constraints / no-gos 与引用关系；不能只输出主入口 Prompt。
- **Agent behavior rule：** readiness gate 缺 AC 或验证命令时不得声称 handoff ready。
- **Data / schema implication：** `acceptanceCriteria[]`、`verificationSteps[]`、`fileHints[]`、`noGos[]`、`repoInstructionRefs[]`。
- **Validation / evaluation requirement：** downstream execution test 记录 agent 实际读取哪些文件、是否运行验证、是否满足 AC。
- **Confidence：** High（对 GitHub 建议内容）；Medium（通用 handoff implication）。

### WF-D-07 — Spec、Plan、Task 需要可追踪且可随变更更新

- **Claim：** GitHub Spec Kit 的官方流程把 specification 置于 implementation、checklist 和 task breakdown 的上游，并把任务拆为可独立实现与测试的小块。
- **Source title：** *Spec-driven development with AI: Get started with a new open source toolkit*；`github/spec-kit/spec-driven.md`
- **Source type：** Official method article + official open-source repository。
- **URL：** https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/ ；https://github.com/github/spec-kit/blob/main/spec-driven.md
- **Publication / update date：** 文章 2025-09-02；仓库创建 2025-08-21，检索于 2026-07-10。
- **Exact supported point：** `/specify → /plan → /tasks`；task 应小、可 review、可隔离实现和测试；requirements 改变后需更新 spec / plan，而不是把 spec 放置不用。
- **Limitations：** Official method 包含 aspirational / promotional 表述；没有证据证明它消除 spec-code gap；不能把 “15 minutes” 等示例当性能结果。
- **How this applies to David：** Blueprint 应保持 intent / structure / implementation task 的双向 traceability，代码发现的新约束要能回写 Blueprint。
- **Agent behavior rule：** scope / flow / constraint 变化后，相关 handoff task 必须 stale 并重算，而不是局部静默覆盖。
- **Data / schema implication：** canonical IDs、`derivedFrom[]`、`affectedByChangeSet[]`、`stale` provenance、`regenerationRequired`。
- **Validation / evaluation requirement：** 修改一个核心 requirement 后，检查 affected task / AC / flow 是否被准确标记和更新。
- **Confidence：** Medium-high（流程存在）；Low（任何效果量）。

### WF-D-08 — 大型 Agent 工作流需要“短入口 + 可验证的仓库知识”，不是单一巨型说明

- **Claim：** OpenAI 的 agent-first internal case 报告：monolithic `AGENTS.md` 会挤压 task context、腐化且难验证；团队改用短 `AGENTS.md` 作为地图，深层 docs / exec plans 作为 versioned system of record。
- **Source title：** *Harness engineering: leveraging Codex in an agent-first world*
- **Source type：** Vendor internal engineering case。
- **URL：** https://openai.com/index/harness-engineering/
- **Publication / update date：** 2026-02-11。
- **Exact supported point：** 文中直接描述 one-big-`AGENTS.md` 的失败，采用约 100 行入口 map、结构化 `docs/`、active / completed exec plans、mechanical checks 和 doc gardening。
- **Limitations：** 单一内部产品、强工程团队、极端“no manually-written code”实验；不能外推最优文件数或行数。
- **How this applies to David：** Handoff 主入口应导航到按阶段、artifact 和 canonical ID 组织的材料；不应把全部 Blueprint 压成一个超长 Prompt。
- **Agent behavior rule：** 入口只包含目标、读取顺序、硬约束和验证入口；详细 IA / flow / wireframe / AC 通过引用渐进加载。
- **Data / schema implication：** `entryManifest`、`artifactIndex`、`readOrder`、`freshness`、`owner`、`validationStatus`。
- **Validation / evaluation requirement：** 记录各 Coding Agent 的 file-open trace、遗漏约束与 context size；比较 monolith 与 indexed package。
- **Confidence：** Medium（案例相关性高，外推有限）。

### WF-D-09 — Agent 可先做 ambiguity / dependency analysis，但 product direction 仍需人负责

- **Claim：** OpenAI 官方团队指南把 agent 的 planning 角色定位为先读 spec / codebase、找 ambiguity、dependency、edge case；人类 review completeness，并保留 priority、direction、sequencing、trade-off 的最终责任。
- **Source title：** *Building an AI-native engineering team*
- **Source type：** Official practice guide。
- **URL：** https://cdn.openai.com/business-guides-and-resources/building-an-ai-native-engineering-team.pdf
- **Publication / update date：** PDF 未标注可核验日期；检索于 2026-07-10。
- **Exact supported point：** Plan section 的 Delegate / Review / Own 明确区分 agent first pass、team validation 与 human-led strategic decisions；Design section要求 review design conventions、quality、accessibility 和 integration。
- **Limitations：** Vendor guide，不是独立实证；面向 team / organization，不是 solo builder；PDF 日期未在正文标明。
- **How this applies to David：** David 可主动提出 IA、flow、edge states 和 scope options，但目标用户、核心 outcome、重大 scope / external dependency 等决策仍需用户拥有。
- **Agent behavior rule：** 将“生成备选与找缺口”与“承诺核心产品方向”分开设置 autonomy action。
- **Data / schema implication：** `decisionOwner`、`proposalOwner`、`approvalRequired`、`strategicCommitment`。
- **Validation / evaluation requirement：** 访谈和 vignette 测试哪些产品决策被用户视为不可委托。
- **Confidence：** Medium。

### WF-D-10 — Designer 可用可运行 prototype 与状态图减少静态 handoff 的解释距离

- **Claim：** Anthropic Product Design 内部案例中，Designer 把 Figma / screenshot 交给 Claude Code 生成 functional prototype，并在 design 阶段映射 error states、logic flows 和 system statuses。
- **Source title：** *How Anthropic teams use Claude Code*
- **Source type：** Vendor internal interview / case study。
- **URL：** https://claude.com/blog/how-anthropic-teams-use-claude-code
- **Publication / update date：** 2025-07-24。
- **Exact supported point：** 官方案例记录 Product Design team 用 Figma 资产驱动 autonomous build / test loop；通过 mapping error states、logic flows 和 statuses 在 design 阶段发现 edge cases。
- **Limitations：** 自家工具、自选成功案例、没有对照组；团队技术支持和 repo access 可能高于一般 Designer。
- **How this applies to David：** Node mini-IA、state completeness 与 wireflow 应在 coding 前可见；prototype 的价值要以是否暴露误解和 edge case 衡量，而非视觉拟真度。
- **Agent behavior rule：** 对 P0 node 先显式生成 default/loading/empty/error/success/recovery，再允许 handoff。
- **Data / schema implication：** `stateInventory` 与 wireframe block / flow edge 的双向引用。
- **Validation / evaluation requirement：** prototype test 记录用户能否在 coding 前发现缺失状态和错误路径。
- **Confidence：** Medium-low（案例）；Medium-high（作为研究假设）。

### WF-D-11 — “Almost right”与修复成本要求把纠错纳入核心指标

- **Claim：** Stack Overflow 2025 survey 中，大量 respondent 报告 AI solution “almost right, but not quite”与 debugging 更耗时；因此 AI coding 评估不能只看生成速度。
- **Source title：** *AI | 2025 Stack Overflow Developer Survey*
- **Source type：** Large self-selected developer survey。
- **URL：** https://survey.stackoverflow.co/2025/ai
- **Publication / update date：** 2025 survey；页面检索于 2026-07-10。
- **Exact supported point：** Accuracy 问题有 33,244 responses；46% distrust、33% trust；frustration 问题有 31,476 responses，页面报告 66% 遇到 almost-right solution，45% 认为 debugging AI-generated code 更耗时。
- **Limitations：** Stack Overflow 自愿样本；题目覆盖 AI tools 而非仅 Coding Agent；不能证明问题由 requirements / planning 引起，也不能直接代表 indie builder。
- **How this applies to David：** downstream test 必须量化 repair、constraint violation、错误被发现的阶段和用户介入，而不是只计首版完成时间。
- **Agent behavior rule：** “agent finished”不等于 handoff success；必须执行 AC 和关键路径验证。
- **Data / schema implication：** `repairTurns`、`criticalDefects`、`constraintViolations`、`firstDetectedStage`、`humanInterventions`。
- **Validation / evaluation requirement：** 对 raw brief 与 Blueprint 条件做 blinded conformance review。
- **Confidence：** High（survey 描述）；Low-medium（David 因果 implication）。

### WF-D-12 — 高频 approval 可能降低监督质量，但不能换算成 Question Budget

- **Claim：** Anthropic telemetry 报告 permission prompts 约 93% 被批准，并指出 prompt 越多注意力越低；这支持减少无区分确认，但不支持任何具体产品提问阈值。
- **Source title：** *How we contain Claude across products*
- **Source type：** Vendor engineering report with internal telemetry。
- **URL：** https://www.anthropic.com/engineering/how-we-contain-claude
- **Publication / update date：** 2026-05-25。
- **Exact supported point：** 文中报告用户约批准 93% permission prompts，并把重复提示与 approval fatigue / less diligent supervision 联系起来；后续用 containment / auto mode 降低低价值提示。
- **Limitations：** Permission prompt 不是 PM question 或 IA approval；没有公开样本、分层与完整统计方法；安全上下文不可直接外推到产品规划。
- **How this applies to David：** 低风险重复确认应自动化或提供 Undo，把注意力留给 high-impact diff；不能把“每一步都确认”当 human control。
- **Agent behavior rule：** approval 需按 impact / reversibility / external side effect 分层，禁止为所有结构变更统一弹确认。
- **Data / schema implication：** `approvalPromptCount`、`approvalWithoutInspectionProxy`、`impactTier`、`undoAvailable`。
- **Validation / evaluation requirement：** Structure Diff test 测高影响 change 的识别准确率，而非仅测点击 approve 的比例。
- **Confidence：** Medium（类比）；Low（Question Budget 数值）。

### WF-D-13 — Plan 可编辑与 Agent change 可恢复是当前产品中的常见控制 pattern

- **Claim：** Cursor 和 Claude Code 均把 Plan 设为 read-only / review-before-edit 模式，并提供 plan editing 或 checkpoints；这说明该交互 pattern 可实现，但不证明 David 用户一定需要同样 UI。
- **Source title：** Cursor *Introducing Plan Mode*、*Checkpoints*；Claude Code *Choose a permission mode*
- **Source type：** Authoritative product documentation。
- **URL：** https://cursor.com/blog/plan-mode ；https://cursor.com/docs/agent/overview#checkpoints ；https://code.claude.com/docs/en/permission-modes
- **Publication / update date：** Cursor Plan Mode 2025-10-07；其他页面未标注，检索于 2026-07-10。
- **Exact supported point：** Cursor Plan Mode 先查 codebase / docs、问 clarification、生成可编辑 Markdown plan；Checkpoints 可恢复 Agent file edits。Claude Code Plan Mode 只读探索并在执行前呈现 plan 与多种 approval mode。
- **Limitations：** Feature existence 不是 user need 或效果证据；file edit rollback 与 IA Structure Diff 的认知任务不同。
- **How this applies to David：** 可编辑 plan、diff、Undo、locked constraint 是高优先测试对象；不能仅凭竞品存在就冻结设计。
- **Agent behavior rule：** L1 change 带 Undo；L2 change 在 mutation 前给 impact-aware diff；计划本身可直接编辑。
- **Data / schema implication：** `changeSet`、`before/after`、`affectedRefs`、`restoreVersionId`、`approvalMode`。
- **Validation / evaluation requirement：** Structure Diff A/B 和恢复任务。
- **Confidence：** High（pattern 存在）；Low（用户效果）。

### WF-D-14 — 资深 practitioner 的候选流程强调 plan review、阶段 commit 与持续 steering

- **Claim：** 一位自述 14 年经验、在 80k LOC / 2,800 tests 项目中使用 Claude Code / Codex 的 practitioner，描述了 scoped prompt → Plan Mode → 多角度 plan review → 分阶段 commit → code review → manual steering 的流程。
- **Source title：** Reddit, *Claude Code (~100 hours) vs. Codex (~20 hours)*
- **Source type：** Practitioner evidence；单个 self-report。
- **URL：** https://www.reddit.com/r/ClaudeCode/comments/1sk7e2k/claude_code_100_hours_vs_codex_20_hours/
- **Publication / update date：** 2026-04-13（由 Reddit timestamp 转换）。
- **Exact supported point：** 帖主直接列出 Shared Agentic Workflow：thorough / scoped prompt、plan-review skill、每 phase 单独 commit、每 commit code review、手工 review feedback 与 steering、约 100 行 `CLAUDE.md`。
- **Limitations：** 身份、代码量与结果无法独立核验；高技能重度用户；模型、skills 和项目都高度定制；不能证明流程优于其他流程。
- **How this applies to David：** 招募必须分层技术经验；研究应观察用户是否已有 plan / review ritual，而非只问“你想要什么”。
- **Agent behavior rule：** 无；仅生成访谈 probe 和候选任务。
- **Data / schema implication：** 研究记录 `existingWorkflow`、`reviewGranularity`、`commitCheckpointUse`、`steeringFrequency`。
- **Validation / evaluation requirement：** 访谈要求展示最近一次真实 plan、prompt、diff 或 review artifact。
- **Confidence：** Low（普遍性）；Medium（该个案语言真实性）。

### WF-D-15 — 低技术用户可能把不可见执行体验成失控，而不是效率

- **Claim：** 一位自述理解少量 development 的 practitioner 把“看不到 agent 要做什么、无法 steering、不能判断自己的问题是否正确、等待后才发现方向错”描述为核心不适。
- **Source title：** Reddit, *Tried Codex after all the noise here and i'm hating it profoundly*
- **Source type：** Practitioner evidence；单个 self-report。
- **URL：** https://www.reddit.com/r/ClaudeCode/comments/1n6u89m/tried_codex_after_all_the_noise_here_and_im/
- **Publication / update date：** 2025-09-03（由 Reddit timestamp 转换）。
- **Exact supported point：** 帖主写到 Codex 不说明准备做什么、final report 难理解、“Zero steering”、不能判断问题是否正确，并对先长时间 planning 再快速 execution 的 Claude Code workflow 表达偏好。
- **Limitations：** 强烈情绪化单例；产品版本已变化；比较中混入 UI、model、速度和熟悉度；不能证明 no-coder 群体偏好。
- **How this applies to David：** 需要单独招募 product/design-led、低代码信心 builder；测试 visible plan 是否提升理解，而不只测试专业 engineer。
- **Agent behavior rule：** 无；仅形成研究假设。
- **Data / schema implication：** 研究记录 `technicalSelfEfficacy`、`planComprehension`、`steeringConfidence`。
- **Validation / evaluation requirement：** 分层分析 technical 与 product/design-led builder 的差异。
- **Confidence：** Low。

### WF-D-16 — “手工构建 context 很累、prompt 太模糊会偏航”是可验证的真实问题语言

- **Claim：** 一位 Cursor Forum practitioner 把前置详细 instructions / context 构建描述为 exhausting，并指出指令太具体会过度字面化、太模糊会 off track；Plan Mode 后仍有 implementation steering。
- **Source title：** Cursor Forum, *Boosting Productivity with Cursor’s New “Plan” Mode*
- **Source type：** Practitioner evidence；单个 forum thread。
- **URL：** https://forum.cursor.com/t/boosting-productivity-with-cursor-s-new-plan-mode/136015
- **Publication / update date：** 2025-10-03，后续回复至 2025-10-13。
- **Exact supported point：** 发帖者描述以前需自己写详细说明和 context，容易遗漏；Plan Mode 会分析 code、澄清、允许编辑 plan；另有回复说明 large PR split 的 plan 仍需 manual steering。
- **Limitations：** 新功能早期体验、单一工具、self-reported “效率翻倍”不可采信为效果量。
- **How this applies to David：** 访谈应直接问“你为避免 agent 偏航做了哪些 context 工作”和“这些工作是否已等同于 PM / architect 工作”。
- **Agent behavior rule：** 无；仅形成真实语言 probe。
- **Data / schema implication：** `contextAssemblyTime`、`contextSourceCount`、`omissionDiscoveredLater`。
- **Validation / evaluation requirement：** artifact interview 重建 context assembly timeline。
- **Confidence：** Low（规律）；Medium（问题语言）。

### WF-D-17 — 部分 practitioner 明确要求 propose-before-apply 的 diff control

- **Claim：** GitHub Community 中一位 practitioner 把 Copilot Agent 无逐 diff 接受描述为很快失去控制，并明确区分“vibe coding”与“serious work”。
- **Source title：** GitHub Discussion #163369, *How to manually accept edits (like Claude Code) in Copilot Agent?*
- **Source type：** Practitioner evidence；单个 discussion。
- **URL：** https://github.com/orgs/community/discussions/163369
- **Publication / update date：** 2025-06-19。
- **Exact supported point：** 发帖者要求每次 code change 先显示 diff、接受或拒绝；写道自动 edits “lose control very quickly”，更适合 vibe coding 而非 serious work。
- **Limitations：** 单一用户；是 code diff，不是 IA Structure Diff；不能推导 mandatory approval 的比例或阈值。
- **How this applies to David：** Structure Diff 是高价值研究对象；需要验证用户能否理解 change impact，而非只问是否喜欢 diff。
- **Agent behavior rule：** 无；在真实研究前不冻结默认 mode。
- **Data / schema implication：** 研究记录 `changeIdentificationAccuracy`、`impactComprehension`、`rejectReasonQuality`。
- **Validation / evaluation requirement：** Structure Diff A/B。
- **Confidence：** Low。

### WF-D-18 — Designer handoff 可能正从 final delivery 转向多 artifact 的持续协作

- **Claim：** 一个 2026 r/UXDesign 线程出现 Figma + HTML prototype、关键高保真 screen、solid documentation、async walkthrough，以及“handoff 更像 ongoing collaboration loop”的并存做法。
- **Source title：** Reddit, *What does your handoff process look like in the AI era?*
- **Source type：** Practitioner evidence；1 post + 少量评论。
- **URL：** https://www.reddit.com/r/UXDesign/comments/1t4m4k8/what_does_your_handoff_process_look_like_in_the/
- **Publication / update date：** 2026-05-05 至 2026-05-08。
- **Exact supported point：** 原帖描述 Figma + HTML prototype，并保留少量高保真 screen 传达设计意图；评论分别描述 production-like code + docs + walkthrough，以及围绕 intent / edge cases 的 ongoing collaboration。
- **Limitations：** 互动量很低、角色和项目不可核验；观点存在差异；不能证明传统 handoff 已被取代。
- **How this applies to David：** Handoff 研究不能预设一个万能文件；应记录 receiver 实际读取、忽略和补问的 artifact，并允许 role-specific adapter。
- **Agent behavior rule：** 无；仅形成 handoff artifact selection 假设。
- **Data / schema implication：** `artifactUsedByRole`、`artifactIgnoredReason`、`walkthroughNeeded`、`handoffFollowupQuestions`。
- **Validation / evaluation requirement：** team workflow interview + downstream file-read trace。
- **Confidence：** Very low（普遍性）；Medium（候选语言）。

### WF-D-19 — 目标用户研究应按小轮迭代；小样本 A/B 只能是 pilot

- **Claim：** GOV.UK 建议 qualitative interview / usability 每轮通常 4–8 participants，并用多轮迭代；survey、A/B、benchmark 若要清晰统计结论通常需 hundreds。
- **Source title：** *Plan user research for your service*；*Finding participants for user research*
- **Source type：** Authoritative public service research guidance。
- **URL：** https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service ；https://www.gov.uk/service-manual/user-research/find-user-research-participants
- **Publication / update date：** 2016-03-14，updated 2018-09-21；检索于 2026-07-10。
- **Exact supported point：** 每轮 interview、contextual research、usability 通常 4–8 人；需要更多时优先再做一轮；survey / A/B / benchmark 需要 hundreds 才能形成清晰结论；参与者应是 actual / likely users。
- **Limitations：** 通用 service research 指南，不是 AI coding 专项；“hundreds”不是具体 power calculation。
- **How this applies to David：** prototype qualitative rounds 可 4–8 人迭代；Question Budget 的 n=24 只做 directional pilot，正式阈值要在 pilot 后按 effect / variance 做 power analysis。
- **Agent behavior rule：** 无。
- **Data / schema implication：** 每条 finding 记录 round、segment、participant count、evidence type；禁止把 pilot frequency 写成 population prevalence。
- **Validation / evaluation requirement：** 研究计划预注册 pilot / confirmatory 边界。
- **Confidence：** High（方法指导）。

### WF-D-20 — Wizard-of-Oz 需要模拟现实错误，而不是“完美 AI”

- **Claim：** Microsoft Research 建议 AI Wizard-of-Oz 在早期 prototype 中加入 realistic quirks、不同程度错误和 failure impact discussion，避免过度乐观反应。
- **Source title：** *User research makes your AI smarter*
- **Source type：** Authoritative HAI research practice。
- **URL：** https://www.microsoft.com/en-us/research/articles/user-research-makes-your-ai-smarter/
- **Publication / update date：** 2019-07-01。
- **Exact supported point：** 建议让参与者经历 right / a little right / a little wrong / totally wrong，并观察 failure impact；同时提醒 perfect prototype 会产生过度乐观 response。
- **Limitations：** 稳定方法来源但较旧；不是 Coding Agent 或 IA 专项；没有给出 David 的错误注入比例。
- **How this applies to David：** Wizard-of-Oz 不能只展示高质量 Blueprint；需注入错误 target-user inference、低风险 rename、high-impact move、missing state 等不同后果的错误。
- **Agent behavior rule：** 无；研究 protocol 要求。
- **Data / schema implication：** `injectedErrorType`、`severity`、`detectionTime`、`correctionChannel`、`recoverySuccess`。
- **Validation / evaluation requirement：** 观察用户是否发现、如何纠正、何时失去信任；结束后完整 debrief。
- **Confidence：** High（方法）；Medium（David 设计映射）。

### WF-D-21 — 目前没有直接证据支持 David 的 `3–5` 前置问题阈值

- **Claim：** 本轮检索未发现针对 AI indie builder 从 vague idea 到 Product Blueprint 的 authoritative study，可证明 `3–5` 是可接受或最优的前置问题数。
- **Source title：** `01_ia_reasoning_and_agent_autonomy_contract.md` Section 8.3；本文件 Q-D-01 至 Q-D-18 检索记录。
- **Source type：** Internal provisional heuristic + documented evidence gap。
- **URL：** 不适用；外部检索日志见 Section 2。
- **Publication / update date：** Contract Draft v0.9；gap review 2026-07-10。
- **Exact supported point：** Contract 自己已把 Question Value 称为 ranking heuristic；外部资料只支持减少无价值 prompt、复杂任务先 plan、前置 context 与后续 rework 的权衡，没有支持具体数字。
- **Limitations：** “未找到”不等于绝对不存在；Exa、Jina、Twitter 路径受限；英文来源为主。
- **How this applies to David：** `3–5` 必须保持 provisional，并与 visual-first `0–1` blocking question 条件做目标用户实验。
- **Agent behavior rule：** 实现前可作为 configurable default，不可在文案或 spec 中称 evidence-backed threshold。
- **Data / schema implication：** Question Budget 必须可配置并记录实际问题数、回答效用、放弃和 correction outcome。
- **Validation / evaluation requirement：** A/B Question Budget pilot + 后续 powered confirmatory study。
- **Confidence：** High（当前证据状态）；None（阈值效果）。

## 5. 桌面研究能回答 / 不能回答的分界

| 问题 | Desktop research 可回答 | 必须真实研究 / 实验 |
|---|---|---|
| Coding Agent 需要什么输入 | 可形成候选字段：task、context、constraints、AC、verification、repo instructions | 哪些字段对 David 用户和三类 Agent 真正必要、冗余或会冲突 |
| 是否先 Plan | 可支持“复杂任务展开、简单任务压缩”的 provisional rule | 用户如何判断复杂；Plan 的最佳深度；何时觉得拖慢 |
| Question Budget | 可支持“只问 decision-changing / user-exclusive” | `3–5` 是否可接受；visual-first 是否更快且不损害质量 |
| Autonomy | 可支持 impact、reversibility、accountability、permission risk 是候选维度 | 各 segment 对 rename / move / scope cut / external dependency 的真实边界 |
| Structure Diff | 可证明 plan / diff / checkpoints 是现有 pattern | 用户能否正确识别 change 与 cascade impact；full regeneration 是否更易懂 |
| Canvas correction | 可形成 Chat / Canvas / Diff 的候选职责 | 用户通过文字还是结构图更快纠正；provenance 是否看得懂 |
| Designer handoff | 可发现 Figma、prototype、docs、walkthrough 等候选 artifact | receiver 实际读取什么；什么 artifact 改善 intent fidelity |
| Downstream outcome | 可定义 execution package 和指标 | Codex / Cursor / Claude Code 是否真的更少偏航、返工、漏约束 |
| 真实问题语言 | 可从帖子提取 recruiting / interview probe | 必须由目标参与者在 recent critical incident 中复现，才能进入产品词汇 |

## 6. 跨来源冲突与研究含义

1. **“少给信息，让 Agent 自己找” vs “requirements 要细化并补 context”**  
   Anthropic Product Engineering case 建议从 minimal information 开始；requirements study 则发现复杂实现需更细 task 与 constraints。两者并不必然矛盾：可能分别适用于 repo exploration 与 implementation handoff。David 必须测阶段和任务复杂度，不能选择单一极端。

2. **“Plan 提升输出” vs “Plan 有 overhead”**  
   Cursor 宣称 Plan Mode 显著改善其观察到的 generated code；Anthropic 明确提醒小任务跳过 Plan。David 的行为应由 complexity / uncertainty / cross-artifact impact 路由，并在真实研究中校准。

3. **“更自主” vs “需要 diff / control”**  
   Vendor 产品持续增加 Auto Mode；practitioner 又明确要求 propose-before-apply。合理研究问题不是选一个固定 autonomy，而是识别 segment、impact 和 accountability 对边界的影响。

4. **“Figma handoff 正被 prototype 替代” vs “传统 Figma 仍被 receiver 偏好”**  
   同一小型 UXDesign 线程已出现两种做法。David 应记录真实 receiver behavior，不把 artifact preference 写成规则。

## 7. 证据对 Contract 的当前含义

| `01` Section | 当前证据含义 | 状态 |
|---|---|---|
| 0.2 Core thesis | “Ask only for truth the user uniquely knows”有方向性支持；具体问法与数量未校准 | Keep provisional |
| 6 Questioning Strategy | 应加入 recent-artifact lookup、context assembly burden 与 accountability probe | Needs user research |
| 7 Agent Autonomy | impact / reversibility 外，还应研究 accountability / identity sensitivity；暂不直接改 enum | Patch proposal after study |
| 8 Question Value & Budget | `3–5` 无直接证据；必须标 provisional、可配置、可观测 | Must not freeze |
| 12 Turn-by-Turn | visible plan / rationale / correction 是强候选；表达形式需 prototype test | Prototype test |
| 13 Visible Reasoning | Structure Diff 有 pattern 与痛点依据，但理解收益未知 | A/B required |
| 14 Change Management | Undo / version / impact cascade 与现有 agent controls 相容 | Evidence-backed pattern |
| 16 Handoff Gate | AC、constraints、verification、traceability 是强 handoff 候选字段 | Downstream test required |
| 17 Recovery | “almost-right”与 manual steering 支持将 repair 纳入 readiness | Add evaluation metrics |
| Appendix B | Question calibration、Canvas comprehension、handoff outcome 仍全部开放 | Real research only |

## 8. 复用与引用注意

- 在综合矩阵中引用本文件时，必须同时保留原始 URL 和 source type，不能只写“Agent D 发现”。
- `WF-D-14` 至 `WF-D-18` 只能用于 interview probe、segment 假设和真实语言示例。
- `WF-D-21` 是 evidence gap，不是“问题越少越好”的证据。
- 任何后续 synthetic benchmark、Wizard 注入错误或标准化 brief 都必须标 `synthetic test stimulus`；只有参与者在测试中的行为和表达才是 observed user evidence。
- 2026-07-10 之后 Coding Agent 产品能力可能变化；downstream test 必须记录 agent、model、version、date、permission mode 与 repo state。
