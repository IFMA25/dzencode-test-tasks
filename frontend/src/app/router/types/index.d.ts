import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    titleMenu?: string;
    iconMenu?: string;
    showInMenu?: boolean;
  }
}
