<script setup lang="ts">
import type { EChartsOption } from "echarts";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import ChartCard from "./ChartCard.vue";
import { CHART_COLORS, CHART_SERIES_COLORS } from "../variables/chartColors";

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
    axisLine: { lineStyle: { color: CHART_COLORS.axisLine } },
    axisLabel: { color: CHART_COLORS.axisLabel },
  },
  yAxis: {
    type: "value",
    minInterval: 1,
    axisLine: { show: false },
    axisLabel: { color: CHART_COLORS.axisLabel },
    splitLine: { lineStyle: { color: CHART_COLORS.splitLine } },
  },
  series: [
    {
      name: t("orders"),
      type: "line",
      smooth: true,
      symbol: "circle",
      symbolSize: 8,
      itemStyle: { color: CHART_SERIES_COLORS[0] },
      lineStyle: { color: CHART_SERIES_COLORS[0], width: 2 },
      data: data.map((item) => item.count),
    },
  ],
}));
</script>

<template>
  <ChartCard
    :title="t('chartOrdersByPeriod')"
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
