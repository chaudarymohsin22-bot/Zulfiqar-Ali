import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Calendar, Tag, User, MessageCircle } from 'lucide-react';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { blogs } = useApp();

  const post = blogs.find((b) => b.slug === slug);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="font-cinzel text-xl font-bold text-[#0B3B2C] mb-2">Article Not Found</h2>
        <p className="text-gray-500 text-xs mb-6">
          The requested fabric guide could not be located.
        </p>
        <Link to="/blog" className="text-xs font-semibold text-[#0B3B2C] hover:underline">
          Return to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Back Link */}
      <Link
        to="/blog"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#0B3B2C] mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Guides</span>
      </Link>

      {/* Meta & Title */}
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-3 text-xs">
          <span className="bg-[#801D2D]/10 text-[#801D2D] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            {post.category}
          </span>
          <div className="flex items-center gap-1.5 text-gray-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>{post.publishDate}</span>
          </div>
          <span className="text-gray-300">•</span>
          <span className="text-gray-500 font-medium">By {post.author || 'Meerab Cloth House'}</span>
        </div>

        <h1 className="font-cinzel text-2xl sm:text-4xl font-bold text-[#1A2421] leading-tight">
          {post.title}
        </h1>

        <p className="text-base text-gray-600 font-light leading-relaxed">
          {post.shortDescription}
        </p>
      </div>

      {/* Featured Banner Image */}
      <div className="aspect-16/9 rounded-2xl overflow-hidden mb-10 border border-[#E8DFD3] shadow-md bg-gray-100">
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="prose prose-emerald max-w-none text-[#2D3748] leading-relaxed space-y-6 text-sm sm:text-base font-light">
        {(post.content || post.fullContent || '').split('\n\n').map((paragraph: string, index: number) => {
          // If starts with ## it's a heading
          if (paragraph.startsWith('## ')) {
            return (
              <h2 key={index} className="font-cinzel text-xl sm:text-2xl font-bold text-[#0B3B2C] pt-4 border-b border-[#E8DFD3] pb-2">
                {paragraph.replace('## ', '')}
              </h2>
            );
          }
          if (paragraph.startsWith('# ')) {
            return (
              <h1 key={index} className="font-cinzel text-2xl sm:text-3xl font-bold text-[#0B3B2C] pt-6 pb-2">
                {paragraph.replace('# ', '')}
              </h1>
            );
          }
          // If bullet points
          if (paragraph.includes('\n- ') || paragraph.startsWith('- ')) {
            const lines = paragraph.split('\n');
            return (
              <ul key={index} className="list-disc pl-5 space-y-2">
                {lines.map((line: string, lIdx: number) => (
                  <li key={lIdx} className="text-gray-700">
                    {line.replace(/^- /, '')}
                  </li>
                ))}
              </ul>
            );
          }
          return (
            <p key={index} className="text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          );
        })}
      </div>

      {/* Need Fabric WhatsApp Banner */}
      <div className="mt-12 p-6 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD3] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-sm text-[#0B3B2C]">Interested in our unstitched collection?</h4>
          <p className="text-xs text-gray-500">Contact Meerab Cloth House directly for fabric cuts and recommendations.</p>
        </div>
        <a
          href="https://wa.me/923476430299?text=Hello%20Meerab%20Cloth%20House,%20I%20read%20your%20fabric%20guide%20and%20would%20like%20to%20inquire%20about%20unstitched%20fabrics."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold shrink-0 transition-colors"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>
    </article>
  );
};
