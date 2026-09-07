-- Register profile fields (first/last name, phone country, DOB, gender, nationality)

ALTER TABLE "site_users"
  ADD COLUMN IF NOT EXISTS "first_name" text,
  ADD COLUMN IF NOT EXISTS "last_name" text,
  ADD COLUMN IF NOT EXISTS "phone_country_code" text DEFAULT '+91',
  ADD COLUMN IF NOT EXISTS "date_of_birth" text,
  ADD COLUMN IF NOT EXISTS "gender" text,
  ADD COLUMN IF NOT EXISTS "nationality" text;

UPDATE "site_users"
SET
  "first_name" = COALESCE("first_name", split_part("name", ' ', 1)),
  "last_name" = COALESCE(
    "last_name",
    NULLIF(trim(both from substr("name", length(split_part("name", ' ', 1)) + 1)), '')
  )
WHERE "first_name" IS NULL OR "last_name" IS NULL;
