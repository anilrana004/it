# Phase 1 — Travel Knowledge Graph + Publishing Architecture

**Project:** Indian Treks  
**Status:** Approved proposal — no implementation in this phase  
**Date:** 2026-08-31  

This document defines the knowledge model, database schema, API surface, and integration plan for evolving the **existing** Admin Blog + Storefront Blog into a Travel Knowledge Platform.

---

## 1. Design principles

1. **Extend, do not replace** — existing Admin Panel, Storefront Blog UI, and `Trek.id` catalog stay intact.
2. **One canonical entity ID** — blogs reference `kedarkantha`, never duplicate a Trek row for publishing.
3. **Explicit relationships over tags** — tags are editorial labels; entities are graph nodes.
4. **Trek remains source of truth for trek facts** — blogs reference facts, do not fork altitude/duration/difficulty.
5. **Deterministic placement** — if not explicitly related, content does not appear on an entity page.
6. **Humans first, machines second** — AEO/GEO structures must be visible and useful to travelers.
7. **No fake authority** — no fabricated experience, sources, ratings, or FAQ schema.
8. **URL stability** — existing public URLs preserved; 301 only when intentionally migrated.
9. **Server-rendered, paginated, indexed** — no client-side fetch of all posts; scale to 10k+.
10. **Phase gates** — each implementation phase stops for review before the next.

---

## 2. Conceptual model

```
┌─────────────────────────────────────────────────────────────┐
│                        PLACEMENT                             │
│  (where content may surface: blog index, trek page, etc.)   │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                        CONTENT                               │
│  Post (blog, guide, news, FAQ article, safety article, …)   │
│  + structured blocks (quick answer, FAQs, answer blocks)      │
└───────────────────────────┬─────────────────────────────────┘
                            │ via post_entity_links
┌───────────────────────────▼─────────────────────────────────┐
│                     RELATIONSHIPS                            │
│  primary_entity (1) + related_entities (N) + cluster role   │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                        ENTITIES                              │
│  trek | trip | destination | safety_topic | departure        │
│  author | reviewer                                           │
│  (trek/trip/destination IDs reference existing static IDs    │
│   until optional future Trek CMS phase)                      │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                   SEARCH / AI LAYER                          │
│  facts refs, sources, freshness, intent, quality signals     │
└─────────────────────────────────────────────────────────────┘
```

### 2.1 Entity types (registry)

| Entity type | Canonical ID source (Phase 2–8) | Example ID | Public URL pattern |
|-------------|--------------------------------|------------|-------------------|
| `trek` | `Trek.id` in `lib/data.ts` | `kedarkantha` | `/treks/kedarkantha` |
| `trip` | Same as trek (alias) | `kedarkantha` | `/trips/kedarkantha` |
| `yatra` | `Trek.id` where `type=yatra` | `kedarnath-yatra` | `/yatra/kedarnath-yatra` |
| `destination` | Region/state registry (new, small) | `uttarakhand` | `/destinations/uttarakhand` (future) |
| `safety_topic` | Curated registry (new, small) | `altitude-sickness` | `/safety/altitude-sickness` (future) |
| `departure` | DB when real departures exist | `dep_2026_08_kedarkantha_01` | TBD |
| `author` | DB | `anil-rana` | `/authors/anil-rana` (future) |
| `reviewer` | DB (optional) | `reviewer-id` | — |

**Rule:** Entity registry validates IDs at publish time. Unknown trek ID → publish error.

### 2.2 Content types (`content_type` enum)

| Value | Purpose | Evergreen? |
|-------|---------|------------|
| `pillar_guide` | Main hub article for a topic cluster | Yes |
| `supporting_guide` | Depth article in cluster | Yes |
| `travel_guide` | General travel planning | Yes |
| `destination_guide` | Destination hub support | Yes |
| `trek_guide` | Trek-specific guide | Yes |
| `packing_guide` | Packing list / gear | Yes |
| `weather_guide` | Seasonal weather | Yes (needs refresh) |
| `seasonal_guide` | Best time / month guides | Yes |
| `cost_guide` | Pricing / budget | Yes (needs refresh) |
| `difficulty_guide` | Difficulty / fitness | Yes |
| `itinerary_guide` | Day-by-day context | Yes |
| `safety_guide` | Safety-focused | Yes |
| `experience_story` | First-hand narrative | Yes |
| `comparison` | X vs Y | Yes |
| `faq_article` | FAQ-focused page | Yes |
| `news_update` | Time-sensitive news | No → archive |
| `travel_fact` | Short factual update | No → archive |

Travel News (`/blog/news/*`) merges into `posts` with `content_type = news_update` and optional `section = travel_news`.

### 2.3 Relationship roles

| Role | Cardinality | Meaning |
|------|-------------|---------|
| `primary` | Exactly 1 per published post | Topical owner (e.g. Trek → kedarkantha) |
| `related` | 0–N | Secondary graph edges |
| `cluster_parent` | 0–1 | Pillar post for this cluster (optional) |
| `mentions` | 0–N | Inline editorial reference |

**Tags ≠ entities.** Tags live in `post_tags` for filtering only; they never drive trek page placement.

### 2.4 Search intent (editorial metadata, not public spam)

Enum: `informational` | `planning` | `commercial_research` | `navigational` | `transactional` | `local` | `comparison`

### 2.5 Content lifecycle (`status`)

`idea` → `brief` → `draft` → `review` → `published` → `archived`

Phase 2 implements: `draft`, `published`, `archived`. Later phases add workflow states.

### 2.6 Content health (`health_status`)

`healthy` | `needs_review` | `outdated` | `archived`

Computed from `last_fact_checked_at`, `updated_at`, editorial flags — not auto-published.

---

## 3. Database choice

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Engine | **PostgreSQL** (Neon or Supabase on Vercel) | Relational graph, JSONB for blocks, mature tooling |
| ORM | **Drizzle ORM** | Light, TypeScript-first, good Next.js App Router fit |
| Migrations | **Drizzle Kit** | Versioned SQL migrations |
| Second DB | **No** | Single source of truth |

Trek catalog **stays in `lib/data.ts` for Phase 2–8**. Entity registry table mirrors valid IDs for validation; sync via seed script from `data.ts`.

---

## 4. Schema proposal

### 4.1 Core tables

#### `authors`

```sql
id              UUID PK
slug            TEXT UNIQUE NOT NULL          -- anil-rana
name            TEXT NOT NULL
bio             TEXT
avatar_url      TEXT
role            TEXT                          -- trek leader, editor, …
expertise       TEXT[]                        -- optional
social_links    JSONB                         -- { instagram, linkedin }
created_at      TIMESTAMPTZ
updated_at      TIMESTAMPTZ
```

#### `posts` (unified blog + travel news)

```sql
id                  UUID PK
slug                TEXT UNIQUE NOT NULL       -- kedarkantha-trek-february
title               TEXT NOT NULL
excerpt             TEXT
content             TEXT NOT NULL              -- markdown
content_format      TEXT DEFAULT 'markdown'    -- markdown | html (future)

status              TEXT NOT NULL              -- draft | published | archived
content_type        TEXT NOT NULL              -- enum above
section             TEXT DEFAULT 'blog'        -- blog | travel_news

author_id           UUID FK → authors
reviewer_id         UUID FK → authors NULL

featured_image_url  TEXT
featured_image_id   UUID FK → media_assets NULL
reading_time_min    INT                        -- computed on save

-- Primary entity (denormalized for query speed; also in post_entity_links)
primary_entity_type TEXT NULL                  -- trek | destination | safety_topic | …
primary_entity_id   TEXT NULL                  -- kedarkantha | uttarakhand | …

search_intent       TEXT NULL
experience_level    TEXT NULL                  -- editorial: first_hand | compiled | news
source_type         TEXT NULL                  -- internal | official | mixed
expert_reviewed     BOOLEAN DEFAULT false
content_freshness   TEXT DEFAULT 'evergreen'   -- evergreen | time_sensitive

published_at        TIMESTAMPTZ NULL
created_at          TIMESTAMPTZ NOT NULL
updated_at          TIMESTAMPTZ NOT NULL
last_fact_checked_at TIMESTAMPTZ NULL

-- SEO
seo_title           TEXT
seo_description     TEXT
canonical_url       TEXT NULL                  -- override only when needed
og_title            TEXT
og_description      TEXT
og_image_url        TEXT
robots              TEXT DEFAULT 'index,follow'

-- Editorial priority for related-content tie-break
editorial_priority  INT DEFAULT 0

-- Lifecycle / health
health_status       TEXT DEFAULT 'healthy'
archived_at         TIMESTAMPTZ NULL
```

**Indexes:** `(status, published_at DESC)`, `(primary_entity_type, primary_entity_id)`, `(content_type)`, `(section, status)`, GIN full-text on `(title, excerpt, content)` optional Phase 6+.

#### `post_entity_links`

```sql
id              UUID PK
post_id         UUID FK → posts ON DELETE CASCADE
entity_type     TEXT NOT NULL
entity_id       TEXT NOT NULL
role            TEXT NOT NULL              -- primary | related | mentions
sort_order      INT DEFAULT 0
created_at      TIMESTAMPTZ

UNIQUE (post_id, entity_type, entity_id, role)  -- except primary enforced 1x via app logic
```

#### `post_tags` (non-entity labels)

```sql
post_id         UUID FK
tag             TEXT NOT NULL                -- winter, snow, beginner (lowercase slug)
PRIMARY KEY (post_id, tag)
```

#### `categories`

```sql
id              UUID PK
slug            TEXT UNIQUE                  -- treks, destinations, safety
name            TEXT NOT NULL
description     TEXT
parent_id       UUID FK → categories NULL
sort_order      INT DEFAULT 0
```

#### `post_categories`

```sql
post_id         UUID FK
category_id     UUID FK
PRIMARY KEY (post_id, category_id)
```

### 4.2 Structured content blocks

#### `post_quick_answers` (AEO — Phase 6+, schema ready Phase 2)

```sql
post_id         UUID PK FK → posts
quick_answer    TEXT                       -- 2–4 sentence summary
key_facts       JSONB                      -- [{ label, value, fact_ref? }]
best_time       TEXT NULL
duration        TEXT NULL                  -- or fact_ref to trek
difficulty      TEXT NULL
altitude        TEXT NULL
location        TEXT NULL
starting_point  TEXT NULL
estimated_cost  TEXT NULL
who_it_is_for   TEXT NULL
safety_note     TEXT NULL
display         BOOLEAN DEFAULT true       -- only show when populated
```

Values that exist on Trek should use **fact references**, not duplicated strings (see §5).

#### `post_faqs`

```sql
id              UUID PK
post_id         UUID FK
sort_order      INT
question        TEXT NOT NULL
answer          TEXT NOT NULL
source_id       UUID FK → sources NULL
created_at      TIMESTAMPTZ
```

#### `post_answer_blocks`

```sql
id              UUID PK
post_id         UUID FK
sort_order      INT
question        TEXT
answer          TEXT
context         TEXT NULL                  -- source / internal note
source_id       UUID FK → sources NULL
```

#### `sources`

```sql
id              UUID PK
source_title    TEXT NOT NULL
source_url      TEXT
source_type     TEXT NOT NULL              -- official_government | tourism_board | …
accessed_at     DATE NULL
created_at      TIMESTAMPTZ
```

#### `post_sources`

```sql
post_id         UUID FK
source_id       UUID FK
claim           TEXT NULL                    -- optional claim this supports
verified_at     DATE NULL
PRIMARY KEY (post_id, source_id)
```

#### `post_author_experience`

```sql
post_id         UUID PK FK
author_id       UUID FK
visited_at      DATE NULL                    -- YYYY-MM or full date
route_notes     TEXT NULL
field_notes     TEXT NULL
first_hand      BOOLEAN DEFAULT false
```

### 4.3 Media (Phase 8+)

#### `media_assets`

```sql
id              UUID PK
cloudinary_id   TEXT
url             TEXT NOT NULL
alt             TEXT
caption         TEXT
credit          TEXT
width           INT
height          INT
entity_type     TEXT NULL
entity_id       TEXT NULL
created_at      TIMESTAMPTZ
```

### 4.4 Entity registry (validation mirror)

#### `entity_registry`

```sql
entity_type     TEXT NOT NULL
entity_id       TEXT NOT NULL
title           TEXT NOT NULL
canonical_url   TEXT NOT NULL
region          TEXT NULL                    -- for destinations/treks
is_active       BOOLEAN DEFAULT true
metadata        JSONB                        -- lightweight display helpers
PRIMARY KEY (entity_type, entity_id)
```

Seeded from `lib/data.ts` treks + small destination/safety registries. **Not a duplicate trek catalog** — read-only mirror for joins and admin selectors.

### 4.5 Topic clusters (Phase 12+)

#### `topic_clusters`

```sql
id              UUID PK
slug            TEXT UNIQUE                  -- kedarkantha
name            TEXT NOT NULL
pillar_post_id  UUID FK → posts NULL
primary_entity_type TEXT NOT NULL
primary_entity_id   TEXT NOT NULL
```

#### `cluster_members`

```sql
cluster_id      UUID FK
post_id         UUID FK
cluster_role    TEXT                         -- pillar | supporting
PRIMARY KEY (cluster_id, post_id)
```

### 4.6 Internal links (Phase 12+)

#### `post_internal_links`

```sql
id              UUID PK
post_id         UUID FK
link_type       TEXT                         -- entity | post | url
target_entity_type TEXT NULL
target_entity_id   TEXT NULL
target_post_id     UUID NULL
target_url         TEXT NULL
anchor_text        TEXT
sort_order         INT
```

Prefer entity references; URL fallback for external only.

### 4.7 Cannibalization hints (Phase 15+)

#### `content_similarity_flags`

```sql
id              UUID PK
post_id_a       UUID FK
post_id_b       UUID FK
similarity_score FLOAT
intent_overlap   BOOLEAN
status          TEXT DEFAULT 'open'          -- open | dismissed | merged
created_at      TIMESTAMPTZ
```

---

## 5. Fact system

### 5.1 Canonical facts (Phase 2–8: read from code, not DB)

Trek facts remain in `Trek` interface:

- `maxAltitude`, `days`, `nights`, `duration`, `difficulty`, `bestSeason`, `startEndPoint`, `region`, `state`, pricing tiers

**Service:** `getEntityFacts(entityType, entityId)` reads from `getTrekById()` when `entity_type === 'trek'`.

### 5.2 Fact references in content

Post quick-answer fields may store:

```json
{ "label": "Altitude", "factRef": { "entityType": "trek", "entityId": "kedarkantha", "field": "maxAltitude" } }
```

At render time, resolve from canonical trek data. If trek data changes, blog displays update without manual edits.

### 5.3 Freshness (Phase 13+)

| Field | Purpose |
|-------|---------|
| `posts.last_fact_checked_at` | Editorial verification timestamp |
| `post_sources.verified_at` | Per-source verification |
| `health_status` | Computed warning states |

UI shows: “Last updated”, “Fact checked” **only when accurate**.

---

## 6. API surface

All admin routes require session auth (middleware Phase 2).

### 6.1 Public (read-only, server-side)

| Function / Route | Purpose |
|------------------|---------|
| `getPostBySlug(slug)` | Single post + blocks + author |
| `getPublishedPosts({ section, page, limit })` | Paginated listing |
| `getBlogsByEntity(type, id, { role, limit })` | Trek page related blogs |
| `getRelatedPosts(entity, { limit })` | Deterministic related engine |
| `getTopicCluster(entityType, entityId)` | Cluster dashboard data |
| `getEntityFacts(type, id)` | Canonical facts |
| `searchContent(query, { types, limit })` | Unified search Phase 10+ |

**Route handlers (optional thin wrappers):**

- `GET /api/public/posts?slug=`
- `GET /api/public/posts/by-entity?type=trek&id=kedarkantha`

Prefer **direct server functions** in RSC over client fetch.

### 6.2 Admin

| Route | Methods | Purpose |
|-------|---------|---------|
| `/api/admin/posts` | GET, POST | List / create |
| `/api/admin/posts/[id]` | GET, PATCH, DELETE | CRUD |
| `/api/admin/posts/[id]/publish` | POST | Publish + revalidate |
| `/api/admin/posts/[id]/validate` | POST | Pre-publish checks |
| `/api/admin/entities/search` | GET | Entity selector |
| `/api/admin/authors` | CRUD | Author management |
| `/api/admin/media/upload` | POST | Cloudinary signed upload Phase 8 |

### 6.3 Revalidation

On publish/update/archive:

```ts
revalidatePath('/blog')
revalidatePath(`/blog/${slug}`)
revalidatePath(`/treks/${trekId}`)  // when primary entity is trek
revalidateTag(`entity:trek:${trekId}`)
```

---

## 7. Admin UI extension plan (existing panel)

**File to extend:** `src/app/admin-360f71bc8e5da924/blog/page.tsx`

### Phase 3 scope (minimal viable editor)

| Section | Fields |
|---------|--------|
| Content | title, slug, excerpt, markdown body, featured image |
| Classification | content_type, section, status |
| Primary entity | type dropdown + search selector |
| Related entities | multi-select |
| Author | author dropdown |
| SEO | seo_title, seo_description, canonical override |
| Actions | Save draft, Publish, Validate |

### Later phases add

- Quick answer / key facts (Phase 6)
- FAQs / answer blocks (Phase 6)
- Sources (Phase 13)
- Placement preview (Phase 12)
- Content health dashboard (Phase 14)
- AI suggestions panel — **read-only, admin approves** (Phase 15)

**Do not** create a new admin route tree.

---

## 8. Storefront integration plan (existing UI)

### Phase 5 — data layer swap only

| Page | Change |
|------|--------|
| `/blog` | `BlogPageView` reads `getPublishedPosts()` instead of `blogPosts[]` |
| `/blog/[slug]` | `BlogPostPageView` reads `getPostBySlug()` |
| `/blog/news` | Filter `section=travel_news` |
| Homepage teasers | Read from DB or static fallback during migration |
| `TrekDetailContent` related blogs | `getBlogsByEntity('trek', trek.id)` — **no latest-post fallback** |

**Keep:** `BlogHeader`, `BlogSidebar`, `blog-page.css`, layout structure.

### Fallback strategy (migration window)

```ts
const posts = await getPublishedPostsFromDb()
return posts.length ? posts : getStaticBlogFallback() // remove after seed verified
```

---

## 9. URL preservation

| URL | Action |
|-----|--------|
| `/blog/[slug]` | **Preserve** — 5 existing slugs seeded with same slugs |
| `/blog/news/[slug]` | **Preserve** — travel news slugs seeded |
| `/blog/news` | **Preserve** |
| Future: `/blog/treks/kedarkantha` | Optional hub URL Phase 12 — not required initially |

**Canonical:** Post’s canonical URL defaults to `https://www.indiantreks.in/blog/{slug}` unless override set.

**Redirects:** Only via explicit `redirects` in `next.config.ts` when merging duplicate posts (Phase 15).

---

## 10. Related content engine (replaces heuristic fallback)

### Priority order (Phase 12)

1. Same **primary entity** (published, not archived)
2. Explicit **related** entity link
3. Same **topic cluster** membership
4. Shared **category** (tie-breaker only)
5. **Editorial priority** DESC
6. **published_at** DESC

**Remove:** filling with unrelated latest posts on trek pages.

### Query sketch

```sql
SELECT p.* FROM posts p
JOIN post_entity_links l ON l.post_id = p.id
WHERE p.status = 'published'
  AND l.entity_type = 'trek' AND l.entity_id = $1
  AND (l.role = 'primary' OR l.role = 'related')
ORDER BY
  CASE l.role WHEN 'primary' THEN 0 ELSE 1 END,
  p.editorial_priority DESC,
  p.published_at DESC
LIMIT $2;
```

---

## 11. SEO & structured data plan (Phase 11)

### Phase 11 deliverables

- `app/sitemap.ts` — posts, treks (from registry), destinations when live
- `app/robots.ts` — disallow `/admin-*`, `/api/admin`
- `generateMetadata` on trek pages
- JSON-LD on blog posts: `BlogPosting` + `BreadcrumbList` + `Person` (author)
- Visible breadcrumbs on blog articles
- OG tags from post fields

### Explicitly NOT in early phases

- Fake `AggregateRating` / reviews
- FAQ schema unless FAQs are visible and accurate
- Mass location doorway pages

---

## 12. Seed & migration plan (Phase 2)

### Step 1 — Seed entity registry

From `lib/data.ts` export all `Trek.id` → `entity_registry` with `canonical_url` from `trekDetailPath()`.

Add destinations: `uttarakhand`, `himachal`, `nepal`, `kashmir`.

Add initial safety topics: `altitude-sickness`, `weather`, `permits`, `fitness`.

### Step 2 — Seed authors

- Default: `indian-treks-team` (maps existing “Indian Treks Team”)

### Step 3 — Seed posts

| Source slug | Primary entity | Notes |
|-------------|----------------|-------|
| `family-trekking-in-india` | — or multi related treks | No single primary; pick `trek`/`destination` or leave primary null with related links |
| `valley-of-flowers-guide` | trek → `valley-of-flowers` | Clear primary |
| `first-himalayan-trek` | — | Informational; related treks optional |
| `best-places-india-july` | destination → `uttarakhand`? | Editorial choice |
| `group-travel-himalayas` | — | Generic |
| 7× travel-news slugs | section=`travel_news`, type=`news_update` | Preserve `/blog/news/*` |

### Step 4 — Verify URLs

Run build; confirm all 12 URLs resolve identically.

### Step 5 — Remove static fallback

After verification, deprecate hardcoded `blogPosts[]` array (keep types).

---

## 13. Security (Phase 2)

- `middleware.ts` — protect `/admin-360f71bc8e5da924/*` except login
- Session: HTTP-only signed cookie (replace `admin_token=authenticated`)
- Admin API routes require session
- Remove unauthenticated `GET /api/bookings`, `GET /api/contacts` or gate behind admin
- Rate limit public POST endpoints

---

## 14. File plan (Phase 2–5 preview)

### Create (Phase 2)

```
drizzle.config.ts
src/lib/db/index.ts
src/lib/db/schema/*.ts
drizzle/migrations/*
src/lib/knowledge/entity-registry.ts
src/lib/knowledge/posts.ts          -- getPostBySlug, etc.
src/lib/knowledge/types.ts
scripts/seed-knowledge.ts
middleware.ts
src/app/api/admin/posts/route.ts
```

### Modify (Phase 3–5)

```
src/app/admin-360f71bc8e5da924/blog/page.tsx
src/lib/blog.ts                     -- types + fallback shim
src/app/blog/page.tsx
src/app/blog/[slug]/page.tsx
src/components/TrekDetailContent.tsx
.env.example                        -- DATABASE_URL
package.json                        -- drizzle-orm, drizzle-kit, postgres driver
```

### Leave untouched (until later phases)

```
src/lib/data.ts                     -- trek catalog
src/components/blog/BlogPageView.tsx  -- layout/CSS only; data via props
src/components/blog/BlogHeader.tsx
Booking / checkout / payment flows
Help Centre content modules
```

---

## 15. Implementation roadmap (stop after each)

| Phase | Deliverable | Stop gate |
|-------|-------------|-----------|
| **0** | Audit | ✅ Done |
| **1** | This document | ✅ Done |
| **2** | PostgreSQL + Drizzle schema + migrations + seed + entity registry | Review schema in DB |
| **3** | Admin blog CRUD wired to API (draft/publish, primary entity selector) | Admin can publish to DB |
| **4** | Public blog reads DB with static fallback | `/blog` shows seeded posts |
| **5** | Remove fallback; trek related blogs deterministic | Trek pages show correct posts only |
| **6** | Quick answer, FAQs, answer blocks UI + render | AEO blocks visible when populated |
| **7** | Trip/yatra entity parity | Same engine for all trek IDs |
| **8** | Destination registry + hub pages (minimal) | Uttarakhand hub v1 |
| **9** | Safety topic registry + linking | Safety articles link to topics |
| **10** | Upcoming departure entity (when real data exists) | — |
| **11** | Sitemap, robots, JSON-LD, trek metadata | SEO audit |
| **12** | Topic clusters + internal link engine + placement preview | Kedarkantha cluster v1 |
| **13** | Sources + fact freshness + content health | Editorial workflow |
| **14** | Search Console / analytics hooks | Dashboard v1 |
| **15** | AI editorial assistant (suggest-only) | — |
| **16** | Performance, security hardening, tests | Production sign-off |

---

## 16. Kedarkantha reference cluster (target state)

```
entity_registry: trek/kedarkantha → /treks/kedarkantha

Pillar (primary_entity: trek/kedarkantha, content_type: pillar_guide):
  "Kedarkantha Trek Guide"

Supporting (primary or related: trek/kedarkantha):
  - Cost Guide
  - Difficulty Guide
  - Best Time / December / January / February / March
  - Packing Guide
  - Itinerary Guide
  - Weather Guide
  - Safety Guide (related: safety_topic/altitude-sickness)
  - Beginner Guide
  - Photography Guide

Trek page (/treks/kedarkantha):
  - Shows pillar + top N supporting (by editorial_priority)
  - Links to full cluster on /blog?entity=trek:kedarkantha (optional)

Each supporting article:
  - Links back to /treks/kedarkantha in intro or "Plan this trek" CTA
  - Uses fact refs for altitude, duration, difficulty from Trek entity
```

---

## 17. Phase 1 completion checklist

| Item | Status |
|------|--------|
| Entity / Content / Relationship model defined | ✅ |
| PostgreSQL + Drizzle recommended | ✅ |
| Full schema proposed | ✅ |
| Canonical ID strategy documented | ✅ |
| API surface defined | ✅ |
| Admin extension plan (no new panel) | ✅ |
| Storefront integration plan (no rebuild) | ✅ |
| URL preservation plan | ✅ |
| Seed/migration plan | ✅ |
| Phase 2–16 roadmap | ✅ |
| Code modified | ❌ None |
| Database created | ❌ None |

---

**STOP — Phase 1 complete.**

Approve **Phase 2** to implement: PostgreSQL + Drizzle schema + migrations + entity registry seed + core `getPostBySlug` / admin POST API.
