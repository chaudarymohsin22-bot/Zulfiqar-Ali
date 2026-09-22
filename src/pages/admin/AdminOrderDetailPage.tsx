import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { Order, OrderStatus } from '../../types';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Phone,
  MessageCircle,
  Hash,
  Package,
  User,
  CheckCircle2,
  Trash2,
  FileText
} from 'lucide-react';

const ORDER_STATUSES: OrderStatus[] = [
  'New',
  'Confirmed',
  'Processing',
  'Shipped',
  'Delivered',
  'Cancelled'
];

export const AdminOrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { orders, products, refreshOrders } = useApp();
  const [order, setOrder] = useState<Order | null>(null);
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>('New');
  const [updating, setUpdating] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const found = orders.find((o) => o.id === id);
      if (found) {
        setOrder(found);
        setCurrentStatus(found.status);
      }
    }
  }, [id, orders]);

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto p-12 text-center text-gray-500">
        Order not found or loading...
        <div className="mt-4">
          <Link to="/admin/orders" className="text-xs text-[#0B3B2C] hover:underline font-bold">
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const handleStatusUpdate = async () => {
    setUpdating(true);
    setSuccessMsg(null);
    try {
      await api.updateOrderStatus(order.id, currentStatus);
      await refreshOrders();
      setSuccessMsg(`Order status updated to ${currentStatus}`);
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const handleChatCustomerWhatsApp = () => {
    const rawNumber = (order.whatsappNumber || order.mobileNumber).replace(/[^0-9]/g, '');
    const cleanNumber = rawNumber.startsWith('0') ? `92${rawNumber.slice(1)}` : rawNumber;
    const text = `Hello ${order.customerName},\nThis is Meerab Cloth House regarding your Order #${order.orderNumber} for ${order.productName} (${order.productCode}). Current status is: ${order.status}.`;
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/admin/orders"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#0B3B2C]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Orders</span>
        </Link>
        <span className="font-mono text-xs font-bold text-[#801D2D]">
          Order #{order.orderNumber}
        </span>
      </div>

      {successMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Main Order Card */}
      <div className="bg-white rounded-2xl border border-[#E8DFD3] shadow-2xs overflow-hidden">
        {/* Banner with Order Number and Status update */}
        <div className="bg-[#FAF7F2] p-6 border-b border-[#E8DFD3] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                Order Identifier
              </span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500">
                {new Date(order.createdAt).toLocaleString()}
              </span>
            </div>
            <h2 className="font-mono text-2xl font-bold text-[#0B3B2C] mt-0.5">
              {order.orderNumber}
            </h2>
          </div>

          {/* Status Update Control */}
          <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-[#E8DFD3]">
            <span className="text-xs font-bold text-gray-600 pl-2">Status:</span>
            <select
              value={currentStatus}
              onChange={(e) => setCurrentStatus(e.target.value as OrderStatus)}
              className="text-xs font-bold rounded-lg px-3 py-1.5 border border-gray-300 bg-[#FAF7F2] outline-hidden"
            >
              {ORDER_STATUSES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
            <button
              onClick={handleStatusUpdate}
              disabled={updating || currentStatus === order.status}
              className="px-3 py-1.5 bg-[#0B3B2C] hover:bg-[#0E4B37] text-white text-xs font-bold rounded-lg disabled:opacity-50 transition-colors"
            >
              {updating ? 'Updating...' : 'Save'}
            </button>
          </div>
        </div>

        {/* Content Body Grid */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Customer & Delivery Information */}
          <div className="space-y-4">
            <h3 className="font-cinzel text-sm font-bold text-[#0B3B2C] uppercase tracking-wider pb-2 border-b border-gray-100 flex items-center gap-2">
              <User className="w-4 h-4 text-[#801D2D]" />
              <span>Customer & Delivery Details</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Full Name</span>
                <span className="text-sm font-semibold text-gray-900">{order.customerName}</span>
              </div>

              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Mobile Phone</span>
                <a
                  href={`tel:${order.mobileNumber}`}
                  className="font-mono text-sm font-semibold text-[#0B3B2C] hover:underline"
                >
                  {order.mobileNumber}
                </a>
              </div>

              {order.whatsappNumber && (
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">WhatsApp Number</span>
                  <span className="font-mono text-sm text-gray-800">{order.whatsappNumber}</span>
                </div>
              )}

              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Destination City</span>
                <span className="text-sm font-semibold text-gray-900">{order.city}</span>
              </div>

              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Complete Address</span>
                <p className="p-3 rounded-lg bg-[#FAF7F2] border border-[#E8DFD3] text-gray-800 leading-relaxed font-medium">
                  {order.address}
                </p>
              </div>

              {order.notes && (
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Customer Notes</span>
                  <p className="p-3 rounded-lg bg-amber-50/50 border border-amber-200 text-amber-900 italic">
                    "{order.notes}"
                  </p>
                </div>
              )}
            </div>

            {/* Direct WhatsApp Customer Contact Button */}
            <div className="pt-2">
              <button
                onClick={handleChatCustomerWhatsApp}
                className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Contact Customer on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Product & Pricing Information */}
          <div className="space-y-4">
            <h3 className="font-cinzel text-sm font-bold text-[#0B3B2C] uppercase tracking-wider pb-2 border-b border-gray-100 flex items-center gap-2">
              <Package className="w-4 h-4 text-[#801D2D]" />
              <span>Ordered Product</span>
            </h3>

            {(() => {
              const matchedProduct = products.find((p) => p.id === order.productId);
              const displayImage =
                order.productImage ||
                matchedProduct?.mainImage ||
                'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80';

              return (
                <div className="p-4 rounded-xl border border-[#E8DFD3] bg-[#FAF7F2] flex items-center gap-4">
                  <img
                    src={displayImage}
                    alt={order.productName}
                    className="w-20 h-24 object-cover rounded-lg border border-gray-200 bg-white"
                  />
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] font-bold text-[#801D2D] bg-[#801D2D]/10 px-2 py-0.5 rounded">
                      {order.productCode}
                    </span>
                    <h4 className="font-bold text-sm text-gray-900">{order.productName}</h4>
                    <p className="text-xs text-gray-500 font-mono">
                      Unit Price:{' '}
                      {order.unitPrice !== null ? `PKR ${order.unitPrice.toLocaleString()}` : 'Contact for Price'}
                    </p>
                  </div>
                </div>
              );
            })()}

            {/* Calculations Breakdown */}
            <div className="p-4 rounded-xl border border-gray-200 space-y-2 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Quantity Ordered:</span>
                <span className="font-bold text-gray-900">{order.quantity} unstitched suit(s)</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Unit Price:</span>
                <span className="font-mono">
                  {order.unitPrice !== null ? `PKR ${order.unitPrice.toLocaleString()}` : 'Contact for Price'}
                </span>
              </div>
              <div className="pt-2 border-t border-gray-200 flex justify-between items-baseline">
                <span className="font-bold text-gray-900 text-sm">Total Order Value:</span>
                <span className="font-mono text-lg font-bold text-[#0B3B2C]">
                  {order.totalPrice !== null ? `PKR ${order.totalPrice.toLocaleString()}` : 'Contact for Price'}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-1">
              <span className="font-bold block">Fulfillment Checklist:</span>
              <ul className="list-disc pl-4 space-y-1 text-[11px] text-blue-800">
                <li>Check cloth cut and yardage specifications</li>
                <li>Verify customer phone or WhatsApp confirmation</li>
                <li>Pack in dust protection wrapping</li>
                <li>Update status to "Shipped" once dispatched with courier</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
