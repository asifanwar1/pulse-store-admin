import { StatCard } from "@/components/custom/CustomCards";
import FilterBar from "@/components/custom/FilterBar";
import CommonSkeleton from "@/components/custom/CommonSkeleton/CommonSkeleton";
import SupportTicketsTable from "./SupportTicketsTable";
import { SUPPORT_TICKET_STAT_CONFIG } from "./SupportTickets.Config";
import { useSupportTickets } from "./SupportTickets.container";
import { formatStatValue } from "@/utils/common.utils";
import { mapAnalyticsMetricToStat } from "@/utils/analytics.utils";

const SupportTickets = () => {
    const {
        tickets,
        ticketsAnalyticsData,
        isTicketsLoading,
        togglingTicketId,
        filterItems,
        handleToggleResolved,
    } = useSupportTickets();

    if (isTicketsLoading) {
        return <CommonSkeleton />;
    }

    return (
        <div className="flex flex-col gap-6 p-4 sm:p-6 min-h-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {SUPPORT_TICKET_STAT_CONFIG.map(
                    ({
                        key,
                        title,
                        icon,
                        iconBgClass,
                        iconColorClass,
                        subtitle,
                        suffix,
                    }) => {
                        const stat = mapAnalyticsMetricToStat(
                            ticketsAnalyticsData?.[key],
                        );

                        return (
                            <StatCard
                                key={key}
                                title={title}
                                value={formatStatValue({ ...stat, suffix })}
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

            <FilterBar items={filterItems} />

            <SupportTicketsTable
                ticketsListData={tickets ?? []}
                togglingTicketId={togglingTicketId}
                onToggleResolved={handleToggleResolved}
            />
        </div>
    );
};

export default SupportTickets;
