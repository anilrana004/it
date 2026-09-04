/**
 * Brahmatal road corridor — Rishikesh ↔ Lohajung via Devprayag, Srinagar, Rudraprayag, Karnaprayag, Tharali & Deval.
 * Anchors: OpenStreetMap / published village coordinates.
 * Coordinates are [longitude, latitude].
 */

export const BRAHMATAL_DRIVE_ANCHORS = {
  rishikesh: [78.2916193, 30.1086537] as [number, number],
  devprayag: [78.5983, 30.1464] as [number, number],
  srinagar: [78.7836, 30.2247] as [number, number],
  rudraprayag: [78.9819, 30.2844] as [number, number],
  karnaprayag: [79.2156, 30.2636] as [number, number],
  tharali: [79.538, 30.0794] as [number, number],
  deval: [79.5109, 30.1128] as [number, number],
  lohajung: [79.61906, 30.1287685] as [number, number],
};

/**
 * Day 1 — Rishikesh ISBT → Lohajung base camp.
 * Corridor: Devprayag → Srinagar → Rudraprayag → Karnaprayag → Tharali → Deval → Lohajung.
 */
export const BRAHMATAL_DAY1_DRIVE_LINE: [number, number][] = [
  BRAHMATAL_DRIVE_ANCHORS.rishikesh,
  [78.36, 30.12],
  [78.48, 30.13],
  BRAHMATAL_DRIVE_ANCHORS.devprayag,
  [78.68, 30.17],
  [78.73, 30.2],
  BRAHMATAL_DRIVE_ANCHORS.srinagar,
  [78.88, 30.255],
  BRAHMATAL_DRIVE_ANCHORS.rudraprayag,
  [79.08, 30.275],
  [79.15, 30.268],
  BRAHMATAL_DRIVE_ANCHORS.karnaprayag,
  [79.35, 30.2],
  [79.45, 30.12],
  BRAHMATAL_DRIVE_ANCHORS.tharali,
  BRAHMATAL_DRIVE_ANCHORS.deval,
  [79.56, 30.12],
  BRAHMATAL_DRIVE_ANCHORS.lohajung,
];

/** Day 6 — Lohajung → Rishikesh (reverse of Day 1 corridor). */
export const BRAHMATAL_DAY6_DRIVE_LINE: [number, number][] = [
  ...BRAHMATAL_DAY1_DRIVE_LINE.slice().reverse(),
];
