/**
 * Nag Tibba road corridor — Dehradun → Pantwari via Mussoorie, Kempty Falls & Nainbagh.
 * Anchors: OpenStreetMap / published Pantwari GPS (≈30.4547°N, 78.1836°E).
 * Coordinates are [longitude, latitude].
 */

export const NAG_TIBBA_DRIVE_ANCHORS = {
  dehradun: [78.0335416, 30.3125021] as [number, number],
  mussoorie: [78.0782906, 30.4569012] as [number, number],
  kempty: [78.0364, 30.4842] as [number, number],
  nainbagh: [78.0050535, 30.5704875] as [number, number],
  pantwari: [78.1836, 30.4547] as [number, number],
};

/**
 * Day 1 drive — Dehradun Railway → Pantwari.
 * Corridor: Mussoorie → Kempty Falls → Nainbagh → Nag Tibba road → Pantwari.
 */
export const NAG_TIBBA_DAY1_DRIVE_LINE: [number, number][] = [
  NAG_TIBBA_DRIVE_ANCHORS.dehradun,
  [78.048, 30.355],
  [78.062, 30.4],
  NAG_TIBBA_DRIVE_ANCHORS.mussoorie,
  [78.055, 30.47],
  NAG_TIBBA_DRIVE_ANCHORS.kempty,
  [78.02, 30.52],
  [78.01, 30.55],
  NAG_TIBBA_DRIVE_ANCHORS.nainbagh,
  [78.04, 30.545],
  [78.09, 30.52],
  [78.13, 30.49],
  [78.16, 30.47],
  NAG_TIBBA_DRIVE_ANCHORS.pantwari,
];

/** Day 2 return drive — Pantwari → Dehradun (reverse of Day 1 corridor). */
export const NAG_TIBBA_DAY2_DRIVE_LINE: [number, number][] = [
  ...NAG_TIBBA_DAY1_DRIVE_LINE.slice().reverse(),
];
