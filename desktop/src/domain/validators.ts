import type {
  BlueprintDocument,
  ChangeSet,
  RepairOption,
  ScopeStatus,
  Severity,
  ValidationIssue
} from "./blueprint";
import { BlueprintDocumentSchema } from "./blueprint.schema";

interface RuleFailure {
  rootCauseTargetId: string;
  ruleId: string;
  severity: Severity;
  message: string;
  affectedNodeIds: string[];
  affectedFlowIds: string[];
}

export function createScopeChangeSet(
  blueprint: BlueprintDocument,
  nodeId: string,
  nextScope: ScopeStatus
): ChangeSet {
  const node = blueprint.nodes.find((candidate) => candidate.id === nodeId);
  if (!node) throw new Error(`Unknown node: ${nodeId}`);

  const affectedConstraintIds = blueprint.constraints
    .filter((constraint) => {
      if (constraint.type === "required_dependency") {
        return constraint.sourceNodeId === nodeId || constraint.targetNodeId === nodeId;
      }
      if (constraint.type === "required_path") return constraint.pathNodeIds.includes(nodeId);
      return false;
    })
    .map((constraint) => constraint.id);

  const affectedFlowIds = blueprint.flows
    .filter((flow) => flow.sourceNodeId === nodeId || flow.targetNodeId === nodeId)
    .map((flow) => flow.id);

  return {
    id: `changeset_scope_${nodeId}_${nextScope}`,
    status: "pending",
    operations: [
      {
        operation: "change_scope",
        targetId: nodeId,
        before: node.scopeStatus,
        after: nextScope,
        rationale: "Test whether the MVP remains coherent without this product decision.",
        impact: "high"
      }
    ],
    affectedFlowIds,
    affectedWireframeIds: node.wireframe.blocks.map((block) => block.id),
    affectedConstraintIds,
    validationIssueIds: [`issue_scope_${nodeId}`],
    approvalRequired: true
  };
}

export function projectChangeSet(
  blueprint: BlueprintDocument,
  changeSet: ChangeSet
): BlueprintDocument {
  const operationByTarget = new Map(
    changeSet.operations.map((operation) => [operation.targetId, operation])
  );

  return {
    ...blueprint,
    nodes: blueprint.nodes.map((node) => {
      const operation = operationByTarget.get(node.id);
      return operation?.operation === "change_scope"
        ? { ...node, scopeStatus: operation.after }
        : node;
    })
  };
}

export function createRepairChangeSet(
  blueprint: BlueprintDocument,
  proposal: ChangeSet,
  repair: RepairOption
): ChangeSet {
  if (!repair.patch) throw new Error(`Repair ${repair.id} is not executable in demo mode.`);
  const node = blueprint.nodes.find((candidate) => candidate.id === repair.patch?.nodeId);
  const proposalTargets = new Set(proposal.operations.map((operation) => operation.targetId));
  if (!node || !proposalTargets.has(node.id)) {
    throw new Error(`Repair ${repair.id} does not resolve the active ChangeSet.`);
  }
  const repaired = applyRepairOption(blueprint, repair).nodes.find(
    (candidate) => candidate.id === node.id
  );
  if (!repaired) throw new Error(`Repair ${repair.id} produced no canonical node.`);

  return {
    id: `changeset_repair_${repair.id}`,
    status: "approved",
    operations: [
      {
        operation: "apply_repair",
        targetId: node.id,
        repairId: repair.id,
        before: {
          title: node.title,
          scopeStatus: node.scopeStatus,
          scopeVariant: node.scopeVariant,
          wireframeSummary: node.wireframe.summary
        },
        after: {
          title: repaired.title,
          scopeStatus: repaired.scopeStatus,
          scopeVariant: repaired.scopeVariant,
          wireframeSummary: repaired.wireframe.summary
        },
        rationale: repair.description,
        impact: "high"
      }
    ],
    affectedFlowIds: [...proposal.affectedFlowIds],
    affectedWireframeIds: repair.patch.wireframeBlockUpdates.map((update) => update.id),
    affectedConstraintIds: [...proposal.affectedConstraintIds],
    validationIssueIds: [...proposal.validationIssueIds],
    approvalRequired: true
  };
}

export function applyRepairOption(
  blueprint: BlueprintDocument,
  repair: RepairOption
): BlueprintDocument {
  if (!repair.patch) throw new Error(`Repair ${repair.id} is not executable in demo mode.`);

  return {
    ...blueprint,
    nodes: blueprint.nodes.map((node) => {
      if (node.id !== repair.patch?.nodeId) return node;
      const wireframeUpdates = new Map(
        repair.patch.wireframeBlockUpdates.map((update) => [update.id, update.label])
      );
      return {
        ...node,
        ...repair.patch.nodePatch,
        wireframe: {
          ...node.wireframe,
          summary: "Three high-signal questions, answer choices, progress",
          blocks: node.wireframe.blocks.map((wireframeBlock) => ({
            ...wireframeBlock,
            label: wireframeUpdates.get(wireframeBlock.id) ?? wireframeBlock.label
          }))
        }
      };
    })
  };
}

function dependencyFailures(blueprint: BlueprintDocument): RuleFailure[] {
  const nodes = new Map(blueprint.nodes.map((node) => [node.id, node]));
  const failures: RuleFailure[] = [];

  for (const constraint of blueprint.constraints) {
    if (constraint.type === "required_dependency") {
      const source = nodes.get(constraint.sourceNodeId);
      const target = nodes.get(constraint.targetNodeId);
      if (source?.scopeStatus !== "in_mvp" && target?.scopeStatus === "in_mvp") {
        const affectedFlow = blueprint.flows.find(
          (flow) =>
            flow.sourceNodeId === constraint.sourceNodeId &&
            flow.targetNodeId === constraint.targetNodeId
        );
        failures.push({
          rootCauseTargetId: constraint.sourceNodeId,
          ruleId: constraint.id,
          severity: constraint.severity,
          message: constraint.rule,
          affectedNodeIds: [constraint.sourceNodeId, constraint.targetNodeId],
          affectedFlowIds: affectedFlow ? [affectedFlow.id] : []
        });
      }
    }

    if (constraint.type === "required_path") {
      const missingNodeId = constraint.pathNodeIds.find(
        (nodeId) => nodes.get(nodeId)?.scopeStatus !== "in_mvp"
      );
      if (missingNodeId) {
        const missingIndex = constraint.pathNodeIds.indexOf(missingNodeId);
        const nextNodeId = constraint.pathNodeIds[missingIndex + 1];
        const affectedFlow = blueprint.flows.find(
          (flow) => flow.sourceNodeId === missingNodeId && flow.targetNodeId === nextNodeId
        );
        failures.push({
          rootCauseTargetId: missingNodeId,
          ruleId: constraint.id,
          severity: constraint.severity,
          message: constraint.rule,
          affectedNodeIds: [...constraint.pathNodeIds],
          affectedFlowIds: affectedFlow ? [affectedFlow.id] : []
        });
      }
    }

    if (constraint.type === "wireframe_required") {
      for (const node of blueprint.nodes) {
        if (node.scopeStatus === "in_mvp" && node.wireframe.blocks.length === 0) {
          failures.push({
            rootCauseTargetId: node.id,
            ruleId: constraint.id,
            severity: constraint.severity,
            message: constraint.rule,
            affectedNodeIds: [node.id],
            affectedFlowIds: []
          });
        }
      }
    }
  }

  return failures;
}

export function validateReferences(blueprint: BlueprintDocument): boolean {
  if (!BlueprintDocumentSchema.safeParse(blueprint).success) return false;
  const regionIds = new Set(blueprint.regions.map((region) => region.id));
  const nodes = new Map(blueprint.nodes.map((node) => [node.id, node]));
  const flowIds = new Set(blueprint.flows.map((flow) => flow.id));
  const repairIds = new Set(blueprint.repairOptions.map((repair) => repair.id));
  const handoffPaths = new Set(blueprint.handoff.files.map((file) => file.path));
  const actionIds = blueprint.nodes.flatMap((node) => node.actions.map((action) => action.id));
  const actionOwner = new Map(
    blueprint.nodes.flatMap((node) => node.actions.map((action) => [action.id, node.id] as const))
  );

  const unique = (values: string[]) => new Set(values).size === values.length;
  if (!unique(blueprint.regions.map((region) => region.id))) return false;
  if (!unique(blueprint.nodes.map((node) => node.id))) return false;
  if (!unique(blueprint.flows.map((flow) => flow.id))) return false;
  if (!unique(blueprint.constraints.map((constraint) => constraint.id))) return false;
  if (!unique(blueprint.acceptanceCriteria.map((criterion) => criterion.id))) return false;
  if (!unique(blueprint.repairOptions.map((repair) => repair.id))) return false;
  if (!unique(blueprint.handoff.files.map((file) => file.path))) return false;
  if (!unique(actionIds)) return false;
  if (!unique(blueprint.nodes.flatMap((node) => node.wireframe.blocks.map((block) => block.id)))) {
    return false;
  }
  if (!blueprint.nodes.every((node) => regionIds.has(node.regionId))) return false;

  for (const node of blueprint.nodes) {
    const blockIds = new Set(node.wireframe.blocks.map((block) => block.id));
    if (!unique(node.wireframe.blocks.map((block) => block.id))) return false;
    for (const action of node.actions) {
      if (action.nodeId !== node.id) return false;
      if (action.wireframeBlockId && !blockIds.has(action.wireframeBlockId)) return false;
      if (action.stateId && !node.states.includes(action.stateId)) return false;
    }
  }

  for (const constraint of blueprint.constraints) {
    if (constraint.type === "required_dependency") {
      if (!nodes.has(constraint.sourceNodeId) || !nodes.has(constraint.targetNodeId)) return false;
    }
    if (
      constraint.type === "required_path" &&
      !constraint.pathNodeIds.every((nodeId) => nodes.has(nodeId))
    ) {
      return false;
    }
    if (constraint.type === "required_path") {
      for (let index = 0; index < constraint.pathNodeIds.length - 1; index += 1) {
        const sourceNodeId = constraint.pathNodeIds[index];
        const targetNodeId = constraint.pathNodeIds[index + 1];
        if (
          !blueprint.flows.some(
            (flow) =>
              flow.sourceNodeId === sourceNodeId && flow.targetNodeId === targetNodeId
          )
        ) {
          return false;
        }
      }
    }
  }

  for (const criterion of blueprint.acceptanceCriteria) {
    if (criterion.targetType === "node" && !nodes.has(criterion.targetId)) return false;
    if (criterion.targetType === "flow" && !flowIds.has(criterion.targetId)) return false;
    if (criterion.targetType === "handoff" && !handoffPaths.has(criterion.targetId)) return false;
    if (
      criterion.targetType === "demo" &&
      criterion.targetId !== blueprint.project.id &&
      criterion.targetId !== "demo"
    ) {
      return false;
    }
  }

  for (const repair of blueprint.repairOptions) {
    if (!repair.patch) continue;
    const node = nodes.get(repair.patch.nodeId);
    if (!node) return false;
    const blockIds = new Set(node.wireframe.blocks.map((block) => block.id));
    if (!repair.patch.wireframeBlockUpdates.every((update) => blockIds.has(update.id))) return false;
  }

  if (!nodes.has(blueprint.demo.initialSelectedNodeId)) return false;
  if (!nodes.has(blueprint.demo.scopeConflictNodeId)) return false;
  if (!repairIds.has(blueprint.demo.defaultRepairOptionId)) return false;
  if (!blueprint.demo.mainPathFlowIds.every((flowId) => flowIds.has(flowId))) return false;
  if (!blueprint.demo.wireframeThumbnailNodeIds.every((nodeId) => nodes.has(nodeId))) return false;

  return blueprint.flows.every((flow) => {
    if (!nodes.has(flow.sourceNodeId) || !nodes.has(flow.targetNodeId)) return false;
    if (!flow.sourceActionId && !flow.sourceStateId) return false;
    if (flow.sourceActionId && actionOwner.get(flow.sourceActionId) !== flow.sourceNodeId) {
      return false;
    }
    if (
      flow.sourceStateId &&
      !nodes.get(flow.sourceNodeId)?.states.includes(flow.sourceStateId)
    ) {
      return false;
    }
    return true;
  });
}

export function validateBlueprint(
  blueprint: BlueprintDocument,
  _changeSet?: ChangeSet
): ValidationIssue[] {
  void _changeSet;
  const failures = dependencyFailures(blueprint);

  if (!validateReferences(blueprint)) {
    failures.push({
      rootCauseTargetId: blueprint.project.id,
      ruleId: "runtime_referential_integrity",
      severity: "Blocker",
      message: "A Blueprint reference does not resolve to its canonical owner.",
      affectedNodeIds: [],
      affectedFlowIds: []
    });
  }

  const grouped = new Map<string, RuleFailure[]>();
  for (const failure of failures) {
    const existing = grouped.get(failure.rootCauseTargetId) ?? [];
    existing.push(failure);
    grouped.set(failure.rootCauseTargetId, existing);
  }

  return [...grouped.entries()].map(([rootCauseTargetId, group]) => {
    const diagnosticConflict = rootCauseTargetId === "node_diagnostic";
    return {
      id: `issue_scope_${rootCauseTargetId}`,
      severity: group.some((failure) => failure.severity === "Blocker") ? "Blocker" : group[0].severity,
      rootCauseTargetId,
      ruleIds: group.map((failure) => failure.ruleId),
      title: diagnosticConflict ? "Core path broken" : "Blueprint constraint failed",
      message: diagnosticConflict
        ? "Study Plan requires learner-level input from Diagnostic Quiz. Moving it out of MVP makes personalized plan generation impossible."
        : group.map((failure) => failure.message).join(" "),
      affectedNodeIds: [...new Set(group.flatMap((failure) => failure.affectedNodeIds))],
      affectedFlowIds: [...new Set(group.flatMap((failure) => failure.affectedFlowIds))],
      repairOptionIds: diagnosticConflict
        ? blueprint.repairOptions.map((option) => option.id)
        : []
    };
  });
}
