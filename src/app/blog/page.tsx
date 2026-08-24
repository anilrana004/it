import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
import SupportHubPageShell from '@/components/support/SupportHubPageShell';
import { blogDate, blogPath, blogPosts } from '@/lib/blog';

export default function BlogPage() {
  const posts = [...blogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return (
    <SupportHubPageShell>
      <div className="pb-12 lg:pb-20 bg-[#f7f7f7]">
        <section className="relative h-[30vh] min-h-[220px] overflow-hidden mb-10">
          <img
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&h=500&fit=crop"
            alt="Blog"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
            <div className="container mx-auto px-4">
              <h1 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-white mb-2">
                Our Blog
              </h1>
              <p className="text-gray-200 text-lg">Travel stories, guides, and inspiration</p>
            </div>
          </div>
        </section>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={blogPath(post.slug)}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {blogDate(post.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.read}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 leading-snug line-clamp-3 group-hover:text-[#16a34a] transition-colors">
                    {post.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </SupportHubPageShell>
  );
}
