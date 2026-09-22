import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Quick Prompt Popover */}
      {isOpen && (
        <div className="mb-3 w-72 bg-white rounded-xl shadow-xl border border-[#E8DFD3] p-4 text-xs animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex justify-between items-start mb-2 pb-2 border-b border-gray-100">
            <div>
              <span className="font-bold text-[#0B3B2C] text-sm block">Meerab Cloth House</span>
              <span className="text-[11px] text-gray-500 font-urdu">میرب کلاتھ ہاؤس - واٹس ایپ</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-gray-600 mb-3 leading-relaxed">
            Need help selecting unstitched fabrics or placing a custom order? Chat directly with us on WhatsApp.
          </p>
          <a
            href="https://wa.me/923476430299?text=Hello%20Meerab%20Cloth%20House,%20I%20have%20an%20inquiry%20regarding%20unstitched%20fabrics."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-2 px-3 rounded-lg font-semibold transition-colors"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Open WhatsApp (+923476430299)</span>
          </a>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Contact Meerab Cloth House on WhatsApp"
        className="w-13 h-13 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
      >
        <MessageCircle className="w-7 h-7 fill-white" />
      </button>
    </div>
  );
};
