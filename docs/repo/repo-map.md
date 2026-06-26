# Repo Map

This repo combines product truth, research, and a working Next.js validation prototype for David, an AI PM coworker for indie builders.

## Runtime Product

Purpose: the current validation prototype and shared product logic.

| Path | Purpose |
|---|---|
| `app/` | Next.js App Router pages, report route, and API route entrypoints. |
| `src/lib/` | Shared domain types, diagnosis rules, temporary store, and webhook integration. |
| `assets/` | Tracked product/design assets. |

The landing page is a middle validation test, not the final product UX.

## Product Knowledge

Purpose: all Markdown knowledge lives under `docs/`.

| Path | Purpose |
|---|---|
| `docs/specs/` | Product source of truth: principles, users, scenarios, Bet model, evidence model, decision policy. |
| `docs/frontend/` | Visual direction and validation page design specification. |
| `docs/backend/` | Backend, data, API, storage, and future agent architecture notes. |
| `docs/research/` | Market research, landscape visualizations, evidence notes, and platform access plans. |
| `docs/repo/` | Repo map and operating notes. |

## Current App Surface

| Path | Purpose |
|---|---|
| `app/page.tsx` | Main bilingual validation page: hero, diagnosis console, intake form, sample output, pricing, FAQ. |
| `app/globals.css` | Global visual system and responsive page styles. |
| `app/layout.tsx` | Next.js root layout and metadata. |
| `app/report/[id]/page.tsx` | Dynamic diagnosis report page backed by the current in-memory store. |
| `app/api/intake/route.ts` | Captures product case intake. |
| `app/api/diagnose/route.ts` | Creates a deterministic diagnosis preview from an intake. |
| `app/api/lead/route.ts` | Captures email leads. |
| `app/api/checkout/route.ts` | Captures paid diagnosis intent and optionally returns Stripe payment links. |
| `app/api/events/route.ts` | Captures analytics-style events. |

## Domain Logic

| Path | Purpose |
|---|---|
| `src/lib/types.ts` | Domain types for intakes, diagnoses, risks, leads, payment intents, and events. |
| `src/lib/diagnose.ts` | Rule-based diagnosis engine for evidence strength, risk, decision, confidence, and PRD gate. |
| `src/lib/store.ts` | In-memory store for local validation. This is not durable production storage. |
| `src/lib/webhook.ts` | Optional best-effort webhook delivery to an external sink. |

## Configuration

| Path | Purpose |
|---|---|
| `package.json` | Scripts and dependencies. |
| `package-lock.json` | Locked npm dependency tree. |
| `next.config.mjs` | Next.js config. |
| `tsconfig.json` | TypeScript config. |
| `next-env.d.ts` | Generated Next.js TypeScript declarations. |
| `.env.example` | Documented environment variables. |
| `.gitignore` | Keeps generated local output out of Git. |
| `README.md` | English product and repo introduction. |
| `README.zh-CN.md` | Simplified Chinese product and repo introduction. |

## Ignored Local Output

| Path pattern | Purpose |
|---|---|
| `.next/`, `.next-stale-*/` | Next.js build output. |
| `node_modules/` | Installed dependencies. |
| `.playwright-mcp/` | Local browser/test logs and snapshots. |
| `scratch/` | Local experiments and disposable screenshots. |
| `/*.png` | Root-level generated screenshots from earlier visual iteration. |
| `/commercial-*.md` | Root-level generated visual snapshot notes. |
| `.claude/`, `.DS_Store`, `*.tsbuildinfo` | Local tool/system artifacts. |

## Cleanup Policy

1. Keep runtime product code in `app/` and `src/`.
2. Keep all Markdown knowledge under `docs/`, except root `README.md`.
3. Keep external reference files out of Git; extract useful claims into `docs/research/` or `docs/specs/`.
4. Put future local experiments and screenshots under ignored `scratch/`.
5. Replace `src/lib/store.ts` with durable storage before treating reports, leads, or payments as production data.
