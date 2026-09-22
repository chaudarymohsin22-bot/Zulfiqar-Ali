import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { BlogPost } from '../../types';
import { Plus, Edit, Trash2, BookOpen, CheckCircle2, AlertCircle, Eye } from 'lucide-react';

export const AdminBlogPage: React.FC = () => {
  const { blogs, refreshBlogs } = useApp();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete the article: "${title}"?`)) return;

    setDeletingId(id);
    try {
      await api.deleteBlog(id);
      await refreshBlogs();
      setMsg(`Article "${title}" removed successfully.`);
      setTimeout(() => setMsg(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to delete article');
    } finally {
      setDeletingId(null);
    }
  };

  const handleTogglePublish = async (post: BlogPost) => {
    try {
      await api.updateBlog(post.id, { isPublished: !post.isPublished });
      await refreshBlogs();
    } catch (err: any) {
      alert(err.message || 'Failed to toggle status');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-2xl border border-[#E8DFD3] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#801D2D]">
            Fabric Articles & Content
          </span>
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#0B3B2C]">
            Blog & Guides Management ({blogs.length})
          </h2>
          <p className="text-xs text-gray-500">
            Publish educational articles on unstitched textiles, wash & wear care, lawn maintenance, and bespoke tailoring.
          </p>
        </div>

        <Link
          to="/admin/blog/new"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0B3B2C] hover:bg-[#0E4B37] text-white text-xs font-bold transition-all shadow-2xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </Link>
      </div>

      {msg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{msg}</span>
        </div>
      )}

      {/* Blogs Table */}
      <div className="bg-white rounded-2xl border border-[#E8DFD3] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F2] text-gray-600 uppercase font-semibold border-b border-[#E8DFD3]">
              <tr>
                <th className="py-3 px-4">Image</th>
                <th className="py-3 px-4">Title & Slug</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Author</th>
                <th className="py-3 px-4">Publish Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {blogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    No blog posts found. Click "Write New Article" to add one.
                  </td>
                </tr>
              ) : (
                blogs.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-14 h-10 object-cover rounded-md border border-gray-200"
                      />
                    </td>
                    <td className="py-3 px-4 max-w-xs">
                      <div className="font-bold text-gray-900 line-clamp-1">{post.title}</div>
                      <div className="font-mono text-[10px] text-gray-400">/blog/{post.slug}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-[#801D2D] bg-[#801D2D]/10 px-2 py-0.5 rounded text-[10px]">
                        {post.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{post.author}</td>
                    <td className="py-3 px-4 text-gray-500 font-mono text-[11px]">{post.publishDate}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleTogglePublish(post)}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase transition-colors ${
                          post.isPublished
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'bg-gray-100 text-gray-500 border border-gray-200'
                        }`}
                      >
                        {post.isPublished ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/blog/${post.slug}`}
                          target="_blank"
                          title="View live post"
                          className="p-1 text-gray-400 hover:text-gray-600 rounded"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/admin/blog/edit/${post.id}`}
                          title="Edit post"
                          className="p-1 text-[#0B3B2C] hover:bg-[#FAF7F2] rounded"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(post.id, post.title)}
                          disabled={deletingId === post.id}
                          title="Delete post"
                          className="p-1 text-red-500 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
