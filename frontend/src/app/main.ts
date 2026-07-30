import { BarChart, LineChart, PieChart } from "echarts/charts";
import { GridComponent, LegendComponent, TooltipComponent } from "echarts/components";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { createPinia } from "pinia";
import { createApp } from "vue";
import VChart from "vue-echarts";

import "bootstrap-icons/font/bootstrap-icons.css";
import "animate.css";
import "@/app/main.scss";

import App from "@/app/App.vue";
import router from "@/app/router";
import i18n from "@/shared/i18n";
import { useLanguageStore } from "@/stores/useLanguageStore";

use([
  CanvasRenderer,
  LineChart,
  BarChart,
  PieChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
]);

const app = createApp(App);

app.use(createPinia());
app.use(i18n);
app.use(router);
app.component("VChart", VChart);

useLanguageStore().initLanguage();

router.isReady().then(() => {
  app.mount("#app");
});
