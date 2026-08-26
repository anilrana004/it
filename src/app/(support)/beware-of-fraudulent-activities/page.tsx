import type { Metadata } from 'next';
import FraudAlertPageView from '@/components/support/FraudAlertPageView';

export const metadata: Metadata = {
  title: 'Beware of Fraudulent Activities | Recognize and Prevent Scams',
  description:
    'Stay safe from fake Indian Treks websites, unofficial payment links, and scam commission programmes. Learn how to verify official channels before you pay.',
};

export default function BewareOfFraudulentActivitiesPage() {
  return <FraudAlertPageView />;
}
