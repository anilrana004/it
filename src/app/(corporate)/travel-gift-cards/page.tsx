import type { Metadata } from 'next';
import GiftPurchasePanel from '@/components/corporate/GiftPurchasePanel';
import LearningProgramLandingView from '@/components/corporate/LearningProgramLandingView';
import { giftLanding } from '@/lib/corporate/gift-landing';

export const metadata: Metadata = {
  title: 'Travel Gift Cards | Gift a Himalayan Adventure | Indian Treks',
  description:
    'Give the gift of the mountains. Indian Treks Travel Gift Cards — personalised e-gifts redeemable on Himalayan treks and yatras, valid for one year.',
};

export default function TravelGiftCardsPage() {
  return (
    <LearningProgramLandingView
      content={giftLanding}
      beforeInquiry={<GiftPurchasePanel amounts={giftLanding.gift?.amounts} />}
    />
  );
}
