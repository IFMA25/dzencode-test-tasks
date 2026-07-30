<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import { EMPTY_STATE_MESSAGES } from "@/shared/constants";
import VEmptyState from "@/shared/ui/VEmptyState.vue";
import { getEmptyStateKey } from "@/shared/utils/getEmptyStateKey";

const {
  title,
  emptyName,
  loading = false,
  hasError = false,
  isEmpty = false,
} = defineProps<{
  title: string;
  emptyName: string;
  loading?: boolean;
  hasError?: boolean;
  isEmpty?: boolean;
}>();

const { t } = useI18n();

const emptyStateKey = computed(() => getEmptyStateKey(hasError, false));
</script>

<template>
  <div class="chart-card d-flex flex-column border rounded p-4 overflow-hidden">
    <h2 class="chart-card__title m-0 mb-3 fw-semibold text-body">
      {{ title }}
    </h2>

    <div class="chart-card__body d-flex flex-column flex-grow-1">
      <slot v-if="loading" name="skeleton" />

      <VEmptyState
        v-else-if="hasError || isEmpty"
        :text="t(EMPTY_STATE_MESSAGES[emptyStateKey].textKey, { name: emptyName })"
        :variant="EMPTY_STATE_MESSAGES[emptyStateKey].variant"
      />

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
    min-height: 18rem;
  }
}
</style>
