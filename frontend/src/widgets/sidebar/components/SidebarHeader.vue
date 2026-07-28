<script setup lang="ts">
import { useRouter } from "vue-router";

import { RouteNames } from "@/app/router/variables/routeNames";
import VButton from "@/shared/ui/VButton.vue";

const router = useRouter();
</script>

<template>
  <div class="sidebar-header d-flex justify-content-center py-4">
    <div class="sidebar-header__avatar position-relative">
      <img
        src="/avatar-photo.png"
        alt="avatar-photo"
        class="sidebar-header__avatar-img rounded-circle w-100 h-100 border object-fit-cover"
      />

      <VButton
        variant="circle"
        icon="gear"
        class="sidebar-header__settings position-absolute"
        @click="router.push({ name: RouteNames.profileSettings })"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.sidebar-header {
  &__avatar {
    width: 6rem;
    height: 6rem;
  }

  &__avatar-img {
    object-position: center top;
  }

  &__settings {
    right: -0.25rem;
    bottom: -0.25rem;
  }
}
</style>
