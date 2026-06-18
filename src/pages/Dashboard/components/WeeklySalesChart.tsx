import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import ChartCard from "../../../components/custom/CustomCards/ChartCard";
import type { WeeklySalesPoint } from "@/api/services/dashboard/dashboard.response.types";

interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{ value: number }>;
    label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white border border-dash-card-border rounded-xl shadow-dash-card-hover px-3.5 py-2.5 text-xs">
            <p className="font-semibold text-app-primary mb-1">{label}</p>
            <span className="text-app-secondary">
                Sales:{" "}
                <span className="font-semibold text-app-primary">
                    ${payload[0].value.toLocaleString()}
                </span>
            </span>
        </div>
    );
}

interface WeeklySalesChartProps {
    data: WeeklySalesPoint[];
}

export default function WeeklySalesChart({ data }: WeeklySalesChartProps) {
    return (
        <ChartCard
            title="Weekly Sales"
            subtitle="Sales volume for the current week"
            className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-1"
        >
            <ResponsiveContainer width="100%" height={200}>
                <BarChart
                    data={data}
                    margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
                    barSize={32}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#789b89"
                        vertical={false}
                    />
                    <XAxis
                        dataKey="day"
                        tick={{ fontSize: 11, fill: "#2A5C42" }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fontSize: 11, fill: "#2A5C42" }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) => `$${v / 1000}k`}
                    />
                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ fill: "#d1ddd6", radius: 6 }}
                    />
                    <Bar
                        dataKey="sales"
                        radius={[6, 6, 0, 0]}
                        fill="#2A5C42"
                        opacity={0.85}
                    />
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}
