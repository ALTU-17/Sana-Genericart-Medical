"use client";

import { motion } from "framer-motion";
import { CalendarDays, Clock, MapPin, Navigation, Store } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import { getStoreStatus } from "@/lib/hours";
import { useLanguage } from "@/lib/i18n";
import { EASE } from "@/lib/motion";
import { ADDRESS, HOURS, MAPS, STORE, STORE_PHONE, telLink } from "@/lib/site";

export function Visit() {
  const { t } = useLanguage();
  const [today, setToday] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setToday(getStoreStatus().dayIndex);
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="visit"
      className="relative isolate overflow-hidden bg-shell py-20 sm:py-28"
    >
      <AnimatedBackground tone="light" subtle crosses={false} />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={t.visit.eyebrow}
          title={t.visit.title}
          lead={t.visit.lead}
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          {/* -------------------------------------------------------- */}
          {/* Opening hours                                             */}
          {/* -------------------------------------------------------- */}
          <Reveal y={26} className="h-full">
            <div className="glass-strong flex h-full flex-col gap-5 rounded-3xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-display flex items-center gap-2.5 text-[1.05rem] font-bold text-brand-900">
                  <span className="grid size-9 place-items-center rounded-xl bg-brand-500/12 text-brand-700">
                    <Clock className="size-4.5" />
                  </span>
                  {t.visit.hoursTitle}
                </h3>
                <OpenStatus size="sm" detailed={false} />
              </div>

              <ul className="flex flex-col gap-1">
                {t.visit.days.map((day, index) => {
                  const isToday = today === index;
                  return (
                    <motion.li
                      key={day}
                      initial={false}
                      animate={
                        isToday
                          ? { backgroundColor: "rgba(18,179,184,0.13)" }
                          : { backgroundColor: "rgba(18,179,184,0)" }
                      }
                      transition={{ duration: 0.4, ease: EASE }}
                      className={cn(
                        "flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-[0.88rem]",
                        isToday
                          ? "font-bold text-brand-800"
                          : "font-medium text-ink-soft/70",
                      )}
                    >
                      <span className="flex items-center gap-2">
                        {day}
                        {isToday ? (
                          <span className="rounded-full bg-brand-600 px-2 py-0.5 text-[0.6rem] font-bold tracking-wide text-white uppercase">
                            {t.visit.today}
                          </span>
                        ) : null}
                      </span>
                      <span className="font-display tabular-nums">
                        {t.visit.sameEveryDay}
                      </span>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="mt-auto flex items-start gap-2.5 rounded-2xl bg-gold/12 px-4 py-3.5 text-[0.78rem] leading-relaxed text-brand-900/80">
                <CalendarDays className="mt-0.5 size-4 shrink-0 text-gold" />
                <p>{t.visit.note}</p>
              </div>
            </div>
          </Reveal>

          {/* -------------------------------------------------------- */}
          {/* Address + map                                             */}
          {/* -------------------------------------------------------- */}
          <RevealGroup className="flex flex-col gap-5" stagger={0.12}>
            <RevealItem>
              <div className="glass-strong flex flex-col gap-5 rounded-3xl p-6">
                <div className="flex flex-wrap items-start justify-between gap-5">
                  <div className="flex flex-col gap-3">
                    <h3 className="font-display flex items-center gap-2.5 text-[1.05rem] font-bold text-brand-900">
                      <span className="grid size-9 place-items-center rounded-xl bg-brand-500/12 text-brand-700">
                        <MapPin className="size-4.5" />
                      </span>
                      {t.visit.addressTitle}
                    </h3>
                    <address className="flex flex-col gap-1 text-[0.95rem] leading-relaxed text-ink-soft/85 not-italic">
                      <span className="font-bold text-brand-900">
                        {STORE.legalName}
                      </span>
                      <span>{ADDRESS.line1}</span>
                      <span>
                        {ADDRESS.line2}, {ADDRESS.state} {ADDRESS.postalCode}
                      </span>
                      <span className="mt-1 inline-flex items-center gap-1.5 text-[0.78rem] font-semibold text-brand-600">
                        <Store className="size-3.5" />
                        {t.visit.landmark}
                      </span>
                      <span className="mt-1 inline-flex items-center gap-1.5 text-[0.78rem] font-semibold text-ink-soft/70">
                        {t.visit.sameEveryDay} · {STORE.category}
                      </span>
                    </address>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <MagneticButton
                      href={MAPS.directions}
                      external
                      variant="primary"
                      icon={<Navigation className="size-4" />}
                      className="!px-5 !py-2.5 !text-[0.85rem]"
                    >
                      {t.hero.ctaDirections}
                    </MagneticButton>
                    <MagneticButton
                      href={telLink(STORE_PHONE.e164)}
                      variant="outline"
                      icon={<Clock className="size-4" />}
                      className="!px-5 !py-2.5 !text-[0.85rem]"
                    >
                      {STORE_PHONE.display}
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </RevealItem>

            <RevealItem>
              <div className="glass-tint relative overflow-hidden rounded-3xl p-2.5">
                <div className="relative h-[19rem] overflow-hidden rounded-[1.4rem] bg-brand-100 sm:h-[23rem]">
                  <iframe
                    title={t.a11y.storeMap}
                    src={MAPS.embed}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 size-full border-0"
                    allowFullScreen
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-3">
                  <p className="text-[0.82rem] font-semibold text-brand-800">
                    {t.visit.mapTitle}
                  </p>
                  <a
                    href={MAPS.listing}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 text-[0.82rem] font-bold text-brand-600 transition-colors hover:text-brand-800"
                  >
                    {t.visit.mapOpen}
                    <Navigation className="size-3.5" />
                  </a>
                </div>
              </div>
            </RevealItem>

            <RevealItem>
              <p className="px-1 text-[0.78rem] leading-relaxed text-ink-soft/55">
                {HOURS.summary} · {ADDRESS.full}
              </p>
            </RevealItem>
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
