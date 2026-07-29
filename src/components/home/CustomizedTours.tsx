import Link from 'next/link';

const destinations = [
  { name: 'Uttarakhand', count: 18, price: 5999, img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=390&h=500&fit=crop', href: '/treks?region=uttarakhand' },
  { name: 'Himachal Pradesh', count: 16, price: 4499, img: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=390&h=500&fit=crop', href: '/treks?region=himachal' },
  { name: 'Nepal', count: 6, price: 18500, img: 'https://images.unsplash.com/photo-1543429257-3eb0b65d9c10?w=390&h=500&fit=crop', href: '/treks?region=nepal' },
  { name: 'Char Dham', count: 12, price: 34999, img: 'https://images.unsplash.com/photo-1586350977770-2598f1b6b7c8?w=390&h=500&fit=crop', href: '/yatra/char-dham' },
  { name: 'Chopta Tungnath', count: 8, price: 5999, img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=390&h=500&fit=crop', href: '/treks/chopta-tungnath' },
  { name: 'Kasol & Parvati', count: 6, price: 2999, img: 'https://images.unsplash.com/photo-1586350977770-2598f1b6b7c8?w=390&h=500&fit=crop', href: '/treks/kheerganga' },
  { name: 'Spiti Valley', count: 8, price: 9999, img: 'https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=390&h=500&fit=crop', href: '/treks?region=himachal' },
  { name: 'Everest Base Camp', count: 5, price: 74999, img: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=390&h=500&fit=crop', href: '/treks/everest-base-camp' },
];

export default function CustomizedTours() {
  return (
    <section className="py-8 lg:py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-6 lg:mb-8">
          <p className="text-[#359DFC] font-semibold text-xs lg:text-sm tracking-widest uppercase mb-1">CUSTOMISED TOURS</p>
          <h2 className="text-xl lg:text-3xl font-bold text-[#1a1a2e]">Get a Customised Tour Package</h2>
        </div>
        <div className="overflow-x-auto scrollbar-none -mx-4 px-4 lg:mx-0 lg:px-0">
          <div className="flex gap-4 pb-2 w-max lg:w-full lg:grid lg:grid-cols-4">
            {destinations.map(d => (
              <Link key={d.name} href={d.href}
                className="group relative w-[220px] lg:w-auto rounded-2xl overflow-hidden shrink-0 bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all">
                <div className="relative h-[280px] lg:h-[320px] overflow-hidden">
                  <img src={d.img} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3 bg-[#359DFC] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    {d.count}+ Packages
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-bold text-lg text-white group-hover:text-[#359DFC] transition-colors">{d.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-white/70 text-xs">Starting from</span>
                      <span className="text-white font-bold text-base">₹{d.price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
