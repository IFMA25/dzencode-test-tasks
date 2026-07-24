import { createPinia } from "pinia";
import { createApp } from "vue";

import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import "@/app/main.scss";

import App from "@/app/App.vue";

const app = createApp(App);

app.use(createPinia());
app.mount("#app");
