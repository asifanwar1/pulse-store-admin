import Config from "@/Config";
import { useGetOrders } from "@/hooks/api/orders.queries";
import { useGetUserById } from "@/hooks/api/user.queries";
import { APP_ROUTES } from "@/routes/appRoutes";
import { useQueryState } from "nuqs";
import { useNavigate, useParams } from "react-router-dom";

export const useCustomerDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [search, setSearch] = useQueryState("search", { defaultValue: "" });
    const [pageSize, setPageSize] = useQueryState("pageSize", {
        defaultValue: Config.LIMIT,
        parse: Number,
        serialize: String,
    });

    const { data: customer, isLoading: isCustomerLoading } = useGetUserById(
        Number(id),
    );

    const {
        data: customerOrders,
        count: customerOrdersTotalCount,
        isPending: isCustomerOrdersLoading,
        page,
        setPage,
    } = useGetOrders({
        search,
        page: 1,
        limit: pageSize,
        user_id: Number(id),
    });

    const isCustomerDetailsLoading =
        isCustomerLoading || isCustomerOrdersLoading;

    const handelNavigateBack = () => navigate(APP_ROUTES.CUSTOMERS);

    return {
        customer,
        isCustomerLoading,
        customerOrders,
        customerOrdersTotalCount,
        isCustomerOrdersLoading,
        isCustomerDetailsLoading,
        page,
        setSearch,
        setPageSize,
        setPage,
        handelNavigateBack,
    };
};
