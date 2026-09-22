import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { Filter, ArrowUpDown, Search, RefreshCw } from 'lucide-react';

const LADIES_CATEGORIES = [
  'All',
  'Lawn',
  'Cotton',
  'Linen',
  'Khaddar',
  'Karandi',
  'Embroidered',
  'Printed',
  '2 Piece',
  '3 Piece'
];

export const LadiesPage: React.FC = () => {
  const { products, loading } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedFabric, setSelectedFabric] = useState<string>('All');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('All');
  const [filterNewArrivalOnly, setFilterNewArrivalOnly] = useState<boolean>(false);
  const [filterFeaturedOnly, setFilterFeaturedOnly] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  // Filter only Ladies products
  const ladiesProducts = useMemo(() => {
    return products.filter((p) => p.gender === 'Ladies');
  }, [products]);

  // Extract dynamic fabrics and colors present in ladies products
  const availableFabrics = useMemo(() => {
    const set = new Set<string>();
    ladiesProducts.forEach((p) => {
      if (p.fabric) set.add(p.fabric);
    });
    return ['All', ...Array.from(set)];
  }, [ladiesProducts]);

  const filteredProducts = useMemo(() => {
    return ladiesProducts
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'All') {
          const matchCat = p.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
            p.name.toLowerCase().includes(selectedCategory.toLowerCase());
          if (!matchCat) return false;
        }

        // Fabric filter
        if (selectedFabric !== 'All' && p.fabric !== selectedFabric) {
          return false;
        }

        // Availability filter
        if (selectedAvailability !== 'All' && p.availability !== selectedAvailability) {
          return false;
        }

        // New Arrival filter
        if (filterNewArrivalOnly && !p.isNewArrival) {
          return false;
        }

        // Featured filter
        if (filterFeaturedOnly && !p.isFeatured) {
          return false;
        }

        // Search Keyword
        if (searchKeyword.trim()) {
          const kw = searchKeyword.toLowerCase().trim();
          const match =
            p.name.toLowerCase().includes(kw) ||
            p.code.toLowerCase().includes(kw) ||
            p.color.toLowerCase().includes(kw) ||
            p.fabric.toLowerCase().includes(kw) ||
            p.description.toLowerCase().includes(kw);
          if (!match) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') {
          return (a.price || 0) - (b.price || 0);
        }
        if (sortBy === 'price-high') {
          return (b.price || 0) - (a.price || 0);
        }
        // Newest default
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [
    ladiesProducts,
    selectedCategory,
    selectedFabric,
    selectedAvailability,
    filterNewArrivalOnly,
    filterFeaturedOnly,
    searchKeyword,
    sortBy
  ]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedFabric('All');
    setSelectedAvailability('All');
    setFilterNewArrivalOnly(false);
    setFilterFeaturedOnly(false);
    setSearchKeyword('');
    setSortBy('newest');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Header Banner */}
      <div className="bg-[#0B3B2C] text-white rounded-2xl p-6 sm:p-10 mb-8 border-b-4 border-[#C29B38]">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E5C365] block mb-1">
            Women's Fabric Gallery
          </span>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            Ladies Unstitched Collection
          </h1>
          <p className="font-urdu text-xl text-[#E5C365] mb-3">
            خواتین کا دیدہ زیب اور نفیس ان سلا کلیکشن
          </p>
          <p className="text-sm text-[#FAF7F2]/80 leading-relaxed font-light">
            Explore authentic Pakistani ladies unstitched fabrics: pure summer lawn, handloom khaddar, karandi, delicate embroidery, and digital prints ready for custom tailoring.
          </p>
        </div>
      </div>

      {/* Category Pills Strip */}
      <div className="mb-8 overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-2 min-w-max">
          {LADIES_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#0B3B2C] text-white shadow-xs'
                  : 'bg-white text-gray-700 hover:bg-[#E8DFD3] border border-[#E8DFD3]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#E8DFD3] mb-8 shadow-2xs">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Keyword Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search ladies fabrics by name, code (e.g. MCH-L-101), color..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-[#E8DFD3] focus:border-[#0B3B2C] focus:ring-1 focus:ring-[#0B3B2C] outline-hidden"
            />
          </div>

          {/* Quick Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Fabric Selector */}
            <select
              value={selectedFabric}
              onChange={(e) => setSelectedFabric(e.target.value)}
              className="px-3 py-2 text-xs rounded-lg border border-[#E8DFD3] bg-[#FAF7F2] font-medium text-gray-700 outline-hidden"
            >
              <option value="All">All Fabrics</option>
              {availableFabrics.filter((f) => f !== 'All').map((fabric) => (
                <option key={fabric} value={fabric}>
                  {fabric}
                </option>
              ))}
            </select>

            {/* Availability */}
            <select
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              className="px-3 py-2 text-xs rounded-lg border border-[#E8DFD3] bg-[#FAF7F2] font-medium text-gray-700 outline-hidden"
            >
              <option value="All">All Availability</option>
              <option value="Available">Available Only</option>
              <option value="Coming Soon">Coming Soon</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 border border-[#E8DFD3] rounded-lg px-2.5 py-1.5 bg-[#FAF7F2]">
              <ArrowUpDown className="w-3.5 h-3.5 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs font-medium text-gray-700 outline-hidden"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* Toggles */}
            <button
              onClick={() => setFilterNewArrivalOnly(!filterNewArrivalOnly)}
              className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-colors ${
                filterNewArrivalOnly
                  ? 'bg-[#801D2D] text-white border-[#801D2D]'
                  : 'bg-[#FAF7F2] text-gray-700 border-[#E8DFD3]'
              }`}
            >
              New Arrivals
            </button>

            <button
              onClick={() => setFilterFeaturedOnly(!filterFeaturedOnly)}
              className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-colors ${
                filterFeaturedOnly
                  ? 'bg-[#0B3B2C] text-white border-[#0B3B2C]'
                  : 'bg-[#FAF7F2] text-gray-700 border-[#E8DFD3]'
              }`}
            >
              Featured
            </button>

            {/* Reset */}
            <button
              onClick={resetFilters}
              title="Reset all filters"
              className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Active Filters Display */}
        <div className="mt-3 pt-3 border-t border-[#E8DFD3]/60 flex items-center justify-between text-xs text-gray-500">
          <span>Showing {filteredProducts.length} of {ladiesProducts.length} Ladies unstitched fabrics</span>
          {(selectedCategory !== 'All' || selectedFabric !== 'All' || searchKeyword || filterNewArrivalOnly || filterFeaturedOnly) && (
            <button onClick={resetFilters} className="text-[#801D2D] hover:underline font-semibold">
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E8DFD3] p-12 text-center max-w-lg mx-auto">
          <p className="font-cinzel text-lg font-bold text-[#0B3B2C] mb-2">No Ladies Fabrics Found</p>
          <p className="text-xs text-gray-500 mb-6">
            We couldn't find any products matching your current filters or search query.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 bg-[#0B3B2C] text-white text-xs font-semibold rounded-lg hover:bg-[#0E4B37] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
