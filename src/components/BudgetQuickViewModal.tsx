import React, { useState } from 'react';
import { 
  Calculator, X, ArrowRight, Trash2, Sparkles, Loader2, Calendar, Users, 
  Car, Home, ShieldCheck, CheckCircle2 
} from 'lucide-react';
import { SavedBudgetPlan, Destination } from '../types';

interface BudgetQuickViewModalProps {
  plan: SavedBudgetPlan | null;
  onClose: () => void;
  onOpenPlanner: (destId?: string) => void;
  onDeletePlan: () => void;
}

export const BudgetQuickViewModal: React.FC<BudgetQuickViewModalProps> = ({
  plan,
  onClose,
  onOpenPlanner,
  onDeletePlan,
}) => {
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const handleConsultAi = async () => {
    if (!plan) return;
    setLoadingAi(true);
    setAiAdvice(null);
    try {
      const res = await fetch('/api/budget-planner-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: `Tolong berikan analisis produk dan optimasi budget untuk rencana perjalanan wisata: Destinasi: ${plan.destinationName} (${plan.destinationRegion}), Durasi: ${plan.days} hari, Peserta: ${plan.travelers} orang, Transportasi: ${plan.transportMode}, Akomodasi: ${plan.accommodationType}, Sewa Alat: ${plan.includeGear ? 'Ya' : 'Tidak'}, Total Biaya: Rp ${plan.grandTotal.toLocaleString('id-ID')} (Rp ${plan.perPersonTotal.toLocaleString('id-ID')} / orang). Berikan evaluasi zero-friction, tips efisiensi, dan konversi ke tahap booking.`
        })
      });
      const data = await res.json();
      if (data.guidance) {
        setAiAdvice(data.guidance);
      } else {
        setAiAdvice('Analisis AI telah selesai.');
      }
    } catch (err: any) {
      console.error(err);
      setAiAdvice('Gagal memuat analisis AI Advisor. Periksa koneksi atau coba kembali.');
    } finally {
      setLoadingAi(false);
    }
  };

  if (!plan) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
        <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl relative">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center mx-auto">
            <Calculator className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Belum Ada Rencana Tersimpan</h3>
          <p className="text-xs text-gray-500">
            Anda belum menyimpan rencana biaya. Gunakan Kalkulator Rencana Biaya untuk menghitung dan menyimpan estimasi biaya perjalanan alam Anda.
          </p>
          <button
            onClick={() => {
              onClose();
              onOpenPlanner();
            }}
            className="w-full bg-emerald-900 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl text-xs transition shadow flex items-center justify-center gap-2"
          >
            Buka Kalkulator Rencana Biaya
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  const transportLabels = {
    motor: 'Motor Pribadi',
    mobil: 'Mobil Pribadi',
    umum: 'Kendaraan Umum'
  };

  const accomLabels = {
    tenda: 'Camping / Tenda',
    homestay: 'Homestay Desa',
    hotel: 'Hotel Nyaman'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-900 text-white p-5 flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-800 flex items-center justify-center text-emerald-200 shadow-inner">
              <Calculator className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black">Rencana Biaya Tersimpan</h3>
                <span className="bg-emerald-700/80 text-[10px] text-emerald-100 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-300" />
                  Tersimpan
                </span>
              </div>
              <p className="text-xs text-emerald-200">Akses Cepat & Zero Friction Recovery</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 bg-gray-50 flex-grow">
          {/* Destination Banner */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                {plan.destinationRegion}
              </span>
              <h4 className="text-base sm:text-lg font-bold text-gray-900 mt-1">{plan.destinationName}</h4>
              <p className="text-xs text-gray-500 mt-0.5">
                Disimpan pada: {new Date(plan.savedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-semibold text-gray-500">Estimasi Total</div>
              <div className="text-xl sm:text-2xl font-black text-emerald-900">
                Rp {plan.grandTotal.toLocaleString('id-ID')}
              </div>
              <div className="text-[11px] text-gray-500 font-medium">
                ~Rp {plan.perPersonTotal.toLocaleString('id-ID')} / orang
              </div>
            </div>
          </div>

          {/* Quick Config Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="bg-white p-3 rounded-xl border border-gray-200 text-center">
              <Calendar className="w-4 h-4 text-emerald-700 mx-auto mb-1" />
              <div className="text-[10px] text-gray-400 font-bold uppercase">Durasi</div>
              <div className="text-xs font-bold text-gray-800">{plan.days} Hari</div>
            </div>
            <div className="bg-white p-3 rounded-xl border border-gray-200 text-center">
              <Users className="w-4 h-4 text-emerald-700 mx-auto mb-1" />
              <div className="text-[10px] text-gray-400 font-bold uppercase">Peserta</div>
              <div className="text-xs font-bold text-gray-800">{plan.travelers} Orang</div>
            </div>
            <div className="bg-white p-3 rounded-xl border border-gray-200 text-center">
              <Car className="w-4 h-4 text-emerald-700 mx-auto mb-1" />
              <div className="text-[10px] text-gray-400 font-bold uppercase">Transport</div>
              <div className="text-xs font-bold text-gray-800 truncate">{transportLabels[plan.transportMode] || plan.transportMode}</div>
            </div>
            <div className="bg-white p-3 rounded-xl border border-gray-200 text-center">
              <Home className="w-4 h-4 text-emerald-700 mx-auto mb-1" />
              <div className="text-[10px] text-gray-400 font-bold uppercase">Akomodasi</div>
              <div className="text-xs font-bold text-gray-800 truncate">{accomLabels[plan.accommodationType] || plan.accommodationType}</div>
            </div>
          </div>

          {/* Itemized Cost Breakdown */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm space-y-2.5 text-xs">
            <h5 className="font-bold text-gray-900 text-xs border-b border-gray-100 pb-2">
              Rincian Perhitungan Biaya
            </h5>
            <div className="flex justify-between text-gray-600">
              <span>Tiket Masuk ({plan.travelers}x)</span>
              <span className="font-semibold text-gray-900">Rp {plan.totalTicket.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Transportasi Utama ({transportLabels[plan.transportMode]})</span>
              <span className="font-semibold text-gray-900">Rp {plan.totalTransport.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Akomodasi ({accomLabels[plan.accommodationType]})</span>
              <span className="font-semibold text-gray-900">Rp {plan.accomTotal.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Konsumsi & Logistik ({plan.days} hari x {plan.travelers} org)</span>
              <span className="font-semibold text-gray-900">Rp {plan.foodTotal.toLocaleString('id-ID')}</span>
            </div>
            {plan.includeGear && (
              <div className="flex justify-between text-gray-600">
                <span>Sewa Alat Outdoor ({plan.travelers} orang)</span>
                <span className="font-semibold text-gray-900">Rp {plan.totalGear.toLocaleString('id-ID')}</span>
              </div>
            )}
            <div className="pt-2 border-t border-gray-100 flex justify-between font-bold text-emerald-950 text-sm">
              <span>Total Estimasi Biaya</span>
              <span>Rp {plan.grandTotal.toLocaleString('id-ID')}</span>
            </div>
          </div>

          {/* AI Product Manager & Advisor Consultation */}
          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                <Sparkles className="w-4 h-4 text-emerald-700 animate-pulse" />
                AI Product Manager & System Architect
              </div>
              <button
                onClick={handleConsultAi}
                disabled={loadingAi}
                className="bg-emerald-800 hover:bg-emerald-700 disabled:opacity-50 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl transition shadow flex items-center gap-1.5"
              >
                {loadingAi ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Menganalisis...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    Analisis AI
                  </>
                )}
              </button>
            </div>

            {aiAdvice && (
              <div className="bg-white p-3.5 rounded-xl border border-emerald-200 text-xs text-gray-800 leading-relaxed font-sans whitespace-pre-wrap">
                {aiAdvice}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-white border-t border-gray-200 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={() => {
              if (window.confirm('Hapus rencana biaya tersimpan?')) {
                onDeletePlan();
                onClose();
              }
            }}
            className="px-3.5 py-2.5 rounded-xl bg-gray-100 hover:bg-rose-50 text-gray-600 hover:text-rose-600 text-xs font-bold transition flex items-center gap-1.5"
            title="Hapus Rencana"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Hapus Rencana</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-bold transition"
            >
              Tutup
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenPlanner(plan.destinationId);
              }}
              className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition shadow flex items-center gap-1.5"
            >
              Buka di Kalkulator
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
