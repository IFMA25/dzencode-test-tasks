import { createPinia } from "pinia";
import { createApp } from "vue";

import "bootstrap-icons/font/bootstrap-icons.css";
import "animate.css";
import "@/app/main.scss";

import App from "@/app/App.vue";
import i18n from "@/shared/i18n";

const app = createApp(App);

app.use(createPinia());
app.use(i18n);

app.mount("#app");
