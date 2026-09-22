import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Package,
  Search,
  RefreshCw,
  Phone,
  MessageCircle,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  Truck,
  Scissors,
  AlertCircle,
  ArrowRight,
  Copy,
  Check,
  ShieldCheck,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { api } from '../services/api';
import { Order, OrderStatus } from '../types';
import { useApp } from '../context/AppContext';

const STATUS_STEPS: { status: OrderStatus; title: string; urduTitle: string; description: string }[] = [
  {
    status: 'New',
    title: 'Order Placed',
    urduTitle: 'آرڈر موصول ہوا',
    description: 'Your order has been recorded in our store system.'
  },
  {
    status: 'Confirmed',
    title: 'Order Confirmed',
    urduTitle: 'تصدیق ہو گئی',
    description: 'Fabric stock verified and order details confirmed.'
  },
  {
    status: 'Processing',
    title: 'Fabric Cut & Packed',
    urduTitle: 'پیکنگ اور تیاری',
    description: 'Suit fabric measured, inspected, and sealed in packaging.'
  },
  {
    status: 'Shipped',
    title: 'Dispatched / In Transit',
    urduTitle: 'ترسیل کے لیے روانہ',
    description: 'Package handed over to courier for delivery to your city.'
  },
  {
    status: 'Delivered',
    title: 'Delivered',
    urduTitle: 'موصول ہو چکا',
    description: 'Parcel successfully delivered to your doorstep.'
  }
];

export const MyOrdersPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products } = useApp();

  const [orderNumberInput, setOrderNumberInput] = useState(searchParams.get('orderNumber') || '');
  const [phoneInput, setPhoneInput] = useState(searchParams.get('phone') || '');
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [recentSearches, setRecentSearches] = useState<{ orderNumber?: string; phone: string; date: string }[]>([]);

  // Load saved recent searches from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('mch_recent_searches');
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

  // Perform tracking
  const handleTrack = async (orderNum?: string, phoneNum?: string) => {
    const targetOrderNum = orderNum !== undefined ? orderNum : orderNumberInput;
    const targetPhoneNum = phoneNum !== undefined ? phoneNum : phoneInput;

    if (!targetPhoneNum.trim()) {
      setError('Please enter the mobile number used when placing the order.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const results = await api.trackOrders(targetOrderNum, targetPhoneNum);
      if (results && results.length > 0) {
        setOrders(results);
        setSelectedOrder(results[0]);
        setLastRefreshed(new Date());

        // Update URL search params
        const newParams = new URLSearchParams();
        if (targetOrderNum.trim()) newParams.set('orderNumber', targetOrderNum.trim());
        newParams.set('phone', targetPhoneNum.trim());
        setSearchParams(newParams, { replace: true });

        // Save to recent searches
        try {
          const newSearch = {
            orderNumber: targetOrderNum.trim() || undefined,
            phone: targetPhoneNum.trim(),
            date: new Date().toISOString()
          };
          const updatedSearches = [
            newSearch,
            ...recentSearches.filter(s => s.phone !== targetPhoneNum.trim() || s.orderNumber !== targetOrderNum.trim())
          ].slice(0, 3);
          setRecentSearches(updatedSearches);
          localStorage.setItem('mch_recent_searches', JSON.stringify(updatedSearches));
        } catch (e) {}
      } else {
        setError('No orders found matching your details. Please check the order number or mobile number.');
        setOrders([]);
        setSelectedOrder(null);
      }
    } catch (err: any) {
      setError(err.message || 'Could not find your order. Please check the order number and phone number.');
      setOrders([]);
      setSelectedOrder(null);
    } finally {
      setLoading(false);
    }
  };

  // Auto-track if URL params are present on initial mount
  useEffect(() => {
    const initialOrder = searchParams.get('orderNumber');
    const initialPhone = searchParams.get('phone');
    if (initialPhone) {
      handleTrack(initialOrder || '', initialPhone);
    }
  }, []);

  const handleRefreshStatus = () => {
    if (selectedOrder) {
      handleTrack(selectedOrder.orderNumber, selectedOrder.mobileNumber);
    } else if (phoneInput) {
      handleTrack(orderNumberInput, phoneInput);
    }
  };

  const copyOrderNumber = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Step index calculation
  const getStepStatus = (stepIndex: number, currentStatus: OrderStatus) => {
    if (currentStatus === 'Cancelled') return 'cancelled';

    const orderStatusOrder: OrderStatus[] = ['New', 'Confirmed', 'Processing', 'Shipped', 'Delivered'];
    const currentIndex = orderStatusOrder.indexOf(currentStatus);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  const matchedProduct = selectedOrder ? products.find(p => p.id === selectedOrder.productId) : null;
  const displayImage = selectedOrder?.productImage || matchedProduct?.mainImage || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80';

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8 sm:py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B3B2C]/10 text-[#0B3B2C] text-xs font-semibold uppercase tracking-wider mb-3">
            <Package className="w-3.5 h-3.5" />
            <span>Customer Order Tracker</span>
          </div>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#0B3B2C] mb-2 tracking-tight">
            Track My Order
          </h1>
          <p className="font-urdu text-xl text-[#801D2D] mb-3">
            اپنے آرڈر کی تفصیلات اور تازہ ترین اسٹیٹس معلوم کریں
          </p>
          <p className="text-sm text-gray-600 leading-relaxed font-light">
            Enter your <strong className="font-medium text-gray-900">Order Number</strong> (e.g. <span className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded text-[#0B3B2C]">MCH-2026-0001</span>) and the <strong className="font-medium text-gray-900">Mobile Number</strong> provided during order placement for instant real-time progress.
          </p>
        </div>

        {/* Tracking Search Card */}
        <div className="bg-white rounded-2xl border border-[#E8DFD3] shadow-md p-6 sm:p-8 mb-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleTrack();
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              
              {/* Order Number Field */}
              <div className="md:col-span-5 space-y-1.5">
                <label className="block text-xs font-bold text-[#0B3B2C] uppercase tracking-wider">
                  Order Number <span className="text-gray-400 font-normal lowercase">(optional if searching by phone)</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 font-mono text-xs">
                    #
                  </span>
                  <input
                    type="text"
                    value={orderNumberInput}
                    onChange={(e) => setOrderNumberInput(e.target.value)}
                    placeholder="MCH-2026-0001"
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-300 text-sm font-mono focus:border-[#0B3B2C] focus:ring-1 focus:ring-[#0B3B2C] outline-hidden uppercase placeholder:normal-case placeholder:text-gray-400 transition-colors"
                  />
                </div>
              </div>

              {/* Phone Number Field */}
              <div className="md:col-span-5 space-y-1.5">
                <label className="block text-xs font-bold text-[#0B3B2C] uppercase tracking-wider">
                  Mobile Number <span className="text-[#801D2D]">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    required
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    placeholder="0347-6430299 or +923..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 text-sm font-mono focus:border-[#0B3B2C] focus:ring-1 focus:ring-[#0B3B2C] outline-hidden placeholder:text-gray-400 transition-colors"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="md:col-span-2 flex items-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-5 rounded-xl bg-[#0B3B2C] hover:bg-[#0E4B37] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-all active:scale-98 disabled:opacity-60 cursor-pointer"
                >
                  {loading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                  <span>{loading ? 'Checking...' : 'Track'}</span>
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5 mt-3">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                <div className="space-y-1">
                  <p className="font-semibold">{error}</p>
                  <p className="text-[11px] text-red-600/90">
                    Need help? You can contact Mian Zulfiqar Ali directly on WhatsApp at{' '}
                    <a
                      href="https://wa.me/923476430299"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline font-bold"
                    >
                      0347 6430299
                    </a>.
                  </p>
                </div>
              </div>
            )}

            {/* Recent Searches / Hints */}
            {recentSearches.length > 0 && !selectedOrder && (
              <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">Recent Lookups:</span>
                {recentSearches.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      if (item.orderNumber) setOrderNumberInput(item.orderNumber);
                      setPhoneInput(item.phone);
                      handleTrack(item.orderNumber || '', item.phone);
                    }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAF7F2] border border-[#E8DFD3] hover:border-[#0B3B2C] text-[#0B3B2C] font-mono text-[11px] transition-colors cursor-pointer"
                  >
                    <span>{item.orderNumber || item.phone}</span>
                    <Clock className="w-3 h-3 text-gray-400" />
                  </button>
                ))}
              </div>
            )}
          </form>
        </div>

        {/* Multiple Orders Selector (if customer placed multiple orders) */}
        {orders.length > 1 && (
          <div className="mb-6 bg-white p-4 rounded-xl border border-[#E8DFD3] shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#0B3B2C] uppercase tracking-wider">
                Orders Found for This Mobile Number ({orders.length})
              </span>
              <span className="text-xs text-gray-500">Select an order below to view details:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {orders.map((ord) => {
                const isSelected = selectedOrder?.id === ord.id;
                return (
                  <button
                    key={ord.id}
                    onClick={() => setSelectedOrder(ord)}
                    className={`p-3 rounded-lg text-left border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#0B3B2C]/5 border-[#0B3B2C] shadow-xs'
                        : 'bg-[#FAF7F2] border-[#E8DFD3] hover:border-gray-400'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-mono text-xs font-bold text-[#0B3B2C]">{ord.orderNumber}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          ord.status === 'Delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : ord.status === 'Cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-800 font-medium truncate">{ord.productName}</p>
                    <p className="text-[11px] text-gray-500">{new Date(ord.createdAt).toLocaleDateString()}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Order Details & Real-Time Tracking Canvas */}
        {selectedOrder && (
          <div className="space-y-8">
            
            {/* Real-time Status Card */}
            <div className="bg-white rounded-2xl border border-[#E8DFD3] shadow-lg overflow-hidden">
              
              {/* Header Bar */}
              <div className="bg-[#0B3B2C] text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-4 border-[#C29B38]">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#E5C365] text-[#0B3B2C] text-[10px] font-bold uppercase tracking-wider">
                      Live Status
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-[#FAF7F2]/80">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      Real-time Connected
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <h2 className="font-mono text-xl sm:text-2xl font-bold tracking-tight text-[#FAF7F2]">
                      {selectedOrder.orderNumber}
                    </h2>
                    <button
                      onClick={() => copyOrderNumber(selectedOrder.orderNumber)}
                      title="Copy Order Number"
                      className="p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-[#FAF7F2] transition-colors cursor-pointer"
                    >
                      {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-[#FAF7F2]/70 mt-1">
                    Placed on {new Date(selectedOrder.createdAt).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>

                {/* Right Status Pill & Refresh Button */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] uppercase tracking-wider text-[#FAF7F2]/60 block mb-0.5">
                      Current Status
                    </span>
                    <span
                      className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                        selectedOrder.status === 'Delivered'
                          ? 'bg-emerald-500 text-white'
                          : selectedOrder.status === 'Cancelled'
                          ? 'bg-red-500 text-white'
                          : 'bg-[#C29B38] text-white shadow-xs'
                      }`}
                    >
                      {selectedOrder.status}
                    </span>
                  </div>

                  <button
                    onClick={handleRefreshStatus}
                    disabled={loading}
                    className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                    title="Check live status from server"
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    <span className="hidden sm:inline">Refresh</span>
                  </button>
                </div>
              </div>

              {/* Progress Stepper Timeline */}
              <div className="p-6 sm:p-8 border-b border-gray-100 bg-[#FAF7F2]/40">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-bold text-sm text-[#0B3B2C] uppercase tracking-wider">
                    Order Fulfillment Progress
                  </h3>
                  {lastRefreshed && (
                    <span className="text-[11px] text-gray-500">
                      Updated at {lastRefreshed.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                  )}
                </div>

                {selectedOrder.status === 'Cancelled' ? (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-bold text-sm">Order Cancelled (آرڈر منسوخ ہو چکا ہے)</h4>
                      <p className="text-xs text-red-700 mt-1">
                        This order has been marked as cancelled. If this was unexpected, please contact Mian Zulfiqar Ali directly on WhatsApp at 0347 6430299.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    {/* Stepper Container */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      {STATUS_STEPS.map((step, idx) => {
                        const stepState = getStepStatus(idx, selectedOrder.status);
                        const isDone = stepState === 'completed';
                        const isCurrent = stepState === 'current';

                        return (
                          <div
                            key={step.status}
                            className={`p-4 rounded-xl border relative transition-all ${
                              isCurrent
                                ? 'bg-white border-[#0B3B2C] shadow-md ring-2 ring-[#0B3B2C]/20'
                                : isDone
                                ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                                : 'bg-gray-50 border-gray-200 text-gray-400 opacity-60'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span
                                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                                  isDone
                                    ? 'bg-emerald-600 text-white'
                                    : isCurrent
                                    ? 'bg-[#0B3B2C] text-white animate-pulse'
                                    : 'bg-gray-200 text-gray-600'
                                }`}
                              >
                                {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                              </span>
                              {isCurrent && (
                                <span className="text-[10px] font-bold text-[#801D2D] bg-[#801D2D]/10 px-2 py-0.5 rounded-full uppercase">
                                  Current
                                </span>
                              )}
                            </div>

                            <h4
                              className={`text-xs font-bold ${
                                isCurrent ? 'text-[#0B3B2C]' : isDone ? 'text-emerald-950' : 'text-gray-600'
                              }`}
                            >
                              {step.title}
                            </h4>
                            <p className="font-urdu text-xs text-[#801D2D] mt-0.5">{step.urduTitle}</p>
                            <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Order Content Breakdown */}
              <div className="p-6 sm:p-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  
                  {/* Left Column: Ordered Fabric Details */}
                  <div className="md:col-span-7 space-y-6">
                    <h3 className="font-cinzel text-base font-bold text-[#0B3B2C] pb-2 border-b border-gray-200">
                      Fabric Item Details
                    </h3>

                    <div className="flex flex-col sm:flex-row items-start gap-4 p-4 rounded-xl border border-[#E8DFD3] bg-[#FAF7F2]">
                      <img
                        src={displayImage}
                        alt={selectedOrder.productName}
                        className="w-24 h-28 object-cover rounded-lg border border-gray-200 bg-white shrink-0"
                      />
                      <div className="space-y-1.5 flex-1">
                        <span className="font-mono text-[10px] font-bold text-[#801D2D] bg-[#801D2D]/10 px-2.5 py-0.5 rounded">
                          {selectedOrder.productCode}
                        </span>
                        <h4 className="font-bold text-sm text-gray-900 leading-snug">
                          {selectedOrder.productName}
                        </h4>
                        <div className="text-xs text-gray-600 space-y-0.5 pt-1">
                          <p>
                            <span className="text-gray-500">Ordered Quantity:</span>{' '}
                            <strong className="text-gray-900">{selectedOrder.quantity} unstitched suit(s)</strong>
                          </p>
                          <p>
                            <span className="text-gray-500">Unit Price:</span>{' '}
                            <span className="font-mono">
                              {selectedOrder.unitPrice !== null
                                ? `PKR ${selectedOrder.unitPrice.toLocaleString()}`
                                : 'Contact for Price'}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Price Calculation Summary */}
                    <div className="p-4 rounded-xl border border-gray-200 space-y-2 text-xs">
                      <div className="flex justify-between text-gray-600">
                        <span>Suit Item Price ({selectedOrder.quantity}x):</span>
                        <span className="font-mono font-medium text-gray-900">
                          {selectedOrder.unitPrice !== null
                            ? `PKR ${(selectedOrder.unitPrice * selectedOrder.quantity).toLocaleString()}`
                            : 'Contact for Price'}
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Courier / Shipping (Pakistan):</span>
                        <span className="text-emerald-700 font-semibold">Standard COD</span>
                      </div>
                      <div className="pt-2 border-t border-gray-200 flex justify-between items-baseline">
                        <span className="text-sm font-bold text-gray-900">Total Order Amount:</span>
                        <span className="font-mono text-base font-bold text-[#0B3B2C]">
                          {selectedOrder.totalPrice !== null
                            ? `PKR ${selectedOrder.totalPrice.toLocaleString()}`
                            : 'Price on Confirmation'}
                        </span>
                      </div>
                    </div>

                    {/* Customer Notes (if any) */}
                    {selectedOrder.notes && (
                      <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs">
                        <span className="font-bold text-amber-900 block mb-1">Your Delivery Instructions:</span>
                        <p className="text-amber-800 font-light italic">"{selectedOrder.notes}"</p>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Customer & Delivery Details */}
                  <div className="md:col-span-5 space-y-6">
                    <h3 className="font-cinzel text-base font-bold text-[#0B3B2C] pb-2 border-b border-gray-200">
                      Delivery Destination
                    </h3>

                    <div className="space-y-4 text-xs">
                      <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                        <MapPin className="w-4 h-4 text-[#801D2D] mt-0.5 shrink-0" />
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Shipping Address</span>
                          <p className="font-semibold text-gray-900 mt-0.5">{selectedOrder.customerName}</p>
                          <p className="text-gray-600 mt-0.5 leading-relaxed">{selectedOrder.address}</p>
                          <p className="font-bold text-[#0B3B2C] mt-1">{selectedOrder.city}, Pakistan</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                        <Phone className="w-4 h-4 text-[#0B3B2C] mt-0.5 shrink-0" />
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Contact Numbers</span>
                          <p className="font-mono font-medium text-gray-900 mt-0.5">Mobile: {selectedOrder.mobileNumber}</p>
                          {selectedOrder.whatsappNumber && selectedOrder.whatsappNumber !== selectedOrder.mobileNumber && (
                            <p className="font-mono text-gray-600 mt-0.5">WhatsApp: {selectedOrder.whatsappNumber}</p>
                          )}
                        </div>
                      </div>

                      {/* Store Owner Quick Help */}
                      <div className="p-4 rounded-xl bg-[#0B3B2C]/5 border border-[#0B3B2C]/20 space-y-3">
                        <div className="flex items-center gap-2 text-[#0B3B2C]">
                          <ShieldCheck className="w-4 h-4" />
                          <span className="font-bold text-xs uppercase tracking-wider">
                            Direct Support - Mian Zulfiqar Ali
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-600 leading-relaxed font-light">
                          Have any questions regarding dispatch timing, fabric cuttings, or address modifications? Reach out directly.
                        </p>

                        <div className="space-y-2">
                          <a
                            href={`https://wa.me/923476430299?text=${encodeURIComponent(
                              `Hello Meerab Cloth House, I am tracking my order ${selectedOrder.orderNumber} for ${selectedOrder.productName} (${selectedOrder.productCode}). Current status shows "${selectedOrder.status}". Please provide an update.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2.5 px-4 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                          >
                            <MessageCircle className="w-4 h-4 fill-white" />
                            <span>Inquire on WhatsApp (+923476430299)</span>
                          </a>

                          <a
                            href="tel:03476430299"
                            className="w-full py-2.5 px-4 rounded-lg bg-white border border-[#E8DFD3] hover:border-[#0B3B2C] text-[#0B3B2C] font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5 text-[#0B3B2C]" />
                            <span>Call 0347 6430299</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Return Actions */}
                <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    onClick={() => {
                      setSelectedOrder(null);
                      setOrders([]);
                      setOrderNumberInput('');
                      setPhoneInput('');
                      setSearchParams(new URLSearchParams());
                    }}
                    className="text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
                  >
                    ← Track a different order
                  </button>

                  <div className="flex items-center gap-4">
                    <Link
                      to="/ladies"
                      className="text-xs font-bold text-[#0B3B2C] hover:text-[#801D2D] transition-colors"
                    >
                      Shop Ladies Suits
                    </Link>
                    <span className="text-gray-300">|</span>
                    <Link
                      to="/gents"
                      className="text-xs font-bold text-[#0B3B2C] hover:text-[#801D2D] transition-colors"
                    >
                      Shop Gents Fabrics
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Pakistan Courier & Fabric Care Guidelines Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-[#E8DFD3] shadow-xs space-y-2">
                <div className="w-8 h-8 rounded-full bg-[#0B3B2C]/10 text-[#0B3B2C] flex items-center justify-center">
                  <Truck className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-xs text-gray-900 uppercase tracking-wider">
                  Safe Delivery Across Pakistan
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed font-light">
                  Orders are dispatched via trusted domestic courier services (TCS, Leopard, Trax) with reliable cash-on-delivery.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E8DFD3] shadow-xs space-y-2">
                <div className="w-8 h-8 rounded-full bg-[#801D2D]/10 text-[#801D2D] flex items-center justify-center">
                  <Scissors className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-xs text-gray-900 uppercase tracking-wider">
                  Fabric Quality Inspection
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed font-light">
                  Every unstitched yardage is inspected for weave consistency, dyed shade precision, and thread integrity before packing.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E8DFD3] shadow-xs space-y-2">
                <div className="w-8 h-8 rounded-full bg-[#C29B38]/20 text-[#0B3B2C] flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-xs text-gray-900 uppercase tracking-wider">
                  Tailoring Recommendation
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed font-light">
                  For pure cottons, linen, and khaddar fabrics, we recommend pre-shrinking (shrink wash) before tailoring.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* Empty State / How Tracking Works Guide */}
        {!selectedOrder && !loading && (
          <div className="bg-white rounded-2xl border border-[#E8DFD3] p-8 shadow-xs">
            <h3 className="font-cinzel text-lg font-bold text-[#0B3B2C] mb-4 text-center">
              How Order Tracking Works at Meerab Cloth House
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-gray-600">
              <div className="space-y-2 p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3]/60">
                <span className="w-6 h-6 rounded-full bg-[#0B3B2C] text-white flex items-center justify-center font-bold text-[11px]">
                  1
                </span>
                <h4 className="font-bold text-gray-900 text-sm">Check Your Order Number</h4>
                <p className="leading-relaxed font-light">
                  Found on your order confirmation page after submitting your unstitched fabric request (formatted as <span className="font-mono text-gray-800">MCH-2026-XXXX</span>).
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3]/60">
                <span className="w-6 h-6 rounded-full bg-[#801D2D] text-white flex items-center justify-center font-bold text-[11px]">
                  2
                </span>
                <h4 className="font-bold text-gray-900 text-sm">Enter Mobile Number</h4>
                <p className="leading-relaxed font-light">
                  Enter the phone or WhatsApp number you provided so our system can authenticate and protect your private delivery address.
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3]/60">
                <span className="w-6 h-6 rounded-full bg-[#C29B38] text-white flex items-center justify-center font-bold text-[11px]">
                  3
                </span>
                <h4 className="font-bold text-gray-900 text-sm">Live Updates & Support</h4>
                <p className="leading-relaxed font-light">
                  See whether your suit is being measured and cut, in transit with courier, or delivered, with immediate direct WhatsApp access to store owner Mian Zulfiqar Ali.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
