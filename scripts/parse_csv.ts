import fs from 'fs';
import path from 'path';

const csvPath = path.resolve(process.cwd(), 'public/assets/aistudio/Jelantara_90_Destinasi_7db7af04.csv');
const fileContent = fs.readFileSync(csvPath, 'utf-8');

// Simple CSV parser handling quotes
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
console.log(`Parsed ${records.length} records from CSV.`);
if (records.length > 0) {
  console.log('Sample record:', records[0]);
}
