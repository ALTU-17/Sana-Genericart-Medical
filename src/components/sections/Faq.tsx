"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Plus } from "lucide-react";
import { useState } from "react";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import { useLanguage } from "@/lib/i18n";
import { EASE } from "@/lib/motion";
import { OWNER, whatsappLink } from "@/lib/site";

export function Faq() {
  const { t } = useLanguage();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative isolate overflow-hidden bg-mist py-20 sm:py-28">
      <AnimatedBackground tone="light" subtle crosses={false} />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow={t.faq.eyebrow}
            title={t.faq.title}
            lead={t.order.note}
          />

          <Reveal y={20} delay={0.15} className="mt-8">
            <div className="glass-strong flex flex-col gap-4 rounded-3xl p-6">
              <p className="text-[0.88rem] leading-relaxed text-ink-soft/80">
                {t.contact.ownerCardHint}
              </p>
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-2xl bg-brand-500/12 text-brand-700">
                  <MessageCircle className="size-5" />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="font-display text-[0.95rem] font-bold text-brand-900">
                    {OWNER.name}
                  </span>
                  <span className="text-[0.75rem] font-semibold text-ink-soft/60">
                    {OWNER.qualification} · {OWNER.phone.display}
                  </span>
                </span>
              </div>
              <MagneticButton
                href={whatsappLink(OWNER.phone.wa, t.order.messageNoPhoto)}
                external
                variant="primary"
                icon={<MessageCircle className="size-4" />}
                className="w-fit !px-5 !py-2.5 !text-[0.85rem]"
              >
                {t.contact.whatsapp}
              </MagneticButton>
            </div>
          </Reveal>
        </div>

        <RevealGroup className="flex flex-col gap-3" stagger={0.07} amount={0.08}>
          {t.faq.items.map((item, index) => {
            const isOpen = open === index;
            return (
              <RevealItem key={item.q}>
                <div
                  className={cn(
                    "glass overflow-hidden rounded-3xl transition-shadow duration-300",
                    isOpen && "shadow-[0_28px_56px_-30px_rgba(8,63,69,0.4)]",
                  )}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${index}`}
                      id={`faq-trigger-${index}`}
                      className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                    >
                      <span className="flex items-start gap-3.5">
                        <span
                          aria-hidden
                          className="font-display mt-0.5 text-[0.78rem] font-extrabold text-brand-400 tabular-nums"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={cn(
                            "font-display text-[1rem] leading-snug font-bold transition-colors sm:text-[1.06rem]",
                            isOpen ? "text-brand-800" : "text-brand-900",
                          )}
                        >
                          {item.q}
                        </span>
                      </span>

                      <motion.span
                        aria-hidden
                        animate={{ rotate: isOpen ? 135 : 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className={cn(
                          "grid size-8 shrink-0 place-items-center rounded-full transition-colors",
                          isOpen
                            ? "bg-brand-600 text-white"
                            : "bg-brand-500/12 text-brand-700",
                        )}
                      >
                        <Plus className="size-4" />
                      </motion.span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        key="panel"
                        id={`faq-panel-${index}`}
                        role="region"
                        aria-labelledby={`faq-trigger-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.38, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 pl-[3.4rem] text-[0.9rem] leading-relaxed text-ink-soft/80 sm:px-6 sm:pl-[3.9rem]">
                          {item.a}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
