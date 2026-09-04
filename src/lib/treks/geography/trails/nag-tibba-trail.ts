/**
 * Nag Tibba trek corridors — Pantwari ↔ base camp ↔ Nag Mandir ↔ summit.
 * Anchors: published Pantwari GPS + OSM summit; temple / ridge approach interpolated on the climb.
 * Coordinates are [longitude, latitude].
 */

export const NAG_TIBBA_TREK_ANCHORS = {
  pantwari: [78.1836, 30.4547] as [number, number],
  /** Eco-tourism Goat Village on the Pantwari–Nag Tibba approach. */
  goatVillage: [78.1685, 30.5055] as [number, number],
  /** Overnight base camp below the summit ridge (~8,200 ft). */
  baseCamp: [78.1552, 30.5558] as [number, number],
  /** Open clearings above base camp (early Day-2 walk). */
  clearings: [78.1538, 30.5625] as [number, number],
  /** Nag Mandir / temple at the foot of the summit cone. */
  temple: [78.1524, 30.5728] as [number, number],
  summit: [78.1514926, 30.5864629] as [number, number],
};

/**
 * Day 1 trek — Pantwari to Nag Tibba base camp via Goat Village (~3 km walking day).
 * Forest / ridge corridor toward the crest linking Pantwari side with Nag Tibba.
 */
export const NAG_TIBBA_DAY1_TREK_LINE: [number, number][] = [
  NAG_TIBBA_TREK_ANCHORS.pantwari,
  [78.178, 30.47],
  [78.173, 30.485],
  [78.17, 30.495],
  NAG_TIBBA_TREK_ANCHORS.goatVillage,
  [78.164, 30.52],
  [78.16, 30.535],
  [78.157, 30.545],
  NAG_TIBBA_TREK_ANCHORS.baseCamp,
];

/**
 * Day 2 trek — Base camp → clearings → Nag Mandir → summit → reverse to Pantwari (~13 km).
 * Outbound climb to the flag summit, then full descent via camp and Goat Village.
 */
export const NAG_TIBBA_DAY2_TREK_LINE: [number, number][] = [
  NAG_TIBBA_TREK_ANCHORS.baseCamp,
  NAG_TIBBA_TREK_ANCHORS.clearings,
  [78.1532, 30.568],
  NAG_TIBBA_TREK_ANCHORS.temple,
  [78.1519, 30.578],
  [78.1516, 30.582],
  NAG_TIBBA_TREK_ANCHORS.summit,
  // Descent reverse toward Pantwari
  [78.1516, 30.582],
  [78.1519, 30.578],
  NAG_TIBBA_TREK_ANCHORS.temple,
  [78.1532, 30.568],
  NAG_TIBBA_TREK_ANCHORS.clearings,
  NAG_TIBBA_TREK_ANCHORS.baseCamp,
  [78.157, 30.545],
  [78.16, 30.535],
  [78.164, 30.52],
  NAG_TIBBA_TREK_ANCHORS.goatVillage,
  [78.17, 30.495],
  [78.173, 30.485],
  [78.178, 30.47],
  NAG_TIBBA_TREK_ANCHORS.pantwari,
];

/** Day 2 — Base camp → temple → summit (outbound only; full day uses NAG_TIBBA_DAY2_TREK_LINE). */
export const NAG_TIBBA_DAY2_SUMMIT_LINE: [number, number][] = [
  NAG_TIBBA_TREK_ANCHORS.baseCamp,
  NAG_TIBBA_TREK_ANCHORS.clearings,
  NAG_TIBBA_TREK_ANCHORS.temple,
  NAG_TIBBA_TREK_ANCHORS.summit,
];
