<script setup lang="ts">
import { useRoute } from "vue-router";
</script>

<template>
  <h1 class="v-page-title">
    {{ $t(useRoute().meta.title ?? "") }}
  </h1>
</template>

<style scoped lang="scss">
.v-page-title {
  font-size: $font-size-lg;
  font-weight: $font-weight-semibold;
  color: $headings-color;
}
</style>
