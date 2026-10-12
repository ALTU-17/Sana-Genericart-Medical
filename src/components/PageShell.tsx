"use client";

import { Footer } from "@/components/layout/Footer";
import { FloatingDock } from "@/components/layout/FloatingDock";
import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Order } from "@/components/sections/Order";
import { Services } from "@/components/sections/Services";
import { TrustMarquee } from "@/components/sections/TrustMarquee";
import { Visit } from "@/components/sections/Visit";
import { useLanguage } from "@/lib/i18n";
import { IntroProvider } from "@/lib/intro";

/**
 * The whole page, in order.
 *
 * The loader sits on top of everything while the sections below are already
 * laid out, so the curtain opens onto a finished page rather than a blank one.
 */
export function PageShell() {
  const { t } = useLanguage();

  return (
    <IntroProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-200 focus:rounded-full focus:bg-brand-900 focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
      >
        {t.a11y.skipToContent}
      </a>

      <Navbar />

      <main id="main" className="relative">
        <Hero />
        <TrustMarquee />
        <About />
        <Services />
        <Gallery />
        <Visit />
        <Order />
        <Contact />
        <Faq />
      </main>

      <Footer />
      <FloatingDock />
    </IntroProvider>
  );
}
