'use client';

import { useEffect, useRef, useState } from 'react';
import './our-journey.css';

/**
 * UI/UX from https://www.tamsraorganics.com/about — Our Journey timeline:
 * soft band, centered eyebrow + title, vertical spine, alternating cards,
 * year nodes, scroll-in reveal. Content = Indian Treks milestones.
 */

const TIMELINE = [
  {
    year: '2005',
    title: 'Roots in the Himalaya',
    desc: 'Long before the company was formed, Mr. Vijay Rana was already working on the ground in trekking and mountaineering — building the craft, safety instincts, and mountain relationships that still guide Indian Treks today.',
  },
  {
    year: '2016',
    title: 'Indian Treks Is Founded',
    desc: 'Brothers Vijay Rana and Vivek Rana founded Indian Treks in Dehradun — a company shaped by Himalayan village roots, vocal for locals, and committed to authentic, responsible mountain travel.',
  },
  {
    year: '2018',
    title: 'Routes Across the Ranges',
    desc: 'Operations grew across Uttarakhand, Himachal, and Ladakh — from weekend summits to high passes — with certified guides, clear itineraries, and small-group care at the centre.',
  },
  {
    year: '2020',
    title: 'Yatras & Sacred Circuits',
    desc: 'Kedarnath, Do Dham, Char Dham, and related pilgrimages joined the calendar — pairing spiritual journeys with the same logistics discipline we bring to high-altitude treks.',
  },
  {
    year: '2023',
    title: '20,000+ Trekkers a Year',
    desc: 'Indian Treks became a trusted community for thousands of Himalayan journeys every season — treks, yatras, customized tours, and expeditions under one roof.',
  },
  {
    year: '2026',
    title: 'Authorized & Still Growing',
    desc: 'Recognized as an Authorized Adventure Tour Operator, with Leave No Trace and eco-tourism at the core. New routes keep coming — the promise stays the same: comfort, clarity, and memorable mountains.',
  },
] as const;

function TimelineItem({
  item,
  index,
}: {
  item: (typeof TIMELINE)[number];
  index: number;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const [visible, setVisible] = useState(false);
  const isLeft = index % 2 === 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.22, rootMargin: '0px 0px -8% 0px' },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <li
      ref={ref}
      className={[
        'it-journey__item',
        isLeft ? 'it-journey__item--left' : 'it-journey__item--right',
        visible ? 'is-in' : 'is-pending',
      ].join(' ')}
      style={{ transitionDelay: visible ? `${Math.min(index, 4) * 70}ms` : '0ms' }}
    >
      <div className="it-journey__node" aria-hidden>
        {item.year.slice(2)}
      </div>

      <article className="it-journey__card">
        <p className="it-journey__year">{item.year}</p>
        <h3 className="it-journey__card-title">{item.title}</h3>
        <p className="it-journey__card-desc">{item.desc}</p>
      </article>

      <div className="it-journey__spacer" aria-hidden />
    </li>
  );
}

export default function OurJourney() {
  return (
    <section
      id="our-journey"
      className="it-journey scroll-mt-24 sm:scroll-mt-28"
      aria-labelledby="our-journey-heading"
    >
      <div className="it-journey__inner">
        <header className="it-journey__head">
          <p className="it-journey__eyebrow">Our Journey</p>
          <h2 id="our-journey-heading" className="it-journey__title">
            Two Decades of Himalayan Impact
          </h2>
          <p className="it-journey__lead">
            From ground work in the mountains to a trusted trek and yatra company — milestones that
            shaped how Indian Treks walks with every traveler.
          </p>
        </header>

        <div className="it-journey__track">
          <div className="it-journey__spine" aria-hidden />
          <ol className="it-journey__list">
            {TIMELINE.map((item, i) => (
              <TimelineItem key={item.year} item={item} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
