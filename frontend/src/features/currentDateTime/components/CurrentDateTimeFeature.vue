<script setup lang="ts">
import { useNow } from "@vueuse/core";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import { capitalize } from "@/shared/utils";

const now = useNow();
const { locale } = useI18n();

const weekday = computed(() =>
  capitalize(new Intl.DateTimeFormat(locale.value, { weekday: "long" }).format(now.value)),
);

const date = computed(() => {
  const parts = new Intl.DateTimeFormat(locale.value, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).formatToParts(now.value);

  const day = parts.find((part) => part.type === "day")?.value ?? "";
  const month = parts.find((part) => part.type === "month")?.value ?? "";
  const year = parts.find((part) => part.type === "year")?.value ?? "";

  return `${day} ${capitalize(month)} ${year}`;
});

const time = computed(() =>
  new Intl.DateTimeFormat(locale.value, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now.value),
);
</script>

<template>
  <div class="current-date-time">
    <div class="current-date-time__weekday">
      {{ weekday }}
    </div>
    <div class="current-date-time__row">
      <span>{{ date }}</span>
      <div class="current-date-time__time">
        <i class="current-date-time__icon bi bi-clock" />
        <span>{{ time }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.current-date-time {
  text-align: left;

  &__weekday {
    font-weight: $font-weight-semibold;
  }

  &__row {
    display: flex;
    gap: 1rem;
    font-size: $font-size-md;
    font-weight: $font-weight-semibold;
  }

  &__time {
    display: flex;
    gap: 0.5rem;
  }

  &__icon {
    color: $primary;
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
