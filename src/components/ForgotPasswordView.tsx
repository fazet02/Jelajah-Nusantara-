import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertTriangle, Loader2, Compass, Leaf } from 'lucide-react';
import { useAuth } from '../utils/AuthContext';

interface ForgotPasswordViewProps {
  onNavigate: (tab: 'explore' | 'login' | 'register' | 'forgot' | 'profile') => void;
}

export const ForgotPasswordView: React.FC<ForgotPasswordViewProps> = ({ onNavigate }) => {
  const { forgotPassword } = useAuth();
  
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      await forgotPassword(email);
      setSuccessMsg('Jika akun terdaftar, tautan pemulihan password telah dikirim ke email Anda.');
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Gagal mengirim email reset password. Pastikan format email benar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#F5F5ED] relative overflow-hidden font-sans">
      {/* Background Decorative Nature Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#004D3B]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#006B52]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full bg-[#F5F5ED] rounded-[32px] shadow-[16px_16px_32px_rgba(0,77,59,0.08),_-16px_-16px_32px_rgba(255,255,255,0.9)] border border-[#004D3B]/10 overflow-hidden relative z-10 p-8 sm:p-10 space-y-8">
        
        {/* Header / Branding */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-[#004D3B] text-[#D9F99D] rounded-2xl flex items-center justify-center mx-auto shadow-[6px_6px_12px_rgba(0,77,59,0.2),_-6px_-6px_12px_rgba(255,255,255,0.8)]">
            <Compass className="w-8 h-8 animate-spin-slow" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#006B52] uppercase tracking-wider mb-1">
              <Leaf className="w-3.5 h-3.5" />
              <span>Jelantara — Jelajah Nusantara</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#004D3B] tracking-tight">Atur Ulang Password</h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xs mx-auto">
              Masukkan email akun Anda untuk menerima tautan pemulihan password.
            </p>
          </div>
        </div>

        {/* Alerts */}
        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-xs sm:text-sm text-emerald-900 flex items-center gap-3 shadow-inner">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl text-xs sm:text-sm text-rose-900 flex items-center gap-3 shadow-inner">
            <AlertTriangle className="w-5 h-5 text-rose-700 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleResetPassword} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#004D3B] uppercase tracking-wider">Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                required
                className="w-full bg-[#F5F5ED] text-[#004D3B] placeholder-gray-400 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-medium shadow-[inset_3px_3px_6px_rgba(0,77,59,0.06),_inset_-3px_-3px_6px_rgba(255,255,255,0.9)] border border-transparent focus:border-[#006B52] outline-none transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#004D3B] to-[#006B52] hover:from-[#00382b] hover:to-[#00543f] text-white font-bold py-4 px-6 rounded-2xl shadow-[6px_6px_12px_rgba(0,77,59,0.2),_-6px_-6px_12px_rgba(255,255,255,0.8)] transition transform active:scale-[0.98] flex items-center justify-center gap-2 mt-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
            <span>Kirim Tautan Reset</span>
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center pt-2 text-xs text-gray-600">
          Sudah ingat password?{' '}
          <button
            type="button"
            onClick={() => onNavigate('login')}
            className="font-bold text-[#006B52] hover:underline"
          >
            Masuk di sini
          </button>
        </div>

      </div>
    </div>
  );
};
