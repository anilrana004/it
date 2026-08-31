export type BlogNavLink = {
  label: string;
  href: string;
};

export type BlogNavItem =
  | { id: string; label: string; href: string; children?: never }
  | { id: string; label: string; href?: string; children: BlogNavLink[] };

/** Blog hub navigation — links to blog topics and travel news, not product pages. */
export const BLOG_NAV_ITEMS: BlogNavItem[] = [
  { id: 'home', label: 'All Articles', href: '/blog' },
  {
    id: 'topics',
    label: 'Topics',
    children: [
      { label: 'Trek Guides', href: '/blog?topic=treks' },
      { label: 'Trips', href: '/blog?topic=trips' },
      { label: 'Yatra', href: '/blog?topic=yatra' },
      { label: 'Backpacking', href: '/blog?topic=backpacking' },
      { label: 'International', href: '/blog?topic=international' },
      { label: 'Prep & Guides', href: '/blog?topic=guides' },
    ],
  },
  { id: 'news', label: 'Travel News', href: '/blog/news' },
  {
    id: 'explore',
    label: 'Explore Treks',
    children: [
      { label: 'All Treks', href: '/treks' },
      { label: 'Best Sellers', href: '/best-sellers' },
      { label: 'Family Treks', href: '/family-treks' },
      { label: 'Beginner Friendly', href: '/beginner-friendly-treks' },
    ],
  },
  { id: 'brand', label: 'Indian Treks', href: '/' },
];

export const BLOG_THEME_STORAGE_KEY = 'it-blog-theme';

export function isBlogPath(pathname: string) {
  return pathname === '/blog' || pathname.startsWith('/blog/');
}

export function blogNavActive(pathname: string, item: BlogNavItem) {
  if (item.id === 'home') return pathname === '/blog';
  if (item.id === 'news') {
    return pathname === '/blog/news' || pathname.startsWith('/blog/news/');
  }
  if ('href' in item && item.href && item.href !== '/blog' && item.href !== '/') {
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  }
  if ('children' in item && item.children) {
    return item.children.some(
      (link) => pathname === link.href || pathname.startsWith(`${link.href.split('?')[0]}/`),
    );
  }
  return false;
}
