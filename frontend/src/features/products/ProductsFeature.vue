<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";

import type { Product } from "@/shared/types";
import VGridTable, { type GridTableColumn } from "@/shared/ui/VGridTable.vue";
import VPageTitle from "@/shared/ui/VPageTitle.vue";
import VSelect from "@/shared/ui/VSelect.vue";
import { formatCurrencyValue, getCurrencySymbol } from "@/shared/utils/format";
import { formatDateLong, formatDateShort, toDate } from "@/shared/utils/formatDate";
import { useProductsStore } from "@/stores/useProductsStore";

const columns: GridTableColumn<Product>[] = [
  { key: "conditionDot", width: "minmax(0, 3%)", position: "d-flex justify-content-center" },
  { key: "title", width: "minmax(0, 30%)", position: "d-flex align-items-center gap-3" },
  { key: "type", width: "minmax(0, 10%)", position: "d-flex justify-content-center" },
  { key: "condition", width: "minmax(0, 7%)", position: "d-flex justify-content-center" },
  {
    key: "guarantee",
    width: "minmax(0, 20%)",
    position: "d-flex flex-column justify-content-center",
  },
  {
    key: "price",
    width: "minmax(0, 10%)",
    position: "d-flex flex-column justify-content-center",
  },
  { key: "orderTitle", width: "minmax(0, 20%)", position: "d-flex" },
];

const productsStore = useProductsStore();
const { locale, t } = useI18n();

const typeOptions = computed(() => [
  { key: "", label: t("allTypes") },
  ...productsStore.productTypes.map((type) => ({ key: type, label: type })),
]);

const productsCount = computed(() => productsStore.productsData.length);

onMounted(() => {
  productsStore.getInitType();

  Promise.allSettled([productsStore.loadProductTypes(), productsStore.loadProducts()]);
});
</script>

<template>
  <div class="products position-relative h-100 d-grid gap-3">
    <VPageTitle :count="productsCount" class="products__title align-self-center" />

    <VGridTable
      :rows="productsStore.productsData"
      :columns="columns"
      :loading="productsStore.loading"
      :has-error="productsStore.hasError"
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
          :class="{ 'products-table__condition-dot--new bg-success': row.isNew }"
        />
      </template>
      <template #cell-title="{ row }">
        <div class="products-table__photo flex-shrink-0">
          <img
            src="/img-monitor.png"
            alt=""
            class="products-table__photo-img w-100 h-100 object-fit-contain"
          />
        </div>
        <span class="products-table__title text-decoration-underline">{{ row.title }}</span>
      </template>
      <template #cell-type="{ row }">
        <span class="products-table__type">{{ row.type }}</span>
      </template>
      <template #cell-condition="{ row }">
        <span class="products-table__condition">
          {{ row.isNew ? t("productNew") : t("productUsed") }}
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
        {{ productsStore.hasError ? t("errorMessageProducts") : t("emptyProductsTable") }}
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

  &__title {
    text-underline-offset: 0.25rem;
  }

  &__photo {
    width: 2.5rem;
    height: 2.5rem;
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
  &__title,
  &__price--default {
    @media (max-width: 1200px) {
      font-size: $font-size-md;
    }
  }
}
</style>
