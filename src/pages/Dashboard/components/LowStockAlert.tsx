import { Package } from "lucide-react";
import ChartCard from "../../../components/custom/CustomCards/ChartCard";
import { cn } from "@/lib/utils";
import ProgressBar from "@/components/custom/ProgressBar";
import type { LowStockProduct } from "@/api/services/dashboard/dashboard.response.types";

function getStockLevel(stock: number, threshold: number) {
    const ratio = stock / threshold;
    if (ratio <= 0.3)
        return {
            label: "Critical",
            barColor: "bg-dash-red",
            textColor: "text-dash-red",
        };
    if (ratio <= 0.6)
        return {
            label: "Low",
            barColor: "bg-dash-amber",
            textColor: "text-dash-amber",
        };
    return {
        label: "Fair",
        barColor: "bg-dash-blue",
        textColor: "text-dash-blue",
    };
}

interface LowStockAlertProps {
    data: LowStockProduct[];
}

export default function LowStockAlert({ data }: LowStockAlertProps) {
    return (
        <ChartCard
            title="Low Stock Alerts"
            subtitle="Products below reorder threshold"
            className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-1"
            bodyClassName="p-2"
        >
            <div className="flex flex-col gap-5 mt-2">
                {data.length === 0 && (
                    <p className="text-xs text-muted px-2 py-6 text-center">
                        No low stock alerts.
                    </p>
                )}
                {data.map((product) => {
                    const level = getStockLevel(
                        product.stock,
                        product.reorderThreshold,
                    );
                    const pct = Math.min(
                        100,
                        Math.round(
                            (product.stock / product.reorderThreshold) * 100,
                        ),
                    );
                    return (
                        <div
                            key={product.product_id}
                            className="flex flex-col gap-1.5"
                        >
                            <div className="flex items-center gap-2">
                                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-pulse-cream-dark shrink-0">
                                    <Package className="w-4 h-4 text-pulse-green" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-semibold text-pulse-green-dark truncate">
                                            {product.name}
                                        </span>
                                        <span
                                            className={cn(
                                                "text-xs font-semibold rounded-md px-2 py-0.5",
                                                level.textColor,
                                            )}
                                        >
                                            ( {level.label} )
                                        </span>
                                    </div>
                                    <p className="text-xss text-pulse-green-dark ">
                                        Reorder threshold:{" "}
                                        {product.reorderThreshold}
                                    </p>
                                </div>
                                <span className="text-xs font-bold text-pulse-green-dark">
                                    {product.stock}
                                    <span className="font-normal text-pulse-green-dark">
                                        /{product.reorderThreshold}
                                    </span>
                                </span>
                            </div>
                            <div className="ml-10">
                                <ProgressBar
                                    percent={pct}
                                    barClassName={cn(
                                        "transition-all",
                                        level.barColor,
                                    )}
                                    trackClassName="bg-pulse-green/10"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </ChartCard>
    );
}
