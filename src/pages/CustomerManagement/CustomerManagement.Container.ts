import { useQueryState } from "nuqs";

import Config from "@/Config";

import { useGetUsers, useGetUsersAnalytics } from "@/hooks/api/user.queries";
import { useTablePagination, withPageReset } from "@/hooks/useTablePagination";

export const useCustomerManagement = () => {
    const [search, setSearchRaw] = useQueryState("search", {
        defaultValue: "",
    });
    const [pageSize, setPageSizeRaw] = useQueryState("pageSize", {
        defaultValue: Config.LIMIT,
        parse: Number,
        serialize: String,
    });

    const {
        data: users,
        count: usersTotalCount,
        isPending: isUsersDataLoading,
        page,
        setPage,
    } = useGetUsers({
        search,
        limit: pageSize,
        user_type: "CUSTOMER",
    });

    const { data: usersAnalyticsData, isPending: isUsersAnalyticsLoading } =
        useGetUsersAnalytics();

    const isUserDataLoading = isUsersAnalyticsLoading || isUsersDataLoading;

    const { pageCount, setPageSize, onPaginationChange } = useTablePagination({
        pageSize,
        setPage,
        setPageSize: setPageSizeRaw,
        totalCount: usersTotalCount,
    });

    return {
        users,
        usersTotalCount,
        isUserDataLoading,
        usersAnalyticsData,
        page,
        search,
        pageSize,
        pageCount,
        setPage,
        setSearch: withPageReset(setSearchRaw, setPage),
        setPageSize,
        onPaginationChange,
    };
};
