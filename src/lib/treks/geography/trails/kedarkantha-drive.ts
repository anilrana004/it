/**
 * Kedarkantha road corridor — Dehradun ↔ Sankri.
 * Core hill leg (operator standard): Naugaon → Purola → Mori → Netwar → Sankri.
 * Town anchors: OpenStreetMap Nominatim (Sep 2026). Coordinates are [longitude, latitude].
 */
export const KEDARKANTHA_DRIVE_ANCHORS = {
  dehradun: [78.0335416, 30.3125021] as [number, number],
  mussoorie: [78.0782906, 30.4569012] as [number, number],
  nainbagh: [78.0050535, 30.5704875] as [number, number],
  naugaon: [78.13339, 30.78644] as [number, number],
  purola: [78.0831875, 30.8786966] as [number, number],
  mori: [78.0462478, 31.0192118] as [number, number],
  netwar: [78.1029342, 31.0661826] as [number, number],
  sankri: [78.1841131, 31.078024] as [number, number],
};

/** Dehradun → Sankri — follows NH507 hill road via Naugaon, Purola, Mori, Netwar. */
export const KEDARKANTHA_DAY1_DRIVE_LINE: [number, number][] = [
  KEDARKANTHA_DRIVE_ANCHORS.dehradun,
  [78.048, 30.355],
  KEDARKANTHA_DRIVE_ANCHORS.mussoorie,
  [78.062, 30.495],
  [78.042, 30.535],
  KEDARKANTHA_DRIVE_ANCHORS.nainbagh,
  [78.068, 30.615],
  [78.095, 30.685],
  [78.118, 30.745],
  KEDARKANTHA_DRIVE_ANCHORS.naugaon,
  [78.128, 30.808],
  [78.118, 30.828],
  [78.108, 30.848],
  [78.098, 30.868],
  KEDARKANTHA_DRIVE_ANCHORS.purola,
  [78.077, 30.902],
  [78.068, 30.932],
  [78.058, 30.962],
  [78.052, 30.992],
  KEDARKANTHA_DRIVE_ANCHORS.mori,
  [78.062, 31.028],
  [78.078, 31.048],
  KEDARKANTHA_DRIVE_ANCHORS.netwar,
  [78.118, 31.068],
  [78.148, 31.072],
  [78.168, 31.076],
  KEDARKANTHA_DRIVE_ANCHORS.sankri,
];

export const KEDARKANTHA_DAY5_DRIVE_LINE: [number, number][] = [
  ...KEDARKANTHA_DAY1_DRIVE_LINE,
].reverse();
