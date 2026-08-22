'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

/**
 * Trail Highlights from the Community — video coverflow.
 * Side slides use official YouTube thumbnails (`i.ytimg.com`); center slide autoplays muted.
 */

type Journey = {
  id: string;
  title: string;
  href: string;
  youtubeId: string;
};

const JOURNEYS: Journey[] = [
  {
    id: 'kedarkantha',
    title: 'Kedarkantha Trek',
    href: '/treks/kedarkantha',
    youtubeId: '97J3LIF3VAI',
  },
  {
    id: 'kuari-pass',
    title: 'Kuari Pass Trek',
    href: '/treks/kuari-pass',
    youtubeId: 'rmuuxRaCSH0',
  },
  {
    id: 'yatra',
    title: 'Sacred Yatras',
    href: '/yatra',
    youtubeId: 'EuRs_GP29Lo',
  },
  {
    id: 'flowers',
    title: 'Valley of Flowers Trek',
    href: '/treks/valley-of-flowers',
    youtubeId: 'qrMyYGaJA0s',
  },
  {
    id: 'nepal',
    title: 'Nepal & Abroad',
    href: '/international-getaways',
    youtubeId: '8efveLZ3E24',
  },
  {
    id: 'chopta',
    title: 'Chopta Tungnath Trek',
    href: '/treks/chopta-tungnath',
    youtubeId: '1v8ThiFzp9U',
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

/** Official YouTube still — hq is reliably available for every public video */
function thumbUrl(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export default function PackedJourneysMemories() {
  const [active, setActive] = useState(0);
  const current = JOURNEYS[active] ?? JOURNEYS[0];

  return (
    <div className="it-pack-mem" aria-label="Trail Highlights from the Community">
      <div className="it-pack-mem__head">
        <p className="it-pack-mem__kicker">Videos</p>
        <h3 className="it-pack-mem__title">Trail Highlights from the Community</h3>
      </div>

      <div className="it-pack-mem__shell">
        <Swiper
          className="it-pack-mem__swiper"
          modules={[EffectCoverflow, Navigation, Pagination]}
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          speed={700}
          navigation
          pagination={{ clickable: true }}
          slideToClickedSlide
          simulateTouch
          allowTouchMove
          threshold={8}
          touchAngle={28}
          touchReleaseOnEdges
          touchStartPreventDefault={false}
          resistanceRatio={0.65}
          coverflowEffect={{
            rotate: 28,
            stretch: -10,
            depth: 120,
            modifier: 1,
            slideShadows: false,
          }}
          breakpoints={{
            0: {
              coverflowEffect: {
                rotate: 16,
                stretch: -6,
                depth: 80,
                modifier: 1,
                slideShadows: false,
              },
            },
            640: {
              coverflowEffect: {
                rotate: 22,
                stretch: -8,
                depth: 100,
                modifier: 1,
                slideShadows: false,
              },
            },
            1024: {
              coverflowEffect: {
                rotate: 28,
                stretch: -10,
                depth: 120,
                modifier: 1,
                slideShadows: false,
              },
            },
            1400: {
              coverflowEffect: {
                rotate: 32,
                stretch: -12,
                depth: 140,
                modifier: 1,
                slideShadows: false,
              },
            },
          }}
          onSwiper={(swiper: SwiperType) => setActive(swiper.activeIndex)}
          onSlideChange={(swiper: SwiperType) => setActive(swiper.activeIndex)}
        >
          {JOURNEYS.map((item, i) => {
            const isActive = i === active;

            return (
              <SwiperSlide key={item.id} className="it-pack-mem__slide">
                <div
                  className={`it-pack-mem__panel${isActive ? ' is-active' : ''}`}
                  role="button"
                  tabIndex={0}
                  aria-label={isActive ? `${item.title} (playing)` : `Show ${item.title}`}
                >
                  {isActive ? (
                    <iframe
                      className="it-pack-mem__media it-pack-mem__media--video"
                      src={embedUrl(item.youtubeId)}
                      title={item.title}
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                      tabIndex={-1}
                    />
                  ) : (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="it-pack-mem__media"
                        src={thumbUrl(item.youtubeId)}
                        alt=""
                        loading="lazy"
                        draggable={false}
                      />
                      <span className="it-pack-mem__play" aria-hidden>
                        <i className="fa-solid fa-play" />
                      </span>
                    </>
                  )}
                  {!isActive ? (
                    <span className="it-pack-mem__caption">{item.title}</span>
                  ) : null}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
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
