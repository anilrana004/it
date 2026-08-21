'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { photos } from '@/lib/media';

/**
 * Trail memories — large cards, native horizontal snap on phone,
 * stronger 3D fan on desktop. Same journey links as before.
 */

type Journey = {
  id: string;
  title: string;
  href: string;
  youtubeId: string;
  image: string;
};

const JOURNEYS: Journey[] = [
  {
    id: 'treks',
    title: 'Himalayan Treks',
    href: '/treks',
    youtubeId: 'sNDtl6HIQ7Y',
    image: photos.kedarkantha,
  },
  {
    id: 'snow',
    title: 'Snow Trails',
    href: '/treks',
    youtubeId: 'DJwxrGD7R2w',
    image: photos.snow,
  },
  {
    id: 'yatra',
    title: 'Sacred Yatras',
    href: '/yatra',
    youtubeId: 'r1COghljrtg',
    image: photos.yatra,
  },
  {
    id: 'flowers',
    title: 'Valley of Flowers',
    href: '/treks/valley-of-flowers',
    youtubeId: 'DJjleyyCehY',
    image: photos.vof,
  },
  {
    id: 'nepal',
    title: 'Nepal & Abroad',
    href: '/international-getaways',
    youtubeId: 'Enn8Eci72Vw',
    image: photos.ebc,
  },
  {
    id: 'custom',
    title: 'Custom Trips',
    href: '/customized',
    youtubeId: 'OuqA0EJZaz4',
    image: photos.chopta,
  },
];

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
  const railRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const nodes = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!best) return;
        const idx = nodes.indexOf(best.target as HTMLDivElement);
        if (idx >= 0) setActive(idx);
      },
      { root: rail, threshold: [0.55, 0.7] },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  const goTo = (index: number) => {
    const next = (index + JOURNEYS.length) % JOURNEYS.length;
    setActive(next);
    cardRefs.current[next]?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  };

  const current = JOURNEYS[active] ?? JOURNEYS[0];

  return (
    <div className="it-pack-mem" aria-label="Memories from the trail">
      <div className="it-pack-mem__head">
        <p className="it-pack-mem__kicker">Videos</p>
        <h3 className="it-pack-mem__title">Memories from the trail</h3>
      </div>

      <div className="it-pack-mem__stage">
        <button
          type="button"
          className="it-pack-mem__nav it-pack-mem__nav--prev"
          aria-label="Previous"
          onClick={() => goTo(active - 1)}
        >
          <i className="fa-solid fa-chevron-left" aria-hidden />
        </button>

        <div ref={railRef} className="it-pack-mem__rail">
          {JOURNEYS.map((item, i) => {
            const isActive = i === active;
            return (
              <div
                key={item.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className={`it-pack-mem__card${isActive ? ' is-active' : ''}`}
                onClick={() => {
                  if (!isActive) goTo(i);
                }}
                role="group"
                aria-label={item.title}
              >
                {isActive ? (
                  <iframe
                    className="it-pack-mem__media"
                    src={embedUrl(item.youtubeId)}
                    title={item.title}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className="it-pack-mem__media"
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    draggable={false}
                  />
                )}
                {!isActive ? <span className="it-pack-mem__caption">{item.title}</span> : null}
              </div>
            );
          })}
        </div>

        <button
          type="button"
          className="it-pack-mem__nav it-pack-mem__nav--next"
          aria-label="Next"
          onClick={() => goTo(active + 1)}
        >
          <i className="fa-solid fa-chevron-right" aria-hidden />
        </button>
      </div>

      <div className="it-pack-mem__dots" role="tablist" aria-label="Memory slides">
        {JOURNEYS.map((item, i) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={`it-pack-mem__dot${i === active ? ' is-active' : ''}`}
            aria-label={item.title}
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
