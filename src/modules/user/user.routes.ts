import { RouteRecordRaw } from "vue-router";

export default [
    {
        path: "/user",
        name: "user",
        alias: "/",
        redirect: { name: "user.list" },
        children: [
            {
                path: "list",
                name: "user.list",
                component: () => import("@/modules/user/pages/UserList.vue"),
                meta: {
                    title: "Пользователи"
                }
            },
            {
                path: ":id",
                name: "user.show",
                component: () => import("@/modules/user/pages/UserShow.vue"),
                meta: {
                    breadCrumbItemTitle: "Просмотр",
                    title: "Просмотреть пользователь"
                }
            },
            {
                path: "create",
                name: "user.create",
                component: () => import("@/modules/user/pages/UserCreateOrUpdate.vue"),
                meta: {
                    breadCrumbItemTitle: "Добавить",
                    title: "Добавить новую пользователь",
                    method: "create"
                }
            },
            {
                path: ":id/edit",
                name: "user.edit",
                component: () => import("@/modules/user/pages/UserCreateOrUpdate.vue"),
                meta: {
                    breadCrumbItemTitle: "Редактировать",
                    title: "Редактировать пользователь",
                    method: "update"
                }
            }
        ]
    }
] as RouteRecordRaw[];