"use client";

import { animate, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { LogoMark } from "@/components/brand/Logo";
import { cn } from "@/lib/cn";
import { useLanguage } from "@/lib/i18n";
import { EASE } from "@/lib/motion";
import { STORE } from "@/lib/site";

const SESSION_KEY = "sana-medical:visited";
const NAME = "SANA MEDICAL";
/** Must outlast the curtain slide: 0.1s delay + 0.78s animation. */
const CURTAIN_MS = 1000;
const RING_RADIUS = 66;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

type Phase = "loading" | "closing" | "gone";

/** Eight sparks that fly out of the ring the moment it completes. */
const SPARKS = Array.from({ length: 10 }, (_, index) => {
  const angle = (index / 10) * Math.PI * 2;
  return {
    id: index,
    x: Math.cos(angle) * 132,
    y: Math.sin(angle) * 132,
    delay: index * 0.015,
  };
});

/** Decorative capsules drifting behind the counter. */
const FLOATERS = [
  { className: "top-[14%] left-[12%] h-14 w-5 rotate-[24deg]", delay: "-1.5s" },
  { className: "top-[68%] left-[18%] h-10 w-10 rotate-[8deg]", delay: "-4s" },
  { className: "top-[22%] right-[14%] h-16 w-6 rotate-[-18deg]", delay: "-2.5s" },
  { className: "bottom-[18%] right-[20%] h-11 w-11 rotate-[32deg]", delay: "-6s" },
];

export function Loader({ onReveal }: { onReveal: () => void }) {
  const { t } = useLanguage();
  const [phase, setPhase] = useState<Phase>("loading");
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [bursting, setBursting] = useState(false);
  const closingStarted = useRef(false);

  // Held in a ref so `startClosing` can stay dependency-free while still
  // calling the latest callback.
  const onRevealRef = useRef(onReveal);
  useEffect(() => {
    onRevealRef.current = onReveal;
  }, [onReveal]);

  const startClosing = useCallback(() => {
    if (closingStarted.current) return;
    closingStarted.current = true;
    setPhase("closing");
    // Fire the reveal as the curtains begin to part, so the hero animates up
    // from behind them rather than after them.
    onRevealRef.current();
  }, []);

  // Drive the progress bar, then hand over to the closing sequence.
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let returning = false;
    try {
      returning = window.sessionStorage.getItem(SESSION_KEY) === "1";
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // Private mode - just always play the full version.
    }

    // Returning visitors and reduced-motion users get a shorter greeting.
    const quick = prefersReduced || returning;
    const duration = quick ? 0.9 : 1.9;
    const beat = quick ? 140 : 420;

    let timer = 0;

    const controls = animate(0, 100, {
      duration,
      ease: EASE,
      onUpdate: (latest) => setProgress(Math.round(latest)),
      onComplete: () => {
        setBursting(true);
        timer = window.setTimeout(startClosing, beat);
      },
    });

    return () => {
      controls.stop();
      window.clearTimeout(timer);
    };
  }, [startClosing]);

  // Once the curtains have parted, unmount the overlay. This is what releases
  // the page: until it happens the loader still covers the viewport and would
  // swallow every click and block scrolling.
  useEffect(() => {
    if (phase !== "closing") return;
    const id = window.setTimeout(() => setPhase("gone"), CURTAIN_MS);
    return () => window.clearTimeout(id);
  }, [phase]);

  // Cycle the status line while the ring fills.
  useEffect(() => {
    if (phase !== "loading") return;
    const id = window.setInterval(
      () => setStatusIndex((index) => (index + 1) % t.loader.statuses.length),
      520,
    );
    return () => window.clearInterval(id);
  }, [phase, t.loader.statuses.length]);

  // The page behind must not scroll while the curtain is down.
  useEffect(() => {
    if (phase === "gone") return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [phase]);

  if (phase === "gone") return null;

  const closing = phase === "closing";

  return (
    <div
      data-loader
      role="progressbar"
      aria-label={t.a11y.loading}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
      // While the panels slide away nothing should be clickable through them.
      style={closing ? { pointerEvents: "none" } : undefined}
      className="fixed inset-0 z-100"
    >
      {/* ---------------------------------------------------------------- */}
      {/* Curtain: two halves of a teal panel that part down the middle.     */}
      {/* ---------------------------------------------------------------- */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-x-0 top-0 h-[50.5%] bg-gradient-to-b from-brand-950 via-brand-800 to-brand-700"
          initial={{ y: 0 }}
          animate={{ y: closing ? "-101%" : 0 }}
          transition={{ duration: 0.78, ease: EASE, delay: closing ? 0.1 : 0 }}
        />
        <motion.div
          className="absolute inset-x-0 bottom-0 h-[50.5%] bg-gradient-to-t from-brand-950 via-brand-800 to-brand-700"
          initial={{ y: 0 }}
          animate={{ y: closing ? "101%" : 0 }}
          transition={{ duration: 0.78, ease: EASE, delay: closing ? 0.1 : 0 }}
        />
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Texture and drifting capsules                                      */}
      {/* ---------------------------------------------------------------- */}
      <div
        aria-hidden
        className="cross-grid absolute inset-0 opacity-[0.16] mix-blend-overlay"
      />
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/4 size-[26rem] animate-blob rounded-full bg-brand-400/25 blur-3xl" />
        <div className="absolute right-1/4 bottom-0 size-[22rem] animate-blob rounded-full bg-mint/15 blur-3xl [animation-delay:-7s]" />
        <div className="absolute top-1/3 left-1/2 size-[18rem] -translate-x-1/2 animate-float-slow rounded-full bg-gold/10 blur-3xl" />
        {FLOATERS.map((floater) => (
          <span
            key={floater.className}
            style={{ animationDelay: floater.delay }}
            className={cn(
              "absolute animate-float rounded-full border border-white/15 bg-white/10 backdrop-blur-sm",
              floater.className,
            )}
          />
        ))}
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Content                                                            */}
      {/* ---------------------------------------------------------------- */}
      <motion.div
        className="relative z-10 grid h-full place-items-center px-6"
        animate={
          closing ? { opacity: 0, y: -18, scale: 0.97 } : { opacity: 1, y: 0, scale: 1 }
        }
        transition={{ duration: 0.3, ease: EASE }}
      >
        <div className="flex w-full max-w-md flex-col items-center gap-6 text-center">
          {/* Ring + mark + completion sparks */}
          <div className="relative grid size-[164px] place-items-center">
            <svg
              aria-hidden
              viewBox="0 0 164 164"
              className="absolute inset-0 size-full -rotate-90"
            >
              <defs>
                <linearGradient id="loader-ring" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#8fe6df" />
                  <stop offset="60%" stopColor="#2fc6c6" />
                  <stop offset="100%" stopColor="#f5a524" />
                </linearGradient>
              </defs>
              <circle
                cx="82"
                cy="82"
                r={RING_RADIUS}
                fill="none"
                stroke="rgba(255,255,255,0.14)"
                strokeWidth="3"
              />
              <circle
                cx="82"
                cy="82"
                r={RING_RADIUS}
                fill="none"
                stroke="url(#loader-ring)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={RING_CIRCUMFERENCE}
                strokeDashoffset={
                  RING_CIRCUMFERENCE * (1 - Math.min(progress, 100) / 100)
                }
              />
            </svg>

            {SPARKS.map((spark) => (
              <motion.span
                key={spark.id}
                aria-hidden
                className="absolute size-1.5 rounded-full bg-mint"
                initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
                animate={
                  bursting
                    ? { x: spark.x, y: spark.y, opacity: 0, scale: 0.2 }
                    : { x: 0, y: 0, opacity: 0, scale: 0.5 }
                }
                transition={{ duration: 0.8, ease: EASE, delay: spark.delay }}
              />
            ))}

            <motion.div
              className="relative grid place-items-center"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            >
              <motion.span
                aria-hidden
                className="absolute size-16 rounded-3xl bg-mint/25 blur-xl"
                animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
              <LogoMark className="relative size-14 rounded-2xl" />
            </motion.div>
          </div>

          {/* Wordmark, letter by letter */}
          <p
            aria-label={NAME}
            className="font-display text-[1.7rem] leading-none font-extrabold tracking-tight text-white sm:text-[2.05rem]"
          >
            {NAME.split("").map((letter, index) => (
              <motion.span
                key={`${letter}-${index}`}
                aria-hidden
                className="inline-block"
                initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.7,
                  ease: EASE,
                  delay: 0.22 + index * 0.042,
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </p>

          {/* Shop's own Marathi line, with a light sweeping across it */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="font-marathi relative -mt-3 text-[0.98rem] font-semibold text-brand-100"
          >
            <span className="relative z-10">{t.loader.brandSub}</span>
            <span
              aria-hidden
              className="animate-shimmer absolute inset-0 bg-[linear-gradient(100deg,transparent_20%,rgba(255,255,255,0.85)_50%,transparent_80%)] bg-[length:250%_100%] bg-clip-text text-transparent"
            >
              {t.loader.brandSub}
            </span>
          </motion.p>

          {/* Percentage */}
          <div className="flex items-baseline gap-1 font-display tabular-nums">
            <motion.span
              className="text-4xl font-bold text-white"
              animate={{ scale: bursting ? 1.12 : 1 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              {progress}
            </motion.span>
            <span className="text-lg font-semibold text-brand-200">%</span>
          </div>

          {/* Cycling status line */}
          <div className="h-6 overflow-hidden">
            <motion.p
              key={statusIndex}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="text-sm font-medium tracking-wide text-brand-100/80"
            >
              {t.loader.statuses[statusIndex]}…
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Footer of the curtain */}
      <motion.div
        className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center gap-1.5 px-6 pb-9 text-center"
        animate={closing ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        <p className="max-w-md text-[0.78rem] leading-relaxed text-brand-100/70">
          {t.loader.tip}
        </p>
        <p className="text-[0.7rem] font-semibold tracking-[0.22em] text-brand-200/70 uppercase">
          {STORE.branch} · {STORE.descriptor}
        </p>
      </motion.div>
    </div>
  );
}
