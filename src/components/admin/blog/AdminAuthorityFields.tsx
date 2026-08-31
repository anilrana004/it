'use client';

import { Plus, Trash2 } from 'lucide-react';
import type { EditorFormState } from '@/lib/admin/blog-api';

const SOURCE_TYPES = [
  { value: 'official_government', label: 'Official / Government' },
  { value: 'tourism_board', label: 'Tourism board' },
  { value: 'forest_department', label: 'Forest department' },
  { value: 'academic', label: 'Academic' },
  { value: 'weather', label: 'Weather source' },
  { value: 'first_hand_internal', label: 'First-hand (internal)' },
  { value: 'other', label: 'Other' },
] as const;

type Props = {
  form: EditorFormState;
  onChange: (form: EditorFormState) => void;
  reviewerOptions: { id: string; name: string }[];
};

export default function AdminAuthorityFields({ form, onChange, reviewerOptions }: Props) {
  const set = <K extends keyof EditorFormState>(key: K, value: EditorFormState[K]) => {
    onChange({ ...form, [key]: value });
  };

  const inputClass =
    'w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#16a34a]';

  return (
    <div className="space-y-6 border-t border-gray-100 pt-6">
      <h4 className="font-bold text-gray-900">Content authority &amp; freshness</h4>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <label className="block text-sm">
          <span className="font-medium text-gray-700">Health status</span>
          <select
            className={`${inputClass} mt-1`}
            value={form.healthStatus}
            onChange={(e) => set('healthStatus', e.target.value as EditorFormState['healthStatus'])}
          >
            <option value="healthy">Healthy</option>
            <option value="needs_review">Needs review</option>
            <option value="outdated">Outdated</option>
          </select>
        </label>
        <label className="block text-sm">
          <span className="font-medium text-gray-700">Freshness type</span>
          <select
            className={`${inputClass} mt-1`}
            value={form.contentFreshness}
            onChange={(e) => set('contentFreshness', e.target.value)}
          >
            <option value="evergreen">Evergreen</option>
            <option value="seasonal">Seasonal</option>
            <option value="policy">Policy / regulatory</option>
          </select>
        </label>
        <label className="block text-sm">
          <span className="font-medium text-gray-700">Last fact-checked</span>
          <input
            type="date"
            className={`${inputClass} mt-1`}
            value={form.lastFactCheckedAt}
            onChange={(e) => set('lastFactCheckedAt', e.target.value)}
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-gray-700">Reviewer</span>
          <select
            className={`${inputClass} mt-1`}
            value={form.reviewerId}
            onChange={(e) => set('reviewerId', e.target.value)}
          >
            <option value="">None</option>
            {reviewerOptions.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={form.expertReviewed}
          onChange={(e) => set('expertReviewed', e.target.checked)}
        />
        Expert reviewed
      </label>

      <div className="space-y-3">
        <p className="text-sm font-semibold text-gray-800">Quick answer (AEO)</p>
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={form.quickAnswerDisplay}
            onChange={(e) => set('quickAnswerDisplay', e.target.checked)}
          />
          Show on storefront when populated
        </label>
        <textarea
          rows={3}
          className={`${inputClass} resize-none`}
          value={form.quickAnswer}
          onChange={(e) => set('quickAnswer', e.target.value)}
          placeholder="2–4 sentence direct answer…"
        />
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Key facts</span>
          <button
            type="button"
            onClick={() => set('keyFacts', [...form.keyFacts, { label: '', value: '' }])}
            className="text-xs font-semibold text-[#16a34a] inline-flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        </div>
        {form.keyFacts.map((fact, index) => (
          <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-2">
            <input
              className={inputClass}
              placeholder="Label"
              value={fact.label}
              onChange={(e) => {
                const next = [...form.keyFacts];
                next[index] = { ...fact, label: e.target.value };
                set('keyFacts', next);
              }}
            />
            <input
              className={inputClass}
              placeholder="Value"
              value={fact.value}
              onChange={(e) => {
                const next = [...form.keyFacts];
                next[index] = { ...fact, value: e.target.value };
                set('keyFacts', next);
              }}
            />
            <button
              type="button"
              className="p-2 text-gray-400 hover:text-red-500"
              onClick={() => set('keyFacts', form.keyFacts.filter((_, i) => i !== index))}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-800">Sources</span>
          <button
            type="button"
            onClick={() =>
              set('sources', [
                ...form.sources,
                {
                  sourceTitle: '',
                  sourceUrl: '',
                  sourceType: 'official_government',
                  claim: '',
                  verifiedAt: '',
                },
              ])
            }
            className="text-xs font-semibold text-[#16a34a] inline-flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add source
          </button>
        </div>
        {form.sources.map((source, index) => (
          <div key={index} className="rounded-xl border border-gray-100 p-3 space-y-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              <input
                className={inputClass}
                placeholder="Source title"
                value={source.sourceTitle}
                onChange={(e) => {
                  const next = [...form.sources];
                  next[index] = { ...source, sourceTitle: e.target.value };
                  set('sources', next);
                }}
              />
              <select
                className={inputClass}
                value={source.sourceType}
                onChange={(e) => {
                  const next = [...form.sources];
                  next[index] = { ...source, sourceType: e.target.value as typeof source.sourceType };
                  set('sources', next);
                }}
              >
                {SOURCE_TYPES.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <input
                className={inputClass}
                placeholder="URL"
                value={source.sourceUrl}
                onChange={(e) => {
                  const next = [...form.sources];
                  next[index] = { ...source, sourceUrl: e.target.value };
                  set('sources', next);
                }}
              />
              <input
                type="date"
                className={inputClass}
                value={source.verifiedAt}
                onChange={(e) => {
                  const next = [...form.sources];
                  next[index] = { ...source, verifiedAt: e.target.value };
                  set('sources', next);
                }}
              />
            </div>
            <input
              className={inputClass}
              placeholder="Claim this source supports"
              value={source.claim}
              onChange={(e) => {
                const next = [...form.sources];
                next[index] = { ...source, claim: e.target.value };
                set('sources', next);
              }}
            />
            <button
              type="button"
              className="text-xs text-red-500 font-semibold"
              onClick={() => set('sources', form.sources.filter((_, i) => i !== index))}
            >
              Remove source
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-800">FAQs</span>
          <button
            type="button"
            onClick={() => set('faqs', [...form.faqs, { question: '', answer: '' }])}
            className="text-xs font-semibold text-[#16a34a] inline-flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add FAQ
          </button>
        </div>
        {form.faqs.map((faq, index) => (
          <div key={index} className="rounded-xl border border-gray-100 p-3 space-y-2">
            <input
              className={inputClass}
              placeholder="Question"
              value={faq.question}
              onChange={(e) => {
                const next = [...form.faqs];
                next[index] = { ...faq, question: e.target.value };
                set('faqs', next);
              }}
            />
            <textarea
              rows={2}
              className={`${inputClass} resize-none`}
              placeholder="Answer"
              value={faq.answer}
              onChange={(e) => {
                const next = [...form.faqs];
                next[index] = { ...faq, answer: e.target.value };
                set('faqs', next);
              }}
            />
            <button
              type="button"
              className="text-xs text-red-500 font-semibold"
              onClick={() => set('faqs', form.faqs.filter((_, i) => i !== index))}
            >
              Remove FAQ
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
