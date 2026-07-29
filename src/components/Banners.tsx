import Link from 'next/link';

const defaultImages = [
  { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=300&fit=crop&q=80', href: '/bucket-list-sale' },
  { src: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=300&fit=crop&q=80', href: '/treks?region=nepal' },
  { src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=300&fit=crop&q=80', href: '/treks' },
];

export default function Banners({ images = defaultImages }: { images?: { src: string; href: string }[] }) {
  return (
    <section className="py-2 lg:py-4 bg-white">
      <div className="container mx-auto">
        <div className="flex gap-3 overflow-x-auto scrollbar-none -mx-4 px-4 lg:mx-0 lg:px-0 snap-x snap-mandatory scroll-smooth">
          {images.map((img, i) => (
            <Link key={i} href={img.href} className="shrink-0 w-[85vw] lg:w-full snap-start">
              <img src={img.src} alt="" className="w-full h-32 lg:h-48 object-cover rounded-xl" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
