-- Phase 8: Operations — bookings, contacts, gift cards, newsletter (shared DB for dual deploy)

CREATE TABLE IF NOT EXISTS "bookings" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "trek_id" text NOT NULL,
  "trek_title" text NOT NULL,
  "name" text NOT NULL,
  "email" text NOT NULL,
  "phone" text NOT NULL,
  "package" text DEFAULT 'Standard' NOT NULL,
  "persons" integer DEFAULT 1 NOT NULL,
  "date" text DEFAULT '' NOT NULL,
  "payment" text DEFAULT 'deposit' NOT NULL,
  "amount" integer DEFAULT 0 NOT NULL,
  "status" text DEFAULT 'pending' NOT NULL,
  "notes" text DEFAULT '' NOT NULL,
  "created_at" timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "bookings_status_idx" ON "bookings" ("status");
CREATE INDEX IF NOT EXISTS "bookings_created_at_idx" ON "bookings" ("created_at" DESC);

CREATE TABLE IF NOT EXISTS "contacts" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "name" text NOT NULL,
  "email" text NOT NULL,
  "phone" text,
  "message" text NOT NULL,
  "status" text DEFAULT 'new' NOT NULL,
  "created_at" timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "contacts_status_idx" ON "contacts" ("status");
CREATE INDEX IF NOT EXISTS "contacts_created_at_idx" ON "contacts" ("created_at" DESC);

CREATE TABLE IF NOT EXISTS "gift_cards" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "code" text NOT NULL UNIQUE,
  "amount" integer NOT NULL,
  "balance" integer NOT NULL,
  "recipient_name" text NOT NULL,
  "recipient_email" text NOT NULL,
  "message" text DEFAULT '',
  "status" text DEFAULT 'active' NOT NULL,
  "expires_at" timestamptz NOT NULL,
  "created_at" timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "newsletter_subscribers" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "email" text NOT NULL UNIQUE,
  "active" boolean DEFAULT true NOT NULL,
  "subscribed_at" timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "site_users" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "name" text NOT NULL,
  "email" text NOT NULL UNIQUE,
  "phone" text,
  "role" text DEFAULT 'user' NOT NULL,
  "bookings_count" integer DEFAULT 0 NOT NULL,
  "created_at" timestamptz DEFAULT now() NOT NULL
);

INSERT INTO "site_users" ("name", "email", "phone", "role", "bookings_count", "created_at")
SELECT 'Admin', 'admin@indiantreks.com', '+919999999999', 'admin', 0, '2024-01-01'::timestamptz
WHERE NOT EXISTS (SELECT 1 FROM "site_users" WHERE "email" = 'admin@indiantreks.com');
