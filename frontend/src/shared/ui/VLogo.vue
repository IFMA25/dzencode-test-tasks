<script setup lang="ts">
const LOGO_NAME = "Inventory";
</script>

<template>
  <div class="v-logo">
    <img
      src="@/assets/logo.svg"
      alt="logo"
      class="v-logo__icon"
    />
    <span class="v-logo__text d-none d-sm-inline">{{ LOGO_NAME.toUpperCase() }}</span>
  </div>
</template>

<style scoped lang="scss">
.v-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &__icon {
    width: 2.5rem;
    height: 2.5rem;
  }

  &__text {
    color: $primary;
    font-size: $font-size-sm;
    font-weight: $font-weight-bold;
    letter-spacing: $letter-spacing-uppercase;
  }
}
</style>
