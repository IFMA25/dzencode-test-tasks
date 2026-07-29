<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

import { RouteNames } from "@/app/router/variables/routeNames";
import OrdersFeature from "@/features/orders/OrdersFeature.vue";
import { useOrdersStore } from "@/stores/useOrdersStore";

const route = useRoute();
const ordersStore = useOrdersStore();

const isGroupsRoute = computed(() => route.name === RouteNames.groups);

const selectedOrder = computed(
  () => ordersStore.ordersData.find((order) => order.id === Number(route.params.id)) ?? null,
);
</script>

<template>
  <div class="orders-page d-flex gap-3 h-100">
    <div :class="isGroupsRoute ? 'orders-page__orders' : 'orders-page__orders--full'">
      <OrdersFeature />
    </div>

    <router-view v-if="isGroupsRoute" v-slot="{ Component }">
      <component
        :is="Component"
        :order="selectedOrder"
        :has-error="ordersStore.hasError"
        class="orders-page__groups flex-grow-1 p-4 border"
      />
    </router-view>
  </div>
</template>

<style scoped lang="scss">
.orders-page {
  min-height: 0;

  &__orders {
    width: 35%;
    min-height: 0;
    flex-shrink: 0;
  }

  &__orders--full {
    flex-grow: 1;
    min-width: 0;
    min-height: 0;
  }

  &__groups {
    min-width: 0;
    min-height: 0;
    height: calc(100% - #{$orders-header-height});
    margin-top: $orders-header-height;
    background-color: $surface-bg;
    border-radius: 0.25rem;
  }
}
</style>
