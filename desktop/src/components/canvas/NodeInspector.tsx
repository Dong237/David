import { ArrowRight, CheckCircle2, CircleDot, Lightbulb, ShieldCheck } from "lucide-react";
import type { Dispatch } from "react";
import type { DemoAction, DemoState } from "../../app/demoReducer";
import type { BlueprintNode } from "../../domain/blueprint";

interface NodeInspectorProps {
  state: DemoState;
  node: BlueprintNode;
  dispatch: Dispatch<DemoAction>;
}

function displayScope(scope: BlueprintNode["scopeStatus"]): string {
  if (scope === "in_mvp") return "In MVP";
  if (scope === "later") return "Later";
  return "Excluded";
}

export function NodeInspector({ state, node, dispatch }: NodeInspectorProps) {
  const canProposeLater =
    node.id === "node_diagnostic" && !state.pendingChangeSet && state.decisionRecords.length === 0;
  const incoming = state.blueprint.flows.filter((flow) => flow.targetNodeId === node.id);
  const outgoing = state.blueprint.flows.filter((flow) => flow.sourceNodeId === node.id);

  return (
    <aside className="inspector-panel" aria-label="Node Inspector">
      <header className="inspector-heading">
        <div>
          <span className="section-kicker">Node Inspector</span>
          <h2>{node.title}</h2>
          <code>{node.id}</code>
        </div>
        <span className="status-label is-confirmed">
          {node.provenance.knowledgeStatus === "confirmed" ? "Confirmed" : "Inferred"}
        </span>
      </header>

      <div className="inspector-section">
        <span className="inspector-label">Purpose</span>
        <p>{node.purpose}</p>
      </div>
      <div className="inspector-section">
        <span className="inspector-label">User intent</span>
        <p>{node.userIntent}</p>
      </div>
      <div className="inspector-section emphasized">
        <span className="inspector-label">Primary CTA</span>
        <strong><ArrowRight size={14} /> {node.primaryCTA}</strong>
      </div>

      <div className="inspector-grid">
        <div>
          <span className="inspector-label">Incoming</span>
          <strong>{incoming.length}</strong>
        </div>
        <div>
          <span className="inspector-label">Outgoing</span>
          <strong>{outgoing.length}</strong>
        </div>
        <div>
          <span className="inspector-label">States</span>
          <strong>{node.states.length}</strong>
        </div>
      </div>

      <div className="inspector-section">
        <span className="inspector-label">States</span>
        <div className="state-list">
          {node.states.map((nodeState) => (
            <span key={nodeState}><CircleDot size={10} /> {nodeState.replaceAll("_", " ")}</span>
          ))}
        </div>
      </div>

      <div className="inspector-section">
        <span className="inspector-label">Wireframe contract</span>
        <div className="state-list wireframe-contract-list">
          {node.wireframe.blocks.map((block) => (
            <span key={block.id} data-wireframe-block-id={block.id}>
              <CircleDot size={10} /> {block.label}
            </span>
          ))}
        </div>
      </div>

      <div className="inspector-section scope-editor">
        <div>
          <span className="inspector-label">Scope</span>
          <strong className={`scope-text scope-${node.scopeStatus}`}>
            {displayScope(node.scopeStatus)}
            {node.scopeVariant && ` · ${node.scopeVariant}`}
          </strong>
        </div>
        {canProposeLater && (
          <button
            type="button"
            className="secondary-button"
            aria-label="Move Diagnostic Quiz to Later"
            onClick={() =>
              dispatch({ type: "PROPOSE_SCOPE_LATER", nodeId: "node_diagnostic" })
            }
          >
            Move to Later
          </button>
        )}
      </div>

      <div className="inspector-section rationale-block">
        <span className="inspector-label"><Lightbulb size={12} /> Why this belongs here</span>
        <p>
          {node.regionId === "region_setup" && "It creates context required by the learning loop."}
          {node.regionId === "region_learn" && "It helps the learner decide or complete today’s work."}
          {node.regionId === "region_reflect" && "It closes the loop and turns activity into learning."}
          {node.regionId === "region_system" && "It is low frequency and should not compete with the core path."}
        </p>
      </div>

      <footer className="inspector-provenance">
        <ShieldCheck size={14} />
        <span>
          <b>{node.provenance.basisType.replaceAll("_", " ")}</b>
          <small>Confidence: {node.confidence}</small>
        </span>
        <CheckCircle2 size={14} />
      </footer>
    </aside>
  );
}
