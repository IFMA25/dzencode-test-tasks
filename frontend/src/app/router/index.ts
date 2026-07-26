import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import { RouteNames } from "./variables/routeNames";

import i18n from "@/shared/i18n";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: RouteNames.orders,
    component: () => import("@/pages/Orders.vue"),
    meta: {
      title: "orders",
      titleMenu: "orders",
      iconMenu: "receipt",
    },
  },
  {
    path: "/groups",
    name: RouteNames.groups,
    component: () => import("@/pages/Groups.vue"),
    meta: {
      title: "groups",
      titleMenu: "groups",
      iconMenu: "collection",
    },
  },
  {
    path: "/products",
    name: RouteNames.products,
    component: () => import("@/pages/Products.vue"),
    meta: {
      title: "products",
      titleMenu: "products",
      iconMenu: "box-seam",
    },
  },
  {
    path: "/settings",
    name: RouteNames.settings,
    component: () => import("@/pages/Settings.vue"),
    meta: {
      title: "settings",
      titleMenu: "settings",
      iconMenu: "gear",
    },
  },
  {
    path: "/users",
    name: RouteNames.users,
    component: () => import("@/pages/Users.vue"),
    meta: {
      title: "users",
      titleMenu: "users",
      iconMenu: "people",
    },
  },
  {
    path: "/profile-settings",
    name: RouteNames.profileSettings,
    component: () => import("@/pages/ProfileSettings.vue"),
    meta: {
      title: "profileSettings",
      showInMenu: false,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: RouteNames.notFound,
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
