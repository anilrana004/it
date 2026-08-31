-- Phase 2: Travel Knowledge Graph core schema

CREATE TABLE IF NOT EXISTS "authors" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "slug" text NOT NULL UNIQUE,
  "name" text NOT NULL,
  "bio" text,
  "avatar_url" text,
  "role" text,
  "expertise" text[],
  "social_links" text,
  "created_at" timestamptz DEFAULT now() NOT NULL,
  "updated_at" timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "categories" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "slug" text NOT NULL UNIQUE,
  "name" text NOT NULL,
  "description" text,
  "parent_id" uuid,
  "sort_order" integer DEFAULT 0 NOT NULL
);

CREATE TABLE IF NOT EXISTS "posts" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "slug" text NOT NULL UNIQUE,
  "title" text NOT NULL,
  "excerpt" text,
  "content" text NOT NULL,
  "content_format" text DEFAULT 'markdown' NOT NULL,
  "status" text NOT NULL,
  "content_type" text NOT NULL,
  "section" text DEFAULT 'blog' NOT NULL,
  "author_id" uuid REFERENCES "authors"("id"),
  "reviewer_id" uuid REFERENCES "authors"("id"),
  "featured_image_url" text,
  "reading_time_min" integer,
  "primary_entity_type" text,
  "primary_entity_id" text,
  "search_intent" text,
  "experience_level" text,
  "source_type" text,
  "expert_reviewed" boolean DEFAULT false NOT NULL,
  "content_freshness" text DEFAULT 'evergreen' NOT NULL,
  "published_at" timestamptz,
  "created_at" timestamptz DEFAULT now() NOT NULL,
  "updated_at" timestamptz DEFAULT now() NOT NULL,
  "last_fact_checked_at" timestamptz,
  "seo_title" text,
  "seo_description" text,
  "canonical_url" text,
  "og_title" text,
  "og_description" text,
  "og_image_url" text,
  "robots" text DEFAULT 'index,follow' NOT NULL,
  "editorial_priority" integer DEFAULT 0 NOT NULL,
  "health_status" text DEFAULT 'healthy' NOT NULL,
  "archived_at" timestamptz
);

CREATE TABLE IF NOT EXISTS "post_entity_links" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "post_id" uuid NOT NULL REFERENCES "posts"("id") ON DELETE CASCADE,
  "entity_type" text NOT NULL,
  "entity_id" text NOT NULL,
  "role" text NOT NULL,
  "sort_order" integer DEFAULT 0 NOT NULL,
  "created_at" timestamptz DEFAULT now() NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS "post_entity_links_unique"
  ON "post_entity_links" ("post_id", "entity_type", "entity_id", "role");

CREATE TABLE IF NOT EXISTS "post_tags" (
  "post_id" uuid NOT NULL REFERENCES "posts"("id") ON DELETE CASCADE,
  "tag" text NOT NULL,
  PRIMARY KEY ("post_id", "tag")
);

CREATE TABLE IF NOT EXISTS "post_categories" (
  "post_id" uuid NOT NULL REFERENCES "posts"("id") ON DELETE CASCADE,
  "category_id" uuid NOT NULL REFERENCES "categories"("id") ON DELETE CASCADE,
  PRIMARY KEY ("post_id", "category_id")
);

CREATE TABLE IF NOT EXISTS "entity_registry" (
  "entity_type" text NOT NULL,
  "entity_id" text NOT NULL,
  "title" text NOT NULL,
  "canonical_url" text NOT NULL,
  "region" text,
  "is_active" boolean DEFAULT true NOT NULL,
  "metadata" jsonb,
  PRIMARY KEY ("entity_type", "entity_id")
);

CREATE TABLE IF NOT EXISTS "post_quick_answers" (
  "post_id" uuid PRIMARY KEY REFERENCES "posts"("id") ON DELETE CASCADE,
  "quick_answer" text,
  "key_facts" jsonb,
  "best_time" text,
  "duration" text,
  "difficulty" text,
  "altitude" text,
  "location" text,
  "starting_point" text,
  "estimated_cost" text,
  "who_it_is_for" text,
  "safety_note" text,
  "display" boolean DEFAULT true NOT NULL
);

CREATE INDEX IF NOT EXISTS "posts_status_published_at_idx"
  ON "posts" ("status", "published_at" DESC);

CREATE INDEX IF NOT EXISTS "posts_primary_entity_idx"
  ON "posts" ("primary_entity_type", "primary_entity_id");

CREATE INDEX IF NOT EXISTS "posts_content_type_idx"
  ON "posts" ("content_type");

CREATE INDEX IF NOT EXISTS "posts_section_status_idx"
  ON "posts" ("section", "status");

CREATE INDEX IF NOT EXISTS "post_entity_links_entity_idx"
  ON "post_entity_links" ("entity_type", "entity_id");
