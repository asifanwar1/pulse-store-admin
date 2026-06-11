import { useState } from "react";

import type { TOrderStatus } from "@/api/services/orders/orders.request.types";
import { useGetOrder, useUpdateOrderStatus } from "@/hooks/api/orders.queries";
import { APP_ROUTES } from "@/routes/appRoutes";
import { useNavigate, useParams } from "react-router-dom";
import type { SelectOption } from "@/components/custom/Select";

export const useOrderDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [selectedStatus, setSelectedStatus] = useState<SelectOption | null>(
        null,
    );

    const { data: order, isLoading: isOrderDataLoading } = useGetOrder(
        Number(id),
    );

    const { mutateAsync: updateOrderStatus, isPending: isUpdatingOrderStatus } =
        useUpdateOrderStatus();

    const handleNavigateBack = () => navigate(APP_ROUTES.ORDERS);

    const handleStatusChange = async (newStatus: TOrderStatus) => {
        setSelectedStatus(newStatus);
        try {
            await updateOrderStatus({
                id: Number(id),
                body: { status: newStatus },
            });
        } catch (error) {
            setSelectedStatus(order?.status! a);
            console.error(error);
        }
    };

    if (order?.status && !selectedStatus) {
        setSelectedStatus(order.status as TOrderStatus);
    }

    return {
        order,
        isOrderDataLoading,
        selectedStatus,
        isUpdatingOrderStatus,
        handleNavigateBack,
        handleStatusChange,
    };
};
