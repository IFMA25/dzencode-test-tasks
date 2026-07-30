<script setup lang="ts">
import type { EChartsOption } from "echarts";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import ChartCard from "./ChartCard.vue";
import { CHART_COLORS, CHART_SERIES_COLORS } from "../variables/chartColors";

import type { AnalyticsData } from "@/shared/types";
import VSkeleton from "@/shared/ui/base/VSkeleton.vue";

const SKELETON_COUNT = 15;
const SKELETON_WIDTH = "3.5%";
const SKELETON_MIN_HEIGHT = 40;
const SKELETON_HEIGHT_RANGE = 60;
const SKELETON_HEIGHT_STEP = 37;

const {
  data = [],
  loading = false,
  hasError = false,
} = defineProps<{
  data?: AnalyticsData["productsPerOrder"];
  loading?: boolean;
  hasError?: boolean;
}>();

const { t } = useI18n();

const option = computed<EChartsOption>(() => ({
  grid: { left: "3%", right: "3%", top: 24, bottom: 8, containLabel: true },
  tooltip: {
    trigger: "axis",
    axisPointer: { type: "shadow" },
    formatter: (params) => {
      const [item] = params as { name: string; value: number }[];

      return `${t("chartOrderNumber", { number: item.name })}<br/>${t("productCount")}: ${item.value}`;
    },
  },
  xAxis: {
    type: "category",
    data: data.map((item) => item.order),
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
      name: t("products"),
      type: "bar",
      barWidth: "55%",
      itemStyle: {
        color: CHART_SERIES_COLORS[1],
        borderRadius: [4, 4, 0, 0],
      },
      data: data.map((item) => item.count),
    },
  ],
}));

const getSkeletonHeight = (index: number) =>
  `${SKELETON_MIN_HEIGHT + ((index * SKELETON_HEIGHT_STEP) % SKELETON_HEIGHT_RANGE)}%`;
</script>

<template>
  <ChartCard
    :title="t('chartProductsPerOrder')"
    :loading="loading"
    :has-error="hasError"
    :is-empty="!data.length"
  >
    <template #skeleton>
      <div class="d-flex align-items-end justify-content-between flex-grow-1">
        <VSkeleton
          v-for="bar in SKELETON_COUNT"
          :key="bar"
          :width="SKELETON_WIDTH"
          :height="getSkeletonHeight(bar)"
        />
      </div>
    </template>
    <VChart class="w-100 flex-grow-1" :option="option" autoresize />
  </ChartCard>
</template>
