import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { Product, OrderFormData } from '../types';
import { ShoppingBag, ArrowLeft, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

export const OrderPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { products, refreshOrders } = useApp();

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(Number(searchParams.get('qty')) || 1);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [formData, setFormData] = useState<OrderFormData>({
    customerName: '',
    mobileNumber: '',
    whatsappNumber: '',
    city: '',
    address: '',
    notes: '',
    quantity: Number(searchParams.get('qty')) || 1,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof OrderFormData, string>>>({});

  useEffect(() => {
    if (productId) {
      const found = products.find((p) => p.id === productId);
      if (found) {
        setProduct(found);
      }
    }
  }, [productId, products]);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, quantity }));
  }, [quantity]);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 mb-4">Loading order details...</p>
        <Link to="/" className="text-xs text-[#0B3B2C] hover:underline font-semibold">
          Return to Collections
        </Link>
      </div>
    );
  }

  // Pakistani phone number validator
  // Matches: 03001234567, 0347-6430299, +923476430299, 923476430299
  const validatePakistaniPhone = (phone: string): boolean => {
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');
    const regex = /^((\+92)|(92)|(0))?3[0-9]{9}$/;
    return regex.test(cleaned);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof OrderFormData, string>> = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Please enter your full name';
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!validatePakistaniPhone(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid Pakistani mobile number (e.g., 03476430299)';
    }

    if (formData.whatsappNumber.trim() && !validatePakistaniPhone(formData.whatsappNumber)) {
      newErrors.whatsappNumber = 'Please enter a valid WhatsApp number (e.g., 03476430299)';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'Please enter your delivery city';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Please enter your complete street address for delivery';
    } else if (formData.address.trim().length < 8) {
      newErrors.address = 'Please provide full house / street delivery details';
    }

    if (quantity < 1) {
      newErrors.quantity = 'Quantity must be at least 1 suit';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    try {
      const order = await api.createOrder(product, formData);
      await refreshOrders();
      // Redirect to Confirmation Page
      navigate(`/order-confirmation/${order.orderNumber}`);
    } catch (err: any) {
      console.error('Order submission error:', err);
      setFormError(err.message || 'Failed to submit order. Please try again or contact us directly on WhatsApp.');
      setSubmitting(false);
    }
  };

  const unitPrice = product.priceType === 'Fixed Price' ? product.price : null;
  const totalPrice = unitPrice !== null ? unitPrice * quantity : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Back Link */}
      <Link
        to={`/product/${product.id}`}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#0B3B2C] mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Product Details</span>
      </Link>

      <div className="mb-6">
        <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#0B3B2C]">
          Order Checkout
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">
          Complete the internal order form below to place your order with Meerab Cloth House.
        </p>
      </div>

      {formError && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-3 text-xs">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Submission Error</p>
            <p>{formError}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Selected Product Summary Card */}
        <div className="bg-white rounded-2xl border border-[#E8DFD3] p-5 sm:p-6 shadow-2xs">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#801D2D] mb-4">
            Selected Unstitched Fabric
          </h2>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-4 border-b border-gray-100">
            <img
              src={product.mainImage}
              alt={product.name}
              className="w-20 h-24 sm:w-24 sm:h-28 object-cover rounded-xl border border-gray-200 bg-gray-50 shrink-0"
            />

            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] font-bold text-[#801D2D] bg-[#801D2D]/10 px-2 py-0.5 rounded">
                  {product.code}
                </span>
                <span className="text-xs text-gray-500">
                  {product.gender} • {product.category}
                </span>
              </div>
              <h3 className="text-base font-bold text-[#1A2421]">
                {product.name}
              </h3>
              <p className="text-xs text-gray-600">
                Fabric: <span className="font-medium text-gray-900">{product.fabric}</span> | Color:{' '}
                <span className="font-medium text-gray-900">{product.color}</span>
              </p>
            </div>

            {/* Price block */}
            <div className="sm:text-right shrink-0">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Unit Price</span>
              {unitPrice !== null ? (
                <span className="font-mono text-base font-bold text-[#0B3B2C]">
                  PKR {unitPrice.toLocaleString()}
                </span>
              ) : (
                <span className="text-xs font-bold text-[#801D2D] italic">
                  Contact for Price
                </span>
              )}
            </div>
          </div>

          {/* Quantity and Total Bar */}
          <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <label className="text-xs font-bold text-gray-700">Quantity (Suits):</label>
              <div className="flex items-center border border-[#E8DFD3] rounded-lg overflow-hidden bg-[#FAF7F2]">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-sm font-bold text-gray-600 hover:bg-[#E8DFD3]"
                >
                  -
                </button>
                <span className="px-4 py-1 text-xs font-mono font-bold text-[#0B3B2C]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-sm font-bold text-gray-600 hover:bg-[#E8DFD3]"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-xs text-gray-500 font-medium">Order Total:</span>
              {totalPrice !== null ? (
                <span className="font-mono text-xl sm:text-2xl font-bold text-[#0B3B2C]">
                  PKR {totalPrice.toLocaleString()}
                </span>
              ) : (
                <span className="text-xs font-bold text-[#801D2D] italic">
                  To be confirmed via WhatsApp
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Customer Information Form */}
        <div className="bg-white rounded-2xl border border-[#E8DFD3] p-5 sm:p-8 shadow-2xs space-y-6">
          <div className="border-b border-gray-100 pb-3">
            <h2 className="text-base font-bold text-[#0B3B2C]">
              Customer & Delivery Details
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Please enter your accurate contact and dispatch information.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div className="sm:col-span-2 space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Muhammad Usman / Ayesha Khan"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm outline-hidden ${
                  errors.customerName ? 'border-red-400 bg-red-50/30' : 'border-[#E8DFD3] focus:border-[#0B3B2C]'
                }`}
              />
              {errors.customerName && <p className="text-red-500 text-xs mt-1">{errors.customerName}</p>}
            </div>

            {/* Mobile Number */}
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="e.g. 03476430299"
                value={formData.mobileNumber}
                onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-mono outline-hidden ${
                  errors.mobileNumber ? 'border-red-400 bg-red-50/30' : 'border-[#E8DFD3] focus:border-[#0B3B2C]'
                }`}
              />
              {errors.mobileNumber ? (
                <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>
              ) : (
                <p className="text-[11px] text-gray-400">Used for courier delivery confirmation</p>
              )}
            </div>

            {/* WhatsApp Number */}
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                WhatsApp Number <span className="text-gray-400 text-[10px]">(Optional, if different)</span>
              </label>
              <input
                type="tel"
                placeholder="e.g. 03476430299"
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-mono outline-hidden ${
                  errors.whatsappNumber ? 'border-red-400 bg-red-50/30' : 'border-[#E8DFD3] focus:border-[#0B3B2C]'
                }`}
              />
              {errors.whatsappNumber && <p className="text-red-500 text-xs mt-1">{errors.whatsappNumber}</p>}
            </div>

            {/* City */}
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Delivery City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Lahore, Karachi, Faisalabad, Multan..."
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm outline-hidden ${
                  errors.city ? 'border-red-400 bg-red-50/30' : 'border-[#E8DFD3] focus:border-[#0B3B2C]'
                }`}
              />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>

            {/* Complete Address */}
            <div className="sm:col-span-2 space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Complete Delivery Address <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                placeholder="House / Flat / Shop Number, Street / Mohallah name, Sector / Area..."
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm outline-hidden resize-none ${
                  errors.address ? 'border-red-400 bg-red-50/30' : 'border-[#E8DFD3] focus:border-[#0B3B2C]'
                }`}
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>

            {/* Additional Notes */}
            <div className="sm:col-span-2 space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Additional Instructions / Notes <span className="text-gray-400 text-[10px]">(Optional)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Need urgent dispatch, or special yardage note..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD3] text-sm focus:border-[#0B3B2C] outline-hidden"
              />
            </div>
          </div>

          {/* Place Order CTA Button */}
          <div className="pt-4 border-t border-gray-100 space-y-3">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 px-6 rounded-xl bg-[#0B3B2C] hover:bg-[#0E4B37] text-white font-bold text-base shadow-md hover:shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>{submitting ? 'Recording Order in Database...' : 'Place Order'}</span>
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Orders are recorded directly in the Meerab Cloth House database.</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
