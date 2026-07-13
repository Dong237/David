import type {
  BlueprintDocument,
  ChangeSet,
  CompiledHandoff,
  CompiledHandoffFile,
  DecisionRecord
} from "./blueprint";

const wireframeTargets = [
  { nodeId: "node_diagnostic", slug: "diagnostic" },
  { nodeId: "node_study_plan", slug: "study-plan" },
  { nodeId: "node_daily_session", slug: "daily-session" }
];

function markdownList(items: string[]): string {
  return items.map((item) => `- ${item}`).join("\n");
}

function sourcePreview(
  blueprint: BlueprintDocument,
  path: string,
  fallback: string,
  decisionRecords: DecisionRecord[],
  changeSets: ChangeSet[]
): string {
  if (path === "handoff/START_HERE.md") {
    return [
      "# Start Here",
      "",
      "1. Read blueprint.json for canonical node and flow IDs.",
      "2. Read scope.md and no-gos.md before changing implementation scope.",
      "3. Implement one user-story slice at a time.",
      "4. Match each screen to its wireframe reference.",
      "5. Run the listed acceptance criteria after every slice.",
      "6. Stop and report any conflict instead of inventing new scope."
    ].join("\n");
  }

  if (path === "handoff/blueprint.json") {
    return JSON.stringify(
      {
        ...blueprint,
        changeSetHistory: changeSets,
        decisionHistory: decisionRecords
      },
      null,
      2
    );
  }

  if (path === "handoff/ia.md") {
    return [
      "# Information Architecture",
      "",
      ...blueprint.regions.flatMap((region) => [
        `## ${region.title}`,
        region.description,
        markdownList(
          blueprint.nodes
            .filter((node) => node.regionId === region.id)
            .map((node) => `${node.title} (${node.id})`)
        ),
        ""
      ])
    ].join("\n");
  }

  if (path === "handoff/flows.md") {
    return [
      "# User Flows",
      "",
      ...blueprint.flows.map(
        (flow) =>
          `- ${flow.sourceNodeId} --${flow.label} [${flow.sourceActionId ?? flow.sourceStateId}]--> ${flow.targetNodeId}`
      )
    ].join("\n");
  }

  if (path === "handoff/scope.md") {
    return [
      "# MVP Scope",
      "",
      "## In MVP",
      markdownList(
        blueprint.nodes
          .filter((node) => node.scopeStatus === "in_mvp")
          .map(
            (node) =>
              `${node.title} (${node.id})${node.scopeVariant ? ` - ${node.scopeVariant}` : ""}`
          )
      ),
      "",
      "## Later",
      markdownList(
        blueprint.nodes
          .filter((node) => node.scopeStatus === "later")
          .map((node) => `${node.title} (${node.id})`)
      )
    ].join("\n");
  }

  if (path === "handoff/acceptance-criteria.md") {
    return [
      "# Acceptance Criteria",
      "",
      ...blueprint.acceptanceCriteria.map(
        (criterion) => `- [ ] ${criterion.id} -> ${criterion.targetId}: ${criterion.statement}`
      )
    ].join("\n");
  }

  if (path === "handoff/no-gos.md") {
    return ["# No-Gos", "", markdownList(blueprint.bet.constraints)].join("\n");
  }

  if (path === "handoff/prompts/build-agent-skill.md") {
    return [
      "# Build Agent Skill",
      "",
      blueprint.handoff.starterPrompt,
      "",
      "Return to the Blueprint when a required path, scope rule, or canonical ID conflicts."
    ].join("\n");
  }

  return fallback;
}

export function compileHandoff(
  blueprint: BlueprintDocument,
  decisionRecords: DecisionRecord[] = [],
  changeSets: ChangeSet[] = []
): CompiledHandoff {
  const sourceFiles: CompiledHandoffFile[] = blueprint.handoff.files.map((file) => ({
    ...file,
    preview: sourcePreview(blueprint, file.path, file.preview, decisionRecords, changeSets),
    sourceFlowIds:
      file.path === "handoff/flows.md" ? blueprint.flows.map((flow) => flow.id) : undefined
  }));

  const wireframeFiles: CompiledHandoffFile[] = wireframeTargets.map(({ nodeId, slug }) => {
    const node = blueprint.nodes.find((candidate) => candidate.id === nodeId);
    if (!node) throw new Error(`Missing handoff wireframe node: ${nodeId}`);
    return {
      path: `handoff/wireframes/${slug}.md`,
      title: `${node.title} Wireframe`,
      sourceNodeId: node.id,
      preview: [
        `# ${node.title}`,
        "",
        `Purpose: ${node.purpose}`,
        `Primary CTA: ${node.primaryCTA}`,
        "",
        ...node.wireframe.blocks.map((wireframeBlock) =>
          `- ${wireframeBlock.type}: ${wireframeBlock.label}`
        )
      ].join("\n")
    };
  });

  return {
    files: [...sourceFiles, ...wireframeFiles],
    starterPrompt: blueprint.handoff.starterPrompt
  };
}
