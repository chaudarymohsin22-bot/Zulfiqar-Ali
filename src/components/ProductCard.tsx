import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, ShoppingBag, Sparkles, Tag } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleOrderNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/order/${product.id}`);
  };

  const isAvailable = product.availability === 'Available';

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden border border-[#E8DFD3] hover:border-[#C29B38]/60 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      {/* Product Image Container */}
      <Link to={`/product/${product.id}`} className="relative block aspect-3/4 overflow-hidden bg-[#FAF7F2]">
        <img
          src={product.mainImage || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Badges on Top Corners */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.isNewArrival && (
            <span className="inline-flex items-center gap-1 bg-[#801D2D] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm shadow-xs">
              <Sparkles className="w-3 h-3 text-[#E5C365]" />
              New Arrival
            </span>
          )}
          {product.isFeatured && (
            <span className="inline-flex items-center gap-1 bg-[#0B3B2C] text-[#E5C365] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm shadow-xs border border-[#C29B38]/30">
              Featured
            </span>
          )}
        </div>

        {/* Availability Badge on Top Right */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <span
            className={`text-[11px] font-semibold px-2 py-0.5 rounded-full shadow-xs ${
              product.availability === 'Available'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : product.availability === 'Coming Soon'
                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            {product.availability}
          </span>
        </div>

        {/* Quick View Hover Overlay */}
        <div className="absolute inset-0 bg-[#0B3B2C]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-xs text-[#0B3B2C] text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
            <Eye className="w-3.5 h-3.5" />
            View Fabric Details
          </span>
        </div>
      </Link>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-grow justify-between bg-white">
        <div>
          {/* Metadata Row: Category & Code */}
          <div className="flex items-center justify-between text-xs text-[#6B7280] mb-1.5">
            <span className="font-medium text-[#801D2D]">{product.category} • {product.fabric}</span>
            <span className="font-mono text-[11px] bg-[#FAF7F2] px-1.5 py-0.5 rounded border border-[#E8DFD3]">
              {product.code}
            </span>
          </div>

          {/* Product Title */}
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="text-sm font-semibold text-[#1A2421] group-hover:text-[#0B3B2C] transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Color & Gender */}
          <div className="mt-1 flex items-center gap-2 text-xs text-[#6B7280]">
            <span className="inline-block w-2.5 h-2.5 rounded-full border border-gray-300 bg-[#E8DFD3]" />
            <span>{product.color}</span>
            <span>•</span>
            <span>{product.gender}</span>
          </div>
        </div>

        {/* Price & Action Buttons */}
        <div className="mt-4 pt-3 border-t border-[#FAF7F2]">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[10px] text-[#6B7280] uppercase tracking-wider block">Price</span>
              {product.priceType === 'Fixed Price' && product.price !== null ? (
                <span className="text-base font-bold text-[#0B3B2C] font-mono">
                  PKR {product.price.toLocaleString()}
                </span>
              ) : (
                <span className="text-xs font-bold text-[#801D2D] italic">
                  Contact for Price
                </span>
              )}
            </div>
            <span className="text-[11px] text-[#6B7280] font-medium">Unstitched</span>
          </div>

          {/* Button Group */}
          <div className="grid grid-cols-2 gap-2">
            <Link
              to={`/product/${product.id}`}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-semibold text-[#0B3B2C] bg-[#FAF7F2] hover:bg-[#E8DFD3] rounded-lg transition-colors border border-[#E8DFD3]"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Details</span>
            </Link>

            <button
              onClick={handleOrderNow}
              disabled={!isAvailable}
              className={`w-full inline-flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-semibold rounded-lg shadow-2xs transition-all ${
                isAvailable
                  ? 'bg-[#0B3B2C] hover:bg-[#0E4B37] text-white active:scale-98'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Order Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
