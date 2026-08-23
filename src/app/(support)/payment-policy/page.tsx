import type { Metadata } from 'next';
import PolicyPageView from '@/components/support/PolicyPageView';
import { PAYMENT_POLICY_SECTIONS } from '@/lib/help-centre-content';

export const metadata: Metadata = {
  title: 'Payment Policy | Indian Treks',
  description:
    'How Indian Treks handles booking deposits, balance payments, accepted payment methods, invoices, and secure transactions.',
};

export default function PaymentPolicyPage() {
  return (
    <PolicyPageView
      eyebrow="Policies"
      title="Payment Policy"
      lead="Flexible payment options so you can confirm your Himalayan adventure with confidence."
      sections={PAYMENT_POLICY_SECTIONS}
      cta={{ label: 'Back to Help Centre', href: '/help-centre' }}
    />
  );
}
