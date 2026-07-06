# David App Prototype Design Note

Date: 2026-06-28

## Direction Chosen

David V1 uses a **Tauri Desktop Precision Coworker Console** direction:

```text
native desktop app shell
+ AI chat intake
+ PM diagnosis workbench
+ evidence and risk side panel
+ memory/case trail
```

This is intentionally not a landing page and not only a web app. The production prototype now has a Tauri desktop target that packages the React workbench as a macOS `.app`. The first screen is the working product surface: a founder can enter a messy product situation, generate a mock PM diagnosis, inspect the current Bet, evidence, risks, decision, PRD gate, and next action, then save it as a case.

## Design Research Signals

| Reference | Useful Lesson For David |
|---|---|
| [Linear](https://linear.app/) | Dense, fast operational software can make human and agent work feel shared without looking like a chatbot. |
| [Raycast](https://www.raycast.com/) | Command-oriented productivity tools should feel immediate, compact, and keyboard-friendly. |
| [Notion Calendar](https://www.notion.com/product/calendar) | Desktop productivity UX benefits from calm typography, restrained color, and clear temporal/contextual structure. |
| [Miro AI](https://miro.com/ai/) | AI coworker surfaces need shared context, not isolated prompt boxes. |
| [Figma Make](https://www.figma.com/make/) | AI creation tools work best when prompt, artifact, and iteration state are visible together. |

## Product Fit

David's core object is not a document. It is a decision state:

```text
situation -> Bet -> evidence -> risk -> decision -> next action -> memory
```

The UI therefore uses:

- a left sidebar for stable workspace navigation
- a center chat/workbench for messy founder input and action execution
- a right diagnosis panel for Bet, risk, evidence, decision, and PRD gate
- a memory placeholder for saved case history

## Visual Rules

| Keep | Avoid |
|---|---|
| neutral productivity palette | purple gradients and glowing AI cards |
| compact panels | marketing hero composition |
| explicit evidence provenance | black-box AI confidence |
| risk-state color only where functional | decorative color systems |
| desktop app density | generic SaaS landing sections |

## 2026 Research Synthesis

Three subagents researched current macOS desktop, AI productivity, and David-specific tab architecture. The shared conclusion:

```text
David should not be "chat in a desktop window."
It should be one active PM case with fast command access, a persistent inspector,
clear evidence provenance, and focused task views.
```

| Source Pattern | Product Lesson |
|---|---|
| Apple macOS design and App Intents | Make actions available across the Mac over time: menu bar, Spotlight, Shortcuts, privacy-first permissions. |
| Raycast | Command-first speed, compact launcher semantics, `Cmd+K`/global action mindset. |
| Linear | Dense work surfaces, contextual commands, native desktop advantages, visible agent work. |
| Notion Calendar | Ambient menu bar utility, shortcuts, and side-panel editing. |
| ChatGPT desktop / Claude Cowork | AI should use current context visibly, show what it used, and produce resumable work. |
| Figma / Miro AI | AI belongs inside context-rich collaborative surfaces, not as a detached chatbot. |

Chosen implementation for this prototype:

- persistent left sidebar
- center active task surface
- persistent right diagnosis/evidence inspector
- local-first case memory
- `Cmd+K` command palette
- compact cards, dense rows, and functional color only
- no decorative AI gradients or landing-page sections

Deferred native Mac work:

- menu bar extra
- global hotkey registration
- App Intents / Spotlight / Shortcuts
- native notifications
- permission dashboard
- cloud/local model routing

Those require deeper Tauri plugins or native Swift integration and should be added only after the core PM workflow proves useful.

## Sidebar Tab Plan

Each tab is one lens on the same active Bet, not a separate module.

| Tab | Encapsulated Function | Layout | Interaction |
|---|---|---|---|
| Inbox | Capture messy founder context and create/update the active Bet. | Chat console, stage segmented control, composer, PM protocol progress, next action preview. | Paste situation, pick stage, run diagnosis, save case, jump to diagnosis. |
| Current Diagnosis | Answer "what should I do next?" | Decision hero, confidence/evidence/readiness stats, four-risk matrix, next action, what-would-change section. | Rerun diagnosis, save case, open validation test. |
| Bet | Show the product judgment unit before PRD. | Canonical Bet card, structured field grid, lifecycle timeline, no-gos. | Inspect framing, jump to evidence, future inline editing/versioning. |
| Evidence | Show provenance and why the recommendation is trusted. | Evidence ledger list, filters, detail inspector with raw excerpt, strength, confidence, downgrade reasons. | Select evidence, inspect source/claim, turn gap into test. |
| Tests | Convert weak evidence into one practical validation action. | Active test plan, success/kill/tracking fields, outreach script/copy. | Copy script, create test memo, log result later. |
| Reports | Produce artifacts only appropriate to gate state. | Artifact list, report preview, Bet/PRD gate memo sections. | Copy memo, open test, future export/share/spec handoff. |
| Memory / Cases | Keep decision trail and founder/product memory. | Saved case list, decision timeline, memory settings shortcut. | Resume case, inspect prior decision, future archive/outcome/stale-evidence actions. |
| Settings | Control language, local data, shortcuts, privacy, integrations. | Compact settings rows, native Mac roadmap panel. | Toggle language from sidebar, future export/delete/connect/shortcut configuration. |

## Implementation Notes

The prototype keeps the backend local and replaceable:

- `/api/intake` creates and updates intake
- `/api/diagnose` generates a rule-based mock diagnosis
- `/api/cases` saves and lists cases in memory
- `/api/events` logs local analytics events
- `src/lib/app-service.ts` provides the desktop-safe local service used by the app UI
- `src-tauri/` provides the native Tauri shell and command bridge

The typed domain objects live in `src/lib/types.ts`: `Bet`, `Evidence`, `ProductDecisionRecord`, `Diagnosis`, and `CaseRecord`.

Future Supabase, SQLite, or agent orchestration can replace the store and diagnosis implementation without changing the core UI contract.

## Desktop Commands

| Command | Purpose |
|---|---|
| `npm run desktop:dev-ui` | Run the Vite desktop frontend only. |
| `npm run desktop:build-ui` | Build the static desktop frontend to `dist-desktop/`. |
| `npm run tauri:dev` | Run David as a Tauri desktop app in development. |
| `npm run tauri:build` | Build the macOS `.app` bundle. |

Default bundle target is `.app`. DMG packaging should be handled later with signing/notarization because the local DMG helper failed in this environment after `.app` generation succeeded.

## Research Sources

- Apple macOS developer overview: https://developer.apple.com/macos/
- Apple Human Interface Guidelines, menu bar: https://developer.apple.com/design/human-interface-guidelines/the-menu-bar
- Apple App Intents and Spotlight WWDC25: https://developer.apple.com/videos/play/wwdc2025/260/
- Apple design what's new: https://developer.apple.com/design/whats-new/
- Raycast manual: https://manual.raycast.com/
- Raycast AI: https://www.raycast.com/core-features/ai
- Linear desktop app docs: https://linear.app/docs/get-the-app
- Linear conceptual model: https://linear.app/docs/conceptual-model
- Linear Agent: https://linear.app/changelog/2026-03-24-introducing-linear-agent
- Notion Calendar: https://www.notion.com/product/calendar
- Notion Calendar shortcuts: https://www.notion.com/help/notion-calendar-keyboard-shortcuts
- Miro Sidekicks: https://miro.com/ai/sidekicks/
- Figma Config 2026 recap: https://www.figma.com/blog/config-2026-recap/
- ChatGPT desktop: https://chatgpt.com/features/desktop/
- OpenAI Work with Apps on macOS: https://help.openai.com/en/articles/10119604-work-with-apps-on-macos
- Claude Cowork: https://www.anthropic.com/product/claude-cowork
