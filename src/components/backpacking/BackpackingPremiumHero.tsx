import GroupJourneyPremiumHero from '@/components/landing/GroupJourneyPremiumHero';
import { photos } from '@/lib/media';
import { backpackingPremiumHero } from '@/lib/backpacking-trips-content';

export default function BackpackingPremiumHero() {
  return (
    <GroupJourneyPremiumHero
      image={photos.backpackingHero}
      hero={backpackingPremiumHero}
      featuresAriaLabel="Why backpack with us"
    />
  );
}
