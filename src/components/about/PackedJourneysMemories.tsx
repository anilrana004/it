'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { photos } from '@/lib/media';

/**
 * What’s packed — 3D fanned coverflow (JustWravel Memories-style depth),
 * responsive by device. Same journey content; center plays, sides click to focus.
 */

export type PackedJourney = {
  id: string;
  title: string;
  href: string;
  youtubeId: string;
  image: string;
};

const JOURNEYS: PackedJourney[] = [
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

type Layout = {
  spacing: number;
  angle: number;
  depth: number;
  scaleStep: number;
  visible: number;
};

function useFanLayout(): Layout {
  const [layout, setLayout] = useState<Layout>({
    spacing: 52,
    angle: 42,
    depth: 120,
    scaleStep: 0.08,
    visible: 2,
  });

  useEffect(() => {
    const sync = () => {
      const w = window.innerWidth;
      if (w < 520) {
        setLayout({ spacing: 28, angle: 28, depth: 70, scaleStep: 0.1, visible: 1 });
      } else if (w < 768) {
        setLayout({ spacing: 36, angle: 34, depth: 90, scaleStep: 0.09, visible: 2 });
      } else if (w < 1100) {
        setLayout({ spacing: 46, angle: 38, depth: 110, scaleStep: 0.08, visible: 2 });
      } else {
        setLayout({ spacing: 54, angle: 44, depth: 140, scaleStep: 0.07, visible: 2 });
      }
    };
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, []);

  return layout;
}

export default function PackedJourneysMemories() {
  const [active, setActive] = useState(0);
  const layout = useFanLayout();
  const stageRef = useRef<HTMLDivElement | null>(null);
  const drag = useRef<{ x: number; active: boolean }>({ x: 0, active: false });
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const goTo = useCallback((index: number) => {
    const n = JOURNEYS.length;
    setActive(((index % n) + n) % n);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, active: true };
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.x;
    drag.current.active = false;
    if (Math.abs(dx) < 40) return;
    goTo(active + (dx < 0 ? 1 : -1));
  };

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goTo(active - 1);
      if (e.key === 'ArrowRight') goTo(active + 1);
    };
    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, [active, goTo]);

  const current = JOURNEYS[active];
  const n = JOURNEYS.length;

  return (
    <div className="it-pack-mem" aria-label="What's packed — journeys">
      <div className="it-pack-mem__head">
        <p className="it-pack-mem__kicker">What&apos;s packed</p>
        <h3 className="it-pack-mem__title">Tap a journey to open it</h3>
      </div>

      <div
        ref={stageRef}
        className="it-pack-mem__fan"
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          drag.current.active = false;
        }}
      >
        <button
          type="button"
          className="it-pack-mem__nav it-pack-mem__nav--prev"
          aria-label="Previous journey"
          onClick={() => goTo(active - 1)}
        >
          <i className="fa-solid fa-chevron-left" aria-hidden />
        </button>

        <div className="it-pack-mem__scene" aria-live="polite">
          {JOURNEYS.map((item, i) => {
            let offset = i - active;
            if (offset > n / 2) offset -= n;
            if (offset < -n / 2) offset += n;

            const abs = Math.abs(offset);
            const hidden = abs > layout.visible;
            const isActive = offset === 0;

            const transform = isActive
              ? 'translate(-50%, -50%) translateZ(0) rotateY(0deg) scale(1)'
              : `translate(-50%, -50%) translateX(${offset * layout.spacing}%) translateZ(${-abs * layout.depth}px) rotateY(${-offset * layout.angle}deg) scale(${Math.max(0.72, 1 - abs * layout.scaleStep)})`;

            return (
              <button
                key={item.id}
                type="button"
                className={`it-pack-mem__card${isActive ? ' is-active' : ''}${hidden ? ' is-far' : ''}`}
                style={{
                  transform,
                  zIndex: isActive ? 40 : 20 - abs,
                  opacity: hidden ? 0 : 1,
                  pointerEvents: hidden ? 'none' : 'auto',
                  transition: reduceMotion.current
                    ? 'none'
                    : 'transform 0.65s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease',
                }}
                aria-pressed={isActive}
                aria-label={item.title}
                tabIndex={hidden ? -1 : 0}
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
                  <img className="it-pack-mem__thumb" src={item.image} alt="" loading="lazy" />
                )}
                {!isActive ? <span className="it-pack-mem__card-label">{item.title}</span> : null}
              </button>
            );
          })}
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
