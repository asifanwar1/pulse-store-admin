import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { weeklySalesData } from "@/mock/dashboard.mock";
import ChartCard from "./ChartCard";

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
                Sales: <span className="font-semibold text-app-primary">${payload[0].value.toLocaleString()}</span>
            </span>
        </div>
    );
}

export default function WeeklySalesChart() {
    return (
        <ChartCard
            title="Weekly Sales"
            subtitle="Sales volume for the current week"
        >
            <ResponsiveContainer width="100%" height={200}>
                <BarChart
                    data={weeklySalesData}
                    margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
                    barSize={32}
                >
                    <XAxis
                        dataKey="day"
                        tick={{ fontSize: 11, fill: "#9DA5B4" }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fontSize: 11, fill: "#9DA5B4" }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) => `$${v / 1000}k`}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F3F4F6", radius: 6 }} />
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
