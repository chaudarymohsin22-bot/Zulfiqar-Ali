import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { Shield, Lock, Mail, AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('admin@meerabcloth.com');
  const [password, setPassword] = useState('AdminPassword2026!');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { setAdminUser } = useApp();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await api.adminLogin(email, password);
      setAdminUser(response.user);
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-[#0B3B2C] mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Storefront</span>
        </Link>

        <div className="w-14 h-14 rounded-2xl bg-[#0B3B2C] text-[#FAF7F2] border border-[#C29B38]/50 flex items-center justify-center mx-auto shadow-md font-cinzel font-bold text-2xl mb-3">
          M
        </div>
        <h2 className="font-cinzel text-2xl font-bold text-[#0B3B2C]">
          Meerab Cloth House
        </h2>
        <p className="font-urdu text-lg text-[#801D2D] mb-1">میرب کلاتھ ہاؤس - ایڈمن لاگ ان</p>
        <p className="text-xs text-gray-500">Store Management & Order Administration Portal</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl sm:px-10 border border-[#E8DFD3]">
          
          {/* Default Credentials Notice */}
          <div className="mb-6 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs">
            <span className="font-bold block mb-1">Admin Access Credentials:</span>
            <div className="font-mono text-[11px] space-y-0.5">
              <p>Email: <span className="font-bold">admin@meerabcloth.com</span></p>
              <p>Password: <span className="font-bold">AdminPassword2026!</span></p>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-[#E8DFD3] text-sm focus:border-[#0B3B2C] outline-hidden font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-[#E8DFD3] text-sm focus:border-[#0B3B2C] outline-hidden font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-[#0B3B2C] hover:bg-[#0E4B37] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-75"
            >
              <Shield className="w-4 h-4" />
              <span>{loading ? 'Authenticating...' : 'Sign In to Admin Panel'}</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-100 text-center text-xs text-gray-400">
            Proprietor: میاں ذوالفقار علی • Phone: 03476430299
          </div>
        </div>
      </div>
    </div>
  );
};
