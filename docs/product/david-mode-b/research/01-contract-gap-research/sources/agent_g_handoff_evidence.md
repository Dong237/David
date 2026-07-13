# Agent G — Coding-Agent Handoff Evidence

> 角色：G — Coding-Agent Handoff Outcomes  
> 研究日期：2026-07-10  
> 研究类型：Desktop research；未执行 David downstream execution test  
> 权威输入：`01_ia_reasoning_and_agent_autonomy_contract.md` > `00_david_mode_b_positioning_and_principles.md` > 其他资料  
> 对应主文件：`../09_coding_agent_handoff_research.md`

## 1. 证据分级与禁止外推

| 标记 | 证据类型 | 可以支持 | 不能支持 |
|---|---|---|---|
| `A-OFFICIAL` | 产品官方文档、官方参考、官方 changelog | 当前 capability、载入机制、官方 recommended practice、已声明 limitation | 真实成功率、跨产品等价性 |
| `A-PRIMARY` | 原始论文、公开 benchmark、可审计实验 | 论文设置内的 outcome 与 limitation | David 场景的直接效果、生产部署成功率 |
| `B-VENDOR-EVAL` | 厂商公开自测、telemetry/report | 厂商定义指标下的观察结果 | 独立验证、用户价值、完整产品正确性 |
| `C-PRACTITIONER` | GitHub Issue、官方 forum 单帖、troubleshooting language | friction 假设、失败模式候选、测试用例线索 | 普遍发生率、因果关系 |
| `D-INFERENCE` | 由证据推导的 David 设计判断 | Research proposal | 外部事实 |

本文中：

- `Capability` 仅表示产品支持读取、执行、检查或展示某种机制。
- `Recommended practice` 仅表示官方或方法作者建议如何使用。
- `Practitioner friction` 必须标记为报告/个案，不能当总体规律。
- `Outcome evidence` 必须给出任务、样本、指标和限制；“能运行测试”不等于“测试通过”，更不等于“产品成功”。
- `Confidence` 表示来源对该 claim 的支持强度，不表示功能重要性。

## 2. Search / Access Log

### 2.1 Agent Reach 失败链

| ID | 日期 | Command / route | 结果 | 后续处理 |
|---|---|---|---|---|
| `QG-00` | 2026-07-10 | `agent-reach doctor --json` | `/bin/bash: agent-reach: command not found` | 记录环境限制；继续尝试 Agent Reach 的零配置包装命令 |
| `QG-01` | 2026-07-10 | `mcporter call 'exa.web_search_exa(...)'` | `Unknown MCP server 'exa'` | 不使用返回摘要；切换到官方网页直读与 web search |
| `QG-02` | 2026-07-10 | OpenAI `fetch-codex-manual.mjs` | `Manual response is missing x-content-sha256` | 检查 OpenAI Docs MCP；当前会话未暴露相关工具，转官方 OpenAI 页面 |
| `QG-03` | 2026-07-10 | Jina Reader 读取 Cursor rules | 空响应 | 使用 Cursor 官方搜索索引正文，并把页面日期标为“未标注；访问日期” |
| `QG-04` | 2026-07-10 | `curl https://v0.app/docs/llms.txt` | HTTP 页面返回 500 | 使用 v0 官方 docs 搜索结果、官方 blog 与 changelog |
| `QG-05` | 2026-07-10 | `gh auth status` + `gh search issues` + `gh issue view` | GitHub CLI 可用 | 仅把 Issue 当 practitioner friction，不当产品事实 |
| `QG-06` | 2026-07-10 | `agent-reach check-update` | `/bin/bash: agent-reach: command not found` | 无法检查包装器更新；不声称 Agent Reach 可用或已是最新版本 |

### 2.2 主要 queries

| Batch | Query family | 用途 |
|---|---|---|
| `QG-A` | `OpenAI Codex AGENTS.md prompting paths constraints verification official` | Codex entry prompt、AGENTS.md、file refs、build/test/verify |
| `QG-B` | `Claude Code CLAUDE.md memory best practices plan tests common workflows official` | CLAUDE.md、task decomposition、plan/code/test、failure recovery |
| `QG-C` | `Cursor rules AGENTS.md CLI checkpoints review official` | Cursor rules、file refs、checkpoint、review |
| `QG-D` | `GitHub Copilot cloud agent well-scoped acceptance criteria custom instructions session logs` | Repo instructions、AC、progress、QA、traceability |
| `QG-E` | `Lovable knowledge plan mode agent mode browser testing official` | Product builder adapter 与验证限制 |
| `QG-F` | `Bolt plan mode project knowledge version history incremental testing official` | Product builder adapter 与恢复限制 |
| `QG-G` | `v0 instructions plan mode project instructions prompt context constraints official` | Product builder adapter、vendor eval |
| `QG-H` | `AGENTS.md coding agents empirical outcome SWE-Bench Pro requirements interface` | 真实 outcome evidence 与反证 |
| `QG-I` | `rules ignored AGENTS.md session retention GitHub Issue Cursor forum` | Practitioner friction 与 future eval case |

### 2.3 筛除与降级

- SEO 聚合站、无作者教程、未给原始实验的 benchmark 榜单不进入关键 claim。
- Reddit 仅用于发现关键词；没有进入关键证据。
- GitHub Issue 与 Cursor forum 报告未经过总体抽样，只作为 failure-mode seed。
- Lovable、Bolt、v0 的营销式“更好/更快/production-ready”若无指标，不计 outcome。
- Vercel 自测保留，但明确标为厂商定义的 preview/error-free 指标，不外推为业务正确性。
- 任何官方 instruction-file capability 都不被表述成“提高成功率”。

## 3. Claim–Evidence Records

### G-E01 — 主入口 Prompt 应提供 outcome、relevant context、boundaries 与 verification

- **Claim：** Coding-Agent 主入口不应复制全部 Blueprint；应声明目标结果、相关引用、不可越界项和验收/验证方式，并允许 Agent 自主选择低层实现步骤。
- **Evidence class：** `A-OFFICIAL`，OpenAI current official documentation。
- **Source title：** *Prompting*。
- **URL：** https://learn.chatgpt.com/docs/prompting
- **Publication / update date：** 页面未标注；访问 2026-07-10。
- **Exact supported point：** OpenAI 将较大任务的有效输入概括为 Goal、Context、Output、Boundaries；Codex 专节要求给出 desired behavior、relevant code/repro、constraints 和 verification。官方 bug 示例同时要求先 reproduce、保持 API shape、添加 regression test、重跑 repro 和最小相关 test suite，并报告命令与结果。
- **Limitations：** 这是官方 recommended practice，不是对固定模板或成功率的实验；通用 ChatGPT prompt 部分不全是 coding-specific。
- **David implication：** `entry_prompt` 只做 bootstrap：package/version/hash、active task、read order、hard boundaries、done-when 与 output protocol；完整产品事实保留在 canonical artifacts。
- **Confidence：** High。

### G-E02 — Codex 可分层读取 AGENTS.md，但有 precedence、scope 与 byte limit

- **Claim：** Codex adapter 可以用 `AGENTS.md` 承载持久 repo 规则，但必须显式测试 discovery/precedence，且不能假设无限上下文或热更新。
- **Evidence class：** `A-OFFICIAL`。
- **Source title：** *Custom instructions with AGENTS.md*。
- **URL：** https://developers.openai.com/codex/guides/agents-md
- **Publication / update date：** 页面未标注；访问 2026-07-10。
- **Exact supported point：** Codex 每次 run/session 构建 instruction chain：global scope 后从 project root 走到 cwd；同目录优先 `AGENTS.override.md`、再 `AGENTS.md`、再 fallback；越接近 cwd 的内容后载入。默认合并上限为 32 KiB。官方给出测试 active instruction sources、nested override、session log 与 restart 的方法。
- **Limitations：** 只证明加载机制和官方排障方法；不证明模型会始终遵守，也不保证不同 Codex surfaces/version 完全一致。
- **David implication：** Universal Core 不应依赖 Codex 文件名；Codex adapter 只生成最小 `AGENTS.md`/override、启动 cwd 与 preflight。critical constraints 仍需 deterministic validator，而不是只写进 AGENTS.md。
- **Confidence：** High（capability）；Low（遵循 outcome）。

### G-E03 — Claude Code 的 CLAUDE.md 是 advisory context，可导入 AGENTS.md

- **Claim：** Claude adapter 应用 `CLAUDE.md` 导入 Universal `AGENTS.md`，只追加 Claude-specific 行为；不能把 CLAUDE.md 当硬 enforcement。
- **Evidence class：** `A-OFFICIAL`。
- **Source title：** *How Claude remembers your project*。
- **URL：** https://code.claude.com/docs/en/memory
- **Publication / update date：** 页面未标注；访问 2026-07-10。
- **Exact supported point：** 文档明确 CLAUDE.md 与 auto memory 都是 context，不是 enforced configuration；具体、简短、可验证的 instructions 更可靠。Claude Code 原生读 `CLAUDE.md` 而非 `AGENTS.md`，官方建议在 `CLAUDE.md` 中用 `@AGENTS.md` 导入，再追加 Claude-specific instructions；项目级文件适合 build/test、architecture、naming 和 common workflows。
- **Limitations：** “更可靠”是官方经验规则，没有给出遵循率；HTML import、rules 和 nested load 仍受 context 与冲突影响。
- **David implication：** 生成 `CLAUDE.md` adapter 时禁止复制 Core；用 import 保持单一事实源。security/no-go 应由 hook/sandbox/policy 强制，不能依靠自然语言。
- **Confidence：** High。

### G-E04 — Cursor rules 支持 scoped context，但 checkpoint 不是永久 change log

- **Claim：** Cursor adapter 可用 `.cursor/rules/*.mdc` 做 path/relevance scoped instructions，并用 `@` file/folder context；Cursor checkpoint 只能作为局部 Undo，不可替代 Git/change log。
- **Evidence class：** `A-OFFICIAL`。
- **Source titles：** *Rules*；*Using Agent in CLI*；*Checkpoints*；*Diffs & Review*。
- **URLs：** https://cursor.com/docs/rules ; https://cursor.com/docs/cli/using ; https://cursor.com/docs/agent/overview#checkpoints ; https://cursor.com/learn/reviewing-testing
- **Publication / update date：** 页面未标注；访问 2026-07-10。
- **Exact supported point：** Project Rules 存在 `.cursor/rules`，可 always、glob auto-attach、agent-requested 或 manual；官方建议 focused、actionable、scoped，并提供 concrete examples/referenced files。CLI 同时读取 root `AGENTS.md`、`CLAUDE.md` 与 Cursor rules，支持 `@` 选文件/目录、resume、JSON output。Checkpoints 只追踪 Agent edits、local storage、会自动清理，官方明确不是 version control；diff review 支持逐文件/逐行接受或拒绝。
- **Limitations：** 文档页面无明确更新日期，部分 feature 为 beta；不同 IDE/CLI/mode 的规则支持并不完全相同。
- **David implication：** Cursor adapter 需记录 surface/version/mode；path-specific rules 只放机制差异。Universal progress/change log 保留在 repo，checkpoint 仅作可逆执行辅助。
- **Confidence：** High（documented capability）。

### G-E05 — GitHub Copilot instructions 的文件类型与 support matrix 并不统一

- **Claim：** Copilot adapter 必须按目标 surface 生成正确文件并声明 precedence，不能把某个 instruction filename 当全 Copilot 通用。
- **Evidence class：** `A-OFFICIAL`。
- **Source titles：** *Support for different types of custom instructions*；*About customizing GitHub Copilot responses*。
- **URLs：** https://docs.github.com/en/copilot/reference/custom-instructions-support ; https://docs.github.com/en/copilot/concepts/prompting/response-customization
- **Publication / update date：** 页面持续更新、未标单一日期；访问 2026-07-10。
- **Exact supported point：** GitHub 列出 `.github/copilot-instructions.md`、path-specific `.github/instructions/**/*.instructions.md`、`AGENTS.md`、`CLAUDE.md`、`GEMINI.md` 在 GitHub.com、VS Code、Visual Studio、JetBrains、Eclipse、Xcode、CLI 的不同 support matrix。GitHub.com 的 precedence 为 personal > path-specific > repo-wide > agent instructions > organization，并建议避免冲突。
- **Limitations：** support matrix 变化快，部分项为 preview；支持载入不表示严格执行。
- **David implication：** adapter manifest 必须包含 `surface`、`version/accessDate`、`instructionFiles`、`precedence`、`fallback` 与 preflight；不能只写“Copilot 支持 AGENTS.md”。
- **Confidence：** High。

### G-E06 — Copilot 官方把 clear scope、AC 与 file hints 视为理想 task 输入

- **Claim：** downstream task packet 至少应有 problem/work description、完整 AC 与 file hints；复杂、敏感、含深业务逻辑或高歧义任务不能默认无人值守。
- **Evidence class：** `A-OFFICIAL`。
- **Source title：** *Best practices for using GitHub Copilot to work on tasks*。
- **URL：** https://docs.github.com/en/copilot/using-github-copilot/using-copilot-coding-agent-to-work-on-tasks/best-practices-for-using-copilot-to-work-on-tasks
- **Publication / update date：** 页面未标注；访问 2026-07-10。
- **Exact supported point：** GitHub 明确 ideal task 包含 clear description、complete acceptance criteria（含是否应有 unit tests）与可能修改文件的方向；建议初期用简单任务。官方列出 complex/broad、deep domain/business logic、production/security/PII/auth、ambiguous task 等不适合直接 delegation 的类别。
- **Limitations：** 官方 best practice，不是量化阈值；file path 不是强制，因为 Agent 也能 semantic search。
- **David implication：** task decomposition 必须形成可独立验证的 task slices；`riskClass` 决定 autonomous/approval/manual，而不是所有 P0 task 都直接执行。
- **Confidence：** High。

### G-E07 — Explore/plan/code/test/commit 与 checklist 是推荐 workflow，不是单一成功公式

- **Claim：** Handoff 应分离 research/plan、implementation、verification 与 commit/review，并为长任务保存显式 checkpoint；具体顺序可按任务调整。
- **Evidence class：** `A-OFFICIAL`。
- **Source titles：** Anthropic *Claude Code: Best practices for agentic coding*；*Common workflows*。
- **URLs：** https://www.anthropic.com/engineering/claude-code-best-practices ; https://code.claude.com/docs/en/common-workflows
- **Publication / update date：** 2025-04-18；第二页未标注，访问 2026-07-10。
- **Exact supported point：** Anthropic 给出 explore → plan → code → commit、tests-first 迭代、small testable increments、early course correction、Markdown checklist/scratchpad 与独立 review context 等模式；同时明确这些只是 starting points，不是 universally applicable。Current docs 支持 plan mode、resume/worktree、tests、PR 和 CI/headless recipes。
- **Limitations：** 来自厂商与社区经验，未给每个 workflow 的对照实验；旧 blog 中部分 UI/命令可能演化。
- **David implication：** Universal protocol 定义职责与 gates，不强制所有 Agent 使用同一 UI mode；adapter 映射到可用的 plan/read-only、progress 与 resume 机制。
- **Confidence：** High（recommended practice）；Medium（David workflow inference）。

### G-E08 — Lovable 支持 persistent knowledge、approved plan 与 verification tools，但遵循和测试都非自动保证

- **Claim：** Lovable 可作为受限 product-builder adapter：project/workspace knowledge、root instruction files、`.lovable/plan.md` 和 Agent mode verification 可承载部分 handoff，但必须显式请求/检查验证结果。
- **Evidence class：** `A-OFFICIAL`。
- **Source titles：** *Define workspace and project knowledge*；*Brainstorm in Plan mode*；*Build in Agent mode*；Lovable changelog。
- **URLs：** https://docs.lovable.dev/features/knowledge ; https://docs.lovable.dev/features/plan-mode ; https://docs.lovable.dev/features/agent-mode ; https://docs.lovable.dev/changelog
- **Publication / update date：** docs 未标注；Plan mode changelog 2026-02-05；访问 2026-07-10。
- **Exact supported point：** Knowledge 可保存 coding/testing/architecture/no-go，root `AGENTS.md` 或 `CLAUDE.md` 可被读取；官方同时警告长 conversation 中 instructions 可能不一致。Plan mode 不改代码，approved latest plan 保存到 `.lovable/plan.md`；Agent mode 展示 tasks/diffs，并可使用 browser/frontend/edge-function verification，但大部分工具只在用户请求时运行。
- **Limitations：** “strictly based on approved plan”是产品说明，不等于无偏差保证；没有公开 evidence 证明 canonical IDs、任意 JSON artifact 或 David return protocol 被可靠执行。
- **David implication：** 将 Lovable 标为 `conditional`，preflight 必须验证 instruction ingestion、file access、test capability 与 Git export；browser preview 不能替代 AC、security、data 与 build checks。
- **Confidence：** High（capability）；Low（full David compatibility）。

### G-E09 — Bolt 支持 Plan/Build、Project Knowledge、incremental testing 与 version history，但恢复边界明显

- **Claim：** Bolt adapter 应把 Universal Core 转为 project knowledge + focused task prompt，并利用 Plan mode；恢复不能假定 version history 覆盖数据库或所有手动代码编辑。
- **Evidence class：** `A-OFFICIAL`。
- **Source titles：** *In-app help with Plan and Discussion Modes*；*Prompt effectively*；*Maximize token efficiency*；*Backups, restore, and version history*；*Database*。
- **URLs：** https://support.bolt.new/best-practices/discussion-mode ; https://support.bolt.new/best-practices/prompting-effectively ; https://support.bolt.new/best-practices/maximizing-token-efficiency ; https://support.bolt.new/building/using-bolt/rollback-backup ; https://support.bolt.new/cloud/database
- **Publication / update date：** docs 未标注；页面记录 v1 Agent 自 2026-04-13 起不再用于新项目；访问 2026-07-10。
- **Exact supported point：** Claude Agent 的 Plan mode 可在不改代码时生成/讨论 implementation plan；Project/System knowledge 提供持久额外指令。官方建议 focused prompt、只改 relevant code、incremental feature + test after each piece，并警告 repeated automated fixes 可能只消耗 token。Version history 可恢复项目快照，但数据库不会随代码版本恢复。
- **Limitations：** 文档没有定义 repo instruction file precedence、canonical IDs 或 machine-readable execution log；版本恢复能力受 surface/data type 限制。
- **David implication：** Bolt adapter 必须标出 `codeRollback=true`、`databaseRollback=false` 等 capability；涉及 schema/data migration 时不允许把 UI restore 当完整 recovery。
- **Confidence：** High。

### G-E10 — v0 支持 on-demand Instructions、Plan Mode 与 project instructions；其最佳 prompt 仍需明确 product surface/context/constraints

- **Claim：** v0 adapter 可承载 UI/full-stack generation，但主任务必须提供 product surface、user/use context、constraints 与验证目标；Plan Mode 只证明存在 approval step，不证明实现符合 plan。
- **Evidence class：** `A-OFFICIAL` + `B-VENDOR-EVAL`。
- **Source titles：** *Instructions*；*Create Project API*；*How to prompt v0*；v0 changelog。
- **URLs：** https://v0.app/docs/instructions ; https://v0.app/docs/api/platform/reference/projects/create ; https://vercel.com/blog/how-to-prompt-v0 ; https://v0.app/changelog
- **Publication / update date：** Custom Instructions 发布 2025-10-06；prompt guide 2025-12-15；访问 2026-07-10。
- **Exact supported point：** v0 的 Plan Mode instruction 要求先给 detailed plan 和 potential challenges，再请求批准；Project API 暴露 `instructions` 字段。Vercel prompt guide 要求 product surface、context of use、constraints/taste，并提供厂商 side-by-side tests；changelog 记录 clarifying questions、GitHub/terminal/permission 与 longer project instructions 等能力演进。
- **Limitations：** prompt guide 是小规模 vendor-run tests；`Plan Mode` 为可选 instruction，不是 repository enforcement。未找到 v0 对 AGENTS.md/CLAUDE.md、canonical IDs 或完整 test protocol 的可靠公开支持。
- **David implication：** v0 为 `conditional/product-generation cohort`；adapter 需 inline 关键 task slice 和 reference digest，不能只给路径并假设自动读取完整 package。
- **Confidence：** High（documented feature）；Medium-Low（handoff fit）。

### G-E11 — 人工补全 requirements/interface 在 SWE-Bench Pro 中显著改变可测 task outcome

- **Claim：** 明确 requirements、expected interface 与 human-reviewed tests 可以显著减少任务歧义/验证 false negative；但即使如此，复杂 long-horizon coding 仍远未解决。
- **Evidence class：** `A-PRIMARY`，independent benchmark paper。
- **Source title：** *SWE-Bench Pro: Can AI Agents Solve Long-Horizon Software Engineering Tasks?*
- **URL：** https://openreview.net/forum?id=9R2iUHhVfr
- **Publication / update date：** 2025-09-19；modified 2026-02-11；访问 2026-07-10。
- **Exact supported point：** Benchmark 用 human-written problem statement、requirements、optional interface、containerized environment、fail-to-pass 与 pass-to-pass tests。Ablation 中只给 problem statement 时 GPT-5/Claude Opus 4.1 为 8.4%/8.2%；加入 requirements/interface 后为 25.9%/22.7%。论文说明 interface 约束用于避免测试因合法但不同接口产生 false negative；完整设置下 frontier model 仍低于约 26%。
- **Limitations：** 同一 SWE-Agent scaffold、特定模型版本与 benchmark；requirements 部分基于 gold patch/tests，可能比真实 upstream spec 更完整；不是 Codex/Claude/Cursor 产品 surface 的直接对照。
- **David implication：** AC、done-when、interface/file refs 与 tests 必须形成独立 task packet，并在实现前冻结；同时绝不能将“spec 更完整”表述成保证成功。
- **Confidence：** High（实验设置内）；Medium（外推到 David）。

### G-E12 — Context file 会影响行为，但不必然提高成功率，且可能增加成本

- **Claim：** 不能用“生成 AGENTS.md/CLAUDE.md”作为 Handoff 成功代理；context 必须 task-relevant、最小化并接受回归测试。
- **Evidence class：** `A-PRIMARY`。
- **Source title：** *Evaluating AGENTS.md: Are Repository-Level Context Files Helpful for Coding Agents?*
- **URL：** https://arxiv.org/abs/2602.11988
- **Publication / update date：** 2026-02；访问 2026-07-10。
- **Exact supported point：** 研究用 SWE-bench 与 138-task CTXbench 比较 no context、LLM-generated、developer-written context，覆盖 Claude Code、Codex/Qwen mappings 与多模型。总体 context file 对成功率无显著提升；LLM-generated file 平均降低 0.5%/2% 且增加约 20%/23% cost。Agent 确实更多测试/探索并遵循 tool instruction；developer file 比 LLM file 好约 7 个百分点，但相对 no-context 的 +2.4% 仍不显著。移除其他 docs 后 context file 才平均改善 2.7%。
- **Limitations：** 只含 Python tasks、特定 agents/models、benchmark success；context file 质量与 repo 原有 docs 强相关。不能推导“永远不用 AGENTS.md”。
- **David implication：** adapter 只能包含 loader/commands/constraints，不复制 Blueprint 概览；用 package manifest + selective refs。每次 adapter/version 变化必须跑 downstream regression，不凭文档长度或存在性验收。
- **Confidence：** High。

### G-E13 — 另一项研究观察到 AGENTS.md 可能改善效率，但没有完成 correctness evaluation

- **Claim：** AGENTS.md 对效率的证据与对 correctness 的证据并不相同，当前研究结论存在 setting-dependent 冲突。
- **Evidence class：** `A-PRIMARY`。
- **Source title：** *On the Impact of AGENTS.md Files on the Efficiency of AI Coding Agents*。
- **URL：** https://arxiv.org/abs/2601.20404
- **Publication / update date：** 2026-01-23；访问 2026-07-10。
- **Exact supported point：** 10 repos、124 PR paired runs 中，有 AGENTS.md 时 median wall-clock 降 28.64%、median output tokens 降 16.58%，并通过 relevant/non-trivial edit sanity check 观察到 comparable task completion behavior。
- **Limitations：** 论文明确关注 runtime/token；sanity check 不是 full correctness evaluation，样本与 agent family 有限。它不能反驳 G-E12 的 accuracy/cost 结果，只说明不同测量与设置可能产生不同方向。
- **David implication：** downstream test 同时测 correctness、constraint compliance、cost、latency、clarification 与 review burden；禁止只优化 token/time。
- **Confidence：** High（效率结果）；Low（correctness implication）。

### G-E14 — 现有 CLAUDE.md 的常见内容是 operational commands、implementation notes 与 architecture

- **Claim：** Repo instruction artifact 的实际内容分布支持把 build/run、architecture 与 implementation constraints 放入持久 context，但该观察不是有效性证明。
- **Evidence class：** `A-PRIMARY`，descriptive empirical study。
- **Source title：** *On the Use of Agentic Coding Manifests: An Empirical Study of Claude Code*。
- **URL：** https://arxiv.org/abs/2509.14744
- **Publication / update date：** 2025-09-18；访问 2026-07-10。
- **Exact supported point：** 作者分析 242 repos 的 253 个 Claude.md，观察到浅层 heading structure，内容以 Build/Run、technical implementation notes 和 high-level architecture 为主。
- **Limitations：** 只描述公开 repo 的采用模式；没有执行任务、质量或成功率结果，也不能证明常见内容就是最佳内容。
- **David implication：** 可作为 artifact section 设计线索，不作为 production rule 证据；Universal Core 仍由 task relevance 与 regression outcome 决定。
- **Confidence：** High（descriptive finding）；Low（normative implication）。

### G-E15 — 真实 session telemetry 显示人更多决定“做什么/何时算完成”，Agent 更多决定“怎么做”

- **Claim：** David Handoff 应冻结 product intent、scope、AC/done-when 与 high-impact constraints，把低层执行选择留给 Agent；遇到 contract ambiguity 应 return-to-blueprint。
- **Evidence class：** `B-VENDOR-EVAL`，large-scale vendor telemetry/report。
- **Source title：** Anthropic *How Claude Code is used in practice*。
- **URL：** https://www.anthropic.com/research/claude-code-expertise
- **Publication / update date：** 2026-06-16；访问 2026-07-10。
- **Exact supported point：** 对约 400,000 interactive sessions 的 privacy-preserving analysis 中，classifier 估计用户平均做约 70% planning decisions（what/approach/done），Claude 做约 80% execution decisions。Domain expertise 越高，verified success 与 trouble recovery 越高；作者用 tests/commits/PR/user affirmation 作为 verified signal。
- **Limitations：** 厂商研究依赖 model classifiers；不含 headless/third-party IDE；明确无法观察代码后来是否被采用或产生真实经济结果。相关性不是因果。
- **David implication：** Blueprint 负责“what/done/boundaries”，adapter 不应把产品判断转交 coding agent；return-to-blueprint 是合同升级，不是普通 debug fallback。
- **Confidence：** Medium-High（reported telemetry）；Medium（David inference）。

### G-E16 — v0 的 error-free preview 指标是 narrow outcome，不是产品 correctness

- **Claim：** Product-builder 的“成功 generation”需拆解为 preview rendered、build pass、AC pass、security/data correctness 等层次。
- **Evidence class：** `B-VENDOR-EVAL`。
- **Source titles：** *How we made v0 an effective coding agent*；*Introducing the v0 composite model family*。
- **URLs：** https://vercel.com/blog/how-we-made-v0-an-effective-coding-agent ; https://vercel.com/blog/v0-composite-model-family
- **Publication / update date：** 2026-01-07；第二页 2025（访问 2026-07-10）。
- **Exact supported point：** v0 将 successful generation 定义为 preview 中出现 working website，而非 error/blank screen；Vercel 报告 standalone LLM code 在其经验中可约 10% 出错，composite pipeline 可带来 double-digit success increase。另一 vendor benchmark 给出 v0 model error-free generation rate 89.80–93.87%，高于所测 base models。
- **Limitations：** 厂商自定义 eval set、未公开完整 task distribution/replication；error-free preview 不检查业务规则、accessibility、security、data migration、user value 或 David AC。
- **David implication：** `rendered=true` 只能是 QA 子项；产品 builder cohort 必须额外运行 canonical AC、build/test 和 manual review。
- **Confidence：** Medium。

### G-E17 — Codex 用户报告长 session 中 AGENTS.md 可被读取但后来应用不一致

- **Claim：** Instruction retention、resume 与 stale hash 应进入 downstream failure cases。
- **Evidence class：** `C-PRACTITIONER`，single open issue。
- **Source title：** openai/codex issue #25884, *AGENTS.md instructions can be read correctly but then applied inconsistently later in the same session*。
- **URL：** https://github.com/openai/codex/issues/25884
- **Publication / update date：** opened 2026-06-02；last reviewed 2026-07-10；issue open。
- **Exact supported point：** 报告者称 Codex CLI 0.136.0 在 nested AGENTS.md、多轮 models/migrations/tests 任务中，能先概述规则但后续漏掉 migration/type/test requirements；另一评论报告 resume 后仍使用旧 instruction behavior。
- **Limitations：** 用户自报、未由 maintainer 确认为同一 root cause、无总体频率；不能证明当前版本仍复现。
- **David implication：** 每次 execution run 记录 instruction/artifact hash；resume/context transition 做 preflight；finish 时按 constraint checklist 重新验证，而非询问 Agent“是否遵守”。
- **Confidence：** Low（普遍性）；Medium（failure-case value）。

### G-E18 — Cursor 官方 forum 曾确认 MDC rules 有时被忽略

- **Claim：** Cursor adapter 需要 rule-ingestion probe 和 deterministic post-check，不能仅看到 UI 显示 rule 就视为执行成功。
- **Evidence class：** `C-PRACTITIONER` + official support response。
- **Source title：** Cursor forum *Cursor Agent not following RULES*。
- **URL：** https://forum.cursor.com/t/cursor-agent-not-following-rules/149542/3
- **Publication / update date：** support reply 2026-01-22；访问 2026-07-10。
- **Exact supported point：** Cursor support 回复称 Agent 有时会忽略 MDC rules，团队知悉，并要求 request ID、mode、model、rule path/content 以排查。另有 2026-04 report 指向特定版本修复，说明行为可能 version-specific。
- **Limitations：** Forum 报告不是抽样研究；known issue 可能已修；不能推导所有 rules 不可靠。
- **David implication：** adapter version pin/access date、mode/model 与 request/session ID 是测试元数据；规则遵循通过 seeded observable constraint 验证。
- **Confidence：** Medium（存在过已知 failure）；Low（当前发生率）。

### G-E19 — Agent session logs、commits、CI 与 human review 形成审计链，但仍需人工负责

- **Claim：** QA/change log 应引用可复查证据：命令、exit code、test/CI、diff、commit/session；完成状态不能只由 Agent 自述。
- **Evidence class：** `A-OFFICIAL`。
- **Source titles：** GitHub *Managing agent sessions*；*Application card: GitHub Copilot Agents*；*Troubleshooting GitHub Copilot cloud agent*。
- **URLs：** https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents ; https://docs.github.com/en/copilot/responsible-use/agents ; https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/troubleshoot-cloud-agent
- **Publication / update date：** 持续更新；访问 2026-07-10。
- **Exact supported point：** GitHub session logs 展示 tools、changes、tests/linters；Agent commit 可链接 session log 并签名。Responsible-use 文档明确 generated code 可能不准确、不安全，custom agents/config 也需测试，用户负责 review/validation。Troubleshooting 文档承认 Agent 可能 push 未过 CI 的变化，并说明 CI workflow 可能需人工 Approve and run。
- **Limitations：** 日志可见不保证日志完整或结果正确；GitHub-native traceability 不能直接移植到其他 Agent。
- **David implication：** Universal evidence record 使用开放 schema；adapter 只填充 GitHub session/PR/CI refs。`done` 由 validator 派生，且至少需要 human review gate 处理 high-risk task。
- **Confidence：** High。

## 4. Evidence Synthesis

### 4.1 充分支持

1. 不同 Agent 的 instruction filenames、scope、precedence、surface 支持确实不同，因此必须有 Agent-specific Adapter。
2. 大任务需要明确 outcome、relevant context、boundaries、AC/verification；官方资料跨 OpenAI、Anthropic、GitHub、Cursor、Lovable、Bolt、v0 一致支持该方向。
3. Build/test/browser/preview 是可调用 capability；是否运行、是否通过、是否覆盖 AC 必须单独记录。
4. Plan/read-only → implement → verify → review 是可复用 workflow family，但不是固定 UI 或保证成功的公式。
5. Instruction files 是 advisory context；security、locked no-go、ready status 和 destructive boundary 必须由 policy/harness/validator 强制。

### 4.2 有冲突或仅启发性支持

1. AGENTS.md 对效率与 accuracy 的实验结果不一致：一项观察到 runtime/output-token 降低，另一项观察到 cost 增加且成功率无显著提高。差异来自 task、repo docs、Agent、metric 与 context quality。
2. “短、具体、scoped”得到官方与实验方向性支持，但不存在适用于所有 repo 的最佳行数/字节阈值。
3. Plan mode、checkpoint、session log、browser test 可以减少某些风险，但没有 evidence 证明它们自动形成完整交接闭环。

### 4.3 尚无直接证据

- 没有找到公开研究证明同一 David Blueprint package 在 Codex、Claude Code、Cursor、Copilot、Lovable/Bolt/v0 上达到相同 implementation outcome。
- 没有官方产品声明会原生理解 David canonical IDs 或 return-to-blueprint protocol。
- 没有证据证明 progress.md/change log 本身提高成功率；它们首先是审计与恢复机制。
- 没有证据给出适用于 David 的最佳 task slice 大小、checkpoint 频率、retry 次数或 clarification budget。

## 5. Source Inventory

| ID | Source | Type | Date / access |
|---|---|---|---|
| `S-G01` | OpenAI, *Prompting* | Official docs | access 2026-07-10 |
| `S-G02` | OpenAI, *Custom instructions with AGENTS.md* | Official docs | access 2026-07-10 |
| `S-G03` | Anthropic, *How Claude remembers your project* | Official docs | access 2026-07-10 |
| `S-G04` | Anthropic, *Claude Code: Best practices for agentic coding* | Official engineering guide | 2025-04-18 / access 2026-07-10 |
| `S-G05` | Cursor, Rules / CLI / Checkpoints / Review | Official docs | access 2026-07-10 |
| `S-G06` | GitHub, Copilot custom-instruction support | Official docs | access 2026-07-10 |
| `S-G07` | GitHub, Copilot task best practices | Official docs | access 2026-07-10 |
| `S-G08` | Lovable Knowledge / Plan / Agent | Official docs/changelog | 2026-02-05 / access 2026-07-10 |
| `S-G09` | Bolt Plan / Prompt / Version History | Official docs | access 2026-07-10 |
| `S-G10` | v0 Instructions / Prompting / Changelog | Official docs/blog | 2025-10-06 to 2025-12-15 / access 2026-07-10 |
| `S-G11` | Deng et al., SWE-Bench Pro | Primary benchmark | 2025-09-19; modified 2026-02-11 / access 2026-07-10 |
| `S-G12` | *Evaluating AGENTS.md* | Primary experiment | 2026-02 / access 2026-07-10 |
| `S-G13` | *On the Impact of AGENTS.md* | Primary experiment | 2026-01-23 / access 2026-07-10 |
| `S-G14` | *Agentic Coding Manifests* | Primary descriptive study | 2025-09-18 / access 2026-07-10 |
| `S-G15` | Anthropic, *How Claude Code is used in practice* | Vendor telemetry research | 2026-06-16 / access 2026-07-10 |
| `S-G16` | Vercel, v0 effective agent/composite model | Vendor eval | 2025-2026 / access 2026-07-10 |
| `S-G17` | openai/codex #25884 | Practitioner report | 2026-06-02 / access 2026-07-10 |
| `S-G18` | Cursor forum #149542/3 | Practitioner/support report | 2026-01-22 / access 2026-07-10 |
| `S-G19` | GitHub agent session / responsible use docs | Official docs | access 2026-07-10 |
