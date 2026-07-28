<script setup lang="ts">
import { io } from "socket.io-client";
import { onUnmounted, ref } from "vue";

const count = ref(0);

const socket = io();

socket.on("sessions:count", (value: number) => {
  count.value = value;
});

onUnmounted(() => {
  socket.disconnect();
});
</script>

<template>
  <div class="active-sessions d-flex align-items-baseline gap-2">
    <i
      class="active-sessions__icon bi bi-circle-fill"
      :class="{
        'active-sessions__icon--active text-success': count > 0,
        'animate__animated animate__flash animate__infinite': count > 0,
      }"
    />
    <span class="active-sessions__text">{{ $t("activeSessions") }}</span>
    <span class="active-sessions__number fw-semibold">{{ count }}</span>
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
  }

  &__icon {
    font-size: $small-font-size;
    color: $text-muted;

    &--active {
      --animate-duration: 3s;
    }
  }
}
</style>
