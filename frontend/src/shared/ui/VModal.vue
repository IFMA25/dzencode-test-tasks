<script setup lang="ts">
import { onBeforeUnmount, onMounted } from "vue";

import VButton from "./VButton.vue";

const { title = "" } = defineProps<{
  title?: string;
}>();

const open = defineModel<boolean>("open", { required: true });

const close = () => {
  open.value = false;
};

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
        v-if="open"
        class="modal-overlay position-fixed d-flex align-items-center justify-content-center"
        @click.self="close"
      >
        <div class="modal-panel w-100 rounded-3 overflow-hidden">
          <div class="modal-panel__header d-flex align-items-center justify-content-between">
            <h3
              v-if="title"
              class="modal-panel__title m-0"
            >
              {{ title }}
            </h3>
            <VButton
              variant="icon"
              icon="x"
              class="modal-panel__close-btn"
              @click="close"
            />
          </div>

          <div class="modal-panel__content">
            <slot />
          </div>

          <div
            v-if="$slots.footer"
            class="modal-panel__footer d-flex justify-content-end"
          >
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.modal-overlay {
  inset: 0;
  z-index: 1055;
  background-color: $overlay;
}

.modal-panel {
  max-width: 40rem;
  background-color: $surface-bg;
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

  &__close-btn {
    margin-right: -1rem;
    margin-top: -1rem;
  }

  &__content {
    padding: 1.25rem 1.5rem;
  }

  &__footer {
    padding: 1rem 1.5rem;
    background-color: $primary;
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
