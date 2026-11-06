import React, { useState, useEffect } from 'react';
import { Destination } from '../types';
import { 
  Map, MapPin, Navigation, CloudSun, ChevronRight, List, Settings, 
  Sparkles, X, Loader2, ExternalLink, PlusCircle 
} from 'lucide-react';
import { DestinationMap } from './DestinationMap';
import { ManageDestinationsModal } from './ManageDestinationsModal';
import { 
  getActiveDestinations, 
  getDestinationOverrides 
} from '../utils/destinationsHelper';

interface InteractiveMapProps {
  onSelectDestination: (dest: Destination) => void;
  onRefreshData?: () => void;
  initialRegion?: string;
  highlightedDestId?: string | null;
  onNavigateToNewInsight?: () => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  onSelectDestination,
  onRefreshData,
  initialRegion,
  highlightedDestId,
  onNavigateToNewInsight,
}) => {
  const [activeDestinations, setActiveDestinations] = useState<Destination[]>(() => getActiveDestinations());
  const [selectedRegion, setSelectedRegion] = useState<string>(initialRegion || 'all');
  const [highlightedId, setHighlightedId] = useState<string | null>(highlightedDestId || null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [isManageModalOpen, setIsManageModalOpen] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [advisorGuidance, setAdvisorGuidance] = useState<string | null>(null);
  const [advisorLoading, setAdvisorLoading] = useState(false);

  // Real-time synchronization when any destination is published or edited in New Insight
  useEffect(() => {
    const handleDestinationsUpdated = (e: any) => {
      const updated = getActiveDestinations();
      setActiveDestinations(updated);
      setRefreshKey(prev => prev + 1);

      // Auto-focus and highlight newly published destination and its region
      if (e?.detail?.region) {
        setSelectedRegion(e.detail.region);
      }
      if (e?.detail?.id) {
        setHighlightedId(e.detail.id);
      }
      if (onRefreshData) onRefreshData();
    };

    window.addEventListener('destinations_updated', handleDestinationsUpdated);
    window.addEventListener('storage', handleDestinationsUpdated);

    return () => {
      window.removeEventListener('destinations_updated', handleDestinationsUpdated);
      window.removeEventListener('storage', handleDestinationsUpdated);
    };
  }, [onRefreshData]);

  // Update selected region if initialRegion prop changes
  useEffect(() => {
    if (initialRegion) {
      setSelectedRegion(initialRegion);
    }
  }, [initialRegion]);

  useEffect(() => {
    if (highlightedDestId) {
      setHighlightedId(highlightedDestId);
    }
  }, [highlightedDestId]);


  // Static regional details for weather & road conditions
  const regionalMeta: Record<string, { desc: string; weather: string; roadStatus: string }> = {
    'Jawa Tengah': { desc: 'Dataran Tinggi Dieng & Wonosobo', weather: 'Cerah Berawan (22°C)', roadStatus: 'Mulus / Aspal Baik' },
    'Jawa Barat': { desc: 'Kawah Putih, Tangkuban Perahu & Curug', weather: 'Sejuk / Hujan Ringan (20°C)', roadStatus: 'Sebagian Berkelok' },
    'Jawa Timur': { desc: 'Bromo, Kawah Ijen & Baluran', weather: 'Dingin / Berangin (15°C)', roadStatus: 'Aman untuk Kendaraan' },
    'Nusa Tenggara Barat': { desc: 'Lombok, Rinjani & Pantai Pink', weather: 'Cerah Tropis (30°C)', roadStatus: 'Lancar / Jalur Wisata' },
    'Bali': { desc: 'Nusa Penida, Kintamani & Sekitarnya', weather: 'Cerah / Berawan (29°C)', roadStatus: 'Lancar / Jalur Wisata' },
    'Sulawesi Utara': { desc: 'Taman Laut Bunaken & Danau Linow', weather: 'Hangat & Cerah (30°C)', roadStatus: 'Akses Penyeberangan Boat' },
    'Papua Barat Daya': { desc: 'Kepulauan Raja Ampat & Wayag', weather: 'Tropis Bahari (31°C)', roadStatus: 'Akses Speedboat' },
    'Sumatera Utara': { desc: 'Danau Toba & Samosir', weather: 'Sejuk Pegunungan (21°C)', roadStatus: 'Aman & Beraspal' },
    'DI Yogyakarta': { desc: 'Pantai Gunungkidul & Lereng Merapi', weather: 'Cerah Hangat (28°C)', roadStatus: 'Jalur Utama Halus' },
  };

  // Dynamically collect unique regions from all published active destinations
  const dynamicRegions = Array.from(new Set(activeDestinations.map(d => d.region))).filter(Boolean);
  
  // Combine all known regions
  const allUniqueRegionNames = Array.from(new Set([...dynamicRegions, ...Object.keys(regionalMeta)]));

  const regionList = [
    {
      id: 'all',
      name: 'Semua Wilayah',
      desc: 'Peta Sebaran Seluruh Nusantara',
      count: activeDestinations.length,
      weather: 'Variatif sesuai kepulauan',
      roadStatus: 'Jalur Nasional & Lokal',
    },
    ...allUniqueRegionNames.map(regName => {
      const meta = regionalMeta[regName] || {
        desc: `Kawasan Wisata Alam ${regName}`,
        weather: 'Cerah Tropis (26°C - 30°C)',
        roadStatus: 'Akses Transportasi Lokal',
      };
      const count = activeDestinations.filter(d => d.region.toLowerCase().trim() === regName.toLowerCase().trim()).length;
      return {
        id: regName,
        name: regName,
        desc: meta.desc,
        count,
        weather: meta.weather,
        roadStatus: meta.roadStatus,
      };
    })
  ];

  const currentRegionInfo = regionList.find(r => r.id === selectedRegion) || regionList[0];

  // Filtered destinations for selected region (or all)
  const regionDestinations = selectedRegion === 'all'
    ? activeDestinations
    : activeDestinations.filter(d => d.region.toLowerCase().trim() === selectedRegion.toLowerCase().trim());

  const handleOpenAdvisor = async () => {
    setIsAdvisorOpen(true);
    if (!advisorGuidance) {
      setAdvisorLoading(true);
      try {
        const res = await fetch('/api/map-advisor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ input: 'Jelaskan integrasi real-time antara New Insight dan Peta Interaktif dalam menyajikan data destinasi yang baru ditambahkan.' })
        });
        const data = await res.json();
        if (data.success && data.guidance) {
          setAdvisorGuidance(data.guidance);
        } else {
          setAdvisorGuidance('Panduan eksplorasi peta siap digunakan.');
        }
      } catch (err) {
        console.error(err);
        setAdvisorGuidance('Panduan eksplorasi peta siap digunakan.');
      } finally {
        setAdvisorLoading(false);
      }
    }
  };

  return (
    <div key={refreshKey} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Header with Real-Time Connectivity Badge & Action Buttons */}
      <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
        <div className="text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-3.5 py-1.5 rounded-full text-xs font-bold mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
            <Map className="w-4 h-4 text-emerald-700" />
            Peta Interaktif Real-Time Nusantara
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">Eksplorasi Wilayah Alam</h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Terhubung langsung dengan <strong>New Insight</strong>. Setiap destinasi yang baru Anda tambahkan atau publikasikan langsung tertampil pada peta.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap justify-center">
          {onNavigateToNewInsight && (
            <button
              onClick={onNavigateToNewInsight}
              className="bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-3 rounded-2xl transition shadow flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4 text-emerald-300" />
              <span>Tambah Destinasi Baru</span>
            </button>
          )}

          <button
            onClick={handleOpenAdvisor}
            className="bg-teal-800 hover:bg-teal-700 text-white text-xs font-bold px-4 py-3 rounded-2xl transition shadow flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>Panduan Peta</span>
          </button>

          <button
            onClick={() => setIsManageModalOpen(true)}
            className="bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 text-xs font-bold px-4 py-3 rounded-2xl transition shadow-sm flex items-center gap-2"
          >
            <Settings className="w-4 h-4 text-emerald-800" />
            <span>Kelola Destinasi</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Region Selector */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
              🗺️ Pilih Wilayah / Provinsi
            </h3>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              {regionDestinations.length} Wisata
            </span>
          </div>

          <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
            {regionList.map((reg) => {
              const isSelected = selectedRegion === reg.id;
              return (
                <button
                  key={reg.id}
                  onClick={() => {
                    setSelectedRegion(reg.id);
                    setHighlightedId(null);
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl border transition flex items-center justify-between ${
                    isSelected
                      ? 'border-emerald-800 bg-emerald-900 text-white shadow-md'
                      : 'border-gray-200 hover:border-gray-300 text-gray-800 bg-gray-50/50'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <div className="text-sm font-bold truncate flex items-center gap-2">
                      <span>{reg.name}</span>
                      {reg.count > 0 && (
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                          isSelected ? 'bg-emerald-800 text-amber-200' : 'bg-gray-200 text-gray-700'
                        }`}>
                          {reg.count}
                        </span>
                      )}
                    </div>
                    <div className={`text-xs mt-0.5 truncate ${isSelected ? 'text-emerald-200' : 'text-gray-500'}`}>
                      {reg.desc}
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 shrink-0 ${isSelected ? 'text-emerald-300' : 'text-gray-400'}`} />
                </button>
              );
            })}
          </div>

          {/* Region Status Card */}
          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 space-y-2.5">
            <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wide">
              Kondisi Wilayah: {currentRegionInfo.name}
            </h4>
            <div className="flex items-center gap-2.5 text-xs text-gray-700">
              <CloudSun className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Cuaca: <strong>{currentRegionInfo.weather}</strong></span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-gray-700">
              <Navigation className="w-4 h-4 text-emerald-700" />
              <span>Akses Rute: <strong>{currentRegionInfo.roadStatus}</strong></span>
            </div>
          </div>
        </div>

        {/* Right Content Area with Segmented Toggle & Live Leaflet Map */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedRegion === 'all' ? 'Destinasi di Seluruh Nusantara' : `Destinasi di ${selectedRegion}`}
                </h3>
                {selectedRegion === 'all' && (
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    Semua
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                {regionDestinations.length} destinasi wisata alam terdaftar & terverifikasi
              </p>
            </div>

            {/* Segmented Toggle */}
            <div className="bg-gray-100 p-1.5 rounded-2xl flex items-center gap-1">
              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
                  viewMode === 'map'
                    ? 'bg-emerald-900 text-white shadow'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Map className="w-3.5 h-3.5" />
                <span>Peta Wisata</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
                  viewMode === 'list'
                    ? 'bg-emerald-900 text-white shadow'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Daftar Wisata</span>
              </button>
            </div>
          </div>

          {/* View Mode Rendering */}
          {viewMode === 'map' ? (
            <DestinationMap
              destinations={regionDestinations}
              onSelectDestination={onSelectDestination}
              selectedRegion={selectedRegion}
              highlightedDestId={highlightedId}
            />
          ) : (
            <div>
              {regionDestinations.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 text-gray-500">
                  <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-base font-semibold">Belum ada destinasi terdaftar di wilayah {selectedRegion}.</p>
                  <p className="text-xs text-gray-400 mt-1">Gunakan tombol New Insight untuk menambahkan dan mempublikasikan destinasi baru.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {regionDestinations.map((dest) => {
                    const isNewInsight = dest.id.startsWith('custom-') || dest.id === highlightedId;
                    return (
                      <div
                        key={dest.id}
                        onClick={() => onSelectDestination(dest)}
                        className={`bg-white rounded-2xl overflow-hidden border transition cursor-pointer group flex flex-col justify-between ${
                          isNewInsight 
                            ? 'border-emerald-500 shadow-md ring-2 ring-emerald-500/30' 
                            : 'border-gray-200 hover:shadow-lg'
                        }`}
                      >
                        <div className="relative h-44 w-full overflow-hidden bg-gray-100">
                          <img 
                            src={dest.image} 
                            alt={dest.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/assets/aistudio/DATARAN_TINGGI_35df184c.jpeg';
                            }}
                          />
                          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                            <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full">
                              {dest.category}
                            </span>
                            {isNewInsight && (
                              <span className="bg-emerald-900 text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full shadow border border-amber-300/40 flex items-center gap-1">
                                <Sparkles className="w-3 h-3" />
                                New Insight
                              </span>
                            )}
                          </div>
                          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-xl text-xs font-bold text-gray-900 shadow">
                            ⭐ {dest.rating || 4.8}
                          </div>
                        </div>

                        <div className="p-5 flex-grow flex flex-col justify-between space-y-3">
                          <div>
                            <h4 className="font-bold text-gray-900 text-base leading-snug group-hover:text-emerald-800 transition">
                              {dest.name}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                              {dest.tagline}
                            </p>
                          </div>

                          {dest.locationUrl && (
                            <a
                              href={dest.locationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 underline"
                            >
                              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                              <span>Buka Google Maps</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}

                          <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                            <div>
                              <div className="text-[10px] text-gray-400 uppercase font-semibold">Harga Tiket</div>
                              <div className="text-sm font-bold text-emerald-900">
                                {dest.priceEstimate != null ? `Rp ${dest.priceEstimate.toLocaleString('id-ID')}` : 'Belum tersedia'}
                              </div>
                            </div>
                            <span className="text-xs font-bold text-emerald-800 group-hover:underline">
                              Lihat Detail &rarr;
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

        </div>

      </div>

      {/* Manage Destinations Modal */}
      {isManageModalOpen && (
        <ManageDestinationsModal
          onClose={() => setIsManageModalOpen(false)}
          onUpdate={() => {
            const updated = getActiveDestinations();
            setActiveDestinations(updated);
            setRefreshKey(prev => prev + 1);
            if (onRefreshData) onRefreshData();
          }}
        />
      )}

      {/* AI Advisor Modal */}
      {isAdvisorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden p-6 relative">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-900 flex items-center justify-center text-amber-300 shadow">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900">Panduan Integrasi Peta Jelantara</h3>
                  <p className="text-xs text-gray-500">Integrasi Alur Data Real-Time Wisata Alam</p>
                </div>
              </div>
              <button
                onClick={() => setIsAdvisorOpen(false)}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-5 overflow-y-auto space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
              {advisorLoading ? (
                <div className="flex flex-col items-center justify-center py-12 text-teal-800">
                  <Loader2 className="w-8 h-8 animate-spin mb-2" />
                  <p className="text-xs font-semibold">Sistem sedang memuat panduan integrasi peta...</p>
                </div>
              ) : (
                <div className="whitespace-pre-wrap bg-gray-50 p-5 rounded-2xl border border-gray-200 font-sans text-xs leading-relaxed">
                  {advisorGuidance}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setIsAdvisorOpen(false)}
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
