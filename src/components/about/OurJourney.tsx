'use client';

import { useEffect, useRef, useState } from 'react';
import './our-journey.css';

/**
 * UI/UX mirrored from https://www.abercrombiekent.com/about-us —
 * “Our Journey Began in Africa”.
 *
 * Cross-device approach (phone / tablet / desktop / iOS / Android):
 * - Tall scroll runway (N × 100svh)
 * - ONE sticky stage (most reliable sticky pattern across browsers)
 * - Absolute chapters slide up over each other via scroll progress
 */

const CHAPTERS = [
  {
    id: '2005',
    year: '2005',
    title: 'Roots in the Himalaya',
    accentWord: 'Himalaya',
    image:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&h=1200&fit=crop',
    imageAlt: 'Sunrise over Himalayan peaks',
    paragraphs: [
      'Long before Indian Treks was established, Mr. Vijay Rana had already been working on the ground in trekking and mountaineering since 2005.',
      'With hands-on Himalayan experience across Uttarakhand, Himachal Pradesh, and Ladakh, he prioritized quality of work, safety, and real mountain experience over numbers alone.',
    ],
  },
  {
    id: '2016',
    year: '2016',
    title: 'Indian Treks Is Founded',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&h=1200&fit=crop',
    imageAlt: 'High-altitude Himalayan trail',
    paragraphs: [
      'Brothers Mr. Vijay Rana and Mr. Vivek Rana founded Indian Treks in Dehradun, Uttarakhand — building a company that delivers authentic, customized, and responsible Himalayan adventures.',
      'Born and raised in a remote Himalayan village, the founders shaped Indian Treks into an organization that is vocal for locals and deeply committed to sustainable tourism.',
    ],
  },
  {
    id: 'routes',
    year: 'Growth',
    title: '200+ Routes & Expeditions',
    image:
      'https://images.unsplash.com/photo-1544735716-392fe403270d?w=900&h=1200&fit=crop',
    imageAlt: 'Temple and mountain landscape on a Himalayan pilgrimage route',
    paragraphs: [
      'Indian Treks expanded into 200+ trekking routes and 12+ high-altitude expeditions, along with camping, rafting, mountaineering, and customized itineraries.',
      'Journeys for individuals, groups, schools, and corporates were built around safety, comfort, and immersive mountain experience.',
    ],
  },
  {
    id: 'scale',
    year: 'Today',
    title: '20,000+ Trekkers Every Year',
    image:
      'https://images.unsplash.com/photo-1454496522488-7a8e5932c6a4?w=900&h=1200&fit=crop',
    imageAlt: 'Trekkers on a snow-dusted Himalayan ridge',
    paragraphs: [
      'Today, Indian Treks organizes 20,000+ trekkers every year — a trusted community for Himalayan treks and adventure travel.',
      'Around 50 specialists, including more than 20 qualified guides and tour leaders, deliver excellent experiences under one roof.',
    ],
  },
  {
    id: 'values',
    year: 'Values',
    title: 'Leave No Trace & Eco-Tourism',
    image:
      'https://images.unsplash.com/photo-1551632811-561732d1e306?w=900&h=1200&fit=crop',
    imageAlt: 'Trekking group with guides on a mountain trail',
    paragraphs: [
      'Indiantreks has taken the Eco-Tourism Pledge. Leave No Trace is a fundamental belief — unspoiled natural settings should remain untouched for future hikers.',
      'We prefer remote rural locations and help residents gain confidence and resources so they feel they have a stake in sustainable tourism.',
    ],
  },
  {
    id: 'trust',
    year: 'Trust',
    title: 'Authorized & Recognized',
    image:
      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=900&h=1200&fit=crop',
    imageAlt: 'Dramatic Himalayan valley under open sky',
    paragraphs: [
      'Recognized as an Authorized Adventure Tour Operator by the Ministry of Tourism, Government of India — with UTDB, MSME/Udyam, DGFT, and ISO 9001:2015 registrations.',
      'From permits to ethical trekking practices, we take care of the details so you can focus on the adventure.',
    ],
  },
] as const;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export default function OurJourney() {
  const rootRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener?.('change', sync);
    return () => mq.removeEventListener?.('change', sync);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const root = rootRef.current;
    if (!root) return;

    const count = CHAPTERS.length;
    root.style.setProperty('--it-journey-count', String(count));

    const update = () => {
      rafRef.current = 0;
      const rect = root.getBoundingClientRect();
      const headerRaw = getComputedStyle(root).getPropertyValue('--it-journey-header').trim();
      const headerPx = headerRaw.endsWith('rem')
        ? parseFloat(headerRaw) * 16
        : parseFloat(headerRaw) || 0;

      const stage = root.querySelector('.it-sticky-journey__stage') as HTMLElement | null;
      const panelH = Math.max(stage?.offsetHeight || 0, 1);
      // Sticky hold distance = section height − stage height ≈ (n − 1) × panel
      const stickRange = Math.max(root.offsetHeight - panelH, 1);
      const scrolled = clamp(-rect.top + headerPx, 0, stickRange);
      const rawIndex = scrolled / panelH; // 0 → n-1

      panelRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.zIndex = String(i + 1);
        if (i === 0) {
          el.style.transform = 'translate3d(0, 0, 0)';
          return;
        }
        const local = clamp(rawIndex - (i - 1), 0, 1);
        const y = (1 - local) * 100;
        el.style.transform = `translate3d(0, ${y}%, 0)`;
      });
    };

    const onScrollOrResize = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });
    window.addEventListener('orientationchange', onScrollOrResize, { passive: true });
    // iOS toolbar show/hide
    const vv = window.visualViewport;
    vv?.addEventListener('resize', onScrollOrResize);
    vv?.addEventListener('scroll', onScrollOrResize);

    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      window.removeEventListener('orientationchange', onScrollOrResize);
      vv?.removeEventListener('resize', onScrollOrResize);
      vv?.removeEventListener('scroll', onScrollOrResize);
    };
  }, [reducedMotion]);

  return (
    <section
      ref={rootRef}
      id="our-journey"
      className="it-sticky-journey scroll-mt-24 sm:scroll-mt-28"
      aria-label="Our journey"
      style={{ ['--it-journey-count' as string]: CHAPTERS.length }}
    >
      <div className="it-sticky-journey__stage">
        {CHAPTERS.map((chapter, i) => (
          <div
            key={chapter.id}
            ref={(el) => {
              panelRefs.current[i] = el;
            }}
            className={`it-sticky-journey__panel${reducedMotion ? ' is-static' : ''}`}
            style={
              reducedMotion
                ? { position: 'relative', transform: 'none', zIndex: i + 1 }
                : i === 0
                  ? { transform: 'translate3d(0, 0, 0)', zIndex: 1 }
                  : { zIndex: i + 1 }
            }
          >
            <div className="it-sticky-journey__grid">
              <div className="it-sticky-journey__media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={chapter.image}
                  alt={chapter.imageAlt}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </div>
              <div className="it-sticky-journey__copy">
                <div className="it-sticky-journey__inner">
                  <p className="it-sticky-journey__year">{chapter.year}</p>
                  <h2 className="it-sticky-journey__title">
                    {'accentWord' in chapter && chapter.accentWord ? (
                      <>
                        Roots in the <span>{chapter.accentWord}</span>
                      </>
                    ) : (
                      chapter.title
                    )}
                  </h2>
                  {chapter.paragraphs.map((p) => (
                    <p key={p.slice(0, 32)} className="it-sticky-journey__body">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
