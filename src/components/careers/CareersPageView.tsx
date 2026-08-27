'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import {
  CAREER_HERO,
  CAREER_HERO_FEATURES,
  CAREER_BLOG_SECTION,
  CAREER_MISSION,
  CAREER_OPENINGS,
  CAREER_PHILOSOPHY,
  CAREER_ROLES_SECTION,
  CAREER_TEAMS,
  CAREER_VALUES,
  careerApplyMailto,
  type CareerTeam,
} from '@/lib/careers-content';
import LandingBlogSection from '@/components/landing/LandingBlogSection';
import { careersArticles } from '@/lib/landing-social-content';
import './careers-page.css';

export default function CareersPageView() {
  const [team, setTeam] = useState<CareerTeam>('all');

  const openings = useMemo(
    () => (team === 'all' ? CAREER_OPENINGS : CAREER_OPENINGS.filter((job) => job.team === team)),
    [team],
  );

  const scrollToRoles = () => {
    document.getElementById('career-roles')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToPhilosophy = () => {
    document.getElementById('career-philosophy')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="it-careers">
      {/* Hero + feature bar — first fold */}
      <section className="cr-hero-band" aria-labelledby="cr-hero-title">
        <div className="cr-hero">
          <Image
            src={CAREER_HERO.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="cr-hero__media"
          />
          <div className="cr-hero__overlay" aria-hidden="true" />
          <div className="cr-hero__topo cr-hero__topo--left" aria-hidden="true" />
          <div className="cr-hero__topo cr-hero__topo--right" aria-hidden="true" />

          <div className="cr-hero__trail cr-hero__trail--left" aria-hidden="true">
            <svg viewBox="0 0 200 120" fill="none" className="cr-hero__trail-svg">
              <path
                d="M12 98 C 40 72, 58 88, 88 54"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="5 6"
                strokeLinecap="round"
              />
            </svg>
            <span className="cr-hero__trail-ico">
              <i className="fa-solid fa-person-hiking" aria-hidden />
            </span>
            <span className="cr-hero__trail-leaf">
              <i className="fa-solid fa-leaf" aria-hidden />
            </span>
          </div>

          <div className="cr-hero__trail cr-hero__trail--right" aria-hidden="true">
            <svg viewBox="0 0 160 100" fill="none" className="cr-hero__trail-svg">
              <path
                d="M8 78 C 36 48, 72 62, 148 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="5 6"
                strokeLinecap="round"
              />
            </svg>
            <span className="cr-hero__trail-ico cr-hero__trail-ico--mountain">
              <i className="fa-solid fa-mountain" aria-hidden />
            </span>
          </div>

          <div className="cr-hero__inner">
            <p className="cr-hero__kicker">
              <i className="fa-solid fa-mountain-sun" aria-hidden />
              {CAREER_HERO.kicker}
            </p>
            <h1 id="cr-hero-title" className="cr-hero__title">
              <span className="cr-hero__title-main">{CAREER_HERO.titleLine1}</span>
              <span className="cr-hero__title-line2">
                {CAREER_HERO.titleLine2.map((part) =>
                  part.style === 'script' ? (
                    <span key={part.text} className="cr-hero__title-script">
                      {part.text}
                    </span>
                  ) : (
                    <span key={part.text} className="cr-hero__title-main cr-hero__title-main--inline">
                      {part.text}
                    </span>
                  ),
                )}
              </span>
            </h1>
            <p className="cr-hero__sub">{CAREER_HERO.subtitle}</p>
            <button type="button" className="cr-hero__cta" onClick={scrollToPhilosophy}>
              {CAREER_HERO.cta}
              <i className="fa-solid fa-arrow-right" aria-hidden />
            </button>
          </div>

          <div className="cr-hero__torn" aria-hidden="true">
            <svg viewBox="0 0 1440 48" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0,48 L0,18 C60,32 120,8 180,22 C240,36 300,10 360,26 C420,42 480,14 540,28 C600,42 660,12 720,24 C780,36 840,14 900,28 C960,42 1020,16 1080,26 C1140,36 1200,10 1260,22 C1320,34 1380,12 1440,20 L1440,48 Z"
                fill="#fff"
              />
            </svg>
          </div>
        </div>

        <div className="cr-hero-features">
          <div className="cr-hero-features__inner">
            {CAREER_HERO_FEATURES.map((item) => (
              <div key={item.title} className="cr-hero-features__item">
                <span className="cr-hero-features__ico">
                  <i className={`fa-solid ${item.icon}`} aria-hidden />
                </span>
                <span className="cr-hero-features__copy">
                  <strong>{item.title}</strong>
                  <span>{item.sub}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section id="career-philosophy" className="cr-section cr-section--philosophy">
        <div className="cr-wrap cr-split">
          <div className="cr-split__media">
            <Image
              src={CAREER_PHILOSOPHY.image}
              alt="Trekkers on a Himalayan trail"
              width={720}
              height={560}
              className="cr-split__img"
            />
          </div>
          <div className="cr-split__copy">
            <h2 className="cr-section__title">{CAREER_PHILOSOPHY.title}</h2>
            <p className="cr-section__body">{CAREER_PHILOSOPHY.body}</p>
            <button type="button" className="cr-text-link" onClick={scrollToRoles}>
              {CAREER_PHILOSOPHY.cta}
              <i className="fa-solid fa-arrow-right" aria-hidden />
            </button>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="cr-section cr-section--mission">
        <div className="cr-wrap cr-split cr-split--reverse">
          <div className="cr-split__copy">
            <p className="cr-section__eyebrow">{CAREER_MISSION.eyebrow}</p>
            <h2 className="cr-section__title cr-section__title--display">{CAREER_MISSION.title}</h2>
            {CAREER_MISSION.paragraphs.map((para) => (
              <p key={para.slice(0, 40)} className="cr-section__body">
                {para}
              </p>
            ))}
          </div>
          <div className="cr-split__media">
            <Image
              src={CAREER_MISSION.image}
              alt="Mountain summit at sunrise"
              width={720}
              height={560}
              className="cr-split__img"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="cr-section cr-section--values">
        <div className="cr-wrap cr-values">
          <header className="cr-values__head">
            <p className="cr-section__eyebrow">{CAREER_VALUES.eyebrow}</p>
            <h2 className="cr-section__title cr-section__title--display">{CAREER_VALUES.title}</h2>
            <p className="cr-section__body cr-values__intro">{CAREER_VALUES.intro}</p>
          </header>
          <ul className="cr-values__grid">
            {CAREER_VALUES.items.map((item, index) => (
              <li key={item.title} className="cr-values__card">
                <span className="cr-values__num" aria-hidden="true">
                  {index + 1}
                </span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Open roles */}
      <section id="career-roles" className="cr-section cr-section--roles" aria-labelledby="cr-roles-title">
        <div className="cr-wrap">
          <header className="cr-roles__head">
            <p className="cr-section__eyebrow">{CAREER_ROLES_SECTION.eyebrow}</p>
            <h2 id="cr-roles-title" className="cr-section__title">
              {CAREER_ROLES_SECTION.title}
            </h2>
            <p className="cr-section__body">{CAREER_ROLES_SECTION.subtitle}</p>
          </header>

          <div className="cr-roles__filters" role="tablist" aria-label="Filter by team">
            {CAREER_TEAMS.map((item) => {
              const selected = team === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  className={`cr-roles__filter${selected ? ' is-active' : ''}`}
                  onClick={() => setTeam(item.id)}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <ul className="cr-roles__list">
            {openings.map((job) => (
              <li key={job.id} className="cr-role-row">
                <div className="cr-role-row__main">
                  <h3 className="cr-role-row__title">{job.title}</h3>
                  <p className="cr-role-row__meta">
                    {job.location} · {job.type}
                  </p>
                </div>
                <a className="cr-role-row__apply" href={careerApplyMailto(job.title)}>
                  Apply
                  <i className="fa-solid fa-arrow-right" aria-hidden />
                </a>
              </li>
            ))}
          </ul>

          {openings.length === 0 ? (
            <p className="cr-roles__empty">No openings in this team right now. Check back soon.</p>
          ) : null}
        </div>
      </section>

      <LandingBlogSection
        className="it-lx__section cr-section--blog"
        kicker={CAREER_BLOG_SECTION.kicker}
        title={CAREER_BLOG_SECTION.title}
        items={careersArticles}
      />
    </div>
  );
}
