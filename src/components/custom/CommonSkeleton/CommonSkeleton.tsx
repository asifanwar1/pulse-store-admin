import { Skeleton } from "@/components/ui/skeleton";

const CommonSkeleton = () => {
    return (
        <div className="flex flex-col gap-6 p-4 sm:p-6 min-h-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className="rounded-[20px] border border-border bg-pulse-cream p-6 shadow-sm"
                    >
                        <div className="flex items-center justify-between gap-4">
                            <Skeleton className="h-5 w-28" />
                            <Skeleton className="h-12 w-12 rounded-xl" />
                        </div>

                        <div className="mt-6 space-y-3">
                            <Skeleton className="h-12 w-24" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                            <Skeleton className="h-5 w-20 rounded-full" />
                            <Skeleton className="h-5 w-24 rounded-full" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="rounded-[20px] border border-border bg-pulse-cream p-6 shadow-sm">
                <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="h-4 w-56" />
                    </div>
                    <Skeleton className="h-11 w-40 rounded-full" />
                </div>

                <div className="overflow-hidden rounded-3xl border border-border bg-pulse-cream">
                    <div className="grid min-w-[900px] grid-cols-[repeat(7,minmax(160px,1fr))] gap-4 border-b border-border px-4 py-4">
                        {Array.from({ length: 7 }).map((_, index) => (
                            <Skeleton key={index} className="h-4 w-full" />
                        ))}
                    </div>

                    <div className="space-y-4 p-4">
                        {Array.from({ length: 6 }).map((_, rowIndex) => (
                            <div
                                key={rowIndex}
                                className="grid min-w-[900px] grid-cols-[repeat(7,minmax(160px,1fr))] gap-4"
                            >
                                {Array.from({ length: 7 }).map(
                                    (_, cellIndex) => (
                                        <Skeleton
                                            key={cellIndex}
                                            className="h-4 w-full"
                                        />
                                    ),
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommonSkeleton;
