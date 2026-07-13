# Skill: `compile_handoff_context`

> 状态：Research contract；未经过真实 downstream Agent execution，不构成 Adapter support 声明。  
> 默认自治：L2；编译 draft 可 `APPLY_WITH_UNDO`，导出可执行 Handoff 必须通过 readiness/approval gate。  
> 证据账本：[`../sources/agent_g_handoff_evidence.md`](../sources/agent_g_handoff_evidence.md)

## Purpose

把已批准、达到 Handoff readiness 的 canonical `BlueprintDocument` 编译为一个不可分叉、可追踪、可验证的 **Universal Handoff Core**，再为指定 Coding Agent 生成只负责加载/执行差异的 **Agent-specific Adapter**。

本 Skill 的目标是减少 downstream Agent 对产品意图、scope、canonical IDs、AC、done-when 与 failure boundary 的猜测；它不实现产品、不自行批准 Blueprint、不保证 Agent 成功，也不把 capability 当 outcome。

## Trigger

- 用户批准导出 Handoff，且 Blueprint readiness validator 已运行；
- P0 scope、core flow/state、wireframe/node mini-IA、constraints/no-gos 与 AC 已达到 gate；
- downstream Agent/surface/version 被选择，需要编译对应 Adapter；
- canonical artifact、task slice、build/test command 或 Adapter version 变化，旧 package 应 stale/superseded；
- downstream run 返回 `BlueprintChangeRequest`，新 Blueprint version 已批准，需要重新编译；
- Adapter regression test、support promotion 或 retirement 需要固定 package/hash。

## Inputs

| 输入 | 必需 | 说明 |
|---|---:|---|
| `blueprintRef` | 是 | canonical `BlueprintDocument` ID、version、content hash；不得接受只有自然语言摘要的替代物 |
| `artifactManifestRef` | 是 | IA/Flow/Wireframe/Scope/Constraint/AC/Handoff projection 的 IDs、paths、hash、staleness |
| `readinessResult` | 是 | validator-derived dimensions、blockers、warnings、overrides、run IDs |
| `productContextRefs` | 是 | goal、target user、core job、MVP boundary 的 canonical refs |
| `scopeRefs` | 是 | P0/Later/Excluded、dependencies、risk class |
| `constraintRefs` | 是 | no-gos、locked constraints、security/privacy/payment/destructive boundaries |
| `taskCandidates` | 是 | candidate slices、dependency relations、inputs/outputs/file hints |
| `acceptanceCriteriaRefs` | 是 | item-specific AC 与 verification mappings |
| `definitionOfDoneRef` | 是 | repo/shared build/test/lint/type/QA/review evidence contract |
| `commandCatalog` | 是 | exact setup/build/test/validate commands、cwd、timeout、policy、expected evidence |
| `repositoryProfile` | 是 | repo root marker、language/toolchain、existing instruction files、architecture boundaries |
| `targetAdapters` | 是 | Agent、surface、version/model/mode（已知时）、access date、permission/sandbox profile |
| `recoveryPolicy` | 是 | retries、rollback、checkpoint、stop/return triggers；未知阈值必须显式 unknown |
| `approvalContext` | 是 | package export approval、high-risk approvals、scoped overrides |
| `priorRunRefs` | 否 | previous package/run/change request，用于 supersession 和 recovery lineage |

## Method

1. **Authority preflight**：确认 `BlueprintDocument` 是唯一 canonical source；拒绝把既有 `AGENTS.md`、Issue、Prompt 或 Agent plan 当产品事实源。
2. **Readiness gate**：读取 validator result；Blocker 未解决时只允许生成 `blocked` diagnostic package，不生成可执行 Adapter。Scoped explicit override 必须带 owner、reason、scope、expiry 与 audit ref。
3. **Resolve graph**：解析 product -> node/flow/state/wireframe/scope/constraint/AC -> test/QA 的 canonical graph；验证 ID 类型、版本、referential integrity、staleness 与 hash。
4. **Select context**：只选当前 P0 outcome/task 所需 artifacts；保留 source refs，不把整个聊天记录或全部 Blueprint 文本塞入 instruction files。
5. **Decompose tasks**：生成 ordered end-to-end slices；每个 slice 有 goal、inputs/outputs、dependencies、scope boundaries、file hints、AC、done-when、risk/approval、recovery 和 return triggers。
6. **Compile Universal Core**：写 package manifest、ENTRY、repository instructions、task packets、commands、QA、checkpoint/failure/return protocols；计算 content hashes。
7. **Detect Adapter capabilities**：按指定 Agent/surface/version 检查 instruction discovery、reference syntax、permissions、plan mode、command/test、progress/evidence 和 recovery capability。
8. **Compile thin Adapter**：只生成 loader/invocation/preflight/fallback；Adapter 引用 Core hash，不复制 goal/scope/AC/no-go。
9. **Static validation**：运行 schema、ID/hash、DAG、required field、command safety、projection duplication、instruction conflict 与 readiness validators。
10. **Emit package**：状态只能为 `ready`、`conditional` 或 `blocked`；保存 diagnostics、unsupported capabilities 与 required human actions。
11. **Register downstream test**：为尚未 validated 的 Adapter 生成 qualification + execution test case；不得因官方 capability 文档将其标为 `supported`。

## Professional Rules

1. `BlueprintDocument` 是唯一 canonical product state；Handoff 是带 hash 的 projection，不得反向静默改写 Blueprint。
2. Universal Core 与 Adapter 必须物理、逻辑分离；Adapter 只适配加载与执行机制。
3. Adapter 不得复制、翻译或重新概括 product goal、scope、business rule、AC、no-go；必要 projection 必须 deterministic、带 source hash 且标 `projection`。
4. 主入口 Prompt 必须短，只包含 package/task identity、read order、hard boundary、preflight、done/return protocol。
5. Canonical ID 是 identity，relative path/symbol 是 locator，hash 是 integrity；不得用 path 或 line number替代 canonical ID。
6. 所有 refs 必须在同一 approved Blueprint version 中解析；cross-version ref 需要显式 mapping。
7. `fileHints` 是方向，不是隐式 scope；Agent 可以探索相关文件，但扩大功能/数据/接口 scope 必须 return-to-blueprint。
8. Task slice 必须形成可独立验证的 coherent user outcome；不得只按 frontend/backend、文件数量或 token 大小机械切分。
9. 每个 task 必须定义 `inScope`、`outOfScope`、inputs、outputs、dependencies、AC、done-when、risk、approval、recovery 与 return triggers。
10. AC 是 item-specific external behavior；Definition of Done 是 shared engineering/QA evidence。两者只能引用，不能互相复制。
11. `done` 必须由 validators 从 command、AC、constraint、QA、evidence 与 blocker 状态派生；Agent 只能提交 `completion_claimed`。
12. Command 必须使用 repo 已有 toolchain，包含 exact command/cwd/timeout/required/expected exit/evidence；不得发明 package manager 或隐藏 shell side effect。
13. `not_run`、`unsupported`、`blocked`、`failed`、`passed` 必须分开；能运行 test 不等于 test passed。
14. Baseline/reproduction 与 post-change validation 必须可区分；pre-existing failure 不能被归因给本次实现，也不能被隐藏。
15. Hard no-go、locked path、security/privacy/payment/destructive boundary 不能只靠 instruction prose；需要 policy/hook/sandbox/diff validator 或 manual gate。
16. Progress checkpoint 必须独立于 Agent-native checkpoint/session；native refs 只能作为外部 evidence。
17. Retry 次数、时间/token budget 若无 approved policy，不得自行发明；标 `unknown` 并阻止高风险 unattended run。
18. Failure recovery 不得删除/放宽 test、AC 或 no-go，不得为“完成任务”静默扩大权限。
19. Product ambiguity、scope/interface/data-model 变化、stale refs 或不可逆风险必须 `return_to_blueprint`。
20. `BlueprintChangeRequest` 只能建议和附 evidence；只有 David/用户 approval flow 能生成新 canonical version。
21. Adapter 必须记录 agent、surface、version/model/mode（可得时）、access date、instruction precedence、permission profile 与 fallback。
22. 官方文档只能支持 `documented_candidate`；真实 repo downstream test 通过后才可升级 `validated/supported`。
23. Lovable/Bolt/v0 若不能读取 machine-readable Core、运行 required validation 或导出完整 evidence，应保持 `conditional/unsupported`。
24. 包生成后任何 Core artifact 变化都使 package 和 Adapter stale；禁止原地覆盖 hash/version。

## Anti-patterns

- 生成一个包含完整 PRD/Blueprint 的超长“万能 Prompt”；
- 为 Codex、Claude、Cursor 分别复制三份产品需求；
- 只创建 `AGENTS.md` 或 `CLAUDE.md` 就标记 handoff ready；
- task 写成“实现 Dashboard”或一串待修改文件，没有 observable outcome；
- 用“所有测试通过”代替 item-specific AC，或把每条 AC 复制 build/lint；
- 命令只写“run tests”，没有 exact command/cwd/expected result；
- 把 Cursor checkpoint、Lovable preview、Bolt version history 或 GitHub PR 当完整 recovery/QA；
- Agent 自报“完成”后直接写 `passed`；
- Agent 遇到业务歧义后自行选择并修改 Blueprint；
- 为通过测试删除 assertions、放宽 AC 或绕过 no-go；
- Adapter 未记录 surface/version/access date 就声称跨 Agent 通用；
- 用 vendor benchmark 或单个 Issue 推导 David 成功率。

## Do Not Use When / 禁用条件

以下任一条件满足时，Skill 必须禁用可执行导出，只能返回 `blocked` diagnostics：

- canonical `BlueprintDocument`、version 或 hash 缺失；
- Handoff readiness 未运行、已 stale，或存在未批准 Blocker；
- P0 core flow/state/scope/AC/constraints/no-go 之间有 unresolved contradiction；
- target task 没有 observable outcome、AC 或 verification method；
- required build/test/validate command 不存在且不能由 repo owner确认；
- product decision 有两个高影响解释，且答案属于用户/业务 owner exclusive knowledge；
- auth/privacy/payment/legal/destructive/data migration 风险没有批准的执行/回滚边界；
- target surface 无法读取 required Core、无法运行 required validation、无法导出 diff/evidence，且没有 manual fallback；
- 用户当前只要 research、discussion、idea exploration 或 Blueprint revision，而非 downstream implementation；
- package 只能通过复制/分叉产品事实到 Adapter 才能工作；
- prior run 有 open `BlueprintChangeRequest`，但新 Blueprint version 尚未批准；
- repository 有并发/未归属改动，无法隔离 base state 且会污染 evidence。

## Structured Output

以下为本 Skill 的 executable output schema；future `03_blueprint_domain_schema.md` / `04_handoff_skill_contract.md` 可拆分 `$defs`，但不得弱化 authority、readiness、hash 与 Adapter boundary。

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://david.local/schemas/skills/compile_handoff_context.output.json",
  "title": "compile_handoff_context output",
  "type": "object",
  "required": [
    "skillId",
    "schemaVersion",
    "compilationId",
    "generatedAt",
    "readiness",
    "diagnostics"
  ],
  "properties": {
    "skillId": { "const": "compile_handoff_context" },
    "schemaVersion": { "type": "string", "minLength": 1 },
    "compilationId": { "type": "string", "pattern": "^HC-[A-Za-z0-9._-]+$" },
    "generatedAt": { "type": "string", "format": "date-time" },
    "blueprintRef": { "$ref": "#/$defs/versionedCanonicalRef" },
    "artifactManifestRef": { "$ref": "#/$defs/fileRef" },
    "readiness": {
      "type": "object",
      "required": ["status", "validatorRunIds", "blockers", "warnings", "overrideRefs"],
      "properties": {
        "status": { "enum": ["ready", "conditional", "blocked"] },
        "validatorRunIds": {
          "type": "array",
          "minItems": 1,
          "uniqueItems": true,
          "items": { "type": "string", "minLength": 1 }
        },
        "blockers": { "type": "array", "items": { "$ref": "#/$defs/diagnostic" } },
        "warnings": { "type": "array", "items": { "$ref": "#/$defs/diagnostic" } },
        "overrideRefs": {
          "type": "array",
          "uniqueItems": true,
          "items": { "type": "string", "minLength": 1 }
        }
      },
      "additionalProperties": false
    },
    "universalCore": {
      "type": "object",
      "required": [
        "packageId",
        "packageVersion",
        "coreHash",
        "authority",
        "entryRef",
        "repositoryInstructionsRef",
        "definitionOfDoneRef",
        "taskIndexRef",
        "commandCatalog",
        "qaPlanRef",
        "checkpointProtocolRef",
        "failureRecoveryRef",
        "returnToBlueprintRef",
        "canonicalRefs"
      ],
      "properties": {
        "packageId": { "type": "string", "pattern": "^HP-[A-Za-z0-9._-]+$" },
        "packageVersion": { "type": "string", "minLength": 1 },
        "coreHash": { "$ref": "#/$defs/hash" },
        "authority": { "const": "BlueprintDocument" },
        "entryRef": { "$ref": "#/$defs/fileRef" },
        "repositoryInstructionsRef": { "$ref": "#/$defs/fileRef" },
        "definitionOfDoneRef": { "$ref": "#/$defs/fileRef" },
        "taskIndexRef": { "$ref": "#/$defs/fileRef" },
        "commandCatalog": {
          "type": "array",
          "minItems": 1,
          "items": { "$ref": "#/$defs/commandSpec" }
        },
        "qaPlanRef": { "$ref": "#/$defs/fileRef" },
        "checkpointProtocolRef": { "$ref": "#/$defs/fileRef" },
        "failureRecoveryRef": { "$ref": "#/$defs/fileRef" },
        "returnToBlueprintRef": { "$ref": "#/$defs/fileRef" },
        "canonicalRefs": {
          "type": "array",
          "minItems": 1,
          "items": { "$ref": "#/$defs/canonicalRef" }
        },
        "supersedesPackageId": { "type": ["string", "null"] }
      },
      "additionalProperties": false
    },
    "tasks": {
      "type": "array",
      "minItems": 0,
      "items": { "$ref": "#/$defs/taskPacket" }
    },
    "adapters": {
      "type": "array",
      "minItems": 1,
      "items": { "$ref": "#/$defs/adapter" }
    },
    "outputs": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "object",
        "required": ["artifactType", "file", "sourceHash"],
        "properties": {
          "artifactType": {
            "enum": [
              "manifest",
              "entry",
              "core",
              "task",
              "validation",
              "protocol",
              "adapter",
              "bootstrap",
              "diagnostic"
            ]
          },
          "file": { "$ref": "#/$defs/fileRef" },
          "sourceHash": { "$ref": "#/$defs/hash" }
        },
        "additionalProperties": false
      }
    },
    "diagnostics": {
      "type": "array",
      "items": { "$ref": "#/$defs/diagnostic" }
    }
  },
  "allOf": [
    {
      "if": {
        "properties": {
          "readiness": {
            "properties": { "status": { "const": "ready" } },
            "required": ["status"]
          }
        },
        "required": ["readiness"]
      },
      "then": {
        "required": ["blueprintRef", "artifactManifestRef", "universalCore", "tasks", "adapters", "outputs"],
        "properties": {
          "readiness": {
            "properties": { "blockers": { "maxItems": 0 } }
          },
          "tasks": { "minItems": 1 }
        }
      }
    },
    {
      "if": {
        "properties": {
          "readiness": {
            "properties": { "status": { "const": "conditional" } },
            "required": ["status"]
          }
        },
        "required": ["readiness"]
      },
      "then": {
        "required": ["blueprintRef", "artifactManifestRef", "universalCore", "tasks", "adapters", "outputs"],
        "properties": {
          "tasks": { "minItems": 1 }
        }
      }
    },
    {
      "if": {
        "properties": {
          "readiness": {
            "properties": { "status": { "const": "blocked" } },
            "required": ["status"]
          }
        },
        "required": ["readiness"]
      },
      "then": {
        "properties": {
          "readiness": {
            "properties": { "blockers": { "minItems": 1 } }
          },
          "adapters": {
            "items": {
              "properties": { "supportStatus": { "enum": ["blocked", "unsupported"] } }
            }
          }
        }
      }
    }
  ],
  "$defs": {
    "hash": {
      "type": "string",
      "pattern": "^sha256:[A-Fa-f0-9]{64}$"
    },
    "canonicalRef": {
      "type": "object",
      "required": ["id", "type"],
      "properties": {
        "id": { "type": "string", "minLength": 1 },
        "type": {
          "enum": [
            "product_context",
            "intent",
            "node",
            "flow",
            "state",
            "wireframe",
            "scope",
            "constraint",
            "assumption",
            "acceptance_criterion",
            "definition_of_done",
            "task",
            "test",
            "command",
            "approval"
          ]
        }
      },
      "additionalProperties": false
    },
    "versionedCanonicalRef": {
      "type": "object",
      "required": ["id", "type", "version", "contentHash"],
      "properties": {
        "id": { "type": "string", "minLength": 1 },
        "type": { "const": "blueprint" },
        "version": { "type": "string", "minLength": 1 },
        "contentHash": { "$ref": "#/$defs/hash" }
      },
      "additionalProperties": false
    },
    "fileRef": {
      "type": "object",
      "required": ["path", "repoRelative", "contentHash", "required", "relevance"],
      "properties": {
        "path": { "type": "string", "minLength": 1, "pattern": "^(?!/).+" },
        "repoRelative": { "const": true },
        "contentHash": { "$ref": "#/$defs/hash" },
        "required": { "type": "boolean" },
        "relevance": { "type": "string", "minLength": 1 },
        "symbolHint": { "type": ["string", "null"] }
      },
      "additionalProperties": false
    },
    "commandSpec": {
      "type": "object",
      "required": [
        "commandId",
        "phase",
        "cwd",
        "shell",
        "command",
        "timeoutSeconds",
        "required",
        "expectedExitCode",
        "networkPolicy",
        "evidenceType"
      ],
      "properties": {
        "commandId": { "type": "string", "pattern": "^CMD-[A-Za-z0-9._-]+$" },
        "phase": { "enum": ["setup", "baseline", "reproduce", "build", "test", "lint", "typecheck", "validate", "qa"] },
        "cwd": { "type": "string", "minLength": 1, "pattern": "^(?!/).+" },
        "shell": { "enum": ["bash", "sh", "zsh", "powershell", "cmd"] },
        "command": { "type": "string", "minLength": 1 },
        "timeoutSeconds": { "type": "integer", "minimum": 1 },
        "required": { "type": "boolean" },
        "expectedExitCode": { "type": "integer" },
        "networkPolicy": { "enum": ["deny", "allowlist", "allow"] },
        "evidenceType": { "enum": ["stdout", "test_report", "build_artifact", "diff", "screenshot", "manual_record"] },
        "approvalRef": { "type": ["string", "null"] }
      },
      "additionalProperties": false
    },
    "acceptanceRef": {
      "type": "object",
      "required": ["criterionId", "required", "verificationRefs"],
      "properties": {
        "criterionId": { "type": "string", "minLength": 1 },
        "required": { "type": "boolean" },
        "verificationRefs": {
          "type": "array",
          "minItems": 1,
          "items": { "type": "string", "minLength": 1 }
        }
      },
      "additionalProperties": false
    },
    "taskPacket": {
      "type": "object",
      "required": [
        "taskId",
        "title",
        "goal",
        "blueprintRefs",
        "dependsOn",
        "inScope",
        "outOfScope",
        "fileHints",
        "expectedInputs",
        "expectedOutputs",
        "acceptanceCriteria",
        "doneWhen",
        "riskClass",
        "executionPermission",
        "approvalTiming",
        "recoveryPolicyRef",
        "returnTriggers"
      ],
      "properties": {
        "taskId": { "type": "string", "pattern": "^TASK-[A-Za-z0-9._-]+$" },
        "title": { "type": "string", "minLength": 1 },
        "goal": { "type": "string", "minLength": 1 },
        "blueprintRefs": { "type": "array", "minItems": 1, "items": { "$ref": "#/$defs/canonicalRef" } },
        "dependsOn": { "type": "array", "uniqueItems": true, "items": { "type": "string", "pattern": "^TASK-[A-Za-z0-9._-]+$" } },
        "inScope": { "type": "array", "minItems": 1, "items": { "type": "string", "minLength": 1 } },
        "outOfScope": { "type": "array", "minItems": 1, "items": { "type": "string", "minLength": 1 } },
        "fileHints": { "type": "array", "items": { "$ref": "#/$defs/fileRef" } },
        "expectedInputs": { "type": "array", "items": { "type": "string", "minLength": 1 } },
        "expectedOutputs": { "type": "array", "minItems": 1, "items": { "type": "string", "minLength": 1 } },
        "acceptanceCriteria": { "type": "array", "minItems": 1, "items": { "$ref": "#/$defs/acceptanceRef" } },
        "doneWhen": {
          "type": "object",
          "required": ["commandIds", "qaCheckIds", "evidenceRequired", "changeLogRequired"],
          "properties": {
            "commandIds": { "type": "array", "minItems": 1, "uniqueItems": true, "items": { "type": "string", "pattern": "^CMD-[A-Za-z0-9._-]+$" } },
            "qaCheckIds": { "type": "array", "uniqueItems": true, "items": { "type": "string", "minLength": 1 } },
            "evidenceRequired": { "const": true },
            "changeLogRequired": { "const": true }
          },
          "additionalProperties": false
        },
        "riskClass": { "enum": ["routine", "moderate", "high", "restricted"] },
        "executionPermission": {
          "$ref": "https://david.local/schemas/v1/shared_contract_vocabulary.schema.json#/$defs/ExecutionPermission"
        },
        "approvalTiming": { "enum": ["not_applicable", "before_execution", "before_destructive_action"] },
        "recoveryPolicyRef": { "type": "string", "minLength": 1 },
        "returnTriggers": { "type": "array", "minItems": 1, "items": { "type": "string", "minLength": 1 } }
      },
      "allOf": [
        {
          "if": { "properties": { "executionPermission": { "const": "approval_required" } }, "required": ["executionPermission"] },
          "then": { "properties": { "approvalTiming": { "enum": ["before_execution", "before_destructive_action"] } } },
          "else": { "properties": { "approvalTiming": { "const": "not_applicable" } } }
        }
      ],
      "additionalProperties": false
    },
    "adapter": {
      "type": "object",
      "required": [
        "adapterId",
        "agent",
        "surface",
        "version",
        "accessDate",
        "supportStatus",
        "coreHash",
        "instructionFiles",
        "precedence",
        "referenceSyntax",
        "permissionProfile",
        "progressMechanism",
        "preflightChecks",
        "unsupportedCapabilities",
        "fallback"
      ],
      "properties": {
        "adapterId": { "type": "string", "pattern": "^ADAPTER-[A-Za-z0-9._-]+$" },
        "agent": { "enum": ["codex", "claude_code", "cursor", "github_copilot_coding_agent", "lovable", "bolt", "v0"] },
        "surface": { "type": "string", "minLength": 1 },
        "version": { "type": ["string", "null"] },
        "model": { "type": ["string", "null"] },
        "mode": { "type": ["string", "null"] },
        "accessDate": { "type": "string", "format": "date" },
        "supportStatus": { "enum": ["documented_candidate", "conditional", "validated", "supported", "blocked", "unsupported"] },
        "coreHash": { "$ref": "#/$defs/hash" },
        "instructionFiles": { "type": "array", "items": { "$ref": "#/$defs/fileRef" } },
        "precedence": { "type": "array", "items": { "type": "string", "minLength": 1 } },
        "referenceSyntax": { "type": "array", "items": { "type": "string", "minLength": 1 } },
        "permissionProfile": { "enum": ["read_only", "workspace_write", "sandboxed_execute", "remote_execute", "manual_mediated"] },
        "progressMechanism": { "type": "array", "items": { "type": "string", "minLength": 1 } },
        "preflightChecks": { "type": "array", "minItems": 1, "items": { "type": "string", "minLength": 1 } },
        "unsupportedCapabilities": { "type": "array", "items": { "type": "string", "minLength": 1 } },
        "fallback": { "type": "string", "minLength": 1 },
        "projection": {
          "type": ["object", "null"],
          "required": ["sourceHash", "projectionHash", "generatedDeterministically"],
          "properties": {
            "sourceHash": { "$ref": "#/$defs/hash" },
            "projectionHash": { "$ref": "#/$defs/hash" },
            "generatedDeterministically": { "const": true }
          },
          "additionalProperties": false
        }
      },
      "additionalProperties": false
    },
    "diagnostic": {
      "type": "object",
      "required": ["diagnosticId", "severity", "code", "message", "affectedRefs", "remediation"],
      "properties": {
        "diagnosticId": { "type": "string", "minLength": 1 },
        "severity": {
          "$ref": "https://david.local/schemas/v1/shared_contract_vocabulary.schema.json#/$defs/Severity"
        },
        "code": { "type": "string", "minLength": 1 },
        "message": { "type": "string", "minLength": 1 },
        "affectedRefs": { "type": "array", "items": { "type": "string", "minLength": 1 } },
        "remediation": { "type": "string", "minLength": 1 },
        "sourceEvidenceRefs": { "type": "array", "items": { "type": "string", "minLength": 1 } }
      },
      "additionalProperties": false
    }
  },
  "additionalProperties": false
}
```

## Default Autonomy

- 解析 refs、计算 hash、生成 manifest、排序已确认 dependency DAG：`AUTO_APPLY`（L0）。
- 从已批准内容生成 Universal Core draft、thin Adapter 与 diagnostics：`APPLY_WITH_UNDO`（L1–L2）。
- 把 package 标记 `ready` 并导出给 downstream Agent：`PROPOSE_FOR_APPROVAL`，且 readiness validator 必须通过。
- 高风险 task、destructive command、permission/network expansion：Agent 决策为 `PROPOSE_FOR_APPROVAL`；若执行必须由人完成，则另标 `executionPermission=manual_only`。`MANUAL_ONLY` 不是第七种 `AutonomyDecision`。
- Adapter support promotion：`RESEARCH_OR_TEST`；必须有真实 downstream outcome evidence。

## Must Ask When

- goal/core job/MVP boundary、P0 scope、role/permission、business rule 或 required AC 有两个高影响解释；
- build/test/validate command 需要 repo owner knowledge 且无法从可信 repo config 推导；
- required verification threshold、retry/rollback budget 或 destructive boundary 缺失；
- target Agent/surface 无法满足 required capability，存在多个代价显著不同的 fallback；
- existing code/tests 与 approved Blueprint 冲突，无法判定是 implementation drift 还是 Blueprint stale；
- prior uncommitted changes 不能与本 run 隔离。

不得询问可由 canonical artifacts、repo config、deterministic validator 或安全可逆探索解决的问题。

## Approval Required When

- 导出首个可执行 package 或切换 Agent/surface/permission profile；
- 使用 scoped readiness override；
- 运行 dependency install、network access、migration、credential、destructive 或 production-affecting command；
- high/restricted risk task 进入 execution；
- 改变 P0 scope、core flow、external interface、data model、auth/privacy/payment/legal behavior；
- 把 Adapter 从 `documented_candidate/conditional` 升级为 `validated/supported`；
- 接受 required AC/test/QA 未覆盖的 residual risk。

## Validation

### Deterministic

- output 通过 JSON Schema Draft 2020-12；
- Blueprint/version/hash 与 artifact manifest 匹配；
- canonical refs 全部可解析、类型正确、无 stale/unknown Blocker；
- task dependency graph 无环、task IDs/command IDs 唯一；
- 每 task 有 outcome、in/out scope、AC、done-when、return trigger；
- required AC 有 verification refs；required done-when 有 command IDs；
- command cwd 为 repo-relative、exact command 非空、timeout/policy/evidence 完整；
- `ready` 时 blockers 为空；`blocked` 时至少一条 Blocker 且 Adapter 不可 executable；
- Adapter `coreHash` 等于 Universal Core hash；projection source hash 匹配；
- Adapter 文件不包含 goal/scope/AC/no-go 的非引用副本（结构化 diff/lint + allowlist）；
- root instruction files 的 precedence/conflict 已检查；
- locked path/no-go 能映射到 deterministic policy/hook/diff check 或 manual gate；
- package artifact 变化会产生新 version/hash，并 supersede 旧 package。

### Expert / LLM Critic Candidate

- task slices 是否保持 coherent user outcome，又足够小而可验证；
- file hints 是否相关但没有过度约束实现；
- AC 与 DoD 是否正确分离且覆盖 critical states；
- recovery/return trigger 是否区分 routine implementation choice 与 product decision；
- Adapter 是否真的只含 mechanism，没有语义漂移；
- QA 是否覆盖 product/security/data risk，而非只看 build/preview；
- diagnostics/remediation 是否 actionable。

LLM critic 只能提出 issue candidates，不能单独批准 readiness、support 或 high-risk override。

### Needs Downstream / User Validation

- Agent 是否实际读取正确 package/hash 并持续应用 instruction；
- 同 task 在 Codex、Claude Code、Cursor、Copilot 中的 build/test/AC/no-go outcome；
- clarification count、review correction time、retry/cost 与 traceability；
- stale Adapter、resume、nested rules、context transition 的 failure recovery；
- 用户是否理解并信任 return-to-blueprint，而不是把它视为无意义阻塞；
- Lovable/Bolt/v0 能否运行同一 validation 并导出完整 evidence。

## Positive Evaluation Cases（synthetic）

| ID | 输入 | 期望行为 | 通过理由 |
|---|---|---|---|
| `CHC-P1` | approved Blueprint、全部 P0 refs/AC/commands ready；target=Codex CLI | 生成一份 Universal Core + thin `AGENTS.md` loader；Adapter 只含 cwd/read order/preflight，回显 Core hash；状态 `documented_candidate` 或经 test 后 `validated` | 产品事实只有一个来源，加载机制可测试 |
| `CHC-P2` | Cursor target，某 flow task 有 UI/error/recovery AC，另有 locked migration directory | task packet 引用 flow/state/AC IDs；MDC loader 只指向 Core；locked path 映射 diff validator；Cursor checkpoint 仅作 external evidence | scoped context、hard constraint 与通用 checkpoint 分离 |
| `CHC-P3` | 实现发现 approved API interface 无法支持 required recovery state | run 停止受影响 task，保存 repro/failed test/diff，生成 pending `BlueprintChangeRequest`；新 Blueprint 批准后编译新 package并 supersede 旧版本 | 正确 return-to-blueprint，不让 Agent改产品合同 |

## Negative Evaluation Cases / Failure Modes（synthetic）

| ID | 输入/错误输出 | 失败原因 | 正确修复 |
|---|---|---|---|
| `CHC-N1` | 分别在 `AGENTS.md`、`CLAUDE.md`、`.cursor/rules` 复制完整 scope/AC，三份 wording 不同 | Adapter 分叉 canonical truth，无法判断 precedence/staleness | 产品事实移回 Core；各文件变成 hash-pinned loader |
| `CHC-N2` | task 只有“实现 onboarding”，done-when 为“Agent确认完成”，命令为“run tests” | 无 task boundary、observable AC、exact validation 或 validator-derived done | 先补 scope/flow/state/AC、exact commands 与 evidence gate；否则 blocked |
| `CHC-N3` | Lovable preview 正常显示后将 package 标 `supported/passed`，未跑 data/auth/error AC | 把 preview capability 当 correctness/outcome，support claim 无真实 repo evidence | 状态保持 `conditional`；补 required test/manual QA/evidence 与 cohort qualification |

## Sources

| Source title | Source type | URL | Date | Exact supported point | Limitation | David implication | Confidence |
|---|---|---|---|---|---|---|---|
| OpenAI — *Prompting* | Official documentation | https://learn.chatgpt.com/docs/prompting | 页面未标注；访问 2026-07-10 | 大任务 prompt 应给 Goal、Context、Output、Boundaries；Codex task 要 relevant code/repro、constraints、verification，并报告 command/results | Recommended practice，不是成功率研究 | ENTRY/active task prompt 应短、明确、可验证 | High |
| OpenAI — *Custom instructions with AGENTS.md* | Official documentation | https://developers.openai.com/codex/guides/agents-md | 页面未标注；访问 2026-07-10 | Codex 按 global 与 project root-to-cwd 发现 instructions；有 override precedence、默认 32 KiB 上限与 restart/preflight 方法 | 证明 discovery，不证明持续遵循 | Codex Adapter 记录 cwd/instruction chain/hash，Core 不依赖 filename | High（capability） |
| Anthropic — *How Claude remembers your project* | Official documentation | https://code.claude.com/docs/en/memory | 页面未标注；访问 2026-07-10 | `CLAUDE.md` 是 context 而非 enforced config；可 `@AGENTS.md` import；project memory 适合 build/test/architecture/workflow | 没有公开遵循率；context 会冲突/衰减 | Claude Adapter 应 import/point to Core，hard no-go 用 hook/policy | High |
| GitHub — *Best practices for using Copilot to work on tasks* | Official documentation | https://docs.github.com/en/copilot/using-github-copilot/using-copilot-coding-agent-to-work-on-tasks/best-practices-for-using-copilot-to-work-on-tasks | 页面持续更新；访问 2026-07-10 | Ideal task 有 clear work、complete AC（含 tests）与 file guidance；complex/high-risk/ambiguous work 不适合直接 delegation | Best practice，无统一量化 threshold | TaskPacket 必须有 scope/AC/file refs/risk gate | High |
| Deng et al. — *SWE-Bench Pro* | Primary benchmark paper | https://openreview.net/forum?id=9R2iUHhVfr | 2025-09-19；modified 2026-02-11；访问 2026-07-10 | requirements/interface 使所测 GPT-5/Opus 从约 8% 提升到约 26%/23%，但完整设置仍低 | 特定 models/scaffold；spec 部分来自 gold artifacts；非 David test | 完整 task contract重要，但绝不能承诺成功 | High（实验内），Medium（外推） |
| *Evaluating AGENTS.md: Are Repository-Level Context Files Helpful for Coding Agents?* | Primary empirical study | https://arxiv.org/abs/2602.11988 | 2026-02；访问 2026-07-10 | context file 改变 testing/exploration/tool behavior，但总体 accuracy 无显著提升；LLM-generated files 增 cost | Python benchmark、特定 agents/models/context quality | Adapter 必须 task-relevant、最小化，并用 downstream regression验收 | High |
