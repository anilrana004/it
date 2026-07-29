import Link from 'next/link';

export default function VideoGallery() {
  const videos = Array.from({length: 22}, (_, i) => ({
    thumb: `https://images.unsplash.com/photo-${['1585409677983-0f6c41ca9c3b','1486911278844-a81c5267e227','1586350977770-2598f1b6b7c8','1469474968028-56623f02e42e','1551632811-561732d1e306','1540979388789-6cee28a1cdc9','1506905925346-21bda4d32df4','1524492412937-b28074a5d7da','1454496522488-7a8e488e8606','1543429257-3eb0b65d9c10'][i % 10]}?w=420&h=280&fit=crop`,
    title: ['Valley of Flowers','Kedarkantha Summit','Hampta Pass','Kedarnath Yatra','Triund Trek','Everest Base Camp','Chopta Tungnath','Badrinath Yatra','Spiti Valley','Nepal Yatra'][i % 10],
    id: `v${i}`
  }));
  return (
    <section className="py-8 lg:py-16 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-6 lg:mb-8">
          <p className="text-[#359DFC] font-semibold text-xs lg:text-sm tracking-widest uppercase mb-1">VIDEOS</p>
          <h2 className="text-xl lg:text-3xl font-bold text-[#1a1a2e]">Memories for Life</h2>
          <p className="text-gray-500 text-xs lg:text-sm mt-1">50+ Videos from our travelers</p>
        </div>
        <div className="grid grid-cols-4 lg:grid-cols-6 gap-2 lg:gap-3">
          {videos.map(v => (
            <div key={v.id} className="group relative rounded-lg overflow-hidden cursor-pointer aspect-[3/2]">
              <img src={v.thumb} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-3.5 h-3.5 lg:w-5 lg:h-5 text-[#1a1a2e] ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-5">
          <Link href="/blog" className="text-[#359DFC] text-sm font-semibold hover:text-[#1a7de0] transition-colors">View All Videos &rarr;</Link>
        </div>
      </div>
    </section>
  );
}
