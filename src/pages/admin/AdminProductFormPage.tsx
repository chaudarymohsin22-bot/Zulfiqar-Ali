import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { Product } from '../../types';
import { ArrowLeft, Save, AlertCircle, Sparkles, Upload, Image as ImageIcon } from 'lucide-react';

export const AdminProductFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { products, refreshProducts } = useApp();

  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    code: '',
    gender: 'Ladies',
    category: 'Lawn',
    fabric: 'Lawn',
    color: 'Beige',
    priceType: 'Fixed Price',
    price: 3500,
    availability: 'Available',
    description: '',
    mainImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    images: [],
    isNewArrival: true,
    isFeatured: false,
  });

  const [additionalImagesText, setAdditionalImagesText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-generate a fresh product code for new products based on gender
  useEffect(() => {
    if (!isEdit) {
      const prefix = formData.gender === 'Ladies' ? 'MCH-L' : 'MCH-G';
      const randomNum = Math.floor(100 + Math.random() * 900);
      setFormData((prev) => ({ ...prev, code: `${prefix}-${randomNum}` }));
    }
  }, [formData.gender, isEdit]);

  useEffect(() => {
    if (isEdit && id) {
      const found = products.find((p) => p.id === id);
      if (found) {
        setFormData(found);
        setAdditionalImagesText((found.images || []).join('\n'));
      }
    }
  }, [id, products, isEdit]);

  // Handle local image file upload preview
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, mainImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name?.trim()) {
      setError('Product Name is required');
      return;
    }
    if (!formData.code?.trim()) {
      setError('Product Code is required');
      return;
    }

    setLoading(true);

    try {
      const splitImages = additionalImagesText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        ...formData,
        images: splitImages,
        price: formData.priceType === 'Fixed Price' ? Number(formData.price) || 0 : null,
      };

      if (isEdit && id) {
        await api.updateProduct(id, payload);
      } else {
        await api.createProduct(payload);
      }

      await refreshProducts();
      navigate('/admin/products');
    } catch (err: any) {
      setError(err.message || 'Failed to save product');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/admin/products"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#0B3B2C]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products List</span>
        </Link>
        <span className="text-xs text-gray-400 font-mono">
          {isEdit ? `Editing Product ID: ${id}` : 'Creating New Unstitched Fabric Item'}
        </span>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DFD3] shadow-2xs">
        <div className="border-b border-gray-100 pb-4 mb-6">
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#0B3B2C]">
            {isEdit ? 'Edit Fabric Product' : 'Add New Unstitched Fabric Product'}
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Configure product specifications, product code, categories, pricing, and display badges.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Name and Code */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Royal Imperial Lawn Unstitched Suit 3pc"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD3] text-sm focus:border-[#0B3B2C] outline-hidden font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Product Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. MCH-L-101"
                value={formData.code || ''}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD3] text-sm font-mono focus:border-[#0B3B2C] outline-hidden font-bold text-[#801D2D]"
              />
            </div>
          </div>

          {/* Row 2: Gender, Category, Fabric, Color */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Gender Target
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                className="w-full px-3 py-2.5 rounded-lg border border-[#E8DFD3] text-xs bg-[#FAF7F2] font-semibold outline-hidden"
              >
                <option value="Ladies">Ladies</option>
                <option value="Gents">Gents</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Category
              </label>
              <input
                type="text"
                placeholder="e.g. Lawn, Boski, 3 Piece"
                value={formData.category || ''}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg border border-[#E8DFD3] text-xs outline-hidden"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Fabric Material
              </label>
              <input
                type="text"
                placeholder="e.g. Pure Cotton, Linen"
                value={formData.fabric || ''}
                onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg border border-[#E8DFD3] text-xs outline-hidden"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Color
              </label>
              <input
                type="text"
                placeholder="e.g. Royal Navy, Cream"
                value={formData.color || ''}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg border border-[#E8DFD3] text-xs outline-hidden"
              />
            </div>
          </div>

          {/* Row 3: Pricing & Availability */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3]">
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Price Type
              </label>
              <select
                value={formData.priceType}
                onChange={(e) => setFormData({ ...formData, priceType: e.target.value as any })}
                className="w-full px-3 py-2 rounded-lg border border-[#E8DFD3] text-xs bg-white font-medium outline-hidden"
              >
                <option value="Fixed Price">Fixed Price (PKR)</option>
                <option value="Contact for Price">Contact for Price</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Price (PKR)
              </label>
              <input
                type="number"
                disabled={formData.priceType === 'Contact for Price'}
                value={formData.price || ''}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                placeholder="e.g. 4500"
                className="w-full px-3 py-2 rounded-lg border border-[#E8DFD3] text-xs bg-white font-mono outline-hidden disabled:bg-gray-100 disabled:text-gray-400"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Stock Availability
              </label>
              <select
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value as any })}
                className="w-full px-3 py-2 rounded-lg border border-[#E8DFD3] text-xs bg-white font-semibold outline-hidden"
              >
                <option value="Available">Available</option>
                <option value="Coming Soon">Coming Soon</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
              Fabric Description & Suit Details
            </label>
            <textarea
              rows={3}
              placeholder="Describe unstitched suit dimensions, yardage, embroidery details, care notes..."
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD3] text-xs outline-hidden"
            />
          </div>

          {/* Image Showcase & Upload */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-xl border border-[#E8DFD3]">
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Main Image (URL or File Upload)
              </label>
              <input
                type="text"
                placeholder="https://images.unsplash.com/..."
                value={formData.mainImage || ''}
                onChange={(e) => setFormData({ ...formData, mainImage: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-[#E8DFD3] text-xs font-mono outline-hidden"
              />

              <div className="flex items-center gap-2">
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 bg-gray-50 hover:bg-gray-100 text-xs font-medium cursor-pointer">
                  <Upload className="w-3.5 h-3.5 text-gray-600" />
                  <span>Upload Local Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileUpload}
                    className="hidden"
                  />
                </label>
                <span className="text-[11px] text-gray-400">Previews instantly</span>
              </div>

              {/* Additional Images URLs */}
              <div className="space-y-1 pt-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
                  Additional Gallery Images (One URL per line)
                </label>
                <textarea
                  rows={2}
                  placeholder="https://...&#10;https://..."
                  value={additionalImagesText}
                  onChange={(e) => setAdditionalImagesText(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#E8DFD3] text-xs font-mono outline-hidden"
                />
              </div>
            </div>

            {/* Image Preview Box */}
            <div className="flex flex-col items-center justify-center p-3 rounded-lg border border-dashed border-gray-300 bg-[#FAF7F2]">
              {formData.mainImage ? (
                <div className="relative aspect-3/4 w-32 rounded-lg overflow-hidden border border-gray-200 shadow-xs">
                  <img
                    src={formData.mainImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-50" />
                  <span className="text-xs">No image provided</span>
                </div>
              )}
              <span className="text-[10px] text-gray-500 mt-2">Card Image Preview</span>
            </div>
          </div>

          {/* Badges Toggles */}
          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(formData.isNewArrival)}
                onChange={(e) => setFormData({ ...formData, isNewArrival: e.target.checked })}
                className="w-4 h-4 rounded text-[#801D2D] focus:ring-[#801D2D]"
              />
              <span className="text-xs font-bold text-gray-700">Mark as New Arrival (appears on /new-arrivals)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(formData.isFeatured)}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="w-4 h-4 rounded text-[#0B3B2C] focus:ring-[#0B3B2C]"
              />
              <span className="text-xs font-bold text-gray-700">Mark as Featured (homepage showcase)</span>
            </label>
          </div>

          {/* Submit CTA */}
          <div className="pt-6 border-t border-gray-100 flex items-center justify-end gap-3">
            <Link
              to="/admin/products"
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-[#0B3B2C] hover:bg-[#0E4B37] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-98 disabled:opacity-75"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? 'Saving to Database...' : isEdit ? 'Update Product' : 'Create Product'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
