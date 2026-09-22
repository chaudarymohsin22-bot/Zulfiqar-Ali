import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Order } from '../types';
import { CheckCircle2, MessageCircle, ArrowRight, Package, Calendar, MapPin, User, Hash } from 'lucide-react';

export const OrderConfirmationPage: React.FC = () => {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (orderNumber) {
        try {
          const found = await api.getOrderByNumber(orderNumber);
          setOrder(found || null);
        } catch (err) {
          console.error('Failed to load order:', err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchOrder();
  }, [orderNumber]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center text-gray-500">
        Loading order details...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h2 className="font-cinzel text-xl font-bold text-[#0B3B2C] mb-2">Order Not Found</h2>
        <p className="text-gray-500 text-xs mb-6">
          Could not locate order #{orderNumber}.
        </p>
        <Link to="/" className="text-xs font-semibold text-[#0B3B2C] hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }

  const handleContinueOnWhatsApp = () => {
    const priceText = order.totalPrice !== null ? `PKR ${order.totalPrice.toLocaleString()}` : 'Contact for Price';
    const message = `Hello Meerab Cloth House,\n\nI have placed an order on your website.\nOrder Number: ${order.orderNumber}\nProduct: ${order.productName} (${order.productCode})\nQuantity: ${order.quantity}\nTotal Price: ${priceText}\nName: ${order.customerName}\nCity: ${order.city}\n\nPlease confirm my order.`;
    const url = `https://wa.me/923476430299?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="bg-white rounded-2xl border border-[#E8DFD3] shadow-lg overflow-hidden">
        
        {/* Success Banner */}
        <div className="bg-[#0B3B2C] text-white p-8 sm:p-10 text-center border-b-4 border-[#C29B38]">
          <div className="w-16 h-16 rounded-full bg-[#FAF7F2]/10 border-2 border-[#E5C365] flex items-center justify-center mx-auto mb-4 text-[#E5C365]">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-bold mb-1">
            Your Order Has Been Received
          </h1>
          <p className="font-urdu text-lg text-[#E5C365] mb-2">
            آپ کا آرڈر موصول ہو چکا ہے
          </p>
          <p className="text-xs sm:text-sm text-[#FAF7F2]/80 max-w-md mx-auto font-light">
            Thank you for ordering with Meerab Cloth House. Your order has been recorded in our system.
          </p>
        </div>

        {/* Order Details Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Order Header Block */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3] gap-3">
            <div className="flex items-center gap-3">
              <Hash className="w-5 h-5 text-[#801D2D]" />
              <div>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Order Number</span>
                <span className="font-mono text-base font-bold text-[#0B3B2C]">{order.orderNumber}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500">Status:</span>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
                {order.status}
              </span>
            </div>
          </div>

          {/* Breakdown Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 space-y-2">
              <span className="font-bold text-gray-700 uppercase tracking-wider block text-[11px]">
                Product Summary
              </span>
              <p className="text-sm font-semibold text-gray-900">{order.productName}</p>
              <p className="text-gray-500 font-mono text-[11px]">Code: {order.productCode}</p>
              <p className="text-gray-600">Quantity: <span className="font-bold text-gray-900">{order.quantity} unstitched suit(s)</span></p>
              <div className="pt-2 border-t border-gray-200 flex justify-between items-baseline">
                <span className="text-gray-500">Total Price:</span>
                <span className="font-mono text-base font-bold text-[#0B3B2C]">
                  {order.totalPrice !== null ? `PKR ${order.totalPrice.toLocaleString()}` : 'Contact for Price'}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 space-y-2">
              <span className="font-bold text-gray-700 uppercase tracking-wider block text-[11px]">
                Delivery Details
              </span>
              <div className="flex items-start gap-2">
                <User className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" />
                <span className="font-medium text-gray-900">{order.customerName}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" />
                <span className="text-gray-600">{order.address}, {order.city}</span>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" />
                <span className="text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="pt-1 text-[11px] text-gray-500 font-mono">
                Phone: {order.mobileNumber}
              </div>
            </div>
          </div>

          {/* Action Call to Actions */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleContinueOnWhatsApp}
              className="w-full py-4 px-6 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Continue on WhatsApp (+923476430299)</span>
            </button>

            <p className="text-center text-xs text-gray-500 font-light">
              Clicking will open WhatsApp with your pre-filled order details to expedite packing and shipping.
            </p>

            <Link
              to={`/my-orders?orderNumber=${encodeURIComponent(order.orderNumber)}&phone=${encodeURIComponent(order.mobileNumber)}`}
              className="w-full py-3 px-6 rounded-xl bg-[#0B3B2C]/10 hover:bg-[#0B3B2C]/15 text-[#0B3B2C] font-bold text-xs flex items-center justify-center gap-2 border border-[#0B3B2C]/20 transition-all text-center"
            >
              <Package className="w-4 h-4" />
              <span>Track This Order Live in My Orders</span>
            </Link>
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
            <Link
              to={`/my-orders?orderNumber=${encodeURIComponent(order.orderNumber)}&phone=${encodeURIComponent(order.mobileNumber)}`}
              className="font-medium text-gray-500 hover:text-[#0B3B2C] inline-flex items-center gap-1"
            >
              <Package className="w-3.5 h-3.5" />
              <span>View Live Status Stepper</span>
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 font-bold text-[#0B3B2C] hover:text-[#801D2D]"
            >
              <span>Continue Browsing</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
