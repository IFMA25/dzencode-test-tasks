<script setup lang="ts">
const { width = "100%", height = "1rem" } = defineProps<{
  width?: string;
  height?: string;
}>();
</script>

<template>
  <div class="v-skeleton placeholder rounded" :style="{ width, height }" />
</template>

<style scoped lang="scss">
.v-skeleton {
  animation: placeholder-glow 2s ease-in-out infinite;
}
</style>
