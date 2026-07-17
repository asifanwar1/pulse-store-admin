import CustomButton from "@/components/custom/CustomButton/CustomButton";
import { CustomModal } from "@/components/custom/CustomModal";
import Timeline from "@/components/custom/Timeline/Timeline";
import {
    ShipmentStatusWithHelpers,
    type ShipmentStatusType,
} from "@/constants/shipment-status.constants";
import { shipmentMethodWithHelpers } from "@/constants/shipment-methods";
import type { TShipmentTrackingByNumberResponse } from "@/api/services/shipment/shipment.response";
import { getFormattedDate } from "@/utils/dateTime.utils";
import { cn } from "@/lib/utils";

type TrackShipmentResult = {
    trackingDetails: TShipmentTrackingByNumberResponse;
    shipmentId?: number;
};

type TrackShipmentModalProps = {
    open: boolean;
    result?: TrackShipmentResult;
    onClose: () => void;
    onViewFullShipment: () => void;
};

const TrackShipmentModal = ({
    open,
    result,
    onClose,
    onViewFullShipment,
}: TrackShipmentModalProps) => {
    const details = result?.trackingDetails;

    return (
        <CustomModal
            isOpen={open}
            onClose={onClose}
            title="Shipment Tracking"
            size="md"
            showCloseButton
            contentClassName="px-8 py-2"
            titleClassName="text-pulse-green-dark"
        >
            {details && (
                <div className="flex flex-col gap-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-col gap-0.5">
                            <span className="text-xs font-medium text-pulse-green">
                                Tracking Number
                            </span>
                            <span className="text-sm font-mono font-semibold text-pulse-green-dark">
                                {details.tracking_id}
                            </span>
                        </div>
                        <span
                            className={cn(
                                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
                                ShipmentStatusWithHelpers.getLabelClass(
                                    details.status as ShipmentStatusType,
                                ),
                            )}
                        >
                            {ShipmentStatusWithHelpers.getDisplayTextKey(
                                details.status as ShipmentStatusType,
                            )}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex flex-col gap-0.5">
                            <span className="text-xs font-medium text-pulse-green">
                                Courier
                            </span>
                            <span className="text-pulse-green-dark">
                                {details.courier}
                            </span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-xs font-medium text-pulse-green">
                                Method
                            </span>
                            <span className="text-pulse-green-dark">
                                {shipmentMethodWithHelpers.getDisplayTextKey(
                                    details.shipment_method,
                                ) || details.shipment_method}
                            </span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-xs font-medium text-pulse-green">
                                Est. Delivery
                            </span>
                            <span className="text-pulse-green-dark">
                                {details.estimated_delivery_date
                                    ? getFormattedDate(
                                          details.estimated_delivery_date,
                                      )
                                    : "-"}
                            </span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-xs font-medium text-pulse-green">
                                {details.delivered_at
                                    ? "Delivered"
                                    : "Shipped"}
                            </span>
                            <span className="text-pulse-green-dark">
                                {details.delivered_at
                                    ? getFormattedDate(details.delivered_at)
                                    : details.shipped_at
                                      ? getFormattedDate(details.shipped_at)
                                      : "-"}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-pulse-green-dark">
                            Tracking History
                        </span>
                        <Timeline
                            items={details.tracking ?? []}
                            getStatusLabel={(status) =>
                                ShipmentStatusWithHelpers.getDisplayTextKey(
                                    status as ShipmentStatusType,
                                )
                            }
                            getStatusClass={(status) =>
                                ShipmentStatusWithHelpers.getLabelClass(
                                    status as ShipmentStatusType,
                                )
                            }
                            emptyMessage="No tracking updates yet."
                        />
                    </div>

                    <div className="flex w-full justify-end gap-3 pt-2">
                        <CustomButton variant="outline" onClick={onClose}>
                            Close
                        </CustomButton>
                        {result?.shipmentId && (
                            <CustomButton onClick={onViewFullShipment}>
                                View Full Shipment
                            </CustomButton>
                        )}
                    </div>
                </div>
            )}
        </CustomModal>
    );
};

export default TrackShipmentModal;
