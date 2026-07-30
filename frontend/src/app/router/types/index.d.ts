import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    title?: string;
    titleMenu?: string;
    iconMenu?: string;
    showInMenu?: boolean;
    search?: boolean;
  }
}
