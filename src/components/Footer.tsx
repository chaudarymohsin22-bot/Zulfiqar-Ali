import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B3B2C] text-[#FAF7F2] border-t-4 border-[#C29B38] pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-[#FAF7F2]/10">
          
          {/* Brand & Proprietor Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-[#FAF7F2] text-[#0B3B2C] flex items-center justify-center font-cinzel font-bold text-xl">
                M
              </div>
              <div>
                <h3 className="font-cinzel text-xl font-bold tracking-wider text-[#FAF7F2]">
                  MEERAB CLOTH HOUSE
                </h3>
                <p className="font-urdu text-lg text-[#E5C365]">میرب کلاتھ ہاؤس</p>
              </div>
            </div>

            <p className="text-sm text-[#FAF7F2]/80 leading-relaxed max-w-sm">
              Ladies & Gents Unstitched Suits / Fabrics. Premium unstitched textiles for custom tailoring, celebrating Pakistani heritage and contemporary craftsmanship.
            </p>

            <div className="pt-2">
              <span className="text-xs uppercase tracking-widest text-[#E5C365]/80 font-semibold block mb-1">
                Proprietor / پروپرائیٹر
              </span>
              <p className="font-urdu text-base text-[#FAF7F2] font-medium">
                میاں ذوالفقار علی
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-cinzel text-sm uppercase tracking-widest text-[#E5C365] font-semibold">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-[#FAF7F2]/80">
              <li>
                <Link to="/" className="hover:text-[#FAF7F2] hover:translate-x-1 inline-block transition-transform">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/ladies" className="hover:text-[#FAF7F2] hover:translate-x-1 inline-block transition-transform">
                  Ladies Collection
                </Link>
              </li>
              <li>
                <Link to="/gents" className="hover:text-[#FAF7F2] hover:translate-x-1 inline-block transition-transform">
                  Gents Collection
                </Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="hover:text-[#FAF7F2] hover:translate-x-1 inline-block transition-transform">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/my-orders" className="text-[#E5C365] hover:text-[#FAF7F2] hover:translate-x-1 inline-block transition-transform font-medium">
                  Track Order / My Orders
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-[#FAF7F2] hover:translate-x-1 inline-block transition-transform">
                  Fabric Blog & Guides
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#FAF7F2] hover:translate-x-1 inline-block transition-transform">
                  About Meerab Cloth House
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#FAF7F2] hover:translate-x-1 inline-block transition-transform">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-cinzel text-sm uppercase tracking-widest text-[#E5C365] font-semibold">
              Direct Contact
            </h4>
            <p className="text-sm text-[#FAF7F2]/80">
              For fabric inquiries, customized length cuts, and order confirmations:
            </p>

            <div className="space-y-2.5">
              <a
                href="tel:03476430299"
                className="flex items-center gap-3 p-3 rounded-lg bg-[#FAF7F2]/5 hover:bg-[#FAF7F2]/10 transition-colors border border-[#FAF7F2]/10"
              >
                <div className="w-8 h-8 rounded-full bg-[#FAF7F2]/10 flex items-center justify-center text-[#E5C365]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#FAF7F2]/60 block">Phone / کال</span>
                  <span className="font-mono text-sm font-semibold text-[#FAF7F2]">03476430299</span>
                </div>
              </a>

              <a
                href="https://wa.me/923476430299"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/30 transition-colors border border-[#25D366]/40"
              >
                <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white">
                  <MessageCircle className="w-4 h-4 fill-white" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#25D366] font-semibold block">WhatsApp / واٹس ایپ</span>
                  <span className="font-mono text-sm font-semibold text-[#FAF7F2]">+923476430299</span>
                </div>
                <ArrowUpRight className="w-4 h-4 ml-auto text-[#25D366]" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-[#FAF7F2]/60 gap-4">
          <p>© {new Date().getFullYear()} Meerab Cloth House (میرب کلاتھ ہاؤس). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/my-orders" className="hover:text-[#E5C365]">Track Order</Link>
            <span>•</span>
            <Link to="/about" className="hover:text-[#FAF7F2]">About</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-[#FAF7F2]">Contact</Link>
            <span>•</span>
            <Link to="/admin/login" className="hover:text-[#E5C365]">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
