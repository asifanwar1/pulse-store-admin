import { useEffect, useState } from "react";

import type { TOrderStatus } from "@/api/services/orders/orders.request.types";
import { useGetOrder, useUpdateOrderStatus } from "@/hooks/api/orders.queries";
import { APP_ROUTES } from "@/routes/appRoutes";
import { useNavigate, useParams } from "react-router-dom";
import { ORDER_STATUS_OPTIONS } from "@/constants/order-status.constants";
import type { SelectOption } from "@/components/custom/Select";
import { getRouteWithId } from "@/utils/common.utils";

const getOptionObject = (
    options: { label: string; value: string }[],
    value: string,
) => {
    const resolvedOption = options.find((option) => option.value === value);
    return resolvedOption;
};

export const useOrderDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [selectedStatusOption, setSelectedStatusOption] =
        useState<SelectOption | null>(null);
    const [statusModalOpen, setStatusModalOpen] = useState<boolean>(false);

    const { data: order, isLoading: isOrderDataLoading } = useGetOrder(
        Number(id),
    );

    const { mutateAsync: updateOrderStatus, isPending: isUpdatingOrderStatus } =
        useUpdateOrderStatus();

    useEffect(() => {
        if (order?.status && !selectedStatusOption) {
            const orderStatusOption = getOptionObject(
                ORDER_STATUS_OPTIONS,
                order.status,
            );

            setSelectedStatusOption(orderStatusOption!);
        }
    }, [order?.status]);

    const handleNavigateBack = () => navigate(APP_ROUTES.ORDERS);

    const handleOrderStatusModalOpen = (newOrderStatus: TOrderStatus) => {
        setStatusModalOpen(true);
        const orderStatusOption = getOptionObject(
            ORDER_STATUS_OPTIONS,
            newOrderStatus,
        );
        setSelectedStatusOption(orderStatusOption!);
    };
    const handleOrderStatusModalClose = () => setStatusModalOpen(false);

    const handleStatusChange = async () => {
        try {
            await updateOrderStatus(
                {
                    id: Number(id),
                    body: { status: selectedStatusOption?.value! },
                },
                {
                    onSuccess: () => {
                        handleOrderStatusModalClose();
                    },
                },
            );
        } catch (error) {
            console.error(error);
        }
    };

    const handleNavigateToShipmentCreate = () =>
        navigate(
            getRouteWithId({
                id: Number(id),
                route: APP_ROUTES.SHIPMENTS_CREATE,
            }),
            {
                state: {
                    orderData: order,
                },
            },
        );

    return {
        order,
        isOrderDataLoading,
        isUpdatingOrderStatus,
        statusModalOpen,
        selectedStatusOption,
        handleNavigateBack,
        handleStatusChange,
        handleOrderStatusModalOpen,
        handleOrderStatusModalClose,
        handleNavigateToShipmentCreate,
    };
};
