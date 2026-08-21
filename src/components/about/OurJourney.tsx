'use client';

import { useEffect, useRef, useState } from 'react';
import './our-journey.css';

/**
 * UI/UX from https://www.tamsraorganics.com/about — Our Journey timeline,
 * refined for phone + desktop: spine fill, active nodes, clearer cards.
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
    desc: 'Brothers Vijay Rana and Vivek Rana founded Indian Treks in Dehradun — shaped by Himalayan village roots, vocal for locals, and committed to authentic, responsible mountain travel.',
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
    desc: 'Recognized as an Authorized Adventure Tour Operator, with Leave No Trace at the core. New routes keep coming — the promise stays the same: comfort, clarity, and memorable mountains.',
  },
] as const;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export default function OurJourney() {
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const fillRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean[]>(() => TIMELINE.map(() => false));
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setVisible(TIMELINE.map(() => true));
      return;
    }

    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible((prev) => {
              if (prev[i]) return prev;
              const next = [...prev];
              next[i] = true;
              return next;
            });
            io.disconnect();
          }
        },
        { threshold: 0.28, rootMargin: '0px 0px -10% 0px' },
      );
      io.observe(el);
      observers.push(io);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const fill = fillRef.current;
    if (!track || !fill) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = track.getBoundingClientRect();
      const view = window.innerHeight || 1;
      // Progress while the track crosses the middle of the viewport
      const start = view * 0.72;
      const end = view * 0.28;
      const raw = (start - rect.top) / (rect.height + (start - end));
      const progress = clamp(raw, 0, 1);
      fill.style.height = `${progress * 100}%`;

      // Active milestone = nearest item to viewport center
      const mid = view * 0.45;
      let best = 0;
      let bestDist = Infinity;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dist = Math.abs(r.top + r.height * 0.35 - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActive((prev) => (prev === best ? prev : best));
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

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
            From ground work in the mountains to a trusted trek and yatra company — the milestones
            that shaped how Indian Treks walks with every traveler.
          </p>
        </header>

        <div ref={trackRef} className="it-journey__track">
          <div className="it-journey__spine" aria-hidden>
            <div ref={fillRef} className="it-journey__spine-fill" />
          </div>

          <ol className="it-journey__list">
            {TIMELINE.map((item, i) => {
              const isLeft = i % 2 === 0;
              const isIn = visible[i];
              return (
                <li
                  key={item.year}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  className={[
                    'it-journey__item',
                    isLeft ? 'it-journey__item--left' : 'it-journey__item--right',
                    isIn ? 'is-in' : 'is-pending',
                    active === i ? 'is-active' : '',
                  ].join(' ')}
                  style={{ transitionDelay: isIn ? `${Math.min(i, 3) * 60}ms` : '0ms' }}
                >
                  <div className="it-journey__node" aria-hidden>
                    {item.year.slice(2)}
                  </div>

                  <article className="it-journey__card">
                    <div className="it-journey__meta">
                      <p className="it-journey__year">{item.year}</p>
                      <p className="it-journey__step">
                        Step {String(i + 1).padStart(2, '0')}
                      </p>
                    </div>
                    <h3 className="it-journey__card-title">{item.title}</h3>
                    <p className="it-journey__card-desc">{item.desc}</p>
                  </article>

                  <div className="it-journey__spacer" aria-hidden />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
