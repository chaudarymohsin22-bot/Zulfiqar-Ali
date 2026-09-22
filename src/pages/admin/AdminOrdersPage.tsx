import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { Order, OrderStatus } from '../../types';
import {
  Search,
  Eye,
  Filter,
  ArrowUpDown,
  ShoppingBag,
  Clock,
  Phone,
  MessageCircle,
  CheckCircle2,
  Trash2
} from 'lucide-react';

const ORDER_STATUSES: OrderStatus[] = [
  'New',
  'Confirmed',
  'Processing',
  'Shipped',
  'Delivered',
  'Cancelled'
];

export const AdminOrdersPage: React.FC = () => {
  const { orders, refreshOrders } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filteredOrders = orders
    .filter((order) => {
      if (statusFilter !== 'All' && order.status !== statusFilter) return false;
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase().trim();
        const match =
          order.orderNumber.toLowerCase().includes(term) ||
          order.customerName.toLowerCase().includes(term) ||
          order.mobileNumber.toLowerCase().includes(term) ||
          order.city.toLowerCase().includes(term) ||
          order.productCode.toLowerCase().includes(term) ||
          order.productName.toLowerCase().includes(term);
        if (!match) return false;
      }
      return true;
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleQuickStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    setUpdatingId(orderId);
    try {
      await api.updateOrderStatus(orderId, newStatus);
      await refreshOrders();
    } catch (err: any) {
      alert(err.message || 'Failed to update order status');
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Confirmed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Processing':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-[#E8DFD3] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#801D2D]">
            Order Fulfillment
          </span>
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#0B3B2C]">
            Customer Orders ({orders.length})
          </h2>
          <p className="text-xs text-gray-500">
            View orders, verify customer contact, update dispatch status, and connect via WhatsApp.
          </p>
        </div>

        {/* Status quick counters */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200">
            New: {orders.filter((o) => o.status === 'New').length}
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200">
            Processing: {orders.filter((o) => o.status === 'Processing').length}
          </span>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#E8DFD3] shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by order number (e.g. MCH-2026), customer name, phone, or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-[#E8DFD3] focus:border-[#0B3B2C] outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs text-gray-500 font-medium mr-1">Status:</span>
          {['All', ...ORDER_STATUSES].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === status
                  ? 'bg-[#0B3B2C] text-white'
                  : 'bg-[#FAF7F2] text-gray-700 hover:bg-[#E8DFD3]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-[#E8DFD3] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F2] text-gray-600 uppercase font-semibold border-b border-[#E8DFD3]">
              <tr>
                <th className="py-3.5 px-4">Order #</th>
                <th className="py-3.5 px-4">Customer Details</th>
                <th className="py-3.5 px-4">Product & Code</th>
                <th className="py-3.5 px-4">Qty</th>
                <th className="py-3.5 px-4">Total</th>
                <th className="py-3.5 px-4">City</th>
                <th className="py-3.5 px-4">Status & Update</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-gray-400">
                    No orders match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/80 transition-colors">
                    {/* Order Number */}
                    <td className="py-3.5 px-4 font-mono font-bold text-[#0B3B2C]">
                      <Link to={`/admin/orders/${order.id}`} className="hover:underline">
                        {order.orderNumber}
                      </Link>
                    </td>

                    {/* Customer */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-gray-900">{order.customerName}</div>
                      <div className="flex items-center gap-2 text-[11px] text-gray-500 font-mono">
                        <a href={`tel:${order.mobileNumber}`} className="hover:text-[#0B3B2C]">
                          {order.mobileNumber}
                        </a>
                        {order.whatsappNumber && (
                          <a
                            href={`https://wa.me/${order.whatsappNumber.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#25D366] hover:underline"
                          >
                            WA
                          </a>
                        )}
                      </div>
                    </td>

                    {/* Product */}
                    <td className="py-3.5 px-4">
                      <span className="font-mono text-[10px] font-bold text-[#801D2D] bg-[#801D2D]/10 px-1.5 py-0.5 rounded mr-1">
                        {order.productCode}
                      </span>
                      <span className="text-gray-800 line-clamp-1">{order.productName}</span>
                    </td>

                    {/* Qty */}
                    <td className="py-3.5 px-4 font-bold text-gray-900">{order.quantity}</td>

                    {/* Total Price */}
                    <td className="py-3.5 px-4 font-mono font-bold text-[#0B3B2C]">
                      {order.totalPrice !== null ? `PKR ${order.totalPrice.toLocaleString()}` : 'Contact for Price'}
                    </td>

                    {/* City */}
                    <td className="py-3.5 px-4 text-gray-700">{order.city}</td>

                    {/* Status Dropdown */}
                    <td className="py-3.5 px-4">
                      <select
                        value={order.status}
                        disabled={updatingId === order.id}
                        onChange={(e) =>
                          handleQuickStatusChange(order.id, e.target.value as OrderStatus)
                        }
                        className={`text-[11px] font-bold rounded-lg px-2.5 py-1 border outline-hidden ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {ORDER_STATUSES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-gray-400 text-[11px]">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>

                    {/* View Details */}
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        to={`/admin/orders/${order.id}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-[#FAF7F2] text-[#0B3B2C] hover:bg-[#E8DFD3] font-semibold text-xs transition-colors border border-[#E8DFD3]"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Details</span>
                      </Link>
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
