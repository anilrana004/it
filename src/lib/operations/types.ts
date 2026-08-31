/** Shared types for storefront operations (bookings, contacts, etc.). */

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type BookingPayment = 'deposit' | 'half' | 'full';

export type Booking = {
  id: string;
  trekId: string;
  trekTitle: string;
  name: string;
  email: string;
  phone: string;
  package: string;
  persons: number;
  date: string;
  payment: BookingPayment;
  amount: number;
  status: BookingStatus;
  notes: string;
  createdAt: string;
};

export type ContactStatus = 'new' | 'read' | 'replied';

export type Contact = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: ContactStatus;
  createdAt: string;
};

export type GiftCardStatus = 'active' | 'redeemed' | 'expired';

export type GiftCard = {
  id: string;
  code: string;
  amount: number;
  balance: number;
  recipientName: string;
  recipientEmail: string;
  message?: string;
  status: GiftCardStatus;
  createdAt: string;
  expiresAt: string;
};

export type NewsletterSubscriber = {
  id: string;
  email: string;
  subscribedAt: string;
  active: boolean;
};

export type SiteUser = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'user';
  bookings: number;
  createdAt: string;
};

export type CreateBookingInput = Omit<Booking, 'id' | 'createdAt' | 'status'> & {
  status?: BookingStatus;
};

export type CreateContactInput = Omit<Contact, 'id' | 'createdAt' | 'status'> & {
  status?: ContactStatus;
};

export type CreateGiftCardInput = Omit<GiftCard, 'id' | 'createdAt' | 'status'> & {
  status?: GiftCardStatus;
};
