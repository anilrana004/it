# New Phase 2 — Blog Data Model + Publishing Core Complete

**Project:** Indian Treks  
**Status:** Complete — awaiting approval for New Phase 3  
**Date:** 2026-08-31  

---

## Objective

Build the production-ready blog knowledge and relationship layer connected to canonical travel entities, migrate static content into Postgres, and prepare the storefront adapter — without swapping live UI yet.

---

## What Was Reused

- PostgreSQL + Drizzle schema from Phase 1 (`posts`, `post_entity_links`, `post_tags`, `categories`, `authors`, `entity_registry`)
- Canonical trek IDs from `src/lib/data.ts`
- Static content sources (`blog.ts`, `travel-news.ts`) as migration input + fallback
- Storefront pages and admin UI (unchanged)
- Phase 1 validation, registry, and revalidation infrastructure

---

## What Was Created

| File | Purpose |
|------|---------|
| `src/lib/db/schema/post-related.ts` | `post_related_blogs` junction table |
| `drizzle/migrations/0001_post_related_blogs.sql` | Migration for related blogs + tag index |
| `src/lib/knowledge/entity-links.ts` | Primary entity sync + alias matching |
| `src/lib/knowledge/categories.ts` | Category list/get helpers |
| `src/lib/knowledge/adapter.ts` | DB ↔ legacy `BlogPost` bridge with static fallback |
| `src/app/api/admin/categories/route.ts` | Admin category list |
| `src/app/api/admin/posts/[id]/publish/route.ts` | Controlled publish transition |
| `src/app/api/admin/posts/[id]/archive/route.ts` | Controlled archive transition |

---

## What Was Modified

| File | Change |
|------|--------|
| `src/lib/knowledge/types.ts` | Categories, pagination, related-post filters, `relatedPostIds` |
| `src/lib/knowledge/posts.ts` | Pagination, entity queries, related posts, publish/archive, category + related blog CRUD |
| `src/app/api/public/posts/route.ts` | Pagination total, tag/category filters, related query |
| `scripts/seed-knowledge.ts` | Full content migration, entity links, related blog links |
| `scripts/migrate.ts` | Runs all SQL migrations in order |
| `scripts/verify-foundation.ts` | Phase 2 entity + pagination checks |
| `src/lib/knowledge/index.ts` | Exports adapter, categories, entity-links |

---

## Data Model (Phase 2)

### Core post fields (DB)
`draft` | `published` | `archived`, slug, title, excerpt, content, author, featured image, SEO fields, `primary_entity_type/id`, `published_at`, `updated_at`, `archived_at`

### Relationships (junction tables)
| Table | Purpose |
|-------|---------|
| `post_entity_links` | Primary + related trek/trip/yatra/destination/region/safety links |
| `post_tags` | Editorial tags |
| `post_categories` | Category assignment |
| `post_related_blogs` | Explicit post → post editorial links |

### Query API (server layer)
| Function | Purpose |
|----------|---------|
| `getPublishedPostsPaginated()` | Paginated published list with total count |
| `getPostsByEntity()` | Entity page placement (links + primary entity, alias-aware) |
| `getRelatedPosts()` | Priority-ranked related content |
| `publishPost()` / `archivePost()` | Controlled state transitions |
| `fetchPublishedBlogPost()` etc. | Adapter with static fallback |

### Related content priority
1. Explicit `post_related_blogs` links  
2. Same primary entity  
3. Shared related entity links  
4. Shared category  
5. Shared tags  
6. Editorial priority + recency  

---

## Migration

- **12 posts** seeded from static content (5 blog + 7 travel news)
- **Full article bodies** preserved for blog posts; travel news uses storefront-equivalent body template
- **Entity links** derived from `treks[]`, `regions[]`, and editorial maps
- **Related blog links** seeded for valley-of-flowers and family-trekking articles
- Static files **not deleted** — remain fallback until Phase 4

Run after setting `DATABASE_URL`:

```bash
npm run db:migrate
npm run db:seed
npm run db:verify
```

---

## Publishing Rules

- Public API returns **published only** (`getPublishedPostBySlug`)
- Drafts never exposed via `/api/public/posts`
- Publish validates slug, content, author, SEO fields, entity references
- `POST /api/admin/posts/[id]/publish` triggers validation + revalidation hooks

---

## Build Status

| Check | Result |
|-------|--------|
| `npm run build` | **Pass** (175 routes) |
| TypeScript | **Pass** |
| Storefront UI | **Unchanged** (still static) |
| Admin UI | **Unchanged** (still localStorage) |

---

## Manual Testing (with DATABASE_URL)

1. `npm run db:migrate && npm run db:seed && npm run db:verify`
2. `GET /api/public/posts?limit=5` → `{ posts, total, limit, offset }`
3. `GET /api/public/posts?entityType=trek&entityId=kedarkantha` → family-trekking + related
4. `GET /api/public/posts?relatedTo=valley-of-flowers-guide` → related guides
5. `POST /api/admin/posts/[id]/publish` → 400 if validation fails, 200 when valid

---

## Risks / Deferred to Phase 3+

1. Admin UI still uses localStorage — Phase 3 wires editor to DB APIs  
2. Storefront still reads static arrays — Phase 4 uses adapter  
3. Sources, FAQ, answer blocks, media — Phase 6+ scaffolds only  
4. Upcoming departure entity — no real departure DB yet  

---

## STOP — New Phase 2 Complete

Approve **New Phase 3** (Admin Blog + Editorial Workflow) to wire the existing admin blog page to the publishing APIs.
