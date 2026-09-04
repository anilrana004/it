import type { Metadata } from 'next';
import PaymentPolicyPageView from '@/components/support/PaymentPolicyPageView';

export const metadata: Metadata = {
  title: 'Payment Policy | IndianTreks',
  description:
    'IndianTreks payment policy — booking amounts, online payments, bank/UPI details, cancellation charges, transportation, and unforeseen-circumstances terms.',
};

export default function PaymentPolicyPage() {
  return <PaymentPolicyPageView />;
}
