'use client';

import StoryReviewsSection from '@/components/reviews/StoryReviewsSection';
import type { WinterTrekReview } from '@/lib/content/winter-trek-reviews';

type Props = {
  items: WinterTrekReview[];
};

/** Winter listing reviews — shared guest-testimonial UI + detail-page review data. */
export default function WinterTreksReviews({ items }: Props) {
  return (
    <StoryReviewsSection
      id="winter-reviews"
      kicker="Trusted by Trekkers"
      title="Guest Testimonials"
      intro="Real feedback from guests who joined our winter snow treks."
      items={items.map((item) => ({
        id: item.id,
        name: item.name,
        subtitle: item.subtitle,
        short: item.text,
        full: item.text,
        rating: item.rating,
        platform: item.platform,
        verifyUrl: item.verifyUrl,
        trekLink: item.trekLink,
      }))}
      allReviewsHref="/reviews"
    />
  );
}
