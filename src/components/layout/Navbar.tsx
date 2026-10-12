"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { LanguageToggle } from "@/components/brand/LanguageToggle";
import { Logo } from "@/components/brand/Logo";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/cn";
import { useLanguage } from "@/lib/i18n";
import { useIntro } from "@/lib/intro";
import { EASE } from "@/lib/motion";
import { STORE, STORE_PHONE, telLink, whatsappLink } from "@/lib/site";

export function Navbar() {
  const { t } = useLanguage();
  const { revealed } = useIntro();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 28);
  });

  // Highlight the section the visitor is actually looking at.
  useEffect(() => {
    const sections = t.nav.items
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((element): element is HTMLElement => Boolean(element));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (best) setActive(best.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.15, 0.4, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [t.nav.items]);

  // Lock the page while the mobile drawer is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const orderMessage = t.order.message;

  return (
    <>
      <motion.header
        data-animate
        initial={{ y: -120 }}
        animate={{ y: revealed ? 0 : -120 }}
        transition={{ duration: 0.8, ease: EASE, delay: revealed ? 0.15 : 0 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        {/* How far down the page the visitor has read. */}
        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className="h-0.5 origin-left bg-gradient-to-r from-brand-400 via-brand-500 to-gold"
        />

        <div className="px-3 pt-3 sm:px-5 sm:pt-4">
          <nav
            aria-label="Main"
            // Solid white at every scroll position, hero included - nothing
            // behind the bar (hero glow, the marquee, photos) may tint the
            // links or the logo. The gold accent bar above stays the header's
            // only scroll feedback.
            className="mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-[1.65rem] border border-white/85 bg-white px-3 py-2.5 shadow-[0_18px_40px_-24px_rgba(4,37,42,0.45)] sm:px-4"
          >
            <a
              href="#home"
              className="shrink-0 rounded-2xl"
              aria-label={`${t.nav.items[0].label} - Sana Medical`}
            >
              <Logo
                subtitle={STORE.tagline}
                mark="genericart"
                markClassName={cn(
                  "transition-all duration-500",
                  scrolled ? "h-9 w-auto" : "h-10 w-auto",
                )}
              />
            </a>

            <ul className="hidden items-center gap-0.5 xl:flex">
              {t.nav.items.map((item) => {
                const isActive = active === item.href.slice(1);
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative block rounded-full px-3.5 py-2 text-[0.875rem] font-semibold whitespace-nowrap transition-colors",
                        isActive
                          ? "text-brand-800"
                          : "text-ink-soft/75 hover:text-brand-700",
                      )}
                    >
                      {isActive ? (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 rounded-full bg-brand-50 ring-1 ring-brand-200/70"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      ) : null}
                      <span className="relative">{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              {/* Visibility lives on the wrapper: the toggle's own `inline-flex`
                  would otherwise beat a `hidden` utility of equal specificity. */}
              <span className="hidden sm:inline-flex">
                <LanguageToggle />
              </span>

              <a
                href={telLink(STORE_PHONE.e164)}
                className="hidden size-10 place-items-center rounded-full border border-brand-200/80 bg-white/70 text-brand-700 transition-colors hover:bg-white hover:text-brand-800 xl:grid"
                aria-label={t.hero.ctaCall}
                title={STORE_PHONE.display}
              >
                <Phone className="size-4" />
              </a>

              <span className="hidden md:inline-flex">
                <MagneticButton
                  href={whatsappLink(STORE_PHONE.wa, orderMessage)}
                  external
                  variant="primary"
                  icon={<MessageCircle className="size-4" />}
                  className="!px-5 !py-2.5 !text-[0.85rem]"
                >
                  {t.nav.orderCta}
                </MagneticButton>
              </span>

              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label={t.a11y.openMenu}
                className="grid size-10 place-items-center rounded-full border border-brand-200/80 bg-white/70 text-brand-800 transition-colors hover:bg-white xl:hidden"
              >
                <Menu className="size-5" />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-60 xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              type="button"
              aria-label={t.a11y.closeMenu}
              onClick={() => setOpen(false)}
              className="absolute inset-0 cursor-default bg-brand-950/45 backdrop-blur-sm"
            />

            <motion.div
              initial={{ y: "-102%" }}
              animate={{ y: 0 }}
              exit={{ y: "-102%" }}
              transition={{ duration: 0.55, ease: EASE }}
              className="absolute inset-x-0 top-0 rounded-b-[2rem] border-b border-white/80 bg-white/95 px-5 pt-5 pb-7 shadow-[0_30px_60px_-30px_rgba(4,37,42,0.5)] backdrop-blur-2xl"
            >
              <div className="flex items-center justify-between">
                <Logo subtitle={STORE.tagline} mark="genericart" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={t.a11y.closeMenu}
                  className="grid size-10 place-items-center rounded-full border border-brand-200 bg-white text-brand-800"
                >
                  <X className="size-5" />
                </button>
              </div>

              <ul className="mt-6 flex flex-col gap-1">
                {t.nav.items.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + index * 0.05, ease: EASE }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-[1.02rem] font-semibold text-brand-900 transition-colors hover:bg-brand-50"
                    >
                      {item.label}
                      <span className="font-mono text-[0.7rem] text-brand-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-5 flex flex-col gap-3">
                <LanguageToggle className="self-start" />
                <MagneticButton
                  href={whatsappLink(STORE_PHONE.wa, orderMessage)}
                  external
                  variant="primary"
                  icon={<MessageCircle className="size-4" />}
                  fullWidth
                >
                  {t.nav.orderCta}
                </MagneticButton>
                <MagneticButton
                  href={telLink(STORE_PHONE.e164)}
                  variant="outline"
                  icon={<Phone className="size-4" />}
                  fullWidth
                >
                  {STORE_PHONE.display}
                </MagneticButton>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
