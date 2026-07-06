# The global landscape for "what should I build?" tools

**No single tool connects demand signals to validated specs today — and YC just put a bounty on it.** Y Combinator's Spring 2026 RFS explicitly named "Cursor for Product Managers" as one of eight priority categories, describing a system that ingests customer evidence, scores opportunities, and outputs agent-executable specs. After surveying 120+ tools across five layers of this discovery stack, the clearest finding is that **every layer has mature incumbents, but the seams between layers are completely unwired.** Reddit pain miners don't talk to feedback synthesizers. Idea validators don't pull real keyword data. PRD generators don't trace back to evidence. The market is wide but shallow — and the end-to-end pipeline remains unclaimed territory.

This report maps every layer of the product-discovery stack, identifies genuine gaps, and concludes with concrete MVP paths an indie builder can ship in 2–4 weeks.

---

## Layer 1: Signal ingestion is solved in silos

The Signal Layer — continuous ingestion of demand, pain, competitor, and money signals — is the most crowded layer, but tools cluster tightly within sub-categories and never cross boundaries.

### SEO and keyword demand tools

| Tool | What it actually does | Pricing | Scale | Good at | Misses |
|------|----------------------|---------|-------|---------|--------|
| **Ahrefs** (ahrefs.com) | Crawls web to build largest backlink/keyword index (~28.7B keywords) for competitor reverse-engineering | Starter $29/mo; Lite $129/mo; API from $500/mo | ~10M monthly visits; $100M+ ARR, bootstrapped | Best backlink index; content gap analysis; new $29 starter tier | Credit system is punitive; $129/mo minimum for real use |
| **Semrush** (semrush.com) | All-in-one marketing: keyword research, PPC, content, social, new AI Visibility tracking | Pro $140/mo; 14-day trial | NYSE:SEMR; $350M+ ARR; 10M+ users | Broadest features; Keyword Magic Tool; tracks brand visibility in ChatGPT/Perplexity | Bloated; hidden per-seat costs; most users touch <20% of features |
| **Keywords Everywhere** (keywordseverywhere.com) | Browser extension overlaying volume/CPC/competition on Google, YouTube, Amazon as you browse | Bronze $7/mo; credits-based | 1.55M+ users; $2-5M ARR est. | **Lowest-friction demand validation** at $7/mo; always-on context | Credits burn fast; no standalone dashboard |
| **DataForSEO** (dataforseo.com) | API-only: 50+ endpoints for SERP, keywords, backlinks, Google Trends, app store data | Pay-as-you-go; $50 min deposit; ~$0.001/credit | 3rd most active SEO bot globally | **70–97% cheaper** than Ahrefs/Semrush; credits never expire; 50+ APIs | No UI; developer-only; learning curve |
| **Exploding Topics** (explodingtopics.com) | AI scans millions of data points to surface topics growing 3–12 months before mainstream | Free tier; Entrepreneur $39/mo; owned by Semrush | 4.9/5 on Product Hunt | Proactive discovery of trends you didn't know to search for | Not a keyword tool; limited searches; $39/mo for a trend feed |
| **AlsoAsked** (alsoasked.com) | Scrapes Google "People Also Ask" boxes into branching question trees | Free 3/day; Pro $47/mo | Niche, small user base | Best visualization of search intent hierarchies; ~150 questions per query | No search volume data; must pair with volume tool |
| **KeywordsPeopleUse** (keywordspeopleuse.com) | Aggregates from Google Autocomplete, PAA, Reddit, and Quora in tree structure | ~$15-59/mo | Small indie tool | **Uniquely pulls Reddit/Quora alongside Google** — surfaces conversational pain points | Limited database; credits expire quickly |
| **Google Trends** (trends.google.com) | Shows relative search interest (0–100) over time and by geography | Free; API in alpha | Millions of users | Source of truth for directional trends; completely free | Relative not absolute volume; hard to use programmatically |

**Emerging signal:** Newer tools like **Trends MCP** ($29/mo) deliver cross-platform trend data via MCP protocol directly to AI assistants — a preview of how signal ingestion will work in agentic workflows. **Answer Socrates** (free tier) is the best free alternative to AnswerThePublic for autocomplete-based research.

**Open-source pick:** **OpenSEO** (github.com/every-app/open-seo) wraps DataForSEO into a self-hostable UI — effectively **"Ahrefs for $5/month."** Combined with **SerpBear** (free, open-source rank tracker) and **Pytrends** (Google Trends Python wrapper), a technical indie hacker can build a complete keyword research stack for under $10/month.

### Reddit, community, and social mining tools

This sub-category is in upheaval. **GummySearch, the gold standard for Reddit-based product discovery (135K users), discontinued in November 2025** due to Reddit's API pricing changes. Multiple tools are rushing to fill the vacuum.

| Tool | What it actually does | Pricing | Status/Scale | Good at | Misses |
|------|----------------------|---------|-------------|---------|--------|
| **GummySearch** | Was: Reddit audience research across 130K+ subreddits with pain-point filtering | Was $29-199/mo | **Discontinued Nov 2025** | Was the definitive "what to build" Reddit tool | Dead |
| **IdeaBrowser** (ideabrowser.com) | AI converts Reddit threads + search data into fully researched startup idea briefs with scores | Free daily ideas; paid plans | 669K visits launch month (Jul 2025); founded by Greg Isenberg | Each idea = 50+ hours of research condensed; includes market sizing and competitor analysis | Pre-packaged ideas — everyone sees the same opportunities; browsing, not discovering |
| **PainOnSocial** (painonsocial.com) | AI-powered Reddit pain point scoring (0-100) with evidence quotes and Reddit permalinks | Starter $19/mo | Early stage, indie | Purpose-built for "what to build"; AI scoring separates signal from noise; closest GummySearch replacement | Reddit-only; limited to ~30 curated subreddits; unproven |
| **Reddinbox** (reddinbox.com) | AI agent synthesizing insights from Reddit, Quora, YouTube, X using natural language queries | Free tier; paid plans | Early stage | Multi-platform; AI synthesis; filters spam/AI-generated posts | New; unclear track record |
| **BigIdeasDB** (bigideasdb.com) | Pre-analyzed complaint database (238K+ from Reddit, G2, Capterra, App Stores, Upwork) + Reddit pipeline builder | Basic + Pro plans | Indie, bootstrapped | Most comprehensive data aggregation; crosses Reddit + review sites + freelancer platforms | Database is static, not real-time; build tools feel like scope creep |
| **Syften** (syften.com) | Real-time keyword monitoring across 15+ platforms (Reddit, HN, X, Discord, GitHub, YouTube, podcasts) | €20-100/mo | Bootstrapped; PostHog customer | **Broadest platform coverage**; near-real-time alerts; excellent filter syntax | No AI analysis; you must know what keywords to track; monitoring, not discovery |
| **F5Bot** (f5bot.com) | Free keyword monitoring for Reddit, HN, Lobsters; email alerts | Free; Ultra tier for AI alerts | Processes millions of Reddit comments daily | Zero-cost; up to 200 keywords; recently added AI semantic alerts | Email-only; no dashboard; throttles popular keywords |
| **Octolens** (octolens.com) | AI social listening for B2B SaaS across 13+ platforms with intent tagging (buy-intent, complaint) | Free 5K mentions; $19-69/mo | Used by Vercel, Prisma, PostHog, Supabase | Best AI relevance filtering; purpose-built for developer/SaaS companies | Built for monitoring existing products, not discovering what to build |

**Critical insight:** The real money is in Reddit *marketing*, not Reddit *research*. **Leadmore AI hit $30K MRR** helping people sell on Reddit, while GummySearch (research) shut down. Tools that help people sell on platforms are consistently more monetizable than tools that help people discover what to build — a dynamic any builder entering this space must account for.

### Review mining and competitor intelligence

| Tool | What it does | Pricing | Indie relevance |
|------|-------------|---------|----------------|
| **Apify** (apify.com) | Marketplace of scrapers for G2, Capterra, Trustpilot, App Store; all-in-one review scraper | Free tier + pay-per-use | High for technical builders |
| **G2 Scraper** (github.com/omkarcloud/g2-scraper) | Open-source G2 data extractor | Free | High — free competitive intel |
| **SimilarWeb** (similarweb.com) | Estimates any website's traffic, sources, demographics | Free limited; Starter $125-199/mo; Team $14K/yr | Medium — accuracy degrades severely below 50K monthly visitors |
| **Toolify.ai** | AI tools directory with traffic estimates for 28,700+ tools across 459 categories | Free | High for AI tool builders — best directory for spotting growing AI categories |
| **SpyFu** (spyfu.com) | Exposes every keyword a domain has ever ranked for + all historical Google Ads | $39/mo | Medium-high — cheapest competitor SEO/PPC spy tool |
| **BuiltWith** (builtwith.com) | Identifies technology stack of any website across 113K technologies | Free basic; $295/mo for data | Medium — free tier useful for tech stack checks |

**Gaps in Layer 1:**

- **No tool bridges demand signals → product ideas.** Every SEO and trend tool shows keywords; none say "here's a SaaS you should build."
- **GummySearch's death left a vacuum** that only early-stage tools are filling. Reddit-based product discovery has no mature option.
- **Discord mining is nearly non-existent.** Despite Discord communities being rich signal sources, no tool mines them for product opportunities.
- **No SaaS pricing page scraper exists.** All competitor pricing tools target e-commerce. Structured SaaS pricing intelligence is a blind spot.
- **SimilarWeb is useless below 50K visits** — exactly the range where indie hackers compete. Small-site competitive intelligence is effectively impossible.
- **DataForSEO is massively underused by indie hackers.** At $50 initial deposit and pennies per query, it's the best-kept secret in the SEO data layer.

---

## Layer 2: Synthesis is enterprise-only, with one indie exception

The Synthesis Layer — clustering raw evidence into friction pockets and JTBD framing — is dominated by enterprise tools priced at $30K–$100K/year, with a dramatic gap at the indie tier.

### User research synthesis

| Tool | What it does | Pricing | Indie viable? |
|------|-------------|---------|--------------|
| **Dovetail** (dovetailapp.com) | AI-native research repository; transcription, theme tagging, "Ask Dovetail" querying | Free (1 project) → Enterprise only | ⚠️ No mid-tier; jump from free to enterprise |
| **Marvin** (heymarvin.com) | AI-moderated interviews in 40+ languages; cross-project AI search with citations | ~$50-100/user/mo | ⚠️ Borderline; steep learning curve |
| **Condens** (condens.io) | Lightweight UX research repo with AI clustering and whiteboard | **€15/mo** (1 contributor) | ✅ Most indie-friendly research tool |
| **Outset.ai** | AI-moderated video/voice/text interviews at scale (100+ in 24 hours) | Enterprise only; $21M raised | ❌ Completely enterprise |

### Product feedback synthesis

**A consolidation wave hit in 2025.** Amplitude acquired both **Kraftful** and **Inari** and shut them down. Atlassian acquired **Cycle.app**. The affordable feedback synthesis layer is shrinking.

| Tool | What it does | Pricing | Indie viable? |
|------|-------------|---------|--------------|
| **Enterpret** (enterpret.com) | Adaptive 5-level taxonomy from 50+ sources; Customer Knowledge Graph | $30K–$100K/yr | ❌ Enterprise only |
| **Unwrap.ai** | AI clustering from 3,000+ integrations; proactive weekly digests | Enterprise pricing; $16M raised | ❌ Enterprise only |
| **Viable** (askviable.com) | GPT-4 "Generative Analysis" producing natural-language feedback reports | Contact for pricing | ❌ Likely expensive |
| **Noisely** (noise.ly) | Auto-collects from 23+ public sources (Reddit, HN, G2, app stores, GitHub); AI classification | **$49/mo flat** | ✅ **Only affordable tool with auto-source connection** |
| **Kraftful** | Was AI copilot for feedback analysis, $12–15/mo Pro | **Acquired by Amplitude Jul 2025; shut down Aug 2025** | ❌ Dead |

**Noisely is the breakout newcomer.** At $49/month with automatic ingestion from 23+ sources (Reddit, Hacker News, G2, Trustpilot, app stores, GitHub, YouTube), it's the only tool in this layer accessible to indie hackers that doesn't require manual data upload. But it launched October 2025 and remains unproven.

### JTBD and pain-point extraction

**No dedicated JTBD extraction tool exists as a mature product.** This is a complete market gap. Tools like **JobLens** (jtbd.app) generate *hypothetical* JTBDs from prompts, not from real customer data. **thrv.com** offers consulting methodology but no self-serve tool. The only working approach is manual prompting of ChatGPT/Claude with transcripts.

**The DIY path:** GitHub published their internal approach — **BERTopic** (6K+ GitHub stars, Python topic modeling with BERT embeddings + HDBSCAN clustering) combined with GPT-4 for human-readable summaries. This is the proven open-source pipeline, costing ~$5–20/month in API fees for an indie hacker who can write Python.

**Gaps in Layer 2:**

- **No tool auto-frames feedback as JTBD statements or "friction pockets."** This is the single biggest functional gap in the entire landscape.
- **The affordable middle tier is disappearing.** Kraftful ($12/mo), Inari, and Cycle were all acquired and shut down in 2025. Enterprise tools consolidate upward.
- **Cross-source synthesis doesn't exist at indie prices.** Combining Reddit posts + app reviews + support tickets into a unified view costs $30K+ at Enterpret — or $49/mo at Noisely with less sophistication.
- **Every tool stops at "here are themes."** None go to "here's a structured opportunity brief with friction pockets mapped to user segments."

---

## Layer 3: Scoring is the weakest layer overall

Opportunity scoring — rating ideas on demand depth, competition weakness, willingness to pay, buildability — is where the landscape is thinnest and most disappointing. **Most idea validators are GPT wrappers with marketing polish.**

### Idea validation tools

The sophistication hierarchy runs from pure ChatGPT wrappers to tools pulling some real data:

| Tool | What it does | Pricing | Data sources | Honest assessment |
|------|-------------|---------|-------------|-------------------|
| **Validator AI** (validatorai.com) | Conversational AI scoring + voice chat; 300K+ users | Free text; $49/3 voice calls; $29/mo premium | Primarily AI reasoning, no real market data | **Largest user base** but essentially AI opinions, not data-driven validation |
| **WorthBuild** (worthbuild.io) | Validation reports pulling Google Trends, Reddit, SimilarWeb data; Discovery Hub finds real users discussing your problem | $5/report or $20 for 5 | Google Trends, Reddit, competitor traffic, Crunchbase | **Most data-driven** of indie validators; also generates leads |
| **ValidateMySaaS** (validatemysaas.com) | Scrapes real competitor features, pricing, G2/Trustpilot reviews; 2-hour reports | $19-29/mo | G2 reviews, Trustpilot, competitor pricing pages, 40 SEO terms | **Deepest competitor analysis** — actual pricing tables, real reviews |
| **IdeaProof** (ideaproof.io) | Validation + business plan + brand strategy using ensemble AI | €19-99/mo (credit-based) | Claims "50+ data sources" | Broadest feature set but breadth over depth; credit costs escalate |
| **DimeADozen.ai** | AI validation reports in ~20 seconds; white-label option | Free; Entrepreneur $39/mo | No evidence of proprietary data | 120K+ reports; largely a GPT wrapper with good UX |
| **IdeaCheck.io** | Surveys *real people* in target demographic; scientifically validated | Not listed (positioned affordable vs traditional) | Actual human responses | **The only tool getting real human feedback** — slower (24 hrs) but more valid |

### Market sizing and opportunity scoring

**No automated market sizing tool pulls real data.** All TAM/SAM/SOM calculators require manual input. IdeaProof and WorthBuild estimate with AI, but the numbers aren't from Statista, IBISWorld, or Gartner lookups.

**SEO opportunity scoring** is more mature. **LowFruits** (lowfruits.io, acquired by AIOSEO) finds low-competition keywords by analyzing SERP weaknesses — pages where low-authority sites rank. **SEOmonitor** has the most sophisticated native Opportunity Score (combining volume, rank, CTR, and revenue impact), but it's enterprise-priced. Semrush's new **Personal Keyword Difficulty** metric shows difficulty relative to *your* domain's authority — genuinely innovative.

**Willingness-to-pay tools are enterprise-only.** Price Intelligently (now SBI Growth, $50K+ engagements) sets the standard. **Conjointly** offers self-serve Van Westendorp and conjoint analysis with a free tier — the most accessible pricing research tool. No tool scrapes SaaS pricing pages at scale.

**The composite scoring gap is the biggest opportunity.** Amazon's **SellerApp** proves the model works: it combines demand (search volume), competition (seller count), and revenue potential into a single opportunity score using *real marketplace data*. **No equivalent exists for SaaS or software ideas.** The five-tier sophistication model:

- **Tier 1 (Pure GPT):** FounderPal, FlowKitten — just prompt engineering
- **Tier 2 (GPT + web search):** Validator AI, DimeADozen — AI reasoning with general search
- **Tier 3 (GPT + structured data):** WorthBuild, ValidateMySaaS — pulls some real APIs
- **Tier 4 (Real data APIs, domain-specific):** SEOmonitor, SellerApp — genuine data integration
- **Tier 5 (Multi-source composite): Does not exist.** No tool combines keyword APIs + competitor databases + SaaS pricing data + community sentiment into a weighted score.

**Gaps in Layer 3:**

- **Tier 5 scoring is the killer feature nobody has built.** Combining DataForSEO keyword data + SimilarWeb traffic estimates + G2 review sentiment + pricing page analysis into one opportunity score is entirely unclaimed.
- **TAM estimation from idea descriptions is unsolved.** Every calculator requires manual input.
- **SaaS pricing intelligence is a blind spot.** E-commerce has Prisync, Price2Spy, SYMSON. SaaS has nothing.
- **Most "validators" provide AI opinions, not evidence.** Only ValidateMySaaS and IdeaCheck use real external data.

---

## Layer 4: Spec output is booming but disconnected from evidence

The Contract/Spec Output Layer — turning opportunities into PRDs, specs, and code — is the most active investment area, driven by the coding-agent explosion.

### AI PRD generators

**ChatPRD** (chatprd.ai) dominates with **100K+ PMs and 750K+ documents generated.** Founded by Claire Vo (3x CPO), it starts at $5-8/month and exports directly to Linear, Lovable, v0, Bolt, and Cursor. Its Socratic interview mode helps solo builders refine specs. But it starts from a prompt, not from evidence — **it can't ingest customer data and tell you what to build.**

**PRD Creator** (prdcreator.ai) is free and explicitly optimized for AI coding tools with a "Spec-Driven Development" template. **Figma Make** now includes an AI PRD generator within the design ecosystem. **Chisel** and **Forge** offer multi-document generation (PRD → user stories → release notes).

### Idea-to-MVP builders

This category exploded in 2024-2025 and reached massive scale:

| Tool | What it does | Pricing | Scale | Key strength |
|------|-------------|---------|-------|-------------|
| **Cursor** | AI code editor (VS Code fork) with multi-file Agent Mode | $20/mo Pro | **$500M+ ARR; 2M+ users; 360K paying** | Most polished IDE; multi-model; market leader |
| **Bolt.new** | Browser-based AI full-stack builder using WebContainers | ~$20/mo; token-based | **$40M ARR in 6 months** | Zero setup; multi-model; open source |
| **Lovable** (lovable.dev) | Describe → get React/TypeScript/Supabase app with auth and backend | ~$20/mo; credit-based | **$20M ARR in 2 months; $6.6B valuation** | Most beginner-friendly; one-click deploy |
| **v0** (v0.dev) | AI UI component generator from prompts or Figma imports | Free 7 msgs/day; $20/mo | Large Vercel ecosystem | Highest UI fidelity; production-quality shadcn/ui |
| **Replit Agent** | Autonomous agent: build → test → deploy from natural language | Usage-based; simple requests <$0.25 | Large Replit user base | Only true end-to-end (build-test-deploy) without terminal |
| **Claude Code** | Terminal-based agent reading entire codebase; edits, runs commands, commits | $20-200/mo | ~80.8% on SWE-bench; 1M token context | Best architectural reasoning; multi-agent parallel |

### The critical bridge: spec-to-code tools

This is where YC's "Cursor for Product Managers" vision lives. The most aligned tools:

**Pathmode** (pathmode.io) is the most philosophically aligned with the full vision. It compiles user evidence (friction signals, interview quotes, support tickets) into structured "IntentSpecs" — a five-part format (Objective, User Goal, Outcomes, Edge Cases, Verification) designed for both human alignment and machine execution. Its MCP server delivers context directly to AI coding agents. But it's pre-revenue and very early.

**GitHub Spec Kit** (50,000+ stars) is an open-source CLI for Spec-Driven Development — it generates requirements → plan → tasks to guide Cursor, Claude Code, and other agents. Developer-facing, not PM-facing.

**Amazon Kiro** (kiro.dev) is AWS's entry: a VS Code fork with "spec mode" that generates user stories with acceptance criteria, design docs, and dependency-aware task lists. Free preview; $20/mo Pro.

**Mimir** (just launched on Show HN) directly targets the gap: paste customer feedback → get ranked build recommendations in 60 seconds with source quotes → generates build specs and agent tasks for Cursor/Claude Code. Very early.

**Gaps in Layer 4:**

- **PRDs are human-readable, not agent-readable.** Traditional PRDs use prose and assume tribal knowledge. AI agents need precise constraints, measurable outcomes, and verification criteria.
- **No PRD generator ingests raw customer evidence.** ChatPRD, the market leader, starts from a user prompt — not from synthesized feedback data.
- **The handoff between "validated idea" and "buildable spec" is entirely manual.** A PM must interpret research, write requirements, then feed them to a coding tool.
- **The "technical cliff" remains:** Lovable/Bolt generate impressive demos, but the gap between prototype and production is 20-30% manual work. **45% of AI-generated code has security vulnerabilities** (Veracode 2026).

---

## Layer 5: The feedback loop doesn't close

The Feedback Loop Layer — tracking post-launch outcomes and feeding them back into prioritization — is functionally broken. Every tool handles one piece; none connect back to discovery.

### Feedback-to-roadmap tools

| Tool | What it does | Pricing | Good at | Misses |
|------|-------------|---------|---------|--------|
| **Productboard** | Customer-driven PM platform; AI "Pulse" for feedback clustering | $20-80/maker/mo; AI add-on $15-20 | Best strategic roadmapping; deep integrations | Complex (4-8 week setup); expensive per-seat; overkill for solo |
| **Canny** (canny.io) | Feature request voting + roadmap + changelog; revenue-impact scoring | Free (100 users); Starter $79; Growth $399 | Clean UX; fast setup; AI included free; MRR-weighted | Expensive gap between free and Growth; basic analytics |
| **Savio** (savio.io) | B2B feedback tracking enriched with MRR/plan data | **$49/mo** (3 teammates) | MRR-weighted prioritization; affordable | No public voting boards; no changelog |
| **Cycle.app** | Feedback hub with AI auto-tagging + public changelog | $120/mo | Beautiful UX; closes communication loop | **Acquired by Atlassian** — future uncertain |
| **Fider** (fider.io) | Open-source feature voting | Free self-hosted; Cloud $49/mo | Zero cost; full data ownership | No changelog; no integrations; can't close the loop |
| **Quackback** (GitHub) | Open-source: voting + roadmap + changelog + 24 integrations | Free (AGPL-3.0) | Most complete OSS alternative; two-way issue tracker sync | Requires self-hosting |

### Post-launch analytics and revenue tracking

The zero-cost indie stack works well individually:

**PostHog** (posthog.com) is the clear winner for early-stage — open source, 1M free events/month, $50K startup credits, and it replaces Mixpanel + LaunchDarkly + Hotjar + Sentry in one platform. **ProfitWell** (free forever for SaaS metrics, acquired by Paddle) and **ChartMogul** (free under $120K ARR) handle revenue analytics at zero cost. **Google Search Console** is the most underappreciated free tool — shows exact search queries, impressions, clicks, and position.

### The loop never closes

**No tool connects post-launch performance data back to opportunity scoring.** Today's workflow:

1. Collect feedback → Canny/Productboard/Savio
2. Prioritize & build → Jira/Linear + roadmap
3. Ship & notify → changelog
4. Measure impact → PostHog/Mixpanel
5. Decide what's next → **Entirely manual. A PM stares at dashboards, interprets, and updates priorities by hand.**

**Bagel AI** (bagel.ai) is the most ambitious attempt at closing this loop — claiming to connect feedback, product data, and revenue context into a unified intelligence layer — but it's extremely early and unproven.

**Gaps in Layer 5:**

- **Step 5 is 100% manual.** No tool takes "this feature had 23% adoption and improved retention by 4%" and automatically adjusts priority scores.
- **Revenue tracking doesn't flow to feedback tools.** ChartMogul detects a churn spike; Canny never finds out.
- **A/B test results don't update roadmaps.** PostHog runs experiments; Productboard doesn't consume the outcomes.
- **Smoke testing has no dedicated SaaS.** Most teams cobble together Carrd ($19/year) + Google Ads + GA4. **Early Doors** (getearlydoors.com) is the only purpose-built fake-door testing platform.

---

## Chinese tools: mostly irrelevant, but the builder wave matters

### Domestic tools are Baidu-only

**5118.com** (~$420/year) is the Ahrefs of China's internet — the most accurate third-party Baidu keyword tool. **Aizhan.com** is more of a webmaster diagnostic toolkit. Both are **100% Chinese-language, 100% Baidu-ecosystem, zero relevance for English-speaking builders** unless targeting the Chinese market.

### Chinese indie hackers use Western tools

**GeFei** (哥飞), the most influential Chinese indie hacker influencer, explicitly recommends Google Trends, Ahrefs, Semrush, and SimilarWeb to his audience of Chinese developers building English-language niche sites. His "养网站防老" (raise websites for retirement) methodology is identical to Western niche-site-building playbooks. **There is no secret Chinese tool** that gives an edge — Chinese out-to-sea builders use the same stack.

### What matters globally

**Toolify.ai** (~5.1M monthly visits) is the most relevant Chinese-ecosystem output — a massive AI tools directory with traffic estimates across 28,700+ tools. It's useful for spotting growing AI categories and competitive intelligence, though its data should be treated as directional rather than precise. Despite frequent attribution to a Chinese founder, the co-founder appears to be **Jehanzaib Ahmed** (Pakistani-based). The tool has strong Chinese-language support and is popular in Chinese indie-hacker circles as a launch channel.

The **生财有术** (ShengCai YouShu) community (~15,000 members, $330-535/year) and **即刻** (Jike) social platform represent significant methodology and intelligence hubs, but both are Chinese-language-only and primarily relevant as case studies in community-led product discovery rather than as tools.

---

## YC's "Cursor for Product Managers" and who's chasing it

YC's Spring 2026 RFS, authored by Partner Andrew Miklas, explicitly states: *"Writing code is only part of building a product. The most important part is figuring out what to build in the first place. There's no system that supports the full loop of product discovery."* The vision: upload customer interviews and usage data, ask "what should we build next?", and get feature outlines with evidence, proposed UI/data model changes, and agent-ready development tasks.

**No YC-backed company has shipped this vision yet.** The RFS was published February 2026, and teams are racing. The closest attempts:

- **Mimir** (Show HN launch) — paste feedback → ranked recommendations → build specs → agent tasks
- **Pathmode** (pathmode.io) — evidence → IntentSpecs → MCP → coding agents
- **ChatPRD** (100K+ users) — market leader in PM docs but starts from prompts, not evidence
- **Jira Product Discovery** (Atlassian) — scored 90/100 as best overall AI PM tool; connects discovery to delivery
- **Productboard** ($262M raised) — most funded in adjacent space; adding AI Pulse features
- **Pendo** (public company) — acquired Zelta for AI customer intelligence; launched "Listen" discovery tool

**The opportunity remains open.** No single tool spans signal → synthesis → scoring → spec.

---

## Where the market is saturated, where the gaps are

### Most saturated areas
**SEO keyword research** is comprehensively served by Ahrefs, Semrush, and dozens of alternatives. **Idea-to-MVP builders** (Cursor, Bolt, Lovable) have exploded to combined hundreds of millions in ARR. **Product analytics** (PostHog, Mixpanel, Amplitude) is mature and commoditized. Building another keyword tool, another AI app builder, or another analytics dashboard is swimming in red ocean.

### Real gaps at layer boundaries

The most valuable gaps are not within layers but **at the seams between them:**

1. **Signal → Synthesis is unwired.** Reddit mining tools output raw posts. Feedback synthesizers require manual CSV uploads. No pipeline automatically converts community signals into clustered pain themes.

2. **Synthesis → Scoring is nonexistent.** Even if you cluster feedback into themes, no tool scores those themes on demand depth + competition weakness + monetizability using real data APIs.

3. **Scoring → Spec is manual.** A human must interpret a validation report, decide to proceed, then manually write a PRD from scratch in ChatPRD or Notion.

4. **Spec → Feedback Loop is broken.** After shipping, there's no mechanism to evaluate whether the original opportunity thesis was correct and feed that back into discovery.

### Unclaimed territory for indie builders

The **Tier 5 composite opportunity scorer** — combining DataForSEO keyword data + community sentiment + competitor analysis + pricing intelligence into a weighted opportunity score — is the highest-leverage gap. It requires only existing APIs (DataForSEO at $50 deposit, Reddit API, G2 scraper) and a scoring algorithm. No deep ML required.

The **automatic JTBD framer** — taking raw feedback and outputting structured "When I [situation], I want to [motivation], so I can [outcome]" statements — is a pure LLM application that nobody has productized.

The **SaaS pricing page tracker** — monitoring competitor pricing pages and alerting on changes — is trivially buildable with a scraper + diff engine but doesn't exist as a product.

---

## Four MVP paths to build in 2–4 weeks

### MVP 1: Opportunity scorer that pulls real data (recommended first)

**What:** A tool where you enter a product idea (e.g., "invoice reminder tool for freelancers") and get a composite opportunity score based on real data — not AI opinions.

**How it works:** Query DataForSEO for keyword volumes and difficulty around the idea space. Scrape G2/Capterra for the top 5 competitors' review counts and average ratings. Pull SimilarWeb free-tier traffic estimates. Use Reddit search API to count pain-point posts. Run the data through a weighted scoring formula (demand 40%, competition weakness 30%, monetization signal 20%, buildability 10%). Output a one-page report with the score, data tables, and a go/no-go verdict.

**Tech stack:** Next.js or Python/FastAPI backend. DataForSEO API ($50 deposit). Apify for G2 scraping (free tier). Reddit JSON API (free, no auth needed for public data). Claude API for narrative generation (~$0.01/report). Deploy on Vercel/Railway.

**Dogfooding:** Use it yourself to evaluate your next project idea before building. Run 20 ideas through it in a week. If it correctly identifies the best opportunities (compared to your own judgment), it works.

**Monetization:** $5/report (pay-per-use like WorthBuild) or $29/mo for unlimited reports. ValidateMySaaS charges $19-29/mo; WorthBuild charges $5/report. Both have traction with less data integration than this would have.

**Kill criteria (30 days):** Run 50 beta users through it (post on Indie Hackers, r/SaaS, r/startups). If fewer than 5 users come back for a second report unprompted, the output isn't valuable enough. If more than 10 come back, charge money immediately.

**Why this first:** You validate it by using it yourself daily. It's the foundation for every other layer — once you have a scoring engine, you can add signal ingestion upstream and spec generation downstream.

### MVP 2: Reddit-to-opportunity pipeline (filling GummySearch's vacuum)

**What:** An automated pipeline that monitors specific subreddits for pain-point language, clusters similar complaints, and outputs weekly "opportunity briefs" with evidence, frequency scores, and links to original posts.

**How it works:** Use Reddit's JSON API (append `.json` to any subreddit URL — no auth needed) to pull posts from target subreddits daily. Filter for pain-point language (regex + Claude classification: "frustrated with," "looking for," "I wish," "does anyone know," "paying too much"). Store in SQLite. Weekly batch: run BERTopic clustering on accumulated posts, then Claude to generate opportunity briefs for each cluster with representative quotes, frequency count, and a rough demand score.

**Tech stack:** Python script (cron job on Railway or a $5 VPS). SQLite for storage. BERTopic for clustering. Claude API for classification + brief generation (~$2-5/week in API costs). Simple Next.js dashboard or even just a weekly email digest.

**Dogfooding:** Point it at r/SaaS, r/startups, r/smallbusiness, r/freelance, and r/Entrepreneur. Read the weekly briefs yourself. When one surfaces an opportunity you genuinely want to build, the tool is working.

**Monetization:** $19/mo (matches PainOnSocial pricing). Add custom subreddit selection for Pro users at $39/mo. The key differentiator over PainOnSocial: clustering over time (trending pain points, not just a snapshot) and structured opportunity briefs rather than raw pain-point lists.

**Kill criteria (30 days):** If the weekly briefs consistently surface opportunities you already knew about or are obviously low-quality, the clustering and filtering aren't adding value beyond basic Reddit browsing. Target: at least 2 genuinely surprising, non-obvious opportunities per week.

### MVP 3: Evidence-to-spec converter (the "Cursor for PMs" wedge)

**What:** Upload customer feedback (interview transcripts, support tickets, Reddit threads, review excerpts) and get a structured, agent-ready spec — not a traditional PRD, but an IntentSpec with objective, user goal, expected outcomes, edge cases, and verification criteria formatted for Cursor/Claude Code.

**How it works:** User pastes or uploads text (interviews, feedback, etc.). Claude processes through a multi-step prompt chain: (1) extract pain points and JTBD statements, (2) cluster into opportunity themes, (3) rank by frequency and intensity, (4) for the top opportunity, generate an IntentSpec with measurable outcomes and edge cases, (5) output a `.md` file formatted for a `/docs` folder that coding agents can consume.

**Tech stack:** Next.js frontend with a text input/file upload. Claude API (Sonnet for classification, Opus for spec generation). Output as downloadable Markdown. Optional: MCP server endpoint so Cursor/Claude Code can pull the spec directly. Total API cost: ~$0.10-0.50 per spec generation.

**Dogfooding:** Use it every time you start a new feature. Upload your own support tickets or user feedback, generate a spec, feed it to Cursor. Does the agent build something closer to what users actually need?

**Monetization:** Freemium — 3 free specs/month, then $15/mo for unlimited (matching ChatPRD's entry pricing). Differentiation from ChatPRD: evidence-first (starts from customer data, not a blank prompt) and agent-optimized output format.

**Kill criteria (30 days):** Ship 10 specs through the tool and into Cursor/Claude Code. If the resulting features match user intent better than your usual PRD-writing process, continue. If the specs require heavy manual rewriting before an agent can use them, the prompt chain needs fundamental rework.

### MVP 4: SaaS pricing tracker (niche but monetizable)

**What:** Monitor competitor SaaS pricing pages for changes — new tiers, price increases, feature additions, plan restructuring — and alert users.

**How it works:** User enters 5-20 competitor URLs (pricing pages). A daily cron job fetches each page, extracts structured pricing data (plan names, prices, features per plan) using Claude, and diffs against the previous day's snapshot. On any change, send an alert with before/after comparison. Store historical pricing data for trend analysis.

**Tech stack:** Python + Playwright for rendering JavaScript-heavy pricing pages. Claude API for extracting structured pricing from messy HTML (~$0.02/page). PostgreSQL for historical data. Simple dashboard showing pricing timeline per competitor. Deploy on Railway.

**Dogfooding:** Track 20 tools in your own competitive space. See how often pricing changes happen (typically quarterly), what patterns emerge (everyone raising prices? new AI tiers appearing?).

**Monetization:** $29/mo for tracking up to 20 competitors; $79/mo for 100. This targets product managers and competitive intelligence teams — a more enterprise-adjacent buyer. No direct competitor exists.

**Kill criteria (30 days):** If fewer than 3 of your 20 tracked competitors change pricing in 30 days, the alert frequency is too low for ongoing engagement. Pivot to a quarterly pricing report format instead of real-time alerting. If multiple changes occur and the extraction accuracy is >90%, you have a viable product.

---

## Picking your path

**Start with MVP 1 (opportunity scorer).** It's the most self-evidently useful for your own workflow — you'll use it to decide whether to build MVPs 2, 3, or 4. It's technically straightforward (API calls + scoring formula + report template), has clear pricing precedent ($5-29/mo), and directly addresses the Tier 5 gap that no competitor has filled. The scoring engine also becomes the nucleus of a larger system: add Reddit signal ingestion (MVP 2) as the upstream feed, and evidence-to-spec (MVP 3) as the downstream output. Within 3 months, you'd have a pipeline spanning three layers — exactly the integration that YC's RFS calls for and that no current tool provides.

**The meta-insight from this entire landscape:** tools that help people *discover what to build* make less money than tools that help people *build faster* (Cursor: $500M ARR) or *sell what they've built* (Leadmore: $30K MRR in 4 months). The discovery layer is currently subsidized by builders' willingness to do the work manually. The bet is that as AI coding agents make building trivially cheap, the bottleneck shifts permanently upstream to "what should I build?" — and the tool that owns that question captures the new chokepoint.