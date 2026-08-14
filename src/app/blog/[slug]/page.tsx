import Link from 'next/link';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { blogDate, getPostBySlug } from '@/lib/blog';

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="pt-28 pb-20 text-center">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <Link href="/blog" className="text-[#16a34a] hover:underline">Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 lg:pt-28 pb-12 lg:pb-20">
      <article className="container mx-auto max-w-3xl px-4">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#16a34a] mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        <div className="relative rounded-2xl overflow-hidden h-48 lg:h-72 mb-6 lg:mb-8">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <div className="flex items-center gap-3 text-xs lg:text-sm text-gray-500 mb-3">
          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{blogDate(post.publishedAt)}</span>
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.read}</span>
          <span>· {post.author}</span>
        </div>

        <h1 className="font-[family-name:var(--font-heading)] text-2xl lg:text-4xl font-bold text-[#000000] mb-6 leading-tight">{post.title}</h1>

        <div className="prose prose-sm lg:prose-base max-w-none text-gray-700 leading-relaxed space-y-4">
          {post.content.split('\n\n').map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="border-t border-gray-100 mt-8 pt-6 flex items-center justify-between">
          <Link href="/blog" className="text-sm text-[#16a34a] hover:underline">&larr; More Blogs</Link>
          <Link href="/treks" className="text-sm bg-[#16a34a] text-white px-6 py-2.5 rounded-full hover:bg-[#15803d] transition-all">Explore Treks</Link>
        </div>
      </article>
    </div>
  );
}
