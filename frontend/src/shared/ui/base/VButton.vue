<script setup lang="ts">
import { computed } from "vue";
import { RouterLink, type RouteLocationRaw } from "vue-router";

import VLoader from "./VLoader.vue";

const {
  variant = "primary",
  text = "",
  icon = "",
  color = "",
  textColor = "",
  type = "button",
  disabled = false,
  loading = false,
  to = null,
  activeClass = "v-button--nav-active",
} = defineProps<{
  variant?: "primary" | "text" | "icon" | "circle" | "add" | "nav";
  text?: string;
  icon?: string;
  color?: string;
  textColor?: string;
  type?: string;
  disabled?: boolean;
  loading?: boolean;
  to?: RouteLocationRaw | null;
  activeClass?: string;
}>();

const isDisabled = computed(() => disabled || loading);
const isRouterLink = computed(() => !!to);

const variantBase: Record<string, string> = {
  primary: "btn rounded-pill fw-semibold v-button--primary",
  text: "btn btn-link text-decoration-none rounded-pill v-button--text",
  icon: "btn btn-link text-decoration-none p-1 lh-1 v-button--icon",
  circle: "btn btn-light rounded-circle border p-0 v-button--circle",
  add: "btn rounded-circle bg-primary p-0 v-button--add",
  nav: "d-block w-100 border-0 bg-transparent text-body text-center text-uppercase text-decoration-none v-button--nav",
};

const bgColorVariants = ["primary"];
const textColorVariants = ["text", "icon"];

const variantClass = computed(() => {
  const base = variantBase[variant] ?? "btn";

  if (bgColorVariants.includes(variant)) return `${base} btn-${color}`;
  if (textColorVariants.includes(variant)) return `${base} text-${color}`;

  return base;
});
</script>

<template>
  <component
    :is="isRouterLink ? RouterLink : 'button'"
    :to="isRouterLink ? to : undefined"
    :active-class="isRouterLink ? activeClass : undefined"
    :type="!isRouterLink ? type : undefined"
    :disabled="!isRouterLink ? isDisabled : undefined"
    :aria-disabled="isDisabled"
    class="v-button d-inline-flex align-items-center justify-content-center gap-2"
    :class="variantClass"
  >
    <VLoader v-if="loading" size="sm" :color="textColor ? `var(--bs-${textColor})` : undefined" />
    <i v-else-if="icon" class="bi" :class="[`bi-${icon}`, textColor ? `text-${textColor}` : '']" />

    <span v-if="text" :class="textColor ? `text-${textColor}` : ''">
      {{ text }}
    </span>
  </component>
</template>

<style scoped lang="scss">
.v-button {
  transition: all 0.2s ease;

  &--primary {
    padding: 0.5rem 1.25rem;
  }

  &--text {
    padding: 0.5rem 1.25rem;

    &:hover {
      color: $text-muted !important;
    }
  }

  &--icon {
    font-size: 1.1rem;
  }

  &--circle {
    width: 2rem;
    height: 2rem;
    font-size: 1rem;
  }

  &--add {
    width: 2.25rem;
    height: 2.25rem;
    border: 3px solid $success;
    color: $surface-bg;
    font-size: 1.1rem;
  }

  &--nav {
    padding: 0.75rem 0;
    font-weight: $font-weight-medium;
    letter-spacing: $letter-spacing-uppercase;

    &-active {
      border-bottom: 2px solid $primary;
    }
  }
}
</style>
