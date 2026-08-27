'use client';

import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import './video-gallery.css';

type MemoryVideo = {
  id: string;
  title: string;
  youtubeId: string;
};

const MEMORIES: MemoryVideo[] = [
  { id: 'kedarkantha', title: 'Kedarkantha Trek', youtubeId: '97J3LIF3VAI' },
  { id: 'kuari-pass', title: 'Kuari Pass Trek', youtubeId: 'rmuuxRaCSH0' },
  { id: 'yatra', title: 'Sacred Yatras', youtubeId: 'EuRs_GP29Lo' },
  { id: 'flowers', title: 'Valley of Flowers', youtubeId: 'qrMyYGaJA0s' },
  { id: 'nepal', title: 'Nepal & Abroad', youtubeId: '8efveLZ3E24' },
  { id: 'chopta', title: 'Chopta Tungnath', youtubeId: '1v8ThiFzp9U' },
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

function thumbUrl(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

function VideoPanel({ item, isActive }: { item: MemoryVideo; isActive: boolean }) {
  return (
    <div
      className={`it-vid-mem__panel${isActive ? ' is-active' : ''}`}
      role="button"
      tabIndex={0}
      aria-label={isActive ? `${item.title} (playing)` : `Show ${item.title}`}
    >
      <div className="it-vid-mem__bezel">
        <div className="it-vid-mem__frame">
          {isActive ? (
            <iframe
              className="it-vid-mem__media it-vid-mem__media--video"
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
                className="it-vid-mem__media"
                src={thumbUrl(item.youtubeId)}
                alt=""
                loading="lazy"
                draggable={false}
              />
              <span className="it-vid-mem__play" aria-hidden>
                <Play className="h-5 w-5" fill="currentColor" />
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VideoGallery() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [active, setActive] = useState(0);
  const activeId = MEMORIES[active]?.id;

  return (
    <section className="it-vid-mem" aria-labelledby="memories-for-life-title">
      <div className="it-vid-mem__head">
        <p className="it-vid-mem__kicker">Videos</p>
        <h2 id="memories-for-life-title" className="it-vid-mem__title">
          Memories for Life
        </h2>
        <p className="it-vid-mem__lead">50+ moments from our wravelers on trail</p>
      </div>

      <div className="it-vid-mem__shell">
        <Swiper
          className="it-vid-mem__swiper"
          modules={[EffectCoverflow]}
          effect="coverflow"
          grabCursor
          centeredSlides
          loop
          slidesPerView="auto"
          speed={580}
          slideToClickedSlide
          simulateTouch
          allowTouchMove
          threshold={6}
          touchAngle={35}
          resistanceRatio={0.72}
          watchSlidesProgress
          coverflowEffect={{
            rotate: 0,
            stretch: -26,
            depth: 220,
            modifier: 1.1,
            slideShadows: false,
          }}
          breakpoints={{
            768: {
              coverflowEffect: {
                rotate: 22,
                stretch: -8,
                depth: 120,
                modifier: 1.05,
                slideShadows: false,
              },
            },
            1024: {
              coverflowEffect: {
                rotate: 28,
                stretch: -8,
                depth: 130,
                modifier: 1.05,
                slideShadows: false,
              },
            },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setActive(swiper.realIndex);
          }}
          onSlideChange={(swiper) => {
            setActive(swiper.realIndex);
          }}
        >
          {MEMORIES.map((item) => (
            <SwiperSlide key={item.id} className="it-vid-mem__slide">
              <VideoPanel item={item} isActive={item.id === activeId} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="it-vid-mem__nav">
          <button
            type="button"
            className="it-vid-mem__nav-btn"
            aria-label="Previous video"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
          </button>
          <button
            type="button"
            className="it-vid-mem__nav-btn"
            aria-label="Next video"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
