import React, { useState, useEffect } from 'react';
import { Destination, SavedBudgetPlan } from '../types';
import { getActiveDestinations } from '../utils/destinationsHelper';
import { 
  Calculator, Users, Calendar, Car, Home, ShieldAlert, Sparkles, Check, 
  ArrowRight, CheckCircle2, Loader2, X 
} from 'lucide-react';
import { useAuth } from '../utils/AuthContext';

interface BudgetPlannerProps {
  initialDestination?: Destination | null;
  onGoToExplore?: () => void;
}

export const BudgetPlanner: React.FC<BudgetPlannerProps> = ({ initialDestination, onGoToExplore }) => {
  const { currentUser } = useAuth();
  const activeDestinations = getActiveDestinations();
  const [selectedDestId, setSelectedDestId] = useState<string>(
    initialDestination && activeDestinations.some(d => d.id === initialDestination.id)
      ? initialDestination.id
      : activeDestinations[0]?.id || 'kawah-ijen'
  );
  const [days, setDays] = useState<number>(2);
  const [travelers, setTravelers] = useState<number>(2);
  const [transportMode, setTransportMode] = useState<'motor' | 'mobil' | 'umum'>('motor');
  const [accommodationType, setAccommodationType] = useState<'tenda' | 'homestay' | 'hotel'>('homestay');
  const [includeGear, setIncludeGear] = useState<boolean>(true);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [isAiConsultOpen, setIsAiConsultOpen] = useState<boolean>(false);
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState<boolean>(false);

  // Restore saved plan if exists on mount and no initialDestination was forced
  useEffect(() => {
    if (!initialDestination) {
      try {
        const local = localStorage.getItem('jelantara_saved_budget_plan');
        if (local) {
          const parsed: SavedBudgetPlan = JSON.parse(local);
          if (parsed && parsed.destinationId) {
            setSelectedDestId(parsed.destinationId);
            setDays(parsed.days || 2);
            setTravelers(parsed.travelers || 2);
            setTransportMode(parsed.transportMode || 'motor');
            setAccommodationType(parsed.accommodationType || 'homestay');
            setIncludeGear(parsed.includeGear !== undefined ? parsed.includeGear : true);
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [initialDestination]);

  const currentDestination = activeDestinations.find(d => d.id === selectedDestId) || activeDestinations[0];

  // Calculation logic
  const baseTicket = (currentDestination && currentDestination.priceEstimate != null) ? currentDestination.priceEstimate : 0;
  
  // Transport cost multiplier per person
  const transportCostMap = {
    motor: 75000,
    mobil: 250000,
    umum: 120000,
  };
  const transportCost = transportCostMap[transportMode];

  // Accommodation cost per night
  const accomCostMap = {
    tenda: 25000,
    homestay: 150000,
    hotel: 450000,
  };
  const accomTotal = accomCostMap[accommodationType] * Math.max(1, days - 1);

  // Food & Logistics per day per person
  const foodPerDay = 75000;
  const foodTotal = foodPerDay * days * travelers;

  // Gear rental per person
  const gearCost = includeGear ? 60000 : 0;

  // Total calculation
  const totalTransport = transportCost * Math.ceil(travelers / (transportMode === 'motor' ? 2 : 4));
  const totalTicket = baseTicket * travelers;
  const totalGear = gearCost * travelers;
  const grandTotal = totalTransport + totalTicket + accomTotal + foodTotal + totalGear;
  const perPersonTotal = Math.round(grandTotal / travelers);

  const handleSaveBudgetPlan = () => {
    if (!currentDestination) return;

    const plan: SavedBudgetPlan = {
      destinationId: currentDestination.id,
      destinationName: currentDestination.name,
      destinationRegion: currentDestination.region,
      destinationImage: currentDestination.image,
      days,
      travelers,
      transportMode,
      accommodationType,
      includeGear,
      totalTicket,
      totalTransport,
      accomTotal,
      foodTotal,
      totalGear,
      grandTotal,
      perPersonTotal,
      userId: currentUser?.uid || 'guest',
      savedAt: new Date().toISOString()
    };

    try {
      localStorage.setItem('jelantara_saved_budget_plan', JSON.stringify(plan));
      window.dispatchEvent(new Event('budget_plan_updated'));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 6000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleConsultAiAdvisor = async () => {
    setIsAiConsultOpen(true);
    setAiLoading(true);
    setAiAdvice(null);
    try {
      const res = await fetch('/api/budget-planner-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: `Tolong berikan analisis produk dan optimasi budget untuk rencana perjalanan: Destinasi: ${currentDestination?.name} (${currentDestination?.region}), Durasi: ${days} hari, Peserta: ${travelers} orang, Transportasi: ${transportMode}, Akomodasi: ${accommodationType}, Sewa Alat: ${includeGear ? 'Ya' : 'Tidak'}, Total Biaya: Rp ${grandTotal.toLocaleString('id-ID')} (Rp ${perPersonTotal.toLocaleString('id-ID')} / orang). Berikan evaluasi zero-friction, tips efisiensi, dan konversi ke tahap booking.`
        })
      });
      const data = await res.json();
      setAiAdvice(data.guidance || 'Analisis selesai.');
    } catch (err: any) {
      console.error(err);
      setAiAdvice('Gagal memuat analisis AI Advisor. Periksa koneksi.');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Save Success Toast */}
      {saveSuccess && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-900 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl border border-emerald-400/40 animate-bounceOnce">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div className="text-xs sm:text-sm">
              <span className="font-bold">Rencana Biaya Berhasil Disimpan!</span>
              <p className="text-emerald-200 text-xs mt-0.5">
                Indikator visual FAB di kanan atas halaman Beranda telah aktif untuk akses cepat kapan saja.
              </p>
            </div>
          </div>
          {onGoToExplore && (
            <button
              onClick={onGoToExplore}
              className="bg-white text-emerald-950 font-bold text-xs px-4 py-2 rounded-xl transition hover:bg-emerald-50 shrink-0 flex items-center gap-1.5"
            >
              Lihat di Beranda
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Header */}
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-3.5 py-1.5 rounded-full text-xs font-bold mb-3">
          <Calculator className="w-4 h-4 text-emerald-700" />
          Perencana Biaya Perjalanan Alam
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">Rencana Biaya Cerdas</h2>
        <p className="text-sm text-gray-600 mt-2">
          Hitung estimasi budget petualangan alam Anda secara transparan berdasarkan jumlah hari, peserta, dan tipe transportasi.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Form Controls */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
          
          {/* Destination Selector */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
              Pilih Destinasi Wisata
            </label>
            <select
              value={selectedDestId}
              onChange={(e) => setSelectedDestId(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-emerald-800 outline-none transition"
            >
              {activeDestinations.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.region}) — {d.priceEstimate != null ? `Estimasi awal Rp ${d.priceEstimate.toLocaleString('id-ID')}` : 'Harga tiket belum tersedia'}
                </option>
              ))}
            </select>
          </div>

          {/* Days & Travelers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-700" />
                Durasi Perjalanan ({days} Hari)
              </label>
              <input
                type="range"
                min="1"
                max="14"
                value={days}
                onChange={(e) => setDays(parseInt(e.target.value))}
                className="w-full accent-emerald-800 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                <span>1 Hari</span>
                <span>7 Hari</span>
                <span>14 Hari</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-700" />
                Jumlah Peserta ({travelers} Orang)
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={travelers}
                onChange={(e) => setTravelers(parseInt(e.target.value))}
                className="w-full accent-emerald-800 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                <span>1 Orang</span>
                <span>5 Orang</span>
                <span>10 Orang</span>
              </div>
            </div>
          </div>

          {/* Transport Mode */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-2.5">
              Moda Transportasi Utama
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'motor', label: 'Motor Pribadi', desc: 'Hemat bensin' },
                { id: 'umum', label: 'Kendaraan Umum', desc: 'Bus / Kereta' },
                { id: 'mobil', label: 'Mobil Pribadi', desc: 'Nyaman keluarga' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setTransportMode(m.id as any)}
                  className={`p-3.5 rounded-2xl border text-left transition ${
                    transportMode === m.id
                      ? 'border-emerald-800 bg-emerald-900 text-white shadow-md'
                      : 'border-gray-200 hover:border-gray-300 bg-gray-50 text-gray-800'
                  }`}
                >
                  <div className="text-xs font-bold">{m.label}</div>
                  <div className={`text-[10px] mt-0.5 ${transportMode === m.id ? 'text-emerald-200' : 'text-gray-500'}`}>
                    {m.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Accommodation Type */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-2.5">
              Tipe Akomodasi
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'tenda', label: 'Camping / Tenda', desc: 'Rp 25rb / mlm' },
                { id: 'homestay', label: 'Homestay Desa', desc: 'Rp 150rb / mlm' },
                { id: 'hotel', label: 'Hotel Nyaman', desc: 'Rp 450rb / mlm' },
              ].map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setAccommodationType(a.id as any)}
                  className={`p-3.5 rounded-2xl border text-left transition ${
                    accommodationType === a.id
                      ? 'border-emerald-800 bg-emerald-900 text-white shadow-md'
                      : 'border-gray-200 hover:border-gray-300 bg-gray-50 text-gray-800'
                  }`}
                >
                  <div className="text-xs font-bold">{a.label}</div>
                  <div className={`text-[10px] mt-0.5 ${accommodationType === a.id ? 'text-emerald-200' : 'text-gray-500'}`}>
                    {a.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Gear Rental Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-200">
            <div>
              <div className="text-sm font-bold text-gray-900">Sewa Alat Outdoor / Camping</div>
              <div className="text-xs text-gray-500 mt-0.5">Termasuk carrier, sleeping bag, kompor portabel (Rp 60.000 / orang)</div>
            </div>
            <button
              type="button"
              onClick={() => setIncludeGear(!includeGear)}
              className={`w-12 h-6 rounded-full transition relative ${includeGear ? 'bg-emerald-800' : 'bg-gray-300'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition ${includeGear ? 'right-0.5' : 'left-0.5'}`} />
            </button>
          </div>

        </div>

        {/* Right Budget Summary Card */}
        <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Ringkasan Budget</span>
              <span className="bg-emerald-800/80 text-emerald-200 text-xs font-bold px-3 py-1 rounded-full">
                {travelers} Orang • {days} Hari
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold">{currentDestination?.name}</h3>
              <p className="text-xs text-emerald-200 mt-0.5">{currentDestination?.region}</p>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-emerald-800/60 text-xs">
              <div className="flex justify-between text-emerald-100">
                <span>Tiket Masuk ({travelers}x)</span>
                <span className="font-bold">Rp {totalTicket.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-emerald-100">
                <span>Transportasi Utama</span>
                <span className="font-bold">Rp {totalTransport.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-emerald-100">
                <span>Akomodasi ({Math.max(1, days - 1)} malam)</span>
                <span className="font-bold">Rp {accomTotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-emerald-100">
                <span>Konsumsi & Logistik</span>
                <span className="font-bold">Rp {foodTotal.toLocaleString('id-ID')}</span>
              </div>
              {includeGear && (
                <div className="flex justify-between text-emerald-100">
                  <span>Sewa Alat Outdoor</span>
                  <span className="font-bold">Rp {totalGear.toLocaleString('id-ID')}</span>
                </div>
              )}
            </div>
          </div>

          <div className="pt-6 border-t border-emerald-800/80 space-y-4">
            <div>
              <div className="text-xs text-emerald-300">Estimasi Total Keseluruhan</div>
              <div className="text-3xl font-black tracking-tight mt-1">Rp {grandTotal.toLocaleString('id-ID')}</div>
              <div className="text-xs text-emerald-200 mt-1">~Rp {perPersonTotal.toLocaleString('id-ID')} per orang</div>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleSaveBudgetPlan}
                className="w-full bg-white text-emerald-950 hover:bg-emerald-50 font-bold py-3.5 px-6 rounded-2xl text-xs transition shadow flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                Simpan Rencana Biaya
              </button>

              <button
                onClick={handleConsultAiAdvisor}
                className="w-full bg-emerald-800/80 hover:bg-emerald-800 text-emerald-100 font-bold py-2.5 px-4 rounded-xl text-xs transition border border-emerald-700 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Konsultasi Rencana Wisata
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* AI Product Manager Consultation Modal */}
      {isAiConsultOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden p-6 relative">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-900 flex items-center justify-center text-amber-300 shadow">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900">Konsultan Perencana Wisata Jelantara</h3>
                  <p className="text-xs text-gray-500">Optimasi Rencana Biaya & Efisiensi Anggaran</p>
                </div>
              </div>
              <button
                onClick={() => setIsAiConsultOpen(false)}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-5 overflow-y-auto space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed flex-grow">
              {aiLoading ? (
                <div className="flex flex-col items-center justify-center py-12 text-emerald-800">
                  <Loader2 className="w-8 h-8 animate-spin mb-2" />
                  <p className="text-xs font-semibold">Sistem sedang menganalisis rencana perjalanan Anda...</p>
                </div>
              ) : (
                <div className="whitespace-pre-wrap bg-gray-50 p-5 rounded-2xl border border-gray-200 font-sans text-xs leading-relaxed">
                  {aiAdvice}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setIsAiConsultOpen(false)}
                className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow"
              >
                Tutup Konsultasi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
