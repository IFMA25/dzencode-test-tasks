<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { toast } from "vue-sonner";

import OrderDeleteModal from "./components/OrderDeleteModal.vue";
import { getOrderTotalPrice } from "./utils";

import type { Order } from "@/shared/types";
import VButton from "@/shared/ui/VButton.vue";
import VGridTable, { type GridTableColumn } from "@/shared/ui/VGridTable.vue";
import VModal from "@/shared/ui/VModal.vue";
import VPageTitle from "@/shared/ui/VPageTitle.vue";
import { formatDateLong, formatDateShort, getCurrencySymbol } from "@/shared/utils";
import { useOrdersStore } from "@/stores/useOrdersStore";

const ordersStore = useOrdersStore();
const { locale } = useI18n();

const selectedOrder = ref<Order | null>(null);
const showDeleteModal = ref(false);
const showAddModal = ref(false);

const columns: GridTableColumn<Order>[] = [
  { key: "title", width: "minmax(0, 50%)", position: "d-flex" },
  { key: "count", width: "minmax(0, 15%)", position: "d-flex justify-content-center" },
  {
    key: "date",
    width: "minmax(0, 15%)",
    position: "d-flex flex-column justify-content-center",
  },
  {
    key: "totalPrice",
    width: "minmax(0, 15%)",
    position: "d-flex flex-column justify-content-center",
  },
  { key: "action", width: "minmax(0, 5%)", position: "d-flex justify-content-center" },
];

const toDate = (date: string) => new Date(date.replace(" ", "T"));

const openDeleteModal = (order: Order) => {
  selectedOrder.value = order;
  showDeleteModal.value = true;
};

const confirmDeleteOrder = async () => {
  await ordersStore.deleteOrder(selectedOrder.value!.id);

  if (ordersStore.errorMessage) {
    toast.error(ordersStore.errorMessage);
    return;
  }

  showDeleteModal.value = false;
};

const ordersCount = computed(() => {
  return ordersStore.ordersData.length;
});

onMounted(() => {
  ordersStore.loadOrders();
});
</script>

<template>
  <OrderDeleteModal
    v-model:open="showDeleteModal"
    :order="selectedOrder"
    :loading="ordersStore.loading"
    @confirm="confirmDeleteOrder"
  />

  <VModal
    v-model:open="showAddModal"
    :title="$t('addIncomingOrder')"
  />

  <div class="d-flex flex-column h-100">
    <div class="orders d-flex align-items-center gap-2 mb-4 flex-shrink-0">
      <VButton
        variant="add"
        icon="plus-lg"
        @click="showAddModal = true"
      />
      <VPageTitle class="m-0" />
      <span>/</span>
      <span class="orders__count">{{ ordersCount }}</span>
    </div>

    <div class="orders-table-scroll flex-grow-1 overflow-y-auto">
      <VGridTable
        :rows="ordersStore.ordersData"
        :columns="columns"
        :loading="ordersStore.loading"
        variant="card"
        class="orders__table orders-table__table"
      >
        <template #cell-title="{ row }">
          <span class="orders-table__title">{{ row.title }}</span>
        </template>
        <template #cell-count="{ row }">
          <div class="orders-table__count d-grid align-items-center">
            <VButton
              variant="circle"
              icon="list-ul"
              class="orders-table__btn-prod align-self-center"
            />
            <span class="orders-table__count-number align-self-end">
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
            {{ price.value }}
            <span class="orders-table__price-symbol">{{ getCurrencySymbol(price.symbol) }}</span>
          </div>
        </template>
        <template #cell-action="{ row }">
          <VButton
            variant="icon"
            icon="trash"
            class="orders-table__delete flex-grow-1 h-100"
            @click="openDeleteModal(row)"
          />
        </template>

        <template
          v-if="ordersStore.errorMessage || !ordersStore.ordersData.length"
          #message
        >
          {{ ordersStore.errorMessage || $t("emptyOrdersTable") }}
        </template>
      </VGridTable>
    </div>
  </div>
</template>

<style scoped lang="scss">
.orders-table {
  &__table {
    color: $text-table;
  }

  &__title {
    text-decoration: underline;
    text-underline-offset: 0.25rem;

    @media (max-width: 992px) {
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

    @media (max-width: 1200px) {
      font-size: $small-font-size;
    }

    &--default {
      color: $text-table;
      font-size: $font-size;

      @media (max-width: 1200px) {
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
      @media (max-width: 1200px) {
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
    font-weight: $font-weight-semibold;

    @media (max-width: 1200px) {
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
}
</style>
