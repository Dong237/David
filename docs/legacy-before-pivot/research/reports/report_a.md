# Competitive landscape for product idea discovery intelligence

**No single tool covers the full pipeline from demand signal to code-ready spec — and that's the opportunity.** Across 90+ tools mapped to five functional layers, the market is fragmented into narrow point solutions: trend trackers that don't score, validators that lack real data, and spec generators disconnected from customer evidence. The clearest gap is a unified system that chains demand signals → opportunity scoring → validation experiments → implementation handoff into one workflow. GummySearch's November 2025 shutdown ($35K MRR, 140K+ users, killed by Reddit API pricing) ripped open a vacuum now being filled by 7+ replacement tools — proving massive, underserved demand. Meanwhile, YC's Spring 2026 RFS explicitly calls for "Cursor for Product Management," framing this as an infrastructure problem, not just a PM tool.

***

## Layer 1: Demand signals are mature but completely siloed

The demand signal collection category is the most established layer, yet every tool operates in isolation. Founders must manually triangulate across 3–6 platforms to build a composite demand picture.

**Keyword and search data tools** form the foundation. **Ahrefs** ($129–$1,499/mo) and **SEMrush** ($139–$499/mo) dominate with databases of 27–28B keywords, but both are SEO-first platforms priced for marketing teams, not idea discovery. **Mangools/KWFinder** ($24–$64/mo) offers the best value for solo founders with accurate keyword difficulty scores, though its database is smaller. **Ubersuggest** ($12–$29/mo, with lifetime purchase option) and **Keywords Everywhere** (\~$5/mo browser extension) fill the budget tier but sacrifice depth and accuracy. None of these tools connect search demand to product opportunities — they surface what people search for, not what they'd pay for.

**Trend detection tools** attempt to predict demand before it peaks. **Exploding Topics** ($39–$499/mo, acquired by SEMrush in 2024) scans 1M+ sources to identify rapidly growing topics 6–12 months early, tagging trends as Exploding/Regular/Peaked. **Glimpse** (free extension, Pro \~$99/mo) enhances Google Trends with absolute volumes, 12-month forecasting (87% claimed accuracy), and channel breakdowns across Reddit, YouTube, TikTok, and Amazon. **Google Trends** remains free and useful but shows only relative interest with no absolute volumes and no proactive discovery. A newer entrant, **Rising Trends** ($97/year), curates multi-source signals (Google, TikTok, Reddit, Amazon) into weekly top-5 lists with mini consulting reports on why trends matter — the closest thing to a demand-signal-to-opportunity bridge at Layer 1.

**Social listening and audience intelligence** tools provide a different demand lens. **SparkToro** ($50–$300/mo) reveals what describable audiences read, watch, listen to, and follow by crawling tens of millions of profiles — including an AI Prompt Topic Discovery feature showing what audiences ask ChatGPT/Claude. **Brand24** ($79–$499/mo) tracks mentions across 25M+ sources with sentiment analysis. **BuzzSumo** ($199+/mo, now owned by Brandwatch) finds the most-engaged content by topic. **Brandwatch** itself runs $10K–$18K+/year — enterprise territory.

**The post-GummySearch Reddit ecosystem** is the most dynamic segment. After GummySearch's shutdown, **7+ replacement tools** emerged, each mining Reddit as a demand signal source:

- **Trend Seeker** (trend-seeker.app) — A0nalyzes 50K+ Reddit posts using embeddings-based similarity search; assigns evidence scores linked to actual posts. Free tier available. The strongest emerging player.
- **PainOnSocial** (painonsocial.com) — Extracts pain points from 30+ curated subreddits with 0–100 severity scores backed by 10–25 evidence pieces with direct Reddit permalinks.
- **IdeaPicker** (ideapicker.io, from $19) — Scans 250+ subreddits, generates 25,000+ startup ideas with business plans linked to original pain-point posts.
- **CatchIntent** — Detects buyer *intent* signals (not just keyword matches) across Reddit, HN, and Bluesky with Slack/Discord alerts.
- **Reddinbox** (reddinbox.com) — Multi-platform AI synthesis across Reddit, Quora, and YouTube with spam filtering.
- **F5Bot** — Free, simple keyword alerts for Reddit and HN. No AI, no dashboards.

**Ad spend intelligence** (SpyFu at $39/mo, SimilarWeb from $199/mo, Pathmatics/Sensor Tower enterprise-only) and **review aggregation** (GapScout, which analyzes G2/Trustpilot/Capterra reviews for market gaps) round out Layer 1. No single tool aggregates search + social + reviews + trends + ad spend into one demand dashboard. This is the clearest whitespace at Layer 1.

***

## Layer 2: Idea generators are mostly LLM wrappers lacking real data

The opportunity discovery layer divides sharply between **data-backed tools** (rare, valuable) and **AI-generated suggestion engines** (abundant, shallow).

**Data-backed idea tools** ground suggestions in real signals. **BigIdeasDB** (bigideasdb.com, $49.99 one-time) is the most ambitious — pulling from Reddit, G2 reviews, Upwork job postings, App Stores, and Product Hunt to surface 10K+ validated problems with AI-generated SaaS solutions. It includes a Reddit Pipeline Builder and 150K+ negative software reviews analyzed across 350+ categories. However, user reviews are mixed ("design is pretty but that's all"). **MicroSaaSIdea.com** maintains a database of 1,200+ validated SaaS ideas with keyword data and competitor analysis, trusted by 45,000+ founders. **Jakob Greenfeld's Product Explorer** (relaunched free) offers a static database of 15,000+ Product Hunt launches — useful for pattern-matching but not maintained in real-time.

**AI idea generators** proliferate but lack depth. **Stratup.ai** offers 100,000+ pre-generated ideas with SWOT and monetization plans. **Ideanote** (ideanote.io) generates ideas based on sector/technology parameters. **IdeasAI** (by Pieter Levels) lets users like/dislike GPT-generated ideas for $99 to claim one — more entertainment than market research. **Nichely** (nichely.ai) uses GPT-3 for topical map exploration but is fundamentally an SEO content planning tool. These tools share a core limitation: **suggestions aren't grounded in verifiable demand data**. They produce plausible-sounding ideas that may have zero market pull.

**The critical gap at Layer 2**: No tool systematically discovers product opportunities by cross-referencing multiple demand signals (search volume + social complaints + app store gaps + spending patterns) into scored, ranked opportunities. Tools either surface raw signals (Layer 1) or generate untethered ideas (Layer 2) — the synthesis step between them is manual.

***

## Layer 3: Scoring tools are crowded but lack rigor

At least **15 AI scoring/validation platforms** now exist, creating a crowded but undifferentiated market. Most share the same architecture: accept a text description of an idea → run it through an LLM → output a 0–100 score with SWOT analysis. The scores are AI-generated estimates, not grounded in verifiable metrics.

**The leading platforms by traction:**

- **ValidatorAI** (validatorai.com, free, 300K+ users) — 15-minute AI sessions producing scores up to 92, TAM/SAM/SOM estimation, and launch roadmaps. The market leader by volume but thin on proprietary data.
- **DimeADozen.ai** (free tier, $39–59/report, 85K+ users) — Generates 40-page reports covering SWOT, execution strategy, monetization, and competitor analysis. The most comprehensive single-report output, but entirely AI-generated.
- **IdeaProof** (ideaproof.io, from €19) — Validates across 50+ criteria in 120 seconds, includes free calculators (LTV, CAC, Runway, Market Size). Claims 89% accuracy (unverified). Also generates brand strategy and ad creatives.
- **CheckMyIdea-IA** (checkmyidea-ia.com) — 360° evaluation including risk identification, MVP test design, and action plan roadmaps. Pay-per-idea credits.

**Competition analysis tools** occupy a separate price tier entirely. **Crayon** ($12.5K–$47K/year), **Klue** ($16K–$45K/year), and **Kompyte** (from $300/mo, by SEMrush) track competitor websites, pricing changes, job postings, and messaging shifts with AI-powered battlecards — but they're built for enterprise sales enablement, not early-stage idea evaluation. **Competely** (competely.ai, from $19–$39/mo) is the only affordable competitor analysis tool, covering 100+ data points with continuous monitoring and auto-alerts on competitor changes.

**Market sizing tools** are surprisingly limited. **Clearbit's TAM Calculator** (now HubSpot/Breeze, free) uses real company data from 250+ sources but is B2B-only. **PM Toolkit** (pmtoolkit.ai, free) offers a guided TAM/SAM/SOM wizard. No tool automatically estimates market size from demand signals.

**The fundamental Layer 3 problem**: Evidence-backed scoring barely exists. Only **PainOnSocial** (linking severity scores to Reddit upvotes and engagement) and **Trend Seeker** (linking evidence scores to actual posts) attempt to ground scores in real data rather than LLM inference. The gap between "AI thinks this scores 85/100" and "here's the actual search volume, complaint frequency, willingness-to-pay signal, and competitive density behind that score" is enormous.

***

## Layer 4: Validation infrastructure is fragmented by design

Validation tools are the most heterogeneous layer because validation itself involves many distinct activities — landing pages, fake door tests, pre-sales, customer interviews, and ad experiments.

**Landing page builders** for smoke tests range from ultra-simple to enterprise-grade. **Carrd** ($9–$49/year) is the indie hacker default: one-page sites with signup forms and Stripe payments in minutes. **Leadpages** ($37–$74/mo annual) adds unlimited pages, Leadmeter performance prediction, and built-in checkout. **Unbounce** ($79–$239/mo) provides AI Smart Traffic routing visitors to best-converting variants plus A/B testing. **Instapage** ($79–$199/mo) targets enterprises with pixel-perfect editing and built-in heatmaps.

**Purpose-built validation tools** are rare but emerging. **Horizon** (gethorizon.net) is the closest thing to a validation experiment orchestrator — combining landing page building, ad campaign management, fake door tests with 3–6 variants, feature tests, pricing tests, and a Customer Demand Score. Pricing is opaque (contact sales). **FakeDoorTest.com** (€29/mo) is the only dedicated fake door testing tool found, tracking views, clicks, and signups across up to 10 ideas. **Chameleon** (chameleon.io) enables in-app fake door tests but only for products with existing user bases.

**Customer discovery interview tools** are surprisingly underdeveloped. **MomTest.ai** (free) validates whether your interview questions follow Mom Test principles — but it's only question validation, not an interview platform. **Looppanel** handles recording, transcription, and analysis for UX research interviews. **Dovetail** groups and tags interview insights into themes with AI analysis. A **Mom Test Coach GPT** exists on ChatGPT for crafting unbiased scripts. No tool combines interview scheduling, recording, AI analysis, and insight synthesis into one customer discovery workflow.

**Pre-launch platforms** show their age. **BetaList** ($129–$299 for faster listing) delivers 200–500 visitors with 15–20% email conversion, but effectiveness has declined since its 2011–2016 peak — the audience is now more makers than customers. **LaunchRock** ($249/year) offers template-based pre-launch pages and referral mechanics but looks dated. **Gumroad** (10% fee) and **LemonSqueezy** (5% + $0.50) enable pre-sales but aren't validation-specific.

**Simulated validation** is emerging: **Personalive** (personalive.ai) runs surveys, interviews, and concept tests against hyperrealistic AI personas. Intriguing but unverified how well synthetic responses predict real behavior.

**The Layer 4 gap**: No tool orchestrates a complete validation experiment — from hypothesis definition through landing page creation, ad campaign setup, traffic routing, response measurement, and statistical confidence calculation — in one workflow. Founders stitch together Carrd + Google Ads + Google Analytics + Mailchimp + Stripe, losing signal at every handoff.

***

## Layer 5: Spec generation is commoditizing fast

PRD generation has rapidly become a feature, not a product, as Figma, Miro, and Notion add AI spec writing to their platforms.

**Dedicated PRD tools**: **ChatPRD** (chatprd.ai, \~$20/mo, 100K+ PMs) leads with CPO-level document review, strategic gap analysis, and Linear integration that converts PRDs into engineering tickets. **MakePRD.ai** uniquely bridges to AI coding tools — generating build-ready prompts for V0, Lovable, Bolt, Cursor, and Replit alongside the PRD. **WriteMyPRD** (free) and **Leiga** (free basic) are simpler ChatGPT-powered generators.

**Platform-embedded spec generation**: **Figma Make** generates interactive flows and user journeys. **Miro AI** produces PRDs with user stories and acceptance criteria within its whiteboard. **Notion AI** drafts specs inline. **Productboard Spark** (launched Oct 2025) is the most ambitious — an agentic AI that turns customer signals into product plans without manual prompting, covering feedback collection through roadmap generation.

**Open source options** are strong at Layer 5. **MetaGPT** (50K+ GitHub stars) is the standout — a multi-agent framework that takes a one-line requirement and outputs a full PRD, system design, task breakdown, and repo. Cost is \~$0.20–$2.00 per generation using GPT-4. **Anthropic's knowledge-work-plugins** (official, on GitHub) include /write-spec, /synthesize-research, /competitive-brief for Claude. A repo called **Cursor-for-Product-Managers** provides templates for the entire PM workflow from discovery to delivery using Cursor IDE.

**The Layer 5 insight**: Spec generation alone is not a defensible business. The value is in specs that carry context from earlier layers — customer quotes, demand data, validation experiment results, competitive positioning. Currently, **no tool generates specs informed by actual validation evidence**. ChatPRD produces well-structured documents from whatever you tell it, but it doesn't know what your Carrd landing page converted at or what Reddit users complained about.

***

## Full-stack solutions attempting multi-layer coverage

Only two tools attempt coverage across all five layers, and both have significant limitations.

**NuggetFinder** (nuggetfinder.ai) claims the broadest scope: aggregating 1,200+ market signals and 35K+ daily data points from social media, patents, funding rounds, and app activity, then running 120 validation checks and generating startup blueprints. It covers Layers 1–5 on paper. In practice, it's new, unproven, and the breadth of signals likely sacrifices depth. Limited independent reviews exist.

**Buildpad** (buildpad.io, $20–$40/mo) guides founders through 7 phases from idea discovery to launch, using Reddit and web data for research. Bootstrapped to $7,300/mo in 7 months with 1,000+ users in 11 days after its December 2024 Product Hunt launch. However, users report its "demand signals" are essentially Reddit keyword searches dressed up, and its validation is theoretical rather than empirical.

**Partial multi-layer tools** worth noting:

| Tool                   | Layers               | Strength                                                             | Weakness                                              |
| ---------------------- | -------------------- | -------------------------------------------------------------------- | ----------------------------------------------------- |
| **BigIdeasDB**         | L1-L3, partial L4-L5 | Multi-source data (Reddit + G2 + Upwork + App Stores), 150K+ reviews | Mixed execution reviews; substance vs. design debate  |
| **DimeADozen**         | L2-L5                | Comprehensive 40-page reports, 85K+ users                            | Zero proprietary data — pure LLM generation           |
| **IdeaProof**          | L3-L5                | 50+ validation criteria, brand/ad creative output                    | Starts from your idea, doesn't discover opportunities |
| **aicofounder**        | L2-L5                | Guided 5-phase process, 20K+ founders                                | Limited public information on quality                 |
| **Productboard Spark** | L1-L3, L5            | Enterprise-grade, feedback from 5,000+ sources                       | $20+/maker/mo, enterprise-focused, no indie tier      |

***

## Chinese market and the 出海 indie ecosystem

The Chinese indie developer ecosystem has a distinct but parallel tool landscape for product discovery, centered on the concept of **出海** (going overseas).

**5118.com** is China's dominant keyword and demand research platform — roughly Ahrefs + SEMrush + AnswerThePublic for the Chinese web. Its 商机淘金助手 (Business Opportunity Gold-Panning Assistant) is specifically designed for demand signal discovery, and its 竞品分析器 handles competitive analysis. Pricing is freemium with CNY-denominated tiers. Limitation: primarily focused on Baidu and Chinese-language markets.

**M123** (m123.com) functions as a meta-tool — a comprehensive directory of 100+ cross-border tools covering product selection, ad spy, SEO, and market research for 出海 practitioners. **36氪出海/Let's Chuhai** (letschuhai.com) provides media coverage and market intelligence from China's TechCrunch equivalent. **奇赞 Qizansea** (qizansea.com) is a community focused on independent site + TikTok Shop growth strategies.

**W2Solo** (w2solo.com) is China's IndieHackers equivalent — 3,600+ members sharing product discovery methods, validation approaches, and 出海 strategies. Common Chinese indie dev approaches to idea discovery include: App Store/Google Play review mining for pain points, Reddit/Product Hunt/Toolify complaint scanning, SimilarWeb + SEMrush for competitive intelligence, near-market analysis (studying categories with high ad spend as validation signals), and GDPR compliance gaps as niche finders.

**iFLYTEK AIMarX** represents the enterprise tier — using DeepSeek + Spark LLMs for market insights, audience profiling, and competitive analysis specifically for overseas expansion. Enterprise pricing only.

Notable tools from the ecosystem: **ShipAny** (AI SaaS launch framework, pre-sold $10K in 4 hours), **1000UserGuide** (300+ channels for acquiring first users), and a community-maintained **GitHub repo of indie developer tools** (github.com/yaolifeng0629/Independent-developer-tools).

***

## Open source projects and the YC signal

**Open source projects** are most mature at Layer 5 (spec generation) and earliest-stage elsewhere.

**MetaGPT** (50K+ stars) dominates Layer 5 — a multi-agent framework simulating an entire software company from a one-line requirement. **Anthropic's knowledge-work-plugins** provide official Claude plugins for PM workflows (/write-spec, /synthesize-research, /competitive-brief). The **Cursor-for-Product-Managers** repo offers comprehensive templates covering the full PM workflow from user interviews through PRD generation in Cursor IDE. **prd-generator** (CLI tool on GitHub) generates PRDs via OpenRouter supporting multiple AI models.

At Layer 1–3, open source options are small and experimental: **app-idea-hunter** (11 stars) mines Reddit and Google Play complaints; **value-realization** evaluates ideas across value dimensions as a Claude/Cursor plugin; **LaunchLens** is a CLI tool giving YES/NO verdicts on startup ideas in 30 seconds. **n8n workflow templates** for Reddit→AI→Google Docs pipelines are the most practical open source option for demand signal collection.

**YC's "Cursor for Product Management" RFS** (Spring 2026, authored by Andrew Miklas) explicitly states: *"The most important part is figuring out what to build in the first place."* The vision: upload customer interviews and usage data, ask "what should we build next?", and get feature outlines with customer feedback explanations, UI/data model changes, and development tasks ready for coding agents. **Dart** (YC-backed) calls itself "Cursor for Project Management" but focuses on execution, not discovery. **Zeda.io** ($3.25M raised) was the closest to the full vision — turning Voice of Customer from 5,000+ sources into product insights — but appears deadpooled as of March 2025 (1 employee, 92% headcount decline). **Runtime** (runtm.com, YC-backed) enables PMs to use coding agents directly, representing the "PM who ships" paradigm.

A key industry analysis from Janne Lammi (February 2026) argues the YC RFS description is correct but the framing is wrong: this isn't a PM tool but **infrastructure** — "a layer in the stack between signal and execution." Per aipmtools.org's 2026 analysis, the "agentic dimension" is the least mature capability across all 51 AI PM tools evaluated, meaning the largest room for improvement.

***

## Ten gaps no existing tool solves well

1. **No unified demand signal aggregator** combines search volume + social complaints + app review gaps + ad spend + job postings + trend data into one scored dashboard. Every founder runs 4–6 separate tools.
2. **Evidence-backed scoring barely exists.** Most "scores" are LLM estimates. Only PainOnSocial and Trend Seeker link scores to actual post engagement, upvote counts, and thread frequency. No tool cross-references search volume, pricing benchmarks, and verified revenue signals into a composite opportunity score.
3. **The "GPT wrapper" problem is severe.** Community discussions repeatedly flag that Buildpad, ValidatorAI, and most idea generators produce generic output indistinguishable from a ChatGPT conversation. Tools citing actual evidence are gaining trust fastest.
4. **Platform dependency risk is systemic.** GummySearch's death proved Reddit API pricing can kill a $35K MRR business overnight. Most emerging tools are still Reddit-dependent. Multi-source tools (BigIdeasDB) are better positioned but rare.
5. **No validation experiment orchestrator** exists. The workflow of hypothesis → landing page → ad campaign → traffic → measurement → statistical confidence requires stitching together 4+ tools with signal loss at every handoff.
6. **Willingness-to-pay is never tested.** Tools surface complaints but don't confirm spending intent. The gap between "people complain about X" and "people will pay $Y/month for a solution to X" remains manual — requiring PPC ad testing (\~$150/week) or pre-sale experiments.
7. **Spec generation is disconnected from validation evidence.** ChatPRD produces well-structured PRDs, but no tool generates specs enriched with actual customer quotes, conversion rates from smoke tests, or demand metrics from Layer 1.
8. **International and non-English markets are blindspots.** SparkToro, Reddit tools, and most validators are US/English-centric. The 出海 ecosystem has parallel tools, but no cross-cultural product discovery platform exists.
9. **Vertical intelligence doesn't exist.** Top indie hacker advice is "vertical AI tools for dentists/roofers/locksmiths will outperform generic horizontal apps" — yet every discovery tool is horizontal.
10. **No tool bridges "validated idea" to "first paying customer."** The handoff from validation experiment results to deployed landing page + payment integration + first real transaction remains entirely manual.

***

## Three MVP options for a solo builder

### Option A: Evidence-backed opportunity scorer (the "anti-GPT-wrapper")

**What to build first:** A tool that ingests a product idea description and returns a composite opportunity score grounded in *verifiable data* — not LLM opinion. For each idea, it would automatically pull: monthly search volume for related keywords (via SEMrush/Ahrefs API or free alternatives), Reddit complaint frequency and sentiment scores (number of posts, upvotes, comment engagement), app store rating gaps for adjacent products (scraping G2/Capterra for 1–3 star reviews mentioning the problem), Google Trends trajectory (growing/flat/declining), and existing competitor count with pricing analysis. Output: a scored card with evidence links for each data point, plus a confidence interval.

**Target user:** Indie hackers and solo founders with 3–5 ideas who need to pick one. The persona is someone with technical skills who currently spends 2–3 hours per idea doing manual research across Ahrefs, Reddit, and G2.

**Tech stack:** Next.js frontend, Supabase for auth/data, DeepSeek/Claude for synthesis and natural language query parsing. Free or low-cost data APIs: Google Trends (unofficial), Reddit API (free tier), SerpAPI or similar for search volumes, web scraping for review sites.

**Key differentiator vs. ValidatorAI/DimeADozen:** Every score component links to its source data. Users see "Reddit: 47 complaint posts in r/smallbusiness about X in last 90 days, avg 23 upvotes" rather than "AI estimates high demand."

**Validation method:** Build a free single-idea scorer landing page on Carrd. Run $200 in Google Ads targeting "validate startup idea" and "business idea scorer." Measure email signups and then manually deliver 50 scored reports to gauge reaction and willingness to pay.

**Estimated time to MVP:** 4–6 weeks. Week 1–2: API integrations and data pipeline. Week 3–4: scoring algorithm and evidence card UI. Week 5–6: polish, landing page, initial user testing.

**Limitations to acknowledge:** API costs scale with usage; Reddit API commercial terms remain a risk; accuracy depends on data availability for niche topics.

### Option B: Validation experiment orchestrator (the "smoke test OS")

**What to build first:** A tool that takes a product hypothesis and generates a complete validation experiment: auto-creates a Carrd-style landing page from the idea description, sets up conversion tracking, generates Google/Meta ad copy variants, defines success criteria (e.g., "10% email signup rate from 500 visitors = validated"), and provides a real-time dashboard showing experiment progress against statistical significance thresholds. Think of it as the workflow that currently requires Carrd + Google Ads + Google Analytics + Mailchimp, collapsed into one opinionated interface.

**Target user:** Product managers at early-stage startups and technical founders who understand validation methodology (have read The Mom Test or Lean Startup) but find the execution tedious. The persona is someone who has an idea they believe in but hasn't run a fake door test because the setup takes 2+ hours across 4 tools.

**Tech stack:** Next.js for the experiment dashboard, Supabase for data/auth, Claude API for generating landing page copy and ad variants, Vercel for hosting generated landing pages, Stripe for optional pre-sale integration. Landing pages are server-rendered with built-in analytics (no external GA dependency).

**Key differentiator vs. Carrd/Unbounce + manual setup:** One-click experiment creation with built-in statistical rigor. The tool tells you "you need 340 more visitors to reach 95% confidence" rather than leaving you to interpret raw Google Analytics data.

**Validation method:** Build the MVP with just the landing page generator + analytics dashboard (skip ad integration initially). Post on IndieHackers, r/SideProject, and BetaList. Measure whether users complete the flow from idea input → published landing page → shared link. Pre-sell annual plans at $99/year via Gumroad.

**Estimated time to MVP:** 6–8 weeks. Week 1–2: Landing page template engine with Claude-generated copy. Week 3–4: Built-in analytics and conversion tracking. Week 5–6: Experiment dashboard with statistical significance calculator. Week 7–8: Payment integration and polish.

**Limitations to acknowledge:** Ad platform integration (Google/Meta APIs) is complex and can be deferred to v2. Initial MVP is essentially an opinionated landing page builder with analytics — differentiation requires shipping the statistical rigor and experiment framework fast.

### Option C: Demand signal aggregator with weekly opportunity digest (the "intelligence brief")

**What to build first:** A SwiftUI iOS app (with Next.js web companion) that monitors 3–5 data sources — Reddit (pain points), Google Trends (trajectory), App Store reviews (gaps), and Product Hunt (competitor launches) — for user-defined topic areas. Each week, it synthesizes findings into a ranked list of 5–10 product opportunities with evidence links, estimated competition level, and a suggested validation experiment for each. Think of it as a personalized "market intelligence briefing" for indie builders.

**Target user:** Serial indie hackers and micro-SaaS builders who actively look for their next project. The persona browses r/SideProject and Exploding Topics weekly but wants the signal-to-noise ratio improved by 10x. They'd pay $15–30/mo to save 3–4 hours of manual research per week.

**Tech stack:** SwiftUI for native iOS app (push notifications for weekly briefs), Next.js for web dashboard, Supabase for user preferences/data, DeepSeek for cost-effective synthesis of large volumes of scraped data, Claude for high-quality opportunity write-ups. Reddit API + unofficial Google Trends API + App Store RSS feeds + Product Hunt API for data collection.

**Key differentiator vs. Exploding Topics/Rising Trends:** Personalized to user's skills and interests (you tell it "I build B2B SaaS with Next.js" and it filters accordingly). Multi-source synthesis rather than single-channel trend tracking. Actionable format — each opportunity includes a suggested first validation step.

**Validation method:** Launch as a free weekly email newsletter first (zero code, just manual research published via Buttondown or similar). If 500+ subscribers engage consistently over 4 weeks, build the automated version. Pre-sell the app with a $49/year early-access pricing page on Carrd.

**Estimated time to MVP:** Newsletter: 1 week. Automated app: 8–10 weeks. The newsletter serves as both validation and content for training the synthesis pipeline.

**Limitations to acknowledge:** Data freshness depends on API polling frequency and rate limits. iOS app adds development complexity — could start web-only. The "personalization" engine needs enough user signal to be useful, creating a cold-start problem.

***

## Conclusion: Infrastructure, not just tooling

The product idea discovery space is not lacking tools — it's lacking **connective tissue**. Ninety-plus tools exist across the five layers, but they operate as isolated islands. The market has matured at the extremes (Layer 1 SEO tools are excellent; Layer 5 spec generators are rapidly commoditizing) while the middle layers — scoring with real evidence, orchestrated validation experiments, and context-preserving handoffs — remain primitive.

The most revealing signal is YC's framing: this is infrastructure between signal and execution, not a dashboard for PMs. GummySearch's death proves demand is real and platform risk is lethal — multi-source data ingestion is a requirement, not a feature. Evidence-backed scoring (linking to actual posts, search volumes, and review data) is the clearest competitive moat against the flood of GPT wrapper tools. And the pricing data is unambiguous: indie hackers pay **$19–49/month** or **$49–99 one-time** — anything above $100/month loses this segment entirely.

For a solo builder, **Option A** (the evidence-backed scorer) offers the fastest path to a differentiated product with the lowest technical risk. It directly addresses the market's loudest complaint (generic AI scores), has clear monetization ($29–49/mo), and can be validated in under 6 weeks with $200 in ad spend. Start there, then expand into validation orchestration (Option B) as the natural next layer.
