<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";

import SideBar from "@/widgets/sidebar/SideBar.vue";
import type { NavItem } from "@/widgets/sidebar/types";
import TopMenu from "@/widgets/topMenu/TopMenu.vue";

const router = useRouter();

const navItems = computed<NavItem[]>(() =>
  router
    .getRoutes()
    .filter((route) => route.meta.showInMenu !== false)
    .map((route) => ({
      icon: route.meta.iconMenu ?? "",
      text: route.meta.titleMenu ?? "",
      to: route.path,
    })),
);
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <TopMenu />
    <div class="d-flex flex-grow-1">
      <SideBar :nav-items="navItems" />
      <main class="flex-grow-1">
        <div class="container">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>
