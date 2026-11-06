import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, CheckCircle2, AlertTriangle, Loader2, ArrowRight, Compass, Leaf } from 'lucide-react';
import { useAuth } from '../utils/AuthContext';

interface LoginViewProps {
  onNavigate: (tab: 'explore' | 'login' | 'register' | 'forgot' | 'profile') => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onNavigate }) => {
  const { login, loginWithGoogle } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      await login(email, password);
      setSuccessMsg('Berhasil masuk! Mengarahkan ke Jelantara...');
      setTimeout(() => {
        onNavigate('explore');
      }, 1000);
    } catch (err: any) {
      console.error(err);
      let msg = err.message || 'Terjadi kesalahan saat masuk.';
      if (msg.includes('operation-not-allowed')) {
        msg = 'Silakan periksa kembali email dan password Anda atau gunakan tombol Masuk Cepat di bawah.';
      } else if (msg.includes('invalid-credential') || msg.includes('wrong-password') || msg.includes('user-not-found')) {
        msg = 'Email atau password salah.';
      } else if (msg.includes('too-many-requests')) {
        msg = 'Terlalu banyak percobaan gagal. Silakan coba beberapa saat lagi.';
      }
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);
    try {
      await loginWithGoogle();
      setSuccessMsg('Berhasil masuk dengan Google! Mengarahkan...');
      setTimeout(() => {
        onNavigate('explore');
      }, 1000);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Gagal masuk dengan Google.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#F5F5ED] relative overflow-hidden font-sans">
      {/* Background Decorative Neomorphic Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-[#004D3B]/15 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tl from-[#006B52]/15 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full bg-[#F5F5ED] rounded-[40px] shadow-[20px_20px_40px_rgba(0,77,59,0.08),_-20px_-20px_40px_rgba(255,255,255,0.95)] border border-[#004D3B]/10 overflow-hidden relative z-10 p-8 sm:p-10 space-y-8">
        
        {/* Header / Branding */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-[#F5F5ED] rounded-3xl flex items-center justify-center mx-auto shadow-[8px_8px_16px_rgba(0,77,59,0.1),_-8px_-8px_16px_rgba(255,255,255,0.9)] border border-white/50 text-[#004D3B]">
            <Compass className="w-10 h-10 animate-spin-slow text-[#004D3B]" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#006B52] uppercase tracking-widest mb-1">
              <Leaf className="w-3.5 h-3.5" />
              <span>Jelantara Nusantara</span>
            </div>
            <h1 className="text-3xl font-black text-[#004D3B] tracking-tight">Selamat Datang</h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xs mx-auto">
              Lanjutkan petualangan alam Nusantaramu bersama Jelantara.
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

        {/* Google Sign In Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-[#F5F5ED] hover:bg-white text-gray-800 font-bold py-4 px-6 rounded-2xl shadow-[6px_6px_12px_rgba(0,77,59,0.08),_-6px_-6px_12px_rgba(255,255,255,0.9)] border border-gray-200 transition transform active:scale-[0.98] flex items-center justify-center gap-3 text-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          <span>Lanjutkan dengan Google</span>
        </button>

        <div className="relative flex items-center justify-center my-4">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
          <span className="relative bg-[#F5F5ED] px-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Atau dengan Email</span>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-[#004D3B] uppercase tracking-wider ml-1">Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-4 top-4" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                required
                className="w-full bg-[#F5F5ED] text-[#004D3B] placeholder-gray-400 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-medium shadow-[inset_4px_4px_8px_rgba(0,77,59,0.06),_inset_-4px_-4px_8px_rgba(255,255,255,0.9)] border border-transparent focus:border-[#006B52] outline-none transition"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between ml-1 mr-1">
              <label className="block text-[11px] font-bold text-[#004D3B] uppercase tracking-wider">Password</label>
              <button
                type="button"
                onClick={() => onNavigate('forgot')}
                className="text-xs font-bold text-[#006B52] hover:underline"
              >
                Lupa password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-4 top-4" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                required
                className="w-full bg-[#F5F5ED] text-[#004D3B] placeholder-gray-400 rounded-2xl pl-11 pr-12 py-3.5 text-sm font-medium shadow-[inset_4px_4px_8px_rgba(0,77,59,0.06),_inset_-4px_-4px_8px_rgba(255,255,255,0.9)] border border-transparent focus:border-[#006B52] outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#004D3B] to-[#006B52] hover:from-[#00382b] hover:to-[#00543f] text-white font-bold py-4 px-6 rounded-2xl shadow-[8px_8px_16px_rgba(0,77,59,0.2),_-8px_-8px_16px_rgba(255,255,255,0.8)] transition transform active:scale-[0.98] flex items-center justify-between mt-2"
          >
            <span className="flex-grow text-center text-sm tracking-wide">Masuk ke Jelantara</span>
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5 text-emerald-200" />}
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center pt-2 space-y-3">
          <p className="text-xs text-gray-600">
            Belum punya akun Jelantara?{' '}
            <button
              type="button"
              onClick={() => onNavigate('register')}
              className="font-bold text-[#006B52] hover:underline"
            >
              Daftar di sini
            </button>
          </p>

          <div className="text-[10px] tracking-widest text-gray-400 uppercase font-semibold pt-2">
            JELAJAH &bull; NUSANTARA &bull; ALAM INDONESIA
          </div>
        </div>

      </div>
    </div>
  );
};
