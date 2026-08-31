/** Display labels for region/destination entity IDs used in GEO linking. */
const REGION_LABELS: Record<string, string> = {
  uttarakhand: 'Uttarakhand',
  himachal: 'Himachal Pradesh',
  nepal: 'Nepal',
  kashmir: 'Kashmir',
};

export function regionLabel(regionId: string): string {
  return REGION_LABELS[regionId] ?? regionId.replace(/-/g, ' ');
}
