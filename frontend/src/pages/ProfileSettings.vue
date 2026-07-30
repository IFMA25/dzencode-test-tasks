<script setup lang="ts">
import VPageTitle from "@/shared/ui/VPageTitle.vue";
</script>

<template>
  <div class="profile-settings-page">
    <VPageTitle :title="$t($route.meta.title ?? '')" />
  </div>
</template>
