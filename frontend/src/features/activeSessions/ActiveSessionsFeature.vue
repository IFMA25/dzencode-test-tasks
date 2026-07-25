<script setup lang="ts">
import { io } from "socket.io-client";
import { onUnmounted, ref } from "vue";

const count = ref(0);

const socket = io(import.meta.env.VITE_API_URL);

socket.on("sessions:count", (value: number) => {
  count.value = value;
});

onUnmounted(() => {
  socket.disconnect();
});
</script>

<template>
  <div class="active-sessions d-flex align-items-end gap-2">
    <i
      class="active-sessions__icon bi bi-circle-fill"
      :class="{
        'active-sessions__icon--active animate__animated animate__flash animate__infinite':
          count > 0,
      }"
    />
    <span class="active-sessions__text">{{ $t("activeSessions") }}</span>
    <span class="active-sessions__number">{{ count }}</span>
  </div>
</template>

<style scoped lang="scss">
.active-sessions {
  &__text {
    font-size: $small-font-size;
    color: $text-muted;
  }

  &__number {
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
  }

  &__icon {
    font-size: $small-font-size;
    color: $text-muted;

    &--active {
      color: $success;
      --animate-duration: 3s;
    }
  }
}
</style>
