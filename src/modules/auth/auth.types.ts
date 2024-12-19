import {CountryCommonType, UserCommonType} from "@/types/common.type";

export interface LoginDataType {
    username: string,
    password: string,
}

export interface LoginResponseType{
    login_type: string,
    token: string
}

export interface AuthUserCountryType extends CountryCommonType{
    country_name: string | null,
}

export interface AuthUserType extends UserCommonType{
    country: AuthUserCountryType
}