import { Skeleton } from "@/components/ui/skeleton";

const ManageProductSkeleton = () => {
    return (
        <div className="space-y-6 rounded-2xl border border-pulse-cream-dark bg-pulse-cream-dark/40 p-6 shadow-dash-card">
            <div className="grid gap-4 sm:grid-cols-2">
                <Skeleton className="h-10 w-full rounded-xl bg-white/70" />
                <Skeleton className="h-10 w-full rounded-xl bg-white/70" />
                <Skeleton className="h-10 w-full rounded-xl bg-white/70" />
                <Skeleton className="h-10 w-full rounded-xl bg-white/70" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <Skeleton className="h-10 w-full rounded-xl bg-white/70" />
                <Skeleton className="h-10 w-full rounded-xl bg-white/70" />
                <Skeleton className="h-10 w-full rounded-xl bg-white/70" />
                <Skeleton className="h-10 w-full rounded-xl bg-white/70" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <Skeleton className="h-10 w-full rounded-xl bg-white/70" />
                <Skeleton className="h-10 w-full rounded-xl bg-white/70" />
            </div>

            <Skeleton className="h-12 w-1/2 rounded-xl bg-white/70" />

            <Skeleton className="h-40 w-full rounded-3xl bg-white/70" />

            <div className="flex flex-wrap gap-3">
                <Skeleton className="h-10 w-32 rounded-full bg-white/70" />
                <Skeleton className="h-10 w-32 rounded-full bg-white/70" />
            </div>
        </div>
    );
};

export default ManageProductSkeleton;
