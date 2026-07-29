import type { RouteLocationRaw } from "vue-router";

export interface NavItem {
  text: string;
  icon: string;
  to: RouteLocationRaw;
  exact?: boolean;
}
