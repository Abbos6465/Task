import axios, { AxiosError, AxiosInstance } from "axios";
import { getAccessToken } from "@/utils/token.manager";
import { useAuthStore } from "@/modules/auth/auth.store";
import { toast } from "vue3-toastify";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 120000
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const accessToken = getAccessToken();

        if (accessToken && !config.headers.Authorization)
            config.headers["Authorization"] = `Bearer ${accessToken}`;

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    ({ data }) => {
        return data.data;
    },
    ({ response }) => {
        if (response) {
            const status = response.status;

            if (status === 401) {
                const authStore = useAuthStore();
                authStore.clear();
            }

            toast.error(response.data.error ?? "Error");
        }
        return Promise.reject(response);
    }
);

export default axiosInstance;
