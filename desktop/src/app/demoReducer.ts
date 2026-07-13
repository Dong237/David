import type {
  BlueprintDocument,
  BlueprintReadiness,
  ChangeSet,
  DecisionRecord,
  LensState,
  ValidationIssue
} from "../domain/blueprint";
import { createInitialBlueprint } from "../domain/fixtureNormalizer";
import { deriveReadiness } from "../domain/readiness";
import {
  applyRepairOption,
  createRepairChangeSet,
  createScopeChangeSet,
  projectChangeSet,
  validateBlueprint
} from "../domain/validators";

export type DemoPhase =
  | "INTAKE_DRAFT"
  | "INTAKE_QUESTION"
  | "CONTEXT_READY"
  | "BLUEPRINT_READY"
  | "NODE_EXPANDED"
  | "SCOPE_CONFLICT"
  | "REPAIR_APPROVED"
  | "HANDOFF_READY";

export type DemoRoute = "intake" | "blueprint" | "handoff";

export interface ProductContextView {
  targetUser: string;
  situation: string;
  coreJob: string;
  primaryOutcome: string;
  productType: string;
  appetite: string;
  assumptions: string[];
}

export interface DemoState {
  route: DemoRoute;
  phase: DemoPhase;
  blueprint: BlueprintDocument;
  ideaDraft: string;
  ideaSubmitted: boolean;
  ideaError?: string;
  demoModeNotice: boolean;
  intakeChoice?: "plan" | "daily_session";
  productContext: ProductContextView;
  selectedNodeId: string;
  expandedNodeId?: string;
  lenses: LensState;
  pendingChangeSet?: ChangeSet;
  changeSetHistory: ChangeSet[];
  validationIssues: ValidationIssue[];
  readiness: BlueprintReadiness;
  decisionRecords: DecisionRecord[];
  selectedHandoffPath: string;
  toast?: string;
}

export type DemoAction =
  | { type: "SET_IDEA"; value: string }
  | { type: "SUBMIT_IDEA" }
  | { type: "ANSWER_INTAKE"; choice: "plan" | "daily_session" }
  | { type: "GENERATE_BLUEPRINT" }
  | { type: "SELECT_NODE"; nodeId: string }
  | { type: "TOGGLE_LENS"; lens: "flow" | "wireframe" | "scope" | "validation" }
  | { type: "PROPOSE_SCOPE_LATER"; nodeId: string }
  | { type: "APPLY_REPAIR"; repairId: string }
  | { type: "OPEN_HANDOFF" }
  | { type: "SELECT_HANDOFF_FILE"; path: string }
  | { type: "BACK_TO_BLUEPRINT" }
  | { type: "SHOW_TOAST"; message: string }
  | { type: "DISMISS_TOAST" }
  | { type: "RESET" };

const emptyProductContext: ProductContextView = {
  targetUser: "Waiting for your idea",
  situation: "Not framed yet",
  coreJob: "Not framed yet",
  primaryOutcome: "Choose what V1 should prove",
  productType: "Product hypothesis",
  appetite: "Competition demo",
  assumptions: ["No scope decisions yet"]
};

function contextForChoice(
  blueprint: BlueprintDocument,
  choice: "plan" | "daily_session"
): ProductContextView {
  return {
    targetUser: blueprint.bet.targetUser,
    situation: "Has a deadline but struggles with daily consistency",
    coreJob: blueprint.bet.coreJob,
    primaryOutcome:
      choice === "daily_session"
        ? blueprint.bet.primaryOutcome.replace(/\.$/, "")
        : "Turn one exam goal into a useful first study plan",
    productType: "Mobile-first learning companion",
    appetite: "Demo MVP",
    assumptions: ["One learner role", "No social features", "No tutor marketplace"]
  };
}

function isStudyCoachIdea(value: string): boolean {
  const normalized = value.toLowerCase();
  return ["ai", "study", "coach", "exam"].every((term) => normalized.includes(term));
}

export function getVisibleBlueprint(state: DemoState): BlueprintDocument {
  return state.pendingChangeSet
    ? projectChangeSet(state.blueprint, state.pendingChangeSet)
    : state.blueprint;
}

export function createInitialDemoState(overrides: Partial<DemoState> = {}): DemoState {
  const blueprint = createInitialBlueprint();
  const validationIssues = validateBlueprint(blueprint);
  const base: DemoState = {
    route: "intake",
    phase: "INTAKE_DRAFT",
    blueprint,
    ideaDraft: blueprint.bet.rawIdea,
    ideaSubmitted: false,
    demoModeNotice: false,
    productContext: emptyProductContext,
    selectedNodeId: blueprint.demo.initialSelectedNodeId,
    lenses: { ...blueprint.defaultLensState },
    validationIssues,
    readiness: deriveReadiness(blueprint, validationIssues),
    changeSetHistory: [],
    decisionRecords: [],
    selectedHandoffPath: "handoff/START_HERE.md"
  };
  return { ...base, ...overrides };
}

export function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case "SET_IDEA":
      return { ...state, ideaDraft: action.value, ideaError: undefined };

    case "SUBMIT_IDEA": {
      if (!state.ideaDraft.trim()) {
        return { ...state, ideaError: "Add a product idea before continuing." };
      }
      return {
        ...state,
        phase: "INTAKE_QUESTION",
        ideaSubmitted: true,
        ideaError: undefined,
        demoModeNotice: !isStudyCoachIdea(state.ideaDraft)
      };
    }

    case "ANSWER_INTAKE": {
      const blueprint = createInitialBlueprint();
      const primaryOutcome =
        action.choice === "daily_session"
          ? blueprint.bet.primaryOutcome
          : "Turn one exam goal into a useful first study plan.";
      const selectedNodeId =
        action.choice === "daily_session" ? "node_daily_session" : "node_study_plan";
      return {
        ...state,
        phase: "CONTEXT_READY",
        intakeChoice: action.choice,
        blueprint: {
          ...blueprint,
          bet: { ...blueprint.bet, primaryOutcome },
          demo: { ...blueprint.demo, initialSelectedNodeId: selectedNodeId }
        },
        selectedNodeId,
        productContext: contextForChoice(blueprint, action.choice)
      };
    }

    case "GENERATE_BLUEPRINT":
      if (state.phase !== "CONTEXT_READY") return state;
      return {
        ...state,
        route: "blueprint",
        phase: "BLUEPRINT_READY",
        expandedNodeId: undefined,
        toast: undefined
      };

    case "SELECT_NODE": {
      const expand =
        action.nodeId === "node_daily_session" &&
        state.lenses.wireframe &&
        state.expandedNodeId !== action.nodeId;
      return {
        ...state,
        selectedNodeId: action.nodeId,
        expandedNodeId: expand ? action.nodeId : undefined,
        phase: expand ? "NODE_EXPANDED" : state.pendingChangeSet ? "SCOPE_CONFLICT" : "BLUEPRINT_READY"
      };
    }

    case "TOGGLE_LENS": {
      if (action.lens === "validation" && state.pendingChangeSet) return state;
      const nextEnabled = !state.lenses[action.lens];
      const collapseWireframe = action.lens === "wireframe" && !nextEnabled;
      return {
        ...state,
        lenses: { ...state.lenses, [action.lens]: nextEnabled },
        expandedNodeId: collapseWireframe ? undefined : state.expandedNodeId,
        phase: collapseWireframe
          ? state.pendingChangeSet
            ? "SCOPE_CONFLICT"
            : state.decisionRecords.length > 0
              ? "REPAIR_APPROVED"
              : "BLUEPRINT_READY"
          : state.phase
      };
    }

    case "PROPOSE_SCOPE_LATER": {
      const pendingChangeSet = createScopeChangeSet(state.blueprint, action.nodeId, "later");
      const projected = projectChangeSet(state.blueprint, pendingChangeSet);
      const validationIssues = validateBlueprint(projected, pendingChangeSet);
      return {
        ...state,
        route: "blueprint",
        phase: "SCOPE_CONFLICT",
        selectedNodeId: action.nodeId,
        expandedNodeId: undefined,
        pendingChangeSet,
        validationIssues,
        readiness: deriveReadiness(
          projected,
          validationIssues,
          state.decisionRecords,
          state.changeSetHistory
        ),
        lenses: { ...state.lenses, validation: true }
      };
    }

    case "APPLY_REPAIR": {
      const repair = state.blueprint.repairOptions.find((option) => option.id === action.repairId);
      if (!repair?.patch || !state.pendingChangeSet) return state;
      const matchingIssue = state.validationIssues.find(
        (issue) =>
          issue.rootCauseTargetId === repair.patch?.nodeId &&
          issue.repairOptionIds.includes(repair.id)
      );
      if (!matchingIssue) return state;
      const blueprint = applyRepairOption(state.blueprint, repair);
      const validationIssues = validateBlueprint(blueprint);
      if (validationIssues.some((issue) => issue.severity === "Blocker")) {
        return {
          ...state,
          toast: "Repair rejected. The proposed Blueprint still has a blocker."
        };
      }
      const approvedChangeSet = createRepairChangeSet(
        state.blueprint,
        state.pendingChangeSet,
        repair
      );
      const decisionRecord: DecisionRecord = {
        id: "decision_lightweight_diagnostic",
        changeSetId: approvedChangeSet.id,
        decisionType: "scope",
        selectedOptionId: repair.id,
        rationale: repair.description,
        affectedIds: [
          repair.patch.nodeId,
          ...state.pendingChangeSet.affectedFlowIds,
          ...state.pendingChangeSet.affectedConstraintIds
        ],
        approvedBy: "user",
        approvedAt: "demo-session",
        reversible: true
      };
      const changeSetHistory = [
        ...state.changeSetHistory,
        { ...state.pendingChangeSet, status: "rejected" as const },
        approvedChangeSet
      ];
      const decisionRecords = [...state.decisionRecords, decisionRecord];
      return {
        ...state,
        phase: "REPAIR_APPROVED",
        blueprint,
        pendingChangeSet: undefined,
        changeSetHistory,
        validationIssues,
        readiness: deriveReadiness(
          blueprint,
          validationIssues,
          decisionRecords,
          changeSetHistory
        ),
        decisionRecords,
        toast: "Decision applied. Core path restored."
      };
    }

    case "OPEN_HANDOFF":
      if (!state.readiness.ready) return state;
      return { ...state, route: "handoff", phase: "HANDOFF_READY", toast: undefined };

    case "SELECT_HANDOFF_FILE":
      return { ...state, selectedHandoffPath: action.path };

    case "BACK_TO_BLUEPRINT":
      return {
        ...state,
        route: "blueprint",
        phase: state.decisionRecords.length > 0 ? "REPAIR_APPROVED" : "BLUEPRINT_READY",
        toast: undefined
      };

    case "SHOW_TOAST":
      return { ...state, toast: action.message };

    case "DISMISS_TOAST":
      return { ...state, toast: undefined };

    case "RESET":
      return createInitialDemoState();
  }
}
