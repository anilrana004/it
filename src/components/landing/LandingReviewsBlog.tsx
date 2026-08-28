'use client';

import LandingBlogSection from '@/components/landing/LandingBlogSection';
import StoryReviewsSection from '@/components/reviews/StoryReviewsSection';
import type { LandingArticle, LandingReview } from '@/lib/landing-social-content';

type Props = {
  reviews: {
    kicker: string;
    title: string;
    intro: string;
    items: LandingReview[];
  };
  articles: {
    kicker: string;
    title: string;
    items: LandingArticle[];
  };
};

export default function LandingReviewsBlog({ reviews, articles }: Props) {
  return (
    <>
      <StoryReviewsSection
        kicker={reviews.kicker}
        title={reviews.title}
        intro={reviews.intro}
        items={reviews.items.map((review) => ({
          id: review.id,
          name: review.name,
          subtitle: review.batch,
          short: review.short,
          full: review.full,
          avatar: review.avatar,
          trekLink: review.trekLink,
        }))}
        allReviewsHref="/reviews"
      />
      <LandingBlogSection kicker={articles.kicker} title={articles.title} items={articles.items} />
    </>
  );
}
