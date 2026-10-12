/**
 * Every fact about the shop lives here.
 *
 * To change a phone number, timing, address or link on the website, edit this
 * file only - nothing else hardcodes shop details.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://sana-medical.vercel.app";

export const STORE = {
  /** Short name used in the navbar, footer and page titles. */
  name: "Sana Medical",
  nameMr: "सना मेडिकल",
  /** Full trading name as printed on the signboard. */
  legalName: "Sana Medical Swast Aushadi Seva",
  legalNameMr: "सना मेडिकल स्वस्त औषधी सेवा",
  tagline: "Swast Aushadi Seva",
  taglineMr: "स्वस्त औषधी सेवा",
  descriptor: "Generic Medicine Stores",
  descriptorMr: "जेनेरिक औषध दुकान",
  category: "Chemist & Druggist",
  branch: "Chelipura",
  branchCode: "GMMH0906",
  /** The registered generic-medicine brand the shop is affiliated with. */
  network: "GeneriCart",
  /** Shown as a running badge / hero chip. */
  discount: { from: 30, to: 70 },
} as const;

export const OWNER = {
  name: "Mubeen Sardar Patel",
  nameMr: "मुबीन सरदार पटेल",
  qualification: "D.Pharm",
  phone: { display: "97666 63011", e164: "+919766663011", wa: "919766663011" },
} as const;

export const STORE_PHONE = {
  display: "099213 72011",
  e164: "+919921372011",
  wa: "919921372011",
} as const;

/** Medical Council of India generic-medicine grievance helpline. */
export const HELPLINE = {
  display: "1800 111 154",
  e164: "+911800111154",
  wa: "911800111154",
} as const;

export const ADDRESS = {
  line1: "Chelipura, Naralibag",
  line2: "Chhatrapati Sambhajinagar",
  state: "Maharashtra",
  postalCode: "431001",
  country: "IN",
  full: "Chelipura, Naralibag, Chhatrapati Sambhajinagar, Maharashtra 431001",
} as const;

/**
 * Opening hours: 10:00 until midnight, every day of the week.
 * `closes` is 24 so the shop counts as open right up to 11:59 pm.
 */
export const HOURS = {
  opens: 10,
  closes: 24,
  timeZone: "Asia/Kolkata",
  /** Human readable, language neutral - used inside the Marathi/English copy. */
  summary: "10:00 am - 12:00 am",
} as const;

/**
 * Optional: paste the exact coordinates from Google Maps here to strengthen
 * local search results. Leave as null to omit the `geo` block from JSON-LD.
 */
export const GEO: { latitude: number; longitude: number } | null = null;

const MAP_QUERY = encodeURIComponent(
  "Sana Medical Swast Aushadi Seva, Chelipura, Naralibag, Chhatrapati Sambhajinagar, Maharashtra 431001",
);

export const MAPS = {
  /** Keyless embed - works on any host, no API key to leak or expire. */
  embed: `https://www.google.com/maps?q=${MAP_QUERY}&z=16&output=embed`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${MAP_QUERY}`,
  listing: `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`,
} as const;

/** Build a wa.me deep link with a pre-filled message. */
export function whatsappLink(number: string, message: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function telLink(e164: string) {
  return `tel:${e164}`;
}

/** Every number a visitor can tap, in one place. */
export const CONTACTS = [
  {
    id: "store",
    name: STORE.name,
    role: "store",
    phone: STORE_PHONE,
  },
  {
    id: "owner",
    name: OWNER.name,
    role: "owner",
    phone: OWNER.phone,
  },
] as const;
