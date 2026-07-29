import { Order } from "../types";

import { apiClient } from "@/shared/api/apiClient";

export const getOrdersRequest = async (
  params?: { search?: string },
  signal?: AbortSignal,
): Promise<Order[]> => {
  const { data } = await apiClient.get("/orders", { params, signal });

  return data;
};

export const deleteOrderRequest = async (id: Order["id"]): Promise<void> => {
  await apiClient.delete(`/orders/${id}`);
};
