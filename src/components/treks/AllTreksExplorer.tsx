'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
  type FormEvent,
  type ReactNode,
} from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Filter,
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  Mountain,
  Sparkles,
} from 'lucide-react';
import TrekCuratedSection from '@/components/treks/TrekCuratedSection';
import { DESK_HEADER_H, MOBILE_HEADER_H } from '@/lib/layout';
import {
  CURATED_SECTIONS,
  DIFFICULTIES,
  DURATIONS,
  EXPERIENCES,
  INFO_BANNERS,
  MONTHS,
  REGIONS,
  SEASONS,
  resolveCuratedTreks,
  type ListingTrek,
  type SeasonId,
  type TopCategory,
} from '@/lib/treks-listing';
import type { SpecialProgramId } from '@/lib/special-programs-content';
import type { Trek } from '@/lib/data';
import { CONTACT, telUrl } from '@/lib/contact';
import './treks-explorer.css';

type Filters = {
  q: string;
  month: number | null;
  difficulty: string | null;
  experience: SpecialProgramId | null;
  season: SeasonId | null;
  duration: string | null;
  region: Trek['region'] | null;
};

function normalizeDifficulty(raw: string | null): string | null {
  if (!raw) return null;
  const q = raw.toLowerCase().replace(/[_\s]+/g, ' ').trim();
  const hit = DIFFICULTIES.find(
    (d) =>
      d.toLowerCase() === q ||
      d.toLowerCase().replace(/ to /g, '-') === q ||
      d.toLowerCase().includes(q),
  );
  return hit ?? null;
}

function parseInitial(sp: URLSearchParams): Filters {
  const monthRaw = sp.get('month');
  const monthNum = monthRaw ? Number(monthRaw) : NaN;
  let month: number | null = null;
  if (Number.isFinite(monthNum) && monthNum >= 0 && monthNum <= 11) month = monthNum;
  else if (monthRaw) {
    const idx = MONTHS.findIndex((m) => m.toLowerCase() === monthRaw.toLowerCase());
    if (idx >= 0) month = idx;
  }

  const experience = sp.get('experience') as SpecialProgramId | null;
  const season = sp.get('season') as SeasonId | null;
  const region = sp.get('region') as Trek['region'] | null;
  const duration = sp.get('duration');

  return {
    q: sp.get('q')?.trim() || '',
    month,
    difficulty: normalizeDifficulty(sp.get('difficulty')),
    experience: EXPERIENCES.some((e) => e.id === experience) ? experience : null,
    season: SEASONS.some((s) => s.id === season) ? season : null,
    duration: DURATIONS.some((d) => d.id === duration) ? duration : null,
    region: REGIONS.some((r) => r.id === region) ? region : null,
  };
}

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 py-4 first:pt-0 last:border-b-0 last:pb-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 text-left"
        aria-expanded={open}
      >
        <span className="text-[13px] font-bold tracking-tight text-gray-900">{title}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && <div className="mt-3 space-y-1.5">{children}</div>}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-lg px-2.5 py-2.5 text-left text-[12px] leading-snug transition-colors ${
        active
          ? 'bg-[#16a34a] font-semibold text-white'
          : 'bg-gray-50 text-gray-700 hover:bg-[#f0fdf4] hover:text-[#166534]'
      }`}
    >
      {children}
    </button>
  );
}

export default function AllTreksExplorer({
  treks,
  categories,
  year = 2026,
}: {
  treks: ListingTrek[];
  categories: TopCategory[];
  year?: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const [filters, setFilters] = useState<Filters>(() => parseInitial(searchParams));
  const [mobileFilters, setMobileFilters] = useState(false);
  const [searchDraft, setSearchDraft] = useState(filters.q);

  useEffect(() => {
    setFilters(parseInitial(searchParams));
    setSearchDraft(searchParams.get('q')?.trim() || '');
  }, [searchParams]);

  useEffect(() => {
    if (!mobileFilters) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileFilters]);

  const syncUrl = useCallback(
    (next: Filters) => {
      const params = new URLSearchParams();
      if (next.q) params.set('q', next.q);
      if (next.month !== null) params.set('month', String(next.month));
      if (next.difficulty) params.set('difficulty', next.difficulty);
      if (next.experience) params.set('experience', next.experience);
      if (next.season) params.set('season', next.season);
      if (next.duration) params.set('duration', next.duration);
      if (next.region) params.set('region', next.region);
      const qs = params.toString();
      startTransition(() => {
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      });
    },
    [pathname, router],
  );

  const update = useCallback(
    (patch: Partial<Filters>) => {
      setFilters((prev) => {
        const next = { ...prev, ...patch };
        syncUrl(next);
        return next;
      });
    },
    [syncUrl],
  );

  const clearAll = () => {
    const empty: Filters = {
      q: '',
      month: null,
      difficulty: null,
      experience: null,
      season: null,
      duration: null,
      region: null,
    };
    setSearchDraft('');
    setFilters(empty);
    syncUrl(empty);
    setMobileFilters(false);
  };

  /** Apply a category tile in-place (same page) and scroll to the trek list. */
  const applyCategoryHref = useCallback(
    (href: string) => {
      const qs = href.includes('?') ? href.slice(href.indexOf('?') + 1) : '';
      const next = parseInitial(new URLSearchParams(qs));
      setSearchDraft(next.q);
      setFilters(next);
      syncUrl(next);
      window.requestAnimationFrame(() => {
        document
          .getElementById('curated-treks')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        document
          .getElementById('curated-treks-desktop')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    },
    [syncUrl],
  );

  const activeCount = [
    filters.q,
    filters.month !== null,
    filters.difficulty,
    filters.experience,
    filters.season,
    filters.duration,
    filters.region,
  ].filter(Boolean).length;

  const filtered = useMemo(() => {
    let list = treks;

    if (filters.q) {
      const q = filters.q.toLowerCase();
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.subtitle.toLowerCase().includes(q) ||
          t.state.toLowerCase().includes(q) ||
          t.region.toLowerCase().includes(q),
      );
    }
    if (filters.region) list = list.filter((t) => t.region === filters.region);
    if (filters.difficulty) list = list.filter((t) => t.difficulty === filters.difficulty);
    if (filters.month !== null) {
      list = list.filter((t) => t.openMonths.includes(filters.month!));
    }
    if (filters.season) list = list.filter((t) => t.seasons.includes(filters.season!));
    if (filters.experience) {
      list = list.filter((t) => t.experiences.includes(filters.experience!));
    }
    if (filters.duration) {
      const rule = DURATIONS.find((d) => d.id === filters.duration);
      if (rule) list = list.filter((t) => rule.test(t.days));
    }

    const difficultyRank: Record<string, number> = {
      Easy: 1,
      'Easy to Moderate': 2,
      Moderate: 3,
      'Moderate-Difficult': 4,
      Difficult: 5,
    };

    return [...list].sort(
      (a, b) =>
        Number(b.rating) - Number(a.rating) ||
        (difficultyRank[a.difficulty] ?? 9) - (difficultyRank[b.difficulty] ?? 9),
    );
  }, [treks, filters]);

  const submitSearch = (e?: FormEvent) => {
    e?.preventDefault();
    update({ q: searchDraft.trim() });
  };

  const browsing = activeCount === 0;

  const curatedBlocks = useMemo(
    () =>
      CURATED_SECTIONS.map((section) => ({
        section,
        treks: resolveCuratedTreks(section, filtered, {
          limit: section.id === 'autumn' ? 10 : 8,
          month: filters.month,
        }),
      })).filter((b) => b.treks.length > 0),
    [filtered, filters.month],
  );

  const filterPanel = (
    <div>
      <div className="mb-1 flex items-center justify-between gap-2 pb-3">
        <div className="flex items-center gap-2 text-[13px] font-bold text-gray-900">
          <SlidersHorizontal className="h-4 w-4 text-[#16a34a]" />
          Filter Treks
        </div>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="text-[12px] font-semibold text-[#16a34a] hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      <FilterSection title="Treks by Month">
        <div className="grid grid-cols-2 gap-1.5">
          {MONTHS.map((m, i) => (
            <Chip
              key={m}
              active={filters.month === i}
              onClick={() => update({ month: filters.month === i ? null : i })}
            >
              {m.slice(0, 3)}
            </Chip>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Treks by Difficulty">
        {DIFFICULTIES.map((d) => (
          <Chip
            key={d}
            active={filters.difficulty === d}
            onClick={() => update({ difficulty: filters.difficulty === d ? null : d })}
          >
            {d}
          </Chip>
        ))}
      </FilterSection>

      <FilterSection title="Treks by Experience" defaultOpen={false}>
        {EXPERIENCES.map((e) => (
          <Chip
            key={e.id}
            active={filters.experience === e.id}
            onClick={() =>
              update({ experience: filters.experience === e.id ? null : e.id })
            }
          >
            {e.label}
          </Chip>
        ))}
      </FilterSection>

      <FilterSection title="Treks by Season" defaultOpen={false}>
        {SEASONS.map((s) => (
          <Chip
            key={s.id}
            active={filters.season === s.id}
            onClick={() => update({ season: filters.season === s.id ? null : s.id })}
          >
            {s.label}
          </Chip>
        ))}
      </FilterSection>

      <FilterSection title="Treks by Duration" defaultOpen={false}>
        {DURATIONS.map((d) => (
          <Chip
            key={d.id}
            active={filters.duration === d.id}
            onClick={() => update({ duration: filters.duration === d.id ? null : d.id })}
          >
            {d.label}
          </Chip>
        ))}
      </FilterSection>

      <FilterSection title="Treks by Region">
        {REGIONS.map((r) => (
          <Chip
            key={r.id}
            active={filters.region === r.id}
            onClick={() => update({ region: filters.region === r.id ? null : r.id })}
          >
            {r.label}
          </Chip>
        ))}
      </FilterSection>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f6f8f6]">
      {/* —— Mobile phone UI (Indiahikes-style) —— */}
      <div className="lg:hidden">
        {/* Compact announcement strip */}
        <div className="border-b border-[#bbf7d0] bg-[#14532d] px-4 py-2.5">
          <p className="text-[12px] leading-snug text-[#dcfce7]">
            {INFO_BANNERS[0].text}{' '}
            <Link href={INFO_BANNERS[0].href} className="font-semibold underline underline-offset-2">
              {INFO_BANNERS[0].cta}
            </Link>
          </p>
        </div>

        <section className="bg-white px-4 pb-4 pt-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#16a34a]">
            Upcoming · {year}
          </p>
          <h1 className="mt-1.5 font-[family-name:var(--font-heading)] text-[1.65rem] font-bold leading-[1.15] text-gray-900">
            Looking for a specific trek?
          </h1>
          <p className="mt-2 text-[13px] leading-relaxed text-gray-500">
            Filter by month, difficulty, season or region — or search your dream Himalayan trail.
          </p>

          <form onSubmit={submitSearch} className="mt-4 flex gap-2" role="search">
            <label className="relative min-w-0 flex-1">
              <span className="sr-only">Search treks</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                value={searchDraft}
                onChange={(e) => setSearchDraft(e.target.value)}
                placeholder="Search treks…"
                className="h-11 w-full rounded-full border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#16a34a] focus:bg-white focus:ring-2 focus:ring-[#16a34a]/20"
              />
            </label>
            <button
              type="button"
              onClick={() => setMobileFilters(true)}
              className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full bg-[#16a34a] px-3.5 text-sm font-semibold text-white"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filter
              {activeCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white/20 px-1 text-[10px]">
                  {activeCount}
                </span>
              )}
            </button>
          </form>
        </section>

        {/* Sticky quick filters — floating pill shell (same language as landing sticky nav) */}
        <div
          className="it-treks-quick"
          style={{ ['--it-mob-header' as string]: `${MOBILE_HEADER_H}px` }}
        >
          <div className="it-treks-quick__shell">
            <p className="it-treks-quick__label">Filter</p>
            <div className="it-treks-quick__track" role="tablist" aria-label="Quick trek filters">
              {[
                { label: 'All', on: browsing, go: () => clearAll() },
                { label: 'Beginner', on: filters.experience === 'beginner', go: () => update({ experience: filters.experience === 'beginner' ? null : 'beginner' }) },
                { label: 'Winter', on: filters.season === 'winter', go: () => update({ season: filters.season === 'winter' ? null : 'winter' }) },
                { label: 'Uttarakhand', on: filters.region === 'uttarakhand', go: () => update({ region: filters.region === 'uttarakhand' ? null : 'uttarakhand' }) },
                { label: 'Himachal', on: filters.region === 'himachal', go: () => update({ region: filters.region === 'himachal' ? null : 'himachal' }) },
                { label: 'Easy', on: filters.difficulty === 'Easy', go: () => update({ difficulty: filters.difficulty === 'Easy' ? null : 'Easy' }) },
                { label: 'Nepal', on: filters.region === 'nepal', go: () => update({ region: filters.region === 'nepal' ? null : 'nepal' }) },
              ].map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  role="tab"
                  aria-selected={chip.on}
                  onClick={chip.go}
                  className={`it-treks-quick__chip${chip.on ? ' is-active' : ''}`}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="px-4 pb-10 pt-5">
          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-900">Explore Our Top Categories</h2>
            <div
              className="-mx-4 mt-3 flex gap-3 overflow-x-auto px-4 pb-1 scrollbar-none snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none' }}
            >
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => applyCategoryHref(c.href)}
                  className="relative h-[168px] w-[42vw] max-w-[180px] shrink-0 snap-start overflow-hidden rounded-2xl text-left"
                >
                  <img src={c.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-2.5">
                    <div className="text-[10px] font-semibold text-[#86efac]">{c.countLabel}</div>
                    <div className="mt-0.5 text-[13px] font-bold leading-snug text-white">{c.title}</div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <div className="mb-2 rounded-2xl border border-[#bbf7d0] bg-[#f0fdf4] p-3.5">
            <p className="text-[13px] leading-relaxed text-[#14532d]">
              <span className="font-bold">Tip: </span>
              {INFO_BANNERS[1].text}{' '}
              <Link href={INFO_BANNERS[1].href} className="font-semibold underline underline-offset-2">
                {INFO_BANNERS[1].cta}
              </Link>
            </p>
          </div>

          <div id="curated-treks" className="scroll-mt-28">
            {curatedBlocks.map(({ section, treks: sectionTreks }, i) => (
              <div key={section.id}>
                <TrekCuratedSection
                  title={section.title}
                  info={section.info}
                  treks={sectionTreks}
                />
                {INFO_BANNERS[i + 1] && i % 2 === 0 && (
                  <div className="my-2 rounded-2xl bg-[#062816] p-3.5 text-[13px] leading-relaxed text-[#dcfce7]">
                    {INFO_BANNERS[(i + 2) % INFO_BANNERS.length].text}{' '}
                    <Link
                      href={INFO_BANNERS[(i + 2) % INFO_BANNERS.length].href}
                      className="font-semibold text-[#86efac] underline underline-offset-2"
                    >
                      {INFO_BANNERS[(i + 2) % INFO_BANNERS.length].cta}
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>

          {activeCount > 0 && curatedBlocks.every((b) => b.treks.length === 0) && (
            <div className="mt-4 rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-12 text-center">
              <Mountain className="mx-auto mb-2 h-9 w-9 text-gray-300" />
              <p className="text-sm font-semibold text-gray-900">No treks match</p>
              <button type="button" onClick={clearAll} className="mt-3 text-sm font-semibold text-[#16a34a]">
                Reset filters
              </button>
            </div>
          )}

          {/* Help strip */}
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-4">
            <p className="text-sm font-bold text-gray-900">Need help choosing a trek?</p>
            <p className="mt-1 text-[13px] leading-relaxed text-gray-500">
              Our trek advisors help with fitness, season, and batch dates — {CONTACT.hoursShort}.
            </p>
            <div className="mt-3 flex gap-2">
              <a
                href={telUrl()}
                className="inline-flex h-10 flex-1 items-center justify-center rounded-full bg-[#16a34a] text-sm font-semibold text-white"
              >
                Call {CONTACT.phoneDisplay}
              </a>
              <Link
                href="/contact"
                className="inline-flex h-10 flex-1 items-center justify-center rounded-full border border-gray-200 text-sm font-semibold text-gray-800"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* —— Desktop layout —— */}
      <div className="hidden lg:block">
        <section className="relative overflow-hidden bg-gradient-to-br from-[#062816] via-[#0a3d22] to-[#166534]">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 20%, #4ade80 0, transparent 40%), radial-gradient(circle at 80% 0%, #86efac 0, transparent 35%)',
            }}
          />
          <div className="container relative mx-auto pb-11 pt-0">
            <div style={{ height: DESK_HEADER_H + 28 }} aria-hidden />
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#86efac]">
              Group departures · {year}
            </p>
            <h1 className="max-w-3xl font-[family-name:var(--font-heading)] text-[2.75rem] font-bold leading-[1.15] text-white">
              Upcoming Treks in {year}
            </h1>
            <p className="mt-3.5 max-w-2xl text-[15px] leading-relaxed text-white/75">
              Browse every Himalayan trek we run — filter by month, difficulty, season, or region,
              pick an upcoming batch, and book with India&apos;s trusted trekking community of
              80,000+ travellers.
            </p>

            <form onSubmit={submitSearch} className="mt-6 flex max-w-xl gap-2" role="search">
              <label className="relative min-w-0 flex-1">
                <span className="sr-only">Looking for a specific trek?</span>
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  value={searchDraft}
                  onChange={(e) => setSearchDraft(e.target.value)}
                  placeholder="Looking for a specific trek?"
                  className="h-12 w-full rounded-xl border-0 bg-white pl-10 pr-4 text-sm text-gray-900 shadow-lg outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-[#4ade80]/45"
                />
              </label>
              <button
                type="submit"
                className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#16a34a] px-5 text-sm font-semibold text-white shadow-lg shadow-black/15 transition-colors hover:bg-[#15803d]"
              >
                <Filter className="h-4 w-4" />
                Search
              </button>
            </form>
          </div>
        </section>

        <div className="container mx-auto py-12 pb-16">
          <section className="mb-10">
            <div className="mb-5 flex items-end justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#16a34a]">
                  Explore
                </p>
                <h2 className="mt-1 text-2xl font-bold leading-tight text-gray-900">
                  Our Top Categories
                </h2>
              </div>
              <Link
                href="/special-programs"
                className="mb-0.5 text-sm font-semibold text-[#16a34a] hover:underline"
              >
                Special programs →
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3 xl:grid-cols-6">
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => applyCategoryHref(c.href)}
                  className="group relative aspect-[4/5] overflow-hidden rounded-2xl text-left"
                >
                  <img
                    src={c.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-3">
                    <div className="text-[10px] font-semibold uppercase tracking-wide text-[#86efac]">
                      {c.countLabel}
                    </div>
                    <div className="mt-0.5 text-sm font-bold leading-snug text-white">{c.title}</div>
                    <div className="mt-0.5 line-clamp-2 text-[11px] text-white/70">{c.subtitle}</div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <div className="mb-9 flex gap-3 rounded-2xl border border-[#bbf7d0] bg-[#f0fdf4] p-5 lg:items-center">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#16a34a] text-white">
              <Sparkles className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold text-[#14532d]">{INFO_BANNERS[0].text}</p>
              <Link
                href={INFO_BANNERS[0].href}
                className="mt-1 inline-block text-sm font-semibold text-[#166534] underline underline-offset-2"
              >
                {INFO_BANNERS[0].cta}
              </Link>
            </div>
          </div>

          <div className="flex gap-8">
            <aside className="w-[260px] shrink-0 self-stretch">
              <div
                className="it-treks-desk-filters"
                style={{ ['--it-desk-header' as string]: `${DESK_HEADER_H}px` }}
              >
                {filterPanel}
              </div>
            </aside>

            <div id="curated-treks-desktop" className="min-w-0 flex-1 scroll-mt-28">
              {activeCount > 0 && (
                <div className="mb-4 flex items-center justify-between gap-3">
                  <p className="text-[13px] font-semibold text-gray-800">
                    {filtered.length} match{filtered.length === 1 ? '' : 'es'} in categories below
                  </p>
                  <button
                    type="button"
                    onClick={clearAll}
                    className="text-[13px] font-semibold text-[#16a34a] hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              )}
              <div className="space-y-1">
                {curatedBlocks.map(({ section, treks: sectionTreks }) => (
                  <TrekCuratedSection
                    key={section.id}
                    title={section.title}
                    info={section.info}
                    treks={sectionTreks}
                  />
                ))}
              </div>
              {activeCount > 0 && curatedBlocks.every((b) => b.treks.length === 0) && (
                <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
                  <Mountain className="mx-auto mb-3 h-10 w-10 text-gray-300" />
                  <h3 className="text-lg font-bold text-gray-900">No treks match these filters</h3>
                  <button
                    type="button"
                    onClick={clearAll}
                    className="mt-5 inline-flex rounded-full bg-[#16a34a] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#15803d]"
                  >
                    Reset filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {mobileFilters && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileFilters(false)}
          />
          <div className="absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col rounded-t-3xl bg-white shadow-2xl">
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-gray-100 px-4">
              <span className="font-bold text-gray-900">Filter Treks</span>
              <button
                type="button"
                onClick={() => setMobileFilters(false)}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-3">{filterPanel}</div>
            <div className="safe-area-bottom shrink-0 border-t border-gray-100 p-4">
              <button
                type="button"
                onClick={() => setMobileFilters(false)}
                className="flex h-12 w-full items-center justify-center rounded-xl bg-[#16a34a] text-sm font-semibold text-white hover:bg-[#15803d]"
              >
                Show {filtered.length} treks
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
