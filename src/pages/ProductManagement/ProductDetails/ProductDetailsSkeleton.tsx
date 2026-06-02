import { Skeleton } from "@/components/ui/skeleton";

const ProductDetailsSkeleton = () => {
    return (
        <div className="flex flex-col gap-6 p-4 sm:p-6 min-h-0">
            <div className="flex">
                <Skeleton className="h-10 w-28 rounded-full bg-white/70" />
            </div>

            <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    <Skeleton className="h-16 w-16 rounded-2xl bg-white/70" />
                    <div className="flex-1 space-y-4">
                        <Skeleton className="h-6 w-3/5 bg-white/70" />
                        <Skeleton className="h-4 w-1/3 bg-white/60" />
                        <div className="flex flex-wrap gap-3">
                            <Skeleton className="h-4 w-24 bg-white/60" />
                            <Skeleton className="h-4 w-24 bg-white/60" />
                            <Skeleton className="h-4 w-24 bg-white/60" />
                            <Skeleton className="h-4 w-24 bg-white/60" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {Array.from({ length: 4 }).map((_, idx) => (
                    <Skeleton
                        key={idx}
                        className="h-24 rounded-2xl bg-white/70"
                    />
                ))}
            </div>

            <div className="grid gap-4">
                <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-5">
                    <Skeleton className="h-5 w-40 bg-white/70 mb-4" />
                    <div className="grid gap-3 sm:grid-cols-2">
                        <Skeleton className="h-20 rounded-2xl bg-white/70" />
                        <Skeleton className="h-20 rounded-2xl bg-white/70" />
                    </div>
                </div>

                <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-5">
                    <Skeleton className="h-5 w-44 bg-white/70 mb-4" />
                    <Skeleton className="h-44 rounded-3xl bg-white/70" />
                </div>

                <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-5">
                    <Skeleton className="h-5 w-48 bg-white/70 mb-4" />
                    <Skeleton className="h-72 rounded-3xl bg-white/70" />
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsSkeleton;
