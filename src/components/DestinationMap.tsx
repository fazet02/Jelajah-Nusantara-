import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Destination } from '../types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, ExternalLink, Sparkles } from 'lucide-react';

// Standard forest-green pin for all regular destinations
const standardIcon = L.divIcon({
  className: 'custom-leaflet-marker-standard',
  html: `
    <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; cursor: pointer;">
      <div style="width: 28px; height: 28px; border-radius: 9999px; background: linear-gradient(135deg, #064e3b, #047857); border: 2.5px solid #ffffff; box-shadow: 0 4px 10px rgba(0,0,0,0.35); display: flex; align-items: center; justify-content: center; color: #ffffff; font-size: 13px;">
        📍
      </div>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -18],
});

// Custom glowing pin icon for destinations newly published via New Insight
const newInsightIcon = L.divIcon({
  className: 'custom-leaflet-marker-new',
  html: `
    <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 38px; height: 38px; cursor: pointer;">
      <span style="position: absolute; width: 38px; height: 38px; border-radius: 9999px; background-color: #34d399; opacity: 0.6; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>
      <div style="position: relative; width: 32px; height: 32px; border-radius: 9999px; background: linear-gradient(135deg, #064e3b, #0d9488); border: 2.5px solid #ffffff; box-shadow: 0 4px 14px rgba(6,78,59,0.45); display: flex; align-items: center; justify-content: center; font-size: 15px; color: #fde047;">
        ✨
      </div>
    </div>
  `,
  iconSize: [38, 38],
  iconAnchor: [19, 19],
  popupAnchor: [0, -20],
});

// Glowing golden pin when a destination is actively highlighted / selected
const highlightedIcon = L.divIcon({
  className: 'custom-leaflet-marker-highlighted',
  html: `
    <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; cursor: pointer;">
      <span style="position: absolute; width: 44px; height: 44px; border-radius: 9999px; background-color: #f59e0b; opacity: 0.7; animation: ping 1.2s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>
      <div style="position: relative; width: 36px; height: 36px; border-radius: 9999px; background: linear-gradient(135deg, #b45309, #d97706); border: 2.5px solid #ffffff; box-shadow: 0 4px 16px rgba(180,83,9,0.5); display: flex; align-items: center; justify-content: center; font-size: 16px; color: #ffffff;">
        🌟
      </div>
    </div>
  `,
  iconSize: [44, 44],
  iconAnchor: [22, 22],
  popupAnchor: [0, -22],
});

interface DestinationMapProps {
  destinations: Destination[];
  onSelectDestination: (dest: Destination) => void;
  selectedRegion: string;
  highlightedDestId?: string | null;
}

// Component to recenter and fit map bounds when destinations or highlighted destination change
const MapUpdater: React.FC<{ destinations: Destination[]; highlightedDestId?: string | null }> = ({ 
  destinations, 
  highlightedDestId 
}) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    const validDests = destinations.filter(d => 
      typeof d.lat === 'number' && typeof d.lng === 'number' && !isNaN(d.lat) && !isNaN(d.lng)
    );
    if (validDests.length === 0) return;

    if (highlightedDestId) {
      const target = validDests.find(d => d.id === highlightedDestId);
      if (target && typeof target.lat === 'number' && typeof target.lng === 'number') {
        map.setView([target.lat, target.lng], 12, { animate: true });
        return;
      }
    }

    if (validDests.length === 1) {
      map.setView([validDests[0].lat!, validDests[0].lng!], 10, { animate: true });
    } else {
      const bounds = L.latLngBounds(validDests.map(d => [d.lat!, d.lng!] as [number, number]));
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 11, animate: true });
      }
    }
  }, [destinations, highlightedDestId, map]);

  return null;
};

export const DestinationMap: React.FC<DestinationMapProps> = ({
  destinations,
  onSelectDestination,
  selectedRegion,
  highlightedDestId,
}) => {
  const validDestinations = destinations.filter(d => 
    typeof d.lat === 'number' && typeof d.lng === 'number' && !isNaN(d.lat) && !isNaN(d.lng)
  );

  // Default center of Indonesia
  const defaultCenter: [number, number] = [-2.5489, 118.0149];
  const initialCenter = validDestinations.length > 0 
    ? [validDestinations[0].lat!, validDestinations[0].lng!] as [number, number] 
    : defaultCenter;

  return (
    <div className="w-full h-[540px] rounded-3xl overflow-hidden border border-gray-200 shadow-sm relative z-0">
      <MapContainer
        center={initialCenter}
        zoom={selectedRegion === 'all' ? 5 : 8}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapUpdater destinations={validDestinations} highlightedDestId={highlightedDestId} />

        {validDestinations.map((dest) => {
          const isHighlighted = dest.id === highlightedDestId;
          const isFromNewInsight = dest.id.startsWith('custom-');
          const markerIcon = isHighlighted 
            ? highlightedIcon 
            : isFromNewInsight 
              ? newInsightIcon 
              : standardIcon;

          return (
            <Marker 
              key={dest.id} 
              position={[dest.lat!, dest.lng!]}
              icon={markerIcon}
            >
              <Popup className="custom-leaflet-popup">
                <div className="p-1 max-w-[240px]">
                  <div className="relative">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-28 object-cover rounded-xl mb-2"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/aistudio/DATARAN_TINGGI_35df184c.jpeg';
                      }}
                    />
                    {isFromNewInsight && (
                      <span className="absolute top-2 left-2 bg-emerald-950/90 backdrop-blur-sm text-amber-300 text-[9px] font-black px-2 py-0.5 rounded-full shadow flex items-center gap-1 border border-amber-300/40">
                        <Sparkles className="w-2.5 h-2.5" />
                        New Insight
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full inline-block">
                      {dest.region}
                    </span>
                    <span className="text-[10px] font-medium text-gray-500 capitalize">
                      {dest.category}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-gray-900 leading-snug">{dest.name}</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">{dest.tagline || dest.location}</p>

                  {/* Destination Location Link if entered via New Insight */}
                  {dest.locationUrl && (
                    <a
                      href={dest.locationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 text-[10px] font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 bg-emerald-50 p-1.5 rounded-lg border border-emerald-200"
                      title={dest.locationUrl}
                    >
                      <MapPin className="w-3 h-3 text-emerald-700 shrink-0" />
                      <span className="truncate">Tautan Google Maps Wisata</span>
                      <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                    </a>
                  )}
                  
                  <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-emerald-900">
                      {dest.priceEstimate != null ? `Rp ${dest.priceEstimate.toLocaleString('id-ID')}` : 'Harga belum tersedia'}
                    </span>
                    <button
                      onClick={() => onSelectDestination(dest)}
                      className="bg-emerald-900 hover:bg-emerald-800 text-white text-[11px] font-bold px-3 py-1 rounded-lg transition shrink-0"
                    >
                      Lihat Detail
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {validDestinations.length === 0 && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-[400]">
          <p className="text-sm font-bold text-gray-800">Tidak ada koordinat peta untuk wilayah {selectedRegion === 'all' ? 'Seluruh Nusantara' : selectedRegion}</p>
          <p className="text-xs text-gray-500 mt-1">Silakan pilih wilayah lain atau gunakan tampilan Daftar Wisata.</p>
        </div>
      )}
    </div>
  );
};
