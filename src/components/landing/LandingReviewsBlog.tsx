'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import type { LandingArticle, LandingReview } from '@/lib/landing-social-content';
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
  const feature = articles.items[0];
  const rest = articles.items.slice(1);

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

      <section className="it-lx__section">
        <div className="it-lx__container">
          <div className="it-lx__blog-head">
            <div>
              <p className="it-lx__kicker">{articles.kicker}</p>
              <h2>{articles.title}</h2>
            </div>
            <Link href="/blog" className="it-lx__blog-all">
              View all
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>

          <div className="it-lx__blog-mobile">
            {articles.items.map((article) => (
              <Link key={article.href} href={article.href} className="it-lx__blog-mcard">
                <span className="it-lx__blog-mcard-media">
                  <Image src={article.image} alt="" fill sizes="120px" />
                </span>
                <span className="it-lx__blog-mcard-body">
                  <span className="it-lx__blog-meta">{article.read}</span>
                  <strong>{article.title}</strong>
                </span>
              </Link>
            ))}
          </div>

          <div className="it-lx__blog-desk">
            {feature ? (
              <Link href={feature.href} className="it-lx__blog-feature">
                <span className="it-lx__blog-feature-media">
                  <Image
                    src={feature.image}
                    alt=""
                    fill
                    sizes="(max-width: 1100px) 100vw, 50vw"
                  />
                </span>
                <span className="it-lx__blog-feature-body">
                  <span className="it-lx__blog-meta">{feature.read}</span>
                  <strong>{feature.title}</strong>
                  <span className="it-lx__blog-excerpt">{feature.excerpt}</span>
                </span>
              </Link>
            ) : null}
            {rest.map((article) => (
              <Link key={article.href} href={article.href} className="it-lx__blog-card">
                <span className="it-lx__blog-card-media">
                  <Image src={article.image} alt="" fill sizes="25vw" />
                </span>
                <span className="it-lx__blog-card-body">
                  <span className="it-lx__blog-meta">{article.read}</span>
                  <strong>{article.title}</strong>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
