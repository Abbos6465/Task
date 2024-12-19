import { UserDataType, UserListParamsType, UserListType, UserShowType } from "@/modules/user/user.types";
import axios from "@/utils/axios/axios";

const prefix = "admin/user";

export default {
    fetchUsers(params: UserListParamsType = {}): Promise<UserListType> {
        return axios.get(`${prefix}/list`, { params });
    },

    fetchUser(id: string): Promise<UserShowType> {
        return axios.get(`${prefix}/${id}`);
    },

    createUser(data: UserDataType) {
        return axios.post(`${prefix}/create`, data);
    },

    updateUser(id: string, data: UserDataType) {
        return axios.put(`${prefix}/${id}`, data);
    },

    deleteUser(id: string) {
        return axios.delete(`${prefix}/${id}`);
    }
};