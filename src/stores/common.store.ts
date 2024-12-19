import { defineStore } from "pinia";
import { computed } from "vue";
import { GenderType, RoleType } from "@/types/common.type";

export const useCommonStore = defineStore("commonStore", () => {

    const genders = computed<GenderType[]>(() => {
        return [
            {
                name: "Женский",
                value: "F"
            },
            {
                name: "Мужской",
                value: "M"
            }
        ];
    });

    const roles = computed<RoleType[]>(() => {
        return [
            {
                name: "Админ",
                value: "ADMIN"
            },
            {
                name: "Модератор",
                value: "MODERATOR"
            },
            {
                name: "Зритель",
                value: "VIEWER"
            }
        ];
    });

    return {
        genders,
        roles
    };
});