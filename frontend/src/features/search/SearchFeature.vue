<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

import VInput from "@/shared/ui/base/VInput.vue";

const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const searchValue = ref(String(route.query.search ?? ""));

const isSearchEnabled = computed(() => route.meta.search === true);

const setSearchQuery = (value: string) => {
  if ((route.query.search ?? "") === value) return;

  const newQuery = { ...route.query };

  if (value) {
    newQuery.search = value;
  } else {
    delete newQuery.search;
  }

  router.replace({ query: newQuery });
};

const handleSearch = (value: string) => {
  searchValue.value = value;
  setSearchQuery(value);
};

watch(
  () => route.query.search,
  (search) => {
    searchValue.value = String(search ?? "");
  },
);
</script>

<template>
  <VInput
    v-model="searchValue"
    type="search"
    :placeholder="t('search')"
    :disabled="!isSearchEnabled"
    @search="handleSearch"
  />
</template>
