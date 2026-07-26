<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";
import { ref, watch } from "vue";

import SidebarHeader from "./components/SidebarHeader.vue";
import SidebarNavItem from "./components/SidebarNavItem.vue";
import type { NavItem } from "./types";

import VButton from "@/shared/ui/VButton.vue";

defineProps<{
  navItems: NavItem[];
}>();

const isDesktop = useMediaQuery("(min-width: 1200px)");
const isOpen = ref(isDesktop.value);

watch(isDesktop, (value) => {
  isOpen.value = value;
});

const toggle = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <aside
    class="sidebar position-relative"
    :class="{ 'sidebar--collapsed': !isOpen }"
  >
    <SidebarHeader v-if="isOpen" />

    <nav
      class="sidebar__nav"
      :class="{ 'sidebar__nav--offset': !isOpen }"
    >
      <ul class="sidebar__list d-flex flex-column gap-2 list-unstyled m-0">
        <SidebarNavItem
          v-for="item in navItems"
          :key="item.to"
          :item="item"
          :collapsed="!isOpen"
        />
      </ul>
    </nav>

    <VButton
      variant="circle"
      :icon="isOpen ? 'chevron-left' : 'chevron-right'"
      class="sidebar__toggle"
      @click="toggle"
    />
  </aside>
</template>

<style scoped lang="scss">
$sidebar-width: 14rem;
$sidebar-width-collapsed: 4.5rem;

.sidebar {
  width: $sidebar-width;
  background-color: $sidebar-bg;
  border-right: 1px solid $border-color;
  box-shadow: $surface-shadow;
  transition: all 0.2s ease;

  &--collapsed {
    width: $sidebar-width-collapsed;
  }

  &__nav--offset {
    padding-top: $sidebar-header-height;
  }

  &__toggle {
    position: absolute;
    top: 2rem;
    right: 0;
    transform: translate(50%, -50%);
  }
}
</style>
