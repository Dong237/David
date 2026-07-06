# Zhihu API Access Plan

Temporary note for future evidence mining. Do not commit secrets here.

Date: 2026-06-21

Source docs:

- Authorization: https://developer.zhihu.com/docs?key=authorization
- Docs JSON: https://developer.zhihu.com/console/api/v2/docs

## Current Status

We have enough to use Zhihu's official developer platform for research evidence collection.

Installed globally on this machine:

| Skill | Path |
|---|---|
| `zhihu-search` | `~/.codex/skills/zhihu-search` |
| `global-search` | `~/.codex/skills/global-search` |
| `zhida` | `~/.codex/skills/zhida` |
| `hot-list` | `~/.codex/skills/hot-list` |

The skill scripts passed non-secret `--help` checks. Restart Codex to expose them in the normal skill list.

Available integration paths:

| Path | Status | Use Now? | Notes |
|---|---|---:|---|
| REST API | Documented and usable | Yes | Best first path for our research collector. |
| Skill zip | Documented/downloadable | Later | Useful if we want to install a Codex skill package. |
| MCP over SSE | Documented | Later | Needs MCP server registration/exposure in Codex config before it appears as a tool. |

No Zhihu MCP tool is currently exposed in this Codex session.

## Secret Handling

Use local environment variable:

```bash
ZHIHU_ACCESS_SECRET=...
```

Do not store the Access Secret in Markdown, source files, screenshots, or logs.

All API calls require:

```http
Authorization: Bearer <ZHIHU_ACCESS_SECRET>
X-Request-Timestamp: <unix_seconds>
Content-Type: application/json
```

## REST Endpoints

### Zhihu Search

Use this for Zhihu-site evidence mining.

```http
GET https://developer.zhihu.com/api/v1/content/zhihu_search
```

Query params:

| Param | Required | Limit |
|---|---:|---|
| `Query` | yes | non-empty |
| `Count` | no | default 10, max 10 |

Useful result fields:

- `Title`
- `ContentType`
- `ContentID`
- `ContentText`
- `Url`
- `CommentCount`
- `VoteUpCount`
- `AuthorName`
- `EditTime`
- `CommentInfoList`
- `AuthorityLevel`
- `RankingScore`

### Global Search

Use this for wider Chinese web evidence when we want to filter sources like 人人都是产品经理.

```http
GET https://developer.zhihu.com/api/v1/content/global_search
```

Query params:

| Param | Required | Limit |
|---|---:|---|
| `Query` | yes | non-empty |
| `Count` | no | default 10, max 20 |
| `Filter` | no | host/time filter expression |
| `SearchDB` | no | `all`, `realtime`, `static`; default `all` |

Filter examples:

```text
host=="woshipm.com"
publish_time>=1704067200
host=="woshipm.com" AND publish_time>=1704067200
```

Do not use `host=="zhihu.com"` in global search; docs say use `zhihu_search` for Zhihu-site content.

### Hot List

Use this for trend/context monitoring, not primary scenario proof.

```http
GET https://developer.zhihu.com/api/v1/content/hot_list
```

Query params:

| Param | Required | Limit |
|---|---:|---|
| `Limit` | no | default 30, max 30 |

## MCP Endpoints From Docs

The docs expose MCP endpoints, but they are not installed as tools in this Codex session.

| Tool | Transport | SSE URL | Tool Name |
|---|---|---|---|
| Zhihu search | MCP over SSE | `https://developer.zhihu.com/api/mcp/zhihu_search/v1/sse` | `zhihu_search` |
| Global search | MCP over SSE | `https://developer.zhihu.com/api/mcp/global_search/v1/sse` | `global_search` |
| Hot list | MCP over SSE | `https://developer.zhihu.com/api/mcp/hot_list/v1/sse` | `hot_list` |

MCP flow:

1. Connect to the SSE URL with `Authorization: Bearer <secret>`.
2. Server sends an `endpoint` event with message URL and `sessionId`.
3. Send MCP `initialize`, `tools/list`, and `tools/call` requests to that message URL.
4. Tool result is text/XML designed for model consumption.

For Codex-native use, configure these MCP servers in the local MCP config first. Until then, use REST API.

## Skill Downloads

Docs list downloadable skills such as:

- `https://developer.zhihu.com/download/zhihu_search_skills.zip`
- `https://developer.zhihu.com/download/global_search_skills.zip`
- `https://developer.zhihu.com/download/hot_list_skills.zip`

Use later if we want a local Codex skill wrapper.

## Research Collector Strategy

Goal: strengthen Chinese scenario evidence for `02_user_scenarios.md`.

Start with keyword batches:

```text
AI 写代码 不知道做什么
会写代码 不知道做什么产品
独立开发 不知道做什么
产品经理 转行 不知道怎么做
初级产品经理 需求优先级 判断
产品经理 tradeoff 取舍
AI 产品经理 判断力
产品做了一半 价值不清楚
产品没人用 怎么办
上线 没人用 没有付费
```

For each result, convert to Evidence Cards:

| Field | Source |
|---|---|
| source_type | `complaint`, `review`, `expert_or_founder_opinion`, or `search_demand` |
| source_name | Zhihu / Global Search / source host |
| source_url | API result `Url` |
| observed_at | `EditTime` when available |
| extracted_claim | narrow claim supported by result |
| pain_phrase | exact user wording if present |
| wtp_hint | payment, paid alternative, costly workaround, or none |
| confidence | based on relevance, recency, source quality, sample size |

Decision rule:

- Search snippets and article summaries can validate scenario language.
- They do not prove willingness to pay.
- Payment evidence must still come from paid diagnosis tests or explicit paid/costly behavior.

## Minimal Curl Template

```bash
curl -G 'https://developer.zhihu.com/api/v1/content/zhihu_search' \
  --data-urlencode 'Query=AI 写代码 不知道做什么' \
  --data-urlencode 'Count=10' \
  -H "Authorization: Bearer $ZHIHU_ACCESS_SECRET" \
  -H "X-Request-Timestamp: $(date +%s)" \
  -H 'Content-Type: application/json'
```

Global search with host filter:

```bash
curl -G 'https://developer.zhihu.com/api/v1/content/global_search' \
  --data-urlencode 'Query=初级产品经理 需求优先级 判断' \
  --data-urlencode 'Count=20' \
  --data-urlencode 'Filter=host=="woshipm.com" AND publish_time>=1704067200' \
  --data-urlencode 'SearchDB=all' \
  -H "Authorization: Bearer $ZHIHU_ACCESS_SECRET" \
  -H "X-Request-Timestamp: $(date +%s)" \
  -H 'Content-Type: application/json'
```

## What This Does Not Give Us

- Not a full Zhihu crawler.
- Not guaranteed full answer/comment bodies.
- Not payment evidence.
- Not XHS/Jike evidence.

It gives official, structured search access strong enough for Chinese complaint/evidence mining.
