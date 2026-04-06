import { TrendingUp, TrendingDown } from "lucide-react";
import { topProductsData } from "@/mock/dashboard.mock";
import ChartCard from "./ChartCard";
import { cn } from "@/lib/utils";

const MAX_REVENUE = Math.max(...topProductsData.map((p) => p.revenue));

export default function TopProducts() {
    return (
        <ChartCard
            title="Top Products"
            subtitle="Best performing products by revenue"
        >
            <ul className="flex flex-col gap-3">
                {topProductsData.map((product, index) => {
                    const isUp = product.trend >= 0;
                    const barPct = Math.round((product.revenue / MAX_REVENUE) * 100);
                    return (
                        <li key={product.id} className="flex items-center gap-3">
                            <span className="text-xs font-bold text-muted w-4 shrink-0 text-right">
                                {index + 1}
                            </span>
                            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-pulse-green-light text-pulse-green font-bold text-xs shrink-0">
                                {product.initials}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-xs font-semibold text-app-primary truncate">
                                        {product.name}
                                    </span>
                                    <span className="text-xs font-bold text-app-primary shrink-0">
                                        ${product.revenue.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="flex-1 h-1.5 bg-app-gray rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-pulse-green rounded-full"
                                            style={{ width: `${barPct}%` }}
                                        />
                                    </div>
                                    <span
                                        className={cn(
                                            "flex items-center gap-0.5 text-xss font-semibold shrink-0",
                                            isUp ? "text-status-delivered" : "text-status-cancelled",
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
                                    {product.sales.toLocaleString()} sales · {product.stock} in stock
                                </p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </ChartCard>
    );
}
