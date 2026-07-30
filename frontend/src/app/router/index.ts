import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import { ROUTE_NAMES } from "./variables/routeNames";

import i18n from "@/shared/i18n";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: ROUTE_NAMES.orders,
    component: () => import("@/pages/Orders.vue"),
    meta: {
      title: "orders",
      titleMenu: "orders",
      iconMenu: "receipt",
    },
    children: [
      {
        path: "groups/:id?",
        name: ROUTE_NAMES.groups,
        component: () => import("@/pages/Groups.vue"),
        meta: {
          title: "orders",
          titleMenu: "groups",
          iconMenu: "collection",
        },
      },
    ],
  },
  {
    path: "/products",
    name: ROUTE_NAMES.products,
    component: () => import("@/pages/Products.vue"),
    meta: {
      title: "products",
      titleMenu: "products",
      iconMenu: "box-seam",
    },
  },
  {
    path: "/settings",
    name: ROUTE_NAMES.settings,
    component: () => import("@/pages/Settings.vue"),
    meta: {
      title: "settings",
      titleMenu: "settings",
      iconMenu: "gear",
    },
  },
  {
    path: "/users",
    name: ROUTE_NAMES.users,
    component: () => import("@/pages/Users.vue"),
    meta: {
      title: "users",
      titleMenu: "users",
      iconMenu: "people",
    },
  },
  {
    path: "/profile-settings",
    name: ROUTE_NAMES.profileSettings,
    component: () => import("@/pages/ProfileSettings.vue"),
    meta: {
      title: "profileSettings",
      showInMenu: false,
    },
  },
  {
    path: "/analytics",
    name: ROUTE_NAMES.analytics,
    component: () => import("@/pages/Analytics.vue"),
    meta: {
      title: "analytics",
      titleMenu: "analytics",
      iconMenu: "graph-up-arrow",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: ROUTE_NAMES.notFound,
    component: () => import("@/pages/NotFound.vue"),
    meta: {
      title: "notFound",
      showInMenu: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.afterEach((to) => {
  document.title = i18n.global.t(to.meta.title ?? "");
});

export default router;
