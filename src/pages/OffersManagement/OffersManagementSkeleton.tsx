import { Skeleton } from "@/components/ui/skeleton";

const OffersManagementSkeleton = () => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
                <div
                    key={index}
                    className="rounded-2xl border border-pulse-cream-dark bg-pulse-cream-dark/40 shadow-dash-card"
                >
                    <div className="flex items-center justify-between gap-3 border-b border-pulse-cream-dark p-5 pb-4">
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-12 w-12 rounded-2xl bg-white/70" />
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-32 bg-white/70" />
                                <Skeleton className="h-4 w-16 rounded-full bg-white/60" />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Skeleton className="h-8 w-8 rounded-full bg-white/70" />
                            <Skeleton className="h-8 w-8 rounded-full bg-white/70" />
                            <Skeleton className="h-8 w-8 rounded-full bg-white/70" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 p-5">
                        <div className="flex items-end justify-between gap-3">
                            <div className="w-full space-y-2">
                                <Skeleton className="h-4 w-full bg-white/60" />
                                <Skeleton className="h-4 w-8/12 bg-white/60" />
                            </div>
                            <Skeleton className="h-9 w-20 shrink-0 rounded-2xl bg-white/70" />
                        </div>
                        <Skeleton className="h-4 w-40 bg-white/60" />
                        <div className="flex gap-1.5 border-t border-pulse-cream-dark pt-4">
                            <Skeleton className="h-6 w-20 rounded-full bg-white/70" />
                            <Skeleton className="h-6 w-16 rounded-full bg-white/70" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OffersManagementSkeleton;
