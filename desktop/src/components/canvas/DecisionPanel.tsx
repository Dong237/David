import { AlertTriangle, ArrowRight, CheckCircle2, GitPullRequestArrow } from "lucide-react";
import type { Dispatch } from "react";
import type { DemoAction, DemoState } from "../../app/demoReducer";

interface DecisionPanelProps {
  state: DemoState;
  dispatch: Dispatch<DemoAction>;
}

export function DecisionPanel({ state, dispatch }: DecisionPanelProps) {
  const issue = state.validationIssues.find(
    (candidate) =>
      candidate.rootCauseTargetId === state.pendingChangeSet?.operations[0]?.targetId
  );
  if (!issue || !state.pendingChangeSet) return null;
  const scopeOperation = state.pendingChangeSet.operations.find(
    (operation) => operation.operation === "change_scope"
  );
  if (!scopeOperation) return null;
  const targetNode = state.blueprint.nodes.find((node) => node.id === scopeOperation.targetId);
  const scopeLabel = (value: typeof scopeOperation.before) =>
    value === "in_mvp" ? "In MVP" : value === "later" ? "Later" : "Excluded";

  return (
    <aside className="decision-panel" aria-label="Scope decision">
      <header className="decision-heading">
        <span className="decision-icon"><AlertTriangle size={18} /></span>
        <div>
          <span className="section-kicker blocker-kicker">Blocker · approval required</span>
          <h2>{issue.title}</h2>
        </div>
      </header>

      <p className="decision-message">{issue.message}</p>

      <div className="structure-diff">
        <div className="diff-title">
          <GitPullRequestArrow size={15} />
          <strong>Pending Structure Diff</strong>
        </div>
        <div className="diff-row">
          <span>~</span>
          <div>
            <b>{targetNode?.title ?? scopeOperation.targetId} scope</b>
            <p>
              {scopeLabel(scopeOperation.before)} <ArrowRight size={12} />{
                scopeLabel(scopeOperation.after)
              }
            </p>
          </div>
        </div>
        <div className="diff-impact">
          Affects <code>{state.pendingChangeSet.affectedFlowIds.join(", ")}</code> and{" "}
          {state.pendingChangeSet.affectedConstraintIds.length} constraints. Canonical state is unchanged.
        </div>
      </div>

      <div className="broken-path-callout">
        <span>Required path</span>
        <strong>Diagnostic Quiz <ArrowRight size={12} /> Study Plan</strong>
        <small>Missing learner-level input</small>
      </div>

      <div className="repair-list">
        <span className="inspector-label">Repair options</span>
        {state.blueprint.repairOptions.map((option, index) => (
          <article
            className={`repair-option ${option.recommended ? "is-recommended" : ""}`}
            key={option.id}
            data-repair-id={option.id}
          >
            <div className="repair-index">{String.fromCharCode(65 + index)}</div>
            <div>
              <div className="repair-title-row">
                <strong>{option.title}</strong>
                {option.recommended && <span>Recommended</span>}
              </div>
              <p>{option.description}</p>
              {option.recommended ? (
                <button
                  type="button"
                  className="primary-button repair-button"
                  onClick={() => dispatch({ type: "APPLY_REPAIR", repairId: option.id })}
                  aria-label="Apply lightweight diagnostic repair"
                >
                  <CheckCircle2 size={14} /> Apply repair
                </button>
              ) : (
                <small className="alternative-note">Alternative shown for tradeoff review</small>
              )}
            </div>
          </article>
        ))}
      </div>
    </aside>
  );
}
