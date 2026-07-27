<script setup lang="ts">
import { useNow } from "@vueuse/core";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import { capitalize, formatDateLong } from "@/shared/utils";

const now = useNow();
const { locale } = useI18n();

const weekday = computed(() =>
  capitalize(new Intl.DateTimeFormat(locale.value, { weekday: "long" }).format(now.value)),
);

const date = computed(() => formatDateLong(now.value, locale.value));

const time = computed(() =>
  new Intl.DateTimeFormat(locale.value, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now.value),
);
</script>

<template>
  <div class="current-date-time text-center">
    <div class="current-date-time__weekday">
      {{ weekday }}
    </div>
    <div class="current-date-time__row d-flex align-items-center">
      <span>{{ date }}</span>
      <div class="current-date-time__time d-flex align-items-center">
        <i class="current-date-time__icon bi bi-clock" />
        <span>{{ time }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.current-date-time {
  &__weekday {
    font-weight: $font-weight-semibold;
  }

  &__row {
    gap: 1rem;
    font-size: $font-size-md;
    font-weight: $font-weight-semibold;
  }

  &__time {
    gap: 0.5rem;
  }

  &__icon {
    color: $primary;
    font-size: $font-size-md;
  }

  @media (max-width: 575.98px) {
    &__weekday {
      font-size: $font-size-sm;
    }

    &__row {
      font-size: $font-size-sm;
    }
  }
}
</style>
