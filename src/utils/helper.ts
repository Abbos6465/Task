export const generateRandomID = (): string => {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let result = "";
    for (let i = 0; i < charactersLength; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
};

export const validateNumber = (value: string) => {
    if (/^0\d+$/.test(value)) return NaN;
    return Number(value);
};

export const filterObjectValues = (
    obj: Record<string, any>
): Record<string, any> => {
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value));
};

export const getStatusText = (status: boolean): string => {
    return status ? "Деактивация" : "Активация";
};