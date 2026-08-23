import { SPECIAL_PROGRAMS } from '@/lib/special-programs-content';

export const SPECIAL_PROGRAMS_HUB_LINKS = SPECIAL_PROGRAMS.map((p) => ({
  id: p.id,
  label: p.title,
  navLabel: p.shortTitle,
  href: p.href,
  icon: p.icon,
}));

export const SPECIAL_PROGRAMS_NAV_DROPDOWN = SPECIAL_PROGRAMS.map((p) => ({
  l: p.title,
  h: p.href,
}));

export const SPECIAL_PROGRAMS_HUB_PATHS = [
  '/special-programs',
  ...SPECIAL_PROGRAMS.map((p) => p.href),
] as const;

export function isSpecialProgramsHubPath(pathname: string) {
  return SPECIAL_PROGRAMS_HUB_PATHS.some(
    (base) => pathname === base || pathname.startsWith(`${base}/`),
  );
}

export function specialProgramsHubActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}
