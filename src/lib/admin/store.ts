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

function persist<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

function save(key: string, data: unknown) {
  if (typeof window !== 'undefined') {
    try { localStorage.setItem(key, JSON.stringify(data)); } catch {}
  }
}

export const bookings: AdminBooking[] = persist('tr_bookings', []);
export const contacts: AdminContact[] = persist('tr_contacts', []);
export const users: AdminUser[] = persist('tr_users', [
  { id: '1', name: 'Admin', email: 'admin@indiantreks.com', phone: '+919999999999', role: 'admin', bookings: 0, createdAt: '2024-01-01' },
]);
export const blogPosts: AdminBlogPost[] = persist('tr_blogPosts', []);
export const giftCards: GiftCard[] = persist('tr_giftCards', []);
export const subscribers: NewsletterSubscriber[] = persist('tr_subscribers', []);

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

function persistAll() {
  save('tr_bookings', bookings);
  save('tr_contacts', contacts);
  save('tr_users', users);
  save('tr_blogPosts', blogPosts);
  save('tr_giftCards', giftCards);
  save('tr_subscribers', subscribers);
}

export function getBookings() { return bookings; }
export function getBooking(id: string) { return bookings.find(b => b.id === id); }
export function addBooking(data: Omit<AdminBooking, 'id' | 'createdAt'>) {
  const b: AdminBooking = { ...data, id: generateId(), createdAt: new Date().toISOString() };
  bookings.unshift(b);
  persistAll();
  return b;
}
export function updateBookingStatus(id: string, status: AdminBooking['status']) {
  const b = bookings.find(x => x.id === id);
  if (b) { b.status = status; persistAll(); return b; }
  return null;
}

export function getContacts() { return contacts; }
export function addContact(data: Omit<AdminContact, 'id' | 'createdAt'>) {
  const c: AdminContact = { ...data, id: generateId(), createdAt: new Date().toISOString() };
  contacts.unshift(c);
  persistAll();
  return c;
}
export function updateContactStatus(id: string, status: AdminContact['status']) {
  const c = contacts.find(x => x.id === id);
  if (c) { c.status = status; persistAll(); return c; }
  return null;
}

export function getUsers() { return users; }
export function getBlogPosts() { return blogPosts; }
export function addBlogPost(data: Omit<AdminBlogPost, 'id' | 'createdAt'>) {
  const p: AdminBlogPost = { ...data, id: generateId(), createdAt: new Date().toISOString() };
  blogPosts.unshift(p);
  persistAll();
  return p;
}
export function updateBlogPost(id: string, data: Partial<AdminBlogPost>) {
  const p = blogPosts.find(x => x.id === id);
  if (p) { Object.assign(p, data); persistAll(); return p; }
  return null;
}
export function deleteBlogPost(id: string) {
  const idx = blogPosts.findIndex(x => x.id === id);
  if (idx !== -1) { blogPosts.splice(idx, 1); persistAll(); return true; }
  return false;
}

export function getGiftCards() { return giftCards; }
export function addGiftCard(data: Omit<GiftCard, 'id' | 'createdAt'>) {
  const g: GiftCard = { ...data, id: generateId(), createdAt: new Date().toISOString() };
  giftCards.unshift(g);
  persistAll();
  return g;
}
export function redeemGiftCard(code: string) {
  const g = giftCards.find(x => x.code === code && x.status === 'active');
  if (g) { g.status = 'redeemed'; persistAll(); return g; }
  return null;
}

export function getSubscribers() { return subscribers; }
export function addSubscriber(email: string) {
  if (subscribers.find(s => s.email === email)) return null;
  const s: NewsletterSubscriber = { id: generateId(), email, subscribedAt: new Date().toISOString(), active: true };
  subscribers.unshift(s);
  persistAll();
  return s;
}
export function removeSubscriber(id: string) {
  const idx = subscribers.findIndex(x => x.id === id);
  if (idx !== -1) { subscribers.splice(idx, 1); persistAll(); return true; }
  return false;
}
