"use client";

import { motion } from "framer-motion";
import {
  BadgePercent,
  HeartPulse,
  Phone,
  ShieldCheck,
  Sparkles,
  ThermometerSun,
  BadgeCheck,
} from "lucide-react";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/lib/i18n";
import { EASE, VIEWPORT } from "@/lib/motion";
import { HELPLINE, STORE, telLink } from "@/lib/site";

/** One icon per point, in the same order as the dictionary. */
const POINT_ICONS = [BadgeCheck, BadgePercent, ThermometerSun, HeartPulse];

export function About() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="relative isolate overflow-hidden bg-mist py-20 sm:py-28"
    >
      <AnimatedBackground tone="light" subtle />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        {/* ---------------------------------------------------------- */}
        {/* The argument                                                */}
        {/* ---------------------------------------------------------- */}
        <div className="flex flex-col gap-9">
          <SectionHeading
            eyebrow={t.about.eyebrow}
            title={t.about.title}
            lead={t.about.lead}
          />

          <Reveal y={16} delay={0.15}>
            <p className="max-w-2xl text-[1.02rem] leading-relaxed text-ink-soft/80">
              {t.about.body}
            </p>
          </Reveal>

          <RevealGroup className="grid gap-4 sm:grid-cols-2" stagger={0.1}>
            {t.about.points.map((point, index) => {
              const Icon = POINT_ICONS[index % POINT_ICONS.length];
              return (
                <RevealItem
                  key={point.title}
                  className="group glass-tint relative flex flex-col gap-3 overflow-hidden rounded-3xl p-5 transition-shadow duration-300 hover:shadow-[0_28px_56px_-28px_rgba(8,63,69,0.4)]"
                >
                  <span className="grid size-11 place-items-center rounded-2xl bg-brand-600/12 text-brand-700 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="font-display text-[1.02rem] font-bold text-brand-900">
                    {point.title}
                  </h3>
                  <p className="text-[0.875rem] leading-relaxed text-ink-soft/75">
                    {point.desc}
                  </p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* Price comparison + helpline                                 */}
        {/* ---------------------------------------------------------- */}
        <div className="flex flex-col gap-5 lg:pt-4">
          <Reveal y={26} delay={0.1}>
            <PriceComparison />
          </Reveal>

          <Reveal y={26} delay={0.2}>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 via-brand-700 to-brand-600 p-6 text-white shadow-[0_30px_60px_-30px_rgba(8,63,69,0.75)]">
              <div
                aria-hidden
                className="cross-grid absolute inset-0 opacity-20 mix-blend-overlay"
              />
              <div className="relative flex flex-col gap-4">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[0.68rem] font-bold tracking-[0.14em] text-mint uppercase">
                  <ShieldCheck className="size-3.5" />
                  {t.about.helplineLabel}
                </span>
                <h3 className="font-display text-[1.15rem] leading-snug font-bold">
                  {t.about.helplineTitle}
                </h3>
                <p className="text-[0.875rem] leading-relaxed text-brand-100/85">
                  {t.about.helplineBody}
                </p>
                <a
                  href={telLink(HELPLINE.e164)}
                  className="font-display mt-1 text-[2rem] leading-none font-extrabold tracking-tight text-white transition-opacity hover:opacity-80"
                >
                  {HELPLINE.display}
                </a>
                <MagneticButton
                  href={telLink(HELPLINE.e164)}
                  variant="gold"
                  icon={<Phone className="size-4" />}
                  className="w-fit !px-5 !py-2.5 !text-[0.85rem]"
                >
                  {t.about.helplineCta}
                </MagneticButton>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/**
 * A deliberately simple illustration of what the discount means in rupees.
 * Marked as an illustration so nobody reads it as a quotation.
 */
function PriceComparison() {
  const { t } = useLanguage();

  const bars = [
    {
      id: "branded",
      label: t.about.compareBranded,
      width: "100%",
      tone: "bg-ink-soft/25",
      note: "100%",
    },
    {
      id: "generic",
      label: t.about.compareGeneric,
      // The generic pack lands somewhere in the lower third of the branded price.
      width: "34%",
      tone: "bg-gradient-to-r from-brand-500 to-mint",
      note: `−${STORE.discount.from}–${STORE.discount.to}%`,
    },
  ];

  return (
    <div className="glass-strong flex flex-col gap-5 rounded-3xl p-6">
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 place-items-center rounded-xl bg-gold/20 text-gold">
          <Sparkles className="size-4.5" />
        </span>
        <h3 className="font-display text-[1.02rem] font-bold text-brand-900">
          {t.about.compareTitle}
        </h3>
      </div>

      <div className="flex flex-col gap-4">
        {bars.map((bar, index) => (
          <div key={bar.id} className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between text-[0.78rem] font-semibold">
              <span className="text-ink-soft/75">{bar.label}</span>
              <span className="font-display text-brand-800 tabular-nums">
                {bar.note}
              </span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-brand-950/8">
              <motion.div
                className={`h-full rounded-full ${bar.tone}`}
                initial={{ width: 0 }}
                whileInView={{ width: bar.width }}
                viewport={VIEWPORT}
                transition={{ duration: 1.1, ease: EASE, delay: 0.15 + index * 0.15 }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="text-[0.72rem] leading-relaxed text-ink-soft/55">
        {t.about.compareCaption}
      </p>
    </div>
  );
}
