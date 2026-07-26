export const RouteNames = {
  orders: "orders",
  groups: "groups",
  products: "products",
  users: "users",
  settings: "settings",
  profileSettings: "profileSettings",
  notFound: "notFound",
} as const;

export type RouteName = (typeof RouteNames)[keyof typeof RouteNames];
