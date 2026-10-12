"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { ArrowUp, MessageCircle, Navigation, Phone } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { useIntro } from "@/lib/intro";
import { EASE } from "@/lib/motion";
import { MAPS, OWNER, STORE_PHONE, telLink, whatsappLink } from "@/lib/site";

/**
 * Sticky actions that appear once the visitor has left the hero:
 * a wide WhatsApp bar on phones, a compact glass stack on larger screens.
 */
export function FloatingDock() {
  const { t } = useLanguage();
  const { revealed } = useIntro();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 520);
  });

  const show = revealed && visible;
  const ordered = whatsappLink(OWNER.phone.wa, t.order.message);

  return (
    <>
      {/* Phones: two thumb-sized actions along the bottom edge */}
      <AnimatePresence>
        {show ? (
          <motion.div
            initial={{ y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 90, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="fixed inset-x-4 bottom-4 z-40 flex gap-2.5 md:hidden"
          >
            <a
              href={ordered}
              target="_blank"
              rel="noreferrer noopener"
              className="glass-strong flex flex-1 items-center justify-center gap-2 rounded-2xl py-3.5 text-[0.88rem] font-bold text-brand-800"
            >
              <MessageCircle className="size-4 text-emerald-600" />
              {t.common.whatsapp}
            </a>
            <a
              href={telLink(STORE_PHONE.e164)}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-brand-600 py-3.5 text-[0.88rem] font-bold text-white shadow-[0_18px_38px_-16px_rgba(11,109,118,0.85)]"
            >
              <Phone className="size-4" />
              {t.nav.callCta}
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Larger screens: a vertical glass stack that widens on hover */}
      <AnimatePresence>
        {show ? (
          <motion.div
            initial={{ x: 90, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 90, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed right-5 bottom-6 z-40 hidden flex-col items-end gap-2.5 md:flex"
          >
            <DockAction
              href={MAPS.directions}
              external
              icon={<Navigation className="size-4.5" />}
              label={t.common.directions}
              tone="glass"
            />
            <DockAction
              href={telLink(STORE_PHONE.e164)}
              icon={<Phone className="size-4.5" />}
              label={STORE_PHONE.display}
              tone="glass"
            />
            <DockAction
              href={ordered}
              external
              icon={<MessageCircle className="size-4.5" />}
              label={t.common.whatsapp}
              tone="whatsapp"
            />
            <DockAction
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              icon={<ArrowUp className="size-4.5" />}
              label={t.a11y.backToTop}
              tone="dark"
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function DockAction({
  href,
  onClick,
  icon,
  label,
  tone,
  external,
}: {
  href?: string;
  onClick?: () => void;
  icon: React.ReactNode;
  label: string;
  tone: "glass" | "whatsapp" | "dark";
  external?: boolean;
}) {
  const tones = {
    glass: "glass-strong text-brand-800",
    whatsapp: "bg-emerald-500 text-white shadow-[0_16px_32px_-14px_rgba(16,185,129,0.9)]",
    dark: "bg-brand-900 text-white",
  } as const;

  const shared = {
    className: `group flex items-center gap-0 rounded-full py-3 pl-3 pr-3 overflow-hidden transition-all duration-300 hover:gap-2 hover:pr-5 focus-visible:outline-2 focus-visible:outline-offset-3 ${tones[tone]}`,
  };

  const inner = (
    <>
      <span className="shrink-0">{icon}</span>
      <span className="max-w-0 overflow-hidden text-[0.82rem] font-bold whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-56 group-hover:opacity-100">
        {label}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        {...shared}
        href={href}
        aria-label={label}
        {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      >
        {inner}
      </a>
    );
  }

  return (
    <button {...shared} type="button" onClick={onClick} aria-label={label}>
      {inner}
    </button>
  );
}
