export type KnowledgeStatus = "confirmed" | "inferred" | "unknown" | "conflicting";
export type BasisType =
  | "user_input"
  | "source_evidence"
  | "pattern"
  | "model_inference"
  | "synthetic_evaluation";
export type LifecycleStatus = "active" | "rejected" | "locked" | "stale" | "superseded";
export type Confidence = "low" | "medium" | "high";
export type Severity = "Blocker" | "Warning" | "Recommendation";
export type ScopeStatus = "in_mvp" | "later" | "excluded";

export interface ProvenanceCore {
  knowledgeStatus: KnowledgeStatus;
  basisType: BasisType;
  lifecycleStatus: LifecycleStatus;
  sourceIds: string[];
}

export interface Position {
  x: number;
  y: number;
}

export interface RegionPosition extends Position {
  width: number;
  height: number;
}

export interface ProductBet {
  rawIdea: string;
  targetUser: string;
  situation: string;
  coreJob: string;
  primaryOutcome: string;
  appetite: string;
  constraints: string[];
  assumptions: Array<{
    id: string;
    statement: string;
    provenance: ProvenanceCore;
    confidence: Confidence;
  }>;
}

export interface ProductRegion {
  id: string;
  title: string;
  description: string;
  position: RegionPosition;
}

export interface WireframeBlock {
  id: string;
  type: string;
  label: string;
}

export interface NodeWireframe {
  kind: "mobile" | "desktop";
  summary: string;
  blocks: WireframeBlock[];
}

export interface BlueprintAction {
  id: string;
  nodeId: string;
  label: string;
  kind: "primary" | "secondary" | "recovery" | "state_transition";
  wireframeBlockId?: string;
  stateId?: string;
}

export interface BlueprintNode {
  id: string;
  regionId: string;
  type: "page";
  title: string;
  userFacingLabel: string;
  purpose: string;
  userIntent: string;
  primaryCTA: string;
  scopeStatus: ScopeStatus;
  scopeVariant?: "full" | "lightweight";
  provenance: ProvenanceCore;
  confidence: Confidence;
  states: string[];
  actions: BlueprintAction[];
  position: Position;
  wireframe: NodeWireframe;
}

export interface FlowEdge {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  type: "happy" | "required" | "alternate" | "return" | "error";
  label: string;
  sourceActionId?: string;
  sourceStateId?: string;
}

export type BlueprintConstraint =
  | {
      id: string;
      type: "required_dependency";
      sourceNodeId: string;
      targetNodeId: string;
      severity: Severity;
      rule: string;
    }
  | {
      id: string;
      type: "required_path";
      pathNodeIds: string[];
      severity: Severity;
      rule: string;
    }
  | {
      id: string;
      type: "wireframe_required";
      severity: Severity;
      rule: string;
    };

export interface AcceptanceCriterion {
  id: string;
  targetType: "node" | "flow" | "handoff" | "demo";
  targetId: string;
  statement: string;
  status: "defined";
}

export interface RepairPatch {
  nodeId: string;
  nodePatch: Partial<Pick<BlueprintNode, "title" | "purpose" | "scopeStatus" | "scopeVariant">>;
  wireframeBlockUpdates: Array<Pick<WireframeBlock, "id" | "label">>;
}

export interface RepairOption {
  id: string;
  title: string;
  description: string;
  recommended: boolean;
  patch?: RepairPatch;
}

export interface HandoffFileSource {
  path: string;
  title: string;
  preview: string;
}

export interface HandoffSource {
  expectedStatus: "ready_after_repair";
  files: HandoffFileSource[];
  starterPrompt: string;
}

export interface LensState {
  ia: true;
  flow: boolean;
  wireframe: boolean;
  scope: boolean;
  validation: boolean;
}

export interface DemoProjectionConfig {
  initialSelectedNodeId: string;
  scopeConflictNodeId: string;
  defaultRepairOptionId: string;
  mainPathFlowIds: string[];
  wireframeThumbnailNodeIds: string[];
  recordingViewport: { width: number; height: number };
}

export interface BlueprintDocument {
  schemaVersion: "demo-1.1";
  project: {
    id: string;
    name: string;
    description: string;
    platform: "mobile_first";
    demoMode: true;
  };
  bet: ProductBet;
  regions: ProductRegion[];
  nodes: BlueprintNode[];
  flows: FlowEdge[];
  constraints: BlueprintConstraint[];
  acceptanceCriteria: AcceptanceCriterion[];
  repairOptions: RepairOption[];
  handoff: HandoffSource;
  defaultLensState: LensState;
  demo: DemoProjectionConfig;
}

export interface ScopeChangeOperation {
  operation: "change_scope";
  targetId: string;
  before: ScopeStatus;
  after: ScopeStatus;
  rationale: string;
  impact: "high";
}

export interface RepairChangeOperation {
  operation: "apply_repair";
  targetId: string;
  repairId: string;
  before: {
    title: string;
    scopeStatus: ScopeStatus;
    scopeVariant?: "full" | "lightweight";
    wireframeSummary: string;
  };
  after: {
    title: string;
    scopeStatus: ScopeStatus;
    scopeVariant?: "full" | "lightweight";
    wireframeSummary: string;
  };
  rationale: string;
  impact: "high";
}

export type ChangeOperation = ScopeChangeOperation | RepairChangeOperation;

export interface ChangeSet {
  id: string;
  status: "pending" | "approved" | "rejected";
  operations: ChangeOperation[];
  affectedFlowIds: string[];
  affectedWireframeIds: string[];
  affectedConstraintIds: string[];
  validationIssueIds: string[];
  approvalRequired: true;
}

export interface ValidationIssue {
  id: string;
  severity: Severity;
  rootCauseTargetId: string;
  ruleIds: string[];
  title: string;
  message: string;
  affectedNodeIds: string[];
  affectedFlowIds: string[];
  repairOptionIds: string[];
}

export interface BlueprintReadiness {
  ready: boolean;
  blockers: number;
  referencesValid: boolean;
  wireframesCovered: boolean;
  acceptanceCriteriaCovered: boolean;
  handoffValid: boolean;
}

export interface DecisionRecord {
  id: string;
  changeSetId: string;
  decisionType: "scope";
  selectedOptionId: string;
  rationale: string;
  affectedIds: string[];
  approvedBy: "user";
  approvedAt: string;
  reversible: true;
}

export interface CompiledHandoffFile extends HandoffFileSource {
  sourceNodeId?: string;
  sourceFlowIds?: string[];
}

export interface CompiledHandoff {
  files: CompiledHandoffFile[];
  starterPrompt: string;
}
