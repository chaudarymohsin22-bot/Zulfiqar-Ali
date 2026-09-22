import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import {
  ShoppingBag,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Truck,
  Scissors,
  ArrowLeft,
  Share2,
  Check
} from 'lucide-react';

export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products } = useApp();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      const found = products.find((p) => p.id === id);
      if (found) {
        setProduct(found);
        setActiveImage(found.mainImage);
      }
    }
  }, [id, products]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="font-cinzel text-2xl font-bold text-[#0B3B2C] mb-4">Product Not Found</h2>
        <p className="text-gray-500 text-sm mb-6">
          The requested fabric product could not be located or may have been updated.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B3B2C] text-white text-xs font-semibold rounded-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    );
  }

  const galleryImages = [
    product.mainImage,
    ...(product.images || []).filter((img) => img !== product.mainImage)
  ].filter(Boolean);

  const handleOrderNow = () => {
    navigate(`/order/${product.id}?qty=${quantity}`);
  };

  const handleWhatsAppInquiry = () => {
    const message = `Hello Meerab Cloth House,\n\nI am interested in:\nProduct: ${product.name}\nProduct Code: ${product.code}\nQuantity: ${quantity}\n\nPlease provide more details.`;
    const url = `https://wa.me/923476430299?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isAvailable = product.availability === 'Available';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
        <Link to="/" className="hover:text-[#0B3B2C]">Home</Link>
        <span>/</span>
        <Link
          to={product.gender === 'Ladies' ? '/ladies' : '/gents'}
          className="hover:text-[#0B3B2C]"
        >
          {product.gender}
        </Link>
        <span>/</span>
        <span className="text-[#801D2D] font-medium truncate max-w-xs">{product.code}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Image Showcase */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-3/4 rounded-2xl overflow-hidden bg-white border border-[#E8DFD3] shadow-sm">
            <img
              src={activeImage || product.mainImage}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
              {product.isNewArrival && (
                <span className="inline-flex items-center gap-1 bg-[#801D2D] text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm shadow-xs">
                  <Sparkles className="w-3 h-3 text-[#E5C365]" />
                  New Arrival
                </span>
              )}
              {product.isFeatured && (
                <span className="inline-flex items-center gap-1 bg-[#0B3B2C] text-[#E5C365] text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm shadow-xs border border-[#C29B38]/30">
                  Featured
                </span>
              )}
            </div>

            <div className="absolute top-3 right-3 z-10">
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full shadow-xs ${
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
          </div>

          {/* Thumbnails */}
          {galleryImages.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-24 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                    activeImage === img
                      ? 'border-[#0B3B2C] ring-2 ring-[#0B3B2C]/20 scale-102'
                      : 'border-[#E8DFD3] opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Specs & Actions */}
        <div className="lg:col-span-6 space-y-6">
          {/* Header & Code */}
          <div className="border-b border-[#E8DFD3] pb-6">
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="font-mono text-xs font-bold text-[#801D2D] bg-[#801D2D]/10 px-2.5 py-1 rounded">
                Product Code: {product.code}
              </span>
              <button
                onClick={handleShare}
                className="text-xs text-gray-500 hover:text-[#0B3B2C] flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#E8DFD3] bg-white"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied Link' : 'Share'}</span>
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-[#1A2421] leading-snug">
              {product.name}
            </h1>

            {/* Price Row */}
            <div className="mt-4 flex items-baseline gap-3">
              {product.priceType === 'Fixed Price' && product.price !== null ? (
                <>
                  <span className="font-mono text-3xl font-bold text-[#0B3B2C]">
                    PKR {product.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-500">per unstitched suit</span>
                </>
              ) : (
                <div className="space-y-1">
                  <span className="text-lg font-bold text-[#801D2D] italic">
                    Contact for Price
                  </span>
                  <p className="text-xs text-gray-500">
                    Pricing varies by current market yardage or bespoke cut. Please contact via WhatsApp for exact quote.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-[#E8DFD3]">
            <div>
              <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Gender</span>
              <span className="text-xs font-semibold text-[#1A2421]">{product.gender}</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Category</span>
              <span className="text-xs font-semibold text-[#1A2421]">{product.category}</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Fabric</span>
              <span className="text-xs font-semibold text-[#1A2421]">{product.fabric}</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Color</span>
              <span className="text-xs font-semibold text-[#1A2421]">{product.color}</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Fabric Description
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed font-light whitespace-pre-line bg-white/60 p-4 rounded-xl border border-[#E8DFD3]">
              {product.description || 'Authentic unstitched fabric provided with standard cutting. Contact us for custom meters or tailoring questions.'}
            </p>
          </div>

          {/* Quantity Selector & Action Buttons */}
          <div className="bg-white p-5 rounded-xl border border-[#E8DFD3] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                Suit Quantity
              </span>
              <div className="flex items-center border border-[#E8DFD3] rounded-lg overflow-hidden bg-[#FAF7F2]">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-sm font-bold text-gray-600 hover:bg-[#E8DFD3] transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-sm font-mono font-bold text-[#0B3B2C]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-sm font-bold text-gray-600 hover:bg-[#E8DFD3] transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total calculation if price is fixed */}
            {product.priceType === 'Fixed Price' && product.price !== null && (
              <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-100">
                <span className="text-gray-500">Calculated Total ({quantity} suit{quantity > 1 ? 's' : ''}):</span>
                <span className="font-mono text-base font-bold text-[#0B3B2C]">
                  PKR {(product.price * quantity).toLocaleString()}
                </span>
              </div>
            )}

            {/* Main Order Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={handleOrderNow}
                disabled={!isAvailable}
                className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
                  isAvailable
                    ? 'bg-[#0B3B2C] hover:bg-[#0E4B37] text-white active:scale-98'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Order Now (Internal Order Form)</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsAppInquiry}
                className="w-full py-3 px-6 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 border border-[#25D366] text-[#1EBE5D] hover:bg-[#25D366]/10 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                <span>Inquire on WhatsApp (+923476430299)</span>
              </button>
            </div>
          </div>

          {/* Reassurance Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <Scissors className="w-4 h-4 text-[#0B3B2C]" />
              <span>Standard unstitched cut length</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#0B3B2C]" />
              <span>Quality inspection before dispatch</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
