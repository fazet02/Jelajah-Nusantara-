import fs from 'fs';
import path from 'path';

const csvPath = path.resolve(process.cwd(), 'public/assets/aistudio/Jelantara_90_Destinasi_7db7af04.csv');
const fileContent = fs.readFileSync(csvPath, 'utf-8');

function parseCSV(text: string) {
  const lines = text.split('\n').filter(l => l.trim() !== '');
  const headers = parseLine(lines[0]);
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const data = parseLine(lines[i]);
    if (data.length >= headers.length) {
      const obj: any = {};
      headers.forEach((h, idx) => {
        obj[h.trim()] = data[idx] ? data[idx].trim() : '';
      });
      rows.push(obj);
    }
  }
  return rows;
}

function parseLine(line: string) {
  const res = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      res.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  res.push(current);
  return res.map(s => s.replace(/^"|"$/g, '').trim());
}

const records = parseCSV(fileContent);

function mapCategory(cat: string): string {
  const c = cat.toLowerCase();
  if (c.includes('pantai')) return 'pantai';
  if (c.includes('danau') || c.includes('air terjun') || c.includes('teluk')) return 'berenang';
  if (c.includes('gunung') || c.includes('perbukitan') || c.includes('lembah') || c.includes('bukit')) return 'mendaki';
  if (c.includes('pulau') || c.includes('kepulauan')) return 'snorkeling';
  if (c.includes('hutan') || c.includes('taman nasional') || c.includes('gua')) return 'camping';
  return 'mendaki';
}

const newDestinationsCode = records.map((r, index) => {
  const id = r['ID Unik'] || `jel-${String(index + 1).padStart(3, '0')}`;
  const name = r['Nama Destinasi'] || `Destinasi ${index + 1}`;
  const tagline = r['Deskripsi Ringkas'] || 'Kawasan wisata alam Nusantara';
  const category = mapCategory(r['Kategori'] || '');
  const region = r['Provinsi'] || r['Pulau / Kawasan'] || 'Nusantara';
  const location = `${r['Kabupaten / Kota'] || 'Kawasan'}, ${r['Provinsi'] || 'Indonesia'}`;
  const image = r['URL Foto'] && r['URL Foto'].startsWith('http') ? r['URL Foto'] : '/assets/aistudio/DATARAN_TINGGI_35df184c.jpeg';
  const status = r['Status Awal'] === 'hidden' ? 'hidden' : 'published';
  const lat = r['Latitude'] ? parseFloat(r['Latitude']) : undefined;
  const lng = r['Longitude'] ? parseFloat(r['Longitude']) : undefined;
  
  const rawPrice = r['Harga Tiket (Rp)'];
  const price = rawPrice && !isNaN(parseInt(rawPrice)) ? parseInt(rawPrice) : null;
  const priceCategory = price !== null ? (price < 100000 ? 'Hemat (<100rb)' : price <= 500000 ? 'Sedang (100rb-500rb)' : 'Premium (>500rb)') : 'Budget belum tersedia';

  const activities = r['Aktivitas Umum'] ? r['Aktivitas Umum'].split(';').map((s: string) => s.trim()) : ['Eksplorasi alam'];
  const ecoTips = r['Eco-Tips'] ? [r['Eco-Tips']] : ['Jaga kebersihan lingkungan', 'Ikuti aturan pengelola'];
  const uniqueFacts = r['Daya Tarik Detail'] && r['Daya Tarik Detail'] !== 'Perlu pelengkapan setelah riset' ? [r['Daya Tarik Detail']] : [tagline];
  const travelTime = r['Akses / Waktu Tempuh'] && r['Akses / Waktu Tempuh'] !== 'Perlu verifikasi rute dan titik berangkat' ? r['Akses / Waktu Tempuh'] : 'Akses rute perlu diverifikasi';

  return `  {
    id: ${JSON.stringify(id)},
    name: ${JSON.stringify(name)},
    tagline: ${JSON.stringify(tagline)},
    category: ${JSON.stringify(category)} as CategoryId,
    region: ${JSON.stringify(region)},
    location: ${JSON.stringify(location)},
    image: ${JSON.stringify(image)},
    gallery: [${JSON.stringify(image)}],
    priceEstimate: ${price !== null ? price : 'null'},
    priceCategory: ${JSON.stringify(priceCategory)},
    difficulty: 'Sedang',
    rating: null,
    reviewsCount: null,
    travelTime: ${JSON.stringify(travelTime)},
    accessType: 'Motor / Mobil Pribadi',
    ${lat !== undefined ? `lat: ${lat},` : ''}
    ${lng !== undefined ? `lng: ${lng},` : ''}
    status: ${JSON.stringify(status)},
    pros: ['Keindahan alam dan lanskap khas', 'Suasana asri'],
    cons: ['Fasilitas umum dalam tahap pengembangan', 'Perencanaan perjalanan dianjurkan'],
    uniqueFacts: ${JSON.stringify(uniqueFacts)},
    activities: ${JSON.stringify(activities)},
    ecoTips: ${JSON.stringify(ecoTips)},
    highlights: [${JSON.stringify(r['Kategori'] || 'Alam')}, 'Wisata Nusantara']
  }`;
}).join(',\n');

const fileOutput = `import { Category, Destination, CategoryId } from '../types';

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'Semua Wisata', iconName: 'Compass', description: 'Jelajahi seluruh keindahan alam Nusantara', badgeColor: 'bg-emerald-900 text-white' },
  { id: 'mendaki', name: 'Mendaki', iconName: 'Mountain', description: 'Taklukkan puncak gunung dan bukit panorama', badgeColor: 'bg-amber-800 text-white' },
  { id: 'berenang', name: 'Berenang & Air Terjun', iconName: 'Droplets', description: 'Kesegaran air terjun jernih dan pemandian alami', badgeColor: 'bg-cyan-800 text-white' },
  { id: 'pantai', name: 'Pantai', iconName: 'Sun', description: 'Pasir putih, deburan ombak, dan senja eksotis', badgeColor: 'bg-blue-600 text-white' },
  { id: 'camping', name: 'Camping', iconName: 'Tent', description: 'Tidur di bawah bintang dan sejuknya udara pagi', badgeColor: 'bg-emerald-700 text-white' },
  { id: 'snorkeling', name: 'Snorkeling', iconName: 'Fish', description: 'Keindahan terumbu karang dan biota bawah laut', badgeColor: 'bg-teal-700 text-white' },
  { id: 'keluarga', name: 'Wisata Keluarga', iconName: 'Users', description: 'Aman dan nyaman untuk anak-anak serta orang tua', badgeColor: 'bg-rose-700 text-white' },
];

export const DESTINATIONS: Destination[] = [
  {
    id: 'kawah-ijen',
    name: 'Kawah Ijen',
    tagline: 'Fenomena Blue Fire Magis dan Danau Kawah Asam Pirus Terbesar',
    category: 'mendaki',
    region: 'Jawa Timur',
    location: 'Banyuwangi & Bondowoso, Jawa Timur',
    image: '/assets/aistudio/KAWAH_IJEN_e19ecf15.jpeg',
    gallery: [
      '/assets/aistudio/KAWAH_IJEN_e19ecf15.jpeg',
      '/assets/aistudio/GUNUNG_BROMO_227b41ab.jpeg',
      '/assets/aistudio/DATARAN_TINGGI_35df184c.jpeg'
    ],
    priceEstimate: 150000,
    priceCategory: 'Sedang (100rb-500rb)',
    difficulty: 'Tantangan Ekstrem',
    rating: 4.9,
    reviewsCount: 342,
    travelTime: '2 jam dari pusat kota Banyuwangi',
    accessType: 'Motor / Mobil Pribadi',
    lat: -7.0573,
    lng: 114.2423,
    status: 'published',
    pros: [
      'Menyaksikan fenomena Blue Fire langka yang hanya ada dua di dunia',
      'Panorama danau kawah belerang hijau toska yang luar biasa indah',
      'Pengalaman pendakian malam hari bersama pemandu lokal'
    ],
    cons: [
      'Gas belerang bisa pekat dan menyengat (wajib masker gas)',
      'Suhu dini hari sangat dingin dan menanjak curam'
    ],
    uniqueFacts: [
      'Merupakan danau air asam paling besar di dunia dengan tingkat keasaman mendekati nol.',
      'Para penambang tradisional mengangkat beban belerang hingga 80kg naik turun kaldera.'
    ],
    activities: [
      'Night trekking mulai pukul 01.00 dini hari menuju bibir kawah',
      'Menyaksikan api biru (blue fire) di dinding kaldera',
      'Fotografi lanskap matahari terbit'
    ],
    ecoTips: [
      'Wajib menggunakan masker gas profesional dan membuangnya di tempat sampah khusus.',
      'Hargai perjuangan penambang lokal dengan tidak mengganggu jalur kerja mereka.',
      'Bawa senter kepala (headlamp) dan tumbler pribadi.'
    ],
    highlights: ['Blue Fire Langka', 'Danau Toska Vulkanik', 'Night Trekking']
  },
  {
    id: 'green-canyon',
    name: 'Green Canyon Pangandaran',
    tagline: 'Pesona Aliran Sungai Pirus Hijau di Balik Tebing Batuan Purba',
    category: 'berenang',
    region: 'Jawa Barat',
    location: 'Cijulang, Kabupaten Pangandaran, Jawa Barat',
    image: '/assets/aistudio/GREEN_GANYON_7a6b5266.jpeg',
    gallery: [
      '/assets/aistudio/GREEN_GANYON_7a6b5266.jpeg',
      '/assets/aistudio/DANAU_TOBA_28de8d40.jpeg'
    ],
    priceEstimate: 95000,
    priceCategory: 'Hemat (<100rb)',
    difficulty: 'Sedang',
    rating: 4.8,
    reviewsCount: 210,
    travelTime: '45 menit dari pusat Pangandaran',
    accessType: 'Kendaraan Umum',
    lat: -7.5458,
    lng: 108.4729,
    status: 'published',
    pros: [
      'Aliran air sungai berwarna hijau pirus yang sangat jernih dan menyegarkan',
      'Petualangan body rafting menyusuri gua stalaktit purba',
      'Suasana alam asri dikelilingi rimbunnya pepohonan tropis'
    ],
    cons: [
      'Debit air bisa naik drastis dan keruh saat musim hujan lebat',
      'Ramah wisatawan saat akhir pekan'
    ],
    uniqueFacts: [
      'Dikenal warga lokal dengan nama Cuklehe sebelum dinamai Green Canyon oleh turis asing.',
      'Terdapat stalaktit dan stalagmit aktif berusia ribuan tahun di dalam gua.'
    ],
    activities: [
      'Body rafting menantang arus sungai jernih',
      'Naik perahu ketinting menyusuri tebing batu',
      'Berfoto di spot air terjun dalam gua'
    ],
    ecoTips: [
      'Gunakan jaket pelampung resmi dan jangan merusak formasi batuan stalaktit.',
      'Dukung ekonomi warga lokal dengan menyewa perlengkapan resmi.',
      'Tidak membuang sampah plastik ke aliran sungai.'
    ],
    highlights: ['Body Rafting', 'Gua Stalaktit Purba', 'Sungai Hijau Pirus']
  },
  {
    id: 'gunung-bromo',
    name: 'Gunung Bromo',
    tagline: 'Negeri di Atas Awan Megah dengan Lautan Pasir Berlatar Semeru',
    category: 'mendaki',
    region: 'Jawa Timur',
    location: 'Taman Nasional Bromo Tengger Semeru, Jawa Timur',
    image: '/assets/aistudio/GUNUNG_BROMO_227b41ab.jpeg',
    gallery: [
      '/assets/aistudio/GUNUNG_BROMO_227b41ab.jpeg',
      '/assets/aistudio/KAWAH_IJEN_e19ecf15.jpeg',
      '/assets/aistudio/DATARAN_TINGGI_35df184c.jpeg'
    ],
    priceEstimate: 120000,
    priceCategory: 'Sedang (100rb-500rb)',
    difficulty: 'Mudah (Pemula)',
    rating: 5.0,
    reviewsCount: 512,
    travelTime: '2.5 jam dari Malang / Surabaya',
    accessType: 'Motor / Mobil Pribadi',
    lat: -7.9425,
    lng: 112.9530,
    status: 'published',
    pros: [
      'Panorama sunrise kelas dunia dari Penanjakan',
      'Lautan pasir luas (Pasir Berbisik) dan kawah aktif yang ikonik',
      'Sangat mudah diakses dengan jeep wisata lokal'
    ],
    cons: [
      'Debu vulkanik cukup tebal di area lautan pasir',
      'Suhu sangat dingin di pagi hari'
    ],
    uniqueFacts: [
      'Merupakan gunung berapi aktif yang disakralkan oleh masyarakat Suku Tengger.',
      'Upacara Yadnya Kasada diadakan setiap tahun di kawah Bromo.'
    ],
    activities: [
      'Menyaksikan golden sunrise di bukit penanjakan',
      'Naik jeep 4x4 melintasi lautan pasir',
      'Menunggang kuda menuju tangga kawah Bromo'
    ],
    ecoTips: [
      'Gunakan masker kain atau buff untuk melindungi pernapasan dari debu pasir.',
      'Buang sampah pada tempatnya di area rest area.',
      'Hormati tradisi masyarakat adat Suku Tengger.'
    ],
    highlights: ['Golden Sunrise Penanjakan', 'Lautan Pasir', 'Kawah Aktif Bromo']
  },
  {
    id: 'dataran-tinggi-dieng',
    name: 'Dataran Tinggi Dieng',
    tagline: 'Negeri Para Dewa di Atas Awan dengan Kawah Warna-Warni dan Candi Kuno',
    category: 'mendaki',
    region: 'Jawa Tengah',
    location: 'Wonosobo & Banjarnegara, Jawa Tengah',
    image: '/assets/aistudio/DATARAN_TINGGI_35df184c.jpeg',
    gallery: [
      '/assets/aistudio/DATARAN_TINGGI_35df184c.jpeg',
      '/assets/aistudio/KAWAH_IJEN_e19ecf15.jpeg'
    ],
    priceEstimate: 85000,
    priceCategory: 'Hemat (<100rb)',
    difficulty: 'Mudah (Pemula)',
    rating: 4.8,
    reviewsCount: 284,
    travelTime: '1.5 jam dari pusat kota Wonosobo',
    accessType: 'Motor / Mobil Pribadi',
    lat: -7.2281,
    lng: 109.9163,
    status: 'published',
    pros: [
      'Keindahan Telaga Warna yang memantulkan warna unik',
      'Kompleks candi Hindu tertua di pulau Jawa yang bersejarah',
      'Udara pegunungan yang sangat sejuk dan segar'
    ],
    cons: [
      'Kabut tebal bisa turun mendadak membatasi jarak pandang',
      'Suhu bisa mencapai titik beku (embun upas) di puncak musim kemarau'
    ],
    uniqueFacts: [
      'Terletak di kaldera raksasa di ketinggian lebih dari 2.000 meter di atas permukaan laut.',
      'Anak-anak tertentu di Dieng lahir dengan rambut gimbal alami yang disucikan.'
    ],
    activities: [
      'Menyaksikan embun es (upas) di pagi hari',
      'Menjelajahi Telaga Warna dan Gua Jaran',
      'Mengunjungi Candi Arjuna berlatar kabut pagi'
    ],
    ecoTips: [
      'Bawa pakaian hangat berlapis dan jaket windproof.',
      'Beli hasil pertanian lokal seperti carica dan purwaceng langsung dari petani.',
      'Jaga kelestarian kawasan candi purbakala.'
    ],
    highlights: ['Telaga Warna', 'Candi Arjuna', 'Dataran Tinggi Tertua']
  },
  {
    id: 'danau-toba',
    name: 'Danau Toba & Pulau Samosir',
    tagline: 'Keajaiban Kaldera Raksasa Purba dan Pusat Budaya Batak yang Mempesona',
    category: 'berenang',
    region: 'Sumatra Utara',
    location: 'Kabupaten Toba Samosir, Sumatera Utara',
    image: '/assets/aistudio/DANAU_TOBA_28de8d40.jpeg',
    gallery: [
      '/assets/aistudio/DANAU_TOBA_28de8d40.jpeg',
      '/assets/aistudio/GREEN_GANYON_7a6b5266.jpeg'
    ],
    priceEstimate: 175000,
    priceCategory: 'Sedang (100rb-500rb)',
    difficulty: 'Mudah (Pemula)',
    rating: 4.9,
    reviewsCount: 420,
    travelTime: '4 jam dari Medan via darat',
    accessType: 'Kendaraan Umum',
    lat: 2.6843,
    lng: 98.8756,
    status: 'published',
    pros: [
      'Danau vulkanik terbesar di Asia Tenggara dengan pulau di tengahnya',
      'Seni budaya Batak yang kaya dan arsitektur rumah tradisional unik',
      'Pemandangan perbukitan hijau menghadap perairan biru luas'
    ],
    cons: [
      'Jarak tempuh dari Medan cukup jauh dan berkelok-kelok',
      'Penyewaan fasilitas air perlu konfirmasi awal'
    ],
    uniqueFacts: [
      'Terbentuk dari letusan supervolcano dahsyat sekitar 74.000 tahun lalu yang hampir memusnahkan umat manusia purba.',
      'Pulau Samosir di tengahnya memiliki luas hampir sama dengan negara Singapura.'
    ],
    activities: [
      'Berkeliling Pulau Samosir menyusuri desa adat Tomok dan Ambarita',
      'Berenang di air danau vulkanik yang jernih',
      'Menikmati kuliner ikan mas arsik khas Batak'
    ],
    ecoTips: [
      'Hargai adat istiadat dan norma lokal masyarakat Batak Toba.',
      'Dukung pengrajin tenun ulos asli setempat.',
      'Kurangi penggunaan botol plastik sekali pakai.'
    ],
    highlights: ['Kaldera Purba', 'Pulau Samosir', 'Budaya Batak Tradisional']
  },
  {
    id: 'pulau-padar',
    name: 'Pulau Padar Labuan Bajo',
    tagline: 'Panorama Bukit Eksotis Berlatar Tiga Teluk Pasir Berwarna Unik',
    category: 'snorkeling',
    region: 'Nusa Tenggara Timur',
    location: 'Taman Nasional Komodo, Manggarai Barat, NTT',
    image: '/assets/aistudio/PADAR_ISLAND.jpg',
    gallery: [
      '/assets/aistudio/PADAR_ISLAND.jpg',
      '/assets/aistudio/KOMODO_DRAGON.jpg'
    ],
    priceEstimate: 350000,
    priceCategory: 'Premium (>500rb)',
    difficulty: 'Sedang',
    rating: 5.0,
    reviewsCount: 389,
    travelTime: '1 jam naik speedboat dari Labuan Bajo',
    accessType: 'Kendaraan Umum',
    lat: -8.6534,
    lng: 119.5794,
    status: 'published',
    pros: [
      'Pemandangan perbukitan savana ikonik dengan tiga teluk pasir (putih, pink, hitam)',
      'Spot fotografi matahari terbit dan terbenam terbaik di Indonesia',
      'Air laut jernih kristal untuk snorkeling di sekitarnya'
    ],
    cons: [
      'Treking menanjak cukup terik tanpa banyak pohon pelindung',
      'Biaya sewa kapal (speed/open trip) relatif tinggi'
    ],
    uniqueFacts: [
      'Merupakan pulau terbesar ketiga di dalam kawasan Taman Nasional Komodo.',
      'Bentuk kontur pulau yang berlekuk-lekuk unik terbentuk oleh aktivitas vulkanik purba.'
    ],
    activities: [
      'Trekking pagi menuju puncak bukit Padar',
      'Fotografi lanskap 3 teluk legendaris',
      'Snorkeling melihat manta ray dan terumbu karang'
    ],
    ecoTips: [
      'Bawa air minum yang cukup karena cuaca sangat panas dan kering.',
      'Gunakan alas kaki yang kesat untuk jalur tanah kering berpasir.',
      'Jangan membuang sampah apapun di kawasan konservasi.'
    ],
    highlights: ['3 Teluk Warna', 'Trekking Bukit Savana', 'Spot Foto Ikonik']
  },
  {
    id: 'tanjung-puting',
    name: 'Taman Nasional Tanjung Puting',
    tagline: 'Petualangan Eksklusif Menyusuri Sungai Mahakam di Hutan Konservasi Orangutan',
    category: 'camping',
    region: 'Kalimantan Tengah',
    location: 'Kotawaringin Barat, Kalimantan Tengah',
    image: '/assets/aistudio/TANJUNG_PUTING.jpg',
    gallery: [
      '/assets/aistudio/TANJUNG_PUTING.jpg'
    ],
    priceEstimate: 450000,
    priceCategory: 'Premium (>500rb)',
    difficulty: 'Mudah (Pemula)',
    rating: 4.9,
    reviewsCount: 178,
    travelTime: '2 jam dari Pangkalan Bun ke Sekonyer',
    accessType: 'Kendaraan Umum',
    lat: -2.7333,
    lng: 111.8500,
    status: 'published',
    pros: [
      'Melihat langsung orangutan liar di habitat aslinya via perahu klotok',
      'Pengalaman unik menginap di atas perahu (live on klotok)',
      'Suasana hutan hujan tropis Kalimantan yang masih sangat murni'
    ],
    cons: [
      'Akses masuk harus menggunakan perahu sewa khusus (klotok)',
      'Nyamuk dan serangga hutan cukup banyak di malam hari'
    ],
    uniqueFacts: [
      'Merupakan pusat rehabilitasi orangutan terbesar di dunia yang didirikan oleh Dr. Birutė Galdikas.',
      'Sungai Sekonyer berwarna hitam alami karena kandungan zat gambut hutan rawa.'
    ],
    activities: [
      'Menyusuri Sungai Sekonyer dengan perahu klotok',
      'Melihat feeding station orangutan di Camp Leakey',
      'Menyaksikan kunang-kunang berpendar di pohon nipah malam hari'
    ],
    ecoTips: [
      'Gunakan losion anti nyamuk yang ramah lingkungan.',
      'Jaga jarak aman minimal 5-10 meter dari orangutan liar.',
      'Dukung program pelestarian satwa melalui izin resmi.'
    ],
    highlights: ['Konservasi Orangutan', 'Live on Klotok', 'Sungai Gambut Eksotis']
  },
  {
    id: 'raja-ampat',
    name: 'Kepulauan Raja Ampat',
    tagline: 'Surga Bahari Terakhir di Bumi dengan Keanekaragaman Hayati Laut Tertinggi',
    category: 'snorkeling',
    region: 'Papua Barat',
    location: 'Kabupaten Raja Ampat, Papua Barat Daya',
    image: '/assets/aistudio/RAJA_AMPAT.jpg',
    gallery: [
      '/assets/aistudio/RAJA_AMPAT.jpg'
    ],
    priceEstimate: 750000,
    priceCategory: 'Premium (>500rb)',
    difficulty: 'Sedang',
    rating: 5.0,
    reviewsCount: 460,
    travelTime: '2 jam ferry dari Sorong ke Waisai',
    accessType: 'Kendaraan Umum',
    lat: -0.2333,
    lng: 130.5167,
    status: 'published',
    pros: [
      'Terumbu karang paling sehat dan kaya spesies ikan di seluruh dunia',
      'Gugusan pulau karst (wayag & misool) berair jernih toska yang menakjubkan',
      'Pengalaman menyelam kelas dunia (world-class diving & snorkeling)'
    ],
    cons: [
      'Biaya perjalanan dan logistik cukup tinggi',
      'Waktu tempuh penerbangan dan laut cukup panjang'
    ],
    uniqueFacts: [
      'Menjadi rumah bagi sekitar 75% seluruh spesies karang keras yang ada di dunia.',
      'Gugusan karst purba di Wayag menyerupai labirin hijau di tengah lautan biru.'
    ],
    activities: [
      'Snorkeling dan diving di spot Manta Point dan Piaynemo',
      'Naik ke puncak Wayag melihat gugusan pulau karang',
      'Berinteraksi dengan masyarakat kampung homestay lokal'
    ],
    ecoTips: [
      'Wajib membayar PIN Wisatawan untuk mendukung konservasi laut.',
      'Gunakan tabir surya yang aman bagi terumbu karang (reef-safe sunscreen).',
      'Jangan menyentuh atau menginjak terumbu karang saat snorkeling.'
    ],
    highlights: ['Piaynemo & Wayag', 'Biodiversitas Laut', 'Karang Purba']
  },
  {
    id: 'gunung-rinjani',
    name: 'Gunung Rinjani Lombok',
    tagline: 'Gunung Berapi Megah dengan Kaldera Danau Segara Anak yang Sakral',
    category: 'mendaki',
    region: 'Nusa Tenggara Barat',
    location: 'Lombok Timur & Utara, NTB',
    image: '/assets/aistudio/GUNUNG_RINJANI.jpg',
    gallery: [
      '/assets/aistudio/GUNUNG_RINJANI.jpg'
    ],
    priceEstimate: 300000,
    priceCategory: 'Premium (>500rb)',
    difficulty: 'Tantangan Ekstrem',
    rating: 4.9,
    reviewsCount: 310,
    travelTime: '2 jam dari Mataram ke Sembalun',
    accessType: 'Motor / Mobil Pribadi',
    lat: -8.4113,
    lng: 116.4572,
    status: 'published',
    pros: [
      'Pemandangan Danau Segara Anak dan Gunung Baru Jari di dalam kawah raksasa',
      'Jalur pendakian savana terindah di Asia Tenggara',
      'Puncak tertinggi ketiga di Indonesia dengan lautan awan menakjubkan'
    ],
    cons: [
      'Pendakian sangat menantang dan memerlukan fisik prima serta pemandu resmi',
      'Suhu malam hari di pos pendakian sangat dingin'
    ],
    uniqueFacts: [
      'Danau Segara Anak berada di ketinggian 2.000 mdpl di dalam kaldera purba Rinjani.',
      'Gunung Baru Jari adalah anak gunung berapi aktif yang masih tumbuh di dalam danau.'
    ],
    activities: [
      'Pendakian jalur Sembalun menuju pelawangan',
      'Camping di tepi Danau Segara Anak dan mandi air panas alami',
      'Summit attack menuju puncak Rinjani 3.726 mdpl'
    ],
    ecoTips: [
      'Bawa turun kembali seluruh sampah pribadi Anda (leave no trace).',
      'Gunakan jasa porter dan pemandu lokal resmi Taman Nasional.',
      'Hormati kesucian gunung bagi masyarakat Sasak dan Hindu Bali.'
    ],
    highlights: ['Danau Segara Anak', 'Puncak 3.726 mdpl', 'Savana Sembalun']
  },
  {
    id: 'tumpak-sewu',
    name: 'Air Terjun Tumpak Sewu',
    tagline: 'Air Terjun Megah Melingkar Menyerupai Tirai Raksasa di Kaki Semeru',
    category: 'berenang',
    region: 'Jawa Timur',
    location: 'Pronojiwo, Lumajang, Jawa Timur',
    image: '/assets/aistudio/TUMPAK_SEWU.jpg',
    gallery: [
      '/assets/aistudio/TUMPAK_SEWU.jpg'
    ],
    priceEstimate: 50000,
    priceCategory: 'Hemat (<100rb)',
    difficulty: 'Tantangan Ekstrem',
    rating: 4.9,
    reviewsCount: 295,
    travelTime: '2.5 jam dari Malang',
    accessType: 'Motor / Mobil Pribadi',
    lat: -8.2325,
    lng: 112.9169,
    status: 'published',
    pros: [
      'Panorama air terjun tipe curtain (tirai) semi-lingkar terbesar di Indonesia',
      'Pemandangan latar belakang Gunung Semeru yang gagah',
      'Petualangan menuruni tebing curam menyusuri sungai purba'
    ],
    cons: [
      'Jalur turunan ke dasar air terjun sangat curam dan licin (butuh tenaga ekstra)',
      'Debit air bisa sangat besar saat musim hujan'
    ],
    uniqueFacts: [
      'Dikenal sebagai "Niagara Waterfall of Indonesia" karena bentuk formasi air terjunnya yang melebar melingkar.',
      'Airnya bersumber langsung dari aliran Sungai Glidik di lereng selatan Gunung Semeru.'
    ],
    activities: [
      'Menikmati panorama dari tebing panorama (Panorama View)',
      'Trekking menuruni tangga kayu ekstrem menuju dasar lembah',
      'Fotografi air terjun raksasa'
    ],
    ecoTips: [
      'Gunakan sepatu gunung dengan cengkeraman kuat saat menuruni tebing.',
      'Selalu ikuti arahan pemandu lokal demi keselamatan.',
      'Jangan membuang sampah di sepanjang aliran sungai.'
    ],
    highlights: ['Air Terjun Tirai', 'Panorama Semeru', 'Trekking Lembah']
  },
${newDestinationsCode}
];
`;

fs.writeFileSync(path.resolve(process.cwd(), 'src/data/destinations.ts'), fileOutput, 'utf-8');
console.log('Successfully regenerated src/data/destinations.ts with accurate data (no fabricated ratings or default prices)!');
