<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";
import { ref, watch } from "vue";

import VLoader from "./VLoader.vue";

const DEBOUNCE_MS = 400;

const {
  placeholder = "",
  type = "text",
  loading = false,
  autofocus = false,
  disabled = false,
} = defineProps<{
  placeholder?: string;
  type?: string;
  loading?: boolean;
  autofocus?: boolean;
  disabled?: boolean;
}>();

const inputRef = ref<HTMLInputElement | null>(null);

const model = defineModel<string>({ default: "" });

const emit = defineEmits<{ search: [value: string] }>();
const emitSearch = useDebounceFn((value: string) => {
  emit("search", value);
}, DEBOUNCE_MS);

watch(
  () => autofocus,
  (value) => {
    if (value) inputRef.value?.focus();
  },
  { flush: "post" },
);
</script>

<template>
  <div class="v-input-wrapper position-relative">
    <input
      ref="inputRef"
      v-model="model"
      :type="type"
      class="v-input form-control rounded-3"
      :class="{ 'v-input--loading': loading }"
      :placeholder="placeholder"
      :disabled="disabled"
      v-bind="$attrs"
      @input="emitSearch(model?.trim() ?? '')"
    />
    <VLoader
      v-if="loading"
      size="sm"
      class="v-input-wrapper__loader position-absolute pe-none d-flex align-items-center top-50 translate-middle-y"
    />
  </div>
</template>

<style scoped lang="scss">
.v-input-wrapper {
  max-width: 25rem;

  &__loader {
    right: 0.75rem;
  }

  .v-input {
    border: 2px solid transparent;
    background-color: $body-bg;

    &--loading {
      padding-right: 2.25rem;
    }

    &::placeholder {
      color: $headings-color;
      font-weight: $font-weight-semibold;
    }

    &:focus {
      border: 2px solid $success;
      box-shadow: none;
    }

    &:disabled {
      background-color: $border-color;
      color: $text-muted;
      cursor: not-allowed;

      &::placeholder {
        opacity: 0.6;
      }
    }
  }
}
</style>
