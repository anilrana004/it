'use client';

import { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';
import { entityTypeLabel } from '@/lib/knowledge/entity-labels';
import { searchEntities, type RegistryEntity } from '@/lib/admin/blog-api';
import type { EntityType } from '@/lib/knowledge/types';

type Props = {
  label: string;
  value: RegistryEntity | null;
  onChange: (entity: RegistryEntity | null) => void;
  entityType?: EntityType;
  placeholder?: string;
};

export default function EntitySelector({
  label,
  value,
  onChange,
  entityType,
  placeholder = 'Search treks, destinations, safety topics…',
}: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<RegistryEntity[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    const timer = window.setTimeout(async () => {
      setLoading(true);
      try {
        const entities = await searchEntities(query, entityType);
        setResults(entities);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => window.clearTimeout(timer);
  }, [query, entityType, open]);

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {value ? (
        <div className="flex items-center justify-between gap-2 rounded-xl border border-[#16a34a]/30 bg-green-50 px-3 py-2.5">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">{value.title}</p>
            <p className="text-xs text-gray-500">
              {entityTypeLabel(value.entityType)} · {value.entityId}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="shrink-0 p-1 text-gray-400 hover:text-red-500"
            aria-label="Remove entity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#16a34a]"
          />

          {open && (
            <div className="absolute z-20 mt-1 w-full max-h-56 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg">
              {loading ? (
                <p className="px-4 py-3 text-sm text-gray-400">Searching…</p>
              ) : results.length === 0 ? (
                <p className="px-4 py-3 text-sm text-gray-400">No entities found</p>
              ) : (
                results.map((entity) => (
                  <button
                    key={`${entity.entityType}:${entity.entityId}`}
                    type="button"
                    onClick={() => {
                      onChange(entity);
                      setQuery('');
                      setOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-gray-50 border-b border-gray-50 last:border-0"
                  >
                    <p className="text-sm font-medium text-gray-800">{entity.title}</p>
                    <p className="text-xs text-gray-500">
                      {entityTypeLabel(entity.entityType)} · {entity.entityId}
                    </p>
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
