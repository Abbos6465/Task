export interface NavListLinkType {
    title: string,
    value: string,
    icon?: string,
    children?: NavListLinkType[]
}

export interface NavDrawerPropsType {
    items?: NavListLinkType[],
}
