<script setup lang="ts">
import { onMounted } from "vue";

import LineChartForOrders from "./components/LineChartForOrders.vue";
import { useAnalytics } from "./composables/useAnalytics";

import VPageTitle from "@/shared/ui/VPageTitle.vue";

const { analyticsData, loading, hasError, loadAnalytics } = useAnalytics();

onMounted(() => {
  loadAnalytics();
});
</script>

<template>
  <div class="analytics d-flex flex-column gap-3">
    <VPageTitle />

    <LineChartForOrders
      :data="analyticsData?.ordersByPeriod"
      :loading="loading"
      :has-error="hasError"
    />
  </div>
</template>

<style scoped lang="scss">
.analytics {
  min-width: 0;
}
</style>
