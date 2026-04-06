import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Cell,
    ResponsiveContainer,
} from "recharts";
import { ordersByCategoryData } from "@/mock/dashboard.mock";
import ChartCard from "../../../components/custom/CustomCards/ChartCard";

interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{
        value: number;
        payload: { category: string; revenue: number };
    }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    return (
        <div className="bg-white border border-dash-card-border rounded-xl shadow-dash-card-hover px-3.5 py-2.5 text-xs">
            <p className="font-semibold text-app-primary mb-1">{d.category}</p>
            <div className="flex flex-col gap-0.5">
                <span className="text-app-secondary">
                    Orders:{" "}
                    <span className="font-semibold text-app-primary">
                        {payload[0].value.toLocaleString()}
                    </span>
                </span>
                <span className="text-app-secondary">
                    Revenue:{" "}
                    <span className="font-semibold text-app-primary">
                        ${d.revenue.toLocaleString()}
                    </span>
                </span>
            </div>
        </div>
    );
}

export default function OrdersByCategoryChart() {
    return (
        <ChartCard
            title="Orders by Category"
            subtitle="Total orders per product category"
            className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-1"
        >
            <ResponsiveContainer width="100%" height={280}>
                <BarChart
                    data={ordersByCategoryData}
                    margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
                    barSize={28}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#E8EAF0"
                        vertical={false}
                    />
                    <XAxis
                        dataKey="category"
                        tick={{ fontSize: 10, fill: "#2A5C42" }}
                        axisLine={false}
                        tickLine={false}
                        interval={0}
                        angle={-20}
                        textAnchor="end"
                        height={40}
                    />
                    <YAxis
                        tick={{ fontSize: 11, fill: "#2A5C42" }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ fill: "#F3F4F6", radius: 6 }}
                    />
                    <Bar dataKey="orders" radius={[6, 6, 0, 0]}>
                        {ordersByCategoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}
