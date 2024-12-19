import { RouteLocationRaw } from "vue-router";

export interface BreadcrumbItemType {
    label: string;
    to?: RouteLocationRaw,
    isActionable?: boolean,
    click?: () => void,
}

export interface BreadcrumbPropsType {
    items?: BreadcrumbItemType[];
}

export type BreadcrumbItemTagType = "span" | "RouterLink" | "button";