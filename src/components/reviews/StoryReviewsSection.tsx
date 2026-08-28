'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Mountain, Quote } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import {
  normalizeStoryReview,
  reviewInitials,
  type StoryReview,
} from '@/lib/story-review-utils';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './story-reviews.css';

type RawReview = {
  id: string;
  name: string;
  subtitle: string;
  short: string;
  full: string;
  avatar?: string;
  trekLink?: { label: string; href: string };
};

type Props = {
  kicker: string;
  title: string;
  intro: string;
  items: RawReview[];
  moreLabel?: string;
  lessLabel?: string;
  allReviewsHref?: string;
  allReviewsLabel?: string;
  className?: string;
};

function toStoryReviews(items: RawReview[]): StoryReview[] {
  return items.map((item) => normalizeStoryReview(item));
}

export default function StoryReviewsSection({
  kicker,
  title,
  intro,
  items,
  moreLabel = 'See more reviews',
  lessLabel = 'See less reviews',
  allReviewsHref,
  allReviewsLabel = 'All reviews',
  className,
}: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const reviews = toStoryReviews(items);
  const visible = showAll ? reviews : reviews.slice(0, 4);

  return (
    <section className={`it-story-rv__section${className ? ` ${className}` : ''}`}>
      <div className="it-story-rv__container">
        <div className="it-story-rv__heading">
          <p className="it-story-rv__kicker">{kicker}</p>
          <h2>{title}</h2>
          <p>{intro}</p>
        </div>

        <div className="it-story-rv__shell">
          <Swiper
            className="it-story-rv__swiper"
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              760: { slidesPerView: 1.15 },
              980: { slidesPerView: 2 },
            }}
          >
            {visible.map((review) => {
              const open = expandedId === review.id;
              return (
                <SwiperSlide key={review.id}>
                  <article className={`it-story-rv__card${open ? ' is-open' : ''}`}>
                    <Quote className="it-story-rv__mark" aria-hidden />
                    <div className="it-story-rv__head">
                      {review.avatar ? (
                        <span className="it-story-rv__avatar">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={review.avatar} alt="" referrerPolicy="no-referrer" />
                        </span>
                      ) : (
                        <span className="it-story-rv__avatar it-story-rv__avatar--initials">
                          {reviewInitials(review.name)}
                        </span>
                      )}
                      <div className="it-story-rv__meta">
                        <strong>{review.name}</strong>
                        <span>{review.subtitle}</span>
                      </div>
                      <div className="it-story-rv__stars" aria-label="5 out of 5 stars">
                        <span aria-hidden>★</span>
                        <span aria-hidden>★</span>
                        <span aria-hidden>★</span>
                        <span aria-hidden>★</span>
                        <span aria-hidden>★</span>
                      </div>
                    </div>
                    <p className="it-story-rv__quote">{open ? review.full : review.short}</p>
                    <div className="it-story-rv__foot">
                      <button
                        type="button"
                        className="it-story-rv__toggle"
                        onClick={() => setExpandedId(open ? null : review.id)}
                      >
                        {open ? 'Read less' : 'Read full story'}
                      </button>
                      {review.trekLink ? (
                        <Link href={review.trekLink.href} className="it-story-rv__trek">
                          <Mountain className="h-3.5 w-3.5 shrink-0" aria-hidden />
                          <span>{review.trekLink.label}</span>
                          <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
                        </Link>
                      ) : null}
                    </div>
                  </article>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div className="it-story-rv__actions">
            {reviews.length > 4 ? (
              <button
                type="button"
                className="it-story-rv__more"
                onClick={() => {
                  setShowAll((value) => !value);
                  setExpandedId(null);
                }}
              >
                {showAll ? lessLabel : moreLabel}
              </button>
            ) : null}
            {allReviewsHref ? (
              <Link href={allReviewsHref} className="it-story-rv__all">
                {allReviewsLabel}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
