<script setup lang="ts">
import { onMounted } from "vue";

import BarChartForProducts from "./components/BarChartForProducts.vue";
import LineChartForOrders from "./components/LineChartForOrders.vue";
import PieChartForProductsTypes from "./components/PieChartForProductsTypes.vue";
import { useAnalytics } from "./composables/useAnalytics";

import VPageTitle from "@/shared/ui/VPageTitle.vue";

const { analyticsData, loading, hasError, loadAnalytics } = useAnalytics();

onMounted(() => {
  loadAnalytics();
});
</script>

<template>
  <div class="analytics d-flex flex-column gap-3">
    <VPageTitle :title="$t($route.meta.title ?? '')" />

    <div class="analytics__charts d-grid gap-3">
      <LineChartForOrders
        class="analytics__line"
        :data="analyticsData?.ordersByPeriod"
        :loading="loading"
        :has-error="hasError"
      />

      <BarChartForProducts
        class="analytics__bar"
        :data="analyticsData?.productsPerOrder"
        :loading="loading"
        :has-error="hasError"
      />

      <PieChartForProductsTypes
        class="analytics__pie"
        :data="analyticsData?.productTypes"
        :loading="loading"
        :has-error="hasError"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.analytics {
  min-width: 0;
  height: 100%;

  &__charts {
    min-width: 0;
    min-height: 0;
    flex: 1;
    overflow-y: auto;
    grid-template-columns: 65fr 35fr;
    grid-template-rows: repeat(2, 1fr);
    grid-template-areas:
      "line line"
      "bar pie";

    @media (max-width: 992px) {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(3, 1fr);
      grid-template-areas:
        "line"
        "bar"
        "pie";
    }
  }

  &__line {
    grid-area: line;
  }

  &__bar {
    grid-area: bar;
  }

  &__pie {
    grid-area: pie;
  }
}
</style>
