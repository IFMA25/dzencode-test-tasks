<script setup lang="ts">
import TopMenu from "@/widgets/topMenu/TopMenu.vue";
</script>

<template>
  <TopMenu />
  <main>
    <div class="container content__container" />
  </main>
</template>

<style scoped lang="scss">
.content__container {
  padding-top: $header-height;
}
</style>
