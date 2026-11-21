/**
 * Lightweight class name utility — merges conditional class strings.
 * Drop-in without clsx/tailwind-merge dependency for now.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
