import { createI18n } from "vue-i18n";

import { defaultLocale, messages } from "./config/locale";

export default createI18n({
  locale: defaultLocale,
  legacy: false,
  globalInjection: true,
  messages,
});
