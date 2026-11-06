import { Compass, Calculator, Map, Heart, Sparkles, Database, User as UserIcon, ShieldCheck } from 'lucide-react';
import { useAuth } from '../utils/AuthContext';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  savedCount: number;
  onOpenAiPlanner: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  onOpenAiPlanner,
}) => {
  const { currentUser, setIsAuthModalOpen, setAuthModalMode, isAutoLoggedIn } = useAuth();
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo & Brand Image */}
        <div 
          onClick={() => setActiveTab('explore')}
          className="flex items-center cursor-pointer group py-2"
        >
          <img 
            src="/assets/aistudio/Desain_tanpa_judul__3__ba815868.png" 
            alt="Jelantara - Jelajah Nusantara" 
            className="h-10 sm:h-12 object-contain"
          />
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-gray-100 p-1.5 rounded-full border border-gray-200">
          <button
            onClick={() => setActiveTab('explore')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition ${
              activeTab === 'explore'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
            }`}
          >
            <Compass className="w-4 h-4 text-emerald-700" />
            Jelajah Alam
          </button>

          <button
            onClick={() => setActiveTab('budget')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition ${
              activeTab === 'budget'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
            }`}
          >
            <Calculator className="w-4 h-4 text-emerald-700" />
            Rencana Biaya
          </button>

          <button
            onClick={() => setActiveTab('map')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition ${
              activeTab === 'map'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
            }`}
          >
            <Map className="w-4 h-4 text-emerald-700" />
            Peta Interaktif
          </button>

          <button
            onClick={() => setActiveTab('manage')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition ${
              activeTab === 'manage'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
            }`}
          >
            <Database className="w-4 h-4 text-emerald-800" />
            New Insight
          </button>
        </nav>

        {/* Right Actions (Tanya AI & Heart) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* AI Planner Button */}
          <button
            onClick={onOpenAiPlanner}
            className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-800 to-teal-700 hover:from-emerald-900 hover:to-teal-800 text-white px-3.5 py-2.5 rounded-full text-xs sm:text-sm font-semibold shadow-sm transition transform active:scale-95"
            title="WisataBot — Tanya AI"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span className="hidden sm:inline">Tanya AI</span>
          </button>

          {/* Saved / Favorites Button */}
          <button
            onClick={() => setActiveTab('saved')}
            className={`relative p-3 rounded-full border transition flex items-center justify-center ${
              activeTab === 'saved' 
                ? 'bg-[#ff385c] text-white border-[#ff385c]' 
                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
            }`}
            title="Destinasi Tersimpan"
          >
            <Heart className={`w-5 h-5 ${activeTab === 'saved' ? 'fill-white' : 'text-[#ff385c]'}`} />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#ff385c] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow">
                {savedCount}
              </span>
            )}
          </button>

          {/* User Account Button */}
          {currentUser ? (
            <button
              onClick={() => {
                setAuthModalMode('profile');
                setIsAuthModalOpen(true);
              }}
              className="relative flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 shadow-sm transition"
              title={`Akun: ${currentUser.displayName || currentUser.email} (Sesi Aktif)`}
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-900 text-white flex items-center justify-center font-bold text-xs uppercase shadow-inner">
                {currentUser.displayName ? currentUser.displayName.charAt(0) : (currentUser.email?.charAt(0) || 'U')}
              </div>
              <span className="hidden sm:inline text-xs font-bold text-gray-800 max-w-[90px] truncate">
                {currentUser.displayName || currentUser.email?.split('@')[0]}
              </span>
              {/* Green Session Dot */}
              <span 
                className="absolute top-1 right-1 sm:static w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" 
                title={isAutoLoggedIn ? "Auto-Login Aktif (≤ 24 Jam)" : "Sesi Aktif"}
              />
            </button>
          ) : (
            <button
              onClick={() => {
                setAuthModalMode('register');
                setIsAuthModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 text-xs sm:text-sm font-bold shadow-sm transition"
              title="Daftar / Masuk Akun"
            >
              <UserIcon className="w-4 h-4 text-emerald-800" />
              <span className="hidden sm:inline">Masuk</span>
            </button>
          )}
        </div>

      </div>

      {/* Mobile Bottom Subnav */}
      <div className="md:hidden flex items-center justify-around bg-white border-t border-gray-200 px-2 py-2">
        <button
          onClick={() => setActiveTab('explore')}
          className={`flex flex-col items-center gap-1 text-[11px] font-medium py-1 px-2 rounded-lg ${
            activeTab === 'explore' ? 'text-emerald-800 bg-emerald-50' : 'text-gray-600'
          }`}
        >
          <Compass className="w-5 h-5" />
          Jelajah
        </button>
        <button
          onClick={() => setActiveTab('budget')}
          className={`flex flex-col items-center gap-1 text-[11px] font-medium py-1 px-2 rounded-lg ${
            activeTab === 'budget' ? 'text-emerald-800 bg-emerald-50' : 'text-gray-600'
          }`}
        >
          <Calculator className="w-5 h-5" />
          Biaya
        </button>
        <button
          onClick={() => setActiveTab('map')}
          className={`flex flex-col items-center gap-1 text-[11px] font-medium py-1 px-2 rounded-lg ${
            activeTab === 'map' ? 'text-emerald-800 bg-emerald-50' : 'text-gray-600'
          }`}
        >
          <Map className="w-5 h-5" />
          Peta
        </button>
        <button
          onClick={() => setActiveTab('manage')}
          className={`flex flex-col items-center gap-1 text-[11px] font-medium py-1 px-2 rounded-lg ${
            activeTab === 'manage' ? 'text-emerald-900 bg-emerald-50' : 'text-gray-600'
          }`}
        >
          <Database className="w-5 h-5" />
          Insight
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`flex flex-col items-center gap-1 text-[11px] font-medium py-1 px-2 rounded-lg relative ${
            activeTab === 'saved' ? 'text-[#ff385c] bg-rose-50' : 'text-gray-600'
          }`}
        >
          <Heart className="w-5 h-5" />
          Favorit
        </button>
      </div>
    </header>
  );
};
