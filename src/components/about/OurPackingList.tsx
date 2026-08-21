'use client';

import Link from 'next/link';
import { useEffect, useId, useState } from 'react';
import { photos } from '@/lib/media';
import './our-packing-list.css';

/**
 * Our Packing List — UI mirrored from
 * https://roopkundheaven.in/about-us/ “Meet The Team”
 * (portrait cards + modal), Indian Treks green.
 */

type Person = {
  id: string;
  name: string;
  role: string;
  exp: string;
  image: string;
  bio: string[];
};

const CREW: Person[] = [
  {
    id: 'vijay',
    name: 'Mr Vijay Singh Rana',
    role: 'Founder',
    exp: 'Founder, Indiantreks',
    image: 'https://indiantreks.in/wp-content/uploads/2023/02/Vijay-Singh-Rana-Indian-Treks.jpg',
    bio: [
      'Long before Indian Treks was established, I had already been working on the ground in trekking and mountaineering since 2005.',
      'With over two decades of Himalayan experience, I prioritized quality, safety, and real mountain experience over numbers alone.',
      'That foundation still guides every trek we run across Uttarakhand, Himachal, and beyond.',
    ],
  },
  {
    id: 'vivek',
    name: 'Mr Vivek Rana',
    role: 'CEO',
    exp: 'CEO, Indiantreks',
    image:
      'https://indiantreks.in/wp-content/uploads/2025/02/WhatsApp-Image-2025-02-02-at-1.52.36-PM-1024x983.jpeg',
    bio: [
      'From Osla village in the Garhwal Himalayas to leading Indiantreks, my focus has always been safe, well-planned journeys.',
      'Today we welcome 20,000+ trekkers every year across 200+ routes — smooth, enriching, and unforgettable.',
      'Every departure is built around guest comfort, mountain safety, and authentic Himalayan experience.',
    ],
  },
];

const KIT = [
  {
    id: 'treks',
    badge: 'Treks',
    title: 'Himalayan Treks',
    role: 'Guided routes',
    exp: 'Easy weekends to high passes',
    href: '/treks',
    img: photos.kedarkantha,
  },
  {
    id: 'snow',
    badge: 'Winter',
    title: 'Snow Trails',
    role: 'Cold season',
    exp: 'Frozen lakes & white ridges',
    href: '/treks',
    img: photos.snow,
  },
  {
    id: 'yatra',
    badge: 'Yatra',
    title: 'Sacred Yatras',
    role: 'Pilgrim journeys',
    exp: 'Faith meets mountain care',
    href: '/yatra',
    img: photos.yatra,
  },
  {
    id: 'flowers',
    badge: 'UNESCO',
    title: 'Valley of Flowers',
    role: 'Monsoon magic',
    exp: 'Alpine meadows in bloom',
    href: '/treks/valley-of-flowers',
    img: photos.vof,
  },
  {
    id: 'nepal',
    badge: 'Abroad',
    title: 'Nepal & Abroad',
    role: 'International',
    exp: 'Beyond the Indian Himalaya',
    href: '/international-getaways',
    img: photos.ebc,
  },
  {
    id: 'custom',
    badge: 'Custom',
    title: 'Custom Trips',
    role: 'Your dates',
    exp: 'Built around your pace',
    href: '/customized',
    img: photos.chopta,
  },
] as const;

export default function OurPackingList() {
  const titleId = useId();
  const [active, setActive] = useState<Person | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [active]);

  return (
    <section
      id="packing-list"
      className="it-pack scroll-mt-24 sm:scroll-mt-28"
      aria-labelledby={titleId}
    >
      <div className="it-pack__wrap">
        <div className="it-pack__head">
          <div className="it-pack__top">
            <div className="it-pack__kicker">
              <i className="fa-solid fa-suitcase" aria-hidden />
              Our Packing List !!
            </div>
            <h2 id={titleId} className="it-pack__title">
              The people and journeys that fill every <span>Indian Treks departure</span>
            </h2>
            <p className="it-pack__sub">
              Meet the founders who pack safety and local knowledge into the trail — then open the
              journeys we run across the Himalayas.
            </p>
          </div>

          <div className="it-pack__note">
            <i className="fa-solid fa-shield-heart" aria-hidden />
            <div>
              <strong>Built on real Himalayan experience</strong>
              <span>Local knowledge, structured execution and dependable on-ground support.</span>
            </div>
          </div>
        </div>

        <div className="it-pack__grid it-pack__grid--crew" aria-label="Founders">
          {CREW.map((person) => (
            <article
              key={person.id}
              className="it-pack__card"
              role="button"
              tabIndex={0}
              onClick={() => setActive(person)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActive(person);
                }
              }}
              aria-haspopup="dialog"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={person.image} alt={person.name} referrerPolicy="no-referrer" />
              <div className="it-pack__badge">{person.role}</div>
              <div className="it-pack__card-body">
                <h3 className="it-pack__name">{person.name}</h3>
                <p className="it-pack__role">{person.role}</p>
                <div className="it-pack__line">
                  <span className="it-pack__exp">{person.exp}</span>
                  <span className="it-pack__arrow" aria-hidden>
                    <i className="fa-solid fa-arrow-right" />
                  </span>
                </div>
              </div>
            </article>
          ))}

          <Link href="/team" className="it-pack__card it-pack__card--cta">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photos.chopta} alt="" />
            <div className="it-pack__badge">Team</div>
            <div className="it-pack__card-body">
              <h3 className="it-pack__name">Meet the full team</h3>
              <p className="it-pack__role">Guides &amp; staff</p>
              <div className="it-pack__line">
                <span className="it-pack__exp">Mountain specialists on ground</span>
                <span className="it-pack__arrow" aria-hidden>
                  <i className="fa-solid fa-arrow-right" />
                </span>
              </div>
            </div>
          </Link>
        </div>

        <div className="it-pack__kit-head">
          <div className="it-pack__kicker it-pack__kicker--sm">What&apos;s packed</div>
          <h3 className="it-pack__kit-title">
            Tap a journey to <span>open it</span>
          </h3>
        </div>

        <div className="it-pack__grid it-pack__grid--kit" aria-label="Journeys packed">
          {KIT.map((item) => (
            <Link key={item.id} href={item.href} className="it-pack__card it-pack__card--kit">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.img} alt="" loading="lazy" />
              <div className="it-pack__badge">{item.badge}</div>
              <div className="it-pack__card-body">
                <h3 className="it-pack__name">{item.title}</h3>
                <p className="it-pack__role">{item.role}</p>
                <div className="it-pack__line">
                  <span className="it-pack__exp">{item.exp}</span>
                  <span className="it-pack__arrow" aria-hidden>
                    <i className="fa-solid fa-arrow-right" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div
        className={`it-pack__modal${active ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!active}
        aria-labelledby={active ? 'it-pack-modal-title' : undefined}
        onClick={() => setActive(null)}
      >
        {active ? (
          <div className="it-pack__modal-box" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="it-pack__modal-close"
              aria-label="Close"
              onClick={() => setActive(null)}
            >
              <i className="fa-solid fa-xmark" aria-hidden />
            </button>
            <div className="it-pack__modal-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={active.image} alt={active.name} referrerPolicy="no-referrer" />
            </div>
            <div className="it-pack__modal-content">
              <span className="it-pack__modal-role">{active.role}</span>
              <h3 id="it-pack-modal-title">{active.name}</h3>
              <span className="it-pack__modal-exp">{active.exp}</span>
              {active.bio.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
