import { Search } from "lucide-react";

import CustomButton from "@/components/custom/CustomButton/CustomButton";
import { Input } from "@/components/custom/Input";
import { useTrackShipment } from "./TrackShipment.Container";
import TrackShipmentModal from "./TrackShipmentModal";

const TrackShipment = () => {
    const {
        trackingNumber,
        isTracking,
        resultModalOpen,
        trackingResult,
        handleTrackingNumberChange,
        handleTrack,
        handleResultModalClose,
        handleViewFullShipment,
    } = useTrackShipment();

    return (
        <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-4 gap-3">
            <div className="flex flex-wrap items-center gap-3">
                <div className="flex-1 w-full">
                    <Input
                        label="Track a Shipment"
                        placeholder="Enter tracking number e.g. TRK123456"
                        value={trackingNumber}
                        onChange={handleTrackingNumberChange}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleTrack();
                            }
                        }}
                        containerClass="w-full"
                    />
                </div>
                <div className="mt-5">
                    <CustomButton
                        onClick={handleTrack}
                        disabled={!trackingNumber.trim() || isTracking}
                        isLoading={isTracking}
                    >
                        <Search className="w-4 h-4" />
                        Track
                    </CustomButton>
                </div>
            </div>

            <TrackShipmentModal
                open={resultModalOpen}
                result={trackingResult}
                onClose={handleResultModalClose}
                onViewFullShipment={handleViewFullShipment}
            />
        </div>
    );
};

export default TrackShipment;
