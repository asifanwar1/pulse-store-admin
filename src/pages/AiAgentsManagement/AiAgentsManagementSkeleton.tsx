import { Skeleton } from "@/components/ui/skeleton";

const AiAgentsManagementSkeleton = () => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
                <div
                    key={index}
                    className="overflow-hidden rounded-2xl border border-pulse-cream-dark bg-pulse-cream-dark/40 shadow-dash-card p-5"
                >
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-10 w-10 rounded-full bg-white/70" />
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-32 bg-white/70" />
                                <Skeleton className="h-3 w-20 bg-white/60" />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Skeleton className="h-8 w-8 rounded-full bg-white/70" />
                            <Skeleton className="h-8 w-8 rounded-full bg-white/70" />
                        </div>
                    </div>
                    <Skeleton className="mt-4 h-4 w-full bg-white/60" />
                    <Skeleton className="mt-2 h-4 w-3/4 bg-white/60" />
                </div>
            ))}
        </div>
    );
};

export default AiAgentsManagementSkeleton;
