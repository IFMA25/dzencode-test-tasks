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
  primary: "btn rounded-pill v-button--primary",
  text: "btn btn-link text-decoration-none v-button--text",
  icon: "btn btn-link text-decoration-none v-button--icon",
  circle: "btn btn-light rounded-circle p-0 v-button--circle",
  add: "btn rounded-circle p-0 v-button--add",
  nav: "v-button--nav",
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
    <VLoader
      v-if="loading"
      size="sm"
      :color="textColor ? `var(--bs-${textColor})` : undefined"
    />
    <i
      v-else-if="icon"
      class="bi"
      :class="[`bi-${icon}`, textColor ? `text-${textColor}` : '']"
    />

    <span
      v-if="text"
      :class="textColor ? `text-${textColor}` : ''"
    >
      {{ text }}
    </span>
  </component>
</template>

<style scoped lang="scss">
.v-button {
  transition: all 0.2s ease;

  &--primary {
    padding: 0.5rem 1.25rem;
    font-weight: $font-weight-semibold;
  }

  &--text {
    padding: 0.5rem 1.25rem;
    border: 1px solid transparent;
    border-radius: 50rem;

    &:hover {
      border-color: $border-color;
      box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    }
  }

  &--icon {
    padding: 0.25rem;
    font-size: 1.1rem;
    line-height: 1;
  }

  &--circle {
    width: 2rem;
    height: 2rem;
    font-size: 1rem;
    border: 1px solid $border-color;
  }

  &--add {
    width: 2.25rem;
    height: 2.25rem;
    background-color: $primary;
    border: 3px solid $success;
    color: $surface-bg;
    font-size: 1.1rem;
  }

  &--nav {
    display: block;
    width: 100%;
    padding: 0.75rem 0;
    border: 0;
    background: transparent;
    color: $body-color;
    font-weight: $font-weight-medium;
    letter-spacing: $letter-spacing-uppercase;
    text-align: center;
    text-transform: uppercase;
    text-decoration: none;

    &-active {
      border-bottom: 2px solid $primary;
      color: $body-color;
    }
  }
}
</style>
