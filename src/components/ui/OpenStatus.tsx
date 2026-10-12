"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { getStoreStatus, type StoreStatus } from "@/lib/hours";
import { interpolate, useLanguage } from "@/lib/i18n";

type OpenStatusProps = {
  tone?: "light" | "dark";
  size?: "sm" | "md";
  className?: string;
  /** Adds the closing / reopening detail after the status word. */
  detailed?: boolean;
};

/**
 * Live open/closed pill.
 *
 * The status starts as `null` so the prerendered HTML is identical to the first
 * client render - the real answer is filled in on mount, then refreshed every
 * 30 seconds. That keeps hydration clean while still being accurate.
 */
export function OpenStatus({
  tone = "light",
  size = "md",
  className,
  detailed = true,
}: OpenStatusProps) {
  const { t } = useLanguage();
  const [status, setStatus] = useState<StoreStatus | null>(null);

  useEffect(() => {
    const tick = () => setStatus(getStoreStatus());
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  const open = status?.open ?? null;
  const dark = tone === "dark";

  const label = open === null ? t.visit.hoursTitle : open ? t.visit.openNow : t.visit.closedNow;
  const detail =
    open === null ? "" : open ? t.visit.closesAt : t.visit.reopensAt;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border font-semibold whitespace-nowrap",
        size === "sm" ? "px-3.5 py-1.5 text-[0.76rem]" : "px-4 py-2 text-sm",
        dark
          ? "border-white/25 bg-white/10 text-white backdrop-blur-md"
          : "border-brand-200/80 bg-white/75 text-brand-800 backdrop-blur-md",
        className,
      )}
    >
      <span className="relative flex size-2.5 shrink-0 items-center justify-center">
        {open ? (
          <motion.span
            className="absolute inset-0 rounded-full bg-emerald-400"
            animate={{ scale: [1, 2.1], opacity: [0.65, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        ) : null}
        <span
          className={cn(
            "relative size-2.5 rounded-full",
            open === null
              ? dark
                ? "bg-white/50"
                : "bg-brand-300"
              : open
                ? "bg-emerald-500"
                : "bg-coral",
          )}
        />
      </span>
      <span>{label}</span>
      {detailed && detail ? (
        <>
          <span className={dark ? "text-white/35" : "text-brand-900/25"}>·</span>
          <span className={cn("font-medium", dark ? "text-brand-100/85" : "text-ink-soft/75")}>
            {detail}
          </span>
        </>
      ) : null}
      {status ? (
        <span className="sr-only">
          {interpolate(t.visit.nowLabel, { time: status.clock })}
        </span>
      ) : null}
    </span>
  );
}
