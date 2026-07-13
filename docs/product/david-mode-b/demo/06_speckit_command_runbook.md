# 06 — Spec Kit Command Runbook for David Demo

> **重要：** GitHub Spec Kit 的当前官方工作流以 specification 为可执行源，核心命令包括 constitution、specify、plan、tasks、implement 和 converge，并提供 clarify、analyze、checklist 等质量命令。  
> **Codex skills mode 语法：** `$speckit-*`  
> **多数其他集成语法：** `/speckit.*`  
> Codex 必须检测实际安装方式，不能只把命令当作普通文字输出。

官方来源：

- [GitHub Spec Kit](https://github.com/github/spec-kit)
- [Codex Goal mode](https://developers.openai.com/codex/use-cases/follow-goals)
- [Codex AGENTS.md](https://developers.openai.com/codex/guides/agents-md)
- [Codex Subagents](https://developers.openai.com/codex/subagents)

---

## 1. Preflight

### 1.1 必须先读

```text
docs/product/david-mode-b/00_positioning_and_principles.md
docs/product/david-mode-b/01_ia_reasoning_and_agent_autonomy_contract.md
docs/product/david-mode-b/research/01-contract-gap-research/01_executive_summary.md
docs/product/david-mode-b/research/01-contract-gap-research/08_canvas_comprehension_research.md
docs/product/david-mode-b/research/01-contract-gap-research/12_inputs_for_future_specs.md
docs/product/david-mode-b/research/01-contract-gap-research/13_critic_review.md
docs/product/david-mode-b/research/01-contract-gap-research/14_shared_vocabulary_resolution.md
docs/product/david-mode-b/demo/02_demo_showcase_spec.md
docs/product/david-mode-b/demo/03_ai_study_coach_demo_script.md
docs/product/david-mode-b/demo/04_ai_study_coach_blueprint_fixture.md
docs/product/david-mode-b/demo/05_demo_acceptance_checklist.md
```

文件不存在时，先根据仓库实际路径定位，不得复制出第二套 source of truth。

### 1.2 检查并安装 Specify CLI

先检查：

```bash
specify --help
```

如果命令不存在：

1. 检查 `uv` 和 Python 3.11+；
2. 从 GitHub Spec Kit 官方 Releases 确认最新稳定 tag；
3. 按官方方式安装固定稳定版本：

```bash
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@<latest-stable-tag>
```

不得在不知道版本的情况下虚构 tag。若执行环境没有网络或安装权限，停止并报告一个明确 blocker。

### 1.3 初始化 Spec Kit

如果 `.specify/` 不存在，在仓库根目录执行：

```bash
specify init . --integration codex --integration-options="--skills"
```

若目录非空且 CLI 要求确认：

```bash
specify init . --force --integration codex --integration-options="--skills"
```

如果 Spec Kit 已存在，不得重复初始化或覆盖已有 constitution。

### 1.4 语法检测

Codex skills mode 优先使用：

```text
$speckit-constitution
$speckit-specify
...
```

若当前环境安装的是 slash commands，则使用：

```text
/speckit.constitution
/speckit.specify
...
```

---

## 2. Spec Kit 全命令索引

| 目的 | Slash command | Codex skill |
|---|---|---|
| 项目宪法 | `/speckit.constitution` | `$speckit-constitution` |
| 功能规格 | `/speckit.specify` | `$speckit-specify` |
| 澄清规格 | `/speckit.clarify` | `$speckit-clarify` |
| 质量清单 | `/speckit.checklist` | `$speckit-checklist` |
| 技术计划 | `/speckit.plan` | `$speckit-plan` |
| 任务分解 | `/speckit.tasks` | `$speckit-tasks` |
| 转 GitHub issues | `/speckit.taskstoissues` | `$speckit-taskstoissues` |
| 跨文档分析 | `/speckit.analyze` | `$speckit-analyze` |
| 执行实现 | `/speckit.implement` | `$speckit-implement` |
| 收敛剩余差距 | `/speckit.converge` | `$speckit-converge` |

本次两天 Demo：

```text
必须执行：
constitution
specify
clarify
checklist
plan
tasks
analyze
implement
converge

默认跳过：
taskstoissues
```

---

## 3. 强制执行顺序

```text
0. Preflight and docs audit
1. constitution
2. specify
3. clarify
4. checklist
5. plan
6. tasks
7. analyze
8. implement
9. run tests + Playwright + screenshots
10. converge
11. implement newly appended tasks
12. repeat validate → converge until no P0 gap
13. final checklist sign-off
```

---

## 4. Command 1 — Constitution

调用：

```text
$speckit-constitution
```

指令正文：

```text
Create or update the David Demo project constitution.

The project is a two-day competition vertical slice, not a production platform.

Non-negotiable principles:
1. Demo reliability over backend realism.
2. One canonical Blueprint fixture and shared IDs.
3. IA is the base structure; Flow is an overlay; Wireframe is node expansion; Scope is an overlay.
4. Agentic Intake is conversation-first, not a rigid form.
5. No auth, database, collaboration, real LLM dependency, or WebGL.
6. Every P0 interaction must be clickable and repeatable.
7. Scope changes must trigger deterministic validation.
8. TypeScript strict, accessible controls, no console errors.
9. Unit tests and Playwright are required.
10. The app must be recordable at 1440×900 and usable at 1280×720.
11. Do not over-engineer or add features not present in the Demo Showcase Spec.
12. Work is done only when the Acceptance Checklist P0 items pass.
```

检查输出：

```text
.specify/memory/constitution.md
```

---

## 5. Command 2 — Specify

调用：

```text
$speckit-specify
```

指令正文：

```text
Build a clickable, recordable David Mode B competition showcase using the AI Study Coach fixture.

Read the demo spec, demo script, fixture, and acceptance checklist as source material.

The app must demonstrate:
- agentic idea intake with one decision-changing question;
- a live product context;
- a unified blueprint canvas;
- IA nodes and regions;
- flow as an overlay;
- wireframe as an expanded IA node;
- scope badges;
- a deterministic scope-conflict warning;
- three repair options and one recommended repair;
- a handoff center with clickable files and a starter prompt.

This feature is a deterministic vertical slice.
Do not add auth, backend, database, real LLM calls, collaboration, high-fidelity UI generation, or WebGL.

Focus on user stories and observable outcomes, not the tech stack.
```

Expected output：

```text
specs/<feature>/spec.md
```

---

## 6. Command 3 — Clarify

调用：

```text
$speckit-clarify
```

附加指令：

```text
Resolve underspecified areas using the existing 00, 01, research, demo spec, fixture, and acceptance checklist.

Do not ask the user about questions that:
- are already answered in those files;
- are routine professional implementation decisions;
- can use a reversible demo default.

Only ask the user when a true blocker cannot be resolved from source files.
If no blocker remains, record the clarification decisions and continue without waiting.
```

Goal mode 不得因非阻塞澄清停止。

---

## 7. Command 4 — Checklist

调用：

```text
$speckit-checklist
```

指令正文：

```text
Generate a requirements-quality checklist for the David Demo.

Cover:
- core demo narrative;
- canonical fixture and IDs;
- Intake;
- IA + Flow + Wireframe integration;
- Scope conflict and repair;
- Handoff;
- accessibility;
- recording viewport;
- automated testing;
- scope guard and anti-overengineering.

Cross-reference docs/product/david-mode-b/demo/05_demo_acceptance_checklist.md.
Do not replace that checklist; generate a Spec Kit checklist that complements it.
```

---

## 8. Command 5 — Plan

调用：

```text
$speckit-plan
```

指令正文：

```text
Plan a reliable desktop Web App using:
- Vite
- React
- TypeScript strict
- @xyflow/react
- restrained CSS or Tailwind
- Vitest
- Playwright

Use a reducer-driven deterministic fixture.
No backend, auth, database, external LLM, or WebGL.
Use CSS-based 2.5D semantic depth.
Preserve canonical IDs across nodes, flows, wireframes, scope, constraints, and handoff.
Design the implementation around the three app states and the exact demo script.

The plan must include:
- component architecture;
- state machine/reducer;
- fixture extraction and validation;
- React Flow layout;
- node expansion;
- overlays;
- scope conflict validator;
- handoff file preview;
- demo reset;
- responsive recording views;
- unit tests;
- Playwright flows;
- visual screenshot checkpoints;
- commands proving completion.
```

---

## 9. Command 6 — Tasks

调用：

```text
$speckit-tasks
```

附加要求：

```text
Break work into independently verifiable user-story phases.

Order:
1. app shell and fixture;
2. Intake;
3. Canvas IA;
4. node expansion and wireframe;
5. flow/scope lenses;
6. scope conflict and repair;
7. Handoff;
8. tests;
9. visual polish and recording readiness.

Every task must name exact file paths.
Mark safe parallel tasks with [P].
Do not create tasks for out-of-scope production features.
```

---

## 10. Command 7 — Task to Issues

本次默认不执行：

```text
$speckit-taskstoissues
```

原因：

```text
Two-day local Goal-mode implementation;
GitHub issue administration is not part of the showcase outcome.
```

只有用户明确要求时才执行。

---

## 11. Command 8 — Analyze

调用：

```text
$speckit-analyze
```

附加要求：

```text
Analyze constitution, spec, plan, tasks, demo source files, fixture, and acceptance checklist for:

- contradictions;
- missing user-story coverage;
- detached IA/Flow/Wireframe implementations;
- fixture/reference mismatches;
- scope creep;
- missing tests;
- missing recording requirements;
- tasks without validation;
- over-engineering.

Fix the generated planning artifacts before implementation.
Do not silently change approved product direction.
```

---

## 12. Command 9 — Implement

调用：

```text
$speckit-implement
```

附加要求：

```text
Implement tasks in dependency order.

After each user-story phase:
- run relevant tests;
- launch or inspect the app;
- update a short progress log;
- preserve the ability to run the previous demo flow;
- fix failures before continuing.

Use subagents for read-only UX review, test review, and scope audit where useful.
Avoid multiple write agents editing the same files concurrently.
```

---

## 13. Runtime Verification

Spec Kit implement 结束后，必须执行：

```text
install
typecheck
lint
unit tests
production build
Playwright
browser console inspection
screenshots at 1280×720
screenshots at 1440×900
manual happy path
manual scope conflict path
manual handoff path
reset demo repeated 5 times
```

将证据写入：

```text
artifacts/demo-showcase/
├── build-log.md
├── test-log.md
├── playwright-report/
├── screenshots/
│   ├── intake-1440x900.png
│   ├── canvas-1440x900.png
│   ├── node-expanded-1440x900.png
│   ├── scope-conflict-1440x900.png
│   └── handoff-1440x900.png
└── final-status.md
```

---

## 14. Command 10 — Converge

调用：

```text
$speckit-converge
```

附加要求：

```text
Compare the working codebase against:
- constitution;
- feature spec;
- plan;
- tasks;
- demo source documents;
- acceptance checklist;
- Playwright results;
- screenshots.

Append only remaining P0 work and critical visual/interaction gaps.
Do not add new product scope.
```

如果新增 P0 tasks：

```text
run implement again
→ rerun all validation
→ run converge again
```

停止条件：

```text
No P0 task remains.
No blocker remains.
All required automated checks pass.
All required screenshots exist.
The complete demo is repeatable.
```

---

## 15. Final Sign-off

Codex 最终必须更新：

```text
docs/product/david-mode-b/demo/05_demo_acceptance_checklist.md
```

或创建一个不会覆盖源文档的执行副本：

```text
artifacts/demo-showcase/final-acceptance-checklist.md
```

未验证项必须保留 unchecked，不得伪造通过。
