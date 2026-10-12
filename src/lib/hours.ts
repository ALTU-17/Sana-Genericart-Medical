import { HOURS } from "./site";

export type StoreStatus = {
  /** True when the shop is open right now in India Standard Time. */
  open: boolean;
  /** Minutes since midnight, IST. */
  minutes: number;
  /** 0 = Monday ... 6 = Sunday, IST. */
  dayIndex: number;
  /** e.g. "10:24 pm" */
  clock: string;
};

const WEEKDAY_INDEX: Record<string, number> = {
  Mon: 0,
  Tue: 1,
  Wed: 2,
  Thu: 3,
  Fri: 4,
  Sat: 5,
  Sun: 6,
};

/**
 * Work out whether the shop is open, using the visitor's clock but the shop's
 * timezone, so a customer browsing from abroad still sees the right answer.
 */
export function getStoreStatus(now: Date = new Date()): StoreStatus {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: HOURS.timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    weekday: "short",
  }).formatToParts(now);

  const pick = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  const hour = Number(pick("hour")) % 24;
  const minute = Number(pick("minute"));
  const minutes = hour * 60 + minute;
  const dayIndex = WEEKDAY_INDEX[pick("weekday")] ?? 0;

  const opens = HOURS.opens * 60;
  const closes = HOURS.closes * 60;

  return {
    open: minutes >= opens && minutes < closes,
    minutes,
    dayIndex,
    clock: formatClock(hour, minute),
  };
}

/** "10:24 pm" - independent of the visitor's locale. */
export function formatClock(hour24: number, minute: number) {
  const suffix = hour24 >= 12 ? "pm" : "am";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12}:${String(minute).padStart(2, "0")} ${suffix}`;
}

/**
 * The last slot a customer can walk in for, as a label:
 * hours 13 -> "1 pm". Used in the "closes at" line.
 */
export function hourLabel(hour24: number) {
  const suffix = hour24 >= 12 ? "pm" : "am";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12} ${suffix}`;
}
