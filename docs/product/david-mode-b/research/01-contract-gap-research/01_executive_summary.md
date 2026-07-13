# Executive Summary

## 1. 总体判断

`01` 的专业方向成立：David 应把 IA 与 sitemap/navigation/flow/wireframe 区分又连接；把 AI 推断标为 hypothesis；让 AI 承担 routine PM/UX judgment；让高影响变更可见、可控、可恢复；并以 canonical state、validator 和 handoff gate 约束模型。

但 Draft v0.9 还不能直接 implementation-freeze。最大缺口不是再增加框架，而是把三类内容分开：

```text
有权威方法支持的一般原则
≠ David 当前采用的 provisional product heuristic
≠ 必须由目标用户或 downstream execution 验证的结果
```

## 2. 有充分证据支持的规则

- IA 不等于 sitemap、navigation、flow 或 wireframe；这些必须来自同一结构并保持 traceability。
- Mental model 必须是用户证据或明确标记的 hypothesis；AI grouping 不能冒充 card-sort result。
- Card sorting、tree testing、usability test 与 analytics 回答不同问题，不能互换。
- Label 应提供 information scent；固定三次点击不是有效 IA 规则。
- Human-AI 系统应支持 correction、feedback、editability、Undo/manual fallback 与 graceful failure。
- 高影响、难逆、涉及隐私/安全/法律/支付/外部依赖的动作需要更强控制。
- Scope 应保持 end-to-end outcome；方法应按决策选择，不能把 JTBD、RICE、MoSCoW、Shape Up 等机械叠加。
- Coding Agent 的 instruction file/location 必须由 adapter 处理，产品事实必须留在 universal core。

## 3. 需要修改的规则

- Provenance enum 混合了 knowledge status、evidence basis 与 lifecycle/lock，应拆成正交字段。
- Decision Record 的四种 autonomy 名称与 Section 7 的六种正式 Action 不一致，必须统一。
- `AgentOperation` 与 `AutonomyDecision` 必须分开，避免两个 `ask_user` 语义层混淆。
- Question Budget 的 `3–5/1/0–1` 必须标为未校准配置，不得作为科学事实。
- Evidence hierarchy 应按 claim type 与 method fit 建模，而非一个跨问题的固定梯子。
- Readiness 必须从 validator/coverage 派生，并记录 override；不能由 LLM 直接声明。
- `01` 列出 20 个 Skills，而初始研究文件树只明确 17 个；本研究已补齐 `frame_outcome`、`map_opportunities`、`compile_handoff_context`，下一版 `01` 仍需记录每张卡的 path、version、promotion state 与 owning spec。

## 4. 只有启发性依据的规则

- Inventory 一定先于任何 page projection；
- 默认生成两个、最多三个 Candidate IA；
- normal turn 一次只问一个问题；
- 固定的 turn protocol 与三栏 workbench；
- Context→Intent→Objects→IA→Flow→Wireframe 的具体视觉顺序；
- 九种 provenance 状态全部直接可见；
- Semantic Zoom / 2.5D 会提升理解；
- 当前 readiness dimensions 与 severity threshold 的具体划分。

这些可作为 P0 hypothesis，但必须保留配置与实验入口。

## 5. 必须通过真实用户/实验校准

- 用户愿意回答多少问题，以及 first proposal 应在第几问出现；
- 一次一问、批量紧耦合问题或先给 visual hypothesis 的 trade-off；
- 哪些自动改动被视为专业帮助，哪些被视为越权；
- 用户是否理解 Canvas 的层级演化、provenance、confidence 与 Structure Diff；
- Semantic Zoom、focus+context、node expansion 是否降低还是增加负担；
- Validator 的误报、漏报和 blocker severity；
- 哪些 Handoff artifacts 会被 Codex/Cursor/Claude Code/Copilot 实际使用并正确执行。

## 6. 实现前最重要的 10 个结论

1. **保留六种 Autonomy Action，但用 hard gates + case evaluation 校准，不用模型自由发挥。**
2. **Question Budget 是实验参数。** 首个版本可用保守默认值，但必须记录问题数、纠正次数、drop-off 与 blueprint quality。
3. **先修 schema 语义。** Provenance、operation/action、readiness 不统一会让 Canvas、Policy 和 Eval 同时分叉。
4. **Skill 必须是可执行 contract。** 每个 Skill 要有 trigger、I/O、rules、anti-patterns、禁用条件和 validation，不能只是框架名。
5. **IA Gold 不能 exact-match。** 需评估 intent fit、coverage、grouping、labels、flow、scope、assumption honesty 和 handoff readiness，并允许多个合理答案。
6. **Validator 分层。** Referential integrity 等 deterministic；结构质量用 expert rubric；LLM critic 只初筛；真实 findability 由 tree/usability test 证明。
7. **Canvas 先保守。** 优先稳定 overview、selection focus、explicit layers、anchored rationale 与 history；Semantic Zoom 只是实验候选。
8. **Diff 与 Undo 是 Agentic UX 的核心，不是附加功能。** 但 diff 信息量与确认频率必须防 approval fatigue。
9. **Handoff = Universal Core + Adapter + execution evidence。** Canonical IDs、scope、AC、no-gos 和 commands 属于 core；AGENTS.md/CLAUDE.md/Cursor rules 只是载入适配。研究显示 context file 会改变行为，却不保证正确率，因此必须做 ablation/regression。
10. **冻结 Contract 的证据不是文档完成，而是评测闭环。** Gold cases、Autonomy cases、Validator cases、prototype tests 与 downstream executions 必须能反向更新 `01`。

## 7. 当前产品决策

不要直接实现完整 Canvas 或一次性 productionize 全部 PM Skills。推荐先批准两条并行工作流：

```text
Contract / Eval track:
Patch 01 schema-policy inconsistencies
→ freeze dataset/rule seed v0.1
→ create clean fixtures + single-defect perturbations
→ expert double-label pilot

User / Outcome track:
18 artifact-based builder interviews
→ Wizard-of-Oz Question/Autonomy sessions
→ Canvas/Diff prototype comparisons
→ 36-run downstream Handoff pilot

Evidence from both tracks
→ freeze 01 v1.0 thresholds and gates
→ write/freeze 02 Canvas, 03 Schema, 04 Handoff, 05 MVP PRD
```
