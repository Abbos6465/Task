import { GenderValueType, ParamsCommonType, RoleValueType, UserCommonType } from "@/types/common.type";

export interface UserType extends UserCommonType {
    status: boolean,
    phone: null | string,
    country_id: null | string,
    login_type: string
}

export interface UserItemType extends Omit<UserType, "username"> {
    user_name: string;
}

export interface UserListParamsType extends ParamsCommonType {
}

export interface UserListType {
    count: number,
    results: UserItemType[];
}

export interface UserShowType extends UserType {
    birth_date: null | string,
    email: null | string,
    gender: null | GenderValueType,
}

export interface UserDataType {
    username: string,
    full_name: string,
    password: string,
    birth_date: string,
    gender: GenderValueType | "",
    status: boolean,
    phone: string,
    role: RoleValueType | "",
    country_id: string,
}