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
import ChartCard from "../../../components/custom/CustomCards/ChartCard";
import type { OrdersByCategoryChartItem } from "../Dashboard.Container";

interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{
        value: number;
        payload: { category: string };
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
            </div>
        </div>
    );
}

interface OrdersByCategoryChartProps {
    data: OrdersByCategoryChartItem[];
}

export default function OrdersByCategoryChart({
    data,
}: OrdersByCategoryChartProps) {
    return (
        <ChartCard
            title="Orders by Category"
            subtitle="Total orders per product category"
            className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-1"
        >
            <ResponsiveContainer width="100%" height={280}>
                <BarChart
                    data={data}
                    margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
                    barSize={28}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#789b89"
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
                        cursor={{ fill: "#d1ddd6", radius: 6 }}
                    />
                    <Bar dataKey="orders" radius={[6, 6, 0, 0]}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}
