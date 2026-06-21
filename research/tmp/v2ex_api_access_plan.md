# V2EX Access Plan

Date: 2026-06-21

Purpose: use V2EX as a Chinese developer/indie-builder evidence source for product ideas, technical-founder pain, AI-tool adoption, launch feedback, validation questions, and payment/positioning objections.

## Status

| Item | Status |
|---|---|
| Public access | Partially ready via old JSON endpoints |
| Official API 2.0 access | Requires V2EX Personal Access Token |
| Token required for API 2.0 node/topic endpoints | Yes |
| Existing Codex MCP/skill | None exposed; not needed |
| Best use for us | Chinese developer scenario mining and launch/idea discussion |

## Official Sources

- API 2.0 Beta: https://www.v2ex.com/help/api
- Personal Access Token: https://www.v2ex.com/help/personal-access-token
- Public API reference examples: https://github.com/djyde/V2EX-API
- API wrapper reference: https://github.com/isaced/V2exAPI

## Access Paths

### 1. Old public JSON endpoints

These can be used immediately for light research.

Examples:

```text
GET https://www.v2ex.com/api/topics/latest.json
GET https://www.v2ex.com/api/topics/hot.json
GET https://www.v2ex.com/api/topics/show.json?id=<topic_id>
GET https://www.v2ex.com/api/topics/show.json?node_name=<node_name>
GET https://www.v2ex.com/api/replies/show.json?topic_id=<topic_id>
GET https://www.v2ex.com/api/nodes/show.json?name=<node_name>
GET https://www.v2ex.com/api/nodes/list.json
```

Use this first if we do not yet have a token.

### 2. Official API 2.0 Beta

Base:

```text
https://www.v2ex.com/api/v2/
```

Auth:

```text
Authorization: Bearer <V2EX_PERSONAL_ACCESS_TOKEN>
```

Important endpoints:

```text
GET nodes/:node_name
GET nodes/:node_name/topics?p=1
GET topics/:topic_id
GET topics/:topic_id/replies?p=1
GET token
GET member
```

Rate limit from official docs:

```text
600 requests/hour/IP by default
```

Rate-limit headers:

```text
X-Rate-Limit-Limit
X-Rate-Limit-Reset
X-Rate-Limit-Remaining
```

## How To Get Token

1. Log in to V2EX.
2. Open the Personal Access Token page:

```text
https://www.v2ex.com/help/personal-access-token
```

3. Click the `Personal Access Token` link from that page.
4. Create a token.
5. Choose a practical expiration; V2EX supports up to 180 days.
6. Save the token immediately. V2EX only shows/downloads the full token for 10 minutes after creation.
7. Store locally only:

```bash
V2EX_PERSONAL_ACCESS_TOKEN=...
```

Do not commit the token.

## Verification

After setting the token locally:

```bash
curl 'https://www.v2ex.com/api/v2/token' \
  -H "Authorization: Bearer $V2EX_PERSONAL_ACCESS_TOKEN"
```

Then test a node:

```bash
curl 'https://www.v2ex.com/api/v2/nodes/create/topics?p=1' \
  -H "Authorization: Bearer $V2EX_PERSONAL_ACCESS_TOKEN"
```

## Useful Nodes For Our Research

Start with:

- `create` - 创意 / building things
- `programmer` - 程序员
- `jobs` - work/career context
- `startup` - startup discussion if active
- `ai` - AI discussion if active
- `share` - product/tool sharing
- `qna` - general questions
- `ideas` - ideas if active
- `webmaster` - maker/site owner context
- `dev` - development context if active

Node availability should be verified through `nodes/list.json` or `nodes/:node_name`.

## Research Queries / Signals

V2EX has weaker built-in search via API, so prefer node browsing plus page/web search.

High-value Chinese queries:

```text
不知道做什么产品
产品没人用
独立开发 产品 验证
AI 工具 没人买
做了一个产品 没用户
MVP 验证
定价 怎么定
落地页 反馈
产品经理 判断
需求 验证
Cursor 做产品
独立开发 收入
```

Web-search fallback:

```text
site:v2ex.com/t "不知道做什么产品"
site:v2ex.com/t "产品没人用"
site:v2ex.com/t "独立开发" "验证"
site:v2ex.com/t "AI 工具" "没人买"
site:v2ex.com/t "定价" "SaaS"
```

## Evidence We Want

| Evidence | Use |
|---|---|
| Developer complaints | Chinese ICP scenario source |
| Tool/product sharing threads | Launch and positioning feedback |
| Replies questioning value | Critic-agent material |
| Pricing debates | WTP and value-risk evidence |
| Indie income posts | Business reality and willingness-to-pay proxy |
| Career/PM transition posts | Beginner PM/user education scenarios |
| AI-tool skepticism | Trust and differentiation constraints |

## Caveats

- V2EX is developer-heavy and not representative of all Chinese buyers.
- Replies can be sarcastic or status-driven; do not overread single comments.
- Public old API endpoints are useful but limited.
- API 2.0 is beta and token-based.
- V2EX evidence is usually social/complaint evidence, not payment proof.

## How It Feeds Our Specs

- `02_user_scenarios.md`: Chinese developer and beginner PM scenarios.
- `05_evidence_model.md`: Chinese social complaint/reply evidence cards.
- `06_decision_policy.md`: use V2EX evidence mostly for `test` and `narrow`, not direct `build`.
- Landing page: Chinese trust language and objections.

## Decision

V2EX should be part of the Chinese-market evidence stack. Use public JSON endpoints immediately; ask user for a Personal Access Token before large-scale node/topic/reply collection.
