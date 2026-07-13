import type {
  BlueprintDocument,
  BlueprintReadiness,
  ChangeSet,
  DecisionRecord,
  ValidationIssue
} from "./blueprint";
import { HandoffSnapshotSchema } from "./blueprint.schema";
import { compileHandoff } from "./handoff";
import { validateReferences } from "./validators";

const requiredHandoffPaths = [
  "handoff/START_HERE.md",
  "handoff/blueprint.json",
  "handoff/ia.md",
  "handoff/flows.md",
  "handoff/scope.md",
  "handoff/acceptance-criteria.md",
  "handoff/no-gos.md",
  "handoff/prompts/build-agent-skill.md",
  "handoff/wireframes/diagnostic.md",
  "handoff/wireframes/study-plan.md",
  "handoff/wireframes/daily-session.md"
] as const;

function validateLedger(
  blueprint: BlueprintDocument,
  decisionRecords: DecisionRecord[],
  changeSets: ChangeSet[]
): boolean {
  const unique = (values: string[]) => new Set(values).size === values.length;
  if (!unique(changeSets.map((changeSet) => changeSet.id))) return false;
  if (!unique(decisionRecords.map((decision) => decision.id))) return false;

  const changeSetById = new Map(changeSets.map((changeSet) => [changeSet.id, changeSet]));
  const approvedChangeSets = changeSets.filter((changeSet) => changeSet.status === "approved");
  if (approvedChangeSets.length !== decisionRecords.length) return false;

  for (const decision of decisionRecords) {
    const changeSet = changeSetById.get(decision.changeSetId);
    if (!changeSet || changeSet.status !== "approved") return false;
    const repair = blueprint.repairOptions.find(
      (candidate) => candidate.id === decision.selectedOptionId
    );
    const repairOperation = changeSet.operations.find(
      (operation) =>
        operation.operation === "apply_repair" &&
        operation.repairId === decision.selectedOptionId
    );
    if (!repair?.patch || repairOperation?.operation !== "apply_repair") return false;
    if (repairOperation.targetId !== repair.patch.nodeId) return false;
    const node = blueprint.nodes.find((candidate) => candidate.id === repairOperation.targetId);
    if (!node) return false;
    if (node.title !== repairOperation.after.title) return false;
    if (node.scopeStatus !== repairOperation.after.scopeStatus) return false;
    if (node.scopeVariant !== repairOperation.after.scopeVariant) return false;
    if (node.wireframe.summary !== repairOperation.after.wireframeSummary) return false;
  }

  return true;
}

function validateHandoff(
  blueprint: BlueprintDocument,
  decisionRecords: DecisionRecord[],
  changeSets: ChangeSet[]
): boolean {
  try {
    if (!validateLedger(blueprint, decisionRecords, changeSets)) return false;
    const compiled = compileHandoff(blueprint, decisionRecords, changeSets);
    const paths = compiled.files.map((file) => file.path);
    if (new Set(paths).size !== paths.length) return false;
    if (!requiredHandoffPaths.every((path) => paths.includes(path))) return false;
    if (!compiled.files.every((file) => file.preview.trim().length > 0)) return false;
    if (compiled.starterPrompt.trim().length === 0) return false;

    const blueprintFile = compiled.files.find((file) => file.path === "handoff/blueprint.json");
    if (!blueprintFile) return false;
    return HandoffSnapshotSchema.safeParse(JSON.parse(blueprintFile.preview)).success;
  } catch {
    return false;
  }
}

export function deriveReadiness(
  blueprint: BlueprintDocument,
  issues: ValidationIssue[],
  decisionRecords: DecisionRecord[] = [],
  changeSets: ChangeSet[] = []
): BlueprintReadiness {
  const blockers = issues.filter((issue) => issue.severity === "Blocker").length;
  const referencesValid = validateReferences(blueprint);
  const inMvpNodes = blueprint.nodes.filter((node) => node.scopeStatus === "in_mvp");
  const wireframesCovered = inMvpNodes.every((node) => node.wireframe.blocks.length > 0);
  const coveredTargetIds = new Set(
    blueprint.acceptanceCriteria.map((criterion) => criterion.targetId)
  );
  const requiredTargetIds = [
    ...inMvpNodes.map((node) => node.id),
    ...blueprint.flows.filter((flow) => flow.type === "required").map((flow) => flow.id)
  ];
  const acceptanceCriteriaCovered = requiredTargetIds.every((targetId) =>
    coveredTargetIds.has(targetId)
  );
  const handoffValid =
    referencesValid && validateHandoff(blueprint, decisionRecords, changeSets);

  return {
    ready:
      blockers === 0 &&
      referencesValid &&
      wireframesCovered &&
      acceptanceCriteriaCovered &&
      handoffValid,
    blockers,
    referencesValid,
    wireframesCovered,
    acceptanceCriteriaCovered,
    handoffValid
  };
}
