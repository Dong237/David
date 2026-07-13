# David Mode B — Competition Demo Showcase Bundle

> 目标：在两天内，由 Codex Goal mode 基于现有 `00`、`01` 和研究包，一次性实现一个可点击、可录屏的 David Mode B Web App Vertical Slice。

## 文件清单

| 文件 | 用途 |
|---|---|
| `02_demo_showcase_spec.md` | Demo 产品范围、关键界面、交互和技术边界 |
| `03_ai_study_coach_demo_script.md` | 90–120 秒录屏脚本及逐步操作 |
| `04_ai_study_coach_blueprint_fixture.md` | 可直接提取为 JSON 的 Demo Blueprint 固定数据 |
| `05_demo_acceptance_checklist.md` | 构建、交互、视觉、录屏和 QA 验收清单 |
| `06_speckit_command_runbook.md` | Spec Kit 全部核心/可选命令及本项目执行顺序 |
| `07_codex_goal_mode_master_prompt.md` | 交给 Codex Goal mode 的一站式执行 Prompt |

## 建议放入仓库

```text
docs/product/david-mode-b/demo/
├── 00_README.md
├── 02_demo_showcase_spec.md
├── 03_ai_study_coach_demo_script.md
├── 04_ai_study_coach_blueprint_fixture.md
├── 05_demo_acceptance_checklist.md
├── 06_speckit_command_runbook.md
└── 07_codex_goal_mode_master_prompt.md
```

现有上位文档继续放在：

```text
docs/product/david-mode-b/
├── 00_positioning_and_principles.md
├── 01_ia_reasoning_and_agent_autonomy_contract.md
└── research/01-contract-gap-research/
```

## 运行原则

1. 先把所有文件复制到仓库。
2. 确保 Codex 能访问仓库根目录。
3. 使用 `07_codex_goal_mode_master_prompt.md` 中的 `/goal` Prompt。
4. Codex 必须先读取 `06_speckit_command_runbook.md`，再按顺序调用 Spec Kit。
5. 最终停止条件不是“代码写完”，而是：
   - Web App 可启动；
   - 核心 Demo 流程全部可点击；
   - 自动测试与 Playwright 通过；
   - 录屏分辨率下无视觉阻断；
   - Acceptance Checklist 全部 P0 项通过。
