import { Skeleton } from "@/components/ui/skeleton";

const OrderDetailsSkeleton = () => {
    return (
        <div className="flex flex-col gap-6 p-4 sm:p-6 min-h-0">
            <div className="flex">
                <Skeleton className="w-28 h-8" />
            </div>

            <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    <Skeleton className="w-16 h-16 rounded-2xl" />
                    <div className="flex-1 space-y-3 min-w-0">
                        <Skeleton className="w-3/5 h-6 rounded" />
                        <Skeleton className="w-1/3 h-4 rounded" />
                        <div className="flex flex-wrap items-center gap-3">
                            <Skeleton className="w-20 h-4 rounded" />
                            <Skeleton className="w-24 h-4 rounded" />
                            <Skeleton className="w-28 h-4 rounded" />
                        </div>
                    </div>
                    <Skeleton className="w-48 h-12 rounded" />
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[0, 1, 2, 3].map((i) => (
                    <Skeleton key={i} className="w-full h-16 rounded-2xl" />
                ))}
            </div>

            <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-4">
                <Skeleton className="w-1/3 h-6 mb-4 rounded" />
                <div className="space-y-2">
                    {[0, 1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} className="w-full h-10 rounded" />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsSkeleton;
