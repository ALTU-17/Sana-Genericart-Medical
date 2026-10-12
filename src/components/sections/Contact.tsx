"use client";

import { motion } from "framer-motion";
import { GraduationCap, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { useLanguage } from "@/lib/i18n";
import {
  HELPLINE,
  OWNER,
  STORE,
  STORE_PHONE,
  telLink,
  whatsappLink,
} from "@/lib/site";

export function Contact() {
  const { t } = useLanguage();

  const cards = [
    {
      id: "store",
      label: t.contact.storeCard,
      hint: t.contact.storeCardHint,
      name: STORE.name,
      meta: `${STORE.category} · ${STORE.branch}`,
      phone: STORE_PHONE,
      icon: Phone,
      accent: "brand" as const,
    },
    {
      id: "owner",
      label: t.contact.ownerCard,
      hint: t.contact.ownerCardHint,
      name: OWNER.name,
      meta: `${OWNER.qualification} · ${t.contact.ownerCard}`,
      phone: OWNER.phone,
      icon: GraduationCap,
      accent: "gold" as const,
    },
  ];

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-shell py-20 sm:py-28"
    >
      <AnimatedBackground tone="light" subtle crosses={false} />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={t.contact.eyebrow}
          title={t.contact.title}
          lead={t.contact.lead}
        />

        <RevealGroup className="mt-12 grid gap-5 lg:grid-cols-3" stagger={0.12}>
          {cards.map((card) => {
            const Icon = card.icon;
            const gold = card.accent === "gold";
            return (
              <RevealItem key={card.id} className="h-full">
                <TiltCard className="group h-full">
                  <div className="glass-strong relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl p-6">
                    <span
                      aria-hidden
                      className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${
                        gold
                          ? "from-gold via-gold-soft to-mint"
                          : "from-brand-400 via-brand-500 to-mint"
                      }`}
                    />

                    <span
                      className={`grid size-12 place-items-center rounded-2xl ${
                        gold
                          ? "bg-gold/18 text-gold"
                          : "bg-brand-500/12 text-brand-700"
                      }`}
                    >
                      <Icon className="size-6" />
                    </span>

                    <div className="flex flex-col gap-1">
                      <span className="text-[0.68rem] font-bold tracking-[0.16em] text-brand-600 uppercase">
                        {card.label}
                      </span>
                      <h3 className="font-display text-[1.18rem] leading-tight font-bold text-brand-900">
                        {card.name}
                      </h3>
                      <span className="text-[0.78rem] font-semibold text-ink-soft/60">
                        {card.meta}
                      </span>
                    </div>

                    <a
                      href={telLink(card.phone.e164)}
                      className="font-display w-fit text-[1.5rem] leading-none font-extrabold tracking-tight text-brand-700 transition-colors hover:text-brand-900"
                    >
                      {card.phone.display}
                    </a>

                    <p className="text-[0.78rem] leading-relaxed text-ink-soft/65">
                      {card.hint}
                    </p>

                    <div className="mt-auto flex flex-wrap gap-2.5 pt-2">
                      <MagneticButton
                        href={telLink(card.phone.e164)}
                        variant={gold ? "gold" : "primary"}
                        icon={<Phone className="size-4" />}
                        className="!px-5 !py-2.5 !text-[0.83rem]"
                      >
                        {t.contact.call}
                      </MagneticButton>
                      <MagneticButton
                        href={whatsappLink(card.phone.wa, t.order.messageNoPhoto)}
                        external
                        variant="outline"
                        icon={<MessageCircle className="size-4" />}
                        className="!px-5 !py-2.5 !text-[0.83rem]"
                      >
                        {t.contact.whatsapp}
                      </MagneticButton>
                    </div>
                  </div>
                </TiltCard>
              </RevealItem>
            );
          })}

          {/* Helpline card */}
          <RevealItem className="h-full">
            <div className="relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 p-6 text-white">
              <div
                aria-hidden
                className="cross-grid absolute inset-0 opacity-20 mix-blend-overlay"
              />
              <motion.span
                aria-hidden
                className="absolute -top-16 -right-16 size-48 rounded-full bg-mint/20 blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.85, 0.5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />

              <span className="relative grid size-12 place-items-center rounded-2xl bg-white/12 text-mint">
                <ShieldCheck className="size-6" />
              </span>

              <div className="relative flex flex-col gap-1">
                <span className="text-[0.68rem] font-bold tracking-[0.16em] text-mint uppercase">
                  {t.about.helplineLabel}
                </span>
                <h3 className="font-display text-[1.18rem] leading-tight font-bold">
                  {t.contact.helplineCard}
                </h3>
              </div>

              <a
                href={telLink(HELPLINE.e164)}
                className="font-display relative w-fit text-[1.5rem] leading-none font-extrabold tracking-tight text-white transition-opacity hover:opacity-80"
              >
                {HELPLINE.display}
              </a>

              <p className="relative text-[0.78rem] leading-relaxed text-brand-100/80">
                {t.contact.helplineHint}
              </p>

              <div className="relative mt-auto pt-2">
                <MagneticButton
                  href={telLink(HELPLINE.e164)}
                  variant="glass"
                  icon={<Phone className="size-4" />}
                  className="!px-5 !py-2.5 !text-[0.83rem]"
                >
                  {t.about.helplineCta}
                </MagneticButton>
              </div>
            </div>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
