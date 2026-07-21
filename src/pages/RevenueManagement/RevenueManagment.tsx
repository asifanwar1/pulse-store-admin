import { StatCard } from "@/components/custom/CustomCards";
import RevenueTable from "./RevenueTable";
import { formatStatValue } from "@/utils/common.utils";
import CommonSkeleton from "@/components/custom/CommonSkeleton/CommonSkeleton";
import { mapAnalyticsMetricToStat } from "@/utils/analytics.utils";
import { REVENUE_STAT_CONFIG } from "./RevenueManagement.Config";
import { useRevenueManagement } from "./RevenueManagement.Container";

const RevenueManagement = () => {
    const {
        revenue,
        revenueAnalyticsData,
        isRevenueLoading,
        revenueTotalCount,
        page,
        pageSize,
        pageCount,
        setSearch,
        onPaginationChange,
    } = useRevenueManagement();

    if (isRevenueLoading) {
        return <CommonSkeleton />;
    }
    return (
        <div className="flex flex-col gap-6 p-4 sm:p-6 min-h-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {REVENUE_STAT_CONFIG.map(
                    ({
                        key,
                        title,
                        icon,
                        iconBgClass,
                        iconColorClass,
                        subtitle,
                    }) => {
                        const stat = mapAnalyticsMetricToStat(
                            revenueAnalyticsData?.[key],
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
            <RevenueTable
                revenueListData={revenue ?? []}
                totalCount={revenueTotalCount}
                page={page}
                pageSize={pageSize}
                pageCount={pageCount}
                onSearch={setSearch}
                onPaginationChange={onPaginationChange}
            />
        </div>
    );
};

export default RevenueManagement;
