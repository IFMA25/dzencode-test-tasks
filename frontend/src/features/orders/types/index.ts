import type { Order } from "@/shared/types";
import type { GridTableColumn } from "@/shared/ui/base/VGridTable.vue";

export interface OrderColumn extends GridTableColumn<Order> {
  isGroupsColumn?: boolean;
  groupsWidth?: string;
}
