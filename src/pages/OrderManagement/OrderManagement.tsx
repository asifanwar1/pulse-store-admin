import { orderStatsData } from "@/mock/order.mock";
import { StatCard } from "@/components/custom/CustomCards";
import { ORDER_STAT_CONFIG } from "./OrderManagement.Config";
import OrderTable from "./OrderTable";
import { formatStatValue } from "@/utils/common.utils";

const OrderManagement = () => {
    return (
        <div className="flex flex-col gap-6 p-4 sm:p-6 min-h-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {ORDER_STAT_CONFIG.map(
                    ({
                        key,
                        title,
                        icon,
                        iconBgClass,
                        iconColorClass,
                        subtitle,
                    }) => {
                        const stat = orderStatsData[key];
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
            <OrderTable />
        </div>
    );
};

export default OrderManagement;
