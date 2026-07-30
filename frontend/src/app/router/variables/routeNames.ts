export const RouteNames = {
  orders: "orders",
  groups: "groups",
  products: "products",
  users: "users",
  settings: "settings",
  profileSettings: "profileSettings",
  analytics: "analytics",
  notFound: "notFound",
} as const;

export type RouteName = (typeof RouteNames)[keyof typeof RouteNames];
