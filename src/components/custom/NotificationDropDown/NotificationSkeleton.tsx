import { Skeleton } from "@/components/ui/skeleton";

const NotificationSkeleton: React.FC = () => (
    <div className="space-y-2 px-2 py-2">
        <Skeleton className="h-16 w-full rounded-xl" />
        <Skeleton className="h-16 w-full rounded-xl" />
        <Skeleton className="h-16 w-full rounded-xl" />
        <Skeleton className="h-16 w-full rounded-xl" />
    </div>
);

export default NotificationSkeleton;
