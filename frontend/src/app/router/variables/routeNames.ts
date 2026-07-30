export const ROUTE_NAMES = {
  orders: "orders",
  groups: "groups",
  products: "products",
  users: "users",
  settings: "settings",
  profileSettings: "profileSettings",
  analytics: "analytics",
  notFound: "notFound",
} as const;

export type RouteName = (typeof ROUTE_NAMES)[keyof typeof ROUTE_NAMES];
