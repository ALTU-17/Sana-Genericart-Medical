"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/i18n";
import {
  ADDRESS,
  HELPLINE,
  MAPS,
  OWNER,
  STORE,
  STORE_PHONE,
  telLink,
  whatsappLink,
} from "@/lib/site";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const numbers = [
    { label: t.contact.storeCard, name: STORE.name, phone: STORE_PHONE },
    {
      label: t.contact.ownerCard,
      name: `${OWNER.name} (${OWNER.qualification})`,
      phone: OWNER.phone,
    },
  ];

  return (
    <footer className="relative isolate overflow-hidden bg-brand-950 text-brand-100">
      <AnimatedBackground tone="dark" />

      <div className="relative mx-auto max-w-6xl px-5 pt-16 pb-10 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1.2fr]">
          {/* Brand */}
          <Reveal y={20}>
            <div className="flex flex-col gap-5">
              <Logo tone="dark" mark="genericart" subtitle={STORE.tagline} />
              <p className="max-w-sm text-sm leading-relaxed text-brand-100/75">
                {t.footer.blurb}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[0.7rem] font-semibold tracking-wide text-mint">
                  <ShieldCheck className="size-3.5" />
                  {t.about.helplineLabel}: {HELPLINE.display}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[0.7rem] font-semibold tracking-wide text-brand-100">
                  {STORE.network} · {STORE.branchCode}
                </span>
              </div>
            </div>
          </Reveal>

          {/* Quick links */}
          <Reveal y={20} delay={0.08}>
            <nav aria-label={t.footer.quickLinks} className="flex flex-col gap-4">
              <h2 className="font-display text-[0.72rem] font-bold tracking-[0.18em] text-brand-200 uppercase">
                {t.footer.quickLinks}
              </h2>
              <ul className="flex flex-col gap-2.5">
                {t.nav.items.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      className="group inline-flex items-center gap-1.5 text-sm text-brand-100/80 transition-colors hover:text-white"
                    >
                      <span className="h-px w-0 bg-mint transition-all duration-300 group-hover:w-4" />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>

          {/* Reach us + timing */}
          <Reveal y={20} delay={0.16}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <h2 className="font-display text-[0.72rem] font-bold tracking-[0.18em] text-brand-200 uppercase">
                  {t.footer.reachUs}
                </h2>
                <ul className="flex flex-col gap-3">
                  {numbers.map((entry) => (
                    <li key={entry.label}>
                      <a
                        href={telLink(entry.phone.e164)}
                        className="glass-dark group flex items-center gap-3 rounded-2xl px-3.5 py-3 transition-colors hover:bg-white/15"
                      >
                        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-mint/15 text-mint">
                          <Phone className="size-4" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[0.68rem] font-semibold tracking-wide text-brand-200/80 uppercase">
                            {entry.label} · {entry.name}
                          </span>
                          <span className="block text-sm font-bold text-white">
                            {entry.phone.display}
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3 text-sm text-brand-100/80">
                <a
                  href={MAPS.directions}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-start gap-2.5 transition-colors hover:text-white"
                >
                  <MapPin className="mt-0.5 size-4 shrink-0 text-mint" />
                  <span>
                    {ADDRESS.full}
                    <span className="mt-1 flex items-center gap-1 text-[0.72rem] text-mint/80">
                      {t.visit.mapOpen}
                      <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </span>
                </a>
                <p className="flex items-start gap-2.5">
                  <Clock className="mt-0.5 size-4 shrink-0 text-mint" />
                  <span>
                    <span className="font-semibold text-white">
                      {t.footer.openDaily}
                    </span>
                    <br />
                    {t.footer.hours}
                  </span>
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-7">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex flex-col gap-1">
              <p className="font-display text-sm font-bold text-white">
                {t.footer.managedBy}
              </p>
              <p className="text-[0.78rem] text-brand-100/60">
                {STORE.legalName} · {STORE.descriptor} · {STORE.branch}
              </p>
            </div>
            <motion.a
              href={whatsappLink(OWNER.phone.wa, t.order.message)}
              target="_blank"
              rel="noreferrer noopener"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full bg-mint px-5 py-2.5 text-[0.82rem] font-bold text-brand-950"
            >
              <MessageCircle className="size-4" />
              {t.nav.orderCta}
            </motion.a>
          </div>

          <p className="max-w-3xl text-[0.72rem] leading-relaxed text-brand-100/45">
            {t.footer.disclaimer}
          </p>

          <div className="flex flex-col gap-1.5 text-[0.72rem] text-brand-100/45 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {STORE.legalName}. {t.footer.rights}
            </p>
            <p>{t.footer.credit}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
