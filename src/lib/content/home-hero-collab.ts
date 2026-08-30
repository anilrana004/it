import type { HeroCollabIconKey } from '@/lib/icons/lucide-content-icons';

export type HeroCollabItem = {
  id: string;
  icon: HeroCollabIconKey;
  label: string;
  href: string;
};

export const HERO_COLLAB_ITEMS: HeroCollabItem[] = [
  { id: 'tripadvisor-choice', icon: 'heart', label: 'TripAdvisor Choice', href: '/#reviews' },
  { id: 'travelers-80k', icon: 'users', label: '80k+ Travelers', href: '/about' },
  { id: 'atoai-recognized', icon: 'award', label: 'ATOAI Recognized', href: '/about' },
  { id: 'startup-india', icon: 'shield', label: 'Startup India', href: '/corporate' },
  { id: 'years-legacy', icon: 'calendar', label: '10+ Years Legacy', href: '/about' },
];
