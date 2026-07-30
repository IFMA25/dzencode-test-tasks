<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

import { RouteNames } from "@/app/router/variables/routeNames";
import OrdersFeature from "@/features/orders/OrdersFeature.vue";
import { useOrdersStore } from "@/stores/useOrdersStore";

const route = useRoute();
const ordersStore = useOrdersStore();

const isGroupsRoute = computed(() => route.name === RouteNames.groups);

const isGroupsPanelVisible = computed(() => isGroupsRoute.value && !ordersStore.hasError);

const selectedOrder = computed(
  () => ordersStore.ordersData.find((order) => order.id === Number(route.params.id)) ?? null,
);
</script>

<template>
  <div class="orders-page d-flex gap-3 h-100">
    <div
      class="orders-page__orders"
      :class="{ 'orders-page__orders--collapsed': isGroupsPanelVisible }"
    >
      <OrdersFeature />
    </div>

    <router-view v-if="isGroupsPanelVisible" v-slot="{ Component }">
      <Transition
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
      >
        <component
          :is="Component"
          :order="selectedOrder"
          class="orders-page__groups flex-grow-1 p-4 border"
        />
      </Transition>
    </router-view>
  </div>
</template>

<style scoped lang="scss">
.orders-page {
  min-height: 0;

  &__orders {
    width: 100%;
    min-width: 0;
    min-height: 0;
    flex-shrink: 0;
    transition: width 0.3s ease;

    &--collapsed {
      width: 35%;
    }
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
