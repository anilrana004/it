import Link from 'next/link';

export default function Regions() {
  const regions = [
    { n: 'Uttarakhand', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', desc: 'Valley of Flowers, Kedarkantha, Chopta, Dayara, Rupin Pass & more', href: '/treks?region=uttarakhand', count: '13 Treks & Yatras' },
    { n: 'Himachal Pradesh', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', desc: 'Hampta Pass, Triund, Kheerganga, Beas Kund, Bhrigu Lake & more', href: '/treks?region=himachal', count: '6 Treks' },
    { n: 'Nepal', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', desc: 'Everest Base Camp, Annapurna Base Camp, Kathmandu Tour, Chitwan Safari & more', href: '/treks?region=nepal', count: '5 Treks & Tours' },
  ];

  return (
    <section className="py-10 lg:py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-[#000000] mb-2">Explore by Region</h2>
          <p className="text-gray-500 text-sm">Choose your adventure from the Himalayas</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {regions.map(r => (
            <Link key={r.n} href={r.href} className="group relative rounded-2xl overflow-hidden h-80 lg:h-96 shadow-sm border border-gray-100">
              <img src={r.img} alt={r.n} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <span className="text-xs font-bold text-[#16a34a] bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full inline-block mb-2">{r.count}</span>
                <h3 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-white">{r.n}</h3>
                <p className="text-white/70 text-sm mt-1">{r.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
