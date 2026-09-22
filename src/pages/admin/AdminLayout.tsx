import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  BookOpen,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Shield,
  Plus
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { adminUser, logoutAdmin } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If not logged in, redirect to login
  if (!adminUser) {
    navigate('/admin/login');
    return null;
  }

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Customer Orders', path: '/admin/orders', icon: ShoppingBag },
    { name: 'Blog Posts', path: '/admin/blog', icon: BookOpen },
    { name: 'Business Settings', path: '/admin/settings', icon: Settings },
  ];

  const isActive = (path: string, exact?: boolean) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#F4EFE6] flex">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#0B3B2C] text-[#FAF7F2] border-r border-[#C29B38]/30">
        {/* Brand Header */}
        <div className="p-6 border-b border-[#FAF7F2]/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#FAF7F2] text-[#0B3B2C] flex items-center justify-center font-cinzel font-bold text-lg">
              M
            </div>
            <div>
              <h2 className="font-cinzel text-sm font-bold text-[#FAF7F2] leading-none">
                MEERAB CLOTH
              </h2>
              <span className="text-[10px] text-[#E5C365] font-urdu block mt-0.5">
                ایڈمن پینل
              </span>
            </div>
          </div>
          <span className="text-[10px] bg-[#C29B38]/20 text-[#E5C365] px-1.5 py-0.5 rounded font-mono font-bold">
            PRO
          </span>
        </div>

        {/* User Mini Info */}
        <div className="px-6 py-4 bg-[#FAF7F2]/5 border-b border-[#FAF7F2]/10 text-xs">
          <div className="text-gray-400 text-[10px]">LOGGED IN AS</div>
          <div className="font-semibold text-white truncate">{adminUser.name}</div>
          <div className="text-[11px] text-[#E5C365]">{adminUser.role}</div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path, item.exact);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  active
                    ? 'bg-[#C29B38] text-[#0B3B2C]'
                    : 'text-[#FAF7F2]/80 hover:bg-[#FAF7F2]/10 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Quick External Actions & Logout */}
        <div className="p-4 border-t border-[#FAF7F2]/10 space-y-2">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-[#FAF7F2]/70 hover:text-white hover:bg-[#FAF7F2]/10"
          >
            <span>View Public Store</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-red-300 hover:text-white hover:bg-red-900/40 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content Body */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="bg-white border-b border-[#E8DFD3] h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="font-cinzel text-base sm:text-lg font-bold text-[#0B3B2C]">
              Meerab Cloth House Management Portal
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/products/new"
              className="inline-flex items-center gap-1.5 bg-[#0B3B2C] hover:bg-[#0E4B37] text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Add Product</span>
            </Link>

            <Link
              to="/"
              className="p-2 text-gray-500 hover:text-[#0B3B2C] rounded-lg border border-gray-200 text-xs hidden sm:flex items-center gap-1"
              title="Go to website storefront"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Site</span>
            </Link>
          </div>
        </header>

        {/* Mobile Sidebar Modal */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative w-64 bg-[#0B3B2C] text-[#FAF7F2] flex flex-col h-full z-10">
              <div className="p-4 border-b border-[#FAF7F2]/10 flex items-center justify-between">
                <span className="font-cinzel font-bold text-sm">Meerab Admin</span>
                <button onClick={() => setSidebarOpen(false)} className="text-gray-300">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path, item.exact);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold ${
                        active ? 'bg-[#C29B38] text-[#0B3B2C]' : 'text-gray-200 hover:bg-[#FAF7F2]/10'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-[#FAF7F2]/10">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 text-xs text-red-300 py-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
