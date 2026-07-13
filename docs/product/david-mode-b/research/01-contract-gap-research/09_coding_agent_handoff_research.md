# 09 — Coding-Agent Handoff Research

> 角色：G — Coding-Agent Handoff Outcomes  
> 状态：Research-only；不是 `04_handoff_skill_contract.md`，也不是 production support 声明  
> 研究日期：2026-07-10  
> 权威内部输入：`01_ia_reasoning_and_agent_autonomy_contract.md` > `00_david_mode_b_positioning_and_principles.md` > 本研究  
> 证据账本：[`sources/agent_g_handoff_evidence.md`](sources/agent_g_handoff_evidence.md)  
> Skill Card：[`skill_cards/compile_handoff_context.md`](skill_cards/compile_handoff_context.md)

## 1. Executive Conclusion

David 的通用 Handoff 不应是“一份更长的 Prompt”，而应是一个有版本、有 hash、可解析、可验证、可恢复的 execution package：

```text
Canonical Blueprint
  -> readiness gate
  -> Universal Core
  -> Agent-specific Adapter
  -> isolated execution
  -> deterministic + expert QA
  -> evidence-backed completion OR return-to-blueprint
```

核心结论：

1. **Universal Core 是产品执行合同。** 它包含目标、MVP boundary、canonical references、task slices、AC、done-when、commands、checkpoint、failure recovery、QA、change log 和 return-to-blueprint；这些事实不因 Agent 改变。
2. **Agent-specific Adapter 只是加载与调用协议。** 它只描述 instruction filename/location/precedence、reference syntax、permissions/sandbox、progress surface、version/access date 与 fallback；不得复制或改写产品事实。
3. **主入口 Prompt 只是 bootstrap。** 它给 package identity/hash、active task、read order、hard boundary、验证与回传协议，不内嵌整份 Blueprint。
4. **Instruction file 是 advisory context，不是成功证明。** Codex `AGENTS.md`、Claude Code `CLAUDE.md`、Cursor rules 与 Copilot repository instructions 都有 surface、scope、precedence 或 retention 限制。Hard no-go、readiness 和 `done` 必须由 policy/validator/harness 派生。[OpenAI AGENTS.md docs](https://developers.openai.com/codex/guides/agents-md)，页面未标注更新日期，访问 2026-07-10；[Anthropic memory docs](https://code.claude.com/docs/en/memory)，页面未标注更新日期，访问 2026-07-10；详见 `G-E02`、`G-E03`。
5. **Capability 不等于 outcome。** “能运行 test”“有 Plan Mode”“有 checkpoint”“preview rendered”均不能推出 build/test/AC 通过，更不能推出用户价值或生产正确性。
6. **首个 support claim 应保守。** Codex、Claude Code、Cursor、GitHub Copilot coding agent 可进入 native-repo test cohort；Lovable、Bolt、v0 只进入 conditional product-builder cohort。任何 Adapter 在至少一组真实 repo 中通过 build/test/AC 且不违反 no-go 前，不得标记 `supported`。

## 2. Evidence Boundary

### 2.1 必须区分的四类陈述

| 类型 | 本报告中的含义 | 可支持的结论 | 不可外推 |
|---|---|---|---|
| `Official capability` | 官方文档声明产品能读取/调用/展示某机制 | Adapter 候选映射、preflight 项 | 遵循率、任务成功率 |
| `Recommended practice` | 官方或方法作者建议的 workflow | 设计假设、默认流程 | 因果效果、普适最优 |
| `Practitioner friction` | Issue/forum/troubleshooting 中的个案 | failure-mode seed、回归用例 | 总体频率、当前版本必现 |
| `Outcome evidence` | 有任务、样本、指标、限制的实验或 telemetry | 特定设置下的观察结果 | David production outcome、跨 Agent 等价性 |

### 2.2 关键证据摘要

| ID | Claim | Direct source / date | 支持点 | 限制 | David implication | Confidence |
|---|---|---|---|---|---|---|
| `G-E01` | 大任务输入应明确 goal/context/output/boundaries/verification | OpenAI, [Prompting](https://learn.chatgpt.com/docs/prompting)，页面未标注；访问 2026-07-10 | 官方 Codex guidance 要求 desired behavior、relevant code/repro、constraints 和 verification | Recommended practice，无成功率实验 | entry prompt 做 bootstrap，不复制 Blueprint | High（practice） |
| `G-E02` | Codex 可分层读取 `AGENTS.md`，有 precedence 与 32 KiB 默认上限 | OpenAI, [Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)，页面未标注；访问 2026-07-10 | root-to-cwd chain、override precedence、restart/preflight | 只证明加载机制，不证明持续遵循 | Codex Adapter 要记录 cwd、active files 与 hash | High（capability） |
| `G-E03` | Claude Code 的 `CLAUDE.md` 是 context，不是 enforced config | Anthropic, [Memory](https://code.claude.com/docs/en/memory)，页面未标注；访问 2026-07-10 | 可用 `@AGENTS.md` 导入；hard enforcement 应用 hooks 等机制 | “具体、简短更可靠”无公开遵循率 | `CLAUDE.md` 只导入/适配，不承载产品真相 | High |
| `G-E04` | Cursor rules 可 scoped；checkpoint 不是 version control | Cursor, [Rules](https://cursor.com/docs/rules)、[CLI](https://cursor.com/docs/cli/using)、[Agent Overview — Checkpoints](https://cursor.com/docs/agent/overview#checkpoints)，页面未标注；访问 2026-07-10 | `.cursor/rules`、`@` refs、resume；checkpoint 与 Git 分离，只用于撤销 Agent changes | IDE/CLI/mode 支持可能不同 | Adapter pin surface/version；change log 仍写 repo | High（capability） |
| `G-E05/06` | Copilot instruction support 按 surface 变化；clear task 应含 scope、AC、file hints | GitHub, [support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support)、[task best practices](https://docs.github.com/en/copilot/using-github-copilot/using-copilot-coding-agent-to-work-on-tasks/best-practices-for-using-copilot-to-work-on-tasks)，持续更新；访问 2026-07-10 | 官方列出多文件 support matrix；ideal task 含 clear description、complete AC、files | Best practice，不是量化阈值；support 可变 | Copilot Adapter 必须 surface-aware；高风险任务不默认无人值守 | High |
| `G-E08/09/10` | Lovable/Bolt/v0 有 knowledge/instructions、plan 与部分验证/恢复能力 | [Lovable Knowledge](https://docs.lovable.dev/features/knowledge)、[Bolt Plan](https://support.bolt.new/best-practices/discussion-mode)、[v0 Instructions](https://v0.app/docs/instructions)；功能日期见证据账本；访问 2026-07-10 | 官方能力可承载部分 package | 未证明 canonical IDs、完整 repo tests 或 return protocol | 只列 conditional；逐项 capability probe | Medium-High（capability），Low（完整兼容） |
| `G-E11` | Requirements/interface 可显著改变 long-horizon benchmark outcome，但仍不保证成功 | Deng et al., [SWE-Bench Pro](https://openreview.net/forum?id=9R2iUHhVfr)，2025-09-19，modified 2026-02-11；访问 2026-07-10 | problem-only 8.4%/8.2%；加入 requirements/interface 25.9%/22.7%；完整设置仍低于约 26% | 特定 scaffold/models；部分 spec 来自 gold artifacts | 冻结 AC/interface/tests，同时禁止“完整 spec = 成功” | High（实验内） |
| `G-E12/13` | Context file 的 accuracy、cost、efficiency evidence 有冲突 | [Evaluating AGENTS.md](https://arxiv.org/abs/2602.11988)，2026-02；[Impact on Efficiency](https://arxiv.org/abs/2601.20404)，2026-01-23；访问 2026-07-10 | 前者无显著 accuracy 增益且 LLM file 增成本；后者观察 median runtime/token 降低 | task/repo/agent/metric 不同；后者无完整 correctness eval | Adapter 最小化，并同时测 correctness/cost/latency | High（各自设置），Medium（综合） |
| `G-E15` | 用户更常决定 what/approach/done，Agent 更常决定 execution | Anthropic, [How Claude Code is used in practice](https://www.anthropic.com/research/claude-code-expertise)，2026-06-16；访问 2026-07-10 | 约 400k interactive sessions；classifier 估计用户 70% planning、Claude 80% execution | Vendor classifier；无实际采用/价值观测；非因果 | Blueprint 冻结产品判断，Agent 自主低层实现 | Medium-High |
| `G-E17/18` | Instruction retention/rule ingestion 有 practitioner friction | [Codex issue #25884](https://github.com/openai/codex/issues/25884)，opened 2026-06-02；[Cursor forum](https://forum.cursor.com/t/cursor-agent-not-following-rules/149542/3)，support reply 2026-01-22；访问 2026-07-10 | 个案报告 nested/resume/rule omission | 单帖、可能已修、无总体频率 | hash preflight + seeded no-go + deterministic post-check | Low（普遍性），Medium（test-case value） |
| `G-E19` | Logs/commit/CI/review 可形成证据链，但人工仍负责 | GitHub, [Managing agent sessions](https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents)、[Responsible use](https://docs.github.com/en/copilot/responsible-use/agents)，持续更新；访问 2026-07-10 | session 可记录 tools/tests/linters；generated code 仍需 review/validation | 日志可见不代表完整/正确 | `done` 由 evidence-backed validator 派生 | High |

完整 source metadata、支持点与限制见 evidence ledger。网络工具失败链也记录在该文件，不能把 fallback 搜索摘要当 primary source。

## 3. Universal Core 与 Adapter 的边界

### 3.1 Normative boundary

| Universal Core：对所有 Agent 相同 | Agent-specific Adapter：只因 surface 改变 |
|---|---|
| Product goal、target user、core job、MVP boundary | instruction filename、location、scope、precedence |
| Canonical Blueprint/version/hash 与 artifact manifest | 支持的 file/reference syntax，例如 `@path` |
| node/flow/wireframe/scope/constraint/AC IDs | 启动 cwd、repo root discovery、context limits |
| Constraints、no-gos、dependencies、assumptions | sandbox、permissions、network、approval behavior |
| Ordered task slices 与 dependency graph | plan/read-only/execute mode 的调用方式 |
| Per-task inputs/outputs/AC/done-when | progress/checkpoint/session-log surface |
| Exact build/test/validate commands 与 expected evidence | product/version/access date、unsupported fallback |
| Failure recovery、QA、change log、return protocol | Adapter preflight probe 与 evidence collector |

**禁止：** Adapter 重新描述 goal、scope、AC、business rule 或 no-go；即使文字“等价”，它也会形成第二事实源。若 surface 无法读取 Core，Adapter 应标记 `unsupported` 或生成带 Core hash 的 deterministic projection；projection 失配即 Blocker。

### 3.2 建议 package layout

```text
.david/handoff/<package-id>/
  manifest.json
  ENTRY.md
  core/
    blueprint.json
    artifact-manifest.json
    repository-instructions.md
    definition-of-done.json
    task-index.json
    tasks/<task-id>.json
    validation/commands.json
    validation/qa-plan.json
    protocols/checkpoint.schema.json
    protocols/failure-recovery.json
    protocols/return-to-blueprint.schema.json
  adapters/
    <agent>/<surface-version>/adapter.json
    <agent>/<surface-version>/bootstrap.md
  runs/<run-id>/
    progress.json
    events.jsonl
    command-results.jsonl
    change-log.md
    qa-report.json
    blueprint-change-requests/<request-id>.json
```

Repository root 的 `AGENTS.md`、`CLAUDE.md`、`.cursor/rules/*.mdc` 或 `.github/copilot-instructions.md` 只应是由 `adapter.json` 指向上述 package 的薄 loader。它们不是 Blueprint projection 的 canonical storage。

### 3.3 Identity 与 integrity

`manifest.json` 至少包含：

```json
{
  "packageId": "handoff-...",
  "schemaVersion": "...",
  "blueprintId": "...",
  "blueprintVersion": "...",
  "blueprintHash": "sha256:...",
  "artifactManifestHash": "sha256:...",
  "taskOrder": ["TASK-..."],
  "adapterRefs": ["ADAPTER-..."],
  "generatedAt": "...",
  "expiresAt": null
}
```

编译时必须校验：

- 每个 canonical ID 可解析且类型匹配；
- 所有引用落在同一 approved Blueprint version，或有显式 cross-version mapping；
- 所有 projection/file 有 hash；
- stale/unknown/blocked artifact 不被静默打包；
- Adapter 声明其读取的 Core hash；
- run 开始、resume、完成前都重验 hash。

## 4. Prompt 7.10 覆盖合同

### 4.1 主入口 Prompt

主入口 Prompt 固定为短 bootstrap，包含：

1. `packageId`、Blueprint version/hash、`adapterId`、active `taskId`；
2. repo root、启动 cwd、Core `ENTRY.md` 与 task packet 的 exact path；
3. read order：manifest -> repository instructions -> task -> referenced artifacts -> validation plan；
4. hard boundaries：不得改 canonical Blueprint、不得扩大 scope、不得降低 AC/DoD、不得执行未批准 destructive action；
5. 先做 preflight 并输出 machine-readable capability/refs/commands summary；
6. 何时实施、何时 checkpoint、何时停止并 return-to-blueprint；
7. 完成时需要的 command results、AC evidence、diff/change log 与 unresolved items。

主入口不得：复制完整需求、要求 Agent“自行理解整个 repo”、只说“完成后测试”、或让 Agent自己定义 done。

### 4.2 Repository instructions：`AGENTS.md` / `CLAUDE.md` / Cursor rules

Universal `repository-instructions.md` 只放长期、repo-wide operational facts：

- package discovery 与 canonical source precedence；
- setup/build/test/lint/typecheck/validate 的命令 ID；
- architecture boundaries 与禁止触碰区域的 canonical refs；
- coding/testing conventions 中真正影响 execution 的最小集合；
- checkpoint、evidence、return protocol；
- instruction conflict 与 stale hash 的停止规则。

Agent 文件只负责加载：

| Surface | Thin adapter artifact | 必要 preflight |
|---|---|---|
| Codex | root/nearest scoped `AGENTS.md` 或 `AGENTS.override.md` | 输出 discovered instruction chain、cwd、合并大小、Core hash；新 run 才视为刷新 |
| Claude Code | `CLAUDE.md` 导入 `@.david/.../ENTRY.md` 或薄 loader；必要时 `.claude/rules/` | 验证 import/path、memory scope；hard rule 使用 hook/policy，不只靠 CLAUDE.md |
| Cursor | `.cursor/rules/david-handoff.mdc`，按 surface 可再读取 root `AGENTS.md`/`CLAUDE.md` | 记录 IDE/CLI、mode、model/version；验证 rule attachment 与 `@` refs |
| GitHub Copilot coding agent | `.github/copilot-instructions.md`、path-specific instruction 或 agent file，按 support matrix 选择 | 记录 GitHub.com/IDE/CLI surface 与 precedence；验证 Actions/setup/permissions |

官方材料只支持这些加载 capability，并未证明按 David 合同执行成功（证据 `G-E02`–`G-E06`）。

### 4.3 Task decomposition

Task slice 必须是**独立可验证的 end-to-end increment**，不是文件列表或“让 Agent 自己拆”。每个 `TaskPacket` 必须含：

| Field | Contract |
|---|---|
| `taskId` | 稳定 ID，不随标题或文件移动改变 |
| `goal` | 本 slice 的 observable outcome |
| `blueprintRefs` | node/flow/wireframe/scope/constraint/AC canonical IDs |
| `dependsOn` | 已完成 task IDs 与 external dependencies |
| `inScope` / `outOfScope` | 明确功能、state、role、data boundary |
| `fileHints` | path + relevance + required/optional；只是 locator/hint，不是 identity |
| `expectedInputs` / `expectedOutputs` | API/UI/data/artifact contract |
| `acceptanceCriteria` | item-specific behavior，引用 `AC-*` |
| `doneWhen` | global/technical completion evidence，引用 DoD/command IDs |
| `riskClass` / `executionPermission` / `approvalTiming` | 风险分类、谁可执行，以及需要审批时的独立时点；permission 与 timing 不混为一个 enum |
| `recoveryPolicyRef` | retry/rollback/stop rules |
| `returnTriggers` | 何时不得继续实现 |

切分规则：

- 保留 coherent user outcome，不按 frontend/backend 任意切断关键路径；
- 一个 slice 的 AC 可在隔离环境中判定；
- 依赖先行，migration/data/auth/high-risk 单独 gate；
- file hints 可不完整，Agent 可探索，但新增 scope 必须回传；
- task 过大、需要多个未确认业务判断或无法构造 test oracle 时，不得假装 ready。

GitHub 官方把 clear description、complete AC 与 file guidance 作为 ideal task，并建议 complex/high-risk/ambiguous work 不直接 delegation；这是 recommended practice，不是 success threshold（`G-E06`）。

### 4.4 File references 与 canonical IDs

- **Canonical ID 是 identity；relative path 是 locator；hash 是 integrity。** 三者不得混用。
- 每个 file ref 包含 `path`、`repoRelative=true`、`contentHash`、`relevance`、`required`、可选 line/symbol hint。
- 绝对路径不得写入可移植 Core；Adapter 在 runtime 解析 repo root。
- line number 只能作 hint，不能作稳定合同；优先 symbol、test ID 或 artifact section ID。
- Agent 发现 path moved 时可更新 run 的 locator，但不可改 canonical relation；需要 Blueprint 变更时发 change request。
- Canonical IDs 不依赖任何 Agent 原生“理解”；preflight resolver 与 schema validator 负责确认。没有官方产品声明原生支持 David IDs。

### 4.5 Acceptance criteria 与 Done-when

两者必须分开：

| Acceptance criteria | Done-when / Definition of Done |
|---|---|
| item-specific external behavior/business constraint | repo/team/shared completion evidence |
| 例：viewer 不可编辑且得到明确权限状态 | 例：build、targeted test、lint、typecheck 通过，diff reviewed |
| 引用 node/flow/rule/state | 引用 command/check/review policy |
| 不规定内部实现 | 可规定工程流程与 evidence format |

`done` 由 validator 计算，建议逻辑：

```text
done = implementation_present
    AND all_required_AC_passed
    AND all_required_commands_passed
    AND no_locked_constraint_violation
    AND QA_gate_satisfied
    AND evidence_complete
    AND no_open_blocker_or_blueprint_change_request
```

Agent 的自然语言“已完成”只能是 `self_report`，不能直接写 `status=done`。SWE-Bench Pro 显示 requirements/interface 可以提高特定 benchmark outcome，但完整设置仍低于约 26%，所以规范完整性是必要输入而不是成功保证（`G-E11`）。

### 4.6 Build / test / validate

命令应 machine-readable 且可直接执行：

```json
{
  "commandId": "CMD-targeted-test",
  "phase": "test",
  "cwd": ".",
  "shell": "bash",
  "command": "npm test -- path/to/test",
  "timeoutSeconds": 600,
  "required": true,
  "expectedExitCode": 0,
  "produces": ["test-report"],
  "networkPolicy": "deny"
}
```

Rules：

1. 先跑 baseline/repro，再改代码；记录 pre-existing failure。
2. 使用 repo 现有命令，不凭空发明 package manager、flags 或 test target。
3. 按 `setup -> repro/baseline -> targeted test -> build/type/lint -> broader regression -> product QA` 执行适用项。
4. 每次结果记录 command ID、exact command、cwd、start/end、exit code、stdout/stderr artifact、environment fingerprint。
5. `not_run`、`unsupported`、`blocked` 与 `passed` 是不同状态；不得把“工具可用”写成 passed。
6. preview/browser render 只是 QA 子项，不能替代业务、security、data 或 migration validation。

### 4.7 Progress checkpoint

Checkpoint 由 run-owned `progress.json` + append-only `events.jsonl` 表示，至少记录：

- run/agent/adapter/package/task IDs 与所有 hash；
- current phase、completed/active/pending task；
- changed files 与 diff/commit refs；
- command results、AC status、QA status；
- assumptions used、clarifications、approvals；
- blockers、retries、next safe action；
- rollback point 与 unresolved blueprint change request。

写入时机：preflight 后、每个 task slice 后、任何 approval/clarification 前、失败/rollback 后、context resume 前后、final QA 前。Cursor checkpoint 只能辅助 Undo；官方明确它不是 version control 且会清理，因此不能代替这一通用记录（`G-E04`）。

### 4.8 Failure recovery

| Failure class | Required response | 禁止行为 |
|---|---|---|
| stale/missing ref 或 hash mismatch | 停止；记录 exact ref；重新编译 package | 猜测最新需求 |
| setup/environment failure | 记录命令/环境；只用已批准 fallback；必要时 blocked | 静默改依赖/权限 |
| pre-existing test failure | 保存 baseline evidence；区分 caused-by-change | 宣称全绿或顺手修 scope 外问题 |
| implementation/test failure | 在 task 的 retry budget 内最小修复并重跑 | 删除/放宽 test 或 AC |
| no-go/security/destructive boundary | 立即停止并请求 approval/人工执行 | 自行绕过 sandbox/policy |
| AC 有两个合理业务解释 | return-to-blueprint | 任选一个并固化 |
| 必须改变 scope/interface/data model | 发 Blueprint Change Request | 直接改 canonical artifact |
| retry budget exhausted/context unstable | checkpoint 为 blocked，提供 evidence/next options | 无限 retry、重复 automated fix |
| partial completion | 明确 passed/failed/not-run；保留可逆 diff | 把 partial 写成 done |

Retry 次数、时间与 token budget 暂无 David outcome evidence，应作为可配置 protocol，不在本研究冻结数值。

### 4.9 QA

QA 分层而非综合分数：

1. **Deterministic integrity：** schema、IDs、hash、dependency DAG、required fields、command exit、forbidden path/diff checks。
2. **Behavioral AC：** required AC tests；manual/user-test item 不得被 automation 冒充。
3. **Engineering regression：** targeted + broader tests、build/type/lint、migration/data checks。
4. **Product QA：** critical flow、role/state/error/recovery、accessibility 与 visual/browser checks（适用时）。
5. **Security/policy：** auth/privacy/payment/destructive operations 的独立 gate。
6. **Expert review：** diff quality、architecture fit、scope/no-go、test validity。
7. **Traceability：** 每个 changed file/commit 对应 task/AC/Blueprint refs；每条 required AC 有 evidence。

GitHub session logs 能显示 tools/tests/linters，commit 可链接 session，但官方仍要求人工负责 review/validation；因此“有 log”不是 pass（`G-E19`）。

### 4.10 Change log

每个 run 的 change log 只记录实现变化，不改写 Blueprint：

```text
changeId
taskId / canonical refs
files changed
observable behavior changed
reason
AC/test evidence refs
deviation from planned file hints
approvals
rollback ref
unresolved risks
```

建议 JSONL 为 canonical audit data，Markdown 为 projection。Agent-native session URL、PR、commit、checkpoint 作为 external evidence refs，不能成为唯一记录。

### 4.11 Return-to-blueprint workflow

触发条件：

- canonical ref/manifest stale、缺失或冲突；
- AC/flow/wireframe/constraint 有两个以上合理解释；
- 实现必须新增/删除 P0 scope，改变 core flow、role/permission、data/API contract；
- build/test 显示 approved design infeasible，且修复不是 routine implementation choice；
- 发现新的 privacy/security/payment/legal/irreversible decision；
- hidden dependency 指向 Later/Excluded；
- required AC 没有可用 test oracle 或 verification method。

Protocol：

1. Agent 停止受影响 task，不修改 canonical Blueprint。
2. 保存 checkpoint、最小 reproduction、failed command、diff 与 affected canonical IDs。
3. 写 `BlueprintChangeRequest`：现状、冲突证据、影响范围、可选方案、建议、对现有实现影响；状态为 `pending`。
4. David/用户按 autonomy/approval contract 处理，生成新的 approved Blueprint version。
5. 重新运行 `compile_handoff_context`，生成新 package/hash；旧 run 链接 successor。
6. Agent 新 run preflight 后继续；不得把旧 approval 套到新 scope。

这是合同升级，不是普通 debug fallback。Coding Agent 可以提出实现选项，但不能自行决定用户-owned product truth。

## 5. Agent-specific Adapter Design

### 5.1 Support levels

| Level | Definition |
|---|---|
| `documented_candidate` | 官方资料证明必要机制存在，但未跑 David downstream test |
| `conditional` | 只能承载 Core 子集或依赖 surface-specific projection/probe |
| `validated` | 固定 version/surface 在真实 repo task 中达到预注册 pass gate |
| `supported` | 多任务/回归中维持 outcome，已知限制和 fallback 文档化 |
| `unsupported` | 无法可靠读取 Core、执行 required validation 或产出 evidence |

本研究最多给出 `documented_candidate` 或 `conditional`，不授予 `validated/supported`。

### 5.2 Adapter matrix

| Agent / surface | Official capability | Adapter mapping | 必测 limitation / fallback | Research status |
|---|---|---|---|---|
| OpenAI Codex CLI/IDE/cloud | `AGENTS.md` hierarchy、explicit path context、plan/verification guidance | thin `AGENTS.md`；固定 cwd；task prompt 指向 Core；收集 command/diff/session evidence | byte limit、nested precedence、new run refresh、resume/hash retention；若 loader 未生效则 explicit prompt + block | `documented_candidate` |
| Claude Code | `CLAUDE.md` hierarchy/import、Plan Mode、tests/worktree/resume；hooks 可强制规则 | `CLAUDE.md` import Core ENTRY；`.claude/rules` 只放 scope mechanics；hook 做 locked-path/no-go | memory 是 context 非 enforcement；import/path/context conflict；unsupported hook 时降级 manual gate | `documented_candidate` |
| Cursor IDE/CLI | `.cursor/rules` types/nesting、`@` refs、CLI resume/JSON、diff review、local checkpoint | scoped MDC loader；记录 IDE/CLI/mode/model；Core progress 独立于 checkpoint | rule attachment、mode差异、checkpoint 清理/非 VC；规则 probe 失败即 explicit attach 或 block | `documented_candidate` |
| GitHub Copilot coding agent | repo/path/agent instruction support matrix、issue assignment、ephemeral Actions、session/PR/CI logs | 按 GitHub.com coding-agent surface 选择 instruction file；issue body 只传 package/task IDs；setup steps；PR evidence collector | instruction precedence、Actions approval、ephemeral env、Agent 可能 push failing CI；CI 未运行不得 pass | `documented_candidate` |
| Lovable Agent | workspace/project knowledge、root instruction files、Plan `.lovable/plan.md`、diff/browser tests | project knowledge 放 loader；approved plan 引用 task slice；导出 Git evidence；显式请求 tests | 长会话 instruction consistency；大部分 tools 要显式请求；未知 arbitrary schema/ID 支持 | `conditional` |
| Bolt Claude Agent | Project/System Knowledge、Plan/Build、incremental tests、version history | project knowledge + focused task projection；先 Plan；preview/test evidence；Git/export | repo instruction precedence 不明；version history 不恢复 DB；repeated fixes；data migration 改为 manual | `conditional` |
| v0 | Instructions、Plan Mode、project `instructions`、GitHub/terminal capability 演进 | on-demand instruction/bootstrap + task reference digest；approval 后执行；收集 preview/build evidence | 未找到可靠 AGENTS/CLAUDE/canonical protocol 支持；preview 不是 correctness；无法读 Core 则 inline signed projection | `conditional` |

### 5.3 Product-builder 特殊约束

Lovable/Bolt/v0 不与 native-repo Agent 直接合并排名，原因不是能力高低，而是 environment、repo control、test access、preview/runtime 和 recovery semantics 不同。只有当同一 task 能固定 base snapshot、导出完整 diff、运行同一 required commands、保存 evidence、执行 return protocol 时，才进入同 cohort；否则只报告 capability coverage，不报告成功率对比。

## 6. Cross-Agent Downstream Execution Test

### 6.1 Research question

在固定 repo/base commit、固定 Universal Core、固定环境与同一 human intervention policy 下，仅替换 Agent-specific Adapter，Codex、Claude Code、Cursor、GitHub Copilot coding agent 是否能：

- 构建出符合 required AC 的变更；
- 通过公开与 hidden validation；
- 不违反 no-go/locked constraint；
- 保持 Blueprint/AC/change traceability；
- 在 product ambiguity 时正确 return-to-blueprint，而非猜测。

Lovable/Bolt/v0 先做 capability qualification；通过后作为独立 product-builder cohort。

### 6.2 Test fixture

选择一个真实但隔离的中型 repo，预注册两个 task family：

1. **Feature slice：** 一个贯穿 UI、state/API 与 error/recovery 的小型 end-to-end P0 flow；含 5–8 条 AC、一个 accessibility check、一个 locked no-go、一个可发现但不在 file hints 的相关文件。
2. **Bug/recovery slice：** 有稳定 reproduction、pre-existing unrelated failing test、一个需要区分 implementation failure 与 Blueprint ambiguity 的边界 case。

每个 task 固定：base commit/container image、dependencies/cache、network/permission policy、public commands、hidden tests、manual QA script、time/token budget、allowed human responses、Core package/hash。不同 Agent 仅替换 Adapter。

### 6.3 Preflight qualification

在正式 run 前，Adapter 必须通过：

- loader/instruction discovery probe；
- manifest/Core/task hash 回显；
- canonical ref resolution；
- read/write/sandbox/network/command capability probe；
- seeded harmless no-go recognition；
- checkpoint/evidence write probe；
- stop/return protocol probe。

未通过者记 `qualification_failed`，不得伪装成 implementation failure，也不得进入 outcome denominator。

### 6.4 Experimental conditions

| Condition | Core | Adapter | 用途 |
|---|---|---|---|
| `C1` | 完整 Universal Core | 正确 Adapter | 主测试 |
| `C2` | 完整 Universal Core | 无 Adapter，仅 explicit entry prompt | 测 Adapter 增量价值 |
| `C3` | 完整 Universal Core | stale/wrong-hash Adapter | 测 preflight 能否阻断，不允许继续实现 |
| `C4` | 缺一个高影响业务事实 | 正确 Adapter | 测 return-to-blueprint，而不是实现成功 |

不能用 C2/C3 证明某 Agent“更差”；它们测试 protocol behavior。随机化 Agent/run order，清空非 package memory，使用独立 worktree/branch/container。先 pilot 每条件至少 3 次检查 harness，再依据 variance/power 分析确定正式样本；本研究不虚构一个通用“足够样本量”。

### 6.5 Run phases

```text
P0 isolate + fingerprint
P1 adapter preflight
P2 task/context plan（read-only）
P3 implementation by ordered slices
P4 targeted validation
P5 broader regression + product QA
P6 traceability/review
P7 done OR blocked OR return-to-blueprint
```

Human 只能按预注册 policy 回答 clarification/approval；不得代写实现或提示 hidden tests。每次干预记录问题、原因、回答、是否用户-exclusive、elapsed time 与对 Blueprint 的影响。

### 6.6 Outcome metrics

**Primary，逐项报告，不合成单一分数：**

- required build/test/validate command pass；
- public + hidden AC pass rate 与 all-required-AC gate；
- no-go/locked constraint violations；
- unintended scope/file changes；
- canonical traceability completeness；
- 正确 `done`、`blocked`、`return_to_blueprint` classification。

**Secondary：**

- clarification/approval count 与 user-exclusive ratio；
- invalid/stale reference count；
- retry/rollback/recovery count；
- wall time、tool calls、input/output tokens、cost；
- diff size、review findings、human correction time；
- checkpoint/change-log/evidence completeness；
- pre-existing failure 是否被正确区分；
- plan-to-implementation deviation。

### 6.7 Pass gate 与 failure taxonomy

单次 run 只有同时满足以下条件才是 `passed`：required commands 全通过、required AC 全通过、无 Blocker no-go/scope violation、traceability/evidence 完整、无 open blocker/change request、expert review 无 high-severity defect。`rendered`、`PR opened`、`tests attempted`、`Agent says done` 都不是 pass。

Failure 分类：`adapter_ingestion`、`reference_resolution`、`environment`、`planning`、`implementation`、`verification`、`constraint_violation`、`recovery`、`traceability`、`false_done`、`missed_return`、`harness_failure`。每项保留原始 evidence，双人 adjudication 处理根因不清的 case。

### 6.8 Reporting rules

- 记录 Agent、model、surface、version、access date、mode、permissions、Adapter hash。
- capability qualification 与 implementation outcome 分开分母。
- report absolute counts、rates、confidence interval 与原始 run packet；小样本不做排行榜。
- product-builder cohort 与 native-repo cohort 分开。
- 任何厂商 benchmark/telemetry 仅作背景，不替代 David test。
- 结果只能支持“在这些 tasks/versions/settings 下”，不能推断通用成功率。

## 7. Inputs to Future `04_handoff_skill_contract.md`

### 7.1 Must specify normatively

1. `HandoffPackage`、`TaskPacket`、`CommandSpec`、`ExecutionCheckpoint`、`EvidenceRecord`、`BlueprintChangeRequest` JSON Schemas。
2. Universal Core/Adapter 的禁止复制边界、projection hash 与 conflict precedence。
3. readiness preconditions：canonical refs、P0 flow/state/scope/AC、dependencies、no-gos、commands、QA method。
4. 主入口 Prompt template 与 preflight response schema。
5. AC/DoD 分离与 validator-derived `done` state machine。
6. task dependency DAG、risk/approval gate、retry/rollback policy。
7. build/test/validate evidence format 与 pre-existing failure handling。
8. checkpoint/change log/return-to-blueprint state transitions。
9. Adapter capability registry、version/access date、qualification/promotion/retirement gates。
10. downstream harness 与 support claim policy。

### 7.2 Proposed execution states

```text
compiled
-> awaiting_approval
-> ready
-> preflight
-> executing
-> validating
-> passed

preflight/executing/validating
-> blocked
-> return_to_blueprint
-> superseded
```

`passed` 只能由 validator 生成；Agent 可写 `completion_claimed` event。Blueprint 新版本生成后，旧 package 必须 `superseded`，不得原地覆盖。

### 7.3 Unresolved research questions

- 最小但足够的 Universal Core artifact set；
- task slice 大小与 checkpoint 频率；
- instruction loader 在各 surface/version 的真实 retention；
- 何种 file refs 最少产生无效探索又不限制实现；
- clarification budget 对 correctness 与用户负担的影响；
- Lovable/Bolt/v0 是否能稳定读取 machine-readable package 并运行同一 tests；
- Adapter regression 的最低 task coverage 与正式 support threshold；
- logs/hash/provenance 对真实 reviewer correction time 的影响。

这些问题需要真实 repo downstream execution 与目标用户研究，不能靠 desktop research 冻结。

## 8. What This Research Does Not Claim

- 不声称任何 Agent 比其他 Agent 更可靠。
- 不声称 `AGENTS.md`、`CLAUDE.md`、Cursor rules 或 custom instructions 能提高成功率。
- 不声称 Plan Mode、checkpoint、session log 或 browser test 自动形成正确交接。
- 不把 SWE-Bench、vendor preview 指标或 telemetry 当 David outcome。
- 不声称 Lovable/Bolt/v0 已兼容 David Handoff。
- 不允许 Coding Agent 修改 `BlueprintDocument`；它只能返回 evidence 与 change request。
