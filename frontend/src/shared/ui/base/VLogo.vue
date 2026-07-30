<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";

const LOGO_NAME = "Inventory";

const { to } = defineProps<{
  to: RouteLocationRaw;
}>();
</script>

<template>
  <RouterLink :to="to" class="v-logo d-inline-flex align-items-center gap-2 text-decoration-none">
    <img src="@/assets/logo.svg" alt="logo" class="v-logo__icon" />
    <span class="v-logo__text d-none d-sm-inline text-primary fw-bold">
      {{ LOGO_NAME.toUpperCase() }}
    </span>
  </RouterLink>
</template>

<style scoped lang="scss">
.v-logo {
  &__icon {
    width: 2.5rem;
    height: 2.5rem;
  }

  &__text {
    font-size: $font-size-sm;
    letter-spacing: $letter-spacing-uppercase;
  }
}
</style>
