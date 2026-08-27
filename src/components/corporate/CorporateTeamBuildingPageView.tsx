'use client';

import { FormEvent, useMemo, useState } from 'react';
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
import CorporateTeamBuildingHero from '@/components/corporate/CorporateTeamBuildingHero';
import { CONTACT, mailtoUrl, telUrl, whatsappUrl } from '@/lib/contact';
import {
  CORPORATE_TREK_IDS,
  corporateArticles,
  corporateBenefits,
  corporateBrands,
  corporateDifficulties,
  corporateGallery,
  corporateProgrammes,
  corporateReviews,
  corporateWhyBetter,
} from '@/lib/corporate/team-building-content';
import { getTrekById } from '@/lib/data';
import { toListingTrek } from '@/lib/treks-listing';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './corporate-team-building.css';

const YOUTUBE_ID = '9vb3QfUth58';

const categories = [
  { label: 'Treks by Month', href: '/treks', icon: CalendarDays },
  { label: 'Treks by Difficulty', href: '/treks', icon: Mountain },
  { label: 'Treks by Experience', href: '/treks', icon: Sparkles },
  { label: 'Treks by Season', href: '/treks', icon: Route },
  { label: 'Treks by Duration', href: '/treks', icon: TimerReset },
  { label: 'Treks by Region', href: '/treks', icon: Users },
];

export default function CorporateTeamBuildingPageView() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [activeProg, setActiveProg] = useState(corporateProgrammes[0].id);
  const [showVideo, setShowVideo] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    groupSize: '',
    programme: '',
    date: '',
    message: '',
  });

  const visibleReviews = showAllReviews ? corporateReviews : corporateReviews.slice(0, 4);
  const programme = useMemo(
    () => corporateProgrammes.find((p) => p.id === activeProg) ?? corporateProgrammes[0],
    [activeProg],
  );

  const corporateTreks = useMemo(
    () =>
      CORPORATE_TREK_IDS.map((id) => getTrekById(id))
        .filter((t): t is NonNullable<typeof t> => Boolean(t))
        .map(toListingTrek),
    [],
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.company
            ? `${form.name} (${form.company}${form.groupSize ? `, ${form.groupSize} pax` : ''})`
            : form.groupSize
              ? `${form.name} (${form.groupSize} pax)`
              : form.name,
          email: form.email,
          phone: form.phone,
          message: `Programme: ${form.programme || 'Not specified'}\nPreferred Dates: ${
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
      <CorporateTeamBuildingHero onPlayVideo={() => setShowVideo(true)} />

      {showVideo ? (
        <section className="it-corp__section it-corp__section--soft">
          <div className="it-corp__container">
            <div className="it-corp__video-frame">
              <iframe
                title="Corporate team building trek film"
                src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      ) : null}

      {/* Trusted brands — horizontal auto scroller */}
      <section className="it-corp__section it-corp__section--soft it-corp__brands-section">
        <div className="it-corp__container">
          <div className="it-corp__heading it-corp__heading--center">
            <p className="it-corp__kicker">Our clients</p>
            <h2>Trusted by Brands Across the Country</h2>
            <p>Companies that chose the mountains for deeper team bonding and collaboration.</p>
          </div>
        </div>

        <div className="it-corp__brands-marquee" aria-label="Trusted brand partners">
          <div className="it-corp__brands-track">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                className="it-corp__brands-group"
                aria-hidden={copy === 1 ? true : undefined}
              >
                {corporateBrands.map((brand) => (
                  <li key={`${copy}-${brand.id}`} className="it-corp__brand">
                    {brand.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={brand.logo} alt={copy === 0 ? brand.name : ''} loading="lazy" decoding="async" />
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

      {/* Benefits */}
      <section className="it-corp__section">
        <div className="it-corp__container it-corp__split">
          <div>
            <p className="it-corp__kicker">Why it works</p>
            <div className="it-corp__heading" style={{ marginBottom: 0 }}>
              <h2>How do corporate teams benefit from trekking?</h2>
              <p className="it-corp__intro">
                Away from formal structures and through the adventure of trekking, teams:
              </p>
            </div>
            <ul className="it-corp__list">
              {corporateBenefits.map((item) => (
                <li key={item}>
                  <i className="fa-solid fa-check" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="it-corp__media">
            <Image src={corporateGallery[0].src} alt={corporateGallery[0].alt} fill sizes="(max-width: 900px) 100vw, 48vw" />
            {!showVideo ? (
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

      {/* Why better */}
      <section className="it-corp__section it-corp__section--wash">
        <div className="it-corp__container">
          <div className="it-corp__heading it-corp__heading--center">
            <p className="it-corp__kicker">Beyond the usual offsite</p>
            <h2>Why treks are better for team building than regular corporate offsite programmes</h2>
          </div>
          <div className="it-corp__why-grid">
            {corporateWhyBetter.map((item, index) => (
              <article key={item.title} className="it-corp__why-card">
                <span className="it-corp__why-num">{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="it-corp__section">
        <div className="it-corp__container">
          <div className="it-corp__heading it-corp__heading--center">
            <p className="it-corp__kicker">Trekker reviews</p>
            <h2>What participating teams have to say</h2>
            <p>Leaders and teams who chose the mountains over resorts — and came back more connected.</p>
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
                      <p className="it-corp__review-quote">“{open ? review.full : review.short}”</p>
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

      {/* Difficulties */}
      <section className="it-corp__section it-corp__section--soft">
        <div className="it-corp__container it-corp__split it-corp__split--flip">
          <div>
            <p className="it-corp__kicker">The real problem</p>
            <div className="it-corp__heading" style={{ marginBottom: 0 }}>
              <h2>What makes working in a team so difficult?</h2>
              <p className="it-corp__intro">
                Working seamlessly in teams is imperative in any workplace, but it’s not as simple as it
                sounds.
              </p>
            </div>
            <ul className="it-corp__list">
              {corporateDifficulties.map((item) => (
                <li key={item}>
                  <i className="fa-solid fa-circle" aria-hidden style={{ fontSize: '0.42rem', marginTop: '0.5rem' }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="it-corp__media">
            <Image src={corporateGallery[1].src} alt={corporateGallery[1].alt} fill sizes="(max-width: 900px) 100vw, 48vw" />
          </div>
        </div>
      </section>

      {/* Programmes */}
      <section className="it-corp__section" id="programmes">
        <div className="it-corp__container">
          <div className="it-corp__heading">
            <p className="it-corp__kicker">Our programmes for companies</p>
            <h2>Whether you want to bond with colleagues or push teams out of comfort zones</h2>
            <p>We design treks tailored to meet your goals — from a single shared summit day to immersive leadership journeys.</p>
          </div>

          <div className="it-corp__prog-tabs" role="tablist" aria-label="Corporate programmes">
            {corporateProgrammes.map((item) => (
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

          <div className="it-corp__prog-panel">
            <div className="it-corp__prog-media">
              <Image src={programme.image} alt={programme.title} fill sizes="(max-width: 880px) 100vw, 50vw" />
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
                <strong>Programme overview: </strong>
                {programme.overview}
              </p>
              <div className="it-corp__prog-cta">
                <a
                  className="it-corp__btn it-corp__btn--primary"
                  href={whatsappUrl(
                    `Hi Indian Treks! I’m interested in the corporate programme: ${programme.title}.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Enquire about this programme
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate treks — UK + HP */}
      <section className="it-corp__section it-corp__section--soft" id="corporate-treks">
        <div className="it-corp__container">
          <div className="it-corp__heading">
            <p className="it-corp__kicker">Routes we run for companies</p>
            <h2>Corporate treks in Uttarakhand &amp; Himachal</h2>
            <p>
              Ten proven UK and HP routes for team offsites — chosen for group logistics, scenic
              payoff, and durations that work for company calendars.
            </p>
          </div>
          <p className="it-corp__trek-note">
            Mix of Easy to Moderate trails across Uttarakhand (6) and Himachal Pradesh (4). Tell us
            your group size and dates — we’ll match the right batch and customise support.
          </p>
          <div className="it-corp__trek-grid">
            {corporateTreks.map((trek) => (
              <TrekInfoCard key={trek.id} trek={trek} fill />
            ))}
          </div>
          <div className="it-corp__trek-foot">
            <Link href="/treks?region=uttarakhand" className="it-corp__btn it-corp__btn--dark-ghost">
              All Uttarakhand treks
            </Link>
            <Link href="/treks?region=himachal" className="it-corp__btn it-corp__btn--dark-ghost">
              All Himachal treks
            </Link>
            <a
              className="it-corp__btn it-corp__btn--primary"
              href={whatsappUrl(
                'Hi Indian Treks! Please suggest a corporate trek in Uttarakhand or Himachal for our team.',
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get trek suggestions
            </a>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="it-corp__section it-corp__section--wash">
        <div className="it-corp__container">
          <div className="it-corp__heading it-corp__heading--center">
            <p className="it-corp__kicker">On the trail</p>
            <h2>Team building in the mountains</h2>
          </div>
          <div className="it-corp__gallery">
            {corporateGallery.map((image) => (
              <figure key={image.alt} className="it-corp__gallery-item">
                <Image src={image.src} alt={image.alt} fill sizes="(max-width: 800px) 50vw, 25vw" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="it-corp__section">
        <div className="it-corp__container">
          <div className="it-corp__cta">
            <div>
              <p className="it-corp__kicker" style={{ color: '#86efac' }}>
                Beyond the usual offsite
              </p>
              <h2>Seeking an experience that goes beyond the usual team offsite?</h2>
              <p>Let’s discuss how we can design an impactful experience for your team.</p>
            </div>
            <div className="it-corp__cta-actions">
              <a
                className="it-corp__btn it-corp__btn--primary"
                href={whatsappUrl('Hi Indian Treks! Let’s design a corporate team-building trek.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp us
              </a>
              <a className="it-corp__btn it-corp__btn--ghost" href="#inquiry">
                Request a proposal
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="it-corp__section it-corp__section--soft">
        <div className="it-corp__container">
          <div className="it-corp__heading">
            <p className="it-corp__kicker">Impact stories</p>
            <h2>Learn more about the impact of our corporate programmes</h2>
          </div>
          <div className="it-corp__articles">
            {corporateArticles.map((article) => (
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

      {/* Categories */}
      <section className="it-corp__section">
        <div className="it-corp__container">
          <div className="it-corp__heading">
            <p className="it-corp__kicker">Treks by categories</p>
            <h2>Explore the wider catalogue</h2>
            <p>Compare corporate-ready options with the rest of our Himalayan collection.</p>
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

      {/* Inquiry */}
      <section className="it-corp__section it-corp__section--wash" id="inquiry">
        <div className="it-corp__container it-corp__inquiry">
          <div>
            <p className="it-corp__kicker">Plan with us</p>
            <div className="it-corp__heading" style={{ marginBottom: 0 }}>
              <h2>Request a corporate proposal</h2>
              <p className="it-corp__intro">
                Tell us your team size, dates, and goals — we’ll recommend the right programme and send a
                clear proposal.
              </p>
            </div>
            <ul className="it-corp__contact-list">
              <li>
                Call:{' '}
                <a href={telUrl()}>{CONTACT.phoneDisplay}</a>
              </li>
              <li>
                Email:{' '}
                <a href={mailtoUrl('Corporate team building enquiry')}>{CONTACT.email}</a>
              </li>
              <li>Hours: {CONTACT.hours}</li>
            </ul>
          </div>

          {submitted ? (
            <div className="it-corp__success">
              <i className="fa-solid fa-circle-check" style={{ fontSize: '2rem', color: '#16a34a' }} aria-hidden />
              <h3>Thank you!</h3>
              <p>Your enquiry has been received. Our corporate team will reach out within 24 hours.</p>
            </div>
          ) : (
            <form className="it-corp__form" onSubmit={handleSubmit}>
              <div className="it-corp__form-row">
                <div className="it-corp__field">
                  <label htmlFor="corp-name">Your name *</label>
                  <input
                    id="corp-name"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  />
                </div>
                <div className="it-corp__field">
                  <label htmlFor="corp-company">Company</label>
                  <input
                    id="corp-company"
                    value={form.company}
                    onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                  />
                </div>
              </div>
              <div className="it-corp__form-row">
                <div className="it-corp__field">
                  <label htmlFor="corp-email">Email *</label>
                  <input
                    id="corp-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  />
                </div>
                <div className="it-corp__field">
                  <label htmlFor="corp-phone">Phone</label>
                  <input
                    id="corp-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  />
                </div>
              </div>
              <div className="it-corp__form-row">
                <div className="it-corp__field">
                  <label htmlFor="corp-size">Group size</label>
                  <select
                    id="corp-size"
                    value={form.groupSize}
                    onChange={(e) => setForm((f) => ({ ...f, groupSize: e.target.value }))}
                  >
                    <option value="">Select…</option>
                    {['8–15', '16–30', '31–50', '51–80', '80+'].map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="it-corp__field">
                  <label htmlFor="corp-prog">Preferred programme</label>
                  <select
                    id="corp-prog"
                    value={form.programme}
                    onChange={(e) => setForm((f) => ({ ...f, programme: e.target.value }))}
                  >
                    <option value="">Not decided yet</option>
                    {corporateProgrammes.map((p) => (
                      <option key={p.id} value={p.title}>
                        {p.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="it-corp__field">
                <label htmlFor="corp-date">Preferred dates</label>
                <input
                  id="corp-date"
                  placeholder="e.g. March 2027 or 15–20 April 2027"
                  value={form.date}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                />
              </div>
              <div className="it-corp__field">
                <label htmlFor="corp-msg">Goals / special requirements</label>
                <textarea
                  id="corp-msg"
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
