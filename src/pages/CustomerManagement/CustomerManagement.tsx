import { customerStatsData } from "@/mock/customer.mock";
import { StatCard } from "@/components/custom/CustomCards";
import { CUSTOMER_STAT_CONFIG } from "./CustomerManagement.Config";
import CustomerTable from "./CustomerTable";
import { formatStatValue } from "@/utils/common.utils";

const CustomerManagement = () => {
    return (
        <div className="flex flex-col gap-6 p-4 sm:p-6 min-h-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {CUSTOMER_STAT_CONFIG.map(
                    ({
                        key,
                        title,
                        icon,
                        iconBgClass,
                        iconColorClass,
                        subtitle,
                    }) => {
                        const stat = customerStatsData[key];
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

            <CustomerTable />
        </div>
    );
};

export default CustomerManagement;
