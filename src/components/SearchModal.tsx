import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Tag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Product } from '../types';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGender, setSelectedGender] = useState<string>('All');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchTerm('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filtered = products.filter((p) => {
    const matchesGender = selectedGender === 'All' || p.gender === selectedGender;
    const term = searchTerm.toLowerCase().trim();
    if (!term) return matchesGender;

    const matchesTerm =
      p.name.toLowerCase().includes(term) ||
      p.code.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term) ||
      p.fabric.toLowerCase().includes(term) ||
      p.color.toLowerCase().includes(term);

    return matchesGender && matchesTerm;
  });

  const handleSelectProduct = (product: Product) => {
    setIsSearchOpen(false);
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 md:p-20">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#E8DFD3] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#E8DFD3] flex items-center gap-3 bg-[#FAF7F2]">
          <Search className="w-5 h-5 text-[#0B3B2C]" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by fabric, product code (e.g. MCH-L-101), color, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent text-[#1A2421] placeholder-gray-400 text-sm sm:text-base outline-hidden"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 text-gray-500 hover:text-gray-800 rounded-md hover:bg-gray-200/50 text-xs font-semibold"
          >
            ESC
          </button>
        </div>

        {/* Gender Filter Pills */}
        <div className="px-4 py-2.5 bg-white border-b border-[#E8DFD3]/60 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-gray-400 font-medium mr-1">Filter:</span>
          {['All', 'Ladies', 'Gents'].map((gender) => (
            <button
              key={gender}
              onClick={() => setSelectedGender(gender)}
              className={`px-3 py-1 rounded-full font-medium transition-colors ${
                selectedGender === gender
                  ? 'bg-[#0B3B2C] text-white'
                  : 'bg-[#FAF7F2] text-gray-700 hover:bg-[#E8DFD3]'
              }`}
            >
              {gender}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-2 divide-y divide-gray-100">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <p className="text-sm">No fabrics found matching "{searchTerm}"</p>
              <p className="text-xs text-gray-400 mt-1">Try searching by code (e.g. MCH), fabric name like "Lawn", "Wash & Wear", or color.</p>
            </div>
          ) : (
            filtered.map((product) => (
              <div
                key={product.id}
                onClick={() => handleSelectProduct(product)}
                className="pt-2 first:pt-0 flex items-center justify-between p-2 rounded-lg hover:bg-[#FAF7F2] cursor-pointer group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.mainImage}
                    alt={product.name}
                    className="w-12 h-14 object-cover rounded-md border border-gray-200 bg-gray-50"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-[#801D2D] bg-[#801D2D]/10 px-1.5 py-0.5 rounded">
                        {product.code}
                      </span>
                      <span className="text-xs font-semibold text-gray-500">
                        {product.gender} • {product.category}
                      </span>
                    </div>
                    <h4 className="text-sm font-medium text-gray-900 group-hover:text-[#0B3B2C] line-clamp-1">
                      {product.name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {product.fabric} - {product.color}
                    </p>
                  </div>
                </div>

                <div className="text-right flex items-center gap-3">
                  <div>
                    {product.priceType === 'Fixed Price' && product.price ? (
                      <span className="font-mono text-sm font-bold text-[#0B3B2C]">
                        PKR {product.price.toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-[#801D2D]">
                        Contact for Price
                      </span>
                    )}
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#0B3B2C] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-[#FAF7F2] border-t border-[#E8DFD3] text-right text-xs text-gray-500">
          Showing {filtered.length} products
        </div>
      </div>
    </div>
  );
};
