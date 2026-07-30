import { defineStore } from "pinia";
import { ref } from "vue";

import { STORAGE_KEYS } from "@/shared/constants";
import i18n from "@/shared/i18n";
import {
  defaultLocale,
  isSupportedLocale,
  normalizeLocale,
  type Locale,
} from "@/shared/i18n/config/locale";
import { getStorageItem, setStorageItem } from "@/shared/utils/webStorage";

export const useLanguageStore = defineStore("language", () => {
  const currentLang = ref<Locale>(defaultLocale);

  const setLanguage = (lang: Locale) => {
    currentLang.value = lang;
    i18n.global.locale.value = lang;
    setStorageItem(STORAGE_KEYS.lang, lang);
    document.querySelector("html")?.setAttribute(STORAGE_KEYS.lang, lang);
  };

  const initLanguage = () => {
    const savedLang = getStorageItem(STORAGE_KEYS.lang);
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
