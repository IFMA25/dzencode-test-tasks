import en from "../locales/en.json";
import ru from "../locales/ru.json";

export const FALLBACK_LOCALE: Locale = "en";
export const messages = { en, ru };

export type Locale = keyof typeof messages;

export const supportedLocales = Object.keys(messages) as Locale[];

export const normalizeLocale = (raw: string): string => raw.toLowerCase().split("-")[0];

const browserLocale = normalizeLocale(navigator.language ?? "");

export const isSupportedLocale = (value: string): value is Locale =>
  supportedLocales.includes(value as Locale);

export const defaultLocale: Locale = isSupportedLocale(browserLocale)
  ? browserLocale
  : FALLBACK_LOCALE;
