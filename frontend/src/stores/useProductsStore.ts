import { watchIgnorable } from "@vueuse/core";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { toast } from "vue-sonner";

import { getProductsRequest, getProductTypesRequest } from "@/shared/api/apiProducts";
import { STORAGE_KEYS } from "@/shared/constants";
import { Product } from "@/shared/types";
import { createAbortController } from "@/shared/utils/createAbortController";
import { getStorageItem, removeStorageItem, setStorageItem } from "@/shared/utils/webStorage";

export const useProductsStore = defineStore("products", () => {
  const productsData = ref<Product[]>([]);
  const productTypes = ref<string[]>([]);
  const loading = ref(false);
  const hasError = ref(false);
  const selectedType = ref<string>("");

  const { t } = useI18n();
  const { getSignal } = createAbortController();

  const loadProducts = async (search?: string) => {
    try {
      loading.value = true;
      hasError.value = false;
      productsData.value = await getProductsRequest(
        {
          type: selectedType.value || undefined,
          search: search || undefined,
        },
        getSignal(),
      );
    } catch (e) {
      if (axios.isCancel(e)) return;
      hasError.value = true;
      console.error(e);
    } finally {
      loading.value = false;
    }
  };

  const loadProductTypes = async () => {
    try {
      productTypes.value = await getProductTypesRequest();
    } catch (e) {
      toast.error(t("errorMessageProductTypes"));
      console.error(e);
    }
  };

  const { ignoreUpdates } = watchIgnorable(selectedType, (type) => {
    if (type) {
      setStorageItem(STORAGE_KEYS.productTypeFilter, type);
    } else {
      removeStorageItem(STORAGE_KEYS.productTypeFilter);
    }

    loadProducts();
  });

  const getInitType = () => {
    ignoreUpdates(() => {
      selectedType.value = getStorageItem(STORAGE_KEYS.productTypeFilter) ?? "";
    });
  };

  return {
    productsData,
    productTypes,
    loading,
    hasError,
    selectedType,
    getInitType,
    loadProducts,
    loadProductTypes,
  };
});
