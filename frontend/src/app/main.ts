import { createPinia } from "pinia";
import { createApp } from "vue";

import "bootstrap-icons/font/bootstrap-icons.css";
import "animate.css";
import "@/app/main.scss";

import App from "@/app/App.vue";
import router from "@/app/router";
import { useLanguageStore } from "@/features/translation/store/useLanguageStore";
import i18n from "@/shared/i18n";

const app = createApp(App);

app.use(createPinia());
app.use(i18n);
app.use(router);

useLanguageStore().initLanguage();

router.isReady().then(() => {
  app.mount("#app");
});
