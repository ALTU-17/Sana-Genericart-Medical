"use client";

import { motion } from "framer-motion";
import { Languages } from "lucide-react";
import { cn } from "@/lib/cn";
import { useLanguage, type Lang } from "@/lib/i18n";

const OPTIONS: { id: Lang; label: string }[] = [
  { id: "en", label: "EN" },
  { id: "mr", label: "मराठी" },
];

type LanguageToggleProps = {
  tone?: "light" | "dark";
  /**
   * Layout only. The base class sets `inline-flex`, which outranks a `hidden`
   * utility from here - hide a wrapper element instead.
   */
  className?: string;
};

/** Two-segment switch with a spring-loaded indicator that slides between them. */
export function LanguageToggle({ tone = "light", className }: LanguageToggleProps) {
  const { lang, setLang, t } = useLanguage();
  const dark = tone === "dark";

  return (
    <div
      role="group"
      aria-label={t.a11y.toggleLanguage}
      title={t.nav.languageHint}
      className={cn(
        "relative inline-flex items-center gap-0.5 rounded-full p-1",
        dark
          ? "border border-white/20 bg-white/10 backdrop-blur-md"
          : "border border-brand-200/80 bg-white/75 backdrop-blur-md",
        className,
      )}
    >
      <Languages
        aria-hidden
        className={cn(
          "ml-1.5 size-3.5 shrink-0",
          dark ? "text-mint" : "text-brand-500",
        )}
      />
      {OPTIONS.map((option) => {
        const active = lang === option.id;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => setLang(option.id)}
            aria-pressed={active}
            className={cn(
              "relative rounded-full px-3 py-1.5 text-[0.78rem] font-bold transition-colors",
              active
                ? dark
                  ? "text-brand-900"
                  : "text-white"
                : dark
                  ? "text-brand-100/75 hover:text-white"
                  : "text-brand-700/75 hover:text-brand-800",
            )}
          >
            {active ? (
              <motion.span
                layoutId="language-indicator"
                className={cn(
                  "absolute inset-0 rounded-full",
                  dark ? "bg-mint" : "bg-brand-600",
                )}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            ) : null}
            <span className="relative">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
