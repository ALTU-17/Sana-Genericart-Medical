"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useState } from "react";
import interiorOne from "@/assets/images/interior-1.webp";
import interiorTwo from "@/assets/images/interior-2.webp";
import storeFront from "@/assets/images/store-front.webp";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import { useLanguage } from "@/lib/i18n";
import { EASE } from "@/lib/motion";

const PHOTOS: Record<string, StaticImageData> = {
  "store-front": storeFront,
  "interior-1": interiorOne,
  "interior-2": interiorTwo,
};

/** The first photo is the widest tile, so the grid never looks like a contact sheet. */
const SPANS = [
  "sm:col-span-2 lg:col-span-3 lg:row-span-2",
  "lg:col-span-3",
  "lg:col-span-3",
];

export function Gallery() {
  const { t } = useLanguage();
  const [open, setOpen] = useState<number | null>(null);

  const items = t.gallery.items;
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (direction: 1 | -1) =>
      setOpen((current) =>
        current === null ? null : (current + direction + items.length) % items.length,
      ),
    [items.length],
  );

  // Keyboard controls and scroll lock while the lightbox is open.
  useEffect(() => {
    if (open === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, close, step]);

  const active = open === null ? null : items[open];

  return (
    <section
      id="gallery"
      className="relative isolate overflow-hidden bg-mist py-20 sm:py-28"
    >
      <AnimatedBackground tone="light" subtle crosses={false} />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={t.gallery.eyebrow}
          title={t.gallery.title}
          lead={t.gallery.lead}
        />

        <RevealGroup
          className="mt-12 grid auto-rows-[13rem] gap-4 sm:grid-cols-2 lg:grid-cols-6"
          stagger={0.12}
        >
          {items.map((item, index) => (
            <RevealItem
              key={item.id}
              className={cn("h-full", SPANS[index % SPANS.length])}
            >
              <button
                type="button"
                onClick={() => setOpen(index)}
                aria-label={`${t.a11y.openPhoto}: ${item.caption}`}
                className="group glass-tint relative h-full w-full overflow-hidden rounded-3xl p-2 text-left transition-shadow duration-300 hover:shadow-[0_34px_64px_-32px_rgba(8,63,69,0.5)]"
              >
                <motion.span
                  layoutId={`gallery-${item.id}`}
                  className="relative block h-full w-full overflow-hidden rounded-[1.4rem]"
                >
                  <Image
                    src={PHOTOS[item.id] ?? storeFront}
                    alt={item.alt}
                    fill
                    quality={88}
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 32vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-brand-950/75 via-brand-950/5 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95"
                  />
                  <span className="absolute inset-x-4 bottom-3.5 flex items-end justify-between gap-3">
                    <span className="text-[0.88rem] leading-snug font-bold text-white drop-shadow-sm">
                      {item.caption}
                    </span>
                    <span className="grid size-8 shrink-0 translate-y-1 place-items-center rounded-full bg-white/85 text-brand-800 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <Expand className="size-3.5" />
                    </span>
                  </span>
                </motion.span>
              </button>
            </RevealItem>
          ))}
        </RevealGroup>

        <p className="mt-6 text-center text-[0.78rem] font-medium text-ink-soft/55">
          {t.gallery.openHint}
        </p>
      </div>

      {/* ------------------------------------------------------------ */}
      {/* Lightbox                                                      */}
      {/* ------------------------------------------------------------ */}
      <AnimatePresence>
        {active ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={active.caption}
            className="fixed inset-0 z-70 flex flex-col items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              type="button"
              aria-label={t.a11y.closePhoto}
              onClick={close}
              className="absolute inset-0 cursor-zoom-out bg-brand-950/80 backdrop-blur-md"
            />

            <motion.figure
              layoutId={`gallery-${active.id}`}
              transition={{ duration: 0.45, ease: EASE }}
              className="glass-dark relative z-10 flex max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-3xl p-2.5"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.4rem]">
                <Image
                  src={PHOTOS[active.id] ?? storeFront}
                  alt={active.alt}
                  fill
                  quality={88}
                  sizes="(max-width: 1024px) 92vw, 900px"
                  className="object-cover"
                />
              </div>
              <figcaption className="flex items-center justify-between gap-4 px-3 py-3">
                <span className="text-[0.9rem] font-semibold text-white">
                  {active.caption}
                </span>
                <span className="font-mono text-[0.72rem] text-brand-200">
                  {(open ?? 0) + 1} / {items.length}
                </span>
              </figcaption>
            </motion.figure>

            <div className="relative z-10 mt-4 flex items-center gap-3">
              <LightboxButton
                onClick={() => step(-1)}
                label={t.a11y.previousPhoto}
                icon={<ChevronLeft className="size-5" />}
              />
              <LightboxButton
                onClick={close}
                label={t.a11y.closePhoto}
                icon={<X className="size-5" />}
              />
              <LightboxButton
                onClick={() => step(1)}
                label={t.a11y.nextPhoto}
                icon={<ChevronRight className="size-5" />}
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function LightboxButton({
  onClick,
  label,
  icon,
}: {
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="glass-dark grid size-11 place-items-center rounded-full text-white transition-colors hover:bg-white/20"
    >
      {icon}
    </motion.button>
  );
}
