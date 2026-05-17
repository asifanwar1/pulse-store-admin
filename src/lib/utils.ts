import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

interface RouteParams {
    [key: string]: string | number;
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getParamsAttachedRoute = (
    route: string,
    obj: RouteParams = {},
): string => {
    const keys = Object.keys(obj);

    if (keys?.length) {
        const objectKeys = keys;

        objectKeys.forEach(() => {
            route = route.replace(new RegExp(/:([\d\w?])+/, "i"), (match) => {
                const formattedMatchedValue =
                    match[match.length - 1] === "?"
                        ? match.slice(1, match.length - 1)
                        : match.slice(1);
                return obj[formattedMatchedValue].toString();
            });
        });

        return route;
    }

    return route;
};
