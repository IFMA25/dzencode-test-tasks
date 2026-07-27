import { defineStore } from "pinia";
import { ref } from "vue";

import { deleteOrderRequest, getOrdersRequest } from "@/shared/api/apiOrders";
import { Order } from "@/shared/types";

export const useOrdersStore = defineStore("orders", () => {
  const ordersData = ref<Order[]>([]);
  const loading = ref(false);
  const errorMessage = ref("");

  const loadOrders = async () => {
    try {
      loading.value = true;
      const orders = await getOrdersRequest();
      ordersData.value = orders;
    } catch (e) {
      errorMessage.value = e instanceof Error ? e.message : "Failed to load orders";
      console.error(errorMessage.value);
    } finally {
      loading.value = false;
    }
  };

  const deleteOrder = async (id: Order["id"]) => {
    try {
      loading.value = true;
      await deleteOrderRequest(id);
      await loadOrders();
    } catch (e) {
      errorMessage.value = e instanceof Error ? e.message : "Failed to delete order";
      console.error(errorMessage.value);
    } finally {
      loading.value = false;
    }
  };

  return {
    ordersData,
    loading,
    errorMessage,
    loadOrders,
    deleteOrder,
  };
});
