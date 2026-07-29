<script setup lang="ts">
import { computed } from "vue";

import { routes } from "@/app/router";
import SideBar from "@/widgets/sidebar/SideBar.vue";
import type { NavItem } from "@/widgets/sidebar/types";
import TopMenu from "@/widgets/topMenu/TopMenu.vue";

const navItems = computed<NavItem[]>(() =>
  routes
    .flatMap((route) => [route, ...(route.children ?? [])])
    .filter((route) => route.meta?.showInMenu !== false)
    .map((route) => ({
      icon: route.meta?.iconMenu ?? "",
      text: route.meta?.titleMenu ?? "",
      to: { name: route.name },
      exact: (route.children?.length ?? 0) > 0,
    })),
);
</script>

<template>
  <div class="d-flex flex-column vh-100">
    <TopMenu />
    <div class="d-flex flex-grow-1 layout-body">
      <SideBar :nav-items="navItems" />
      <main class="main-content flex-grow-1 d-flex flex-column">
        <div class="container__content d-flex flex-grow-1 flex-column">
          <router-view v-slot="{ Component }">
            <Transition
              mode="out-in"
              enter-active-class="animate__animated animate__fadeIn"
              leave-active-class="animate__animated animate__fadeOut"
            >
              <component :is="Component" />
            </Transition>
          </router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout-body {
  min-height: 0;
  min-width: 0;
}

.main-content {
  min-height: 0;
  min-width: 0;
}

.container__content {
  min-height: 0;
  min-width: 0;
  padding: $page-padding-y $page-padding-x;

  @media (max-width: 1400px) {
    padding: calc($page-padding-y / 2) calc($page-padding-x / 2);
  }
}
</style>
