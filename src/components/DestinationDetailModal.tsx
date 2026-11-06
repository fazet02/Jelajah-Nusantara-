import React, { useState } from 'react';
import { Destination } from '../types';
import { 
  X, MapPin, Star, Clock, CheckCircle2, XCircle, 
  Leaf, Compass, Calculator, Sparkles, Heart, Ticket 
} from 'lucide-react';

interface DestinationDetailModalProps {
  destination: Destination | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onOpenBudgetPlanner: (destination: Destination) => void;
}

export const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({
  destination,
  onClose,
  isSaved,
  onToggleSave,
  onOpenBudgetPlanner,
}) => {
  if (!destination) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const hasRating = destination.rating != null && destination.reviewsCount != null;
  const hasPrice = destination.priceEstimate != null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close & Favorite Floating Buttons */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={(e) => onToggleSave(destination.id, e)}
            className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg hover:bg-white transition text-gray-800"
          >
            <Heart className={`w-5 h-5 ${isSaved ? 'fill-[#ff385c] text-[#ff385c]' : 'text-gray-700'}`} />
          </button>
          <button
            onClick={onClose}
            className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg hover:bg-white transition text-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Gallery Hero Section */}
        <div className="relative h-72 sm:h-96 w-full bg-gray-900 overflow-hidden">
          <img
            src={destination.gallery[activeImageIndex] || destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/assets/aistudio/DATARAN_TINGGI_35df184c.jpeg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

          {/* Title and Region overlay */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="bg-emerald-800 text-white text-xs font-bold px-3 py-1 rounded-full">
                {destination.category.toUpperCase()}
              </span>
              {destination.priceCategory && destination.priceCategory !== 'Budget belum tersedia' && (
                <span className="bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {destination.priceCategory}
                </span>
              )}
              <span className="bg-amber-600/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {destination.difficulty}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">{destination.name}</h2>
            <p className="text-sm sm:text-base text-gray-200 mt-1 font-medium">{destination.tagline}</p>
          </div>
        </div>

        {/* Thumbnail Selector */}
        {destination.gallery.length > 1 && (
          <div className="flex gap-2 p-4 bg-gray-50 border-b border-gray-200 overflow-x-auto">
            {destination.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition ${
                  activeImageIndex === idx ? 'border-emerald-800 scale-105 shadow' : 'border-transparent opacity-70'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Main Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Quick Info Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100">
            <div>
              <span className="text-xs text-emerald-800 font-semibold uppercase block">Lokasi</span>
              <span className="text-sm font-bold text-gray-900 flex items-center gap-1 mt-0.5">
                <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="truncate">{destination.location}</span>
              </span>
            </div>
            <div>
              <span className="text-xs text-emerald-800 font-semibold uppercase block">Tiket Masuk</span>
              <span className="text-sm font-bold text-gray-900 flex items-center gap-1 mt-0.5">
                <Ticket className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>
                  {hasPrice 
                    ? (destination.priceMaxEstimate && destination.priceMaxEstimate !== destination.priceEstimate
                        ? `Rp ${destination.priceEstimate!.toLocaleString('id-ID')} - ${destination.priceMaxEstimate.toLocaleString('id-ID')}`
                        : `Rp ${destination.priceEstimate!.toLocaleString('id-ID')}`)
                    : 'Harga belum tersedia'}
                </span>
              </span>
              {destination.priceDetails && (
                <span className="text-[10px] text-gray-500 block mt-0.5">{destination.priceDetails}</span>
              )}
            </div>
            <div>
              <span className="text-xs text-emerald-800 font-semibold uppercase block">Waktu Tempuh</span>
              <span className="text-sm font-bold text-gray-900 flex items-center gap-1 mt-0.5">
                <Clock className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="truncate">{destination.travelTime || 'Perlu verifikasi'}</span>
              </span>
            </div>
            <div>
              <span className="text-xs text-emerald-800 font-semibold uppercase block">Rating</span>
              <span className="text-sm font-bold text-gray-900 flex items-center gap-1 mt-0.5">
                {destination.googleRating ? (
                  <>
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
                    <span>{destination.googleRating} ({destination.googleReviewCount} ulasan Google)</span>
                  </>
                ) : hasRating ? (
                  <>
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
                    <span>{destination.rating} / 5.0</span>
                  </>
                ) : (
                  <span className="text-xs text-gray-500 font-normal">Rating belum tersedia</span>
                )}
              </span>
            </div>
          </div>

          {/* Route Access Info */}
          {(destination.routeAccessType || destination.routeDescription) && (
            <div className="bg-blue-50/70 p-5 rounded-2xl border border-blue-200 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wide flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-700" />
                  Akses Rute & Perjalanan
                </h4>
                <button
                  onClick={() => window.open(destination.locationUrl || `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination.name + ', ' + destination.location)}`, '_blank')}
                  className="bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition shadow flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Lihat Lokasi & Rute
                </button>
              </div>
              {destination.routeAccessType && destination.routeAccessType.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {destination.routeAccessType.map((acc, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-900 text-xs font-semibold px-2.5 py-1 rounded-lg">
                      🚗 {acc}
                    </span>
                  ))}
                </div>
              )}
              {destination.routeDescription && (
                <p className="text-xs text-blue-900 leading-relaxed font-normal">{destination.routeDescription}</p>
              )}
            </div>
          )}

          {/* Highlights */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-700" />
              Daya Tarik Utama
            </h3>
            <div className="flex flex-wrap gap-2">
              {destination.highlights.map((h, i) => (
                <span key={i} className="bg-emerald-100/70 text-emerald-900 font-semibold text-xs px-3.5 py-1.5 rounded-xl">
                  ✨ {h}
                </span>
              ))}
            </div>
          </div>

          {/* Kelebihan & Kekurangan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50/70 border border-green-200 p-5 rounded-2xl">
              <h4 className="text-sm font-bold text-green-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-700" />
                Kelebihan Destinasi
              </h4>
              <ul className="space-y-2">
                {destination.pros.map((pro, idx) => (
                  <li key={idx} className="text-xs text-green-800 flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50/70 border border-amber-200 p-5 rounded-2xl">
              <h4 className="text-sm font-bold text-amber-900 mb-3 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-amber-700" />
                Hal yang Perlu Diperhatikan
              </h4>
              <ul className="space-y-2">
                {destination.cons.map((con, idx) => (
                  <li key={idx} className="text-xs text-amber-800 flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Unique Facts */}
          {destination.uniqueFacts.length > 0 && (
            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-2">
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide">Fakta Unik & Sejarah</h4>
              {destination.uniqueFacts.map((fact, idx) => (
                <p key={idx} className="text-xs text-gray-600 leading-relaxed">{fact}</p>
              ))}
            </div>
          )}

          {/* Activities & Eco-Tips */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-emerald-700" />
                Aktivitas Umum
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {destination.activities.map((act, i) => (
                  <span key={i} className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-lg">
                    {act}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wide mb-3 flex items-center gap-1.5">
                <Leaf className="w-4 h-4 text-emerald-700" />
                Eco-Tips & Konservasi
              </h4>
              <ul className="space-y-1.5">
                {destination.ecoTips.map((tip, i) => (
                  <li key={i} className="text-xs text-emerald-900 flex items-start gap-1.5">
                    <span className="text-emerald-700 font-bold">🌱</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 flex items-center justify-between gap-4">
          <div>
            <span className="text-xs text-gray-500 block">Tiket Masuk & Tarif</span>
            <span className="text-base font-black text-gray-900">
              {hasPrice 
                ? (destination.priceMaxEstimate && destination.priceMaxEstimate !== destination.priceEstimate
                    ? `Rp ${destination.priceEstimate!.toLocaleString('id-ID')} - ${destination.priceMaxEstimate.toLocaleString('id-ID')}`
                    : `Rp ${destination.priceEstimate!.toLocaleString('id-ID')}`)
                : 'Harga belum tersedia'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.open(destination.locationUrl || `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination.name + ', ' + destination.location)}`, '_blank')}
              className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 text-xs font-bold px-4 py-3.5 rounded-2xl transition shadow-sm flex items-center gap-2"
            >
              <MapPin className="w-4 h-4 text-emerald-700" />
              Buka Lokasi & Rute
            </button>
            <button
              onClick={() => onOpenBudgetPlanner(destination)}
              className="bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold px-6 py-3.5 rounded-2xl transition shadow flex items-center gap-2"
            >
              <Calculator className="w-4 h-4 text-emerald-300" />
              Hitung di Budget Planner
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
