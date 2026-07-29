'use client';
import { useState } from 'react';
import { getBlogPosts, addBlogPost } from '@/lib/admin/store';
import { FileText, Plus, Trash2 } from 'lucide-react';

export default function AdminBlog() {
  const [posts, setPosts] = useState(getBlogPosts());
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', excerpt: '', content: '', image: '', author: 'Admin', category: 'trekking' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBlogPost({
      ...form,
      slug: form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      published: true,
    });
    setPosts([...getBlogPosts()]);
    setShowForm(false);
    setForm({ title: '', excerpt: '', content: '', image: '', author: 'Admin', category: 'trekking' });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#1a1a2e]">Blog Posts</h1>
          <p className="text-gray-500 text-sm">{posts.length} posts</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-[#359DFC] text-white text-sm font-semibold px-4 py-2.5 rounded-full hover:bg-[#1a7de0] transition-all">
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 lg:p-6 mb-6 space-y-4">
          <h3 className="font-bold text-lg">Create New Blog Post</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Title</label><input type="text" required value={form.title} onChange={e => setForm(f=>({...f,title:e.target.value}))} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#359DFC] text-sm" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label><input type="url" value={form.image} onChange={e => setForm(f=>({...f,image:e.target.value}))} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#359DFC] text-sm" /></div>
            <div className="lg:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label><textarea rows={2} value={form.excerpt} onChange={e => setForm(f=>({...f,excerpt:e.target.value}))} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#359DFC] text-sm resize-none" /></div>
            <div className="lg:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Content (Markdown)</label><textarea rows={6} required value={form.content} onChange={e => setForm(f=>({...f,content:e.target.value}))} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#359DFC] text-sm" /></div>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="bg-[#359DFC] text-white font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-[#1a7de0]">Publish</button>
            <button type="button" onClick={() => setShowForm(false)} className="border border-gray-200 text-gray-700 font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-gray-50">Cancel</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left">
                <th className="p-4 font-semibold text-gray-600">Title</th>
                <th className="p-4 font-semibold text-gray-600">Author</th>
                <th className="p-4 font-semibold text-gray-600">Category</th>
                <th className="p-4 font-semibold text-gray-600">Status</th>
                <th className="p-4 font-semibold text-gray-600">Date</th>
                <th className="p-4 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(p => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="p-4 font-medium text-gray-800 max-w-xs truncate">{p.title}</td>
                  <td className="p-4 text-gray-600">{p.author}</td>
                  <td className="p-4 text-gray-600">{p.category}</td>
                  <td className="p-4"><span className={`text-xs font-semibold px-2 py-1 rounded-full ${p.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{p.published ? 'Published' : 'Draft'}</span></td>
                  <td className="p-4 text-gray-500 text-xs">{new Date(p.createdAt).toLocaleDateString()}</td>
                  <td className="p-4"><button className="p-1.5 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button></td>
                </tr>
              ))}
              {posts.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-gray-400">No blog posts yet</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
