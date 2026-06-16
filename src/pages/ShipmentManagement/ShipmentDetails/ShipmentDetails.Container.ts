import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    useGetShipment,
    useUpdateShipmentStatus,
} from "@/hooks/api/shipment.queries";
import { APP_ROUTES } from "@/routes/appRoutes";
import { getRouteWithId } from "@/utils/common.utils";
import type { SelectOption } from "@/components/custom/Select";
import { getOptionObject } from "@/utils/selectOption.utils";
import {
    SHIPMENT_STATUS_OPTIONS,
    type ShipmentStatusType,
} from "@/constants/shipment-status.constants";

const NO_VALUE = 0;

export const useShimentDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [selectedStatusOption, setSelectedStatusOption] =
        useState<SelectOption | null>(null);
    const [statusModalOpen, setStatusModalOpen] = useState<boolean>(false);

    const { data: shipment, isLoading: isShipmenttLoading } = useGetShipment(
        Number(id),
    );

    const isShipmentDataLoading = isShipmenttLoading;

    const {
        mutateAsync: updateShipmentStatus,
        isPending: isUpdatingShipmentStatus,
    } = useUpdateShipmentStatus();

    useEffect(() => {
        if (shipment?.status && !selectedStatusOption) {
            const shipmentStatusOption = getOptionObject(
                SHIPMENT_STATUS_OPTIONS,
                shipment.status,
            );

            setSelectedStatusOption(shipmentStatusOption!);
        }
    }, [shipment?.status]);

    const handleNavigateBack = () => navigate(-1);

    const handleNavigateToProduct = (id: number) =>
        navigate(
            getRouteWithId({
                route: APP_ROUTES.PRODUCTS_DETAILS,
                id,
            }),
        );

    const handleShipmentStatusModalOpen = (
        newShipmentStatus: ShipmentStatusType,
    ) => {
        setStatusModalOpen(true);
        const shipmentStatusOption = getOptionObject(
            SHIPMENT_STATUS_OPTIONS,
            newShipmentStatus,
        );
        setSelectedStatusOption(shipmentStatusOption!);
    };
    const handleShipmentStatusModalClose = () => setStatusModalOpen(false);

    const handleStatusChange = async () => {
        try {
            await updateShipmentStatus(
                {
                    id: Number(id),
                    body: { status: selectedStatusOption?.value! },
                },
                {
                    onSuccess: () => {
                        handleShipmentStatusModalClose();
                    },
                },
            );
        } catch (error) {
            console.error(error);
        }
    };

    return {
        NO_VALUE,
        shipment,
        isShipmenttLoading,
        isShipmentDataLoading,
        statusModalOpen,
        selectedStatusOption,
        isUpdatingShipmentStatus,
        handleShipmentStatusModalOpen,
        handleShipmentStatusModalClose,
        handleNavigateBack,
        handleStatusChange,
        handleNavigateToProduct,
    };
};
