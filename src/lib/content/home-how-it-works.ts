import { photos } from '@/lib/media';

export type HowItWorksStep = {
  id: string;
  n: string;
  title: readonly [string, string];
  desc: string;
  img: string;
  icon: string;
  href: string;
};

export const HOW_IT_WORKS_SECTION = {
  kicker: 'How It Works',
  titleLead: '3 Steps',
  titleRest: 'to Your Next Adventure',
  lede: 'From choosing to booking to exploring – we make it simple.',
  linkLabel: 'Explore Treks',
} as const;

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    id: 'choose-trip',
    n: '01',
    title: ['Choose', 'Your Trip'],
    desc: 'Browse our curated treks, yatras, and adventure tours. Filter by region, difficulty, and season to find your perfect match.',
    img: photos.prepHero,
    icon: 'fa-solid fa-compass',
    href: '/treks',
  },
  {
    id: 'book-pay-later',
    n: '02',
    title: ['Book', '& Pay Later'],
    desc: 'Reserve your spot with just ₹799 deposit. Pay the rest in installments or in full — your journey, your pace.',
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=560&q=80',
    icon: 'fa-solid fa-wallet',
    href: '/treks',
  },
  {
    id: 'go-adventure',
    n: '03',
    title: ['Go on', 'Adventure'],
    desc: 'Meet fellow trekkers, follow expert guides, and make memories for a lifetime. We handle everything — you just explore.',
    img: photos.womenTrek,
    icon: 'fa-solid fa-person-hiking',
    href: '/treks',
  },
];
