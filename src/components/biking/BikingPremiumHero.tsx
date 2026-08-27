import GroupJourneyPremiumHero, {
  bikingFeatureIcons,
} from '@/components/landing/GroupJourneyPremiumHero';
import { bikingPremiumHero } from '@/lib/biking-trips-content';
import { photos } from '@/lib/media';

export default function BikingPremiumHero() {
  return (
    <GroupJourneyPremiumHero
      image={photos.bikingHero}
      hero={bikingPremiumHero}
      imagePosition="center 40%"
      featureIcons={bikingFeatureIcons}
      featuresAriaLabel="Why ride with us"
    />
  );
}
