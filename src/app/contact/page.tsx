import type { Metadata } from 'next';
import ContactPageView from '@/components/contact/ContactPageView';

export const metadata: Metadata = {
  title: 'Contact Us | Indian Treks — Treks, Yatra & B2B Partnerships',
  description:
    'Contact Indian Treks for Himalayan treks, pilgrimage journeys, customized tours, and B2B travel partnerships. Call, WhatsApp, or message the right team.',
};

/** Contact page UI mirrored from https://roopkundheaven.in/contact-us/ */
export default function ContactPage() {
  return <ContactPageView />;
}
