<script setup lang="ts">
import { onBeforeUnmount, onMounted } from "vue";

import VButton from "./VButton.vue";

const { modelValue, title = "" } = defineProps<{
  modelValue: boolean;
  title?: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const close = () => emit("update:modelValue", false);

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") close();
};

onMounted(() => document.addEventListener("keydown", handleKeydown));
onBeforeUnmount(() => document.removeEventListener("keydown", handleKeydown));
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="modal-backdrop d-flex align-items-center justify-content-center"
        @click="close"
      >
        <div
          class="modal-dialog"
          @click.stop
        >
          <div class="modal-dialog__header d-flex align-items-center justify-content-between">
            <h3
              v-if="title"
              class="modal-dialog__title m-0"
            >
              {{ title }}
            </h3>
            <VButton
              variant="icon"
              icon="x"
              @click="close"
            />
          </div>

          <div class="modal-dialog__content">
            <slot />
          </div>

          <div
            v-if="$slots.footer"
            class="modal-dialog__footer"
          >
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1050;
  background-color: $overlay;
}

.modal-dialog {
  width: 100%;
  max-width: 30rem;
  background-color: $surface-bg;
  border-radius: 0.5rem;
  box-shadow: $surface-shadow;

  &__header {
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid $border-color;
  }

  &__title {
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
    color: $headings-color;
  }

  &__content {
    padding: 1.25rem 1.5rem;
  }

  &__footer {
    padding: 1rem 1.5rem;
    background-color: $primary;
    border-radius: 0 0 0.5rem 0.5rem;
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
