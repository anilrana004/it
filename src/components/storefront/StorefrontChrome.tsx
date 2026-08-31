'use client';

import '@/app/retro-buttons.css';
import '@/app/retro-button-colors.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import MobileBottomNav from '@/components/MobileBottomNav';
import JsonLd from '@/components/seo/JsonLd';
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from '@/lib/seo/json-ld';

/** Public storefront chrome — never rendered on admin routes. */
export default function StorefrontChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="it-body flex min-h-dvh flex-col">
      <JsonLd data={[buildOrganizationJsonLd(), buildWebSiteJsonLd()]} />
      <Header />
      <main className="it-main relative flex-1 pb-16 lg:pb-0">{children}</main>
      <Footer />
      <WhatsAppFloat />
      <MobileBottomNav />
    </div>
  );
}
