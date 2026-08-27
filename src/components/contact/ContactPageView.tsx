'use client';

import { useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import {
  CONTACT,
  mapsEmbedUrl,
  mailtoUrl,
  telUrl,
  whatsappChannelUrl,
  whatsappUrl,
} from '@/lib/contact';
import {
  CONTACT_FAQS,
  CONTACT_GROUP_SIZES,
  CONTACT_MONTHS,
  CONTACT_STATS,
  CONTACT_TEAMS,
  CONTACT_TREK_OPTIONS,
  type ContactTeamId,
} from '@/lib/contact-content';
import './contact-page.css';

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  team: ContactTeamId | '';
  trek: string;
  month: string;
  groupSize: string;
  message: string;
};

const emptyForm: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  team: '',
  trek: '',
  month: '',
  groupSize: '',
  message: '',
};

const FAQ_CATS = [
  { id: 'all', label: 'All' },
  { id: 'booking', label: 'Booking' },
  { id: 'gear', label: 'Gear & Fitness' },
  { id: 'safety', label: 'Safety' },
  { id: 'logistics', label: 'Logistics' },
] as const;

function faqCatId(cat: string) {
  if (cat === 'Booking') return 'booking';
  if (cat === 'Gear & Fitness') return 'gear';
  if (cat === 'Safety') return 'safety';
  return 'logistics';
}

function teamLabel(id: ContactTeamId | '') {
  return CONTACT_TEAMS.find((t) => t.id === id)?.formLabel || 'Not specified';
}

/**
 * Contact UI — RH structure with Indian Treks brand tokens.
 * Team pathways solve “which department?” without dumping walls of text.
 */
export default function ContactPageView() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [activeTeam, setActiveTeam] = useState<ContactTeamId>('trekking');
  const [faqCat, setFaqCat] = useState<(typeof FAQ_CATS)[number]['id']>('all');
  const [faqQuery, setFaqQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const selectedTeam = CONTACT_TEAMS.find((t) => t.id === activeTeam) ?? CONTACT_TEAMS[1];

  const setField =
    (key: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
      if (error) setError('');
    };

  const goToForm = (teamId: ContactTeamId) => {
    setActiveTeam(teamId);
    setForm((prev) => ({ ...prev, team: teamId }));
    window.requestAnimationFrame(() => {
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      const name = `${form.firstName.trim()} ${form.lastName.trim()}`.trim();
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email: form.email.trim(),
          phone: form.phone.trim(),
          message: [
            `Team: ${teamLabel(form.team)}`,
            `Interest: ${form.trek || 'Not specified'}`,
            `Preferred month: ${form.month || 'Not specified'}`,
            `Group size: ${form.groupSize || 'Not specified'}`,
            '',
            form.message.trim(),
          ].join('\n'),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || 'Something went wrong. Please try again.');
      }
      setSent(true);
      setForm(emptyForm);
      window.setTimeout(() => setSent(false), 2800);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const faqs = useMemo(() => {
    const q = faqQuery.trim().toLowerCase();
    return CONTACT_FAQS.map((f, i) => ({ ...f, i, catId: faqCatId(f.cat) })).filter((f) => {
      const catOk = faqCat === 'all' || f.catId === faqCat;
      if (!catOk) return false;
      if (!q) return true;
      return f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q);
    });
  }, [faqCat, faqQuery]);

  return (
    <div className="it-ct">
      {/* HERO */}
      <section className="ct-hero">
        <div className="ct-hero-noise" aria-hidden="true" />

        <div className="ct-hero-badge">
          <i className="fa-solid fa-mountain" aria-hidden /> {CONTACT.brand} — Contact Us
        </div>
        <h1>
          Let&apos;s Plan Your
          <br />
          <em>Next Journey</em>
        </h1>
        <p>
          Treks, pilgrimage travel, customized tours, or B2B partnerships — tell us what you are
          planning and we&apos;ll connect you with the right team.
        </p>

        <div className="ct-hero-peaks" aria-hidden="true">
          <svg viewBox="0 0 1440 70" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0,70 L0,50 L80,20 L140,42 L220,10 L300,38 L360,15 L440,36 L520,5 L600,32 L680,12 L760,40 L840,18 L920,42 L1000,8 L1080,35 L1160,14 L1240,40 L1320,22 L1440,48 L1440,70 Z"
              fill="rgba(255,250,250,.06)"
            />
            <path
              d="M0,70 L0,58 L100,32 L180,52 L260,28 L360,52 L440,30 L560,55 L640,25 L740,50 L820,28 L920,54 L1020,30 L1100,52 L1200,34 L1320,56 L1440,38 L1440,70 Z"
              fill="rgba(255,250,250,.09)"
            />
            <path
              d="M0,70 L0,65 L120,44 L240,62 L360,46 L480,64 L600,44 L720,62 L840,44 L960,62 L1080,46 L1200,62 L1320,48 L1440,60 L1440,70 Z"
              fill="#faf9f7"
            />
          </svg>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <div className="ct-wrap">
        <div className="ct-cards-row">
          <div className="ct-card">
            <div className="ct-card-ico">
              <i className="fa-solid fa-phone" aria-hidden />
            </div>
            <div>
              <div className="ct-card-label">Booking</div>
              <div className="ct-card-val ct-card-val--stack">
                {CONTACT.phones.booking.map((phone) => (
                  <a key={phone.tel} href={telUrl(phone.tel)}>
                    {phone.display}
                  </a>
                ))}
              </div>
              <div className="ct-card-sub">Available {CONTACT.hours}</div>
            </div>
          </div>

          <div className="ct-card">
            <div className="ct-card-ico">
              <i className="fa-solid fa-headset" aria-hidden />
            </div>
            <div>
              <div className="ct-card-label">Support</div>
              <div className="ct-card-val">
                <a href={telUrl(CONTACT.phones.support.tel)}>{CONTACT.phones.support.display}</a>
              </div>
              <div className="ct-card-sub">On-trip help &amp; post-booking queries</div>
            </div>
          </div>

          <div className="ct-card">
            <div className="ct-card-ico">
              <i className="fa-solid fa-envelope-open-text" aria-hidden />
            </div>
            <div>
              <div className="ct-card-label">Email Us</div>
              <div className="ct-card-val ct-card-val--stack">
                <a href={mailtoUrl('Enquiry from Indian Treks website', undefined, CONTACT.emails.primary)}>
                  {CONTACT.emails.primary}
                </a>
                <a href={mailtoUrl(undefined, undefined, CONTACT.emails.vivek)}>
                  {CONTACT.emails.vivek}
                </a>
                <a href={mailtoUrl(undefined, undefined, CONTACT.emails.explore)}>
                  {CONTACT.emails.explore}
                </a>
              </div>
              <div className="ct-card-sub">{CONTACT.replySla}</div>
            </div>
          </div>

          {CONTACT.offices.map((office) => (
            <div key={office.id} className="ct-card">
              <div className="ct-card-ico">
                <i className="fa-solid fa-map-pin" aria-hidden />
              </div>
              <div>
                <div className="ct-card-label">{office.label}</div>
                <div className="ct-card-val">{office.line1}</div>
                <div className="ct-card-sub">{office.line2}</div>
              </div>
            </div>
          ))}

          <div className="ct-card">
            <div className="ct-card-ico">
              <i className="fa-regular fa-clock" aria-hidden />
            </div>
            <div>
              <div className="ct-card-label">Working Hours</div>
              <div className="ct-card-val">{CONTACT.hoursShort}</div>
              <div className="ct-card-sub">{CONTACT.hoursDetail}</div>
            </div>
          </div>
        </div>
      </div>

      {/* TEAM PATHWAYS — pick who to contact */}
      <section className="ct-teams" aria-labelledby="ct-teams-heading">
        <div className="ct-wrap">
          <div className="ct-sec-head ct-teams-head">
            <div className="ct-sec-eyebrow">How Can We Help?</div>
            <h2 id="ct-teams-heading">Choose the Right Team</h2>
            <p>
              Pick a pathway below to see how we can support you — then send a message and we&apos;ll
              route it to the right department.
            </p>
          </div>

          <div className="ct-team-tabs" role="tablist" aria-label="Contact teams">
            {CONTACT_TEAMS.map((team) => {
              const selected = activeTeam === team.id;
              return (
                <button
                  key={team.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  id={`ct-tab-${team.id}`}
                  className={`ct-team-tab${selected ? ' is-active' : ''}`}
                  onClick={() => setActiveTeam(team.id)}
                >
                  <span className="ct-team-tab-ico" aria-hidden>
                    <i className={`fa-solid ${team.icon}`} />
                  </span>
                  <span className="ct-team-tab-copy">
                    <span className="ct-team-tab-label">{team.section}</span>
                    <span className="ct-team-tab-title">{team.title}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div
            className="ct-team-panel"
            role="tabpanel"
            aria-labelledby={`ct-tab-${selectedTeam.id}`}
          >
            <div className="ct-team-panel-main">
              <p className="ct-team-audience">{selectedTeam.audience}</p>
              {selectedTeam.intro.map((para) => (
                <p key={para.slice(0, 48)} className="ct-team-para">
                  {para}
                </p>
              ))}
              <p className="ct-team-prompt">{selectedTeam.prompt}</p>
              <div className="ct-team-actions">
                <button
                  type="button"
                  className="ct-team-cta"
                  onClick={() => goToForm(selectedTeam.id)}
                >
                  <i className="fa-solid fa-paper-plane" aria-hidden /> {selectedTeam.cta}
                </button>
                <a
                  className="ct-team-wa"
                  href={whatsappUrl(selectedTeam.waPrefill)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-whatsapp" aria-hidden /> WhatsApp
                </a>
              </div>
            </div>

            <aside className="ct-team-helps">
              <h3>{selectedTeam.helpsTitle}</h3>
              <ul>
                {selectedTeam.helpsWith.map((item) => (
                  <li key={item}>
                    <i className="fa-solid fa-check" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* MAIN GRID — form + aside */}
      <section className="ct-main-bg">
        <div className="ct-wrap">
          <div className="ct-main">
            <div className="ct-form-box" id="contact-form">
              <div className="ct-sec-head">
                <div className="ct-sec-eyebrow">Send a Message</div>
                <h2>Tell Us What You&apos;re Planning</h2>
                <p>
                  Share a few details and we&apos;ll route your enquiry to the right team — with a
                  personalised reply within 24 hours.
                </p>
              </div>

              <form className="ct-form" onSubmit={handleSubmit}>
                <div className="ct-field">
                  <label htmlFor="ct-first">First Name</label>
                  <input
                    id="ct-first"
                    type="text"
                    placeholder="Arjun"
                    required
                    autoComplete="given-name"
                    value={form.firstName}
                    onChange={setField('firstName')}
                  />
                </div>
                <div className="ct-field">
                  <label htmlFor="ct-last">Last Name</label>
                  <input
                    id="ct-last"
                    type="text"
                    placeholder="Sharma"
                    required
                    autoComplete="family-name"
                    value={form.lastName}
                    onChange={setField('lastName')}
                  />
                </div>
                <div className="ct-field">
                  <label htmlFor="ct-email">Email Address</label>
                  <input
                    id="ct-email"
                    type="email"
                    placeholder="arjun@email.com"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={setField('email')}
                  />
                </div>
                <div className="ct-field">
                  <label htmlFor="ct-phone">Phone / WhatsApp</label>
                  <input
                    id="ct-phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    required
                    autoComplete="tel"
                    value={form.phone}
                    onChange={setField('phone')}
                  />
                </div>
                <div className="ct-field ct-form-full">
                  <label htmlFor="ct-team">Which Team Should We Connect You With?</label>
                  <select
                    id="ct-team"
                    required
                    value={form.team}
                    onChange={(e) => {
                      const id = e.target.value as ContactTeamId | '';
                      setForm((prev) => ({ ...prev, team: id }));
                      if (id) setActiveTeam(id);
                      if (error) setError('');
                    }}
                  >
                    <option value="">Select a team…</option>
                    {CONTACT_TEAMS.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.formLabel}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="ct-field ct-form-full">
                  <label htmlFor="ct-trek">What Are You Interested In?</label>
                  <select id="ct-trek" required value={form.trek} onChange={setField('trek')}>
                    <option value="">Select a trek, yatra, or partnership…</option>
                    {CONTACT_TREK_OPTIONS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="ct-field">
                  <label htmlFor="ct-month">Preferred Month</label>
                  <select id="ct-month" value={form.month} onChange={setField('month')}>
                    <option value="">Choose month…</option>
                    {CONTACT_MONTHS.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="ct-field">
                  <label htmlFor="ct-group">Group Size</label>
                  <select id="ct-group" value={form.groupSize} onChange={setField('groupSize')}>
                    <option value="">No. of travellers…</option>
                    {CONTACT_GROUP_SIZES.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="ct-field ct-form-full">
                  <label htmlFor="ct-message">Your Message</label>
                  <textarea
                    id="ct-message"
                    required
                    placeholder="Tell us about dates, destinations, group details, or partnership requirements…"
                    value={form.message}
                    onChange={setField('message')}
                  />
                </div>

                {error ? <p className="ct-form-error">{error}</p> : null}

                <div className="ct-submit">
                  <button
                    className={`ct-submit-btn${sent ? ' is-success' : ''}`}
                    type="submit"
                    disabled={sending}
                  >
                    {sent ? (
                      <>
                        <i className="fa-solid fa-check" aria-hidden /> Message Sent!
                      </>
                    ) : sending ? (
                      <>
                        <i className="fa-solid fa-spinner fa-spin" aria-hidden /> Sending…
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-paper-plane" aria-hidden /> Send Message
                      </>
                    )}
                  </button>
                  <span className="ct-submit-note">
                    <i
                      className="fa-solid fa-shield-halved"
                      style={{ color: 'var(--primary)', marginRight: 4 }}
                      aria-hidden
                    />
                    Your details are safe. No spam, ever.
                  </span>
                </div>
              </form>
            </div>

            <aside className="ct-aside">
              <div className="ct-map-box">
                <div className="ct-map-inner">
                  <iframe
                    src={mapsEmbedUrl()}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${CONTACT.brand} Location`}
                  />
                </div>
                <div className="ct-map-pill">
                  <i className="fa-solid fa-location-dot" aria-hidden /> {CONTACT.offices[0].line2}
                </div>
              </div>

              <div className="ct-wa-panel">
                <div className="ct-wa-icon">
                  <i className="fa-brands fa-whatsapp" aria-hidden />
                </div>
                <div className="ct-wa-text">
                  <strong>Chat on WhatsApp</strong>
                  <span>Quick replies — booking, support &amp; trip planning</span>
                </div>
                <div className="ct-wa-links">
                  <a
                    href={whatsappUrl(selectedTeam.waPrefill)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ct-wa-btn"
                  >
                    <i className="fa-brands fa-whatsapp" aria-hidden /> Book on WhatsApp
                  </a>
                  <a
                    href={whatsappChannelUrl('vivek', selectedTeam.waPrefill)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ct-wa-btn ct-wa-btn--ghost"
                  >
                    {CONTACT.whatsapp.vivek.label}
                  </a>
                  <a
                    href={CONTACT.whatsapp.business.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ct-wa-btn ct-wa-btn--ghost"
                  >
                    {CONTACT.whatsapp.business.label}
                  </a>
                  <a
                    href={whatsappChannelUrl('support', selectedTeam.waPrefill)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ct-wa-btn ct-wa-btn--ghost"
                  >
                    {CONTACT.whatsapp.support.label}
                  </a>
                </div>
              </div>

              <div className="ct-trust">
                {CONTACT_STATS.map((s) => (
                  <div key={s.l} className="ct-trust-item">
                    <span className="ct-trust-num">{s.v}</span>
                    <span className="ct-trust-lbl">{s.l}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="ct-faq-section">
        <div className="ct-wrap">
          <div className="ct-faq-top">
            <div>
              <div className="ct-sec-head" style={{ marginBottom: 0 }}>
                <div className="ct-sec-eyebrow">Got Questions?</div>
                <h2>Frequently Asked Questions</h2>
              </div>
            </div>
            <div className="ct-faq-search">
              <span className="ct-faq-search-icon">
                <i className="fa-solid fa-magnifying-glass" aria-hidden />
              </span>
              <input
                type="search"
                placeholder="Search questions…"
                autoComplete="off"
                value={faqQuery}
                onChange={(e) => {
                  setFaqQuery(e.target.value);
                  setOpenFaq(null);
                }}
                aria-label="Search frequently asked questions"
              />
            </div>
          </div>

          <div className="ct-faq-cats">
            {FAQ_CATS.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`ct-faq-cat${faqCat === c.id ? ' active' : ''}`}
                onClick={() => {
                  setFaqCat(c.id);
                  setOpenFaq(null);
                }}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="ct-faq-grid">
            {faqs.length === 0 ? (
              <div className="ct-no-results">
                <i className="fa-regular fa-circle-question" aria-hidden />
                <p>
                  No questions matched your search. Try different keywords or email us directly (
                  <a href={mailtoUrl()}>{CONTACT.email}</a>).
                </p>
              </div>
            ) : (
              faqs.map((f) => {
                const isOpen = openFaq === f.i;
                return (
                  <div
                    key={f.q}
                    className={`ct-faq-item${isOpen ? ' is-open' : ''}`}
                    data-cat={f.catId}
                  >
                    <button
                      type="button"
                      className="ct-faq-q"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? null : f.i)}
                    >
                      <span className="ct-faq-q-text">{f.q}</span>
                      <span className="ct-faq-arr">
                        <i className="fa-solid fa-chevron-down" aria-hidden />
                      </span>
                    </button>
                    <div className="ct-faq-body">{f.a}</div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* BOTTOM STRIP */}
      <section className="ct-strip">
        <div className="ct-strip-noise" aria-hidden="true" />
        <h2>
          Your Journey Starts With <em>a Conversation.</em>
        </h2>
        <p>
          Unsure which team to contact? Reach out anyway — we&apos;ll guide you to the right next
          step.
        </p>
        <div className="ct-strip-btns">
          <a
            className="ct-strip-btn ct-strip-btn-primary"
            href={whatsappUrl(`Hi ${CONTACT.brand}! I need help planning my journey.`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-whatsapp" aria-hidden /> WhatsApp Us Now
          </a>
          <a className="ct-strip-btn ct-strip-btn-ghost" href="#contact-form">
            <i className="fa-solid fa-envelope" aria-hidden /> Contact Indian Treks
          </a>
        </div>
      </section>
    </div>
  );
}
