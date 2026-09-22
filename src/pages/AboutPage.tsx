import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Scissors, ShieldCheck, Heart } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Hero Header */}
      <div className="bg-[#0B3B2C] text-[#FAF7F2] rounded-2xl p-8 sm:p-12 border-b-4 border-[#C29B38] text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#E5C365]">
          Authentic Unstitched Textiles
        </span>
        <h1 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-tight">
          About Meerab Cloth House
        </h1>
        <p className="font-urdu text-2xl sm:text-3xl text-[#E5C365] font-semibold">
          میرب کلاتھ ہاؤس
        </p>
        <p className="text-sm text-[#FAF7F2]/80 max-w-xl mx-auto leading-relaxed font-light pt-2">
          Dedicated exclusively to quality ladies and gents unstitched fabrics, supporting traditional Pakistani textile craft with personalized customer care.
        </p>
      </div>

      {/* Business Profile & Verified Information */}
      <div className="bg-white rounded-2xl border border-[#E8DFD3] p-6 sm:p-10 shadow-xs space-y-8">
        <div>
          <h2 className="font-cinzel text-xl font-bold text-[#0B3B2C] mb-3">
            Business Profile & Leadership
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed font-light mb-6">
            Meerab Cloth House (میرب کلاتھ ہاؤس) is operated under the leadership and proprietorship of <strong>میاں ذوالفقار علی (Mian Zulfiqar Ali)</strong>. We specialize in sourcing and providing premium unstitched suits and fabrics for both ladies and gentlemen across Pakistan.
          </p>
        </div>

        {/* Fact Sheet (Only real, verified info) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E8DFD3]">
          <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3]/80">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">
              Business Name (English)
            </span>
            <span className="text-sm font-bold text-[#0B3B2C]">Meerab Cloth House</span>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3]/80">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">
              Business Name (Urdu)
            </span>
            <span className="font-urdu text-base font-bold text-[#0B3B2C]">میرب کلاتھ ہاؤس</span>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3]/80">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">
              Proprietor / سرپرست
            </span>
            <span className="font-urdu text-base font-bold text-[#801D2D]">میاں ذوالفقار علی</span>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3]/80">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">
              Core Specialization
            </span>
            <span className="text-sm font-bold text-[#1A2421]">Ladies and Gents Unstitched Suits / Fabrics</span>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3]/80">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">
              Phone Contact
            </span>
            <span className="font-mono text-sm font-bold text-[#1A2421]">03476430299</span>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3]/80">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">
              Official WhatsApp
            </span>
            <span className="font-mono text-sm font-bold text-[#25D366]">+923476430299</span>
          </div>
        </div>

        {/* Core Principles */}
        <div className="pt-6 border-t border-[#E8DFD3] space-y-4">
          <h3 className="font-cinzel text-base font-bold text-[#0B3B2C]">
            Our Textile Focus
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 space-y-1">
              <Scissors className="w-5 h-5 text-[#0B3B2C] mb-2" />
              <h4 className="text-xs font-bold text-gray-900">Pure Unstitched Weaves</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                We believe unstitched fabric gives the wearer true tailoring freedom to match exact sizing and collar styling.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 space-y-1">
              <ShieldCheck className="w-5 h-5 text-[#801D2D] mb-2" />
              <h4 className="text-xs font-bold text-gray-900">Direct Customer Trust</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Every fabric is inspected for colorfastness, thread density, and weave uniformity prior to shipping.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 space-y-1">
              <Heart className="w-5 h-5 text-[#C29B38] mb-2" />
              <h4 className="text-xs font-bold text-gray-900">Personal Assistance</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Connect directly with the proprietor or store team on WhatsApp for yardage guidance and seasonal advice.
              </p>
            </div>
          </div>
        </div>

        {/* Direct WhatsApp Call to Action */}
        <div className="pt-6 border-t border-[#E8DFD3] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-sm text-[#0B3B2C]">Have a fabric inquiry or custom order?</h4>
            <p className="text-xs text-gray-500">Call or message us directly on WhatsApp anytime.</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:03476430299"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#E8DFD3] hover:bg-gray-50 text-xs font-bold text-gray-700"
            >
              <Phone className="w-4 h-4 text-[#0B3B2C]" />
              <span>03476430299</span>
            </a>
            <a
              href="https://wa.me/923476430299"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold shadow-xs"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
