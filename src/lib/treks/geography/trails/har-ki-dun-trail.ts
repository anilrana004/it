/**
 * Har Ki Dun geographic corridors.
 * Coordinates are [longitude, latitude].
 * Taluka / Seema / Osla / Har Ki Dun: OSM Nominatim.
 * Pauni Garaat / Kalkattiyadhar: trail-corridor between verified valley anchors (Sep 2026).
 */
export const HAR_KI_DUN_ANCHORS = {
  sankri: [78.1841131, 31.078024] as [number, number],
  taluka: [78.245793, 31.0778208] as [number, number],
  /** Riverside camp ~10 km above Taluka along Supin, before Seema */
  'pauni-garaat': [78.3055, 31.1028] as [number, number],
  seema: [78.3499378, 31.1170286] as [number, number],
  osla: [78.3427722, 31.1188962] as [number, number],
  /** Tabletop meadow camp ~9,850 ft between Osla and Har Ki Dun valley */
  kalkattiyadhar: [78.392, 31.133] as [number, number],
  'har-ki-dun': [78.4324156, 31.148132] as [number, number],
};

/** Day 2 drive — Sankri → Taluka (~12 km jeep road). */
export const HAR_KI_DUN_DAY2_DRIVE_LINE: [number, number][] = [
  HAR_KI_DUN_ANCHORS.sankri,
  [78.195, 31.076],
  [78.208, 31.0745],
  [78.22, 31.074],
  [78.232, 31.075],
  [78.24, 31.0765],
  HAR_KI_DUN_ANCHORS.taluka,
];

/** Day 2 trek — Taluka → Pauni Garaat along Tons/Supin (~10 km). */
export const HAR_KI_DUN_DAY2_TREK_LINE: [number, number][] = [
  HAR_KI_DUN_ANCHORS.taluka,
  [78.252, 31.079],
  [78.26, 31.081],
  [78.268, 31.084],
  [78.276, 31.087],
  [78.284, 31.091],
  [78.292, 31.095],
  [78.298, 31.099],
  HAR_KI_DUN_ANCHORS['pauni-garaat'],
];

/** Day 3 trek — Pauni Garaat → Seema → Osla approach → Kalkattiyadhar (~8 km). */
export const HAR_KI_DUN_DAY3_TREK_LINE: [number, number][] = [
  HAR_KI_DUN_ANCHORS['pauni-garaat'],
  [78.315, 31.106],
  [78.325, 31.11],
  [78.335, 31.114],
  HAR_KI_DUN_ANCHORS.seema,
  // Brief approach toward Osla (opposite bank / village visit), then climb
  [78.346, 31.118],
  HAR_KI_DUN_ANCHORS.osla,
  [78.35, 31.121],
  [78.358, 31.124],
  [78.368, 31.127],
  [78.378, 31.13],
  [78.385, 31.132],
  HAR_KI_DUN_ANCHORS.kalkattiyadhar,
];

/** Day 4 outbound — Kalkattiyadhar → Har Ki Dun valley (~5 km one way). */
export const HAR_KI_DUN_DAY4_OUTBOUND_LINE: [number, number][] = [
  HAR_KI_DUN_ANCHORS.kalkattiyadhar,
  [78.398, 31.135],
  [78.405, 31.138],
  [78.412, 31.141],
  [78.418, 31.143],
  [78.424, 31.145],
  [78.428, 31.147],
  HAR_KI_DUN_ANCHORS['har-ki-dun'],
];

/** Day 4 full summit day — out to Har Ki Dun and return to Kalkattiyadhar (~10 km). */
export const HAR_KI_DUN_DAY4_TREK_LINE: [number, number][] = [
  ...HAR_KI_DUN_DAY4_OUTBOUND_LINE,
  ...[...HAR_KI_DUN_DAY4_OUTBOUND_LINE].reverse().slice(1),
];

/**
 * Day 5 descent — Kalkattiyadhar → Osla → Seema → Pauni Garaat (~8 km).
 * Retraces the Day 3 corridor with Osla as the cultural stop.
 */
export const HAR_KI_DUN_DAY5_TREK_LINE: [number, number][] = [
  ...[...HAR_KI_DUN_DAY3_TREK_LINE].reverse(),
];

/** Day 6 continuity — Pauni Garaat → Taluka (reverse of Day 2 trek). */
export const HAR_KI_DUN_DAY6_TREK_LINE: [number, number][] = [
  ...[...HAR_KI_DUN_DAY2_TREK_LINE].reverse(),
];

/** Day 6 continuity — Taluka → Sankri jeep (reverse of Day 2 drive). */
export const HAR_KI_DUN_DAY6_JEEP_LINE: [number, number][] = [
  ...[...HAR_KI_DUN_DAY2_DRIVE_LINE].reverse(),
];
