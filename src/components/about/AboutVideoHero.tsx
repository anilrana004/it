'use client';

import { useEffect, useState } from 'react';

/**
 * UI/UX mirrored from https://roopkundheaven.in/about-us/ — about-hero video band:
 * full-bleed muted looping video, dual overlays + vignette + bottom fade,
 * glass kicker, rotating display headline, supporting copy, mini pills, scroll cue.
 */
const HEADLINES = [
  "India's Most Trusted Trekking Company Since 2016",
  'Authentic Customized Himalayan Adventures',
  '20,000+ Trekkers Every Year',
  'Vocal for Locals & Sustainable Tourism',
  'Built On Trust, Passion & Himalayas',
] as const;

const VIDEO_SRC =
  'https://videos.pexels.com/video-files/3571264/3571264-hd_1920_1080_30fps.mp4';

export default function AboutVideoHero() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const id = window.setInterval(() => {
      setFade(false);
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % HEADLINES.length);
        setFade(true);
      }, 420);
    }, 2800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="it-video-hero" aria-label="Indian Treks journey film">
      <style>{`
        .it-video-hero {
          position: relative;
          width: 100%;
          min-height: 720px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #000;
          isolation: isolate;
        }

        .it-video-hero__video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.02);
        }

        .it-video-hero__overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            linear-gradient(to right, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.25) 42%, rgba(0,0,0,0.52) 100%),
            linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.46) 55%, rgba(0,0,0,0.78) 100%);
        }

        .it-video-hero__vignette {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: radial-gradient(circle at center, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.18) 45%, rgba(0,0,0,0.52) 100%);
        }

        .it-video-hero__bottomfade {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 180px;
          z-index: 1;
          background: linear-gradient(to top, rgba(0,0,0,0.82), rgba(0,0,0,0));
        }

        .it-video-hero__content {
          position: relative;
          z-index: 3;
          max-width: 980px;
          width: 100%;
          padding: 0 28px;
          text-align: center;
          color: #fff;
        }

        .it-video-hero__tag {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          padding: 10px 18px;
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 999px;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.94);
          box-shadow: 0 10px 30px rgba(0,0,0,0.18);
        }

        .it-video-hero__tag::before {
          content: "";
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 12px rgba(74,222,128,0.7);
        }

        .it-video-hero__title {
          margin: 0 auto;
          max-width: 900px;
          min-height: 110px;
          font-family: var(--font-heading), ui-sans-serif, system-ui, sans-serif;
          font-size: clamp(28px, 4.2vw, 56px);
          line-height: 1.08;
          font-weight: 800;
          letter-spacing: -1.4px;
          color: #fff;
          text-shadow: 0 8px 30px rgba(0,0,0,0.34);
          transition: opacity 0.45s ease, transform 0.45s ease;
          min-height: 1.2em;
        }

        .it-video-hero__title.is-out {
          opacity: 0;
          transform: translateY(14px);
        }

        .it-video-hero__title.is-in {
          opacity: 1;
          transform: translateY(0);
        }

        .it-video-hero__lead {
          margin: 24px auto 0;
          max-width: 760px;
          font-size: 18px;
          line-height: 1.8;
          font-weight: 400;
          color: rgba(255,255,255,0.86);
          text-shadow: 0 4px 20px rgba(0,0,0,0.28);
        }

        .it-video-hero__line {
          width: 110px;
          height: 1px;
          margin: 28px auto 22px;
          background: linear-gradient(to right, rgba(255,255,255,0), rgba(74,222,128,0.95), rgba(255,255,255,0));
          opacity: 0.9;
        }

        .it-video-hero__mini {
          display: flex;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .it-video-hero__mini span {
          display: inline-flex;
          align-items: center;
          padding: 9px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.9);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.4px;
          backdrop-filter: blur(8px);
        }

        .it-video-hero__scroll {
          position: absolute;
          left: 50%;
          bottom: 28px;
          transform: translateX(-50%);
          z-index: 3;
          width: 28px;
          height: 46px;
          border: 1.5px solid rgba(255,255,255,0.45);
          border-radius: 999px;
          display: flex;
          justify-content: center;
          padding-top: 8px;
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(6px);
        }

        .it-video-hero__scroll span {
          width: 4px;
          height: 10px;
          border-radius: 999px;
          background: rgba(255,255,255,0.9);
          animation: itVideoScrollMove 1.8s infinite;
        }

        @keyframes itVideoScrollMove {
          0% { transform: translateY(0); opacity: 1; }
          70% { transform: translateY(12px); opacity: 0.15; }
          100% { transform: translateY(0); opacity: 1; }
        }

        @media (max-width: 991px) {
          .it-video-hero {
            min-height: 620px;
            height: 88vh;
          }
          .it-video-hero__title {
            min-height: 92px;
            letter-spacing: -1.6px;
          }
          .it-video-hero__lead {
            font-size: 16px;
            max-width: 660px;
          }
        }

        @media (max-width: 767px) {
          .it-video-hero {
            min-height: 0;
            height: min(78svh, 620px);
            align-items: flex-end;
            padding-bottom: 56px;
          }
          .it-video-hero__overlay {
            background:
              linear-gradient(to right, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.32) 50%, rgba(0,0,0,0.54) 100%),
              linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.88) 100%);
          }
          .it-video-hero__content {
            padding: 0 16px;
            padding-top: 4.5rem;
          }
          .it-video-hero__tag {
            margin-bottom: 12px;
            padding: 7px 12px;
            font-size: 10px;
            letter-spacing: 1.2px;
          }
          .it-video-hero__tag::before { width: 6px; height: 6px; }
          .it-video-hero__title {
            min-height: 0;
            font-size: clamp(1.45rem, 6.2vw, 1.9rem);
            line-height: 1.15;
            letter-spacing: -0.03em;
            max-width: 100%;
          }
          .it-video-hero__lead {
            margin-top: 12px;
            font-size: 13px;
            line-height: 1.65;
            max-width: 100%;
          }
          .it-video-hero__line { width: 64px; margin: 16px auto 12px; }
          .it-video-hero__mini { gap: 6px; }
          .it-video-hero__mini span { font-size: 10px; padding: 6px 9px; }
          .it-video-hero__scroll {
            display: none;
          }
          .it-video-hero__bottomfade { height: 120px; }
        }
      `}</style>

      <video
        className="it-video-hero__video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      <div className="it-video-hero__overlay" aria-hidden />
      <div className="it-video-hero__vignette" aria-hidden />
      <div className="it-video-hero__bottomfade" aria-hidden />

      <div className="it-video-hero__content">
        <span className="it-video-hero__tag">About Indian Treks</span>
        <h2
          className={`it-video-hero__title ${fade ? 'is-in' : 'is-out'}`}
          aria-live="polite"
        >
          {HEADLINES[index]}
        </h2>
        <p className="it-video-hero__lead">
          We strive to make travel more accessible, enjoyable, and transformative for every adventurer
          — with expert guidance, comfortable arrangements, and immersive Himalayan experiences.
        </p>
        <div className="it-video-hero__line" aria-hidden />
        <div className="it-video-hero__mini">
          <span>Adventure</span>
          <span>Sustainability</span>
          <span>Himalayan Spirit</span>
        </div>
      </div>

      <div className="it-video-hero__scroll" aria-hidden>
        <span />
      </div>
    </section>
  );
}
