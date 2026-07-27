<script setup lang="ts">
defineOptions({ inheritAttrs: false });

const { size = "md", color = "var(--bs-heading-color)" } = defineProps<{
  size?: "sm" | "md" | "lg";
  color?: string;
}>();
</script>

<template>
  <div
    class="v-loader"
    :style="{ color }"
    v-bind="$attrs"
  >
    <span
      class="spinner-border v-loader__spinner animate__animated animate__fadeIn"
      :class="`v-loader__spinner--${size}`"
    />
  </div>
</template>

<style scoped lang="scss">
.v-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;

  &__spinner {
    &--sm {
      width: 1rem;
      height: 1rem;
      border-width: 2px;
    }

    &--md {
      width: 1.5rem;
      height: 1.5rem;
      border-width: 3px;
    }

    &--lg {
      width: 4rem;
      height: 4rem;
      border-width: 5px;
    }
  }
}
</style>
