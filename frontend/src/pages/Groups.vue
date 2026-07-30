<script setup lang="ts">
import GroupsFeature from "@/features/groups/GroupsFeature.vue";
import type { Order } from "@/shared/types";

const { order } = defineProps<{
  order?: Order;
}>();
</script>

<template>
  <GroupsFeature :order="order" />
</template>
