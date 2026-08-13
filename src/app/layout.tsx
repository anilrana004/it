import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import MobileBottomNav from "@/components/MobileBottomNav";

const poppins = Poppins({ subsets: ["latin"], weight: ["400","500","600","700","800"], variable: "--font-poppins" });

export const metadata: Metadata = {
  title: "Indian Treks - Himalayan Treks, Yatras & Adventure Travel",
  description: "Book Himalayan treks and sacred yatras in Uttarakhand, Himachal Pradesh, and Nepal. Trusted by 80,000+ travelers. Valley of Flowers, Kedarkantha, Hampta Pass, Everest Base Camp, Kedarnath Yatra and more.",
  keywords: "indiantreks, indian treks, himalayan treks, uttarakhand treks, himachal treks, nepal trek, valley of flowers, kedarkantha, everest base camp, annapurna base camp, kedarnath yatra, badrinath yatra, adventure travel",
};

/** Keep mobile layout at device width — no auto-zoom / reflow from overflow. */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#16a34a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} overflow-x-clip`}>
      <body className="min-h-dvh flex flex-col overflow-x-clip overscroll-x-none">
        <Header />
        <main className="flex-1 w-full min-w-0 pb-16 lg:pb-0">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <MobileBottomNav />
      </body>
    </html>
  );
}
