import React, { useState } from 'react';
import { Phone, MessageCircle, Send, CheckCircle2, User, Mail, FileText } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    // Compose WhatsApp message directly to +923476430299
    const waText = `Hello Meerab Cloth House,\n\nInquiry from Website Contact Form:\nName: ${name}\nPhone: ${phone}\nMessage: ${message}`;
    const url = `https://wa.me/923476430299?text=${encodeURIComponent(waText)}`;
    window.open(url, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Page Header */}
      <div className="bg-[#0B3B2C] text-[#FAF7F2] rounded-2xl p-8 sm:p-12 border-b-4 border-[#C29B38] text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#E5C365]">
          Direct Communication
        </span>
        <h1 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-tight">
          Contact Meerab Cloth House
        </h1>
        <p className="font-urdu text-2xl text-[#E5C365] font-semibold">
          رابطہ کریں - میرب کلاتھ ہاؤس
        </p>
        <p className="text-sm text-[#FAF7F2]/80 max-w-lg mx-auto leading-relaxed font-light">
          Get in touch with us for unstitched fabric inquiries, custom cut lengths, product code confirmation, or order updates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Contact Cards Info */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-[#E8DFD3] shadow-2xs space-y-4">
            <h2 className="font-cinzel text-base font-bold text-[#0B3B2C]">
              Direct Contact Details
            </h2>

            <div className="space-y-3">
              <a
                href="https://wa.me/923476430299"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 fill-white" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#1EBE5D] tracking-wider block">
                    WhatsApp Chat / واٹس ایپ
                  </span>
                  <span className="font-mono text-sm font-bold text-[#1A2421] group-hover:text-[#1EBE5D]">
                    +923476430299
                  </span>
                </div>
              </a>

              <a
                href="tel:03476430299"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3] hover:bg-[#E8DFD3]/50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-[#0B3B2C] text-white flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider block">
                    Phone Call / فون
                  </span>
                  <span className="font-mono text-sm font-bold text-[#1A2421] group-hover:text-[#0B3B2C]">
                    03476430299
                  </span>
                </div>
              </a>
            </div>

            <div className="pt-3 border-t border-[#E8DFD3] text-xs space-y-2 text-gray-600">
              <div className="flex justify-between">
                <span className="text-gray-400">Proprietor:</span>
                <span className="font-urdu font-semibold text-gray-900">میاں ذوالفقار علی</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Specialization:</span>
                <span className="font-medium text-gray-900">Ladies & Gents Unstitched</span>
              </div>
            </div>
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="md:col-span-7">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DFD3] shadow-2xs">
            <h2 className="font-cinzel text-lg font-bold text-[#0B3B2C] mb-1">
              Send an Inquiry
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              Fill out this form and we'll instantly connect with you on WhatsApp with answers to your fabric questions.
            </p>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-sm text-emerald-900">Message Prepared</h4>
                <p className="text-xs text-emerald-700">
                  Your inquiry has been opened on WhatsApp (+923476430299). We will respond promptly!
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 text-xs text-emerald-800 underline font-semibold"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tariq Mehmood"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD3] text-sm focus:border-[#0B3B2C] outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Your Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 03476430299"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD3] text-sm font-mono focus:border-[#0B3B2C] outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Message / Fabric Inquiry
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Which fabric or product code are you interested in? Any specific color or quantity questions?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD3] text-sm focus:border-[#0B3B2C] outline-hidden resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#0B3B2C] hover:bg-[#0E4B37] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>Send via WhatsApp (+923476430299)</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
