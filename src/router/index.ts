import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import routes from "@/router/routes";
import {getAccessToken} from "@/utils/token.manager";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to: RouteRecordRaw, from: RouteRecordRaw, next: RouteRecordRaw) => {
    if (!to.meta.layout) to.meta.layout = "MainLayout";
    if (to.meta.layout === "MainLayout") {
        if (!getAccessToken()) next({name: "auth.login"});
    }

    next();
})

export default router;
