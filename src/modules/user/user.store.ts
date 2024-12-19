import { defineStore } from "pinia";
import { ref } from "vue";
import { UserListParamsType, UserListType } from "@/modules/user/user.types";
import userApi from "@/modules/user/user.api";

export const useUserStore = defineStore("userStore", () => {

    const usersLoading = ref(false);

    const users = ref<UserListType | null>(null);

    const fetchUsers = async (params: UserListParamsType = {}) => {
        usersLoading.value = true;

        try {
            users.value = await userApi.fetchUsers(params);
        } finally {
            usersLoading.value = false;
        }
    };

    return {
        usersLoading,
        users,
        fetchUsers
    };
});