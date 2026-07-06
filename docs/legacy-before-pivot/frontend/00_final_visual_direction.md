# Final Visual Direction

## Decision

Use this hybrid direction:

```text
Operator Clinic brand
+ Command Center diagnostic workbench
+ Bilingual payment trust layer
```

The page should feel like a serious product operator reviewing a founder's case file with AI assistance. It should not feel like an AI wrapper, course funnel, guru offer, or generic SaaS template.

## Why This Direction

Customer trust for this product depends on:

- visible sample output before payment
- clear human/accountable review layer
- evidence and provenance, not AI vibes
- upfront price, scope, timeline, privacy, and refund/payment terms
- real diagnostic workflow above the fold
- mobile-first Chinese payment clarity

The page must sell faster product judgment, not "PM wisdom" as an abstract idea.

## Visual Keywords

| Keep | Avoid |
|---|---|
| calm operator workbench | purple AI gradient |
| expert clinic | robot / brain imagery |
| evidence ledger | generic dashboard mockup |
| case-file report | course funnel design |
| precise, compact UI | giant empty hero |
| warm white, graphite, cobalt | neon, glassmorphism, orbs |
| human-reviewed | autonomous magic claims |

## Palette

Use warm, restrained colors. The page should be mostly neutral with functional accents.

| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#FBFAF7` | Page background. Warm white, not beige-heavy. |
| `--surface` | `#FFFFFF` | Main cards and panels. |
| `--surface-soft` | `#F4F1EC` | Secondary section bands and report preview background. |
| `--border` | `#E6E0D8` | Default 1px borders. |
| `--border-strong` | `#CFC7BC` | Active/selected card borders. |
| `--text` | `#151515` | Primary text. |
| `--muted` | `#68707D` | Secondary text. |
| `--muted-2` | `#9AA1AA` | Metadata and timestamps. |
| `--primary` | `#2357FF` | Primary CTA, focus, selected tab. |
| `--primary-soft` | `#EAF0FF` | Primary soft backgrounds. |
| `--success` | `#1F8A59` | Verified evidence, safe/trust labels. |
| `--success-soft` | `#EAF6EF` | Success pill background. |
| `--warning` | `#D98A19` | Risk, medium confidence, WTP missing. |
| `--warning-soft` | `#FFF5E2` | Warning pill background. |
| `--danger` | `#D64A3A` | PRD blocked, missing proof, critical risk. |
| `--danger-soft` | `#FDECE9` | Danger pill background. |
| `--ink-panel` | `#1E2228` | Optional small code/log panel only. Do not make the whole site dark. |

Never introduce purple, blue-purple gradients, decorative gradient blobs, or neon accents.

## Typography

Use one modern sans family:

- Preferred: `Inter`, `Geist`, or `ui-sans-serif`.
- Chinese fallback: `PingFang SC`, `Microsoft YaHei`, `Noto Sans SC`.
- Monospace only for IDs, timestamps, source labels, and log-like rows.

Scale:

| Element | Desktop | Mobile |
|---|---:|---:|
| Hero H1 | 52-64px, line-height 1.02 | 34-40px, line-height 1.08 |
| Section H2 | 30-40px | 26-30px |
| Card title | 16-20px | 16-18px |
| Body | 16-18px | 15-16px |
| UI label | 12-13px | 12px |

Rules:

- Letter spacing must be `0`.
- Do not use viewport-width font scaling.
- Keep hero copy compact; the workbench is the visual proof.

## Layout System

Desktop:

- Max width: `1180px` or `1200px`.
- Page side padding: `32px`.
- Section vertical padding: `88px` desktop, `56px` mobile.
- Hero grid: `40% / 60%`.
- Hero min height: around `760px`, but leave hint of next section visible.
- Cards: 10-14px radius, 1px border, subtle shadow only for elevation.

Mobile:

- Single column.
- Header height under `64px`.
- Workbench turns into stacked cards.
- Chinese offer and trust/payment terms must be visible before deep FAQ.
- CTA should stay close to the diagnosis preview, not only at top/bottom.

## Core Surface

The first viewport is the product proof.

Required hero objects:

| Object | Purpose |
|---|---|
| Offer column | Who it is for, promise, CTA, trust bullets. |
| Diagnostic workbench | Shows the agentic PM workflow. |
| Evidence ledger | Shows provenance and proof quality. |
| Decision card | Shows `TEST`, confidence, PRD gate, next action. |
| Human/accountability note | Makes this a reviewed diagnosis, not black-box AI. |

Hero workbench must include:

- Inputs: product URL, stage, current evidence, metrics.
- Reasoning steps: orient, frame Bet, inspect evidence, map risks, decide.
- Diagnosis: decision, confidence, riskiest assumption, PRD gate.
- Evidence ledger: source, claim, strength, recency.

## Component Style

Recommended primitives:

- shadcn-style `Button`, `Card`, `Tabs`, `Badge`, `Input`, `Textarea`, `Accordion`, `Separator`.
- Magic UI-style motion may be used only for:
  - subtle `AnimatedList` in the evidence ledger
  - soft `BlurFade` section entrance
  - restrained `BorderBeam` on the main workbench only if it does not look flashy

Do not use:

- animated gradient text
- rainbow/shimmer buttons
- orbiting circles
- particles/meteors
- decorative bokeh/orbs
- fake testimonial marquees

## Motion

Motion should explain state changes, not decorate.

Allowed:

- active tab transitions under 180ms
- evidence rows gently appearing
- step checklist moving from pending to complete
- confidence/risk pill state changes
- sample report tab changes

Avoid:

- constant animation in the hero
- large parallax
- cursor gimmicks
- confetti
- bouncing CTAs

## Trust Rules

Every major claim needs one of:

- sample artifact
- source/provenance label
- explicit boundary
- price/scope/timeline disclosure
- human/accountability statement

Never show fake testimonials, fake logo walls, fake customer counts, or anonymous praise.

## Copy Tone

Tone:

- direct
- founder-to-founder
- precise
- skeptical of weak evidence
- helpful but not motivational

Avoid:

- "10x growth"
- "AI cofounder"
- "guaranteed product-market fit"
- "autonomous founder"
- "instant PM"
- "secret framework"

## Sources

- Stanford Web Credibility Guidelines: https://credibility.stanford.edu/guidelines/index.html
- NN/g trustworthiness factors: https://www.nngroup.com/articles/trustworthy-design/
- shadcn blocks: https://ui.shadcn.com/blocks
- Magic UI components: https://magicui.design/docs/components/marquee
- Magic UI MCP: https://magicui.design/docs/mcp
