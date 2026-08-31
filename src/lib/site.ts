/** Canonical public site origin — override in production via env. */
export const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.indiantreks.in').replace(/\/$/, '');

export const SITE_NAME = 'Indian Treks';

export const SITE_DESCRIPTION =
  'Book Himalayan treks and sacred yatras in Uttarakhand, Himachal Pradesh, and Nepal. Trusted adventure travel operator.';

/** Cloudinary wordmark — same asset as site header. */
export const SITE_LOGO =
  'https://res.cloudinary.com/pg8uhzw0/image/upload/f_auto,q_auto/v1786284069/indiantreks-01-1-1536x284_af65nt.png';

export const ORGANIZATION = {
  name: SITE_NAME,
  legalName: 'Indian Treks',
  url: SITE_URL,
  email: 'info@indiantreks.in',
  logo: SITE_LOGO,
} as const;

export function absoluteUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
