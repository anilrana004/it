'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

/**
 * Flow from https://www.justwravel.com/about — “Our Packing List !!”
 * Sandwich: left photo | dual quotes | right photo → category rail.
 * People: Indian Treks Founder + CEO.
 */

const JW_GREEN = '#1BA553';
const JW_BLUE = '#1D6397';
const JW_CDN = 'https://storage.justwravel.com/about';

const leftFounder = {
  name: 'Mr Vijay Singh Rana',
  role: 'Founder, Indiantreks',
  image: 'https://indiantreks.in/wp-content/uploads/2023/02/Vijay-Singh-Rana-Indian-Treks.jpg',
  quote:
    'Long before Indian Treks was established, I had already been working on the ground in trekking and mountaineering since 2005. With over two decades of hands-on Himalayan experience across Uttarakhand, Himachal Pradesh, and Ladakh, I prioritized quality of work, safety, and real mountain experience over numbers alone. Born and raised in a remote Himalayan village, that connection shaped Indian Treks into an organization that is vocal for locals and deeply committed to sustainable tourism. Together with my brother Vivek, we built a company that delivers authentic, customized, and responsible Himalayan adventures.',
} as const;

const rightFounder = {
  name: 'Mr Vivek Rana',
  role: 'CEO, Indiantreks',
  image:
    'https://indiantreks.in/wp-content/uploads/2025/02/WhatsApp-Image-2025-02-02-at-1.52.36-PM-1024x983.jpeg',
  quote:
    'Hailing from the remote Osla village in the western Garhwal Himalayas, I bring over 15 years of experience as a mountain guide and now serve as CEO of Indiantreks. From Kalindi Khal, Bali Pass, Borasu Pass, and Rupin Pass to Valley of Flowers and Kedarkantha — and with Advance Mountaineering training from NIM — my focus has always been safe, well-planned journeys. Today we welcome 20,000+ trekkers every year across 200+ routes, and our goal remains the same: make every Himalayan adventure smooth, enriching, and unforgettable.',
} as const;

const categories = [
  { label: 'All Girls', href: '/group-trips', img: `${JW_CDN}/categoryCards/Justwravel-All-Girls-Trips.jpg`, tone: 'green' as const },
  { label: 'International Tours', href: '/international-getaways', img: `${JW_CDN}/categoryCards/Justwravel-International-Trips.jpg`, tone: 'blue' as const },
  { label: 'School Tours', href: '/corporate', img: `${JW_CDN}/categoryCards/Justwravel-School-Tours.jpg`, tone: 'green' as const },
  { label: 'Weekend Getaways', href: '/treks?difficulty=easy', img: `${JW_CDN}/categoryCards/Justwravel-Weekend-gaetways.jpg`, tone: 'blue' as const },
  { label: 'Biking Trips', href: '/biking', img: `${JW_CDN}/categoryCards/Justwravel-Biking-Trips.jpg`, tone: 'green' as const },
  { label: 'Corporate Outings', href: '/corporate', img: `${JW_CDN}/categoryCards/Justwravel-Corporate-Trips.jpg`, tone: 'blue' as const },
  { label: 'Himalayan Treks', href: '/treks', img: `${JW_CDN}/categoryCards/Justwravel-Himalyan-Treks.jpg`, tone: 'green' as const },
  { label: 'College Trips', href: '/group-trips', img: `${JW_CDN}/categoryCards/Justwravel-College-Trips.jpg`, tone: 'blue' as const },
  { label: 'Backpacking', href: '/#backpacking', img: `${JW_CDN}/categoryCards/Justwravel-Backpacking-Trips.jpg`, tone: 'green' as const },
  { label: 'Over Landing Trips', href: '/biking', img: `${JW_CDN}/categoryCards/Justwravel-Overlanding.jpg`, tone: 'blue' as const },
  { label: 'Honeymoon Tours', href: '/customized', img: `${JW_CDN}/categoryCards/Justwravel-Honeymoon-Trips.jpg`, tone: 'green' as const },
  { label: 'Customized Trips', href: '/customized', img: `${JW_CDN}/categoryCards/Justwravel-Customized-Trips.jpg`, tone: 'blue' as const },
];

function CategoryRail() {
  const trackRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    let last = 0;
    const speed = 36;

    const tick = (ts: number) => {
      if (!last) last = ts;
      const dt = Math.min(ts - last, 48);
      last = ts;
      if (!paused.current) {
        el.scrollLeft += (speed * dt) / 1000;
        const half = el.scrollWidth / 2;
        if (half > 0 && el.scrollLeft >= half) el.scrollLeft -= half;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const pause = () => {
      paused.current = true;
    };
    const resume = () => {
      paused.current = false;
      last = 0;
    };
    el.addEventListener('pointerdown', pause);
    el.addEventListener('touchstart', pause, { passive: true });
    el.addEventListener('mouseenter', pause);
    el.addEventListener('mouseleave', resume);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointerdown', pause);
      el.removeEventListener('touchstart', pause);
      el.removeEventListener('mouseenter', pause);
      el.removeEventListener('mouseleave', resume);
    };
  }, []);

  const loop = [...categories, ...categories];

  return (
    <div className="mt-8 lg:mx-16 xl:mx-28 2xl:mx-[18rem]">
      <div
        ref={trackRef}
        className="mySwiper2 mt-3 flex gap-3 overflow-x-auto pb-3 scrollbar-none"
        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
        aria-label="Trip categories"
      >
        {loop.map((c, i) => (
          <div key={`${c.label}-${i}`} className="swiper-slide w-[72vw] max-w-[280px] shrink-0 sm:w-[42vw] lg:w-[18vw] lg:max-w-none lg:min-w-[240px]">
            <Link
              href={c.href}
              tabIndex={i >= categories.length ? -1 : 0}
              aria-hidden={i >= categories.length}
              className="block"
            >
              <div className="relative h-[46vh] max-h-[420px] lg:h-[62vh] lg:max-h-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.img}
                  alt={c.label}
                  width={500}
                  height={600}
                  loading="lazy"
                  className="h-full w-full rounded-[0.75rem] object-cover"
                  referrerPolicy="no-referrer"
                />
                <div
                  className="absolute bottom-[7vh] left-1/2 w-2/3 -translate-x-1/2 translate-y-1/2 rounded-lg p-2 text-center shadow-lg lg:p-4 2xl:bottom-[3vh]"
                  style={{
                    backgroundColor: c.tone === 'green' ? JW_GREEN : JW_BLUE,
                    opacity: 0.9,
                  }}
                >
                  <p className="mb-0 text-base font-bold leading-none text-white lg:mb-2 lg:text-2xl">
                    {c.label}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function OurPackingList() {
  return (
    <section
      id="packing-list"
      className="it-packing mb-12 scroll-mt-24 overflow-x-clip sm:mb-16 sm:scroll-mt-28"
      aria-labelledby="packing-list-heading"
    >
      <style>{`
        .it-packing__sandwich {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          justify-content: center;
          gap: 0;
          margin-left: 0.5rem;
          margin-right: 0.5rem;
        }

        @media (min-width: 1024px) {
          .it-packing__sandwich {
            flex-direction: row;
            align-items: flex-end;
            gap: 1.5rem;
            margin-left: 1rem;
            margin-right: 1rem;
          }
        }

        @media (min-width: 1280px) {
          .it-packing__sandwich { gap: 2.5rem; }
        }

        .it-packing__person {
          color: #fff;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        @media (min-width: 1024px) {
          .it-packing__person { align-self: flex-end; }
        }

        .it-packing__person img {
          display: block;
          margin: 0 auto;
          object-fit: cover;
          object-position: top;
        }

        .it-packing__person--left img {
          height: 13rem;
          width: 11rem;
        }

        .it-packing__person--right img {
          height: 13rem;
          width: 16rem;
        }

        @media (min-width: 1024px) {
          .it-packing__person--left img {
            height: 17rem;
            width: 15rem;
          }
          .it-packing__person--right img {
            height: 17rem;
            width: 20rem;
          }
        }

        .it-packing__badge {
          width: 100%;
          max-width: 22rem;
          padding: 0.35rem 0.75rem 0.5rem;
          text-align: center;
          font-weight: 700;
          border-top-left-radius: 1.5rem;
          border-top-right-radius: 1.5rem;
        }

        @media (min-width: 1024px) {
          .it-packing__badge {
            min-width: min(22rem, 100%);
            border-radius: 0 0 1.5rem 1.5rem;
          }
        }

        .it-packing__badge p:first-child {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.2;
        }

        .it-packing__badge p:last-child {
          margin: 0.15rem 0 0;
          font-size: 0.875rem;
          font-weight: 600;
          opacity: 0.95;
        }

        @media (min-width: 1024px) {
          .it-packing__badge p:first-child {
            font-size: clamp(1.25rem, 1.6vw, 1.75rem);
          }
        }

        .it-packing__quotes {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          min-width: 0;
          width: 100%;
        }

        @media (min-width: 1024px) {
          .it-packing__quotes {
            flex: 1 1 0;
            max-width: 40rem;
          }
        }

        .it-packing__quote {
          color: #fff;
          overflow-y: auto;
          padding: 0.25rem;
          border-bottom-left-radius: 1rem;
          border-bottom-right-radius: 1rem;
          max-height: none;
        }

        @media (min-width: 1024px) {
          .it-packing__quote {
            height: 12rem;
            padding: 1rem;
            border-radius: 1rem 1rem 0 0;
          }
        }

        .it-packing__quote p {
          margin: 0;
          padding: 1rem;
          text-align: justify;
          font-size: 12px;
          line-height: 1.55;
        }

        @media (min-width: 1024px) {
          .it-packing__quote p {
            padding: 0;
            font-size: 0.875rem;
            line-height: 1.45;
          }
        }

        /* Mobile JW flow: photo → name → quotes attach under first badge */
        @media (max-width: 1023px) {
          .it-packing__person--left .it-packing__badge {
            max-width: 16rem;
          }
          .it-packing__person--right {
            margin-top: 0.5rem;
          }
          .it-packing__person--right .it-packing__badge {
            max-width: 18rem;
            border-radius: 1.5rem 1.5rem 0 0;
          }
          .it-packing__quotes {
            margin-top: -1px;
          }
          .it-packing__quote:first-child {
            border-radius: 0 0 1rem 1rem;
          }
        }
      `}</style>

      <div className="mt-10 sm:mt-14">
        <h2
          id="packing-list-heading"
          className="px-4 text-center text-[1.5rem] font-bold text-[#1BA553] lg:text-5xl"
        >
          Our Packing List !!
        </h2>
        <div className="my-4 font-bold" aria-hidden />

        <div className="it-packing__sandwich">
          {/* Left — Founder (blue) */}
          <div className="it-packing__person it-packing__person--left">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={leftFounder.image}
              alt={`Indian Treks Founder ${leftFounder.name}`}
              referrerPolicy="no-referrer"
            />
            <div className="it-packing__badge" style={{ backgroundColor: JW_BLUE }}>
              <p>{leftFounder.name}</p>
              <p>{leftFounder.role}</p>
            </div>
          </div>

          {/* Dual quotes */}
          <div className="it-packing__quotes">
            <div className="it-packing__quote" style={{ backgroundColor: JW_BLUE }}>
              <p>{leftFounder.quote}</p>
            </div>
            <div className="it-packing__quote" style={{ backgroundColor: JW_GREEN }}>
              <p>{rightFounder.quote}</p>
            </div>
          </div>

          {/* Right — CEO (green) */}
          <div className="it-packing__person it-packing__person--right">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={rightFounder.image}
              alt={`Indian Treks CEO ${rightFounder.name}`}
              referrerPolicy="no-referrer"
            />
            <div className="it-packing__badge" style={{ backgroundColor: JW_GREEN }}>
              <p>{rightFounder.name}</p>
              <p>{rightFounder.role}</p>
            </div>
          </div>
        </div>
      </div>

      <CategoryRail />
    </section>
  );
}
