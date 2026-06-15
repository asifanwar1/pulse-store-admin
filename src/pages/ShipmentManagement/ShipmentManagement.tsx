import { shipmentStatsData } from "@/mock/shipment.mock";
import { StatCard } from "@/components/custom/CustomCards";
import { SHIPMENT_STAT_CONFIG } from "./ShipmentManagement.Config";
import ShipmentTable from "./ShipmentTable";
import { formatStatValue } from "@/utils/common.utils";
import CommonSkeleton from "@/components/custom/CommonSkeleton/CommonSkeleton";
import { useShipmentManagement } from "./ShipmentManagement.Container";

const ShipmentManagement = () => {
    const { shipments, shipmentAnalyticsData, isShipmentsDataLoading } =
        useShipmentManagement();

    if (isShipmentsDataLoading) {
        return <CommonSkeleton />;
    }
    return (
        <div className="flex flex-col gap-6 p-4 sm:p-6 min-h-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {SHIPMENT_STAT_CONFIG.map(
                    ({
                        key,
                        title,
                        icon,
                        iconBgClass,
                        iconColorClass,
                        subtitle,
                    }) => {
                        const stat = shipmentStatsData[key];
                        return (
                            <StatCard
                                key={key}
                                title={title}
                                value={formatStatValue(stat)}
                                trend={stat.trend}
                                trendDirection={stat.trendDirection}
                                icon={icon}
                                iconBgClass={iconBgClass}
                                iconColorClass={iconColorClass}
                                subtitle={subtitle}
                            />
                        );
                    },
                )}
            </div>
            <ShipmentTable />
        </div>
    );
};

export default ShipmentManagement;
