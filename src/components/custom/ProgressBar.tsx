import { cn } from "@/lib/utils";

interface ProgressBarProps {
    percent: number;
    barClassName?: string;
    trackClassName?: string;
}

export default function ProgressBar({
    percent,
    barClassName,
    trackClassName,
}: ProgressBarProps) {
    return (
        <div
            className={cn(
                "flex-1 h-1.5 bg-app-gray rounded-full overflow-hidden",
                trackClassName,
            )}
        >
            <div
                className={cn(
                    "h-full bg-pulse-green rounded-full",
                    barClassName,
                )}
                style={{ width: `${percent}%` }}
            />
        </div>
    );
}
