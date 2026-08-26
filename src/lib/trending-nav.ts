/** Trending mega-menu items — Best Sellers, Upcoming, New Launches */

export type TrendingNavIcon = 'star' | 'calendar' | 'megaphone';

export type TrendingNavItem = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  icon: TrendingNavIcon;
  /** Tailwind classes for icon tile border/background */
  iconTile: string;
  /** Tailwind classes for icon stroke/fill */
  iconColor: string;
  live?: boolean;
};

export const TRENDING_NAV_ITEMS: TrendingNavItem[] = [
  {
    id: 'best-sellers',
    title: 'Best Sellers',
    subtitle: 'Most Booked Group Trips',
    href: '/best-sellers',
    icon: 'star',
    iconTile: 'border-amber-200 bg-amber-50',
    iconColor: 'text-amber-500 fill-amber-400',
  },
  {
    id: 'upcoming-trips',
    title: 'Upcoming Trips',
    subtitle: 'August, Sept, Oct',
    href: '/upcoming-trips',
    icon: 'calendar',
    iconTile: 'border-sky-200 bg-sky-50',
    iconColor: 'text-sky-600',
  },
  {
    id: 'new-launches',
    title: 'New Launches',
    subtitle: 'Latest Backpacking Trips',
    href: '/new-launches',
    icon: 'megaphone',
    iconTile: 'border-emerald-200 bg-emerald-50',
    iconColor: 'text-[#16a34a]',
    live: true,
  },
];

/** Plain links for mobile accordion */
export const TRENDING_NAV_DROPDOWN = TRENDING_NAV_ITEMS.map((item) => ({
  l: item.title,
  h: item.href,
}));
