/** Client-side wishlist persistence (localStorage). Safe for demo / pre-auth UX. */

const KEY = 'indiantreks_wishlist';

export type WishlistItem = {
  id: string;
  addedAt: string;
};

function read(): WishlistItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(items: WishlistItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event('indiantreks:wishlist'));
}

export function getWishlistIds(): string[] {
  return read().map(i => i.id);
}

export function isWishlisted(id: string): boolean {
  return read().some(i => i.id === id);
}

export function toggleWishlist(id: string): boolean {
  const items = read();
  const idx = items.findIndex(i => i.id === id);
  if (idx >= 0) {
    items.splice(idx, 1);
    write(items);
    return false;
  }
  items.unshift({ id, addedAt: new Date().toISOString() });
  write(items);
  return true;
}

export function removeFromWishlist(id: string) {
  write(read().filter(i => i.id !== id));
}

export function clearWishlist() {
  write([]);
}
