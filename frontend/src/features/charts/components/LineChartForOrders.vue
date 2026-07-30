<script setup lang="ts">
import type { EChartsOption } from "echarts";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import ChartCard from "./ChartCard.vue";
import { chartColors, chartSeriesColors } from "../variables/chartColors";

import type { AnalyticsData } from "@/shared/types";
import VSkeleton from "@/shared/ui/base/VSkeleton.vue";

const SKELETON_COUNT = 5;
const SKELETON_HEIGHT = "2.5rem";

const {
  data = [],
  loading = false,
  hasError = false,
} = defineProps<{
  data?: AnalyticsData["ordersByPeriod"];
  loading?: boolean;
  hasError?: boolean;
}>();

const { t } = useI18n();

const option = computed<EChartsOption>(() => ({
  grid: { left: "3%", right: "3%", top: 24, bottom: 8, containLabel: true },
  tooltip: {
    trigger: "axis",
    axisPointer: { type: "line" },
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: data.map((item) => item.period),
    axisTick: { show: false },
    axisLine: { lineStyle: { color: chartColors.axisLine } },
    axisLabel: { color: chartColors.axisLabel },
  },
  yAxis: {
    type: "value",
    minInterval: 1,
    axisLine: { show: false },
    axisLabel: { color: chartColors.axisLabel },
    splitLine: { lineStyle: { color: chartColors.splitLine } },
  },
  series: [
    {
      name: t("orders"),
      type: "line",
      smooth: true,
      symbol: "circle",
      symbolSize: 8,
      itemStyle: { color: chartSeriesColors[0] },
      lineStyle: { color: chartSeriesColors[0], width: 2 },
      data: data.map((item) => item.count),
    },
  ],
}));
</script>

<template>
  <ChartCard
    :title="t('chartOrdersByPeriod')"
    :empty-name="t('orders')"
    :loading="loading"
    :has-error="hasError"
    :is-empty="!data.length"
  >
    <template #skeleton>
      <div class="d-flex flex-column justify-content-between flex-grow-1">
        <VSkeleton v-for="line in SKELETON_COUNT" :key="line" :height="SKELETON_HEIGHT" />
      </div>
    </template>

    <VChart class="w-100 flex-grow-1" :option="option" autoresize />
  </ChartCard>
</template>
