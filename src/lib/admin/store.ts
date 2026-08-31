/**
 * @deprecated Operations data now lives in PostgreSQL via @/lib/operations.
 * Types are re-exported for backward compatibility only.
 */

export type {
  Booking as AdminBooking,
  BookingStatus,
  BookingPayment,
  Contact as AdminContact,
  ContactStatus,
  SiteUser as AdminUser,
  GiftCard,
  GiftCardStatus,
  NewsletterSubscriber,
} from '@/lib/operations/types';

/** @deprecated No-op — data is persisted in PostgreSQL. */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}
