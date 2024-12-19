import { UserDataType, UserListParamsType, UserListType } from "@/modules/user/user.types";
import axios from "@/utils/axios/axios";

const prefix = "admin/user";

export default {
    fetchUsers(params: UserListParamsType = {}): Promise<UserListType> {
        return axios.get(`${prefix}/list`, { params });
    },

    createUser(data: UserDataType) {
        return axios.post(`${prefix}/create`, data);
    }
};