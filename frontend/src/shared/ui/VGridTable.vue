<script setup lang="ts" generic="T extends { id: string | number }">
import VLoader from "./VLoader.vue";

export interface GridTableColumn<T> {
  key: keyof T | string;
  position?: string;
  width?: string;
}

const {
  rows = [],
  columns = [],
  loading = false,
  variant = "card",
} = defineProps<{
  rows: T[];
  columns?: GridTableColumn<T>[];
  loading?: boolean;
  variant?: "card" | "list";
}>();

defineEmits<{
  "load-more": [currentLimit: number];
  select: [row: T];
}>();
</script>

<template>
  <div class="v-grid-table position-relative h-100">
    <div
      v-if="$slots.toolbar"
      class="v-grid-table__toolbar"
    >
      <slot name="toolbar" />
    </div>

    <VLoader
      v-if="loading"
      size="lg"
      color="var(--bs-primary)"
      class="v-grid-table__loader position-absolute top-50 start-50 translate-middle"
    />

    <div
      v-else-if="$slots.message"
      class="v-grid-table__message text-center text-muted py-5"
    >
      <slot name="message" />
    </div>

    <div
      v-else
      class="v-grid-table__grid"
      :class="`v-grid-table__grid--${variant}`"
      :style="{ gridTemplateColumns: columns.map((column) => column.width ?? '1fr').join(' ') }"
    >
      <div
        v-for="row in rows"
        :key="row.id"
        class="v-grid-table__row"
        @click="$emit('select', row)"
      >
        <div
          v-for="column in columns"
          :key="String(column.key)"
          class="v-grid-table__cell"
          :class="column.position"
        >
          <slot
            :name="`cell-${String(column.key)}`"
            :row="row"
          >
            {{ String(row[column.key as keyof T] ?? "") }}
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.v-grid-table {
  &__loader {
    z-index: 1;
  }

  &__grid {
    display: grid;
  }

  &__cell {
    align-items: center;
  }

  &__row {
    display: grid;
    grid-template-columns: subgrid;
    grid-column: 1 / -1;
    align-items: stretch;
    cursor: pointer;
    transition: background-color 0.15s ease;
  }

  &__cell {
    padding: 0 0.5rem;
  }

  &__grid--card {
    row-gap: 0.75rem;

    .v-grid-table__row {
      background-color: $surface-bg;
      border: 1px solid $border-color;
      border-radius: 0.25rem;
      padding: 0.75rem 1.25rem;
      transition: all 0.2s ease;

      &:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      }
    }
  }

  &__grid--list {
    row-gap: 0;

    .v-grid-table__row {
      padding: 1rem 0.75rem;
      border-bottom: 1px solid $border-color;

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        background-color: $body-bg-secondary;
      }
    }
  }
}
</style>
