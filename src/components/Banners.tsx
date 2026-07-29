import Link from 'next/link';
import { ArrowRight, Tag } from 'lucide-react';

interface BannerItem {
  src: string;
  href: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  discount?: string;
}

const defaultBanners: BannerItem[] = [
  { src: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_80,w_1200,h_500,c_fill,g_auto/', href: '/treks/nepal-backpacking', title: 'Bali with Gili Islands', subtitle: '7N/8D Group Tour', badge: 'UPTO ₹3,500 OFF', discount: 'Limited Period' },
  { src: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_80,w_1200,h_500,c_fill,g_auto/', href: '/treks', title: 'Thailand - Phuket Krabi', subtitle: 'Full Moon Party Edition', badge: 'UPTO ₹3,500 OFF', discount: 'Book Now' },
  { src: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_80,w_1200,h_500,c_fill,g_auto/', href: '/treks', title: 'Bucket List Sale', subtitle: 'Handpicked trips at best prices', badge: 'UPTO 40% OFF', discount: 'Sale Active' },
  { src: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_80,w_1200,h_500,c_fill,g_auto/', href: '/bucket-list-sale', title: 'Tawang Bike Expedition', subtitle: 'North East India Adventure', badge: 'Bestseller', discount: '8N/9D' },
  { src: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_80,w_1200,h_500,c_fill,g_auto/', href: '/treks', title: 'All Girls Trip', subtitle: 'Travel with your soul squad', badge: 'New', discount: 'Safe & Fun' },
  { src: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_80,w_1200,h_500,c_fill,g_auto/', href: '/treks/everest-base-camp', title: 'Everest Base Camp', subtitle: 'The trek of a lifetime', badge: 'Bucket List', discount: '13D/12N' },
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
              <div className="aspect-[16/9] lg:aspect-[16/7] overflow-hidden">
                <img src={b.src} alt={b.title || ''} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
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
