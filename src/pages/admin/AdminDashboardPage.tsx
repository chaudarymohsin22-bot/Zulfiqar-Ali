import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Package,
  ShoppingBag,
  Clock,
  Sparkles,
  Plus,
  ArrowRight,
  TrendingUp,
  Scissors
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { products, orders } = useApp();

  const totalProducts = products.length;
  const ladiesProducts = products.filter((p) => p.gender === 'Ladies').length;
  const gentsProducts = products.filter((p) => p.gender === 'Gents').length;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === 'New' || o.status === 'Processing').length;
  const recentOrders = [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Top Welcome Bar */}
      <div className="bg-white p-6 rounded-2xl border border-[#E8DFD3] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#801D2D]">
            Proprietor Portal
          </span>
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#0B3B2C]">
            Overview & Quick Metrics
          </h2>
          <p className="font-urdu text-sm text-gray-600 mt-0.5">
            خوش آمدید - میرب کلاتھ ہاؤس مینجمنٹ
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/admin/products/new"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0B3B2C] text-white hover:bg-[#0E4B37] text-xs font-bold transition-colors shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Fabric</span>
          </Link>
          <Link
            to="/admin/orders"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#FAF7F2] text-gray-800 border border-[#E8DFD3] hover:bg-[#E8DFD3] text-xs font-semibold transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>View All Orders ({totalOrders})</span>
          </Link>
          <Link
            to="/admin/blog/new"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#FAF7F2] text-gray-800 border border-[#E8DFD3] hover:bg-[#E8DFD3] text-xs font-semibold transition-colors"
          >
            <span>Write Article</span>
          </Link>
        </div>
      </div>

      {/* Summary KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Products */}
        <div className="bg-white p-5 rounded-2xl border border-[#E8DFD3] shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Products</span>
            <Package className="w-4 h-4 text-[#0B3B2C]" />
          </div>
          <div className="font-mono text-2xl font-bold text-[#1A2421]">
            {totalProducts}
          </div>
          <span className="text-[11px] text-gray-500">Unstitched catalog</span>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-5 rounded-2xl border border-[#E8DFD3] shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Orders</span>
            <ShoppingBag className="w-4 h-4 text-[#801D2D]" />
          </div>
          <div className="font-mono text-2xl font-bold text-[#801D2D]">
            {totalOrders}
          </div>
          <span className="text-[11px] text-gray-500">Recorded orders</span>
        </div>

        {/* Pending / New Orders */}
        <div className="bg-white p-5 rounded-2xl border border-[#E8DFD3] shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Pending Orders</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="font-mono text-2xl font-bold text-amber-600">
            {pendingOrders}
          </div>
          <span className="text-[11px] text-amber-700 font-medium">Needs packing / confirmation</span>
        </div>

        {/* Ladies Suits */}
        <div className="bg-white p-5 rounded-2xl border border-[#E8DFD3] shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Ladies Suits</span>
            <Scissors className="w-4 h-4 text-[#0B3B2C]" />
          </div>
          <div className="font-mono text-2xl font-bold text-[#0B3B2C]">
            {ladiesProducts}
          </div>
          <span className="text-[11px] text-gray-500">Lawn, cotton, 3-piece</span>
        </div>

        {/* Gents Suits */}
        <div className="bg-white p-5 rounded-2xl border border-[#E8DFD3] shadow-2xs space-y-2 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Gents Suits</span>
            <Scissors className="w-4 h-4 text-[#C29B38]" />
          </div>
          <div className="font-mono text-2xl font-bold text-[#1A2421]">
            {gentsProducts}
          </div>
          <span className="text-[11px] text-gray-500">Wash & wear, Boski, etc.</span>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-2xl border border-[#E8DFD3] shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="font-cinzel text-base font-bold text-[#0B3B2C]">
              Recent Customer Orders
            </h3>
            <p className="text-xs text-gray-500">Latest orders submitted via the internal order flow</p>
          </div>
          <Link
            to="/admin/orders"
            className="text-xs font-bold text-[#0B3B2C] hover:text-[#801D2D] inline-flex items-center gap-1"
          >
            <span>View All Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="p-12 text-center text-gray-400 text-xs">
            No customer orders recorded yet. Orders placed by customers on /order/:productId will appear here instantly.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F2] text-gray-600 uppercase font-semibold border-b border-[#E8DFD3]">
                <tr>
                  <th className="py-3 px-4">Order #</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Product Code & Name</th>
                  <th className="py-3 px-4">Qty</th>
                  <th className="py-3 px-4">Total Price</th>
                  <th className="py-3 px-4">City</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-[#0B3B2C]">
                      {order.orderNumber}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-gray-900">{order.customerName}</div>
                      <div className="font-mono text-[11px] text-gray-400">{order.mobileNumber}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-mono text-[10px] bg-gray-100 px-1.5 py-0.5 rounded mr-1">
                        {order.productCode}
                      </span>
                      <span className="text-gray-800 line-clamp-1">{order.productName}</span>
                    </td>
                    <td className="py-3 px-4 font-bold">{order.quantity}</td>
                    <td className="py-3 px-4 font-mono font-semibold text-[#0B3B2C]">
                      {order.totalPrice !== null ? `PKR ${order.totalPrice.toLocaleString()}` : 'Contact for Price'}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{order.city}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          order.status === 'New'
                            ? 'bg-blue-100 text-blue-800'
                            : order.status === 'Confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : order.status === 'Processing'
                            ? 'bg-amber-100 text-amber-800'
                            : order.status === 'Shipped'
                            ? 'bg-purple-100 text-purple-800'
                            : order.status === 'Delivered'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        to={`/admin/orders/${order.id}`}
                        className="text-[#0B3B2C] hover:underline font-semibold text-xs"
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
