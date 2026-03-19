export const objectContainsKey = (
    object: Record<string | number, any>,
    key: number | string,
) => {
    return typeof object === "object" && object && object[key] !== undefined;
};
