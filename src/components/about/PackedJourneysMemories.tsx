'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * What’s packed — UI/UX from JustWravel “VIDEOS / Memories for Life”
 * https://www.justwravel.com/about
 * Centered coverflow: active slide autoplays muted; sides are thumbs; open journey works.
 */

export type PackedJourney = {
  id: string;
  title: string;
  href: string;
  youtubeId: string;
};

const JOURNEYS: PackedJourney[] = [
  {
    id: 'treks',
    title: 'Himalayan Treks',
    href: '/treks',
    youtubeId: 'sNDtl6HIQ7Y',
  },
  {
    id: 'snow',
    title: 'Snow Trails',
    href: '/treks',
    youtubeId: 'DJwxrGD7R2w',
  },
  {
    id: 'yatra',
    title: 'Sacred Yatras',
    href: '/yatra',
    youtubeId: 'r1COghljrtg',
  },
  {
    id: 'flowers',
    title: 'Valley of Flowers',
    href: '/treks/valley-of-flowers',
    youtubeId: 'DJjleyyCehY',
  },
  {
    id: 'nepal',
    title: 'Nepal & Abroad',
    href: '/international-getaways',
    youtubeId: 'Enn8Eci72Vw',
  },
  {
    id: 'custom',
    title: 'Custom Trips',
    href: '/customized',
    youtubeId: 'OuqA0EJZaz4',
  },
];

function thumbUrl(id: string) {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}

function embedUrl(id: string) {
  const q = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    controls: '0',
    loop: '1',
    playlist: id,
    modestbranding: '1',
    rel: '0',
    playsinline: '1',
  });
  return `https://www.youtube-nocookie.com/embed/${id}?${q.toString()}`;
}

export default function PackedJourneysMemories() {
  const [active, setActive] = useState(0);
  const slideRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Center first slide on mount (JW-style coverflow)
    requestAnimationFrame(() => {
      slideRefs.current[0]?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'auto' });
    });
  }, []);

  const goTo = useCallback((index: number) => {
    const next = (index + JOURNEYS.length) % JOURNEYS.length;
    setActive(next);
    slideRefs.current[next]?.scrollIntoView({
      behavior: reduceMotion.current ? 'auto' : 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const nodes = slideRefs.current.filter(Boolean) as HTMLButtonElement[];
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!best?.target) return;
        const idx = nodes.indexOf(best.target as HTMLButtonElement);
        if (idx >= 0) setActive(idx);
      },
      { root: viewport, threshold: [0.45, 0.6, 0.75] },
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  const current = JOURNEYS[active];

  return (
    <div className="it-pack-mem" aria-label="What's packed — journeys">
      <div className="it-pack-mem__head">
        <p className="it-pack-mem__kicker">What&apos;s packed</p>
        <h3 className="it-pack-mem__title">Tap a journey to open it</h3>
      </div>

      <div className="it-pack-mem__stage">
        <button
          type="button"
          className="it-pack-mem__nav it-pack-mem__nav--prev"
          aria-label="Previous journey"
          onClick={() => goTo(active - 1)}
        >
          <i className="fa-solid fa-chevron-left" aria-hidden />
        </button>

        <div ref={viewportRef} className="it-pack-mem__viewport">
          <div className="it-pack-mem__track">
            {JOURNEYS.map((item, i) => {
              const isActive = i === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  ref={(el) => {
                    slideRefs.current[i] = el;
                  }}
                  className={`it-pack-mem__slide${isActive ? ' is-active' : ''}`}
                  aria-pressed={isActive}
                  aria-label={`${item.title}${isActive ? ' (playing)' : ''}`}
                  onClick={() => {
                    if (!isActive) goTo(i);
                  }}
                >
                  {isActive ? (
                    <iframe
                      className="it-pack-mem__frame"
                      src={embedUrl(item.youtubeId)}
                      title={item.title}
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      className="it-pack-mem__thumb"
                      src={thumbUrl(item.youtubeId)}
                      alt=""
                      loading="lazy"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          className="it-pack-mem__nav it-pack-mem__nav--next"
          aria-label="Next journey"
          onClick={() => goTo(active + 1)}
        >
          <i className="fa-solid fa-chevron-right" aria-hidden />
        </button>
      </div>

      <div className="it-pack-mem__dots" role="tablist" aria-label="Journey slides">
        {JOURNEYS.map((item, i) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={item.title}
            className={`it-pack-mem__dot${i === active ? ' is-active' : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      <div className="it-pack-mem__cta-wrap">
        <Link href={current.href} className="it-pack-mem__cta">
          Open {current.title}
          <i className="fa-solid fa-arrow-right" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
