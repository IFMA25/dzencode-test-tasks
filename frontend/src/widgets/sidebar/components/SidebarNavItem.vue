<script setup lang="ts">
import type { NavItem } from "../types";

defineProps<{
  item: NavItem;
  collapsed?: boolean;
}>();
</script>

<template>
  <li class="nav-item">
    <RouterLink
      :to="item.to"
      class="nav-item__link d-block text-center text-decoration-none py-2 px-3"
      active-class="nav-item__link--active"
    >
      <Transition name="nav-item-content">
        <i
          v-if="collapsed"
          class="nav-item__icon bi"
          :class="`bi-${item.icon}`"
        />
        <span
          v-else
          class="nav-item__text position-relative text-uppercase"
        >
          {{ $t(item.text) }}
        </span>
      </Transition>
    </RouterLink>
  </li>
</template>

<style scoped lang="scss">
.nav-item {
  &__link {
    color: $body-color;
    font-weight: $font-weight-medium;
    line-height: 1.5rem;

    &:hover {
      color: $text-muted;
    }
  }

  &__text {
    letter-spacing: $letter-spacing-uppercase;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: $primary;
      transform: scaleX(0);
      transform-origin: left;
      transition: all 0.3s ease;
    }
  }

  &__icon {
    font-size: $font-size-lg;
  }

  &__link--active {
    .nav-item__text::after {
      transform: scaleX(1);
    }
  }
}

.nav-item-content-enter-active {
  transition: opacity 0.05s ease-in;
  transition-delay: 0.05s;
}

.nav-item-content-leave-active {
  transition: opacity 0.05s ease-in;
}

.nav-item-content-enter-from,
.nav-item-content-leave-to {
  opacity: 0;
}
</style>
