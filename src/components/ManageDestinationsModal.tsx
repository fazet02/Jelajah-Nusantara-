import React, { useState } from 'react';
import { Destination } from '../types';
import { DESTINATIONS } from '../data/destinations';
import { getDestinationOverrides, saveDestinationOverride, OverridesMap } from '../utils/destinationsHelper';
import { Search, X, Settings, Save, Link as LinkIcon, DollarSign } from 'lucide-react';

interface ManageDestinationsModalProps {
  onClose: () => void;
  onUpdate: () => void;
}

export const ManageDestinationsModal: React.FC<ManageDestinationsModalProps> = ({ onClose, onUpdate }) => {
  const [overrides, setOverrides] = useState<OverridesMap>(() => getDestinationOverrides());
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [editingDestId, setEditingDestId] = useState<string | null>(null);

  // Form edit state
  const [editPrice, setEditPrice] = useState<string>('');
  const [editSourceUrl, setEditSourceUrl] = useState<string>('');
  const [editDate, setEditDate] = useState<string>('');

  const effectiveDestinations = DESTINATIONS.map(d => {
    const ov = overrides[d.id];
    if (!ov) return d;
    return {
      ...d,
      priceEstimate: ov.priceEstimate !== undefined ? ov.priceEstimate : d.priceEstimate,
      priceSourceUrl: ov.priceSourceUrl !== undefined ? ov.priceSourceUrl : d.priceSourceUrl,
      verificationDate: ov.verificationDate !== undefined ? ov.verificationDate : d.verificationDate,
    };
  });

  const regions = Array.from(new Set(effectiveDestinations.map(d => d.region))).filter(Boolean);

  const filtered = effectiveDestinations.filter(d => {
    const matchesSearch = 
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.region.toLowerCase().includes(search.toLowerCase()) ||
      d.location.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || d.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  const handleStartEdit = (d: Destination) => {
    setEditingDestId(d.id);
    setEditPrice(d.priceEstimate != null ? d.priceEstimate.toString() : '');
    setEditSourceUrl(d.priceSourceUrl || '');
    setEditDate(d.verificationDate || new Date().toISOString().split('T')[0]);
  };

  const handleSaveEdit = (d: Destination) => {
    const priceNum = editPrice.trim() !== '' ? parseInt(editPrice, 10) : null;

    const updated = saveDestinationOverride(d.id, {
      status: 'published',
      priceEstimate: priceNum,
      priceSourceUrl: editSourceUrl.trim(),
      verificationDate: editDate.trim(),
    });

    setOverrides(updated);
    setEditingDestId(null);
    onUpdate();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-emerald-950 text-white">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-800 p-2.5 rounded-2xl">
              <Settings className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Kelola Destinasi & Verifikasi Harga</h3>
              <p className="text-xs text-emerald-200 mt-0.5">
                Total {effectiveDestinations.length} Destinasi Wisata Terdaftar
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-emerald-300 hover:text-white p-2 rounded-full hover:bg-emerald-900 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 sm:p-6 border-b border-gray-100 bg-gray-50/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative flex-grow w-full">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nama destinasi, daerah, atau lokasi..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-medium outline-none focus:border-emerald-700 shadow-sm"
              />
            </div>

            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full sm:w-auto bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-gray-700 outline-none shadow-sm"
            >
              <option value="all">Semua Provinsi ({effectiveDestinations.length})</option>
              {regions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Destination List */}
        <div className="p-6 overflow-y-auto space-y-3 flex-grow max-h-[60vh]">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-sm font-semibold">Tidak ada destinasi yang ditemukan.</p>
            </div>
          ) : (
            filtered.map((dest) => {
              const isEditing = editingDestId === dest.id;
              const hasPrice = dest.priceEstimate != null && dest.priceEstimate > 0;

              return (
                <div
                  key={dest.id}
                  className="p-4 rounded-2xl border transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border-gray-200 hover:border-emerald-300"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 bg-gray-100 border border-gray-100"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/aistudio/DATARAN_TINGGI_35df184c.jpeg';
                      }}
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 capitalize">
                          {dest.category}
                        </span>
                        <span className="text-[10px] text-gray-500 font-medium">{dest.region}</span>
                      </div>
                      <h4 className="text-sm font-bold text-gray-900 truncate">{dest.name}</h4>
                      <p className="text-xs text-gray-500 truncate mt-0.5">
                        Tiket: <strong className="text-gray-900">{hasPrice ? `Rp ${dest.priceEstimate!.toLocaleString('id-ID')}` : 'Belum tersedia'}</strong>
                        {dest.priceSourceUrl && <span className="ml-2 text-emerald-700">🔗 Sumber ada</span>}
                      </p>
                    </div>
                  </div>

                  {isEditing ? (
                    <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-2 bg-emerald-50 p-3 rounded-2xl border border-emerald-200">
                      <div>
                        <label className="block text-[10px] font-bold text-emerald-900 uppercase">Harga Tiket (Rp)</label>
                        <input
                          type="number"
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                          placeholder="Contoh: 15000"
                          className="w-32 px-2.5 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-semibold outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-emerald-900 uppercase">URL Sumber Harga</label>
                        <input
                          type="text"
                          value={editSourceUrl}
                          onChange={(e) => setEditSourceUrl(e.target.value)}
                          placeholder="https://..."
                          className="w-40 px-2.5 py-1.5 bg-white border border-gray-300 rounded-lg text-xs outline-none"
                        />
                      </div>
                      <div className="flex items-center gap-1.5 mt-2 sm:mt-4">
                        <button
                          onClick={() => handleSaveEdit(dest)}
                          className="bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition flex items-center gap-1"
                        >
                          <Save className="w-3.5 h-3.5" />
                          Simpan
                        </button>
                        <button
                          onClick={() => setEditingDestId(null)}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-bold px-3 py-2 rounded-xl transition"
                        >
                          Batal
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                      <button
                        onClick={() => handleStartEdit(dest)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold px-3.5 py-2 rounded-xl transition"
                      >
                        Edit Harga & Sumber
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between text-xs text-gray-500">
          <span>Menampilkan {filtered.length} dari {effectiveDestinations.length} destinasi</span>
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-4 py-2 rounded-xl transition"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
