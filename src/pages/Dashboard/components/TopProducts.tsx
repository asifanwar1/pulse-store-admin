import { TrendingUp, TrendingDown } from "lucide-react";
import { topProductsData } from "@/mock/dashboard.mock";
import ChartCard from "../../../components/custom/CustomCards/ChartCard";
import { cn } from "@/lib/utils";
import ProgressBar from "@/components/custom/ProgressBar";

const MAX_REVENUE = Math.max(...topProductsData.map((p) => p.revenue));

export default function TopProducts() {
    return (
        <ChartCard
            title="Top Products"
            subtitle="Best performing products by revenue"
            className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-1"
            bodyClassName="p-2"
        >
            <div className="flex flex-col gap-3 mt-2">
                {topProductsData.map((product, index) => {
                    const isUp = product.trend >= 0;
                    const barPct = Math.round(
                        (product.revenue / MAX_REVENUE) * 100,
                    );
                    return (
                        <div
                            key={product.id}
                            className="flex items-center gap-3 "
                        >
                            <span className="text-xs font-bold text-pulse-green-dark w-4 text-right">
                                {index + 1}
                            </span>
                            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-pulse-cream-dark text-pulse-green font-bold text-xs">
                                {product.initials}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-xs font-semibold text-pulse-green-dark truncate">
                                        {product.name}
                                    </span>
                                    <span className="text-xs font-bold text-pulse-green-dark">
                                        ${product.revenue.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ProgressBar
                                        percent={barPct}
                                        trackClassName="bg-pulse-green/10"
                                    />
                                    <span
                                        className={cn(
                                            "flex items-center gap-0.5 text-xss font-semibold",
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
                                        {Math.abs(product.trend)}%
                                    </span>
                                </div>
                                <p className="text-xss text-muted mt-0.5">
                                    {product.sales.toLocaleString()} sales ·{" "}
                                    {product.stock} in stock
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </ChartCard>
    );
}
