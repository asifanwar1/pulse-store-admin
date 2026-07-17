import { MapPin } from "lucide-react";

import { cn } from "@/lib/utils";
import { formatApiDateAndTime } from "@/utils/dateTime.utils";

export type TOrderTrackingTimelineEntry = {
    id: number;
    status: string | null;
    note: string | null;
    created_at: string;
};

export type TShipmentTrackingTimelineEntry = {
    id: number;
    status: string | null;
    description: string | null;
    location?: string | null;
    created_at: string;
};

export type TTimelineEntry =
    | TOrderTrackingTimelineEntry
    | TShipmentTrackingTimelineEntry;

type TimelineProps = {
    items: TTimelineEntry[];
    getStatusLabel: (status: string) => string;
    getStatusClass: (status: string) => string;
    emptyMessage?: string;
    className?: string;
};

const getEntryText = (item: TTimelineEntry) =>
    "description" in item ? item.description : item.note;

const Timeline = ({
    items,
    getStatusLabel,
    getStatusClass,
    emptyMessage = "No tracking history yet.",
    className,
}: TimelineProps) => {
    if (!items.length) {
        return <p className="text-sm text-pulse-green">{emptyMessage}</p>;
    }

    const newestFirst = [...items].reverse();

    return (
        <ol className={cn("flex flex-col", className)}>
            {newestFirst.map((item, index) => (
                <li key={item.id} className="relative flex gap-4">
                    <div className="flex flex-col items-center">
                        <span className="w-2.5 h-2.5 rounded-full bg-pulse-green shrink-0 mt-1.5" />
                        {index !== newestFirst.length - 1 && (
                            <span className="w-px flex-1 bg-pulse-cream-dark mt-1" />
                        )}
                    </div>
                    <div className="flex flex-col gap-1 pb-6 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            {item.status && (
                                <span
                                    className={cn(
                                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
                                        getStatusClass(item.status),
                                    )}
                                >
                                    {getStatusLabel(item.status)}
                                </span>
                            )}
                            <time className="text-xs text-pulse-green">
                                {formatApiDateAndTime(item.created_at)}
                            </time>
                        </div>
                        {getEntryText(item) && (
                            <p className="text-sm text-pulse-green-dark">
                                {getEntryText(item)}
                            </p>
                        )}
                        {"location" in item && item.location && (
                            <p className="flex items-center gap-1 text-xs text-pulse-green">
                                <MapPin className="w-3 h-3" />
                                {item.location}
                            </p>
                        )}
                    </div>
                </li>
            ))}
        </ol>
    );
};

export default Timeline;
