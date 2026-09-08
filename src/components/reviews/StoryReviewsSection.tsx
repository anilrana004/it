'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import {
  inferTrekLink,
  reviewInitials,
} from '@/lib/story-review-utils';
import './guest-testimonials.css';

export type StoryReviewInput = {
  id: string;
  name: string;
  subtitle: string;
  short: string;
  full: string;
  avatar?: string;
  trekLink?: { label: string; href: string };
  rating?: number;
  platform?: 'google' | 'tripadvisor';
  verifyUrl?: string;
};

type Props = {
  kicker: string;
  title: string;
  intro: string;
  items: StoryReviewInput[];
  moreLabel?: string;
  lessLabel?: string;
  allReviewsHref?: string;
  allReviewsLabel?: string;
  className?: string;
  id?: string;
};

function GoogleLogoIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function nudge(track: HTMLDivElement | null, dir: -1 | 1) {
  if (!track) return;
  const card = track.querySelector('.kg-testi-item') as HTMLElement | null;
  const step = card ? card.offsetWidth + 18 : track.clientWidth * 0.8;
  track.scrollBy({ left: dir * step, behavior: 'smooth' });
}

/** Guest testimonials carousel — same UI as trek detail pages. */
export default function StoryReviewsSection({
  kicker,
  title,
  intro,
  items,
  allReviewsHref,
  allReviewsLabel = 'All reviews',
  className,
  id,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const titleId = id ? `${id}-title` : 'guest-testimonials-title';

  const reviews = items.map((item) => ({
    ...item,
    rating: item.rating ?? 5,
    trekLink: inferTrekLink(`${item.subtitle} ${item.short}`, item.trekLink),
  }));

  if (reviews.length === 0) return null;

  return (
    <section
      className={`it-guest-testi${className ? ` ${className}` : ''}`}
      id={id}
      aria-labelledby={titleId}
    >
      <div className="kg-testi-shell">
        <div className="kg-testi-card">
          <div className="kg-testi-head">
            <div>
              <span className="kg-testi-kicker">
                <i className="fa-solid fa-award" aria-hidden /> {kicker}
              </span>
              <div className="kg-testi-title-row">
                <h2 id={titleId}>{title}</h2>
              </div>
              <div className="kg-testi-divider" />
              <p>{intro}</p>
            </div>
          </div>

          <div className="kg-testi-track" ref={trackRef}>
            {reviews.map((review) => {
              const open = expandedId === review.id;
              const canExpand = review.full.trim() !== review.short.trim();
              const body = open || !canExpand ? review.full : review.short;
              return (
                <article
                  className={`kg-testi-item${open ? ' is-open' : ''}`}
                  key={review.id}
                >
                  <div className="kg-testi-item-top">
                    <div className="kg-testi-user">
                      {review.avatar ? (
                        <span className="kg-testi-avatar kg-testi-avatar--img" aria-hidden>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={review.avatar} alt="" referrerPolicy="no-referrer" />
                        </span>
                      ) : (
                        <span className="kg-testi-avatar" aria-hidden>
                          {reviewInitials(review.name)}
                        </span>
                      )}
                      <div className="kg-testi-user__copy">
                        <strong>{review.name}</strong>
                        <span>{review.subtitle}</span>
                      </div>
                    </div>
                    {review.platform === 'google' ? (
                      <span className="kg-testi-badge kg-testi-badge-logo" aria-label="Google review">
                        <GoogleLogoIcon />
                      </span>
                    ) : null}
                  </div>

                  <div className="kg-testi-stars" aria-label={`${review.rating} out of 5 stars`}>
                    {[0, 1, 2, 3, 4].map((s) => (
                      <i
                        className={s < review.rating ? 'fa-solid fa-star' : 'fa-regular fa-star'}
                        key={s}
                        aria-hidden
                      />
                    ))}
                  </div>

                  <div>
                    <p>{body}</p>
                  </div>

                  <div className="it-guest-testi__links">
                    {canExpand ? (
                      <button
                        type="button"
                        className="it-guest-testi__toggle"
                        onClick={() => setExpandedId(open ? null : review.id)}
                      >
                        {open ? 'Read less' : 'Read full story'}
                      </button>
                    ) : null}
                    {review.verifyUrl ? (
                      <a
                        href={review.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="kg-testi-verify"
                      >
                        <GoogleLogoIcon size={16} />
                        Verify on Google
                      </a>
                    ) : null}
                    {review.trekLink ? (
                      <Link href={review.trekLink.href} className="it-guest-testi__trek">
                        <i className="fa-solid fa-mountain" aria-hidden />
                        {review.trekLink.label}
                        <i className="fa-solid fa-arrow-right" aria-hidden />
                      </Link>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="kg-testi-nav">
            <button
              type="button"
              className="kg-related-btn"
              aria-label="Previous testimonial"
              onClick={() => nudge(trackRef.current, -1)}
            >
              <i className="fa-solid fa-chevron-left" aria-hidden />
            </button>
            <button
              type="button"
              className="kg-related-btn"
              aria-label="Next testimonial"
              onClick={() => nudge(trackRef.current, 1)}
            >
              <i className="fa-solid fa-chevron-right" aria-hidden />
            </button>
          </div>

          {allReviewsHref ? (
            <div className="it-guest-testi__actions">
              <Link href={allReviewsHref} className="it-guest-testi__all">
                {allReviewsLabel}
                <i className="fa-solid fa-arrow-right" aria-hidden />
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
