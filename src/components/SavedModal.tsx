import React from 'react';
import { Destination } from '../types';
import { Heart, MapPin, Compass, Trash2 } from 'lucide-react';

interface SavedModalProps {
  savedDestinations: Destination[];
  onClose: () => void;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onSelectDestination: (destination: Destination) => void;
}

export const SavedModal: React.FC<SavedModalProps> = ({
  savedDestinations,
  onClose,
  onToggleSave,
  onSelectDestination,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-900 px-3.5 py-1.5 rounded-full text-xs font-bold mb-2">
            <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />
            Wishlist & Destinasi Disimpan
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">Destinasi Favorit Anda</h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Kelola daftar destinasi alam Nusantara yang telah Anda simpan untuk rencana petualangan berikutnya.
          </p>
        </div>
        <span className="bg-emerald-100 text-emerald-900 font-bold text-xs px-4 py-2 rounded-full">
          {savedDestinations.length} Disimpan
        </span>
      </div>

      {savedDestinations.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-gray-200 shadow-sm space-y-4 max-w-xl mx-auto">
          <Heart className="w-12 h-12 text-gray-300 mx-auto" />
          <h3 className="text-lg font-bold text-gray-800">Belum ada destinasi favorit</h3>
          <p className="text-xs text-gray-500">
            Jelajahi katalog wisata alam di tab Explore Alam dan ketuk ikon hati pada kartu destinasi untuk menyimpannya di sini.
          </p>
          <button
            onClick={onClose}
            className="bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold px-6 py-3 rounded-2xl transition shadow"
          >
            Mulai Jelajah
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {savedDestinations.map((dest) => (
            <div
              key={dest.id}
              onClick={() => onSelectDestination(dest)}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition cursor-pointer group flex flex-col justify-between relative"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/aistudio/DATARAN_TINGGI_35df184c.jpeg';
                  }}
                />
                <button
                  onClick={(e) => onToggleSave(dest.id, e)}
                  className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#ff385c] shadow hover:bg-white transition"
                  title="Hapus dari Favorit"
                >
                  <Heart className="w-5 h-5 fill-[#ff385c]" />
                </button>
                {dest.priceCategory && dest.priceCategory !== 'Budget belum tersedia' && (
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-xs font-bold px-3 py-1 rounded-full shadow">
                    {dest.priceCategory}
                  </div>
                )}
              </div>

              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-emerald-800 transition">{dest.name}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">{dest.tagline}</p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{dest.region}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-900">
                    {dest.priceEstimate != null ? `Rp ${dest.priceEstimate.toLocaleString('id-ID')}` : 'Harga belum tersedia'}
                  </span>
                  <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg">
                    {dest.difficulty}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
