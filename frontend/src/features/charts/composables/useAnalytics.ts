import { ref } from "vue";

import { getAnalyticsRequest } from "@/shared/api/apiAnalytics";
import { AnalyticsData } from "@/shared/types";

export const useAnalytics = () => {
  const analyticsData = ref<AnalyticsData | null>(null);
  const loading = ref(false);
  const hasError = ref(false);

  const loadAnalytics = async () => {
    try {
      loading.value = true;
      hasError.value = false;
      analyticsData.value = await getAnalyticsRequest();
    } catch (e) {
      hasError.value = true;
      console.error(e);
    } finally {
      loading.value = false;
    }
  };

  return {
    analyticsData,
    loading,
    hasError,
    loadAnalytics,
  };
};
