import React, { useState, useEffect } from 'react';
import { 
  CloudSun, X, Send, Loader2, Thermometer, MapPin, Wind, Droplets, 
  CloudRain, Sun, Cloud, CloudLightning, CloudFog, RefreshCw, AlertTriangle, CheckCircle2 
} from 'lucide-react';

interface WeatherModalProps {
  onClose: () => void;
}

interface WeatherData {
  cityName: string;
  country: string;
  admin1?: string;
  admin2?: string;
  lat: number;
  lng: number;
  temperature: number;
  windspeed: number;
  weathercode: number;
  time: string;
  humidity?: number;
  precipitationProbability?: number;
  tempMax?: number;
  tempMin?: number;
  hourlyForecast: Array<{
    time: string;
    temp: number;
    code: number;
    pop?: number;
  }>;
}

const PRESETS = [
  { name: 'Gunung Bromo', lat: -7.9425, lng: 112.9530, region: 'Jawa Timur' },
  { name: 'Kepulauan Raja Ampat', lat: -0.2333, lng: 130.5000, region: 'Papua Barat Daya' },
  { name: 'Danau Toba', lat: 2.6843, lng: 98.8756, region: 'Sumatera Utara' },
  { name: 'Kawah Ijen', lat: -7.0573, lng: 114.2423, region: 'Jawa Timur' },
];

export const WeatherModal: React.FC<WeatherModalProps> = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [locationOptions, setLocationOptions] = useState<any[]>([]);

  // Automatically load Gunung Bromo on initial open for instant testing
  useEffect(() => {
    fetchWeatherForCoords(-7.9425, 112.9530, 'Gunung Bromo', 'Jawa Timur', '');
  }, []);

  const getWeatherDescription = (code: number) => {
    switch (code) {
      case 0: return { text: 'Cerah', icon: <Sun className="w-8 h-8 text-amber-500" /> };
      case 1:
      case 2: return { text: 'Cerah Berawan', icon: <CloudSun className="w-8 h-8 text-amber-400" /> };
      case 3: return { text: 'Berawan', icon: <Cloud className="w-8 h-8 text-gray-400" /> };
      case 45:
      case 48: return { text: 'Berkabut', icon: <CloudFog className="w-8 h-8 text-teal-600" /> };
      case 51:
      case 53:
      case 55: return { text: 'Gerimis', icon: <CloudRain className="w-8 h-8 text-blue-400" /> };
      case 61:
      case 63:
      case 65: return { text: 'Hujan', icon: <CloudRain className="w-8 h-8 text-blue-600" /> };
      case 80:
      case 81:
      case 82: return { text: 'Hujan Lebat / Lokal', icon: <CloudRain className="w-8 h-8 text-blue-700" /> };
      case 95:
      case 96:
      case 99: return { text: 'Badai Petir', icon: <CloudLightning className="w-8 h-8 text-amber-600" /> };
      default: return { text: 'Berawan Normal', icon: <CloudSun className="w-8 h-8 text-teal-600" /> };
    }
  };

  const fetchWeatherForCoords = async (lat: number, lng: number, name: string, admin1?: string, admin2?: string) => {
    setLoading(true);
    setErrorMsg(null);
    setLocationOptions([]);

    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
      );
      if (!res.ok) throw new Error('Gagal terhubung ke layanan cuaca.');
      const data = await res.json();

      const current = data.current_weather;
      const hourly = data.hourly;
      const daily = data.daily;

      // Find current hour index
      const nowIndex = hourly.time.findIndex((t: string) => new Date(t).getTime() >= Date.now()) || 0;
      const currentHumidity = hourly.relativehumidity_2m?.[nowIndex >= 0 ? nowIndex : 0] || 75;
      const currentPop = hourly.precipitation_probability?.[nowIndex >= 0 ? nowIndex : 0] || 10;

      // Next 6 hours forecast
      const hourlyForecast = [];
      const startIndex = nowIndex >= 0 ? nowIndex : 0;
      for (let i = 0; i < 6; i++) {
        const idx = startIndex + i * 2; // every 2 hours
        if (hourly.time[idx]) {
          const timeStr = new Date(hourly.time[idx]).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
          hourlyForecast.push({
            time: timeStr,
            temp: hourly.temperature_2m[idx],
            code: hourly.weathercode[idx],
            pop: hourly.precipitation_probability?.[idx] || 0
          });
        }
      }

      setWeatherData({
        cityName: name,
        country: 'Indonesia',
        admin1,
        admin2,
        lat,
        lng,
        temperature: current.temperature,
        windspeed: current.windspeed,
        weathercode: current.weathercode,
        time: new Date(current.time).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
        humidity: currentHumidity,
        precipitationProbability: currentPop,
        tempMax: daily?.temperature_2m_max?.[0],
        tempMin: daily?.temperature_2m_min?.[0],
        hourlyForecast
      });
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Data cuaca sementara tidak tersedia. Periksa koneksi internet Anda.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    setLoading(true);
    setErrorMsg(null);
    setLocationOptions([]);
    setWeatherData(null);

    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query.trim())}&count=5&language=id&format=json`
      );
      if (!geoRes.ok) throw new Error('Gagal mencari lokasi.');
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        setErrorMsg(`Lokasi "${query}" tidak ditemukan. Coba masukkan nama kota atau gunung lain di Indonesia.`);
        setLoading(false);
        return;
      }

      // If multiple options, let user select
      if (geoData.results.length > 1) {
        setLocationOptions(geoData.results);
        setLoading(false);
      } else {
        const loc = geoData.results[0];
        await fetchWeatherForCoords(loc.latitude, loc.longitude, loc.name, loc.admin1, loc.admin2);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Terjadi kesalahan saat mencari lokasi.');
      setLoading(false);
    }
  };

  const getActivityRecommendations = (code: number, cityName: string) => {
    const isRainy = code >= 51 && code <= 99;
    const isMountain = cityName.toLowerCase().includes('gunung') || cityName.toLowerCase().includes('bromo') || cityName.toLowerCase().includes('ijen') || cityName.toLowerCase().includes('rinjani');
    const isBeach = cityName.toLowerCase().includes('pantai') || cityName.toLowerCase().includes('penida') || cityName.toLowerCase().includes('ampat');
    const isWaterfall = cityName.toLowerCase().includes('terjun') || cityName.toLowerCase().includes('canyon');

    if (isRainy) {
      return [
        'Wajib membawa jas hujan, ponco, atau perlengkapan anti-air.',
        isMountain ? 'Waspadai jalan licin, kabut tebal, dan suhu dingin ekstrem di jalur pendakian.' : '',
        isWaterfall ? 'Perhatikan debit air sungai/air terjun yang bisa meningkat sewaktu-waktu.' : '',
        isBeach ? 'Hindari aktivitas berenang di laut lepas saat cuaca hujan dan angin kencang.' : '',
      ].filter(Boolean);
    } else {
      return [
        'Kondisi cuaca cukup kondusif untuk aktivitas luar ruangan (outdoor).',
        isMountain ? 'Suhu pegunungan bisa sangat dingin di pagi/malam hari, tetap sediakan jaket windproof.' : '',
        isBeach ? 'Gunakan pelindung matahari (sunscreen) dan nikmati panorama alam dengan nyaman.' : '',
        isWaterfall ? 'Nikmati keindahan air terjun dan jaga kebersihan lokasi wisata.' : '',
      ].filter(Boolean);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-800 flex items-center justify-center text-cyan-200 shadow-inner">
              <CloudSun className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <h3 className="text-lg font-black">Cuaca Alam Jelantara</h3>
              <p className="text-xs text-emerald-200">Kondisi cuaca terkini & panduan perjalanan wisata</p>
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
        <div className="flex-grow p-6 overflow-y-auto space-y-6 bg-gray-50">
          
          {/* Search Box & Presets */}
          <div className="space-y-3">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-grow">
                <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari nama gunung, pulau, atau wilayah..."
                  className="w-full bg-white border border-gray-300 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-emerald-800 outline-none transition shadow-sm font-medium"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="bg-emerald-900 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl shadow transition flex items-center gap-2 shrink-0 text-sm"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span>Cari</span>
              </button>
            </form>

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] font-bold text-gray-500 uppercase">Uji Cepat:</span>
              {PRESETS.map((p) => (
                <button
                  key={p.name}
                  onClick={() => fetchWeatherForCoords(p.lat, p.lng, p.name, p.region)}
                  className="bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-xs font-bold px-3 py-1.5 rounded-xl transition border border-emerald-200 shadow-sm"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Multiple Location Options Selection */}
          {locationOptions.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl space-y-3">
              <div className="text-xs font-bold text-amber-900">Beberapa lokasi ditemukan. Pilih salah satu:</div>
              <div className="space-y-2">
                {locationOptions.map((loc, idx) => (
                  <button
                    key={idx}
                    onClick={() => fetchWeatherForCoords(loc.latitude, loc.longitude, loc.name, loc.admin1, loc.admin2)}
                    className="w-full text-left bg-white hover:bg-amber-100/60 p-3 rounded-xl border border-amber-200 text-xs font-semibold text-gray-800 transition flex items-center justify-between"
                  >
                    <span>{loc.name} {loc.admin2 ? `(${loc.admin2})` : ''}, {loc.admin1 || loc.country}</span>
                    <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-1 rounded-md">Pilih</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {loading && (
            <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-200 text-center space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-800 mx-auto" />
              <p className="text-sm font-semibold text-gray-700">Mengambil data prakiraan cuaca real-time...</p>
            </div>
          )}

          {errorMsg && (
            <div className="bg-rose-50 border border-rose-200 p-5 rounded-2xl text-xs sm:text-sm text-rose-900 space-y-3">
              <div className="flex items-center gap-2 font-bold">
                <AlertTriangle className="w-5 h-5 text-rose-700 shrink-0" />
                <span>{errorMsg}</span>
              </div>
              <button
                onClick={() => fetchWeatherForCoords(-7.9425, 112.9530, 'Gunung Bromo', 'Jawa Timur')}
                className="bg-rose-700 hover:bg-rose-800 text-white font-bold px-4 py-2 rounded-xl text-xs transition flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Coba Lagi (Default Bromo)</span>
              </button>
            </div>
          )}

          {/* Weather Results Dashboard */}
          {weatherData && !loading && (
            <div className="space-y-4 animate-fadeIn">
              
              {/* A. Identitas Destinasi */}
              <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">A. Identitas Destinasi</div>
                  <h4 className="text-lg font-black text-gray-900 mt-0.5">{weatherData.cityName}</h4>
                  <p className="text-xs text-gray-500">{weatherData.admin2 ? `${weatherData.admin2}, ` : ''}{weatherData.admin1 || weatherData.country}</p>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-gray-400 font-bold uppercase">Pembaruan Terakhir</div>
                  <div className="text-xs font-bold text-gray-700 mt-0.5">{weatherData.time}</div>
                  <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">Sumber: Prakiraan Cuaca Real-Time</div>
                </div>
              </div>

              {/* B. Kondisi Cuaca Utama */}
              <div className="bg-gradient-to-br from-emerald-900 to-teal-900 text-white rounded-2xl p-6 shadow-md flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-emerald-200 uppercase tracking-wider">B. Kondisi Cuaca Aktual</div>
                  <div className="text-4xl sm:text-5xl font-black tracking-tight mt-1">
                    {Math.round(weatherData.temperature)}°C
                  </div>
                  <div className="text-base font-bold text-cyan-200 capitalize">
                    {getWeatherDescription(weatherData.weathercode).text}
                  </div>
                  {weatherData.tempMax !== undefined && weatherData.tempMin !== undefined && (
                    <div className="text-xs text-emerald-100 pt-1">
                      Rentang Hari Ini: {Math.round(weatherData.tempMin)}°C - {Math.round(weatherData.tempMax)}°C
                    </div>
                  )}
                </div>
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20 shadow-inner">
                  {getWeatherDescription(weatherData.weathercode).icon}
                </div>
              </div>

              {/* C. Detail Cuaca & Hourly */}
              <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-4">
                <div className="text-xs font-bold text-gray-700 uppercase tracking-wider">C. Detail Cuaca & Prakiraan Jam Berikutnya</div>
                
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
                    <Droplets className="w-4 h-4 text-cyan-600 mx-auto mb-1" />
                    <div className="text-[10px] text-gray-500 font-bold">Kelembapan</div>
                    <div className="text-sm font-black text-gray-900 mt-0.5">{weatherData.humidity}%</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
                    <Wind className="w-4 h-4 text-teal-600 mx-auto mb-1" />
                    <div className="text-[10px] text-gray-500 font-bold">Kecepatan Angin</div>
                    <div className="text-sm font-black text-gray-900 mt-0.5">{weatherData.windspeed} km/h</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
                    <CloudRain className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                    <div className="text-[10px] text-gray-500 font-bold">Peluang Hujan</div>
                    <div className="text-sm font-black text-gray-900 mt-0.5">{weatherData.precipitationProbability}%</div>
                  </div>
                </div>

                {/* Hourly Forecast Slider */}
                {weatherData.hourlyForecast.length > 0 && (
                  <div className="pt-2">
                    <div className="text-[11px] font-bold text-gray-500 uppercase mb-2">Prakiraan Beberapa Jam ke Depan</div>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {weatherData.hourlyForecast.map((hf, i) => (
                        <div key={i} className="bg-emerald-50/50 border border-emerald-100 p-2.5 rounded-xl text-center space-y-1">
                          <div className="text-[10px] font-bold text-gray-500">{hf.time}</div>
                          <div className="text-xs font-black text-emerald-900">{Math.round(hf.temp)}°C</div>
                          <div className="text-[9px] font-medium text-gray-600 truncate">{getWeatherDescription(hf.code).text}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* D. Rekomendasi Aktivitas & Keamanan */}
              <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>D. Rekomendasi Aktivitas & Panduan Keamanan Alam</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-700 bg-emerald-50/70 p-4 rounded-xl border border-emerald-100">
                  {getActivityRecommendations(weatherData.weathercode, weatherData.cityName).map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-700 font-bold">🌿</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[10px] text-gray-400 italic">
                  Catatan: Untuk destinasi pegunungan tinggi, prakiraan cuaca diambil dari titik koordinat regional dan dapat berbeda dengan kondisi aktual di puncak.
                </p>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold px-6 py-2.5 rounded-xl text-xs transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
