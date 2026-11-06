import React, { useState } from 'react';
import { 
  PlusCircle, Search, Edit3, 
  CheckCircle2, AlertCircle, MapPin, DollarSign, Image as ImageIcon, Sparkles, Database, ExternalLink, Map 
} from 'lucide-react';
import { Destination, CategoryId } from '../types';
import { 
  getEffectiveDestinations, 
  saveDestinationOverride, 
  saveCustomDestination, 
  updateCustomDestination 
} from '../utils/destinationsHelper';

interface ManageDestinationsViewProps {
  onRefresh: () => void;
  onNavigateToMap?: (region?: string, destId?: string) => void;
}

export const ManageDestinationsView: React.FC<ManageDestinationsViewProps> = ({ onRefresh, onNavigateToMap }) => {
  const [destinations, setDestinations] = useState<Destination[]>(getEffectiveDestinations());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [lastAddedDest, setLastAddedDest] = useState<{ id: string; name: string; region: string } | null>(null);

  // Form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [region, setRegion] = useState('Jawa Timur');
  const [location, setLocation] = useState('');
  const [locationUrl, setLocationUrl] = useState('');
  const [category, setCategory] = useState<CategoryId>('mendaki');
  const [tagline, setTagline] = useState('');
  const [priceEstimate, setPriceEstimate] = useState<string>('');
  const [priceSourceUrl, setPriceSourceUrl] = useState('');
  const [image, setImage] = useState('/assets/aistudio/KAWAH_IJEN_e19ecf15.jpeg');
  const [lat, setLat] = useState<string>('');
  const [lng, setLng] = useState<string>('');
  const [highlightsStr, setHighlightsStr] = useState('');
  const [prosStr, setProsStr] = useState('');
  const [consStr, setConsStr] = useState('');
  const [activitiesStr, setActivitiesStr] = useState('');
  const [uniqueFactsStr, setUniqueFactsStr] = useState('');

  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const refreshList = () => {
    setDestinations(getEffectiveDestinations());
    onRefresh();
  };

  const handleResetForm = () => {
    setEditingId(null);
    setName('');
    setRegion('Jawa Timur');
    setLocation('');
    setLocationUrl('');
    setCategory('mendaki');
    setTagline('');
    setPriceEstimate('');
    setPriceSourceUrl('');
    setImage('/assets/aistudio/KAWAH_IJEN_e19ecf15.jpeg');
    setLat('');
    setLng('');
    setHighlightsStr('');
    setProsStr('');
    setConsStr('');
    setActivitiesStr('');
    setUniqueFactsStr('');
    setErrorMsg(null);
  };

  const handleEdit = (d: Destination) => {
    setEditingId(d.id);
    setName(d.name);
    setRegion(d.region || 'Jawa Timur');
    setLocation(d.location || '');
    setLocationUrl(d.locationUrl || '');
    setCategory(d.category || 'mendaki');
    setTagline(d.tagline || '');
    setPriceEstimate(d.priceEstimate ? String(d.priceEstimate) : '');
    setPriceSourceUrl(d.priceSourceUrl || '');
    setImage(d.image || '/assets/aistudio/KAWAH_IJEN_e19ecf15.jpeg');
    setLat(d.lat ? String(d.lat) : '');
    setLng(d.lng ? String(d.lng) : '');
    setHighlightsStr(d.highlights ? d.highlights.join(', ') : '');
    setProsStr(d.pros ? d.pros.join(', ') : '');
    setConsStr(d.cons ? d.cons.join(', ') : '');
    setActivitiesStr(d.activities ? d.activities.join(', ') : '');
    setUniqueFactsStr(d.uniqueFacts ? d.uniqueFacts.join(', ') : '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !location.trim()) {
      setErrorMsg('Nama dan lokasi destinasi wajib diisi.');
      return;
    }

    const priceNum = priceEstimate ? Number(priceEstimate) : null;
    let latNum = lat ? Number(lat) : undefined;
    let lngNum = lng ? Number(lng) : undefined;

    // Auto-extract lat/lng from locationUrl if provided
    if (locationUrl && (latNum === undefined || lngNum === undefined || isNaN(latNum) || isNaN(lngNum))) {
      const match = locationUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/) || locationUrl.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/) || locationUrl.match(/q=(-?\d+\.\d+),(-?\d+\.\d+)/);
      if (match) {
        latNum = Number(match[1]);
        lngNum = Number(match[2]);
      }
    }

    if (latNum === undefined || lngNum === undefined || isNaN(latNum) || isNaN(lngNum)) {
      const reg = region.toLowerCase();
      if (reg.includes('jawa barat') || reg.includes('bogor') || reg.includes('bandung')) {
        latNum = -6.9175; lngNum = 107.6191;
      } else if (reg.includes('jawa tengah') || reg.includes('dieng') || reg.includes('wonosobo')) {
        latNum = -7.2281; lngNum = 109.9163;
      } else if (reg.includes('jawa timur') || reg.includes('bromo') || reg.includes('ijen')) {
        latNum = -7.9425; lngNum = 112.9530;
      } else if (reg.includes('bali')) {
        latNum = -8.4095; lngNum = 115.1889;
      } else if (reg.includes('lombok') || reg.includes('nusa tenggara')) {
        latNum = -8.8523; lngNum = 116.5123;
      } else if (reg.includes('sumatera') || reg.includes('toba')) {
        latNum = 2.6843; lngNum = 98.8756;
      } else {
        latNum = -2.5489; lngNum = 118.0149;
      }
    }

    const highlights = highlightsStr ? highlightsStr.split(',').map(s => s.trim()).filter(Boolean) : ['Keindahan Alam'];
    const pros = prosStr ? prosStr.split(',').map(s => s.trim()).filter(Boolean) : ['Pemandangan indah'];
    const cons = consStr ? consStr.split(',').map(s => s.trim()).filter(Boolean) : ['Akses perlu kehati-hatian'];
    const activities = activitiesStr ? activitiesStr.split(',').map(s => s.trim()).filter(Boolean) : ['Fotografi', 'Jelajah Alam'];
    const uniqueFacts = uniqueFactsStr ? uniqueFactsStr.split(',').map(s => s.trim()).filter(Boolean) : ['Kawasan alami terlindungi'];

    if (editingId) {
      // Update existing
      saveDestinationOverride(editingId, {
        name,
        region,
        location,
        locationUrl: locationUrl.trim() || undefined,
        category,
        tagline: tagline || name,
        priceEstimate: priceNum,
        priceSourceUrl,
        image,
        lat: latNum,
        lng: lngNum,
        highlights,
        pros,
        cons,
        activities,
        uniqueFacts,
        status: 'published',
        verificationDate: new Date().toISOString().split('T')[0]
      });
      setSuccessMsg(`Destinasi "${name}" berhasil diperbarui & langsung tampil di Peta Interaktif.`);
      setLastAddedDest({ id: editingId, name, region });
    } else {
      // Create new custom destination
      const newId = `custom-${Date.now()}`;
      const newDest: Destination = {
        id: newId,
        name,
        tagline: tagline || name,
        category,
        region,
        location,
        locationUrl: locationUrl.trim() || undefined,
        image,
        gallery: [image],
        priceEstimate: priceNum,
        priceMaxEstimate: priceNum,
        priceDetails: priceNum ? `Tiket masuk Rp ${priceNum.toLocaleString('id-ID')}` : 'Harga belum diverifikasi',
        priceSourceUrl,
        verificationDate: new Date().toISOString().split('T')[0],
        priceCategory: priceNum && priceNum < 100000 ? 'Hemat (<100rb)' : priceNum && priceNum <= 500000 ? 'Sedang (100rb-500rb)' : priceNum ? 'Premium (>500rb)' : 'Budget belum tersedia',
        difficulty: 'Mudah (Pemula)',
        rating: 4.8,
        reviewsCount: 12,
        travelTime: '1-2 jam dari pusat kota terdekat',
        accessType: 'Motor / Mobil Pribadi',
        lat: latNum,
        lng: lngNum,
        status: 'published',
        highlights,
        pros,
        cons,
        activities,
        uniqueFacts,
        ecoTips: ['Bawa botol minum sendiri dan jaga kebersihan lokasi wisata.']
      };
      saveCustomDestination(newDest);
      setSuccessMsg(`Destinasi baru "${name}" berhasil ditambahkan & langsung tampil di Peta Interaktif.`);
      setLastAddedDest({ id: newId, name, region });
    }

    handleResetForm();
    refreshList();
    setTimeout(() => setSuccessMsg(null), 8000);
  };

  // Unique regions for filter
  const regions = Array.from(new Set(destinations.map(d => d.region))).filter(Boolean);

  const filtered = destinations.filter(d => {
    const matchesSearch = 
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.region.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || d.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-3.5 py-1.5 rounded-full text-xs font-bold mb-3">
            <Database className="w-4 h-4 text-emerald-700" />
            New Insight — Kurasi & Kelola Destinasi
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">New Insight Destinasi</h2>
          <p className="text-sm text-gray-600 mt-1">
            Tambah, edit, dan kelola destinasi wisata. Setiap data yang Anda masukkan langsung terhubung dan tampil di Peta Interaktif.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-2xl text-xs font-bold text-emerald-900">
            Total Destinasi: {destinations.length}
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="mb-6 bg-emerald-50 border border-emerald-300 p-4 sm:p-5 rounded-2xl text-xs sm:text-sm text-emerald-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm animate-fadeIn">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
            <span className="font-semibold">{successMsg}</span>
          </div>
          {onNavigateToMap && lastAddedDest && (
            <button
              onClick={() => onNavigateToMap(lastAddedDest.region, lastAddedDest.id)}
              className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition shadow flex items-center gap-2 shrink-0 self-start sm:self-auto"
            >
              <Map className="w-4 h-4 text-amber-300" />
              <span>Lihat Langsung di Peta Interaktif &rarr;</span>
            </button>
          )}
        </div>
      )}

      {errorMsg && (
        <div className="mb-6 bg-rose-50 border border-rose-200 p-4 rounded-2xl text-xs sm:text-sm text-rose-900 flex items-center gap-3 shadow-sm">
          <AlertCircle className="w-5 h-5 text-rose-700 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form Tambah/Edit */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm h-fit">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-emerald-700" />
              {editingId ? 'Edit Destinasi Wisata' : 'Tambah Destinasi Baru'}
            </h3>
            {editingId && (
              <button 
                onClick={handleResetForm}
                className="text-xs text-rose-600 font-bold hover:underline"
              >
                Batal Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Nama Destinasi *</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Contoh: Air Terjun Madakaripura"
                required
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-emerald-800 outline-none transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Provinsi</label>
                <input
                  type="text"
                  value={region}
                  onChange={e => setRegion(e.target.value)}
                  placeholder="Contoh: Jawa Timur"
                  required
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-emerald-800 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Kabupaten / Kota *</label>
                <input
                  type="text"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  placeholder="Contoh: Probolinggo"
                  required
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-emerald-800 outline-none transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Kategori</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as CategoryId)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-emerald-800 outline-none transition"
                >
                  <option value="mendaki">Mendaki</option>
                  <option value="berenang">Berenang & Air Terjun</option>
                  <option value="pantai">Pantai</option>
                  <option value="camping">Camping</option>
                  <option value="snorkeling">Snorkeling</option>
                  <option value="keluarga">Keluarga</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-emerald-950">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                    Link Lokasi Wisata
                  </span>
                  <span className="text-[10px] text-gray-400 font-normal">Google Maps</span>
                </label>
                <input
                  type="url"
                  value={locationUrl}
                  onChange={e => {
                    const val = e.target.value;
                    setLocationUrl(val);
                    const match = val.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/) || val.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/) || val.match(/q=(-?\d+\.\d+),(-?\d+\.\d+)/);
                    if (match && (!lat || !lng)) {
                      setLat(match[1]);
                      setLng(match[2]);
                    }
                  }}
                  placeholder="https://maps.google.com/..."
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-emerald-800 outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Tagline / Deskripsi Singkat</label>
              <textarea
                rows={2}
                value={tagline}
                onChange={e => setTagline(e.target.value)}
                placeholder="Pesona keindahan alam tersembunyi..."
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-emerald-800 outline-none transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Harga Tiket (Rp)</label>
                <input
                  type="number"
                  value={priceEstimate}
                  onChange={e => setPriceEstimate(e.target.value)}
                  placeholder="Contoh: 50000"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-emerald-800 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">URL Sumber Harga</label>
                <input
                  type="text"
                  value={priceSourceUrl}
                  onChange={e => setPriceSourceUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-emerald-800 outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">URL Foto Destinasi</label>
              <input
                type="text"
                value={image}
                onChange={e => setImage(e.target.value)}
                placeholder="/assets/aistudio/... atau https://..."
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-emerald-800 outline-none transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Latitude (Opsional)</label>
                <input
                  type="number"
                  step="any"
                  value={lat}
                  onChange={e => setLat(e.target.value)}
                  placeholder="-7.856"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-emerald-800 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Longitude (Opsional)</label>
                <input
                  type="number"
                  step="any"
                  value={lng}
                  onChange={e => setLng(e.target.value)}
                  placeholder="112.984"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-emerald-800 outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Daya Tarik Utama (pisahkan koma)</label>
              <input
                type="text"
                value={highlightsStr}
                onChange={e => setHighlightsStr(e.target.value)}
                placeholder="Air Terjun Purba, Tebing Hijau, Sunrise"
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-emerald-800 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Kelebihan (pisahkan koma)</label>
              <input
                type="text"
                value={prosStr}
                onChange={e => setProsStr(e.target.value)}
                placeholder="Air sangat jernih, Pemandangan spektakuler"
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-emerald-800 outline-none transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-900 hover:bg-emerald-800 text-white font-bold py-3.5 px-6 rounded-2xl shadow transition flex items-center justify-center gap-2 mt-4"
            >
              <PlusCircle className="w-5 h-5" />
              <span>{editingId ? 'Simpan Perubahan Destinasi' : 'Tambahkan Destinasi Baru'}</span>
            </button>
          </form>
        </div>

        {/* Right Column: Daftar Destinasi & Filter */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col">
          
          {/* Controls & Filters */}
          <div className="space-y-4 mb-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Cari nama atau lokasi..."
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-10 pr-4 py-2 text-sm font-medium focus:ring-2 focus:ring-emerald-800 outline-none"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={selectedRegion}
                  onChange={e => setSelectedRegion(e.target.value)}
                  className="bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 outline-none w-full sm:w-auto"
                >
                  <option value="all">Semua Provinsi</option>
                  {regions.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* List of Destinations */}
          <div className="flex-grow overflow-y-auto max-h-[700px] space-y-3 pr-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-gray-400 space-y-2">
                <Database className="w-10 h-10 mx-auto text-gray-300" />
                <p className="text-sm font-medium">Tidak ada destinasi yang sesuai dengan filter.</p>
              </div>
            ) : (
              filtered.map(d => (
                <div 
                  key={d.id} 
                  className="p-4 rounded-2xl border transition flex items-center justify-between gap-4 bg-white border-gray-200 hover:border-emerald-300 hover:shadow-sm"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img 
                      src={d.image} 
                      alt={d.name} 
                      className="w-14 h-14 rounded-xl object-cover shrink-0 border border-gray-200"
                      onError={(e)=>{(e.target as HTMLImageElement).src='/assets/aistudio/KAWAH_IJEN_e19ecf15.jpeg'}}
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-gray-900 truncate">{d.name}</h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          {d.region}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 truncate mt-0.5">{d.location || d.region}</p>
                      <div className="text-[11px] font-semibold text-emerald-900 mt-1">
                        {d.priceEstimate ? `Rp ${d.priceEstimate.toLocaleString('id-ID')}` : 'Harga belum diverifikasi'}
                      </div>
                      {d.locationUrl && (
                        <a
                          href={d.locationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-900 underline mt-0.5"
                          title={d.locationUrl}
                        >
                          <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span className="truncate max-w-[140px] sm:max-w-[200px]">Link Lokasi</span>
                          <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {onNavigateToMap && (
                      <button
                        onClick={() => onNavigateToMap(d.region, d.id)}
                        className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 transition"
                        title="Buka Destinasi Ini di Peta Interaktif"
                      >
                        <Map className="w-4 h-4 text-emerald-800" />
                      </button>
                    )}
                    <button
                      onClick={() => handleEdit(d)}
                      className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
                      title="Edit Destinasi"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 text-center text-xs text-gray-400">
            Menampilkan {filtered.length} dari {destinations.length} total destinasi terdaftar.
          </div>

        </div>

      </div>
    </div>
  );
};
