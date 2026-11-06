import React, { useState, useEffect } from 'react';
import { Destination, CategoryId, SavedBudgetPlan } from './types';
import { getActiveDestinations } from './utils/destinationsHelper';
import { Navbar } from './components/Navbar';
import { CategorySelector } from './components/CategorySelector';
import { DestinationCard } from './components/DestinationCard';
import { DestinationDetailModal } from './components/DestinationDetailModal';
import { BudgetPlanner } from './components/BudgetPlanner';
import { InteractiveMap } from './components/InteractiveMap';
import { SavedModal } from './components/SavedModal';
import { AiPlannerModal } from './components/AiPlannerModal';
import { WeatherModal } from './components/WeatherModal';
import { WeatherFab } from './components/WeatherFab';
import { BudgetFab } from './components/BudgetFab';
import { BudgetQuickViewModal } from './components/BudgetQuickViewModal';
import { ManageDestinationsView } from './components/ManageDestinationsView';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { useAuth } from './utils/AuthContext';
import { Search, Compass, Leaf } from 'lucide-react';

export default function App() {
  const { isAuthModalOpen, setIsAuthModalOpen, authModalMode } = useAuth();
  const [activeTab, setActiveTab] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    if (['explore', 'budget', 'map', 'saved', 'manage'].includes(hash)) {
      return hash;
    }
    return 'explore';
  });

  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const local = localStorage.getItem('jelantara_saved');
      return local ? JSON.parse(local) : ['kawah-ijen', 'gunung-bromo'];
    } catch {
      return ['kawah-ijen'];
    }
  });

  const [savedBudgetPlan, setSavedBudgetPlan] = useState<SavedBudgetPlan | null>(() => {
    try {
      const local = localStorage.getItem('jelantara_saved_budget_plan');
      return local ? JSON.parse(local) : null;
    } catch {
      return null;
    }
  });
  const [isBudgetQuickViewOpen, setIsBudgetQuickViewOpen] = useState<boolean>(false);

  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [budgetPlannerInitialDest, setBudgetPlannerInitialDest] = useState<Destination | null>(null);
  const [mapTargetRegion, setMapTargetRegion] = useState<string>('all');
  const [mapTargetDestId, setMapTargetDestId] = useState<string | null>(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [isWeatherModalOpen, setIsWeatherModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleBudgetUpdate = () => {
      try {
        const local = localStorage.getItem('jelantara_saved_budget_plan');
        setSavedBudgetPlan(local ? JSON.parse(local) : null);
      } catch {
        setSavedBudgetPlan(null);
      }
    };
    const handleDestUpdate = () => {
      setRefreshKey(prev => prev + 1);
    };

    window.addEventListener('budget_plan_updated', handleBudgetUpdate);
    window.addEventListener('destinations_updated', handleDestUpdate);
    window.addEventListener('storage', handleBudgetUpdate);
    return () => {
      window.removeEventListener('budget_plan_updated', handleBudgetUpdate);
      window.removeEventListener('destinations_updated', handleDestUpdate);
      window.removeEventListener('storage', handleBudgetUpdate);
    };
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['explore', 'budget', 'map', 'saved', 'manage'].includes(hash)) {
        setActiveTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (['explore', 'budget', 'map', 'saved', 'manage'].includes(activeTab)) {
      window.location.hash = activeTab === 'explore' ? '' : activeTab;
    }
  }, [activeTab]);

  useEffect(() => {
    try {
      localStorage.setItem('jelantara_saved', JSON.stringify(savedIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedIds]);

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleOpenBudgetPlannerForDest = (dest: Destination, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBudgetPlannerInitialDest(dest);
    setActiveTab('budget');
  };

  const activeDestinations = getActiveDestinations();

  // Filter destinations
  const filteredDestinations = activeDestinations.filter(dest => {
    const matchesCategory = selectedCategory === 'all' || dest.category === selectedCategory;
    const matchesQuery = 
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'all' || dest.difficulty.includes(selectedDifficulty);

    return matchesCategory && matchesQuery && matchesDifficulty;
  });

  const savedDestinationsList = activeDestinations.filter(d => savedIds.includes(d.id));

  return (
    <div key={refreshKey} className="min-h-screen bg-[#f8f9fa] text-gray-900 font-sans selection:bg-emerald-800 selection:text-white flex flex-col justify-between relative">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedIds.length}
        onOpenAiPlanner={() => setIsAiModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        
        {/* EXPLORE TAB */}
        {activeTab === 'explore' && (
          <div className="animate-fadeIn">
            
            {/* Hero Banner */}
            <section className="relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
              
              <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
                <div className="inline-flex items-center gap-2 bg-emerald-800/85 backdrop-blur-md text-emerald-200 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                  <Leaf className="w-4 h-4 text-emerald-400" />
                  JELANTARA - JELAJAH NUSANTARA
                </div>

                <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
                  Jelajah Alam Indonesia, <br className="hidden sm:inline" /> Sesuai Caramu
                </h1>

                <p className="text-base sm:text-lg text-emerald-100 max-w-2xl mx-auto font-normal">
                  Temukan destinasi wisata alam sesuai minat, budget, dan akses perjalanan. <br className="hidden sm:inline" />
                  Jelantara siap wujudkan petualangan alam impianmu dengan mudah.
                </p>

                {/* Search Bar Capsule */}
                <div className="bg-white rounded-full p-2.5 max-w-2xl mx-auto shadow-2xl flex items-center border border-gray-200 mt-8">
                  <div className="flex items-center gap-3 px-4 flex-grow">
                    <Search className="w-5 h-5 text-gray-400 shrink-0" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Mau jelajah ke mana hari ini?"
                      className="w-full text-gray-900 text-sm font-medium placeholder-gray-400 outline-none bg-transparent"
                    />
                  </div>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-xs text-gray-400 hover:text-gray-700 px-3 font-semibold"
                    >
                      Reset
                    </button>
                  )}
                  <button 
                    onClick={() => {}}
                    className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold px-6 py-3 rounded-full text-sm transition shadow-md shrink-0"
                  >
                    Jelajahi Wisata
                  </button>
                </div>
              </div>
            </section>

            {/* Category Selector */}
            <div className="bg-white border-b border-gray-200 sticky top-20 z-40 shadow-sm">
              <CategorySelector
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>

            {/* Catalog Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-black text-gray-900">Eksplorasi Destinasi Terverifikasi</h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Menampilkan {filteredDestinations.length} dari {activeDestinations.length} destinasi publik dengan tiket sah
                  </p>
                </div>

                {/* Difficulty Filter */}
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="bg-white border border-gray-300 rounded-2xl px-4 py-2.5 text-xs font-bold text-gray-800 outline-none shadow-sm"
                >
                  <option value="all">Semua Tingkat Kesulitan</option>
                  <option value="Mudah">Mudah (Pemula)</option>
                  <option value="Sedang">Sedang</option>
                  <option value="Tantangan Ekstrem">Tantangan Ekstrem</option>
                </select>
              </div>

              {filteredDestinations.length === 0 ? (
                <div className="bg-white rounded-3xl p-16 text-center border border-gray-200 shadow-sm space-y-3">
                  <Compass className="w-12 h-12 text-gray-300 mx-auto" />
                  <h3 className="text-lg font-bold text-gray-800">Tidak ada destinasi yang sesuai</h3>
                  <p className="text-xs text-gray-500 max-w-md mx-auto">
                    Coba ubah kata kunci pencarian, kategori, atau tingkat kesulitan. Destinasi tanpa harga terverifikasi disembunyikan secara otomatis.
                  </p>
                  <button
                    onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedDifficulty('all'); }}
                    className="mt-2 bg-emerald-900 text-white text-xs font-bold px-5 py-2.5 rounded-full transition hover:bg-emerald-800"
                  >
                    Reset Filter
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredDestinations.map((dest) => (
                    <DestinationCard
                      key={dest.id}
                      destination={dest}
                      isSaved={savedIds.includes(dest.id)}
                      onToggleSave={toggleSave}
                      onSelect={(d) => setSelectedDestination(d)}
                      onPlanBudget={handleOpenBudgetPlannerForDest}
                    />
                  ))}
                </div>
              )}

            </div>

          </div>
        )}

        {/* BUDGET PLANNER TAB */}
        {activeTab === 'budget' && (
          <BudgetPlanner 
            initialDestination={budgetPlannerInitialDest} 
            onGoToExplore={() => setActiveTab('explore')}
          />
        )}

        {/* INTERACTIVE MAP TAB */}
        {activeTab === 'map' && (
          <InteractiveMap
            initialRegion={mapTargetRegion}
            highlightedDestId={mapTargetDestId}
            onSelectDestination={(d) => setSelectedDestination(d)}
            onRefreshData={() => setRefreshKey(prev => prev + 1)}
            onNavigateToNewInsight={() => setActiveTab('manage')}
          />
        )}

        {/* MANAGE DESTINATIONS TAB (New Insight) */}
        {activeTab === 'manage' && (
          <ManageDestinationsView 
            onRefresh={() => setRefreshKey(prev => prev + 1)} 
            onNavigateToMap={(region, destId) => {
              if (region) setMapTargetRegion(region);
              if (destId) setMapTargetDestId(destId);
              setActiveTab('map');
            }}
          />
        )}

        {/* SAVED / WISHLIST TAB */}
        {activeTab === 'saved' && (
          <SavedModal
            savedDestinations={savedDestinationsList}
            onClose={() => setActiveTab('explore')}
            onToggleSave={toggleSave}
            onSelectDestination={(d) => setSelectedDestination(d)}
          />
        )}

      </main>

      {/* Floating Action Button (FAB) di Kanan Atas Halaman Beranda for Saved Budget Plan */}
      {activeTab === 'explore' && (
        <BudgetFab
          savedPlan={savedBudgetPlan}
          onClick={() => setIsBudgetQuickViewOpen(true)}
        />
      )}

      {/* Floating Action Button (FAB) for Weather */}
      <WeatherFab onClick={() => setIsWeatherModalOpen(true)} />

      {/* Quick View & Recall Modal for Saved Budget */}
      {isBudgetQuickViewOpen && (
        <BudgetQuickViewModal
          plan={savedBudgetPlan}
          onClose={() => setIsBudgetQuickViewOpen(false)}
          onOpenPlanner={(destId) => {
            if (destId) {
              const d = activeDestinations.find(dest => dest.id === destId);
              if (d) setBudgetPlannerInitialDest(d);
            }
            setActiveTab('budget');
          }}
          onDeletePlan={() => {
            localStorage.removeItem('jelantara_saved_budget_plan');
            window.dispatchEvent(new Event('budget_plan_updated'));
          }}
        />
      )}

      {/* Destination Detail Modal */}
      <DestinationDetailModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        isSaved={selectedDestination ? savedIds.includes(selectedDestination.id) : false}
        onToggleSave={toggleSave}
        onOpenBudgetPlanner={(dest) => {
          setSelectedDestination(null);
          handleOpenBudgetPlannerForDest(dest);
        }}
      />

      {/* AI Planner Modal (WisataBot) */}
      {isAiModalOpen && (
        <AiPlannerModal 
          onClose={() => setIsAiModalOpen(false)}
          onSelectDestination={(d) => {
            setIsAiModalOpen(false);
            setSelectedDestination(d);
          }}
          onOpenBudgetPlanner={(d) => {
            setIsAiModalOpen(false);
            handleOpenBudgetPlannerForDest(d);
          }}
        />
      )}

      {/* Weather Modal */}
      {isWeatherModalOpen && (
        <WeatherModal onClose={() => setIsWeatherModalOpen(false)} />
      )}

      {/* Authentication & Session Modal */}
      {isAuthModalOpen && (
        <AuthModal 
          initialMode={authModalMode} 
          onClose={() => setIsAuthModalOpen(false)} 
        />
      )}

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} onOpenAiPlanner={() => setIsAiModalOpen(true)} />

    </div>
  );
}
