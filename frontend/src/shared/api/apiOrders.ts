import { Order } from "../types";

import { apiClient } from "@/shared/api/apiClient";

export const getOrders = async (): Promise<Order[]> => {
  const { data } = await apiClient.get("/orders");

  return data;
};
