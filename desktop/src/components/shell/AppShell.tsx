import { Asterisk, CheckCircle2, RotateCcw, ShieldAlert } from "lucide-react";
import type { Dispatch, ReactNode } from "react";
import type { DemoAction, DemoState } from "../../app/demoReducer";

interface AppShellProps {
  state: DemoState;
  dispatch: Dispatch<DemoAction>;
  children: ReactNode;
}

export function AppShell({ state, dispatch, children }: AppShellProps) {
  const blockerCount = state.validationIssues.filter((issue) => issue.severity === "Blocker").length;
  const isIntake = state.route === "intake";

  return (
    <main className="app-shell" data-app-state={state.phase}>
      <header className="app-topbar">
        <div className="brand-lockup" aria-label="David product blueprint">
          <span className="brand-mark" aria-hidden="true">
            <Asterisk size={19} strokeWidth={2.6} />
          </span>
          <span className="brand-name">David</span>
          <span className="topbar-divider" />
          <span className="project-name">
            {isIntake ? "New Blueprint" : state.blueprint.project.name}
          </span>
          {!isIntake && <span className="version-label">Blueprint v1</span>}
        </div>

        <div className="topbar-actions">
          {!isIntake && (
            <div
              className={`readiness-pill ${blockerCount > 0 ? "is-blocked" : "is-ready"}`}
              aria-live="polite"
            >
              {blockerCount > 0 ? <ShieldAlert size={14} /> : <CheckCircle2 size={14} />}
              {blockerCount > 0
                ? `${blockerCount} blocker${blockerCount === 1 ? "" : "s"}`
                : state.readiness.ready
                  ? "Ready for handoff"
                  : "Validation pending"}
            </div>
          )}
          <span className="demo-label">Reference case</span>
          <button
            type="button"
            className="icon-text-button quiet-button"
            onClick={() => dispatch({ type: "RESET" })}
            aria-label="Reset Demo"
          >
            <RotateCcw size={15} />
            Reset Demo
          </button>
        </div>
      </header>

      <div className="app-content">{children}</div>

      {state.toast && (
        <div className="toast" role="status" aria-live="polite">
          <CheckCircle2 size={16} />
          <span>{state.toast}</span>
          <button
            type="button"
            aria-label="Dismiss notification"
            onClick={() => dispatch({ type: "DISMISS_TOAST" })}
          >
            Close
          </button>
        </div>
      )}
    </main>
  );
}
