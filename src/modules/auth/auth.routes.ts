import {RouteRecordRaw} from "vue-router";

export default [
    {
        path: "/login",
        name: "auth.login",
        component: () => import("@/modules/auth/pages/Login.vue"),
        meta: {
            layout: "AuthLayout",
            title: "Войти в аккаунт",
            description: "Введите свои учетные данные для доступа к вашей учетной записи"
        }
    },
] as RouteRecordRaw[];
