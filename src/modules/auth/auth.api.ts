import axios from "@/utils/axios/axios";
import {AuthUserType, LoginDataType, LoginResponseType} from "@/modules/auth/auth.types";

export default {
    login(data: LoginDataType):Promise<LoginResponseType>{
        return axios.post("/sign-in", data);
    },

    fetchUser():Promise<AuthUserType>{
        return axios.get("/me");
    }
}