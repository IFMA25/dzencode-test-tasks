import { Order } from "../types";

import { apiClient } from "@/shared/api/apiClient";

export const getOrdersRequest = async (): Promise<Order[]> => {
  const { data } = await apiClient.get("/orders");

  return data;
};

export const deleteOrderRequest = async (id: Order["id"]): Promise<void> => {
  await apiClient.delete(`/orders/${id}`);
};
