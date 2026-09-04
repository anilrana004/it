/**
 * Pre-defined route geometry — split per itinerary day.
 * Trek geometry for Kedarkantha: see trails/kedarkantha-trail.ts (canonical source).
 */
import { KEDARKANTHA_TREK_LINE } from './trails/kedarkantha-trail';
import {
  CHOPTA_DAY2_TREK_LINE,
  CHOPTA_DAY3_TREK_LINE,
} from './trails/chopta-tungnath-trail';
import {
  KEDARKANTHA_DAY1_DRIVE_LINE,
  KEDARKANTHA_DAY5_DRIVE_LINE,
} from './trails/kedarkantha-drive';
import {
  HAR_KI_DUN_DAY2_DRIVE_LINE,
  HAR_KI_DUN_DAY2_TREK_LINE,
  HAR_KI_DUN_DAY3_TREK_LINE,
  HAR_KI_DUN_DAY4_TREK_LINE,
  HAR_KI_DUN_DAY5_TREK_LINE,
  HAR_KI_DUN_DAY6_JEEP_LINE,
  HAR_KI_DUN_DAY6_TREK_LINE,
} from './trails/har-ki-dun-trail';
import {
  KUARI_PASS_DAY1_DRIVE_LINE,
  KUARI_PASS_DAY2_DRIVE_LINE,
  KUARI_PASS_DAY5_DRIVE_LINE,
  KUARI_PASS_DAY6_DRIVE_LINE,
} from './trails/kuari-pass-drive';
import {
  KUARI_PASS_DAY2_TREK_LINE,
  KUARI_PASS_DAY3_TREK_LINE,
  KUARI_PASS_DAY4_SUMMIT_LINE,
  KUARI_PASS_DAY5_TREK_LINE,
} from './trails/kuari-pass-trail';

export const ROUTE_TRACKS: Record<
  string,
  { source: string; coordinates: [number, number][] }
> = {
  /** Full Kedarkantha trekking loop — canonical trail from trails/kedarkantha-trail.ts */
  'kedarkantha-trek-full': {
    source: 'openstreetmap-trail — Sankri–Juda Ka Talab–Base–Summit–Hargaon loop',
    coordinates: KEDARKANTHA_TREK_LINE,
  },
  /** Day 1 — Dehradun → Sankri via Naugaon → Purola → Mori → Netwar */
  'kedarkantha-day1-drive': {
    source: 'road-corridor — Naugaon → Purola → Mori → Netwar (OSM town anchors, Sep 2026)',
    coordinates: KEDARKANTHA_DAY1_DRIVE_LINE,
  },
  /** Har Ki Dun Day 1 — same Dehradun → Sankri Tons-valley corridor */
  'har-ki-dun-day1-drive': {
    source: 'road-corridor — Dehradun → Sankri via Mussoorie, Naugaon, Purola, Mori, Netwar (shared with Kedarkantha approach)',
    coordinates: KEDARKANTHA_DAY1_DRIVE_LINE,
  },
  /** Har Ki Dun Day 2 — Sankri → Taluka jeep road */
  'har-ki-dun-day2-drive': {
    source: 'road-corridor — Sankri to Taluka (~12 km, OSM anchors)',
    coordinates: HAR_KI_DUN_DAY2_DRIVE_LINE,
  },
  /** Har Ki Dun Day 2 — Taluka → Pauni Garaat along Supin */
  'har-ki-dun-day2-trek': {
    source: 'trail-corridor — Taluka to Pauni Garaat riverside camp (OSM Taluka + project itinerary)',
    coordinates: HAR_KI_DUN_DAY2_TREK_LINE,
  },
  /** Har Ki Dun Day 3 — Pauni Garaat → Seema / Osla → Kalkattiyadhar */
  'har-ki-dun-day3-trek': {
    source: 'trail-corridor — Pauni Garaat via Seema & Osla to Kalkattiyadhar (OSM Seema/Osla + project itinerary)',
    coordinates: HAR_KI_DUN_DAY3_TREK_LINE,
  },
  /** Har Ki Dun Day 4 — Kalkattiyadhar ↔ Har Ki Dun valley (out and back) */
  'har-ki-dun-day4-trek': {
    source: 'trail-corridor — Kalkattiyadhar to Har Ki Dun summit day and return (OSM Har Ki Dun)',
    coordinates: HAR_KI_DUN_DAY4_TREK_LINE,
  },
  /** Har Ki Dun Day 5 — Kalkattiyadhar → Osla → Pauni Garaat (descent) */
  'har-ki-dun-day5-trek': {
    source: 'trail-corridor — Kalkattiyadhar via Osla & Seema to Pauni Garaat (reverse of Day 3)',
    coordinates: HAR_KI_DUN_DAY5_TREK_LINE,
  },
  /** Har Ki Dun Day 6 continuity — Pauni → Taluka */
  'har-ki-dun-day6-trek': {
    source: 'trail-corridor — Pauni Garaat to Taluka (reverse of Day 2 trek)',
    coordinates: HAR_KI_DUN_DAY6_TREK_LINE,
  },
  /** Har Ki Dun Day 6 continuity — Taluka → Sankri jeep */
  'har-ki-dun-day6-jeep': {
    source: 'road-corridor — Taluka to Sankri (reverse of Day 2 drive)',
    coordinates: HAR_KI_DUN_DAY6_JEEP_LINE,
  },
  /** Har Ki Dun Day 7 — Sankri → Dehradun (reverse of Day 1 corridor) */
  'har-ki-dun-day7-drive': {
    source: 'road-corridor — Sankri to Dehradun via Netwar, Mori, Purola, Naugaon, Mussoorie (shared return with Kedarkantha)',
    coordinates: KEDARKANTHA_DAY5_DRIVE_LINE,
  },
  /** Day 2 — Sankri → Juda Ka Talab (5 km) */
  'kedarkantha-day2-trek': {
    source: 'openstreetmap-trail — Day 2 Sankri to Juda Ka Talab',
    coordinates: [
      [78.18411, 31.07802],
      [78.18385, 31.0755],
      [78.18405, 31.0728],
      [78.18425, 31.0702],
      [78.1843, 31.0675],
      [78.18428, 31.0648],
      [78.1843, 31.05249],
    ],
  },
  /** Day 3 — Juda Ka Talab → Kedarkantha Base Camp (3 km) */
  'kedarkantha-day3-trek': {
    source: 'openstreetmap-trail — Day 3 Juda Ka Talab to Base Camp',
    coordinates: [
      [78.1843, 31.05249],
      [78.1839, 31.0542],
      [78.1828, 31.0558],
      [78.1819, 31.0572],
      [78.18022, 31.05865],
    ],
  },
  /** Day 4 — Base Camp → Kedarkantha Summit (summit push) */
  'kedarkantha-day4-summit': {
    source: 'openstreetmap-trail — Day 4 Base Camp to Summit',
    coordinates: [
      [78.18022, 31.05865],
      [78.1794, 31.0575],
      [78.1782, 31.052],
      [78.1768, 31.046],
      [78.1755, 31.04],
      [78.1742, 31.034],
      [78.1728, 31.028],
      [78.17185, 31.02257],
    ],
  },
  /** Day 4 — Summit → Hargaon Thach (descent) */
  'kedarkantha-day4-descent': {
    source: 'openstreetmap-trail — Day 4 Summit to Hargaon Thach',
    coordinates: [
      [78.17185, 31.02257],
      [78.1725, 31.026],
      [78.174, 31.032],
      [78.176, 31.038],
      [78.178, 31.044],
      [78.1795, 31.05],
      [78.18007, 31.05817],
    ],
  },
  /** Day 5 — Hargaon Thach → Sankri (4.5 km trek) */
  'kedarkantha-day5-trek': {
    source: 'openstreetmap-trail — Day 5 Hargaon Thach to Sankri',
    coordinates: [
      [78.18007, 31.05817],
      [78.1815, 31.065],
      [78.183, 31.072],
      [78.18411, 31.07802],
    ],
  },
  /** Day 5 — Sankri → Dehradun via Netwar → Mori → Purola → Naugaon */
  'kedarkantha-day5-drive': {
    source: 'road-corridor — return via Netwar → Mori → Purola → Naugaon (OSM town anchors)',
    coordinates: KEDARKANTHA_DAY5_DRIVE_LINE,
  },
  /** Day 2 — Chopta → Tungnath → Chandrashila → Sari */
  'chopta-day2-trek': {
    source: 'trail-corridor — Chopta to Tungnath, Chandrashila and Sari (OSM anchors, Sep 2026)',
    coordinates: CHOPTA_DAY2_TREK_LINE,
  },
  /** Day 3 — Sari → Deoria Tal */
  'chopta-day3-trek': {
    source: 'trail-corridor — Sari to Deoria Tal (Wikipedia / Indiahikes, Sep 2026)',
    coordinates: CHOPTA_DAY3_TREK_LINE,
  },
  /** Kuari Pass — Day 1 drive Rishikesh → Joshimath */
  'kuari-pass-day1-drive': {
    source: 'road-corridor — Rishikesh → Joshimath via Panch Prayag (OSM anchors)',
    coordinates: KUARI_PASS_DAY1_DRIVE_LINE,
  },
  'kuari-pass-day2-drive': {
    source: 'road-corridor — Joshimath → Dhak trailhead',
    coordinates: KUARI_PASS_DAY2_DRIVE_LINE,
  },
  'kuari-pass-day2-trek': {
    source: 'trail-corridor — Dhak → Tugasi → Gulling Top',
    coordinates: KUARI_PASS_DAY2_TREK_LINE,
  },
  'kuari-pass-day3-trek': {
    source: 'trail-corridor — Gulling Top → Tali Forest Camp',
    coordinates: KUARI_PASS_DAY3_TREK_LINE,
  },
  'kuari-pass-day4-summit': {
    source: 'trail-corridor — Tali → Khullara → Kuari Pass summit',
    coordinates: KUARI_PASS_DAY4_SUMMIT_LINE,
  },
  'kuari-pass-day5-trek': {
    source: 'trail-corridor — Khullara → Tugasi road head',
    coordinates: KUARI_PASS_DAY5_TREK_LINE,
  },
  'kuari-pass-day5-drive': {
    source: 'road-corridor — Tugasi → Joshimath',
    coordinates: KUARI_PASS_DAY5_DRIVE_LINE,
  },
  'kuari-pass-day6-drive': {
    source: 'road-corridor — Joshimath → Dehradun via Rishikesh (OSM anchors)',
    coordinates: KUARI_PASS_DAY6_DRIVE_LINE,
  },
};
