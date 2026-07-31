<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue-sonner";

import OrderDeleteModal from "./components/OrderDeleteModal.vue";
import type { OrderColumn } from "./types";
import { getOrderTotalPrice } from "./utils";

import { ROUTE_NAMES } from "@/app/router/variables/routeNames";
import type { Order } from "@/shared/types";
import VEmptyState from "@/shared/ui/VEmptyState.vue";
import VPageTitle from "@/shared/ui/VPageTitle.vue";
import VButton from "@/shared/ui/base/VButton.vue";
import VGridTable from "@/shared/ui/base/VGridTable.vue";
import VModal from "@/shared/ui/base/VModal.vue";
import { formatCurrencyValue, getCurrencySymbol } from "@/shared/utils/format";
import { formatDateLong, formatDateShort, toDate } from "@/shared/utils/formatDate";
import { useOrdersStore } from "@/stores/useOrdersStore";

const columns: OrderColumn[] = [
  { key: "title", width: "minmax(12rem, 50%)" },
  {
    key: "count",
    width: "minmax(8rem, 15%)",
    groupsWidth: "minmax(8rem, 50%)",
    styles: "justify-content-center text-nowrap",
    isGroupsColumn: true,
  },
  {
    key: "date",
    width: "minmax(7rem, 15%)",
    groupsWidth: "minmax(7rem, 40%)",
    styles: "flex-column justify-content-center text-nowrap",
    isGroupsColumn: true,
  },
  {
    key: "totalPrice",
    width: "minmax(6rem, 15%)",
    styles: "flex-column justify-content-center text-nowrap",
  },
  {
    key: "action",
    width: "minmax(3rem, 5%)",
    groupsWidth: "minmax(3rem, 10%)",
    styles: "justify-content-center p-0 align-self-stretch",
    isGroupsColumn: true,
  },
];

const selectedOrder = ref<Order | null>(null);
const showDeleteModal = ref(false);
const showAddModal = ref(false);

const ordersStore = useOrdersStore();
const { locale, t } = useI18n();
const router = useRouter();
const route = useRoute();

const ordersCount = computed(() => {
  return ordersStore.ordersData.length;
});
const isGroupsRoute = computed(() => route.name === ROUTE_NAMES.groups);
const openOrderId = computed(() => (route.params.id ? Number(route.params.id) : null));

const visibleColumns = computed(() =>
  isGroupsRoute.value
    ? columns
        .filter((column) => column.isGroupsColumn)
        .map((column) => ({ ...column, width: column.groupsWidth ?? column.width }))
    : columns,
);

const openGroup = (order: Order) => {
  router.push({ name: ROUTE_NAMES.groups, params: { id: order.id }, query: route.query });
};

const openDeleteModal = (order: Order) => {
  selectedOrder.value = order;
  showDeleteModal.value = true;
};

const confirmDeleteOrder = async () => {
  const isDeleted = await ordersStore.deleteOrder(selectedOrder.value!.id);

  if (!isDeleted) return;

  showDeleteModal.value = false;
  toast.success(t("orderDeleted"));
};

watch(
  () => route.query.search,
  (search) => {
    ordersStore.loadOrders(String(search ?? ""));
  },
  { immediate: true },
);
</script>

<template>
  <OrderDeleteModal
    v-model:open="showDeleteModal"
    :order="selectedOrder"
    :loading="ordersStore.deleteLoading"
    @confirm="confirmDeleteOrder"
  />
  <VModal v-model:open="showAddModal" :title="$t('addIncomingOrder')" />
  <div class="d-flex flex-column h-100">
    <div class="orders orders-table__header d-flex align-items-center gap-2 flex-shrink-0">
      <VButton variant="add" icon="plus-lg" @click="showAddModal = true" />
      <VPageTitle :title="$t($route.meta.title ?? '')" :count="ordersCount" />
    </div>
    <VGridTable
      :rows="ordersStore.ordersData"
      :columns="visibleColumns"
      :loading="ordersStore.loading"
      variant="card"
      :click-row="isGroupsRoute"
      class="orders__table orders-table__table flex-grow-1"
      @row-click="openGroup"
    >
      <template #cell-title="{ row }">
        <span class="orders-table__title text-decoration-underline">{{ row.title }}</span>
      </template>
      <template #cell-count="{ row }">
        <div class="orders-table__count d-grid align-items-center">
          <VButton
            variant="circle"
            icon="list-ul"
            class="orders-table__btn-prod align-self-center"
            @click.stop="openGroup(row)"
          />
          <span class="orders-table__count-number align-self-end fw-semibold">
            {{ row.products?.length }}
          </span>
          <span class="orders-table__count-text align-self-start">{{ $t("productCount") }}</span>
        </div>
      </template>
      <template #cell-date="{ row }">
        <div class="orders-table__date orders-table__date--short">
          {{ formatDateShort(toDate(row.date)) }}
        </div>
        <div class="orders-table__date orders-table__date--long">
          {{ formatDateLong(toDate(row.date), locale) }}
        </div>
      </template>
      <template #cell-totalPrice="{ row }">
        <div
          v-for="price in getOrderTotalPrice(row)"
          :key="price.symbol"
          class="orders-table__price"
          :class="{ 'orders-table__price--default': price.isDefault }"
        >
          {{ formatCurrencyValue(price.value) }}
          <span class="orders-table__price-symbol">{{ getCurrencySymbol(price.symbol) }}</span>
        </div>
      </template>
      <template #cell-action="{ row }">
        <div
          v-if="isGroupsRoute && row.id === openOrderId"
          class="orders-table__open-indicator d-flex align-items-center justify-content-center h-100 w-100"
        >
          <i class="bi bi-chevron-right" />
        </div>
        <VButton
          v-else-if="!isGroupsRoute"
          variant="icon"
          icon="trash"
          class="orders-table__delete flex-grow-1 h-100"
          @click="openDeleteModal(row)"
        />
      </template>
      <template v-if="ordersStore.hasError || !ordersStore.ordersData.length" #message>
        <VEmptyState
          :name="t('orders')"
          :has-error="ordersStore.hasError"
          :has-search="!!route.query.search"
        />
      </template>
    </VGridTable>
  </div>
</template>

<style scoped lang="scss">
.orders-table {
  &__header {
    min-height: $orders-header-height;
  }

  &__table {
    color: $text-table;
  }

  &__title {
    text-underline-offset: 0.25rem;

    @media (max-width: $breakpoint-lg) {
      font-size: $font-size-md;
    }
  }

  &__count {
    grid-template-columns: auto 1fr;
    grid-template-areas:
      "btn-prod count-number"
      "btn-prod count-text";
    column-gap: 0.75rem;
  }

  &__price {
    color: $text-muted;
    font-size: $font-size-md;

    @media (max-width: $breakpoint-xl) {
      font-size: $small-font-size;
    }

    &--default {
      color: $text-table;
      font-size: $font-size;

      @media (max-width: $breakpoint-xl) {
        font-size: $font-size-md;
      }
    }
  }

  &__price-symbol {
    font-size: $small-font-size;
  }

  &__date {
    &--short {
      font-size: $small-font-size;
      color: $text-muted;
    }

    &--long {
      @media (max-width: $breakpoint-xl) {
        font-size: $font-size-md;
      }
    }
  }

  &__btn-prod {
    grid-area: btn-prod;
  }

  &__count-number {
    grid-area: count-number;
    font-size: $font-size-lg;

    @media (max-width: $breakpoint-xl) {
      font-size: $font-size;
    }
  }

  &__count-text {
    grid-area: count-text;
    font-size: $small-font-size;
    color: $text-muted;
  }

  &__delete {
    &:hover {
      color: $danger;
    }
  }

  &__open-indicator {
    background-color: $text-muted;
    color: $surface-bg;
  }
}
</style>
