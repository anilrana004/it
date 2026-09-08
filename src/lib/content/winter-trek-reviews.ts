import { getTrekContent } from '@/lib/content/treks';
import { WINTER_TOP_TREK_IDS } from '@/lib/content/winter-treks-guide';
import { getTrekById } from '@/lib/data';
import type { TrekTestimonial } from '@/lib/content/treks/types';

/** Max curated reviews pulled from each winter trek detail page. */
const PER_TREK = 3;

export type WinterTrekReview = {
  id: string;
  name: string;
  /** Shown under the name — matches detail-page subtitle. */
  subtitle: string;
  text: string;
  rating: number;
  platform?: TrekTestimonial['platform'];
  verifyUrl?: string;
  trekLink: { label: string; href: string };
};

function reviewId(trekId: string, name: string, index: number): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40);
  return `winter-${trekId}-${slug || index}`;
}

/**
 * Winter listing reviews — only testimonials already on winter trek detail pages.
 * Shape matches the detail-page guest testimonial cards.
 */
export function getWinterTrekReviews(): WinterTrekReview[] {
  const items: WinterTrekReview[] = [];

  for (const trekId of WINTER_TOP_TREK_IDS) {
    const trek = getTrekById(trekId);
    const testimonials = getTrekContent(trekId)?.testimonials;
    if (!trek || !testimonials?.length) continue;

    const ranked = [...testimonials].sort((a, b) => {
      const score = (t: (typeof testimonials)[number]) =>
        (t.verifyUrl ? 2 : 0) + (t.rating ?? 0) + (t.posted ? 0.5 : 0);
      return score(b) - score(a);
    });

    for (const [index, testimonial] of ranked.slice(0, PER_TREK).entries()) {
      const text = testimonial.text.trim();
      if (!text) continue;

      items.push({
        id: reviewId(trekId, testimonial.name, index),
        name: testimonial.name,
        subtitle: testimonial.posted
          ? `${trek.title} · ${testimonial.posted}`
          : trek.title,
        text,
        rating: testimonial.rating ?? 5,
        platform: testimonial.platform,
        verifyUrl: testimonial.verifyUrl,
        trekLink: {
          label: trek.title,
          href: `/treks/${trek.id}`,
        },
      });
    }
  }

  return items;
}

export const winterTrekReviews = getWinterTrekReviews();
