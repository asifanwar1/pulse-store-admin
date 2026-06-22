export const truncateString = (
    string: string = "",
    maxLength: number = 80,
): string | undefined => {
    if (!string || !maxLength) return undefined;
    return string.length > maxLength
        ? `${string.substring(0, maxLength)}…`
        : string;
};

export const titleCase = (str: string): string => {
    return (
        str
            ?.split(" ")
            ?.map(
                (item) =>
                    item.charAt(0).toUpperCase() + item.slice(1).toLowerCase(),
            )
            ?.join(" ") || ""
    );
};

export const safeStringConversion = (value: unknown): string => {
    if (value == null) return "";
    if (typeof value === "string") return value;
    if (typeof value === "number") return String(value);
    if (typeof value === "boolean") return String(value);
    if (typeof value === "object") {
        try {
            return JSON.stringify(value);
        } catch {
            return "[Object]";
        }
    }
    return String(value);
};

export const formatAddress = (address: {
    street_address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
}): string => {
    const { street_address, city, state, zipCode, country } = address;
    const addressParts = [street_address, city, state, zipCode, country].filter(
        (v): v is string => !!v,
    );
    return addressParts.join(", ");
};
