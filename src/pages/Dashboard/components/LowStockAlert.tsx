import { Package, AlertTriangle } from "lucide-react";
import { lowStockData } from "@/mock/dashboard.mock";
import ChartCard from "./ChartCard";
import { cn } from "@/lib/utils";

function getStockLevel(stock: number, threshold: number) {
    const ratio = stock / threshold;
    if (ratio <= 0.3) return { label: "Critical", barColor: "bg-dash-red", textColor: "text-dash-red", bgColor: "bg-dash-red-light" };
    if (ratio <= 0.6) return { label: "Low", barColor: "bg-dash-amber", textColor: "text-dash-amber", bgColor: "bg-dash-amber-light" };
    return { label: "Fair", barColor: "bg-dash-blue", textColor: "text-dash-blue", bgColor: "bg-dash-blue-light" };
}

export default function LowStockAlert() {
    return (
        <ChartCard
            title="Low Stock Alerts"
            subtitle="Products below reorder threshold"
            action={
                <div className="flex items-center gap-1.5 text-xs text-dash-amber font-medium bg-dash-amber-light rounded-full px-2.5 py-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {lowStockData.length} items
                </div>
            }
        >
            <ul className="flex flex-col gap-3">
                {lowStockData.map((product) => {
                    const level = getStockLevel(product.stock, product.threshold);
                    const pct = Math.min(100, Math.round((product.stock / product.threshold) * 100));
                    return (
                        <li key={product.id} className="flex flex-col gap-1.5">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-app-gray shrink-0">
                                    <Package className="w-4 h-4 text-app-secondary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-xs font-semibold text-app-primary truncate">
                                            {product.name}
                                        </span>
                                        <span
                                            className={cn(
                                                "text-xss font-semibold rounded-full px-2 py-0.5 shrink-0",
                                                level.textColor,
                                                level.bgColor,
                                            )}
                                        >
                                            {level.label}
                                        </span>
                                    </div>
                                    <p className="text-xss text-muted">{product.category}</p>
                                </div>
                                <span className="text-xs font-bold text-app-primary shrink-0">
                                    {product.stock}
                                    <span className="font-normal text-muted">/{product.threshold}</span>
                                </span>
                            </div>
                            <div className="h-1.5 bg-app-gray rounded-full overflow-hidden ml-10">
                                <div
                                    className={cn("h-full rounded-full transition-all", level.barColor)}
                                    style={{ width: `${pct}%` }}
                                />
                            </div>
                        </li>
                    );
                })}
            </ul>
        </ChartCard>
    );
}
