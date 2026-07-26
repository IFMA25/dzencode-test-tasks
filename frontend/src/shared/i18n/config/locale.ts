import en from "../locales/en.json";
import ru from "../locales/ru.json";

export const messages = { en, ru };

export type Locale = keyof typeof messages;

export const FALLBACK_LOCALE: Locale = "en";

export const supportedLocales = Object.keys(messages) as Locale[];

const detectBrowserLocale = (): string => navigator.language?.slice(0, 2).toLowerCase() ?? "";

export const isSupportedLocale = (value: string): value is Locale =>
  supportedLocales.includes(value as Locale);

export const defaultLocale: Locale = isSupportedLocale(detectBrowserLocale())
  ? (detectBrowserLocale() as Locale)
  : FALLBACK_LOCALE;
