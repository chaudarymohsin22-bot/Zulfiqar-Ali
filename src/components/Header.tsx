import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, MessageCircle, Shield, Package } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { setIsSearchOpen, adminUser } = useApp();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Ladies', path: '/ladies' },
    { name: 'Gents', path: '/gents' },
    { name: 'New Arrivals', path: '/new-arrivals' },
    { name: 'My Orders', path: '/my-orders' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFD3] shadow-xs">
      {/* Top Announcement Bar */}
      <div className="bg-[#0B3B2C] text-[#FAF7F2] text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-urdu text-sm">میرب کلاتھ ہاؤس</span>
            <span className="opacity-40">|</span>
            <span className="tracking-wide">Ladies & Gents Unstitched Suits / Fabrics</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/my-orders"
              className="flex items-center gap-1 text-[#E5C365] hover:underline transition-colors"
            >
              <Package className="w-3.5 h-3.5" />
              <span>Track Order</span>
            </Link>
            <span className="opacity-30 hidden sm:inline">|</span>
            <a
              href="https://wa.me/923476430299"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#E5C365] transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span className="font-mono text-xs font-medium">0347 6430299</span>
            </a>
            {adminUser ? (
              <Link
                to="/admin"
                className="inline-flex items-center gap-1 text-[#E5C365] hover:underline"
              >
                <Shield className="w-3 h-3" />
                <span>Admin Panel</span>
              </Link>
            ) : (
              <Link
                to="/admin/login"
                className="opacity-70 hover:opacity-100 transition-opacity text-[11px]"
                title="Store Owner Login"
              >
                Admin
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-lg bg-[#0B3B2C] text-[#FAF7F2] flex items-center justify-center font-cinzel font-bold text-xl border border-[#C29B38]/40 shadow-xs group-hover:scale-105 transition-transform">
              M
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel text-lg sm:text-xl font-bold tracking-wider text-[#0B3B2C] leading-none">
                MEERAB
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#801D2D] font-semibold uppercase">
                Cloth House
              </span>
            </div>
            <div className="hidden lg:block pl-2 border-l border-[#C29B38]/30">
              <span className="font-urdu text-lg text-[#0B3B2C]/90 font-medium">میرب کلاتھ ہاؤس</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? 'text-[#0B3B2C] bg-[#0B3B2C]/8 font-semibold'
                    : 'text-[#3E4A44] hover:text-[#0B3B2C] hover:bg-[#0B3B2C]/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search fabrics and suits"
              className="p-2 text-[#3E4A44] hover:text-[#0B3B2C] hover:bg-[#E8DFD3]/50 rounded-full transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* WhatsApp Direct CTA */}
            <a
              href="https://wa.me/923476430299?text=Hello%20Meerab%20Cloth%20House,%20I%20would%20like%20to%20inquire%20about%20your%20unstitched%20fabrics."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold px-3.5 py-2 rounded-full shadow-xs hover:shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="md:hidden p-2 text-[#3E4A44] hover:text-[#0B3B2C] rounded-md"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8DFD3] bg-[#FAF7F2] px-4 pt-3 pb-6 space-y-2 shadow-lg">
          <div className="flex justify-between items-center pb-2 border-b border-[#E8DFD3]/60 mb-2">
            <span className="font-urdu text-base text-[#0B3B2C]">میرب کلاتھ ہاؤس</span>
            <span className="text-xs text-[#6B7280]">0347 6430299</span>
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-md text-base font-medium ${
                isActive(link.path)
                  ? 'text-[#0B3B2C] bg-[#0B3B2C]/10 font-semibold'
                  : 'text-[#3E4A44] hover:bg-[#E8DFD3]/40'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-[#E8DFD3] flex flex-col gap-2">
            <a
              href="https://wa.me/923476430299"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white font-medium py-2.5 rounded-lg"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>WhatsApp (0347 6430299)</span>
            </a>
            {adminUser ? (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 text-sm text-[#0B3B2C] font-semibold bg-[#E8DFD3]/50 rounded-lg"
              >
                Go to Admin Dashboard
              </Link>
            ) : (
              <Link
                to="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 text-xs text-[#6B7280] hover:text-[#0B3B2C]"
              >
                Admin Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
