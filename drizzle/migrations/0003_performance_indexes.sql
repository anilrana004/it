-- Phase 7: query performance indexes for authority and public APIs

CREATE INDEX IF NOT EXISTS "post_sources_post_id_idx" ON "post_sources" ("post_id");

CREATE INDEX IF NOT EXISTS "posts_slug_status_idx"
  ON "posts" ("slug")
  WHERE "status" = 'published';
