"use client";

import { motion } from "framer-motion";
import {
  Baby,
  Bandage,
  Dumbbell,
  Droplets,
  HeartPulse,
  Leaf,
  Pill,
  Phone,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { useLanguage } from "@/lib/i18n";
import { STORE_PHONE, telLink } from "@/lib/site";

/** Icons keyed by the ids used in the dictionaries. */
const ICONS: Record<string, LucideIcon> = {
  generic: Pill,
  prescription: Stethoscope,
  "mother-baby": Baby,
  nutrition: Dumbbell,
  "personal-care": Droplets,
  devices: HeartPulse,
  "first-aid": Bandage,
  ayurvedic: Leaf,
};

export function Services() {
  const { t } = useLanguage();

  return (
    <section
      id="services"
      className="relative isolate overflow-hidden bg-shell py-20 sm:py-28"
    >
      <AnimatedBackground tone="light" subtle />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={t.services.eyebrow}
          title={t.services.title}
          lead={t.services.lead}
          align="center"
          className="mx-auto"
        />

        <RevealGroup
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.07}
        >
          {t.services.items.map((item, index) => {
            const Icon = ICONS[item.id] ?? Pill;
            return (
              <RevealItem key={item.id} className="h-full">
                <TiltCard className="group h-full">
                  <article className="glass-tint relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl p-5 transition-shadow duration-300 group-hover:shadow-[0_30px_60px_-30px_rgba(8,63,69,0.45)]">
                    {/* Faint index number, like a shelf label */}
                    <span
                      aria-hidden
                      className="font-display absolute top-3 right-4 text-[2.4rem] leading-none font-extrabold text-brand-900/6"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <motion.span
                      aria-hidden
                      className="relative grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500/18 to-mint/25 text-brand-700"
                      whileHover={{ rotate: -8, scale: 1.08 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    >
                      <Icon className="size-6" />
                    </motion.span>

                    <h3 className="font-display relative text-[1.05rem] leading-snug font-bold text-brand-900">
                      {item.title}
                    </h3>
                    <p className="relative text-[0.855rem] leading-relaxed text-ink-soft/75">
                      {item.desc}
                    </p>

                    {/* Teal underline that fills on hover */}
                    <span
                      aria-hidden
                      className="mt-auto h-0.5 w-8 rounded-full bg-brand-500/35 transition-all duration-400 group-hover:w-full group-hover:bg-brand-500"
                    />
                  </article>
                </TiltCard>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal y={20} delay={0.1}>
          <div className="glass-strong mt-10 flex flex-col items-center justify-between gap-5 rounded-3xl px-6 py-6 sm:flex-row sm:px-8">
            <p className="max-w-xl text-center text-[0.95rem] leading-relaxed text-ink-soft/80 sm:text-left">
              {t.services.note}
            </p>
            <MagneticButton
              href={telLink(STORE_PHONE.e164)}
              variant="primary"
              icon={<Phone className="size-4" />}
              className="shrink-0"
            >
              {STORE_PHONE.display}
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
