import { Product } from "../types";

import { apiClient } from "@/shared/api/apiClient";

export const getProductsRequest = async (type?: string): Promise<Product[]> => {
  const { data } = await apiClient.get("/products", { params: { type } });

  return data;
};

export const getProductTypesRequest = async (): Promise<string[]> => {
  const { data } = await apiClient.get("/products/types");

  return data;
};
