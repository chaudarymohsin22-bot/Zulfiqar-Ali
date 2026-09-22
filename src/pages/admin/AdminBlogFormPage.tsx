import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { BlogPost } from '../../types';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';

export const AdminBlogFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { blogs, refreshBlogs } = useApp();

  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    category: 'Fabric Care',
    featuredImage: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80',
    shortDescription: '',
    fullContent: '',
    publishDate: new Date().toISOString().split('T')[0],
    isPublished: true,
    author: 'Meerab Cloth House',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit && id) {
      const found = blogs.find((b) => b.id === id);
      if (found) {
        setFormData(found);
      }
    }
  }, [id, blogs, isEdit]);

  // Auto generate slug from title if new
  const handleTitleChange = (val: string) => {
    setFormData((prev) => {
      const update: Partial<BlogPost> = { ...prev, title: val };
      if (!isEdit) {
        update.slug = val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');
      }
      return update;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.title?.trim() || !formData.slug?.trim() || !formData.fullContent?.trim()) {
      setError('Title, slug, and content are required.');
      return;
    }

    setLoading(true);
    try {
      if (isEdit && id) {
        await api.updateBlog(id, formData);
      } else {
        await api.createBlog(formData);
      }
      await refreshBlogs();
      navigate('/admin/blog');
    } catch (err: any) {
      setError(err.message || 'Failed to save blog post');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link
          to="/admin/blog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#0B3B2C]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blog Articles</span>
        </Link>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DFD3] shadow-2xs">
        <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#0B3B2C] mb-1">
          {isEdit ? 'Edit Blog Article' : 'Write New Fabric Guide'}
        </h2>
        <p className="text-xs text-gray-500 mb-6">
          Provide educational guides for unstitched fabric lovers.
        </p>

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Article Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title || ''}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD3] text-sm focus:border-[#0B3B2C] outline-hidden font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.slug || ''}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD3] text-sm font-mono focus:border-[#0B3B2C] outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Category
              </label>
              <input
                type="text"
                value={formData.category || ''}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-[#E8DFD3] text-xs outline-hidden"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Author
              </label>
              <input
                type="text"
                value={formData.author || ''}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-[#E8DFD3] text-xs outline-hidden"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Publish Date
              </label>
              <input
                type="date"
                value={formData.publishDate || ''}
                onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-[#E8DFD3] text-xs outline-hidden"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
              Featured Banner Image URL
            </label>
            <input
              type="text"
              value={formData.featuredImage || ''}
              onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-[#E8DFD3] text-xs font-mono outline-hidden"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
              Short Summary Description
            </label>
            <textarea
              rows={2}
              value={formData.shortDescription || ''}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD3] text-xs outline-hidden resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
              Article Content (Markdown supported) <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={12}
              required
              value={formData.fullContent || ''}
              onChange={(e) => setFormData({ ...formData, fullContent: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD3] text-xs font-mono outline-hidden leading-relaxed"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isPub"
              checked={Boolean(formData.isPublished)}
              onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
              className="w-4 h-4 rounded text-[#0B3B2C] focus:ring-[#0B3B2C]"
            />
            <label htmlFor="isPub" className="text-xs font-bold text-gray-700 cursor-pointer">
              Publish immediately on public blog
            </label>
          </div>

          <div className="pt-6 border-t border-gray-100 flex items-center justify-end gap-3">
            <Link
              to="/admin/blog"
              className="px-4 py-2 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-[#0B3B2C] hover:bg-[#0E4B37] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-75"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? 'Saving...' : isEdit ? 'Update Article' : 'Publish Article'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
