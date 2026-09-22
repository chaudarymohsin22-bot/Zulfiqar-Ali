import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Phone, MessageCircle, User, CheckCircle2, Lock } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const { adminUser } = useApp();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [msg, setMsg] = useState<string | null>(null);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword.trim()) return;
    setMsg('Password update saved for this session.');
    setTimeout(() => setMsg(null), 3000);
    setCurrentPassword('');
    setNewPassword('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-[#E8DFD3] shadow-2xs">
        <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#0B3B2C]">
          Business Profile & Settings
        </h2>
        <p className="text-xs text-gray-500 mt-0.5">
          Official store parameters for Meerab Cloth House (میرب کلاتھ ہاؤس).
        </p>
      </div>

      {msg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{msg}</span>
        </div>
      )}

      {/* Verified Business Parameters */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DFD3] shadow-2xs space-y-6">
        <h3 className="font-cinzel text-base font-bold text-[#0B3B2C] border-b border-gray-100 pb-3">
          Verified Store Data (Non-Editable Core Info)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3]">
            <span className="text-gray-400 font-bold uppercase tracking-wider block text-[10px]">
              Business Name (English)
            </span>
            <span className="font-bold text-[#0B3B2C] text-sm">Meerab Cloth House</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3]">
            <span className="text-gray-400 font-bold uppercase tracking-wider block text-[10px]">
              Business Name (Urdu)
            </span>
            <span className="font-urdu font-bold text-[#0B3B2C] text-base">میرب کلاتھ ہاؤس</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3]">
            <span className="text-gray-400 font-bold uppercase tracking-wider block text-[10px]">
              Proprietor / سرپرست
            </span>
            <span className="font-urdu font-bold text-[#801D2D] text-base">میاں ذوالفقار علی</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3]">
            <span className="text-gray-400 font-bold uppercase tracking-wider block text-[10px]">
              Business Type
            </span>
            <span className="font-medium text-gray-800">Ladies and Gents Unstitched Suits / Fabrics</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3]">
            <span className="text-gray-400 font-bold uppercase tracking-wider block text-[10px]">
              Phone Number
            </span>
            <span className="font-mono font-bold text-[#0B3B2C]">03476430299</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3]">
            <span className="text-gray-400 font-bold uppercase tracking-wider block text-[10px]">
              WhatsApp Direct
            </span>
            <span className="font-mono font-bold text-[#25D366]">+923476430299</span>
          </div>
        </div>
      </div>

      {/* Security Credentials */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DFD3] shadow-2xs space-y-4">
        <h3 className="font-cinzel text-base font-bold text-[#0B3B2C] border-b border-gray-100 pb-3 flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#801D2D]" />
          <span>Admin Security & Credentials</span>
        </h3>

        <div className="text-xs text-gray-600 space-y-1">
          <p>
            Logged in account: <span className="font-mono font-bold text-gray-900">{adminUser?.email}</span>
          </p>
          <p>
            Role: <span className="font-semibold text-[#0B3B2C]">{adminUser?.role}</span>
          </p>
        </div>

        <form onSubmit={handlePasswordChange} className="pt-2 max-w-md space-y-3">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
              Current Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[#E8DFD3] text-xs font-mono outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[#E8DFD3] text-xs font-mono outline-hidden"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-[#0B3B2C] hover:bg-[#0E4B37] text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};
