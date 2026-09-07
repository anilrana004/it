-- Customer auth: credentials, Google link, password reset, audit trail

ALTER TABLE "site_users"
  ADD COLUMN IF NOT EXISTS "password_hash" text,
  ADD COLUMN IF NOT EXISTS "google_sub" text,
  ADD COLUMN IF NOT EXISTS "email_verified" boolean DEFAULT false NOT NULL,
  ADD COLUMN IF NOT EXISTS "avatar_url" text,
  ADD COLUMN IF NOT EXISTS "updated_at" timestamptz DEFAULT now() NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS "site_users_google_sub_uidx"
  ON "site_users" ("google_sub")
  WHERE "google_sub" IS NOT NULL;

CREATE TABLE IF NOT EXISTS "password_reset_tokens" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL REFERENCES "site_users"("id") ON DELETE CASCADE,
  "token_hash" text NOT NULL UNIQUE,
  "expires_at" timestamptz NOT NULL,
  "used_at" timestamptz,
  "created_at" timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "password_reset_tokens_user_idx"
  ON "password_reset_tokens" ("user_id");

CREATE TABLE IF NOT EXISTS "auth_audit_events" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid REFERENCES "site_users"("id") ON DELETE SET NULL,
  "email" text,
  "event" text NOT NULL,
  "ip" text,
  "user_agent" text,
  "meta" text DEFAULT '',
  "created_at" timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "auth_audit_events_created_idx"
  ON "auth_audit_events" ("created_at" DESC);

CREATE INDEX IF NOT EXISTS "bookings_email_idx" ON "bookings" ("email");
