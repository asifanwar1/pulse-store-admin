import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

import { useTrackShipmentByNumber } from "@/hooks/api/shipment.queries";
import { APP_ROUTES } from "@/routes/appRoutes";
import { getRouteWithId } from "@/utils/common.utils";

export const useTrackShipment = () => {
    const navigate = useNavigate();
    const [trackingNumber, setTrackingNumber] = useState<string>("");
    const [resultModalOpen, setResultModalOpen] = useState<boolean>(false);

    const {
        mutate: trackShipment,
        data: trackingResult,
        isPending: isTracking,
    } = useTrackShipmentByNumber();

    const handleTrackingNumberChange = (e: ChangeEvent<HTMLInputElement>) =>
        setTrackingNumber(e.target.value);

    const handleTrack = () => {
        const trimmedTrackingNumber = trackingNumber.trim();
        if (!trimmedTrackingNumber) return;

        trackShipment(trimmedTrackingNumber, {
            onSuccess: () => setResultModalOpen(true),
        });
    };

    const handleResultModalClose = () => setResultModalOpen(false);

    const handleViewFullShipment = () => {
        if (!trackingResult?.shipmentId) return;

        setResultModalOpen(false);
        navigate(
            getRouteWithId({
                route: APP_ROUTES.SHIPMENTS_DETAILS,
                id: trackingResult.shipmentId,
            }),
        );
    };

    return {
        trackingNumber,
        isTracking,
        resultModalOpen,
        trackingResult,
        handleTrackingNumberChange,
        handleTrack,
        handleResultModalClose,
        handleViewFullShipment,
    };
};
