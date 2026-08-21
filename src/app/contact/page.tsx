import type { Metadata } from 'next';
import ContactPageView from '@/components/contact/ContactPageView';

export const metadata: Metadata = {
  title: 'Contact Us | Indian Treks — Trek Booking & Travel Assistance',
  description:
    'Plan your Himalayan trek with Indian Treks. Call, WhatsApp, or send a message for personalised itineraries, dates, and booking help.',
};

/** Contact page UI mirrored from https://roopkundheaven.in/contact-us/ */
export default function ContactPage() {
  return <ContactPageView />;
}
