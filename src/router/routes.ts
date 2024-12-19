import authRoutes from "@/modules/auth/auth.routes";
import type {RouteRecordRaw} from "vue-router";
import countryRoutes from "@/modules/country/country.routes";
import userRoutes from "@/modules/user/user.routes";

export default [
    ...authRoutes,
    ...countryRoutes,
    ...userRoutes,
] as RouteRecordRaw[];
