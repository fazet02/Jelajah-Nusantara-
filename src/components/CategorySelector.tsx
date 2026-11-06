import React from 'react';
import { CATEGORIES } from '../data/destinations';
import { CategoryId } from '../types';
import { Compass, Mountain, Droplets, Sun, Tent, Fish, Users } from 'lucide-react';

interface CategorySelectorProps {
  selectedCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Mountain': return <Mountain className="w-5 h-5" />;
      case 'Droplets': return <Droplets className="w-5 h-5" />;
      case 'Sun': return <Sun className="w-5 h-5" />;
      case 'Tent': return <Tent className="w-5 h-5" />;
      case 'Fish': return <Fish className="w-5 h-5" />;
      case 'Users': return <Users className="w-5 h-5" />;
      default: return <Compass className="w-5 h-5" />;
    }
  };

  return (
    <div className="w-full py-4 overflow-x-auto scrollbar-none bg-white transition-colors">
      <div className="flex items-center gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-w-max">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-200 border ${
                isSelected
                  ? 'bg-emerald-900 text-white border-emerald-900 shadow-md scale-105'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-emerald-800 hover:text-emerald-900 shadow-sm'
              }`}
            >
              <div className={`${isSelected ? 'text-emerald-200' : 'text-emerald-700'}`}>
                {getIcon(cat.iconName)}
              </div>
              <div className="text-left">
                <div className="text-sm font-bold tracking-tight">{cat.name}</div>
                <div className={`text-[11px] ${isSelected ? 'text-emerald-200' : 'text-gray-400'}`}>
                  {cat.id === 'all' ? 'Semua pilihan' : 'Wisata alam'}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
