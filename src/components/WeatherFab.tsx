import React from 'react';
import { CloudSun } from 'lucide-react';

interface WeatherFabProps {
  onClick: () => void;
}

export const WeatherFab: React.FC<WeatherFabProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      aria-label="Cek Cuaca Alam"
      className="fixed bottom-6 right-6 z-[9999] w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-teal-700 via-cyan-700 to-emerald-800 text-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group border-2 border-white/30 backdrop-blur-md"
      title="Cek Cuaca Alam"
    >
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full border-2 border-white animate-pulse" />
      <CloudSun className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-100 group-hover:rotate-12 transition-transform duration-300" />
    </button>
  );
};
