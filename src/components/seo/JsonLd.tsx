import { en } from "@/lib/i18n/en";
import {
  ADDRESS,
  GEO,
  HOURS,
  MAPS,
  OWNER,
  SITE_URL,
  STORE,
  STORE_PHONE,
  HELPLINE,
} from "@/lib/site";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

/**
 * Structured data so Google and AI assistants can quote the shop's real name,
 * address, both phone numbers and the 10 am - 12 am timing.
 */
function pharmacySchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Pharmacy",
    "@id": `${SITE_URL}/#pharmacy`,
    name: STORE.legalName,
    alternateName: STORE.name,
    description:
      "Generic medicine store in Chelipura, Chhatrapati Sambhajinagar. Generics at 30-70% off, mother and baby care, supplements and surgicals, with free home delivery nearby.",
    url: SITE_URL,
    image: `${SITE_URL}/og-cover.jpg`,
    logo: `${SITE_URL}/icon.png`,
    telephone: [STORE_PHONE.e164, OWNER.phone.e164],
    currenciesAccepted: "INR",
    priceRange: "₹",
    hasMap: MAPS.listing,
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS.line1,
      addressLocality: ADDRESS.line2,
      addressRegion: ADDRESS.state,
      postalCode: ADDRESS.postalCode,
      addressCountry: ADDRESS.country,
    },
    // Fill GEO in src/lib/site.ts to publish exact coordinates.
    ...(GEO
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: GEO.latitude,
            longitude: GEO.longitude,
          },
        }
      : {}),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: DAYS,
        opens: `${String(HOURS.opens).padStart(2, "0")}:00`,
        closes: "23:59",
      },
    ],
    founder: {
      "@type": "Person",
      name: OWNER.name,
      jobTitle: "Proprietor",
      honorificSuffix: OWNER.qualification,
      telephone: OWNER.phone.e164,
    },
    areaServed: [
      { "@type": "City", name: ADDRESS.line2 },
      { "@type": "Place", name: "Chelipura" },
      { "@type": "Place", name: "Naralibag" },
    ],
    availableService: [
      { "@type": "Service", name: "Generic medicine dispensing" },
      { "@type": "Service", name: "Prescription medicine dispensing" },
      { "@type": "Service", name: "Home delivery of medicines" },
      { "@type": "Service", name: "Blood pressure and sugar screening devices" },
    ],
    knowsAbout: "Generic medicines",
    /**
     * The Medical Council of India helpline is a public service worth
     * surfacing to search engines alongside the shop itself.
     */
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: STORE_PHONE.e164,
        availableLanguage: ["en", "hi", "mr"],
      },
      {
        "@type": "ContactPoint",
        contactType: "generic medicine grievance helpline",
        telephone: HELPLINE.e164,
        availableLanguage: ["en", "hi"],
      },
    ],
  };
}

function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: en.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** Escape `<` so no copy pulled from a CMS can break out of the script tag. */
function safeJson(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJson(pharmacySchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJson(faqSchema()) }}
      />
    </>
  );
}
