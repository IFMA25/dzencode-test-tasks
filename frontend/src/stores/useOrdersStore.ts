import { defineStore } from "pinia";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { toast } from "vue-sonner";

import { deleteOrderRequest, getOrdersRequest } from "@/shared/api/apiOrders";
import { Order } from "@/shared/types";

export const useOrdersStore = defineStore("orders", () => {
  const ordersData = ref<Order[]>([]);
  const loading = ref(false);
  const hasError = ref(false);

  const { t } = useI18n();

  const loadOrders = async () => {
    try {
      loading.value = true;
      hasError.value = false;
      const orders = await getOrdersRequest();
      ordersData.value = orders;
    } catch (e) {
      hasError.value = true;
      console.error(e);
    } finally {
      loading.value = false;
    }
  };

  const deleteOrder = async (id: Order["id"]): Promise<boolean> => {
    try {
      loading.value = true;
      await deleteOrderRequest(id);
      await loadOrders();
      return true;
    } catch (e) {
      toast.error(t("errorMessageDeleteOrder"));
      console.error(e);
      return false;
    } finally {
      loading.value = false;
    }
  };

  return {
    ordersData,
    loading,
    hasError,
    loadOrders,
    deleteOrder,
  };
});
