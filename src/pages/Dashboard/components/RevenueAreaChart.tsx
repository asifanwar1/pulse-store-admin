import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { monthlyRevenueData } from "@/mock/dashboard.mock";
import ChartCard from "../../../components/custom/CustomCards/ChartCard";

const formatCurrency = (value: number) => `$${(value / 1000).toFixed(0)}k`;

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
                    <span className="text-app-secondary capitalize">
                        {entry.name}:
                    </span>
                    <span className="font-semibold text-app-primary">
                        ${entry.value.toLocaleString()}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default function RevenueAreaChart() {
    return (
        <ChartCard
            title="Revenue Overview"
            subtitle="Monthly revenue, expenses & profit for 2026"
            className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-1"
        >
            <ResponsiveContainer width="100%" height={280}>
                <AreaChart
                    data={monthlyRevenueData}
                    margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
                >
                    <defs>
                        <linearGradient
                            id="gradRevenue"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="5%"
                                stopColor="#2A5C42"
                                stopOpacity={0.18}
                            />
                            <stop
                                offset="95%"
                                stopColor="#2A5C42"
                                stopOpacity={0.01}
                            />
                        </linearGradient>
                        <linearGradient
                            id="gradExpenses"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="5%"
                                stopColor="#3B82F6"
                                stopOpacity={0.18}
                            />
                            <stop
                                offset="95%"
                                stopColor="#3B82F6"
                                stopOpacity={0.01}
                            />
                        </linearGradient>
                        <linearGradient
                            id="gradProfit"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="5%"
                                stopColor="#8B5CF6"
                                stopOpacity={0.18}
                            />
                            <stop
                                offset="95%"
                                stopColor="#8B5CF6"
                                stopOpacity={0.01}
                            />
                        </linearGradient>
                    </defs>
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
                        tickFormatter={formatCurrency}
                        tick={{ fontSize: 11, fill: "#2A5C42" }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        iconType="circle"
                        iconSize={8}
                        wrapperStyle={{ fontSize: "12px", paddingTop: "16px" }}
                    />
                    <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#2A5C42"
                        strokeWidth={2}
                        fill="url(#gradRevenue)"
                        dot={false}
                        activeDot={{ r: 4, strokeWidth: 0 }}
                    />
                    <Area
                        type="monotone"
                        dataKey="expenses"
                        stroke="#3B82F6"
                        strokeWidth={2}
                        fill="url(#gradExpenses)"
                        dot={false}
                        activeDot={{ r: 4, strokeWidth: 0 }}
                    />
                    <Area
                        type="monotone"
                        dataKey="profit"
                        stroke="#8B5CF6"
                        strokeWidth={2}
                        fill="url(#gradProfit)"
                        dot={false}
                        activeDot={{ r: 4, strokeWidth: 0 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}
