import type { TopProductItem } from "@/api/services/dashboard/dashboard.response.types";
import ChartCard from "../../../components/custom/CustomCards/ChartCard";
import ProgressBar from "@/components/custom/ProgressBar";
import { getInitialsFromName } from "@/utils/common.utils";

interface TopProductsProps {
    data: TopProductItem[];
}

export default function TopProducts({ data }: TopProductsProps) {
    return (
        <ChartCard
            title="Top Products"
            subtitle="Best performing products by revenue"
            className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-1"
            bodyClassName="p-2"
        >
            <div className="flex flex-col gap-3 mt-2">
                {data.length === 0 && (
                    <p className="text-xs text-muted px-2 py-6 text-center">
                        No top products available.
                    </p>
                )}

                {data.map((product, index) => {
                    const barPct = Math.round(
                        (product.stock / product.sales) * 100,
                    );

                    return (
                        <div
                            key={product.product_id}
                            className="flex items-center gap-3"
                        >
                            <span className="text-xs font-bold text-pulse-green-dark w-4 text-right">
                                {index + 1}
                            </span>
                            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-pulse-cream-dark text-pulse-green font-bold text-xs">
                                {getInitialsFromName(product.name)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-xs font-semibold text-pulse-green-dark truncate">
                                        {product.name}
                                    </span>
                                    <span className="text-xs font-bold text-pulse-green-dark whitespace-nowrap">
                                        ${product.revenue.toLocaleString()}
                                    </span>
                                </div>
                                <ProgressBar
                                    percent={barPct}
                                    trackClassName="bg-pulse-green/10"
                                />
                                <p className="text-xss text-muted mt-0.5">
                                    {product.sales.toLocaleString()} sales
                                    {typeof product.stock === "number"
                                        ? ` - ${product.stock} in stock`
                                        : ""}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </ChartCard>
    );
}
