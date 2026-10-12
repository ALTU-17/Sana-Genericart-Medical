import { cn } from "@/lib/cn";

type AnimatedBackgroundProps = {
  /** `dark` for the deep teal sections. */
  tone?: "light" | "dark";
  /** Adds the faint repeating medical-cross texture. */
  crosses?: boolean;
  className?: string;
  /** Reduce the orb opacity where content sits directly on top. */
  subtle?: boolean;
};

/**
 * Decorative drifting orbs.
 *
 * Deliberately built from CSS animations rather than motion values: it is a
 * background, so it costs nothing on the main thread and never fights the
 * scroll. Pure CSS also means the reduced-motion media query in globals.css
 * freezes it automatically.
 */
export function AnimatedBackground({
  tone = "light",
  crosses = true,
  className,
  subtle,
}: AnimatedBackgroundProps) {
  const dark = tone === "dark";

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {crosses ? (
        <div className="cross-grid absolute inset-0 opacity-60" />
      ) : null}

      <div
        className={cn(
          "absolute -top-32 -left-24 size-[26rem] rounded-full blur-3xl animate-blob",
          dark ? "bg-brand-400/25" : "bg-brand-300/50",
          subtle && "opacity-60",
        )}
      />
      <div
        className={cn(
          "absolute top-1/3 -right-28 size-[30rem] rounded-full blur-3xl animate-blob [animation-delay:-6s]",
          dark ? "bg-mint/20" : "bg-mint/55",
          subtle && "opacity-60",
        )}
      />
      <div
        className={cn(
          "absolute -bottom-40 left-1/4 size-[24rem] rounded-full blur-3xl animate-blob [animation-delay:-11s]",
          dark ? "bg-brand-300/20" : "bg-brand-200/45",
          subtle && "opacity-50",
        )}
      />
      <div
        className={cn(
          "absolute top-1/2 left-1/2 size-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl animate-float-slow",
          dark ? "bg-gold/10" : "bg-gold-soft/35",
        )}
      />
    </div>
  );
}
