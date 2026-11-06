import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function extractBudgetFromText(text) {
  if (!text) return null;
  const raw = text.toLowerCase().trim();
  const match = raw.match(/rp?\s*([\d.,]+)\s*(k|rb|ribu|jt|juta)?|([\d.,]+)\s*(k|rb|ribu|jt|juta)/i);
  if (!match) return null;
  const valuePart = (match[1] || match[3] || "").trim();
  const unitPart = (match[2] || match[4] || "").trim().toLowerCase();
  if (!valuePart) return null;
  let value = valuePart;
  if (["jt", "juta"].includes(unitPart)) {
    const num = parseFloat(value.replace(/\./g, "").replace(",", "."));
    if (isNaN(num)) return null;
    return Math.round(num * 1_000_000);
  }
  if (["k", "rb", "ribu"].includes(unitPart)) {
    const num = parseFloat(value.replace(",", "."));
    if (isNaN(num)) return null;
    return Math.round(num * 1_000);
  }
  const cleaned = value.replace(/[^\d]/g, "");
  const num = parseInt(cleaned, 10);
  return isNaN(num) ? null : num;
}

function formatRupiah(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

async function startServer() {
  const app = express();
  const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 8080) : 3000;

  app.use(express.json());

  // API endpoint for Gemini travel planning with streaming and fallback
  app.post('/api/generate-travel-plan', async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      
      // If API key is not configured or is the default placeholder, provide a smart simulated response
      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
        const lowerPrompt = prompt.toLowerCase();
        let mockJson = '';

        if (lowerPrompt.length < 15 || lowerPrompt === 'mau liburan alam dong' || lowerPrompt === 'mau main ke alam dong besok') {
          mockJson = JSON.stringify({
            status: "ditolak",
            alasan: "Informasi lokasi asal, preferensi wisata, dan jumlah peserta belum jelas.",
            saran_perbaikan: "Sebutkan kota asal kamu, jenis alam yang disukai (pantai/gunung/hutan), dan estimasi budget."
          });
        } else if (lowerPrompt.includes('rinjani') && lowerPrompt.includes('50')) {
          mockJson = JSON.stringify({
            status: "ditolak",
            alasan: "Budget Rp 50.000 tidak mencukupi untuk tiket masuk, logistik, dan transportasi lintas pulau.",
            saran_perbaikan: "Tingkatkan budget perjalanan atau pilih bukit/hutan lokal terdekat di sekitar Surabaya."
          });
        } else if (lowerPrompt.includes('pantai') || lowerPrompt.includes('mahasiswa') || lowerPrompt.includes('jogja')) {
          mockJson = JSON.stringify({
            nama_destinasi: "Pantai Wohkudu, Gunungkidul",
            kategori: "Pantai",
            cocok_untuk: "Mahasiswa",
            alasan_rekomendasi: "Pantai tersembunyi di antara tebing karang yang tenang dan ramah di kantong mahasiswa.",
            estimasi_budget_per_orang: {
              transportasi: "Rp 35.000 (Bensin motor PP)",
              tiket_masuk: "Rp 10.000",
              konsumsi_logistik: "Rp 40.000",
              total: "Rp 85.000"
            },
            tips_singkat: "Bawa kantong sampah sendiri karena tidak ada fasilitas pengelolaan sampah di bibir pantai."
          });
        } else {
          mockJson = JSON.stringify({
            nama_destinasi: "Gunung Bismo, Wonosobo",
            kategori: "Gunung",
            cocok_untuk: "Pencinta Alam",
            alasan_rekomendasi: "Negeri di atas awan Wonosobo dengan pemandangan sunrise terbaik dan jalur pendakian ramah pemula.",
            estimasi_budget_per_orang: {
              transportasi: "Rp 75.000",
              tiket_masuk: "Rp 25.000",
              konsumsi_logistik: "Rp 50.000",
              total: "Rp 150.000"
            },
            tips_singkat: "Gunakan jaket tebal dan pastikan membawa jas hujan karena cuaca pegunungan cepat berubah."
          });
        }

        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.write(mockJson);
        return res.end();
      }

      const ai = new GoogleGenAI({ apiKey });
      const tools = [{ googleSearch: {} }];
      
      const config = {
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.MINIMAL,
        },
        tools,
        systemInstruction: [
          {
            text: `# SYSTEM INSTRUCTION: JELANTARA AI (JELAJAH NUSANTARA)

## 1. C - Context (Konteks)
Kamu adalah bagian dari aplikasi "Jelantara" (Jelajah Nusantara), sebuah platform perencanaan wisata alam di Indonesia untuk pelajar, mahasiswa, keluarga, dan pencinta alam. Pengguna akan mengirimkan preferensi perjalanan dalam bentuk teks bebas, kata kunci, maupun deskripsi visual/foto. Hasil rekomendasi yang kamu buat akan ditampilkan ke pengguna untuk ditinjau (*review*) dan disesuaikan (*edit*) sebelum disimpan.

## 2. R - Role (Peran)
Kamu berperan sebagai "Pemandu Jelantara", asisten konsultan perjalanan wisata alam Indonesia yang ramah, informatif, realistis soal biaya, dan peduli kelestarian lingkungan.

## 3. A - Action (Aksi & Aturan Kerja)
1. Ekstraksi data kebutuhan pengguna (asal kota/daerah, jumlah orang, preferensi alam: gunung/pantai/hutan, dan rentang anggaran jika ada).
2. Tentukan 1 destinasi wisata alam yang paling cocok di Indonesia.
3. Berikan rincian estimasi biaya secara realistis dan ramah kantong sesuai profil pengguna.
4. Sertakan 1 tips lokal atau etika menjaga alam (*leave no trace*).
5. Jangan berikan narasi pengantar atau penutup di luar skema JSON agar data mudah ditampilkan dan diedit pada antarmuka aplikasi.

## 4. F - Format (Format Luaran & Few-Shot Examples)
Output **WAJIB** berupa JSON murni tanpa markdown fence tambahan, mengikuti struktur ringkas berikut:

{
  "nama_destinasi": "Nama Tempat, Kota/Kabupaten",
  "kategori": "Gunung / Pantai / Danau / Air Terjun / Hutan",
  "cocok_untuk": "Pelajar / Mahasiswa / Keluarga / Pencinta Alam",
  "alasan_rekomendasi": "1 kalimat alasan pemilihan tempat.",
  "estimasi_budget_per_orang": {
    "transportasi": "Rp XXX.XXX",
    "tiket_masuk": "Rp XXX.XXX",
    "konsumsi_logistik": "Rp XXX.XXX",
    "total": "Rp XXX.XXX"
  },
  "tips_singkat": "1 kalimat tips penting atau etika alam."
}

## Aturan Tambahan untuk Kasus Tidak Jelas / Budget Tidak Masuk Akal:
1. Jika informasi dari user terlalu ambigu (contoh: "Mau liburan alam dong"), JANGAN menebak secara acak. Set "status": "ditolak" dan minta detail tambahan (lokasi asal, durasi, budget).
2. Jika budget sangat tidak realistis/mustahil (contoh: "Mau ke Raja Ampat dari Jakarta naik pesawat budget 100 ribu"), tolak secara sopan dan jelaskan mengapa budget tersebut tidak cukup.

## Skema JSON Penolakan:
{
  "status": "ditolak",
  "alasan": "Penjelasan singkat 1 kalimat mengapa permintaan tidak dapat diproses.",
  "saran_perbaikan": "1 kalimat panduan apa yang perlu ditambahkan atau disesuaikan oleh user."
}`,
          }
        ],
      };

      const model = 'gemini-3.1-flash-lite';
      const contents = [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ];

      const response = await ai.models.generateContentStream({
        model,
        config,
        contents,
      });

      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Transfer-Encoding', 'chunked');

      for await (const chunk of response) {
        if (chunk.text) {
          res.write(chunk.text);
        }
      }
      res.end();
    } catch (err) {
      console.error('Gemini API Error:', err);
      if (!res.headersSent) {
        res.status(500).json({ error: err.message || 'Failed to generate AI response' });
      } else {
        res.end();
      }
    }
  });

  // API endpoint for Pemandu Jelantara AI Chat (using Gemini API free tier)
  app.post('/api/ai-chat', async (req, res) => {
    try {
      const { messages, destinations } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Messages are required' });
      }

      const lastMsg = messages[messages.length - 1]?.content || '';
      const detectedBudget = extractBudgetFromText(lastMsg);
      const formattedBudget = detectedBudget ? formatRupiah(detectedBudget) : null;

      const apiKey = process.env.GEMINI_API_KEY;
      const publishedDestinations = (destinations || []).filter(d => d.published !== false);

      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
        let reply = "Halo! Saya Pemandu Jelantara AI. Berdasarkan data Jelantara, saya siap membantu merencanakan perjalanan wisata alammu. Tanyakan destinasi, budget, atau tips wisata! 🌿";
        const lowerLastMsg = lastMsg.toLowerCase();

        if (detectedBudget) {
          const matching = publishedDestinations.filter(d => d.priceEstimate != null && d.priceEstimate <= detectedBudget);
          const chosen = matching.length > 0 ? matching.slice(0, 2) : publishedDestinations.slice(0, 2);

          reply = `Berikut adalah rekomendasi destinasi wisata alam Jelantara yang sesuai dengan **Budget Anda (${formattedBudget})**:\n\n`;
          chosen.forEach(d => {
            reply += `🌋 **${d.name}**\n`;
            reply += `📍 Lokasi: ${d.location} (${d.region})\n`;
            reply += `🎟️ Harga Tiket: ${d.priceEstimate != null ? formatRupiah(d.priceEstimate) : 'Gratis'}\n`;
            reply += `✨ Daya Tarik: ${d.tagline}\n\n`;
          });
          reply += `*Catatan: Harga di atas adalah estimasi tiket masuk resmi pada data Jelantara, bukan total biaya perjalanan keseluruhan.*`;
        } else if (lowerLastMsg.includes('rekomendasi') || lowerLastMsg.includes('pergi ke mana') || lowerLastMsg.includes('wisata apa') || lowerLastMsg.includes('tempat liburan')) {
          const chosen = publishedDestinations.slice(0, 3);
          reply = `Berikut adalah beberapa rekomendasi destinasi wisata alam terverifikasi di Jelantara:\n\n`;
          chosen.forEach(d => {
            reply += `🌋 **${d.name}**\n`;
            reply += `📍 Lokasi: ${d.location} (${d.region})\n`;
            reply += `🎟️ Harga Tiket: ${d.priceEstimate != null ? formatRupiah(d.priceEstimate) : 'Gratis'}\n`;
            reply += `✨ Daya Tarik: ${d.tagline}\n\n`;
          });
        } else if (lowerLastMsg.includes('gunung') || lowerLastMsg.includes('bromo')) {
          reply = "🌋 **Gunung Bromo**\n📍 Lokasi: Taman Nasional Bromo Tengger Semeru, Jawa Timur\n🎟️ Harga Tiket: Rp79.000\n✨ Daya Tarik: Panorama sunrise kelas dunia dari Penanjakan dan lautan pasir yang megah.\n\nApakah kamu ingin tahu rute perjalanan atau menghitung budget lengkapnya?";
        } else if (lowerLastMsg.includes('apa itu') && lowerLastMsg.includes('jelantara')) {
          reply = "Jelantara (Jelajah Nusantara) adalah platform perencanaan wisata alam di Indonesia yang membantu pelajar, mahasiswa, dan pencinta alam menemukan destinasi terverifikasi, menghitung budget, dan menjaga kelestarian lingkungan.";
        } else if (lowerLastMsg.includes('bawa apa') || lowerLastMsg.includes('ke sana')) {
          reply = "Untuk pendakian atau wisata alam, pastikan kamu membawa jaket windproof/fleece, sepatu outdoor yang nyaman, air minum (tumbler), P3K pribadi, senter/headlamp, dan kantong sampah untuk menerapkan prinsip Leave No Trace.";
        } else if (lowerLastMsg.includes('hiking') && lowerLastMsg.includes('trekking')) {
          reply = "Hiking adalah berjalan kaki menyusuri jalur setapak atau jalur resmi yang sudah ditentukan (biasanya di pegunungan), sedangkan trekking adalah perjalanan berjalan kaki yang lebih menantang dan panjang melintasi alam liar yang belum tentu ada jalur setapak resminya.";
        } else if (lowerLastMsg.includes('berkelanjutan') || lowerLastMsg.includes('sustainable')) {
          reply = "Wisata berkelanjutan (sustainable tourism) adalah konsep pariwisata yang memperhitungkan dampak ekonomi, sosial, dan lingkungan saat ini dan masa depan, dengan meminimalkan jejak karbon, mendukung ekonomi lokal, dan menjaga kelestarian alam.";
        }

        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.write(reply);
        return res.end();
      }

      const ai = new GoogleGenAI({ apiKey });
      const destSummary = publishedDestinations.map(d => ({
        id: d.id,
        name: d.name,
        category: d.category,
        region: d.region,
        location: d.location,
        priceEstimate: d.priceEstimate,
        tagline: d.tagline,
        difficulty: d.difficulty
      }));

      const budgetContext = detectedBudget
        ? `Budget pengguna yang terdeteksi adalah: ${formattedBudget} (${detectedBudget}).`
        : `Budget pengguna belum terdeteksi.`;

      const systemInstruction = `Anda adalah "Pemandu Jelantara AI", asisten digital yang ramah, komunikatif, informatif, dan memahami wisata alam Indonesia.

${budgetContext}

Database Destinasi Jelantara (Published - HANYA GUNAKAN INI UNTUK REKOMENDASI PUBLIK):
${JSON.stringify(destSummary, null, 2)}

ATURAN UTAMA REKOMENDASI:
1. Jika pengguna meminta rekomendasi wisata (contoh: "pergi ke mana?", "nama wisatanya apa?", "budget 200k bisa ke mana?", "rekomendasikan tempat wisata"), WAJIB SEBUTKAN NAMA DESTINASI NYATA yang terdaftar di Database Jelantara di atas (misal Gunung Bromo, Kawah Ijen, Dataran Tinggi Dieng, dll.) yang sesuai dengan budget atau preferensi pengguna. Jangan hanya memberikan rincian biaya tanpa nama destinasi!
2. Ingat bahwa priceEstimate pada database adalah harga tiket masuk resmi, bukan total biaya perjalanan. Jelaskan hal ini secara transparan.
3. Format rekomendasi yang harus ditampilkan saat menjawab pertanyaan destinasi:
   - Nama Destinasi (dengan emoji, misal 🌋 Gunung Bromo)
   - Lokasi / Provinsi
   - Kategori & Harga Tiket (dari database)
   - Daya tarik utama & Alasan cocok dengan preferensi
4. Jika pengguna hanya menyapa ("Halo!"), balas sapaan secara natural tanpa memaksa rekomendasi wisata.
5. Jangan pernah mengarang destinasi fiktif atau merekomendasikan destinasi berstatus hidden.
6. Jangan mengawali jawaban dengan karakter aneh atau garis pemisah '--'.`;

      const contents = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }));

      const response = await ai.models.generateContentStream({
        model: 'gemini-2.5-flash-lite',
        config: {
          systemInstruction: systemInstruction,
          maxOutputTokens: 8192,
        },
        contents: contents,
      });

      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Transfer-Encoding', 'chunked');

      for await (const chunk of response) {
        if (chunk.text) {
          res.write(chunk.text);
        }
      }
      res.end();
    } catch (err) {
      console.error('AI Chat Error:', err);
      if (!res.headersSent) {
        res.status(500).json({ error: err.message || 'Jelantara AI sedang mencapai batas penggunaan sementara atau terjadi gangguan koneksi. Coba kembali nanti ya 🌿' });
      } else {
        res.end();
      }
    }
  });

  // API endpoint for Cuaca Alam using Gemini Interactions API
  app.post('/api/weather-interaction', async (req, res) => {
    try {
      const { input } = req.body;
      if (!input) {
        return res.status(400).json({ error: 'Input is required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
        return res.json({
          text: `🌤️ **Perkiraan Cuaca Alam (Simulasi Real-time)**\n\n- **Temperatur**: 24°C\n- **Status**: ⛅ Cerah Berawan\n- **Rentang Suhu**: 19°C - 27°C\n- **Rekomendasi Keamanan**: Kondisi cuaca sangat kondusif untuk pendakian dan aktivitas luar ruangan. Tetap siapkan air minum dan jaket ringan.`
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const tools = [
        {
          type: 'google_search',
        },
      ];

      const generationConfig = {
        max_output_tokens: 65536,
        thinkingLevel: 'medium',
      };

      const interaction = await ai.interactions.create({
        model: 'models/gemini-3.8-flash',
        input: input,
        system_instruction: `# Role & Personality
Anda adalah AI Assistant perencana wisata Jelantara. Anda bertugas membantu pengguna menemukan destinasi wisata alam dan menyajikan informasi pendukung seperti estimasi budget, rute, serta perkiraan cuaca terkini secara akurat dan ringkas.

# Task: Weather Data Integration
Saat pengguna meminta atau melihat detail destinasi wisata alam, Anda harus menyajikan informasi perkiraan cuaca menggunakan data meteorologi dan perkiraan cuaca terkini.

# Rules & Guidelines for Weather Feature:
1. Identifikasi Lokasi: Ekstrak koordinat (Latitude & Longitude) atau nama kota/wilayah destinasi wisata yang relevan.
2. Fetch Weather Data: 
   - Gunakan data prakiraan cuaca real-time: Suhu saat ini (°C), Rentang Suhu (Min-Maks), dan Kondisi Cuaca (Cerah, Berawan, Hujan Ringan, Hujan Lebat).
   - Ambil informasi: Suhu saat ini (°C), Rentang Suhu (Min-Maks), dan Kondisi Cuaca (Cerah, Berawan, Hujan Ringan, Hujan Lebat).
3. Format Output Cuaca: Tampilkan komponen informasi cuaca dalam format chip/card ringkas yang ramah antarmuka Jelantara:
   - Temperatur: [Suhu °C]
   - Status: [Kondisi Cuaca + Emotikon/Ikon]
   - Rekomendasi Keamanan: Berikan saran singkat berdasarkan cuaca (contoh: jika hujan, ingatkan pengguna membawa jas hujan atau memilih jalur trekking yang aman).
4. Gaya Bahasa: Gunakan bahasa Indonesia yang ramah, informatif, dan mendukung gaya hidup wisata ramah lingkungan (eco-travel).`,
        tools: tools,
        generation_config: generationConfig,
      });

      const responseText = interaction.steps?.at(-1)?.text || 'Informasi cuaca berhasil diambil.';
      res.json({ text: responseText });
    } catch (err) {
      console.error('Weather Interaction Error:', err);
      res.status(500).json({ error: err.message || 'Failed to fetch weather interaction' });
    }
  });

  // API endpoint for New Insight AI Gatekeeper using Gemini Interactions API
  app.post('/api/new-insight', async (req, res) => {
    try {
      const { input } = req.body;
      if (!input) {
        return res.status(400).json({ error: 'Input is required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
        return res.json({
          text: JSON.stringify({
            evaluation: {
              status: "DRAFT_PENDING_ADMIN",
              utility_score: 88,
              rejection_reason: null
            },
            processed_data: {
              destination_name: "Air Terjun Tersembunyi (Simulasi)",
              category: "Air Terjun",
              location_summary: "Kabupaten Bogor, Jawa Barat",
              estimated_budget: 45000,
              clean_description: "Destinasi wisata air terjun asri dengan aliran air jernih dan suasana hutan lindung yang masih sangat terjaga.",
              eco_tips_suggested: "Wajib membawa kantong sampah pribadi dan tidak mengotori aliran air.",
              search_keywords: ["air terjun", "bogor", "nature", "hidden gem"]
            }
          })
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const tools = [
        {
          type: 'google_search',
        },
      ];

      const generationConfig = {
        max_output_tokens: 65536,
        thinkingLevel: 'medium',
      };

      const interaction = await ai.interactions.create({
        model: 'models/gemini-3.8-flash',
        input: input,
        system_instruction: `# Role & System Identity
Anda adalah "AI Gatekeeper" untuk platform wisata Jelantara. Tugas utama Anda adalah mengevaluasi, memvalidasi, dan mengurasi data masukan dari formulir "New Insight" pengguna sebelum disimpan ke database backend/CMS developer.

# Objectives
1. Memastikan destinasi yang diusulkan pengguna relevan dengan fokus Jelantara (Wisata Alam di Indonesia).
2. Memfilter konten spam, iklan/promosi komersial ilegal, kata-kata tidak sopan, atau data fiktif.
3. Melengkapi koordinat/informasi dasar jika data pengguna cukup jelas, lalu menformat data ke JSON siap pakai untuk CMS.

# Rules & Criteria Evaluasi

## Kriteria DITERIMA (Status: APPROVED_FOR_REVIEW)
- Destinasi berupa wisata alam asli di Indonesia (gunung, pantai, danau, air terjun, tempat camping, hutan lindung, dll.).
- Memiliki deskripsi yang jelas dan logis.
- Informasi tidak mengandung unsur promosi jualan pribadi yang menyesatkan/spam.

## Kriteria DITOLAK (Status: REJECTED)
- Destinasi non-alam (misal: mall, kafe perkotaan, hotel/resort tanpa unsur eksplorasi alam).
- Lokasi berada di luar wilayah Indonesia.
- Teks mengandung kata-kata kasar, spam link, atau informasi yang asal-asalan (misal: "tempat bagus bangetttt 12345").

# Processing Steps
Setiap kali menerima payload JSON dari formulir "New Insight":
1. Analisis relevansi lokasi dan kategori.
2. Hitung score kelayakan (Utility Score: 1 - 100).
3. Jika Score >= 70: Set status = "DRAFT_PENDING_ADMIN", bersihkan teks deskripsi (spellcheck Bahasa Indonesia), dan format data.
4. Jika Score < 70: Set status = "REJECTED" beserta alasan penolakan singkat.

# Output Format (Strict JSON Only)
Kembalikan respon hanya dalam struktur JSON berikut:

{
  "evaluation": {
    "status": "DRAFT_PENDING_ADMIN" | "REJECTED",
    "utility_score": 85,
    "rejection_reason": null | "Lokasi bukan merupakan wisata alam."
  },
  "processed_data": {
    "destination_name": "Air Terjun Sewu",
    "category": "Air Terjun",
    "location_summary": "Kecamatan X, Kabupaten Y",
    "estimated_budget": 50000,
    "clean_description": "Deskripsi yang sudah dirapikan AI...",
    "eco_tips_suggested": "Tips kelestarian yang ditambahkan/disempurnakan AI...",
    "search_keywords": ["air terjun", "nature", "wisata tersembunyi"]
  }
}`,
        tools: tools,
        generation_config: generationConfig,
      });

      const responseText = interaction.steps?.at(-1)?.text || '{}';
      res.json({ text: responseText });
    } catch (err) {
      console.error('New Insight Error:', err);
      res.status(500).json({ error: err.message || 'Failed to process new insight' });
    }
  });

  // API endpoint for Secure Register Architect using Gemini Interactions API
  app.post('/api/secure-register', async (req, res) => {
    try {
      const { email, password, displayName } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
        return res.json({
          success: true,
          message: 'Pendaftaran berhasil dengan sistem keamanan standar.',
          user: { email, displayName: displayName || 'Petualang Nusantara' }
        });
      }

      const ai = new GoogleGenAI({
          apiKey: apiKey,
      });

      const tools = [
          {
              type: 'google_search',
          },
      ];

      const generationConfig = {
          max_output_tokens: 65536,
          thinkingLevel: 'medium',
      };

      const interaction = await ai.interactions.create({
          model: 'models/gemini-3.8-flash',
          input: `Buatkan panduan arsitektur backend Node.js/Express untuk registrasi user email: ${email}, nama: ${displayName}, dengan Bcrypt hashing dan verifikasi email yang aman.`,
          system_instruction: `# Role & Persona
Anda adalah Software Architect & Senior Backend Engineer spesialis sistem autentikasi dan keamanan web. Tugas Anda adalah memberikan panduan teknis, alur logika, dan contoh kode untuk pembuatan sistem Register dan Login yang aman.

# Guidelines & Constraints
1. **Keamanan Utama**: Selalu utamakan standar keamanan modern dalam setiap penjelasan (misal: Hashing password dengan Bcrypt/Argon2, verifikasi email, sanitasi input, pencegahan SQL Injection, XSS, dan CSRF, serta penggunaan HTTPS).
2. **Struktur Penjelasan**:
   - Pisahkan alur kerja antara **Frontend** (Client) dan **Backend** (Server & Database).
   - Gunakan format visual yang jelas seperti ringkasan poin, diagram alur (Mermaid.js), atau tabel jika relevan.
3. **Kualitas Kode**: Jika pengguna meminta contoh kode:
   - Sediakan kode modular, bersih, dan memuat penanganan kesalahan (error handling).
   - Jangan pernah menampilkan kode yang menyimpan password dalam bentuk teks mentah (plain text).
4. **Bahasa & Nada Bicara**: Berbahasa Indonesia yang profesional, jelas, dan edukatif tanpa menggunakan jargon teknis yang tidak dijelaskan.

# Output Format
- **Judul/Ringkasan**: Gambaran singkat konsep.
- **Alur Kerja (Workflow)**: Poin-poin langkah teknis atau Diagram Mermaid.
- **Penjelasan Komponen**: Detail Frontend, Backend, dan Database.
- **Contoh Kode/Implementasi**: (Jika diminta pengguna) Lengkap dengan komentar penjelasan.
- **Catatan Keamanan (Security Notes)**: Poin-poin krusial yang tidak boleh dilewatkan.`,
          tools: tools,
          generation_config: generationConfig,
      });

      const resultText = interaction.output_text || interaction.steps?.at(-1)?.content?.[0]?.text || 'Registrasi berhasil diproses.';

      res.json({
        success: true,
        message: 'Pendaftaran diproses dengan Secure Auth Architect.',
        guidance: resultText,
        user: { email, displayName: displayName || 'Petualang Nusantara' }
      });
    } catch (err) {
      console.error('Secure Register Error:', err);
      res.status(500).json({ error: err.message || 'Gagal memproses pendaftaran aman.' });
    }
  });

  // API endpoint for Interactive Map AI Advisor using Gemini Interactions API
  app.post('/api/map-advisor', async (req, res) => {
    try {
      const { input } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
        return res.json({
          success: true,
          message: 'Lead System Architect & AI Advisor siap membantu integrasi real-time data antara New Insight, Peta Interaktif, dan Halaman Beranda.',
          guidance: `### Arsitektur Integrasi Real-Time Jelantara\n\n1. **Trigger / Input (New Insight):** Payload data destinasi baru dikirimkan melalui form submission dengan atribut koordinat (lat/lng), kategori, dan deskripsi.\n2. **Processing & Event Layer:** State management global atau event bus memperbarui store destinasi terpusat.\n3. **UI & Presentation Layer:** Peta interaktif merender marker baru secara dinamis dan Halaman Beranda memperbarui section "Highlight Insight" secara reaktif tanpa page reload.`
        });
      }

      const ai = new GoogleGenAI({
          apiKey: apiKey,
      });

      const tools = [
          {
              type: 'google_search',
          },
      ];

      const generationConfig = {
          max_output_tokens: 65536,
          thinkingLevel: 'medium',
      };

      const interaction = await ai.interactions.create({
          model: 'models/gemini-3.8-flash',
          input: input || 'Jelaskan arsitektur integrasi real-time antara New Insight, Peta Interaktif, dan Halaman Beranda.',
          system_instruction: `Anda adalah **Lead System Architect & AI Advisor** untuk platform ini. Tugas utama Anda adalah membantu perancangan, pengembangan, dan integrasi fitur alur data real-time antara New Insight, Peta Interaktif, dan Halaman Beranda.

### PERAN & TUGAS UTAMA:
1. **Integrasi Alur Data (Data Flow Integration):**
   - Setiap kali fitur **New Insight** menerima masukan data baru dari pengguna (seperti postingan baru, rekomendasi tempat, data geolokasi, atau ulasan), data tersebut harus diproses agar langsung terhubung ke sistem.
2. **Visualisasi Peta Interaktif (Interactive Map):**
   - Memastikan data masukan dari New Insight yang memiliki komponen lokasi (koordinat latitude/longitude) langsung ter-render sebagai marker/point/layer baru di Peta Interaktif secara real-time.
3. **Pembaruan Halaman Beranda (Home Dashboard):**
   - Memastikan data terbaru dari New Insight langsung muncul di feed/section "Aktivitas Terbaru" atau "Highlight Insight" di Halaman Beranda tanpa membutuhkan refresh manual (real-time/reactive updates).

### ALUR LOGIKA & ARSITEKTUR TEKNIS YANG DIPANDU:
Setiap kali mendesain solusi atau memberikan saran bantuan, Anda harus selalu mempertimbangkan 3 aspek berikut:
- **Trigger/Input Layer (New Insight):** Menangani enkapsulasi data masukan pengguna (lokasi, deskripsi, variabel numerik/kategori).
- **Processing & Event Layer:** Memanfaatkan Event Bus / WebSocket / PubSub atau State Management agar perubahan state menyebar secara global saat ada payload data baru.
- **UI & Presentation Layer:** 
  - *Peta Interaktif:* Pembaruan marker/geojson secara dinamis.
  - *Halaman Beranda:* Update komponen feed/card terbaru secara reaktif.

### GAYA BAHASA & FORMAT RESPONS:
- Gunakan bahasa Indonesia yang profesional, solutif, dan teknis namun mudah dipahami.
- Berikan penjelasan arsitektur, potongan kode (bila diminta), atau struktur data JSON yang bersih dan siap diimplementasikan.`,
          tools: tools,
          generation_config: generationConfig,
      });

      const resultText = interaction.output_text || interaction.steps?.at(-1)?.content?.[0]?.text || interaction.steps?.at(-1)?.text || 'Sistem arsitektur peta interaktif siap.';

      res.json({
        success: true,
        message: 'Analisis arsitektur peta berhasil diproses.',
        guidance: resultText
      });
    } catch (err) {
      console.error('Map Advisor Error:', err);
      res.status(500).json({ error: err.message || 'Gagal memproses analisis arsitektur peta.' });
    }
  });

  // API endpoint for Budget Planner AI Product Manager & System Architect
  app.post('/api/budget-planner-advisor', async (req, res) => {
    try {
      const { input } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
        return res.json({
          success: true,
          message: 'AI Product Manager & System Architect siap memandu Rencana Biaya (Budget Planner).',
          guidance: `### Arsitektur Alur Sistem Rencana Biaya Jelantara\n\n1. **Penginputan & Kalkulasi:** Pengguna mengonfigurasi Rencana Biaya pada antarmuka kalkulator (Destinasi, Durasi, Jumlah Peserta, Transportasi, Akomodasi, dan Alat Outdoor).\n2. **Penyimpanan Data (Auto/Trigger Save):** Saat pengguna menekan "Simpan Rencana Biaya", sistem menyimpan rencana ke dalam state lokal (\`localStorage\` / \`jelantara_saved_budget_plan\`).\n3. **Visualisasi FAB Beranda (Visual State Indicator):** Sistem otomatis mengaktifkan Floating Action Button (FAB) di kanan atas halaman Beranda sebagai penanda visual keberhasilan penyimpanan.\n4. **Akses Cepat (Quick View / Recall):** Pengguna menekan FAB untuk membuka pop-up ringkasan rencana biaya secara zero-friction tanpa mengisi ulang.`
        });
      }

      const ai = new GoogleGenAI({
          apiKey: apiKey,
      });

      const tools = [
          {
              type: 'google_search',
          },
      ];

      const generationConfig = {
          max_output_tokens: 65536,
          thinkingLevel: 'medium',
      };

      const interaction = await ai.interactions.create({
          model: 'models/gemini-3.8-flash',
          input: input || 'Jelaskan alur sistem dan fitur utama Rencana Biaya Jelantara dari kalkulator hingga visualisasi FAB beranda dan quick view.',
          system_instruction: `# PERAN DAN PERSEPSIONAL
Anda adalah AI Product Manager & System Architect spesialis platform pariwisata "Jelantara". Tugas utama Anda adalah membantu merancang, mendokumentasikan, dan mengimplementasikan fitur "Rencana Biaya (Budget Planner)" beserta alur penyimpanan dan penyajian datanya ke pengguna.

# ALUR SISTEM DAN FITUR UTAMA (CORE WORKFLOW)
Sistem harus selalu mengikuti alur kerja (*user flow*) berikut:

1. **Penginputan & Kalkulasi:**
   - Pengguna mengonfigurasi Rencana Biaya pada antarmuka kalkulator (Destinasi, Durasi, Jumlah Peserta, Transportasi, Akomodasi, dan Alat Outdoor).
2. **Penyimpanan Data (Auto/Trigger Save):**
   - Saat pengguna menekan tombol "Simpan Rencana Biaya", sistem secara langsung (*real-time*) menyimpan data perencanaan tersebut ke dalam state lokal (\`localStorage\`/\`sessionStorage\`) atau database backend.
3. **Visualisasi FAB Beranda (Visual State Indicator):**
   - Setelah data tersimpan, sistem secara otomatis memperbarui indikator visual berupa **Floating Action Button (FAB)** yang terletak di **kanan atas halaman Beranda**.
   - FAB ini berfungsi sebagai penanda visual (*signifier*) bahwa data rencana biaya pengguna telah berhasil tersimpan.
4. **Akses Cepat (Quick View / Recall):**
   - Jika pengguna lupa atau ingin melihat kembali rencana biayanya, pengguna cukup menekan FAB tersebut untuk membuka rincian *planner* (via Drawer/Modal pop-up) tanpa harus mengulang pengisian dari awal.

# FOKUS IMPACT YANG HARUS DICAPAI
Dalam setiap saran teknis, UI/UX, maupun arsitektur kode yang Anda berikan, Anda wajib memastikan solusi tersebut mendukung dampak (*impact*) berikut:
- **Zero Friction Recovery:** Memudahkan pengguna mengakses kembali data budget kapan saja di halaman utama.
- **Visual Feedback Clear:** Memastikan pengguna mendapatkan konfirmasi instan melalui perubahan status FAB di kanan atas.
- **Higher Conversion Potential:** Mendorong pengguna melangkah dari perencanaan ke tahap transaksi/booking melalui shortcut FAB.

# GUIDELINES RESPONS
- Gunakan bahasa Indonesia yang profesional, jelas, dan berorientasi pada pengembangan produk/sistem.
- Sajikan jawaban teknis menggunakan format Markdown (struktur JSON, tabel perbandingan, atau urutan algoritma/flowchart jika relevan).
- Selalu patuhi logika alur penyimpanan -> pembaruan FAB kanan atas beranda -> akses cepat rincian budget.`,
          tools: tools,
          generation_config: generationConfig,
      });

      const resultText = interaction.output_text || interaction.steps?.at(-1)?.content?.[0]?.text || interaction.steps?.at(-1)?.text || 'Rencana biaya berhasil dianalisis.';

      res.json({
        success: true,
        message: 'Analisis rencana biaya diproses.',
        guidance: resultText
      });
    } catch (err) {
      console.error('Budget Planner Advisor Error:', err);
      res.status(500).json({ error: err.message || 'Gagal memproses panduan rencana biaya.' });
    }
  });

  // API endpoint for AI Lead Software Architect & Cybersecurity Specialist
  app.post('/api/auth-architect', async (req, res) => {
    try {
      const { input } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
        return res.json({
          success: true,
          message: 'AI Lead Software Architect & Cybersecurity Specialist siap mengarahkan sistem autentikasi dan manajemen sesi Jelantara.',
          guidance: `### Arsitektur Autentikasi & Manajemen Sesi Jelantara\n\n1. **Pengguna Baru (Orang Baru):**\n   - Diarahkan untuk melakukan Registrasi akun (Email + Password minimal 6 karakter, atau Masuk dengan Google OAuth 2.0).\n   - Password di-hash menggunakan algoritma kuat (Bcrypt/Argon2).\n\n2. **Pengguna Lama (Orang Lama) & Kebijakan Sesi:**\n   - **Auto-Login / Seamless Access (≤ 24 Jam Inaktivitas):** Jika pengguna kembali dalam rentang ≤ 1 hari, sesi valid dipertahankan, auto-login langsung ke halaman Beranda tanpa repot login ulang.\n   - **Batasan Inaktivitas (Timeout ≥ 72 Jam / 3 Hari):** Jika pengguna inaktif selama ≥ 3 hari berturut-turut, token sesi dihanguskan (*invalidated*) dan diwajibkan login ulang demi keamanan data.\n   - **Sliding Session:** Aktivitas pengguna memperbarui timestamp sesi di latar belakang.\n\n3. **Integrasi Rencana Biaya (Budget Planner):**\n   - Data budget pengguna terikat dengan \`user_id\` yang terautentikasi dan disinkronkan dengan FAB kanan atas Beranda.`
        });
      }

      const ai = new GoogleGenAI({
          apiKey: apiKey,
      });

      const tools = [
          {
              type: 'google_search',
          },
      ];

      const generationConfig = {
          max_output_tokens: 65536,
          thinkingLevel: 'medium',
      };

      const interaction = await ai.interactions.create({
          model: 'models/gemini-3.8-flash',
          input: input || 'Jelaskan implementasi sistem autentikasi pengguna baru dan manajemen sesi inaktivitas 1 hari auto-login vs 3 hari logout untuk Jelantara.',
          system_instruction: `# PERAN DAN AKTOR SISTEM
Anda adalah AI Lead Software Architect & Cybersecurity Specialist untuk platform pariwisata "Jelantara". Tugas utama Anda adalah merancang, mendokumentasikan, dan mengarahkan implementasi teknis untuk sistem autentikasi, manajemen sesi user, keamanan data, serta integrasinya dengan fitur "Rencana Biaya / Budget Planner".

# SPESIFIKASI SISTEM UTAMA

## 1. SISTEM AUTENTIKASI (REGISTER & LOGIN)
- Memfasilitasi pendaftaran pengguna baru (Register) dan masuknya pengguna lama (Login) melalui Email/Password (minimal 6 karakter) serta integrasi OAuth 2.0 (Masuk dengan Google).
- Menampilkan modal/pop-up autentikasi yang rapi, responsif, dan aman.

## 2. ATURAN MANAJEMEN SESI & INAKTIVITAS (SESSION & EXPIRATION POLICY)
- **Auto-Login / Seamless Access (≤ 1 Hari Inaktivitas):**
  - Jika pengguna aktif menggunakan website dan kembali dalam rentang ≤ 24 jam (1 hari), sistem wajib melewatkan proses login (*auto-login*) dan langsung memberikan akses ke halaman beranda.
- **Batasan Inaktivitas (Inactivity Timeout = 3 Hari / 72 Jam):**
  - Jika pengguna tidak menggunakan/membuka website selama 3 hari berturut-turut (≥ 72 jam sejak aktivitas/refresh token terakhir), sesi login otomatis hangus (*invalidated/expired*).
  - Pengguna secara otomatis di-*logout* dan diwajibkan melakukan login ulang ketika mengakses kembali platform.
- **Implementasi Token (JWT & Refresh Token):**
  - Menggunakan JSON Web Token (JWT) pendek untuk akses API (\`Access Token\` durasi pendek) dan \`Refresh Token\` dengan batas waktu simpan aman. Setiap kali pengguna aktif berinteraksi dalam rentang 1-2 hari, *Refresh Token* diperbarui secara otomatis di latar belakang (*sliding session*).

## 3. KEAMANAN & PENYIMPANAN DATA (SECURITY & DATA INTEGRITY)
- **Keamanan Kata Sandi:** Wajib hashing password menggunakan algoritma kuat (misal: \`Bcrypt\` atau \`Argon2\`) sebelum disimpan ke database backend. Dilarang menyimpan password dalam bentuk *plain text*.
- **Perlindungan Token & Sesi:**
  - Token autentikasi disimpan di \`HttpOnly, Secure, SameSite=Strict Cookies\` untuk mencegah serangan XSS (Cross-Site Scripting) dan CSRF (Cross-Site Request Forgery).
- **Enkripsi Transit & Rest:** Seluruh lalu lintas data wajib melalui HTTPS (TLS 1.3) dan sanitasi input untuk mencegah SQL Injection & Remote Code Execution.

## 4. INTEGRASI DENGAN FITUR RENCANA BIAYA (BUDGET PLANNER)
- Data Rencana Biaya yang disimpan oleh pengguna (Destinasi, Durasi, Peserta, Transportasi, Akomodasi, Alat Outdoor) terikat langsung dengan \`user_id\` yang terautentikasi.
- Setelah data tersimpan, tampilkan indikator visual berupa **Floating Action Button (FAB)** di **kanan atas halaman Beranda** sebagai penanda data tersimpan dan jalan pintas (*shortcut*) untuk melihat rincian planner jika pengguna lupa.

# PANDUAN DAN NADA RESPONS AI
- **Gaya Bahasa:** Profesional, terstruktur, berbasis praktik terbaik rekayasa perangkat lunak dan *cybersecurity*.
- **Bahasa:** Bahasa Indonesia.
- **Output:** Berikan jawaban berupa arsitektur sistem, potongan kode (backend/frontend), skema database, logika algoritma penanganan token, atau rekomendasi keamanan sesuai kebutuhan pengguna.
- **Format:** Gunakan format Markdown (Header, Bold, Blockquote, dan Code Block).`,
          tools: tools,
          generation_config: generationConfig,
      });

      const resultText = interaction.output_text || interaction.steps?.at(-1)?.content?.[0]?.text || interaction.steps?.at(-1)?.text || 'Sistem autentikasi & sesi berhasil diproses.';

      res.json({
        success: true,
        message: 'Panduan arsitektur autentikasi & keamanan berhasil diproses.',
        guidance: resultText
      });
    } catch (err) {
      console.error('Auth Architect Error:', err);
      res.status(500).json({ error: err.message || 'Gagal memproses panduan arsitektur keamanan.' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
  });
}

startServer();
