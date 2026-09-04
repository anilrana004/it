'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import { publicApiFetch, publicApiErrorMessage } from '@/lib/api/client';
import {
  CLIENT_REVIEWS_STORAGE_KEY,
  EXPERIENCE_KIND_TABS,
  EXPERIENCE_REVIEWS,
  EXPERIENCE_REVIEWS_SECTION,
  experienceOptionsForKind,
  findExperienceOption,
  type ExperienceKind,
  type ExperienceReview,
} from '@/lib/experience-reviews-content';

const MAX_PHOTOS = 4;
const MAX_IMAGE_BYTES = 900_000;

type FormState = {
  name: string;
  email: string;
  kind: ExperienceKind;
  experienceId: string;
  rating: number;
  text: string;
  avatarData: string;
  photoData: string[];
};

const emptyForm: FormState = {
  name: '',
  email: '',
  kind: 'trek',
  experienceId: '',
  rating: 5,
  text: '',
  avatarData: '',
  photoData: [],
};

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Please choose an image file.'));
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      reject(new Error('Each image must be under 900 KB. Compress and try again.'));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('Could not read that image.'));
    reader.readAsDataURL(file);
  });
}

function loadClientReviews(): ExperienceReview[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CLIENT_REVIEWS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ExperienceReview[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveClientReviews(reviews: ExperienceReview[]) {
  try {
    localStorage.setItem(CLIENT_REVIEWS_STORAGE_KEY, JSON.stringify(reviews.slice(0, 40)));
  } catch {
    /* quota — keep in-memory only */
  }
}

function ExperienceReviewCard({ review }: { review: ExperienceReview }) {
  return (
    <article className={`it-rv-exp__card${review.pending ? ' is-pending' : ''}`}>
      <header className="it-rv-exp__card-head">
        <span className="it-rv-exp__avatar">
          {review.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element -- client data-URL avatars
            <img src={review.avatar} alt="" />
          ) : (
            <span className="it-rv-exp__avatar-fallback" aria-hidden>
              {review.name.slice(0, 1)}
            </span>
          )}
        </span>
        <span className="it-rv-exp__meta">
          <strong>{review.name}</strong>
          <span>{review.reviewedAt}</span>
        </span>
        <span className="it-rv-exp__rating" aria-label={`${review.rating} out of 5`}>
          <i className="fa-solid fa-star" aria-hidden />
          {review.rating}
        </span>
      </header>

      <p className="it-rv-exp__booked">
        <i className="fa-solid fa-mountain-sun" aria-hidden />
        {review.experienceName}
      </p>

      <p className="it-rv-exp__text">{review.text}</p>

      {review.pending ? <p className="it-rv-exp__pending">Pending moderation</p> : null}

      {review.photos.length > 0 ? (
        <div className="it-rv-exp__photos">
          {review.photos.slice(0, 4).map((src, i) => (
            <span key={`${review.id}-p-${i}`} className="it-rv-exp__photo">
              {src.startsWith('data:') ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={src} alt="" />
              ) : (
                <Image src={src} alt="" fill sizes="96px" />
              )}
            </span>
          ))}
        </div>
      ) : null}

      <Link href={review.experienceHref} className="it-rv-exp__cta">
        {EXPERIENCE_REVIEWS_SECTION.ctaLabel}
        <i className="fa-solid fa-arrow-right" aria-hidden />
      </Link>
    </article>
  );
}

export default function ExperienceReviewsSection() {
  const [kind, setKind] = useState<ExperienceKind>('trek');
  const [clientReviews, setClientReviews] = useState<ExperienceReview[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setClientReviews(loadClientReviews());
  }, []);

  const options = useMemo(() => experienceOptionsForKind(form.kind), [form.kind]);

  const visible = useMemo(() => {
    const seeded = EXPERIENCE_REVIEWS.filter((r) => r.kind === kind);
    const local = clientReviews.filter((r) => r.kind === kind);
    return [...local, ...seeded];
  }, [kind, clientReviews]);

  const setField =
    (key: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = e.target.value;
      setForm((prev) => {
        if (key === 'kind') {
          return { ...prev, kind: value as ExperienceKind, experienceId: '' };
        }
        if (key === 'rating') {
          return { ...prev, rating: Number(value) || 5 };
        }
        return { ...prev, [key]: value };
      });
      if (error) setError('');
    };

  async function onAvatarChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = await readFileAsDataUrl(file);
      setForm((prev) => ({ ...prev, avatarData: data }));
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not use that photo.');
    }
  }

  async function onPhotosChange(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []).slice(0, MAX_PHOTOS);
    if (!files.length) return;
    try {
      const urls = await Promise.all(files.map(readFileAsDataUrl));
      setForm((prev) => ({
        ...prev,
        photoData: [...prev.photoData, ...urls].slice(0, MAX_PHOTOS),
      }));
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not use those photos.');
    }
    e.target.value = '';
  }

  function removePhoto(index: number) {
    setForm((prev) => ({
      ...prev,
      photoData: prev.photoData.filter((_, i) => i !== index),
    }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    const name = form.name.trim();
    const email = form.email.trim();
    const text = form.text.trim();
    const option = findExperienceOption(form.kind, form.experienceId);

    if (!name || !email || !text) {
      setError('Name, email, and review text are required.');
      return;
    }
    if (!option) {
      setError('Pick the trek, yatra, trip, or program you experienced.');
      return;
    }
    if (text.length < 40) {
      setError('Please write at least a short paragraph (40+ characters).');
      return;
    }

    setSending(true);

    const review: ExperienceReview = {
      id: `client-${Date.now()}`,
      name,
      avatar: form.avatarData || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop',
      reviewedAt: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      rating: form.rating,
      kind: form.kind,
      experienceId: option.id,
      experienceName: option.label,
      experienceHref: option.href,
      text,
      photos: form.photoData,
      pending: true,
    };

    const kindLabel = EXPERIENCE_KIND_TABS.find((t) => t.id === form.kind)?.label ?? form.kind;
    const message = [
      '[Traveller review submission]',
      `Kind: ${kindLabel}`,
      `Experience: ${option.label} (${option.href})`,
      `Rating: ${form.rating}/5`,
      `Photos attached in browser: ${form.photoData.length}`,
      `Avatar attached: ${form.avatarData ? 'yes' : 'no'}`,
      '',
      text,
    ].join('\n');

    try {
      const res = await publicApiFetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone: '', message }),
      });
      if (!res.ok) {
        // Still surface locally; team can re-collect via email if DB is down
        console.warn(await publicApiErrorMessage(res));
      }
    } catch {
      /* keep local publish path */
    }

    const next = [review, ...clientReviews];
    setClientReviews(next);
    saveClientReviews(next);
    setKind(form.kind);
    setForm(emptyForm);
    setSent(true);
    setSending(false);
  }

  return (
    <section className="it-reviews__section it-rv-exp" aria-labelledby="it-rv-exp-title">
      <div className="it-reviews__wrap">
        <header className="it-reviews__section-head">
          <p className="it-reviews__kicker">{EXPERIENCE_REVIEWS_SECTION.kicker}</p>
          <h2 id="it-rv-exp-title">{EXPERIENCE_REVIEWS_SECTION.title}</h2>
          <p>{EXPERIENCE_REVIEWS_SECTION.intro}</p>
        </header>

        <div className="it-rv-exp__tabs" role="tablist" aria-label="Review experience type">
          {EXPERIENCE_KIND_TABS.map((tab) => {
            const selected = kind === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                className={`it-rv-exp__tab${selected ? ' is-active' : ''}`}
                onClick={() => setKind(tab.id)}
              >
                <i className={`fa-solid ${tab.icon}`} aria-hidden />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <p className="it-rv-exp__blurb">
          {EXPERIENCE_KIND_TABS.find((t) => t.id === kind)?.blurb}
        </p>

        <div className="it-rv-exp__grid">
          {visible.map((review) => (
            <ExperienceReviewCard key={review.id} review={review} />
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="it-rv-exp__empty">No reviews in this category yet — be the first to share yours below.</p>
        ) : null}

        <div className="it-rv-exp__form-wrap" id="share-review">
          <header className="it-rv-exp__form-head">
            <h3>{EXPERIENCE_REVIEWS_SECTION.formTitle}</h3>
            <p>{EXPERIENCE_REVIEWS_SECTION.formIntro}</p>
          </header>

          {sent ? (
            <p className="it-rv-exp__success" role="status">
              <i className="fa-solid fa-circle-check" aria-hidden />
              {EXPERIENCE_REVIEWS_SECTION.formSuccess}
            </p>
          ) : null}

          <form className="it-rv-exp__form" onSubmit={onSubmit} noValidate>
            <div className="it-rv-exp__form-row it-rv-exp__form-row--avatar">
              <label className="it-rv-exp__avatar-pick">
                <span className="it-rv-exp__avatar-preview">
                  {form.avatarData ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={form.avatarData} alt="" />
                  ) : (
                    <i className="fa-solid fa-camera" aria-hidden />
                  )}
                </span>
                <span>Your photo</span>
                <input type="file" accept="image/*" onChange={onAvatarChange} />
              </label>
            </div>

            <div className="it-rv-exp__form-grid">
              <label>
                <span>Your name</span>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={setField('name')}
                  required
                  placeholder="Full name"
                />
              </label>
              <label>
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={setField('email')}
                  required
                  placeholder="you@email.com"
                />
              </label>
              <label>
                <span>Category</span>
                <select name="kind" value={form.kind} onChange={setField('kind')} required>
                  {EXPERIENCE_KIND_TABS.map((tab) => (
                    <option key={tab.id} value={tab.id}>
                      {tab.label}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>Trek / yatra / trip / program</span>
                <select
                  name="experienceId"
                  value={form.experienceId}
                  onChange={setField('experienceId')}
                  required
                >
                  <option value="">Select experience</option>
                  {options.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>Rating</span>
                <select name="rating" value={form.rating} onChange={setField('rating')}>
                  {[5, 4, 3, 2, 1].map((n) => (
                    <option key={n} value={n}>
                      {n} / 5
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="it-rv-exp__form-text">
              <span>Your review</span>
              <textarea
                name="text"
                rows={5}
                value={form.text}
                onChange={setField('text')}
                required
                placeholder="What was the trail like? Food, leaders, stays — share what future travellers should know."
              />
            </label>

            <div className="it-rv-exp__form-photos">
              <div className="it-rv-exp__form-photos-head">
                <span>Trip photos (up to {MAX_PHOTOS})</span>
                <label className="it-rv-exp__photo-add">
                  <i className="fa-solid fa-image" aria-hidden />
                  Add images
                  <input type="file" accept="image/*" multiple onChange={onPhotosChange} />
                </label>
              </div>
              {form.photoData.length > 0 ? (
                <div className="it-rv-exp__form-photo-grid">
                  {form.photoData.map((src, i) => (
                    <span key={`up-${i}`} className="it-rv-exp__form-photo">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt="" />
                      <button type="button" aria-label="Remove photo" onClick={() => removePhoto(i)}>
                        <i className="fa-solid fa-xmark" aria-hidden />
                      </button>
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            {error ? (
              <p className="it-rv-exp__error" role="alert">
                {error}
              </p>
            ) : null}

            <button type="submit" className="it-rv-exp__submit" disabled={sending}>
              {sending ? 'Sending…' : 'Post review'}
              <i className="fa-solid fa-paper-plane" aria-hidden />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
