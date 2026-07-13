# 00 — David Mode B 产品定位与设计原则

> **文档状态：** 预开发定位基线  
> **作用：** 统一 David Mode B 的目标用户、核心价值、产品形态、输出边界和设计原则。后续 IA Reasoning Contract、Canvas Interaction Spec、Blueprint Schema 与 Handoff Skill Contract 均以本文件为上位约束。

## 1. 产品定位

David Mode B 是一个面向 AI 独立开发者的 **AI Product Manager / Product Architect Co-worker**。

它服务于已经可以借助 Cursor、Claude Code、Codex 等 Coding Agent 快速开发，但缺少系统产品判断、信息架构设计和 MVP 收敛能力的用户。

David 不直接把模糊想法变成一堆页面，也不是一个单纯的 PRD、Sitemap 或 Wireframe 生成器。它先通过对话理解用户的想法、目标、用户任务与约束，再提出可解释的产品蓝图，并与用户共同确认关键结构决策。

| 维度 | 当前定稿 |
|---|---|
| **产品定位** | 面向 AI 独立开发者的 AI Product Manager / Product Architect Co-worker |
| **目标用户** | 已会使用 Cursor、Claude Code、Codex 等 Coding Agent，但缺少系统产品设计能力的 AI 独立开发者 |
| **用户准入状态** | 至少拥有一个模糊 idea，也可以已有一段需求描述 |
| **核心任务** | 帮用户在写代码前想清楚：产品如何组织、如何呈现、用户如何完成任务，以及第一版做到哪里 |
| **核心结果** | 一张用户认可、可解释、可编辑、可交付的 Product Blueprint |
| **AI 的角色** | 主动访谈、澄清需求、提出 IA / Flow / Wireframe / Scope 方案，并解释理由、假设与风险 |
| **用户的角色** | 提供上下文，并确认重要结构变更、关键路径、CRUD 操作与 Scope Cut |
| **核心界面** | 一个统一 Canvas，把 IA、Flow、Wireframe、Scope、约束与 Handoff 联系在一起 |
| **最终交付物** | IA、Flow、Wireframe、Scope、验收标准、结构化 Blueprint 数据、图形资产，以及 Coding Agent 主入口 Prompt |
| **Handoff 形式** | 类似 Agent Skill：指导下游 Coding Agent 按阶段读取指定文件、实施、验证、QA、回写与迭代 |
| **Agent 兼容性** | 输出不绑定单一 Coding Agent，应能被 Codex、Cursor、Claude Code 等正常理解和执行 |
| **当前不做** | Mode A 的完整市场验证、真实用户证据系统、企业级 Roadmap、反馈仓库和通用 PM OS |

## 2. 核心价值

David 解决的不是“AI 不会生成页面”，而是：

> **AI coding 让实现变快以后，用户仍然不知道一个产品应该如何被组织、呈现、收缩和交付。**

David 的工作顺序是：

```text
模糊 Idea
→ Agentic PM Conversation
→ 结构化 Bet / Product Context
→ Information Architecture
→ User Flow
→ Node-level Wireframe
→ MVP Scope
→ Coding-Agent Handoff Skill
```

其中，`Bet → IA → Flow → Wireframe → Scope → Handoff` 是推导与交付链路，而不是六个相互割裂的 UI 页面。

## 3. 产品细化原则

| 原则 | 含义 |
|---|---|
| **Conversation first** | 不让用户先填写复杂表单；David 通过自然对话逐步形成结构化产品上下文 |
| **Hidden PM protocol** | 用户看到灵活沟通，后台运行稳定、可审计的产品经理推理协议 |
| **Reasoning before generation** | 先判断用户、任务、结构和呈现逻辑，再生成页面与 Wireframe |
| **Bet before artifact** | 先理解正在做什么产品判断，再生成 IA、PRD 或设计资产 |
| **IA before visual polish** | 先建立用户如何理解、寻找和使用产品能力的结构，不直接跳到漂亮 UI |
| **One canonical blueprint** | IA、Flow、Wireframe、Scope、约束、AC 与 Handoff 必须引用同一套 canonical IDs |
| **Connected artifacts** | 文档、图片、图形和 Prompt 均来自同一 Blueprint，不能成为相互矛盾的孤立产物 |
| **Human confirmation** | AI 可以主动提案；增加、删除、移动核心节点和修改关键路径等高影响操作必须获得用户确认 |
| **Rationale required** | 每个核心分组、标签、入口、层级、页面与路径都必须说明为什么 |
| **Constraint aware** | 方案必须满足用户任务、必要路径、MVP 范围、状态、依赖和验收约束 |
| **Hypothesis honesty** | 没有真实用户数据时，明确区分已确认事实、用户输入、行业惯例与 AI 假设 |
| **Progressive commitment** | 先展示低成本、抽象的结构假设，再逐步展开 Flow、Wireframe 与开发细节 |
| **Visualized reasoning** | 对话过程中持续把已收集信息和中间判断外化为简洁图形，而不是只输出长文字 |
| **Agent-ready output** | 最终交付是一套可执行工作包，而不是只供阅读的漂亮报告 |
| **Validation built in** | 蓝图应附带结构检查、可寻找性检查、路径检查、Scope 检查和 Agent 执行检查 |
| **Memory compounds** | 经用户确认的产品决策、约束、反例和 no-go 应在后续对话中持续生效 |

## 4. 统一产品对象

David 的核心不是一组文档，而是一个持续演化的 `BlueprintDocument`。

```text
BlueprintDocument
├── Product Context / Bet
├── User Intent & Mental-Model Hypotheses
├── Content and Capability Inventory
├── Information Architecture
├── Navigation Model
├── User Flows
├── Node-level Wireframes
├── Scope Decisions
├── Constraints and Acceptance Criteria
└── Coding-Agent Handoff Package
```

所有可视化、文档和 Prompt 都是这份统一对象的不同投影。

## 5. 产品成功标准

用户完成一次核心流程后，应能够明确回答：

1. 第一版产品服务谁、解决什么任务；
2. 产品内容与功能为什么采用当前的分组、命名和层级；
3. 用户从哪里进入、如何找到能力、如何完成核心任务；
4. 每个关键节点内部如何承载信息和操作；
5. 哪些属于 MVP，哪些明确不做；
6. 下游 Coding Agent 应依次读取哪些文件、完成哪些任务、如何验证结果。

## 6. 边界声明

David Mode B 当前不承诺替代真实用户研究，也不把 AI 推断的“用户心智模型”冒充为事实。

在缺少真实证据时，David 应输出：

```text
推荐方案
+ 替代方案
+ 推理理由
+ 使用的假设
+ 当前置信度
+ 应如何验证
```

而不是输出一个看似确定、但无法追溯依据的产品结构。
