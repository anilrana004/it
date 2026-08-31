/** Client-side fetch helpers for admin operations (bookings, contacts, etc.). */

import { adminFetch } from '@/lib/admin/admin-fetch';
import type {
  Booking,
  BookingStatus,
  Contact,
  ContactStatus,
  GiftCard,
  NewsletterSubscriber,
  SiteUser,
} from '@/lib/operations/types';

async function parseJson<T>(res: Response): Promise<T> {
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? 'Request failed');
  return data as T;
}

export async function fetchAdminBookings(): Promise<Booking[]> {
  const res = await adminFetch('/api/admin/bookings');
  const data = await parseJson<{ bookings: Booking[] }>(res);
  return data.bookings;
}

export async function patchBookingStatus(id: string, status: BookingStatus): Promise<Booking> {
  const res = await adminFetch(`/api/admin/bookings/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  const data = await parseJson<{ booking: Booking }>(res);
  return data.booking;
}

export async function fetchAdminContacts(): Promise<Contact[]> {
  const res = await adminFetch('/api/admin/contacts');
  const data = await parseJson<{ contacts: Contact[] }>(res);
  return data.contacts;
}

export async function patchContactStatus(id: string, status: ContactStatus): Promise<Contact> {
  const res = await adminFetch(`/api/admin/contacts/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  const data = await parseJson<{ contact: Contact }>(res);
  return data.contact;
}

export async function fetchAdminGiftCards(): Promise<GiftCard[]> {
  const res = await adminFetch('/api/admin/gift-cards');
  const data = await parseJson<{ giftCards: GiftCard[] }>(res);
  return data.giftCards;
}

export async function createAdminGiftCard(input: {
  amount: number;
  recipientName: string;
  recipientEmail: string;
  message?: string;
}): Promise<GiftCard> {
  const res = await adminFetch('/api/admin/gift-cards', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  const data = await parseJson<{ giftCard: GiftCard }>(res);
  return data.giftCard;
}

export async function fetchAdminSubscribers(): Promise<NewsletterSubscriber[]> {
  const res = await adminFetch('/api/admin/newsletter');
  const data = await parseJson<{ subscribers: NewsletterSubscriber[] }>(res);
  return data.subscribers;
}

export async function createAdminSubscriber(email: string): Promise<NewsletterSubscriber> {
  const res = await adminFetch('/api/admin/newsletter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  const data = await parseJson<{ subscriber: NewsletterSubscriber }>(res);
  return data.subscriber;
}

export async function deleteAdminSubscriber(id: string): Promise<void> {
  const res = await adminFetch(`/api/admin/newsletter/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error ?? 'Delete failed');
  }
}

export async function fetchAdminUsers(): Promise<SiteUser[]> {
  const res = await adminFetch('/api/admin/users');
  const data = await parseJson<{ users: SiteUser[] }>(res);
  return data.users;
}

export async function fetchAdminDashboardStats(): Promise<{
  bookings: number;
  contacts: number;
  subscribers: number;
  giftCards: number;
  users: number;
  recentBookings: Booking[];
}> {
  const res = await adminFetch('/api/admin/dashboard');
  return parseJson(res);
}

export class OperationsDbUnavailableError extends Error {
  constructor() {
    super('Database not configured');
    this.name = 'OperationsDbUnavailableError';
  }
}

export function isDbUnavailableError(err: unknown): boolean {
  return err instanceof Error && (err.message.includes('503') || err.message.includes('Database'));
}
