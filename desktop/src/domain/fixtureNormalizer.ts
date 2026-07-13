import { BlueprintDocumentSchema } from "./blueprint.schema";
import type {
  BasisType,
  BlueprintAction,
  BlueprintDocument,
  KnowledgeStatus,
  ProvenanceCore,
  RepairOption,
  ScopeStatus,
  Severity
} from "./blueprint";
import { legacyStudyCoachFixture } from "../fixtures/ai-study-coach.blueprint";

type LegacyProvenance = "confirmed" | "inferred" | "pattern_based";

const provenanceMap: Record<LegacyProvenance, { knowledgeStatus: KnowledgeStatus; basisType: BasisType }> = {
  confirmed: { knowledgeStatus: "confirmed", basisType: "user_input" },
  inferred: { knowledgeStatus: "inferred", basisType: "model_inference" },
  pattern_based: { knowledgeStatus: "inferred", basisType: "pattern" }
};

function normalizeProvenance(value: string, sourceId: string): ProvenanceCore {
  const mapped = provenanceMap[value as LegacyProvenance] ?? {
    knowledgeStatus: "unknown" as const,
    basisType: "model_inference" as const
  };

  return {
    ...mapped,
    lifecycleStatus: "active",
    sourceIds: [sourceId]
  };
}

function normalizeSeverity(value: string): Severity {
  if (value === "blocker") return "Blocker";
  if (value === "warning") return "Warning";
  return "Recommendation";
}

type ActionSeed = Omit<BlueprintAction, "nodeId">;

const actionsByNode: Record<string, ActionSeed[]> = {
  node_welcome: [
    {
      id: "action_welcome_set_goal",
      label: "Set my exam goal",
      kind: "primary",
      wireframeBlockId: "wf_welcome_cta"
    }
  ],
  node_goal_setup: [
    {
      id: "action_goal_continue",
      label: "Continue",
      kind: "primary",
      wireframeBlockId: "wf_goal_cta"
    }
  ],
  node_diagnostic: [
    {
      id: "action_diagnostic_finish",
      label: "Finish diagnostic",
      kind: "primary",
      wireframeBlockId: "wf_diag_cta",
      stateId: "complete"
    }
  ],
  node_study_plan: [
    {
      id: "action_plan_start_today",
      label: "Start today",
      kind: "primary",
      wireframeBlockId: "wf_plan_cta"
    }
  ],
  node_today: [
    {
      id: "action_today_start_session",
      label: "Start session",
      kind: "primary",
      wireframeBlockId: "wf_today_cta"
    }
  ],
  node_daily_session: [
    {
      id: "action_session_submit_answer",
      label: "Submit answer",
      kind: "primary",
      wireframeBlockId: "wf_session_cta",
      stateId: "feedback"
    },
    {
      id: "action_session_complete",
      label: "Complete session",
      kind: "state_transition",
      wireframeBlockId: "wf_session_complete",
      stateId: "complete"
    },
    {
      id: "action_session_retry",
      label: "Retry failed answer submission",
      kind: "recovery",
      wireframeBlockId: "wf_session_retry",
      stateId: "error"
    }
  ],
  node_session_recap: [
    {
      id: "action_recap_view_progress",
      label: "View progress",
      kind: "secondary",
      wireframeBlockId: "wf_recap_progress"
    },
    {
      id: "action_recap_finish_today",
      label: "Finish for today",
      kind: "primary",
      wireframeBlockId: "wf_recap_cta"
    }
  ],
  node_progress: [
    {
      id: "action_progress_review",
      label: "Review weak topics",
      kind: "primary",
      wireframeBlockId: "wf_progress_cta"
    }
  ],
  node_settings: [
    {
      id: "action_settings_save",
      label: "Save changes",
      kind: "primary",
      wireframeBlockId: "wf_settings_cta",
      stateId: "saved"
    }
  ]
};

export function createInitialBlueprint(): BlueprintDocument {
  const source = legacyStudyCoachFixture;

  const nodes = source.nodes.map((node) => ({
    id: node.id,
    regionId: node.regionId,
    type: "page" as const,
    title: node.title,
    userFacingLabel: node.userFacingLabel,
    purpose: node.purpose,
    userIntent: node.userIntent,
    primaryCTA: node.primaryCTA,
    scopeStatus: node.scopeStatus as ScopeStatus,
    ...(node.id === "node_diagnostic"
      ? { scopeVariant: ("scopeVariant" in node ? node.scopeVariant : "full") as "full" }
      : {}),
    provenance: normalizeProvenance(node.provenance, `fixture:${node.id}`),
    confidence: node.confidence as "low" | "medium" | "high",
    states: [...node.states],
    actions: (actionsByNode[node.id] ?? []).map((action) => ({ ...action, nodeId: node.id })),
    position: { ...node.position },
    wireframe: {
      kind: node.wireframe.kind,
      summary: node.wireframe.summary,
      blocks: node.wireframe.blocks.map((wireframeBlock) => ({ ...wireframeBlock }))
    }
  }));

  const flows = source.flows.map(([id, sourceNodeId, targetNodeId, type, label, sourceActionId]) => ({
    id,
    sourceNodeId,
    targetNodeId,
    type: type as "happy" | "required" | "alternate" | "return" | "error",
    label,
    sourceActionId
  }));

  const constraints = source.constraints.map((constraint) => {
    if (constraint.type === "required_dependency") {
      return {
        id: constraint.id,
        type: constraint.type,
        sourceNodeId: constraint.sourceNodeId,
        targetNodeId: constraint.targetNodeId,
        severity: normalizeSeverity(constraint.severity),
        rule: constraint.rule
      };
    }
    if (constraint.type === "required_path") {
      return {
        id: constraint.id,
        type: constraint.type,
        pathNodeIds: [...constraint.pathNodeIds],
        severity: normalizeSeverity(constraint.severity),
        rule: constraint.rule
      };
    }
    return {
      id: constraint.id,
      type: constraint.type,
      severity: normalizeSeverity(constraint.severity),
      rule: constraint.rule
    };
  });

  const acceptanceCriteria = [
    ...nodes
      .filter((node) => node.scopeStatus === "in_mvp")
      .map((node) => ({
        id: `ac_${node.id}`,
        targetType: "node" as const,
        targetId: node.id,
        statement: `${node.title} exposes its purpose, primary action, states, and low-fi structure.`,
        status: "defined" as const
      })),
    ...flows
      .filter((flow) => flow.type === "required")
      .map((flow) => ({
        id: `ac_${flow.id}`,
        targetType: "flow" as const,
        targetId: flow.id,
        statement: `${flow.label} preserves the required product path.`,
        status: "defined" as const
      }))
  ];

  const blueprint: BlueprintDocument = {
    schemaVersion: "demo-1.1",
    project: { ...source.project },
    bet: {
      ...source.bet,
      constraints: [...source.bet.constraints],
      assumptions: source.bet.assumptions.map((assumption) => ({
        id: assumption.id,
        statement: assumption.statement,
        provenance: normalizeProvenance(assumption.status, `fixture:${assumption.id}`),
        confidence: assumption.confidence as "low" | "medium" | "high"
      }))
    },
    regions: source.regions.map((region) => ({ ...region, position: { ...region.position } })),
    nodes,
    flows,
    constraints,
    acceptanceCriteria,
    repairOptions: source.repairOptions.map((option): RepairOption => {
      const base = {
        id: option.id,
        title: option.title,
        description: option.description,
        recommended: option.recommended
      };
      if (!("patch" in option) || !option.patch) return base;
      return {
        ...base,
        patch: {
          nodeId: option.patch.nodeId,
          nodePatch: {
            title: option.patch.nodePatch.title,
            purpose: option.patch.nodePatch.purpose,
            scopeStatus: option.patch.nodePatch.scopeStatus as ScopeStatus,
            scopeVariant: option.patch.nodePatch.scopeVariant as "lightweight"
          },
          wireframeBlockUpdates: option.patch.wireframeBlockUpdates.map((update) => ({ ...update }))
        }
      };
    }),
    handoff: {
      expectedStatus: source.handoff.expectedStatus,
      files: source.handoff.files.map(([path, title, preview]) => ({ path, title, preview })),
      starterPrompt: source.handoff.starterPrompt
    },
    defaultLensState: { ...source.defaultLensState },
    demo: {
      ...source.demo,
      mainPathFlowIds: [...source.demo.mainPathFlowIds],
      wireframeThumbnailNodeIds: [...source.demo.wireframeThumbnailNodeIds],
      recordingViewport: { ...source.demo.recordingViewport }
    }
  };

  return BlueprintDocumentSchema.parse(blueprint);
}
