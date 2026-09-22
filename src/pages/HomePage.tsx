import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Star, ShieldCheck, Scissors, Truck, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';

export const HomePage: React.FC = () => {
  const { products, blogs } = useApp();

  const ladiesProducts = products.filter((p) => p.gender === 'Ladies').slice(0, 4);
  const gentsProducts = products.filter((p) => p.gender === 'Gents').slice(0, 4);
  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 4);
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);
  const recentBlogs = blogs.filter((b) => b.isPublished).slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-[#0B3B2C] text-[#FAF7F2] py-16 sm:py-24 border-b-4 border-[#C29B38]">
        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FAF7F2_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF7F2]/10 border border-[#C29B38]/40 text-[#E5C365] text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ladies & Gents Unstitched Fabrics</span>
              </div>

              <div className="space-y-2">
                <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-tight">
                  MEERAB CLOTH HOUSE
                </h1>
                <p className="font-urdu text-2xl sm:text-3xl text-[#E5C365] font-semibold leading-relaxed">
                  میرب کلاتھ ہاؤس
                </p>
              </div>

              <p className="text-base sm:text-lg text-[#FAF7F2]/85 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                Discover the pure texture of Pakistani unstitched fabrics. From seasonal lawn, cotton, and linen to executive wash & wear and authentic royal Boski for custom tailoring.
              </p>

              {/* Proprietor attribution without fake claims */}
              <div className="pt-1 text-xs text-[#FAF7F2]/70">
                <span>Proprietor: </span>
                <span className="font-urdu text-sm text-[#FAF7F2] font-medium">میاں ذوالفقار علی</span>
              </div>

              {/* Hero Call-to-Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  to="/ladies"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#FAF7F2] text-[#0B3B2C] hover:bg-[#E8DFD3] font-semibold text-sm transition-all shadow-md active:scale-98"
                >
                  <span>Explore Ladies Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/gents"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-transparent hover:bg-[#FAF7F2]/10 text-[#FAF7F2] border border-[#FAF7F2]/40 font-semibold text-sm transition-all"
                >
                  <span>Explore Gents Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm sm:max-w-md">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#C29B38]/50 aspect-4/5">
                  <img
                    src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80"
                    alt="Pakistani unstitched fabric collection by Meerab Cloth House"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B3B2C]/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-xs text-[#1A2421] shadow-lg flex items-center justify-between border border-[#E8DFD3]">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#801D2D]">
                        Unstitched Fabrics
                      </span>
                      <h4 className="font-cinzel text-sm font-bold text-[#0B3B2C]">
                        Lawn, Khaddar & Boski
                      </h4>
                    </div>
                    <Link
                      to="/new-arrivals"
                      className="text-xs font-semibold text-[#0B3B2C] hover:underline flex items-center gap-1"
                    >
                      View <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. FEATURED HIGHLIGHTS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#E8DFD3] flex items-center gap-3 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-[#0B3B2C]/10 text-[#0B3B2C] flex items-center justify-center shrink-0">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A2421]">Unstitched Suits</h4>
              <p className="text-xs text-gray-500">Ready for bespoke tailor cut</p>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#E8DFD3] flex items-center gap-3 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-[#801D2D]/10 text-[#801D2D] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A2421]">Genuine Textiles</h4>
              <p className="text-xs text-gray-500">Carefully sourced fabrics</p>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#E8DFD3] flex items-center gap-3 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-[#C29B38]/15 text-[#C29B38] flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A2421]">Direct Ordering</h4>
              <p className="text-xs text-gray-500">Website & WhatsApp</p>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#E8DFD3] flex items-center gap-3 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A2421]">03476430299</h4>
              <p className="text-xs text-gray-500">WhatsApp assistance</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. NEW ARRIVALS */}
      {newArrivals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#801D2D] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                Fresh Arrivals
              </div>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#0B3B2C]">
                New Arrivals
              </h2>
            </div>
            <Link
              to="/new-arrivals"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0B3B2C] hover:text-[#801D2D] transition-colors"
            >
              <span>View All New Arrivals</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* 4. LADIES COLLECTION HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#801D2D] block mb-1">
              Women's Unstitched Fabrics
            </span>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#0B3B2C]">
              Ladies Collection
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Lawn, Cotton, Linen, Khaddar, Karandi, Embroidered, Printed, 2-Piece & 3-Piece
            </p>
          </div>
          <Link
            to="/ladies"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0B3B2C] hover:text-[#801D2D] transition-colors"
          >
            <span>Explore All Ladies ({products.filter((p) => p.gender === 'Ladies').length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ladiesProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. GENTS COLLECTION HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#801D2D] block mb-1">
              Men's Unstitched Fabrics
            </span>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#0B3B2C]">
              Gents Collection
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Wash & Wear, Cotton, Khaddar, Linen, Boski, Shalwar Qameez Fabric & Premium Suiting
            </p>
          </div>
          <Link
            to="/gents"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0B3B2C] hover:text-[#801D2D] transition-colors"
          >
            <span>Explore All Gents ({products.filter((p) => p.gender === 'Gents').length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gentsProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. FEATURED PRODUCTS */}
      {featuredProducts.length > 0 && (
        <section className="bg-white py-14 border-y border-[#E8DFD3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C29B38] block mb-2">
                Handpicked Fabrics
              </span>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#0B3B2C]">
                Featured Products
              </h2>
              <div className="w-12 h-0.5 bg-[#C29B38] mx-auto mt-3" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. WHY CHOOSE MEERAB CLOTH HOUSE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] border border-[#E8DFD3] rounded-2xl p-6 sm:p-10 md:p-12 relative overflow-hidden">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#801D2D] block mb-2">
              Our Commitment
            </span>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#0B3B2C] mb-4">
              Why Choose Meerab Cloth House
            </h2>
            <p className="font-urdu text-lg text-[#0B3B2C] mb-4 font-semibold">
              میرب کلاتھ ہاؤس - بہترین معیار، شفاف لین دین اور دیدہ زیب ان سلا کپڑا
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6 font-light">
              We specialize strictly in ladies and gents unstitched suits and fabrics. We believe in providing clear fabric information, accurate product codes, reliable order tracking, and personal WhatsApp support for every customer.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#E8DFD3]">
              <div>
                <h4 className="text-sm font-bold text-[#0B3B2C] mb-1">Tailoring Versatility</h4>
                <p className="text-xs text-gray-600">Standard cut fabric pieces allow complete customization for your preferred fitting.</p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0B3B2C] mb-1">Direct Internal Ordering</h4>
                <p className="text-xs text-gray-600">Place orders cleanly on our website with unique tracking numbers and instant WhatsApp confirmation.</p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0B3B2C] mb-1">Proprietor Care</h4>
                <p className="text-xs text-gray-600">Managed with personal oversight by Mian Zulfiqar Ali to ensure textile satisfaction.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PAKISTANI FASHION & TRADITIONAL FABRIC SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0B3B2C] text-[#FAF7F2] rounded-2xl p-6 sm:p-10 overflow-hidden relative">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E5C365]">
              Heritage Textiles
            </span>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#FAF7F2]">
              The Timeless Charm of Pakistani Unstitched Suits
            </h2>
            <p className="font-urdu text-xl text-[#E5C365] font-medium">
              روایتی نفاست اور جدید تقاضوں سے ہم آہنگ ملبوسات
            </p>
            <p className="text-sm text-[#FAF7F2]/80 leading-relaxed font-light">
              In Pakistan, unstitched fabric is more than material—it is an art form. From the airy comfort of lawn in sweltering summers to the heavy elegance of pure Boski and hand-loomed Khaddar during festive occasions, unstitched cloth offers unmatched individuality for both ladies and gents.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="bg-[#FAF7F2]/10 px-3 py-1 rounded-full border border-[#FAF7F2]/20">Pure Lawn</span>
              <span className="bg-[#FAF7F2]/10 px-3 py-1 rounded-full border border-[#FAF7F2]/20">Royal Boski</span>
              <span className="bg-[#FAF7F2]/10 px-3 py-1 rounded-full border border-[#FAF7F2]/20">Wash & Wear</span>
              <span className="bg-[#FAF7F2]/10 px-3 py-1 rounded-full border border-[#FAF7F2]/20">Kamalia Khaddar</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="aspect-4/3 rounded-xl overflow-hidden border border-[#C29B38]/40 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80"
                alt="Pakistani traditional unstitched suit fabric"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 9. LATEST BLOG POSTS */}
      {recentBlogs.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#801D2D] block mb-1">
                Fabric Knowledge & Guides
              </span>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#0B3B2C]">
                Latest from Our Blog
              </h2>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0B3B2C] hover:text-[#801D2D] transition-colors"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentBlogs.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl overflow-hidden border border-[#E8DFD3] hover:shadow-md transition-shadow flex flex-col"
              >
                <Link to={`/blog/${post.slug}`} className="aspect-16/10 block overflow-hidden bg-gray-100">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                      <span className="font-semibold text-[#801D2D] uppercase tracking-wider">{post.category}</span>
                      <span>{post.publishDate}</span>
                    </div>
                    <Link to={`/blog/${post.slug}`}>
                      <h3 className="font-bold text-base text-[#1A2421] hover:text-[#0B3B2C] transition-colors line-clamp-2 mb-2">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                      {post.shortDescription}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-gray-100">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-xs font-bold text-[#0B3B2C] hover:text-[#801D2D] inline-flex items-center gap-1"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* 10. WHATSAPP CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0B3B2C] via-[#0E4B37] to-[#0B3B2C] text-white rounded-2xl p-8 sm:p-10 shadow-lg border border-[#C29B38]/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E5C365]">
              Direct Inquiries & Custom Cuts
            </span>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold">
              Have Questions About Any Fabric or Product Code?
            </h3>
            <p className="text-xs sm:text-sm text-gray-200 max-w-xl">
              Connect directly with Meerab Cloth House via WhatsApp at 03476430299. We are happy to help with yardage, color matching, and order details.
            </p>
          </div>

          <a
            href="https://wa.me/923476430299?text=Hello%20Meerab%20Cloth%20House,%20I%20have%20an%20inquiry%20regarding%20fabric%20availability."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-md transition-all active:scale-98"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>Chat on WhatsApp (0347 6430299)</span>
          </a>
        </div>
      </section>
    </div>
  );
};
