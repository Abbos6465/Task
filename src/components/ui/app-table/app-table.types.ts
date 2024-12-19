export interface AppTableColumnType {
    prop: string | "idx",
    label?: string,
    align?: "left" | "center" | "right",
    width?: string,
}

export interface AppTablePropsType {
    loading?: boolean,
    data?: any[];
    emptyText?: string;
    highlightCurrentRow?: boolean;
    columns?: AppTableColumnType[];
    itemClass?: any
}