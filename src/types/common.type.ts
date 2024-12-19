export interface UserCommonType {
    id: string,
    avatar: string | null,
    username: string,
    full_name: string,
    role: RoleValueType
}

export interface CountryCommonType {
    id: string | null,
    flag: string | null,
    description: string | null
}

export interface ParamsCommonType {
    limit?: number,
    offset?: number,
    search?: string,
}

export type GenderValueType = "M" | "F";

export interface GenderType {
    name: string,
    value: GenderValueType
}

export type RoleValueType = "VIEWER" | "ADMIN" | "MODERATOR";

export interface RoleType {
    name: string,
    value: RoleValueType
}