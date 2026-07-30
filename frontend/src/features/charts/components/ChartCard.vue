<script setup lang="ts">
import { useI18n } from "vue-i18n";

import VEmptyState from "@/shared/ui/VEmptyState.vue";

const {
  title,
  loading = false,
  hasError = false,
  isEmpty = false,
} = defineProps<{
  title: string;
  loading?: boolean;
  hasError?: boolean;
  isEmpty?: boolean;
}>();

const { t } = useI18n();
</script>

<template>
  <div class="chart-card d-flex flex-column border rounded p-4">
    <h2 class="chart-card__title m-0 mb-3 fw-semibold text-body">
      {{ title }}
    </h2>

    <div class="chart-card__body d-flex flex-column flex-grow-1 overflow-hidden">
      <slot v-if="loading" name="skeleton" />

      <VEmptyState v-else-if="hasError" :name="t('data')" has-error />

      <VEmptyState v-else-if="isEmpty" :text="t('noData')" />

      <slot v-else />
    </div>
  </div>
</template>

<style scoped lang="scss">
.chart-card {
  min-width: 0;
  background-color: $surface-bg;

  &__title {
    font-size: $font-size-lg;
  }

  &__body {
    min-width: 0;
    min-height: 14rem;
  }
}
</style>
