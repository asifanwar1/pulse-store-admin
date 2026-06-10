import { useGetOrder } from "@/hooks/api/orders.queries";
import { APP_ROUTES } from "@/routes/appRoutes";
import { useNavigate, useParams } from "react-router-dom";

export const useOrderDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const { data: order, isLoading: isOrderDataLoading } = useGetOrder(
        Number(id),
    );

    const handleNavigateBack = () => navigate(APP_ROUTES.ORDERS);

    return { order, isOrderDataLoading, handleNavigateBack };
};
