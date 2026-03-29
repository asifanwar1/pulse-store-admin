import { APP_ROUTES } from "@/routes/appRoutes";
import { defaultRouteNames } from "@/constants/page-title.constants";

export interface BreadcrumbItem {
    label: string;
    path: string;
    isActive: boolean;
}

export const getRouteDisplayName = (
    pathname: string,
    customRouteNames?: Record<string, string>,
): string => {
    const routeNames = customRouteNames ?? defaultRouteNames;

    // Find the most specific matching route
    const sortedRoutes = Object.keys(routeNames).sort(
        (a, b) => b.length - a.length,
    );

    for (const route of sortedRoutes) {
        if (pathname.startsWith(route)) {
            return routeNames[route];
        }
    }

    return "Unknown";
};

export const isRouteActive = (
    currentPath: string,
    routePath: string,
): boolean => {
    if (routePath === APP_ROUTES.ROOT) {
        return (
            currentPath === APP_ROUTES.ROOT ||
            currentPath === APP_ROUTES.DASHBOARD
        );
    }

    return currentPath.startsWith(routePath);
};
