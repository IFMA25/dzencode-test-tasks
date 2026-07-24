<script setup lang="ts">
import CurrentDateTimeFeature from "@/features/currentDateTime/components/CurrentDateTimeFeature.vue";
import VInput from "@/shared/ui/VInput.vue";
import VLogo from "@/shared/ui/VLogo.vue";
</script>
<template>
  <header class="top-menu">
    <div class="container d-flex align-items-center gap-4 py-2">
      <VLogo />
      <VInput
        type="search"
        placeholder="Поиск"
      />
      <CurrentDateTimeFeature class="ms-auto" />
    </div>
  </header>
</template>

<style scoped lang="scss">
.top-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: $header-height;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  z-index: 1;
}
</style>
