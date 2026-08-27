/** Learning Programs hub navigation — corporate, campus, schools, gifting (careers is standalone in main nav) */

export type CorporateHubId = 'corporate' | 'campus' | 'schools' | 'gifts';

export const CORPORATE_HUB_LINKS: {
  id: CorporateHubId;
  label: string;
  navLabel?: string;
  href: string;
  icon: string;
}[] = [
  {
    id: 'corporate',
    label: 'Corporate Tours',
    href: '/corporate',
    icon: 'fa-building',
  },
  {
    id: 'campus',
    label: 'Campus Ambassador',
    navLabel: 'Campus',
    href: '/campus-ambassador',
    icon: 'fa-graduation-cap',
  },
  {
    id: 'schools',
    label: 'School Programs',
    navLabel: 'Schools',
    href: '/school-programs',
    icon: 'fa-school',
  },
  {
    id: 'gifts',
    label: 'Travel Gift Cards',
    navLabel: 'Gift Cards',
    href: '/travel-gift-cards',
    icon: 'fa-gift',
  },
];

/** Main-site Learning Programs dropdown */
export const PROGRAMS_NAV_DROPDOWN = CORPORATE_HUB_LINKS.map((item) => ({
  l: item.label,
  h: item.href,
}));

export const CORPORATE_HUB_PATHS = [
  '/corporate',
  '/campus-ambassador',
  '/school-programs',
  '/travel-gift-cards',
] as const;

export const CORPORATE_EMAIL = 'info@indiantreks.in';

export function isCorporateHubPath(pathname: string) {
  return CORPORATE_HUB_PATHS.some(
    (base) => pathname === base || pathname.startsWith(`${base}/`),
  );
}

export function corporateHubActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function corporateMailtoUrl(subject = 'Corporate enquiry — Indian Treks') {
  return `mailto:${CORPORATE_EMAIL}?subject=${encodeURIComponent(subject)}`;
}
