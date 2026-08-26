'use client';

import { FormEvent, useMemo, useState, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  CalendarDays,
  Clock3,
  MapPin,
  Mountain,
  Route,
  Sparkles,
  TimerReset,
  Users,
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import TrekInfoCard from '@/components/treks/TrekInfoCard';
import { CONTACT, mailtoUrl, telUrl, whatsappUrl } from '@/lib/contact';
import type { LpLandingContent } from '@/lib/corporate/learning-program-types';
import { getTrekById } from '@/lib/data';
import { toListingTrek } from '@/lib/treks-listing';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './corporate-team-building.css';

const categories = [
  { label: 'Treks by Month', href: '/treks', icon: CalendarDays },
  { label: 'Treks by Difficulty', href: '/treks', icon: Mountain },
  { label: 'Treks by Experience', href: '/treks', icon: Sparkles },
  { label: 'Treks by Season', href: '/treks', icon: Route },
  { label: 'Treks by Duration', href: '/treks', icon: TimerReset },
  { label: 'Treks by Region', href: '/treks', icon: Users },
];

export default function LearningProgramLandingView({
  content,
  afterProgrammes,
  beforeInquiry,
}: {
  content: LpLandingContent;
  afterProgrammes?: ReactNode;
  beforeInquiry?: ReactNode;
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [activeProg, setActiveProg] = useState(content.programmes.items[0]?.id ?? '');
  const [showVideo, setShowVideo] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    org: '',
    size: '',
    programme: '',
    date: '',
    message: '',
  });

  const visibleReviews = showAllReviews
    ? content.reviews.items
    : content.reviews.items.slice(0, 4);

  const programme = useMemo(
    () =>
      content.programmes.items.find((p) => p.id === activeProg) ?? content.programmes.items[0],
    [activeProg, content.programmes.items],
  );

  const trekList = useMemo(() => {
    if (!content.treks?.ids?.length) return [];
    return content.treks.ids
      .map((id) => getTrekById(id))
      .filter((t): t is NonNullable<typeof t> => Boolean(t))
      .map(toListingTrek);
  }, [content.treks?.ids]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.org
            ? `${form.name} (${form.org}${form.size ? `, ${form.size}` : ''})`
            : form.size
              ? `${form.name} (${form.size})`
              : form.name,
          email: form.email,
          phone: form.phone,
          message: `[${content.variant}] Programme: ${form.programme || 'Not specified'}\nPreferred Dates: ${
            form.date || 'Not specified'
          }\nMessage: ${form.message}`,
        }),
      });
      if (res.ok) setSubmitted(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="it-corp">
      <section className="it-corp__hero">
        <div className="it-corp__hero-media" aria-hidden>
          <Image src={content.hero.image} alt="" fill priority sizes="100vw" />
        </div>
        <div className="it-corp__hero-shade" />
        <div className="it-corp__hero-inner">
          <p className="it-corp__eyebrow">{content.hero.eyebrow}</p>
          <h1>{content.hero.title}</h1>
          <p className="it-corp__hero-lead">{content.hero.lead}</p>
          <div className="it-corp__hero-actions">
            {content.hero.youtubeId ? (
              <button
                type="button"
                className="it-corp__btn it-corp__btn--ghost"
                onClick={() => setShowVideo(true)}
              >
                <i className="fa-solid fa-play" aria-hidden />
                {content.hero.secondaryCta || 'Play video'}
              </button>
            ) : content.hero.secondaryCta ? (
              <a className="it-corp__btn it-corp__btn--ghost" href="#programmes">
                {content.hero.secondaryCta}
              </a>
            ) : null}
            <a
              className="it-corp__btn it-corp__btn--primary"
              href={whatsappUrl(content.hero.primaryWhatsapp)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {content.hero.primaryCta}
            </a>
          </div>
        </div>
      </section>

      {showVideo && content.hero.youtubeId ? (
        <section className="it-corp__section it-corp__section--soft">
          <div className="it-corp__container">
            <div className="it-corp__video-frame">
              <iframe
                title="Program film"
                src={`https://www.youtube-nocookie.com/embed/${content.hero.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      ) : null}

      <section className="it-corp__section it-corp__section--soft it-corp__brands-section">
        <div className="it-corp__container">
          <div className="it-corp__heading it-corp__heading--center">
            <p className="it-corp__kicker">{content.brands.kicker}</p>
            <h2>{content.brands.title}</h2>
            <p>{content.brands.intro}</p>
          </div>
        </div>
        <div className="it-corp__brands-marquee" aria-label={content.brands.title}>
          <div className="it-corp__brands-track">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                className="it-corp__brands-group"
                aria-hidden={copy === 1 ? true : undefined}
              >
                {content.brands.items.map((brand) => (
                  <li key={`${copy}-${brand.id}`} className="it-corp__brand">
                    {brand.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={brand.logo}
                        alt={copy === 0 ? brand.name : ''}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <span className="it-corp__brand-placeholder">Logo</span>
                    )}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      <section className="it-corp__section">
        <div className="it-corp__container it-corp__split">
          <div>
            <p className="it-corp__kicker">{content.benefits.kicker}</p>
            <div className="it-corp__heading" style={{ marginBottom: 0 }}>
              <h2>{content.benefits.title}</h2>
              <p className="it-corp__intro">{content.benefits.intro}</p>
            </div>
            <ul className="it-corp__list">
              {content.benefits.items.map((item) => (
                <li key={item}>
                  <i className="fa-solid fa-check" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="it-corp__media">
            <Image
              src={content.benefits.image}
              alt={content.benefits.imageAlt}
              fill
              sizes="(max-width: 900px) 100vw, 48vw"
            />
            {content.hero.youtubeId && !showVideo ? (
              <button type="button" className="it-corp__play" onClick={() => setShowVideo(true)}>
                <span>
                  <i className="fa-solid fa-play" aria-hidden />
                  Play video
                </span>
              </button>
            ) : null}
          </div>
        </div>
      </section>

      <section className="it-corp__section it-corp__section--wash">
        <div className="it-corp__container">
          <div className="it-corp__heading it-corp__heading--center">
            <p className="it-corp__kicker">{content.whyBetter.kicker}</p>
            <h2>{content.whyBetter.title}</h2>
          </div>
          <div className="it-corp__why-grid">
            {content.whyBetter.items.map((item, index) => (
              <article key={item.title} className="it-corp__why-card">
                <span className="it-corp__why-num">{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="it-corp__section">
        <div className="it-corp__container">
          <div className="it-corp__heading it-corp__heading--center">
            <p className="it-corp__kicker">{content.reviews.kicker}</p>
            <h2>{content.reviews.title}</h2>
            <p>{content.reviews.intro}</p>
          </div>
          <div className="it-corp__reviews-shell">
            <Swiper
              className="it-corp__reviews-swiper"
              modules={[Navigation, Pagination]}
              spaceBetween={18}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                760: { slidesPerView: 1.2 },
                980: { slidesPerView: 2 },
              }}
            >
              {visibleReviews.map((review) => {
                const open = expandedId === review.id;
                return (
                  <SwiperSlide key={review.id}>
                    <article className="it-corp__review">
                      <div className="it-corp__review-meta">
                        <strong>{review.name}</strong>
                        <span>{review.role}</span>
                      </div>
                      <div className="it-corp__stars" aria-hidden>
                        ★★★★★
                      </div>
                      <p className="it-corp__review-quote">
                        “{open ? review.full : review.short}”
                      </p>
                      <button
                        type="button"
                        className="it-corp__review-toggle"
                        onClick={() => setExpandedId(open ? null : review.id)}
                      >
                        {open ? 'Read less' : 'Read more'}
                      </button>
                    </article>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <div className="it-corp__reviews-actions">
              <button
                type="button"
                className="it-corp__reviews-more"
                onClick={() => {
                  setShowAllReviews((v) => !v);
                  setExpandedId(null);
                }}
              >
                {showAllReviews ? 'See less reviews' : 'See more reviews'}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="it-corp__section it-corp__section--soft">
        <div className="it-corp__container it-corp__split it-corp__split--flip">
          <div>
            <p className="it-corp__kicker">{content.difficulties.kicker}</p>
            <div className="it-corp__heading" style={{ marginBottom: 0 }}>
              <h2>{content.difficulties.title}</h2>
              <p className="it-corp__intro">{content.difficulties.intro}</p>
            </div>
            <ul className="it-corp__list">
              {content.difficulties.items.map((item) => (
                <li key={item}>
                  <i
                    className="fa-solid fa-circle"
                    aria-hidden
                    style={{ fontSize: '0.42rem', marginTop: '0.5rem' }}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="it-corp__media">
            <Image
              src={content.difficulties.image}
              alt={content.difficulties.imageAlt}
              fill
              sizes="(max-width: 900px) 100vw, 48vw"
            />
          </div>
        </div>
      </section>

      <section className="it-corp__section" id="programmes">
        <div className="it-corp__container">
          <div className="it-corp__heading">
            <p className="it-corp__kicker">{content.programmes.kicker}</p>
            <h2>{content.programmes.title}</h2>
            <p>{content.programmes.intro}</p>
          </div>
          <div className="it-corp__prog-tabs" role="tablist">
            {content.programmes.items.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={activeProg === item.id}
                className={`it-corp__prog-tab${activeProg === item.id ? ' is-active' : ''}`}
                onClick={() => setActiveProg(item.id)}
              >
                {item.title}
              </button>
            ))}
          </div>
          {programme ? (
            <div className="it-corp__prog-panel">
              <div className="it-corp__prog-media">
                <Image
                  src={programme.image}
                  alt={programme.title}
                  fill
                  sizes="(max-width: 880px) 100vw, 50vw"
                />
              </div>
              <div className="it-corp__prog-body">
                <h3>{programme.title}</h3>
                <p>{programme.blurb}</p>
                <div className="it-corp__prog-meta">
                  <span className="it-corp__chip">
                    <Clock3 size={14} strokeWidth={2.2} />
                    {programme.duration}
                  </span>
                  <span className="it-corp__chip">
                    <MapPin size={14} strokeWidth={2.2} />
                    {programme.location}
                  </span>
                </div>
                <p className="it-corp__prog-overview">
                  <strong>Overview: </strong>
                  {programme.overview}
                </p>
                <div className="it-corp__prog-cta">
                  <a
                    className="it-corp__btn it-corp__btn--primary"
                    href={whatsappUrl(`${content.programmes.enquirePrefix} ${programme.title}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Enquire about this
                  </a>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {afterProgrammes}

      {content.gift ? (
        <section className="it-corp__section it-corp__section--wash">
          <div className="it-corp__container">
            <div className="it-corp__heading it-corp__heading--center">
              <p className="it-corp__kicker">Perfect for</p>
              <h2>Occasions that deserve a mountain memory</h2>
            </div>
            <div className="it-corp__why-grid">
              {content.gift.occasions.map((item, index) => (
                <article key={item.title} className="it-corp__why-card">
                  <span className="it-corp__why-num">{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {beforeInquiry}

      {trekList.length > 0 && content.treks ? (
        <section className="it-corp__section it-corp__section--soft" id="program-treks">
          <div className="it-corp__container">
            <div className="it-corp__heading">
              <p className="it-corp__kicker">{content.treks.kicker}</p>
              <h2>{content.treks.title}</h2>
              <p>{content.treks.intro}</p>
            </div>
            <p className="it-corp__trek-note">{content.treks.note}</p>
            <div className="it-corp__trek-grid">
              {trekList.map((trek) => (
                <TrekInfoCard key={trek.id} trek={trek} fill />
              ))}
            </div>
            <div className="it-corp__trek-foot">
              <Link href="/treks?region=uttarakhand" className="it-corp__btn it-corp__btn--dark-ghost">
                Uttarakhand treks
              </Link>
              <Link href="/treks?region=himachal" className="it-corp__btn it-corp__btn--dark-ghost">
                Himachal treks
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <section className="it-corp__section it-corp__section--wash">
        <div className="it-corp__container">
          <div className="it-corp__heading it-corp__heading--center">
            <p className="it-corp__kicker">{content.gallery.kicker}</p>
            <h2>{content.gallery.title}</h2>
          </div>
          <div className="it-corp__gallery">
            {content.gallery.items.map((image) => (
              <figure key={image.alt} className="it-corp__gallery-item">
                <Image src={image.src} alt={image.alt} fill sizes="(max-width: 800px) 50vw, 25vw" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="it-corp__section">
        <div className="it-corp__container">
          <div className="it-corp__cta">
            <div>
              <p className="it-corp__kicker" style={{ color: '#86efac' }}>
                {content.cta.kicker}
              </p>
              <h2>{content.cta.title}</h2>
              <p>{content.cta.body}</p>
            </div>
            <div className="it-corp__cta-actions">
              <a
                className="it-corp__btn it-corp__btn--primary"
                href={whatsappUrl(content.cta.primaryWhatsapp)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content.cta.primaryLabel}
              </a>
              <a className="it-corp__btn it-corp__btn--ghost" href={content.cta.secondaryHref}>
                {content.cta.secondaryLabel}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="it-corp__section it-corp__section--soft">
        <div className="it-corp__container">
          <div className="it-corp__heading">
            <p className="it-corp__kicker">{content.articles.kicker}</p>
            <h2>{content.articles.title}</h2>
          </div>
          <div className="it-corp__articles">
            {content.articles.items.map((article) => (
              <Link key={article.title} href={article.href} className="it-corp__article">
                <span className="it-corp__article-media">
                  <Image src={article.image} alt="" fill sizes="(max-width: 760px) 100vw, 25vw" />
                </span>
                <span className="it-corp__article-body">
                  <span className="it-corp__article-meta">{article.read}</span>
                  <strong>{article.title}</strong>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="it-corp__section">
        <div className="it-corp__container">
          <div className="it-corp__heading">
            <p className="it-corp__kicker">Treks by categories</p>
            <h2>Explore the wider catalogue</h2>
            <p>Find more journeys across seasons, difficulty, and regions.</p>
          </div>
          <div className="it-corp__categories">
            {categories.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.label} href={item.href} className="it-corp__category">
                  <span className="it-corp__category-ico" aria-hidden>
                    <Icon size={18} strokeWidth={2.1} />
                  </span>
                  <span>{item.label}</span>
                  <i className="fa-solid fa-arrow-right" aria-hidden />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {content.gift ? (
        <section className="it-corp__section it-corp__section--soft">
          <div className="it-corp__container">
            <div className="it-corp__heading it-corp__heading--center">
              <p className="it-corp__kicker">FAQs</p>
              <h2>Gift card questions, answered</h2>
            </div>
            <div className="it-corp__faq">
              {content.gift.faqs.map((f) => (
                <details key={f.q} className="it-corp__faq-item">
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="it-corp__section it-corp__section--wash" id="inquiry">
        <div className="it-corp__container it-corp__inquiry">
          <div>
            <p className="it-corp__kicker">{content.inquiry.kicker}</p>
            <div className="it-corp__heading" style={{ marginBottom: 0 }}>
              <h2>{content.inquiry.title}</h2>
              <p className="it-corp__intro">{content.inquiry.intro}</p>
            </div>
            <ul className="it-corp__contact-list">
              <li>
                Call: <a href={telUrl()}>{CONTACT.phoneDisplay}</a>
              </li>
              <li>
                Email:{' '}
                <a href={mailtoUrl(`${content.variant} enquiry — Indian Treks`)}>{CONTACT.email}</a>
              </li>
              <li>Hours: {CONTACT.hours}</li>
            </ul>
          </div>

          {submitted ? (
            <div className="it-corp__success">
              <i
                className="fa-solid fa-circle-check"
                style={{ fontSize: '2rem', color: '#16a34a' }}
                aria-hidden
              />
              <h3>Thank you!</h3>
              <p>{content.inquiry.successBody}</p>
            </div>
          ) : (
            <form className="it-corp__form" onSubmit={handleSubmit}>
              <div className="it-corp__form-row">
                <div className="it-corp__field">
                  <label htmlFor="lp-name">Your name *</label>
                  <input
                    id="lp-name"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  />
                </div>
                <div className="it-corp__field">
                  <label htmlFor="lp-org">{content.inquiry.orgLabel}</label>
                  <input
                    id="lp-org"
                    value={form.org}
                    onChange={(e) => setForm((f) => ({ ...f, org: e.target.value }))}
                  />
                </div>
              </div>
              <div className="it-corp__form-row">
                <div className="it-corp__field">
                  <label htmlFor="lp-email">Email *</label>
                  <input
                    id="lp-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  />
                </div>
                <div className="it-corp__field">
                  <label htmlFor="lp-phone">Phone</label>
                  <input
                    id="lp-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  />
                </div>
              </div>
              <div className="it-corp__form-row">
                <div className="it-corp__field">
                  <label htmlFor="lp-size">{content.inquiry.sizeLabel}</label>
                  <select
                    id="lp-size"
                    value={form.size}
                    onChange={(e) => setForm((f) => ({ ...f, size: e.target.value }))}
                  >
                    <option value="">Select…</option>
                    {content.inquiry.sizeOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="it-corp__field">
                  <label htmlFor="lp-prog">{content.inquiry.programmeLabel}</label>
                  <select
                    id="lp-prog"
                    value={form.programme}
                    onChange={(e) => setForm((f) => ({ ...f, programme: e.target.value }))}
                  >
                    <option value="">Not decided yet</option>
                    {content.programmes.items.map((p) => (
                      <option key={p.id} value={p.title}>
                        {p.title}
                      </option>
                    ))}
                    {content.gift
                      ? content.gift.occasions.map((o) => (
                          <option key={o.title} value={o.title}>
                            {o.title}
                          </option>
                        ))
                      : null}
                  </select>
                </div>
              </div>
              <div className="it-corp__field">
                <label htmlFor="lp-date">Preferred dates</label>
                <input
                  id="lp-date"
                  placeholder="e.g. March 2027"
                  value={form.date}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                />
              </div>
              <div className="it-corp__field">
                <label htmlFor="lp-msg">Message</label>
                <textarea
                  id="lp-msg"
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                />
              </div>
              <button type="submit" className="it-corp__btn it-corp__btn--primary" disabled={sending}>
                {sending ? 'Sending…' : 'Send enquiry'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
