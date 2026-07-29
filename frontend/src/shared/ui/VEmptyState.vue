<script setup lang="ts">
const { text, variant = "primary" } = defineProps<{
  text: string;
  variant?: "primary" | "danger";
}>();
</script>

<template>
  <div
    class="v-empty-state flex-grow-1 d-flex align-items-center justify-content-center fw-medium"
    :class="`text-${variant}`"
  >
    {{ text }}
  </div>
</template>
