'use client';

import CorporatePremiumHero from '@/components/corporate/CorporatePremiumHero';
import { corporateHero, corporateHeroImage } from '@/lib/corporate/team-building-content';

type Props = {
  onPlayVideo: () => void;
};

export default function CorporateTeamBuildingHero({ onPlayVideo }: Props) {
  return (
    <CorporatePremiumHero
      image={corporateHeroImage}
      hero={corporateHero}
      primaryCta="Talk to our team"
      primaryWhatsapp="Hi Indian Treks! I want to plan a corporate team-building trek."
      onPlayVideo={onPlayVideo}
      secondaryCta="Play video"
      panelLabel="Corporate trek benefits"
    />
  );
}
