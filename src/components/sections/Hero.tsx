"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  BadgePercent,
  ChevronDown,
  MessageCircle,
  Navigation,
  Phone,
  Truck,
} from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import storeFront from "@/assets/images/store-front.webp";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { Counter } from "@/components/ui/Counter";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { useLanguage } from "@/lib/i18n";
import { useIntro } from "@/lib/intro";
import { EASE } from "@/lib/motion";
import { MAPS, OWNER, STORE, STORE_PHONE, telLink, whatsappLink } from "@/lib/site";

export function Hero() {
  const { t } = useLanguage();
  const { revealed } = useIntro();
  const sectionRef = useRef<HTMLElement>(null);

  // The photo drifts slower than the page, so the glass frame feels physical.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const show = revealed ? "show" : "hidden";

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative isolate grain overflow-hidden bg-gradient-to-b from-brand-950 via-brand-800 to-brand-700 pt-32 pb-24 sm:pt-36 lg:pt-30 lg:pb-32"
    >
      <AnimatedBackground tone="dark" />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
        {/* ------------------------------------------------------------ */}
        {/* Copy                                                          */}
        {/* ------------------------------------------------------------ */}
        <motion.div
          data-animate
          style={{ y: copyY }}
          initial="hidden"
          animate={show}
          variants={{ hidden: {}, show: {} }}
          transition={{ staggerChildren: 0.09, delayChildren: 0.05 }}
          className="flex flex-col items-start gap-6"
        >
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex max-w-full flex-wrap items-center gap-2.5 rounded-2xl border border-white/20 bg-white/10 py-1.5 pr-4 pl-1.5 text-[0.74rem] font-semibold text-brand-100 backdrop-blur-md sm:rounded-full"
          >
            
            <span className="text-balance">{t.hero.eyebrow}</span>
          </motion.span>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 22 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, ease: EASE }}
            className="flex flex-col gap-3"
          >
            <span className="flex items-center gap-3">
              <LogoMarkInline />
              <span className="text-[0.78rem] font-bold tracking-[0.24em] text-mint uppercase">
                {STORE.legalName}
              </span>
            </span>
            <span className="font-display text-[2.6rem] leading-[0.98] font-extrabold text-white sm:text-[3.6rem] lg:text-[4.1rem]">
              {t.hero.titleLead}{" "}
              <span className="text-gradient-light">{t.hero.titleAccent}</span>
            </span>
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.75, ease: EASE }}
            className="max-w-xl text-[1.02rem] leading-relaxed text-brand-100/85"
          >
            {t.hero.lead}
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.75, ease: EASE }}
            className="flex flex-wrap items-center gap-3"
          >
            <MagneticButton
              href={whatsappLink(OWNER.phone.wa, t.order.message)}
              external
              variant="gold"
              icon={<MessageCircle className="size-4.5" />}
            >
              {t.hero.ctaWhatsapp}
            </MagneticButton>
            <MagneticButton
              href={telLink(STORE_PHONE.e164)}
              variant="glass"
              icon={<Phone className="size-4.5" />}
            >
              {t.hero.ctaCall}
            </MagneticButton>
            <MagneticButton
              href={MAPS.directions}
              external
              variant="outline"
              icon={<Navigation className="size-4.5" />}
              className="!border-white/30 !bg-white/10 !text-white hover:!bg-white/20"
            >
              {t.hero.ctaDirections}
            </MagneticButton>
          </motion.div>

          {/* Live status + delivery promise */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex flex-wrap items-center gap-2.5"
          >
            <OpenStatus tone="dark" size="sm" />
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[0.76rem] font-semibold text-brand-100 backdrop-blur-md">
              <Truck className="size-3.5 text-mint" />
              {t.hero.deliveryChip}
            </span>
          </motion.div>

          {/* Countable proof */}
          <motion.dl
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mt-1 grid w-full max-w-lg grid-cols-3 gap-3 border-t border-white/15 pt-3"
          >
            {t.hero.stats.map((stat) => (
              <div key={stat.id} className="flex flex-col gap-1">
                <dt className="font-display text-[1.7rem] leading-none font-extrabold text-mint tabular-nums sm:text-[2rem]">
                  <Counter to={stat.value} suffix={stat.suffix} />
                </dt>
                <dd className="text-[0.74rem] leading-snug font-medium text-brand-100/70">
                  {stat.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* ------------------------------------------------------------ */}
        {/* Storefront in a glass frame                                    */}
        {/* ------------------------------------------------------------ */}
        <motion.div
          data-animate
          style={{ y: photoY }}
          initial={{ opacity: 0, scale: 0.94, rotate: -3 }}
          animate={
            revealed
              ? { opacity: 1, scale: 1, rotate: 0 }
              : { opacity: 0, scale: 0.94, rotate: -3 }
          }
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="glass-dark relative overflow-hidden rounded-[2rem] p-2.5">
            <div className="relative overflow-hidden rounded-[1.6rem]">
              <Image
                src={storeFront}
                alt={t.gallery.items[0].alt}
                placeholder="blur"
                quality={88}
                sizes="(max-width: 1024px) 90vw, 520px"
                className="h-auto w-full object-cover"
                priority
              />
              {/* Teal wash so the photo sits inside the palette */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-brand-900/10 to-transparent"
              />
              <p className="absolute bottom-3.5 left-4 text-[0.78rem] font-semibold text-white/95">
                {t.hero.imageCaption}
              </p>
            </div>

            {/* Signboard-style header, echoing the real shop front */}
            <div className="flex items-center justify-between gap-3 px-3 pt-3.5 pb-1.5">
              <div className="flex flex-col">
                <span className="font-display text-[0.95rem] font-extrabold tracking-tight text-white">
                  SANA MEDICAL
                </span>
                <span className="font-marathi text-[0.7rem] font-semibold text-mint/85">
                  {STORE.taglineMr}
                </span>
              </div>
              <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[0.62rem] font-bold tracking-wide text-brand-100">
                {STORE.network} · {STORE.branchCode}
              </span>
            </div>
          </div>

          {/* Floating discount seal */}
          <motion.div
            animate={{ y: [0, -9, 0] }}
            transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
            className="glass-strong absolute -top-9 -right-2 flex items-center gap-2.5 rounded-2xl px-4 py-3 sm:-right-7"
          >
            <span className="grid size-9 place-items-center rounded-xl bg-gold/20 text-gold">
              <BadgePercent className="size-4.5" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-[1.05rem] font-extrabold text-brand-900">
                {STORE.discount.from}–{STORE.discount.to}%
              </span>
              <span className="mt-0.5 text-[0.64rem] font-semibold tracking-wide text-ink-soft/70 uppercase">
                {t.hero.stats[0].label}
              </span>
            </span>
          </motion.div>

          {/* Floating pharmacist chip */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 5.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6,
            }}
            className="glass-strong absolute -bottom-8 -left-2 flex items-center gap-2.5 rounded-2xl px-4 py-3 sm:-left-7"
          >
            <span className="grid size-9 place-items-center rounded-xl bg-brand-500/15 text-brand-700">
              <Phone className="size-4.5" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-[0.64rem] font-semibold tracking-wide text-ink-soft/70 uppercase">
                {t.contact.ownerCard}
              </span>
              <span className="mt-0.5 text-[0.86rem] font-bold text-brand-900">
                {OWNER.name}
              </span>
              <span className="mt-0.5 text-[0.72rem] font-semibold text-brand-600">
                {OWNER.phone.display}
              </span>
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute inset-x-0 bottom-6 mx-auto hidden w-fit flex-col items-center gap-1.5 text-[0.68rem] font-semibold tracking-[0.2em] text-brand-100/60 uppercase transition-colors hover:text-white lg:flex"
      >
        <span className="animate-bob">
          <ChevronDown className="size-4.5" />
        </span>
      </motion.a>
    </section>
  );
}

/** A small inline mark so the h1 carries the shop identity. */
function LogoMarkInline() {
  return (
    <svg viewBox="0 0 512 512" className="size-7 shrink-0" aria-hidden>
      <defs>
        <linearGradient id="hero-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8fe6df" />
          <stop offset="100%" stopColor="#2fc6c6" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="122" fill="url(#hero-mark)" />
      <path d="M221 118h70v103h103v70H291v103h-70V291H118v-70h103z" fill="#04252a" />
    </svg>
  );
}
