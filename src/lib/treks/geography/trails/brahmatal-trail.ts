/**
 * Brahmatal trekking corridor — Days 2–4 trail geometry.
 * Anchors: OpenStreetMap village + trail ways (Bekal/Brahma Tal corridors & Jatropani ridge).
 * Coordinates are [longitude, latitude].
 */

export const BRAHMATAL_TREK_ANCHORS = {
  lohajung: [79.61906, 30.1287685] as [number, number],
  /** OSM Mundoli village — first settlement on the left after leaving Lohajung */
  mundoli: [79.6143579, 30.1313208] as [number, number],
  /** Rest clearing after Link-gaad stream bridge (~2 hrs) — views of Navali / Bagdi Bugyal */
  begum: [79.59717, 30.14515] as [number, number],
  /** Forest clearing / stream area before the final push to the lake */
  gujreni: [79.5952, 30.15497] as [number, number],
  /** Bekaltal lake / camp — OSM Brahma Tal–Lohajang trail corridor */
  bekaltal: [79.5938256, 30.1603328] as [number, number],
  /** Telindi / Tilandi top — ridge meadow with Himalayan views before the lake descent */
  tilandi: [79.5904304, 30.1715934] as [number, number],
  /** Brahmatal / Khabekhal Lake — overnight camp */
  brahmatal: [79.5880158, 30.1777927] as [number, number],
  /** First exposed ridge step on summit day */
  'chota-jhandidar': [79.5880808, 30.1845166] as [number, number],
  /** Higher ridge step before Brahmatal Top */
  'bada-jhandidar': [79.588467, 30.1912401] as [number, number],
  /** Brahmatal Top / summit ridge — north end of OSM Jatropani corridor */
  'brahmatal-summit': [79.5854623, 30.1961242] as [number, number],
  /** Descent forest camp after summit (~9,350–10,000 ft) */
  daldum: [79.6015, 30.1468] as [number, number],
};

/**
 * Day 2 — Lohajung → Mundoli → Begum → Gujreni → Bekaltal (~6 km).
 * Sampled from OSM ways 210728232 + 658586491, with village/camp anchors forced.
 */
export const BRAHMATAL_DAY2_TREK_LINE: [number, number][] = [
  BRAHMATAL_TREK_ANCHORS.lohajung,
  BRAHMATAL_TREK_ANCHORS.mundoli,
  [79.605, 30.134],
  [79.6, 30.137],
  [79.5979449, 30.1410715],
  [79.598555, 30.1425342],
  [79.5980881, 30.1439071],
  BRAHMATAL_TREK_ANCHORS.begum,
  [79.5963552, 30.1473474],
  [79.5946203, 30.1490271],
  [79.5942695, 30.1508198],
  [79.5955375, 30.1527938],
  BRAHMATAL_TREK_ANCHORS.gujreni,
  [79.595025, 30.1569282],
  [79.593483, 30.1569371],
  [79.5923686, 30.1573247],
  [79.5934436, 30.1591424],
  BRAHMATAL_TREK_ANCHORS.bekaltal,
];

/**
 * Day 3 — Bekaltal → Telindi (Tilandi) Top → Brahmatal / Khabekhal Lake (~7 km).
 * Sampled from OSM way 575275719 (Bekal Tal to Brahma Tal), oriented north from Bekaltal.
 */
export const BRAHMATAL_DAY3_TREK_LINE: [number, number][] = [
  BRAHMATAL_TREK_ANCHORS.bekaltal,
  [79.5941369, 30.1621881],
  [79.594278, 30.1638048],
  [79.5931013, 30.1666002],
  [79.5931719, 30.1680338],
  [79.5923895, 30.1686653],
  [79.5916258, 30.1695947],
  BRAHMATAL_TREK_ANCHORS.tilandi,
  [79.5902312, 30.1729964],
  [79.5888698, 30.1745573],
  [79.5888864, 30.176398],
  BRAHMATAL_TREK_ANCHORS.brahmatal,
];

/**
 * Day 4 — Brahmatal → Chota Jhandidar → Bada Jhandidar → Summit → Daldum (~12 km).
 * Ascent sampled from OSM way 575275707 (Jatropani ridge); descent corridor toward Lohajung.
 */
export const BRAHMATAL_DAY4_TREK_LINE: [number, number][] = [
  BRAHMATAL_TREK_ANCHORS.brahmatal,
  [79.5884181, 30.1782767],
  [79.5899744, 30.1793369],
  [79.590307, 30.1801855],
  [79.5891322, 30.1815859],
  [79.5881988, 30.1829168],
  BRAHMATAL_TREK_ANCHORS['chota-jhandidar'],
  [79.5881452, 30.185662],
  [79.5884456, 30.187679],
  [79.5891269, 30.1885229],
  BRAHMATAL_TREK_ANCHORS['bada-jhandidar'],
  [79.5890732, 30.1901273],
  [79.5878877, 30.1925569],
  [79.5875444, 30.1939526],
  [79.5860632, 30.1953869],
  BRAHMATAL_TREK_ANCHORS['brahmatal-summit'],
  // Forest descent toward Daldum (return corridor toward Lohajung)
  [79.5885, 30.188],
  [79.592, 30.175],
  [79.5955, 30.162],
  [79.5985, 30.152],
  BRAHMATAL_TREK_ANCHORS.daldum,
];

/**
 * Day 5 — Daldum → Mundoli corridor → Lohajung (~4 km).
 * Left-fork forest return joining the stone path into the base village.
 */
export const BRAHMATAL_DAY5_TREK_LINE: [number, number][] = [
  BRAHMATAL_TREK_ANCHORS.daldum,
  [79.605, 30.142],
  [79.6085, 30.1385],
  [79.6115, 30.135],
  BRAHMATAL_TREK_ANCHORS.mundoli,
  [79.6165, 30.1315],
  BRAHMATAL_TREK_ANCHORS.lohajung,
];
