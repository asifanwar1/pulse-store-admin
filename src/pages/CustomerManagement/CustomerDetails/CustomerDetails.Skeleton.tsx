import { Skeleton } from "@/components/ui/skeleton";

const CustomerDetailsSkeleton = () => {
    return (
        <div className="flex flex-col gap-6 p-4 sm:p-6 min-h-0">
            <div className="flex">
                <Skeleton className="h-8 w-28 rounded-md" />
            </div>

            <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    <Skeleton className="w-16 h-16 rounded-2xl" />
                    <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-6 w-40 rounded-md" />
                            <Skeleton className="h-5 w-20 rounded-full" />
                        </div>
                        <Skeleton className="h-4 w-48 mt-2 rounded-md" />
                        <div className="flex flex-wrap items-center gap-4 text-xs mt-3">
                            <Skeleton className="h-4 w-24 rounded-md" />
                            <Skeleton className="h-4 w-28 rounded-md" />
                            <Skeleton className="h-4 w-32 rounded-md" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <Skeleton className="h-16 rounded-2xl" />
                <Skeleton className="h-16 rounded-2xl" />
                <Skeleton className="h-16 rounded-2xl" />
                <Skeleton className="h-16 rounded-2xl" />
            </div>

            <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-5 flex flex-col gap-4">
                <Skeleton className="h-6 w-40 rounded-md" />
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <Skeleton className="h-12 w-56 rounded-md" />
                    <Skeleton className="h-12 w-56 rounded-md" />
                    <Skeleton className="h-12 w-56 rounded-md" />
                    <Skeleton className="h-12 w-56 rounded-md" />
                </div>
            </div>

            <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card py-1">
                <div className="px-4 py-4">
                    <Skeleton className="h-8 w-full rounded-md mb-3" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full rounded-md" />
                        <Skeleton className="h-4 w-full rounded-md" />
                        <Skeleton className="h-4 w-full rounded-md" />
                        <Skeleton className="h-4 w-full rounded-md" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerDetailsSkeleton;
