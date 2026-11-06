import React from 'react';
import { Destination } from '../types';
import { Heart, Star, MapPin, Clock } from 'lucide-react';

interface DestinationCardProps {
  destination: Destination;
  isSaved: boolean;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onSelect: (destination: Destination) => void;
  onPlanBudget: (destination: Destination, e: React.MouseEvent) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  isSaved,
  onToggleSave,
  onSelect,
  onPlanBudget,
}) => {
  const hasRating = destination.rating != null && destination.reviewsCount != null;
  const hasPrice = destination.priceEstimate != null;

  return (
    <div
      onClick={() => onSelect(destination)}
      className="group bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl border border-gray-100 flex flex-col justify-between shadow-sm"
    >
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/assets/aistudio/DATARAN_TINGGI_35df184c.jpeg';
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>

        {/* Price Category & Difficulty Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {destination.priceCategory && destination.priceCategory !== 'Budget belum tersedia' && (
            <span className="bg-white/90 backdrop-blur-md text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow">
              {destination.priceCategory}
            </span>
          )}
          <span className="bg-emerald-900/90 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow">
            {destination.difficulty}
          </span>
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => onToggleSave(destination.id, e)}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center hover:bg-white transition text-gray-700 shadow"
          title="Simpan ke Favorit"
        >
          <Heart
            className={`w-5 h-5 transition ${
              isSaved ? 'fill-[#ff385c] text-[#ff385c]' : 'text-gray-700 hover:text-[#ff385c]'
            }`}
          />
        </button>

        {/* Region Badge & Rating on bottom of image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-medium">
          <span className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-md">
            <MapPin className="w-3.5 h-3.5 text-emerald-300" />
            {destination.region}
          </span>
          {destination.googleRating ? (
            <span className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-md" title="Rating Google Maps">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {destination.googleRating} ({destination.googleReviewCount})
            </span>
          ) : hasRating ? (
            <span className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-md">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {destination.rating} ({destination.reviewsCount})
            </span>
          ) : (
            <span className="bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px] text-gray-300">
              Rating belum tersedia
            </span>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-base font-bold text-gray-900 group-hover:text-emerald-800 transition truncate">
            {destination.name}
          </h3>
          <p className="text-xs text-gray-500 mt-1 line-clamp-1 font-normal">
            {destination.tagline}
          </p>

          <div className="mt-2.5 flex items-center gap-2 text-xs text-gray-500">
            <Clock className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span className="truncate">{destination.travelTime || 'Akses rute perlu diverifikasi'}</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 block">Tiket Masuk</span>
            <span className="text-sm font-black text-gray-900">
              {hasPrice ? `Rp ${destination.priceEstimate!.toLocaleString('id-ID')}` : 'Harga belum tersedia'}
              {hasPrice && <span className="text-xs font-normal text-gray-500"> / orang</span>}
            </span>
          </div>

          <button
            onClick={(e) => onPlanBudget(destination, e)}
            className="text-xs font-bold bg-emerald-50 text-emerald-800 hover:bg-emerald-800 hover:text-white px-3 py-1.5 rounded-lg transition"
          >
            Budget Planner
          </button>
        </div>
      </div>
    </div>
  );
};
