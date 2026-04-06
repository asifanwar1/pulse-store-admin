import { cn } from "@/lib/utils";

interface ChartCardProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    action?: React.ReactNode;
    className?: string;
    bodyClassName?: string;
}

export default function ChartCard({
    title,
    subtitle,
    children,
    action,
    className,
    bodyClassName,
}: ChartCardProps) {
    return (
        <div
            className={cn(
                "bg-white rounded-2xl border border-dash-card-border shadow-dash-card flex flex-col",
                className,
            )}
        >
            <div className="flex items-start justify-between px-5 pt-5 pb-4 border-b border-dash-card-border">
                <div>
                    <h3 className="text-sm font-semibold text-app-primary">{title}</h3>
                    {subtitle && (
                        <p className="text-xs text-muted mt-0.5">{subtitle}</p>
                    )}
                </div>
                {action && <div>{action}</div>}
            </div>
            <div className={cn("flex-1 p-5", bodyClassName)}>{children}</div>
        </div>
    );
}
