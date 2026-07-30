import Link from 'next/link';
import { ArrowRight, Tag } from 'lucide-react';

interface BannerItem {
  src: string;
  href: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  discount?: string;
  desktopSrc?: string;
}

const defaultBanners: BannerItem[] = [
  { src: 'https://res.cloudinary.com/pg8uhzw0/image/upload/f_auto,q_auto,w_1200,h_500,c_fill,g_auto/v1785367489/pexels-unaizat97-8673607_anl07u.jpg', href: '/treks/valley-of-flowers', title: 'Valley of Flowers Trek', subtitle: 'UNESCO Himalayan Paradise — 6D/5N', badge: 'Best Seller', discount: '₹8,999' },
  { src: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_80,w_1200,h_500,c_fill,g_auto/', href: '/treks/kedarkantha', title: 'Kedarkantha Winter Trek', subtitle: 'India\'s #1 winter trek — 5D/4N', badge: 'Winter Special', discount: '₹6,999' },
  { src: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_80,w_1200,h_500,c_fill,g_auto/', href: '/treks/hampta-pass', title: 'Hampta Pass — Valley Crossing', subtitle: 'Lush Kullu meets barren Spiti — 5D/4N', badge: 'Adventure', discount: '₹8,499' },
  { src: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_80,w_1200,h_500,c_fill,g_auto/', href: '/treks/everest-base-camp', title: 'Everest Base Camp', subtitle: 'The trek of a lifetime — 13D/12N', badge: 'Bucket List', discount: '₹74,999' },
  { src: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_80,w_1200,h_500,c_fill,g_auto/', href: '/yatra/kedarnath-yatra', title: 'Kedarnath Yatra', subtitle: 'Sacred pilgrimage — 6D/5N', badge: 'Yatra', discount: '₹9,999' },
  { src: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_80,w_1200,h_500,c_fill,g_auto/', href: '/bucket-list-sale', title: 'Bucket List Sale — UPTO 40% OFF', subtitle: 'Limited period deals on handpicked treks', badge: 'Sale Active', discount: 'Grab Your Deal' },
];

export default function Banners({ items = defaultBanners }: { items?: BannerItem[] }) {
  return (
    <section className="py-4 lg:py-6 bg-white">
      <div className="container mx-auto">
        <div className="flex gap-3 lg:gap-4 overflow-x-auto -mx-4 px-4 lg:mx-0 lg:px-0 snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
          {items.map((b, i) => (
            <Link key={i} href={b.href}
              className="group relative shrink-0 w-[75vw] lg:w-[380px] snap-start rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {b.desktopSrc && (
                <style>{`
                  @media (min-width: 1024px) {
                    [data-banner="${i}"] {
                      background-image: url(${b.desktopSrc}) !important;
                    }
                  }
                `}</style>
              )}
              <div className="aspect-[16/9] lg:aspect-[16/7] overflow-hidden relative">
                <div data-banner={i}
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${b.src})` }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
              {b.badge && (
                <div className="absolute top-3 left-3 flex items-center gap-1 bg-[#ffaf21]/90 text-black text-[10px] lg:text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                  <Tag className="w-3 h-3" />{b.badge}
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-5">
                {b.title && <h3 className="text-white font-bold text-sm lg:text-xl drop-shadow-sm leading-tight">{b.title}</h3>}
                {b.subtitle && <p className="text-white/80 text-[10px] lg:text-sm mt-0.5 leading-relaxed">{b.subtitle}</p>}
                <div className="flex items-center gap-2 mt-1.5 lg:mt-2">
                  <span className="text-[#ffaf21] text-[11px] lg:text-xs font-semibold">{b.discount}</span>
                  <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4 text-white/60 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
