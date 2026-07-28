<script setup lang="ts">
import { computed } from "vue";

import { isSupportedLocale, supportedLocales } from "@/shared/i18n/config/locale";
import VSelect from "@/shared/ui/VSelect.vue";
import { useLanguageStore } from "@/stores/useLanguageStore";

const localeLabels: Record<string, string> = {
  en: "EN",
  ru: "RU",
};

const language = useLanguageStore();

const localeOptions = computed(() =>
  supportedLocales.map((locale: string) => ({
    key: locale,
    label: localeLabels[locale],
  })),
);

const modelLang = computed({
  get: () => language.currentLang,
  set: (value: string) => {
    if (isSupportedLocale(value)) language.setLanguage(value);
  },
});
</script>

<template>
  <VSelect
    id="language-switcher"
    v-model="modelLang"
    :options="localeOptions"
    label="label"
    track-by="key"
    :close-on-select="true"
    size="sm"
  />
</template>
