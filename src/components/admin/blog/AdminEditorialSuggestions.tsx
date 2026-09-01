'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { adminFetch } from '@/lib/admin/admin-fetch';
import { parseApiJson } from '@/lib/api/client';
import type { EditorFormState } from '@/lib/admin/blog-api';
import type { EditorialSuggestion } from '@/lib/admin/editorial-suggestions';

type Props = {
  form: EditorFormState;
  onApply: (suggestion: EditorialSuggestion) => void;
};

export default function AdminEditorialSuggestions({ form, onApply }: Props) {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<EditorialSuggestion[]>([]);
  const [disclaimer, setDisclaimer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchSuggestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminFetch('/api/admin/posts/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          excerpt: form.excerpt,
          content: form.content,
          contentType: form.contentType,
          section: form.section,
          tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
          primaryEntityType: form.primaryEntity?.entityType ?? null,
          primaryEntityId: form.primaryEntity?.entityId ?? null,
          seoTitle: form.seoTitle,
          seoDescription: form.seoDescription,
          hasQuickAnswer: Boolean(form.quickAnswer.trim() || form.keyFacts.length > 0),
          lastFactCheckedAt: form.lastFactCheckedAt || null,
          contentFreshness: form.contentFreshness,
        }),
      });
      const data = await parseApiJson<{
        suggestions?: EditorialSuggestion[];
        disclaimer?: string | null;
      }>(res);
      setSuggestions(data.suggestions ?? []);
      setDisclaimer(data.disclaimer ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load suggestions');
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-violet-200 bg-violet-50/60 p-4 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-semibold text-violet-950 inline-flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> Editorial assistant
          </p>
          <p className="text-xs text-violet-800 mt-0.5">
            Suggestions only — you approve every change before publish.
          </p>
        </div>
        <button
          type="button"
          onClick={fetchSuggestions}
          disabled={loading}
          className="text-xs font-semibold px-3 py-2 rounded-full bg-violet-700 text-white hover:bg-violet-800 disabled:opacity-50"
        >
          {loading ? 'Analyzing…' : 'Get suggestions'}
        </button>
      </div>

      {error ? <p className="text-xs text-red-600">{error}</p> : null}
      {disclaimer ? <p className="text-xs text-violet-700">{disclaimer}</p> : null}

      {suggestions.length > 0 ? (
        <ul className="space-y-2">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className="rounded-lg border border-violet-100 bg-white p-3 text-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-gray-900">{suggestion.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{suggestion.reason}</p>
                  <p className="text-gray-700 mt-1 whitespace-pre-wrap">{suggestion.value}</p>
                </div>
                {['seo', 'tag', 'aeo', 'freshness'].includes(suggestion.kind) ? (
                  <button
                    type="button"
                    onClick={() => onApply(suggestion)}
                    className="shrink-0 text-xs font-semibold text-violet-700 hover:underline"
                  >
                    Apply
                  </button>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
