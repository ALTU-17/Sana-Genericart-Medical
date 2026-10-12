"use client";

import { Award, BadgePercent, Clock, IdCard, ShieldCheck, Store, Truck } from "lucide-react";
import { Marquee } from "@/components/ui/Marquee";
import { useLanguage } from "@/lib/i18n";
import { STORE } from "@/lib/site";

const ICONS = [ShieldCheck, BadgePercent, Truck, Store, Clock, Award, IdCard];

export function TrustMarquee() {
  const { t } = useLanguage();

  return (
    <section
      aria-label={STORE.legalName}
      className="relative z-10 border-y border-brand-100 bg-white/80 py-5 backdrop-blur-sm"
    >
      <Marquee>
        {t.marquee.items.map((item, index) => {
          const Icon = ICONS[index % ICONS.length];
          return (
            <span
              key={item}
              className="flex items-center gap-2.5 px-5 text-[0.82rem] font-semibold tracking-tight text-brand-800/85 sm:text-[0.88rem]"
            >
              <Icon className="size-4 shrink-0 text-brand-500" aria-hidden />
              <span className="whitespace-nowrap">{item}</span>
              <span aria-hidden className="ml-4 h-1.5 w-1.5 rounded-full bg-mint" />
            </span>
          );
        })}
      </Marquee>
    </section>
  );
}
