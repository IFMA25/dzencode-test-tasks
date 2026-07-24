export const FALLBACK_LOCALE = "en";

export const supportedLocales = (import.meta.env.VITE_SUPPORTED_LOCALE || "en,ru")
  .split(",")
  .map((locale: string) => locale.trim().toLowerCase());

const detectBrowserLocale = (): string => navigator.language?.slice(0, 2).toLowerCase() ?? "";

export const defaultLocale = supportedLocales.includes(detectBrowserLocale())
  ? detectBrowserLocale()
  : FALLBACK_LOCALE;
