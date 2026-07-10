import { StatCard } from "@/components/custom/CustomCards";
import FilterBar from "@/components/custom/FilterBar";
import { REVIEW_STAT_CONFIG } from "./ReviewsManagement.Config";
import ReviewsTable from "./ReviewsTable";
import { formatStatValue } from "@/utils/common.utils";
import { useReviewsManagement } from "./ReviewsManagement.container";
import { mapAnalyticsMetricToStat } from "@/utils/analytics.utils";
import CommonSkeleton from "@/components/custom/CommonSkeleton/CommonSkeleton";

const ReviewsManagement = () => {
    const {
        reviews,
        reviewsAnalyticsData,
        isReviewsLoading,
        togglingReviewId,
        filterItems,
        handleToggleVisibility,
    } = useReviewsManagement();

    if (isReviewsLoading) {
        return <CommonSkeleton />;
    }

    return (
        <div className="flex flex-col gap-6 p-4 sm:p-6 min-h-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {REVIEW_STAT_CONFIG.map(
                    ({
                        key,
                        title,
                        icon,
                        iconBgClass,
                        iconColorClass,
                        subtitle,
                    }) => {
                        const stat = mapAnalyticsMetricToStat(
                            reviewsAnalyticsData?.[key],
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

            <FilterBar items={filterItems} />

            <ReviewsTable
                reviewsListData={reviews ?? []}
                togglingReviewId={togglingReviewId}
                onToggleVisibility={handleToggleVisibility}
            />
        </div>
    );
};

export default ReviewsManagement;
