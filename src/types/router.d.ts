export type LayoutType = "MainLayout" | "AuthLayout";

declare module "vue-router" {
    interface RouteMeta {
        title?: string,
        breadCrumbItemTitle?: string,
        method?: "update" | "show" | "create"
        layout?: "MainLayout" | "AuthLayout",

        [key: string]: any,
    }
}