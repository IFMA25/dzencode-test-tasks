<script setup lang="ts">
import { Toaster } from "vue-sonner";

import MasterLayout from "@/app/layouts/MasterLayout.vue";

import "vue-sonner/style.css";
</script>

<template>
  <MasterLayout />
  <Toaster position="top-right" rich-colors />
</template>
