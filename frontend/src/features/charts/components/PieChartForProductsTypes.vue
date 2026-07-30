<script setup lang="ts">
import type { EChartsOption } from "echarts";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import ChartCard from "./ChartCard.vue";
import { chartColors, chartSeriesColors } from "../variables/chartColors";

import type { AnalyticsData } from "@/shared/types";
import VSkeleton from "@/shared/ui/base/VSkeleton.vue";

const SKELETON_SIZE = "14rem";

const {
  data = [],
  loading = false,
  hasError = false,
} = defineProps<{
  data?: AnalyticsData["productTypes"];
  loading?: boolean;
  hasError?: boolean;
}>();

const { t } = useI18n();

const option = computed<EChartsOption>(() => ({
  color: chartSeriesColors,
  tooltip: {
    trigger: "item",
    formatter: "{b}: {c} ({d}%)",
  },
  legend: {
    bottom: 0,
    icon: "circle",
    itemGap: 16,
    textStyle: { color: chartColors.axisLabel },
  },
  series: [
    {
      name: t("chartProductTypes"),
      type: "pie",
      radius: ["45%", "70%"],
      center: ["50%", "45%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 8,
        borderColor: chartColors.surface,
        borderWidth: 2,
      },
      label: { show: false, position: "center" },
      labelLine: { show: false },
      emphasis: {
        label: {
          show: true,
          formatter: "{b}\n{d}%",
          color: chartColors.label,
          fontSize: 16,
          fontWeight: "bold",
          lineHeight: 22,
        },
      },
      data: data.map((item) => ({ name: item.type, value: item.count })),
    },
  ],
}));
</script>

<template>
  <ChartCard
    :title="t('chartProductTypes')"
    :loading="loading"
    :has-error="hasError"
    :is-empty="!data.length"
  >
    <template #skeleton>
      <div class="d-flex align-items-center justify-content-center flex-grow-1">
        <VSkeleton :width="SKELETON_SIZE" :height="SKELETON_SIZE" class="rounded-circle" />
      </div>
    </template>

    <VChart class="w-100 flex-grow-1" :option="option" autoresize />
  </ChartCard>
</template>
