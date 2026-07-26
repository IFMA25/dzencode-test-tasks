<script setup lang="ts">
import { computed } from "vue";

import { useLanguageStore } from "@/features/translation/store/useLanguageStore";
import { isSupportedLocale, supportedLocales } from "@/shared/i18n/config/locale";
import VSelect from "@/shared/ui/VSelect.vue";

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
</script>

<template>
  <VSelect
    id="language-switcher"
    v-model="language.currentLang"
    :options="localeOptions"
    label="label"
    track-by="key"
    :close-on-select="true"
    size="sm"
    @update:model-value="(value: string) => isSupportedLocale(value) && language.setLanguage(value)"
  />
</template>
