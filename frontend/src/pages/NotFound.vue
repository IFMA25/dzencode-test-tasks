<script setup lang="ts">
import { ROUTE_NAMES } from "@/app/router/variables/routeNames";
</script>

<template>
  <div class="not-found d-flex flex-column align-items-center justify-content-center text-center">
    <h1 class="not-found__code">404</h1>
    <p class="not-found__text">
      {{ $t("notFound") }}
    </p>
    <RouterLink :to="{ name: ROUTE_NAMES.orders }" class="not-found__link">
      {{ $t("returnBack") }}
    </RouterLink>
  </div>
</template>

<style scoped lang="scss">
.not-found {
  min-height: 100vh;

  &__code {
    font-size: 6rem;
    font-weight: $font-weight-bold;
    color: $body-color;
  }

  &__text {
    font-size: 1.25rem;
    color: $text-muted;
    margin-bottom: 1rem;
  }

  &__link {
    color: $primary;
    font-weight: $font-weight-bold;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
