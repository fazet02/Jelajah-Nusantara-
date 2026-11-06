import { DESTINATIONS } from '../data/destinations';
import { Destination } from '../types';

const STORAGE_KEY = 'jelantara_destination_overrides';
const CUSTOM_STORAGE_KEY = 'jelantara_custom_destinations';

export interface DestinationOverride {
  status?: 'published' | 'hidden';
  locationUrl?: string;
  name?: string;
  tagline?: string;
  category?: any;
  region?: string;
  location?: string;
  image?: string;
  priceEstimate?: number | null;
  priceSourceUrl?: string;
  verificationDate?: string;
  lat?: number;
  lng?: number;
  difficulty?: any;
  accessType?: any;
  highlights?: string[];
  pros?: string[];
  cons?: string[];
  activities?: string[];
  uniqueFacts?: string[];
}

export type OverridesMap = Record<string, DestinationOverride>;

export function getDestinationOverrides(): OverridesMap {
  try {
    const val = localStorage.getItem(STORAGE_KEY);
    return val ? JSON.parse(val) : {};
  } catch {
    return {};
  }
}

export function getCustomDestinations(): Destination[] {
  try {
    const val = localStorage.getItem(CUSTOM_STORAGE_KEY);
    return val ? JSON.parse(val) : [];
  } catch {
    return [];
  }
}

export function saveCustomDestination(newDest: Destination): void {
  const current = getCustomDestinations();
  const updated = [newDest, ...current];
  try {
    localStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('destinations_updated', { detail: { id: newDest.id, region: newDest.region } }));
  } catch (e) {
    console.error(e);
  }
}

export function updateCustomDestination(id: string, updatedFields: Partial<Destination>): void {
  const current = getCustomDestinations();
  const index = current.findIndex(d => d.id === id);
  if (index !== -1) {
    current[index] = { ...current[index], ...updatedFields };
    localStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify(current));
    window.dispatchEvent(new CustomEvent('destinations_updated', { detail: { id } }));
  }
}

export function saveDestinationOverride(id: string, override: DestinationOverride): OverridesMap {
  const current = getDestinationOverrides();
  const updated = {
    ...current,
    [id]: {
      ...(current[id] || {}),
      ...override,
    },
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('destinations_updated', { detail: { id, override } }));
  } catch (e) {
    console.error(e);
  }
  return updated;
}

export function resetDestinationOverrides(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(CUSTOM_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('destinations_updated'));
  } catch (e) {
    console.error(e);
  }
}

export function getEffectiveDestinations(overrides: OverridesMap = getDestinationOverrides()): Destination[] {
  const custom = getCustomDestinations();
  const baseAndCustom = [...custom, ...DESTINATIONS];
  
  // Deduplicate by ID
  const seen = new Set<string>();
  const uniqueList: Destination[] = [];
  for (const d of baseAndCustom) {
    if (!seen.has(d.id)) {
      seen.add(d.id);
      uniqueList.push(d);
    }
  }

  return uniqueList.map(d => {
    const ov = overrides[d.id];
    if (!ov) return d;
    return {
      ...d,
      ...ov,
    };
  });
}

export function getActiveDestinations(overrides: OverridesMap = getDestinationOverrides()): Destination[] {
  return getEffectiveDestinations(overrides).filter(d => d.status === 'published');
}

export function getHiddenDestinations(overrides: OverridesMap = getDestinationOverrides()): Destination[] {
  return getEffectiveDestinations(overrides).filter(d => d.status === 'hidden');
}

export function isDestinationVisible(destId: string, overrides: OverridesMap = getDestinationOverrides()): boolean {
  const dest = getEffectiveDestinations(overrides).find(d => d.id === destId);
  if (!dest) return false;
  return dest.status === 'published';
}
