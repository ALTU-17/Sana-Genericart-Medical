"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { EASE } from "@/lib/motion";
import { Reveal, RevealWords } from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  /** `dark` is for sections that sit on a deep teal wash. */
  tone?: "light" | "dark";
  className?: string;
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "light",
  className,
  id,
}: SectionHeadingProps) {
  const centered = align === "center";
  const dark = tone === "dark";

  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        centered && "items-center text-center",
        className,
      )}
    >
      <Reveal y={12} duration={0.55}>
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[0.72rem] font-semibold tracking-[0.16em] uppercase",
            dark
              ? "border border-white/25 bg-white/10 text-brand-100"
              : "border border-brand-200 bg-white/70 text-brand-700",
          )}
        >
          <motion.span
            aria-hidden
            className={cn(
              "size-1.5 rounded-full",
              dark ? "bg-mint" : "bg-brand-500",
            )}
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: EASE }}
          />
          {eyebrow}
        </span>
      </Reveal>

      <h2
        id={id}
        className={cn(
          "max-w-3xl text-[2rem] leading-[1.08] font-bold sm:text-[2.6rem] lg:text-[3.1rem]",
          centered && "mx-auto",
          dark ? "text-white" : "text-brand-900",
        )}
      >
        <RevealWords text={title} />
      </h2>

      {lead ? (
        <Reveal y={18} delay={0.12}>
          <p
            className={cn(
              "max-w-2xl text-base leading-relaxed sm:text-[1.075rem]",
              centered && "mx-auto",
              dark ? "text-brand-100/85" : "text-ink-soft/85",
            )}
          >
            {lead}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
