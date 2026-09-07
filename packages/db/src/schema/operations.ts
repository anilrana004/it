import { boolean, integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const bookings = pgTable('bookings', {
  id: uuid('id').primaryKey().defaultRandom(),
  trekId: text('trek_id').notNull(),
  trekTitle: text('trek_title').notNull(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  package: text('package').notNull().default('Standard'),
  persons: integer('persons').notNull().default(1),
  date: text('date').notNull().default(''),
  payment: text('payment').notNull().default('deposit'),
  amount: integer('amount').notNull().default(0),
  status: text('status').notNull().default('pending'),
  notes: text('notes').notNull().default(''),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const contacts = pgTable('contacts', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  message: text('message').notNull(),
  status: text('status').notNull().default('new'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const giftCards = pgTable('gift_cards', {
  id: uuid('id').primaryKey().defaultRandom(),
  code: text('code').notNull().unique(),
  amount: integer('amount').notNull(),
  balance: integer('balance').notNull(),
  recipientName: text('recipient_name').notNull(),
  recipientEmail: text('recipient_email').notNull(),
  message: text('message').default(''),
  status: text('status').notNull().default('active'),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const newsletterSubscribers = pgTable('newsletter_subscribers', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  active: boolean('active').notNull().default(true),
  subscribedAt: timestamp('subscribed_at', { withTimezone: true }).notNull().defaultNow(),
});

export const siteUsers = pgTable('site_users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  email: text('email').notNull().unique(),
  phone: text('phone'),
  phoneCountryCode: text('phone_country_code').default('+91'),
  dateOfBirth: text('date_of_birth'),
  gender: text('gender'),
  nationality: text('nationality'),
  role: text('role').notNull().default('user'),
  bookingsCount: integer('bookings_count').notNull().default(0),
  passwordHash: text('password_hash'),
  googleSub: text('google_sub'),
  emailVerified: boolean('email_verified').notNull().default(false),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const passwordResetTokens = pgTable('password_reset_tokens', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => siteUsers.id, { onDelete: 'cascade' }),
  tokenHash: text('token_hash').notNull().unique(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  usedAt: timestamp('used_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const authAuditEvents = pgTable('auth_audit_events', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => siteUsers.id, { onDelete: 'set null' }),
  email: text('email'),
  event: text('event').notNull(),
  ip: text('ip'),
  userAgent: text('user_agent'),
  meta: text('meta').default(''),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});
