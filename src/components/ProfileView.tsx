import React, { useState } from 'react';
import { User as UserIcon, ShieldCheck, LogOut, CheckCircle2, AlertTriangle, Compass, Mail } from 'lucide-react';
import { useAuth } from '../utils/AuthContext';

interface ProfileViewProps {
  onNavigate: (tab: 'explore' | 'login' | 'register' | 'forgot' | 'profile') => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onNavigate }) => {
  const { currentUser, userProfile, isAdmin, logout, resendVerification } = useAuth();
  
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      await resendVerification();
      setSuccessMsg('Email verifikasi ulang telah dikirim.');
    } catch (err: any) {
      setErrorMsg('Gagal mengirim email verifikasi. Coba beberapa saat lagi.');
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      onNavigate('explore');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center border border-gray-200 shadow-sm space-y-4">
          <UserIcon className="w-12 h-12 text-gray-400 mx-auto" />
          <h3 className="text-lg font-bold text-gray-900">Belum Masuk</h3>
          <p className="text-xs text-gray-500">Anda harus masuk terlebih dahulu untuk mengakses halaman profil.</p>
          <div className="flex gap-3 justify-center pt-2">
            <button
              onClick={() => onNavigate('login')}
              className="bg-emerald-900 text-white text-xs font-bold px-6 py-3 rounded-full transition hover:bg-emerald-800"
            >
              Masuk
            </button>
            <button
              onClick={() => onNavigate('register')}
              className="bg-gray-100 text-gray-800 text-xs font-bold px-6 py-3 rounded-full transition hover:bg-gray-200"
            >
              Daftar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-emerald-950 via-emerald-950 to-teal-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px]"></div>

      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10 border border-emerald-900/20">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-900 text-white p-8 text-center space-y-2">
          <div className="w-20 h-20 bg-emerald-800 text-amber-300 rounded-full flex items-center justify-center text-2xl font-black mx-auto shadow-inner border-4 border-emerald-700/50">
            {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : currentUser.email?.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-2xl font-black tracking-tight">{currentUser.displayName || 'Pengguna Jelantara'}</h2>
          <p className="text-xs text-emerald-200 flex items-center justify-center gap-1">
            <Mail className="w-3.5 h-3.5" />
            <span>{currentUser.email}</span>
          </p>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6 bg-gray-50/50">
          
          {successMsg && (
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-xs sm:text-sm text-emerald-900 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl text-xs sm:text-sm text-rose-900 flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-700 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="text-xs font-bold text-gray-500 uppercase">Nama Panggilan</span>
              <span className="text-sm font-bold text-gray-900">{currentUser.displayName || '-'}</span>
            </div>

            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="text-xs font-bold text-gray-500 uppercase">Email</span>
              <span className="text-sm font-medium text-gray-900">{currentUser.email}</span>
            </div>

            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="text-xs font-bold text-gray-500 uppercase">Status Email</span>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                currentUser.emailVerified ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'
              }`}>
                {currentUser.emailVerified ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> : <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />}
                <span>{currentUser.emailVerified ? 'Terverifikasi' : 'Belum Verifikasi'}</span>
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase">Role Akun</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-900">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
                <span>{isAdmin ? 'Admin' : 'Petualang / User'}</span>
              </span>
            </div>
          </div>

          {!currentUser.emailVerified && (
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-xs text-amber-900 space-y-2 text-center">
              <p>Email Anda belum diverifikasi. Klik tombol di bawah untuk mengirim ulang email verifikasi.</p>
              <button
                onClick={handleResend}
                className="bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition shadow"
              >
                Kirim Ulang Email Verifikasi
              </button>
            </div>
          )}

          <div className="space-y-3 pt-2">
            <button
              onClick={() => onNavigate('explore')}
              className="w-full bg-emerald-900 hover:bg-emerald-800 text-white font-bold py-3.5 px-6 rounded-2xl shadow transition flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-emerald-300" />
              <span>Kembali Berjelajah</span>
            </button>

            <button
              onClick={handleLogout}
              disabled={loading}
              className="w-full bg-rose-700 hover:bg-rose-800 text-white font-bold py-3.5 px-6 rounded-2xl shadow transition flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Keluar Akun (Logout)</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
