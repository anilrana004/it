-- Phase 6: Content authority — sources, FAQs, topic clusters

CREATE TABLE IF NOT EXISTS "sources" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "source_title" text NOT NULL,
  "source_url" text,
  "source_type" text NOT NULL,
  "accessed_at" date,
  "created_at" timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "post_sources" (
  "post_id" uuid NOT NULL REFERENCES "posts"("id") ON DELETE CASCADE,
  "source_id" uuid NOT NULL REFERENCES "sources"("id") ON DELETE CASCADE,
  "claim" text,
  "verified_at" date,
  PRIMARY KEY ("post_id", "source_id")
);

CREATE TABLE IF NOT EXISTS "post_faqs" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "post_id" uuid NOT NULL REFERENCES "posts"("id") ON DELETE CASCADE,
  "sort_order" integer DEFAULT 0 NOT NULL,
  "question" text NOT NULL,
  "answer" text NOT NULL
);

CREATE INDEX IF NOT EXISTS "post_faqs_post_id_idx" ON "post_faqs" ("post_id");

CREATE TABLE IF NOT EXISTS "topic_clusters" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "slug" text NOT NULL UNIQUE,
  "name" text NOT NULL,
  "pillar_post_id" uuid REFERENCES "posts"("id") ON DELETE SET NULL,
  "primary_entity_type" text NOT NULL,
  "primary_entity_id" text NOT NULL,
  "created_at" timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "cluster_members" (
  "cluster_id" uuid NOT NULL REFERENCES "topic_clusters"("id") ON DELETE CASCADE,
  "post_id" uuid NOT NULL REFERENCES "posts"("id") ON DELETE CASCADE,
  "cluster_role" text DEFAULT 'supporting' NOT NULL,
  PRIMARY KEY ("cluster_id", "post_id")
);

CREATE INDEX IF NOT EXISTS "topic_clusters_entity_idx"
  ON "topic_clusters" ("primary_entity_type", "primary_entity_id");
