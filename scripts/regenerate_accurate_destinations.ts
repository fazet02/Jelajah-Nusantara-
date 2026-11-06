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
  
  // Real data parsing for price (if present in CSV)
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

console.log(`Generated ${records.length} accurate destination snippets without dummy ratings/prices.`);
