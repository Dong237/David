import {
  ArrowRight,
  Bot,
  Check,
  CircleHelp,
  Clock3,
  Layers3,
  Send,
  Sparkles,
  Target,
  UserRound
} from "lucide-react";
import type { Dispatch } from "react";
import type { DemoAction, DemoState } from "../../app/demoReducer";

interface IntakeWorkspaceProps {
  state: DemoState;
  dispatch: Dispatch<DemoAction>;
}

const contextRows = [
  { key: "targetUser", label: "Target user", icon: UserRound },
  { key: "situation", label: "Situation", icon: Clock3 },
  { key: "coreJob", label: "Core job", icon: Target },
  { key: "primaryOutcome", label: "Primary outcome", icon: Sparkles },
  { key: "productType", label: "Product type", icon: Layers3 }
] as const;

export function IntakeWorkspace({ state, dispatch }: IntakeWorkspaceProps) {
  const contextReady = state.phase === "CONTEXT_READY";
  const questionVisible = state.ideaSubmitted;

  return (
    <section className="intake-workspace" aria-label="Agentic product intake">
      <div className="conversation-surface">
        <div className="surface-heading">
          <div>
            <span className="section-kicker">Agentic intake</span>
            <h1>Shape the product before you shape the UI.</h1>
            <p>
              Describe the product in your own words. David will ask only what changes
              the structure.
            </p>
          </div>
          <span className="mode-chip"><Bot size={14} /> PM coworker</span>
        </div>

        <div className="conversation-thread" aria-live="polite">
          {!state.ideaSubmitted ? (
            <div className="thread-empty">
              <span className="assistant-avatar"><AsteriskIcon /></span>
              <div>
                <strong>Start with the uncertainty.</strong>
                <p>I will turn it into a product context, not a feature list.</p>
              </div>
            </div>
          ) : (
            <>
              <article className="message-row user-message">
                <span className="message-avatar">You</span>
                <div className="message-bubble">
                  <span className="message-author">You</span>
                  <p>{state.ideaDraft}</p>
                </div>
              </article>

              <article className="message-row assistant-message">
                <span className="assistant-avatar"><AsteriskIcon /></span>
                <div className="message-bubble">
                  <span className="message-author">David</span>
                  <p>
                    You are building an exam-prep coach, but the first version still has
                    two plausible organizing principles.
                  </p>
                  <div className="question-card">
                    <div className="question-title">
                      <CircleHelp size={17} />
                      <strong>What should V1 prove first?</strong>
                    </div>
                    <p className="question-rationale">
                      <b>Why this matters:</b> your answer decides whether the Blueprint
                      centers on plan generation or a repeatable daily loop.
                    </p>
                    <p className="question-fallback">
                      Safe fallback: daily completion, because it tests repeat behavior.
                    </p>
                    <div className="choice-stack">
                      <button
                        type="button"
                        className={`decision-choice ${state.intakeChoice === "plan" ? "is-selected" : ""}`}
                        onClick={() => dispatch({ type: "ANSWER_INTAKE", choice: "plan" })}
                      >
                        <span className="choice-letter">A</span>
                        <span>
                          <strong>Generate a useful study plan</strong>
                          <small>Turn an exam goal into a clear first plan.</small>
                        </span>
                        {state.intakeChoice === "plan" && <Check size={16} />}
                      </button>
                      <button
                        type="button"
                        className={`decision-choice ${state.intakeChoice === "daily_session" ? "is-selected" : ""}`}
                        onClick={() =>
                          dispatch({ type: "ANSWER_INTAKE", choice: "daily_session" })
                        }
                        aria-label="Choose daily session outcome"
                      >
                        <span className="choice-letter">B</span>
                        <span>
                          <strong>Complete a focused daily session</strong>
                          <small>Prove students return and finish one useful loop.</small>
                        </span>
                        {state.intakeChoice === "daily_session" && <Check size={16} />}
                      </button>
                    </div>
                  </div>
                  {contextReady && (
                    <p className="assistant-confirmation">
                      <Check size={15} /> I&apos;ll use {state.intakeChoice === "plan"
                        ? "plan usefulness"
                        : "daily completion"} as the organizing principle.
                    </p>
                  )}
                </div>
              </article>
            </>
          )}
        </div>

        <div className="idea-composer">
          <label htmlFor="idea-input">Product idea</label>
          <textarea
            id="idea-input"
            value={state.ideaDraft}
            onChange={(event) => dispatch({ type: "SET_IDEA", value: event.target.value })}
            rows={3}
            aria-invalid={Boolean(state.ideaError)}
          />
          <div className="composer-footer">
            <span className={state.ideaError ? "input-error" : "input-hint"}>
              {state.ideaError ?? "Plain language is enough. You can refine it later."}
            </span>
            <button
              type="button"
              className="primary-button"
              onClick={() => dispatch({ type: "SUBMIT_IDEA" })}
              disabled={questionVisible}
            >
              <Send size={15} />
              {questionVisible ? "Idea submitted" : "Send idea"}
            </button>
          </div>
          {state.demoModeNotice && (
            <p className="demo-notice" role="status">
              Demo mode uses the AI Study Coach reference case.
            </p>
          )}
        </div>
      </div>

      <aside className="context-surface" aria-label="Live Product Context">
        <div className="context-heading">
          <div>
            <span className="section-kicker">Live Product Context</span>
            <h2>Current organizing brief</h2>
          </div>
          <span className={`status-label ${contextReady ? "is-confirmed" : "is-inferred"}`}>
            {contextReady ? "Confirmed" : "Draft"}
          </span>
        </div>

        <div className="context-list">
          {contextRows.map(({ key, label, icon: Icon }) => (
            <div className={`context-row ${contextReady ? "is-updated" : ""}`} key={key}>
              <span className="context-icon"><Icon size={15} /></span>
              <div>
                <span>{label}</span>
                <strong>{state.productContext[key]}</strong>
              </div>
            </div>
          ))}
        </div>

        <div className="context-constraints">
          <span className="context-block-label">Constraints & assumptions</span>
          <div className="assumption-tags">
            {state.productContext.assumptions.map((assumption) => (
              <span key={assumption}>{assumption}</span>
            ))}
          </div>
        </div>

        <div className="context-footer">
          <div className="readiness-copy">
            <span>Blueprint readiness</span>
            <strong>{contextReady ? "Context sufficient" : "Needs one decision"}</strong>
          </div>
          <button
            type="button"
            className="primary-button generate-button"
            disabled={!contextReady}
            onClick={() => dispatch({ type: "GENERATE_BLUEPRINT" })}
          >
            Generate Blueprint
            <ArrowRight size={16} />
          </button>
        </div>
      </aside>
    </section>
  );
}

function AsteriskIcon() {
  return <Sparkles size={16} aria-hidden="true" />;
}
