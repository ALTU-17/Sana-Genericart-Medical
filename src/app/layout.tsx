import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Devanagari, Outfit } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/seo/JsonLd";
import { LanguageProvider } from "@/lib/i18n";
import { ADDRESS, OWNER, SITE_URL, STORE, STORE_PHONE } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

// Marathi copy falls through to this font, so Devanagari never renders in a
// spindly system fallback.
const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari", "latin"],
  variable: "--font-devanagari",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${STORE.name} | Generic Medicine Store in Chhatrapati Sambhajinagar`,
    template: `%s | ${STORE.name}`,
  },
  description:
    "Sana Medical, Swast Aushadi Seva - a generic medicine store at Chelipura, Naralibag, Chhatrapati Sambhajinagar. Generic medicines at 30-70% off, mother and baby care, supplements, surgicals and free home delivery nearby. Open 10 am to 12 am, every day.",
  applicationName: STORE.name,
  keywords: [
    "generic medicine store Chhatrapati Sambhajinagar",
    "medical shop Chelipura",
    "Jan Aushadhi generic medicines",
    "GeneriCart Chelipura",
    "Sana Medical",
    "chemist Naralibag",
    "medicine home delivery Aurangabad",
    "pharmacy 431001",
  ],
  authors: [{ name: OWNER.name }],
  creator: OWNER.name,
  publisher: STORE.legalName,
  category: "health",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: STORE.legalName,
    title: `${STORE.name} - ${STORE.tagline} | Generic Medicine Store`,
    description:
      "Same medicine, smaller bill. Generic medicines at 30-70% off in Chelipura, Chhatrapati Sambhajinagar. Open 10 am to 12 am, every day.",
    locale: "en_IN",
    images: [
      {
        url: "/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Sana Medical - generic medicine store, Chelipura, Chhatrapati Sambhajinagar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${STORE.name} - ${STORE.tagline}`,
    description:
      "Generic medicines at 30-70% off, Chelipura, Chhatrapati Sambhajinagar. Open 10 am to 12 am, every day.",
    images: ["/og-cover.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  other: {
    "geo.region": "IN-MH",
    "geo.placename": ADDRESS.line2,
    "og:street-address": ADDRESS.full,
    "og:phone_number": STORE_PHONE.e164,
  },
};

export const viewport: Viewport = {
  themeColor: "#0e8a93",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${outfit.variable} ${devanagari.variable} antialiased`}
    >
      <body className="bg-mist text-ink min-h-dvh font-sans">
        {/*
          Motion is decorative: without JavaScript the loader would sit over the
          page forever and every revealed section would stay transparent. This
          drops the overlay and pins all animated content to its finished state.
        */}
        <noscript>
          <style>{`[data-loader]{display:none!important}[data-animate]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
        <JsonLd />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
