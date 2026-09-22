import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { Sparkles, ArrowUpDown } from 'lucide-react';

export const NewArrivalsPage: React.FC = () => {
  const { products } = useApp();
  const [genderFilter, setGenderFilter] = useState<'All' | 'Ladies' | 'Gents'>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high'>('newest');

  const newArrivals = products.filter((p) => {
    if (!p.isNewArrival) return false;
    if (genderFilter !== 'All' && p.gender !== genderFilter) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return (a.price || 0) - (b.price || 0);
    if (sortBy === 'price-high') return (b.price || 0) - (a.price || 0);
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header Banner */}
      <div className="bg-[#0B3B2C] text-white rounded-2xl p-6 sm:p-10 mb-8 border-b-4 border-[#C29B38]">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F2]/10 border border-[#C29B38]/40 text-[#E5C365] text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Season Highlights</span>
          </div>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            New Arrivals
          </h1>
          <p className="font-urdu text-xl text-[#E5C365] mb-3">
            تازہ ترین اور منفرد ان سلا فیبرک
          </p>
          <p className="text-sm text-[#FAF7F2]/80 leading-relaxed font-light">
            Browse our freshly added collection of unstitched ladies suits and gents fabrics, featuring new seasonal weaves, embroidery designs, and executive wash & wear cuts.
          </p>
        </div>
      </div>

      {/* Filter / Sort bar */}
      <div className="bg-white p-4 rounded-xl border border-[#E8DFD3] mb-8 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Gender Tabs */}
        <div className="flex items-center gap-2">
          {(['All', 'Ladies', 'Gents'] as const).map((gender) => (
            <button
              key={gender}
              onClick={() => setGenderFilter(gender)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                genderFilter === gender
                  ? 'bg-[#0B3B2C] text-white'
                  : 'bg-[#FAF7F2] text-gray-700 hover:bg-[#E8DFD3]'
              }`}
            >
              {gender} {gender === 'All' ? `(${products.filter(p => p.isNewArrival).length})` : `(${products.filter(p => p.isNewArrival && p.gender === gender).length})`}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-gray-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs font-medium text-gray-700 bg-[#FAF7F2] border border-[#E8DFD3] rounded-lg px-3 py-2 outline-hidden"
          >
            <option value="newest">Recently Added</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {newArrivals.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E8DFD3] p-12 text-center max-w-lg mx-auto">
          <p className="font-cinzel text-lg font-bold text-[#0B3B2C] mb-2">No New Arrivals Currently</p>
          <p className="text-xs text-gray-500">
            Products marked as "New Arrival" in the Admin Panel will immediately show up here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
