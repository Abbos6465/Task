import { defineStore } from "pinia";
import { ref } from "vue";
import { UserDataType, UserListParamsType, UserListType, UserShowType } from "@/modules/user/user.types";
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

    const userLoading = ref(false);
    const user = ref<UserShowType | null>(null);

    const fetchUser = async (id: string) => {
        usersLoading.value = true;

        try {
            user.value = await userApi.fetchUser(id);
        } finally {
            usersLoading.value = false;
        }
    };

    const deleteUserLoading = ref(false);

    const deleteUser = async (id: string) => {
        deleteUserLoading.value = true;

        try {
            await userApi.deleteUser(id);
        } finally {
            deleteUserLoading.value = false;
        }
    };

    const createUserLoading = ref(false);

    const createUser = async (data: UserDataType) => {
        createUserLoading.value = true;

        try {
            await userApi.createUser(data);
        } finally {
            createUserLoading.value = false;
        }
    };

    const updateUserLoading = ref(false);

    const updateUser = async (id: string, data: UserDataType) => {
        updateUserLoading.value = true;

        try {
            await userApi.updateUser(id, data);
        } finally {
            updateUserLoading.value = false;
        }
    };

    return {
        usersLoading,
        users,
        fetchUsers,
        userLoading,
        user,
        fetchUser,
        deleteUserLoading,
        deleteUser,
        createUserLoading,
        createUser,
        updateUserLoading,
        updateUser
    };
});