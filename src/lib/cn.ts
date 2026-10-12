export type ClassValue = string | false | null | undefined;

/** Join class names, dropping anything falsy. */
export function cn(...values: ClassValue[]) {
  return values.filter(Boolean).join(" ");
}
