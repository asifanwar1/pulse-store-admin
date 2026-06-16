export function resolveOptionValue<T extends { value: any }>(
    options: T[],
    value: any,
): T | any {
    if (typeof value === "string") {
        return options.find((opt) => opt.value === value) || value;
    }
    return value;
}

export function getOptionByValue(options: { value: any }[], value: any) {
    return options.find((opt) => opt.value === value) || value;
}

export const getOptionObject = (
    options: { label: string; value: string }[],
    value: string,
) => {
    const resolvedOption = options.find((option) => option.value === value);
    return resolvedOption;
};
