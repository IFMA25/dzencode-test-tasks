<script setup lang="ts">
const { title, count } = defineProps<{
  title: string;
  count?: number;
}>();
</script>

<template>
  <div class="v-page-title d-flex align-items-center gap-2">
    <h1 class="v-page-title__text m-0 fw-semibold text-body">
      {{ title }}
    </h1>
    <template v-if="count !== undefined">
      <span>/</span>
      <span class="v-page-title__count fw-semibold text-body">{{ count }}</span>
    </template>
  </div>
</template>

<style scoped lang="scss">
.v-page-title {
  &__text,
  &__count {
    font-size: $font-size-xl;
  }
}
</style>
