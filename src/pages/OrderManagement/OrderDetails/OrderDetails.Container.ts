import { useEffect, useState } from "react";

import type { TOrderStatus } from "@/api/services/orders/orders.request.types";
import { useGetOrder, useUpdateOrderStatus } from "@/hooks/api/orders.queries";
import { APP_ROUTES } from "@/routes/appRoutes";
import { useNavigate, useParams } from "react-router-dom";
import { resolveOptionValue } from "@/utils/selectOption.utils";
import { ORDER_STATUS_OPTIONS } from "@/constants/order-status.constants";

export const useOrderDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [selectedStatus, setSelectedStatus] = useState<TOrderStatus | null>(
        null,
    );
    const [statusModalOpen, setStatusModalOpen] = useState<boolean>(false);

    const { data: order, isLoading: isOrderDataLoading } = useGetOrder(
        Number(id),
    );

    const { mutateAsync: updateOrderStatus, isPending: isUpdatingOrderStatus } =
        useUpdateOrderStatus();

    useEffect(() => {
        if (order?.status && !selectedStatus) {
            const orderStatus = resolveOptionValue(
                ORDER_STATUS_OPTIONS,
                order.status,
            );

            setSelectedStatus(orderStatus);
        }
    }, [order?.status]);

    const handleNavigateBack = () => navigate(APP_ROUTES.ORDERS);

    const handleOrderStatusModalOpen = (newOrderStatus: TOrderStatus) => {
        setStatusModalOpen(true);
        setSelectedStatus(newOrderStatus);
    };
    const handleOrderStatusModalClose = () => setStatusModalOpen(false);

    const handleStatusChange = async () => {
        try {
            await updateOrderStatus(
                {
                    id: Number(id),
                    body: { status: selectedStatus! },
                },
                {
                    onSuccess: () => {
                        handleOrderStatusModalClose();
                    },
                },
            );
        } catch (error) {
            setSelectedStatus(order?.status as TOrderStatus);
            console.error(error);
        }
    };

    return {
        order,
        isOrderDataLoading,
        selectedStatus,
        isUpdatingOrderStatus,
        statusModalOpen,
        handleNavigateBack,
        handleStatusChange,
        handleOrderStatusModalOpen,
        handleOrderStatusModalClose,
    };
};
