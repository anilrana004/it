export interface AdminBooking {
  id: string;
  trekId: string;
  trekTitle: string;
  name: string;
  email: string;
  phone: string;
  package: string;
  persons: number;
  date: string;
  payment: 'deposit' | 'half' | 'full';
  amount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes: string;
  createdAt: string;
}

export interface AdminContact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'user';
  bookings: number;
  createdAt: string;
}

export interface AdminBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  published: boolean;
  createdAt: string;
}

export interface GiftCard {
  id: string;
  code: string;
  amount: number;
  balance: number;
  recipientName: string;
  recipientEmail: string;
  message?: string;
  status: 'active' | 'redeemed' | 'expired';
  createdAt: string;
  expiresAt: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  active: boolean;
}

// In-memory stores (will be replaced with DB)
export const bookings: AdminBooking[] = [];
export const contacts: AdminContact[] = [];
export const users: AdminUser[] = [
  { id: '1', name: 'Admin', email: 'admin@trekroot.com', phone: '+919999999999', role: 'admin', bookings: 0, createdAt: '2024-01-01' },
];
export const blogPosts: AdminBlogPost[] = [];
export const giftCards: GiftCard[] = [];
export const subscribers: NewsletterSubscriber[] = [];

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

export function getBookings() { return bookings; }
export function getBooking(id: string) { return bookings.find(b => b.id === id); }
export function addBooking(data: Omit<AdminBooking, 'id' | 'createdAt'>) {
  const b: AdminBooking = { ...data, id: generateId(), createdAt: new Date().toISOString() };
  bookings.unshift(b);
  return b;
}
export function updateBookingStatus(id: string, status: AdminBooking['status']) {
  const b = bookings.find(x => x.id === id);
  if (b) { b.status = status; return b; }
  return null;
}

export function getContacts() { return contacts; }
export function addContact(data: Omit<AdminContact, 'id' | 'createdAt'>) {
  const c: AdminContact = { ...data, id: generateId(), createdAt: new Date().toISOString() };
  contacts.unshift(c);
  return c;
}

export function getUsers() { return users; }
export function getBlogPosts() { return blogPosts; }
export function addBlogPost(data: Omit<AdminBlogPost, 'id' | 'createdAt'>) {
  const p: AdminBlogPost = { ...data, id: generateId(), createdAt: new Date().toISOString() };
  blogPosts.unshift(p);
  return p;
}

export function getGiftCards() { return giftCards; }
export function addGiftCard(data: Omit<GiftCard, 'id' | 'createdAt'>) {
  const g: GiftCard = { ...data, id: generateId(), createdAt: new Date().toISOString() };
  giftCards.unshift(g);
  return g;
}

export function getSubscribers() { return subscribers; }
export function addSubscriber(email: string) {
  if (subscribers.find(s => s.email === email)) return null;
  const s: NewsletterSubscriber = { id: generateId(), email, subscribedAt: new Date().toISOString(), active: true };
  subscribers.unshift(s);
  return s;
}
