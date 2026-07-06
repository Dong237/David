const sourceDocs = [
  "david_mode_b_batch6_final_absorb_plan.md",
  "david_mode_b_batch5_absorb_plan.md",
  "david_mode_b_batch2_absorb_plan.md",
  "david_mode_b_batch3_absorb_plan.md",
  "david_mode_b_batch4_absorb_plan.md",
  "david_mode_b_batch1_absorb_plan.md"
];

const nextSteps = [
  "Define TypeScript domain contracts and Zod schemas.",
  "Create the AI Study Coach BlueprintDocument fixture.",
  "Build the desktop-first workspace shell.",
  "Render the fixture through Blueprint Canvas, Node Detail, Scope, Handoff, and Validator."
];

export default function Home() {
  return (
    <main className="pivot-shell">
      <section className="pivot-hero">
        <div>
          <p className="eyebrow">David Mode B</p>
          <h1>Product blueprint generator for AI indie builders.</h1>
          <p className="hero-copy">
            This branch is cleaned for the Mode B pivot. The next implementation should start
            from contracts and fixtures, not from the legacy diagnosis app.
          </p>
        </div>
        <div className="chain" aria-label="Core product chain">
          {["Bet", "IA", "Flow", "Wireframe", "Scope", "Handoff"].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="pivot-grid">
        <article className="panel">
          <p className="eyebrow">Source of truth</p>
          <h2>Mode B docs</h2>
          <ul>
            {sourceDocs.map((doc) => (
              <li key={doc}>
                <code>docs/david-mode-b/{doc}</code>
              </li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <p className="eyebrow">Do not rebuild</p>
          <h2>Legacy Mode A is archived</h2>
          <p>
            Old AI PM Doctor, diagnosis, evidence validation, lead capture, checkout, and report
            routes were removed from the active app surface. Their historical docs remain under
            <code> docs/legacy-before-pivot/</code>.
          </p>
        </article>

        <article className="panel wide">
          <p className="eyebrow">Next build order</p>
          <h2>Start with the contract, then the canvas.</h2>
          <ol>
            {nextSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </article>
      </section>
    </main>
  );
}
