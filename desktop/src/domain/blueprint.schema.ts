import { z } from "zod";

const ProvenanceSchema = z.object({
  knowledgeStatus: z.enum(["confirmed", "inferred", "unknown", "conflicting"]),
  basisType: z.enum([
    "user_input",
    "source_evidence",
    "pattern",
    "model_inference",
    "synthetic_evaluation"
  ]),
  lifecycleStatus: z.enum(["active", "rejected", "locked", "stale", "superseded"]),
  sourceIds: z.array(z.string())
});

const PositionSchema = z.object({ x: z.number(), y: z.number() });
const WireframeBlockSchema = z.object({ id: z.string(), type: z.string(), label: z.string() });
const WireframeSchema = z.object({
  kind: z.enum(["mobile", "desktop"]),
  summary: z.string(),
  blocks: z.array(WireframeBlockSchema)
});

const ActionSchema = z.object({
  id: z.string(),
  nodeId: z.string(),
  label: z.string(),
  kind: z.enum(["primary", "secondary", "recovery", "state_transition"]),
  wireframeBlockId: z.string().optional(),
  stateId: z.string().optional()
});

const NodeSchema = z.object({
  id: z.string(),
  regionId: z.string(),
  type: z.literal("page"),
  title: z.string(),
  userFacingLabel: z.string(),
  purpose: z.string(),
  userIntent: z.string(),
  primaryCTA: z.string(),
  scopeStatus: z.enum(["in_mvp", "later", "excluded"]),
  scopeVariant: z.enum(["full", "lightweight"]).optional(),
  provenance: ProvenanceSchema,
  confidence: z.enum(["low", "medium", "high"]),
  states: z.array(z.string()),
  actions: z.array(ActionSchema),
  position: PositionSchema,
  wireframe: WireframeSchema
});

const ConstraintSchema = z.discriminatedUnion("type", [
  z.object({
    id: z.string(),
    type: z.literal("required_dependency"),
    sourceNodeId: z.string(),
    targetNodeId: z.string(),
    severity: z.enum(["Blocker", "Warning", "Recommendation"]),
    rule: z.string()
  }),
  z.object({
    id: z.string(),
    type: z.literal("required_path"),
    pathNodeIds: z.array(z.string()),
    severity: z.enum(["Blocker", "Warning", "Recommendation"]),
    rule: z.string()
  }),
  z.object({
    id: z.string(),
    type: z.literal("wireframe_required"),
    severity: z.enum(["Blocker", "Warning", "Recommendation"]),
    rule: z.string()
  })
]);

export const BlueprintDocumentSchema = z.object({
  schemaVersion: z.literal("demo-1.1"),
  project: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    platform: z.literal("mobile_first"),
    demoMode: z.literal(true)
  }),
  bet: z.object({
    rawIdea: z.string(),
    targetUser: z.string(),
    situation: z.string(),
    coreJob: z.string(),
    primaryOutcome: z.string(),
    appetite: z.string(),
    constraints: z.array(z.string()),
    assumptions: z.array(
      z.object({
        id: z.string(),
        statement: z.string(),
        provenance: ProvenanceSchema,
        confidence: z.enum(["low", "medium", "high"])
      })
    )
  }),
  regions: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      position: PositionSchema.extend({ width: z.number(), height: z.number() })
    })
  ),
  nodes: z.array(NodeSchema),
  flows: z.array(
    z.object({
      id: z.string(),
      sourceNodeId: z.string(),
      targetNodeId: z.string(),
      type: z.enum(["happy", "required", "alternate", "return", "error"]),
      label: z.string(),
      sourceActionId: z.string().optional(),
      sourceStateId: z.string().optional()
    })
  ),
  constraints: z.array(ConstraintSchema),
  acceptanceCriteria: z.array(
    z.object({
      id: z.string(),
      targetType: z.enum(["node", "flow", "handoff", "demo"]),
      targetId: z.string(),
      statement: z.string(),
      status: z.literal("defined")
    })
  ),
  repairOptions: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      recommended: z.boolean(),
      patch: z
        .object({
          nodeId: z.string(),
          nodePatch: z.object({
            title: z.string().optional(),
            purpose: z.string().optional(),
            scopeStatus: z.enum(["in_mvp", "later", "excluded"]).optional(),
            scopeVariant: z.enum(["full", "lightweight"]).optional()
          }),
          wireframeBlockUpdates: z.array(
            z.object({ id: z.string(), label: z.string() })
          )
        })
        .optional()
    })
  ),
  handoff: z.object({
    expectedStatus: z.literal("ready_after_repair"),
    files: z.array(z.object({ path: z.string(), title: z.string(), preview: z.string() })),
    starterPrompt: z.string()
  }),
  defaultLensState: z.object({
    ia: z.literal(true),
    flow: z.boolean(),
    wireframe: z.boolean(),
    scope: z.boolean(),
    validation: z.boolean()
  }),
  demo: z.object({
    initialSelectedNodeId: z.string(),
    scopeConflictNodeId: z.string(),
    defaultRepairOptionId: z.string(),
    mainPathFlowIds: z.array(z.string()),
    wireframeThumbnailNodeIds: z.array(z.string()),
    recordingViewport: z.object({ width: z.number(), height: z.number() })
  })
});

const ScopeStatusSchema = z.enum(["in_mvp", "later", "excluded"]);

const ChangeOperationSchema = z.discriminatedUnion("operation", [
  z.object({
    operation: z.literal("change_scope"),
    targetId: z.string(),
    before: ScopeStatusSchema,
    after: ScopeStatusSchema,
    rationale: z.string(),
    impact: z.literal("high")
  }),
  z.object({
    operation: z.literal("apply_repair"),
    targetId: z.string(),
    repairId: z.string(),
    before: z.object({
      title: z.string(),
      scopeStatus: ScopeStatusSchema,
      scopeVariant: z.enum(["full", "lightweight"]).optional(),
      wireframeSummary: z.string()
    }),
    after: z.object({
      title: z.string(),
      scopeStatus: ScopeStatusSchema,
      scopeVariant: z.enum(["full", "lightweight"]).optional(),
      wireframeSummary: z.string()
    }),
    rationale: z.string(),
    impact: z.literal("high")
  })
]);

export const ChangeSetSchema = z.object({
  id: z.string(),
  status: z.enum(["pending", "approved", "rejected"]),
  operations: z.array(ChangeOperationSchema),
  affectedFlowIds: z.array(z.string()),
  affectedWireframeIds: z.array(z.string()),
  affectedConstraintIds: z.array(z.string()),
  validationIssueIds: z.array(z.string()),
  approvalRequired: z.literal(true)
});

export const DecisionRecordSchema = z.object({
  id: z.string(),
  changeSetId: z.string(),
  decisionType: z.literal("scope"),
  selectedOptionId: z.string(),
  rationale: z.string(),
  affectedIds: z.array(z.string()),
  approvedBy: z.literal("user"),
  approvedAt: z.string(),
  reversible: z.literal(true)
});

export const HandoffSnapshotSchema = BlueprintDocumentSchema.extend({
  changeSetHistory: z.array(ChangeSetSchema),
  decisionHistory: z.array(DecisionRecordSchema)
});
