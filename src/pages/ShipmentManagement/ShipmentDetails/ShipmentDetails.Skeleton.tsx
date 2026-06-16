import { Skeleton } from "@/components/ui/skeleton";

const ShipmentDetailsSkeleton = () => {
    return (
        <div className="flex flex-col gap-6 p-4 sm:p-6 min-h-0">
            <div className="flex">
                <Skeleton className="h-10 w-28 rounded-full" />
            </div>

            <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    <Skeleton className="h-16 w-16 rounded-2xl" />

                    <div className="flex-1 min-w-0 space-y-3">
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-4 w-40" />
                        <div className="flex flex-wrap gap-3">
                            <Skeleton className="h-4 w-20 rounded-full" />
                            <Skeleton className="h-4 w-24 rounded-full" />
                            <Skeleton className="h-4 w-28 rounded-full" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 shrink-0 w-full sm:w-48">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-11 w-full rounded-full" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className="rounded-2xl border border-pulse-cream-dark bg-pulse-cream-dark/40 p-4"
                    >
                        <Skeleton className="h-5 w-24 mb-4" />
                        <Skeleton className="h-10 w-24" />
                    </div>
                ))}
            </div>

            <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card px-5 py-4 flex items-center gap-3">
                <Skeleton className="h-5 w-5 rounded-full" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-5 w-56" />
                </div>
            </div>

            <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card py-1">
                <div className="space-y-4 px-5 py-4">
                    <Skeleton className="h-6 w-52" />
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton key={index} className="h-4 w-full" />
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-5 space-y-4">
                    <Skeleton className="h-5 w-40" />
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton key={index} className="h-4 w-full" />
                    ))}
                </div>

                <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-5 space-y-4">
                    <Skeleton className="h-5 w-32" />
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton key={index} className="h-4 w-full" />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShipmentDetailsSkeleton;
