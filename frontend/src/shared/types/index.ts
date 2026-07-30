export interface Option {
  [key: string]: unknown;
}

export interface Price {
  value: number;
  symbol: string;
  isDefault: boolean;
}

export type ProductCondition = "new" | "used";

export interface Product {
  id: number;
  serialNumber: number;
  condition: ProductCondition;
  photo: string;
  title: string;
  type: string;
  specification: string;
  guarantee: {
    start: string;
    end: string;
  };
  price: Price[];
  order: number;
  date: string;
  orderTitle?: string;
}

export interface AnalyticsData {
  ordersByPeriod: { period: string; count: number }[];
  productsPerOrder: { order: number; count: number }[];
  productTypes: { type: string; count: number }[];
}

export interface Order {
  id: number;
  title: string;
  date: string;
  description: string;
  products: Product[];
}
