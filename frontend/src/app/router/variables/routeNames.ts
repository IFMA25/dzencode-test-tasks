export const RouteNames = {
  orders: "orders",
  groups: "groups",
  products: "products",
  users: "users",
  settings: "settings",
  notFound: "notFound",
} as const;

export type RouteName = (typeof RouteNames)[keyof typeof RouteNames];
