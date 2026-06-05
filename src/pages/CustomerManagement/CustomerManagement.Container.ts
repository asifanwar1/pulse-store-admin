import { useQueryState } from "nuqs";

import Config from "@/Config";

import { useGetUsers, useGetUsersAnalytics } from "@/hooks/api/user.queries";

export const useCustomerManagement = () => {
    const [search, setSearch] = useQueryState("search", { defaultValue: "" });
    const [pageSize, setPageSize] = useQueryState("pageSize", {
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
        page: 1,
        limit: pageSize,
        column: "created_at",
        user_type: "CUSTOMER",
    });

    const { data: usersAnalyticsData, isPending: isUsersAnalyticsLoading } =
        useGetUsersAnalytics();

    const isUserDataLoading = isUsersAnalyticsLoading || isUsersDataLoading;

    return {
        users,
        usersTotalCount,
        isUserDataLoading,
        usersAnalyticsData,
        page,
        search,
        pageSize,
        setPage,
        setSearch,
        setPageSize,
    };
};
