'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type RefObject,
} from 'react';
import type { TrekTestimonial } from '@/lib/content/treks/types';
import { publicApiFetch, publicApiErrorMessage } from '@/lib/api/client';
import {
  loadPackageReviews,
  mirrorToExperienceReviews,
  PACKAGE_REVIEW_LIMITS,
  readFileAsDataUrl,
  reviewsForPackage,
  savePackageReviews,
  type PackageReview,
} from '@/lib/package-reviews';
import './trek-guest-reviews.css';

type DisplayReview = {
  id: string;
  name: string;
  subtitle: string;
  text: string;
  rating: number;
  avatar?: string;
  photos?: string[];
  platform?: 'google' | 'tripadvisor';
  verifyUrl?: string;
  pending?: boolean;
};

type Props = {
  packageId: string;
  packageTitle: string;
  packageHref: string;
  packageKind: 'trek' | 'yatra' | 'trip';
  kindLabel: string;
  curated: TrekTestimonial[];
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

function nudge(ref: RefObject<HTMLDivElement | null>, dir: -1 | 1) {
  const el = ref.current;
  if (!el) return;
  const card = el.querySelector('.kg-testi-item') as HTMLElement | null;
  const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
  el.scrollBy({ left: dir * step, behavior: 'smooth' });
}

type FormState = {
  name: string;
  email: string;
  rating: number;
  text: string;
  avatarData: string;
  photoData: string[];
};

const emptyForm: FormState = {
  name: '',
  email: '',
  rating: 5,
  text: '',
  avatarData: '',
  photoData: [],
};

export default function TrekGuestReviews({
  packageId,
  packageTitle,
  packageHref,
  packageKind,
  kindLabel,
  curated,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [clientReviews, setClientReviews] = useState<PackageReview[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [formOpen, setFormOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    setClientReviews(reviewsForPackage(loadPackageReviews(), packageId));
  }, [packageId]);

  const displayReviews: DisplayReview[] = useMemo(() => {
    const fromClients: DisplayReview[] = clientReviews.map((r) => ({
      id: r.id,
      name: r.name,
      subtitle: r.pending ? `${packageTitle} · Pending` : packageTitle,
      text: r.text,
      rating: r.rating,
      avatar: r.avatar || undefined,
      photos: r.photos,
      pending: r.pending,
    }));
    const fromCurated: DisplayReview[] = curated.map((t, i) => ({
      id: `curated-${i}-${t.name}`,
      name: t.name,
      subtitle: t.posted ?? packageTitle,
      text: t.text,
      rating: t.rating ?? 5,
      platform: t.platform,
      verifyUrl: t.verifyUrl,
    }));
    return [...fromClients, ...fromCurated];
  }, [clientReviews, curated, packageTitle]);

  const onAvatar = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      const data = await readFileAsDataUrl(file);
      setForm((prev) => ({ ...prev, avatarData: data }));
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not read avatar.');
    }
  }, []);

  const onPhotos = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = '';
    if (!files.length) return;
    try {
      const remaining = PACKAGE_REVIEW_LIMITS.maxPhotos - form.photoData.length;
      const slice = files.slice(0, remaining);
      const dataUrls = await Promise.all(slice.map(readFileAsDataUrl));
      setForm((prev) => ({
        ...prev,
        photoData: [...prev.photoData, ...dataUrls].slice(0, PACKAGE_REVIEW_LIMITS.maxPhotos),
      }));
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not read photos.');
    }
  }, [form.photoData.length]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setSent(false);

    const name = form.name.trim();
    const email = form.email.trim();
    const text = form.text.trim();

    if (!name || !email) {
      setError('Please enter your name and email.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (text.length < PACKAGE_REVIEW_LIMITS.minTextLength) {
      setError('Please write at least a short paragraph (40+ characters).');
      return;
    }

    setSending(true);

    const avatar = form.avatarData;
    const photos = [...form.photoData];

    try {
      const res = await publicApiFetch('/api/package-reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          rating: form.rating,
          text,
          packageId,
          packageTitle,
          packageHref,
          packageKind,
          photoCount: form.photoData.length,
          hasAvatar: Boolean(form.avatarData),
        }),
      });
      if (!res.ok) {
        console.warn(await publicApiErrorMessage(res));
      }
    } catch {
      /* keep local publish path */
    }

    const review: PackageReview = {
      id: `pkg-${packageId}-${Date.now()}`,
      packageId,
      packageTitle,
      packageHref,
      packageKind,
      name,
      email,
      rating: form.rating,
      text,
      avatar:
        avatar ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop',
      photos,
      reviewedAt: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      pending: true,
    };

    const all = [review, ...loadPackageReviews().filter((r) => r.id !== review.id)];
    savePackageReviews(all);
    mirrorToExperienceReviews(review);
    setClientReviews(reviewsForPackage(all, packageId));
    setForm(emptyForm);
    setSent(true);
    setSending(false);
    setFormOpen(false);
  }

  return (
    <section className="kg-testi-shell" id="guest-reviews" aria-labelledby="kg-testi-title">
      <div className="kg-testi-card">
        <div className="kg-testi-head">
          <div>
            <span className="kg-testi-kicker">
              <i className="fa-solid fa-award" aria-hidden /> Trusted by Trekkers
            </span>
            <div className="kg-testi-title-row">
              <h2 id="kg-testi-title">Guest Testimonials</h2>
            </div>
            <div className="kg-testi-divider" />
            <p>Real feedback from guests who joined this {kindLabel.toLowerCase()}.</p>
          </div>
        </div>

        <div className="kg-testi-track" ref={trackRef}>
          {displayReviews.map((t) => (
            <article
              className={`kg-testi-item${t.pending ? ' kg-testi-item--pending' : ''}`}
              key={t.id}
            >
              <div className="kg-testi-item-top">
                <div className="kg-testi-user">
                  {t.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="kg-testi-avatar kg-testi-avatar--img" src={t.avatar} alt="" />
                  ) : (
                    <span className="kg-testi-avatar">{t.name.slice(0, 2)}</span>
                  )}
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.subtitle}</span>
                  </div>
                </div>
                {t.platform === 'google' ? (
                  <span className="kg-testi-badge kg-testi-badge-logo" aria-label="Google review">
                    <GoogleLogoIcon />
                  </span>
                ) : null}
              </div>
              <div className="kg-testi-stars" aria-label={`${t.rating} out of 5 stars`}>
                {[0, 1, 2, 3, 4].map((s) => (
                  <i
                    className={s < t.rating ? 'fa-solid fa-star' : 'fa-regular fa-star'}
                    key={s}
                    aria-hidden
                  />
                ))}
              </div>
              <div>
                <p>{t.text}</p>
              </div>
              {t.photos && t.photos.length > 0 ? (
                <div className="kg-testi-memories">
                  {t.photos.slice(0, 4).map((src, i) => (
                    <button
                      type="button"
                      key={`${t.id}-m-${i}`}
                      className="kg-testi-memory"
                      onClick={() => setLightbox(src)}
                      aria-label={`View memory photo ${i + 1}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt="" />
                    </button>
                  ))}
                </div>
              ) : null}
              {t.pending ? <p className="kg-testi-pending">Pending moderation</p> : null}
              {t.verifyUrl ? (
                <a
                  href={t.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="kg-testi-verify"
                >
                  <GoogleLogoIcon size={16} />
                  Verify on Google
                </a>
              ) : null}
            </article>
          ))}
        </div>

        <div className="kg-testi-nav">
          <button
            type="button"
            className="kg-related-btn"
            aria-label="Previous testimonial"
            onClick={() => nudge(trackRef, -1)}
          >
            <i className="fa-solid fa-chevron-left" aria-hidden />
          </button>
          <button
            type="button"
            className="kg-related-btn"
            aria-label="Next testimonial"
            onClick={() => nudge(trackRef, 1)}
          >
            <i className="fa-solid fa-chevron-right" aria-hidden />
          </button>
        </div>

        <div className="kg-review-compose">
          <div className="kg-review-compose-head">
            <div>
              <span className="kg-testi-kicker">
                <i className="fa-solid fa-pen-to-square" aria-hidden /> Share your story
              </span>
              <h3>Write a review for {packageTitle}</h3>
              <p>
                Rate this {kindLabel.toLowerCase()}, add your profile photo, and share memory images
                from the trail.
              </p>
            </div>
            <button
              type="button"
              className="kg-pill-btn kg-pill-btn--primary"
              onClick={() => {
                setFormOpen((v) => !v);
                setSent(false);
                setError('');
              }}
            >
              <i className={`fa-solid ${formOpen ? 'fa-xmark' : 'fa-plus'}`} aria-hidden />
              {formOpen ? 'Close form' : 'Add your review'}
            </button>
          </div>

          {sent ? (
            <p className="kg-review-success" role="status">
              Thanks — your review is live on this page and pending our team moderation.
            </p>
          ) : null}

          {formOpen ? (
            <form className="kg-review-form" onSubmit={onSubmit} noValidate>
              <div className="kg-review-form-grid">
                <label className="kg-review-field">
                  <span>Your name</span>
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Full name"
                    required
                  />
                </label>
                <label className="kg-review-field">
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    placeholder="you@email.com"
                    required
                  />
                </label>
              </div>

              <fieldset className="kg-review-rating">
                <legend>Your rating</legend>
                <div className="kg-review-stars" role="radiogroup" aria-label="Star rating">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      className={n <= form.rating ? 'is-on' : ''}
                      aria-label={`${n} star${n === 1 ? '' : 's'}`}
                      aria-pressed={n === form.rating}
                      onClick={() => setForm((p) => ({ ...p, rating: n }))}
                    >
                      <i className={n <= form.rating ? 'fa-solid fa-star' : 'fa-regular fa-star'} aria-hidden />
                    </button>
                  ))}
                </div>
              </fieldset>

              <label className="kg-review-field">
                <span>Your review</span>
                <textarea
                  name="review"
                  rows={5}
                  value={form.text}
                  onChange={(e) => setForm((p) => ({ ...p, text: e.target.value }))}
                  placeholder={`What stood out on this ${kindLabel.toLowerCase()}? Camp life, summit views, team care…`}
                  required
                />
              </label>

              <div className="kg-review-uploads">
                <label className="kg-review-upload">
                  <span className="kg-review-upload-title">
                    <i className="fa-solid fa-user" aria-hidden /> Profile photo
                  </span>
                  <span className="kg-review-upload-hint">Optional · under 900 KB</span>
                  <input type="file" accept="image/*" onChange={onAvatar} />
                  {form.avatarData ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="kg-review-upload-preview" src={form.avatarData} alt="" />
                  ) : (
                    <span className="kg-review-upload-empty">Choose photo</span>
                  )}
                </label>

                <label className="kg-review-upload kg-review-upload--wide">
                  <span className="kg-review-upload-title">
                    <i className="fa-solid fa-images" aria-hidden /> Memory photos
                  </span>
                  <span className="kg-review-upload-hint">
                    Up to {PACKAGE_REVIEW_LIMITS.maxPhotos} images · under 900 KB each
                  </span>
                  <input type="file" accept="image/*" multiple onChange={onPhotos} />
                  {form.photoData.length > 0 ? (
                    <div className="kg-review-upload-thumbs">
                      {form.photoData.map((src, i) => (
                        <span key={`up-${i}`} className="kg-review-thumb">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={src} alt="" />
                          <button
                            type="button"
                            aria-label={`Remove photo ${i + 1}`}
                            onClick={(ev) => {
                              ev.preventDefault();
                              setForm((p) => ({
                                ...p,
                                photoData: p.photoData.filter((_, idx) => idx !== i),
                              }));
                            }}
                          >
                            <i className="fa-solid fa-xmark" aria-hidden />
                          </button>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="kg-review-upload-empty">Add trail memories</span>
                  )}
                </label>
              </div>

              {error ? (
                <p className="kg-review-error" role="alert">
                  {error}
                </p>
              ) : null}

              <div className="kg-review-actions">
                <button type="submit" className="kg-pill-btn kg-pill-btn--primary" disabled={sending}>
                  {sending ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin" aria-hidden /> Publishing…
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-paper-plane" aria-hidden /> Publish review
                    </>
                  )}
                </button>
                <p className="kg-review-note">
                  Reviews appear on this {kindLabel.toLowerCase()} page immediately and are flagged for
                  team moderation.
                </p>
              </div>
            </form>
          ) : null}
        </div>
      </div>

      {lightbox ? (
        <div
          className="kg-review-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Memory photo"
          onClick={() => setLightbox(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lightbox} alt="" onClick={(e) => e.stopPropagation()} />
          <button type="button" className="kg-review-lightbox-close" onClick={() => setLightbox(null)}>
            <i className="fa-solid fa-xmark" aria-hidden />
            <span className="sr-only">Close</span>
          </button>
        </div>
      ) : null}
    </section>
  );
}
