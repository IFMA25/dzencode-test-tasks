<script setup lang="ts">
import type { EChartsOption } from "echarts";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import { chartColors, chartSeriesColors } from "../variables/chartColors";

import { EMPTY_STATE_MESSAGES } from "@/shared/constants";
import type { AnalyticsData } from "@/shared/types";
import VEmptyState from "@/shared/ui/VEmptyState.vue";
import VSkeleton from "@/shared/ui/base/VSkeleton.vue";
import { getEmptyStateKey } from "@/shared/utils/getEmptyStateKey";

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

const emptyStateKey = computed(() => getEmptyStateKey(hasError, false));

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
  <div class="line-chart-orders d-flex flex-column border rounded p-4 overflow-hidden">
    <h2 class="line-chart-orders__title m-0 mb-3 fw-semibold text-body">
      {{ t("chartOrdersByPeriod") }}
    </h2>

    <div
      v-if="loading"
      class="line-chart-orders__canvas d-flex flex-column justify-content-between flex-grow-1"
    >
      <VSkeleton v-for="line in SKELETON_COUNT" :key="line" :height="SKELETON_HEIGHT" />
    </div>

    <VEmptyState
      v-else-if="hasError || !data.length"
      :text="t(EMPTY_STATE_MESSAGES[emptyStateKey].textKey, { name: t('orders') })"
      :variant="EMPTY_STATE_MESSAGES[emptyStateKey].variant"
    />

    <VChart v-else class="line-chart-orders__canvas flex-grow-1" :option="option" autoresize />
  </div>
</template>

<style scoped lang="scss">
.line-chart-orders {
  min-width: 0;
  background-color: $surface-bg;

  &__title {
    font-size: $font-size-lg;
  }

  &__canvas {
    width: 100%;
    min-height: 18rem;
  }
}
</style>
