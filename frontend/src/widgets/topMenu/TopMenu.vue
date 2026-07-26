<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

import ActiveSessionsFeature from "@/features/activeSessions/ActiveSessionsFeature.vue";
import CurrentDateTimeFeature from "@/features/currentDateTime/components/CurrentDateTimeFeature.vue";
import LangSelect from "@/features/translation/components/LangSelect.vue";
import VButton from "@/shared/ui/VButton.vue";
import VInput from "@/shared/ui/VInput.vue";
import VLogo from "@/shared/ui/VLogo.vue";

const { t } = useI18n();

const isSearchOpen = ref(false);
</script>

<template>
  <header class="top-menu">
    <div
      v-if="!isSearchOpen"
      class="container d-flex align-items-center gap-4 py-2"
    >
      <VLogo class="me-0 me-sm-3" />

      <VInput
        type="search"
        :placeholder="t('search')"
        class="d-none d-lg-block"
      />

      <div class="d-flex flex-wrap justify-content-end align-items-center ms-auto gap-3">
        <div class="d-flex flex-column-reverse flex-xl-row gap-1 gap-xl-5 align-items-end">
          <ActiveSessionsFeature class="align-self-start align-self-xl-auto" />
          <CurrentDateTimeFeature />
        </div>
        <LangSelect />
        <VButton
          variant="circle"
          icon="search"
          class="d-lg-none"
          @click="isSearchOpen = true"
        />
      </div>
    </div>

    <div
      v-else
      class="container d-flex align-items-center gap-2 py-2"
    >
      <VInput
        type="search"
        :placeholder="t('search')"
        class="top-menu__search-full"
        autofocus
      />
      <VButton
        variant="circle"
        icon="x"
        @click="isSearchOpen = false"
      />
    </div>
  </header>
</template>

<style scoped lang="scss">
.top-menu {
  position: sticky;
  top: 0;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  z-index: 1;

  :deep(.top-menu__search-full) {
    flex: 1;
    max-width: none;
  }
}
</style>
