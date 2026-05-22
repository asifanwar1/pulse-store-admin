import { useInfiniteQuery } from "@tanstack/react-query";

import Config from "../Config";
import { SortOrder } from "../constants";
import { type BaseQueryType } from "../api/models";

type usePaginatedQueryParams<T> = {
    queryKey: string[];
    queryFn: (
        props: BaseQueryType,
        signal: AbortSignal,
    ) => Promise<{ data: T[]; count: number }>;
    limit?: number;
    column?: string;
    direction?: SortOrder;
    enabled?: boolean;
};

export const usePaginatedQuery = <T>({
    queryKey,
    queryFn,
    limit = Config.LIMIT,
    column = "",
    direction = SortOrder.DESC,
    enabled = true,
}: usePaginatedQueryParams<T>) => {
    const { data, ...rest } = useInfiniteQuery({
        queryKey,
        enabled: enabled,
        queryFn: async ({
            pageParam = 1,
            signal,
        }: {
            pageParam?: number;
            signal: AbortSignal;
        }) => {
            const data = await queryFn(
                {
                    page: pageParam || 1,
                    limit,
                    column,
                    direction,
                },
                signal,
            );
            return {
                data: data?.data,
                count: data?.count as number,
                nextPage: (pageParam || 1) + 1,
                pagesCount: Math.ceil(data.count / limit),
            };
        },
        initialPageParam: 1,
        getNextPageParam: ({ pagesCount, nextPage }) => {
            if (pagesCount < nextPage) return undefined;
            return nextPage;
        },
    });

    return {
        ...rest,
        data: data?.pages?.map((page) => page?.data).flat(),
        count: data?.pages[0]?.count,
    };
};
