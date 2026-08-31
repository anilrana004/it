'use client';

import { useEffect, useState } from 'react';

export default function BlogArticleProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const article = document.getElementById('article-body');
      if (!article) return;
      const rect = article.getBoundingClientRect();
      const start = window.scrollY + rect.top;
      const height = article.offsetHeight;
      const viewport = window.innerHeight;
      const max = Math.max(height - viewport * 0.35, 1);
      const current = Math.min(Math.max(window.scrollY - start, 0), max);
      setProgress(Math.round((current / max) * 100));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="it-blog__read-progress" aria-hidden>
      <span className="it-blog__read-progress-bar" style={{ width: `${progress}%` }} />
    </div>
  );
}
