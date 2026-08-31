-- Phase 2: related blog junction + tag index

CREATE TABLE IF NOT EXISTS "post_related_blogs" (
  "post_id" uuid NOT NULL REFERENCES "posts"("id") ON DELETE CASCADE,
  "related_post_id" uuid NOT NULL REFERENCES "posts"("id") ON DELETE CASCADE,
  "sort_order" integer DEFAULT 0 NOT NULL,
  PRIMARY KEY ("post_id", "related_post_id")
);

CREATE INDEX IF NOT EXISTS "post_related_blogs_related_idx"
  ON "post_related_blogs" ("related_post_id");

CREATE INDEX IF NOT EXISTS "post_tags_tag_idx"
  ON "post_tags" ("tag");
