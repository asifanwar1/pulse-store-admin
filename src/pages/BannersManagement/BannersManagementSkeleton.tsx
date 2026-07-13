import { Skeleton } from "@/components/ui/skeleton";

const BannersManagementSkeleton = () => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
                <div
                    key={index}
                    className="overflow-hidden rounded-2xl border border-pulse-cream-dark bg-pulse-cream-dark/40 shadow-dash-card"
                >
                    <Skeleton className="aspect-[3/1] w-full rounded-none bg-white/70" />
                    <div className="flex flex-col gap-3 p-4">
                        <div className="flex items-start justify-between gap-3">
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-32 bg-white/70" />
                                <Skeleton className="h-4 w-20 rounded-full bg-white/60" />
                            </div>
                            <div className="flex gap-2">
                                <Skeleton className="h-8 w-8 rounded-full bg-white/70" />
                                <Skeleton className="h-8 w-8 rounded-full bg-white/70" />
                                <Skeleton className="h-8 w-8 rounded-full bg-white/70" />
                            </div>
                        </div>
                        <Skeleton className="h-4 w-40 bg-white/60" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BannersManagementSkeleton;
