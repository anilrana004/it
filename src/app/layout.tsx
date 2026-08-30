import type { Metadata, Viewport } from "next";
import { Nunito, Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import "./retro-buttons.css";
import "./retro-button-colors.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import MobileBottomNav from "@/components/MobileBottomNav";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
});

/** Detail pages use a Playfair/Nunito pairing for headings and body copy. */
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Indian Treks - Himalayan Treks, Yatras & Adventure Travel",
  description: "Book Himalayan treks and sacred yatras in Uttarakhand, Himachal Pradesh, and Nepal. Trusted by 80,000+ travelers. Valley of Flowers, Kedarkantha, Hampta Pass, Everest Base Camp, Kedarnath Yatra and more.",
  keywords: "indiantreks, indian treks, himalayan treks, uttarakhand treks, himachal treks, nepal trek, valley of flowers, kedarkantha, everest base camp, annapurna base camp, kedarnath yatra, badrinath yatra, adventure travel",
};

/** Readable at device width; allow pinch-zoom for accessibility. */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#16a34a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${playfair.variable} ${nunito.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className="it-body min-h-dvh overscroll-x-none">
        <Header />
        {/*
          Class it-main sets flex: 1 0 auto in globals.css.
          Do not add Tailwind flex-1 here — flex-basis:0% breaks sticky.
        */}
        <main className="it-main relative pb-16 lg:pb-0">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <MobileBottomNav />
      </body>
    </html>
  );
}
