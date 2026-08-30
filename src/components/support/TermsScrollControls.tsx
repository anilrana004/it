'use client';

import { useEffect, useState } from 'react';

export default function TermsScrollControls({ sectionIds }: { sectionIds: string[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    if (!sectionIds.length) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const offset = 140;
      const checkpoint = window.scrollY + offset;
      let current = 0;

      sectionIds.forEach((id, idx) => {
        const el = document.getElementById(id);
        if (!el) return;
        if (el.getBoundingClientRect().top + window.scrollY <= checkpoint) {
          current = idx;
        }
      });

      setActiveIdx(current);
      setShowTop(window.scrollY > 480);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [sectionIds]);

  const scrollToSection = (idx: number) => {
    const id = sectionIds[idx];
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  };

  return (
    <div className="it-terms__scroll-controls" aria-label="Section navigation">
      <button
        type="button"
        className="it-terms__scroll-btn"
        onClick={() => scrollToSection(activeIdx - 1)}
        disabled={activeIdx <= 0}
        aria-label="Previous section"
      >
        <i className="fa-solid fa-chevron-up" aria-hidden />
      </button>
      <span className="it-terms__scroll-count" aria-live="polite">
        {activeIdx + 1}
        <span className="it-terms__scroll-count-sep">/</span>
        {sectionIds.length}
      </span>
      <button
        type="button"
        className="it-terms__scroll-btn"
        onClick={() => scrollToSection(activeIdx + 1)}
        disabled={activeIdx >= sectionIds.length - 1}
        aria-label="Next section"
      >
        <i className="fa-solid fa-chevron-down" aria-hidden />
      </button>
      <button
        type="button"
        className={`it-terms__scroll-btn it-terms__scroll-btn--top${showTop ? ' is-visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
      >
        <i className="fa-solid fa-arrow-up" aria-hidden />
      </button>
    </div>
  );
}
