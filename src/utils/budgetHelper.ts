export function extractBudgetFromText(text: string): number | null {
  if (!text) return null;

  const raw = text.toLowerCase().trim();

  // cari pola angka + satuan
  const match = raw.match(/rp?\s*([\d.,]+)\s*(k|rb|ribu|jt|juta)?|([\d.,]+)\s*(k|rb|ribu|jt|juta)/i);
  if (!match) return null;

  const valuePart = (match[1] || match[3] || "").trim();
  const unitPart = (match[2] || match[4] || "").trim().toLowerCase();

  if (!valuePart) return null;

  let value = valuePart;

  // kalau ada satuan juta, dukung 1,5 atau 1.5
  if (["jt", "juta"].includes(unitPart)) {
    const num = parseFloat(value.replace(/\./g, "").replace(",", "."));
    if (isNaN(num)) return null;
    return Math.round(num * 1_000_000);
  }

  // kalau ada satuan ribu/k/rb
  if (["k", "rb", "ribu"].includes(unitPart)) {
    const num = parseFloat(value.replace(",", "."));
    if (isNaN(num)) return null;
    return Math.round(num * 1_000);
  }

  // tanpa satuan: anggap format rupiah biasa
  // contoh: 200.000 => 200000
  const cleaned = value.replace(/[^\d]/g, "");
  const num = parseInt(cleaned, 10);

  return isNaN(num) ? null : num;
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}
