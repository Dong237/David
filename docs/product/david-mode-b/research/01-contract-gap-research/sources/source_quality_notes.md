# Source Quality Notes

## 1. 评分目的

来源评分用于判断一条 Claim 能否成为 `01` 的规范依据，而不是给文章作者或组织打分。同一来源对“方法定义”可能是高质量，对“David 用户愿意回答几个问题”则可能完全不相关。

## 2. 质量等级

| 等级 | 定义 | 可支持的结论 |
|---|---|---|
| A | 原始学术论文、标准、方法所有者原文、产品官方文档；方法和语境直接相关 | 方法定义、官方能力、明确设计原则；仍需说明外推限制 |
| B | 权威机构指南或高质量专业资料，过程、约束和反例清楚 | 专业规则、实践边界、评测设计输入 |
| C | 可核验的 practitioner case、论坛讨论、公开 issue；身份/语境基本清楚 | 真实语言、工作流、失败模式、研究假设 |
| D | 二手摘要、营销文章、缺方法或缺原始引用 | 仅作检索线索，不进入关键 Claim |

## 3. 单条 Claim 的判定维度

| 维度 | 检查问题 |
|---|---|
| Authority | 来源是否拥有一手方法、数据或产品能力信息？ |
| Directness | 原文是否直接支持 Claim，而不是需要跨语境推断？ |
| Method transparency | 样本、过程、指标、限制是否可见？ |
| Independence | 是否只是重复引用同一原始材料？ |
| Recency | 对快速变化的 agent 能力是否在近 24 个月内更新？ |
| Applicability | 研究对象、任务风险与 David 是否相近？ |
| Falsifiability | Claim 能否被明确的反例或测试推翻？ |

## 4. 特定来源的使用边界

### Nielsen Norman Group / GOV.UK / Design Council

- 适合支持 IA/UX 方法定义、常见反模式和研究方法选择；
- 不自动证明某个具体 IA 对 David 用户有效；
- 需要真实 card sort、tree test 或 usability test 才能确认用户表现。

### Microsoft Research HAI / Google PAIR

- 适合支持 correction、control、feedback、expectation、graceful failure 等原则；
- 不能直接推出 David 的精确 question budget 或六种 action 的数值阈值；
- autonomy matrix 仍需 case library 与目标用户测试校准。

### 方法作者资料（Shape Up、Product Talk、SVPG、JTBD、RICE、MoSCoW）

- 对方法定义、适用决策和作者明确写出的边界具有高直接性；
- 通常不是独立效果评估；
- 一个方法不能因知名度被应用到所有决策。

### Coding Agent 官方文档

- 是当前支持的 instruction file、执行模式、权限与 workflow 的权威来源；
- 必须记录抓取/更新日期；
- 只支持“工具如何接收指令”，不证明某种 Handoff 一定提高成功率。

### Reddit / X / Hacker News / Forums / GitHub Discussions

- 可展示真实措辞、具体失败、工具摩擦和候选 workflow；
- 单帖不能支持普遍性、频率或市场规模；
- 与官方文档冲突时，分别记录“官方承诺”与“观察到的问题”。

### Synthetic cases 与 LLM-generated examples

- 只用于覆盖边界、回归测试和专家讨论；
- 必须显式标记 `synthetic: true`；
- 不得写成真实用户发现、模型准确率或产品效果。

## 5. 来源冲突处理

1. 先检查是否讨论不同任务、用户、风险等级或产品阶段；
2. 区分方法定义、效果证据、官方承诺与现场观察；
3. 保留冲突，不用模糊平均值消除；
4. 若冲突会改变 agent 行为，默认采用更可逆、更透明的行为，并创建验证任务；
5. 对快速变化的 agent 产品，以最新官方文档描述能力，以 practitioner evidence 描述落地摩擦。

## 6. Confidence 规则

| Confidence | 条件 |
|---|---|
| High | 至少一条直接 A 级来源，且无未解释的关键冲突；仅限来源真正覆盖的范围 |
| Medium | 一条直接 B 级或多条独立、相互一致但存在外推的来源 |
| Low | 主要来自间接资料、单个案例或专家推断；必须转为 provisional / research need |

Confidence 不等于影响度。高置信的低影响模式可以自动处理；低置信的高影响判断通常应提案、询问或测试。

## 7. 审查红旗

- URL 存在但没有 exact supported point；
- 多个来源实际指向同一论文；
- 把“作者建议”写成“研究证明”；
- 把 tool capability 写成 outcome evidence；
- 给 question count、成功率或 severity threshold 赋予无来源精确数字；
- 用 AI synthetic persona 支持 mental model；
- 用一个总分掩盖 IA 的多个独立失败维度。
