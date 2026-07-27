<script setup lang="ts">
import type { Order } from "@/shared/types";
import VButton from "@/shared/ui/VButton.vue";
import VModal from "@/shared/ui/VModal.vue";

const { order, loading = false } = defineProps<{
  order: Order | null;
  loading?: boolean;
}>();

const open = defineModel<boolean>("open", { required: true });

const emit = defineEmits<{
  confirm: [];
}>();
</script>

<template>
  <VModal
    v-model:open="open"
    :title="$t('deleteModalTitle')"
  >
    <div
      class="order-delete-modal__preview d-flex align-items-center justify-content-between gap-2"
    >
      <span class="order-delete-modal__title w-75">{{ order?.title }}</span>
      <span class="w-25 text-center"> {{ order?.products.length }} {{ $t("productCount") }} </span>
    </div>

    <template #footer>
      <VButton
        variant="text"
        color="white"
        :text="$t('modalCancel')"
        :disabled="loading"
        @click="open = false"
      />
      <VButton
        variant="primary"
        icon="trash"
        :text="$t('modalDelete')"
        :loading="loading"
        class="order-delete-modal__confirm"
        @click="emit('confirm')"
      />
    </template>
  </VModal>
</template>

<style scoped lang="scss">
.order-delete-modal {
  &__title {
    text-decoration: underline;
    text-underline-offset: 0.25rem;
  }

  &__confirm {
    background-color: $surface-bg;
    color: $danger;

    &:hover {
      background-color: $danger;
      color: $surface-bg;
    }
  }
}
</style>
