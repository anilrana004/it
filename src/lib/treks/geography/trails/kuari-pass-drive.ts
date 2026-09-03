/**
 * Kuari Pass road corridor — Rishikesh ↔ Joshimath ↔ Dehradun.
 * Anchors: OpenStreetMap Nominatim / authoritative camp coords.
 * Coordinates are [longitude, latitude].
 */

export const KUARI_PASS_DRIVE_ANCHORS = {
  dehradun: [78.0335416, 30.3125021] as [number, number],
  rishikesh: [78.2916193, 30.1086537] as [number, number],
  devprayag: [78.5983, 30.1464] as [number, number],
  srinagar: [78.7836, 30.2247] as [number, number],
  rudraprayag: [78.9819, 30.2844] as [number, number],
  karnaprayag: [79.2156, 30.2636] as [number, number],
  nandaprayag: [79.3256, 30.3322] as [number, number],
  vishnuprayag: [79.575, 30.5625] as [number, number],
  joshimath: [79.5612607, 30.5555752] as [number, number],
  dhak: [79.5472, 30.5214] as [number, number],
  tugasi: [79.5585, 30.5055] as [number, number],
};

/** Day 1 — Rishikesh → Joshimath via Panch Prayag (Alaknanda highway). */
export const KUARI_PASS_DAY1_DRIVE_LINE: [number, number][] = [
  KUARI_PASS_DRIVE_ANCHORS.rishikesh,
  [78.36, 30.12],
  [78.48, 30.13],
  KUARI_PASS_DRIVE_ANCHORS.devprayag,
  [78.68, 30.17],
  [78.73, 30.2],
  KUARI_PASS_DRIVE_ANCHORS.srinagar,
  [78.88, 30.255],
  KUARI_PASS_DRIVE_ANCHORS.rudraprayag,
  [79.08, 30.275],
  [79.15, 30.268],
  KUARI_PASS_DRIVE_ANCHORS.karnaprayag,
  [79.27, 30.295],
  KUARI_PASS_DRIVE_ANCHORS.nandaprayag,
  [79.42, 30.4],
  [79.5, 30.48],
  KUARI_PASS_DRIVE_ANCHORS.vishnuprayag,
  [79.568, 30.56],
  KUARI_PASS_DRIVE_ANCHORS.joshimath,
];

/** Day 2 — Joshimath → Dhak trailhead (~12 km). */
export const KUARI_PASS_DAY2_DRIVE_LINE: [number, number][] = [
  KUARI_PASS_DRIVE_ANCHORS.joshimath,
  [79.558, 30.545],
  [79.552, 30.535],
  KUARI_PASS_DRIVE_ANCHORS.dhak,
];

/** Day 5 — Tugasi road head → Joshimath (~15 km). */
export const KUARI_PASS_DAY5_DRIVE_LINE: [number, number][] = [
  KUARI_PASS_DRIVE_ANCHORS.tugasi,
  [79.555, 30.52],
  [79.55, 30.535],
  [79.556, 30.548],
  KUARI_PASS_DRIVE_ANCHORS.joshimath,
];

/** Day 6 — Joshimath → Dehradun via Rishikesh (return corridor). */
export const KUARI_PASS_DAY6_DRIVE_LINE: [number, number][] = [
  KUARI_PASS_DRIVE_ANCHORS.joshimath,
  [79.568, 30.56],
  KUARI_PASS_DRIVE_ANCHORS.vishnuprayag,
  [79.5, 30.48],
  [79.42, 30.4],
  KUARI_PASS_DRIVE_ANCHORS.nandaprayag,
  [79.27, 30.295],
  KUARI_PASS_DRIVE_ANCHORS.karnaprayag,
  [79.15, 30.268],
  [79.08, 30.275],
  KUARI_PASS_DRIVE_ANCHORS.rudraprayag,
  [78.88, 30.255],
  KUARI_PASS_DRIVE_ANCHORS.srinagar,
  [78.73, 30.2],
  [78.68, 30.17],
  KUARI_PASS_DRIVE_ANCHORS.devprayag,
  [78.48, 30.13],
  [78.36, 30.12],
  KUARI_PASS_DRIVE_ANCHORS.rishikesh,
  [78.22, 30.18],
  [78.12, 30.25],
  KUARI_PASS_DRIVE_ANCHORS.dehradun,
];
