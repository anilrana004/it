'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import type { LandingArticle, LandingReview } from '@/lib/landing-social-content';
import LandingBlogSection from '@/components/landing/LandingBlogSection';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './landing-reviews-blog.css';

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
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const visibleReviews = showAllReviews ? reviews.items : reviews.items.slice(0, 4);

  return (
    <>
      <section className="it-lx__section it-lx__section--wash">
        <div className="it-lx__container">
          <div className="it-lx__heading it-lx__heading--center">
            <p className="it-lx__kicker">{reviews.kicker}</p>
            <h2>{reviews.title}</h2>
            <p>{reviews.intro}</p>
          </div>

          <div className="it-lx__reviews-shell">
            <Swiper
              className="it-lx__reviews-swiper"
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
              {visibleReviews.map((review) => {
                const open = expandedId === review.id;
                return (
                  <SwiperSlide key={review.id}>
                    <article className={`it-lx__review${open ? ' is-open' : ''}`}>
                      <div className="it-lx__review-meta">
                        <strong>{review.name}</strong>
                        <span>{review.batch}</span>
                      </div>
                      <div className="it-lx__stars" aria-hidden>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                      </div>
                      <p className="it-lx__review-quote">
                        “{open ? review.full : review.short}”
                      </p>
                      <button
                        type="button"
                        className="it-lx__review-toggle"
                        onClick={() => setExpandedId(open ? null : review.id)}
                      >
                        {open ? 'Read less' : 'Read more'}
                      </button>
                    </article>
                  </SwiperSlide>
                );
              })}
            </Swiper>

            <div className="it-lx__reviews-actions">
              <button
                type="button"
                className="it-lx__reviews-more"
                onClick={() => {
                  setShowAllReviews((v) => !v);
                  setExpandedId(null);
                }}
              >
                {showAllReviews ? 'See less reviews' : 'See more reviews'}
              </button>
              <Link href="/reviews" className="it-lx__link">
                All reviews
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <LandingBlogSection kicker={articles.kicker} title={articles.title} items={articles.items} />
    </>
  );
}
