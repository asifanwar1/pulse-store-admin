import { CACHE_TIME, HTTP_STATUS, STALE_TIME } from "@/constants";
import { QueryClient } from "@tanstack/react-query";

export const defaultOptions = {
    getNextPageParam: (lastPage: unknown) => {
        if (
            lastPage &&
            typeof lastPage === "object" &&
            "metadata" in lastPage
        ) {
            const metadata = (
                lastPage as {
                    metadata?: { hasNextPage?: boolean; currentPage?: number };
                }
            ).metadata;
            if (metadata?.hasNextPage && metadata.currentPage !== undefined) {
                return metadata.currentPage + 1;
            }
        }
    },
    initialPageParam: 1,
};

function handleRetry(failCount: number, error: unknown) {
    const apiError = error as { cause?: number };
    return apiError.cause === HTTP_STATUS.UNAUTHORIZED && failCount < 1;
}

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            networkMode: "online",
            staleTime: STALE_TIME,
            retry: handleRetry,
            gcTime: CACHE_TIME,
            refetchOnWindowFocus: false,
            throwOnError: false,
            enabled: true,
        },
        mutations: {
            networkMode: "online",
            retry: handleRetry,
        },
    },
});

export const cancelAllQueries = () => {
    queryClient.cancelQueries();
};
