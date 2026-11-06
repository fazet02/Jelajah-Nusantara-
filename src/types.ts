export type CategoryId = 'all' | 'mendaki' | 'berenang' | 'pantai' | 'camping' | 'snorkeling' | 'keluarga';

export interface Category {
  id: CategoryId;
  name: string;
  iconName: string;
  description: string;
  badgeColor: string;
}

export interface Destination {
  id: string;
  name: string;
  tagline: string;
  category: CategoryId;
  region: string;
  location: string;
  image: string;
  gallery: string[];
  priceEstimate?: number | null; // Min price / ticket price
  priceMaxEstimate?: number | null; // Max price if range
  priceDetails?: string; // Tariff notes from source
  priceSourceUrl?: string;
  verificationDate?: string;
  priceCategory?: 'Hemat (<100rb)' | 'Sedang (100rb-500rb)' | 'Premium (>500rb)' | 'Budget belum tersedia';
  difficulty: 'Mudah (Pemula)' | 'Sedang' | 'Tantangan Ekstrem';
  rating?: number | null;
  reviewsCount?: number | null;
  travelTime?: string;
  accessType: 'Kendaraan Umum' | 'Motor / Mobil Pribadi' | 'Trek Jalan Kaki / Ojek Lokal';
  pros: string[];
  cons: string[];
  uniqueFacts: string[];
  activities: string[];
  ecoTips: string[];
  highlights: string[];
  lat?: number;
  lng?: number;
  status?: 'published' | 'hidden';
  locationUrl?: string; // Link Lokasi Wisata (Google Maps / Tautan Peta Wisata)
  googlePlaceId?: string;
  googleRating?: number;
  googleReviewCount?: number;
  latitude?: number;
  longitude?: number;
  routeAccessType?: string[];
  routeDescription?: string;
  ratingVerifiedAt?: string;
}

export interface BudgetCalculationState {
  destinationId: string;
  days: number;
  travelers: number;
  transportMode: 'motor' | 'mobil' | 'umum';
  accommodationType: 'tenda' | 'homestay' | 'hotel';
  includeGearRental: boolean;
}

export interface SavedBudgetPlan {
  destinationId: string;
  destinationName: string;
  destinationRegion: string;
  destinationImage?: string;
  days: number;
  travelers: number;
  transportMode: 'motor' | 'mobil' | 'umum';
  accommodationType: 'tenda' | 'homestay' | 'hotel';
  includeGear: boolean;
  totalTicket: number;
  totalTransport: number;
  accomTotal: number;
  foodTotal: number;
  totalGear: number;
  grandTotal: number;
  perPersonTotal: number;
  userId?: string;
  savedAt: string;
}
