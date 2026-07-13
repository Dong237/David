# 07 — Codex Goal Mode Master Prompt

> **官方名称是 Goal mode，命令是 `/goal`。**  
> 该 Prompt 用于 Codex CLI / Codex App 中的长时间自主开发。  
> 在仓库根目录打开 Codex 后，复制下面完整的 `/goal` 指令。

---

## 1. 推荐执行前检查

确认以下文件已经进入仓库：

```text
docs/product/david-mode-b/00_positioning_and_principles.md
docs/product/david-mode-b/01_ia_reasoning_and_agent_autonomy_contract.md
docs/product/david-mode-b/research/01-contract-gap-research/
docs/product/david-mode-b/demo/02_demo_showcase_spec.md
docs/product/david-mode-b/demo/03_ai_study_coach_demo_script.md
docs/product/david-mode-b/demo/04_ai_study_coach_blueprint_fixture.md
docs/product/david-mode-b/demo/05_demo_acceptance_checklist.md
docs/product/david-mode-b/demo/06_speckit_command_runbook.md
```

如果 `/goal` 不存在，可按 Codex 官方指引启用：

```bash
codex features enable goals
```

---

## 2. 一次性 Goal Prompt

```text
/goal Build and finish the complete David Mode B competition Demo Showcase without stopping until the verifiable end state below is reached.

FIRST, read these source-of-truth files in order:

1. docs/product/david-mode-b/00_positioning_and_principles.md
2. docs/product/david-mode-b/01_ia_reasoning_and_agent_autonomy_contract.md
3. docs/product/david-mode-b/research/01-contract-gap-research/01_executive_summary.md
4. docs/product/david-mode-b/research/01-contract-gap-research/08_canvas_comprehension_research.md
5. docs/product/david-mode-b/research/01-contract-gap-research/12_inputs_for_future_specs.md
6. docs/product/david-mode-b/research/01-contract-gap-research/13_critic_review.md
7. docs/product/david-mode-b/research/01-contract-gap-research/14_shared_vocabulary_resolution.md
8. docs/product/david-mode-b/demo/02_demo_showcase_spec.md
9. docs/product/david-mode-b/demo/03_ai_study_coach_demo_script.md
10. docs/product/david-mode-b/demo/04_ai_study_coach_blueprint_fixture.md
11. docs/product/david-mode-b/demo/05_demo_acceptance_checklist.md
12. docs/product/david-mode-b/demo/06_speckit_command_runbook.md

Treat 00 and 01 as product principles. Treat the four Demo files as the implementation scope. If older code or documents conflict, the Demo files win for this competition vertical slice without changing the long-term product direction.

Before writing product code:

A. Inspect the repository and preserve reusable work that aligns with the pivot.
B. Spawn subagents and wait for all of them:
   - one read-only product/spec auditor;
   - one read-only Canvas/UX interaction reviewer;
   - one read-only frontend architecture and scope reviewer;
   - one read-only QA/Playwright reviewer.
C. Ask each subagent to report only blockers, contradictions, reuse opportunities, and high-risk implementation details.
D. Consolidate their findings into a short implementation preflight note.
E. Do not ask me routine implementation questions. Use the documented defaults. Ask only if a true product blocker cannot be resolved from the source files.

Then read and EXECUTE docs/product/david-mode-b/demo/06_speckit_command_runbook.md.

Important:
- Invoke the installed Spec Kit commands or skills one by one.
- In Codex skills mode use $speckit-*.
- In slash-command mode use /speckit.*.
- Do not merely copy the command text into chat.
- Verify the `specify` CLI exists. If missing, follow the official Spec Kit installation instructions using the latest stable release tag, then initialize Codex skills mode only if `.specify` is absent.
- Follow this sequence:
  constitution
  → specify
  → clarify
  → checklist
  → plan
  → tasks
  → analyze
  → implement
  → runtime verification
  → converge
  → implement remaining P0 tasks
  → repeat verification and converge until complete.
- Skip taskstoissues unless it is required by the existing repository workflow.

Build a real, clickable, deterministic desktop Web App that supports the complete recording flow:

1. Enter the AI Study Coach idea.
2. David asks one decision-changing question.
3. Selecting the daily-session answer updates Live Product Context.
4. Generate Blueprint opens the Unified Blueprint Canvas.
5. IA regions and nodes render from the canonical fixture.
6. Flow is an overlay on the same graph.
7. Selecting Daily Session expands its node-level wireframe in place.
8. Scope badges and the Node Inspector are visible.
9. Moving Diagnostic Quiz from In MVP to Later creates a real blocker.
10. The required path visually breaks.
11. The Decision Panel shows three repair options.
12. Selecting the lightweight diagnostic repair clears the blocker.
13. Handoff Center shows clickable files and a starter prompt.
14. Copy starter prompt works or produces a reliable success toast.
15. Reset Demo restores the initial state.

Hard boundaries:
- No backend.
- No database.
- No authentication.
- No collaboration.
- No real LLM dependency.
- No WebGL or rotating 3D.
- No generic dashboard.
- No Figma-level wireframe editor.
- No new product scope.
- Do not implement IA, Flow, Wireframe, or Scope as disconnected primary tools.
- IA is the base graph.
- Flow is an overlay.
- Wireframe is node expansion.
- Scope and validation are overlays.
- All objects use canonical IDs from the fixture.

Use a stable stack suitable for this repo. Prefer:
- Vite
- React
- TypeScript strict
- @xyflow/react
- Vitest
- Playwright
Use CSS-based 2.5D semantic depth. Keep dependencies minimal.

During implementation:
- Keep a concise progress log with current checkpoint, verified evidence, remaining work, and blockers.
- Do not stop after producing a plan.
- Do not stop after first successful build.
- Run tests after each independently useful slice.
- Inspect the app in a browser, not only the terminal.
- Use Playwright for the happy path, scope-conflict path, lens toggles, handoff path, and reset.
- Capture required screenshots at 1280×720 and 1440×900.
- Inspect browser console errors.
- Run the complete demo repeatedly.
- If a test or visual checkpoint fails, fix it and rerun.
- Use subagents again after the first working version:
  1. UX reviewer against the demo script;
  2. QA reviewer against the acceptance checklist;
  3. scope reviewer for over-engineering;
  4. code reviewer for runtime and maintainability issues.
- Consolidate findings, fix all P0 issues, and rerun validation.
- Never mark an unverified acceptance item as passed.

Create or update:
- working application code;
- tests;
- Playwright tests;
- concise repository README;
- artifacts/demo-showcase/build-log.md;
- artifacts/demo-showcase/test-log.md;
- artifacts/demo-showcase/final-status.md;
- artifacts/demo-showcase/final-acceptance-checklist.md;
- artifacts/demo-showcase/screenshots/.

VERIFIABLE END STATE:

1. Dependency installation succeeds.
2. Dev server launches.
3. Typecheck passes.
4. Lint passes.
5. Unit tests pass.
6. Production build passes.
7. Playwright happy path passes.
8. Playwright scope-conflict path passes.
9. Playwright handoff and reset paths pass.
10. No uncaught browser console errors remain.
11. Required screenshots exist at both recording viewports.
12. Every P0 item in the execution copy of the acceptance checklist is checked with evidence.
13. The complete 90–120 second demo can be repeated five times from Reset Demo.
14. No P0 task remains after the final Spec Kit converge pass.
15. final-status.md contains exact install, run, test, and recording steps plus known limitations.

Stop only when all end-state conditions are met, or when a blocker truly requires a product-owner decision that is not answered anywhere in the source files. If blocked, pause with one concise decision request that names the blocked requirement, attempted alternatives, and recommended default.
```

---

## 3. 运行中查看状态

```text
/goal
```

暂停：

```text
/goal pause
```

恢复：

```text
/goal resume
```

清除：

```text
/goal clear
```

不要频繁打断。只在以下情况 Steering：

- Codex 开始实现明确 out-of-scope 功能；
- 它把 IA、Flow、Wireframe 拆成独立工具；
- 它没有使用 fixture；
- 它只写代码而不运行浏览器验证；
- 它卡在非阻塞问题上。

建议 Steering：

```text
Keep the current goal. Return to the Demo Showcase Spec and Scope Guard.
Do not add production features. Complete the next failing P0 acceptance item,
verify it in the browser, and continue.
```

---

## 4. 目标结束后的人工动作

Codex 完成后只做：

1. 按 README 启动；
2. 在 1440×900 手工跑一次；
3. 依照 `03_ai_study_coach_demo_script.md` 录屏；
4. 检查 5 张提交截图；
5. 备份工作 commit；
6. 提交比赛材料。

不要在录屏前临时增加新功能。
