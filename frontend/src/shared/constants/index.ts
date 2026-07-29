import type { ProductCondition } from "@/shared/types";

export const STORAGE_KEYS = {
  lang: "lang",
  productTypeFilter: "productTypeFilter",
} as const;

export const PRODUCT_CONDITIONS: Record<
  ProductCondition,
  { labelKey: string; dotClass: string; textClass: string }
> = {
  new: { labelKey: "productNew", dotClass: "bg-success", textClass: "text-success" },
  used: { labelKey: "productUsed", dotClass: "", textClass: "" },
};
