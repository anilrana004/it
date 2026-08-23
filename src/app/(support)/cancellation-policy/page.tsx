import type { Metadata } from 'next';
import PolicyPageView from '@/components/support/PolicyPageView';
import {
  CANCELLATION_POLICY_ROWS,
  CANCELLATION_POLICY_SECTIONS,
} from '@/lib/help-centre-content';

export const metadata: Metadata = {
  title: 'Cancellation & Refund Policy | Indian Treks',
  description:
    'Indian Treks cancellation and refund policy — refund windows, date transfers, no-show rules, and force-majeure handling for treks and yatras.',
};

export default function CancellationPolicyPage() {
  return (
    <PolicyPageView
      eyebrow="Policies"
      title="Cancellation & Refund Policy"
      lead="Clear refund windows and transfer rules so you know exactly what applies before you book."
      sections={CANCELLATION_POLICY_SECTIONS}
      table={{
        headers: ['Cancellation window', 'Refund / transfer'],
        rows: CANCELLATION_POLICY_ROWS,
      }}
      cta={{ label: 'View payment policy', href: '/payment-policy' }}
    />
  );
}
