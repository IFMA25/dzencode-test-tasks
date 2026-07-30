<script setup lang="ts">
import { ref } from "vue";

import ActiveSessionsFeature from "@/features/activeSessions/ActiveSessionsFeature.vue";
import CurrentDateTimeFeature from "@/features/currentDateTime/components/CurrentDateTimeFeature.vue";
import SearchFeature from "@/features/search/SearchFeature.vue";
import LangSelect from "@/features/translation/components/LangSelect.vue";
import VButton from "@/shared/ui/base/VButton.vue";
import VLogo from "@/shared/ui/base/VLogo.vue";

const isSearchOpen = ref(false);
</script>

<template>
  <header class="top-menu sticky-top w-100">
    <div class="container d-flex align-items-center gap-2 py-2">
      <VLogo v-if="!isSearchOpen" class="me-0 me-sm-3" />

      <SearchFeature
        class="top-menu__search"
        :class="{
          'top-menu__search--open animate__animated animate__fadeIn': isSearchOpen,
          'd-none d-lg-block': !isSearchOpen,
        }"
        :autofocus="isSearchOpen"
      />

      <VButton
        variant="circle"
        :icon="isSearchOpen ? 'x' : 'search'"
        class="d-lg-none"
        :class="{ 'ms-auto': !isSearchOpen }"
        @click="isSearchOpen = !isSearchOpen"
      />

      <div
        v-if="!isSearchOpen"
        class="d-flex flex-wrap justify-content-end align-items-center ms-auto gap-3"
      >
        <div class="d-flex flex-column-reverse flex-xl-row gap-1 gap-xl-5 align-items-end">
          <ActiveSessionsFeature class="align-self-start align-self-xl-auto" />
          <CurrentDateTimeFeature />
        </div>
        <LangSelect />
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.top-menu {
  background-color: $surface-bg;
  box-shadow: $surface-shadow;

  .container {
    min-height: $top-menu-height;
  }

  .top-menu__search--open {
    flex: 1;
    max-width: none;
  }
}
</style>
