<script setup lang="ts">
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

import { RouteNames } from "@/app/router/variables/routeNames";
import { getProductsRequest } from "@/shared/api/apiProducts";
import { PRODUCT_CONDITIONS } from "@/shared/constants";
import type { Order, Product } from "@/shared/types";
import VEmptyState from "@/shared/ui/VEmptyState.vue";
import VProductTitleCell from "@/shared/ui/VProductTitleCell.vue";
import VButton from "@/shared/ui/base/VButton.vue";
import VGridTable, { type GridTableColumn } from "@/shared/ui/base/VGridTable.vue";

const { order } = defineProps<{
  order?: Order;
}>();

const columns: GridTableColumn<Product>[] = [
  { key: "indicator", width: "minmax(2rem, 10%)", styles: "justify-content-center" },
  { key: "title", width: "minmax(12rem, 65%)", styles: "gap-3" },
  { key: "condition", width: "minmax(5rem, 25%)", styles: "justify-content-center text-nowrap" },
];

const products = ref<Product[]>([]);
const loading = ref(false);
const productsHasError = ref(false);

const { t } = useI18n();
const router = useRouter();
const route = useRoute();

const loadProducts = async (orderId: number) => {
  try {
    loading.value = true;
    productsHasError.value = false;
    products.value = await getProductsRequest({ order: orderId });
  } catch (e) {
    productsHasError.value = true;
    console.error(e);
  } finally {
    loading.value = false;
  }
};

watch(
  () => order?.id,
  (orderId) => {
    if (orderId) loadProducts(orderId);
  },
  { immediate: true },
);
</script>

<template>
  <div class="groups-feature position-relative d-flex flex-column">
    <div class="groups-feature__header d-flex align-items-center justify-content-between mb-4">
      <h2 v-if="order" class="groups-feature__title m-0 fw-semibold">
        {{ order.title }}
      </h2>
      <VButton
        variant="circle"
        icon="x"
        class="groups-feature__close position-absolute end-0 top-0"
        @click="router.push({ name: RouteNames.orders, query: route.query })"
      />
    </div>

    <VGridTable
      v-if="order"
      :rows="products"
      :columns="columns"
      :loading="loading"
      variant="list"
      class="flex-grow-1"
    >
      <template #toolbar>
        <VButton variant="text" icon="plus-lg" color="success" :text="t('addNewProduct')" />
      </template>

      <template #cell-indicator="{ row }">
        <span
          class="groups-feature__condition-dot rounded-circle"
          :class="PRODUCT_CONDITIONS[row.condition].dotClass"
        />
      </template>
      <template #cell-title="{ row }">
        <VProductTitleCell :title="row.title" />
      </template>
      <template #cell-condition="{ row }">
        <span :class="PRODUCT_CONDITIONS[row.condition].textClass">
          {{ t(PRODUCT_CONDITIONS[row.condition].labelKey) }}
        </span>
      </template>
      <template v-if="productsHasError || !products.length" #message>
        <VEmptyState :name="t('products')" :has-error="productsHasError" />
      </template>
    </VGridTable>

    <template v-else>
      <VEmptyState :text="t('selectOrder')" />
    </template>
  </div>
</template>

<style scoped lang="scss">
.groups-feature {
  &__title {
    font-size: $font-size-xl;

    @media (max-width: 992px) {
      font-size: $font-size-md;
    }
  }

  &__condition-dot {
    width: 0.5rem;
    height: 0.5rem;
    background-color: $text-muted;
  }

  &__close {
    transform: translate(50%, -50%);
  }
}
</style>
