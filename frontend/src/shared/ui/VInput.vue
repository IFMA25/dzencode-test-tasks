<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";

import VLoader from "./VLoader.vue";

const DEBOUNCE_MS = 400;

const {
  placeholder = "",
  type = "text",
  loading = false,
} = defineProps<{
  placeholder?: string;
  type?: string;
  loading?: boolean;
}>();

const emit = defineEmits<{ search: [value: string] }>();

const model = defineModel<string>({ default: "" });

const emitSearch = useDebounceFn((value: string) => {
  emit("search", value);
}, DEBOUNCE_MS);
</script>

<template>
  <div class="v-input-wrapper">
    <input
      v-model="model"
      :type="type"
      class="v-input form-control"
      :class="{ 'v-input--loading': loading }"
      :placeholder="placeholder"
      v-bind="$attrs"
      @input="emitSearch(model?.trim() ?? '')"
    />

    <VLoader
      v-if="loading"
      size="sm"
      class="v-input-wrapper__loader"
    />
  </div>
</template>

<style scoped lang="scss">
.v-input-wrapper {
  position: relative;
  max-width: 25rem;

  &__loader {
    position: absolute;
    top: 50%;
    right: 0.75rem;
    display: flex;
    align-items: center;
    transform: translateY(-50%);
    pointer-events: none;
  }

  .v-input {
    border: 2px solid transparent;
    border-radius: 0.5rem;
    background-color: $body-bg-secondary;
    padding-right: 2.25rem;

    &::placeholder {
      color: $headings-color;
      font-weight: $font-weight-semibold;
    }

    &:focus {
      border: 2px solid $success;
      box-shadow: none;
    }
  }
}
</style>
