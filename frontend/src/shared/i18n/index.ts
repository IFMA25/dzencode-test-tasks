import { createI18n } from "vue-i18n";

import { defaultLocale } from "./config/locale";
import en from "./locales/en.json";
import ru from "./locales/ru.json";

export default createI18n({
  locale: defaultLocale,
  legacy: false,
  globalInjection: true,
  messages: { en, ru },
});
