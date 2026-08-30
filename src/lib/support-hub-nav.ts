/** Support hub links — patterned on https://www.exoticamp.com/faqs navigation */

export type SupportHubId =
  | 'safety'
  | 'faqs'
  | 'reviews'
  | 'blogs'
  | 'news'
  | 'affiliates'
  | 'payment'
  | 'cancellation'
  | 'terms'
  | 'about';

export const SUPPORT_HUB_LINKS: {
  id: SupportHubId;
  label: string;
  /** Shorter label for the desktop header bar when space is tight */
  navLabel?: string;
  href: string;
  icon: string;
}[] = [
  { id: 'safety', label: 'Safety', href: '/safety', icon: 'fa-shield-halved' },
  { id: 'faqs', label: 'FAQs', href: '/faqs', icon: 'fa-circle-question' },
  { id: 'reviews', label: 'Reviews', href: '/reviews', icon: 'fa-star' },
  { id: 'blogs', label: 'Blogs', href: '/blog', icon: 'fa-newspaper' },
  { id: 'news', label: 'News', href: '/news', icon: 'fa-bullhorn' },
  { id: 'affiliates', label: 'Affiliates', href: '/affiliates', icon: 'fa-handshake' },
  {
    id: 'payment',
    label: 'Payment Policy',
    navLabel: 'Payment',
    href: '/payment-policy',
    icon: 'fa-credit-card',
  },
  {
    id: 'cancellation',
    label: 'Cancellation & Refund',
    navLabel: 'Cancellation',
    href: '/cancellation-policy',
    icon: 'fa-rotate-left',
  },
  {
    id: 'terms',
    label: 'Terms & Conditions',
    navLabel: 'Terms',
    href: '/terms',
    icon: 'fa-file-contract',
  },
  { id: 'about', label: 'About Us', href: '/about', icon: 'fa-mountain' },
];

/** Paths that use the dedicated support-section header instead of the main site header */
export const SUPPORT_HUB_PATHS = [
  '/help-centre',
  '/faqs',
  '/reviews',
  '/safety',
  '/news',
  '/affiliates',
  '/payment-policy',
  '/cancellation-policy',
  '/terms',
  '/beware-of-fraudulent-activities',
  '/blog',
  '/about',
] as const;

export function isSupportHubPath(pathname: string) {
  // Blog listing uses the support hub chrome; article pages use the main site navbar
  // (same pattern as /how-to-prepare).
  if (pathname.startsWith('/blog/')) return false;

  return SUPPORT_HUB_PATHS.some(
    (base) => pathname === base || pathname.startsWith(`${base}/`),
  );
}

export function supportHubActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}
