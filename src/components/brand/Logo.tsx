import { cn } from "@/lib/cn";

type LogoMarkProps = {
  className?: string;
  /** Unique gradient id so several marks can share a page. */
  id?: string;
};

/** The medical-cross tile, matching src/app/icon.png. */
export function LogoMark({ className, id = "logo-mark" }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 512 512"
      className={cn("size-10", className)}
      role="img"
      aria-hidden
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#12b3b8" />
          <stop offset="55%" stopColor="#0e8a93" />
          <stop offset="100%" stopColor="#083f45" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="112" fill={`url(#${id})`} />
      <circle cx="150" cy="132" r="150" fill="#ffffff" fillOpacity="0.1" />
      <path d="M221 118h70v103h103v70H291v103h-70V291H118v-70h103z" fill="#ffffff" />
      <g transform="rotate(-32 256 256)" opacity="0.95">
        <rect x="150" y="360" width="212" height="66" rx="33" fill="#8fe6df" />
        <rect x="150" y="360" width="106" height="66" rx="33" fill="#ffffff" />
      </g>
    </svg>
  );
}

type GeneriCartMarkProps = {
  className?: string;
  /** Unique gradient id so several marks can share a page. */
  id?: string;
};

/**
 * The Genericart "G", drawn from the official logo vector
 * (genericartmedicine.com/images/logo.svg) - the blue gradient bowl plus the
 * dark arrow that lifts out of its top right corner.
 *
 * The arrow takes `currentColor`, so it reads dark ink on the light navbar and
 * white on the dark footer, while the bowl keeps the brand gradient.
 */
export function GeneriCartMark({ className, id = "genericart-mark" }: GeneriCartMarkProps) {
  return (
    <svg
      viewBox="1.7713 2.85 38.18 34.16"
      className={className}
      role="img"
      aria-hidden
    >
      <defs>
        <linearGradient
          id={`${id}-bowl`}
          gradientUnits="userSpaceOnUse"
          x1="1.7713"
          y1="21.9393"
          x2="31.9113"
          y2="21.9393"
        >
          <stop offset="0" stopColor="#55beff" />
          <stop offset="1" stopColor="#1994de" />
        </linearGradient>
      </defs>
      {/* Bowl: the open G, filled by the brand gradient. */}
      <path
        d="M31.91 30.98V18.93H17.85v4.02h6.03v6.03c0 2.2-1.78 3.98-3.98 3.98h-6.07c-2.2 0-4.02-1.78-4.02-3.98V14.87c0-2.2 1.78-3.98 3.98-3.98h4.06V6.87H7.8c-3.33 0-6.03 2.7-6.03 6.03v18.08c0 3.33 2.7 6.03 6.03 6.03h18.08c3.33 0 6.03-2.7 6.03-6.03"
        fill={`url(#${id}-bowl)`}
      />
      {/* Arrow breaking out of the top right. */}
      <path
        d="M25.88 2.85v4.02h4.06c1.09 0 1.97.88 1.97 1.97v4.06h8.04V2.85H25.88z"
        fill="currentColor"
      />
    </svg>
  );
}

type LogoProps = {
  /** The second line, e.g. "Swast Aushadi Seva". */
  subtitle?: string;
  tone?: "light" | "dark";
  /** Which mark sits beside the wordmark. */
  mark?: "sana" | "genericart";
  className?: string;
  markClassName?: string;
};

/** Mark plus wordmark, used in the navbar, footer and loader. */
export function Logo({
  subtitle,
  tone = "light",
  mark = "sana",
  className,
  markClassName,
}: LogoProps) {
  const dark = tone === "dark";
  const genericart = mark === "genericart";
  return (
    <span className={cn("flex items-center gap-3", className)}>
      {genericart ? (
        <GeneriCartMark
          className={cn(
            dark ? "text-white" : "text-ink",
            markClassName ?? "h-10 w-auto",
          )}
          id={dark ? "genericart-mark-dark" : "genericart-mark-light"}
        />
      ) : (
        <LogoMark
          className={markClassName}
          id={dark ? "logo-mark-dark" : "logo-mark-light"}
        />
      )}
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.06rem] font-extrabold tracking-tight",
            dark ? "text-white" : "text-brand-900",
          )}
        >
          SANA MEDICAL
        </span>
        {subtitle ? (
          <span
            className={cn(
              "mt-1 text-[0.66rem] font-semibold tracking-[0.14em] uppercase",
              dark ? "text-mint/85" : "text-brand-600",
            )}
          >
            {subtitle}
          </span>
        ) : null}
      </span>
    </span>
  );
}
