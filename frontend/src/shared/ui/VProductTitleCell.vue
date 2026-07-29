<script setup lang="ts">
const { title, photo = "/img-monitor.png" } = defineProps<{
  title: string;
  photo?: string;
}>();
</script>

<template>
  <div class="v-product-title-cell d-flex align-items-center gap-3">
    <img
      :src="photo"
      alt=""
      class="v-product-title-cell__photo flex-shrink-0 rounded object-fit-cover"
    />
    <span class="text-decoration-underline">{{ title }}</span>
  </div>
</template>

<style scoped lang="scss">
.v-product-title-cell {
  &__photo {
    width: 2.5rem;
    height: 2.5rem;
  }
}
</style>
