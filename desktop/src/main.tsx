import React from "react";
import { createRoot } from "react-dom/client";
import "../../app/globals.css";

function PivotShell() {
  return (
    <main className="pivot-shell">
      <section className="pivot-hero">
        <div>
          <p className="eyebrow">David Mode B</p>
          <h1>Product blueprint generator for AI indie builders.</h1>
          <p className="hero-copy">
            This desktop shell is ready for the Mode B implementation. Build from
            BlueprintDocument contracts, fixtures, and the Blueprint Canvas.
          </p>
        </div>
        <div className="chain" aria-label="Core product chain">
          {["Bet", "IA", "Flow", "Wireframe", "Scope", "Handoff"].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>
    </main>
  );
}

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

createRoot(root).render(
  <React.StrictMode>
    <PivotShell />
  </React.StrictMode>
);
