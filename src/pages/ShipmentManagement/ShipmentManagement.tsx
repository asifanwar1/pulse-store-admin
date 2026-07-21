import { StatCard } from "@/components/custom/CustomCards";
import { SHIPMENT_STAT_CONFIG } from "./ShipmentManagement.Config";
import ShipmentTable from "./ShipmentTable";
import { formatStatValue } from "@/utils/common.utils";
import CommonSkeleton from "@/components/custom/CommonSkeleton/CommonSkeleton";
import { useShipmentManagement } from "./ShipmentManagement.Container";
import { mapAnalyticsMetricToStat } from "@/utils/analytics.utils";
import TrackShipment from "./TrackShipment/TrackShipment";

const ShipmentManagement = () => {
    const {
        shipments,
        shipmentAnalyticsData,
        isShipmentsDataLoading,
        shipmentsTotalCount,
        page,
        pageSize,
        pageCount,
        setSearch,
        onPaginationChange,
    } = useShipmentManagement();

    if (isShipmentsDataLoading) {
        return <CommonSkeleton />;
    }
    return (
        <div className="flex flex-col gap-6 p-4 sm:p-6 min-h-0">
            <TrackShipment />

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
                        const stat = mapAnalyticsMetricToStat(
                            shipmentAnalyticsData?.[key],
                        );
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
            <ShipmentTable
                shipmentListData={shipments ?? []}
                totalCount={shipmentsTotalCount}
                page={page}
                pageSize={pageSize}
                pageCount={pageCount}
                onSearch={setSearch}
                onPaginationChange={onPaginationChange}
            />
        </div>
    );
};

export default ShipmentManagement;
