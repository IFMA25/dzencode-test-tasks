export const STORAGE_KEYS = {
  lang: "lang",
  productTypeFilter: "productTypeFilter",
} as const;

export const PRODUCT_CONDITIONS = {
  new: { labelKey: "productNew", dotClass: "bg-success", textClass: "text-success" },
  used: { labelKey: "productUsed", dotClass: "", textClass: "" },
} as const;

export const EMPTY_STATE_MESSAGES = {
  error: { textKey: "errorMessage", variant: "danger" },
  notFound: { textKey: "searchNotFound", variant: "primary" },
  empty: { textKey: "emptyTable", variant: "primary" },
} as const;
