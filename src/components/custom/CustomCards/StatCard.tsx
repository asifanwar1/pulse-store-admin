import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
    title: string;
    value: string | number;
    trend: number;
    trendDirection: "up" | "down";
    icon: React.ReactNode;
    iconBgClass: string;
    iconColorClass: string;
    subtitle?: string;
    className?: string;
}

export default function StatCard({
    title,
    value,
    trend,
    trendDirection,
    icon,
    iconBgClass,
    iconColorClass,
    subtitle,
    className,
}: StatCardProps) {
    const isUp = trendDirection === "up";

    return (
        <div
            className={cn(
                "bg-pulse-cream-dark/40 rounded-2xl p-5 border border-pulse-cream-dark shadow-dash-card flex flex-col gap-4",
                className,
            )}
        >
            <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-app-secondary">
                        {title}
                    </span>
                    <span className="text-2xl font-bold text-pulse-green-dark tracking-tight">
                        {value}
                    </span>
                    {subtitle && (
                        <span className="text-xs text-pulse-green">
                            {subtitle}
                        </span>
                    )}
                </div>
                <div
                    className={cn(
                        "flex items-center justify-center w-11 h-11 rounded-xl shrink-0",
                        iconBgClass,
                    )}
                >
                    <span className={cn("w-5 h-5", iconColorClass)}>
                        {icon}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-1.5">
                <div
                    className={cn(
                        "flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold",
                        isUp
                            ? "text-status-delivered"
                            : "text-status-cancelled",
                    )}
                >
                    {isUp ? (
                        <TrendingUp className="w-3 h-3" />
                    ) : (
                        <TrendingDown className="w-3 h-3" />
                    )}
                    {Math.abs(trend)}%
                </div>
                <span className="text-xs text-pulse-green">vs last month</span>
            </div>
        </div>
    );
}
