import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowRight, BookOpen, Calendar, Tag } from 'lucide-react';

export const BlogListPage: React.FC = () => {
  const { blogs } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const publishedBlogs = blogs.filter((b) => b.isPublished);

  const categories = ['All', ...Array.from(new Set(publishedBlogs.map((b) => b.category)))];

  const filteredBlogs = selectedCategory === 'All'
    ? publishedBlogs
    : publishedBlogs.filter((b) => b.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header Banner */}
      <div className="bg-[#0B3B2C] text-white rounded-2xl p-6 sm:p-10 mb-8 border-b-4 border-[#C29B38]">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F2]/10 border border-[#C29B38]/40 text-[#E5C365] text-xs font-semibold uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Fabric Wisdom & Care</span>
          </div>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            Fabric Blog & Tailoring Guides
          </h1>
          <p className="font-urdu text-xl text-[#E5C365] mb-3">
            کپڑے کی پہچان، دیکھ بھال اور سلائی کی رہنمائی
          </p>
          <p className="text-sm text-[#FAF7F2]/80 leading-relaxed font-light">
            Comprehensive guides on unstitched textiles in Pakistan. Learn how to maintain lawn, shrinkage-proof cotton latha, care for pure Boski, and work with master tailors for a bespoke fit.
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-[#0B3B2C] text-white'
                : 'bg-white text-gray-700 hover:bg-[#E8DFD3] border border-[#E8DFD3]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      {filteredBlogs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E8DFD3] p-12 text-center text-gray-500">
          No published blog articles found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#E8DFD3] hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              <Link to={`/blog/${post.slug}`} className="aspect-16/10 block overflow-hidden bg-gray-100 relative">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#0B3B2C]/90 text-[#FAF7F2] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm shadow-xs backdrop-blur-xs">
                  {post.category}
                </span>
              </Link>

              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{post.publishDate}</span>
                  </div>

                  <Link to={`/blog/${post.slug}`}>
                    <h2 className="font-bold text-lg text-[#1A2421] group-hover:text-[#0B3B2C] transition-colors leading-snug line-clamp-2 mb-2">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                    {post.shortDescription}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-xs font-bold text-[#0B3B2C] hover:text-[#801D2D] inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <span className="text-[11px] text-gray-400">By Meerab Cloth House</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
