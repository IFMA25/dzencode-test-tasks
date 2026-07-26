<script setup lang="ts">
import { ref } from "vue";

import VButton from "@/shared/ui/VButton.vue";
import VPageTitle from "@/shared/ui/VPageTitle.vue";

const ordersCount = ref(10);
</script>

<template>
  <div class="orders d-flex align-items-center gap-2">
    <VButton
      variant="add"
      icon="plus-lg"
    />
    <VPageTitle class="m-0" />
    <span>/</span>
    <span class="orders__count">{{ ordersCount }}</span>
  </div>
</template>

<style scoped lang="scss">
.orders {
  &__count {
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
    color: $headings-color;
  }
}
</style>
