import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import ChartCard from "../../../components/custom/CustomCards/ChartCard";
import type { CustomerGrowthChartItem } from "../Dashboard.Container";

interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{ name: string; value: number; color: string }>;
    label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white border border-dash-card-border rounded-xl shadow-dash-card-hover px-3.5 py-2.5 text-xs">
            <p className="font-semibold text-app-primary mb-1.5">{label}</p>
            {payload.map((entry) => (
                <div
                    key={entry.name}
                    className="flex items-center gap-2 py-0.5"
                >
                    <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-app-secondary">
                        New:
                    </span>
                    <span className="font-semibold text-app-primary">
                        {entry.value.toLocaleString()}
                    </span>
                </div>
            ))}
        </div>
    );
}

interface CustomerGrowthChartProps {
    data: CustomerGrowthChartItem[];
}

export default function CustomerGrowthChart({ data }: CustomerGrowthChartProps) {
    return (
        <ChartCard
            title="Customer Growth"
            subtitle="New customers month over month"
            className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-1"
        >
            <ResponsiveContainer width="100%" height={240}>
                <LineChart
                    data={data}
                    margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#789b89"
                        vertical={false}
                    />
                    <XAxis
                        dataKey="month"
                        tick={{ fontSize: 11, fill: "#2A5C42" }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fontSize: 11, fill: "#2A5C42" }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        iconType="circle"
                        iconSize={8}
                        wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }}
                        formatter={() => "New Customers"}
                    />
                    <Line
                        type="monotone"
                        dataKey="newCustomers"
                        stroke="#2A5C42"
                        strokeWidth={2.5}
                        dot={false}
                        activeDot={{ r: 4, strokeWidth: 0 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}
