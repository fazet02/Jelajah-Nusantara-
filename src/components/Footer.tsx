import React from 'react';
import { Compass, Calculator, Map, Sparkles, Leaf } from 'lucide-react';
import { getActiveDestinations } from '../utils/destinationsHelper';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenAiPlanner: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenAiPlanner }) => {
  const publishedCount = getActiveDestinations().length;

  return (
    <footer className="bg-[#004D3B] text-white border-t border-[#006B52] pt-16 pb-12 px-4 sm:px-6 lg:px-8 mt-20 font-sans shadow-xl">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
        
        {/* KOLOM 1 — BRANDING */}
        <div className="space-y-4">
          <div className="flex items-center">
            <img 
              src="/assets/aistudio/Mask_group__7___1__41041954.png" 
              alt="Jelantara - Jelajah Nusantara" 
              className="h-12 object-contain"
            />
          </div>
          <p className="text-sm font-semibold text-[#D9F99D]">
            Jelajah Alam Indonesia, Sesuai Caramu.
          </p>
          <p className="text-xs text-emerald-100 leading-relaxed">
            Temukan destinasi wisata alam, rencanakan anggaran, dan jelajahi keindahan Nusantara dengan lebih mudah bersama Jelantara.
          </p>
        </div>

        {/* KOLOM 2 — JELAJAHI */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Jelajahi</h3>
          <ul className="space-y-2.5 text-xs text-emerald-100">
            <li>
              <button 
                onClick={() => setActiveTab('explore')}
                className="hover:text-[#D9F99D] transition flex items-center gap-2 group text-white font-medium"
              >
                <Compass className="w-3.5 h-3.5 text-emerald-300 group-hover:translate-x-0.5 transition-transform" />
                <span>Jelajah Alam</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('budget')}
                className="hover:text-[#D9F99D] transition flex items-center gap-2 group text-white font-medium"
              >
                <Calculator className="w-3.5 h-3.5 text-emerald-300 group-hover:translate-x-0.5 transition-transform" />
                <span>Rencana Biaya</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('map')}
                className="hover:text-[#D9F99D] transition flex items-center gap-2 group text-white font-medium"
              >
                <Map className="w-3.5 h-3.5 text-emerald-300 group-hover:translate-x-0.5 transition-transform" />
                <span>Destinasi Interaktif</span>
              </button>
            </li>
            <li>
              <button 
                onClick={onOpenAiPlanner}
                className="hover:text-[#D9F99D] transition flex items-center gap-2 group text-white font-medium"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300 group-hover:translate-x-0.5 transition-transform" />
                <span>Tanya AI (WisataBot)</span>
              </button>
            </li>
          </ul>
        </div>

        {/* KOLOM 3 — TENTANG JELANTARA */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Tentang Jelantara</h3>
          <p className="text-xs text-emerald-100 leading-relaxed">
            Platform eksplorasi dan perencanaan wisata alam Indonesia yang membantu pengguna menemukan destinasi berdasarkan minat, anggaran, dan akses perjalanan.
          </p>
          <div className="pt-1 flex items-center gap-2 text-xs text-[#D9F99D] font-medium">
            <Leaf className="w-3.5 h-3.5 shrink-0" />
            <span>Jelajahi alam, jaga kelestariannya.</span>
          </div>
        </div>

        {/* KOLOM 4 — INFORMASI WISATA */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Informasi Wisata</h3>
          <div className="space-y-2.5 text-xs text-emerald-100">
            <div className="bg-[#003B2E] p-3 rounded-2xl border border-[#006B52] space-y-1">
              <span className="block font-bold text-white">{publishedCount} Destinasi Wisata Pilihan</span>
              <span className="block text-[11px] text-emerald-200">Harga tiket dan estimasi biaya dapat berubah sewaktu-waktu.</span>
            </div>
            <p className="text-[11px] text-emerald-200 leading-relaxed">
              Disarankan untuk memeriksa kondisi cuaca terkini dan informasi pengelola sebelum memulai perjalanan.
            </p>
          </div>
        </div>

      </div>

      {/* DIVIDER & BOTTOM BAR */}
      <div className="max-w-7xl mx-auto border-t border-[#006B52] mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200">
        <div>
          &copy; 2026 Jelantara Project. All rights reserved.
        </div>
        <div className="text-[#D9F99D] font-medium tracking-wide">
          Explore More, Closer to Nature.
        </div>
      </div>
    </footer>
  );
};
