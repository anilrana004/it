/**
 * Kuari Pass / Curzon Trail trekking corridor.
 * Camp anchors match locations.ts. Coordinates are [longitude, latitude].
 */

export const KUARI_PASS_TREK_ANCHORS = {
  dhak: [79.5472, 30.5214] as [number, number],
  tugasi: [79.5585, 30.5055] as [number, number],
  gulling: [79.5688, 30.4925] as [number, number],
  tali: [79.5765, 30.4788] as [number, number],
  khullara: [79.5808, 30.4662] as [number, number],
  kuariPass: [79.5834208, 30.455871] as [number, number],
};

/** Day 2 — Dhak → Tugasi → Gulling Top. */
export const KUARI_PASS_DAY2_TREK_LINE: [number, number][] = [
  KUARI_PASS_TREK_ANCHORS.dhak,
  [79.55, 30.516],
  [79.554, 30.51],
  KUARI_PASS_TREK_ANCHORS.tugasi,
  [79.562, 30.5],
  [79.566, 30.496],
  KUARI_PASS_TREK_ANCHORS.gulling,
];

/** Day 3 — Gulling Top → Tali Forest Camp. */
export const KUARI_PASS_DAY3_TREK_LINE: [number, number][] = [
  KUARI_PASS_TREK_ANCHORS.gulling,
  [79.571, 30.488],
  [79.5735, 30.4835],
  KUARI_PASS_TREK_ANCHORS.tali,
];

/** Day 4 — Tali → Khullara → Kuari Pass summit (continuous corridor to the pass). */
export const KUARI_PASS_DAY4_SUMMIT_LINE: [number, number][] = [
  KUARI_PASS_TREK_ANCHORS.tali,
  [79.5785, 30.472],
  KUARI_PASS_TREK_ANCHORS.khullara,
  [79.5818, 30.462],
  [79.5826, 30.459],
  KUARI_PASS_TREK_ANCHORS.kuariPass,
];

/** Day 5 — Khullara → Tali → Gulling → Tugasi road head. */
export const KUARI_PASS_DAY5_TREK_LINE: [number, number][] = [
  KUARI_PASS_TREK_ANCHORS.khullara,
  [79.5785, 30.472],
  KUARI_PASS_TREK_ANCHORS.tali,
  [79.572, 30.486],
  KUARI_PASS_TREK_ANCHORS.gulling,
  [79.563, 30.499],
  KUARI_PASS_TREK_ANCHORS.tugasi,
];
