'use client';

import { useEffect, useState } from 'react';
import {
  loadPackageReviews,
  PACKAGE_REVIEWS_CHANGED_EVENT,
  reviewsForPackage,
  type PackageReview,
} from '@/lib/package-reviews';

type Props = {
  packageId: string;
  kindLabel: string;
  /** Max rows to show (blog sidebar shows 3). */
  limit?: number;
};

function shortDate(value: string) {
  // Prefer "1 Sep" style when ISO / parseable; otherwise keep stored label.
  const parsed = Date.parse(value);
  if (!Number.isNaN(parsed)) {
    return new Date(parsed).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  }
  const trimmed = value.trim();
  const m = trimmed.match(/^(\d{1,2})\s+([A-Za-z]{3})/);
  if (m) return `${Number(m[1])} ${m[2]}`;
  return trimmed.slice(0, 12);
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="bl-stars" aria-label={`${rating} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <i
          key={i}
          className={i < rating ? 'fa-solid fa-star' : 'fa-regular fa-star'}
          aria-hidden
        />
      ))}
    </span>
  );
}

/**
 * Vertical guest-review rail beside Fixed Departures (under From the Blog).
 * Only website-submitted reviews for this trek / yatra / trip.
 */
export default function PackageReviewsSidebar({ packageId, kindLabel, limit = 3 }: Props) {
  const [reviews, setReviews] = useState<PackageReview[]>([]);

  useEffect(() => {
    const refresh = () => {
      setReviews(reviewsForPackage(loadPackageReviews(), packageId));
    };
    refresh();
    window.addEventListener(PACKAGE_REVIEWS_CHANGED_EVENT, refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener(PACKAGE_REVIEWS_CHANGED_EVENT, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, [packageId]);

  const items = reviews.slice(0, limit);

  return (
    <aside className="bl-card bl-card--reviews" aria-label={`${kindLabel} guest reviews`}>
      <div className="bl-header">
        <i className="fa-solid fa-star" aria-hidden /> Guest Reviews
      </div>

      {items.length === 0 ? (
        <div className="bl-empty">
          <p>
            Reviews shared on this {kindLabel.toLowerCase()} page after the trip will appear here.
          </p>
        </div>
      ) : (
        <div className="bl-list">
          {items.map((review) => (
            <a className="bl-item" href="#guest-reviews" key={review.id}>
              <span className="bl-thumb bl-thumb--avatar">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={
                    review.avatar ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop'
                  }
                  alt=""
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              </span>
              <span className="bl-body">
                <span className="bl-title">{review.text}</span>
                <span className="bl-meta">
                  <span className="bl-badge">{review.name.split(' ')[0] || 'Guest'}</span>
                  <Stars rating={review.rating} />
                  <span className="bl-dot" aria-hidden />
                  <i className="fa-regular fa-calendar" aria-hidden /> {shortDate(review.reviewedAt)}
                  {review.pending ? (
                    <>
                      <span className="bl-dot" aria-hidden />
                      <span className="bl-pending">Pending</span>
                    </>
                  ) : null}
                </span>
              </span>
            </a>
          ))}
        </div>
      )}

      <a className="bl-footer" href="#guest-reviews">
        {items.length === 0 ? 'Share your review' : 'See all reviews'}{' '}
        <i className="fa-solid fa-arrow-right" aria-hidden />
      </a>
    </aside>
  );
}
