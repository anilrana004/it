import Link from 'next/link';

const categories = [
  { n: 'Bucket List', h: '/bucket-list-sale', img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=300&h=300&fit=crop&q=80' },
  { n: 'Long Weekend', h: '/treks?difficulty=easy', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop&q=80' },
  { n: 'International', h: '/treks?region=nepal', img: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&h=300&fit=crop&q=80' },
  { n: 'Ladakh', h: '/treks?region=ladakh', img: 'https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=300&h=300&fit=crop&q=80' },
  { n: 'Spiti', h: '/treks?region=himachal', img: 'https://images.unsplash.com/photo-1586350977770-2598f1b6b7c8?w=300&h=300&fit=crop&q=80' },
  { n: 'Treks', h: '/treks', img: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=300&h=300&fit=crop&q=80' },
  { n: 'New Launches', h: '/treks', img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=300&fit=crop&q=80' },
  { n: 'India', h: '/treks', img: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=300&h=300&fit=crop&q=80' },
  { n: 'Honeymoon', h: '/treks', img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=300&h=300&fit=crop&q=80' },
  { n: 'Zanskar', h: '/treks/bali-pass', img: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=300&h=300&fit=crop&q=80' },
  { n: 'Biking', h: '/treks', img: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=300&h=300&fit=crop&q=80' },
  { n: 'All Girls', h: '/treks', img: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=300&h=300&fit=crop&q=80' },
];

export default function Categories() {
  return (
    <section className="py-4 lg:py-8 bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 lg:gap-4">
          {categories.map(c => (
            <Link key={c.n} href={c.h}
              className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-sm hover:shadow-md transition-all">
              <img src={c.img} alt={c.n}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-2 lg:p-3">
                <span className="text-white font-bold text-[11px] lg:text-sm leading-tight block drop-shadow-sm">{c.n}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
