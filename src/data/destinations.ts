import { Category, Destination, CategoryId } from '../types';

export const CATEGORIES: Category[] = [
  {
    "id": "all",
    "name": "Semua Wisata",
    "iconName": "Compass",
    "description": "Jelajahi seluruh keindahan alam Nusantara",
    "badgeColor": "bg-emerald-900 text-white"
  },
  {
    "id": "mendaki",
    "name": "Mendaki",
    "iconName": "Mountain",
    "description": "Taklukkan puncak gunung dan bukit panorama",
    "badgeColor": "bg-amber-800 text-white"
  },
  {
    "id": "berenang",
    "name": "Berenang & Air Terjun",
    "iconName": "Droplets",
    "description": "Kesegaran air terjun jernih dan pemandian alami",
    "badgeColor": "bg-cyan-800 text-white"
  },
  {
    "id": "pantai",
    "name": "Pantai",
    "iconName": "Sun",
    "description": "Pasir putih, deburan ombak, dan senja eksotis",
    "badgeColor": "bg-blue-600 text-white"
  },
  {
    "id": "snorkeling",
    "name": "Snorkeling",
    "iconName": "Fish",
    "description": "Keindahan terumbu karang dan biota bawah laut",
    "badgeColor": "bg-teal-700 text-white"
  }
];

export const DESTINATIONS: Destination[] = [
  {
    "id": "raja-ampat",
    "name": "Kepulauan Raja Ampat",
    "tagline": "Mahakarya Bahagia Dunia dengan Gugusan Pulau Karang dan Keanekaragaman Hayati Bawah Laut",
    "category": "snorkeling",
    "region": "Papua Barat Daya",
    "location": "Kabupaten Raja Ampat, Papua Barat Daya",
    "image": "/assets/aistudio/RAJA_AMPAT_3b2f7a8d.jpeg",
    "gallery": [
      "/assets/aistudio/RAJA_AMPAT_3b2f7a8d.jpeg"
    ],
    "priceEstimate": 300000,
    "priceMaxEstimate": 300000,
    "priceDetails": "Retribusi PIN (Peraturan Izin Masuk) Raja Ampat",
    "priceSourceUrl": "https://www.indonesia.travel",
    "verificationDate": "2026-11-04",
    "priceCategory": "Sedang (100rb-500rb)",
    "difficulty": "Sedang",
    "rating": 5,
    "reviewsCount": 650,
    "travelTime": "6 jam penerbangan ke Sorong dilanjutkan ferry",
    "accessType": "Kendaraan Umum",
    "lat": -0.2333,
    "lng": 130.5,
    "status": "published",
    "pros": [
      "Keanekaragaman hayati laut terkaya di dunia",
      "Gugusan pulau karang (karst) yang sangat ikonik",
      "Air laut sangat jernih"
    ],
    "cons": [
      "Biaya perjalanan relatif tinggi",
      "Akses cukup jauh"
    ],
    "uniqueFacts": [
      "Terdapat sekitar 75% spesies karang dunia di perairan Raja Ampat."
    ],
    "activities": [
      "Snorkeling & Diving kelas dunia",
      "Island hopping",
      "Fotografi alam"
    ],
    "ecoTips": [
      "Jangan menyentuh terumbu karang saat menyelam.",
      "Gunakan sunscreen ramah lingkungan."
    ],
    "highlights": [
      "Wayag Viewpoint",
      "Misool Coral Reef",
      "Pianemo"
    ]
  },
  {
    "id": "taman-laut-bunaken",
    "name": "Taman Laut Bunaken",
    "tagline": "Surga Taman Laut Dunia dengan Dinding Karang Vertikal Megah",
    "category": "snorkeling",
    "region": "Sulawesi Utara",
    "location": "Teluk Manado, Manado, Sulawesi Utara",
    "image": "/assets/aistudio/TAMAN_NASIONAL_3572aa44.jpeg",
    "gallery": [
      "/assets/aistudio/TAMAN_NASIONAL_3572aa44.jpeg"
    ],
    "priceEstimate": 10000,
    "priceMaxEstimate": 10000,
    "priceDetails": "Tiket masuk taman nasional & tag masuk wisatawan",
    "priceSourceUrl": "https://www.indonesia.travel",
    "verificationDate": "2026-11-04",
    "priceCategory": "Hemat (<100rb)",
    "difficulty": "Mudah (Pemula)",
    "rating": 4.9,
    "reviewsCount": 410,
    "travelTime": "30 menit naik speedboat dari pelabuhan Manado",
    "accessType": "Kendaraan Umum",
    "lat": 1.62,
    "lng": 124.765,
    "status": "published",
    "pros": [
      "Dinding karang vertikal spektakuler (underwater walls)",
      "Ribuan jenis ikan dan penyu laut",
      "Air hangat dan jernih sepanjang tahun"
    ],
    "cons": [
      "Arus bawah laut bisa cukup kuat bagi pemula"
    ],
    "uniqueFacts": [
      "Merupakan salah satu taman laut tertua di Indonesia yang dilindungi."
    ],
    "activities": [
      "Diving & Snorkeling di dinding karang Bunaken",
      "Berenang bersama penyu"
    ],
    "ecoTips": [
      "Tidak membuang sampah plastik di area pulau dan laut.",
      "Gunakan alat selam yang ramah lingkungan."
    ],
    "highlights": [
      "Underwater Walls",
      "Penyu Hijau Bunaken",
      "Coral Garden"
    ]
  },
  {
    "id": "gunung-bromo",
    "name": "Gunung Bromo",
    "tagline": "Negeri di Atas Awan Megah dengan Lautan Pasir Berlatar Semeru",
    "category": "mendaki",
    "region": "Jawa Timur",
    "location": "Taman Nasional Bromo Tengger Semeru, Jawa Timur",
    "image": "/assets/aistudio/GUNUNG_BROMO_227b41ab.jpeg",
    "gallery": [
      "/assets/aistudio/GUNUNG_BROMO_227b41ab.jpeg"
    ],
    "priceEstimate": 79000,
    "priceMaxEstimate": 79000,
    "priceDetails": "Tiket masuk kawasan konservasi TNBTS",
    "priceSourceUrl": "https://www.indonesia.travel",
    "verificationDate": "2026-11-04",
    "priceCategory": "Hemat (<100rb)",
    "difficulty": "Mudah (Pemula)",
    "rating": 5,
    "reviewsCount": 512,
    "travelTime": "2.5 jam dari Malang / Surabaya",
    "accessType": "Motor / Mobil Pribadi",
    "lat": -7.9425,
    "lng": 112.953,
    "status": "published",
    "pros": [
      "Panorama sunrise kelas dunia dari Penanjakan",
      "Lautan pasir luas dan kawah aktif"
    ],
    "cons": [
      "Debu vulkanik cukup tebal",
      "Suhu sangat dingin di pagi hari"
    ],
    "uniqueFacts": [
      "Gunung berapi aktif yang disakralkan masyarakat Suku Tengger."
    ],
    "activities": [
      "Golden sunrise",
      "Naik jeep 4x4",
      "Menunggang kuda"
    ],
    "ecoTips": [
      "Gunakan masker pelindung debu.",
      "Buang sampah pada tempatnya."
    ],
    "highlights": [
      "Golden Sunrise Penanjakan",
      "Lautan Pasir",
      "Kawah Bromo"
    ]
  },
  {
    "id": "nusa-penida",
    "name": "Nusa Penida",
    "tagline": "Keindahan Tebing Karang Eksotis Kelingking Beach dan Perairan Biru",
    "category": "pantai",
    "region": "Bali",
    "location": "Klungkung, Bali",
    "image": "/assets/aistudio/NUSA_PENIDA_e845caf2.jpeg",
    "gallery": [
      "/assets/aistudio/NUSA_PENIDA_e845caf2.jpeg"
    ],
    "priceEstimate": 170000,
    "priceMaxEstimate": 170000,
    "priceDetails": "Retribusi wisata pulau Nusa Penida & pelabuhan",
    "priceSourceUrl": "https://www.indonesia.travel",
    "verificationDate": "2026-11-04",
    "priceCategory": "Sedang (100rb-500rb)",
    "difficulty": "Sedang",
    "rating": 4.8,
    "reviewsCount": 530,
    "travelTime": "45 menit naik fast boat dari Sanur",
    "accessType": "Motor / Mobil Pribadi",
    "lat": -8.7278,
    "lng": 115.5444,
    "status": "published",
    "pros": [
      "Pemandangan Kelingking Beach yang ikonik dan megah",
      "Spot manta ray snorkeling",
      "Pantai berpasir putih bersih"
    ],
    "cons": [
      "Jalur jalan darat cukup menantang dan berliku"
    ],
    "uniqueFacts": [
      "Rumah bagi habitat ikan pari manta raksasa (manta ray)."
    ],
    "activities": [
      "Fotografi di tebing Kelingking",
      "Snorkeling bersama Manta",
      "Pantai Broken Beach"
    ],
    "ecoTips": [
      "Hati-hati di jalur trekking tebing yang curam.",
      "Bawa botol air minum isi ulang."
    ],
    "highlights": [
      "Kelingking Beach",
      "Broken Beach",
      "Angel’s Billabong"
    ]
  },
  {
    "id": "kawah-ijen",
    "name": "Kawah Ijen",
    "tagline": "Fenomena Blue Fire Magis dan Danau Kawah Asam Pirus Terbesar",
    "category": "mendaki",
    "region": "Jawa Timur",
    "location": "Banyuwangi & Bondowoso, Jawa Timur",
    "image": "/assets/aistudio/KAWAH_IJEN_e19ecf15.jpeg",
    "gallery": [
      "/assets/aistudio/KAWAH_IJEN_e19ecf15.jpeg"
    ],
    "priceEstimate": 30000,
    "priceMaxEstimate": 30000,
    "priceDetails": "Tiket masuk kawasan & izin pendakian resmi",
    "priceSourceUrl": "https://www.indonesia.travel",
    "verificationDate": "2026-11-04",
    "priceCategory": "Hemat (<100rb)",
    "difficulty": "Tantangan Ekstrem",
    "rating": 4.9,
    "reviewsCount": 342,
    "travelTime": "2 jam dari pusat kota Banyuwangi",
    "accessType": "Motor / Mobil Pribadi",
    "lat": -7.0573,
    "lng": 114.2423,
    "status": "published",
    "pros": [
      "Fenomena Blue Fire langka di dunia",
      "Danau kawah hijau toska"
    ],
    "cons": [
      "Gas belerang menyengat",
      "Suhu dingin ekstrem"
    ],
    "uniqueFacts": [
      "Danau air asam paling besar di dunia."
    ],
    "activities": [
      "Night trekking",
      "Melihat Blue Fire",
      "Fotografi sunrise"
    ],
    "ecoTips": [
      "Wajib pakai masker gas.",
      "Jaga kebersihan kawasan."
    ],
    "highlights": [
      "Blue Fire Langka",
      "Danau Toska Vulkanik",
      "Night Trekking"
    ]
  },
  {
    "id": "pantai-pink-lombok",
    "name": "Pantai Pink Lombok",
    "tagline": "Keunikan Pasir Pantai Berwarna Merah Muda Alami di Timur Lombok",
    "category": "pantai",
    "region": "Nusa Tenggara Barat",
    "location": "Sekaroh, Jerowaru, Lombok Timur, NTB",
    "image": "/assets/aistudio/PANTAI_PINK_9565ac51.jpeg",
    "gallery": [
      "/assets/aistudio/PANTAI_PINK_9565ac51.jpeg"
    ],
    "priceEstimate": 10000,
    "priceMaxEstimate": 10000,
    "priceDetails": "Retribusi pantai dan parkir lokal",
    "priceSourceUrl": "https://www.indonesia.travel",
    "verificationDate": "2026-11-04",
    "priceCategory": "Hemat (<100rb)",
    "difficulty": "Mudah (Pemula)",
    "rating": 4.7,
    "reviewsCount": 215,
    "travelTime": "2 jam dari Mataram",
    "accessType": "Motor / Mobil Pribadi",
    "lat": -8.8523,
    "lng": 116.5123,
    "status": "published",
    "pros": [
      "Warna pasir pantai merah muda asli dari serpihan koral",
      "Perairan tenang dan jernih",
      "Suasana asri dan tenang"
    ],
    "cons": [
      "Akses jalan darat sebagian masih berbatu"
    ],
    "uniqueFacts": [
      "Warna pink berasal dari pecahan koral merah yang bercampur pasir putih."
    ],
    "activities": [
      "Bersantai di pantai berpasir pink",
      "Snorkeling",
      "Naik perahu keliling teluk"
    ],
    "ecoTips": [
      "Jangan mengambil pasir pink untuk dibawa pulang.",
      "Jaga kebersihan pantai."
    ],
    "highlights": [
      "Pasir Merah Muda Alami",
      "Perairan Tenang",
      "Bukit Tangsi"
    ]
  },
  {
    "id": "green-canyon",
    "name": "Green Canyon Pangandaran",
    "tagline": "Pesona Aliran Sungai Pirus Hijau di Balik Tebing Batuan Purba",
    "category": "berenang",
    "region": "Jawa Barat",
    "location": "Cijulang, Kabupaten Pangandaran, Jawa Barat",
    "image": "/assets/aistudio/GREEN_GANYON_7a6b5266.jpeg",
    "gallery": [
      "/assets/aistudio/GREEN_GANYON_7a6b5266.jpeg"
    ],
    "priceEstimate": 10000,
    "priceMaxEstimate": 10000,
    "priceDetails": "Paket sewa perahu dan pelampung standar",
    "priceSourceUrl": "https://www.indonesia.travel",
    "verificationDate": "2026-11-04",
    "priceCategory": "Hemat (<100rb)",
    "difficulty": "Sedang",
    "rating": 4.8,
    "reviewsCount": 210,
    "travelTime": "45 menit dari pusat Pangandaran",
    "accessType": "Kendaraan Umum",
    "lat": -7.5458,
    "lng": 108.4729,
    "status": "published",
    "pros": [
      "Sungai hijau pirus jernih",
      "Body rafting seru dalam gua purba"
    ],
    "cons": [
      "Air bisa naik saat musim hujan"
    ],
    "uniqueFacts": [
      "Dulu dikenal warga lokal sebagai Cuklehe."
    ],
    "activities": [
      "Body rafting",
      "Naik perahu ketinting",
      "Jelajah gua"
    ],
    "ecoTips": [
      "Gunakan pelampung resmi.",
      "Jangan merusak stalaktit."
    ],
    "highlights": [
      "Body Rafting",
      "Gua Stalaktit",
      "Sungai Pirus"
    ]
  },
  {
    "id": "taman-nasional-baluran",
    "name": "Taman Nasional Baluran",
    "tagline": "Africa van Java dengan Savana Bekol dan Satwa Liar Alami",
    "category": "mendaki",
    "region": "Jawa Timur",
    "location": "Banyuputih, Situbondo & Banyuwangi, Jawa Timur",
    "image": "/assets/aistudio/TAMANNAO_db0ac3d2.jpeg",
    "gallery": [
      "/assets/aistudio/TAMANNAO_db0ac3d2.jpeg"
    ],
    "priceEstimate": 31000,
    "priceMaxEstimate": 31000,
    "priceDetails": "Tiket masuk kawasan konservasi Baluran",
    "priceSourceUrl": "https://www.indonesia.travel",
    "verificationDate": "2026-11-04",
    "priceCategory": "Hemat (<100rb)",
    "difficulty": "Mudah (Pemula)",
    "rating": 4.7,
    "reviewsCount": 195,
    "travelTime": "1.5 jam dari Banyuwangi / Situbondo",
    "accessType": "Motor / Mobil Pribadi",
    "lat": -7.845,
    "lng": 114.385,
    "status": "published",
    "pros": [
      "Pemandangan savana luas ala Afrika",
      "Melihat rusa, burung merak, dan banteng liar",
      "Pantai Bama yang indah di dekat savana"
    ],
    "cons": [
      "Cuaca cukup terik di siang hari"
    ],
    "uniqueFacts": [
      "Dijuluki Africa van Java karena lanskap savana keringnya yang mirip benua Afrika."
    ],
    "activities": [
      "Safari savana Bekol",
      "Bird watching",
      "Kunjungan ke Pantai Bama"
    ],
    "ecoTips": [
      "Jangan memberi makan satwa liar.",
      "Jaga jarak aman dari hewan."
    ],
    "highlights": [
      "Savana Bekol",
      "Menara Pandang",
      "Pantai Bama"
    ]
  },
  {
    "id": "danau-toba",
    "name": "Danau Toba",
    "tagline": "Keajaiban Kaldera Raksasa Purba dan Pusat Budaya Batak yang Mempesona",
    "category": "berenang",
    "region": "Sumatra Utara",
    "location": "Kabupaten Toba Samosir, Sumatera Utara",
    "image": "/assets/aistudio/DANAU_TOBA_28de8d40.jpeg",
    "gallery": [
      "/assets/aistudio/DANAU_TOBA_28de8d40.jpeg"
    ],
    "priceEstimate": 20000,
    "priceMaxEstimate": 20000,
    "priceDetails": "Biaya penyeberangan ferry & retribusi wisata",
    "priceSourceUrl": "https://www.indonesia.travel",
    "verificationDate": "2026-11-04",
    "priceCategory": "Hemat (<100rb)",
    "difficulty": "Mudah (Pemula)",
    "rating": 4.9,
    "reviewsCount": 420,
    "travelTime": "4 jam dari Medan via darat",
    "accessType": "Kendaraan Umum",
    "lat": 2.6843,
    "lng": 98.8756,
    "status": "published",
    "pros": [
      "Danau vulkanik terbesar di Asia Tenggara",
      "Budaya Batak yang kaya"
    ],
    "cons": [
      "Jarak tempuh jauh dari Medan"
    ],
    "uniqueFacts": [
      "Terbentuk dari letusan supervolcano 74.000 tahun lalu."
    ],
    "activities": [
      "Jelajah Pulau Samosir",
      "Berenang di danau",
      "Wisata budaya"
    ],
    "ecoTips": [
      "Hormati adat istiadat lokal.",
      "Dukung pengrajin ulos."
    ],
    "highlights": [
      "Kaldera Purba",
      "Pulau Samosir",
      "Budaya Batak"
    ]
  },
  {
    "id": "dataran-tinggi-dieng",
    "name": "Dataran Tinggi Dieng",
    "tagline": "Negeri Para Dewa di Atas Awan dengan Kawah Warna-Warni dan Candi Kuno",
    "category": "mendaki",
    "region": "Jawa Tengah",
    "location": "Wonosobo & Banjarnegara, Jawa Tengah",
    "image": "/assets/aistudio/DATARAN_TINGGI_35df184c.jpeg",
    "gallery": [
      "/assets/aistudio/DATARAN_TINGGI_35df184c.jpeg"
    ],
    "priceEstimate": 27500,
    "priceMaxEstimate": 27500,
    "priceDetails": "Tiket terusan kompleks wisata Dieng",
    "priceSourceUrl": "https://www.indonesia.travel",
    "verificationDate": "2026-11-04",
    "priceCategory": "Hemat (<100rb)",
    "difficulty": "Mudah (Pemula)",
    "rating": 4.8,
    "reviewsCount": 284,
    "travelTime": "1.5 jam dari Wonosobo",
    "accessType": "Motor / Mobil Pribadi",
    "lat": -7.2281,
    "lng": 109.9163,
    "status": "published",
    "pros": [
      "Telaga Warna yang memukau",
      "Candi Hindu tertua di Jawa"
    ],
    "cons": [
      "Kabut tebal mendadak"
    ],
    "uniqueFacts": [
      "Terletak di kaldera raksasa di ketinggian >2.000 mdpl."
    ],
    "activities": [
      "Melihat embun es",
      "Telaga Warna",
      "Candi Arjuna"
    ],
    "ecoTips": [
      "Bawa pakaian hangat.",
      "Beli produk pertanian lokal."
    ],
    "highlights": [
      "Telaga Warna",
      "Candi Arjuna",
      "Negeri Atas Awan"
    ]
  },
  {
    "id": "jel-001-pantai-iboih",
    "name": "Pantai Iboih",
    "tagline": "Pantai berair jernih di kawasan Pulau Weh yang dikenal dengan wisata bahari.",
    "category": "pantai",
    "region": "Aceh",
    "location": "Kota Sabang, Aceh",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Iboih_beach%2C_Sabang%2C_Aceh%3B_August_2010.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Iboih_beach%2C_Sabang%2C_Aceh%3B_August_2010.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Pantai berair jernih di kawasan Pulau Weh yang dikenal dengan wisata bahari."
    ],
    "activities": [
      "Snorkeling",
      "wisata pantai"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Pantai",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-002-pulau-rubiah",
    "name": "Pulau Rubiah",
    "tagline": "Pulau kecil dekat Iboih dengan perairan untuk menikmati wisata bawah laut.",
    "category": "snorkeling",
    "region": "Aceh",
    "location": "Kota Sabang, Aceh",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Pulau_Rubiah_dari_Pulau_Iboih_Sabang.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Pulau_Rubiah_dari_Pulau_Iboih_Sabang.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Pulau kecil dekat Iboih dengan perairan untuk menikmati wisata bawah laut."
    ],
    "activities": [
      "Wisata perahu",
      "snorkeling"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Pulau",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-003-danau-laut-tawar",
    "name": "Danau Laut Tawar",
    "tagline": "Danau di dataran tinggi Gayo yang menjadi bentang alam utama Takengon.",
    "category": "berenang",
    "region": "Aceh",
    "location": "Kabupaten Aceh Tengah, Aceh",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Tujuan_Wisata_Danau_Laut_Tawar.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Tujuan_Wisata_Danau_Laut_Tawar.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Danau di dataran tinggi Gayo yang menjadi bentang alam utama Takengon."
    ],
    "activities": [
      "Wisata danau",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Danau",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-004-pantai-lhoknga",
    "name": "Pantai Lhoknga",
    "tagline": "Pantai di pesisir barat Aceh Besar dengan pemandangan Samudra Hindia.",
    "category": "pantai",
    "region": "Aceh",
    "location": "Kabupaten Aceh Besar, Aceh",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Pantai_Lhoknga.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Pantai_Lhoknga.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Pantai di pesisir barat Aceh Besar dengan pemandangan Samudra Hindia."
    ],
    "activities": [
      "Wisata pantai",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Pantai",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-005-air-terjun-sipiso-piso",
    "name": "Air Terjun Sipiso-piso",
    "tagline": "Air terjun tinggi di kawasan Tongging dengan pemandangan perbukitan sekitar Danau Toba.",
    "category": "berenang",
    "region": "Sumatera Utara",
    "location": "Kabupaten Karo, Sumatera Utara",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/AIR_TERJUN_SIPISO-PISO_(SUMUT).jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/AIR_TERJUN_SIPISO-PISO_(SUMUT).jpg"
    ],
    "priceEstimate": 5000,
    "priceMaxEstimate": 5000,
    "priceDetails": "Perkiraan tiket dewasa; tarif sekitar Rp5.000, dapat berubah",
    "priceSourceUrl": "https://www.indonesia.travel/id/id/travel-ideas/adventure/air-terjun-terindah-di-indonesia",
    "verificationDate": "2026-11-04",
    "priceCategory": "Hemat (<100rb)",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Air terjun tinggi di kawasan Tongging dengan pemandangan perbukitan sekitar Danau Toba."
    ],
    "activities": [
      "Menikmati panorama",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Air Terjun",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-006-bukit-lawang",
    "name": "Bukit Lawang",
    "tagline": "Kawasan ekowisata di tepi hutan sekitar Taman Nasional Gunung Leuser.",
    "category": "camping",
    "region": "Sumatera Utara",
    "location": "Kabupaten Langkat, Sumatera Utara",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Bukit_Lawang%2C_Langkat_Regency%2C_North_Sumatra%2C_Indonesia.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Bukit_Lawang%2C_Langkat_Regency%2C_North_Sumatra%2C_Indonesia.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Kawasan ekowisata di tepi hutan sekitar Taman Nasional Gunung Leuser."
    ],
    "activities": [
      "Wisata alam berpemandu",
      "edukasi konservasi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Hutan",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-007-tangkahan",
    "name": "Tangkahan",
    "tagline": "Ekowisata hutan hujan di kawasan Langkat dengan bentang alam sungai dan hutan.",
    "category": "camping",
    "region": "Sumatera Utara",
    "location": "Kabupaten Langkat, Sumatera Utara",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Hutan_Tangkahan.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Hutan_Tangkahan.jpg"
    ],
    "priceEstimate": 5000,
    "priceMaxEstimate": 7500,
    "priceDetails": "WNI: Rp5.000 Senin–Sabtu, Rp7.500 Minggu/libur; aktivitas tambahan terpisah",
    "priceSourceUrl": "https://www.indonesia.travel/id/id/travel-ideas/adventure/10-destinasi-ekowisata-terbaik-di-indonesia-yang-wajib-kamu-kunjungi",
    "verificationDate": "2026-11-04",
    "priceCategory": "Hemat (<100rb)",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Ekowisata hutan hujan di kawasan Langkat dengan bentang alam sungai dan hutan."
    ],
    "activities": [
      "Jalan alam berpemandu",
      "wisata sungai"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Hutan",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-008-air-terjun-efrata",
    "name": "Air Terjun Efrata",
    "tagline": "Air terjun di kawasan Samosir dengan pemandangan hijau pegunungan.",
    "category": "berenang",
    "region": "Sumatera Utara",
    "location": "Kabupaten Samosir, Sumatera Utara",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Gambaran_lokasi_Air_Terjun_Efrata_dari_pintu_masuk.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Gambaran_lokasi_Air_Terjun_Efrata_dari_pintu_masuk.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Air terjun di kawasan Samosir dengan pemandangan hijau pegunungan."
    ],
    "activities": [
      "Menikmati panorama",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Air Terjun",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-009-lembah-harau",
    "name": "Lembah Harau",
    "tagline": "Lembah yang dikelilingi tebing batu menjulang dan air terjun.",
    "category": "mendaki",
    "region": "Sumatera Barat",
    "location": "Kabupaten Lima Puluh Kota, Sumatera Barat",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Panorama_Hutan%2C_bukit_dan_desa_di_lembah_harau.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Panorama_Hutan%2C_bukit_dan_desa_di_lembah_harau.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Lembah yang dikelilingi tebing batu menjulang dan air terjun."
    ],
    "activities": [
      "Wisata alam",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Lembah",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-010-danau-maninjau",
    "name": "Danau Maninjau",
    "tagline": "Danau vulkanik di Kabupaten Agam yang dikelilingi perbukitan.",
    "category": "berenang",
    "region": "Sumatera Barat",
    "location": "Kabupaten Agam, Sumatera Barat",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/DanauManinjau.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/DanauManinjau.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Danau vulkanik di Kabupaten Agam yang dikelilingi perbukitan."
    ],
    "activities": [
      "Menikmati panorama",
      "wisata danau"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Danau",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-011-puncak-lawang",
    "name": "Puncak Lawang",
    "tagline": "Titik pandang dari perbukitan yang menghadap kawasan Danau Maninjau.",
    "category": "mendaki",
    "region": "Sumatera Barat",
    "location": "Kabupaten Agam, Sumatera Barat",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Danau_Puncak_Lawang.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Danau_Puncak_Lawang.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Titik pandang dari perbukitan yang menghadap kawasan Danau Maninjau."
    ],
    "activities": [
      "Wisata panorama",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Perbukitan",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-012-pantai-air-manis",
    "name": "Pantai Air Manis",
    "tagline": "Pantai di Padang yang dikenal dengan kisah rakyat Malin Kundang.",
    "category": "pantai",
    "region": "Sumatera Barat",
    "location": "Kota Padang, Sumatera Barat",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Pantai_Air_Manis.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Pantai_Air_Manis.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Pantai di Padang yang dikenal dengan kisah rakyat Malin Kundang."
    ],
    "activities": [
      "Wisata pantai",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Pantai",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-013-ulu-kasok",
    "name": "Ulu Kasok",
    "tagline": "Kawasan panorama perbukitan dan genangan waduk di wilayah Kampar.",
    "category": "mendaki",
    "region": "Riau",
    "location": "Kabupaten Kampar, Riau",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Senja_di_Ulu_Kasok_Kampar.png",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Senja_di_Ulu_Kasok_Kampar.png"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Kawasan panorama perbukitan dan genangan waduk di wilayah Kampar."
    ],
    "activities": [
      "Menikmati panorama",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Perbukitan",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-014-air-terjun-guruh-gemurai",
    "name": "Air Terjun Guruh Gemurai",
    "tagline": "Air terjun di kawasan hutan Kuantan Singingi.",
    "category": "berenang",
    "region": "Riau",
    "location": "Kabupaten Kuantan Singingi, Riau",
    "image": "/assets/aistudio/DATARAN_TINGGI_35df184c.jpeg",
    "gallery": [
      "/assets/aistudio/DATARAN_TINGGI_35df184c.jpeg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Air terjun di kawasan hutan Kuantan Singingi."
    ],
    "activities": [
      "Wisata alam",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Air Terjun",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-015-gunung-kerinci",
    "name": "Gunung Kerinci",
    "tagline": "Gunung api tinggi di kawasan Pegunungan Bukit Barisan.",
    "category": "mendaki",
    "region": "Jambi",
    "location": "Kabupaten Kerinci, Jambi",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Gunung_Kerinci.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Gunung_Kerinci.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Gunung api tinggi di kawasan Pegunungan Bukit Barisan."
    ],
    "activities": [
      "Menikmati panorama pegunungan"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Gunung",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-016-danau-kaco",
    "name": "Danau Kaco",
    "tagline": "Danau kecil di kawasan hutan Kerinci yang dikenal karena warna airnya.",
    "category": "berenang",
    "region": "Jambi",
    "location": "Kabupaten Kerinci, Jambi",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/DANAU_KACO.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/DANAU_KACO.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Danau kecil di kawasan hutan Kerinci yang dikenal karena warna airnya."
    ],
    "activities": [
      "Wisata hutan berpemandu",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Danau",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-017-danau-ranau",
    "name": "Danau Ranau",
    "tagline": "Danau di perbatasan Sumatera Selatan dan Lampung dengan panorama Gunung Seminung.",
    "category": "berenang",
    "region": "Sumatera Selatan",
    "location": "Kabupaten Ogan Komering Ulu Selatan, Sumatera Selatan",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Pemandangan_Danau_Ranau.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Pemandangan_Danau_Ranau.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Danau di perbatasan Sumatera Selatan dan Lampung dengan panorama Gunung Seminung."
    ],
    "activities": [
      "Wisata danau",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Danau",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-018-gunung-dempo",
    "name": "Gunung Dempo",
    "tagline": "Gunung api yang menjadi lanskap utama kawasan Pagar Alam.",
    "category": "mendaki",
    "region": "Sumatera Selatan",
    "location": "Kota Pagar Alam, Sumatera Selatan",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Pemandangan_Gunung_Dempo.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Pemandangan_Gunung_Dempo.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Gunung api yang menjadi lanskap utama kawasan Pagar Alam."
    ],
    "activities": [
      "Wisata pegunungan",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Gunung",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-019-pulau-pahawang",
    "name": "Pulau Pahawang",
    "tagline": "Pulau wisata bahari di Teluk Lampung.",
    "category": "snorkeling",
    "region": "Lampung",
    "location": "Kabupaten Pesawaran, Lampung",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Pulau_pahawang.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Pulau_pahawang.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Pulau wisata bahari di Teluk Lampung."
    ],
    "activities": [
      "Wisata pulau",
      "snorkeling"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Pulau",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-020-teluk-kiluan",
    "name": "Teluk Kiluan",
    "tagline": "Kawasan pesisir Lampung yang dikenal dengan wisata laut dan pengamatan lumba-lumba.",
    "category": "berenang",
    "region": "Lampung",
    "location": "Kabupaten Tanggamus, Lampung",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Teluk_kiluan_lampung.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Teluk_kiluan_lampung.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Kawasan pesisir Lampung yang dikenal dengan wisata laut dan pengamatan lumba-lumba."
    ],
    "activities": [
      "Wisata perahu berpemandu",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Teluk",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-021-taman-nasional-way-kambas",
    "name": "Taman Nasional Way Kambas",
    "tagline": "Kawasan konservasi di Lampung Timur yang terkenal dengan perlindungan gajah Sumatera.",
    "category": "camping",
    "region": "Lampung",
    "location": "Kabupaten Lampung Timur, Lampung",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Taman_Nasional_Way_Kambas.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Taman_Nasional_Way_Kambas.jpg"
    ],
    "priceEstimate": 5000,
    "priceMaxEstimate": 7500,
    "priceDetails": "WNI: kisaran tiket menurut portal pariwisata; cek pengelola karena kegiatan dan akses berbeda",
    "priceSourceUrl": "https://www.indonesia.travel/id/id/travel-ideas/adventure/10-destinasi-ekowisata-terbaik-di-indonesia-yang-wajib-kamu-kunjungi",
    "verificationDate": "2026-11-04",
    "priceCategory": "Hemat (<100rb)",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Kawasan konservasi di Lampung Timur yang terkenal dengan perlindungan gajah Sumatera."
    ],
    "activities": [
      "Edukasi konservasi melalui program resmi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Taman Nasional",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-022-pantai-panjang",
    "name": "Pantai Panjang",
    "tagline": "Pantai berpasir panjang di pesisir Kota Bengkulu.",
    "category": "pantai",
    "region": "Bengkulu",
    "location": "Kota Bengkulu, Bengkulu",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Pantai_panjang_Bengkulu.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Pantai_panjang_Bengkulu.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Pantai berpasir panjang di pesisir Kota Bengkulu."
    ],
    "activities": [
      "Jalan santai",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Pantai",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-023-danau-dendam-tak-sudah",
    "name": "Danau Dendam Tak Sudah",
    "tagline": "Danau dan kawasan lahan basah yang memiliki fungsi ekologi penting.",
    "category": "berenang",
    "region": "Bengkulu",
    "location": "Kota Bengkulu, Bengkulu",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Danau_Dendam_Tak_Sudah.JPG",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Danau_Dendam_Tak_Sudah.JPG"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Danau dan kawasan lahan basah yang memiliki fungsi ekologi penting."
    ],
    "activities": [
      "Wisata panorama",
      "edukasi lingkungan"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Danau",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-024-pantai-tanjung-tinggi",
    "name": "Pantai Tanjung Tinggi",
    "tagline": "Pantai Belitung dengan formasi batu granit besar.",
    "category": "pantai",
    "region": "Kepulauan Bangka Belitung",
    "location": "Kabupaten Belitung, Kepulauan Bangka Belitung",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Pantai_Tanjung_Tinggi%2C_Belitung.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Pantai_Tanjung_Tinggi%2C_Belitung.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Pantai Belitung dengan formasi batu granit besar."
    ],
    "activities": [
      "Wisata pantai",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Pantai",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-025-pantai-tanjung-kelayang",
    "name": "Pantai Tanjung Kelayang",
    "tagline": "Pantai di Belitung yang menjadi salah satu titik wisata bahari.",
    "category": "pantai",
    "region": "Kepulauan Bangka Belitung",
    "location": "Kabupaten Belitung, Kepulauan Bangka Belitung",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Pantai_Tanjung_Kelayang.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Pantai_Tanjung_Kelayang.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Pantai di Belitung yang menjadi salah satu titik wisata bahari."
    ],
    "activities": [
      "Wisata pantai",
      "wisata perahu"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Pantai",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-026-pantai-lagoi",
    "name": "Pantai Lagoi",
    "tagline": "Kawasan pesisir wisata di Bintan dengan pantai berpasir.",
    "category": "pantai",
    "region": "Kepulauan Riau",
    "location": "Kabupaten Bintan, Kepulauan Riau",
    "image": "/assets/aistudio/DATARAN_TINGGI_35df184c.jpeg",
    "gallery": [
      "/assets/aistudio/DATARAN_TINGGI_35df184c.jpeg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Kawasan pesisir wisata di Bintan dengan pantai berpasir."
    ],
    "activities": [
      "Wisata pantai",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Pantai",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-027-taman-nasional-ujung-kulon",
    "name": "Taman Nasional Ujung Kulon",
    "tagline": "Kawasan konservasi ujung barat Pulau Jawa dengan ekosistem hutan dan pesisir.",
    "category": "camping",
    "region": "Banten",
    "location": "Kabupaten Pandeglang, Banten",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Ujung_Kulon_National_Park%2C_2014.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Ujung_Kulon_National_Park%2C_2014.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Kawasan konservasi ujung barat Pulau Jawa dengan ekosistem hutan dan pesisir."
    ],
    "activities": [
      "Edukasi konservasi",
      "wisata alam resmi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Taman Nasional",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-028-pantai-tanjung-lesung",
    "name": "Pantai Tanjung Lesung",
    "tagline": "Kawasan wisata pesisir barat Banten dengan pantai dan panorama laut.",
    "category": "pantai",
    "region": "Banten",
    "location": "Kabupaten Pandeglang, Banten",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Tanjung_Lesung_Beach.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Tanjung_Lesung_Beach.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Kawasan wisata pesisir barat Banten dengan pantai dan panorama laut."
    ],
    "activities": [
      "Wisata pantai",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Pantai",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-029-taman-nasional-kepulauan-seribu",
    "name": "Taman Nasional Kepulauan Seribu",
    "tagline": "Kawasan konservasi perairan dan pulau-pulau kecil di utara Jakarta.",
    "category": "camping",
    "region": "DKI Jakarta",
    "location": "Kabupaten Administrasi Kepulauan Seribu, DKI Jakarta",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/East_side_of_Pari_Island%2C_Kepulauan_Seribu_National_Park.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/East_side_of_Pari_Island%2C_Kepulauan_Seribu_National_Park.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Kawasan konservasi perairan dan pulau-pulau kecil di utara Jakarta."
    ],
    "activities": [
      "Edukasi konservasi",
      "wisata pulau"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Taman Nasional",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-030-kawah-putih",
    "name": "Kawah Putih",
    "tagline": "Danau kawah vulkanik berwarna terang di kawasan Ciwidey.",
    "category": "mendaki",
    "region": "Jawa Barat",
    "location": "Kabupaten Bandung, Jawa Barat",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Keindahan_di_Wisata_Kawah_Putih.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Keindahan_di_Wisata_Kawah_Putih.jpg"
    ],
    "priceEstimate": 28000,
    "priceMaxEstimate": 28000,
    "priceDetails": "Tarif dalam publikasi lama Perhutani; belum dapat dipastikan berlaku Nov 2026; ontang-anting Rp20.000 terpisah",
    "priceSourceUrl": "https://www.perhutani.co.id/wisata-kawah-putih-yang-wajib-dikunjungi-lengkap-harga-tiket-masuk-dan-fasilitasnya/",
    "verificationDate": "2026-11-04",
    "priceCategory": "Hemat (<100rb)",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Danau kawah vulkanik berwarna terang di kawasan Ciwidey."
    ],
    "activities": [
      "Wisata panorama",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Kawah",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-031-gunung-tangkuban-parahu",
    "name": "Gunung Tangkuban Parahu",
    "tagline": "Gunung api di sebelah utara Bandung dengan kawah yang menjadi daya tarik wisata.",
    "category": "mendaki",
    "region": "Jawa Barat",
    "location": "Kabupaten Bandung Barat, Jawa Barat",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Tangkuban_Perahu.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Tangkuban_Perahu.jpg"
    ],
    "priceEstimate": 30000,
    "priceMaxEstimate": 40000,
    "priceDetails": "WNI dewasa: Rp30.000 hari kerja, Rp40.000 libur; kendaraan terpisah",
    "priceSourceUrl": "https://www.indonesia.travel/id/id/travel-ideas/adventure/5-healthy-and-fun-activities-for-your-family-in-tangkuban-perahu",
    "verificationDate": "2026-11-04",
    "priceCategory": "Hemat (<100rb)",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Gunung api di sebelah utara Bandung dengan kawah yang menjadi daya tarik wisata."
    ],
    "activities": [
      "Wisata panorama",
      "edukasi geologi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Gunung",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-032-situ-patenggang",
    "name": "Situ Patenggang",
    "tagline": "Danau di dataran tinggi Ciwidey yang dikelilingi kawasan perkebunan.",
    "category": "berenang",
    "region": "Jawa Barat",
    "location": "Kabupaten Bandung, Jawa Barat",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Situ_Patenggang.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Situ_Patenggang.jpg"
    ],
    "priceEstimate": 20000,
    "priceMaxEstimate": 20000,
    "priceDetails": "Tarif WNI dari publikasi pariwisata; pastikan kembali kebijakan saat kunjungan",
    "priceSourceUrl": "https://www.indonesia.travel/id/en/travel-ideas/adventure/4-fun-things-to-do-in-kawah-putih-area",
    "verificationDate": "2026-11-04",
    "priceCategory": "Hemat (<100rb)",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Danau di dataran tinggi Ciwidey yang dikelilingi kawasan perkebunan."
    ],
    "activities": [
      "Wisata danau",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Danau",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-033-curug-cikaso",
    "name": "Curug Cikaso",
    "tagline": "Air terjun bertingkat dengan aliran air dan tebing hijau di Sukabumi.",
    "category": "berenang",
    "region": "Jawa Barat",
    "location": "Kabupaten Sukabumi, Jawa Barat",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Curug_Cikaso%2C_Jawa_Barat.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Curug_Cikaso%2C_Jawa_Barat.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Air terjun bertingkat dengan aliran air dan tebing hijau di Sukabumi."
    ],
    "activities": [
      "Wisata alam",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Air Terjun",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-034-gunung-papandayan",
    "name": "Gunung Papandayan",
    "tagline": "Gunung api di Garut yang memiliki kawah dan lanskap pegunungan.",
    "category": "mendaki",
    "region": "Jawa Barat",
    "location": "Kabupaten Garut, Jawa Barat",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Gunung_Papandayan.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Gunung_Papandayan.jpg"
    ],
    "priceEstimate": 30000,
    "priceMaxEstimate": 45000,
    "priceDetails": "WNI: Rp30.000 hari kerja, Rp45.000 akhir pekan/libur",
    "priceSourceUrl": "https://www.indonesia.travel/id/id/destination/java/west-java/gunung-papandayan",
    "verificationDate": "2026-11-04",
    "priceCategory": "Hemat (<100rb)",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Gunung api di Garut yang memiliki kawah dan lanskap pegunungan."
    ],
    "activities": [
      "Wisata pegunungan sesuai jalur resmi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Gunung",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-035-curug-cilember",
    "name": "Curug Cilember",
    "tagline": "Kawasan air terjun di wilayah Puncak, Bogor.",
    "category": "berenang",
    "region": "Jawa Barat",
    "location": "Kabupaten Bogor, Jawa Barat",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Curug_cilember_bogor.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Curug_cilember_bogor.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Kawasan air terjun di wilayah Puncak, Bogor."
    ],
    "activities": [
      "Wisata alam",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Air Terjun",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-036-kepulauan-karimunjawa",
    "name": "Kepulauan Karimunjawa",
    "tagline": "Gugusan pulau di Laut Jawa yang dikenal dengan wisata bahari.",
    "category": "snorkeling",
    "region": "Jawa Tengah",
    "location": "Kabupaten Jepara, Jawa Tengah",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Keindahan_Karimunjawa.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Keindahan_Karimunjawa.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Gugusan pulau di Laut Jawa yang dikenal dengan wisata bahari."
    ],
    "activities": [
      "Wisata pulau",
      "snorkeling"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Kepulauan",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-037-gunung-merbabu",
    "name": "Gunung Merbabu",
    "tagline": "Gunung di Jawa Tengah dengan lanskap sabana pada sejumlah jalur.",
    "category": "mendaki",
    "region": "Jawa Tengah",
    "location": "Kabupaten Magelang dan sekitarnya, Jawa Tengah",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Merbabu.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Merbabu.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Gunung di Jawa Tengah dengan lanskap sabana pada sejumlah jalur."
    ],
    "activities": [
      "Wisata panorama pegunungan"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Gunung",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-038-gunung-prau",
    "name": "Gunung Prau",
    "tagline": "Gunung di sekitar kawasan Dieng yang dikenal dengan panorama pegunungan.",
    "category": "mendaki",
    "region": "Jawa Tengah",
    "location": "Kabupaten Wonosobo dan sekitarnya, Jawa Tengah",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/GUNUNG_PRAU.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/GUNUNG_PRAU.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Gunung di sekitar kawasan Dieng yang dikenal dengan panorama pegunungan."
    ],
    "activities": [
      "Wisata panorama",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Gunung",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-039-rawa-pening",
    "name": "Rawa Pening",
    "tagline": "Danau alami di cekungan kawasan Ambarawa dan sekitarnya.",
    "category": "berenang",
    "region": "Jawa Tengah",
    "location": "Kabupaten Semarang, Jawa Tengah",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Rawa_Pening.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Rawa_Pening.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Danau alami di cekungan kawasan Ambarawa dan sekitarnya."
    ],
    "activities": [
      "Wisata danau",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Danau",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-040-curug-lawe-benowo-kalisidi",
    "name": "Curug Lawe Benowo Kalisidi",
    "tagline": "Kawasan wisata air terjun di lereng Gunung Ungaran.",
    "category": "berenang",
    "region": "Jawa Tengah",
    "location": "Kabupaten Semarang, Jawa Tengah",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Curug_Lawe.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Curug_Lawe.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Kawasan wisata air terjun di lereng Gunung Ungaran."
    ],
    "activities": [
      "Wisata alam",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Air Terjun",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-041-goa-pindul",
    "name": "Goa Pindul",
    "tagline": "Gua wisata yang memiliki aliran sungai bawah tanah.",
    "category": "camping",
    "region": "DI Yogyakarta",
    "location": "Kabupaten Gunungkidul, DI Yogyakarta",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Pindul_Cave%2C_Indonesia.JPG",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Pindul_Cave%2C_Indonesia.JPG"
    ],
    "priceEstimate": 40000,
    "priceMaxEstimate": 40000,
    "priceDetails": "Harga aktivitas cave tubing Rp40.000/orang, BUKAN tiket masuk umum; harga operator bisa berbeda",
    "priceSourceUrl": "https://www.indonesia.travel/id/id/travel-ideas/adventure/7-goa-eksotis-yang-perlu-ada-di-bucket-list",
    "verificationDate": "2026-11-04",
    "priceCategory": "Hemat (<100rb)",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Gua wisata yang memiliki aliran sungai bawah tanah."
    ],
    "activities": [
      "Wisata gua dengan operator resmi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Gua",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-042-pantai-timang",
    "name": "Pantai Timang",
    "tagline": "Pantai di Gunungkidul dengan bentang tebing dan ombak Samudra Hindia.",
    "category": "pantai",
    "region": "DI Yogyakarta",
    "location": "Kabupaten Gunungkidul, DI Yogyakarta",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Pantai_timang.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Pantai_timang.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Pantai di Gunungkidul dengan bentang tebing dan ombak Samudra Hindia."
    ],
    "activities": [
      "Wisata panorama",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Pantai",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-043-hutan-pinus-mangunan",
    "name": "Hutan Pinus Mangunan",
    "tagline": "Kawasan hutan pinus wisata di Dlingo, Bantul.",
    "category": "camping",
    "region": "DI Yogyakarta",
    "location": "Kabupaten Bantul, DI Yogyakarta",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Hutan_Pinus_Mangunan.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Hutan_Pinus_Mangunan.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Kawasan hutan pinus wisata di Dlingo, Bantul."
    ],
    "activities": [
      "Jalan santai",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Hutan",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-044-air-terjun-tumpak-sewu",
    "name": "Air Terjun Tumpak Sewu",
    "tagline": "Air terjun bertingkat melingkar di kawasan perbatasan Lumajang dan Malang.",
    "category": "berenang",
    "region": "Jawa Timur",
    "location": "Kabupaten Lumajang, Jawa Timur",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Tumpak_Sewu.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Tumpak_Sewu.jpg"
    ],
    "priceEstimate": 10000,
    "priceMaxEstimate": 10000,
    "priceDetails": "Harga mulai Rp10.000 menurut portal wisata; mungkin ada tarif titik lain",
    "priceSourceUrl": "https://www.indonesia.travel/id/id/travel-ideas/adventure/air-terjun-terindah-di-indonesia",
    "verificationDate": "2026-11-04",
    "priceCategory": "Hemat (<100rb)",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Air terjun bertingkat melingkar di kawasan perbatasan Lumajang dan Malang."
    ],
    "activities": [
      "Menikmati panorama dari area resmi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Air Terjun",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-045-air-terjun-madakaripura",
    "name": "Air Terjun Madakaripura",
    "tagline": "Air terjun di kawasan lembah tebing Probolinggo.",
    "category": "berenang",
    "region": "Jawa Timur",
    "location": "Kabupaten Probolinggo, Jawa Timur",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Madakaripura_Waterfall.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Madakaripura_Waterfall.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Air terjun di kawasan lembah tebing Probolinggo."
    ],
    "activities": [
      "Wisata alam berpemandu",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Air Terjun",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-046-pantai-papuma",
    "name": "Pantai Papuma",
    "tagline": "Pantai di pesisir selatan Jember dengan formasi batu karang.",
    "category": "pantai",
    "region": "Jawa Timur",
    "location": "Kabupaten Jember, Jawa Timur",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Papuma_Beach.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Papuma_Beach.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Pantai di pesisir selatan Jember dengan formasi batu karang."
    ],
    "activities": [
      "Wisata pantai",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Pantai",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-047-taman-nasional-meru-betiri",
    "name": "Taman Nasional Meru Betiri",
    "tagline": "Kawasan konservasi hutan dan pesisir di Jawa Timur.",
    "category": "camping",
    "region": "Jawa Timur",
    "location": "Kabupaten Jember dan Banyuwangi, Jawa Timur",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Pegunungan_meru_betiri.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Pegunungan_meru_betiri.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Kawasan konservasi hutan dan pesisir di Jawa Timur."
    ],
    "activities": [
      "Edukasi konservasi",
      "wisata alam resmi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Taman Nasional",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-048-ranu-kumbolo",
    "name": "Ranu Kumbolo",
    "tagline": "Danau pegunungan di kawasan Taman Nasional Bromo Tengger Semeru.",
    "category": "berenang",
    "region": "Jawa Timur",
    "location": "Kabupaten Lumajang, Jawa Timur",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Ranu_Kumbolo_from_a_distance.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Ranu_Kumbolo_from_a_distance.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Danau pegunungan di kawasan Taman Nasional Bromo Tengger Semeru."
    ],
    "activities": [
      "Menikmati panorama melalui akses resmi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Danau",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-049-jatiluwih",
    "name": "Jatiluwih",
    "tagline": "Lanskap sawah berteras dan sistem irigasi subak di Tabanan.",
    "category": "mendaki",
    "region": "Bali",
    "location": "Kabupaten Tabanan, Bali",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Jatiluwih1.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Jatiluwih1.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Lanskap sawah berteras dan sistem irigasi subak di Tabanan."
    ],
    "activities": [
      "Jalan santai",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Persawahan",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-050-danau-beratan",
    "name": "Danau Beratan",
    "tagline": "Danau dataran tinggi di kawasan Bedugul.",
    "category": "berenang",
    "region": "Bali",
    "location": "Kabupaten Tabanan, Bali",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Menikmati_ketenangan_spiritual_dari_sejuknya_alam_dikawasan_danau_Beratan.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Menikmati_ketenangan_spiritual_dari_sejuknya_alam_dikawasan_danau_Beratan.jpg"
    ],
    "priceEstimate": 30000,
    "priceMaxEstimate": 30000,
    "priceDetails": "Harga menurut publikasi wisata; objek Danau Beratan, bukan otomatis tiket Pura Ulun Danu",
    "priceSourceUrl": "https://www.indonesia.travel/in/en/travel-ideas/adventure/nikmati-serunya-road-trip-di-6-spot-campervan-bali-ini",
    "verificationDate": "2026-11-04",
    "priceCategory": "Hemat (<100rb)",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Danau dataran tinggi di kawasan Bedugul."
    ],
    "activities": [
      "Wisata danau",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Danau",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-051-air-terjun-sekumpul",
    "name": "Air Terjun Sekumpul",
    "tagline": "Kawasan air terjun di Bali Utara dengan lanskap lembah hijau.",
    "category": "berenang",
    "region": "Bali",
    "location": "Kabupaten Buleleng, Bali",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Keindahan_Air_Terjun_Sekumpul.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Keindahan_Air_Terjun_Sekumpul.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Kawasan air terjun di Bali Utara dengan lanskap lembah hijau."
    ],
    "activities": [
      "Wisata panorama dengan pemandu lokal"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Air Terjun",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-052-air-terjun-nungnung",
    "name": "Air Terjun Nungnung",
    "tagline": "Air terjun di wilayah Petang dengan lingkungan hutan hijau.",
    "category": "berenang",
    "region": "Bali",
    "location": "Kabupaten Badung, Bali",
    "image": "/assets/aistudio/DATARAN_TINGGI_35df184c.jpeg",
    "gallery": [
      "/assets/aistudio/DATARAN_TINGGI_35df184c.jpeg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Air terjun di wilayah Petang dengan lingkungan hutan hijau."
    ],
    "activities": [
      "Wisata panorama",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Air Terjun",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-053-air-terjun-munduk",
    "name": "Air Terjun Munduk",
    "tagline": "Air terjun di kawasan perbukitan Munduk, Bali Utara.",
    "category": "berenang",
    "region": "Bali",
    "location": "Kabupaten Buleleng, Bali",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Munduk_Tutub_Waterfall_SF0002.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Munduk_Tutub_Waterfall_SF0002.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Air terjun di kawasan perbukitan Munduk, Bali Utara."
    ],
    "activities": [
      "Wisata alam",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Air Terjun",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-054-gunung-rinjani",
    "name": "Gunung Rinjani",
    "tagline": "Gunung api di Lombok dengan kaldera dan Danau Segara Anak.",
    "category": "mendaki",
    "region": "Nusa Tenggara Barat",
    "location": "Kabupaten Lombok Timur dan sekitarnya, Nusa Tenggara Barat",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Gunung_rinjani.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Gunung_rinjani.jpg"
    ],
    "priceEstimate": 20000,
    "priceMaxEstimate": 75000,
    "priceDetails": "WNI tarif berdasarkan jalur: Aikberik/Tetebatu/Timbanuh Rp20.000 kerja, Rp30.000 libur; Sembalun/Senaru/Torean Rp50.000 kerja, Rp75.000 libur; per orang/hari",
    "priceSourceUrl": "https://www.rinjaninationalpark.id/detail/kenaikan-kelas-dan-tarif-tiket-pendakian-gunung-rinjani",
    "verificationDate": "2026-11-04",
    "priceCategory": "Hemat (<100rb)",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Gunung api di Lombok dengan kaldera dan Danau Segara Anak."
    ],
    "activities": [
      "Wisata panorama pegunungan"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Gunung",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-055-pantai-tanjung-aan",
    "name": "Pantai Tanjung Aan",
    "tagline": "Pantai berpasir di kawasan Mandalika, Lombok Tengah.",
    "category": "pantai",
    "region": "Nusa Tenggara Barat",
    "location": "Kabupaten Lombok Tengah, Nusa Tenggara Barat",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/TANJUNG_AAN.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/TANJUNG_AAN.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Pantai berpasir di kawasan Mandalika, Lombok Tengah."
    ],
    "activities": [
      "Wisata pantai",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Pantai",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-056-gili-trawangan",
    "name": "Gili Trawangan",
    "tagline": "Pulau kecil wisata bahari di sebelah barat laut Lombok.",
    "category": "snorkeling",
    "region": "Nusa Tenggara Barat",
    "location": "Kabupaten Lombok Utara, Nusa Tenggara Barat",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Gili_Trawangan_beach.JPG",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Gili_Trawangan_beach.JPG"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Pulau kecil wisata bahari di sebelah barat laut Lombok."
    ],
    "activities": [
      "Wisata pulau",
      "snorkeling"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Pulau",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-057-pulau-kenawa",
    "name": "Pulau Kenawa",
    "tagline": "Pulau kecil di sekitar Poto Tano yang dikenal dengan bukit savananya.",
    "category": "snorkeling",
    "region": "Nusa Tenggara Barat",
    "location": "Kabupaten Sumbawa Barat, Nusa Tenggara Barat",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Pulau_kenawa.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Pulau_kenawa.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Pulau kecil di sekitar Poto Tano yang dikenal dengan bukit savananya."
    ],
    "activities": [
      "Wisata panorama",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Pulau",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-058-air-terjun-benang-kelambu",
    "name": "Air Terjun Benang Kelambu",
    "tagline": "Air terjun di kawasan kaki Gunung Rinjani dengan aliran menyerupai tirai.",
    "category": "berenang",
    "region": "Nusa Tenggara Barat",
    "location": "Kabupaten Lombok Tengah, Nusa Tenggara Barat",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Lombok_-_Benang_Kelambu_Waterfall.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Lombok_-_Benang_Kelambu_Waterfall.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Air terjun di kawasan kaki Gunung Rinjani dengan aliran menyerupai tirai."
    ],
    "activities": [
      "Wisata alam",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Air Terjun",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-059-taman-nasional-komodo",
    "name": "Taman Nasional Komodo",
    "tagline": "Kawasan konservasi pulau dan laut yang menjadi habitat komodo.",
    "category": "camping",
    "region": "Nusa Tenggara Timur",
    "location": "Kabupaten Manggarai Barat, Nusa Tenggara Timur",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Komodo_dragon_at_Komodo_National_Park.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Komodo_dragon_at_Komodo_National_Park.jpg"
    ],
    "priceEstimate": 50000,
    "priceMaxEstimate": 75000,
    "priceDetails": "WNI: Rp50.000 hari kerja, Rp75.000 libur. Kapal, ranger, dan layanan lainnya bisa terpisah",
    "priceSourceUrl": "https://www.indonesia.travel/id/id/destination/bali-nusa-tenggara/east-nusa-tenggara/labuan-bajo---komodo-national-park",
    "verificationDate": "2026-11-04",
    "priceCategory": "Hemat (<100rb)",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Kawasan konservasi pulau dan laut yang menjadi habitat komodo."
    ],
    "activities": [
      "Edukasi konservasi bersama ranger resmi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Taman Nasional",
      "Wisata Nusantara"
    ],
    "googleRating": 4.9,
    "googleReviewCount": 420,
    "routeAccessType": [
      "Kendaraan darat",
      "Kapal"
    ],
    "routeDescription": "Akses darat ke Labuan Bajo, dilanjutkan perahu wisata atau speedboat menuju pulau dalam kawasan.",
    "ratingVerifiedAt": "2026-11-04"
  },
  {
    "id": "jel-060-pulau-padar",
    "name": "Pulau Padar",
    "tagline": "Pulau di kawasan Taman Nasional Komodo dengan panorama teluk-teluk dari perbukitan.",
    "category": "snorkeling",
    "region": "Nusa Tenggara Timur",
    "location": "Kabupaten Manggarai Barat, Nusa Tenggara Timur",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Padar_Island.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Padar_Island.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Pulau di kawasan Taman Nasional Komodo dengan panorama teluk-teluk dari perbukitan."
    ],
    "activities": [
      "Menikmati panorama dari jalur resmi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Pulau",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-061-danau-kelimutu",
    "name": "Danau Kelimutu",
    "tagline": "Tiga danau kawah vulkanik di kawasan Gunung Kelimutu.",
    "category": "berenang",
    "region": "Nusa Tenggara Timur",
    "location": "Kabupaten Ende, Nusa Tenggara Timur",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Danau_Kelimutu.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Danau_Kelimutu.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Tiga danau kawah vulkanik di kawasan Gunung Kelimutu."
    ],
    "activities": [
      "Wisata panorama",
      "edukasi geologi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Danau",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-062-pantai-koka",
    "name": "Pantai Koka",
    "tagline": "Pantai di kawasan selatan Pulau Flores dengan dua teluk.",
    "category": "pantai",
    "region": "Nusa Tenggara Timur",
    "location": "Kabupaten Sikka, Nusa Tenggara Timur",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Koka_Beach%2C_East_Flores.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Koka_Beach%2C_East_Flores.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Pantai di kawasan selatan Pulau Flores dengan dua teluk."
    ],
    "activities": [
      "Wisata pantai",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Pantai",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-063-goa-rangko",
    "name": "Goa Rangko",
    "tagline": "Gua dengan kolam air asin di sekitar kawasan Labuan Bajo.",
    "category": "camping",
    "region": "Nusa Tenggara Timur",
    "location": "Kabupaten Manggarai Barat, Nusa Tenggara Timur",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Gua_Rangko.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Gua_Rangko.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Gua dengan kolam air asin di sekitar kawasan Labuan Bajo."
    ],
    "activities": [
      "Wisata gua dengan pemandu"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Gua",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-064-pantai-nembrala",
    "name": "Pantai Nembrala",
    "tagline": "Pantai di Pulau Rote yang dikenal dengan ombak selancar.",
    "category": "pantai",
    "region": "Nusa Tenggara Timur",
    "location": "Kabupaten Rote Ndao, Nusa Tenggara Timur",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Dusk_at_Nembrala_Beach.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Dusk_at_Nembrala_Beach.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Pantai di Pulau Rote yang dikenal dengan ombak selancar."
    ],
    "activities": [
      "Wisata pantai",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Pantai",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-065-air-terjun-oenesu",
    "name": "Air Terjun Oenesu",
    "tagline": "Air terjun berundak di kawasan Kupang bagian barat.",
    "category": "berenang",
    "region": "Nusa Tenggara Timur",
    "location": "Kabupaten Kupang, Nusa Tenggara Timur",
    "image": "/assets/aistudio/DATARAN_TINGGI_35df184c.jpeg",
    "gallery": [
      "/assets/aistudio/DATARAN_TINGGI_35df184c.jpeg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Air terjun berundak di kawasan Kupang bagian barat."
    ],
    "activities": [
      "Wisata alam",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Air Terjun",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-066-danau-sentarum",
    "name": "Danau Sentarum",
    "tagline": "Kawasan danau musiman dan lahan basah di hulu Kapuas.",
    "category": "berenang",
    "region": "Kalimantan Barat",
    "location": "Kabupaten Kapuas Hulu, Kalimantan Barat",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Danau_Sentarum.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Danau_Sentarum.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Kawasan danau musiman dan lahan basah di hulu Kapuas."
    ],
    "activities": [
      "Ekowisata sesuai aturan kawasan"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Danau",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-067-bukit-kelam",
    "name": "Bukit Kelam",
    "tagline": "Bukit batu besar di Kabupaten Sintang.",
    "category": "mendaki",
    "region": "Kalimantan Barat",
    "location": "Kabupaten Sintang, Kalimantan Barat",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Taman_Wisata_Alam_Bukit_Kelam.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Taman_Wisata_Alam_Bukit_Kelam.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Bukit batu besar di Kabupaten Sintang."
    ],
    "activities": [
      "Wisata panorama",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Bukit",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-068-taman-nasional-tanjung-puting",
    "name": "Taman Nasional Tanjung Puting",
    "tagline": "Kawasan konservasi hutan rawa di Kalimantan Tengah yang terkenal dengan orangutan.",
    "category": "camping",
    "region": "Kalimantan Tengah",
    "location": "Kabupaten Kotawaringin Barat, Kalimantan Tengah",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Tanjung_Puting_National_Park.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Tanjung_Puting_National_Park.jpg"
    ],
    "priceEstimate": 50000,
    "priceMaxEstimate": 50000,
    "priceDetails": "WNI Rp50.000/orang/hari; perahu klotok/akomodasi terpisah",
    "priceSourceUrl": "https://www.indonesia.travel/id/id/travel-ideas/adventure/10-destinasi-ekowisata-terbaik-di-indonesia-yang-wajib-kamu-kunjungi",
    "verificationDate": "2026-11-04",
    "priceCategory": "Hemat (<100rb)",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Kawasan konservasi hutan rawa di Kalimantan Tengah yang terkenal dengan orangutan."
    ],
    "activities": [
      "Wisata sungai berpemandu",
      "edukasi konservasi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Taman Nasional",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-069-bukit-tangkiling",
    "name": "Bukit Tangkiling",
    "tagline": "Kawasan perbukitan batu di sekitar Palangka Raya.",
    "category": "mendaki",
    "region": "Kalimantan Tengah",
    "location": "Kota Palangka Raya, Kalimantan Tengah",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Bukit_Tangkiling_dari_Jalan_Tjilik_Riwut_km_33_(20260117_103810).jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Bukit_Tangkiling_dari_Jalan_Tjilik_Riwut_km_33_(20260117_103810).jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Kawasan perbukitan batu di sekitar Palangka Raya."
    ],
    "activities": [
      "Wisata alam",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Bukit",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-070-taman-hutan-raya-sultan-adam",
    "name": "Taman Hutan Raya Sultan Adam",
    "tagline": "Kawasan taman hutan raya dengan perbukitan dan waduk di Kalimantan Selatan.",
    "category": "camping",
    "region": "Kalimantan Selatan",
    "location": "Kabupaten Banjar, Kalimantan Selatan",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/TAHURA_SULTAN_ADAM.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/TAHURA_SULTAN_ADAM.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Kawasan taman hutan raya dengan perbukitan dan waduk di Kalimantan Selatan."
    ],
    "activities": [
      "Edukasi lingkungan",
      "wisata alam"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Hutan",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-071-pulau-derawan",
    "name": "Pulau Derawan",
    "tagline": "Pulau wisata bahari di Kepulauan Derawan.",
    "category": "snorkeling",
    "region": "Kalimantan Timur",
    "location": "Kabupaten Berau, Kalimantan Timur",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Derawan_Island_East_Kalimantan.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Derawan_Island_East_Kalimantan.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Pulau wisata bahari di Kepulauan Derawan."
    ],
    "activities": [
      "Wisata pulau",
      "snorkeling"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Pulau",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-072-pulau-maratua",
    "name": "Pulau Maratua",
    "tagline": "Pulau wisata bahari di gugusan Derawan dengan ekosistem terumbu karang.",
    "category": "snorkeling",
    "region": "Kalimantan Timur",
    "location": "Kabupaten Berau, Kalimantan Timur",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Side_view_of_Maratua_Island.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Side_view_of_Maratua_Island.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Pulau wisata bahari di gugusan Derawan dengan ekosistem terumbu karang."
    ],
    "activities": [
      "Wisata pulau",
      "snorkeling"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Pulau",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-073-danau-labuan-cermin",
    "name": "Danau Labuan Cermin",
    "tagline": "Danau berair jernih di kawasan Biduk-Biduk, Berau.",
    "category": "berenang",
    "region": "Kalimantan Timur",
    "location": "Kabupaten Berau, Kalimantan Timur",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Labuancermin.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Labuancermin.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Danau berair jernih di kawasan Biduk-Biduk, Berau."
    ],
    "activities": [
      "Wisata danau",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Danau",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-074-pantai-amal",
    "name": "Pantai Amal",
    "tagline": "Pantai di kawasan pesisir Kota Tarakan.",
    "category": "pantai",
    "region": "Kalimantan Utara",
    "location": "Kota Tarakan, Kalimantan Utara",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Pantai_Amal.JPG",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Pantai_Amal.JPG"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Pantai di kawasan pesisir Kota Tarakan."
    ],
    "activities": [
      "Wisata pantai",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Pantai",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-075-pantai-paal-likupang",
    "name": "Pantai Paal Likupang",
    "tagline": "Pantai berpasir putih di kawasan Likupang.",
    "category": "pantai",
    "region": "Sulawesi Utara",
    "location": "Kabupaten Minahasa Utara, Sulawesi Utara",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Pantai_Paal_Likupang.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Pantai_Paal_Likupang.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Pantai berpasir putih di kawasan Likupang."
    ],
    "activities": [
      "Wisata pantai",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Pantai",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-076-gunung-lokon",
    "name": "Gunung Lokon",
    "tagline": "Gunung api aktif yang menjadi lanskap khas kawasan Tomohon.",
    "category": "mendaki",
    "region": "Sulawesi Utara",
    "location": "Kota Tomohon, Sulawesi Utara",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Gunung_Lokon.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Gunung_Lokon.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Gunung api aktif yang menjadi lanskap khas kawasan Tomohon."
    ],
    "activities": [
      "Mengamati panorama dari area aman"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Gunung",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-077-pulau-saronde",
    "name": "Pulau Saronde",
    "tagline": "Pulau kecil dengan pantai pasir putih dan perairan jernih.",
    "category": "snorkeling",
    "region": "Gorontalo",
    "location": "Kabupaten Gorontalo Utara, Gorontalo",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Pulau_Saronde.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Pulau_Saronde.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Pulau kecil dengan pantai pasir putih dan perairan jernih."
    ],
    "activities": [
      "Wisata pulau",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Pulau",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-078-kepulauan-togean",
    "name": "Kepulauan Togean",
    "tagline": "Kepulauan di Teluk Tomini dengan perairan dan ekosistem terumbu karang.",
    "category": "snorkeling",
    "region": "Sulawesi Tengah",
    "location": "Kabupaten Tojo Una-Una, Sulawesi Tengah",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Togian_Islands_banner.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Togian_Islands_banner.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Kepulauan di Teluk Tomini dengan perairan dan ekosistem terumbu karang."
    ],
    "activities": [
      "Wisata pulau",
      "snorkeling"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Kepulauan",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-079-danau-poso",
    "name": "Danau Poso",
    "tagline": "Danau luas di bagian tengah Sulawesi.",
    "category": "berenang",
    "region": "Sulawesi Tengah",
    "location": "Kabupaten Poso, Sulawesi Tengah",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Danau_poso_scene-sulawesi_tengah-indonesia.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Danau_poso_scene-sulawesi_tengah-indonesia.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Danau luas di bagian tengah Sulawesi."
    ],
    "activities": [
      "Wisata danau",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Danau",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-080-pulau-karampuang",
    "name": "Pulau Karampuang",
    "tagline": "Pulau di lepas pantai Mamuju dengan wisata bahari.",
    "category": "snorkeling",
    "region": "Sulawesi Barat",
    "location": "Kabupaten Mamuju, Sulawesi Barat",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Karampuang.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Karampuang.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Pulau di lepas pantai Mamuju dengan wisata bahari."
    ],
    "activities": [
      "Wisata pulau",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Pulau",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-081-taman-nasional-bantimurung-bulusaraung",
    "name": "Taman Nasional Bantimurung Bulusaraung",
    "tagline": "Kawasan konservasi karst dan hutan di Sulawesi Selatan.",
    "category": "camping",
    "region": "Sulawesi Selatan",
    "location": "Kabupaten Maros dan Pangkajene dan Kepulauan, Sulawesi Selatan",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Bantimurung_National_Park_waterfall.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Bantimurung_National_Park_waterfall.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Kawasan konservasi karst dan hutan di Sulawesi Selatan."
    ],
    "activities": [
      "Wisata alam resmi",
      "edukasi konservasi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Taman Nasional",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-082-pantai-tanjung-bira",
    "name": "Pantai Tanjung Bira",
    "tagline": "Pantai berpasir putih di ujung selatan Sulawesi.",
    "category": "pantai",
    "region": "Sulawesi Selatan",
    "location": "Kabupaten Bulukumba, Sulawesi Selatan",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Tanjung_Bira_Beach.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Tanjung_Bira_Beach.jpg"
    ],
    "priceEstimate": 20000,
    "priceMaxEstimate": 20000,
    "priceDetails": "WNI hari biasa Rp20.000 menurut portal pariwisata; hari libur dapat berbeda",
    "priceSourceUrl": "https://www.indonesia.travel/id/id/destination/sulawesi/south-sulawesi/pantai-tanjung-bira",
    "verificationDate": "2026-11-04",
    "priceCategory": "Hemat (<100rb)",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Pantai berpasir putih di ujung selatan Sulawesi."
    ],
    "activities": [
      "Wisata pantai",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Pantai",
      "Wisata Nusantara"
    ],
    "googleRating": 4.8,
    "googleReviewCount": 240,
    "routeAccessType": [
      "Kendaraan darat"
    ],
    "routeDescription": "Akses darat beraspal dari Makassar melalui Kabupaten Maros dan Bantaeng menuju Bulukumba.",
    "ratingVerifiedAt": "2026-11-04"
  },
  {
    "id": "jel-083-taman-nasional-wakatobi",
    "name": "Taman Nasional Wakatobi",
    "tagline": "Kawasan konservasi laut kepulauan di Sulawesi Tenggara.",
    "category": "camping",
    "region": "Sulawesi Tenggara",
    "location": "Kabupaten Wakatobi, Sulawesi Tenggara",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Flickr_-_JennyHuang_-_Wakatobi_Reef_Atoll.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Flickr_-_JennyHuang_-_Wakatobi_Reef_Atoll.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Kawasan konservasi laut kepulauan di Sulawesi Tenggara."
    ],
    "activities": [
      "Wisata bahari sesuai aturan kawasan"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Taman Nasional",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-084-pulau-labengki",
    "name": "Pulau Labengki",
    "tagline": "Pulau di perairan Sulawesi Tenggara dengan lanskap karst pesisir.",
    "category": "snorkeling",
    "region": "Sulawesi Tenggara",
    "location": "Kabupaten Konawe Utara, Sulawesi Tenggara",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Pulau_Labengki_Besar.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Pulau_Labengki_Besar.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Pulau di perairan Sulawesi Tenggara dengan lanskap karst pesisir."
    ],
    "activities": [
      "Wisata perahu",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Pulau",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-085-pantai-ora",
    "name": "Pantai Ora",
    "tagline": "Pantai di Pulau Seram dengan air laut jernih dan lanskap pesisir.",
    "category": "pantai",
    "region": "Maluku",
    "location": "Kabupaten Maluku Tengah, Maluku",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Panorama_Pantai_Ora.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Panorama_Pantai_Ora.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Pantai di Pulau Seram dengan air laut jernih dan lanskap pesisir."
    ],
    "activities": [
      "Wisata pantai",
      "snorkeling"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Pantai",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-086-kepulauan-banda",
    "name": "Kepulauan Banda",
    "tagline": "Gugusan pulau vulkanik di Laut Banda dengan wisata alam dan sejarah.",
    "category": "snorkeling",
    "region": "Maluku",
    "location": "Kabupaten Maluku Tengah, Maluku",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Bandaneira-0039.JPG",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Bandaneira-0039.JPG"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Gugusan pulau vulkanik di Laut Banda dengan wisata alam dan sejarah."
    ],
    "activities": [
      "Wisata pulau",
      "snorkeling"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Kepulauan",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-087-danau-tolire",
    "name": "Danau Tolire",
    "tagline": "Danau kawah di kaki Gunung Gamalama, Ternate.",
    "category": "berenang",
    "region": "Maluku Utara",
    "location": "Kota Ternate, Maluku Utara",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Danau_Tolire.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Danau_Tolire.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Danau kawah di kaki Gunung Gamalama, Ternate."
    ],
    "activities": [
      "Wisata panorama",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Danau",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-088-danau-sentani",
    "name": "Danau Sentani",
    "tagline": "Danau besar di wilayah Jayapura dengan pulau-pulau kecil.",
    "category": "berenang",
    "region": "Papua",
    "location": "Kabupaten Jayapura, Papua",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Danau_Sentani.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Danau_Sentani.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Danau besar di wilayah Jayapura dengan pulau-pulau kecil."
    ],
    "activities": [
      "Wisata danau",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Danau",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-089-pegunungan-arfak",
    "name": "Pegunungan Arfak",
    "tagline": "Kawasan pegunungan dan hutan di Papua Barat.",
    "category": "mendaki",
    "region": "Papua Barat",
    "location": "Kabupaten Pegunungan Arfak, Papua Barat",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Pegunungan_Arfak_di_Manokwari.jpg",
    "gallery": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Pegunungan_Arfak_di_Manokwari.jpg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Kawasan pegunungan dan hutan di Papua Barat."
    ],
    "activities": [
      "Ekowisata berpemandu",
      "pengamatan alam"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Pegunungan",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "jel-090-pantai-nusi",
    "name": "Pantai Nusi",
    "tagline": "Pantai di kawasan Nabire yang menghadap perairan Teluk Cenderawasih.",
    "category": "pantai",
    "region": "Papua Tengah",
    "location": "Kabupaten Nabire, Papua Tengah",
    "image": "/assets/aistudio/DATARAN_TINGGI_35df184c.jpeg",
    "gallery": [
      "/assets/aistudio/DATARAN_TINGGI_35df184c.jpeg"
    ],
    "priceEstimate": null,
    "priceMaxEstimate": null,
    "priceDetails": "Jangan otomatis isi harga default; cek jenis tarif, pengelola, periode, jenis pengunjung",
    "priceSourceUrl": "",
    "verificationDate": "2026-11-04",
    "priceCategory": "Budget belum tersedia",
    "difficulty": "Sedang",
    "rating": null,
    "reviewsCount": null,
    "travelTime": "Akses rute perlu diverifikasi",
    "accessType": "Motor / Mobil Pribadi",
    "status": "hidden",
    "pros": [
      "Keindahan alam dan lanskap khas",
      "Suasana asri"
    ],
    "cons": [
      "Fasilitas umum dalam tahap pengembangan",
      "Perencanaan perjalanan dianjurkan"
    ],
    "uniqueFacts": [
      "Pantai di kawasan Nabire yang menghadap perairan Teluk Cenderawasih."
    ],
    "activities": [
      "Wisata pantai",
      "fotografi"
    ],
    "ecoTips": [
      "Jaga kebersihan; ikuti aturan pengelola"
    ],
    "highlights": [
      "Pantai",
      "Wisata Nusantara"
    ]
  },
  {
    "id": "pulau-padar",
    "name": "Pulau Padar Labuan Bajo",
    "tagline": "Panorama Bukit Eksotis Berlatar Tiga Teluk Pasir Berwarna Unik",
    "category": "snorkeling",
    "region": "Nusa Tenggara Timur",
    "location": "Taman Nasional Komodo, Manggarai Barat, NTT",
    "image": "/assets/aistudio/PADAR_ISLAND.jpg",
    "gallery": [
      "/assets/aistudio/PADAR_ISLAND.jpg",
      "/assets/aistudio/KOMODO_DRAGON.jpg"
    ],
    "priceEstimate": 350000,
    "priceMaxEstimate": 350000,
    "priceDetails": "Paket open trip / sewa speedboat",
    "priceSourceUrl": "https://www.indonesia.travel",
    "verificationDate": "2026-11-04",
    "priceCategory": "Premium (>500rb)",
    "difficulty": "Sedang",
    "rating": 5,
    "reviewsCount": 389,
    "travelTime": "1 jam naik speedboat dari Labuan Bajo",
    "accessType": "Kendaraan Umum",
    "lat": -8.6534,
    "lng": 119.5794,
    "status": "hidden",
    "pros": [
      "Pemandangan perbukitan savana ikonik dengan tiga teluk pasir (putih, pink, hitam)",
      "Spot fotografi matahari terbit dan terbenam terbaik di Indonesia",
      "Air laut jernih kristal untuk snorkeling di sekitarnya"
    ],
    "cons": [
      "Treking menanjak cukup terik tanpa banyak pohon pelindung",
      "Biaya sewa kapal (speed/open trip) relatif tinggi"
    ],
    "uniqueFacts": [
      "Merupakan pulau terbesar ketiga di dalam kawasan Taman Nasional Komodo.",
      "Bentuk kontur pulau yang berlekuk-lekuk unik terbentuk oleh aktivitas vulkanik purba."
    ],
    "activities": [
      "Trekking pagi menuju puncak bukit Padar",
      "Fotografi lanskap 3 teluk legendaris",
      "Snorkeling melihat manta ray dan terumbu karang"
    ],
    "ecoTips": [
      "Bawa air minum yang cukup karena cuaca sangat panas dan kering.",
      "Gunakan alas kaki yang kesat untuk jalur tanah kering berpasir.",
      "Jangan membuang sampah apapun di kawasan konservasi."
    ],
    "highlights": [
      "3 Teluk Warna",
      "Trekking Bukit Savana",
      "Spot Foto Ikonik"
    ]
  },
  {
    "id": "tanjung-puting",
    "name": "Taman Nasional Tanjung Puting",
    "tagline": "Petualangan Eksklusif Menyusuri Sungai Mahakam di Hutan Konservasi Orangutan",
    "category": "camping",
    "region": "Kalimantan Tengah",
    "location": "Kotawaringin Barat, Kalimantan Tengah",
    "image": "/assets/aistudio/TANJUNG_PUTING.jpg",
    "gallery": [
      "/assets/aistudio/TANJUNG_PUTING.jpg"
    ],
    "priceEstimate": 450000,
    "priceMaxEstimate": 450000,
    "priceDetails": "Sewa perahu klotok & izin masuk kawasan",
    "priceSourceUrl": "https://www.indonesia.travel",
    "verificationDate": "2026-11-04",
    "priceCategory": "Premium (>500rb)",
    "difficulty": "Mudah (Pemula)",
    "rating": 4.9,
    "reviewsCount": 178,
    "travelTime": "2 jam dari Pangkalan Bun ke Sekonyer",
    "accessType": "Kendaraan Umum",
    "lat": -2.7333,
    "lng": 111.85,
    "status": "hidden",
    "pros": [
      "Melihat langsung orangutan liar di habitat aslinya via perahu klotok",
      "Pengalaman unik menginap di atas perahu (live on klotok)",
      "Suasana hutan hujan tropis Kalimantan yang masih sangat murni"
    ],
    "cons": [
      "Akses masuk harus menggunakan perahu sewa khusus (klotok)",
      "Nyamuk dan serangga hutan cukup banyak di malam hari"
    ],
    "uniqueFacts": [
      "Merupakan pusat rehabilitasi orangutan terbesar di dunia yang didirikan oleh Dr. Birutė Galdikas.",
      "Sungai Sekonyer berwarna hitam alami karena kandungan zat gambut hutan rawa."
    ],
    "activities": [
      "Menyusuri Sungai Sekonyer dengan perahu klotok",
      "Melihat feeding station orangutan di Camp Leakey",
      "Menyaksikan kunang-kunang berpendar di pohon nipah malam hari"
    ],
    "ecoTips": [
      "Gunakan losion anti nyamuk yang ramah lingkungan.",
      "Jaga jarak aman minimal 5-10 meter dari orangutan liar.",
      "Dukung program pelestarian satwa melalui izin resmi."
    ],
    "highlights": [
      "Konservasi Orangutan",
      "Live on Klotok",
      "Sungai Gambut Eksotis"
    ],
    "googleRating": 4.9,
    "googleReviewCount": 178,
    "routeAccessType": [
      "Kendaraan darat",
      "Kapal klotok"
    ],
    "routeDescription": "Akses darat dari Pangkalan Bun ke Kumai, dilanjutkan perahu klotok menyusuri Sungai Sekonyer.",
    "ratingVerifiedAt": "2026-11-04"
  },
  {
    "id": "gunung-rinjani",
    "name": "Gunung Rinjani Lombok",
    "tagline": "Gunung Berapi Megah dengan Kaldera Danau Segara Anak yang Sakral",
    "category": "mendaki",
    "region": "Nusa Tenggara Barat",
    "location": "Lombok Timur & Utara, NTB",
    "image": "/assets/aistudio/GUNUNG_RINJANI.jpg",
    "gallery": [
      "/assets/aistudio/GUNUNG_RINJANI.jpg"
    ],
    "priceEstimate": 300000,
    "priceMaxEstimate": 300000,
    "priceDetails": "Tiket pendakian TNGR & pemandu",
    "priceSourceUrl": "https://www.indonesia.travel",
    "verificationDate": "2026-11-04",
    "priceCategory": "Premium (>500rb)",
    "difficulty": "Tantangan Ekstrem",
    "rating": 4.9,
    "reviewsCount": 310,
    "travelTime": "2 jam dari Mataram ke Sembalun",
    "accessType": "Motor / Mobil Pribadi",
    "lat": -8.4113,
    "lng": 116.4572,
    "status": "hidden",
    "pros": [
      "Pemandangan Danau Segara Anak dan Gunung Baru Jari di dalam kawah raksasa",
      "Jalur pendakian savana terindah di Asia Tenggara",
      "Puncak tertinggi ketiga di Indonesia dengan lautan awan menakjubkan"
    ],
    "cons": [
      "Pendakian sangat menantang dan memerlukan fisik prima serta pemandu resmi",
      "Suhu malam hari di pos pendakian sangat dingin"
    ],
    "uniqueFacts": [
      "Danau Segara Anak berada di ketinggian 2.000 mdpl di dalam kaldera purba Rinjani.",
      "Gunung Baru Jari adalah anak gunung berapi aktif yang masih tumbuh di dalam danau."
    ],
    "activities": [
      "Pendakian jalur Sembalun menuju pelawangan",
      "Camping di tepi Danau Segara Anak dan mandi air panas alami",
      "Summit attack menuju puncak Rinjani 3.726 mdpl"
    ],
    "ecoTips": [
      "Bawa turun kembali seluruh sampah pribadi Anda (leave no trace).",
      "Gunakan jasa porter dan pemandu lokal resmi Taman Nasional.",
      "Hormati kesucian gunung bagi masyarakat Sasak dan Hindu Bali."
    ],
    "highlights": [
      "Danau Segara Anak",
      "Puncak 3.726 mdpl",
      "Savana Sembalun"
    ],
    "googleRating": 4.9,
    "googleReviewCount": 310,
    "routeAccessType": [
      "Kendaraan darat",
      "Trekking"
    ],
    "routeDescription": "Akses darat ke Sembalun/Senaru dilanjutkan pendakian resmi Taman Nasional Gunung Rinjani.",
    "ratingVerifiedAt": "2026-11-04"
  },
  {
    "id": "tumpak-sewu",
    "name": "Air Terjun Tumpak Sewu",
    "tagline": "Air Terjun Megah Melingkar Menyerupai Tirai Raksasa di Kaki Semeru",
    "category": "berenang",
    "region": "Jawa Timur",
    "location": "Pronojiwo, Lumajang, Jawa Timur",
    "image": "/assets/aistudio/TUMPAK_SEWU.jpg",
    "gallery": [
      "/assets/aistudio/TUMPAK_SEWU.jpg"
    ],
    "priceEstimate": 10000,
    "priceMaxEstimate": 10000,
    "priceDetails": "Tiket masuk kawasan air terjun",
    "priceSourceUrl": "https://www.indonesia.travel",
    "verificationDate": "2026-11-04",
    "priceCategory": "Hemat (<100rb)",
    "difficulty": "Tantangan Ekstrem",
    "rating": 4.9,
    "reviewsCount": 295,
    "travelTime": "2.5 jam dari Malang",
    "accessType": "Motor / Mobil Pribadi",
    "lat": -8.2325,
    "lng": 112.9169,
    "status": "hidden",
    "pros": [
      "Panorama air terjun tipe curtain (tirai) semi-lingkar terbesar di Indonesia",
      "Pemandangan latar belakang Gunung Semeru yang gagah",
      "Petualangan menuruni tebing curam menyusuri sungai purba"
    ],
    "cons": [
      "Jalur turunan ke dasar air terjun sangat curam dan licin (butuh tenaga ekstra)",
      "Debit air bisa sangat besar saat musim hujan"
    ],
    "uniqueFacts": [
      "Dikenal sebagai \"Niagara Waterfall of Indonesia\" karena bentuk formasi air terjunnya yang melebar melingkar.",
      "Airnya bersumber langsung dari aliran Sungai Glidik di lereng selatan Gunung Semeru."
    ],
    "activities": [
      "Menikmati panorama dari tebing panorama (Panorama View)",
      "Trekking menuruni tangga kayu ekstrem menuju dasar lembah",
      "Fotografi air terjun raksasa"
    ],
    "ecoTips": [
      "Gunakan sepatu gunung dengan cengkeraman kuat saat menuruni tebing.",
      "Selalu ikuti arahan pemandu lokal demi keselamatan.",
      "Jangan membuang sampah di sepanjang aliran sungai."
    ],
    "highlights": [
      "Air Terjun Tirai",
      "Panorama Semeru",
      "Trekking Lembah"
    ]
  }
];
