<script setup lang="ts" generic="T extends { id: string | number }">
import VLoader from "./VLoader.vue";

export interface GridTableColumn<T> {
  key: keyof T | string;
  styles?: string;
  width?: string;
}

const {
  rows = [],
  columns = [],
  loading = false,
  variant = "card",
  clickRow = false,
} = defineProps<{
  rows: T[];
  columns?: GridTableColumn<T>[];
  loading?: boolean;
  variant?: "card" | "list";
  clickRow?: boolean;
}>();

defineEmits<{
  rowClick: [row: T];
}>();
</script>

<template>
  <div class="v-grid-table position-relative h-100 d-flex flex-column">
    <div v-if="$slots.toolbar" class="v-grid-table__toolbar flex-shrink-0">
      <slot name="toolbar" />
    </div>
    <div class="v-grid-table__body flex-grow-1 overflow-y-auto">
      <VLoader
        v-if="loading"
        size="lg"
        color="var(--bs-primary)"
        class="v-grid-table__loader position-absolute top-50 start-50 translate-middle z-1"
      />
      <div v-else-if="$slots.message" class="v-grid-table__message d-flex h-100">
        <slot name="message" />
      </div>
      <div
        v-else
        class="v-grid-table__grid d-grid"
        :class="`v-grid-table__grid--${variant}`"
        :style="{ gridTemplateColumns: columns.map((column) => column.width ?? '1fr').join(' ') }"
      >
        <div
          v-for="row in rows"
          :key="row.id"
          class="v-grid-table__row d-grid"
          :class="{ border: variant === 'card', 'v-grid-table__row--clickable': clickRow }"
          @click="clickRow && $emit('rowClick', row)"
        >
          <div
            v-for="column in columns"
            :key="String(column.key)"
            class="v-grid-table__cell d-flex align-items-center animate__animated animate__fadeIn"
            :class="column.styles"
          >
            <slot :name="`cell-${String(column.key)}`" :row="row">
              {{ String(row[column.key as keyof T] ?? "") }}
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.v-grid-table {
  min-height: 0;
  min-width: 0;
  --animate-duration: 1s;

  &__body {
    min-height: 0;
    min-width: 0;
    overflow-x: auto;
    scrollbar-width: thin;
    scrollbar-color: $scrollbar-color transparent;

    &::-webkit-scrollbar {
      width: 0.25rem;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 0.25rem;
      background-color: $scrollbar-color;
    }
  }

  &__cell {
    padding: 0.5rem 0.75rem;
  }

  &__row {
    grid-template-columns: subgrid;
    grid-column: 1 / -1;
    column-gap: 3px;

    &--clickable {
      cursor: pointer;
    }
  }

  &__grid--card {
    row-gap: 0.75rem;

    .v-grid-table__row {
      background-color: $surface-bg;
      border-radius: 0.25rem;
      transition: all 0.2s ease;

      &:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      }
    }
  }

  &__grid--list {
    row-gap: 0;

    .v-grid-table__row {
      border-bottom: 1px solid $border-color;
      transition: all 0.2s ease;

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      }
    }

    .v-grid-table__cell {
      padding: 1rem 0.75rem;
    }
  }
}
</style>
