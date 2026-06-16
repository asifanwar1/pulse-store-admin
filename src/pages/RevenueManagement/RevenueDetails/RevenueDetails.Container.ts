import { useGetRevenue } from "@/hooks/api/revenue.queries";
import { APP_ROUTES } from "@/routes/appRoutes";
import { getRouteWithId } from "@/utils/common.utils";
import { useNavigate, useParams } from "react-router-dom";

export const useRevenueDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { data: revenue, isLoading: isRevenueLoading } = useGetRevenue(
        Number(id),
    );

    const handleNavigateToOrder = (id: number) =>
        navigate(
            getRouteWithId({
                id: Number(id),
                route: APP_ROUTES.ORDERS_DETAILS,
            }),
        );

    const handleNavigateToShipment = (id: number) =>
        navigate(
            getRouteWithId({
                id: Number(id),
                route: APP_ROUTES.SHIPMENTS_DETAILS,
            }),
        );

    return {
        revenue,
        isRevenueLoading,
        handleNavigateToOrder,
        handleNavigateToShipment,
    };
};
