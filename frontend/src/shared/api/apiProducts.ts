import { Product } from "../types";

import { apiClient } from "@/shared/api/apiClient";

export const getProductsRequest = async (
  params?: { type?: string; order?: number; search?: string },
  signal?: AbortSignal,
): Promise<Product[]> => {
  const { data } = await apiClient.get("/products", { params, signal });

  return data;
};

export const getProductTypesRequest = async (): Promise<string[]> => {
  const { data } = await apiClient.get("/products/types");

  return data;
};
