import { StatCard } from "@/components/custom/CustomCards";
import FilterBar from "@/components/custom/FilterBar";
import { PRODUCT_STAT_CONFIG } from "./ProductManagement.Config";
import ProductTable from "./ProductTable";
import { formatStatValue } from "@/utils/common.utils";
import { useProductManagement } from "./ProductManagement.Container";
import { mapAnalyticsMetricToStat } from "@/utils/analytics.utils";
import CommonSkeleton from "@/components/custom/CommonSkeleton/CommonSkeleton";

const ProductManagement = () => {
    const {
        products,
        productsAnalyticsData,
        isProductsLoading,
        productsTotalCount,
        page,
        pageSize,
        pageCount,
        filterItems,
        onPaginationChange,
    } = useProductManagement();

    if (isProductsLoading) {
        return <CommonSkeleton />;
    }
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
                        const stat = mapAnalyticsMetricToStat(
                            productsAnalyticsData?.[key],
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
            <FilterBar items={filterItems} splitLayout />
            <ProductTable
                productsListData={products ?? []}
                totalCount={productsTotalCount}
                page={page}
                pageSize={pageSize}
                pageCount={pageCount}
                onPaginationChange={onPaginationChange}
            />
        </div>
    );
};

export default ProductManagement;
