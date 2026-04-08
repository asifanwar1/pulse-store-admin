import { productStatsData } from "@/mock/product.mock";
import { StatCard } from "@/components/custom/CustomCards";
import { PRODUCT_STAT_CONFIG } from "./ProductManagement.Config";
import ProductTable from "./ProductTable";
import { formatStatValue } from "@/utils/common.utils";

const ProductManagement = () => {
    return (
        <div className="flex flex-col gap-6 p-4 sm:p-6 min-h-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {PRODUCT_STAT_CONFIG.map(
                    ({
                        key,
                        title,
                        icon,
                        iconBgClass,
                        iconColorClass,
                        subtitle,
                    }) => {
                        const stat = productStatsData[key];
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
            <ProductTable />
        </div>
    );
};

export default ProductManagement;
