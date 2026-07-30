import { AnalyticsData } from "../types";

import { apiClient } from "@/shared/api/apiClient";

export const getAnalyticsRequest = async (): Promise<AnalyticsData> => {
  const { data } = await apiClient.get("/analytics");

  return data;
};
