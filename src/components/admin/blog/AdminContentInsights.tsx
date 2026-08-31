'use client';

import type { CannibalizationHint, TopicGapHint } from '@/lib/knowledge/types';

type Props = {
  cannibalization: CannibalizationHint[];
  topicGaps: TopicGapHint[];
};

export default function AdminContentInsights({ cannibalization, topicGaps }: Props) {
  if (cannibalization.length === 0 && topicGaps.length === 0) return null;

  return (
    <div className="space-y-3">
      {cannibalization.length > 0 ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm">
          <p className="font-semibold text-amber-900">Possible cannibalization</p>
          <p className="text-xs text-amber-800 mt-1 mb-2">
            Review similar posts before publishing — no automatic merge.
          </p>
          <ul className="space-y-1 text-amber-950">
            {cannibalization.map((hint) => (
              <li key={hint.postId}>
                <strong>{hint.title}</strong>{' '}
                <span className="text-xs">
                  ({Math.round(hint.similarityScore * 100)}% — {hint.suggestion})
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {topicGaps.length > 0 ? (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm">
          <p className="font-semibold text-gray-900">Topic cluster gaps</p>
          <p className="text-xs text-gray-600 mt-1 mb-2">Suggested supporting topics for this entity.</p>
          <ul className="space-y-1">
            {topicGaps.map((gap) => (
              <li
                key={gap.topic}
                className={gap.covered ? 'text-emerald-700' : 'text-gray-600'}
              >
                {gap.covered ? '✓' : '○'} {gap.label}
                {gap.matchingPostSlug ? (
                  <span className="text-xs text-gray-500"> — {gap.matchingPostSlug}</span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
