# Backend Design

This folder tracks backend and architecture notes for David.

## Current Backend State

The current backend is intentionally lightweight because the live app is a validation prototype, not the final product.

| Area | Current implementation |
|---|---|
| API surface | Next.js route handlers under `app/api/`. |
| Intake | `POST /api/intake` captures founder/product context. |
| Diagnosis | `POST /api/diagnose` generates a deterministic preview from intake data. |
| Leads | `POST /api/lead` captures email leads. |
| Checkout | `POST /api/checkout` records paid intent and optionally returns Stripe payment links. |
| Events | `POST /api/events` captures lightweight analytics-style events. |
| Storage | In-memory maps in `src/lib/store.ts`. Data is lost on restart. |
| Diagnosis engine | Rule-based logic in `src/lib/diagnose.ts`. No LLM or external evidence ingestion yet. |
| Webhook | Optional best-effort delivery through `VALIDATION_WEBHOOK_URL`. |

## Backend Direction

The final product needs a durable PM reasoning system, not just form capture.

Expected next backend layers:

1. Durable storage for intakes, Bets, evidence cards, diagnoses, leads, payment intents, events, and memory.
2. Evidence ingestion from user-provided facts, URLs, community signals, reviews, competitors, metrics, and interviews.
3. Evidence Ledger with source, claim, strength, date, confidence, and relationship to a Bet.
4. PM reasoning workflow that connects Bet framing, evidence, risk, decision, next action, artifact, and memory.
5. Admin/review workflow for manual diagnosis while the product is still human-in-the-loop.
6. Eventually, agentic research and evidence-backed spec handoff to coding agents.

## Near-Term Backend Priorities

1. Replace in-memory storage with a durable database or external sink.
2. Persist report pages across deploys and restarts.
3. Add an admin surface for reviewing real validation cases.
4. Preserve all paid intent and lead events reliably.
5. Keep the rule-based diagnosis engine simple until enough real cases justify deeper automation.
