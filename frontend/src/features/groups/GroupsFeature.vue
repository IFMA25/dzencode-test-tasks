<script setup lang="ts">
import { useI18n } from "vue-i18n";

import type { Order, Product } from "@/shared/types";
import VButton from "@/shared/ui/VButton.vue";
import VGridTable, { type GridTableColumn } from "@/shared/ui/VGridTable.vue";

const { order } = defineProps<{
  order: Order;
}>();

const columns: GridTableColumn<Product>[] = [
  { key: "indicator", width: "minmax(0, 10%)", styles: "justify-content-center" },
  { key: "title", width: "minmax(0, 65%)", styles: "gap-3" },
  { key: "condition", width: "minmax(0, 25%)", styles: "justify-content-center" },
];

const { t } = useI18n();
</script>

<template>
  <div class="groups-feature d-flex flex-column h-100">
    <div class="groups-feature__header d-flex align-items-center justify-content-between mb-4">
      <h2 class="groups-feature__title m-0 fw-semibold">
        {{ order.title }}
      </h2>
      <VButton variant="icon" icon="x" />
    </div>

    <VGridTable :rows="order.products" :columns="columns" variant="list" class="flex-grow-1">
      <template #toolbar>
        <VButton variant="text" icon="plus-lg" color="success" :text="t('addNewProduct')" />
      </template>

      <template #cell-indicator="{ row }">
        <span
          class="groups-feature__condition-dot rounded-circle"
          :class="{ 'groups-feature__condition-dot--new bg-success': row.isNew }"
        />
      </template>
      <template #cell-title="{ row }">
        <img
          :src="row.photo"
          alt=""
          class="groups-feature__photo flex-shrink-0 rounded object-fit-cover"
        />
        <span class="text-decoration-underline">{{ row.title }}</span>
      </template>
      <template #cell-condition="{ row }">
        {{ row.isNew ? t("productNew") : t("productUsed") }}
      </template>

      <template v-if="!order.products.length" #message>
        {{ t("emptyProductsTable") }}
      </template>
    </VGridTable>
  </div>
</template>

<style scoped lang="scss">
.groups-feature {
  &__title {
    font-size: $font-size-xl;
  }

  &__condition-dot {
    width: 0.5rem;
    height: 0.5rem;
    background-color: $text-muted;
  }

  &__photo {
    width: 2.5rem;
    height: 2.5rem;
  }
}
</style>
