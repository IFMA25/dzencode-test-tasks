<script setup lang="ts">
import GroupsFeature from "@/features/groups/GroupsFeature.vue";
import type { Order } from "@/shared/types";

const { order, hasError = false } = defineProps<{
  order?: Order;
  hasError?: boolean;
}>();
</script>

<template>
  <GroupsFeature :order="order" :has-error="hasError" />
</template>
