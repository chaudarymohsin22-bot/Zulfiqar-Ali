import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { Product } from '../../types';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Sparkles,
  Star,
  CheckCircle2,
  AlertCircle,
  Eye,
  ArrowUpDown
} from 'lucide-react';

export const AdminProductsPage: React.FC = () => {
  const { products, refreshProducts } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState<'All' | 'Ladies' | 'Gents'>('All');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('All');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const filtered = products.filter((p) => {
    if (genderFilter !== 'All' && p.gender !== genderFilter) return false;
    if (availabilityFilter !== 'All' && p.availability !== availabilityFilter) return false;
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      const match =
        p.name.toLowerCase().includes(term) ||
        p.code.toLowerCase().includes(term) ||
        p.fabric.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.color.toLowerCase().includes(term);
      if (!match) return false;
    }
    return true;
  });

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;

    setDeletingId(id);
    try {
      await api.deleteProduct(id);
      await refreshProducts();
      setMsg({ type: 'success', text: `Product "${name}" was successfully removed.` });
      setTimeout(() => setMsg(null), 3000);
    } catch (err: any) {
      setMsg({ type: 'error', text: err.message || 'Failed to delete product.' });
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleNewArrival = async (product: Product) => {
    try {
      await api.updateProduct(product.id, { isNewArrival: !product.isNewArrival });
      await refreshProducts();
    } catch (err: any) {
      alert(err.message || 'Failed to toggle New Arrival');
    }
  };

  const handleToggleFeatured = async (product: Product) => {
    try {
      await api.updateProduct(product.id, { isFeatured: !product.isFeatured });
      await refreshProducts();
    } catch (err: any) {
      alert(err.message || 'Failed to toggle Featured');
    }
  };

  const handleChangeAvailability = async (product: Product, availability: Product['availability']) => {
    try {
      await api.updateProduct(product.id, { availability });
      await refreshProducts();
    } catch (err: any) {
      alert(err.message || 'Failed to update availability');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-2xl border border-[#E8DFD3] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#801D2D]">
            Catalog Management
          </span>
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#0B3B2C]">
            Product Management ({products.length})
          </h2>
          <p className="text-xs text-gray-500">
            Create, update fabric specs, change prices, and toggle New Arrivals / Featured.
          </p>
        </div>

        <Link
          to="/admin/products/new"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0B3B2C] hover:bg-[#0E4B37] text-white text-xs font-bold transition-all shadow-2xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {msg && (
        <div
          className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
            msg.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          {msg.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{msg.text}</span>
        </div>
      )}

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#E8DFD3] shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by code, product name, fabric, or color..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-[#E8DFD3] focus:border-[#0B3B2C] outline-hidden"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value as any)}
            className="px-3 py-2 text-xs rounded-lg border border-[#E8DFD3] bg-[#FAF7F2] font-medium text-gray-700 outline-hidden"
          >
            <option value="All">All Genders</option>
            <option value="Ladies">Ladies Only</option>
            <option value="Gents">Gents Only</option>
          </select>

          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-lg border border-[#E8DFD3] bg-[#FAF7F2] font-medium text-gray-700 outline-hidden"
          >
            <option value="All">All Availability</option>
            <option value="Available">Available</option>
            <option value="Coming Soon">Coming Soon</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-[#E8DFD3] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F2] text-gray-600 uppercase font-semibold border-b border-[#E8DFD3]">
              <tr>
                <th className="py-3 px-4">Fabric Image</th>
                <th className="py-3 px-4">Code</th>
                <th className="py-3 px-4">Product Name & Category</th>
                <th className="py-3 px-4">Gender</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Availability</th>
                <th className="py-3 px-4">Badges</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400">
                    No products match the selected criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <img
                        src={product.mainImage}
                        alt={product.name}
                        className="w-12 h-14 object-cover rounded-md border border-gray-200 bg-gray-50"
                      />
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-[#801D2D]">
                      {product.code}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-gray-900 line-clamp-1">{product.name}</div>
                      <div className="text-[11px] text-gray-500">
                        {product.category} • {product.fabric} ({product.color})
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-gray-700">{product.gender}</span>
                    </td>
                    <td className="py-3 px-4">
                      {product.priceType === 'Fixed Price' && product.price !== null ? (
                        <span className="font-mono font-bold text-[#0B3B2C]">
                          PKR {product.price.toLocaleString()}
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold text-[#801D2D] italic">
                          Contact for Price
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={product.availability}
                        onChange={(e) =>
                          handleChangeAvailability(product, e.target.value as Product['availability'])
                        }
                        className={`text-[11px] font-bold rounded-md px-2 py-1 border outline-hidden ${
                          product.availability === 'Available'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : product.availability === 'Coming Soon'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-red-50 text-red-800 border-red-200'
                        }`}
                      >
                        <option value="Available">Available</option>
                        <option value="Coming Soon">Coming Soon</option>
                        <option value="Out of Stock">Out of Stock</option>
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleToggleNewArrival(product)}
                          title="Toggle New Arrival"
                          className={`p-1 rounded-md text-[10px] font-bold uppercase transition-colors ${
                            product.isNewArrival
                              ? 'bg-[#801D2D] text-white'
                              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                          }`}
                        >
                          New
                        </button>

                        <button
                          type="button"
                          onClick={() => handleToggleFeatured(product)}
                          title="Toggle Featured"
                          className={`p-1 rounded-md text-[10px] font-bold uppercase transition-colors ${
                            product.isFeatured
                              ? 'bg-[#0B3B2C] text-[#E5C365]'
                              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                          }`}
                        >
                          Star
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/product/${product.id}`}
                          target="_blank"
                          title="View public product page"
                          className="p-1 text-gray-400 hover:text-gray-600 rounded"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/admin/products/edit/${product.id}`}
                          title="Edit product"
                          className="p-1 text-[#0B3B2C] hover:bg-[#FAF7F2] rounded"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(product.id, product.name)}
                          disabled={deletingId === product.id}
                          title="Delete product"
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
