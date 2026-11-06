import React from 'react';
import { Calculator, CheckCircle2 } from 'lucide-react';
import { SavedBudgetPlan } from '../types';

interface BudgetFabProps {
  savedPlan: SavedBudgetPlan | null;
  onClick: () => void;
}

export const BudgetFab: React.FC<BudgetFabProps> = ({ savedPlan, onClick }) => {
  if (!savedPlan) {
    return (
      <div className="fixed top-24 right-4 sm:right-8 z-40 animate-fadeIn">
        <button
          onClick={onClick}
          className="group flex items-center gap-2 bg-white/95 hover:bg-white text-emerald-900 px-3.5 py-2 rounded-2xl shadow-lg border border-emerald-200/80 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95"
          title="Kalkulator Rencana Biaya"
        >
          <div className="w-7 h-7 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
            <Calculator className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold hidden sm:inline">Rencana Biaya</span>
        </button>
      </div>
    );
  }

  // Active state when budget plan is saved
  return (
    <div className="fixed top-24 right-4 sm:right-8 z-40 animate-bounceOnce">
      <button
        onClick={onClick}
        aria-label="Rencana Biaya Tersimpan"
        className="group flex items-center gap-2.5 bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-900 text-white pl-3 pr-4 py-2 rounded-2xl shadow-xl hover:shadow-2xl border-2 border-emerald-400/50 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 relative"
        title={`Rencana Biaya ${savedPlan.destinationName}: Rp ${savedPlan.grandTotal.toLocaleString('id-ID')}`}
      >
        {/* Pulsing indicator signifier */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
        </span>

        <div className="w-8 h-8 rounded-xl bg-emerald-800 flex items-center justify-center text-amber-300 shadow-inner shrink-0">
          <Calculator className="w-4 h-4" />
        </div>

        <div className="text-left">
          <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-300 uppercase tracking-wider">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span className="truncate max-w-[110px] sm:max-w-[140px]">{savedPlan.destinationName}</span>
          </div>
          <div className="text-xs sm:text-sm font-black text-white leading-tight">
            Rp {savedPlan.grandTotal.toLocaleString('id-ID')}
          </div>
        </div>
      </button>
    </div>
  );
};
