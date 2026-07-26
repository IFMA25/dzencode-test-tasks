<script setup lang="ts" generic="T extends Option">
import { computed } from "vue";
import Multiselect from "vue-multiselect";

import { Option } from "@/shared/types/index";

interface Props {
  id: string;
  options: T[];
  labelText?: string;
  multiple?: boolean;
  closeOnSelect?: boolean;
  openDirection?: "top" | "bottom";
  placeholder?: string;
  showLabels?: boolean;
  allowEmpty?: boolean;
  multiselectProps?: Record<string, unknown>;
  searchable?: boolean;
  label?: string;
  trackBy?: string;
  disabled?: boolean;
  size?: "sm" | "md";
}

const {
  id = "select",
  labelText = "",
  options = [],
  multiple = false,
  closeOnSelect: closeOnSelectProp,
  openDirection = "bottom",
  placeholder = "",
  showLabels = false,
  allowEmpty = false,
  multiselectProps = {},
  searchable = false,
  label,
  trackBy = "key",
  disabled = false,
  size = "md",
} = defineProps<Props>();

const model = defineModel<string | string[] | null>();

const getKey = (option: T): string => String(option[trackBy ?? "key"]);

const optionModel = computed({
  get: () => {
    if (model.value == null) return multiple ? [] : null;

    if (multiple) {
      const values = Array.isArray(model.value) ? model.value : [model.value];
      return options.filter((option) => values.includes(getKey(option)));
    }

    return options.find((option) => getKey(option) === model.value) ?? null;
  },
  set: (value: T | T[] | null) => {
    if (value == null) {
      model.value = multiple ? [] : null;
      return;
    }

    if (Array.isArray(value)) {
      model.value = value.map(getKey);
    } else {
      model.value = getKey(value);
    }
  },
});

const closeOnSelectComputed = computed(() => closeOnSelectProp ?? !multiple);
</script>

<template>
  <div class="v-select d-flex align-items-center gap-2">
    <label
      v-if="labelText"
      :for="id"
      class="v-select__label text-nowrap"
    >
      {{ labelText }}
    </label>
    <Multiselect
      :id="id"
      v-model="optionModel"
      v-bind="multiselectProps"
      :options="options"
      :multiple="multiple"
      :close-on-select="closeOnSelectComputed"
      :open-direction="openDirection"
      :placeholder="placeholder"
      :show-labels="showLabels"
      :allow-empty="allowEmpty"
      :searchable="searchable"
      :label="label"
      :track-by="trackBy"
      :disabled="disabled"
      :class="`v-select__field v-select__field--${size}`"
    >
      <template #caret="{ toggle }">
        <button
          type="button"
          class="multiselect__select v-select__caret"
          @mousedown.prevent.stop="toggle"
        >
          <i class="bi bi-chevron-down" />
        </button>
      </template>
    </Multiselect>
  </div>
</template>

<style scoped lang="scss">
$select-max-width: 20rem;

.v-select {
  &__label {
    color: $text-muted;
  }

  &__field {
    width: fit-content;
    max-width: $select-max-width;
    outline: none;
  }

  &__caret {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0 0.75rem;
    border: 0;
    background: transparent;

    i {
      color: $text-muted;
      font-size: 0.8rem;
    }

    &::before {
      display: none;
    }
  }

  :deep(.multiselect) {
    position: relative;
    min-height: 0;
    color: $body-color;
  }

  :deep(.multiselect__input) {
    margin-bottom: 0;
    padding: 0;
  }

  :deep(.multiselect__tags) {
    display: flex;
    align-items: center;
    min-height: 0;
    overflow: hidden;
    border: 1px solid $border-color;
    border-radius: 0.5rem;
    background-color: $body-bg-secondary;
    white-space: normal;
    word-break: break-word;
    transition: border-color 0.15s ease;
  }

  :deep(.multiselect__tags *:focus) {
    outline: none;
  }

  :deep(.multiselect--active .multiselect__tags) {
    border-color: $primary;
  }

  &__field--sm :deep(.multiselect__tags) {
    padding: 0.375rem 2rem 0.375rem 0.625rem;
    font-size: $font-size-sm;
  }

  &__field--md :deep(.multiselect__tags) {
    padding: 0.5rem 2.25rem 0.5rem 0.75rem;
  }

  :deep(.multiselect__single),
  :deep(.multiselect__placeholder) {
    margin: 0;
    padding: 0;
    background: transparent;
    font-weight: $font-weight-semibold;
  }

  :deep(.multiselect__placeholder) {
    color: $text-muted;
    font-weight: $font-weight-regular;
  }

  :deep(.multiselect__content-wrapper) {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 10;
    min-width: 100%;
    width: max-content;
    max-width: $select-max-width;
    margin-top: 0.25rem;
    border: 1px solid $border-color;
    border-radius: 0.5rem;
    background-color: #fff;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  }

  :deep(.multiselect__content) {
    width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  :deep(.multiselect__element) {
    width: 100%;
  }

  :deep(.multiselect__option) {
    display: block;
    width: 100%;
    padding: 0.5rem 0.75rem;
    text-align: center;
    white-space: normal;
    word-break: break-word;
    cursor: pointer;
  }

  :deep(.multiselect__option--highlight) {
    background-color: $body-bg-secondary;
    color: $body-color;
  }

  :deep(.multiselect__option--selected) {
    background-color: transparent;
    color: $primary;
    font-weight: $font-weight-semibold;
  }

  :deep(.multiselect__option--selected.multiselect__option--highlight) {
    background-color: $body-bg-secondary;
  }

  :deep(.multiselect--disabled) {
    pointer-events: none;
    opacity: 0.6;
  }
}
</style>
