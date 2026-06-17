import type {
    InvalidateOptions,
    QueryClient,
    QueryKey,
} from "@tanstack/react-query";
import type { NavigateFunction } from "react-router-dom";

export const objectContainsKey = (
    object: Record<string | number, unknown>,
    key: number | string,
) => {
    return typeof object === "object" && object && object[key] !== undefined;
};

export const generateRandomInt = function (length: number = 6): number {
    return Math.floor(
        Math.pow(10, length - 1) +
            Math.random() *
                (Math.pow(10, length) - Math.pow(10, length - 1) - 1),
    );
};

export const getInitialsFromName = (name: string) => {
    if (!name) {
        return "";
    }
    const parts = name?.split(" ");
    let initials = "";
    for (let i = 0; i < parts.length; i++) {
        if (i < 2)
            if (parts[i].length > 0 && parts[i] !== "") {
                initials += parts[i][0];
            }
    }
    return initials?.toUpperCase();
};

export const stringFormatter = (
    str: string,
    truncateLength: number = 50,
): { text: string; showTooltip: boolean } => {
    const needsTruncate = str.length > truncateLength;

    return {
        text: needsTruncate ? str.slice(0, truncateLength) + "..." : str,
        showTooltip: needsTruncate,
    };
};
export const formatBytesInSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.min(
        Math.floor(Math.log(bytes) / Math.log(1024)),
        sizes.length - 1,
    );
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export function getRouteWithId({
    route,
    id,
}: {
    route: string;
    id: number | string;
}): string {
    const strId = String(id);
    return route.replace(":id", strId);
}

export const navigateBack = (
    navigate: NavigateFunction,
    routeStack?: string[],
) => {
    const current = window.location.pathname;
    const last = [...(routeStack ?? [])]
        .reverse()
        .find((r) => r && r !== current);
    if (last) navigate(last, { replace: true });
    else navigate(-1);
};

type FormattableStat = {
    value: number;
    prefix?: string;
    suffix?: string;
};

export const formatStatValue = (stat: FormattableStat) => {
    const { value, prefix = "", suffix = "" } = stat;
    const display =
        value >= 1_000_000
            ? `${(value / 1_000_000).toFixed(2)}M`
            : value >= 1_000
              ? `${(value / 1_000).toFixed(value >= 10_000 ? 0 : 1)}k`
              : value.toString();
    return `${prefix}${display}${suffix}`;
};

type InvalidateMultipleOptions = Omit<InvalidateOptions, "queryKey">;

export const invalidateMultiple = async (
    queryClient: QueryClient,
    keys: QueryKey[],
    options?: InvalidateMultipleOptions,
) => {
    await Promise.all(
        keys.map((key) =>
            queryClient.invalidateQueries({
                queryKey: key,
                ...options,
            }),
        ),
    );
};

export const formatNumberCurrency = (
    amount: number | string | null | undefined,
    options?: {
        includeSymbol?: boolean;
        decimals?: number;
        locale?: string;
    },
): string => {
    const {
        includeSymbol = true,
        decimals = 2,
        locale = "en-US",
    } = options || {};

    if (amount === null || amount === undefined) {
        return includeSymbol ? "$0" : "0";
    }

    const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;

    if (isNaN(numAmount)) {
        return includeSymbol ? "$0" : "0";
    }

    if (numAmount === 0) {
        return "-";
    }

    // Check if it's a whole number
    const isWholeNumber = numAmount % 1 === 0;

    const formatted = new Intl.NumberFormat(locale, {
        minimumFractionDigits: isWholeNumber ? 0 : decimals,
        maximumFractionDigits: decimals,
    }).format(numAmount);

    return includeSymbol ? `$${formatted}` : formatted;
};
