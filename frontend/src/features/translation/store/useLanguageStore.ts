import { defineStore } from "pinia";
import { ref } from "vue";

import i18n from "@/shared/i18n";
import { defaultLocale, isSupportedLocale, type Locale } from "@/shared/i18n/config/locale";

const normalizeLocale = (raw: string) => raw.toLowerCase().split("-")[0];

export const useLanguageStore = defineStore("language", () => {
  const currentLang = ref<Locale>(defaultLocale);

  const setLanguage = (lang: Locale) => {
    currentLang.value = lang;
    i18n.global.locale.value = lang;
    localStorage.setItem("lang", lang);
    document.querySelector("html")?.setAttribute("lang", lang);
  };

  const initLanguage = () => {
    const savedLang = localStorage.getItem("lang");
    const normalizedSavedLang = savedLang ? normalizeLocale(savedLang) : "";
    if (isSupportedLocale(normalizedSavedLang)) {
      setLanguage(normalizedSavedLang);
      return;
    }

    const browserLang = normalizeLocale(window.navigator.language);
    if (isSupportedLocale(browserLang)) {
      setLanguage(browserLang);
      return;
    }

    setLanguage(defaultLocale);
  };

  return { currentLang, setLanguage, initLanguage };
});
