import { RouteRecordRaw } from "vue-router";

export default [
    {
        path: "/country",
        name: "country",
        redirect: { name: "country.list" },
        children: [
            {
                path: "list",
                name: "country.list",
                component: () => import("@/modules/country/pages/CountryList.vue"),
                meta: {
                    title: "Страны"
                }
            },
            {
                path: ":id",
                name: "country.show",
                component: () => import("@/modules/country/pages/CountryShow.vue"),
                meta: {
                    title: "Просмотреть страну"
                }
            },
            {
                path: "create",
                name: "country.create",
                component: () => import("@/modules/country/pages/CountryCreateOrUpdate.vue"),
                meta: {
                    method: "create",
                    title: "Добавить новую страна",
                    breadCrumbItemTitle: "Добовит"
                }
            },
            {
                path: ":id/edit",
                name: "country.edit",
                component: () => import("@/modules/country/pages/CountryCreateOrUpdate.vue"),
                meta: {
                    method: "update",
                    title: "Редактировать страна",
                    breadCrumbItemTitle: "Редактировать"
                }
            }
        ]
    }
] as RouteRecordRaw[];