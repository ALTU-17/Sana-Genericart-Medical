"use client";

import { motion } from "framer-motion";
import { BadgeCheck, MessageCircle, Package, Phone, Truck } from "lucide-react";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/lib/i18n";
import { EASE } from "@/lib/motion";
import { OWNER, STORE_PHONE, telLink, whatsappLink } from "@/lib/site";

const STEP_ICONS = [MessageCircle, BadgeCheck, Package];

export function Order() {
  const { t } = useLanguage();

  return (
    <section
      id="order"
      className="relative isolate overflow-hidden bg-mist py-20 sm:py-28"
    >
      <AnimatedBackground tone="light" subtle crosses={false} />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={t.order.eyebrow}
          title={t.order.title}
          lead={t.order.lead}
          align="center"
          className="mx-auto"
        />

        <div className="relative mt-14">
          {/* Thread that links the three steps on wide screens */}
          <motion.span
            aria-hidden
            className="absolute top-[3.4rem] right-[16%] left-[16%] hidden h-px bg-[repeating-linear-gradient(90deg,var(--color-brand-300)_0_8px,transparent_8px_16px)] lg:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.1, ease: EASE }}
            style={{ originX: 0.5 }}
          />

          <RevealGroup className="grid gap-5 lg:grid-cols-3" stagger={0.14}>
            {t.order.steps.map((step, index) => {
              const Icon = STEP_ICONS[index % STEP_ICONS.length];
              return (
                <RevealItem key={step.id} className="h-full">
                  <div className="group glass-strong relative flex h-full flex-col items-center gap-4 overflow-hidden rounded-3xl px-6 pt-8 pb-7 text-center transition-shadow duration-300 hover:shadow-[0_32px_60px_-30px_rgba(8,63,69,0.45)]">
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-400 via-brand-500 to-gold opacity-70"
                    />

                    <motion.span
                      className="relative grid size-16 place-items-center rounded-3xl bg-gradient-to-br from-brand-600 to-brand-500 text-white shadow-[0_18px_36px_-16px_rgba(11,109,118,0.85)]"
                      whileHover={{ y: -4, rotate: -4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    >
                      <Icon className="size-7" />
                      <span className="font-display absolute -top-2.5 -right-2.5 grid size-7 place-items-center rounded-full border-2 border-white bg-gold text-[0.72rem] font-extrabold text-brand-950">
                        {index + 1}
                      </span>
                    </motion.span>

                    <h3 className="font-display text-[1.12rem] leading-snug font-bold text-brand-900">
                      {step.title}
                    </h3>
                    <p className="text-[0.885rem] leading-relaxed text-ink-soft/75">
                      {step.desc}
                    </p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>

        <Reveal y={22} delay={0.1}>
          <div className="mt-11 flex flex-col items-center gap-5">
            <div className="flex flex-wrap justify-center gap-3">
              <MagneticButton
                href={whatsappLink(OWNER.phone.wa, t.order.message)}
                external
                variant="gold"
                icon={<MessageCircle className="size-4.5" />}
              >
                {t.order.cta}
              </MagneticButton>
              <MagneticButton
                href={telLink(STORE_PHONE.e164)}
                variant="outline"
                icon={<Phone className="size-4.5" />}
              >
                {t.order.callCta}
              </MagneticButton>
            </div>
            <p className="max-w-md text-center text-[0.78rem] leading-relaxed text-ink-soft/60">
              {t.order.note}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 text-[0.74rem] font-semibold text-brand-700">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-white/70 px-3 py-1.5">
                <Truck className="size-3.5 text-brand-500" />
                {t.hero.deliveryChip}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-white/70 px-3 py-1.5">
                {STORE_PHONE.display}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
