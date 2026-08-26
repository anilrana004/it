import type { CatalogCard } from '@/lib/catalog';
import type { TrendingLandingTrip } from '@/lib/trending-landing-types';

export function tripFromCatalog(
  card: CatalogCard,
  opts?: { badge?: string; subtitle?: string; ctaLabel?: string },
): TrendingLandingTrip {
  const pickup = card.loc.split(' – ')[0] ?? card.loc;
  return {
    id: card.id,
    title: card.title,
    subtitle: opts?.subtitle ?? card.loc,
    meta: [pickup, card.dur, card.difficulty].filter(Boolean).join(' · '),
    duration: card.dur,
    badge: opts?.badge ?? card.badge,
    price: card.price,
    cover: card.img,
    href: card.href,
    ctaLabel:
      opts?.ctaLabel ??
      (card.type === 'yatra' ? 'View Yatra' : card.type === 'trek' ? 'View Trek' : 'Explore'),
  };
}

export function tripCountForSection(cards: { id: string }[], sectionId: string, sections: { id: string; trips: unknown[] }[]) {
  const section = sections.find((s) => s.id === sectionId);
  return section?.trips.length ?? 0;
}
