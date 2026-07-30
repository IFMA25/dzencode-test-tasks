<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import { EMPTY_STATE_MESSAGES } from "@/shared/constants";
import { getEmptyStateKey } from "@/shared/utils/getEmptyStateKey";

const {
  text,
  name = "",
  hasError = false,
  hasSearch = false,
} = defineProps<{
  text?: string;
  name?: string;
  hasError?: boolean;
  hasSearch?: boolean;
}>();

const { t } = useI18n();

const message = computed(() => {
  if (text) return { text, variant: "primary" as const };

  const { textKey, variant } = EMPTY_STATE_MESSAGES[getEmptyStateKey(hasError, hasSearch)];

  return { text: t(textKey, { name: name.toLowerCase() }), variant };
});
</script>

<template>
  <div
    class="v-empty-state flex-grow-1 d-flex align-items-center justify-content-center fw-medium"
    :class="`text-${message.variant}`"
  >
    {{ message.text }}
  </div>
</template>
