import type { Trek } from '@/lib/data';
import {
  EXPERIENCE_CURATED_TREK_IDS,
  type SpecialProgramId,
} from '@/lib/special-programs-content';
import {
  AUTUMN_TOP_TREK_IDS,
  DECEMBER_TOP_TREK_IDS,
  DURATIONS,
  EXPERIENCES,
  MONTHS,
  REGIONS,
  SEASONS,
  getMonthView,
  resolveMonthTreks,
  type CuratedSection,
  type ListingTrek,
  type SeasonId,
} from '@/lib/treks-listing';

export type TrekListingFilters = {
  q: string;
  month: number | null;
  difficulty: string | null;
  experience: SpecialProgramId | null;
  season: SeasonId | null;
  duration: string | null;
  region: Trek['region'] | null;
};

export type FilterViewContent = {
  id: string;
  heading: string;
  sectionTitle: string;
  info: string;
  href: string;
};

export function countActiveFilters(filters: TrekListingFilters): number {
  return [
    filters.q,
    filters.month !== null,
    filters.difficulty,
    filters.experience,
    filters.season,
    filters.duration,
    filters.region,
  ].filter(Boolean).length;
}

export function buildFilterHref(filters: TrekListingFilters): string {
  const params = new URLSearchParams();
  if (filters.q) params.set('q', filters.q);
  if (filters.month !== null) params.set('month', String(filters.month));
  if (filters.difficulty) params.set('difficulty', filters.difficulty);
  if (filters.experience) params.set('experience', filters.experience);
  if (filters.season) params.set('season', filters.season);
  if (filters.duration) params.set('duration', filters.duration);
  if (filters.region) params.set('region', filters.region);
  const qs = params.toString();
  return qs ? `/treks?${qs}` : '/treks';
}

function orderByIds(ids: readonly string[], list: ListingTrek[]): ListingTrek[] {
  const map = new Map(list.map((t) => [t.id, t]));
  return ids.map((id) => map.get(id)).filter(Boolean) as ListingTrek[];
}

function experienceLabel(id: SpecialProgramId): string {
  return EXPERIENCES.find((e) => e.id === id)?.label ?? id;
}

function regionLabel(id: Trek['region']): string {
  return REGIONS.find((r) => r.id === id)?.label ?? id;
}

function durationLabel(id: string): string {
  return DURATIONS.find((d) => d.id === id)?.label ?? id;
}

function seasonLabel(id: SeasonId): string {
  return SEASONS.find((s) => s.id === id)?.label ?? id;
}

function compositeFilterParts(filters: TrekListingFilters): string[] {
  const parts: string[] = [];
  if (filters.q) parts.push(`“${filters.q}”`);
  if (filters.month !== null) parts.push(MONTHS[filters.month]);
  if (filters.difficulty) parts.push(filters.difficulty);
  if (filters.experience) parts.push(experienceLabel(filters.experience));
  if (filters.season) parts.push(seasonLabel(filters.season));
  if (filters.duration) parts.push(durationLabel(filters.duration));
  if (filters.region) parts.push(regionLabel(filters.region));
  return parts;
}

/** Heading + section copy for the active filter state. */
export function getFilterView(filters: TrekListingFilters): FilterViewContent | null {
  if (countActiveFilters(filters) === 0) return null;

  const href = buildFilterHref(filters);

  if (countActiveFilters(filters) === 1) {
    if (filters.month !== null) {
      const view = getMonthView(filters.month);
      return { id: `month-${filters.month}`, ...view, href };
    }

    if (filters.difficulty) {
      return {
        id: `difficulty-${filters.difficulty}`,
        heading: filters.difficulty,
        sectionTitle: `Best ${filters.difficulty} treks`,
        info: `Himalayan departures graded ${filters.difficulty} — matched to fitness level, trail character, and fixed batch calendar.`,
        href,
      };
    }

    if (filters.experience) {
      const label = experienceLabel(filters.experience);
      return {
        id: `experience-${filters.experience}`,
        heading: label,
        sectionTitle: `Best ${label.toLowerCase()}`,
        info: `Hand-picked routes for this experience — curated departures with the right pace, support, and trail character.`,
        href,
      };
    }

    if (filters.season) {
      const label = seasonLabel(filters.season);
      const sectionTitle =
        filters.season === 'winter'
          ? 'Best winter treks'
          : filters.season === 'autumn'
            ? 'Best treks in Autumn'
            : `Best treks in ${label}`;
      return {
        id: `season-${filters.season}`,
        heading: label,
        sectionTitle,
        info: `Open Himalayan routes for ${label.toLowerCase()} — seasons matched to weather windows, views, and trail conditions.`,
        href,
      };
    }

    if (filters.duration) {
      const label = durationLabel(filters.duration);
      return {
        id: `duration-${filters.duration}`,
        heading: label,
        sectionTitle: `Best ${label} treks`,
        info: `Fixed departures around ${label.toLowerCase()} — ideal when you want a clear time commitment without stretching your leave.`,
        href,
      };
    }

    if (filters.region) {
      const label = regionLabel(filters.region);
      return {
        id: `region-${filters.region}`,
        heading: label,
        sectionTitle: `Best treks in ${label}`,
        info: `Our top Himalayan routes in ${label} — valley trails, high passes, and regional classics with upcoming batches.`,
        href,
      };
    }

    if (filters.q) {
      return {
        id: 'search',
        heading: 'Search results',
        sectionTitle: `Treks matching “${filters.q}”`,
        info: 'Routes whose name, region, or description match your search — refine with month, difficulty, or region filters anytime.',
        href,
      };
    }
  }

  const parts = compositeFilterParts(filters);
  return {
    id: 'filtered',
    heading: parts[0] ?? 'Filtered treks',
    sectionTitle: `Best treks · ${parts.join(' · ')}`,
    info: `Showing Himalayan treks matching ${parts.join(', ')} — combined filters narrow the list to what fits your plan.`,
    href,
  };
}

/** Trek list for a filter view — curated order for single-filter picks, else the filtered set. */
export function resolveFilterTreks(
  filters: TrekListingFilters,
  filtered: ListingTrek[],
): ListingTrek[] {
  if (countActiveFilters(filters) !== 1) return filtered;

  if (filters.month !== null) return resolveMonthTreks(filters.month, filtered);

  if (filters.experience) {
    const ids = EXPERIENCE_CURATED_TREK_IDS[filters.experience];
    if (ids?.length) {
      const ordered = orderByIds(ids, filtered);
      if (ordered.length > 0) return ordered;
    }
  }

  if (filters.season === 'autumn') {
    const ordered = orderByIds(AUTUMN_TOP_TREK_IDS, filtered);
    if (ordered.length > 0) return ordered;
  }

  if (filters.season === 'winter') {
    const ordered = orderByIds(DECEMBER_TOP_TREK_IDS, filtered);
    if (ordered.length > 0) return ordered;
  }

  return filtered;
}

export function buildFilterCuratedSection(view: FilterViewContent): CuratedSection {
  return {
    id: view.id,
    title: view.sectionTitle,
    info: view.info,
    href: view.href,
  };
}
