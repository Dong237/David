import { ArrowRight, Boxes, CheckCircle2, PackageCheck, ShieldAlert } from "lucide-react";
import type { Dispatch } from "react";
import {
  getVisibleBlueprint,
  type DemoAction,
  type DemoState
} from "../../app/demoReducer";
import { BlueprintCanvas } from "./BlueprintCanvas";
import { DecisionPanel } from "./DecisionPanel";
import { LensComposer } from "./LensComposer";
import { NodeInspector } from "./NodeInspector";

interface BlueprintWorkspaceProps {
  state: DemoState;
  dispatch: Dispatch<DemoAction>;
}

export function BlueprintWorkspace({ state, dispatch }: BlueprintWorkspaceProps) {
  const visibleBlueprint = getVisibleBlueprint(state);
  const selectedNode =
    visibleBlueprint.nodes.find((node) => node.id === state.selectedNodeId) ??
    visibleBlueprint.nodes[0];
  if (!selectedNode) return null;
  const blockers = state.validationIssues.filter((issue) => issue.severity === "Blocker");

  return (
    <section className="blueprint-workspace" aria-label="Blueprint workspace">
      <aside className="outline-panel" aria-label="Blueprint outline">
        <header>
          <span className="section-kicker">Outline</span>
          <strong>{visibleBlueprint.nodes.length} product nodes</strong>
        </header>
        <nav>
          {visibleBlueprint.regions.map((region) => (
            <div className="outline-region" key={region.id}>
              <div className="outline-region-title">
                <span>{region.title}</span>
                <small>
                  {visibleBlueprint.nodes.filter((node) => node.regionId === region.id).length}
                </small>
              </div>
              {visibleBlueprint.nodes
                .filter((node) => node.regionId === region.id)
                .map((node) => {
                  const hasIssue = blockers.some((issue) => issue.rootCauseTargetId === node.id);
                  return (
                    <button
                      type="button"
                      key={node.id}
                      className={state.selectedNodeId === node.id ? "is-active" : ""}
                      onClick={() => dispatch({ type: "SELECT_NODE", nodeId: node.id })}
                    >
                      <span className={`outline-dot scope-${node.scopeStatus}`} />
                      <span>{node.title}</span>
                      {hasIssue && <ShieldAlert size={12} aria-label="Blocker" />}
                    </button>
                  );
                })}
            </div>
          ))}
        </nav>
      </aside>

      <div className="canvas-column">
        <div className="workspace-toolbar">
          <LensComposer state={state} dispatch={dispatch} />
          <button
            type="button"
            className="primary-button handoff-button"
            disabled={!state.readiness.ready}
            onClick={() => dispatch({ type: "OPEN_HANDOFF" })}
          >
            <PackageCheck size={15} /> Open Handoff
          </button>
        </div>
        <BlueprintCanvas state={state} dispatch={dispatch} />
        <footer className="canvas-statusbar">
          <span><Boxes size={13} /> 4 regions · 9 nodes · 1 canonical Blueprint</span>
          <span>{state.blueprint.bet.assumptions.length} assumptions</span>
          <span>{state.blueprint.constraints.length} constraints</span>
          <strong className={blockers.length ? "status-blocked" : "status-ready"}>
            {blockers.length ? (
              <><ShieldAlert size={13} /> {blockers.length} blocker</>
            ) : (
              <><CheckCircle2 size={13} /> Validated</>
            )}
          </strong>
        </footer>
      </div>

      <div className="right-panel-column">
        {state.pendingChangeSet ? (
          <DecisionPanel state={state} dispatch={dispatch} />
        ) : (
          <NodeInspector state={state} node={selectedNode} dispatch={dispatch} />
        )}
        {state.decisionRecords.length > 0 && !state.pendingChangeSet && (
          <div className="decision-record-strip">
            <CheckCircle2 size={14} />
            <div>
              <span>Decision recorded</span>
              <strong>Quick Diagnostic · user-approved</strong>
            </div>
            <ArrowRight size={13} />
          </div>
        )}
      </div>
    </section>
  );
}
