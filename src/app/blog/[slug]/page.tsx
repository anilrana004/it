import Link from 'next/link';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';

const blogPosts: Record<string, { title: string; content: string; date: string; read: string; author: string; image: string }> = {
  'first-himalayan-trek': {
    title: '5 Essential Tips for Your First Himalayan Trek',
    content: 'Embarking on your first Himalayan trek is an exhilarating experience. The towering peaks, pristine forests, and crisp mountain air create an unforgettable adventure. However, proper preparation is key to ensuring a safe and enjoyable journey.\n\n1. **Train Before You Go** - Start cardio exercises at least 4-6 weeks before your trek. Focus on building stamina through running, cycling, and stair climbing.\n\n2. **Pack Smart** - Layering is crucial in the mountains. Carry thermal wear, a fleece jacket, a waterproof outer layer, and good quality trekking shoes that are broken in.\n\n3. **Stay Hydrated** - High altitude can cause dehydration. Drink at least 3-4 liters of water daily and avoid alcohol during the trek.\n\n4. **Listen to Your Body** - Altitude sickness can affect anyone regardless of fitness. If you experience severe headache, nausea, or dizziness, inform your trek leader immediately.\n\n5. **Choose the Right Trek** - Start with an easy to moderate trek if you\'re a beginner. Treks like Triund, Kedarkantha, or Valley of Flowers are excellent choices.',
    date: '30 Jul', read: '6 min read', author: 'TrekRoot Team', image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=600&fit=crop',
  },
  'group-travel-himalayas': {
    title: 'Why Group Travel is the Best Way to Explore the Himalayas',
    content: 'Group travel in the Himalayas offers a unique blend of adventure, safety, and camaraderie that solo travel simply cannot match.\n\n**Safety in Numbers** - The Himalayas can be unpredictable. Traveling in a group ensures you have support during challenging situations, from altitude sickness to unexpected weather changes.\n\n**Cost-Effective** - Group trips are significantly more affordable than solo travel. Shared transport, accommodation, and guide costs make premium experiences accessible.\n\n**Built-in Community** - One of the greatest gifts of group travel is the people you meet. Strangers become friends, and shared challenges create bonds that last a lifetime.\n\n**Expert Guidance** - Professional trip leaders handle all logistics, navigation, and safety protocols, allowing you to fully immerse yourself in the experience.',
    date: '25 Jun', read: '5 min read', author: 'TrekRoot Team', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=600&fit=crop',
  },
  'valley-of-flowers-guide': {
    title: 'Complete Guide to Valley of Flowers Trek 2026',
    content: 'The Valley of Flowers, a UNESCO World Heritage Site, is one of India\'s most beautiful treks. Located in Uttarakhand\'s Chamoli district, this trek takes you through a vibrant valley filled with endemic alpine flowers.\n\n**Best Time to Visit** - July to September. August is peak bloom season when the valley is at its most colorful.\n\n**Difficulty Level** - Moderate. Requires basic fitness and some prior trekking experience.\n\n**Trek Duration** - 5N/6D. The trek covers approximately 38 km starting from Govindghat.\n\n**Key Highlights** - Over 500 species of alpine flowers including the rare Brahma Kamal, stunning views of snow-capped peaks, and a visit to the sacred Hemkund Sahib.\n\n**What to Pack** - Warm clothes (layers), waterproof jacket, trekking shoes, sunscreen, sunglasses, water bottle, energy bars, and personal medications.',
    date: '16 May', read: '9 min read', author: 'TrekRoot Team', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
  },
  'best-places-india-july': {
    title: 'Best Himalayan Treks to Do in July',
    content: 'July in the Indian Himalayas brings the monsoon season, transforming the landscape into a lush green paradise. Here are the best treks to do in July across Uttarakhand, Himachal Pradesh, and Nepal:\n\n**Uttarakhand** - Valley of Flowers (peak bloom Aug), Chopta Tungnath, Rishikesh river rafting, Mussoorie monsoon walks\n\n**Himachal Pradesh** - Manali, Kasol, Dharamshala, Spiti Valley (rain shadow region with clear skies)\n\n**Nepal** - Kathmandu Valley, Pokhara, Chitwan Safari (low altitude, great for monsoon)\n\nJuly is an excellent time for trekking in certain Himalayan regions. The monsoon brings out the best in nature, with blooming flowers, gushing waterfalls, and clear mountain views. The Valley of Flowers is at its peak in late July and August.',
    date: '16 Jun', read: '6 min read', author: 'TrekRoot Team', image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=600&fit=crop',
  },
};

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    return (
      <div className="pt-28 pb-20 text-center">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <Link href="/blog" className="text-[#359DFC] hover:underline">Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 lg:pt-28 pb-12 lg:pb-20">
      <article className="container mx-auto max-w-3xl px-4">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#359DFC] mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        <div className="relative rounded-2xl overflow-hidden h-48 lg:h-72 mb-6 lg:mb-8">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <div className="flex items-center gap-3 text-xs lg:text-sm text-gray-500 mb-3">
          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.read}</span>
          <span>· {post.author}</span>
        </div>

        <h1 className="font-[family-name:var(--font-heading)] text-2xl lg:text-4xl font-bold text-[#1a1a2e] mb-6 leading-tight">{post.title}</h1>

        <div className="prose prose-sm lg:prose-base max-w-none text-gray-700 leading-relaxed space-y-4">
          {post.content.split('\n\n').map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="border-t border-gray-100 mt-8 pt-6 flex items-center justify-between">
          <Link href="/blog" className="text-sm text-[#359DFC] hover:underline">&larr; More Blogs</Link>
          <Link href="/treks" className="text-sm bg-[#359DFC] text-white px-6 py-2.5 rounded-full hover:bg-[#1a7de0] transition-all">Explore Treks</Link>
        </div>
      </article>
    </div>
  );
}
