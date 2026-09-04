import PolicyDocPageView from '@/components/support/PolicyDocPageView';
import {
  PAYMENT_POLICY_META,
  PAYMENT_POLICY_SECTIONS,
} from '@/lib/content/payment-policy-content';

export default function PaymentPolicyPageView() {
  return (
    <PolicyDocPageView
      meta={PAYMENT_POLICY_META}
      sections={PAYMENT_POLICY_SECTIONS}
      idPrefix="payment-section"
      mailtoSubject="Payment policy enquiry — IndianTreks"
    />
  );
}
