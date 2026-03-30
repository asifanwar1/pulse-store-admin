import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useCallback, type PropsWithChildren } from "react";
import {
    PersistQueryClientProvider,
    type PersistedClient,
} from "@tanstack/react-query-persist-client";
import { getItem, removeItem, setItem } from "@/lib/storageService";
import { STORAGE_KEYS } from "../constants/storage.constants";
import { queryClient } from "@/lib/queryClient";

const QueryKeysToPersist = [
    STORAGE_KEYS.AUTH,
    STORAGE_KEYS.USER_INFO,
    STORAGE_KEYS.DEVICE_INFO,
];

const ApiClientProvider = (props: PropsWithChildren) => {
    const { children } = props;

    const createPersister = useCallback(() => {
        return {
            restoreClient: () =>
                getItem<PersistedClient>(STORAGE_KEYS.REACT_QUERY) || undefined,
            removeClient: () => removeItem(STORAGE_KEYS.REACT_QUERY),
            persistClient: (client: PersistedClient) =>
                setItem(STORAGE_KEYS.REACT_QUERY, client),
        };
    }, []);

    return (
        <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{
                persister: createPersister(),
                dehydrateOptions: {
                    shouldDehydrateQuery: ({ state, queryKey = [] }) => {
                        return (
                            state.status === "success" &&
                            QueryKeysToPersist.some((key) =>
                                queryKey.includes(key),
                            )
                        );
                    },
                },
            }}
        >
            {children}
            <ReactQueryDevtools
                buttonPosition="bottom-right"
                position="right"
            />
        </PersistQueryClientProvider>
    );
};

export default ApiClientProvider;
