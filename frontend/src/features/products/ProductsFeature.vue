<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

import { EMPTY_STATE_MESSAGES, PRODUCT_CONDITIONS } from "@/shared/constants";
import type { Product } from "@/shared/types";
import VEmptyState from "@/shared/ui/VEmptyState.vue";
import VPageTitle from "@/shared/ui/VPageTitle.vue";
import VProductTitleCell from "@/shared/ui/VProductTitleCell.vue";
import VGridTable, { type GridTableColumn } from "@/shared/ui/base/VGridTable.vue";
import VSelect from "@/shared/ui/base/VSelect.vue";
import { formatCurrencyValue, getCurrencySymbol } from "@/shared/utils/format";
import { formatDateLong, formatDateShort, toDate } from "@/shared/utils/formatDate";
import { getEmptyStateKey } from "@/shared/utils/getEmptyStateKey";
import { useProductsStore } from "@/stores/useProductsStore";

const columns: GridTableColumn<Product>[] = [
  { key: "conditionDot", width: "minmax(2rem, 3%)", styles: "justify-content-center" },
  { key: "title", width: "minmax(14rem, 30%)", styles: "gap-3" },
  { key: "type", width: "minmax(6rem, 10%)", styles: "justify-content-center text-nowrap" },
  { key: "condition", width: "minmax(5rem, 7%)", styles: "justify-content-center text-nowrap" },
  {
    key: "guarantee",
    width: "minmax(16rem, 20%)",
    styles: "flex-column justify-content-center text-nowrap",
  },
  {
    key: "price",
    width: "minmax(6rem, 10%)",
    styles: "flex-column justify-content-center text-nowrap",
  },
  { key: "orderTitle", width: "minmax(10rem, 20%)" },
];

const productsStore = useProductsStore();
const { locale, t } = useI18n();
const route = useRoute();

const typeOptions = computed(() => [
  { key: "", label: t("allTypes") },
  ...productsStore.productTypes.map((type) => ({ key: type, label: type })),
]);

const productsCount = computed(() => productsStore.productsData.length);

const emptyStateKey = computed(() =>
  getEmptyStateKey(productsStore.hasError, !!route.query.search),
);

onMounted(() => {
  productsStore.getInitType();
  productsStore.loadProductTypes();
});

watch(
  () => route.query.search,
  (search) => {
    productsStore.loadProducts(String(search ?? ""));
  },
  { immediate: true },
);
</script>

<template>
  <div class="products position-relative h-100 d-grid gap-3">
    <VPageTitle :count="productsCount" class="products__title align-self-center" />

    <VGridTable
      :rows="productsStore.productsData"
      :columns="columns"
      :loading="productsStore.loading"
      variant="card"
      class="products__table products-table__table"
    >
      <template v-if="productsStore.productTypes.length" #toolbar>
        <VSelect
          id="product-type"
          v-model="productsStore.selectedType"
          :options="typeOptions"
          :label-text="`${t('type')}:`"
          label="label"
          track-by="key"
          :allow-empty="false"
          :close-on-select="true"
        />
      </template>

      <template #cell-conditionDot="{ row }">
        <span
          class="products-table__condition-dot rounded-circle"
          :class="PRODUCT_CONDITIONS[row.condition].dotClass"
        />
      </template>
      <template #cell-title="{ row }">
        <VProductTitleCell :title="row.title" />
      </template>
      <template #cell-type="{ row }">
        <span class="products-table__type">{{ row.type }}</span>
      </template>
      <template #cell-condition="{ row }">
        <span
          class="products-table__condition"
          :class="PRODUCT_CONDITIONS[row.condition].textClass"
        >
          {{ t(PRODUCT_CONDITIONS[row.condition].labelKey) }}
        </span>
      </template>
      <template #cell-guarantee="{ row }">
        <div class="products-table__guarantee">
          {{ formatDateShort(toDate(row.guarantee.start)) }} —
          {{ formatDateShort(toDate(row.guarantee.end)) }}
        </div>
        <div class="products-table__guarantee products-table__guarantee--long">
          {{ formatDateLong(toDate(row.guarantee.start), locale) }} —
          {{ formatDateLong(toDate(row.guarantee.end), locale) }}
        </div>
      </template>
      <template #cell-price="{ row }">
        <div
          v-for="price in row.price"
          :key="price.symbol"
          class="products-table__price"
          :class="{ 'products-table__price--default': price.isDefault }"
        >
          {{ formatCurrencyValue(price.value) }}
          <span class="products-table__price-symbol">{{ getCurrencySymbol(price.symbol) }}</span>
        </div>
      </template>
      <template #cell-orderTitle="{ row }">
        <span class="products-table__order-title">{{ row.orderTitle }}</span>
      </template>

      <template v-if="productsStore.hasError || !productsStore.productsData.length" #message>
        <VEmptyState
          :text="
            t(EMPTY_STATE_MESSAGES[emptyStateKey].textKey, { name: t('products').toLowerCase() })
          "
          :variant="EMPTY_STATE_MESSAGES[emptyStateKey].variant"
        />
      </template>
    </VGridTable>
  </div>
</template>

<style scoped lang="scss">
.products {
  grid-template-columns: auto auto 1fr;
  grid-template-rows: auto 1fr;

  &__title {
    grid-column: 1;
    grid-row: 1;
  }
}

.products-table {
  &__table {
    display: contents !important;

    :deep(.v-grid-table__toolbar) {
      grid-column: 2;
      grid-row: 1;
      align-self: center;
      margin-bottom: 0;
    }

    :deep(.v-grid-table__body) {
      position: relative;
      grid-column: 1 / -1;
      grid-row: 2;
    }
  }

  &__type {
    color: $text-muted;
  }

  &__condition {
    color: $text-muted;
  }

  &__condition-dot {
    width: 0.5rem;
    height: 0.5rem;
    background-color: $text-muted;
  }

  &__guarantee {
    font-size: $small-font-size;
    color: $text-muted;

    &--long {
      color: $text-table;
    }
  }

  &__price {
    color: $text-muted;
    font-size: $font-size-md;

    @media (max-width: 1200px) {
      font-size: $font-size-sm;
    }

    &--default {
      color: $text-table;
      font-size: $font-size;
    }
  }

  &__price-symbol {
    font-size: $small-font-size;
  }

  &__order-title {
    color: $text-muted;
  }

  &__order-title,
  &__price--default {
    @media (max-width: 1200px) {
      font-size: $font-size-md;
    }
  }
}
</style>
