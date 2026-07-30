import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { toast } from "vue-sonner";

import { deleteOrderRequest, getOrdersRequest } from "@/shared/api/apiOrders";
import { Order } from "@/shared/types";
import { createAbortController } from "@/shared/utils/createAbortController";

export const useOrdersStore = defineStore("orders", () => {
  const ordersData = ref<Order[]>([]);
  const loading = ref(false);
  const deleteLoading = ref(false);
  const hasError = ref(false);

  const { t } = useI18n();
  const { getSignal } = createAbortController();

  const loadOrders = async (search?: string) => {
    try {
      loading.value = true;
      hasError.value = false;
      const orders = await getOrdersRequest({ search: search || undefined }, getSignal());
      ordersData.value = orders;
    } catch (e) {
      if (axios.isCancel(e)) return;
      hasError.value = true;
      console.error(e);
    } finally {
      loading.value = false;
    }
  };

  const deleteOrder = async (id: Order["id"]): Promise<boolean> => {
    try {
      deleteLoading.value = true;
      await deleteOrderRequest(id);
      await loadOrders();
      return true;
    } catch (e) {
      toast.error(t("errorMessageDeleteOrder"));
      console.error(e);
      return false;
    } finally {
      deleteLoading.value = false;
    }
  };

  return {
    ordersData,
    loading,
    deleteLoading,
    hasError,
    loadOrders,
    deleteOrder,
  };
});
