import {defineStore} from "pinia";
import {ref} from "vue";
import {AuthUserType, LoginDataType} from "@/modules/auth/auth.types";
import authApi from "@/modules/auth/auth.api";
import {removeAccessToken, setAccessToken} from "@/utils/token.manager";
import {useRouter} from "vue-router";

export const useAuthStore = defineStore("authStore", () => {

    const router = useRouter();

    const loginLoading = ref(false);

    const login = async (data: LoginDataType) => {
        loginLoading.value = true;

        try {
            const response = await authApi.login(data);
            setAccessToken(response.token);
        } finally {
            loginLoading.value = false;
        }
    }

    const userLoading = ref(false);

    const user = ref<AuthUserType | null>(null);

    const fetchUser = async () => {
        userLoading.value = true;

        try {
            user.value = await authApi.fetchUser();
        } finally {
            userLoading.value = false;
        }
    }

    const logout = () => {
        clear();
    }

    const clear = () => {
        user.value = null;
        removeAccessToken();
        router.push({name: "auth.login"});
    }

    return {
        loginLoading,
        login,
        userLoading,
        user,
        fetchUser,
        logout,
        clear,
    }
})