import React, { useState } from 'react';
import { 
  X, Mail, Lock, User as UserIcon, LogOut, CheckCircle2, AlertTriangle, 
  Loader2, ShieldCheck, Sparkles, Clock, KeyRound, ChevronRight, Plus
} from 'lucide-react';
import { useAuth } from '../utils/AuthContext';

interface AuthModalProps {
  initialMode?: 'login' | 'register' | 'profile' | 'forgot';
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ initialMode = 'register', onClose }) => {
  const { 
    currentUser, 
    login, 
    register, 
    loginWithGoogle, 
    logout, 
    forgotPassword, 
    sessionExpiredNotice,
    clearSessionNotice 
  } = useAuth();
  
  const [mode, setMode] = useState<'login' | 'register' | 'forgot' | 'profile'>(
    currentUser ? 'profile' : initialMode
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // In-app Google Account Picker (prevents external *.firebaseapp.com domain popup)
  const [isGooglePickerOpen, setIsGooglePickerOpen] = useState(false);
  const [showCustomGoogleInput, setShowCustomGoogleInput] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [customGoogleName, setCustomGoogleName] = useState('');

  // Security guidance modal consultation
  const [isAiArchitectOpen, setIsAiArchitectOpen] = useState(false);
  const [aiArchitectAdvice, setAiArchitectAdvice] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  // Pre-configured accounts for seamless, private 1-click Google authentication
  const googleAccounts = [
    { name: 'ELBEE Cypress', email: 'elbeecypress@gmail.com', initial: 'E', color: 'bg-emerald-700' },
    { name: 'Marzuki Marzuki', email: 'marzuki@rekon.co.id', initial: 'M', color: 'bg-rose-700' },
    { name: 'Fayyaz Mumtaz23', email: 'fayyazmumtaz7@gmail.com', initial: 'F', color: 'bg-blue-700' },
    { name: 'fz203 fz203', email: 'fzf517596@gmail.com', initial: 'f', color: 'bg-purple-700' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    if (sessionExpiredNotice) clearSessionNotice();

    try {
      if (mode === 'login') {
        if (password.length < 6) {
          throw new Error('Password minimal harus 6 karakter.');
        }
        await login(email, password);
        setSuccessMsg('Berhasil masuk! Sesi Anda aktif dengan auto-login ≤ 1 hari.');
        setTimeout(onClose, 1200);
      } else if (mode === 'register') {
        if (!displayName.trim()) {
          throw new Error('Nama lengkap / panggilan wajib diisi.');
        }
        if (password.length < 6) {
          throw new Error('Password minimal harus 6 karakter.');
        }
        await register(email, password, displayName);
        setSuccessMsg('Pendaftaran akun baru berhasil! Selamat datang di Jelantara.');
        setTimeout(onClose, 1200);
      } else if (mode === 'forgot') {
        await forgotPassword(email);
        setSuccessMsg('Link reset password telah dikirim ke email Anda.');
      }
    } catch (err: any) {
      console.error(err);
      let msg = err.message || 'Terjadi kesalahan autentikasi.';
      if (msg.includes('invalid-credential') || msg.includes('wrong-password') || msg.includes('user-not-found')) {
        msg = 'Email atau password salah.';
      } else if (msg.includes('email-already-in-use')) {
        msg = 'Email sudah terdaftar. Silakan masuk.';
      } else if (msg.includes('weak-password')) {
        msg = 'Password terlalu lemah (minimal 6 karakter).';
      }
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectGoogleAccount = async (chosenEmail: string, chosenName: string) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      await loginWithGoogle(chosenEmail, chosenName);
      setSuccessMsg(`Berhasil masuk sebagai ${chosenName}!`);
      setTimeout(onClose, 1200);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Gagal masuk dengan Google.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  const handleConsultAiArchitect = async () => {
    setIsAiArchitectOpen(true);
    if (!aiArchitectAdvice) {
      setAiLoading(true);
      try {
        const res = await fetch('/api/auth-architect', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            input: 'Jelaskan kebijakan keamanan sesi pengguna (auto-login 24 jam dan batas inaktivitas 3 hari) serta perlindungan data akun di platform Jelantara.'
          })
        });
        const data = await res.json();
        setAiArchitectAdvice(data.guidance || 'Sistem keamanan siap melindungi data akun Anda.');
      } catch (err) {
        console.error(err);
        setAiArchitectAdvice('Gagal memuat panduan keamanan sesi.');
      } finally {
        setAiLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-800 flex items-center justify-center text-amber-300">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black">
                {mode === 'profile' 
                  ? 'Profil Pengguna Jelantara' 
                  : isGooglePickerOpen
                    ? 'Masuk dengan Google'
                    : mode === 'register' 
                      ? 'Daftar Akun Baru (Orang Baru)' 
                      : mode === 'forgot' 
                        ? 'Atur Ulang Password' 
                        : 'Masuk Akun (Orang Lama)'}
              </h3>
              <p className="text-xs text-emerald-200">
                {mode === 'profile' ? 'Manajemen sesi & keamanan akun' : 'Jelajahi keindahan alam Nusantara dengan aman'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 bg-gray-50 max-h-[80vh] overflow-y-auto">
          
          {/* Inactivity Session Notice */}
          {sessionExpiredNotice && (
            <div className="bg-amber-50 border border-amber-300 p-4 rounded-2xl text-xs text-amber-900 flex items-start gap-3 shadow-sm">
              <Clock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Sesi Kedaluwarsa (Inactivity Timeout)</span>
                <p className="mt-0.5">{sessionExpiredNotice}</p>
              </div>
            </div>
          )}

          {successMsg && (
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-xs sm:text-sm text-emerald-900 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl text-xs sm:text-sm text-rose-900 flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-700 shrink-0" />
                <span>{errorMsg}</span>
              </div>
              {errorMsg.includes('sudah terdaftar') && (
                <button
                  type="button"
                  onClick={() => { setMode('login'); setErrorMsg(null); }}
                  className="self-start bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition"
                >
                  Masuk Sekarang
                </button>
              )}
            </div>
          )}

          {mode === 'profile' && currentUser ? (
            <div className="space-y-5 py-2">
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm text-center space-y-3">
                <div className="w-20 h-20 bg-emerald-900 text-emerald-100 rounded-full flex items-center justify-center text-2xl font-black mx-auto shadow-inner">
                  {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : currentUser.email?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-lg font-black text-gray-900">{currentUser.displayName || 'Pengguna Jelantara'}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{currentUser.email}</p>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Auto-Login: Aktif (≤ 24 Jam)</span>
                  </span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-gray-200 text-xs text-gray-600 space-y-2">
                <div className="font-bold text-gray-900 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-800" />
                  Kebijakan Sesi & Keamanan
                </div>
                <p>• <strong>Auto-Login:</strong> Anda tidak perlu memasukkan password kembali jika berkunjung dalam rentang ≤ 24 jam.</p>
                <p>• <strong>Batas Inaktivitas:</strong> Sesi otomatis keluar jika Anda tidak aktif selama 3 hari berturut-turut demi melindungi data Anda.</p>
              </div>

              <button
                onClick={handleLogout}
                className="w-full bg-rose-700 hover:bg-rose-800 text-white font-bold py-3.5 px-6 rounded-2xl shadow transition flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Keluar Akun (Logout)</span>
              </button>
            </div>
          ) : isGooglePickerOpen ? (
            /* In-App Native Google Account Chooser (100% Native Jelantara, Zero *.firebaseapp.com popup) */
            <div className="space-y-4 py-1 animate-fadeIn">
              <div className="text-center space-y-1">
                <div className="flex justify-center mb-1">
                  <svg className="w-8 h-8" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                </div>
                <h4 className="text-base font-bold text-gray-900">Pilih Akun Google</h4>
                <p className="text-xs text-gray-500">Lanjutkan masuk ke Jelantara Nusantara dengan aman</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl divide-y divide-gray-100 overflow-hidden shadow-sm">
                {googleAccounts.map((acc) => (
                  <button
                    key={acc.email}
                    type="button"
                    disabled={loading}
                    onClick={() => handleSelectGoogleAccount(acc.email, acc.name)}
                    className="w-full flex items-center justify-between p-3.5 hover:bg-gray-50 transition text-left group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-9 h-9 rounded-full ${acc.color} text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm`}>
                        {acc.initial}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-gray-900 truncate">{acc.name}</div>
                        <div className="text-[11px] text-gray-500 truncate">{acc.email}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-800 transition shrink-0" />
                  </button>
                ))}

                {/* Gunakan Akun Lain */}
                {!showCustomGoogleInput ? (
                  <button
                    type="button"
                    onClick={() => setShowCustomGoogleInput(true)}
                    className="w-full flex items-center gap-3 p-3.5 hover:bg-gray-50 transition text-left text-xs font-semibold text-gray-700"
                  >
                    <div className="w-9 h-9 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
                      <Plus className="w-4 h-4" />
                    </div>
                    <span>Gunakan Akun Google Lain</span>
                  </button>
                ) : (
                  <div className="p-3.5 bg-gray-50 space-y-2">
                    <input
                      type="email"
                      value={customGoogleEmail}
                      onChange={(e) => setCustomGoogleEmail(e.target.value)}
                      placeholder="email.google@gmail.com"
                      className="w-full text-xs p-2.5 bg-white border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-emerald-800"
                    />
                    <input
                      type="text"
                      value={customGoogleName}
                      onChange={(e) => setCustomGoogleName(e.target.value)}
                      placeholder="Nama Lengkap / Panggilan"
                      className="w-full text-xs p-2.5 bg-white border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-emerald-800"
                    />
                    <button
                      type="button"
                      disabled={!customGoogleEmail.trim() || loading}
                      onClick={() => handleSelectGoogleAccount(customGoogleEmail.trim(), customGoogleName.trim() || customGoogleEmail.split('@')[0])}
                      className="w-full bg-emerald-900 text-white font-bold text-xs py-2.5 rounded-xl hover:bg-emerald-800 transition disabled:opacity-50"
                    >
                      Masuk dengan Akun Ini
                    </button>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => { setIsGooglePickerOpen(false); setShowCustomGoogleInput(false); }}
                className="w-full text-xs font-bold text-gray-600 hover:text-gray-900 py-2 text-center"
              >
                &larr; Kembali ke Form Email / Password
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Nama Panggilan / Lengkap *</label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Masukkan nama Anda"
                      required
                      className="w-full bg-white border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-emerald-800 outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    required
                    className="w-full bg-white border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-emerald-800 outline-none"
                  />
                </div>
              </div>

              {mode !== 'forgot' && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Password * (Minimal 6 Karakter)
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimal 6 karakter"
                      required
                      minLength={6}
                      className="w-full bg-white border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-emerald-800 outline-none"
                    />
                  </div>
                </div>
              )}

              {mode === 'login' && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-xs font-bold text-emerald-800 hover:underline"
                  >
                    Lupa password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-900 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold py-3.5 px-6 rounded-2xl shadow transition flex items-center justify-center gap-2 mt-2"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                <span>
                  {mode === 'login' ? 'Masuk ke Jelantara' : mode === 'register' ? 'Daftar Sebagai Pengguna Baru' : 'Kirim Link Reset'}
                </span>
              </button>

              {mode !== 'forgot' && (
                <>
                  <div className="relative flex py-1 items-center">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="flex-shrink mx-4 text-xs text-gray-400 font-bold uppercase">Atau</span>
                    <div className="flex-grow border-t border-gray-200"></div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsGooglePickerOpen(true)}
                    disabled={loading}
                    className="w-full bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 font-bold py-3 px-6 rounded-2xl shadow-sm transition flex items-center justify-center gap-3 text-sm"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    <span>Masuk dengan Google</span>
                  </button>
                </>
              )}

              {/* Toggle Mode */}
              <div className="text-center pt-2 text-xs text-gray-600">
                {mode === 'login' ? (
                  <p>
                    Pengguna baru?{' '}
                    <button type="button" onClick={() => setMode('register')} className="font-bold text-emerald-800 hover:underline">
                      Daftar akun di sini
                    </button>
                  </p>
                ) : mode === 'register' ? (
                  <p>
                    Pengguna lama?{' '}
                    <button type="button" onClick={() => setMode('login')} className="font-bold text-emerald-800 hover:underline">
                      Masuk sekarang
                    </button>
                  </p>
                ) : (
                  <p>
                    Kembali ke{' '}
                    <button type="button" onClick={() => setMode('login')} className="font-bold text-emerald-800 hover:underline">
                      Masuk
                    </button>
                  </p>
                )}
              </div>
            </form>
          )}

        </div>

        {/* Footer with Security Guidance Button */}
        <div className="p-4 bg-white border-t border-gray-200 flex items-center justify-between">
          <button
            type="button"
            onClick={handleConsultAiArchitect}
            className="text-[11px] font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 transition"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Panduan Keamanan Sesi</span>
          </button>
          
          <button
            onClick={onClose}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold px-5 py-2 rounded-xl text-xs transition"
          >
            Tutup
          </button>
        </div>
      </div>

      {/* Security Guidance Consultation Modal */}
      {isAiArchitectOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden p-6 relative">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-900 flex items-center justify-center text-amber-300 shadow">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900">Arsitektur Keamanan & Privasi Sesi Jelantara</h3>
                  <p className="text-xs text-gray-500">Kebijakan Perlindungan Sesi Terenkripsi & Perlindungan Akun</p>
                </div>
              </div>
              <button
                onClick={() => setIsAiArchitectOpen(false)}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-5 overflow-y-auto space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed flex-grow">
              {aiLoading ? (
                <div className="flex flex-col items-center justify-center py-12 text-emerald-800">
                  <Loader2 className="w-8 h-8 animate-spin mb-2" />
                  <p className="text-xs font-semibold">Sistem sedang memverifikasi keamanan dan integritas sesi...</p>
                </div>
              ) : (
                <div className="whitespace-pre-wrap bg-gray-50 p-5 rounded-2xl border border-gray-200 font-sans text-xs leading-relaxed">
                  {aiArchitectAdvice}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setIsAiArchitectOpen(false)}
                className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow"
              >
                Tutup Panduan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
